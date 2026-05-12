import { CheckCircle2, ExternalLink } from 'lucide-react'

const ourPlatformItems = [
  'No disposition on deposit',
  'No disposition on staking',
  'Only rewards taxed as income',
]

export function TaxAdvantage() {
  return (
    <section id="tax" className="py-20 lg:py-28 bg-[#0A1628]" aria-labelledby="tax-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-4 py-1.5 mb-5">
            <span className="text-[#00C896] text-xs font-semibold tracking-wide uppercase">
              CRA January 2025 guidance
            </span>
          </div>
          <h2
            id="tax-heading"
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            A tax advantage Canadians shouldn&apos;t ignore
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: body copy */}
          <div>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Under CRA&apos;s January 2025 guidance, depositing and staking crypto on a CSA-registered
              platform like ours generally does{' '}
              <strong className="text-white font-semibold">not trigger a taxable disposition</strong>.
              You&apos;re only taxed on staking rewards as income, not on the act of staking itself.
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Most offshore platforms can&apos;t offer this clarity. Because they operate outside CSA
              oversight, the CRA&apos;s guidance on registered platforms doesn&apos;t apply, leaving
              Canadian users with uncertain tax exposure every time they stake.
            </p>
            <p className="text-white/90 text-base leading-relaxed mb-8">
              This is particularly significant for Canadians holding crypto in non-registered accounts:
              every unnecessary disposition is a taxable event that erodes your real returns.
            </p>

            <a
              href="/blog/cra-staking-tax-guide"
              className="inline-flex items-center gap-2 text-[#00C896] font-semibold hover:underline underline-offset-4 text-base"
            >
              Read our full CRA tax guide
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Right: comparison cards */}
          <div aria-label="Tax treatment">
            {/* Our platform */}
            <div className="rounded-2xl border border-[#00C896]/30 bg-[#00C896]/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-8 w-8 rounded-full bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-[#00C896]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-white text-sm">On our platform</h3>
              </div>
              <ul className="space-y-3" role="list">
                {ourPlatformItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#00C896] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-white/60 text-sm max-w-2xl mx-auto">
          Not tax advice. Individual circumstances vary. Consult a qualified Canadian tax professional
          before making staking decisions.{' '}
          <a href="/blog/cra-staking-tax-guide" className="underline hover:text-white/50 transition-colors">
            Read our full CRA guide →
          </a>
        </p>
      </div>
    </section>
  )
}
