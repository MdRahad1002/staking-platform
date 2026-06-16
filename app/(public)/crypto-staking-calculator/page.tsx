import { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, Calculator as CalcIcon } from 'lucide-react'
import { StakingCalculator } from './Calculator'

const APP_URL = 'https://www.stakeonix.ca'
const PATH = '/crypto-staking-calculator'

export const metadata: Metadata = {
  title: 'Crypto Staking Calculator | Estimate Daily Rewards | StakeOnix',
  description:
    'Free crypto staking calculator. Estimate your daily earnings, total profit and compounded returns by amount, rate and duration. See what staking could earn you from $200.',
  alternates: { canonical: `${APP_URL}${PATH}` },
  keywords: [
    'crypto staking calculator', 'staking calculator', 'staking rewards calculator',
    'crypto rewards calculator', 'staking profit calculator', 'crypto compound calculator',
    'staking apy calculator', 'how much can i earn staking crypto', 'crypto earnings calculator',
  ],
  openGraph: {
    title: 'Crypto Staking Calculator | Estimate Daily Rewards | StakeOnix',
    description: 'Estimate your daily staking earnings, total profit and compounded returns. Free calculator.',
    url: `${APP_URL}${PATH}`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Crypto Staking Calculator | StakeOnix' }],
  },
}

const faqs = [
  { q: 'How is staking profit calculated?', a: 'Simple staking profit is your amount multiplied by the daily rate and the number of days. With compounding, each day’s reward is added to your balance so the next day earns on a slightly larger amount - which grows your total profit over time. This calculator shows both.' },
  { q: 'What does compounding do to my returns?', a: 'Compounding reinvests your rewards so they also start earning. Over longer durations this can meaningfully increase your total profit compared with cashing out daily. On StakeOnix you can auto-compound with Staking Autopilot.' },
  { q: 'Are these calculator results guaranteed?', a: 'No. The calculator is illustrative. The example rates are not an offer or guarantee. Actual plan rates are shown after you sign up, staking rewards are variable, and crypto values can fall as well as rise.' },
  { q: 'How much do I need to start staking?', a: 'StakeOnix starts at a $200 minimum, so you can use the calculator to plan a small first stake and scale up later.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Crypto Staking Calculator', item: `${APP_URL}${PATH}` },
  ],
}
const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Crypto Staking Calculator',
  url: `${APP_URL}${PATH}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Estimate daily crypto staking rewards, total profit and compounded returns.',
}

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO + CALCULATOR */}
        <section className="relative py-16 md:py-20 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="container relative mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <CalcIcon className="h-3.5 w-3.5" /> Free Tool
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Crypto Staking Calculator</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estimate your daily earnings, total profit and the power of compounding. Adjust the amount,
                rate and duration to see what staking could earn you.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <StakingCalculator />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <HelpCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h2 className="text-3xl font-black text-white">Staking calculator: FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="glass-card p-5 rounded-xl border border-white/10">
                  <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0 font-bold">Q.</span>{faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-5 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Ready to start? <Link href="/plans" className="text-blue-400 hover:text-blue-300 font-medium">Browse staking plans</Link> or{' '}
              <Link href="/how-to-invest-in-crypto" className="text-blue-400 hover:text-blue-300 font-medium">learn how to invest in crypto</Link>.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
