import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Award, ShieldCheck, TrendingUp, ArrowRight, CheckCircle2, XCircle,
  HelpCircle, Globe, Repeat, Receipt, Star,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Best Crypto Staking Platform in 2026 | How to Choose | StakeOnix',
  description:
    'What is the best company to invest in crypto and stake with in 2026? A clear checklist for choosing a safe, regulated staking platform - and why StakeOnix earns daily on 170+ assets.',
  alternates: { canonical: `${APP_URL}/best-crypto-staking-platform` },
  keywords: [
    'best crypto staking platform',
    'best company to invest in crypto',
    'best crypto platform',
    'best crypto staking platform 2026',
    'best place to stake crypto',
    'safest crypto staking platform',
    'best crypto investment platform',
    'top crypto staking platforms',
    'best regulated crypto platform',
    'where to stake crypto',
    'best crypto platform for passive income',
    'highest yield crypto staking',
  ],
  openGraph: {
    title: 'Best Crypto Staking Platform in 2026 | How to Choose | StakeOnix',
    description:
      'How to choose the best crypto staking platform in 2026 - a transparent checklist plus why investors pick StakeOnix for daily rewards on 170+ assets.',
    url: `${APP_URL}/best-crypto-staking-platform`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Best Crypto Staking Platform 2026 | StakeOnix' }],
  },
}

const checklist = [
  { icon: <ShieldCheck className="h-6 w-6" />, color: 'text-green-400 bg-green-500/10', title: 'Regulation you can verify', body: 'The best platforms are registered with real regulators. StakeOnix is FCA-authorised (UK, Ref. 820033) and FINTRAC-registered (Canada, BN: 820033090) - both publicly verifiable.' },
  { icon: <Receipt className="h-6 w-6" />, color: 'text-cyan-400 bg-cyan-500/10', title: 'Transparent rewards', body: 'Can you see what gets paid? StakeOnix publishes a live Proof of Rewards ledger so payouts are not just a marketing claim.' },
  { icon: <ShieldCheck className="h-6 w-6" />, color: 'text-blue-400 bg-blue-500/10', title: 'Serious security', body: '2FA, AES-256 encryption, withdrawal PIN protection and cold-wallet storage for the majority of funds.' },
  { icon: <Globe className="h-6 w-6" />, color: 'text-purple-400 bg-purple-500/10', title: 'Asset choice', body: 'Stake 170+ assets including Bitcoin, Ethereum, Solana and USD stablecoins - so you can match your risk comfort.' },
  { icon: <Repeat className="h-6 w-6" />, color: 'text-yellow-400 bg-yellow-500/10', title: 'Smart tools', body: 'Auto-compounding (Staking Autopilot) and Protected Staking - a principal-protected, market-linked bonus you will not find elsewhere.' },
  { icon: <TrendingUp className="h-6 w-6" />, color: 'text-green-400 bg-green-500/10', title: 'Low barrier to start', body: 'A good platform lets you test it cheaply. StakeOnix starts at $200 with a short entry plan.' },
]

const faqs = [
  {
    q: 'What is the best company to invest in crypto with?',
    a: 'The "best" company is the one that is regulated, transparent, secure and matches your goals. For earning daily rewards through staking, prioritise FINTRAC/FCA registration, published payout data, strong security and clear plan terms. StakeOnix meets all four and lets you start from $200.',
  },
  {
    q: 'What is the best crypto staking platform in 2026?',
    a: 'Rather than chasing the highest advertised yield, choose a platform you can verify: real regulatory registration, transparent rewards, cold-storage security and supported assets. StakeOnix is a regulated (FCA + FINTRAC), transparent platform with a public Proof of Rewards ledger and 170+ stakeable assets.',
  },
  {
    q: 'How do I know a staking platform is safe?',
    a: 'Check for a verifiable regulator registration, two-factor authentication, cold-wallet custody, a withdrawal PIN, and clear, written plan terms. Be wary of platforms promising guaranteed or unrealistically high returns - real staking rewards are variable.',
  },
  {
    q: 'Which platform has the best staking rewards?',
    a: 'Reward rates vary by asset and network conditions, so the highest headline number is not always the best deal. Look instead at transparency and risk controls. StakeOnix shows estimated yields by asset and credits rewards daily, with optional auto-compounding to grow returns over time.',
  },
  {
    q: 'Is StakeOnix a good platform for beginners?',
    a: 'Yes. StakeOnix is built to be simple: create an account, deposit from $200, choose a plan, and earn daily. There is no trading or charting required, and stablecoin staking is available to reduce price volatility for newcomers.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Best Crypto Staking Platform', item: `${APP_URL}/best-crypto-staking-platform` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Crypto Staking Platform in 2026: How to Choose',
  description: 'A transparent checklist for choosing the best crypto staking platform, and why investors pick StakeOnix.',
  url: `${APP_URL}/best-crypto-staking-platform`,
  image: `${APP_URL}/opengraph-image`,
  datePublished: '2025-02-01',
  dateModified: '2026-06-01',
  author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  publisher: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL, logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 } },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/best-crypto-staking-platform` },
}

export default function BestPlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-violet-500/[0.08] blur-[150px]" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Award className="h-3.5 w-3.5" /> Buyer's Guide · 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              The best crypto staking platform is the one you can{' '}
              <span className="gradient-text-animated">actually verify</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Everyone claims to be "the best." Here is an honest checklist for choosing where to invest
              in crypto and stake in 2026 - and how StakeOnix measures up against it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-8 shine-sweep">
                  <Star className="h-4 w-4" /> Try StakeOnix Free
                </Button>
              </Link>
              <Link href="/proof-of-rewards">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  See Proof of Rewards <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWER */}
        <section className="py-16 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="glass-card rounded-2xl p-7 md:p-9 border border-blue-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">The honest answer</p>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                The best crypto staking platform is <strong>regulated, transparent, secure, and matched to your
                goals</strong> not simply the one advertising the biggest number. StakeOnix is FCA-authorised
                and FINTRAC-registered, publishes a live payout ledger, supports 170+ assets, and starts at $200.
              </p>
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">The 6-point checklist</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">How to choose the best crypto platform</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {checklist.map((c) => (
                <div key={c.title} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color} mb-4`}>{c.icon}</div>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RED FLAGS */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Avoid these</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Red flags of a bad platform</h2>
            </div>
            <div className="space-y-3">
              {[
                'Guaranteed or fixed "risk-free" returns - real staking is variable',
                'No verifiable regulator registration or company address',
                'No two-factor authentication or withdrawal protection',
                'Pressure to deposit large sums quickly or recruit others',
                'No way to see actual payouts or withdraw on clear terms',
              ].map((flag) => (
                <div key={flag} className="flex items-start gap-3 glass-card rounded-xl p-4 border border-red-500/15">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{flag}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <HelpCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h2 className="text-3xl font-black text-white">Best crypto platform: FAQs</h2>
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
              <Award className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">See why investors choose StakeOnix</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Regulated, transparent, and built for earning. Start free, stake from $200, and verify our
              payouts for yourself.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-10 shine-sweep">
                  <CheckCircle2 className="h-4 w-4" /> Create Free Account
                </Button>
              </Link>
              <Link href="/why-choose-us">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  Why choose us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
