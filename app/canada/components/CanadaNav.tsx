'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMPANY_NAME, CTA_HREF } from '../data'
import { LogoIcon } from '@/components/shared/Logo'

export function CanadaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${COMPANY_NAME} home`}>
            <LogoIcon className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
            <span
              className={cn(
                'font-extrabold text-lg tracking-tight transition-colors leading-none',
                scrolled ? 'text-[#0A1628]' : 'text-white'
              )}
            >
              <span className={scrolled ? 'text-gray-500 font-bold' : 'text-white/70 font-bold'}>Stake</span>
              <span className={scrolled
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent'
              }>onix</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Canada page navigation">
            {[
              { href: '#yields', label: 'Live Yields' },
              { href: '#tax', label: 'Tax Advantage' },
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#security', label: 'Security' },
              { href: '#faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#00C896]',
                  scrolled ? 'text-gray-600' : 'text-white/80'
                )}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                'text-sm font-medium transition-colors hover:text-[#00C896]',
                scrolled ? 'text-gray-600' : 'text-white/80'
              )}
            >
              Sign In
            </Link>
            <Link
              href={CTA_HREF}
              className="inline-flex items-center justify-center rounded-lg bg-[#00C896] hover:bg-[#00b386] text-white text-sm font-semibold px-5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896] focus-visible:ring-offset-2"
            >
              Start Staking
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C896]',
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            )}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {[
              { href: '#yields', label: 'Live Yields' },
              { href: '#tax', label: 'Tax Advantage' },
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#security', label: 'Security' },
              { href: '#faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-[#00C896] py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href={CTA_HREF}
                className="inline-flex items-center justify-center rounded-lg bg-[#00C896] hover:bg-[#00b386] text-white text-sm font-semibold px-5 py-3 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Start Staking
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
