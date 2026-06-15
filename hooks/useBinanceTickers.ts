'use client'

import { useEffect, useState } from 'react'

export interface LiveTicker {
  price: number
  open: number
  changePercent: number
  high: number
  low: number
  volume: number
  /** Recent close prices for a sparkline; tip tracks the live price. */
  spark: number[]
}

const SPARK_POINTS = 32

function emptyTicker(): LiveTicker {
  return { price: 0, open: 0, changePercent: 0, high: 0, low: 0, volume: 0, spark: [] }
}

/**
 * Subscribes to live mini-ticker data for several Binance symbols over a single
 * combined WebSocket connection. Sparklines are seeded from 15m klines, then the
 * final point tracks the live price. All requests are client-side (matching the
 * TradingTerminal) to avoid Vercel server-side rate-limiting.
 */
export function useBinanceTickers(symbols: string[]): Record<string, LiveTicker> {
  const [tickers, setTickers] = useState<Record<string, LiveTicker>>({})
  const symbolsKey = symbols.join(',')

  useEffect(() => {
    let cancelled = false
    const list = symbolsKey ? symbolsKey.split(',') : []
    if (list.length === 0) return

    // Seed sparklines from recent klines (parallel, best-effort)
    Promise.allSettled(
      list.map(async (s) => {
        const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${s}&interval=15m&limit=${SPARK_POINTS}`)
        if (!res.ok) throw new Error('klines failed')
        const rows: (string | number)[][] = await res.json()
        return { s, closes: rows.map((r) => parseFloat(String(r[4]))) }
      })
    ).then((results) => {
      if (cancelled) return
      setTickers((prev) => {
        const next = { ...prev }
        for (const r of results) {
          if (r.status === 'fulfilled') {
            const { s, closes } = r.value
            next[s] = { ...(next[s] ?? emptyTicker()), spark: closes, price: closes[closes.length - 1] ?? next[s]?.price ?? 0 }
          }
        }
        return next
      })
    })

    // Single combined stream for all symbols
    const streams = list.map((s) => `${s.toLowerCase()}@miniTicker`).join('/')
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        const d = msg?.data
        if (!d?.s) return
        const price = parseFloat(d.c)
        const open = parseFloat(d.o)
        setTickers((prev) => {
          const existing = prev[d.s] ?? emptyTicker()
          const spark = existing.spark.length ? [...existing.spark.slice(0, -1), price] : [price]
          return {
            ...prev,
            [d.s]: {
              price,
              open,
              changePercent: open ? ((price - open) / open) * 100 : 0,
              high: parseFloat(d.h),
              low: parseFloat(d.l),
              volume: parseFloat(d.v),
              spark,
            },
          }
        })
      } catch {
        // ignore malformed frames
      }
    }

    return () => {
      cancelled = true
      ws.close()
    }
  }, [symbolsKey])

  return tickers
}
