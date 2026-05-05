'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CTA_HREF } from '../data'

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return

    // Show after user scrolls past the hero (~100vh)
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="complementary"
      aria-label="Start staking call to action"
    >
      <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex items-center gap-3">
        <Link
          href={CTA_HREF}
          className="flex-1 inline-flex flex-col items-center justify-center rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-bold py-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2 shadow-lg shadow-[#00C896]/25"
          tabIndex={visible ? 0 : -1}
        >
          <span className="text-base leading-tight">Create Free Account</span>
          <span className="text-[11px] font-normal opacity-80">Min $200 &bull; Earn daily &bull; Withdraw anytime</span>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          aria-label="Dismiss"
          tabIndex={visible ? 0 : -1}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {/* Safe-area bottom padding for iOS */}
      <div className="h-safe-bottom bg-white" aria-hidden="true" />
    </div>
  )
}
