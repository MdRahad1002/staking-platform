'use client'

import { useEffect, useRef } from 'react'

interface PriceChartProps {
  symbol: string
  interval: string
}

export default function PriceChart({ symbol, interval }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ReturnType<typeof import('lightweight-charts')['createChart']> | null>(null)
  const seriesRef = useRef<any>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cancelled = false

    const init = async () => {
      const { createChart, ColorType, CrosshairMode, CandlestickSeries } = await import('lightweight-charts')

      if (cancelled) return

      // Remove previous chart instance
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }

      const container = containerRef.current!
      const chart = createChart(container, {
        layout: {
          background: { type: ColorType.Solid, color: '#18181b' },
          textColor: '#a1a1aa',
        },
        grid: {
          vertLines: { color: '#27272a' },
          horzLines: { color: '#27272a' },
        },
        crosshair: { mode: CrosshairMode.Normal },
        timeScale: {
          borderColor: '#27272a',
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: { borderColor: '#27272a' },
        width: container.clientWidth,
        height: container.clientHeight || 380,
      })

      chartRef.current = chart

      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderUpColor: '#22c55e',
        borderDownColor: '#ef4444',
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
      })
      seriesRef.current = candleSeries

      // Fetch historical klines directly from Binance (public API, CORS-enabled, no proxy needed)
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=500`,
          { cache: 'no-store' }
        )
        if (res.ok && !cancelled) {
          const raw = await res.json()
          if (Array.isArray(raw) && raw.length > 0 && !cancelled) {
            const bars = raw.map((k: any[]) => ({
              time: Math.floor(k[0] / 1000) as any,
              open: parseFloat(k[1]),
              high: parseFloat(k[2]),
              low: parseFloat(k[3]),
              close: parseFloat(k[4]),
            }))
            candleSeries.setData(bars)
            chart.timeScale().fitContent()
          }
        }
      } catch {
        // silently ignore fetch errors
      }

      // WebSocket for real-time kline updates
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
      )
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data)
          const k = msg.k
          if (!k || !seriesRef.current) return
          seriesRef.current.update({
            time: Math.floor(k.t / 1000) as any,
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
          })
        } catch {
          // ignore parse errors
        }
      }
      wsRef.current = ws
    }

    init()

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    })
    ro.observe(containerRef.current)

    return () => {
      cancelled = true
      ro.disconnect()
      wsRef.current?.close()
      wsRef.current = null
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [symbol, interval])

  return <div ref={containerRef} className="w-full h-full" />
}
