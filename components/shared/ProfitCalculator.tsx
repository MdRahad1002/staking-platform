'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Calculator, DollarSign, Calendar, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PLANS = [
  { label: 'Starter',  dailyRoi: 1.0,  color: 'from-blue-500/20 to-blue-600/20',    border: 'border-blue-500/40',    activeBg: 'bg-blue-500/20 border-blue-500/50 text-blue-300',   inactiveBg: 'bg-white/[0.03] border-white/10 text-muted-foreground', glow: 'bg-blue-500'    },
  { label: 'Growth',   dailyRoi: 2.0,  color: 'from-amber-500/20 to-amber-600/20',     border: 'border-amber-500/40',    activeBg: 'bg-amber-500/20 border-amber-500/50 text-amber-300',   inactiveBg: 'bg-white/[0.03] border-white/10 text-muted-foreground', glow: 'bg-amber-500'    },
  { label: 'Premium',  dailyRoi: 3.0,  color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/40',  activeBg: 'bg-purple-500/20 border-purple-500/50 text-purple-300', inactiveBg: 'bg-white/[0.03] border-white/10 text-muted-foreground', glow: 'bg-purple-500' },
  { label: 'Elite',    dailyRoi: 5.0,  color: 'from-orange-500/20 to-pink-500/20',   border: 'border-orange-500/40',  activeBg: 'bg-orange-500/20 border-orange-500/50 text-orange-300', inactiveBg: 'bg-white/[0.03] border-white/10 text-muted-foreground', glow: 'bg-orange-500' },
]

const DURATIONS = [
  { label: '30 Days',  days: 30 },
  { label: '60 Days',  days: 60 },
  { label: '90 Days',  days: 90 },
  { label: '180 Days', days: 180 },
]

const MIN = 500
const MAX = 100000
const STEP = 500

function fmt(n: number) {
  return n >= 1000
    ? '$' + (n >= 1_000_000 ? (n / 1_000_000).toFixed(2) + 'M' : n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }))
    : '$' + n.toFixed(2)
}

function fmtFull(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ProfitCalculator() {
  const [amount, setAmount] = useState(5000)
  const [planIdx, setPlanIdx] = useState(1)
  const [durationIdx, setDurationIdx] = useState(0)

  const plan = PLANS[planIdx]
  const duration = DURATIONS[durationIdx]

  const calc = useMemo(() => {
    const daily   = (amount * plan.dailyRoi) / 100
    const total   = daily * duration.days
    const weekly  = daily * 7
    const monthly = daily * 30
    const back    = amount + total
    const roiPct  = (total / amount) * 100
    return { daily, weekly, monthly, total, back, roiPct }
  }, [amount, plan, duration])

  const sliderPct = ((amount - MIN) / (MAX - MIN)) * 100

  return (
    <section className="py-20 relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 hero-grid opacity-[0.06]" />
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${plan.glow}`}
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Profit Calculator</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            See Your <span className="gradient-text">Earnings</span> in Real-Time
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Adjust the sliders to instantly see how much you can earn on StakeOnix.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden border-white/10">
            <div className="grid lg:grid-cols-[1fr_auto_1fr] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">

              {/* ── LEFT: Controls ── */}
              <div className="p-7 space-y-7">

                {/* Plan selector */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Select Plan</p>
                  <div className="grid grid-cols-4 gap-2">
                    {PLANS.map((p, i) => (
                      <button
                        key={p.label}
                        onClick={() => setPlanIdx(i)}
                        className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all duration-200 focus:outline-none ${
                          i === planIdx ? p.activeBg : p.inactiveBg + ' hover:border-white/20 hover:text-foreground'
                        }`}
                      >
                        {p.label}
                        <div className="text-[10px] font-bold mt-0.5 opacity-75">{p.dailyRoi}%/d</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Investment Amount</p>
                    <span className="text-lg font-black text-white">{fmt(amount)}</span>
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="range"
                      min={MIN}
                      max={MAX}
                      step={STEP}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        backgroundImage: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${sliderPct}%, rgba(255,255,255,0.1) ${sliderPct}%, rgba(255,255,255,0.1) 100%)`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{fmt(MIN)}</span>
                    <span>{fmt(MAX / 2)}</span>
                    <span>{fmt(MAX)}</span>
                  </div>

                  {/* Quick amounts */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[500, 1000, 5000, 10000, 25000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v)}
                        className={`px-3 py-1 rounded-lg text-xs border transition-all duration-150 ${
                          amount === v
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground'
                        }`}
                      >
                        {fmt(v)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration selector */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Duration</p>
                  <div className="grid grid-cols-4 gap-2">
                    {DURATIONS.map((d, i) => (
                      <button
                        key={d.label}
                        onClick={() => setDurationIdx(i)}
                        className={`py-2 rounded-xl border text-xs font-semibold transition-all duration-200 focus:outline-none ${
                          i === durationIdx
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                            : 'bg-white/[0.03] border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── DIVIDER (mobile) ── */}
              <div className="hidden lg:flex items-center justify-center px-0 w-px" />

              {/* ── RIGHT: Results ── */}
              <div className="p-7 flex flex-col gap-5 justify-between">

                {/* Top summary row */}
                <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 p-5 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Profit After {duration.days} Days</p>
                  <p className="text-4xl md:text-5xl font-black text-white mt-1">{fmtFull(calc.total)}</p>
                  <div className="inline-flex items-center gap-1 mt-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-xs font-bold text-green-400">+{calc.roiPct.toFixed(1)}% ROI</span>
                  </div>
                </div>

                {/* Breakdown grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: Zap,         label: 'Daily Profit',   value: fmtFull(calc.daily),   color: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
                    { Icon: Calendar,    label: 'Weekly Profit',  value: fmtFull(calc.weekly),  color: 'text-purple-400',  bg: 'bg-purple-500/10 border-purple-500/20' },
                    { Icon: TrendingUp,  label: 'Monthly Profit', value: fmtFull(calc.monthly), color: 'text-amber-400',    bg: 'bg-amber-500/10 border-amber-500/20' },
                    { Icon: DollarSign,  label: 'Total Return',   value: fmtFull(calc.back),    color: 'text-green-400',   bg: 'bg-green-500/10 border-green-500/20' },
                  ].map(({ Icon, label, value, color, bg }) => (
                    <div key={label} className={`rounded-xl border p-3.5 ${bg}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon className={`h-3.5 w-3.5 ${color}`} />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">{label}</span>
                      </div>
                      <p className={`text-base font-black ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar: principal vs profit */}
                <div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                    <span>Principal: {fmtFull(amount)}</span>
                    <span>Profit: {fmtFull(calc.total)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-green-400 transition-all duration-500"
                      style={{ width: `${Math.min((calc.total / calc.back) * 100, 100).toFixed(1)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">
                    Profit is {((calc.total / calc.back) * 100).toFixed(1)}% of total return
                  </p>
                </div>

                {/* CTA */}
                <Link href="/signup" className="block">
                  <Button
                    size="lg"
                    className="w-full gap-2 font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-0 rounded-xl text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Calculator className="h-4 w-4" />
                    Start Earning {fmtFull(calc.daily)}/Day
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>

                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  Estimates are based on selected plan parameters. Past performance is indicative but not a guarantee of future returns.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Slider thumb style */}
      <style jsx global>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          border: 3px solid #0e1628;
          box-shadow: 0 0 0 3px rgba(245,158,11,0.25);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(245,158,11,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          border: 3px solid #0e1628;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
