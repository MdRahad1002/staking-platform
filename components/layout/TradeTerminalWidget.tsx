'use client'

import { useEffect, useState, useCallback } from 'react'
import { CandlestickChart } from 'lucide-react'

interface BtcMarket {
  price: string
  change: string
  up: boolean
  high: string
  low: string
  volume: string
}

const FALLBACK: BtcMarket = {
  price: '$67,842',
  change: '+2.34%',
  up: true,
  high: '$68,421',
  low: '$65,210',
  volume: '$2.4B',
}

export default function TradeTerminalWidget() {
  const [market, setMarket] = useState<BtcMarket>(FALLBACK)

  const fetchMarket = useCallback(async () => {
    try {
      const res = await fetch('/api/btc-market', { cache: 'no-store' })
      if (!res.ok) return
      const data: BtcMarket = await res.json()
      if (data && data.price) setMarket(data)
    } catch {
      // silently keep last known values
    }
  }, [])

  useEffect(() => {
    fetchMarket()
    const id = setInterval(fetchMarket, 30_000) // refresh every 30 s
    return () => clearInterval(id)
  }, [fetchMarket])

  return (
    <div className="relative order-2 lg:order-1">
      <div className="absolute -inset-4 bg-blue-500/8 blur-3xl rounded-3xl pointer-events-none" />
      <div className="relative rounded-2xl border border-blue-500/20 bg-[#0a0f1e] overflow-hidden shadow-2xl shadow-blue-500/10">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <CandlestickChart className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">BTC / USDT</p>
              <p className="text-[10px] text-muted-foreground">Bitcoin · Live Market</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-white">{market.price}</p>
            <p className={`text-xs font-semibold ${market.up ? 'text-green-400' : 'text-red-400'}`}>
              {market.change} {market.up ? '↑' : '↓'}
            </p>
          </div>
        </div>

        {/* SVG candlestick chart */}
        <div className="px-5 pt-4 pb-2">
          <svg viewBox="0 0 420 140" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Area fill */}
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,110 C40,105 60,90 90,80 C120,70 140,75 170,55 C200,35 220,45 250,30 C280,15 300,25 330,18 C360,11 390,20 420,15 L420,140 L0,140 Z" fill="url(#chartGrad)" />
            <path d="M0,110 C40,105 60,90 90,80 C120,70 140,75 170,55 C200,35 220,45 250,30 C280,15 300,25 330,18 C360,11 390,20 420,15" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Candlestick bars */}
            {[
              { x: 30, open: 108, close: 96, high: 92, low: 114 },
              { x: 65, open: 94, close: 85, high: 80, low: 98 },
              { x: 100, open: 86, close: 78, high: 73, low: 90 },
              { x: 135, open: 78, close: 68, high: 62, low: 82 },
              { x: 170, open: 72, close: 58, high: 52, low: 76 },
              { x: 205, open: 60, close: 48, high: 42, low: 64 },
              { x: 240, open: 50, close: 34, high: 28, low: 54 },
              { x: 275, open: 36, close: 24, high: 18, low: 40 },
              { x: 310, open: 26, close: 20, high: 14, low: 30 },
              { x: 345, open: 22, close: 16, high: 10, low: 26 },
              { x: 390, open: 18, close: 12, high: 6, low: 22 },
            ].map((c, i) => {
              const bullish = c.close < c.open
              const color = bullish ? '#22c55e' : '#ef4444'
              return (
                <g key={i}>
                  <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="1" />
                  <rect x={c.x - 5} y={Math.min(c.open, c.close)} width="10" height={Math.abs(c.open - c.close) || 2} fill={color} rx="1" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Order panel */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] border-t border-white/[0.06]">
          {[
            { label: '24h High', value: market.high, color: 'text-green-400' },
            { label: '24h Low', value: market.low, color: 'text-red-400' },
            { label: '24h Volume', value: market.volume, color: 'text-blue-400' },
          ].map((s) => (
            <div key={s.label} className="px-4 py-3 bg-[#0a0f1e]">
              <p className="text-[10px] text-muted-foreground mb-0.5">{s.label}</p>
              <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Buy/Sell buttons */}
        <div className="flex gap-2 p-4 border-t border-white/[0.06]">
          <button className="flex-1 py-2.5 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold hover:bg-green-500/30 transition-colors">Buy</button>
          <button className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-colors">Sell</button>
        </div>
      </div>
    </div>
  )
}
