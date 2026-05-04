'use client'

import { useEffect, useRef, useState } from 'react'
import { canadaStats } from '../data'

function useCountUp(target: string, duration = 1600, active: boolean) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    // Parse numeric part (strip non-numeric except dot)
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? ''
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? ''
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(num)) { setDisplay(target); return }

    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = num * ease
      const formatted = num % 1 === 0
        ? Math.floor(current).toLocaleString()
        : current.toFixed(1)
      setDisplay(`${prefix}${formatted}${suffix}`)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return display
}

function StatCard({ value, label, active }: { value: string; label: string; active: boolean }) {
  const display = useCountUp(value, 1600, active)
  return (
    <div className="flex flex-col items-center text-center px-6 py-4">
      <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
        {active ? display : '0'}
      </span>
      <span className="mt-1 text-sm text-white/60 font-medium">{label}</span>
    </div>
  )
}

export function CanadaStats() {
  const ref = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Canadian platform statistics"
      className="bg-gradient-to-br from-[#0A1628] to-[#0d1f3c] py-14 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#00C896] text-xs font-semibold uppercase tracking-widest mb-8">
          Trusted by Canadians
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {canadaStats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
