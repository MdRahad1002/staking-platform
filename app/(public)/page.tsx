export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'StakeOnix - #1 Crypto Staking Platform | Earn Daily Passive Income',
  description:
    'Looking for a way to earn money online? StakeOnix pays you every single day on your crypto - Bitcoin, Ethereum, USDT & more. No trading needed. Works like a bank savings account but pays way more. Start from just $200.',
  keywords: [
    'how to make money online',
    'earn money from home 2026',
    'passive income ideas',
    'make money with crypto',
    'how to earn daily income',
    'earn money while you sleep',
    'crypto that pays you daily',
    'how to earn interest on bitcoin',
    'make money without working',
    'best passive income 2026',
    'how to invest $100 and make money',
    'money making apps 2026',
    'earn rewards on cryptocurrency',
    'crypto staking platform',
    'bitcoin staking rewards',
    'ethereum staking',
    'USDT staking',
    'best staking platform 2026',
  ],
  alternates: { canonical: APP_URL },
  openGraph: {
    title: 'StakeOnix - Earn Daily Passive Income on Crypto',
    description: 'Thousands of people earn money every day doing absolutely nothing - their crypto earns for them on StakeOnix. Bitcoin, Ethereum, USDT. Start with $200, get paid daily.',
    url: APP_URL,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix Crypto Staking Platform' }],
  },
}

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'StakeOnix',
  url: APP_URL,
  description: 'Professional cryptocurrency staking platform offering daily passive income on Bitcoin, Ethereum, USDT, Solana and 10+ cryptocurrencies.',
  serviceType: 'Cryptocurrency Staking',
  areaServed: 'Worldwide',
  currenciesAccepted: 'BTC, ETH, USDT, USDC, LTC, TRX, BNB, SOL',
  priceRange: '$200+',
  telephone: ['+1-613-366-4391', '+44-056-0384-6173'],
  email: 'info@stakeonix.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '130 King St W',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5X 2A2',
      addressCountry: 'CA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Ashley Road',
      addressLocality: 'Altrincham',
      addressRegion: 'Cheshire',
      postalCode: 'WA14 2DT',
      addressCountry: 'GB',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2340',
    bestRating: '5',
  },
}

const faqHomepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is crypto staking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crypto staking is the process of locking up cryptocurrency assets to earn rewards. StakeOnix pools staking resources and distributes daily rewards to investors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I earn with StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Earnings depend on your staked amount and chosen plan. StakeOnix offers plans with daily returns ranging from 1.5% to 4.5% per day. Start with as little as $200.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is StakeOnix safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix employs SSL encryption, two-factor authentication, withdrawal PIN protection, and cold storage for the majority of user funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cryptocurrencies can I stake on StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix supports Bitcoin (BTC), Ethereum (ETH), USDT, USDC, Litecoin (LTC), Tron (TRX), BNB, and Solana (SOL).',
      },
    },
  ],
}

function HomePageSchemas() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqHomepageSchema) }} />
    </>
  )
}
import { Button } from '@/components/ui/button'
import { PlanCard } from '@/components/shared/PlanCard'
import CryptoTicker from '@/components/layout/CryptoTicker'
import ProfitCalculator from '@/components/shared/ProfitCalculator'
import { PartnersMarquee } from '@/components/layout/PartnersMarquee'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Star,
  Award,
  Cpu,
  Activity,
  DollarSign,
  Rocket,
  Eye,
  RefreshCw,
  BadgeCheck,
  Wallet,
  BarChart2,
  Clock,
  ShieldCheck,
} from 'lucide-react'

