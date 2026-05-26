'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CTA_HREF } from '../data'

// BoC rate decision countdown
const BOC_DATE = new Date('2026-06-10T10:00:00-04:00')

function getDaysLeft() {
  const diff = BOC_DATE.getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [daysLeft, setDaysLeft] = useState(getDaysLeft())

  useEffect(() => {
    const id = setInterval(() => setDaysLeft(getDaysLeft()), 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (dismissed) return
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="complementary"
      aria-label="Start staking limited time"
    >
      {/* Urgency bar */}
      <div className="bg-red-600 px-4 py-1.5 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-200" />
        </span>
        <p className="text-white text-xs font-bold tracking-wide text-center">
          BoC rate cut in <span className="text-yellow-300">{daysLeft} days</span> GIC yields dropping
        </p>
      </div>

      {/* Main CTA */}
      <div className="bg-[#0A1628] border-t border-white/10 shadow-2xl px-4 py-3 flex items-center gap-3">
        <Link
          href={CTA_HREF}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 shadow-lg shadow-emerald-500/30"
          tabIndex={visible ? 0 : -1}
        >
          <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
          <span className="text-base leading-tight">Start Earning Now 3 Min Setup</span>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Dismiss"
          tabIndex={visible ? 0 : -1}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Safe-area bottom padding for iOS */}
      <div className="bg-[#0A1628]" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} aria-hidden="true" />
    </div>
  )
}
