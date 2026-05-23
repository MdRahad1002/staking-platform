import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import TradingTerminal from '@/components/trading/TradingTerminal'

export const metadata: Metadata = { title: 'Trade' }

export default async function TradePage() {
  const session = await getAuthSession()
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { balance: true },
  })

  return (
    <div className="p-4 md:p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white">Trading Terminal</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Live market data from Binance · Orders execute at real-time prices
        </p>
      </div>
      <TradingTerminal userBalance={user?.balance ?? 0} />
    </div>
  )
}
