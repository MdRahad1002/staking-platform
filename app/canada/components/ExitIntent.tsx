'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { CTA_HREF } from '../data'

// Based on $10,000 the median Canadian household liquid savings estimate.
// GIC best rate vs StakeOnix SOL staking
const DEFAULT_AMOUNT = 10_000
const GIC_APY = 3.9      // best 1-yr GIC on market (Apr 2025 avg)
const STAKING_APY = 12   // SOL staking APY

const ANNUAL_LOSS = DEFAULT_AMOUNT * (STAKING_APY - GIC_APY) / 100   // $810
const DAILY_LOSS  = ANNUAL_LOSS / 365                                  // $2.22

const SESSION_KEY = 'ei_fired'

export function ExitIntent() {
  const [open, setOpen] = useState(false)
  const fired = useRef(false)

  const fire = useCallback(() => {
    if (fired.current) return
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) return
    fired.current = true
    sessionStorage.setItem(SESSION_KEY, '1')
    setOpen(true)
  }, [])

  useEffect(() => {
    // ── Desktop: mouse leaves toward browser chrome ──────────────────────────
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 4) fire()
    }
    document.addEventListener('mouseleave', onMouseLeave)

    // ── Mobile / desktop fallback: 45 s without converting ──────────────────
    const timer = setTimeout(fire, 45_000)

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave)
      clearTimeout(timer)
    }
  }, [fire])

  const close = () => setOpen(false)

  if (!open) return null

  return (
    /* Trap focus inside the dialog for accessibility */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ei-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-[#0A1628] rounded-2xl max-w-md w-full border border-white/10 shadow-2xl overflow-hidden">

        {/* Red urgency strip */}
        <div className="bg-red-600 px-6 py-2.5 flex items-center justify-between">
          <p className="text-white text-xs font-bold uppercase tracking-widest">
            ⚠ Wait before you go
          </p>
          <button
            onClick={close}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-8">
          {/* Headline */}
          <h2
            id="ei-title"
            className="text-white text-2xl sm:text-3xl font-black leading-tight mb-3"
          >
            You&apos;re about to leave{' '}
            <span className="text-red-400 tabular-nums">
              ${DAILY_LOSS.toFixed(2)}
            </span>{' '}
            on the table <span className="text-red-400">today.</span>
          </h2>

          {/* Math breakdown make it real */}
          <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-4 mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white/40 text-xs mb-0.5">Your GIC earns</p>
                <p className="text-white font-bold">{GIC_APY}% / yr</p>
                <p className="text-white/50 text-xs">${(DEFAULT_AMOUNT * GIC_APY / 100 / 365).toFixed(2)}/day on $10K</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-0.5">StakeOnix earns</p>
                <p className="text-emerald-400 font-bold">{STAKING_APY}% / yr</p>
                <p className="text-emerald-400/70 text-xs">${(DEFAULT_AMOUNT * STAKING_APY / 100 / 365).toFixed(2)}/day on $10K</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <p className="text-white/50 text-xs">Gap (your annual opportunity cost)</p>
              <p className="text-red-400 font-black text-lg">${ANNUAL_LOSS.toFixed(0)}/yr</p>
            </div>
          </div>

          <p className="text-white/50 text-sm mb-7">
            Setup takes <strong className="text-white">3 minutes</strong>. No deposit required to open an account. You can withdraw anytime.
          </p>

          {/* CTAs */}
          <div className="space-y-3">
            <Link
              href={CTA_HREF}
              onClick={close}
              className="flex items-center justify-center w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base py-4 transition-all shadow-lg shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              ⚡ Start Earning Now Free
            </Link>

            {/* Guilt-inducing dismiss */}
            <button
              onClick={close}
              className="w-full text-white/25 hover:text-white/40 text-xs py-2 transition-colors"
            >
              No thanks I&apos;m happy losing ${ANNUAL_LOSS.toFixed(0)}/year
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
