import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { ShieldCheck, TrendingUp, Receipt, Clock, BadgeCheck, ArrowRight, Activity } from 'lucide-react'

export const dynamic = 'force-dynamic'
const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Proof of Rewards | Transparent Staking Payouts | StakeOnix',
  description:
    'Real-time transparency: see the total staking rewards StakeOnix has paid out, recent anonymized payouts, and live active-stake figures. Trust through verifiable data.',
  alternates: { canonical: `${APP_URL}/proof-of-rewards` },
}

const REWARD_TYPES = ['STAKING_RETURN', 'STAKING_BONUS']
// STAKING_RETURN is used for both daily ROI *and* principal returns; principal is
// not a reward, so exclude it from the "rewards paid" figures.
const EXCLUDE_PRINCIPAL = { NOT: { description: { startsWith: 'Principal returned' } } }

/** Mask an identity for public display: "james@x.com" -> "j***s", "neoTrader" -> "n***r". */
function anonymize(username: string | null, email: string): string {
  const base = (username || email.split('@')[0] || 'user').trim()
  if (base.length <= 2) return `${base[0] ?? 'u'}***`
  return `${base[0]}***${base[base.length - 1]}`
}

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

async function getProofData() {
  try {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const [agg, agg24h, bonusAgg, activeAgg, recent] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        _count: true,
        where: { type: { in: REWARD_TYPES }, status: 'COMPLETED', ...EXCLUDE_PRINCIPAL },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: { in: REWARD_TYPES }, status: 'COMPLETED', createdAt: { gte: since24h }, ...EXCLUDE_PRINCIPAL },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        _count: true,
        where: { type: 'STAKING_BONUS', status: 'COMPLETED' },
      }),
      prisma.stake.aggregate({
        _sum: { amount: true },
        _count: true,
        where: { status: 'ACTIVE' },
      }),
      prisma.transaction.findMany({
        where: { type: { in: REWARD_TYPES }, status: 'COMPLETED', ...EXCLUDE_PRINCIPAL },
        orderBy: { createdAt: 'desc' },
        take: 18,
        select: {
          id: true,
          amount: true,
          type: true,
          description: true,
          createdAt: true,
          user: { select: { username: true, email: true } },
        },
      }),
    ])

    return {
      totalPaid: agg._sum.amount ?? 0,
      payoutCount: agg._count,
      paid24h: agg24h._sum.amount ?? 0,
      bonusPaid: bonusAgg._sum.amount ?? 0,
      bonusCount: bonusAgg._count,
      activeStaked: activeAgg._sum.amount ?? 0,
      activeStakes: activeAgg._count,
      recent,
    }
  } catch {
    return null
  }
}

export default async function ProofOfRewardsPage() {
  const data = await getProofData()

  const stats = [
    { icon: <TrendingUp className="h-5 w-5" />, label: 'Total Rewards Paid', value: data ? formatCurrency(data.totalPaid) : '—', sub: data ? `${data.payoutCount.toLocaleString()} payouts` : '' },
    { icon: <Activity className="h-5 w-5" />, label: 'Paid Last 24h', value: data ? formatCurrency(data.paid24h) : '—', sub: 'rolling window' },
    { icon: <ShieldCheck className="h-5 w-5" />, label: 'Currently Staked', value: data ? formatCurrency(data.activeStaked) : '—', sub: data ? `${data.activeStakes.toLocaleString()} active stakes` : '' },
    { icon: <BadgeCheck className="h-5 w-5" />, label: 'Market Bonuses Paid', value: data ? formatCurrency(data.bonusPaid) : '—', sub: data ? `${data.bonusCount.toLocaleString()} protected stakes` : '' },
  ]

  return (
    <div className="relative min-h-screen" style={{ background: '#080D1B' }}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 py-16 md:py-20">
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl translate-x-1/4 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 mb-5 uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" /> Radical Transparency
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Proof of <span className="gradient-text">Rewards</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Most platforms ask you to trust them. We show you the receipts. These figures are pulled
            live from our payout ledger every time this page loads no marketing math, just what we have
            actually paid stakers.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/5 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 mb-3">
                  {s.icon}
                </div>
                <p className="text-2xl md:text-3xl font-black gradient-text nums-tabular">{s.value}</p>
                <p className="text-sm font-semibold text-white mt-1">{s.label}</p>
                {s.sub && <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live payout ledger */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Recent Payout Ledger</h2>
            <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-widest">Anonymized · Verifiable</span>
          </div>

          {!data || data.recent.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center text-muted-foreground">
              No reward payouts have been recorded yet. As stakes mature and daily rewards are
              distributed, every payout will appear here automatically.
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
              {data.recent.map((tx) => {
                const isBonus = tx.type === 'STAKING_BONUS'
                return (
                  <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${isBonus ? 'bg-cyan-500/15 text-cyan-400' : 'bg-green-500/15 text-green-400'}`}>
                      {isBonus ? <BadgeCheck className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">
                        {anonymize(tx.user.username, tx.user.email)}
                        <span className="text-muted-foreground font-normal"> received a {isBonus ? 'market bonus' : 'staking reward'}</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono">#{tx.id.slice(0, 8)}</span>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        {timeAgo(tx.createdAt)}
                      </p>
                    </div>
                    <p className={`text-sm font-black nums-tabular flex-shrink-0 ${isBonus ? 'text-cyan-400' : 'text-green-400'}`}>
                      +{formatCurrency(tx.amount)}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          <p className="text-[11px] text-muted-foreground/70 mt-4 leading-relaxed">
            Each entry shows a real ledger transaction with a unique receipt ID. User identities are
            masked for privacy. Figures reflect rewards credited to user balances and are not a
            projection or guarantee of future returns.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/plans">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 text-sm font-bold text-white hover:from-blue-400 hover:to-blue-600 transition-all">
                Explore Staking Plans <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
