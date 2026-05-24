import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'
import { Users, DollarSign, TrendingUp, Link as LinkIcon, Percent, ExternalLink, Star, Trophy, Zap, Target } from 'lucide-react'
import CopyButton from './CopyButton'
import ShareButtons from './ShareButtons'
import EarningsCalculator from './EarningsCalculator'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// Commission tier thresholds (active invested referrals)
// Bronze: 0–4 → 5% L1 | Silver: 5–9 → 6% L1 | Gold: 10–24 → 7% L1 | Platinum: 25+ → 8% L1
// All tiers earn +2% L2 commission on their referrals' referrals
const TIERS = [
  { name: 'Bronze',   min: 0,  target: 5,   commission: '5%', color: 'text-amber-600',  bg: 'bg-amber-600/10 border-amber-600/30',  icon: '🥉', perk: 'Referral badge · 5% L1 + 2% L2 commission' },
  { name: 'Silver',   min: 5,  target: 10,  commission: '6%', color: 'text-slate-300',  bg: 'bg-slate-400/10 border-slate-400/30',  icon: '🥈', perk: 'Leaderboard entry · 6% L1 + 2% L2 · Priority support' },
  { name: 'Gold',     min: 10, target: 25,  commission: '7%', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', icon: '🥇', perk: 'VIP support · 7% L1 + 2% L2 · Monthly cash prize eligibility' },
  { name: 'Platinum', min: 25, target: 999, commission: '8%', color: 'text-violet-300',   bg: 'bg-violet-300/10 border-violet-300/20',   icon: '💎', perk: 'Ambassador badge · 8% L1 + 2% L2 · Exclusive perks + bonuses' },
]

function getTier(count: number) {
  const active = [...TIERS].reverse().find((t) => count >= t.min)
  return active ?? TIERS[0]
}

function getNextTier(count: number) {
  return TIERS.find((t) => t.min > count) ?? null
}

export default async function ReferralsPage() {
  const session = await requireAuth()

  const [user, referrals, earnings, commissionSetting] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { referralCode: true },
    }),
    prisma.user.findMany({
      where: { referredById: session.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isActive: true,
        _count: { select: { stakes: true } },
        stakes: {
          where: { status: 'ACTIVE' },
          select: { id: true },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.referralEarning.findMany({
      where: { userId: session.user.id },
      include: { fromUser: { select: { username: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.siteSetting.findUnique({ where: { key: 'referral_bonus_percent' } }),
  ])

  const totalEarnings = earnings.reduce((s, e) => s + e.amount, 0)
  const commissionRate = commissionSetting ? parseFloat(commissionSetting.value) : null
  const rate = commissionRate ?? 5

  const earningsByUser = earnings.reduce<Record<string, number>>((acc, e) => {
    acc[e.fromUserId] = (acc[e.fromUserId] ?? 0) + e.amount
    return acc
  }, {})

  const investingReferrals = referrals.filter((r) => r.stakes.length > 0).length
  const totalCount = referrals.length

  const currentTier = getTier(totalCount)
  const nextTier = getNextTier(totalCount)
  const tierProgress = nextTier
    ? Math.min(100, ((totalCount - currentTier.min) / (nextTier.target - currentTier.min)) * 100)
    : 100

  const earningsAsc = [...earnings].reverse()
  const runningTotals = earningsAsc.reduce<number[]>((acc, e) => {
    acc.push((acc[acc.length - 1] ?? 0) + e.amount)
    return acc
  }, [])
  const runningTotalsDesc = [...runningTotals].reverse()

  const baseUrl = (process.env.NEXTAUTH_URL || 'http://localhost:3000').replace(/\/$/, '')
  const referralLink = user?.referralCode ? `${baseUrl}/signup?ref=${user.referralCode}` : ''

  // What the user could earn if all referrals had an active stake of $300 avg
  const potentialEarnings = (totalCount - investingReferrals) * 300 * (rate / 100)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Referral Program</h1>
          <p className="text-muted-foreground text-sm mt-1">
            You earn <span className="text-primary font-semibold">{rate}% commission</span> every time someone you invite activates a stake. No cap, no expiry.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 self-start sm:self-auto">
          <Percent className="h-5 w-5 text-primary" />
          <span className="text-2xl font-black text-primary">{rate}%</span>
          <span className="text-xs text-muted-foreground leading-tight">commission<br/>per stake</span>
        </div>
      </div>

      {/* Tier milestone tracker */}
      <Card className="border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentTier.icon}</span>
              <div>
                <p className="font-bold">{currentTier.name} Tier</p>
                <p className="text-xs text-muted-foreground">{currentTier.perk}</p>
              </div>
            </div>
            {nextTier && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next: <span className="font-semibold text-foreground">{nextTier.icon} {nextTier.name}</span></p>
                <p className="text-xs text-primary font-medium">
                  {nextTier.target - totalCount} more referral{nextTier.target - totalCount !== 1 ? 's' : ''} to unlock
                </p>
              </div>
            )}
            {!nextTier && (
              <Badge variant="success" className="gap-1"><Trophy className="h-3 w-3" /> Max Tier Reached</Badge>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${tierProgress}%` }}
            />
          </div>

          {/* Tier steps */}
          <div className="flex justify-between mt-2">
            {TIERS.map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-1">
                <span className={`text-lg ${totalCount >= t.min ? 'opacity-100' : 'opacity-25'}`}>{t.icon}</span>
                <span className={`text-[10px] font-medium ${totalCount >= t.min ? 'text-foreground' : 'text-muted-foreground'}`}>{t.target}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5"><Users className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Total Invited</p>
              <p className="text-xl font-bold">{totalCount}</p>
              <p className="text-xs text-muted-foreground">{investingReferrals} investing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2.5"><DollarSign className="h-5 w-5 text-green-400" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Total Earned</p>
              <p className="text-xl font-bold text-green-400">{formatCurrency(totalEarnings)}</p>
              <p className="text-xs text-muted-foreground">{earnings.length} payouts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-yellow-500/10 p-2.5"><Zap className="h-5 w-5 text-yellow-400" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Active Earners</p>
              <p className="text-xl font-bold">{investingReferrals}</p>
              <p className="text-xs text-muted-foreground">of {totalCount} invited</p>
            </div>
          </CardContent>
        </Card>
        <Card className={potentialEarnings > 0 ? 'border-orange-500/30 bg-orange-500/5' : ''}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-orange-500/10 p-2.5"><Target className="h-5 w-5 text-orange-400" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Unclaimed potential</p>
              <p className={`text-xl font-bold ${potentialEarnings > 0 ? 'text-orange-400' : 'text-muted-foreground'}`}>
                {potentialEarnings > 0 ? `~${formatCurrency(potentialEarnings)}` : '$0'}
              </p>
              <p className="text-xs text-muted-foreground">if inactive friends invest</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share your link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Share Your Referral Link
          </CardTitle>
          <CardDescription>
            Every person who signs up with your link and activates a stake instantly earns you <span className="text-primary font-semibold">{rate}%</span> of their stake value - automatically added to your balance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {referralLink ? (
            <ShareButtons referralLink={referralLink} commissionRate={commissionRate} />
          ) : (
            <p className="text-sm text-muted-foreground italic">Link unavailable - set NEXTAUTH_URL</p>
          )}
          {user?.referralCode && (
            <div className="flex items-center gap-3 pt-1">
              <p className="text-xs text-muted-foreground">
                Code: <span className="font-mono font-bold text-primary">{user.referralCode}</span>
              </p>
              <CopyButton text={user.referralCode} label="Copy Code" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earnings calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            How Much Could You Earn?
          </CardTitle>
          <CardDescription>
            See what your referral income could look like. Drag the sliders to calculate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EarningsCalculator commissionRate={commissionRate} />
        </CardContent>
      </Card>

      {/* Referred users */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Your Referred Users</CardTitle>
              <CardDescription className="mt-1">
                {investingReferrals > 0
                  ? `${investingReferrals} of your ${totalCount} referrals are actively investing and generating you commissions.`
                  : totalCount > 0
                  ? `You have ${totalCount} referral${totalCount !== 1 ? 's' : ''} who haven't invested yet - share a reminder to start earning.`
                  : 'No referrals yet. Every person you invite is a new income stream.'}
              </CardDescription>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">{totalCount} total</span>
          </div>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="text-4xl">👥</div>
              <p className="font-semibold">Your first referral is worth real money</p>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                If your first friend stakes just $200, you instantly earn ${(200 * rate / 100).toFixed(2)} - automatically. Share your link above to start.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left pb-3 font-medium">User</th>
                    <th className="text-left pb-3 font-medium">Joined</th>
                    <th className="text-left pb-3 font-medium">Stakes</th>
                    <th className="text-left pb-3 font-medium">You earned</th>
                    <th className="text-left pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{ref.username || 'Anonymous'}</p>
                          <p className="text-xs text-muted-foreground">{ref.email}</p>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{formatDate(ref.createdAt)}</td>
                      <td className="py-3">
                        <span className={ref._count.stakes > 0 ? 'font-medium text-primary' : 'text-muted-foreground'}>
                          {ref._count.stakes}
                        </span>
                      </td>
                      <td className="py-3">
                        {earningsByUser[ref.id] ? (
                          <span className="font-medium text-green-400">+{formatCurrency(earningsByUser[ref.id])}</span>
                        ) : (
                          <span className="text-xs text-orange-400/80 italic">Not invested yet</span>
                        )}
                      </td>
                      <td className="py-3">
                        <Badge variant={ref.stakes.length > 0 ? 'success' : ref._count.stakes > 0 ? 'info' : ref.isActive ? 'warning' : 'secondary'}>
                          {ref.stakes.length > 0 ? 'Investing' : ref._count.stakes > 0 ? 'Past investor' : ref.isActive ? 'Registered' : 'Inactive'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earnings history */}
      {earnings.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Commission History</CardTitle>
                <CardDescription>Every payout you received from referral activity.</CardDescription>
              </div>
              <span className="text-xs text-muted-foreground">{earnings.length} payout{earnings.length !== 1 ? 's' : ''}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left pb-3 font-medium">Date</th>
                    <th className="text-left pb-3 font-medium">From</th>
                    <th className="text-left pb-3 font-medium">Amount</th>
                    <th className="text-left pb-3 font-medium">Rate</th>
                    <th className="text-left pb-3 font-medium">Order</th>
                    <th className="text-left pb-3 font-medium">Running total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {earnings.map((e, idx) => (
                    <tr key={e.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3 text-muted-foreground whitespace-nowrap">{formatDateTime(e.createdAt)}</td>
                      <td className="py-3">{e.fromUser.username || e.fromUser.email}</td>
                      <td className="py-3 font-bold text-green-400">+{formatCurrency(e.amount)}</td>
                      <td className="py-3 text-muted-foreground">{e.percentage}%</td>
                      <td className="py-3">
                        {e.stakeId ? (
                          <Link href={`/orders/${e.stakeId}`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                            View <ExternalLink className="h-3 w-3" />
                          </Link>
                        ) : <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="py-3 text-xs text-muted-foreground/70 whitespace-nowrap">
                        {formatCurrency(runningTotalsDesc[idx])}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border bg-secondary/20">
                    <td colSpan={2} className="py-3 text-sm font-semibold">Total earned</td>
                    <td className="py-3 text-sm font-black text-green-400">+{formatCurrency(totalEarnings)}</td>
                    <td colSpan={3} />
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

