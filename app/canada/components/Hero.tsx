import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Newspaper,
  Zap,
} from 'lucide-react'
import { CTA_HREF } from '../data'

// â”€â”€ GIC vs Staking comparison data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const comparison = [
  { label: 'Big Bank HISA',   rate: '2.0%',  color: 'text-red-500',     bar: 'w-[12%]',  bg: 'bg-red-200' },
  { label: '1-Year GIC',      rate: '3.8%',  color: 'text-orange-500',  bar: 'w-[23%]',  bg: 'bg-orange-200' },
  { label: 'StakeOnix (SOL)', rate: '12%',   color: 'text-emerald-500', bar: 'w-[73%]',  bg: 'bg-emerald-400' },
  { label: 'StakeOnix (DOT)', rate: '16.5%', color: 'text-emerald-600', bar: 'w-full',   bg: 'bg-emerald-500' },
]

// â”€â”€ Breaking news items â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const news = [
  { text: 'Tether buys SoftBank\'s $679M Bitcoin stake â€” Bloomberg, May 20' },
  { text: 'Bitcoin crosses $106,000 CAD â€” new all-time high in Canadian dollars' },
  { text: 'Bank of Canada inflation below forecast â€” rate cut expected June 10' },
]

export function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
      aria-labelledby="hero-headline"
    >
      {/* Hero background */}
      <div className="absolute inset-0">
        <Image src="/hero-mobile.png" alt="" fill priority className="object-cover object-top md:hidden" />
        <Image src="/hero-background.png" alt="" fill priority className="hidden md:block object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/30 via-[#060d1a]/60 to-[#060d1a]/95 md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#060d1a]/92 via-[#060d1a]/70 to-[#060d1a]/40" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Breaking news ticker */}
      <div className="relative z-10 bg-[#0A1628]/80 border-b border-white/10 backdrop-blur-sm py-2 overflow-hidden">
        <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
          <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
            <Newspaper className="h-2.5 w-2.5" />
            LIVE
          </span>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-12 animate-ticker whitespace-nowrap">
              {[...news, ...news].map((n, i) => (
                <span key={i} className="text-white/70 text-xs font-medium flex-shrink-0">
                  <span className="text-amber-400 mr-2">â–¶</span>{n.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 mb-5 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-white/80 flex-shrink-0" aria-hidden="true" />
              <span className="text-white text-xs font-semibold">FINTRAC Registered Â· Canadian Company</span>
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
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-3 max-w-xl">
              Bitcoin just crossed <strong className="text-amber-400">$106,000 CAD</strong>. Tether bought a $679M Bitcoin stake today. The Bank of Canada is expected to cut rates June 10 â€” making your GIC even less competitive.
            </p>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-7 max-w-xl">
              While your bank pays 3.5%, Canadians on StakeOnix are earning up to <strong className="text-emerald-400">16.5% APY</strong> â€” daily, with no long lock-ins.
            </p>

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

            {/* Trust line */}
            <div className="flex flex-col gap-2">
              <p className="text-white/90 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                No lock-in required Â· Daily rewards Â· Setup in 2 minutes
              </p>
              <p className="text-white/50 text-xs leading-relaxed max-w-md">
                Risk disclosure: Staking involves risk. Rewards are variable and not guaranteed. Not financial advice.
              </p>
            </div>
          </div>

          {/* RIGHT: GIC vs Staking comparison card */}
          <div aria-label="GIC vs Staking yield comparison">
            <div className="bg-white/[0.07] backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-7">

              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">Annual Yield</p>
                  <h2 className="text-sm sm:text-base font-bold text-white">Your Bank vs. StakeOnix</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-red-300 font-semibold bg-red-500/20 border border-red-500/30 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                  BoC cuts rates June 10
                </span>
              </div>

              {/* Bars */}
              <div className="space-y-4 mb-5">
                {comparison.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white/70">{item.label}</span>
                      <span className={`text-sm font-bold ${item.color}`}>{item.rate}</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.bar} ${item.bg} rounded-full transition-all duration-700`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* $10K example */}
              <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 mb-5">
                <p className="text-xs font-semibold text-emerald-300 uppercase tracking-widest mb-2">$10,000 CAD over 12 months</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center rounded-lg bg-white/5 p-3">
                    <p className="text-[10px] text-white/40 mb-1">1-Year GIC</p>
                    <p className="text-lg font-bold text-orange-400">+$380</p>
                    <p className="text-[10px] text-white/30 mt-0.5">locked for 1 year</p>
                  </div>
                  <div className="text-center rounded-lg bg-emerald-500/20 border border-emerald-500/30 p-3">
                    <p className="text-[10px] text-emerald-300 mb-1">StakeOnix (SOL)</p>
                    <p className="text-lg font-bold text-emerald-400">+$1,200</p>
                    <p className="text-[10px] text-emerald-300/60 mt-0.5">daily rewards, no lock</p>
                  </div>
                </div>
              </div>

              {/* Bottom news badge */}
              <div className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <Newspaper className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                <p className="text-xs font-semibold text-[#0A1628] leading-tight">MSB Â· Canada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
