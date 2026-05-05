'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Eye, MousePointer, Users, Clock, Globe, ArrowUpRight,
  ChevronDown, ChevronUp, Search, RefreshCw, Monitor, Smartphone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  totalPageViews: number
  totalClicks: number
  uniqueSessions: number
  avgDuration: number
}

interface TopPage {
  page: string
  visits: number
  avgDuration: number
}

interface TopClick {
  element: string
  page: string
  count: number
}

interface TopIp {
  ip: string
  visits: number
  lastSeen: string
}

interface ClickSummary {
  element: string
  href: string
  createdAt: string
}

interface RecentView {
  id: string
  sessionId: string
  ip: string
  page: string
  referrer: string
  userAgent: string
  duration: number | null
  createdAt: string
  clicks: ClickSummary[]
}

interface DayCount {
  day: string
  count: number
}

interface Props {
  stats: Stats
  topPages: TopPage[]
  topClicks: TopClick[]
  topIps: TopIp[]
  recentViews: RecentView[]
  viewsByDay: DayCount[]
  currentPage: number
  totalPages: number
  days: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString()
}

function fmtDuration(s: number | null) {
  if (!s) return '0s'
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function deviceIcon(ua: string) {
  const m = /mobile|android|iphone|ipad/i.test(ua)
  return m
    ? <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
    : <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
}

function browserFromUa(ua: string) {
  if (/Chrome\//.test(ua) && !/Edg/.test(ua)) return 'Chrome'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return 'Safari'
  if (/Edg\//.test(ua)) return 'Edge'
  return 'Other'
}

// Mini sparkline using SVG
function Sparkline({ data }: { data: DayCount[] }) {
  if (!data.length) return null
  const max = Math.max(...data.map(d => d.count), 1)
  const W = 200, H = 40, pad = 4
  const pts = data.map((d, i) => {
    const x = pad + (i / Math.max(data.length - 1, 1)) * (W - pad * 2)
    const y = H - pad - ((d.count / max) * (H - pad * 2))
    return `${x},${y}`
  })
  return (
    <svg width={W} height={H} className="text-primary">
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function AnalyticsDashboard({
  stats, topPages, topClicks, topIps, recentViews, viewsByDay,
  currentPage, totalPages, days,
}: Props) {
  const router = useRouter()
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [ipSearch, setIpSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'sessions' | 'pages' | 'clicks' | 'ips'>('sessions')

  function setRange(d: number) {
    router.push(`/admin/analytics?range=${d}`)
  }

  function goPage(p: number) {
    router.push(`/admin/analytics?range=${days}&page=${p}`)
  }

  const filteredIps = topIps.filter(i =>
    !ipSearch || i.ip.includes(ipSearch)
  )

  const statCards = [
    { label: 'Page Views', value: fmt(stats.totalPageViews), icon: Eye, sub: `Last ${days} days` },
    { label: 'Unique Sessions', value: fmt(stats.uniqueSessions), icon: Users, sub: 'Unique visitors' },
    { label: 'Clicks Tracked', value: fmt(stats.totalClicks), icon: MousePointer, sub: 'Across all pages' },
    { label: 'Avg Time on Page', value: fmtDuration(stats.avgDuration), icon: Clock, sub: 'Per page visit' },
  ]

  const tabs = [
    { key: 'sessions' as const, label: 'Recent Sessions' },
    { key: 'pages' as const, label: 'Top Pages' },
    { key: 'clicks' as const, label: 'Top Clicks' },
    { key: 'ips' as const, label: 'Visitor IPs' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Visitor Analytics</h1>
          <p className="text-muted-foreground text-sm">Real-time tracking: page views, clicks, IPs and session data.</p>
        </div>
        <div className="flex items-center gap-2">
          {[1, 7, 14, 30].map(d => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                days === d ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {d === 1 ? '24h' : `${d}d`}
            </button>
          ))}
          <button
            onClick={() => router.refresh()}
            className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, sub }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sparkline */}
      {viewsByDay.length > 1 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Page Views Over Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end gap-4">
            <Sparkline data={viewsByDay} />
            <div className="text-xs text-muted-foreground space-y-0.5">
              {viewsByDay.slice(-3).map(d => (
                <div key={d.day}>{d.day}: <span className="text-foreground font-medium">{d.count}</span></div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Recent Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-3">
          {recentViews.length === 0 && (
            <p className="text-muted-foreground text-sm py-8 text-center">No sessions yet. Tracking is active.</p>
          )}
          {recentViews.map(v => (
            <Card key={v.id} className="overflow-hidden">
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setExpandedSession(expandedSession === v.id ? null : v.id)}
              >
                <CardContent className="py-3 px-4 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    {deviceIcon(v.userAgent)}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded text-foreground">{v.ip}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-xs">{v.page}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                        <span>{browserFromUa(v.userAgent)}</span>
                        {v.referrer && <span className="truncate max-w-[200px]">from: {v.referrer}</span>}
                        <span>{fmtDuration(v.duration)} on page</span>
                        <span>{v.clicks.length} click{v.clicks.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{timeAgo(v.createdAt)}</span>
                    {expandedSession === v.id
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    }
                  </div>
                </CardContent>
              </button>

              {expandedSession === v.id && (
                <div className="border-t border-border bg-secondary/30 px-4 py-3 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground font-medium mb-0.5">Session ID</p>
                      <p className="font-mono text-[11px] break-all">{v.sessionId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-medium mb-0.5">User Agent</p>
                      <p className="break-all">{v.userAgent || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground font-medium mb-0.5">Timestamp</p>
                      <p>{new Date(v.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {v.clicks.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Click trail</p>
                      <div className="space-y-1">
                        {v.clicks.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-muted-foreground flex-shrink-0 mt-0.5">{new Date(c.createdAt).toLocaleTimeString()}</span>
                            <span className="font-mono bg-background px-1.5 py-0.5 rounded">{c.element}</span>
                            {c.href && (
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-0.5 truncate max-w-xs"
                              >
                                {c.href.slice(0, 60)}
                                <ArrowUpRight className="h-2.5 w-2.5 flex-shrink-0" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => goPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg bg-secondary text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => goPage(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg bg-secondary text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Top Pages */}
      {activeTab === 'pages' && (
        <Card>
          <CardContent className="pt-4 p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="pb-2 px-4 font-medium">Page</th>
                  <th className="pb-2 px-4 font-medium text-right">Visits</th>
                  <th className="pb-2 px-4 font-medium text-right">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="truncate max-w-xs font-mono text-xs">{p.page}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-semibold">{fmt(p.visits)}</td>
                    <td className="py-2.5 px-4 text-right text-muted-foreground">{fmtDuration(p.avgDuration)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Top Clicks */}
      {activeTab === 'clicks' && (
        <Card>
          <CardContent className="pt-4 p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-left">
                  <th className="pb-2 px-4 font-medium">Element</th>
                  <th className="pb-2 px-4 font-medium">Page</th>
                  <th className="pb-2 px-4 font-medium text-right">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {topClicks.map((c, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-4">
                      <span className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded">{c.element}</span>
                    </td>
                    <td className="py-2.5 px-4 text-muted-foreground text-xs truncate max-w-[200px]">{c.page}</td>
                    <td className="py-2.5 px-4 text-right font-semibold">{fmt(c.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Visitor IPs */}
      {activeTab === 'ips' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by IP address..."
              value={ipSearch}
              onChange={e => setIpSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Card>
            <CardContent className="pt-4 p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-2 px-4 font-medium">IP Address</th>
                    <th className="pb-2 px-4 font-medium text-right">Visits</th>
                    <th className="pb-2 px-4 font-medium text-right">Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIps.map((ip, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 px-4">
                        <span className="font-mono text-xs">{ip.ip}</span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-semibold">{fmt(ip.visits)}</td>
                      <td className="py-2.5 px-4 text-right text-muted-foreground text-xs">{timeAgo(ip.lastSeen)}</td>
                    </tr>
                  ))}
                  {filteredIps.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-muted-foreground">No results</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
