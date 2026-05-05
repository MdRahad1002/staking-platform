import { prisma } from '@/lib/db'
import { AnalyticsDashboard } from './AnalyticsDashboard'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Visitor Analytics' }

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; page?: string }>
}) {
  const params = await searchParams
  const days = Number(params.range ?? 7)
  const currentPage = Number(params.page ?? 1)
  const PAGE_SIZE = 50

  const since = new Date(Date.now() - days * 24 * 3600 * 1000)

  const [
    totalPageViews,
    totalClicks,
    uniqueSessions,
    avgDurationResult,
    topPages,
    topClicks,
    topIps,
    recentViews,
    viewsByDay,
  ] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: since } } }),

    prisma.clickEvent.count({ where: { createdAt: { gte: since } } }),

    prisma.pageView.groupBy({
      by: ['sessionId'],
      where: { createdAt: { gte: since } },
      _count: true,
    }).then(r => r.length),

    prisma.pageView.aggregate({
      where: { createdAt: { gte: since }, duration: { not: null } },
      _avg: { duration: true },
    }),

    // Top pages by visits
    prisma.pageView.groupBy({
      by: ['page'],
      where: { createdAt: { gte: since } },
      _count: { page: true },
      _avg: { duration: true },
      orderBy: { _count: { page: 'desc' } },
      take: 20,
    }),

    // Top clicked elements
    prisma.clickEvent.groupBy({
      by: ['element', 'page'],
      where: { createdAt: { gte: since } },
      _count: { element: true },
      orderBy: { _count: { element: 'desc' } },
      take: 20,
    }),

    // Top IPs by visit count
    prisma.pageView.groupBy({
      by: ['ip'],
      where: { createdAt: { gte: since }, ip: { not: null } },
      _count: { ip: true },
      _max: { createdAt: true },
      orderBy: { _count: { ip: 'desc' } },
      take: 30,
    }),

    // Recent raw visits paginated
    prisma.pageView.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
      include: { clicks: { orderBy: { createdAt: 'asc' }, take: 20 } },
    }),

    // Views grouped by day for sparkline
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
      SELECT
        TO_CHAR("createdAt" AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS day,
        COUNT(*)::bigint AS count
      FROM "PageView"
      WHERE "createdAt" >= ${since}
      GROUP BY day
      ORDER BY day ASC
    `,
  ])

  const totalRawPages = await prisma.pageView.count({ where: { createdAt: { gte: since } } })

  return (
    <AnalyticsDashboard
      stats={{
        totalPageViews,
        totalClicks,
        uniqueSessions,
        avgDuration: Math.round(avgDurationResult._avg.duration ?? 0),
      }}
      topPages={topPages.map(p => ({
        page: p.page,
        visits: p._count.page,
        avgDuration: Math.round(p._avg.duration ?? 0),
      }))}
      topClicks={topClicks.map(c => ({
        element: c.element,
        page: c.page,
        count: c._count.element,
      }))}
      topIps={topIps.map(i => ({
        ip: i.ip ?? 'unknown',
        visits: i._count.ip,
        lastSeen: i._max.createdAt?.toISOString() ?? '',
      }))}
      recentViews={recentViews.map(v => ({
        id: v.id,
        sessionId: v.sessionId,
        ip: v.ip ?? 'unknown',
        page: v.page,
        referrer: v.referrer ?? '',
        userAgent: v.userAgent ?? '',
        duration: v.duration ?? null,
        createdAt: v.createdAt.toISOString(),
        clicks: v.clicks.map(c => ({
          element: c.element,
          href: c.href ?? '',
          createdAt: c.createdAt.toISOString(),
        })),
      }))}
      viewsByDay={viewsByDay.map(r => ({
        day: r.day,
        count: Number(r.count),
      }))}
      currentPage={currentPage}
      totalPages={Math.ceil(totalRawPages / PAGE_SIZE)}
      days={days}
    />
  )
}
