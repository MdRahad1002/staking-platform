import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Crown, ShieldCheck, MapPin, TrendingUp, ArrowRight, CheckCircle2,
  Landmark, Lock, Coins, HelpCircle, BadgeCheck,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'UK Crypto Staking | FCA-Authorised Platform | Earn Daily | StakeOnix',
  description:
    'Crypto staking in the UK made simple. StakeOnix is FCA-authorised, lets UK residents stake Bitcoin, Ethereum & 170+ assets, and credits rewards daily from just £200 equivalent.',
  alternates: { canonical: `${APP_URL}/uk-crypto-staking` },
  keywords: [
    'uk crypto staking',
    'crypto staking uk',
    'fca crypto platform',
    'fca authorised crypto',
    'best crypto staking platform uk',
    'how to stake crypto uk',
    'is crypto staking legal in uk',
    'crypto staking tax uk',
    'best crypto platform uk',
    'earn crypto rewards uk',
    'bitcoin staking uk',
    'ethereum staking uk',
    'uk crypto investment platform',
  ],
  openGraph: {
    title: 'UK Crypto Staking | FCA-Authorised Platform | StakeOnix',
    description:
      'FCA-authorised crypto staking for UK residents. Earn daily rewards on 170+ assets from £200 equivalent. Free to join.',
    url: `${APP_URL}/uk-crypto-staking`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'UK Crypto Staking - FCA-Authorised | StakeOnix' }],
  },
}

const faqs = [
  {
    q: 'Is crypto staking legal in the UK?',
    a: 'Yes. Crypto staking is legal in the UK. Firms providing crypto services must register with the Financial Conduct Authority (FCA) and follow anti-money-laundering rules. StakeOnix is FCA-authorised (Reference number 820033).',
  },
  {
    q: 'What is the best crypto staking platform in the UK?',
    a: 'The best UK platform is regulated, transparent and secure. Look for FCA authorisation, published payout data, 2FA, cold-wallet storage and clear plan terms. StakeOnix is FCA-authorised, with a public Proof of Rewards ledger and 170+ stakeable assets.',
  },
  {
    q: 'Do I pay tax on crypto staking in the UK?',
    a: 'HMRC generally treats staking rewards as taxable income at the point of receipt, and any subsequent gain or loss as a capital gain or loss. Your exact position depends on your circumstances, so consult a UK tax professional or HMRC guidance.',
  },
  {
    q: 'What does FCA authorisation mean for me?',
    a: 'FCA authorisation means the firm is registered with and supervised by the UK financial regulator, and must meet standards around financial conduct, anti-money-laundering and client protection. It is publicly verifiable on the FCA register.',
  },
  {
    q: 'How do UK residents start staking crypto?',
    a: 'Create a free StakeOnix account, complete identity verification, deposit crypto or its equivalent (from around £200), choose a staking plan, and earn daily rewards credited automatically to your account.',
  },
  {
    q: 'Can I stake stablecoins in the UK to reduce volatility?',
    a: 'Yes. UK users who prefer less price exposure can stake USD-denominated stablecoins such as USDT or USDC and still earn daily rewards under the plan terms.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'UK Crypto Staking', item: `${APP_URL}/uk-crypto-staking` },
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
  headline: 'Crypto Staking in the UK: The FCA-Authorised Way to Earn',
  description: 'How UK residents can stake Bitcoin, Ethereum and 170+ assets with an FCA-authorised platform.',
  url: `${APP_URL}/uk-crypto-staking`,
  image: `${APP_URL}/opengraph-image`,
  datePublished: '2025-01-15',
  dateModified: '2026-06-01',
  author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  publisher: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL, logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 } },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/uk-crypto-staking` },
}

export default function UkStakingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.08] blur-[150px]" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Crown className="h-3.5 w-3.5" /> FCA-Authorised · United Kingdom 🇬🇧
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              UK crypto staking,{' '}
              <span className="gradient-text-animated">done properly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              StakeOnix is FCA-authorised and lets UK residents earn daily rewards on Bitcoin, Ethereum,
              USDT and 170+ digital assets - starting from around £200 equivalent.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-8 shine-sweep">
                  <TrendingUp className="h-4 w-4" /> Start Staking in the UK
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

        {/* DIRECT ANSWER */}
        <section className="py-16 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="glass-card rounded-2xl p-7 md:p-9 border border-blue-500/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">In short</p>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                <strong>StakeOnix is an FCA-authorised crypto staking platform</strong> (Reference 820033) where
                UK residents can stake 170+ cryptocurrencies and earn daily rewards under transparent plan terms.
                Crypto staking is legal in the UK when done through an FCA-registered firm and StakeOnix is one.
              </p>
            </div>
          </div>
        </section>

        {/* WHY UK */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Why UK investors choose StakeOnix</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Built for UK investors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: <BadgeCheck className="h-6 w-6" />, color: 'text-green-400 bg-green-500/10', title: 'FCA-authorised', body: 'Authorised by the Financial Conduct Authority (Ref. 820033) - publicly verifiable on the FCA register.' },
                { icon: <MapPin className="h-6 w-6" />, color: 'text-blue-400 bg-blue-500/10', title: 'UK presence', body: 'Operating from offices in Altrincham, Cheshire (WA14 2DT) under FCA oversight.' },
                { icon: <Coins className="h-6 w-6" />, color: 'text-cyan-400 bg-cyan-500/10', title: '170+ assets', body: 'Stake Bitcoin, Ethereum, Solana, USDT and more, from around £200 equivalent.' },
                { icon: <ShieldCheck className="h-6 w-6" />, color: 'text-purple-400 bg-purple-500/10', title: 'Bank-grade security', body: '2FA, AES-256 encryption, withdrawal PIN protection and cold-wallet storage.' },
                { icon: <TrendingUp className="h-6 w-6" />, color: 'text-yellow-400 bg-yellow-500/10', title: 'Daily rewards', body: 'Rewards credited every 24 hours and tracked in your dashboard. See our Proof of Rewards page.' },
                { icon: <Lock className="h-6 w-6" />, color: 'text-pink-400 bg-pink-500/10', title: 'Clear terms', body: 'Plan durations, rates and withdrawal terms are shown clearly before you commit.' },
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

        {/* HOW TO START */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Step by step</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">How to stake crypto in the UK</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: '01', icon: <BadgeCheck className="h-6 w-6" />, title: 'Create a free account', desc: 'Sign up in about 2 minutes and complete identity verification (KYC).' },
                { n: '02', icon: <Coins className="h-6 w-6" />, title: 'Deposit from £200', desc: 'Fund your wallet with crypto or its equivalent. Stablecoins supported.' },
                { n: '03', icon: <TrendingUp className="h-6 w-6" />, title: 'Choose a plan', desc: 'Select a staking plan that fits your goals and risk comfort.' },
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
              <h2 className="text-3xl font-black text-white">UK crypto staking: your questions</h2>
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
              <Landmark className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start staking in the UK today</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Free to join, FCA-authorised, and built to earn. Put your crypto to work with a platform you can verify.
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
              is FCA-authorised in the UK. Do not invest more than you can afford to lose.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
