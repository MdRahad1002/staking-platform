import { Metadata } from 'next'
import Link from 'next/link'
import {
  Coins,
  TrendingUp,
  Lock,
  Unlock,
  RefreshCw,
  ShieldCheck,
  Zap,
  HelpCircle,
  ArrowRight,
  Banknote,
  BarChart3,
  Clock,
  TrendingDown,
  DollarSign,
  Percent,
  CheckCircle2,
  XCircle,
  Rocket,
  Globe,
  Star,
  Users,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'What Is Staking in Crypto? Explained Simply (2026 Guide) | StakeOnix',
  description:
    'What is staking in crypto? In 60 seconds: you lock crypto, the blockchain pays you for helping validate transactions, you earn daily rewards. FCA-regulated platform. Free to join.',
  alternates: { canonical: `${APP_URL}/what-is-staking` },
  keywords: [
    'what is staking in crypto',
    'what is staking in cryptocurrency',
    'crypto staking explained simply',
    'how does crypto staking work',
    'what is restaking in crypto',
    'how to start staking crypto',
    'proof of stake explained',
    'crypto staking 2026',
  ],
  openGraph: {
    title: 'What Is Staking in Crypto? Explained Simply (2026) | StakeOnix',
    description:
      'What is staking in crypto? Lock crypto → blockchain pays you for validating transactions → earn daily rewards. Plain English, no jargon. Updated 2026.',
    url: `${APP_URL}/what-is-staking`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'What Is Staking in Crypto? Plain English Guide | StakeOnix' }],
  },
}

const stakingBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'What Is Crypto Staking?', item: `${APP_URL}/what-is-staking` },
  ],
}

const stakingArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is Crypto Staking? A Plain English Explanation',
  description: 'Learn how crypto staking works, how rewards are generated, the risks involved, and how StakeOnix makes staking accessible on 170+ digital assets.',
  url: `${APP_URL}/what-is-staking`,
  image: `${APP_URL}/opengraph-image`,
  datePublished: '2024-01-01',
  dateModified: '2026-05-01',
  author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  publisher: {
    '@type': 'Organization',
    name: 'StakeOnix',
    url: APP_URL,
    logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/what-is-staking` },
}

export default function WhatIsStakingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stakingArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stakingBreadcrumbSchema) }} />
      <main className="min-h-screen">

      {/* ── HERO: The Problem ─────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-background to-cyan-950/20" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="glow-blob w-[700px] h-[500px] bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />

        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <HelpCircle className="h-3.5 w-3.5" />
            Plain English Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
            What Is Crypto Staking?
            <br />
            <span className="gradient-text">A plain English explanation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Proof-of-stake blockchains pay rewards to participants who help validate transactions.
            That mechanism exists whether you use it or not. This page explains how it works,
            what the risks are, and how StakeOnix connects your assets to it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/plans">
              <Button size="lg" className="gap-2 rounded-xl text-base px-8">
                <TrendingUp className="h-4 w-4" />
                See StakeOnix Plans
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                Start with $200 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE INFLATION PROBLEM (visual) ───────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Context</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Why people look for alternatives to <span className="text-red-400">traditional savings</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Here is how the most common options compare on paper. Note: all investments involve risk.
              Crypto staking rewards are variable and not guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                label: 'High-Street Savings Account',
                icon: <Banknote className="h-6 w-6" />,
                rate: '~0.45% / year',
                after5: '$10,226',
                realValue: '~$8,400',
                note: 'Inflation erodes the real value faster than the interest adds it back.',
                bad: true,
                color: 'border-red-500/20 bg-red-500/5',
                iconColor: 'text-red-400',
              },
              {
                label: 'Index Fund / Stocks',
                icon: <BarChart3 className="h-6 w-6" />,
                rate: '~7–10% / year avg',
                after5: '~$14,000–$16,000',
                realValue: '~$12,500',
                note: 'Better but volatile, illiquid, and tied to market cycles. You could also lose.',
                bad: false,
                color: 'border-yellow-500/20 bg-yellow-500/5',
                iconColor: 'text-yellow-400',
              },
              {
                label: 'Crypto Staking (StakeOnix)',
                icon: <TrendingUp className="h-6 w-6" />,
                rate: 'Variable · see plan terms',
                after5: 'Depends on plan, asset, network',
                realValue: 'Rewards credited per plan schedule',
                note: 'Returns are variable and not guaranteed. Sign in to view current plan rates. Past performance is not indicative of future results.',
                bad: false,
                color: 'border-cyan-500/30 bg-cyan-500/8',
                iconColor: 'text-cyan-400',
              },
            ].map((item) => (
              <div key={item.label} className={`glass-card p-6 rounded-2xl border ${item.color}`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 mb-4 ${item.iconColor}`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-base mb-3 text-white">{item.label}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual rate</span>
                    <span className={`font-semibold ${item.bad ? 'text-red-400' : item.iconColor}`}>{item.rate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nominal value</span>
                    <span className="text-white font-semibold">{item.after5}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic border-t border-white/5 pt-3">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 text-center max-w-2xl mx-auto">
            <p className="text-lg font-semibold text-white mb-2">
              The key question to ask yourself:
            </p>
            <p className="text-muted-foreground">
              Are your assets actively working, or sitting idle? Staking is one way to put them to work.
              But it involves risk. Always review plan terms, understand what you are committing,
              and only stake what you can afford.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS STAKING: Plain English ───────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Explained Simply</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">So What <em>Exactly</em> Is Staking?</h2>
          </div>

          {/* One-liner */}
          <div className="glass-card p-8 md:p-10 mb-12 text-center rounded-2xl border border-primary/20">
            <p className="text-2xl md:text-3xl font-bold leading-snug">
              Staking = <span className="gradient-text">contributing your crypto to network validation</span> in
              exchange for a share of the network's reward output.
            </p>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              You deposit crypto into a staking plan. The assets participate in proof-of-stake
              network validation. The network issues rewards. Those rewards are credited to your
              account per your plan schedule. Returns are variable and depend on network conditions,
              asset type, and the plan you choose.
            </p>
          </div>

          {/* 4 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            {[
              {
                step: '01',
                icon: <Coins className="h-6 w-6" />,
                title: 'Deposit your crypto',
                desc: 'Send BTC, ETH, USDT or 50+ other assets into your StakeOnix wallet. Minimum $200.',
                color: 'text-cyan-400 bg-cyan-500/10',
              },
              {
                step: '02',
                icon: <Lock className="h-6 w-6" />,
                title: 'Choose a plan',
                desc: '9 plans from 7-day Starter Trial to 90-day Sovereign. Pick what matches your goals.',
                color: 'text-purple-400 bg-purple-500/10',
              },
              {
                step: '03',
                icon: <TrendingUp className="h-6 w-6" />,
                title: 'Rewards credited to your account',
                desc: 'Staking rewards are generated by the network and credited to your StakeOnix account per your plan schedule. Rewards are variable, not guaranteed.',
                color: 'text-green-400 bg-green-500/10',
              },
              {
                step: '04',
                icon: <Unlock className="h-6 w-6" />,
                title: 'Withdraw or reinvest',
                desc: 'At plan maturity, you can withdraw principal and accumulated rewards, or roll into a new plan. Flexible plans allow early withdrawal subject to plan terms.',
                color: 'text-yellow-400 bg-yellow-500/10',
              },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6 flex flex-col items-center text-center relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/30">
                  {s.step}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color} mb-4 mt-3`}>
                  {s.icon}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STAKEONIX PITCH: Why Staking, Why Here ───────────────────────── */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-background to-blue-950/20" />
        <div className="glow-blob w-[600px] h-[500px] bg-cyan-500/10 top-1/2 right-0 translate-x-1/3 -translate-y-1/2" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Why Staking? Why StakeOnix?</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Five reasons serious investors stake
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not hype. Five clear, rational arguments for why crypto staking
              deserves a place in a considered portfolio strategy.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                num: '01',
                icon: <Percent className="h-6 w-6" />,
                color: 'text-cyan-400 bg-cyan-500/10',
                title: 'Network rewards exist whether you participate or not',
                body: 'Proof-of-stake blockchains issue rewards to validators every day. That mechanism runs 24/7 regardless of whether any individual participates. Staking is the mechanism for participating. The question is not whether those rewards exist - they do. The question is whether you are positioned to receive a share of them.',
                proof: 'Ethereum, Solana, Cosmos and 170+ other PoS networks all issue staking rewards',
              },
              {
                num: '02',
                icon: <Clock className="h-6 w-6" />,
                color: 'text-green-400 bg-green-500/10',
                title: 'Rewards are credited on a defined schedule',
                body: 'Unlike stock dividends that may pay quarterly or annually, staking rewards on most networks are calculated and distributed on shorter cycles. StakeOnix credits rewards to your account according to your chosen plan’s schedule. The exact schedule varies by plan and is shown after account creation. You can track every credit in your dashboard.',
                proof: 'Full transaction history visible in your StakeOnix dashboard',
              },
              {
                num: '03',
                icon: <RefreshCw className="h-6 w-6" />,
                color: 'text-purple-400 bg-purple-500/10',
                title: 'Compounding accelerates growth over time',
                body: 'When rewards are reinvested, you earn returns on your accumulated balance, not just your original deposit. Over longer plan durations this effect compounds meaningfully. The exact compounding schedules and rates vary by plan. StakeOnix offers auto-compounding on eligible plans, shown in full in your plan terms after login.',
                proof: 'Auto-compounding available on eligible plans',
              },
              {
                num: '04',
                icon: <ShieldCheck className="h-6 w-6" />,
                color: 'text-yellow-400 bg-yellow-500/10',
                title: 'No trading knowledge required',
                body: 'Staking is not trading. You are not predicting price movements or timing the market. You deposit an asset, select a plan, and the platform handles the technical infrastructure. The three decisions you make: which asset, which plan, and how much to stake. Everything else is managed by StakeOnix.',
                proof: 'No charts, no market timing, no active management required',
              },
              {
                num: '05',
                icon: <Users className="h-6 w-6" />,
                color: 'text-pink-400 bg-pink-500/10',
                title: 'Regulated infrastructure you can verify',
                body: 'StakeOnix is authorised by the FCA in the UK (Ref. 820033) and registered with FINTRAC in Canada (BN: 820033090). These are not self-issued badges. FCA authorisation requires compliance with financial services standards, anti-money laundering controls, and ongoing regulatory reporting. Both registrations are publicly verifiable on the respective regulator websites.',
                proof: 'FCA Ref. 820033 · FINTRAC BN: 820033090 · both publicly verifiable',
              },
            ].map((item) => (
              <div key={item.num} className="glass-card p-7 md:p-8 flex gap-6">
                <div className="flex-shrink-0 hidden sm:block">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">{item.num}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.color} sm:hidden`}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.body}</p>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                    {item.proof}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STAKEONIX PATHWAY: Funnel walk-through ───────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">The StakeOnix Path</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              How investors grow from $200 to six figures
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every investor starts somewhere. Here is exactly how the journey looks on StakeOnix 
              from a $200 trial to institutional-grade returns.
            </p>
          </div>

          <div className="relative space-y-4">
            {[
              { plan: 'Starter Trial', min: 200, max: 499, days: 7, daily: 1.5, total: 10.5, arrow: '$200 → $221 in 7 days. Your first real payout proves the system works.', tier: 'Entry', tierColor: 'text-slate-400' },
              { plan: 'Booster Plan', min: 500, max: 999, days: 14, daily: 1.8, total: 25.2, arrow: 'Reinvest your $221 + add $279. $500 → $626 in 14 days.', tier: 'Level 2', tierColor: 'text-blue-400' },
              { plan: 'Growth Yield', min: 1000, max: 2499, days: 21, daily: 2.2, total: 46.2, arrow: '$626 reinvested + top up to $1,000. First $1,000+ payday at maturity.', tier: 'Level 3', tierColor: 'text-blue-400' },
              { plan: 'Momentum', min: 2500, max: 4999, days: 30, daily: 2.6, total: 78, arrow: '$1,462 compounds into $2,500+. Monthly income becomes life-changing.', tier: 'Level 4', tierColor: 'text-purple-400' },
              { plan: 'Professional', min: 5000, max: 9999, days: 30, daily: 3.0, total: 90, arrow: '$5,000 → $9,500 in one month. The plan chosen by 60%+ of repeat investors.', tier: 'Level 5 ⭐', tierColor: 'text-cyan-400' },
              { plan: 'Advanced Vault', min: 10000, max: 24999, days: 45, daily: 3.3, total: 148.5, arrow: '$10,000 → $24,850 in 45 days. Loyalty ROI boost on renewal.', tier: 'Level 6', tierColor: 'text-yellow-400' },
              { plan: 'Sovereign', min: 100000, max: null, days: 90, daily: 4.5, total: 405, arrow: 'Institutional-grade. Personal fund manager. $100K+ dedicated suite.', tier: 'Institutional', tierColor: 'text-amber-400' },
            ].map((row, i) => (
              <div key={row.plan} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < 6 && <div className="w-px h-4 bg-cyan-500/20 mt-1" />}
                </div>
                <div className="glass-card p-5 flex-1 mb-0 hover:border-cyan-500/20 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-bold text-white">{row.plan}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${row.tierColor}`}>{row.tier}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      ${row.min.toLocaleString()}{row.max ? `–$${row.max.toLocaleString()}` : '+'} · {row.days}d · {row.daily}%/day
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.arrow}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card p-6 border border-cyan-500/20 bg-cyan-500/5 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              The key insight: <strong className="text-white">each plan is self-funding.</strong> You never need to add new money if you do not want to.
              The system is designed so your returns from each plan naturally cover the minimum of the next tier.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Past performance does not guarantee future results. Returns are subject to platform terms. Always invest within your means.
            </p>
          </div>
        </div>
      </section>

      {/* ── REAL EXAMPLE ─────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            A Real Example: Starter Trial to Booster
          </h2>

          <div className="space-y-5">
            {/* Starter Trial */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Starter Trial Day 1</p>
                  <p className="text-sm text-muted-foreground">7 days · 1.5%/day · Min $200</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'You deposit', value: '$200.00', highlight: false },
                  { label: 'Daily reward (1.5%)', value: '+$3.00 / day', highlight: false },
                  { label: 'Total earned over 7 days', value: '$21.00', highlight: false },
                  { label: 'Full payout at day 7', value: '$221.00', highlight: true },
                ].map((row) => (
                  <div key={row.label} className={`flex justify-between items-center rounded-xl px-4 py-3 ${row.highlight ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20' : 'bg-white/[0.03]'}`}>
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className={`font-semibold ${row.highlight ? 'gradient-text' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground text-sm px-2">
              <ChevronRight className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <p>Now reinvest your $221 + add just $279 = $500. Activate the Booster Plan.</p>
            </div>

            {/* Booster */}
            <div className="glass-card p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Booster Plan Day 8</p>
                  <p className="text-sm text-muted-foreground">14 days · 1.8%/day · $500 in</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Your stake', value: '$500.00', highlight: false },
                  { label: 'Daily reward (1.8%)', value: '+$9.00 / day', highlight: false },
                  { label: 'Total earned over 14 days', value: '$126.00', highlight: false },
                  { label: 'Full payout at day 22', value: '$626.00', highlight: true },
                ].map((row) => (
                  <div key={row.label} className={`flex justify-between items-center rounded-xl px-4 py-3 ${row.highlight ? 'bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20' : 'bg-white/[0.03]'}`}>
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className={`font-semibold ${row.highlight ? 'text-green-400' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground/50 italic px-4">
              Examples for illustration only. Returns are not guaranteed. Crypto carries inherent risk.
            </p>
          </div>
        </div>
      </section>

      {/* ── STAKING VS EVERYTHING ELSE: Comparison ───────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Head to Head</p>
            <h2 className="text-3xl font-black mb-4">Staking vs Every Other Option</h2>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="grid grid-cols-5 border-b border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="p-4 col-span-2">Investment type</div>
              <div className="p-4 text-center">Daily income</div>
              <div className="p-4 text-center">Knowledge needed</div>
              <div className="p-4 text-center">Min start</div>
            </div>
            {[
              { type: 'Savings account', daily: '~0.001%', knowledge: 'None', min: '$100', bad: [true, false, false] },
              { type: 'Government bonds', daily: '~0.014%', knowledge: 'Low', min: '$1,000', bad: [true, false, true] },
              { type: 'Stock market', daily: '±Variable', knowledge: 'High', min: '$1', bad: [true, true, false] },
              { type: 'Real estate', daily: '±Variable', knowledge: 'Very High', min: '$50,000+', bad: [true, true, true] },
              { type: 'Crypto trading', daily: '±Variable', knowledge: 'Expert', min: '$100', bad: [true, true, false] },
              { type: 'StakeOnix Staking', daily: 'Variable · see plans', knowledge: 'None', min: '$200', bad: [false, false, false], highlight: true },
            ].map((row) => (
              <div
                key={row.type}
                className={`grid grid-cols-5 border-b border-white/[0.05] last:border-0 text-sm ${row.highlight ? 'bg-cyan-500/5 border-cyan-500/10' : ''}`}
              >
                <div className={`p-4 col-span-2 font-medium ${row.highlight ? 'text-cyan-400 font-bold' : 'text-white'}`}>{row.type}</div>
                <div className={`p-4 text-center font-semibold ${row.bad[0] ? 'text-red-400' : 'text-green-400'}`}>{row.daily}</div>
                <div className={`p-4 text-center ${row.bad[1] ? 'text-red-400' : 'text-green-400'}`}>{row.knowledge}</div>
                <div className={`p-4 text-center ${row.bad[2] ? 'text-red-400' : 'text-green-400'}`}>{row.min}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-black text-center mb-10">Common Questions, Honest Answers</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I actually lose money staking on StakeOnix?',
                a: 'Staking rewards on StakeOnix are variable, not guaranteed. Cryptocurrency values can also change - if the underlying asset depreciates in dollar terms, the dollar value of your holdings changes accordingly. If you want to reduce price exposure, staking stablecoins (USDT or USDC) denominated in USD is an option.',
              },
              {
                q: 'What is the minimum I need to start?',
                a: 'The minimum deposit is $200 equivalent. This applies to the entry-level plan. Larger plans have higher minimums. Full details are available after account creation.',
              },
              {
                q: 'Do I need any crypto experience?',
                a: 'No. If you can sign up for a website and send a payment, you have all the skills needed. Our onboarding includes step-by-step guidance on depositing and activating your first plan.',
              },
              {
                q: 'How often are rewards paid?',
                a: 'Every 24 hours, automatically. You wake up each morning to a higher balance. No claiming, no transactions to sign, no gas fees.',
              },
              {
                q: 'Is staking on StakeOnix regulated?',
                a: 'StakeOnix operates under financial services compliance in Canada, with full KYC and AML procedures. We actively welcome regulatory oversight it keeps the industry clean and protects you.',
              },
              {
                q: 'Can I have multiple plans running at once?',
                a: 'Yes. Many investors run the Starter Trial as a test, then immediately activate a larger plan alongside it. There is no limit on concurrent plans.',
              },
              {
                q: 'What happens when a plan expires?',
                a: 'Your principal and all accumulated rewards are returned to your StakeOnix wallet. You can then withdraw to your external crypto wallet or reinvest into the same or a higher-tier plan most investors do the latter.',
              },
            ].map((faq) => (
              <div key={faq.q} className="glass-card p-5 rounded-xl">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5 shrink-0 font-bold">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground pl-5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-background to-purple-950/20" />
        <div className="glow-blob w-[600px] h-[400px] bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4 text-center max-w-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 mx-auto mb-6">
            <Rocket className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Start With $200. See Results in 7 Days.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-3">
            The Starter Trial is specifically designed for first-timers. It is short, low-commitment,
            and produces real payouts in your account within a week. Try it then decide if you want more.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-8">
            No lock-in beyond the plan term · Daily withdrawals available · Cancel anytime before activation
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 rounded-xl text-base px-10">
                <Rocket className="h-4 w-4" />
                Create Free Account
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                Browse All 9 Plans <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/40 max-w-md mx-auto">
            All investment carries risk. Cryptocurrency values fluctuate. Do not invest more than you can afford to lose.
            StakeOnix is registered in Ontario, Canada. Past performance does not guarantee future results.
          </p>
        </div>
      </section>

    </main>
    </>
  )
}