const features = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'High Daily Returns',
    description: 'Earn competitive daily returns on your crypto assets with transparent, audited staking plans.',
    color: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Bank-Grade Security',
    description: 'Industry-leading security with 2FA, AES-256 encryption, PIN protection and cold wallet storage.',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Activation',
    description: 'Start earning immediately. Your stake activates instantly with no waiting period.',
    color: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Multi-Currency Support',
    description: 'Deposit and earn in 170+ cryptocurrencies including BTC, ETH, USDT, BNB, SOL and more.',
    color: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Lucrative Referral Program',
    description: 'Earn 5–8% tiered commissions (L1) + 2% on your referrals\' referrals (L2). Passive income on passive income.',
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Real-Time Dashboard',
    description: 'Track your earnings live with detailed analytics, charts, transaction history and payout logs.',
    color: 'from-cyan-500/20 to-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
]

const stats = [
  { value: '$2.5B+', label: 'Total Value Staked', icon: <DollarSign className="h-5 w-5" /> },
  { value: '480K+', label: 'Active Stakers', icon: <Users className="h-5 w-5" /> },
  { value: '170+', label: 'Assets Supported', icon: <Globe className="h-5 w-5" /> },
  { value: '99.98%', label: 'Uptime Guarantee', icon: <Activity className="h-5 w-5" /> },
]

