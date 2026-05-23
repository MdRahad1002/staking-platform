import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

async function getBinancePrice(symbol: string): Promise<number> {
  const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
  if (!res.ok) throw new Error('Failed to fetch price')
  const data = await res.json()
  return parseFloat(data.price)
}

function calculatePnl(side: string, entryPrice: number, currentPrice: number, quantity: number): number {
  if (side === 'SPOT_BUY' || side === 'LONG') {
    return quantity * (currentPrice - entryPrice)
  }
  // SHORT
  return quantity * (entryPrice - currentPrice)
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const { positionId } = await req.json()

    if (!positionId || typeof positionId !== 'string') {
      return NextResponse.json({ error: 'Position ID required' }, { status: 400 })
    }

    const position = await prisma.tradePosition.findUnique({ where: { id: positionId } })

    if (!position || position.userId !== session.user.id) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 })
    }
    if (position.status !== 'OPEN') {
      return NextResponse.json({ error: 'Position is already closed' }, { status: 400 })
    }

    const closePrice = await getBinancePrice(position.symbol)
    const pnl = calculatePnl(position.side, position.entryPrice, closePrice, position.quantity)

    // Margin returned: clamp to 0 (no going below zero)
    const returnAmount = Math.max(0, position.margin + pnl)

    await prisma.$transaction([
      prisma.tradePosition.update({
        where: { id: positionId },
        data: { status: 'CLOSED', closedAt: new Date(), closePrice, realizedPnl: pnl },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { balance: { increment: returnAmount } },
      }),
      prisma.transaction.create({
        data: {
          userId: session.user.id,
          type: 'TRADE_CLOSE',
          amount: returnAmount,
          description: `Closed ${position.side} on ${position.symbol} | PnL: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`,
          referenceId: positionId,
        },
      }),
    ])

    return NextResponse.json({ closePrice, pnl, returnAmount })
  } catch (error) {
    console.error('[TRADING_CLOSE]', error)
    return NextResponse.json({ error: 'Failed to close position' }, { status: 500 })
  }
}
