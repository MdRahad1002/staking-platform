import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import TradeWorkspace from '@/components/trading/TradeWorkspace'
import { CandlestickChart, ShieldCheck } from 'lucide-react'

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
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-[#0a1020] to-background p-5 md:p-6 mb-5">
        <div className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-blue-700/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <CandlestickChart className="h-6 w-6 text-blue-300" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">Trading Terminal</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live market data from Binance · Orders execute at real-time prices
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400">Regulated · Real-Time</span>
          </div>
        </div>
      </div>

      <TradeWorkspace userBalance={user?.balance ?? 0} />
    </div>
  )
}
