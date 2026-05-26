import Link from 'next/link'
import { UserCheck, Search, BarChart3, Activity } from 'lucide-react'
import { CTA_HREF } from '../data'

const steps = [
  {
    number: '01',
    icon: UserCheck,
    headline: 'Create your account',
    body: 'Quick sign-up and KYC verification. Takes about 5 minutes. Canadian government-issued photo ID accepted.',
  },
  {
    number: '02',
    icon: Search,
    headline: 'Verify your profile',
    body: 'Complete your identity verification so we can match you with options that fit your situation and comply with FINTRAC requirements.',
  },
  {
    number: '03',
    icon: BarChart3,
    headline: 'Compare staking options',
    body: 'Review available assets, lock periods, estimated reward rates, and risk levels side by side before committing to anything.',
  },
  {
    number: '04',
    icon: Activity,
    headline: 'Track your progress',
    body: 'Once you decide to proceed, monitor your staking activity, estimated rewards, and account status from your dashboard.',
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
            How StakeOnix Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A clear four-step process from creating your account to reviewing your options.
          </p>
        </div>

        {/* Visual 4-step process diagram */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg mb-12">
          <img
            src="/section-4.png"
            alt="Start Staking in 4 Simple Steps: Create Account, Verify Profile, Choose Staking Option, Track Progress"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12" role="list">
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
            Start My Staking Review →
          </Link>
        </div>
      </div>
    </section>
  )
}
