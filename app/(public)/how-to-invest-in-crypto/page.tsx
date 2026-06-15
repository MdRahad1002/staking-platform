import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Rocket, Wallet, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2,
  HelpCircle, BookOpen, Coins, BarChart3, AlertTriangle, Lightbulb,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'How to Invest in Crypto in 2026: Beginner Step-by-Step Guide | StakeOnix',
  description:
    'How to invest in crypto for beginners: a simple 5-step guide to buying, holding and earning on cryptocurrency. Learn the safest way to start with as little as $200.',
  alternates: { canonical: `${APP_URL}/how-to-invest-in-crypto` },
  keywords: [
    'how to invest in crypto',
    'how to invest in cryptocurrency',
    'how to invest in crypto for beginners',
    'best way to invest in crypto',
    'how to start investing in crypto',
    'how to invest in bitcoin',
    'how to make money with crypto',
    'how to earn passive income with crypto',
    'is crypto a good investment',
    'how much should i invest in crypto',
    'safest way to invest in crypto',
    'crypto investment for beginners 2026',
    'how to invest in crypto and earn daily',
  ],
  openGraph: {
    title: 'How to Invest in Crypto in 2026: Beginner Step-by-Step Guide',
    description:
      'A plain-English, 5-step guide to investing in cryptocurrency safely - and how to earn daily rewards by staking from $200.',
    url: `${APP_URL}/how-to-invest-in-crypto`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'How to Invest in Crypto - Beginner Guide | StakeOnix' }],
  },
}

const steps = [
  { n: '01', icon: <BookOpen className="h-6 w-6" />, title: 'Decide your goal & budget', desc: 'Are you investing for long-term growth, or to earn passive income? Set a budget you can afford to lose - many beginners start with $200-$500.' },
  { n: '02', icon: <ShieldCheck className="h-6 w-6" />, title: 'Choose a regulated platform', desc: 'Pick a platform that is registered with a financial regulator (e.g. FINTRAC in Canada, FCA in the UK), with strong security and clear terms.' },
  { n: '03', icon: <Wallet className="h-6 w-6" />, title: 'Fund your account', desc: 'Deposit money or crypto. Beginners often start with stablecoins (USDT/USDC) to avoid early price swings, then diversify.' },
  { n: '04', icon: <Coins className="h-6 w-6" />, title: 'Buy or stake your crypto', desc: 'You can simply hold assets like Bitcoin and Ethereum, or stake them to earn daily rewards on top of any price appreciation.' },
  { n: '05', icon: <BarChart3 className="h-6 w-6" />, title: 'Track, rebalance & reinvest', desc: 'Monitor your portfolio, reinvest (compound) your rewards, and avoid emotional decisions. Consistency beats timing.' },
]

