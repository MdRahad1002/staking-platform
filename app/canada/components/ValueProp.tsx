import Link from 'next/link'
import { ArrowRight, Wallet, Target, AlertTriangle, Clock } from 'lucide-react'
import { CTA_HREF } from '../data'

const pillars = [
  {
    icon: Wallet,
    title: 'Your Current Crypto Position',
    description: 'Are you already holding crypto or starting from scratch?',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Target,
    title: 'Your Goal',
    description: 'Are you learning, comparing options, or preparing to start?',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    icon: AlertTriangle,
    title: 'Your Risk Comfort',
    description: 'Do you understand that rewards are variable and not guaranteed?',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Clock,
    title: 'Your Time Horizon',
    description: 'Are you thinking short-term, long-term, or both?',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

export function ValueProp() {
  return (
    <section className="py-16 lg:py-28 bg-white" aria-labelledby="value-headline">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="text-center mb-5">
          <span className="inline-block rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            What we review
          </span>
        </div>

        {/* Headline */}
        <h2
          id="value-headline"
          className="text-3xl sm:text-4xl font-bold text-[#0A1628] text-center tracking-tight mb-4"
        >
          What We Review Before You Stake
        </h2>

        <p className="text-center text-slate-500 text-lg mb-3 max-w-2xl mx-auto">
          Staking is not one decision. It depends on your current crypto position, your goals, your risk comfort, and your time horizon.
        </p>
        <p className="text-center text-slate-400 mb-14 max-w-xl mx-auto">
          StakeOnix helps you look at the key points first.
        </p>

        {/* 4 review pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {pillars.map(({ icon: Icon, title, description, iconColor, iconBg, border }) => (
            <div
              key={title}
              className={`rounded-2xl border ${border} bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-200 p-6 group`}
            >
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl mb-4 ${iconBg} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#0A1628] mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1628] hover:bg-[#142035] text-white font-bold text-base px-9 py-4 transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-2"
          >
            Start My Staking Review
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-3 text-slate-400 text-sm">Takes less than 2 minutes. No obligation.</p>
        </div>
      </div>
    </section>
  )
}
