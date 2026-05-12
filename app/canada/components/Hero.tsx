import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, ShieldCheck, BarChart3, Coins, TrendingUp, Users, Clock } from 'lucide-react'
import { CTA_HREF, yields } from '../data'

const trustBadges = [
  { label: 'FINTRAC Registered', icon: ShieldCheck, href: 'https://www.fintrac-canafe.gc.ca/re-en' },
  { label: 'FINTRAC BN 820033090', icon: CheckCircle2, href: 'https://www.fintrac-canafe.gc.ca/re-en' },
  { label: '95% Cold Storage', icon: BarChart3, href: '#security' },
]

const CDN = 'https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color'

function TokenLogo({ symbol, priority = false }: { symbol: string; priority?: boolean }) {
  return (
    <div
      className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/10"
      aria-hidden="true"
    >
      <Image
        src={`${CDN}/${symbol}.svg`}
        alt={symbol.toUpperCase()}
        width={32}
        height={32}
        className="h-8 w-8"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        unoptimized
      />
    </div>
  )
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A1628]"
      aria-labelledby="hero-headline"
    >
      {/* Background mesh gradient — hidden on mobile to save GPU */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00C896]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0077B6]/10 blur-[100px]" />
        {/* Subtle geometric grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            {/* Urgency eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C896] animate-pulse" aria-hidden="true" />
              <span className="text-[#00C896] text-xs font-semibold tracking-wide uppercase">
                6,200+ Canadians already earning daily
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.1] tracking-tight mb-5"
            >
              Your crypto is sitting idle.{' '}
              <span className="text-[#00C896]">Start earning today.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-6 max-w-xl">
              Start with as little as <strong className="text-white">$200 USD</strong>. Earn up to{' '}
              <strong className="text-[#00C896]">16.5% APY</strong> daily on ETH, SOL, ADA and DOT.
              Canada&apos;s only FINTRAC-registered staking platform.
            </p>

            {/* Daily earnings highlight */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Min. deposit', value: '$200 USD', icon: TrendingUp },
                { label: 'Daily payouts', value: 'Every day', icon: Clock },
                { label: 'Active stakers', value: '6,200+', icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl bg-white/[0.05] border border-white/10 px-3 py-3 text-center">
                  <Icon className="h-4 w-4 text-[#00C896] mx-auto mb-1" aria-hidden="true" />
                  <p className="text-white font-bold text-sm">{value}</p>
                  <p className="text-white/40 text-[11px]">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Link
                href={CTA_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-bold text-base px-8 py-4 transition-all duration-200 hover:shadow-xl hover:shadow-[#00C896]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] shadow-lg shadow-[#00C896]/20"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#yields"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#00C896] text-base font-medium transition-colors"
              >
                See live yields
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Micro-copy trust */}
            <p className="text-white/40 text-xs mb-10">Free to sign up &bull; No hidden fees &bull; Withdraw anytime</p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:border-[#00C896]/40 hover:bg-[#00C896]/5 px-4 py-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="h-3.5 w-3.5 text-[#00C896]" aria-hidden="true" />
                  <span className="text-xs font-semibold text-white/80">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: live APY tickers */}
          <div aria-label="Live staking yields">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-[#00C896]" aria-hidden="true" />
                  <span className="text-white/60 text-sm font-medium">Today&apos;s Yields</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#00C896] font-semibold bg-[#00C896]/10 px-2 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00C896] animate-pulse" aria-hidden="true" />
                  Paid daily
                </span>
              </div>

              <div className="space-y-3">
                {yields.map((y, idx) => {
                  const daily = ((y.apyValue / 100) / 365 * 200).toFixed(2)
                  return (
                    <div
                      key={y.network}
                      className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00C896]/30 hover:bg-[#00C896]/5 transition-all duration-200 px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <TokenLogo symbol={y.logoSymbol} priority={idx === 0} />
                        <div>
                          <p className="text-white font-semibold text-sm">{y.token}</p>
                          <p className="text-white/40 text-xs">~${daily}/day on $200</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00C896] font-bold text-xl tabular-nums">{y.apy}</p>
                        <p className="text-white/40 text-xs">APY</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA inside card */}
              <Link
                href={CTA_HREF}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-bold text-sm py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#00C896]/25 shadow-md shadow-[#00C896]/20"
              >
                Open Account: Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-3 text-center text-white/30 text-xs">
                Min. $200 USD &bull; Rewards paid daily &bull; Withdraw anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
