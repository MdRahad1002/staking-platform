import { ArrowRight, Sprout, Coins, BarChart3 } from 'lucide-react'
import { CTA_HREF } from '../data'

const paths = [
  {
    icon: Sprout,
    title: "I'm New to Staking",
    description:
      'I want a simple explanation of what staking is, how it works, and what I should understand before starting.',
    cta: 'Start With Basics',
    href: '#how-it-works',
    border: 'border-emerald-200 hover:border-emerald-300',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    ctaBg: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    icon: Coins,
    title: 'I Already Hold Crypto',
    description:
      'I want to compare staking options and understand whether my current holdings could be used differently.',
    cta: 'Compare Options',
    href: '#yields',
    border: 'border-blue-200 hover:border-blue-300',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    ctaBg: 'bg-blue-600 hover:bg-blue-700',
    featured: true,
  },
  {
    icon: BarChart3,
    title: "I'm Already Active in Crypto",
    description:
      'I want to review staking structures, risks, lock periods, and possible reward models before deciding.',
    cta: 'Review My Options',
    href: CTA_HREF,
    border: 'border-indigo-200 hover:border-indigo-300',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    ctaBg: 'bg-indigo-600 hover:bg-indigo-700',
  },
]

export function PathSelector() {
  return (
    <section
      id="path"
      className="py-16 lg:py-28 bg-slate-50"
      aria-labelledby="path-headline"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="text-center mb-5">
          <span className="inline-block rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 py-1">
            Your starting point
          </span>
        </div>

        {/* Headline */}
        <h2
          id="path-headline"
          className="text-3xl sm:text-4xl font-bold text-[#0A1628] text-center tracking-tight mb-3"
        >
          Where Are You Starting From?
        </h2>
        <p className="text-center text-slate-500 text-lg mb-12 max-w-xl mx-auto">
          Choose the path that best matches your current crypto experience.
        </p>

        {/* Visual — three persona cards with real photos */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg mb-12">
          <img
            src="/section-3.png"
            alt="Three types of crypto users — Beginner, Crypto Holder, and Active User — each with a tailored staking path"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Three path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {paths.map(({ icon: Icon, title, description, cta, href, border, iconBg, iconColor, ctaBg, featured }) => (
            <div
              key={title}
              className={`relative bg-white rounded-2xl border-2 ${border} p-6 flex flex-col transition-all duration-200 shadow-sm hover:shadow-lg`}
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-block rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow">
                    Most Common
                  </span>
                </div>
              )}

              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-5 ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
              </div>

              <h3 className="text-lg font-bold text-[#0A1628] mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">{description}</p>

              <a
                href={href}
                className={`inline-flex items-center justify-center gap-2 rounded-xl ${ctaBg} text-white font-semibold text-sm px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              >
                {cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
