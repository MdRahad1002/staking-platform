import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function GET() {
  let session
  try {
    session = await requireAuth()
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const positions = await prisma.tradePosition.findMany({
      where: { userId: session.user.id, status: { in: ['CLOSED', 'LIQUIDATED'] } },
      orderBy: { closedAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ data: positions })
  } catch (error) {
    console.error('[TRADING_HISTORY]', error)
    return NextResponse.json({ error: 'Failed to load history' }, { status: 500 })
  }
}