const howItWorks = [
  {
    step: '01',
    title: 'Create Account',
    desc: 'Sign up in 2 minutes with email verification and complete your KYC to unlock all features.',
    icon: <BadgeCheck className="h-6 w-6" />,
  },
  {
    step: '02',
    title: 'Deposit Funds',
    desc: 'Add crypto using our multi-currency deposit system. Bitcoin, Ethereum, USDT, BNB and 170+ others.',
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    step: '03',
    title: 'Choose a Plan',
    desc: 'Pick the staking plan that fits your goals. Flexible terms from 7 to 365 days with varying APRs.',
    icon: <BarChart2 className="h-6 w-6" />,
  },
  {
    step: '04',
    title: 'Earn Daily',
    desc: 'Watch your balance grow with automatic daily reward payouts deposited directly to your account.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
]

const testimonials = [
  {
    name: 'Marcus Holloway',
    title: 'Professional Trader',
    avatar: 'MH',
    rating: 5,
    text: 'I have used multiple staking platforms and this one stands out for its transparency, consistent payouts, and exceptional support. My portfolio has grown 3x in 8 months.',
    amount: '+340%',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Sarah Chen',
    title: 'Crypto Investor',
    avatar: 'SC',
    rating: 5,
    text: 'The daily returns are consistent and withdrawals are always instant. The security features give me complete peace of mind. Best staking platform I have ever used.',
    amount: '+218%',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Ahmed Karimi',
    title: 'DeFi Enthusiast',
    avatar: 'AK',
    rating: 5,
    text: 'Started with just $500 and now earning passive income daily. The referral program is incredibly generous too. Highly recommended to anyone serious about crypto.',
    amount: '+192%',
    color: 'from-green-500 to-emerald-600',
  },
]

const cryptoCoins = [
  { symbol: 'btc', name: 'Bitcoin' },
  { symbol: 'eth', name: 'Ethereum' },
  { symbol: 'usdt', name: 'Tether' },
  { symbol: 'bnb', name: 'BNB' },
  { symbol: 'sol', name: 'Solana' },
  { symbol: 'usdc', name: 'USDC' },
  { symbol: 'ada', name: 'Cardano' },
  { symbol: 'trx', name: 'TRON' },
  { symbol: 'dot', name: 'Polkadot' },
  { symbol: 'avax', name: 'Avalanche' },
  { symbol: 'matic', name: 'Polygon' },
  { symbol: 'link', name: 'Chainlink' },
]



async function getActivePlans() {
  try {
    return await prisma.stakingPlan.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
      take: 6,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [plans, session] = await Promise.all([getActivePlans(), getAuthSession()])

  const topApr = plans.length > 0
    ? Math.max(...plans.map((p) => parseFloat((p.dailyRoi * 365).toFixed(2))))
    : 0

  return (
    <div className="relative overflow-hidden">
      <HomePageSchemas />

      {/* Live Crypto Ticker */}
      <CryptoTicker />

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-950/30" />
        <div className="glow-blob w-[600px] h-[600px] bg-cyan-500/15 top-[-100px] left-[-100px]" />
        <div className="glow-blob w-[500px] h-[500px] bg-blue-600/10 bottom-0 right-[-50px]" />
        <div className="glow-blob w-[300px] h-[300px] bg-purple-600/10 top-1/2 left-1/2" />

        <div className="container relative mx-auto px-4 py-14 sm:py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

            {/* Left: Text content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Live &middot; Earn up to {topApr > 0 ? `${topApr}% APR` : '365% APR'} - Join 480K+ stakers
              </div>

              <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                Fast, Secure &amp;<br />
                <span className="gradient-text">Effortless Crypto</span><br />
                <span className="text-white">Staking for All</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Choose a plan, deposit crypto, and earn automatic daily rewards. No lockups,
                no complexity, just steady{' '}
                <strong className="text-white font-semibold">passive income</strong> from your digital assets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link href={session ? '/dashboard' : '/signup'} className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto gap-2 font-bold text-base px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-2xl shadow-cyan-500/30 border-0 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50"
                  >
                    <Rocket className="h-5 w-5" />
                    {session ? 'Go to Dashboard' : 'Start Earning Now'}
                  </Button>
                </Link>
                <Link href="/plans" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto gap-2 font-semibold text-base px-8 py-4 border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 rounded-2xl transition-all duration-300"
                  >
                    <Eye className="h-5 w-5" />
                    View Plans
                  </Button>
                </Link>
              </div>

              {!session && (
                <p className="text-xs text-muted-foreground mb-8">
                  No credit card required &bull; 2-minute setup &bull; $100 welcome bonus
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <ShieldCheck className="h-4 w-4 text-green-400" />, label: 'SSL Secured' },
                  { icon: <BadgeCheck className="h-4 w-4 text-blue-400" />, label: 'KYC Compliant' },
                  { icon: <Lock className="h-4 w-4 text-yellow-400" />, label: '2FA Protected' },
                  { icon: <RefreshCw className="h-4 w-4 text-cyan-400" />, label: 'Instant Payouts' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 border border-white/[0.08] rounded-full px-3 py-1.5">
                    {b.icon}
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: APY Snapshot Widget */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px]">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-3xl pointer-events-none" />

                <div className="relative rounded-2xl border border-white/10 bg-[#0a0f1e]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/10">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/[0.06]">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-400/80 mb-1">APY snapshot</p>
                      <h3 className="text-lg font-bold text-white leading-tight">Live rates across top assets</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Compare &quot;up to&quot; APYs and start earning instantly.</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1.5 flex-shrink-0 ml-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                      </span>
                      <span className="text-xs font-semibold text-cyan-300">Live</span>
                    </div>
                  </div>

                  {/* Coin list + Top-rate panel */}
                  <div className="flex gap-0 divide-x divide-white/[0.06] overflow-hidden">
                    {/* Left: coin rows */}
                    <div className="flex-1 py-2">
                      {[
                        { symbol: 'eth',  name: 'Ethereum', ticker: 'ETH',      apr: 9.0  },
                        { symbol: 'ada',  name: 'Cardano',  ticker: 'ADA',      apr: 8.5  },
                        { symbol: 'sol',  name: 'Solana',   ticker: 'SOL',      apr: 12.0 },
                        { symbol: 'dot',  name: 'Polkadot', ticker: 'DOT',      apr: 16.5 },
                        { symbol: 'avax', name: 'Avalanche',ticker: 'AVAX',     apr: 14.0 },
                        { symbol: 'atom', name: 'Cosmos',   ticker: 'ATOM',     apr: 21.5 },
                      ].map((coin) => (
                        <div
                          key={coin.symbol}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.04] transition-colors group cursor-default"
                        >
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:border-cyan-500/30 transition-colors">
                            <img
                              src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${coin.symbol}.svg`}
                              alt={coin.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white leading-tight">{coin.name}</p>
                            <p className="text-[11px] text-muted-foreground">{coin.ticker}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[10px] text-muted-foreground leading-none mb-0.5">Up to</p>
                            <p className="text-base font-black text-cyan-400">{coin.apr}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Top rate card */}
                    <div className="hidden sm:flex w-[158px] flex-shrink-0 p-4 flex-col gap-3 bg-white/[0.02]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Top rate</p>
                      <div className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                          <img
                            src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/atom.svg"
                            alt="ATOM"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-white">Cosmos</p>
                          <p className="text-[10px] text-muted-foreground">ATOM</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-black text-cyan-400 leading-none">21.5<span className="text-lg">%</span></p>
                          <p className="text-[10px] text-muted-foreground mt-1">Up to APY</p>
                        </div>
                      </div>
                      {/* Rate range bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                          <span>Rate range</span>
                        </div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-muted-foreground/60">Low</span>
                          <span className="text-cyan-400">High</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400" />
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                        APYs are &ldquo;up to&rdquo; and may vary by network conditions.
                      </p>
                      <Link href={session ? '/dashboard' : '/signup'}>
                        <button className="w-full text-[11px] font-bold py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all">
                          Start Staking →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating stat pill */}
                <div className="hidden sm:flex absolute -bottom-4 left-6 glass-card px-4 py-2.5 animate-float shadow-xl border border-green-500/20 z-10 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground">Daily Reward</p>
                      <p className="text-sm font-bold text-green-400">+$248.50</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute -top-4 right-6 glass-card px-4 py-2.5 animate-float shadow-xl border border-yellow-500/20 z-10 items-center gap-2" style={{ animationDelay: '-2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="h-3.5 w-3.5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground">Active Stakers</p>
                      <p className="text-sm font-bold gradient-text">480K+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-14 relative border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-600/5 to-purple-500/5" />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center group relative">
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/5" />
                )}
                <div className="flex justify-center mb-2 text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AS SEEN IN / PARTNERS */}
      <PartnersMarquee />

      {/* BODO/GLIMT SPONSORSHIP SHOWCASE */}
      <section className="py-16 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/20 via-background to-background pointer-events-none" />
        <div className="glow-blob w-[500px] h-[400px] bg-yellow-500/5 top-0 right-0" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left: image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/10 border border-yellow-500/20 group">
              <img
                src="/bodo-glimt-jersey.jpg"
                alt="Bodø/Glimt players wearing StakeOnix jerseys"
                className="w-full h-full object-cover object-center aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              {/* overlay badge */}
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-yellow-500/30 rounded-xl px-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">Official Kit Sponsor</span>
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-3">
                  Sponsorship &amp; Partnerships
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                  Proudly on the<br />
                  <span className="text-yellow-400">Bodø/Glimt</span> Jersey
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  StakeOnix is the official front-of-shirt sponsor of FK Bodø/Glimt - Norway&apos;s most
                  decorated club and regular UEFA Champions League competitor. Our brand is worn by
                  players every matchday, watched by millions across Europe.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'Eliteserien', label: 'Top-flight Norway' },
                  { value: 'UEFA', label: 'European competition' },
                  { value: '10K+', label: 'Home stadium capacity' },
                  { value: '4×', label: 'Norwegian champions' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-yellow-500/5 border border-yellow-500/15 px-4 py-3">
                    <p className="text-base font-black text-yellow-300">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <img
                    src="/logos/bodo-glimt.no.png"
                    alt="Bodø/Glimt crest"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  <span className="text-white font-semibold">FK Bodø/Glimt</span> - Founded 1916, based in Bodø, Norway. Multiple-time Eliteserien champions and Europa League regulars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE RATES */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Real-Time APR</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Live Staking Rates</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Competitive yields updated continuously - stake any of these assets and start earning today.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { symbol: 'eth',   name: 'Ethereum',    apr: 9.0,  badge: null },
              { symbol: 'btc',   name: 'Bitcoin',     apr: 7.0,  badge: null },
              { symbol: 'sol',   name: 'Solana',      apr: 12.0, badge: null },
              { symbol: 'dot',   name: 'Polkadot',    apr: 16.5, badge: null },
              { symbol: 'atom',  name: 'Cosmos',      apr: 21.5, badge: 'Top Rate' },
              { symbol: 'avax',  name: 'Avalanche',   apr: 14.0, badge: null },
              { symbol: 'matic', name: 'Polygon',     apr: 12.5, badge: null },
              { symbol: 'ada',   name: 'Cardano',     apr: 8.5,  badge: null },
              { symbol: 'near',  name: 'NEAR',        apr: 14.0, badge: null },
              { symbol: 'algo',  name: 'Algorand',    apr: 10.0, badge: null },
              { symbol: 'xtz',   name: 'Tezos',       apr: 9.5,  badge: null },
              { symbol: 'trx',   name: 'TRON',        apr: 10.5, badge: null },
            ].map((coin) => (
              <div
                key={coin.symbol}
                className="glass-card p-5 flex items-center gap-4 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group relative overflow-hidden"
              >
                {coin.badge && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-2 py-0.5 rounded-full">
                    {coin.badge}
                  </span>
                )}
                <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 flex-shrink-0 group-hover:border-cyan-500/30 transition-colors">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${coin.symbol}.svg`}
                    alt={coin.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{coin.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{coin.symbol.toUpperCase()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black text-cyan-400">{coin.apr}%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">APR</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={session ? '/dashboard' : '/signup'}>
              <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 rounded-xl font-semibold px-8">
                <TrendingUp className="h-4 w-4" />
                Start Earning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SUPPORTED CRYPTOCURRENCIES */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">170+ Assets</p>
            <h2 className="text-3xl md:text-4xl font-bold">Supported Cryptocurrencies</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Stake and earn rewards across the world's most popular digital assets.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center max-w-4xl mx-auto">
            {cryptoCoins.map((coin) => (
              <div
                key={coin.symbol}
                className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 hover:scale-110 cursor-default w-20"
                title={coin.name}
              >
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:border-cyan-500/30 transition-colors">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${coin.symbol}.svg`}
                    alt={coin.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{coin.symbol.toUpperCase()}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-dashed border-white/10 w-20 cursor-default">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                <span className="text-base text-muted-foreground font-bold">+158</span>
              </div>
              <span className="text-[10px] text-muted-foreground text-center">More</span>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PLANS */}
      {plans.length > 0 && (
        <section className="py-20 relative border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent pointer-events-none" />
          <div className="container relative mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Staking Products</p>
                <h2 className="text-3xl md:text-4xl font-bold">Popular Plans</h2>
                <p className="text-muted-foreground mt-2 max-w-lg">
                  Our most popular staking options delivering the best risk-adjusted returns.
                </p>
              </div>
              <Link href="/plans" className="hidden md:flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                View all plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} isLoggedIn={!!session} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/plans">
                <Button variant="outline" size="lg" className="gap-2 border-white/10 hover:border-cyan-500/40 rounded-xl">
                  View All Plans <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* PROFIT CALCULATOR */}
      <ProfitCalculator />

      {/* HOW IT WORKS */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Start Earning in 4 Steps</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              No crypto expertise required. Go from zero to earning in under 5 minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-11 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative group">
                <div className="glass-card p-7 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-500 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute top-11 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                    <ChevronRight className="h-3 w-3 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/25 via-background to-blue-950/25 pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="glow-blob w-[600px] h-[600px] bg-cyan-600/10 top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
        <div className="glow-blob w-[500px] h-[500px] bg-blue-600/10 bottom-0 right-0 translate-x-1/4 translate-y-1/4" />

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Award className="h-3.5 w-3.5" />
              Why StakeOnix
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
              The Smarter Way to{' '}
              <span className="gradient-text">Grow Your Crypto</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              While others watch the charts and stress about timing the market, StakeOnix users earn daily - automatically, securely, and without lifting a finger.
            </p>
          </div>

          {/* Top two-col pitch block */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Left - Main pitch */}
            <div className="glass-card p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-cyan-500/[0.07] to-blue-600/[0.07] border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 text-cyan-400 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Your money works. You rest.</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Traditional banks pay you 0.01% a year. The stock market demands research, timing, and nerves. StakeOnix gives you a third option - put your crypto to work in a proven staking protocol and collect rewards every single day, whether you are sleeping, working, or on vacation.
                </p>
                <ul className="space-y-3">
                  {[
                    'No trading knowledge needed - zero experience required',
                    'Rewards credited to your wallet every 24 hours',
                    'Withdraw anytime - no lock-in traps',
                    'Start with as little as $200 Starter Trial plan',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <Link href="/signup">
                  <Button size="lg" className="gap-2 rounded-xl w-full sm:w-auto">
                    <Rocket className="h-4 w-4" />
                    Start Earning Today
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Proof stats */}
            <div className="flex flex-col gap-5">
              {/* Big stat */}
              <div className="glass-card p-7 bg-gradient-to-br from-green-500/[0.07] to-emerald-600/[0.07] border-green-500/20 hover:border-green-500/35 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Paid to Users</p>
                    <p className="text-5xl font-black text-white">$2.5B+</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 text-green-400">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Distributed across 170+ countries since launch - every dollar fully verifiable on-chain.</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 mx-auto mb-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">87K+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Investors</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-400 mx-auto mb-3">
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">4.8/5</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">User Rating</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 mx-auto mb-3">
                    <Clock className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">99.95%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Uptime SLA</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 mx-auto mb-3">
                    <Globe className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">170+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 6-point trust grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Lock className="h-5 w-5" />,
                color: 'bg-cyan-500/15 text-cyan-400',
                title: 'Bank-Grade Security',
                desc: '256-bit SSL encryption, multi-signature cold wallets, and round-the-clock threat monitoring. Your assets are protected like a vault.',
              },
              {
                icon: <Eye className="h-5 w-5" />,
                color: 'bg-green-500/15 text-green-400',
                title: '100% Transparent',
                desc: "Every reward, every transaction, every fee - visible and auditable. We have nothing to hide and everything to prove. What you see is what you get.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                color: 'bg-yellow-500/15 text-yellow-400',
                title: 'Instant Withdrawals',
                desc: "When it's your money, you should be able to access it. No waiting periods, no complicated unlock windows. Withdraw to your wallet within minutes.",
              },
              {
                icon: <RefreshCw className="h-5 w-5" />,
                color: 'bg-purple-500/15 text-purple-400',
                title: 'Auto-Compounding',
                desc: 'Your daily earnings are automatically reinvested. Compounding daily means your balance snowballs - earning more tomorrow than it did today.',
              },
              {
                icon: <BadgeCheck className="h-5 w-5" />,
                color: 'bg-blue-500/15 text-blue-400',
                title: 'Regulated & Compliant',
                desc: 'Licensed financial operations in Canada with full KYC/AML compliance. We operate with the same standards as traditional financial institutions.',
              },
              {
                icon: <Activity className="h-5 w-5" />,
                color: 'bg-orange-500/15 text-orange-400',
                title: 'Live Support, Always',
                desc: 'Real humans, not bots. Our support team is available 24/7 via live chat and Telegram. Typical response time under 5 minutes.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-7 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group cursor-default flex gap-5 items-start">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5 text-white">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 relative">
        <div className="glow-blob w-[900px] h-[400px] bg-cyan-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Platform Benefits</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Built for Serious Earners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to grow your crypto portfolio safely, efficiently and profitably.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-7 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group cursor-default">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="py-16 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-purple-950/20" />
        <div className="glow-blob w-[400px] h-[400px] bg-blue-600/10 bottom-0 right-0" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Enterprise Security</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Funds Are Always Safe</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We employ the same security standards used by the world's top financial institutions.
                Your assets are protected 24/7 with real-time threat monitoring and instant response.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="h-5 w-5 text-green-400" />, title: 'AES-256 Encryption', desc: 'Military-grade data protection' },
                  { icon: <Lock className="h-5 w-5 text-blue-400" />, title: 'Cold Wallet Storage', desc: '95% of funds in cold storage' },
                  { icon: <Eye className="h-5 w-5 text-cyan-400" />, title: 'Real-time Monitoring', desc: '24/7 anomaly detection' },
                  { icon: <RefreshCw className="h-5 w-5 text-purple-400" />, title: 'Multi-sig Auth', desc: 'Multi-signature withdrawals' },
                  { icon: <BadgeCheck className="h-5 w-5 text-yellow-400" />, title: 'KYC/AML Compliance', desc: 'Fully regulated operations' },
                  { icon: <Cpu className="h-5 w-5 text-pink-400" />, title: 'DDoS Protection', desc: 'Cloudflare enterprise shield' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all">
                    <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-pulse-glow" />
                <div className="absolute inset-10 rounded-full border border-cyan-500/15" />
                <div className="absolute inset-20 rounded-full border border-blue-500/15 animate-spin-slow" style={{ animationDuration: '15s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500/20 to-cyan-600/20 border border-green-500/30 flex items-center justify-center animate-pulse-glow">
                    <ShieldCheck className="h-14 w-14 text-green-400" />
                  </div>
                </div>
                {[
                  { icon: <Lock className="h-3.5 w-3.5 text-blue-400" />, bg: 'bg-blue-500/20', top: '0', left: '50%', tx: '-50%', ty: '-50%' },
                  { icon: <Zap className="h-3.5 w-3.5 text-yellow-400" />, bg: 'bg-yellow-500/20', top: '50%', left: '100%', tx: '-100%', ty: '-50%' },
                  { icon: <Eye className="h-3.5 w-3.5 text-cyan-400" />, bg: 'bg-cyan-500/20', top: '100%', left: '50%', tx: '-50%', ty: '-100%' },
                  { icon: <BadgeCheck className="h-3.5 w-3.5 text-purple-400" />, bg: 'bg-purple-500/20', top: '50%', left: '0', tx: '0%', ty: '-50%' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`absolute w-9 h-9 rounded-xl ${item.bg} border border-white/10 flex items-center justify-center`}
                    style={{ top: item.top, left: item.left, transform: `translate(${item.tx}, ${item.ty})` }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Community</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Trusted by Thousands</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Real stories from real investors growing their wealth every single day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-7 hover:border-white/20 transition-all duration-300 hover:bg-white/5 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Total Return</p>
                    <p className="text-sm font-bold text-green-400">{t.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative">
        <div className="glow-blob w-[700px] h-[350px] bg-cyan-500/[0.08] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 via-blue-950/60 to-purple-950/40 border border-cyan-500/20 rounded-3xl" />
            <div className="absolute inset-0 hero-grid opacity-20 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-72 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div className="relative p-12 md:p-20 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-6">
                <Rocket className="h-3.5 w-3.5" />
                Start earning in under 5 minutes
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
                Ready to Start{' '}
                <span className="gradient-text">Staking?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg leading-relaxed">
                Create your free account today and earn your first daily reward within minutes.
                No minimum lockup. Withdraw anytime. Join 480,000+ smart investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={session ? '/dashboard' : '/signup'}>
                  <Button
                    size="xl"
                    className="gap-2 font-bold text-base px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-2xl shadow-cyan-500/30 border-0 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Rocket className="h-5 w-5" />
                    {session ? 'View Dashboard' : 'Create Free Account'}
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button
                    variant="outline"
                    size="xl"
                    className="gap-2 font-semibold text-base px-10 py-5 border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 rounded-2xl transition-all duration-300"
                  >
                    Explore Plans <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
                {[
                  'No hidden fees',
                  'Withdraw anytime',
                  'Instant activation',
                  '$100 welcome bonus',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
