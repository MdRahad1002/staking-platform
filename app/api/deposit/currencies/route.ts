import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Currencies are needed by logged-in users on the deposit page.
    // We still gate behind session to avoid public enumeration.
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currencies = await prisma.depositCurrency.findMany({
      where: { isActive: true },
      select: {
        id: true, symbol: true, name: true, network: true,
        minDeposit: true, iconUrl: true,
      },
      orderBy: { symbol: 'asc' },
    })
    return NextResponse.json({ data: currencies })
  } catch (error) {
    console.error('[DEPOSIT_CURRENCIES]', error)
    return NextResponse.json({ error: 'Failed to load currencies.' }, { status: 500 })
  }
}
