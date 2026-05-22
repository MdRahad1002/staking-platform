'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CTA_HREF } from '../data'

// Bank of Canada rate decision — June 10, 2026 at 10:00 AM ET
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

export function CountdownTimer() {
  const [t, setT] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="bg-[#0A1628] border-b border-white/10 py-5" aria-label="Bank of Canada rate cut countdown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: Label */}
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-0.5">
              ⚠ Bank of Canada Rate Decision
            </p>
            <p className="text-white/60 text-sm">
              GIC rates expected to drop. Lock in staking yields now.
            </p>
          </div>

          {/* Center: Countdown */}
          <div className="flex items-center gap-2 sm:gap-3" aria-live="polite" aria-label="Time until Bank of Canada decision">
            {[
              { val: pad(t.days),    label: 'days'    },
              { val: pad(t.hours),   label: 'hours'   },
              { val: pad(t.minutes), label: 'min'     },
              { val: pad(t.seconds), label: 'sec'     },
            ].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && <span className="text-white/30 text-xl font-bold -mt-3">:</span>}
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">{val}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0">
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm px-5 py-3 transition-all duration-200 shadow-lg shadow-red-500/30 whitespace-nowrap"
            >
              Earn More Before June 10 →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
