import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await requireAuth()
    const positions = await prisma.tradePosition.findMany({
      where: { userId: session.user.id, status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: positions })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
