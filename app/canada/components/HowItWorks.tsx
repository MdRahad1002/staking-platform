import Link from 'next/link'
import { UserCheck, Banknote, TrendingUp } from 'lucide-react'
import { CTA_HREF } from '../data'

const steps = [
  {
    number: '01',
    icon: UserCheck,
    headline: 'Sign up & verify',
    body: 'Quick KYC, takes about 5 minutes. Canadian ID accepted. Government-issued photo ID and a selfie — that\'s it.',
  },
  {
    number: '02',
    icon: Banknote,
    headline: 'Deposit CAD or crypto',
    body: 'Interac e-Transfer, domestic wire transfer, or send crypto directly from any self-custody wallet. CAD is converted at the mid-market rate.',
  },
  {
    number: '03',
    icon: TrendingUp,
    headline: 'Stake and earn',
    body: 'Choose a chain, stake any amount above the minimum, and watch rewards accrue daily in your dashboard. Unstake any time.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            id="how-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-4"
          >
            Start earning in three steps
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            From signup to staking rewards in under 10 minutes.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12" role="list">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-200 bg-white p-8 hover:border-[#00C896]/40 hover:shadow-lg hover:shadow-[#00C896]/5 transition-all duration-300 group"
                role="listitem"
              >
                {/* Connector line (desktop) */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-gray-200 to-gray-100 z-10"
                    aria-hidden="true"
                  />
                )}

                {/* Number */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-black text-gray-100 group-hover:text-[#00C896]/20 transition-colors select-none">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-[#00C896]/10 border border-[#00C896]/20 flex items-center justify-center mb-5 group-hover:bg-[#00C896]/15 transition-colors">
                  <Icon className="h-6 w-6 text-[#00C896]" aria-hidden="true" />
                </div>

                <h3 className="font-bold text-[#0A1628] text-xl mb-3">{step.headline}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{step.body}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold text-base px-8 py-4 transition-all duration-200 hover:shadow-lg hover:shadow-[#00C896]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2"
          >
            Start Staking →
          </Link>
        </div>
      </div>
    </section>
  )
}
