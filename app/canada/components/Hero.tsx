import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Zap } from 'lucide-react'
import { CTA_HREF } from '../data'
import { LossTickerBadge } from './LossTicker'

// â”€â”€ GIC vs Staking comparison data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const comparison = [
  { label: 'Big Bank HISA',   rate: '2.0%',  color: 'text-red-500',     bar: 'w-[12%]',  bg: 'bg-red-200' },
  { label: '1-Year GIC',      rate: '3.8%',  color: 'text-orange-500',  bar: 'w-[23%]',  bg: 'bg-orange-200' },
  { label: 'StakeOnix (SOL)', rate: '12%',   color: 'text-emerald-500', bar: 'w-[73%]',  bg: 'bg-emerald-400' },
  { label: 'StakeOnix (DOT)', rate: '16.5%', color: 'text-emerald-600', bar: 'w-full',   bg: 'bg-emerald-500' },
]

// â”€â”€ Breaking news items â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const mobileStats = [
  { value: '16.5%', label: 'APY staking' },
  { value: '6,200+', label: 'Canadians' },
  { value: 'Daily',  label: 'rewards' },
]

export function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden bg-[#060d1a]"
      style={{ minHeight: 'calc(100svh - 2.75rem)' }}
      aria-labelledby="hero-headline"
    >
      {/* Hero background */}
      <div className="absolute inset-0">
        <Image src="/hero-mobile.png" alt="" fill priority className="object-cover object-center md:hidden" />
        <Image src="/hero-background.png" alt="" fill priority className="hidden md:block object-cover object-center" />
      </div>
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/55 via-[#060d1a]/72 to-[#060d1a]/97 md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#060d1a]/95 via-[#060d1a]/75 to-[#060d1a]/25" />
      {/* Subtle dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'radial-gradient(#4a9eff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 lg:pt-20 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Copy ────────────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="inline-flex self-start items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 mb-5 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-emerald-300 text-xs font-semibold">FINTRAC Registered &middot; Canadian Company</span>
            </div>

            {/* H1 */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              Your GIC is About to Pay{' '}
              <span className="text-red-400">Even Less.</span>
              <br />
              <span className="text-emerald-400">Crypto Staking</span>{' '}
              Won&apos;t.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-5 max-w-xl">
              The Bank of Canada cuts rates June&nbsp;10. Your GIC pays 3.8%.
              Staking pays up to{' '}
              <strong className="text-emerald-400">16.5% APY</strong> &mdash; daily rewards, no lock&#8209;in.
            </p>

            {/* Mobile quick stats */}
            <div className="flex items-center gap-5 sm:gap-8 mb-5 lg:hidden">
              {mobileStats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-emerald-400 font-black text-xl leading-none">{s.value}</span>
                  <span className="text-white/40 text-[11px] mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Loss ticker badge */}
            <div className="mb-5">
              <LossTickerBadge />
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
              <Link
                href={CTA_HREF}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base px-7 py-4 transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Zap className="h-4 w-4" />
                Start Earning â€” Free Account
                <ArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              </Link>
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-4 transition-all duration-200 backdrop-blur-sm"
              >
                <TrendingUp className="h-4 w-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                See What You Could Earn
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-1.5">
              <p className="text-white/70 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                No lock&#8209;in &middot; Daily rewards &middot; Setup in 2 minutes
              </p>
              <p className="text-white/30 text-xs leading-relaxed max-w-md">
                Risk disclosure: Staking involves risk. Rewards are variable and not guaranteed. Not financial advice.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Comparison card (desktop only) ─────────────────── */}
          <div className="hidden lg:block relative" aria-label="GIC vs Staking yield comparison">
            {/* Card ambient glow */}
            <div className="absolute -inset-6 rounded-3xl bg-emerald-500/5 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-7 ring-1 ring-white/5">

              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-white/35 font-semibold uppercase tracking-widest mb-0.5">Annual Yield</p>
                  <h2 className="text-base font-bold text-white">Your Bank vs. StakeOnix</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-red-300 font-semibold bg-red-500/15 border border-red-500/25 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                  BoC cuts June 10
                </span>
              </div>

              {/* Bars */}
              <div className="space-y-4 mb-6">
                {comparison.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white/60">{item.label}</span>
                      <span className={`text-sm font-bold tabular-nums ${item.color}`}>{item.rate}</span>
                    </div>
                    <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
                      <div className={`h-full ${item.bar} ${item.bg} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* $10K example */}
              <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 p-4 mb-5">
                <p className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest mb-3">$10,000 CAD over 12 months</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center rounded-xl bg-white/5 border border-white/8 p-3">
                    <p className="text-[10px] text-white/35 mb-1.5">1-Year GIC</p>
                    <p className="text-xl font-black text-orange-400">+$380</p>
                    <p className="text-[10px] text-white/25 mt-1">locked 12 months</p>
                  </div>
                  <div className="text-center rounded-xl bg-emerald-500/15 border border-emerald-500/25 p-3">
                    <p className="text-[10px] text-emerald-400/80 mb-1.5">StakeOnix (SOL)</p>
                    <p className="text-xl font-black text-emerald-400">+$1,200</p>
                    <p className="text-[10px] text-emerald-400/50 mt-1">daily, no lock&#8209;in</p>
                  </div>
                </div>
              </div>

              {/* Bottom news badge */}
              <div className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <span className="text-amber-400 text-xs flex-shrink-0 mt-0.5" aria-hidden="true">&#9650;</span>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  <span className="text-amber-400 font-semibold">Bloomberg today:</span> Tether buys SoftBank&apos;s $679M Bitcoin stake â€” institutional confidence at an all-time high.
                </p>
              </div>
            </div>

            {/* Floating FINTRAC badge */}
            <div className="absolute -bottom-4 -left-4 hidden lg:flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-md px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-slate-400 leading-none">FINTRAC Registered</p>
                <p className="text-xs font-semibold text-[#0A1628] leading-tight">MSB &middot; Canada</p>
              </div>
            </div>
          </div>

          {/* ── Mobile comparison card ─────────────────────────────────── */}
          <div className="lg:hidden bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-white/45 uppercase tracking-widest">Annual Yield</p>
              <span className="text-[10px] text-red-300 font-semibold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">BoC cuts June 10</span>
            </div>
            <div className="space-y-3 mb-5">
              {comparison.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/45 w-28 flex-shrink-0">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${item.bar} ${item.bg} rounded-full`} />
                  </div>
                  <span className={`text-sm font-bold tabular-nums w-12 text-right flex-shrink-0 ${item.color}`}>{item.rate}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="text-center rounded-xl bg-white/5 p-3">
                <p className="text-[10px] text-white/35 mb-1">GIC on $10K / yr</p>
                <p className="text-2xl font-black text-orange-400">+$380</p>
                <p className="text-[10px] text-white/25 mt-0.5">locked in</p>
              </div>
              <div className="text-center rounded-xl bg-emerald-500/15 border border-emerald-500/25 p-3">
                <p className="text-[10px] text-emerald-400/80 mb-1">Staking on $10K / yr</p>
                <p className="text-2xl font-black text-emerald-400">+$1,200</p>
                <p className="text-[10px] text-emerald-400/50 mt-0.5">daily rewards</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

