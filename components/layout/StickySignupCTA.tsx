'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Rocket, TrendingUp, MessageCircle } from 'lucide-react'

const STORAGE_KEY = 'sticky_cta_dismissed_v1'
const WA_STORAGE_KEY = 'sticky_wa_dismissed_v1'
const WHATSAPP_URL = 'https://wa.me/16133664391?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20StakeOnix%20staking%20plans.'

export function StickySignupCTA() {
  const [visible, setVisible] = useState(false)
  const [waDismissed, setWaDismissed] = useState(false)

  useEffect(() => {
    setWaDismissed(!!localStorage.getItem(WA_STORAGE_KEY))
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

  function dismissWa() {
    localStorage.setItem(WA_STORAGE_KEY, '1')
    setWaDismissed(true)
  }

  return (
    <>
      {/* WhatsApp contact floating button - always visible until dismissed */}
      {!waDismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-6 md:right-auto md:w-[340px] animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#0a0f1e] border border-green-500/30 shadow-2xl shadow-green-500/10 md:rounded-2xl overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />
            <div className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/20">
                <MessageCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Talk to us on WhatsApp</p>
                <p className="text-xs text-muted-foreground mt-0.5">Custom plans &bull; Questions &bull; Free advice</p>
              </div>
              <button
                onClick={dismissWa}
                aria-label="Close"
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-4 pb-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with Us on WhatsApp
                </button>
              </a>
              <p className="text-center text-[11px] text-muted-foreground mt-2">
                Contact us now for more information or custom plans
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Signup CTA - shown after scroll */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:w-[360px] animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#0a0f1e] border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 md:rounded-2xl overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

            <div className="p-4 flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Start earning daily today</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Join 480,000+ stakers - first reward in minutes
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
      )}
    </>
  )
}
