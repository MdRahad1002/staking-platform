import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CoinIcon } from '@/components/shared/CoinIcon'
import {
  TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, HelpCircle,
  Coins, Repeat, Calculator, Zap,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export interface AssetStakingData {
  name: string
  ticker: string
  iconSymbol: string
  isProofOfStake: boolean
  estApy: string
  heroHeadline: string
  intro: string
  directAnswer: string
  whatIs: string[]
  howWorks: string
  whyStake: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
}

const ASSET_LINKS = [
  { path: '/bitcoin-staking', label: 'Bitcoin (BTC)' },
  { path: '/ethereum-staking', label: 'Ethereum (ETH)' },
  { path: '/solana-staking', label: 'Solana (SOL)' },
  { path: '/usdt-staking', label: 'Tether (USDT)' },
]

export function AssetStakingPage({ data, path }: { data: AssetStakingData; path: string }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: `${data.name} Staking`, item: `${APP_URL}${path}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${data.name} (${data.ticker}) Staking: How to Earn Daily Rewards`,
    description: data.intro,
    url: `${APP_URL}${path}`,
    image: `${APP_URL}/opengraph-image`,
    datePublished: '2025-03-01',
    dateModified: '2026-06-01',
    author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
    publisher: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL, logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}${path}` },
  }

  const otherAssets = ASSET_LINKS.filter((a) => a.path !== path)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen" style={{ background: '#080D1B' }}>

        {/* HERO */}
        <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
          <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[150px]" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2.5">
                <CoinIcon symbol={data.iconSymbol} className="h-full w-full rounded-full" />
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              {data.isProofOfStake ? 'Proof-of-Stake Asset' : 'Earn rewards on your ' + data.ticker}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
              {data.heroHeadline}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">{data.intro}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-8 shine-sweep">
                  <TrendingUp className="h-4 w-4" /> Stake {data.ticker} from $200
                </Button>
              </Link>
              <Link href="/crypto-staking-calculator">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  <Calculator className="h-4 w-4" /> Calculate rewards
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
              <p className="text-lg md:text-xl text-white leading-relaxed">{data.directAnswer}</p>
            </div>
          </div>
        </section>

        {/* WHAT IS */}
        <section className="py-20 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">What is {data.name} staking?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {data.whatIs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 glass-card rounded-2xl p-6 border border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">How rewards are generated</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.howWorks}</p>
            </div>
          </div>
        </section>

        {/* WHY STAKE HERE */}
        <section className="py-20 border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Why StakeOnix</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Why stake {data.ticker} with StakeOnix</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.whyStake.map((c) => (
                <div key={c.title} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4"><CheckCircle2 className="h-6 w-6" /></div>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE STRIP */}
        <section className="py-12 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Coins className="h-5 w-5" />, t: 'From $200', d: 'Low minimum to start' },
                { icon: <Repeat className="h-5 w-5" />, t: 'Auto-compound', d: 'Grow rewards with Autopilot' },
                { icon: <Zap className="h-5 w-5" />, t: 'Daily payouts', d: 'Rewards every 24 hours' },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 glass-card rounded-xl p-4 border border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">{f.icon}</div>
                  <div><p className="font-bold text-white text-sm">{f.t}</p><p className="text-xs text-muted-foreground">{f.d}</p></div>
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
              <h2 className="text-3xl font-black text-white">{data.name} staking: FAQs</h2>
            </div>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
                <div key={faq.q} className="glass-card p-5 rounded-xl border border-white/10">
                  <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0 font-bold">Q.</span>{faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-5 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CROSS-LINKS */}
        <section className="py-12 border-b border-white/5">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm text-muted-foreground mb-4">Explore staking for other assets:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {otherAssets.map((a) => (
                <Link key={a.path} href={a.path} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground hover:text-white hover:border-blue-500/30 transition-colors">
                  {a.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
              <Link href="/plans" className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/20 transition-colors">
                All staking plans <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-blue-950/10" />
          <div className="container relative mx-auto px-4 text-center max-w-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2.5 mx-auto mb-6">
              <CoinIcon symbol={data.iconSymbol} className="h-full w-full rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start staking {data.name} today</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Create a free account, deposit from $200, and earn daily {data.ticker} rewards on a regulated platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-10 shine-sweep">
                  <CheckCircle2 className="h-4 w-4" /> Create Free Account
                </Button>
              </Link>
              <Link href="/best-crypto-staking-platform">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  Why StakeOnix <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/50 max-w-md mx-auto">
              Staking rewards are variable and not guaranteed. Crypto values fluctuate. Do not invest more than you can afford to lose.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
