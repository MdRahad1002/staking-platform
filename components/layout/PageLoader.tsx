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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{
        transition: 'opacity 0.5s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Green glow behind spinner */}
      <div
        className="absolute w-44 h-44 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,230,150,0.22) 0%, rgba(0,200,120,0.10) 50%, transparent 75%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Spinner + icon */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Single thick arc — rotates */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: '1.1s', animationTimingFunction: 'linear' }}
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track ring */}
          <circle
            cx="48" cy="48" r="42"
            stroke="rgba(0,230,140,0.12)"
            strokeWidth="5"
          />
          {/* Moving arc */}
          <circle
            cx="48" cy="48" r="42"
            stroke="url(#arcGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="90 180"
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00e682" />
              <stop offset="1" stopColor="#00c8b4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo icon centered */}
        <div className="relative z-10 flex items-center justify-center">
          <LogoIcon className="w-9 h-9" />
        </div>
      </div>
    </div>
  )
}
