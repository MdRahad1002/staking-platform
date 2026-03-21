'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Gift } from 'lucide-react'

const STORAGE_KEY = 'announcement_dismissed_v1'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative z-50 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white text-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-center">
        <Gift className="h-4 w-4 flex-shrink-0 text-yellow-300" />
        <span className="leading-snug">
          <span className="font-semibold">Limited offer:</span> New members receive a{' '}
          <span className="font-bold text-yellow-300">$100 welcome bonus</span> on their first stake.
        </span>
        <Link
          href="/signup"
          className="hidden sm:inline-flex items-center gap-1 font-bold underline underline-offset-2 whitespace-nowrap hover:text-yellow-200 transition-colors ml-1"
        >
          Claim yours →
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
