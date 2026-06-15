import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Leaf, ShieldCheck, MapPin, TrendingUp, ArrowRight, CheckCircle2,
  Building2, FileText, Lock, Coins, HelpCircle, BadgeCheck,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Best Canadian Crypto Staking Company | FINTRAC-Registered | StakeOnix',
  description:
    'Looking for a Canadian crypto company to stake with? StakeOnix is FINTRAC-registered, based in Toronto, and lets Canadians earn daily rewards on Bitcoin, Ethereum & 170+ assets from $200.',
  alternates: { canonical: `${APP_URL}/canada` },
  keywords: [
    'canadian crypto company',
    'crypto staking canada',
    'best crypto platform canada',
    'crypto company canada',
    'how to stake crypto in canada',
    'is crypto staking legal in canada',
    'FINTRAC registered crypto',
    'crypto staking canada taxes',
    'best canadian crypto staking platform',
    'earn crypto rewards canada',
    'bitcoin staking canada',
    'ethereum staking canada',
    'crypto platform toronto',
    'canadian crypto investment platform',
  ],
  openGraph: {
    title: 'Best Canadian Crypto Staking Company | FINTRAC-Registered | StakeOnix',
    description:
      'StakeOnix is a FINTRAC-registered, Toronto-based crypto staking platform. Canadians earn daily rewards on 170+ assets from $200. Free to join.',
    url: `${APP_URL}/canada`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix - Canadian Crypto Staking Company' }],
  },
}

