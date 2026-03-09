'use client'

import { useEffect, useState } from 'react'
import { LogoIcon } from '@/components/shared/Logo'

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade-out after a short delay (or when window load fires)
    const startFade = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 500)
    }

    if (document.readyState === 'complete') {
      // Page already loaded (e.g. client navigation)
      setTimeout(startFade, 300)
    } else {
      window.addEventListener('load', () => setTimeout(startFade, 300), { once: true })
      // Safety fallback – never block the page for more than 2.8 s
      setTimeout(startFade, 2800)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]"
      style={{
        transition: 'opacity 0.5s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Outer glow */}
      <div className="absolute w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Spinning ring */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer ring – spins */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: '1.2s' }}
          viewBox="0 0 112 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="url(#loaderGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80 240"
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0" y1="0" x2="112" y2="112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner ring – counter-spins */}
        <svg
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-spin"
          style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="url(#loaderGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="30 240"
            strokeOpacity="0.5"
          />
          <defs>
            <linearGradient id="loaderGrad2" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo icon centered */}
        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
          <LogoIcon className="w-10 h-10" />
        </div>
      </div>

      {/* Brand name */}
      <span
        className="absolute mt-44 text-sm font-semibold tracking-widest uppercase"
        style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em' }}
      >
        Stakeonix
      </span>
    </div>
  )
}
