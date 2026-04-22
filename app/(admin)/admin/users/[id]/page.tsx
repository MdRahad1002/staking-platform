import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdminUserActions from './AdminUserActions'
import AdminStakesTable from './AdminStakesTable'

export const dynamic = 'force-dynamic'

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      stakes: { include: { plan: true }, orderBy: { createdAt: 'desc' }, take: 10 },
      deposits: { include: { currency: true }, orderBy: { createdAt: 'desc' }, take: 10 },
      withdrawals: { include: { currency: true }, orderBy: { createdAt: 'desc' }, take: 10 },
      transactions: { orderBy: { createdAt: 'desc' }, take: 10 },
      loginHistory: { orderBy: { createdAt: 'desc' }, take: 5 },
      kyc: true,
      referredBy: { select: { id: true, email: true, username: true } },
    },
  })

  if (!user) notFound()

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">User: {user.username || user.email}</h1>
      </div>

      {/* Profile + Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            {/* Identity */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Identity</p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              {[
                { l: 'Email', v: user.email },
                { l: 'Username', v: user.username || '-' },
                { l: 'First Name', v: user.firstName || '-' },
                { l: 'Last Name', v: user.lastName || '-' },
                { l: 'Phone', v: user.phone || '-' },
                { l: 'Telegram Chat ID', v: user.telegramChatId || '-' },
              ].map((row) => (
                <div key={row.l}>
                  <p className="text-muted-foreground text-xs">{row.l}</p>
                  <p className="font-medium break-all">{row.v}</p>
                </div>
              ))}
            </div>

            {/* Account */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Account</p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <p className="text-muted-foreground text-xs">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Balance</p>
                <p className="font-medium">{formatCurrency(user.balance)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Status</p>
                <p className="font-medium">
                  {user.bannedAt
                    ? <span className="text-red-500">Banned</span>
                    : user.isActive
                      ? <span className="text-green-500">Active</span>
                      : <span className="text-yellow-500">Inactive</span>}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Email Verified</p>
                <p className="font-medium">
                  {user.emailVerified
                    ? <span className="text-green-500">{formatDateTime(user.emailVerified)}</span>
                    : <span className="text-yellow-500">Not Verified</span>}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">2FA</p>
                <p className="font-medium">{user.twoFaEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">PIN</p>
                <p className="font-medium">{user.pinEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Email Opt-Out</p>
                <p className="font-medium">{user.emailOptOut ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">KYC Status</p>
                <p className="font-medium">
                  {user.kyc
                    ? <span className={user.kyc.status === 'APPROVED' ? 'text-green-500' : user.kyc.status === 'REJECTED' ? 'text-red-500' : 'text-yellow-500'}>{user.kyc.status}</span>
                    : <span className="text-muted-foreground">Not Submitted</span>}
                </p>
              </div>
            </div>

            {/* Dates & Activity */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Activity</p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              {[
                { l: 'Joined', v: formatDateTime(user.createdAt) },
                { l: 'Last Login', v: user.lastLoginAt ? formatDateTime(user.lastLoginAt) : '-' },
                { l: 'Last IP', v: user.lastLoginIp || '-' },
                { l: 'Referral Code', v: user.referralCode || '-' },
                { l: 'Referred By', v: user.referredBy ? (user.referredBy.username || user.referredBy.email) : '-' },
              ].map((row) => (
                <div key={row.l}>
                  <p className="text-muted-foreground text-xs">{row.l}</p>
                  <p className="font-medium break-all">{row.v}</p>
                </div>
              ))}
            </div>

            {/* Banned Reason (only if banned) */}
            {user.bannedAt && (
              <div className="mt-2 p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                  Banned on {formatDateTime(user.bannedAt)}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {user.bannedReason || 'No reason provided'}
                </p>
              </div>
            )}

            {/* KYC Details (if submitted) */}
            {user.kyc && (
              <>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 mt-4">KYC Details</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { l: 'KYC First Name', v: user.kyc.firstName },
                    { l: 'KYC Last Name', v: user.kyc.lastName },
                    { l: 'Date of Birth', v: user.kyc.dateOfBirth },
                    { l: 'Country', v: user.kyc.country },
                    { l: 'Document Type', v: user.kyc.documentType },
                    { l: 'Document Number', v: user.kyc.documentNumber },
                    ...(user.kyc.rejectionReason ? [{ l: 'Rejection Reason', v: user.kyc.rejectionReason }] : []),
                  ].map((row) => (
                    <div key={row.l}>
                      <p className="text-muted-foreground text-xs">{row.l}</p>
                      <p className="font-medium">{row.v}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <AdminUserActions user={{ id: user.id, isActive: user.isActive, bannedAt: user.bannedAt?.toISOString() || null, balance: user.balance, role: user.role }} />
      </div>

      {/* Stakes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Stakes</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminStakesTable stakes={user.stakes.map((s) => ({
            id: s.id,
            amount: s.amount,
            totalEarned: s.totalEarned,
            expectedReturn: s.expectedReturn,
            dailyRoi: s.dailyRoi,
            status: s.status,
            currency: s.currency,
            createdAt: s.createdAt.toISOString(),
            plan: { name: s.plan.name },
          }))} />
        </CardContent>
      </Card>

      {/* Deposits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Deposits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Amount</th>
                  <th className="text-left pb-2 font-medium">Currency</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="text-left pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {user.deposits.map((d) => (
                  <tr key={d.id}>
                    <td className="py-2">{formatCurrency(d.amount)}</td>
                    <td className="py-2">{d.currency.symbol}</td>
                    <td className="py-2">
                      <Badge variant={d.status === 'CONFIRMED' ? 'success' : d.status === 'FAILED' ? 'error' : 'warning'} className="text-xs">{d.status}</Badge>
                    </td>
                    <td className="py-2 text-muted-foreground text-xs">{formatDateTime(d.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Amount</th>
                  <th className="text-left pb-2 font-medium">Currency</th>
                  <th className="text-left pb-2 font-medium">Wallet</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="text-left pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {user.withdrawals.length === 0 ? (
                  <tr><td colSpan={5} className="py-4 text-center text-muted-foreground text-xs">No withdrawals</td></tr>
                ) : user.withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="py-2">{formatCurrency(w.amount)}</td>
                    <td className="py-2">{w.currency.symbol}</td>
                    <td className="py-2 font-mono text-xs max-w-[140px] truncate">{w.walletAddress}</td>
                    <td className="py-2">
                      <Badge variant={w.status === 'COMPLETED' ? 'success' : w.status === 'REJECTED' || w.status === 'FAILED' ? 'error' : 'warning'} className="text-xs">{w.status}</Badge>
                    </td>
                    <td className="py-2 text-muted-foreground text-xs">{formatDateTime(w.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-left pb-2 font-medium">Amount</th>
                  <th className="text-left pb-2 font-medium">Description</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="text-left pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {user.transactions.length === 0 ? (
                  <tr><td colSpan={5} className="py-4 text-center text-muted-foreground text-xs">No transactions</td></tr>
                ) : user.transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="py-2">
                      <Badge variant="info" className="text-xs">{t.type}</Badge>
                    </td>
                    <td className="py-2 font-medium">{formatCurrency(t.amount)}</td>
                    <td className="py-2 text-muted-foreground text-xs max-w-[160px] truncate">{t.description || '-'}</td>
                    <td className="py-2">
                      <Badge variant={t.status === 'COMPLETED' ? 'success' : 'warning'} className="text-xs">{t.status}</Badge>
                    </td>
                    <td className="py-2 text-muted-foreground text-xs">{formatDateTime(t.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      {user.loginHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Login History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left pb-2 font-medium">IP Address</th>
                    <th className="text-left pb-2 font-medium">User Agent</th>
                    <th className="text-left pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {user.loginHistory.map((l) => (
                    <tr key={l.id}>
                      <td className="py-2 font-mono text-xs">{l.ipAddress || '-'}</td>
                      <td className="py-2 text-muted-foreground text-xs max-w-[200px] truncate">{l.userAgent || '-'}</td>
                      <td className="py-2 text-muted-foreground text-xs">{formatDateTime(l.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
