'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Rocket, TrendingUp } from 'lucide-react'

const STORAGE_KEY = 'sticky_cta_dismissed_v1'

export function StickySignupCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) return

    function onScroll() {
      if (window.scrollY > 400) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-[360px] animate-in slide-in-from-bottom duration-300">
      <div className="bg-[#0a0f1e] border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 md:rounded-2xl overflow-hidden">
        {/* top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

        <div className="p-4 flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
            <TrendingUp className="h-6 w-6 text-cyan-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight">Start earning daily today</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Join 480,000+ stakers &mdash; first reward in minutes
            </p>
          </div>

          <button
            onClick={dismiss}
            aria-label="Close"
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 pb-4">
          <Link href="/signup" className="block">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25">
              <Rocket className="h-4 w-4" />
              Create Free Account
            </button>
          </Link>
          <p className="text-center text-[11px] text-muted-foreground mt-2">
            No credit card &bull; Takes 2 minutes &bull; $100 bonus
          </p>
        </div>
      </div>
    </div>
  )
}
