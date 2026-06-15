export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: { absolute: 'How to Invest in Crypto & Earn Daily | FCA-Authorised Staking Platform | StakeOnix' },
  description:
    'StakeOnix: the regulated way to invest in crypto and earn daily passive income. Stake Bitcoin, Ethereum, USDT & 170+ assets. FCA-authorised (UK), FINTRAC-registered (Canada). Free to join in 2 minutes.',
  keywords: [
    'how to invest in cryptocurrency',
    'how to stake crypto',
    'crypto staking platform',
    'best crypto staking platform',
    'earn passive income with crypto',
    'how to earn with crypto',
    'bitcoin staking',
    'ethereum staking',
    'USDT staking',
    'solana staking',
    'best crypto platform Canada',
    'best crypto platform UK',
    'crypto staking UK',
    'crypto staking Canada',
    'FCA regulated crypto platform',
    'FINTRAC registered crypto',
    'daily crypto rewards',
    'passive income cryptocurrency',
    'cryptocurrency staking 2026',
    'crypto investment platform',
    'best way to invest in crypto',
    'regulated crypto investment',
    'crypto staking for beginners',
    'StakeOnix',
  ],
  alternates: { canonical: APP_URL },
  openGraph: {
    title: 'How to Invest in Crypto & Earn Daily – StakeOnix',
    description:
      'Learn how to invest in crypto and earn daily passive income on Bitcoin, Ethereum, USDT & 170+ assets. FCA-authorised, FINTRAC-registered. Free to join in 2 minutes.',
    url: APP_URL,
    type: 'website',
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix – Best Regulated Crypto Staking Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Stake Crypto & Earn Daily | FCA Authorised – StakeOnix',
    description:
      'Stake crypto in 3 steps. Earn daily rewards on BTC, ETH, USDT & 170+ assets. FCA-authorised UK, FINTRAC Canada. Free to join.',
    images: [`${APP_URL}/opengraph-image`],
  },
}

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${APP_URL}/#financialservice`,
  name: 'StakeOnix',
  legalName: 'ONIX HOLDINGS LIMITED',
  url: APP_URL,
  logo: `${APP_URL}/apple-icon`,
  image: `${APP_URL}/opengraph-image`,
  description:
    'FCA-authorised, FINTRAC-registered cryptocurrency staking platform. Earn daily passive income on Bitcoin, Ethereum, USDT, Solana and 170+ digital assets with institutional-grade security, AES-256 encryption and cold wallet storage.',
  serviceType: [
    'Cryptocurrency Staking',
    'Digital Asset Management',
    'Proof-of-Stake Validation',
    'Passive Income Investment',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'France' },
    'Worldwide',
  ],
  currenciesAccepted: 'BTC, ETH, USDT, USDC, LTC, TRX, BNB, SOL, ADA, DOT, AVAX, ATOM, MATIC, LINK',
  priceRange: 'From $200 USD',
  telephone: ['+1-613-366-4391', '+44-056-0384-6173'],
  email: 'info@stakeonix.ca',
  sameAs: [
    'https://x.com/StakeOnix',
    'https://twitter.com/StakeOnix',
    'https://www.instagram.com/stakeonix',
    'https://www.facebook.com/share/1D3Cw9AjJ3/',
    'https://www.tiktok.com/@stakeonix',
    'https://t.me/StakeOnix',
  ],
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
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Regulatory Authorisation',
      name: 'FCA Authorisation',
      description: 'Authorised by the Financial Conduct Authority (FCA) of the United Kingdom. Reference number: 820033.',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Financial Conduct Authority (FCA)',
        url: 'https://www.fca.org.uk',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Regulatory Registration',
      name: 'FINTRAC Registration',
      description: 'Registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC). Business Number: 820033090.',
      recognizedBy: {
        '@type': 'Organization',
        name: 'FINTRAC',
        url: 'https://www.fintrac-canafe.gc.ca',
      },
    },
  ],
  offers: {
    '@type': 'Offer',
    name: 'Cryptocurrency Staking Plans',
    description:
      'Multiple staking plans for Bitcoin, Ethereum, USDT and 170+ digital assets. Earn daily rewards with flexible terms. Minimum $200 USD.',
    url: `${APP_URL}/plans`,
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: 200,
      priceCurrency: 'USD',
    },
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
        text: 'Crypto staking is the process of participating in a proof-of-stake blockchain network by locking up cryptocurrency to help validate transactions. In return, stakers earn rewards from the network. StakeOnix pools staking resources across institutional-grade nodes and distributes daily rewards to investors proportionally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best crypto staking platform in 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix is one of the leading regulated crypto staking platforms in 2025, offering staking on 170+ digital assets including Bitcoin, Ethereum, USDT and Solana. Key differentiators include FCA authorisation (UK), FINTRAC registration (Canada), institutional-grade security, and transparent daily reward distributions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I earn with StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Staking yields vary by asset and network conditions. Indicative annual yields include Ethereum (ETH) at ~9% APY, Solana (SOL) at ~12% APY, Polkadot (DOT) at ~16.5% APY, Avalanche (AVAX) at ~14% APY, and Cosmos (ATOM) at up to ~21.5% APY. Returns are variable and not guaranteed. Past performance is not indicative of future results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is StakeOnix regulated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. StakeOnix (trading name of ONIX HOLDINGS LIMITED) is authorised by the Financial Conduct Authority (FCA) in the United Kingdom and registered with FINTRAC (Financial Transactions and Reports Analysis Centre of Canada) as a Money Services Business. These regulatory frameworks require us to maintain high standards of financial conduct, anti-money-laundering controls and client asset protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is crypto staking safe on StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix employs multiple security layers: SSL/TLS encryption for all data in transit, AES-256 encryption for data at rest, two-factor authentication (2FA) on all accounts, withdrawal PIN protection, and cold wallet storage for the majority of user funds. As with all cryptocurrency activities, staking carries market risk and staking rewards are not guaranteed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum deposit to start staking on StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum investment to start staking on StakeOnix is $200 USD (or equivalent in supported cryptocurrencies). Different staking plans are available with varying terms, yield rates and minimum requirements. Visit our Plans page for full details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw my staked crypto at any time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Withdrawal terms depend on the staking plan you choose. Flexible plans allow withdrawals at any time, while fixed-term plans may have lock-up periods in exchange for higher yield rates. Full details are available on the Plans page before you commit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cryptocurrencies can I stake on StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix supports staking on 170+ digital assets including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD Coin (USDC), Litecoin (LTC), Tron (TRX), BNB, Solana (SOL), Cardano (ADA), Polkadot (DOT), Avalanche (AVAX), Cosmos (ATOM), Polygon (MATIC), and Chainlink (LINK).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between crypto staking and crypto mining?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Crypto mining uses energy-intensive hardware (Proof-of-Work) to validate transactions on networks like Bitcoin. Crypto staking involves locking up cryptocurrency on Proof-of-Stake networks (like Ethereum, Solana, Cardano) to help validate transactions. Staking requires no specialist hardware and is far more energy-efficient. StakeOnix focuses exclusively on Proof-of-Stake staking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does StakeOnix operate in Canada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. StakeOnix is registered with FINTRAC (Financial Transactions and Reports Analysis Centre of Canada) as a Money Services Business and operates from offices in Toronto, Ontario (130 King St W, ON M5X 2A2). Canadian residents can fully access all staking services and plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does StakeOnix operate in the United Kingdom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. StakeOnix is authorised by the Financial Conduct Authority (FCA) and operates from offices in Altrincham, Cheshire, UK (Ashley Road, WA14 2DT). UK residents have full access to all staking plans and services under FCA regulatory oversight.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start staking cryptocurrency on StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Getting started takes 4 simple steps: (1) Create a free account at stakeonix.ca under 2 minutes. (2) Deposit cryptocurrency to your StakeOnix wallet using any supported asset. (3) Choose a staking plan from the Plans page that matches your investment goals. (4) Start earning daily staking rewards, automatically credited to your account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does StakeOnix offer a referral programme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. StakeOnix operates a referral programme that rewards you for inviting friends and family to the platform. When someone you refer starts staking, you earn a referral commission. Visit the Referral Program page for current commission rates and terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is FCA authorisation and why does it matter for crypto staking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "FCA (Financial Conduct Authority) authorisation means StakeOnix has been approved and is supervised by the UK's primary financial regulator. This requires meeting strict standards around financial conduct, anti-money-laundering (AML) and client asset protection. For users, this means dealing with a regulated platform subject to ongoing oversight significantly different from unregulated crypto platforms.",
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'StakeOnix – Crypto Staking Platform',
      item: APP_URL,
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Start Staking Cryptocurrency on StakeOnix',
  description:
    'Step-by-step guide to earning passive income through crypto staking on StakeOnix, the FCA-authorised, FINTRAC-registered staking platform.',
  totalTime: 'PT10M',
  supply: [
    { '@type': 'HowToSupply', name: 'Cryptocurrency (minimum $200 USD equivalent)' },
    { '@type': 'HowToSupply', name: 'Email address' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create Your Free Account',
      text: 'Sign up at stakeonix.ca in under 2 minutes. Provide your email address and create a secure password. No fees to register.',
      url: `${APP_URL}/signup`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Deposit Cryptocurrency',
      text: 'Fund your StakeOnix wallet by depositing any supported cryptocurrency Bitcoin, Ethereum, USDT and 170+ more. Minimum $200 USD.',
      url: `${APP_URL}/deposit`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose a Staking Plan',
      text: 'Browse available staking plans with different yield rates, terms and minimum thresholds. Select the plan that fits your investment goals.',
      url: `${APP_URL}/plans`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Earn Daily Staking Rewards',
      text: 'Once active, staking rewards are distributed daily to your account. Monitor earnings from the dashboard. Returns are variable and not guaranteed.',
      url: `${APP_URL}/dashboard`,
    },
  ],
}

