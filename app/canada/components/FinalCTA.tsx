import Link from 'next/link'
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Clock } from 'lucide-react'
import { CTA_HREF, COMPANY_NAME } from '../data'

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A1628] relative overflow-hidden" aria-labelledby="final-cta-heading">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
          <span className="text-red-300 text-xs font-semibold tracking-widest uppercase">Bank of Canada Rate Decision Â· June 10</span>
        </div>

        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4"
        >
          GIC Rates Are About to Drop.
          <br />
          <span className="text-emerald-400">Yours Don&apos;t Have To.</span>
        </h2>
        <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto">
          Bitcoin at <strong className="text-amber-400">$106,000 CAD</strong>. Tether buying billions. The smart money is moving. Open your free account and start earning today.
        </p>

        {/* Trust row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          {[
            { icon: Zap,         label: '2-min setup',        sub: 'Start earning today' },
            { icon: TrendingUp,  label: 'Up to 16.5% APY',    sub: 'Daily rewards paid out' },
            { icon: ShieldCheck, label: 'FINTRAC registered',  sub: 'Canadian regulated' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
              <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-white text-sm font-bold leading-snug">{label}</p>
              <p className="text-white/40 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <Link
          href={CTA_HREF}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xl px-12 py-5 transition-all duration-200 hover:shadow-2xl shadow-xl shadow-emerald-500/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
        >
          <Zap className="h-5 w-5" />
          Start Earning â€” Free Account
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="mt-4 text-white/40 text-sm">No lock-in required &bull; Takes less than 2 minutes &bull; Rewards are not guaranteed</p>

        <p className="mt-8 text-white/25 text-xs max-w-lg mx-auto">
          By signing up you agree to our{' '}
          <a href="/terms" className="underline hover:text-white/50 transition-colors">Terms of Service</a>{' '}
          and acknowledge our{' '}
          <a href="/risk-disclosure" className="underline hover:text-white/50 transition-colors">Risk Disclosure</a>.
          Staking involves risk. Rewards are variable and not guaranteed. {COMPANY_NAME} is FINTRAC registered.
        </p>
      </div>
    </section>
  )
}
