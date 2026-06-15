'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Repeat, Wallet, SplitSquareHorizontal, Sparkles, RefreshCw, TrendingUp, Info } from 'lucide-react'

type Mode = 'OFF' | 'COMPOUND' | 'SPLIT'

const MODES: { value: Mode; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'OFF',
    title: 'Cash Out',
    desc: 'Every daily reward is credited straight to your balance. Nothing is reinvested.',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    value: 'COMPOUND',
    title: 'Auto-Compound',
    desc: 'Reinvest 100% of each reward back into the stake, so your daily earnings grow over time.',
    icon: <Repeat className="h-5 w-5" />,
  },
  {
    value: 'SPLIT',
    title: 'Split',
    desc: 'Reinvest part of each reward and take the rest as cash. You choose the ratio.',
    icon: <SplitSquareHorizontal className="h-5 w-5" />,
  },
]

export default function AutopilotPage() {
  const [mode, setMode] = useState<Mode>('OFF')
  const [compoundPercent, setCompoundPercent] = useState(50)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/autopilot')
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setMode(d.data.mode ?? 'OFF')
          setCompoundPercent(d.data.compoundPercent ?? 50)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/autopilot', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, compoundPercent }),
      })
      const data = await res.json()
      if (res.ok) toast.success('Autopilot settings saved.')
      else toast.error(data.error || 'Failed to save.')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  // Illustrative projection: $1,000 at 1%/day for 30 days, simple vs compounded share
  const example = (() => {
    const principal = 1000
    const dailyRoi = 1
    const days = 30
    const pct = mode === 'COMPOUND' ? 100 : mode === 'SPLIT' ? compoundPercent : 0
    let amount = principal
    let cash = 0
    for (let i = 0; i < days; i++) {
      const reward = (amount * dailyRoi) / 100
      const compoundPart = (reward * pct) / 100
      amount += compoundPart
      cash += reward - compoundPart
    }
    const finalValue = amount + cash
    const flat = principal + (principal * dailyRoi * days) / 100
    return { finalValue, flat, gain: finalValue - flat }
  })()

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/50 via-[#0a1020] to-background p-6 md:p-8">
        <div className="pointer-events-none absolute top-0 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-700/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <Sparkles className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Staking Autopilot</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Decide automatically what happens to every daily reward across all your stakes.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-72 rounded-2xl bg-secondary/20 shimmer" />
      ) : (
        <>
          {/* Mode selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={cn(
                  'text-left rounded-2xl border p-4 transition-all',
                  mode === m.value
                    ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/30'
                    : 'border-border bg-card hover:border-blue-500/30'
                )}
              >
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl mb-3', mode === m.value ? 'bg-blue-500/20 text-blue-400' : 'bg-secondary text-muted-foreground')}>
                  {m.icon}
                </div>
                <p className="font-bold text-sm text-foreground">{m.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
              </button>
            ))}
          </div>

          {/* Split ratio control */}
          {mode === 'SPLIT' && (
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Reinvest share</Label>
                <span className="text-sm font-black text-blue-400 nums-tabular">{compoundPercent}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={compoundPercent}
                onChange={(e) => setCompoundPercent(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Reinvest {compoundPercent}% into your stakes</span>
                <span>Cash out {100 - compoundPercent}%</span>
              </div>
            </div>
          )}

          {/* Projection */}
          <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-950/20 to-background p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-green-400">Illustrative Outcome</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Example: $1,000 staked at 1%/day for 30 days under your selected mode.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-black/20 border border-white/5 px-4 py-3">
                <p className="text-[10px] text-muted-foreground mb-1">Final value</p>
                <p className="font-black text-lg text-white nums-tabular">${example.finalValue.toFixed(2)}</p>
              </div>
              <div className="rounded-xl bg-black/20 border border-green-500/10 px-4 py-3">
                <p className="text-[10px] text-muted-foreground mb-1">vs. plain cash-out</p>
                <p className="font-black text-lg text-green-400 nums-tabular">
                  {example.gain >= 0 ? '+' : ''}${example.gain.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground/70 mt-3 flex items-start gap-1.5">
              <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
              Illustration only. Actual rewards are variable and not guaranteed. Compounding applies to
              new daily rewards while a stake is active.
            </p>
          </div>

          <Button
            onClick={save}
            loading={saving}
            variant="gradient"
            className="w-full gap-2 h-12 rounded-xl font-bold"
          >
            <RefreshCw className="h-4 w-4" /> Save Autopilot Settings
          </Button>
        </>
      )}
    </div>
  )
}
