import { ArrowRight, DollarSign, Lock, AlertTriangle, Target } from 'lucide-react'

const checkCards = [
  {
    icon: DollarSign,
    title: 'Rewards',
    question: 'How are rewards generated?',
    iconStyle: 'text-blue-600',
    cardBg: 'bg-blue-50 border-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Lock,
    title: 'Lock Periods',
    question: 'Can you access your crypto when needed?',
    iconStyle: 'text-amber-600',
    cardBg: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
  },
  {
    icon: AlertTriangle,
    title: 'Risk',
    question: 'What could affect your assets or rewards?',
    iconStyle: 'text-red-500',
    cardBg: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-100',
  },
  {
    icon: Target,
    title: 'Fit',
    question: 'Does staking make sense for your goals?',
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
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-4">
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            Most people focus only on rewards.
          </p>
          <p className="text-slate-500 leading-relaxed">
            But staking is not just about numbers. Before using any staking platform, you need to understand how rewards are generated, whether your crypto is locked, what risks apply, and whether the structure fits your situation.
          </p>
          <p className="text-slate-500 leading-relaxed">
            That is where most people rush.
          </p>
          <p className="text-[#0A1628] font-semibold">
            Stakeonix helps you slow down, compare clearly, and make a more informed decision.
          </p>
        </div>

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
