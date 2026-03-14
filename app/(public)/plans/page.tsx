import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { PlansClient } from './PlansClient'
import { TrendingUp, Users, Shield, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'
const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Crypto Yield Plans Start With $200, Earn Daily | StakeOnix',
  description:
    'Join StakeOnix and start earning daily crypto returns from just $200. 9 yield plans from Starter Trial to Sovereign institutional tier. Up to 4.5% daily see real payouts in your account within 24 hours.',
  keywords: [
    'crypto yield plans 2026',
    'earn daily returns on crypto',
    'best crypto investment plan',
    'daily crypto payouts',
    'high yield staking platform',
    'bitcoin daily earnings',
    'ethereum yield plan',
    'USDT daily interest',
    'start crypto investing 200 dollars',
    'passive income crypto',
    'best staking platform 2026',
    'stakeonix plans',
    'crypto income daily',
    'short term crypto investment',
  ],
  alternates: { canonical: `${APP_URL}/plans` },
  openGraph: {
    title: 'StakeOnix Yield Plans Earn Up to 4.5% Daily | StakeOnix',
    description: 'Start with just $200. 9 plans designed to grow with you from a 7-day Starter Trial to 90-day Sovereign tier. Daily payouts, zero experience needed.',
    url: `${APP_URL}/plans`,
  },
}

async function getPlans() {
  try {
    return await prisma.stakingPlan.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    })
  } catch {
    return []
  }
}

export default async function PlansPage() {
  const [plans, session] = await Promise.all([getPlans(), getAuthSession()])

  const maxApr = plans.length > 0
    ? Math.max(...plans.map((p) => parseFloat((p.dailyRoi * 365).toFixed(2))))
    : 0
  const minApr = plans.length > 0
    ? Math.min(...plans.map((p) => parseFloat((p.dailyRoi * 365 * 0.6).toFixed(2))))
    : 0

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Staking Plans', item: `${APP_URL}/plans` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'StakeOnix Crypto Staking Plans',
    url: `${APP_URL}/plans`,
    description: `Choose from ${plans.length} cryptocurrency staking plans. Earn between ${minApr}% and ${maxApr}% APR. Daily rewards credited automatically.`,
    serviceType: 'Cryptocurrency Staking',
    areaServed: 'Worldwide',
    priceRange: '$200+',
    provider: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  }

  const heroStats = [
    { icon: <TrendingUp className="h-5 w-5 text-primary" />, label: 'Est. APR Up To', value: `${maxApr}%` },
    { icon: <Zap className="h-5 w-5 text-yellow-400" />, label: 'Active Plans', value: `${plans.length}` },
    { icon: <Users className="h-5 w-5 text-blue-400" />, label: 'Active Stakers', value: '15,000+' },
    { icon: <Shield className="h-5 w-5 text-green-400" />, label: 'Total Staked', value: '$50M+' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <div>
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 animated-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-5 uppercase tracking-widest">
            <Zap className="h-3 w-3" /> Earn up to {maxApr}% APR annually
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Staking <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base mb-8">
            Nine plans designed as a progressive path start with $200 on our 7-day <strong className="text-white">Starter Trial</strong> to see real daily payouts in your account, then scale up as your confidence grows. Every plan delivers daily settlements.
          </p>

          {/* APR range pill */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-6 py-3 text-sm">
            <span className="text-muted-foreground">APR Range</span>
            <span className="font-bold text-primary">{minApr}%</span>
            <span className="text-muted-foreground">~</span>
            <span className="font-bold gradient-text">{maxApr}%</span>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-secondary/20 py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-secondary">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold gradient-text">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans content ── */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {plans.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No staking plans available at this time. Please check back later.
            </div>
          ) : (
            <PlansClient plans={plans} isLoggedIn={!!session} />
          )}
        </div>
      </section>
    </div>
    </>
  )
}