const faqs = [
  {
    q: 'How do I start investing in crypto as a beginner?',
    a: 'Start by setting a budget you can afford to lose, then open an account with a regulated platform. Verify your identity, deposit funds, and buy an established asset like Bitcoin or Ethereum - or stake to earn daily rewards. On StakeOnix you can begin with as little as $200.',
  },
  {
    q: 'How much money do I need to start investing in crypto?',
    a: 'You can start with very little. Many platforms let you begin with $100-$200. StakeOnix has a $200 entry plan, so you can learn the process without risking large sums.',
  },
  {
    q: 'What is the safest way to invest in crypto?',
    a: 'Use a regulated platform, enable two-factor authentication, never invest more than you can afford to lose, and diversify. To reduce price volatility, beginners often hold or stake USD-denominated stablecoins (USDT/USDC) which still earn rewards.',
  },
  {
    q: 'Can you make passive income from crypto?',
    a: 'Yes. Staking lets you earn rewards for helping secure proof-of-stake blockchains. On StakeOnix, rewards are credited daily under your chosen plan terms - though returns are variable and not guaranteed.',
  },
  {
    q: 'Is crypto a good investment in 2026?',
    a: 'Crypto can offer strong growth potential but carries real risk and volatility. A sensible approach is to invest only a portion of your portfolio, diversify, and consider strategies like staking that earn yield regardless of short-term price swings. Always do your own research.',
  },
  {
    q: 'How do I earn daily from crypto instead of just holding?',
    a: 'Instead of letting assets sit idle, you can stake them. Staking puts your crypto to work validating a blockchain and pays rewards. StakeOnix credits staking rewards every 24 hours and lets you auto-compound them with Staking Autopilot.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'How to Invest in Crypto', item: `${APP_URL}/how-to-invest-in-crypto` },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Invest in Crypto: A Beginner Step-by-Step Guide',
  description: 'Learn how to invest in cryptocurrency in five beginner-friendly steps, from setting a budget to earning daily staking rewards.',
  totalTime: 'PT15M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '200' },
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.desc,
    url: `${APP_URL}/how-to-invest-in-crypto#step-${i + 1}`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export default function HowToInvestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[150px]" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Lightbulb className="h-3.5 w-3.5" /> Beginner Guide · Updated 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              How to invest in crypto,{' '}
              <span className="gradient-text-animated">the smart way</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              A plain-English, five-step guide to investing in cryptocurrency safely - and how to make
              your crypto earn daily instead of sitting idle. No jargon, no hype.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-8 shine-sweep">
                  <Rocket className="h-4 w-4" /> Start with $200
                </Button>
              </Link>
              <Link href="/what-is-staking">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  What is staking? <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWER */}
        <section className="py-16 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="glass-card rounded-2xl p-7 md:p-9 border border-blue-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">The short answer</p>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                To invest in crypto: <strong>(1) set a budget you can afford to lose, (2) choose a regulated
                platform, (3) fund your account, (4) buy or stake established assets like Bitcoin and Ethereum,
                and (5) reinvest your rewards over time.</strong> The biggest beginner mistake is letting crypto
                sit idle staking lets it earn daily instead.
              </p>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">5 simple steps</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">How to invest in crypto, step by step</h2>
            </div>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={s.n} id={`step-${i + 1}`} className="glass-card p-6 md:p-7 rounded-2xl border border-white/10 flex gap-5 hover:border-blue-500/30 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">{s.icon}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">Step {s.n}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOLD VS STAKE */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">The difference that matters</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Holding vs. earning</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Most beginners just buy and hope. Earning crypto puts your assets to work while you wait.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass-card rounded-2xl p-7 border border-white/10">
                <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2"><Wallet className="h-5 w-5 text-muted-foreground" /> Just holding</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-muted-foreground/50">•</span> Gains only if the price rises</li>
                  <li className="flex gap-2"><span className="text-muted-foreground/50">•</span> Earns nothing while you wait</li>
                  <li className="flex gap-2"><span className="text-muted-foreground/50">•</span> Fully exposed to volatility</li>
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-7 border border-blue-500/30 bg-blue-500/[0.04]">
                <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-400" /> Staking to earn</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" /> Earns daily rewards under plan terms</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" /> Rewards on top of any price gains</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" /> Can auto-compound with Autopilot</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RISK NOTE */}
        <section className="py-12 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-5 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-yellow-300">Invest responsibly.</strong> Crypto is volatile and staking
                rewards are variable and not guaranteed. Never invest money you cannot afford to lose, and
                consider speaking with a licensed financial adviser about your situation.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <HelpCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h2 className="text-3xl font-black text-white">How to invest in crypto: FAQs</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="glass-card p-5 rounded-xl border border-white/10">
                  <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0 font-bold">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-5 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-blue-950/10" />
          <div className="container relative mx-auto px-4 text-center max-w-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-blue-700/20 text-blue-300 mx-auto mb-6 border border-blue-400/30">
              <Rocket className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to make your first crypto investment?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Open a free account, start from $200, and let your crypto earn daily on a regulated platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-10 shine-sweep">
                  <CheckCircle2 className="h-4 w-4" /> Create Free Account
                </Button>
              </Link>
              <Link href="/plans">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  Browse staking plans <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
