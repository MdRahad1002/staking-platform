'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CTA_HREF } from '../data'

const BOC_DATE = new Date('2026-06-10T10:00:00-04:00')

function getTimeLeft() {
  const diff = BOC_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

// Zeros prevent SSR/client hydration mismatch (#418)
const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export function CountdownTimer() {
  const [t, setT] = useState(ZERO)

  useEffect(() => {
    setT(getTimeLeft())
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div
      className="relative bg-gradient-to-r from-red-950/70 via-[#0d0608] to-red-950/70 border-b border-red-900/30 overflow-hidden"
      role="region"
      aria-label="Bank of Canada rate cut countdown"
    >
      {/* Bottom glow line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 h-11 sm:h-12">

          {/* Pulse + label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
              <span className="hidden sm:inline">BoC Rate Decision &middot; </span>June 10
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 flex-shrink-0" aria-hidden="true" />

          {/* Countdown digits */}
          <div className="flex items-center gap-1 sm:gap-2" suppressHydrationWarning>
            {[
              { val: pad(t.days),    label: 'd' },
              { val: pad(t.hours),   label: 'h' },
              { val: pad(t.minutes), label: 'm' },
              { val: pad(t.seconds), label: 's' },
            ].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && <span className="text-red-900/80 font-bold text-sm" aria-hidden="true">:</span>}
                <div className="flex items-baseline gap-[2px]">
                  <span
                    className="text-sm sm:text-xl font-black text-white tabular-nums leading-none"
                    suppressHydrationWarning
                  >
                    {val}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-red-500/70 font-bold uppercase">{label}</span>
                </div>
              </div>
            ))}
          </div>

          <span className="text-white/20 hidden md:inline" aria-hidden="true">|</span>
          <span className="text-white/35 text-xs hidden md:inline">GIC yields expected to drop</span>

          <div className="flex-1" />

          {/* CTA */}
          <Link
            href={CTA_HREF}
            className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 whitespace-nowrap shadow-md shadow-red-950/60"
          >
            <span className="hidden sm:inline">Earn More Before June 10</span>
            <span className="sm:hidden">Act Now</span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