function HomePageSchemas() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqHomepageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  )
}
import { Button } from '@/components/ui/button'

import CryptoTicker from '@/components/layout/CryptoTicker'
import TradeTerminalWidget from '@/components/layout/TradeTerminalWidget'
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
  Eye,
  RefreshCw,
  BadgeCheck,
  Wallet,
  BarChart2,
  Clock,
  ShieldCheck,
  CandlestickChart,
  Repeat,
  Receipt,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Competitive Staking Yields',
    description: 'Access professionally managed staking protocols across leading proof-of-stake blockchains. Yields vary by asset and network conditions.',
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
    description: 'Once your account is verified and a plan selected, eligible staking options can be activated through your dashboard.',
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
    icon: <Shield className="h-6 w-6" />,
    title: 'Clear Risk Disclosure',
    description: 'Staking rewards are variable and not guaranteed. We clearly show risk levels, lock periods, and estimated ranges before you commit.',
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
  { value: 'FCA', label: 'Authorised · UK Regulated', icon: <BadgeCheck className="h-5 w-5" /> },
  { value: 'FINTRAC', label: 'Registered · Canada', icon: <Shield className="h-5 w-5" /> },
  { value: '170+', label: 'Supported Assets', icon: <Globe className="h-5 w-5" /> },
  { value: '99.9%', label: 'Platform Uptime SLA', icon: <Activity className="h-5 w-5" /> },
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
    title: 'Receive Rewards',
    desc: 'Staking rewards are credited to your account per your plan terms. Track all earnings and transactions in real time on your dashboard.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
]

