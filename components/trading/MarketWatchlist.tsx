'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useBinanceTickers } from '@/hooks/useBinanceTickers'
import { Sparkline } from '@/components/ui/sparkline'
import { LiveDot } from '@/components/ui/live-dot'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'

export interface WatchlistSymbol {
  value: string // e.g. BTCUSDT
  label: string // e.g. BTC/USDT
  name: string // e.g. Bitcoin
}

function coinIcon(symbol: string): string {
  const base = symbol.replace('USDT', '').toLowerCase()
  return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${base}.svg`
}

function fmtPrice(n: number): string {
  if (n <= 0) return '—'
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (n >= 1) return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

export function MarketWatchlist({
  symbols,
  selected,
  onSelect,
}: {
  symbols: WatchlistSymbol[]
  selected: string
  onSelect: (symbol: string) => void
}) {
  const tickers = useBinanceTickers(symbols.map((s) => s.value))
  const [query, setQuery] = useState('')

  const filtered = symbols.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0f1e] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">Markets</h3>
          <LiveDot label="Live" />
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Binance</span>
      </div>

      {/* Search */}
      <div className="px-3 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets..."
            className="w-full h-9 pl-8 pr-3 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Rows */}
      <div className="p-2 max-h-[420px] lg:max-h-[560px] overflow-y-auto">
        {filtered.map((s) => {
          const t = tickers[s.value]
          const isActive = selected === s.value
          const up = (t?.changePercent ?? 0) >= 0
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onSelect(s.value)}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-all text-left',
                isActive
                  ? 'bg-blue-500/15 ring-1 ring-blue-500/30'
                  : 'hover:bg-white/[0.04]'
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coinIcon(s.value)}
                alt={s.name}
                className="h-7 w-7 rounded-full flex-shrink-0"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden' }}
              />
              <div className="min-w-0 flex-shrink-0 w-16">
                <p className="text-xs font-bold text-white leading-tight truncate">{s.value.replace('USDT', '')}</p>
                <p className="text-[10px] text-muted-foreground truncate">{s.name}</p>
              </div>

              {/* Sparkline */}
              <div className="flex-1 flex justify-center">
                {t?.spark?.length ? (
                  <Sparkline data={t.spark} up={up} width={64} height={22} />
                ) : (
                  <Skeleton className="h-[22px] w-16" />
                )}
              </div>

              {/* Price + change */}
              <div className="text-right flex-shrink-0 w-[68px]">
                {t && t.price > 0 ? (
                  <>
                    <p className="text-xs font-bold text-white nums-tabular leading-tight">${fmtPrice(t.price)}</p>
                    <p className={cn('text-[10px] font-semibold nums-tabular flex items-center justify-end gap-0.5', up ? 'text-green-400' : 'text-red-400')}>
                      {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      {up ? '+' : ''}{t.changePercent.toFixed(2)}%
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-2.5 w-9" />
                  </div>
                )}
              </div>
            </button>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">No markets match &ldquo;{query}&rdquo;</p>
        )}
      </div>
    </div>
  )
}
