import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CTA_HREF, COMPANY_NAME } from '../data'

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#00C896]" aria-labelledby="final-cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="final-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5"
        >
          Start earning on your crypto today
        </h2>
        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
          Join thousands of Canadians staking with a regulated platform.
        </p>

        <Link
          href={CTA_HREF}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-gray-50 text-[#00C896] font-bold text-lg px-10 py-5 transition-all duration-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00C896]"
        >
          Create your account
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="mt-4 text-white/70 text-sm">Average signup time: 5 minutes</p>

        <p className="mt-6 text-white/50 text-xs max-w-lg mx-auto">
          By signing up you agree to our{' '}
          <a href="/terms" className="underline hover:text-white/70 transition-colors">
            Terms of Service
          </a>{' '}
          and acknowledge our{' '}
          <a href="/risk-disclosure" className="underline hover:text-white/70 transition-colors">
            Risk Disclosure
          </a>
          . {COMPANY_NAME} is not a bank. Crypto assets are not CDIC-insured.
        </p>
      </div>
    </section>
  )
}
