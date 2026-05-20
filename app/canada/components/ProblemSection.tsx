import Link from 'next/link'
import { ArrowRight, TrendingDown, TrendingUp, Clock, Building2 } from 'lucide-react'
import { CTA_HREF } from '../data'

const painPoints = [
  {
    icon: TrendingDown,
    title: 'GIC rates are falling',
    body: 'The Bank of Canada is expected to cut rates on June 10. Your 1-year GIC renewing this year will earn even less than the already-disappointing 3.5–4.5% you got before.',
    iconStyle: 'text-red-500',
    cardBg: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100',
  },
  {
    icon: Clock,
    title: 'Your money is locked — theirs isn\'t',
    body: 'GICs lock your capital for months or years. Big institutions like Tether just bought $679M in Bitcoin today. They\'re not locking their money in a GIC.',
    iconStyle: 'text-orange-500',
    cardBg: 'bg-orange-50 border-orange-100',
    iconBg: 'bg-orange-100',
  },
  {
    icon: Building2,
    title: 'Inflation still eats your returns',
    body: 'Canadian CPI is at 2.8%. A 3.8% GIC gives you a real return of under 1% before tax. After tax, you may be losing purchasing power.',
    iconStyle: 'text-amber-600',
    cardBg: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
  },
  {
    icon: TrendingUp,
    title: 'Bitcoin just hit $106K CAD',
    body: 'Staking lets you earn yield on crypto you already hold or buy — without trying to time the market. Daily rewards, compounding automatically.',
    iconStyle: 'text-emerald-600',
    cardBg: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-100',
  },
]

export function ProblemSection() {
  return (
    <section className="py-16 lg:py-28 bg-white" aria-labelledby="problem-headline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="text-center mb-5">
          <span className="inline-block rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            The Canadian Savings Problem
          </span>
        </div>

        {/* Headline */}
        <h2
          id="problem-headline"
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] text-center tracking-tight mb-6 max-w-3xl mx-auto leading-tight"
        >
          Your Bank is Winning.<br />
          <span className="text-red-500">You're Not.</span>
        </h2>

        {/* Copy block */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            Canadian banks collected record profits while paying savers 2–4% on GICs. Meanwhile, crypto staking yields have held at <strong className="text-emerald-600">8–16%</strong>.
          </p>
          <p className="text-slate-500 leading-relaxed">
            With the Bank of Canada likely cutting rates June 10, that gap is about to get even wider.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {painPoints.map(({ icon: Icon, title, body, iconStyle, cardBg, iconBg }) => (
            <div
              key={title}
              className={`rounded-2xl border p-5 sm:p-6 ${cardBg} transition-all duration-200 hover:shadow-md`}
            >
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl mb-4 ${iconBg}`}>
                <Icon className={`h-5 w-5 ${iconStyle}`} aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Side-by-side reality check */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden mb-10">
          <div className="grid grid-cols-2">
            <div className="p-6 border-r border-slate-200">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Your GIC (1-Year)</p>
              {[
                ['Annual yield', '3.5 – 4.5%'],
                ['Liquidity', 'Locked 12 months'],
                ['After inflation (2.8%)', '~0.7–1.7%'],
                ['After tax (33%)', '~0.5–1.1%'],
                ['Rate direction', '↓ Cutting June 10'],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-bold text-red-500">{val}</span>
                </div>
              ))}
            </div>
            <div className="p-6 bg-emerald-50">
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">StakeOnix (SOL)</p>
              {[
                ['Annual yield', '12%'],
                ['Liquidity', '2–3 days unbonding'],
                ['After inflation (2.8%)', '~9.2%'],
                ['Compounding', 'Daily rewards'],
                ['Rate direction', '↑ Crypto momentum'],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-emerald-100 last:border-0">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-xs font-bold text-emerald-600">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-emerald-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg"
          >
            Start Earning More Than Your GIC
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-xs text-slate-400">Free account · No lock-in required · Rewards variable, not guaranteed</p>
        </div>
      </div>
    </section>
  )
}


export function ProblemSection() {
  return (
    <section className="py-16 lg:py-28 bg-white" aria-labelledby="problem-headline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="text-center mb-5">
          <span className="inline-block rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            The real issue
          </span>
        </div>

        {/* Headline */}
        <h2
          id="problem-headline"
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0A1628] text-center tracking-tight mb-6 max-w-3xl mx-auto leading-tight"
        >
          Most People Look at Staking the Wrong Way
        </h2>

        {/* Copy block */}
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-4">
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            They focus on the reward percentage first.
          </p>
          <p className="text-slate-500 leading-relaxed">
            But before staking, the smarter questions are:
          </p>
        </div>

        {/* 5 smarter questions */}
        <ul className="max-w-xl mx-auto mb-10 space-y-3">
          {[
            'What asset are you using?',
            'How long is it locked?',
            'How are rewards generated?',
            'What risks apply?',
            'Does it actually fit your goal?',
          ].map((q) => (
            <li key={q} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5">
              <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
              <span className="text-slate-700 font-medium">{q}</span>
            </li>
          ))}
        </ul>

        <p className="text-center text-[#0A1628] font-semibold mb-14 max-w-xl mx-auto">
          That is what StakeOnix helps you review before you make a decision.
        </p>

        {/* Visual — problem vs solution image */}
        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg mb-12">
          <img
            src="/section-2.png"
            alt="Too much information vs Make confident decisions — how Stakeonix helps Canadians evaluate staking clearly"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Four check cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10">
          {checkCards.map(({ icon: Icon, title, question, iconStyle, cardBg, iconBg }) => (
            <div
              key={title}
              className={`rounded-2xl border p-4 sm:p-6 ${cardBg} transition-all duration-200 hover:shadow-md`}
            >
              <div className={`inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl mb-3 ${iconBg}`}>
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconStyle}`} aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A1628] mb-1.5">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{question}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#path"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors group"
          >
            See What To Check First
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
