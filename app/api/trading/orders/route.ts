import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

async function getBinancePrice(symbol: string): Promise<number> {
  const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
  if (!res.ok) throw new Error('Failed to fetch price')
  const data = await res.json()
  return parseFloat(data.price)
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const userId = session.user.id

    const body = await req.json()
    const {
      symbol,
      side,
      type,
      tradeType,
      leverage = 1,
      amountUsd,
      price,
      stopPrice,
      stopLoss,
      takeProfit,
      clientPrice, // live price sent from the client (WebSocket)
    } = body

    // Validate required fields
    if (!symbol || !side || !type || !tradeType || !amountUsd) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[A-Z]{2,10}$/.test(String(symbol).toUpperCase())) {
      return NextResponse.json({ error: 'Invalid symbol' }, { status: 400 })
    }
    if (!['BUY', 'SELL', 'LONG', 'SHORT'].includes(side)) {
      return NextResponse.json({ error: 'Invalid side' }, { status: 400 })
    }
    if (!['MARKET', 'LIMIT', 'STOP_LIMIT'].includes(type)) {
      return NextResponse.json({ error: 'Invalid order type' }, { status: 400 })
    }
    if (!['SPOT', 'LEVERAGE'].includes(tradeType)) {
      return NextResponse.json({ error: 'Invalid trade type' }, { status: 400 })
    }

    const amt = parseFloat(amountUsd)
    if (isNaN(amt) || amt < 10) {
      return NextResponse.json({ error: 'Minimum order is $10' }, { status: 400 })
    }

    const lev = parseInt(leverage)
    if (isNaN(lev) || lev < 1 || lev > 100) {
      return NextResponse.json({ error: 'Leverage must be between 1x and 100x' }, { status: 400 })
    }

    // Check balance
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { balance: true } })
    if (!user || user.balance < amt) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    const sym = String(symbol).toUpperCase()

    // Fetch current price for market orders, fall back to client-provided price if server is rate-limited
    let filledPrice: number | null = null
    if (type === 'MARKET') {
      try {
        filledPrice = await getBinancePrice(sym)
      } catch {
        const cp = clientPrice ? parseFloat(String(clientPrice)) : NaN
        if (!isNaN(cp) && cp > 0) {
          filledPrice = cp
        } else {
          return NextResponse.json({ error: 'Unable to fetch market price. Please try again.' }, { status: 502 })
        }
      }
    }

    const status = type === 'MARKET' ? 'FILLED' : 'PENDING'
    const filledAt = type === 'MARKET' ? new Date() : null

    // Calculate quantity in base currency
    const effectivePrice = filledPrice ?? (price ? parseFloat(price) : null)
    const effectiveLev = tradeType === 'LEVERAGE' ? lev : 1
    const quantity = effectivePrice ? (amt * effectiveLev) / effectivePrice : 0

    // Deduct margin from user balance
    await prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amt } },
    })

    // Create position for filled market orders
    let position = null
    if (type === 'MARKET' && filledPrice) {
      const positionSide = tradeType === 'SPOT' ? 'SPOT_BUY' : side // LONG | SHORT | SPOT_BUY
      position = await prisma.tradePosition.create({
        data: {
          userId,
          symbol: sym,
          side: positionSide,
          leverage: effectiveLev,
          entryPrice: filledPrice,
          quantity,
          margin: amt,
          stopLoss: stopLoss ? parseFloat(stopLoss) : null,
          takeProfit: takeProfit ? parseFloat(takeProfit) : null,
        },
      })
    }

    // Create order record
    const order = await prisma.tradeOrder.create({
      data: {
        userId,
        symbol: sym,
        side,
        type,
        tradeType,
        leverage: effectiveLev,
        amountUsd: amt,
        price: price ? parseFloat(price) : null,
        stopPrice: stopPrice ? parseFloat(stopPrice) : null,
        stopLoss: stopLoss ? parseFloat(stopLoss) : null,
        takeProfit: takeProfit ? parseFloat(takeProfit) : null,
        filledPrice,
        filledAt,
        status,
        positionId: position?.id ?? null,
      },
    })

    // Log transaction
    await prisma.transaction.create({
      data: {
        userId,
        type: 'TRADE_OPEN',
        amount: -amt,
        description: `Opened ${tradeType} ${side} on ${sym}${effectiveLev > 1 ? ` (${effectiveLev}x)` : ''}`,
        referenceId: order.id,
      },
    })

    return NextResponse.json({ order, position })
  } catch (error) {
    console.error('[TRADING_ORDERS]', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}
