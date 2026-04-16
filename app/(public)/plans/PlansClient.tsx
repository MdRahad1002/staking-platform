'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, Search, ChevronDown, ChevronUp, Filter, Lock, Calculator, ArrowRight, Zap } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { SafeImg } from '@/components/shared/SafeImg'
import { cn } from '@/lib/utils'

// Simulated live activity creates social proof and urgency
const ACTIVITY_NAMES = ['James T.','Sarah M.','David K.','Emma L.','Michael R.','Olivia P.','Chris W.','Priya N.','Ahmed K.','Laura B.','Tom S.','Natalie F.','Ryan H.','Ana C.','Marcus D.']
const ACTIVITY_CITIES = ['Toronto','London','Dubai','Sydney','New York','Berlin','Singapore','Amsterdam','Zürich','Dublin','Vancouver','Los Angeles','Auckland','Frankfurt','Paris']

function buildActivityFeed(plans: Plan[]): { name: string; city: string; plan: string; amount: number; minsAgo: number }[] {
  if (plans.length === 0) return []
  const feed = []
  const shuffled = [...plans].sort(() => Math.random() - 0.5)
  for (let i = 0; i < 8; i++) {
    const plan = shuffled[i % shuffled.length]
    const amount = plan.minAmount + Math.floor(Math.random() * Math.min(plan.minAmount * 2, 5000))
    feed.push({
      name: ACTIVITY_NAMES[Math.floor(Math.random() * ACTIVITY_NAMES.length)],
      city: ACTIVITY_CITIES[Math.floor(Math.random() * ACTIVITY_CITIES.length)],
      plan: plan.name,
      amount,
      minsAgo: Math.floor(Math.random() * 14) + 1,
    })
  }
  return feed
}

interface Plan {
  id: string
  name: string
  description?: string | null
  minAmount: number
  maxAmount: number | null
  durationDays: number
  dailyRoi: number
  totalRoi: number
  isFeatured?: boolean
  iconUrl?: string | null
  isActive: boolean
  sortOrder: number
}

interface PlansClientProps {
  plans: Plan[]
  isLoggedIn: boolean
}

const DURATION_FILTERS = [
  { label: 'All Durations', value: 'all' },
  { label: 'Flexible (≤30d)', value: 'flexible' },
  { label: 'Short (31–90d)', value: 'short' },
  { label: 'Long (90d+)', value: 'long' },
]

const YIELD_FILTERS = [
  { label: 'All Yields', value: 'all' },
  { label: 'Standard (≤5%/day)', value: 'standard' },
  { label: 'High Yield (>5%/day)', value: 'high' },
]

