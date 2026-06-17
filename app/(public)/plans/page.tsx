import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { PlansClient } from './PlansClient'
import { TrendingUp, Users, Shield, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'
const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Crypto Staking Plans | How to Invest in Crypto from $200 | StakeOnix',
  description:
    'Choose a crypto staking plan and start earning daily passive income from just $200. Nine plans from the 7-day Starter Trial to the 90-day Sovereign tier. Best way to invest in crypto. Staking rewards are variable.',
  alternates: { canonical: `${APP_URL}/plans` },
  openGraph: {
    title: 'Crypto Investment Plans | Daily Payouts from $200 | StakeOnix',
    description: 'Invest in crypto from just $200. 9 staking plans with daily payouts – no experience needed. Best crypto staking rates in 2026 on a regulated platform.',
    url: `${APP_URL}/plans`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix Staking Plans: Variable yield from $200' }],
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

async function checkUsedStarterPlan(userId: string, plans: Awaited<ReturnType<typeof getPlans>>) {
  try {
    const starterPlan = plans.find((p) => p.name === 'Starter Trial')
    if (!starterPlan) return false
    const used = await prisma.stake.findFirst({
      where: { userId, planId: starterPlan.id },
      select: { id: true },
    })
    return !!used
  } catch {
    return false
  }
}

export default async function PlansPage() {
  const [plans, session] = await Promise.all([getPlans(), getAuthSession()])

  const hasUsedStarterPlan = session?.user?.id
    ? await checkUsedStarterPlan(session.user.id, plans)
    : false

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
    description: `Choose from ${plans.length} cryptocurrency staking plans. Daily rewards credited automatically. Rewards are variable and not guaranteed; capital is at risk.`,
    serviceType: 'Cryptocurrency Staking',
    areaServed: 'Worldwide',
    priceRange: '$200+',
    provider: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  }

  const heroStats = [
    { icon: <TrendingUp className="h-5 w-5 text-primary" />, label: 'Rewards Credited', value: 'Daily' },
    { icon: <Zap className="h-5 w-5 text-yellow-400" />, label: 'Staking Plans', value: `${plans.length}` },
    { icon: <Users className="h-5 w-5 text-amber-400" />, label: 'Active Stakers', value: '15,000+' },
    { icon: <Shield className="h-5 w-5 text-green-400" />, label: 'Supported Assets', value: '170+' },
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
            <Zap className="h-3 w-3" /> Daily staking rewards &middot; 170+ assets
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Staking <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base mb-8">
            Choose from a range of staking plans to suit different goals and time horizons, starting from $200.
            Sign in to view current rates. Staking rewards are variable and not guaranteed.
          </p>

          {/* Risk disclosure */}
          <div className="inline-flex items-center gap-2 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-5 py-2.5 text-xs text-muted-foreground max-w-lg">
            <Shield className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
            Capital at risk. Crypto values can go down as well as up; rewards are variable and not guaranteed.
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
            <PlansClient plans={plans} isLoggedIn={!!session} hasUsedStarterPlan={hasUsedStarterPlan} />
          )}
        </div>
      </section>
    </div>
    </>
  )
}