const faqs = [
  {
    q: 'Is crypto staking legal in Canada?',
    a: 'Yes. Crypto staking is legal in Canada. Platforms that facilitate crypto services must register with FINTRAC (the Financial Transactions and Reports Analysis Centre of Canada) as a Money Services Business and follow anti-money-laundering and know-your-customer rules. StakeOnix is FINTRAC-registered (Business Number 820033090).',
  },
  {
    q: 'What is the best Canadian crypto company to stake with?',
    a: 'For staking specifically, look for a Canadian-registered platform with FINTRAC registration, transparent reward reporting, strong security (2FA, cold storage, encryption), and clear plan terms. StakeOnix is a Toronto-based, FINTRAC-registered staking platform offering daily rewards on 170+ assets from a $200 minimum.',
  },
  {
    q: 'Do I pay tax on crypto staking rewards in Canada?',
    a: 'In most cases the Canada Revenue Agency (CRA) treats staking rewards as income at their fair market value when received, and any later gain or loss on disposal as a capital gain or loss. Tax treatment depends on your circumstances, so consult a Canadian tax professional. See our CRA staking tax guide for a plain-English overview.',
  },
  {
    q: 'Where is StakeOnix based in Canada?',
    a: 'StakeOnix operates from offices at 130 King St W, Toronto, Ontario M5X 2A2, and is registered with FINTRAC. The company (ONIX HOLDINGS LIMITED) is also FCA-authorised in the United Kingdom.',
  },
  {
    q: 'How do Canadians start staking crypto?',
    a: 'Create a free StakeOnix account (about 2 minutes), complete identity verification, deposit crypto or its USD equivalent (minimum $200), choose a staking plan, and start earning daily rewards credited automatically to your account.',
  },
  {
    q: 'Can I stake stablecoins to avoid crypto price swings?',
    a: 'Yes. Canadians who want to reduce exposure to crypto price volatility can stake USD-denominated stablecoins such as USDT or USDC and still earn daily rewards under the plan terms.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Crypto Staking in Canada', item: `${APP_URL}/canada` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Crypto Staking in Canada: The FINTRAC-Registered Way to Earn',
  description: 'How Canadians can stake Bitcoin, Ethereum and 170+ assets with a FINTRAC-registered, Toronto-based platform.',
  url: `${APP_URL}/canada`,
  image: `${APP_URL}/opengraph-image`,
  datePublished: '2025-01-15',
  dateModified: '2026-06-01',
  author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  publisher: {
    '@type': 'Organization',
    name: 'StakeOnix',
    url: APP_URL,
    logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/canada` },
}

export default function CanadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-red-500/[0.08] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/[0.08] blur-[140px]" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Leaf className="h-3.5 w-3.5" /> Proudly serving Canada 🇨🇦
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              The Canadian crypto company built for{' '}
              <span className="gradient-text-animated">earning, not guessing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              StakeOnix is a FINTRAC-registered, Toronto-based platform that lets Canadians earn daily
              rewards on Bitcoin, Ethereum, USDT and 170+ digital assets starting from just $200.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-8 shine-sweep">
                  <TrendingUp className="h-4 w-4" /> Start Earning in Canada
                </Button>
              </Link>
              <Link href="/plans">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  View Staking Plans <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* DIRECT ANSWER (featured-snippet target) */}
        <section className="py-16 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="glass-card rounded-2xl p-7 md:p-9 border border-blue-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">In short</p>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                <strong>StakeOnix is a FINTRAC-registered Canadian crypto staking company</strong> headquartered
                in Toronto. Canadians can stake 170+ cryptocurrencies and earn daily rewards under transparent
                plan terms, with bank-grade security and full KYC/AML compliance. Crypto staking is legal in
                Canada when conducted through a registered Money Services Business and StakeOnix is one.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CANADIANS CHOOSE */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Why Canadians choose StakeOnix</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">A Canadian platform that ticks every box</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: <BadgeCheck className="h-6 w-6" />, color: 'text-green-400 bg-green-500/10', title: 'FINTRAC-registered', body: 'Registered as a Money Services Business in Canada (BN: 820033090) with full AML and KYC procedures.' },
                { icon: <MapPin className="h-6 w-6" />, color: 'text-red-400 bg-red-500/10', title: 'Toronto-based', body: 'Operating from 130 King St W, Toronto, Ontario - a real Canadian presence, not an anonymous offshore site.' },
                { icon: <Coins className="h-6 w-6" />, color: 'text-blue-400 bg-blue-500/10', title: '170+ assets, from $200', body: 'Stake Bitcoin, Ethereum, Solana, USDT and more. Start small with the $200 entry plan.' },
                { icon: <ShieldCheck className="h-6 w-6" />, color: 'text-cyan-400 bg-cyan-500/10', title: 'Bank-grade security', body: '2FA, AES-256 encryption, withdrawal PIN protection and cold-wallet storage for the majority of funds.' },
                { icon: <TrendingUp className="h-6 w-6" />, color: 'text-purple-400 bg-purple-500/10', title: 'Daily rewards', body: 'Rewards are credited every 24 hours and tracked transparently in your dashboard. See our Proof of Rewards page.' },
                { icon: <FileText className="h-6 w-6" />, color: 'text-yellow-400 bg-yellow-500/10', title: 'Tax-aware', body: 'A plain-English CRA staking tax guide helps Canadians understand reporting obligations.' },
              ].map((c) => (
                <div key={c.title} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color} mb-4`}>{c.icon}</div>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO START (HowTo-style) */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Step by step</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How to stake crypto in Canada</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: '01', icon: <BadgeCheck className="h-6 w-6" />, title: 'Create a free account', desc: 'Sign up in about 2 minutes and verify your identity (KYC) as required in Canada.' },
                { n: '02', icon: <Coins className="h-6 w-6" />, title: 'Deposit from $200', desc: 'Fund your wallet with crypto or its USD equivalent. Stablecoins are supported.' },
                { n: '03', icon: <TrendingUp className="h-6 w-6" />, title: 'Choose a plan', desc: 'Pick a staking plan that matches your goals and risk comfort.' },
                { n: '04', icon: <Lock className="h-6 w-6" />, title: 'Earn daily', desc: 'Rewards are credited every 24 hours and shown in your dashboard.' },
              ].map((s) => (
                <div key={s.n} className="glass-card p-6 flex flex-col items-center text-center relative rounded-2xl">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/30">{s.n}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 mt-3">{s.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
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
              <h2 className="text-3xl font-black text-white">Crypto staking in Canada: your questions</h2>
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
            <p className="text-center text-sm text-muted-foreground mt-8">
              Want the tax detail? Read our{' '}
              <Link href="/blog/cra-staking-tax-guide" className="text-blue-400 hover:text-blue-300 font-medium">CRA crypto staking tax guide</Link>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-blue-950/10" />
          <div className="container relative mx-auto px-4 text-center max-w-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-blue-700/20 text-blue-300 mx-auto mb-6 border border-blue-400/30">
              <Building2 className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Join Canadians earning daily on StakeOnix</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Free to join, $200 to start, FINTRAC-registered. Put your crypto to work with a Canadian
              company you can actually verify.
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
            <p className="mt-6 text-xs text-muted-foreground/50 max-w-md mx-auto">
              Staking rewards are variable and not guaranteed. Crypto values fluctuate. StakeOnix (ONIX HOLDINGS LIMITED)
              is FINTRAC-registered in Canada and FCA-authorised in the UK. Do not invest more than you can afford to lose.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