export function PlansClient({ plans, isLoggedIn }: PlansClientProps) {
  const [search, setSearch] = useState('')
  const [durationFilter, setDurationFilter] = useState('all')
  const [yieldFilter, setYieldFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<'apr' | 'duration' | 'min'>('apr')
  const [sortAsc, setSortAsc] = useState(false)
  const [calcAmount, setCalcAmount] = useState('')
  const [planCalcAmounts, setPlanCalcAmounts] = useState<Record<string, string>>({})
  const [activityFeed] = useState(() => buildActivityFeed(plans))
  const [activityIdx, setActivityIdx] = useState(0)
  const [activityVisible, setActivityVisible] = useState(true)
  const activityTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (activityFeed.length === 0) return
    activityTimerRef.current = setInterval(() => {
      setActivityVisible(false)
      setTimeout(() => {
        setActivityIdx((i) => (i + 1) % activityFeed.length)
        setActivityVisible(true)
      }, 400)
    }, 5000)
    return () => { if (activityTimerRef.current) clearInterval(activityTimerRef.current) }
  }, [activityFeed])

  const calcNum = useMemo(() => {
    const n = parseFloat(calcAmount.replace(/[^0-9.]/g, ''))
    return isNaN(n) ? 0 : n
  }, [calcAmount])

  const calcResult = useMemo(() => {
    if (calcNum < 1) return null
    const qualifying = plans.filter(
      (p) => p.minAmount <= calcNum && (p.maxAmount == null || p.maxAmount >= calcNum)
    )
    if (qualifying.length === 0) {
      // Not enough? find the cheapest plan
      const cheapest = [...plans].sort((a, b) => a.minAmount - b.minAmount)[0]
      return cheapest ? { plan: cheapest, dailyEarning: 0, totalEarning: 0, totalPayout: 0, tooLow: true } : null
    }
    const plan = qualifying.reduce((best, p) => (p.dailyRoi > best.dailyRoi ? p : best), qualifying[0])
    const dailyEarning = (calcNum * plan.dailyRoi) / 100
    const totalEarning = (calcNum * plan.totalRoi) / 100
    const totalPayout = calcNum + totalEarning
    return { plan, dailyEarning, totalEarning, totalPayout, tooLow: false }
  }, [plans, calcNum])

  const getPlanCalcResult = (plan: Plan, rawAmount: string) => {
    const n = parseFloat(rawAmount.replace(/[^0-9.]/g, ''))
    if (!n || n < plan.minAmount) return null
    const cappedAmount = plan.maxAmount && n > plan.maxAmount ? plan.maxAmount : n
    const dailyEarning = (cappedAmount * plan.dailyRoi) / 100
    const totalEarning = (cappedAmount * plan.totalRoi) / 100
    return { amount: cappedAmount, dailyEarning, totalEarning, totalPayout: cappedAmount + totalEarning }
  }

  const featuredPlans = plans.filter((p) => p.isFeatured)

  const filtered = useMemo(() => {
    let result = [...plans]

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (durationFilter === 'flexible') result = result.filter((p) => p.durationDays <= 30)
    else if (durationFilter === 'short') result = result.filter((p) => p.durationDays > 30 && p.durationDays <= 90)
    else if (durationFilter === 'long') result = result.filter((p) => p.durationDays > 90)

    if (yieldFilter === 'standard') result = result.filter((p) => p.dailyRoi <= 5)
    else if (yieldFilter === 'high') result = result.filter((p) => p.dailyRoi > 5)

    result.sort((a, b) => {
      let diff = 0
      if (sortKey === 'apr') diff = a.dailyRoi - b.dailyRoi
      else if (sortKey === 'duration') diff = a.durationDays - b.durationDays
      else if (sortKey === 'min') diff = a.minAmount - b.minAmount
      return sortAsc ? diff : -diff
    })
    return result
  }, [plans, search, durationFilter, yieldFilter, sortKey, sortAsc])

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(false) }
  }

  const SortIcon = ({ k }: { k: typeof sortKey }) =>
    sortKey === k ? (
      sortAsc ? <ChevronUp className="h-3.5 w-3.5 inline ml-1" /> : <ChevronDown className="h-3.5 w-3.5 inline ml-1" />
    ) : <ChevronDown className="h-3.5 w-3.5 inline ml-1 opacity-30" />

  return (
    <>
      {/* ── Sign-in prompt for guests ── */}
      {!isLoggedIn && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-4">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Lock className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Create a free account</strong> to view plan rates, run earnings calculations, and start staking your crypto.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link href="/login">
              <Button variant="secondary" size="sm" className="font-semibold">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm" className="font-semibold gap-1.5">
                <ArrowRight className="h-3.5 w-3.5" /> Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* ── Live activity ticker ── */}
      {activityFeed.length > 0 && (() => {
        const ev = activityFeed[activityIdx]
        return (
          <div className={`mb-6 flex items-center gap-2.5 rounded-xl border border-green-500/20 bg-green-500/8 px-4 py-2.5 text-xs transition-opacity duration-300 ${activityVisible ? 'opacity-100' : 'opacity-0'}`}>
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-muted-foreground">
              <strong className="text-white">{ev.name}</strong> from {ev.city} just staked{' '}
              <strong className="text-green-400">{formatCurrency(ev.amount)}</strong> with the{' '}
              <strong className="text-white">{ev.plan}</strong> plan
            </span>
            <span className="ml-auto flex-shrink-0 text-muted-foreground/60">{ev.minsAgo}m ago</span>
          </div>
        )
      })()}

      {/* ── Earnings Calculator ── */}
      <section className="mb-10 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card overflow-hidden">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-4 w-4 text-primary" />
            <p className="text-sm font-bold text-primary uppercase tracking-widest">Earnings Calculator</p>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Enter any amount to instantly see your projected daily earnings, total profit, and which plan you qualify for.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">$</span>
              <input
                type="number"
                min={0}
                placeholder="e.g. 5000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(e.target.value)}
                className="w-full rounded-xl border border-primary/30 bg-background/80 pl-8 pr-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
            {calcResult && !calcResult.tooLow && (
              isLoggedIn ? (
                <Link href={`/plan/stake?planId=${calcResult.plan.id}`}>
                  <Button variant="gradient" className="h-full font-semibold gap-2 whitespace-nowrap">
                    Stake with {calcResult.plan.name} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button variant="gradient" className="h-full font-semibold gap-2 whitespace-nowrap">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Results */}
          {calcResult && (
            <div className="mt-4">
              {calcResult.tooLow ? (
                <div className="rounded-xl border border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400 flex items-center gap-2">
                  <Zap className="h-4 w-4 flex-shrink-0" />
                  Minimum deposit is {formatCurrency(calcResult.plan.minAmount)}. Add more to unlock the <strong>{calcResult.plan.name}</strong> and start earning daily returns.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Matched Plan</p>
                    <p className="font-bold text-sm text-primary truncate">{calcResult.plan.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{calcResult.plan.durationDays}d · {calcResult.plan.dailyRoi}%/day</p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Daily Earnings</p>
                    <p className="font-bold text-lg text-green-400">+{formatCurrency(calcResult.dailyEarning)}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">per day, credited</p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Total Profit</p>
                    <p className="font-bold text-lg gradient-text">+{formatCurrency(calcResult.totalEarning)}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">over {calcResult.plan.durationDays} days</p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Total Payout</p>
                    <p className="font-bold text-lg text-white">{formatCurrency(calcResult.totalPayout)}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">principal + profit</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured "hot" mini-cards row ── */}
      {featuredPlans.length > 0 && (
        <section className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-border" />
            Featured Plans
            <span className="h-px flex-1 bg-border" />
          </p>
          <div className="overflow-x-auto -mx-1 pb-2">
            <div className="flex gap-3 px-1" style={{ minWidth: 'max-content' }}>
              {featuredPlans.map((plan) => {
                const apr = (plan.dailyRoi * 365).toFixed(2)
                return (
                  <div
                    key={plan.id}
                    className="w-48 rounded-xl border border-primary/30 bg-gradient-to-b from-primary/10 to-card p-4 flex-shrink-0 cursor-pointer hover:border-primary/60 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/30">
                        {plan.iconUrl ? (
                          <SafeImg src={plan.iconUrl} alt={plan.name} className="h-5 w-5 rounded-full" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight truncate w-28">{plan.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {plan.durationDays <= 30 ? 'Flexible' : 'Fixed'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Est. APR</p>
                    <p className="text-xl font-bold gradient-text">{apr}%</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search plans…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary/60 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/50 focus:bg-secondary transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {DURATION_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setDurationFilter(f.value)}
              className={cn(
                'rounded-xl px-3 py-2 text-xs font-medium border transition-colors',
                durationFilter === f.value
                  ? 'bg-primary/10 border-primary/40 text-primary'
                  : 'bg-secondary/60 border-border text-muted-foreground hover:border-primary/30'
              )}
            >
              {f.label}
            </button>
          ))}
          <div className="hidden sm:block h-4 border-l border-border self-center mx-1" />
          {YIELD_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setYieldFilter(f.value)}
              className={cn(
                'rounded-xl px-3 py-2 text-xs font-medium border transition-colors',
                yieldFilter === f.value
                  ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
                  : 'bg-secondary/60 border-border text-muted-foreground hover:border-yellow-500/30'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count ── */}
      <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
        <Filter className="h-3 w-3" />
        {filtered.length} plan{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* ── Table header ── */}
      <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground border-b border-border mb-2">
        <span>Plan</span>
        <button className="text-left hover:text-foreground transition-colors" onClick={() => handleSort('apr')}>
          Est. APR <SortIcon k="apr" />
        </button>
        <button className="text-left hover:text-foreground transition-colors" onClick={() => handleSort('duration')}>
          Duration <SortIcon k="duration" />
        </button>
        <button className="text-left hover:text-foreground transition-colors" onClick={() => handleSort('min')}>
          Min Stake <SortIcon k="min" />
        </button>
        <span>Action</span>
      </div>

      {/* ── Table rows ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No plans match your filters.
        </div>
      ) : (
        <div className="space-y-1 mb-10">
          {filtered.map((plan) => {
            const apr = (plan.dailyRoi * 365).toFixed(2)
            const aprMin = (plan.dailyRoi * 365 * 0.6).toFixed(2)
            const isExpanded = expandedId === plan.id

            return (
              <div key={plan.id} className={cn(
                'rounded-xl border transition-colors',
                isExpanded ? 'border-primary/30 bg-primary/5' : 'border-border bg-card hover:border-primary/20 hover:bg-secondary/30'
              )}>
                {/* Row */}
                <div
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 items-center px-4 py-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : plan.id)}
                >
                  {/* Plan name */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full',
                      plan.isFeatured ? 'bg-primary/20 ring-1 ring-primary/30' : 'bg-secondary'
                    )}>
                      {plan.iconUrl ? (
                        <SafeImg src={plan.iconUrl} alt={plan.name} className="h-5 w-5 rounded-full" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{plan.name}</p>
                      <p className="text-[11px] text-muted-foreground">{plan.durationDays <= 30 ? 'Flexible' : 'Fixed'}</p>
                    </div>
                    {plan.isFeatured && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-md">
                        🔥 Hot
                      </span>
                    )}
                  </div>

                  {/* APR */}
                  <div className="hidden md:block">
                    {isLoggedIn ? (
                      <>
                        <span className="font-bold text-primary">{aprMin}%</span>
                        <span className="text-muted-foreground text-sm"> ~ </span>
                        <span className="font-bold gradient-text">{apr}%</span>
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Lock className="h-3.5 w-3.5" /> Members only
                      </span>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="hidden md:flex items-center gap-1.5 text-sm">
                    {plan.durationDays <= 30 ? (
                      <span>Flexible / {plan.durationDays}d</span>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{plan.durationDays} Days</span>
                      </>
                    )}
                  </div>

                  {/* Min Stake */}
                  <div className="hidden md:block text-sm font-medium">
                    {formatCurrency(plan.minAmount)}
                  </div>

                  {/* CTA */}
                  <div className="hidden md:block" onClick={(e) => e.stopPropagation()}>
                    {isLoggedIn ? (
                      <Link href={`/plan/stake?planId=${plan.id}`}>
                        <Button variant={plan.isFeatured ? 'gradient' : 'secondary'} size="sm" className="font-semibold">
                          Stake Now
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/signup">
                        <Button variant={plan.isFeatured ? 'gradient' : 'secondary'} size="sm" className="font-semibold">
                          Get Started
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Mobile expand icon */}
                  <div className="md:hidden flex flex-col items-end gap-1">
                    {isLoggedIn ? (
                      <>
                        <span className="font-bold gradient-text text-sm">{apr}%</span>
                        <span className="text-[10px] text-muted-foreground">APR</span>
                      </>
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground mb-1" />
                    )}
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-border px-4 py-4">
                    {isLoggedIn ? (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Daily ROI</p>
                            <p className="font-bold text-primary">{plan.dailyRoi}%</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Total ROI</p>
                            <p className="font-bold text-green-500">{plan.totalRoi}%</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Min Stake</p>
                            <p className="font-bold">{formatCurrency(plan.minAmount)}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1">Daily Earn</p>
                            <p className="font-bold text-primary">+{formatCurrency((plan.minAmount * plan.dailyRoi) / 100)}/day</p>
                          </div>
                        </div>
                        {plan.description && (
                          <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                        )}

                        {/* Per-plan quick calculator */}
                        <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5">
                            <Calculator className="h-3.5 w-3.5" /> Quick Earnings Estimate
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 mb-3">
                            <div className="relative flex-1">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                              <input
                                type="number"
                                min={plan.minAmount}
                                max={plan.maxAmount ?? undefined}
                                placeholder={`Min ${formatCurrency(plan.minAmount)}`}
                                value={planCalcAmounts[plan.id] ?? ''}
                                onChange={(e) =>
                                  setPlanCalcAmounts((prev) => ({ ...prev, [plan.id]: e.target.value }))
                                }
                                className="w-full rounded-lg border border-border bg-background/80 pl-7 pr-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
                              />
                            </div>
                          </div>
                          {(() => {
                            const r = getPlanCalcResult(plan, planCalcAmounts[plan.id] ?? '')
                            if (!r) return (
                              <p className="text-[11px] text-muted-foreground">
                                Enter an amount ≥ {formatCurrency(plan.minAmount)} to see your projected earnings.
                              </p>
                            )
                            return (
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <p className="text-[10px] text-muted-foreground mb-0.5">Daily Earnings</p>
                                  <p className="font-bold text-green-400 text-sm">+{formatCurrency(r.dailyEarning)}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-muted-foreground mb-0.5">Total Profit</p>
                                  <p className="font-bold gradient-text text-sm">+{formatCurrency(r.totalEarning)}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-muted-foreground mb-0.5">Total Payout</p>
                                  <p className="font-bold text-white text-sm">{formatCurrency(r.totalPayout)}</p>
                                </div>
                              </div>
                            )
                          })()}
                        </div>

                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <Link href={`/plan/stake?planId=${plan.id}`}>
                            <Button variant={plan.isFeatured ? 'gradient' : 'secondary'} size="sm" className="font-semibold gap-2">
                              Stake Now
                            </Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex-1">
                          {plan.description && (
                            <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Lock className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>Rate details, earnings calculator and staking access are available to members.</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Link href="/login">
                            <Button variant="secondary" size="sm" className="font-semibold">Sign In</Button>
                          </Link>
                          <Link href="/signup">
                            <Button variant={plan.isFeatured ? 'gradient' : 'secondary'} size="sm" className="font-semibold">
                              Create Account
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
