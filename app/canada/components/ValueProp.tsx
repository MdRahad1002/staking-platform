import Link from 'next/link'
import { ArrowRight, BookOpen, Coins, TrendingUp, Lock, AlertTriangle } from 'lucide-react'
import { CTA_HREF } from '../data'

const pillars = [
  {
    icon: BookOpen,
    title: 'What staking is',
    description: 'Understand the basic process in simple language.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    icon: Coins,
    title: 'Which assets can be staked',
    description: 'See how different crypto assets may have different staking structures.',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
  },
  {
    icon: TrendingUp,
    title: 'Reward logic',
    description: 'Learn how staking rewards may be generated and why they can change.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    icon: Lock,
    title: 'Lock periods and access',
    description: 'Understand whether your crypto may be locked and what that means.',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    icon: AlertTriangle,
    title: 'Risk considerations',
    description: 'Review the risks before deciding whether staking fits your situation.',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
  },
]

export function ValueProp() {
  return (
    <section className="py-16 lg:py-28 bg-white" aria-labelledby="value-headline">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="text-center mb-5">
          <span className="inline-block rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            What we do
          </span>
        </div>

        {/* Headline */}
        <h2
          id="value-headline"
          className="text-3xl sm:text-4xl font-bold text-[#0A1628] text-center tracking-tight mb-4"
        >
          What Stakeonix Helps You Understand
        </h2>

        <p className="text-center text-slate-500 text-lg mb-3 max-w-2xl mx-auto">
          Stakeonix is designed to make staking clearer for Canadians who want to learn before taking action.
        </p>
        <p className="text-center text-slate-400 mb-14 max-w-xl mx-auto">
          Instead of pushing you to start immediately, we help you understand the key points that matter.
        </p>

        {/* 5 pillars — 2 + 3 layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-12">
          {pillars.map(({ icon: Icon, title, description, iconColor, iconBg }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-200 p-6 group"
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
