import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  ArrowRight,
  Zap,
  Rocket,
  CandlestickChart,
  Activity,
  ChevronRight,
  Clock,
  Shield,
  BarChart3,
  Wallet,
  CircleDollarSign,
  History,
} from 'lucide-react'
import { IdleBurnCounter, CompoundProjection } from '@/components/dashboard/DashboardNudges'
import { MarketMini } from '@/components/dashboard/MarketMini'

export const metadata: Metadata = { title: 'Dashboard' }

async function getDashboardData(userId: string) {
  const [user, stakes, deposits, withdrawals, notifications, allPlans] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true, firstName: true, lastName: true },
    }),
    prisma.stake.findMany({
      where: { userId },
      include: { plan: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.deposit.findMany({
      where: { userId },
      include: { currency: { select: { symbol: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.withdrawal.findMany({
      where: { userId },
      include: { currency: { select: { symbol: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.stakingPlan.findMany({
      where: { isActive: true },
      orderBy: { minAmount: 'asc' },
    }),
  ])

  const activeStakes = stakes.filter((s) => s.status === 'ACTIVE')
  const totalStaked = activeStakes.reduce((sum, s) => sum + s.amount, 0)
  const totalEarned = stakes.reduce((sum, s) => sum + s.totalEarned, 0)
  const totalDeposited = deposits
    .filter((d) => d.status === 'CONFIRMED')
    .reduce((sum, d) => sum + d.amount, 0)

  // Find the best ROI the user currently has in active stakes
  const bestActiveRoi = activeStakes.length > 0
    ? Math.max(...activeStakes.map((s) => s.dailyRoi))
    : 0

  // Find the next plan that offers a higher ROI than what user currently has
  const nextTierPlan = allPlans.find((p) => p.dailyRoi > bestActiveRoi) ?? null

  // Find the cheapest plan the user doesn't have an active stake on yet (for idle balance nudge)
  const idlePlan = allPlans.find((p) => p.minAmount <= (user?.balance ?? 0)) ?? null

  // Best available plan for idle balance (highest ROI they qualify for)
  const idleBalance = user?.balance ?? 0
  const qualifyingPlans = allPlans.filter(
    (p) => p.minAmount <= idleBalance && (p.maxAmount === null || p.maxAmount >= idleBalance)
  )
  const bestIdlePlan = qualifyingPlans.length > 0
    ? qualifyingPlans.reduce((best, p) => (p.dailyRoi > best.dailyRoi ? p : best), qualifyingPlans[0])
    : allPlans[0] ?? null

  // Total daily earnings across all active stakes
  const totalDailyEarning = activeStakes.reduce((sum, s) => sum + (s.amount * s.dailyRoi) / 100, 0)

  // Average daily ROI across active stakes (weighted by amount)
  const avgDailyRoi = activeStakes.length > 0 && totalStaked > 0
    ? activeStakes.reduce((sum, s) => sum + (s.amount / totalStaked) * s.dailyRoi, 0)
    : 0

  return {
    user,
    stakes,
    deposits,
    withdrawals,
    notifications,
    activeStakes,
    totalStaked,
    totalEarned,
    totalDeposited,
    allPlans,
    bestActiveRoi,
    nextTierPlan,
    idlePlan,
    bestIdlePlan,
    totalDailyEarning,
    avgDailyRoi,
  }
}

export default async function DashboardPage() {
  const session = await getAuthSession()
  if (!session) redirect('/login')

  const data = await getDashboardData(session.user.id)
  const name = data.user?.firstName || session.user.name?.split(' ')[0] || 'User'
  const totalPortfolio = (data.user?.balance || 0) + data.totalStaked
  const stakedPct = totalPortfolio > 0 ? (data.totalStaked / totalPortfolio) * 100 : 0
  const liquidPct = totalPortfolio > 0 ? ((data.user?.balance || 0) / totalPortfolio) * 100 : 0

  return (
    <div className="space-y-5 md:space-y-6 max-w-7xl mx-auto">

      {/* ══════════════════════════════════════════
          1. HERO PORTFOLIO CARD
      ══════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #070e22 0%, #0b1735 30%, #0f1d42 60%, #130e35 100%)' }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-500/20 blur-[90px]" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-600/15 blur-[70px]" />
        <div className="absolute top-1/2 right-1/3 h-40 w-40 rounded-full bg-amber-500/10 blur-[50px]" />

        <div className="relative z-10 p-5 sm:p-7">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-amber-200/70 mb-1.5">
                Total Portfolio Value
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none font-mono">
                {formatCurrency(totalPortfolio)}
              </p>
              {data.totalDailyEarning > 0 && (
                <div className="flex items-center gap-2 mt-2.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  <span className="text-green-400 text-sm font-bold">
                    +{formatCurrency(data.totalDailyEarning)}/day
                  </span>
                  <span className="text-[11px] text-amber-200/40 hidden sm:inline">earning rate</span>
                </div>
              )}
            </div>
            {/* Live pill */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[11px] font-semibold text-green-400 tracking-wide">LIVE</span>
            </div>
          </div>

          {/* Portfolio allocation bar */}
          {totalPortfolio > 0 && (
            <div className="mb-5">
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex mb-2">
                {data.totalStaked > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all"
                    style={{ width: `${Math.min(100, stakedPct)}%` }}
                  />
                )}
                {(data.user?.balance || 0) > 0 && (
                  <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500 flex-1" />
                )}
              </div>
              <div className="flex gap-4 text-[10px] text-blue-200/40">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 inline-block" />
                  Staked {stakedPct.toFixed(0)}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 inline-block" />
                  Liquid {liquidPct.toFixed(0)}%
                </span>
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-4 border-t border-white/10">
            {[
              { label: 'Liquid', value: formatCurrency(data.user?.balance || 0), color: 'text-violet-300' },
              { label: 'Staked', value: formatCurrency(data.totalStaked), color: 'text-amber-300' },
              { label: 'Earned', value: formatCurrency(data.totalEarned), color: 'text-green-400' },
              { label: 'Stakes', value: `${data.activeStakes.length} active`, color: 'text-amber-300' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-amber-200/40 mb-0.5">{label}</p>
                <p className={`text-[11px] sm:text-sm font-bold ${color} leading-tight`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. QUICK ACTIONS
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: 'Deposit', href: '/deposit', Icon: ArrowDownToLine, from: 'from-amber-500', to: 'to-amber-400', shadow: 'shadow-amber-500/30' },
          { label: 'Withdraw', href: '/withdraw', Icon: ArrowUpFromLine, from: 'from-orange-500', to: 'to-amber-400', shadow: 'shadow-orange-500/30' },
          { label: 'Trade', href: '/trade', Icon: CandlestickChart, from: 'from-green-500', to: 'to-emerald-400', shadow: 'shadow-green-500/30' },
          { label: 'Stake', href: '/plans', Icon: TrendingUp, from: 'from-violet-500', to: 'to-purple-400', shadow: 'shadow-violet-500/30' },
        ].map(({ label, href, Icon, from, to, shadow }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-card/50 border border-border/30 hover:border-border/70 hover:bg-card/80 active:scale-95 transition-all duration-150"
          >
            <div
              className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${from} ${to} shadow-md ${shadow} group-hover:scale-105 transition-transform`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
          </Link>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          3. MARKET PULSE
      ══════════════════════════════════════════ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/15">
              <Activity className="h-3 w-3 text-primary" />
            </div>
            <h2 className="text-sm font-bold text-foreground">Market Pulse</h2>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">Live crypto prices</span>
          </div>
          <Link href="/trade" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            Trade <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <MarketMini />
      </div>

      {/* ══════════════════════════════════════════
          4. NUDGES
      ══════════════════════════════════════════ */}
      {data.activeStakes.length === 0 && data.bestIdlePlan && (
        <IdleBurnCounter
          idleBalance={data.user?.balance ?? 0}
          bestAvailableDailyRoi={data.bestIdlePlan.dailyRoi}
          bestPlanId={data.bestIdlePlan.id}
          bestPlanName={data.bestIdlePlan.name}
        />
      )}

      {!data.nextTierPlan && data.activeStakes.length === 0 && data.idlePlan && (
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">
              You have {formatCurrency(data.user?.balance ?? 0)} ready to work — start earning today
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Stake with <strong className="text-foreground">{data.idlePlan.name}</strong> and earn{' '}
              <strong className="text-primary">
                +{formatCurrency(((data.user?.balance ?? 0) * data.idlePlan.dailyRoi) / 100)}/day
              </strong>{' '}
              at {data.idlePlan.dailyRoi}% daily · {data.idlePlan.durationDays}-day term.
            </p>
          </div>
          <Link href={`/plan/stake?planId=${data.idlePlan.id}`} className="flex-shrink-0">
            <Button size="sm" className="gap-1.5 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
              <Zap className="h-3.5 w-3.5" /> Stake Now
            </Button>
          </Link>
        </div>
      )}

      {data.nextTierPlan && (
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 via-card to-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
            <TrendingUp className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">
              Upgrade to <span className="text-amber-400">{data.nextTierPlan.name}</span> — earn{' '}
              <span className="text-amber-400">{data.nextTierPlan.dailyRoi}%/day</span> vs your current{' '}
              {data.bestActiveRoi}%/day
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Min. deposit:{' '}
              <strong className="text-foreground">{formatCurrency(data.nextTierPlan.minAmount)}</strong> ·{' '}
              <strong className="text-amber-400">
                +{formatCurrency((data.nextTierPlan.minAmount * (data.nextTierPlan.dailyRoi - data.bestActiveRoi)) / 100)}/day
              </strong>{' '}
              additional return.
            </p>
          </div>
          <Link href="/deposit" className="flex-shrink-0">
            <Button size="sm" className="gap-1.5 font-semibold bg-amber-500 hover:bg-amber-400 text-black">
              <ArrowDownToLine className="h-3.5 w-3.5" /> Top Up
            </Button>
          </Link>
        </div>
      )}

      {/* ══════════════════════════════════════════
          5. MAIN GRID: STAKES + SIDEBAR
      ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LEFT: Stakes + Stats */}
        <div className="lg:col-span-2 space-y-5">

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Balance', value: formatCurrency(data.user?.balance || 0), Icon: Wallet, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              { label: 'Total Staked', value: formatCurrency(data.totalStaked), Icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              { label: 'Total Earned', value: formatCurrency(data.totalEarned), Icon: CircleDollarSign, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
              { label: 'Active Stakes', value: data.activeStakes.length.toString(), Icon: BarChart3, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
            ].map(({ label, value, Icon, color, bg, border }) => (
              <div
                key={label}
                className={`rounded-xl border ${border} ${bg} p-4 flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <p className={`text-lg font-bold ${color} leading-tight`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Active Stakes */}
          <div className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/15">
                  <TrendingUp className="h-3 w-3 text-amber-400" />
                </div>
                <h2 className="text-sm font-bold">Active Stakes</h2>
                {data.activeStakes.length > 0 && (
                  <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-400/30">{data.activeStakes.length}</Badge>
                )}
              </div>
              <Link href="/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 text-muted-foreground hover:text-foreground">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="p-4">
              {data.activeStakes.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/60">
                    <TrendingUp className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">No active stakes</p>
                  <p className="text-xs text-muted-foreground/60 mb-4">Put your capital to work and earn daily returns</p>
                  <Link href="/plans">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
                      <Zap className="h-3.5 w-3.5" /> Browse Plans
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.activeStakes.map((stake) => {
                    const startMs = new Date(stake.startDate).getTime()
                    const endMs = new Date(stake.endDate).getTime()
                    const progress = Math.min(100, Math.max(0, ((Date.now() - startMs) / (endMs - startMs)) * 100))
                    const daysLeft = Math.max(0, Math.ceil((endMs - Date.now()) / 86_400_000))
                    const dailyEarn = (stake.amount * stake.dailyRoi) / 100
                    return (
                      <div
                        key={stake.id}
                        className="rounded-xl border border-border/40 bg-secondary/20 hover:bg-secondary/35 p-4 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-foreground">{stake.plan.name}</span>
                              <Badge variant="outline" className="text-[10px] text-green-400 border-green-400/30">Active</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(stake.amount)} · {stake.dailyRoi}%/day · {daysLeft}d left
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-400">+{formatCurrency(stake.totalEarned)}</p>
                            <p className="text-[10px] text-muted-foreground">{formatCurrency(dailyEarn)}/day</p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>{formatDate(stake.startDate)}</span>
                            <span className="text-amber-400 font-medium">{progress.toFixed(0)}%</span>
                            <span>{formatDate(stake.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Compound Projection */}
          {data.activeStakes.length > 0 && data.totalDailyEarning > 0 && (
            <CompoundProjection
              dailyEarning={data.totalDailyEarning}
              principalStaked={data.totalStaked}
              planDailyRoi={data.avgDailyRoi}
            />
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          {/* Notifications */}
          <div className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/15">
                  <Bell className="h-3 w-3 text-amber-400" />
                </div>
                <h2 className="text-sm font-bold">Notifications</h2>
                {data.notifications.length > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {data.notifications.length}
                  </span>
                )}
              </div>
              <Link href="/notify">
                <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 text-muted-foreground hover:text-foreground">
                  All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="p-4">
              {data.notifications.length === 0 ? (
                <div className="text-center py-6">
                  <Bell className="h-7 w-7 text-muted-foreground/20 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">All caught up!</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {data.notifications.map((notif) => (
                    <Link key={notif.id} href="/notify" className="block p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <p className="text-xs font-semibold text-foreground line-clamp-1">{notif.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {formatDate(notif.createdAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Deposit CTA */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-5 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-bold mb-1">Fund Your Account</p>
            <p className="text-xs text-muted-foreground mb-4">Deposit crypto and start earning daily returns immediately.</p>
            <Link href="/deposit" className="block">
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5">
                <ArrowDownToLine className="h-3.5 w-3.5" /> Deposit Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          6. RECENT ACTIVITY (unified feed)
      ══════════════════════════════════════════ */}
      {(data.deposits.length > 0 || data.withdrawals.length > 0) && (
        <div className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-secondary">
                <History className="h-3 w-3 text-muted-foreground" />
              </div>
              <h2 className="text-sm font-bold">Recent Activity</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Deposits */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deposits</p>
                  <Link href="/deposit">
                    <Button variant="ghost" size="sm" className="h-6 text-xs gap-0.5 text-muted-foreground hover:text-foreground px-2">
                      All <ChevronRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                {data.deposits.length === 0 ? (
                  <p className="text-xs text-muted-foreground/60 text-center py-4">No deposits yet</p>
                ) : (
                  <div className="space-y-2">
                    {data.deposits.map((dep) => (
                      <div key={dep.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 flex-shrink-0">
                            <ArrowDownToLine className="h-3.5 w-3.5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{dep.amount} {dep.currency.symbol}</p>
                            <p className="text-[10px] text-muted-foreground">{formatDate(dep.createdAt)}</p>
                          </div>
                        </div>
                        <Badge
                          variant={dep.status === 'CONFIRMED' ? 'success' : dep.status === 'FAILED' ? 'error' : 'warning'}
                          className="text-[10px]"
                        >
                          {dep.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Withdrawals */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Withdrawals</p>
                  <Link href="/withdraw">
                    <Button variant="ghost" size="sm" className="h-6 text-xs gap-0.5 text-muted-foreground hover:text-foreground px-2">
                      All <ChevronRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                {data.withdrawals.length === 0 ? (
                  <p className="text-xs text-muted-foreground/60 text-center py-4">No withdrawals yet</p>
                ) : (
                  <div className="space-y-2">
                    {data.withdrawals.map((wd) => (
                      <div key={wd.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 flex-shrink-0">
                            <ArrowUpFromLine className="h-3.5 w-3.5 text-orange-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{wd.amount} {wd.currency.symbol}</p>
                            <p className="text-[10px] text-muted-foreground">{formatDate(wd.createdAt)}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            wd.status === 'COMPLETED' || wd.status === 'APPROVED' ? 'success' :
                            wd.status === 'REJECTED' ? 'error' : 'warning'
                          }
                          className="text-[10px]"
                        >
                          {wd.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
