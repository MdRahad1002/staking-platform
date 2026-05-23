'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CTA_HREF } from '../data'

// Opportunity cost per second — on $10,000, gap between GIC (3.9%) and staking (12%)
const ANNUAL_GAP  = 10_000 * (12 - 3.9) / 100   // $810
const PER_SECOND  = ANNUAL_GAP / (365 * 24 * 3600) // ~$0.0000257/sec

function fmt(n: number) {
  return n.toLocaleString('en-CA', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export function LossTicker() {
  const startRef    = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)   // seconds on page
  const [lost, setLost]       = useState(0)   // CAD opportunity cost

  useEffect(() => {
    const id = setInterval(() => {
      const secs = Math.floor((Date.now() - startRef.current) / 1000)
      setElapsed(secs)
      setLost(secs * PER_SECOND)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative overflow-hidden bg-[#0d1f3a] border-b border-white/10 py-3 px-4"
      role="status"
      aria-live="polite"
      aria-label="Opportunity cost since page load"
    >
      {/* Subtle animated scan line for "live" feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-scan" />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Left: timer + loss */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-white/40 hidden sm:inline">⏱</span>
          <span className="text-white/50">
            Time on this page:{' '}
            <span className="text-white font-semibold tabular-nums">{fmtTime(elapsed)}</span>
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">
            Missed staking rewards:{' '}
            <span className="text-red-400 font-bold tabular-nums">${fmt(lost)} CAD</span>
            <span className="text-white/30 text-xs ml-1">(vs GIC, on $10K)</span>
          </span>
        </div>

        {/* Right: inline CTA */}
        <Link
          href={CTA_HREF}
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-4 py-2 transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap"
        >
          Stop Losing &rarr; Start Now
        </Link>
      </div>
    </div>
  )
}

/* ── Compact inline badge — embed this inside the Hero ───────────────────── */
export function LossTickerBadge() {
  const startRef = useRef(Date.now())
  const [lost, setLost] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      const secs = (Date.now() - startRef.current) / 1000
      setLost(secs * PER_SECOND)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (lost === 0) return null

  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-xl bg-red-950/50 border border-red-800/30 px-4 py-2.5 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-70" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <p className="text-sm text-white/55">
        Since you landed:{' '}
        <span className="text-red-400 font-bold tabular-nums">${lost.toFixed(4)} CAD</span>
        <span className="text-white/25 text-xs"> missed (vs GIC, on $10K)</span>
      </p>
    </div>
  )
}
