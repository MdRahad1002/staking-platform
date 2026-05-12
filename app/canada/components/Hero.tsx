import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Lock,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import { CTA_HREF } from '../data'

// ── Mock dashboard data ────────────────────────────────────────────────────────
const dashboardOptions = [
  { asset: 'ETH', risk: 'Medium', lockPeriod: '3–5 days', color: '#627EEA' },
  { asset: 'SOL', risk: 'Low',    lockPeriod: '1–2 days', color: '#9945FF' },
  { asset: 'ADA', risk: 'Low',    lockPeriod: '5–7 days', color: '#0033AD' },
  { asset: 'DOT', risk: 'Medium', lockPeriod: '28 days',  color: '#E6007A' },
]

const riskStyle: Record<string, string> = {
  Low:    'text-emerald-700 bg-emerald-50 border border-emerald-100',
  Medium: 'text-amber-700  bg-amber-50   border border-amber-100',
  High:   'text-red-700    bg-red-50     border border-red-100',
}

export function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
      aria-labelledby="hero-headline"
    >
      {/* Hero background image — mobile: portrait photo (no zoom), desktop: wide photo */}
      <div className="absolute inset-0">
        {/* Mobile only */}
        <Image
          src="/hero-mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-top md:hidden"
        />
        {/* Desktop only */}
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          className="hidden md:block object-cover object-center"
        />
      </div>
      {/* Dark overlay — mobile: bottom-heavy so text over top is readable; desktop: left-heavy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a]/20 via-[#060d1a]/50 to-[#060d1a]/90 md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#060d1a]/90 via-[#060d1a]/65 to-[#060d1a]/40" />
      {/* Soft grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-blue-100/60 blur-[80px] hidden md:block" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-slate-200/50 blur-[60px] hidden md:block" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            {/* Eyebrow — clean, no long registry number on mobile */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 mb-5 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-white/80 flex-shrink-0" aria-hidden="true" />
              <span className="text-white text-xs font-semibold">
                FINTRAC Registered
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              Before You Stake Crypto,{' '}
              <span className="text-blue-400 md:bg-transparent md:px-0 md:py-0 bg-blue-900 px-2 py-0.5 rounded">Understand Your Options</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-7 max-w-xl">
              Stakeonix helps Canadians understand staking, compare available options, and see whether it fits their crypto goals before taking the next step.
            </p>

            {/* CTAs — full width on mobile */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
              <Link
                href={CTA_HREF}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1628] hover:bg-[#142035] text-white font-bold text-base px-7 py-4 transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-2"
              >
                Check My Staking Options
                <ArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-4 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <BookOpen className="h-4 w-4 text-blue-500 flex-shrink-0" aria-hidden="true" />
                Learn How Staking Works
              </a>
            </div>

            {/* Trust line */}
            <p className="text-white/90 text-sm mb-2 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              No hype. No guaranteed rewards. Just clarity before you decide.
            </p>

            {/* Risk disclaimer */}
            <p className="text-white/70 text-xs leading-relaxed max-w-md">
              <strong className="text-white/90">Risk disclosure:</strong>{' '}
              Staking involves risk. Rewards are not guaranteed and may change over time.
            </p>
          </div>

          {/* RIGHT: Clean mock dashboard */}
          <div aria-label="Staking options overview" className="relative">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-5 sm:p-6 lg:p-7">

              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-0.5">Stakeonix</p>
                  <h2 className="text-sm sm:text-base font-bold text-[#0A1628]">Your Staking Options</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  Live
                </span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">
                <span>Asset</span>
                <span className="text-center">Risk</span>
                <span className="text-right">Lock Period</span>
              </div>

              {/* Asset rows — show all 4 on desktop, 3 on mobile */}
              <div className="space-y-2 mb-4">
                {dashboardOptions.map((opt, i) => (
                  <div
                    key={opt.asset}
                    className={`grid grid-cols-3 items-center rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-colors px-3 py-2.5 ${i === 3 ? 'hidden sm:grid' : ''}`}
                  >
                    {/* Asset name */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: opt.color }}
                        aria-hidden="true"
                      >
                        {opt.asset[0]}
                      </div>
                      <span className="font-semibold text-sm text-[#0A1628]">{opt.asset}</span>
                    </div>

                    {/* Risk badge */}
                    <div className="text-center">
                      <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${riskStyle[opt.risk]}`}>
                        {opt.risk}
                      </span>
                    </div>

                    {/* Lock period */}
                    <div className="flex items-center justify-end gap-1">
                      <Lock className="h-3 w-3 text-slate-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-[11px] text-slate-500 font-medium">{opt.lockPeriod}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Learn',   href: '#how-it-works', icon: BookOpen,      style: 'text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100' },
                  { label: 'Compare', href: '#yields',        icon: TrendingUp,    style: 'text-indigo-600 bg-indigo-50 border-indigo-100 hover:bg-indigo-100' },
                  { label: 'Decide',  href: CTA_HREF,         icon: CheckCircle2,  style: 'text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-100' },
                ].map(({ label, href, icon: Icon, style }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-xs font-semibold transition-colors ${style}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>

              {/* Bottom disclaimer */}
              <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0" aria-hidden="true" />
                Staking involves risk. Not financial advice.
              </p>
            </div>

            {/* Floating trust badge — desktop only */}
            <div className="absolute -bottom-4 -left-4 hidden lg:flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-md px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-slate-400 leading-none">FINTRAC Registered</p>
                <p className="text-xs font-semibold text-[#0A1628] leading-tight">MSB · Canada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
