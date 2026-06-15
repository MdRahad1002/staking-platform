import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import {
  Bell, Info, CheckCircle, AlertTriangle, DollarSign,
  TrendingUp, Users, Settings, ArrowUpRight,
} from 'lucide-react'
import { Suspense } from 'react'
import MarkReadButton from './MarkReadButton'
import MarkSingleRead from './MarkSingleRead'
import FilterTabs from './FilterTabs'
import NotifLinkRow from './NotifLinkRow'

export const dynamic = 'force-dynamic'

const iconMap: Record<string, React.ElementType> = {
  SYSTEM:     Settings,
  INFO:       Info,
  SUCCESS:    CheckCircle,
  WARNING:    AlertTriangle,
  DEPOSIT:    DollarSign,
  WITHDRAWAL: DollarSign,
  STAKING:    TrendingUp,
  REFERRAL:   Users,
}

const colorMap: Record<string, { text: string; bg: string }> = {
  SYSTEM:     { text: 'text-muted-foreground', bg: 'bg-secondary/60' },
  INFO:       { text: 'text-amber-400',        bg: 'bg-amber-400/10' },
  SUCCESS:    { text: 'text-green-400',         bg: 'bg-green-400/10' },
  WARNING:    { text: 'text-yellow-400',        bg: 'bg-yellow-400/10' },
  DEPOSIT:    { text: 'text-blue-400',          bg: 'bg-blue-400/10' },
  WITHDRAWAL: { text: 'text-orange-400',        bg: 'bg-orange-400/10' },
  STAKING:    { text: 'text-purple-400',        bg: 'bg-purple-400/10' },
  REFERRAL:   { text: 'text-pink-400',          bg: 'bg-pink-400/10' },
}

export default async function NotificationPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const session = await requireAuth()
  const { type: typeFilter = '' } = await searchParams

  const [all, filtered] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      select: { type: true, isRead: true },
      orderBy: { createdAt: 'desc' },
      take: 500,
    }),
    prisma.notification.findMany({
      where: {
        userId: session.user.id,
        ...(typeFilter ? { type: typeFilter } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
  ])

  const unreadCount = all.filter((n) => !n.isRead).length

  const counts: Record<string, number> = { __total__: all.length }
  for (const n of all) {
    counts[n.type] = (counts[n.type] ?? 0) + 1
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent">
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/20 p-3 border border-blue-500/30">
              <Bell className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && <MarkReadButton />}
        </div>
      </div>

      {/* Type filter */}
      <Suspense fallback={null}>
        <FilterTabs counts={counts} />
      </Suspense>

      {/* Notification list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-7 w-7 opacity-30" />
            </div>
            <p className="font-medium">
              {typeFilter ? `No ${typeFilter.toLowerCase()} notifications.` : 'No notifications yet.'}
            </p>
            <p className="text-sm mt-1">Check back later for updates.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((notif) => {
              const Icon = iconMap[notif.type] ?? Bell
              const colors = colorMap[notif.type] ?? { text: 'text-muted-foreground', bg: 'bg-secondary/60' }

              const row = (
                <div
                  className={`flex items-start gap-4 px-5 py-4 transition-colors ${
                    !notif.isRead ? 'bg-primary/5' : 'hover:bg-secondary/20'
                  } ${notif.link ? 'cursor-pointer' : ''}`}
                >
                  {/* Unread dot */}
                  {!notif.isRead && (
                    <div className="mt-2 shrink-0 w-2 h-2 rounded-full bg-blue-400" />
                  )}

                  {/* Icon circle */}
                  <div className={`mt-0.5 shrink-0 rounded-xl p-2.5 ${colors.bg} ${notif.isRead ? 'ml-4' : ''}`}>
                    <Icon className={`h-4 w-4 ${colors.text}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${notif.isRead ? 'text-muted-foreground' : ''}`}>
                        {notif.title}
                      </p>
                      <Badge variant="secondary" className="text-[10px] py-0 h-4 capitalize hidden sm:inline-flex">
                        {notif.type.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-muted-foreground">{formatDateTime(notif.createdAt)}</p>
                      {notif.link && (
                        <span className="text-xs text-primary flex items-center gap-0.5">
                          View <ArrowUpRight className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                  {!notif.isRead && <MarkSingleRead id={notif.id} />}
                </div>
              )

              return notif.link ? (
                <NotifLinkRow key={notif.id} href={notif.link} id={notif.id} isRead={notif.isRead}>
                  {row}
                </NotifLinkRow>
              ) : (
                <div key={notif.id}>{row}</div>
              )
            })}
          </div>
        )}
      </div>

      {all.length > 100 && !typeFilter && (
        <p className="text-xs text-center text-muted-foreground">
          Showing 100 most recent notifications of {all.length} total.
        </p>
      )}
    </div>
  )
}
