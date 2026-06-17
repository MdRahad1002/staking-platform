'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calculator as CalcIcon, TrendingUp, Repeat, ArrowRight, Info } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

// Illustrative example durations only. Actual plan rates are shown after sign-up;
// these sample rates are not an offer or a representation of returns.
const PRESETS = [
  { label: '7 days', days: 7, daily: 0.8 },
  { label: '14 days', days: 14, daily: 1.0 },
  { label: '30 days', days: 30, daily: 1.2 },
  { label: '90 days', days: 90, daily: 1.5 },
]

export function StakingCalculator() {
  const [amount, setAmount] = useState(1000)
  const [days, setDays] = useState(30)
  const [daily, setDaily] = useState(1.0)
  const [compound, setCompound] = useState(true)

  const result = useMemo(() => {
    const a = Math.max(0, amount || 0)
    const r = Math.max(0, daily || 0) / 100
    const d = Math.max(0, Math.round(days || 0))

    const simpleProfit = a * r * d
    let bal = a
    for (let i = 0; i < d; i++) bal += bal * r
    const compoundProfit = bal - a

    const profit = compound ? compoundProfit : simpleProfit
    const dailyEarning = a * r
    const totalPayout = a + profit
    const totalReturnPct = a > 0 ? (profit / a) * 100 : 0

    return { simpleProfit, compoundProfit, profit, dailyEarning, totalPayout, totalReturnPct }
  }, [amount, days, daily, compound])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inputs */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-7 space-y-6">
        <div className="flex items-center gap-2">
          <CalcIcon className="h-5 w-5 text-blue-400" />
          <h2 className="font-bold text-white">Staking calculator</h2>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Amount (USD)</label>
            <span className="text-sm font-bold text-blue-400 nums-tabular">{fmt(amount)}</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-bold">$</span>
            <input
              type="number" min={0} step={100} value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-9 h-13 py-3 text-lg font-bold rounded-xl border border-white/10 bg-white/[0.03] text-white focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <input type="range" min={200} max={50000} step={100} value={Math.min(amount, 50000)} onChange={(e) => setAmount(parseInt(e.target.value))} className="w-full accent-blue-500" />
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Example plan</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = p.days === days && p.daily === daily
              return (
                <button
                  key={p.label} type="button"
                  onClick={() => { setDays(p.days); setDaily(p.daily) }}
                  className={cn('rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors',
                    active ? 'border-blue-500 bg-blue-500/15 text-blue-300' : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:border-blue-500/30')}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Daily rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Daily rate</label>
            <span className="text-sm font-bold text-blue-400 nums-tabular">{daily.toFixed(2)}% / day</span>
          </div>
          <input type="range" min={0.2} max={2} step={0.1} value={daily} onChange={(e) => setDaily(parseFloat(e.target.value))} className="w-full accent-blue-500" />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Duration</label>
            <span className="text-sm font-bold text-blue-400 nums-tabular">{days} days</span>
          </div>
          <input type="range" min={7} max={365} step={1} value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="w-full accent-blue-500" />
        </div>

        {/* Compound toggle */}
        <button
          type="button" onClick={() => setCompound((v) => !v)}
          className={cn('w-full flex items-center justify-between rounded-xl border px-4 py-3 transition-colors',
            compound ? 'border-blue-500/40 bg-blue-500/[0.06]' : 'border-white/10 bg-white/[0.03]')}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-white"><Repeat className="h-4 w-4 text-blue-400" /> Auto-compound rewards</span>
          <span className={cn('relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full px-0.5 transition-colors', compound ? 'bg-blue-500' : 'bg-white/15')}>
            <span className={cn('h-5 w-5 rounded-full bg-white shadow-sm transition-transform', compound ? 'translate-x-5' : 'translate-x-0')} />
          </span>
        </button>
      </div>

      {/* Results */}
      <div className="glass-card rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-background p-6 md:p-7 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h2 className="font-bold text-white">Your projection</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-black/20 border border-white/5 px-4 py-3">
            <p className="text-[10px] text-muted-foreground mb-1">Daily earnings</p>
            <p className="font-black text-lg text-green-400 nums-tabular">{fmt(result.dailyEarning)}</p>
          </div>
          <div className="rounded-xl bg-black/20 border border-white/5 px-4 py-3">
            <p className="text-[10px] text-muted-foreground mb-1">Total profit</p>
            <p className="font-black text-lg gradient-text nums-tabular">{fmt(result.profit)}</p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 px-4 py-4 mb-4">
          <p className="text-[10px] text-muted-foreground mb-1">Total payout after {days} days</p>
          <p className="font-black text-3xl text-white nums-tabular">{fmt(result.totalPayout)}</p>
          <p className="text-xs text-blue-300 mt-1 nums-tabular">+{result.totalReturnPct.toFixed(1)}% total return</p>
        </div>

        {compound && result.compoundProfit > result.simpleProfit && (
          <div className="rounded-xl bg-green-500/[0.06] border border-green-500/20 px-4 py-3 mb-4 text-xs text-muted-foreground">
            <span className="text-green-400 font-bold nums-tabular">+{fmt(result.compoundProfit - result.simpleProfit)}</span> extra from compounding vs. cashing out daily.
          </div>
        )}

        <div className="mt-auto space-y-3">
          <Link href="/signup" className="block">
            <Button className="w-full gap-2 rounded-xl font-bold shine-sweep">
              Start staking from $200 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="text-[10px] text-muted-foreground/70 flex items-start gap-1.5">
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            Illustration only. Example rates are not an offer or guarantee. Actual plan rates are shown after sign-up. Rewards are variable; crypto values can fall.
          </p>
        </div>
      </div>
    </div>
  )
}
