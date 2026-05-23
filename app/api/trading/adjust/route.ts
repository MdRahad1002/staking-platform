import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAuth()
    const { positionId, stopLoss, takeProfit } = await req.json()

    if (!positionId || typeof positionId !== 'string') {
      return NextResponse.json({ error: 'Position ID required' }, { status: 400 })
    }

    const position = await prisma.tradePosition.findUnique({ where: { id: positionId } })
    if (!position || position.userId !== session.user.id) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 })
    }
    if (position.status !== 'OPEN') {
      return NextResponse.json({ error: 'Position is not open' }, { status: 400 })
    }

    const data: { stopLoss?: number | null; takeProfit?: number | null } = {}

    if (stopLoss !== undefined) {
      data.stopLoss =
        stopLoss === null || stopLoss === '' ? null : Number(stopLoss)
    }
    if (takeProfit !== undefined) {
      data.takeProfit =
        takeProfit === null || takeProfit === '' ? null : Number(takeProfit)
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const updated = await prisma.tradePosition.update({
      where: { id: positionId },
      data,
    })

    return NextResponse.json({ position: updated })
  } catch (error) {
    console.error('[TRADING_ADJUST]', error)
    return NextResponse.json({ error: 'Failed to update position' }, { status: 500 })
  }
}
