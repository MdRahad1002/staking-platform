import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { TrendingUp, CheckCircle2, XCircle, Clock, List, Zap, ArrowRight, BarChart3, Wallet, CircleDollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const session = await requireAuth()

  const stakes = await prisma.stake.findMany({
    where: { userId: session.user.id },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  })

  const active    = stakes.filter((s) => s.status === 'ACTIVE')
  const completed = stakes.filter((s) => s.status === 'COMPLETED')
  const others    = stakes.filter((s) => s.status !== 'ACTIVE' && s.status !== 'COMPLETED')

  const totalInvested = stakes.reduce((s, k) => s + k.amount, 0)
  const totalEarned   = stakes.reduce((s, k) => s + k.totalEarned, 0)

  function StakeRow({ stake }: { stake: (typeof stakes)[0] }) {
    const now = new Date()
    const start = new Date(stake.startDate)
    const end = new Date(stake.endDate)
    const total = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    const progressPct = Math.min(100, Math.max(0, (elapsed / total) * 100))
    const daysLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86_400_000))
    const dailyEarn = (stake.amount * stake.dailyRoi) / 100

    const isActive    = stake.status === 'ACTIVE'
    const isCompleted = stake.status === 'COMPLETED'
    const isCancelled = stake.status === 'CANCELLED'

    return (
      <Link
        href={`/orders/${stake.id}`}
        className="block rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/35 hover:border-border/80 p-4 transition-all duration-150"
      >
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="font-bold text-sm text-foreground">{stake.plan.name}</span>
              <Badge
                variant={isActive ? 'success' : isCompleted ? 'info' : isCancelled ? 'destructive' : 'secondary'}
                className="text-[10px]"
              >
                {stake.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Started {formatDate(stake.startDate)} &middot; {stake.dailyRoi}%/day &middot; {stake.plan.durationDays}d term
              {isActive && ` · ${daysLeft}d left`}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-black text-sm text-green-400">+{formatCurrency(stake.totalEarned)}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{formatCurrency(dailyEarn)}/day</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {[
            { label: 'Invested', value: formatCurrency(stake.amount) },
            { label: 'Expected Return', value: formatCurrency(stake.expectedReturn), accent: true },
            { label: isCompleted ? 'Earned' : 'Paid Out', value: formatCurrency(stake.totalEarned), green: true },
            { label: 'ROI', value: `${stake.dailyRoi}%/day` },
          ].map(({ label, value, accent, green }) => (
            <div key={label}>
              <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
              <p className={cn('text-xs font-semibold', accent ? 'text-blue-400' : green ? 'text-green-400' : 'text-foreground')}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {(isActive || isCompleted) && (
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-amber-600'
                )}
                style={{ width: `${isCompleted ? 100 : progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{formatDate(stake.startDate)}</span>
              <span className={cn('font-medium', isCompleted ? 'text-green-400' : 'text-amber-400')}>
                {isCompleted ? 'Completed' : `${progressPct.toFixed(0)}%`}
              </span>
              <span>{formatDate(stake.endDate)}</span>
            </div>
          </div>
        )}
      </Link>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 via-background to-background p-6 md:p-8">
        <div className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20">
            <List className="h-6 w-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-white">My Stakes</h1>
            <p className="text-muted-foreground mt-1">Track all your staking positions and earnings.</p>
          </div>
          {active.length > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-2.5 flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest leading-none mb-0.5">Active</p>
                <p className="text-base font-black text-green-400 leading-none">{active.length} stake{active.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Stakes',   value: stakes.length.toString(),     Icon: List,            color: 'text-foreground',  bg: 'bg-secondary/60',       border: 'border-border/60' },
          { label: 'Active',         value: active.length.toString(),      Icon: TrendingUp,      color: 'text-amber-400',   bg: 'bg-amber-500/10',       border: 'border-amber-500/20' },
          { label: 'Total Invested', value: formatCurrency(totalInvested), Icon: Wallet,          color: 'text-blue-400',    bg: 'bg-blue-500/10',        border: 'border-blue-500/20' },
          { label: 'Total Earned',   value: formatCurrency(totalEarned),   Icon: CircleDollarSign, color: 'text-green-400',  bg: 'bg-green-500/10',       border: 'border-green-500/20' },
        ].map(({ label, value, Icon, color, bg, border }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className={`text-lg font-bold ${color} leading-tight`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Active Stakes */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/15">
              <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <h2 className="font-bold text-base">Active Stakes</h2>
            {active.length > 0 && (
              <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">{active.length}</Badge>
            )}
          </div>
          <Link href="/plans" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            Browse Plans <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="p-4 space-y-3">
          {active.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/60">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground">No active stakes</p>
              <p className="text-sm text-muted-foreground max-w-xs">Start staking to earn daily passive income from your crypto.</p>
              <Link href="/plans" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-1">
                <Zap className="h-3.5 w-3.5" /> Browse Plans
              </Link>
            </div>
          ) : (
            active.map((s) => <StakeRow key={s.id} stake={s} />)
          )}
        </div>
      </div>

      {/* Completed Stakes */}
      {completed.length > 0 && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-500/15">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
              </div>
              <h2 className="font-bold text-base">Completed</h2>
              <Badge variant="outline" className="text-[10px] text-green-400 border-green-500/30">{completed.length}</Badge>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {completed.map((s) => <StakeRow key={s.id} stake={s} />)}
          </div>
        </div>
      )}

      {/* Other Stakes */}
      {others.length > 0 && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary/60">
                <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <h2 className="font-bold text-base">Other</h2>
              <Badge variant="secondary" className="text-[10px]">{others.length}</Badge>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {others.map((s) => <StakeRow key={s.id} stake={s} />)}
          </div>
        </div>
      )}
    </div>
  )
}
