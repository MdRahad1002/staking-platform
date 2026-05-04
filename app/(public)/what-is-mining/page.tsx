import { Metadata } from 'next'
import Link from 'next/link'
import {
  Cpu,
  Zap,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Rocket,
  Clock,
  DollarSign,
  TrendingUp,
  Thermometer,
  Globe,
  BarChart3,
  ShieldCheck,
  Coins,
  Bolt,
  Pickaxe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'What Is Crypto Mining? Plain English Explanation | StakeOnix',
  description:
    'What is crypto mining? Learn how it works with simple real-life comparisons, see inside massive mining farms, and discover why staking is the smarter, cheaper alternative for everyday investors.',
  alternates: { canonical: `${APP_URL}/what-is-mining` },
  openGraph: {
    title: 'What Is Crypto Mining? Plain English Guide + Mining vs Staking',
    description:
      'Understand crypto mining in simple terms, see real mining farms, and learn whether mining or staking is better for you in 2026.',
    url: `${APP_URL}/what-is-mining`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'What Is Crypto Mining? Plain English Guide — StakeOnix' }],
  },
}

const miningBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'What Is Crypto Mining?', item: `${APP_URL}/what-is-mining` },
  ],
}

const miningArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is Crypto Mining? Plain English Explanation',
  description: 'Learn how crypto mining works with real-life comparisons, see inside massive mining farms, and discover why staking is the smarter alternative for everyday investors.',
  url: `${APP_URL}/what-is-mining`,
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
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/what-is-mining` },
}

export default function WhatIsMiningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(miningArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(miningBreadcrumbSchema) }} />
      <main className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-background to-yellow-950/10" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/8 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <HelpCircle className="h-3.5 w-3.5" />
            Plain English Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
            What Is Crypto Mining?
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Explained Like You're Five
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Millions of computers around the world are racing to solve puzzles 24/7. The winners
            earn crypto. That, in a nutshell, is mining. Here's the full picture and why most
            people choose staking instead.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/what-is-staking">
              <Button size="lg" className="gap-2 rounded-xl text-base px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0">
                <TrendingUp className="h-4 w-4" />
                Learn About Staking Instead
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                See Staking Plans <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE REAL-LIFE ANALOGY ─────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Real-Life Comparison</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Think of It Like a <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Gold Rush</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The easiest way to understand crypto mining is to compare it to something you already know.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Real gold mining */}
            <div className="glass-card p-7 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
              <div className="text-4xl mb-4">⛏️</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">Traditional Gold Mining</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'You invest in expensive equipment (drills, trucks, processing plants)',
                  'You spend enormous energy digging through rock and earth',
                  'Occasionally you strike gold and earn a reward',
                  'The more land you cover, the better your odds of finding gold',
                  'Competition is fierce thousands of miners fighting for the same gold',
                  'Your profits shrink as gold becomes harder to find',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Crypto mining */}
            <div className="glass-card p-7 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">Crypto Mining</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'You invest in expensive hardware (GPUs, ASICs special mining computers)',
                  'Your machines consume massive amounts of electricity 24/7',
                  'Occasionally your machine wins a block and earns a crypto reward',
                  'The more computing power you have, the better your odds',
                  'Competition is fierce millions of machines fighting for the same reward',
                  'Rewards halve every 4 years (Bitcoin halving) mining gets harder over time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-card p-7 rounded-2xl border border-white/10 text-center">
            <p className="text-lg font-semibold text-white mb-2">The Punchline</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Just like a gold rush, the big winners in crypto mining are the ones who arrived
              early and had the most resources. Today's Bitcoin mining is dominated by
              industrial-scale operations with warehouses full of machines. The everyday person
              simply cannot compete.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT ACTUALLY WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Step by Step</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              How Crypto Mining Actually Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Under the hood, mining is about verifying transactions and securing the network. Here is exactly what happens.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {[
              {
                step: '01',
                icon: '🛒',
                title: 'Someone sends crypto to someone else',
                desc: 'When Alice sends 1 Bitcoin to Bob, that transaction is broadcast to the entire Bitcoin network. But it is not confirmed yet it is sitting in a waiting room called the "mempool".',
                color: 'border-orange-500/20 bg-orange-500/5',
                numColor: 'from-orange-500 to-yellow-500',
              },
              {
                step: '02',
                icon: '🧩',
                title: 'Miners compete to solve a giant puzzle',
                desc: 'Miners collect batches of waiting transactions and race to solve an incredibly difficult mathematical puzzle. The puzzle is designed so that the only way to solve it is to try billions of random guesses per second. This is why mining needs so much computing power.',
                color: 'border-yellow-500/20 bg-yellow-500/5',
                numColor: 'from-yellow-500 to-amber-500',
              },
              {
                step: '03',
                icon: '🏆',
                title: 'The first one to solve it wins',
                desc: 'The miner who finds the correct answer first broadcasts their solution to the network. Other miners verify it (this takes milliseconds). The winning miner gets to add the next "block" of transactions to the blockchain.',
                color: 'border-amber-500/20 bg-amber-500/5',
                numColor: 'from-amber-500 to-orange-500',
              },
              {
                step: '04',
                icon: '💰',
                title: 'The winner receives a block reward',
                desc: 'As a reward for doing this work, the winning miner receives newly created Bitcoin (currently 3.125 BTC per block after the 2024 halving) plus all the transaction fees from that block. This is the only way new Bitcoin is created.',
                color: 'border-green-500/20 bg-green-500/5',
                numColor: 'from-green-500 to-emerald-500',
              },
              {
                step: '05',
                icon: '🔁',
                title: 'The race starts again immediately',
                desc: 'A new block is targeted every 10 minutes. The network automatically adjusts the difficulty of the puzzle every 2,016 blocks to keep that 10-minute window consistent even if more miners join or leave.',
                color: 'border-blue-500/20 bg-blue-500/5',
                numColor: 'from-blue-500 to-cyan-500',
              },
            ].map((item) => (
              <div key={item.step} className={`glass-card p-6 rounded-2xl border ${item.color} flex gap-5`}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.numColor} text-white text-xs font-bold shadow-lg`}>
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple visual */}
          <div className="glass-card p-6 rounded-2xl border border-orange-500/20 text-center">
            <p className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-4">The Cycle Visualised</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {[
                { icon: '💳', label: 'Transactions broadcast' },
                { icon: '→', label: '', arrow: true },
                { icon: '🧩', label: 'Miners solve puzzle' },
                { icon: '→', label: '', arrow: true },
                { icon: '🏆', label: 'Winner adds block' },
                { icon: '→', label: '', arrow: true },
                { icon: '💰', label: 'Reward paid' },
                { icon: '→', label: '', arrow: true },
                { icon: '🔁', label: 'Repeat every ~10 min' },
              ].map((item, i) =>
                item.arrow ? (
                  <span key={i} className="text-orange-400/50 text-lg font-light hidden sm:inline">→</span>
                ) : (
                  <span key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium">
                    <span>{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MINING FARMS VISUAL ───────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Inside the Industry</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              What a Real Mining Farm Looks Like
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This is not something you can do on your laptop. Industrial crypto mining looks
              more like a data centre than a hobby. These are real-world large-scale operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
                  alt="Large-scale Bitcoin mining facility with rows of ASIC miners"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Industrial ASIC Mining Farm
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1">Rows of ASIC Machines</h3>
                <p className="text-sm text-muted-foreground">
                  Each machine is purpose-built to solve Bitcoin's mining puzzle. A single modern
                  ASIC costs $2,000–$15,000 and consumes more electricity than a household
                  refrigerator running non-stop. Large farms house tens of thousands of them.
                </p>
              </div>
            </div>

            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
                  alt="Server room cooling systems for crypto mining operations"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Cooling Infrastructure
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-1">Massive Cooling Systems</h3>
                <p className="text-sm text-muted-foreground">
                  Mining machines generate extreme heat. Farms require industrial cooling systems
                  running 24/7. This is one reason mining operations are often located in cold
                  climates like Iceland, Canada, or Norway to reduce cooling costs.
                </p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '⚡', label: 'Bitcoin network energy use', value: '~150 TWh/year', sub: 'More than Argentina uses' },
              { icon: '💻', label: 'Active mining machines', value: '~7 million+', sub: 'Globally as of 2026' },
              { icon: '💸', label: 'Cost to mine 1 BTC', value: '$25,000–$40,000', sub: 'Average global estimate' },
              { icon: '🏭', label: 'Biggest mining pool share', value: '~18–25%', sub: 'Foundry USA (2026)' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5 rounded-2xl text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground/50 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE REAL COST OF MINING ───────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">The Honest Picture</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              What It Actually Costs to Mine Crypto
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Before anyone starts mining, they need to understand the full cost structure. It is not cheap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: <Cpu className="h-6 w-6" />,
                color: 'text-red-400 bg-red-500/10 border-red-500/20',
                title: 'Hardware',
                items: [
                  'Bitcoin ASIC (Antminer S21): ~$4,000–$10,000 each',
                  'GPU rigs for Ethereum-type coins: ~$2,000–$6,000',
                  'Hardware becomes obsolete in 2–3 years',
                  'You need many machines to be competitive',
                ],
              },
              {
                icon: <Zap className="h-6 w-6" />,
                color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
                title: 'Electricity',
                items: [
                  'One ASIC uses ~3,500 watts (like 35 light bulbs)',
                  'At $0.10/kWh, one machine costs ~$250/month in electricity',
                  'A small farm of 50 machines = $12,500/month in power alone',
                  'Industrial miners seek sub-$0.04/kWh rates to survive',
                ],
              },
              {
                icon: <Thermometer className="h-6 w-6" />,
                color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
                title: 'Infrastructure',
                items: [
                  'Industrial cooling systems ($50K+)',
                  'Facility rental or construction',
                  'Electrical upgrades (high-capacity circuits)',
                  'Security, maintenance, and operations staff',
                ],
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
                title: 'Market Risk',
                items: [
                  'If Bitcoin price drops, rewards are worth less',
                  'Difficulty increases as more miners join',
                  'Halving events cut your reward in half every 4 years',
                  'You can mine at a loss for months without knowing',
                ],
              },
            ].map((card) => (
              <div key={card.title} className={`glass-card p-6 rounded-2xl border ${card.color.split(' ').slice(2).join(' ')}`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${card.color.split(' ').slice(0, 2).join(' ')}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-white mb-3">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="h-4 w-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="glass-card p-7 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
            <p className="text-xl font-bold text-white mb-2">The Bottom Line on Mining</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The average person starting mining today with $5,000 invested in hardware and
              electricity would take 12–24 months just to break even assuming Bitcoin's price
              doesn't drop. The window for home mining profitability largely closed after 2021.
              Today it is dominated by industrial operators in low-electricity countries.
            </p>
          </div>
        </div>
      </section>

      {/* ── MINING VS STAKING ─────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Head to Head</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Mining vs Staking
              <br />
              <span className="gradient-text">Which Is Better for You?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Both mining and staking let you earn crypto. But they are fundamentally different
              in cost, risk, and accessibility. Here is an honest side-by-side comparison.
            </p>
          </div>

          {/* Header row */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div />
            <div className="glass-card p-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 text-center">
              <div className="text-2xl mb-1">⛏️</div>
              <p className="font-bold text-white text-sm">Mining</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 text-center">
              <div className="text-2xl mb-1">🪙</div>
              <p className="font-bold text-white text-sm">Staking (StakeOnix)</p>
            </div>
          </div>

          {/* Comparison rows */}
          {[
            {
              label: 'Min. investment',
              mine: '$2,000–$10,000+ in hardware',
              stake: 'From $100',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Setup time',
              mine: 'Days to weeks (hardware, configuration, power)',
              stake: 'Under 5 minutes to start earning',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Ongoing costs',
              mine: 'High electricity + maintenance every month',
              stake: 'Zero running costs',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Predictability',
              mine: 'Unpredictable depends on luck, difficulty, price',
              stake: 'Fixed daily % you know exactly what you earn',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Technical skill',
              mine: 'High hardware, software, networking, maintenance',
              stake: 'None deposit and the platform does the rest',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Returns',
              mine: 'Variable can be negative during bear markets',
              stake: '1.5%–4.5%/day fixed across 9 plans',
              mineColor: 'text-yellow-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Risk to capital',
              mine: 'Hardware loses value becomes worthless fast',
              stake: 'Principal returned at plan maturity',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Physical requirements',
              mine: 'Space, cooling, dedicated power circuits',
              stake: 'Just an internet connection',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Noise & heat',
              mine: 'Extremely loud (80+ dB), extremely hot',
              stake: 'Silent runs on our servers, not yours',
              mineColor: 'text-red-400',
              stakeColor: 'text-green-400',
            },
            {
              label: 'Passive income',
              mine: 'Requires constant monitoring and management',
              stake: 'Truly passive earnings credited every 24h',
              mineColor: 'text-yellow-400',
              stakeColor: 'text-green-400',
            },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-3 gap-4 mb-2">
              <div className="glass-card p-4 rounded-xl flex items-center">
                <span className="text-sm font-semibold text-muted-foreground">{row.label}</span>
              </div>
              <div className="glass-card p-4 rounded-xl border border-orange-500/10 bg-orange-500/[0.03] flex items-center">
                <span className={`text-xs leading-relaxed ${row.mineColor}`}>{row.mine}</span>
              </div>
              <div className="glass-card p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.05] flex items-center">
                <span className={`text-xs leading-relaxed ${row.stakeColor}`}>{row.stake}</span>
              </div>
            </div>
          ))}

          {/* Verdict */}
          <div className="mt-8 glass-card p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-blue-950/20 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-2xl font-black text-white mb-3">The Verdict</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Mining is for industrial operators with cheap electricity and millions in capital.
              Staking is for everyday investors who want predictable daily returns without the
              hardware, the noise, the electricity bill, or the technical headache.
            </p>
            <p className="text-sm text-muted-foreground/70">
              In 2026, the smart money chooses staking.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Quick Answers</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Common Questions About Mining</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I mine Bitcoin on my home computer?',
                a: 'Technically yes, but it would take millions of years to solve a block on a standard laptop. Bitcoin mining today requires purpose-built ASIC machines costing thousands of dollars. Home GPU mining was viable for Ethereum, but Ethereum switched to Proof of Stake in 2022, removing that option.',
              },
              {
                q: 'What is an ASIC miner?',
                a: 'ASIC stands for Application-Specific Integrated Circuit. It is a computer chip built to do exactly one thing: solve Bitcoin\'s mining puzzle. It does this billions of times per second. An Antminer S21, one of the current best models, performs 200 TH/s (200 trillion hashes per second) and costs around $4,000–$7,000.',
              },
              {
                q: 'What is a mining pool?',
                a: 'Because winning a block alone is rare (like winning a lottery), miners team up in "pools". All the pool\'s combined computing power increases the odds of winning. When the pool wins, the reward is split proportionally. Most solo miners join pools to get smaller but consistent payouts rather than waiting years for a solo win.',
              },
              {
                q: 'Is crypto mining legal?',
                a: 'In most countries, yes. However, several countries have restricted or banned it due to energy concerns, including China (banned in 2021), Kosovo, and some Iranian provinces. In Canada, the USA, and most of Europe it is fully legal. Always check your local regulations.',
              },
              {
                q: 'What is "Proof of Work"?',
                a: 'Mining is the mechanism behind a consensus system called Proof of Work (PoW). Miners "prove" they did computational "work" by showing a valid solution to the puzzle. This is how Bitcoin secures its network without needing a central authority. The work makes it impossibly expensive for anyone to rewrite Bitcoin\'s transaction history.',
              },
              {
                q: 'What is the difference between Proof of Work and Proof of Stake?',
                a: 'Proof of Work (mining) secures the network through computing power and electricity. Proof of Stake (staking) secures the network through locked-up crypto assets. PoS is ~99% more energy-efficient, which is why Ethereum switched in 2022. StakeOnix lets you participate in the rewards of Proof of Stake networks without running your own validator.',
              },
            ].map((item) => (
              <div key={item.q} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-3 flex items-start gap-2.5">
                  <span className="text-cyan-400 flex-shrink-0 mt-0.5">Q.</span>
                  {item.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-background to-blue-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 text-center max-w-2xl">
          <div className="text-5xl mb-6">🪙</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Skip the Mining Headache.
            <br />
            <span className="gradient-text">Start Earning Daily with Staking.</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            No hardware. No electricity bills. No technical knowledge required. StakeOnix
            gives you the returns of crypto without the cost and complexity of mining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2 rounded-xl text-base px-10 h-13 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105 font-semibold"
              >
                <Rocket className="h-4 w-4" />
                Start Earning Today From $100
              </Button>
            </Link>
            <Link href="/what-is-staking">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10 h-13">
                What is Staking? <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-6">
            Daily returns credited to your account. Principal returned at plan maturity. Min. $100 to start.
          </p>
        </div>
      </section>

    </main>
    </>
  )
}
