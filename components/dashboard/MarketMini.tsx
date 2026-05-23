'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown } from 'lucide-react'

const ASSETS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', abbr: 'BTC', hex: '#F7931A' },
  { symbol: 'ETHUSDT', name: 'Ethereum', abbr: 'ETH', hex: '#627EEA' },
  { symbol: 'SOLUSDT', name: 'Solana', abbr: 'SOL', hex: '#9945FF' },
  { symbol: 'BNBUSDT', name: 'BNB', abbr: 'BNB', hex: '#F0B90B' },
]

interface Ticker {
  price: number
  changePercent: number
}

export function MarketMini() {
  const [tickers, setTickers] = useState<Record<string, Ticker>>({})
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    try {
      const results = await Promise.allSettled(
        ASSETS.map(async (a) => {
          const res = await fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${a.symbol}`,
            { cache: 'no-store' }
          )
          const data = await res.json()
          return {
            symbol: a.symbol,
            ticker: {
              price: parseFloat(data.lastPrice),
              changePercent: parseFloat(data.priceChangePercent),
            },
          }
        })
      )
      const map: Record<string, Ticker> = {}
      for (const r of results) {
        if (r.status === 'fulfilled' && !isNaN(r.value.ticker.price)) {
          map[r.value.symbol] = r.value.ticker
        }
      }
      setTickers(map)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {ASSETS.map((asset) => {
        const t = tickers[asset.symbol]
        const isUp = (t?.changePercent ?? 0) >= 0
        return (
          <Link
            key={asset.symbol}
            href="/trade"
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/60 p-3.5 hover:border-primary/30 hover:bg-card/90 transition-all duration-200 active:scale-[0.98]"
          >
            {/* top row */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm flex-shrink-0"
                  style={{ background: asset.hex }}
                >
                  {asset.abbr[0]}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-foreground leading-none">{asset.abbr}</p>
                  <p className="text-[9px] text-muted-foreground leading-none mt-0.5">{asset.name}</p>
                </div>
              </div>
              {t ? (
                isUp
                  ? <TrendingUp className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                  : <TrendingDown className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              ) : null}
            </div>

            {/* price */}
            {loading && !t ? (
              <div className="h-4 w-20 rounded bg-secondary/60 animate-pulse" />
            ) : (
              <p className="text-sm font-bold text-foreground font-mono leading-none">
                {t
                  ? `$${t.price.toLocaleString('en-US', { maximumFractionDigits: t.price < 10 ? 4 : 2 })}`
                  : '—'}
              </p>
            )}

            {/* change */}
            <p className={`text-[11px] font-semibold mt-1 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
              {t ? `${isUp ? '+' : ''}${t.changePercent.toFixed(2)}%` : '—'}
            </p>

            {/* subtle glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${asset.hex}15, transparent 70%)` }}
            />
          </Link>
        )
      })}
    </div>
  )
}
