import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Maintenance margin rate (0.5%) positions are liquidated before margin is 100% gone
const MM_RATE = 0.005

function calcLiqPrice(side: string, entryPrice: number, leverage: number): number | null {
  if (side === 'SPOT_BUY' || leverage <= 1) return null
  if (side === 'LONG') return entryPrice * (1 - 1 / leverage + MM_RATE)
  return entryPrice * (1 + 1 / leverage - MM_RATE)
}

function calcPnl(side: string, entryPrice: number, closePrice: number, quantity: number): number {
  if (side === 'SPOT_BUY' || side === 'LONG') return quantity * (closePrice - entryPrice)
  return quantity * (entryPrice - closePrice)
}

async function getBinancePrices(symbols: string[]): Promise<Record<string, number>> {
  try {
    // Single bulk request avoids per-symbol rate-limiting on Vercel IPs
    const res = await fetch('https://api.binance.com/api/v3/ticker/price', { cache: 'no-store' })
    if (!res.ok) return {}
    const allPrices: Array<{ symbol: string; price: string }> = await res.json()
    const symbolSet = new Set(symbols)
    const map: Record<string, number> = {}
    for (const item of allPrices) {
      if (symbolSet.has(item.symbol)) {
        map[item.symbol] = parseFloat(item.price)
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function GET() {
  try {
    // Load all open positions
    const positions = await prisma.tradePosition.findMany({
      where: { status: 'OPEN' },
    })

    if (positions.length === 0) {
      return NextResponse.json({ processed: 0, liquidated: 0, slClosed: 0, tpClosed: 0 })
    }

    // Fetch live prices for all unique symbols in parallel
    const symbols = [...new Set(positions.map((p) => p.symbol))]
    const prices = await getBinancePrices(symbols)

    let liquidated = 0
    let slClosed = 0
    let tpClosed = 0

    for (const pos of positions) {
      const currentPrice = prices[pos.symbol]
      if (!currentPrice) continue

      const isLong = pos.side === 'LONG' || pos.side === 'SPOT_BUY'
      const liqPrice = calcLiqPrice(pos.side, pos.entryPrice, pos.leverage)

      // ── 1. Liquidation check ──────────────────────────────────────
      if (liqPrice !== null) {
        const isLiquidated = isLong
          ? currentPrice <= liqPrice
          : currentPrice >= liqPrice

        if (isLiquidated) {
          await prisma.$transaction([
            prisma.tradePosition.update({
              where: { id: pos.id },
              data: {
                status: 'LIQUIDATED',
                closedAt: new Date(),
                closePrice: currentPrice,
                realizedPnl: -pos.margin,
              },
            }),
            // User gets nothing platform keeps the margin
            prisma.transaction.create({
              data: {
                userId: pos.userId,
                type: 'TRADE_LIQUIDATION',
                amount: 0,
                description: `LIQUIDATED ${pos.side}${pos.leverage > 1 ? ` ${pos.leverage}x` : ''} ${pos.symbol} at $${currentPrice.toFixed(2)} (liq. $${liqPrice.toFixed(2)})`,
                referenceId: pos.id,
              },
            }),
          ])
          liquidated++
          continue
        }
      }

      // ── 2. Stop Loss check ────────────────────────────────────────
      if (pos.stopLoss !== null) {
        const slHit = isLong
          ? currentPrice <= pos.stopLoss
          : currentPrice >= pos.stopLoss

        if (slHit) {
          const closePrice = pos.stopLoss
          const pnl = calcPnl(pos.side, pos.entryPrice, closePrice, pos.quantity)
          const returnAmount = Math.max(0, pos.margin + pnl)

          await prisma.$transaction([
            prisma.tradePosition.update({
              where: { id: pos.id },
              data: { status: 'CLOSED', closedAt: new Date(), closePrice, realizedPnl: pnl },
            }),
            prisma.user.update({
              where: { id: pos.userId },
              data: { balance: { increment: returnAmount } },
            }),
            prisma.transaction.create({
              data: {
                userId: pos.userId,
                type: 'TRADE_CLOSE',
                amount: returnAmount,
                description: `Stop Loss hit ${pos.side}${pos.leverage > 1 ? ` ${pos.leverage}x` : ''} ${pos.symbol} at $${closePrice.toFixed(2)} | PnL: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`,
                referenceId: pos.id,
              },
            }),
          ])
          slClosed++
          continue
        }
      }

      // ── 3. Take Profit check ──────────────────────────────────────
      if (pos.takeProfit !== null) {
        const tpHit = isLong
          ? currentPrice >= pos.takeProfit
          : currentPrice <= pos.takeProfit

        if (tpHit) {
          const closePrice = pos.takeProfit
          const pnl = calcPnl(pos.side, pos.entryPrice, closePrice, pos.quantity)
          const returnAmount = Math.max(0, pos.margin + pnl)

          await prisma.$transaction([
            prisma.tradePosition.update({
              where: { id: pos.id },
              data: { status: 'CLOSED', closedAt: new Date(), closePrice, realizedPnl: pnl },
            }),
            prisma.user.update({
              where: { id: pos.userId },
              data: { balance: { increment: returnAmount } },
            }),
            prisma.transaction.create({
              data: {
                userId: pos.userId,
                type: 'TRADE_CLOSE',
                amount: returnAmount,
                description: `Take Profit hit ${pos.side}${pos.leverage > 1 ? ` ${pos.leverage}x` : ''} ${pos.symbol} at $${closePrice.toFixed(2)} | PnL: +$${pnl.toFixed(2)}`,
                referenceId: pos.id,
              },
            }),
          ])
          tpClosed++
        }
      }
    }

    return NextResponse.json({
      processed: positions.length,
      liquidated,
      slClosed,
      tpClosed,
    })
  } catch (error) {
    console.error('[TRADING_LIQUIDATE_CRON]', error)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}