const testimonials = [
  {
    name: 'Marcus H.',
    title: 'Crypto Staker',
    avatar: 'MH',
    rating: 5,
    text: 'The transparency and reliability of the platform stands out. The dashboard makes it easy to track rewards and the support team is responsive whenever I have questions.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Sarah C.',
    title: 'Crypto Investor',
    avatar: 'SC',
    rating: 5,
    text: 'The onboarding process was straightforward, KYC was quick, and the security features give me peace of mind. I appreciate that the platform is clear about risks and how rewards work.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Ahmed K.',
    title: 'DeFi User',
    avatar: 'AK',
    rating: 5,
    text: 'I appreciate the honest communication about how staking works and what affects yields. The interface is clean, withdrawals are smooth, and the regulatory credentials matter to me.',
    color: 'from-green-500 to-emerald-600',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATED "rewards paid" counter for the homepage feature section.
// TODO: replace simulatedRewardsPaid() with the real /proof-of-rewards aggregate
//       (sum of STAKING_RETURN + STAKING_BONUS transactions) when going live.
// ─────────────────────────────────────────────────────────────────────────────
const SIM_REWARDS_BASE = 4_820_000        // starting headline figure (USD)
const SIM_REWARDS_EPOCH = Date.UTC(2026, 0, 1) // anchor so the number grows steadily
const SIM_REWARDS_PER_SECOND = 0.92       // ~$79k/day of simulated growth
function simulatedRewardsPaid(): number {
  const elapsedSec = Math.max(0, (Date.now() - SIM_REWARDS_EPOCH) / 1000)
  return SIM_REWARDS_BASE + elapsedSec * SIM_REWARDS_PER_SECOND
}

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



export default async function HomePage() {
  const session = await getAuthSession()

  // Simulated headline figure (swap for real Proof-of-Rewards data later)
  const rewardsPaidLabel = `$${Math.floor(simulatedRewardsPaid()).toLocaleString('en-US')}`

  return (
    <div className="relative overflow-hidden">
      <HomePageSchemas />

      {/* Live Crypto Ticker */}
      <CryptoTicker />

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] sm:min-h-[92vh] flex items-center overflow-hidden" style={{ background: '#080D1B' }}>
        {/* Hero background image Crypto.com style deep navy */}
        <div className="absolute inset-0">
          <img src="/hero-background.png" alt="" className="w-full h-full object-cover object-center opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080D1B] via-[#080D1B]/90 to-[#080D1B]/60" />
        </div>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.06]" />
        {/* Blue ambient glow */}
        <div className="pointer-events-none absolute top-0 right-0 h-[700px] w-[700px] rounded-full bg-blue-600/[0.08] blur-[180px] translate-x-1/4 -translate-y-1/4" />

        <div className="container relative mx-auto px-4 py-14 sm:py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">

            {/* Left: Text content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4 backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5 flex-shrink-0" />
                Stake &middot; Trade &middot; Earn &middot; FCA Authorised
              </div>

              {/* New features teaser */}
              <div className="mb-6">
                <Link href="#why-different" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.07] px-3 py-1 text-xs text-cyan-200 hover:bg-cyan-400/[0.12] transition-colors">
                  <Sparkles className="h-3 w-3 flex-shrink-0" />
                  <span className="font-semibold">New:</span>
                  <span className="text-cyan-100/80">Autopilot &middot; Protected Staking &middot; Proof of Rewards</span>
                  <ChevronRight className="h-3 w-3 flex-shrink-0" />
                </Link>
              </div>

              <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                Stake & Trade Crypto.{' '}
                <span className="gradient-text">Earn Every Day.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Stake 170+ crypto assets for daily rewards or trade live markets with real-time charts.
                One regulated platform. FCA-authorised (UK) &amp; FINTRAC-registered (Canada).
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link href={session ? '/dashboard' : '/signup'} className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="w-full sm:w-auto gap-2 font-bold text-base px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white shadow-2xl shadow-blue-500/30 border-0 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
                  >
                    <ArrowRight className="h-5 w-5" />
                    {session ? 'Go to Dashboard' : 'Get Started Free'}
                  </Button>
                </Link>
                <Link href={session ? '/trade' : '/signup'} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto gap-2 font-semibold text-base px-8 py-4 border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 rounded-2xl transition-all duration-300"
                  >
                    <CandlestickChart className="h-5 w-5" />
                    Start Trading
                  </Button>
                </Link>
              </div>

              {!session && (
                <p className="text-xs text-muted-foreground mb-8">
                  Staking rewards are variable and not guaranteed. Crypto assets can go down as well as up.
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <ShieldCheck className="h-4 w-4 text-green-400" />, label: 'SSL Secured' },
                  { icon: <BadgeCheck className="h-4 w-4 text-blue-400" />, label: 'KYC Compliant' },
                  { icon: <Lock className="h-4 w-4 text-yellow-400" />, label: '2FA Protected' },
                  { icon: <BadgeCheck className="h-4 w-4 text-blue-400" />, label: 'FCA Authorised' },
                  { icon: <CandlestickChart className="h-4 w-4 text-blue-400" />, label: 'Live Trading' },
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
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-400/80 mb-1">Estimated Yields</p>
                      <h3 className="text-lg font-bold text-white leading-tight">Typical rates by asset</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Est. network yields. Actual returns vary.</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1.5 flex-shrink-0 ml-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                      </span>
                      <span className="text-xs font-semibold text-blue-300">Live</span>
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
                            <p className="text-base font-black text-blue-400">{coin.apr}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Top rate card */}
                    <div className="hidden sm:flex w-[158px] flex-shrink-0 p-4 flex-col gap-3 bg-white/[0.02]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Top rate</p>
                      <div className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
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
                          <p className="text-3xl font-black text-blue-400 leading-none">21.5<span className="text-lg">%</span></p>
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
                          <span className="text-blue-400">High</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground/60 leading-relaxed">
                        Estimated network yields. Actual returns vary by conditions.
                      </p>
                      <Link href={session ? '/dashboard' : '/signup'}>
                        <button className="w-full text-[11px] font-bold py-2 px-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-400 hover:to-blue-600 transition-all">
                          Start Staking →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating credential pills */}
                <div className="hidden sm:flex absolute -bottom-4 left-6 glass-card px-4 py-2.5 animate-float shadow-xl border border-blue-500/20 z-10 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground">UK Regulator</p>
                      <p className="text-sm font-bold text-blue-300">FCA Authorised</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute -top-4 right-6 glass-card px-4 py-2.5 animate-float shadow-xl border border-blue-500/20 z-10 items-center gap-2" style={{ animationDelay: '-2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground">Canada Regulator</p>
                      <p className="text-sm font-bold text-blue-300">FINTRAC Registered</p>
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
              <div key={stat.label} className="text-center group relative" data-reveal data-delay={i * 110}>
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

      {/* TRADE CRYPTO SECTION */}
      <section className="py-20 relative border-t border-white/5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #080D1B 0%, #0a1120 100%)' }}>
        <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-blue-600/[0.07] blur-[160px] -translate-x-1/3 -translate-y-1/3" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[140px] translate-x-1/4 translate-y-1/4" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left: Trading terminal visual (live BTC market data) */}
            <TradeTerminalWidget />

            {/* Right: Copy */}
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Crypto Trading</p>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                  Trade Live Markets.<br />
                  <span className="gradient-text">Real-Time Charts.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond staking, StakeOnix gives you access to a full-featured crypto trading terminal.
                  Buy and sell Bitcoin, Ethereum, and 170+ assets with live candlestick charts,
                  real-time order books, and instant execution all within the same regulated account.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <CandlestickChart className="h-5 w-5" />, title: 'Live Charts', desc: 'Real-time candlestick charts powered by live market data', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                  { icon: <Zap className="h-5 w-5" />, title: 'Instant Execution', desc: 'Market and limit orders executed at speed', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
                  { icon: <Globe className="h-5 w-5" />, title: '170+ Pairs', desc: 'Trade across the full range of supported crypto assets', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                  { icon: <ShieldCheck className="h-5 w-5" />, title: 'Regulated', desc: 'FCA-authorised platform trade with confidence', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                ].map((f) => (
                  <div key={f.title} className={`rounded-xl border ${f.bg} p-4`}>
                    <div className={`${f.color} mb-2`}>{f.icon}</div>
                    <p className="text-sm font-bold text-white mb-1">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <Link href={session ? '/trade' : '/signup'}>
                <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white border-0 rounded-xl font-semibold px-8 shadow-lg shadow-blue-500/20">
                  <CandlestickChart className="h-4 w-4" />
                  {session ? 'Open Trading Terminal' : 'Start Trading Free'}
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* WHY STAKEONIX IS DIFFERENT */}
      <section id="why-different" className="py-20 relative border-t border-white/5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #080D1B 0%, #0a1322 100%)' }}>
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[150px] -translate-y-1/3" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Only on StakeOnix</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Features you won&apos;t find elsewhere</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combined staking, trading and radical transparency into tools no other regulated
              platform offers. Three reasons stakers are switching to StakeOnix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Staking Autopilot */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-all duration-300" data-reveal>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-blue-700/20 border border-blue-400/30 text-blue-300 mb-5 group-hover:scale-110 transition-transform">
                <Repeat className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Staking Autopilot</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Put every daily reward on autopilot. Auto-compound to grow your earnings, or split
                each payout between reinvesting and cash with one setting.
              </p>
              <Link href={session ? '/autopilot' : '/signup'} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                {session ? 'Open Autopilot' : 'Try Autopilot'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Protected Staking */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] transition-all duration-300" data-reveal data-delay={120}>
              <div className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">Zero downside</div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-600/20 border border-cyan-400/30 text-cyan-300 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Protected Staking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Keep all your daily rewards and your principal, plus earn a bonus if your chosen market
                rises by maturity. If it falls, you lose nothing.
              </p>
              <Link href={session ? '/plan/stake' : '/signup'} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                {session ? 'Create a protected stake' : 'Start protected'} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Proof of Rewards */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-green-500/40 hover:bg-green-500/[0.04] transition-all duration-300" data-reveal data-delay={240}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/25 to-emerald-600/20 border border-green-400/30 text-green-300 mb-5 group-hover:scale-110 transition-transform">
                <Receipt className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Proof of Rewards</h3>
              <div className="mb-3">
                <p className="text-2xl font-black gradient-text leading-none">{rewardsPaidLabel}</p>
                <p className="text-[11px] text-muted-foreground mt-1">paid to stakers &middot; updated live</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                No trust required. Every payout is published to a public, anonymized ledger with its own
                receipt ID see exactly what we pay.
              </p>
              <Link href="/proof-of-rewards" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors">
                View the ledger <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AS SEEN IN / PARTNERS */}
      <PartnersMarquee />

      {/* WHAT IS STAKING? */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Understand the opportunity</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What actually happens when you stake</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Blockchain networks need participants to validate transactions. In exchange, they issue rewards.
              That is staking. Not lending, not trading, not speculation. Participation in infrastructure that runs regardless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                step: '01',
                icon: <Wallet className="h-6 w-6" />,
                color: 'from-cyan-500/20 to-blue-600/20',
                iconColor: 'text-cyan-400',
                title: 'You deposit crypto',
                desc: 'You contribute your crypto to a staking pool. Your assets remain in your account and are never sold; they simply participate in network validation.',
              },
              {
                step: '02',
                icon: <Cpu className="h-6 w-6" />,
                color: 'from-purple-500/20 to-violet-600/20',
                iconColor: 'text-purple-400',
                title: 'The network pays validators',
                desc: 'Proof-of-stake blockchains reward participants who help validate transactions. These network rewards are distributed proportionally to stakers.',
              },
              {
                step: '03',
                icon: <TrendingUp className="h-6 w-6" />,
                color: 'from-green-500/20 to-emerald-600/20',
                iconColor: 'text-green-400',
                title: 'You receive your share',
                desc: 'StakeOnix manages the technical infrastructure (nodes, uptime, compounding) and credits your share of rewards to your account based on your chosen plan.',
              },
            ].map((item, i) => (
              <div key={item.step} className="glass-card p-7 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group" data-reveal data-delay={i * 130}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} ${item.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl font-black text-white/5">{item.step}</span>
                  <h3 className="font-bold text-base text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-5 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center max-w-3xl mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400 flex-shrink-0">
              <Shield className="h-4 w-4" />
            </div>
            <p className="text-sm text-muted-foreground flex-1">
              <strong className="text-yellow-300">Important:</strong> Staking rewards are not guaranteed. Returns depend on network conditions, protocol rules, and market factors.
              Past performance is not indicative of future results. Always consider your risk tolerance before staking.
            </p>
            <Link href="/what-is-staking" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="gap-1.5 border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10">
                Learn More <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

      {/* MEDIA COVERAGE */}
      <section className="py-16 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Media &amp; Partnerships</p>
            <h2 className="text-3xl md:text-4xl font-bold">Independent coverage and verified partnerships</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Real-world exposure across global media and brand partnerships, independently covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shell */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/10 group overflow-hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-yellow-300 font-semibold">
                Sponsored Partnership
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/sponsors/shell-stakeonix.jpg"
                  alt="Shell V-Power stakeonix.ca partnership"
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700 object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img src="/logos/shell.com.png" alt="Shell logo" className="h-8 w-8 object-contain" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-white font-semibold">Shell V-Power</span> stakeonix.ca prominently displayed across Shell forecourt signage in partnership campaign.
                </p>
              </div>
            </div>
            {/* Bloomberg */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/10 group overflow-hidden">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-blue-300 font-semibold">
                Media Coverage
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/sponsors/bloomberg-stakeonix.jpg"
                  alt="Bloomberg News stakeonix.ca coverage"
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700 object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <img src="/logos/bloomberg.com.png" alt="Bloomberg logo" className="h-8 w-8 object-contain" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-white font-semibold">Bloomberg News</span> stakeonix.ca featured in Bloomberg broadcast segment on emerging crypto staking platforms.
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
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Network yields</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What networks are paying right now</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estimated annual yields for popular proof-of-stake networks, based on current conditions.
              Sign in to see personalised rates for your portfolio. Returns vary and are not guaranteed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* live rates grid data-reveal stagger injected per-item */}
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
            ].map((coin, i) => (
              <div
                key={coin.symbol}
                className="glass-card p-5 flex items-center gap-4 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group relative overflow-hidden"
                data-reveal
                data-delay={i * 45}
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
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Est. APY</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground/60 mb-4">
              Yields shown are estimates based on current network data. Not a guarantee of returns.
            </p>
            <Link href={session ? '/dashboard' : '/signup'}>
              <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 rounded-xl font-semibold px-8">
                <TrendingUp className="h-4 w-4" />
                Explore Our Plans
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

      {/* STAKING PLANS PREVIEW */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/15 to-transparent pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Staking tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Four plans. Rates visible to members.</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Yields vary by asset, term, and network conditions. Create a free account to unlock current rates
              and see exactly what your portfolio could earn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              {
                tier: 'Flexible',
                duration: '7–30 days',
                icon: <RefreshCw className="h-6 w-6" />,
                color: 'from-cyan-500/20 to-blue-600/20',
                iconColor: 'text-cyan-400',
                border: 'border-cyan-500/20',
                badge: null,
                features: ['Withdraw at any time', 'No lock-up period', 'Ideal for newcomers', 'Instant activation'],
              },
              {
                tier: 'Growth',
                duration: '30–60 days',
                icon: <TrendingUp className="h-6 w-6" />,
                color: 'from-green-500/20 to-emerald-600/20',
                iconColor: 'text-green-400',
                border: 'border-green-500/20',
                badge: 'Popular',
                features: ['Fixed-term commitment', 'Enhanced yield rates', 'Auto-compounding', 'Daily reward credits'],
              },
              {
                tier: 'Premium',
                duration: '60–90 days',
                icon: <BarChart3 className="h-6 w-6" />,
                color: 'from-purple-500/20 to-violet-600/20',
                iconColor: 'text-purple-400',
                border: 'border-purple-500/20',
                badge: null,
                features: ['Higher staking rewards', 'Priority support', 'Dedicated account manager', 'Advanced analytics'],
              },
              {
                tier: 'Elite',
                duration: '90+ days',
                icon: <Award className="h-6 w-6" />,
                color: 'from-yellow-500/20 to-orange-600/20',
                iconColor: 'text-yellow-400',
                border: 'border-yellow-500/20',
                badge: 'Top Tier',
                features: ['Maximum network yields', 'Institutional-grade terms', 'Custom staking strategy', 'VIP support access'],
              },
            ].map((plan, i) => (
              <div
                key={plan.tier}
                className={`relative rounded-2xl border ${plan.border} bg-card hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col overflow-hidden`}
                data-reveal
                data-delay={i * 100}
              >
                {plan.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/20 border border-primary/30 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wide">
                      <Star className="h-2.5 w-2.5" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} ${plan.iconColor} mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-1">{plan.tier}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.duration} term</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-dashed border-white/10 p-3 text-center bg-secondary/30">
                    <Lock className="h-4 w-4 mx-auto text-muted-foreground mb-1.5" />
                    <p className="text-xs font-semibold text-foreground">Rates available to members</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Sign in to view yield rates</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href={session ? '/dashboard' : '/signup'}>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 rounded-2xl font-bold px-10 shadow-xl shadow-cyan-500/20"
              >
                <ArrowRight className="h-5 w-5" />
                {session ? 'View My Plans' : 'Create Free Account to View Plans'}
              </Button>
            </Link>
            {!session && (
              <p className="text-xs text-muted-foreground mt-3">
                Free account · No credit card required · 2-minute setup
              </p>
            )}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-16 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Who is this for?</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Whoever you are, there is a plan for you</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Beginners, seasoned holders, and institutional clients all stake under the same regulated roof.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-7 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group flex flex-col" data-reveal>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-3">New to staking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                We walk you through every step. Start with as little as $200. No technical knowledge needed.
                The platform handles the infrastructure. You just choose your plan.
              </p>
              <Link href="/what-is-staking" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                See how staking works <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="glass-card p-7 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 group flex flex-col" data-reveal data-delay="150">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 text-green-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-3">Already hold crypto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                Your assets are sitting idle in a wallet right now. Staking lets them participate in network
                rewards without selling. You keep ownership. You earn rewards.
              </p>
              <Link href="/plans" className="text-xs font-semibold text-green-400 hover:text-green-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                Compare plan options <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="glass-card p-7 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group flex flex-col" data-reveal data-delay="300">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-600/20 text-purple-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-3">Experienced staker</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                Regulated infrastructure, full auditability, 170+ assets, institutional-grade terms.
                Compare us properly. FCA authorised in the UK, FINTRAC registered in Canada.
              </p>
              <Link href="/plans" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                View institutional options <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">The process</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">From account to active stake in four steps</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Whether you are new to crypto or already hold a portfolio, the process is the same. Simple by design.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-11 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative group" data-reveal data-delay={i * 120}>
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
              The Professional Way to{' '}
              <span className="gradient-text">Grow Your Crypto</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              While traditional savings accounts pay almost nothing, blockchain networks distribute rewards
              to validators every single day. StakeOnix connects your assets to that infrastructure,
              with full regulatory oversight, transparent reporting, and institutional-grade security.
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
                <h3 className="text-2xl font-bold text-white mb-4">Institutional staking infrastructure. Accessible to all.</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your bank pays you almost nothing to hold your money. Meanwhile, blockchain networks
                  actively reward participants who help validate transactions, every single day.
                  StakeOnix channels your assets into those networks. Every reward, every fee,
                  every transaction is logged and visible on your dashboard. Nothing hidden.
                </p>
                <ul className="space-y-3">
                  {[
                    'No minimum lock-up on flexible plans. Withdraw whenever you choose.',
                    'Staking rewards distributed based on your chosen plan terms',
                    'Full KYC/AML compliance, licensed in Canada and the UK',
                    'Multiple staking tiers available to match your goals',
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
                    <ArrowRight className="h-4 w-4" />
                    Check My Staking Options
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Regulatory credentials + trust */}
            <div className="flex flex-col gap-5">
              {/* FCA block */}
              <div className="glass-card p-7 bg-gradient-to-br from-blue-500/[0.07] to-cyan-600/[0.07] border-blue-500/20 hover:border-blue-500/35 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">UK Financial Regulator</p>
                    <p className="text-2xl font-black text-white">FCA Authorised</p>
                    <p className="text-xs text-muted-foreground mt-1">ONIX HOLDINGS LIMITED · Co. No. 03449482 · FCA Ref. 820033</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 flex-shrink-0">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Authorised and regulated by the Financial Conduct Authority in England &amp; Wales.</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-green-400 mx-auto mb-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black text-white mb-1 leading-tight">FINTRAC</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Canada Registered</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-400 mx-auto mb-3">
                    <Lock className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black text-white mb-1 leading-tight">KYC / AML</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Full Compliance</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 mx-auto mb-3">
                    <Activity className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black text-white mb-1 leading-tight">99.9%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Uptime Target</p>
                </div>
                <div className="glass-card p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 mx-auto mb-3">
                    <Globe className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black text-white mb-1 leading-tight">170+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Supported Assets</p>
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
            ].map((item, i) => (
              <div key={item.title} className="glass-card p-7 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group cursor-default flex gap-5 items-start" data-reveal data-delay={i * 80}>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">What you get</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Designed for every level of investor</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you are holding your first $200 in crypto or managing a diversified portfolio,
              you get the same institutional-grade tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div key={feature.title} className="glass-card p-7 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group cursor-default" data-reveal data-delay={i * 80}>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your security is our baseline</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We employ the same security standards as regulated financial institutions.
                AES-256 encryption, cold wallet storage, real-time monitoring, multi-signature
                authorisation, and round-the-clock threat detection.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What our members say</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Unscripted feedback from people using the platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
                  <div key={t.name} className="glass-card p-7 hover:border-white/20 transition-all duration-300 hover:bg-white/5 flex flex-col" data-reveal data-delay={i * 150}>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HUMAN TRUST Real people, real support */}
      <section className="py-20 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Real people behind this</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Three reasons Canadians feel comfortable here</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Not a faceless platform. Real advisors. Real compliance. Real clarity before you commit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
            {[
              {
                initial: 'S',
                role: 'Staking Advisor',
                gradient: 'from-cyan-500 to-blue-600',
                reason: 'We explain things simply.',
                body: 'Staking feels complicated from the outside. Our advisors break it down clearly no jargon, no pressure. You ask questions, we answer honestly.',
                detail: 'Average response under 4 hours',
              },
              {
                initial: 'C',
                role: 'Compliance Team',
                gradient: 'from-emerald-500 to-green-600',
                reason: 'Everything is on record.',
                body: 'FCA authorised in the UK. FINTRAC registered in Canada. Every transaction is logged, every regulation followed. Our credentials are public and verifiable.',
                detail: 'KYC & AML verified on every account',
              },
              {
                initial: 'A',
                role: 'Account Support',
                gradient: 'from-purple-500 to-violet-600',
                reason: 'You are never alone in this.',
                body: 'Whether you are choosing a plan, making a deposit, or have questions about withdrawals support is available by phone, email and live chat.',
                detail: 'Available Mon–Sat',
              },
            ].map((card) => (
              <div key={card.role} className="glass-card p-8 hover:border-white/20 transition-all duration-300 hover:bg-white/5 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-lg`}>
                    {card.initial}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base leading-snug">{card.reason}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{card.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.body}</p>
                <div className="flex items-center gap-2 text-xs text-cyan-400 border-t border-white/5 pt-4">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                  {card.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Support strip */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  { initials: 'SC', gradient: 'from-cyan-500 to-blue-600' },
                  { initials: 'AM', gradient: 'from-emerald-500 to-green-600' },
                  { initials: 'KL', gradient: 'from-purple-500 to-violet-600' },
                ].map((av) => (
                  <div key={av.initials} className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${av.gradient}`}>
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Talk to a real person</p>
                <p className="text-xs text-muted-foreground">Our team responds in under 4 hours on business days</p>
              </div>
            </div>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="gap-2 rounded-xl border-white/15 hover:border-cyan-500/40 hover:bg-cyan-500/5 whitespace-nowrap">
                Contact Support <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER YOU SIGN UP */}
      <section className="py-20 relative border-t border-white/5">
        <div className="absolute inset-0 hero-grid opacity-[0.06]" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Your journey</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What happens after you sign up</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              No surprises. Here is exactly what you will see and do, step by step.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                icon: <BadgeCheck className="h-6 w-6" />,
                label: 'Verify your identity',
                desc: 'Upload a government ID and confirm your email. Most verifications complete within minutes. Required for all regulated Canadian platforms.',
                color: 'from-cyan-500/20 to-blue-600/20',
                iconColor: 'text-cyan-400',
                borderHover: 'hover:border-cyan-500/30',
                preview: ['Email confirmed ✓', 'ID verified ✓', 'Account active ✓'],
                previewColor: 'text-cyan-400/80',
              },
              {
                step: '2',
                icon: <BarChart2 className="h-6 w-6" />,
                label: 'See your dashboard',
                desc: 'Your dashboard shows current plan options, estimated yield ranges, lock periods, and risk levels. Review everything before committing a single dollar.',
                color: 'from-emerald-500/20 to-green-600/20',
                iconColor: 'text-emerald-400',
                borderHover: 'hover:border-emerald-500/30',
                preview: ['ETH · ~9% est. APR', 'SOL · ~12% est. APR', 'ADA · ~8.5% est. APR'],
                previewColor: 'text-emerald-400/80',
              },
              {
                step: '3',
                icon: <CheckCircle2 className="h-6 w-6" />,
                label: 'Choose and activate',
                desc: 'Select a plan that fits your goals. Review the terms, lock period, and risk level. Activate when ready or ask support first. No pressure.',
                color: 'from-purple-500/20 to-violet-600/20',
                iconColor: 'text-purple-400',
                borderHover: 'hover:border-purple-500/30',
                preview: ['Plan selected ✓', 'Terms reviewed ✓', 'Stake active ✓'],
                previewColor: 'text-purple-400/80',
              },
            ].map((item) => (
              <div key={item.step} className={`glass-card p-7 ${item.borderHover} transition-all duration-300 hover:bg-white/5 flex flex-col`}>
                <div className="flex items-center justify-between mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 ${item.iconColor}`}>
                    {item.icon}
                  </div>
                  <span className="text-5xl font-black text-white/5">{item.step}</span>
                </div>
                <h3 className="font-bold text-base text-white mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{item.desc}</p>
                {/* Mini UI preview strip */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 space-y-1.5">
                  {item.preview.map((line) => (
                    <p key={line} className={`text-[11px] font-mono ${item.previewColor}`}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Staking rewards are variable and not guaranteed. Crypto assets can go down as well as up.
          </p>
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
                <BadgeCheck className="h-3.5 w-3.5" />
                FCA Authorised &middot; FINTRAC Registered
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
                Curious what your<br />
                <span className="gradient-text">options look like?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg leading-relaxed">
                Create a free account and see current plan options, yield estimates, and risk levels for your portfolio before you commit to anything.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={session ? '/dashboard' : '/signup'}>
                  <Button
                    size="xl"
                    className="gap-2 font-bold text-base px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-2xl shadow-cyan-500/30 border-0 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-5 w-5" />
                    {session ? 'View Dashboard' : 'Check My Staking Options'}
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
                  'KYC & AML compliant',
                  'FCA Authorised',
                  'FINTRAC Registered',
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

      {/* FCA / FINTRAC RISK WARNING */}
      <section className="py-8 border-t border-white/5 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-5 flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400 flex-shrink-0 mt-0.5">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">Risk Warning</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cryptocurrency staking involves risk. The value of crypto assets can go down as well as up, and staking rewards are variable and not guaranteed.
                Past performance is not a reliable indicator of future results. You may receive less than you stake.
                This platform is not providing financial advice. Please ensure you fully understand the risks before staking any assets.
                StakeOnix is operated by ONIX HOLDINGS LIMITED (FCA Ref. 820033, Co. No. 03449482, registered in England &amp; Wales) and
                ONIX INTERNATIONAL INC. (FINTRAC BN: 820033090, Ontario Business Corp.).
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
