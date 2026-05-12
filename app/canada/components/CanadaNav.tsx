'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { COMPANY_NAME, CTA_HREF } from '../data'
import { LogoIcon } from '@/components/shared/Logo'

const NAV_LINKS = [
  { href: '#path',         label: 'Get Started' },
  { href: '#yields',       label: 'Live Yields' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#tax',          label: 'Tax Advantage' },
  { href: '#faq',          label: 'FAQ' },
]

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

  // Smooth-scroll to anchor, accounting for the fixed nav height
  const scrollTo = useCallback((href: string) => {
    if (!href.startsWith('#')) return
    const el = document.querySelector(href)
    if (!el) return
    const navHeight = 64
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        scrollTo(href)
        setMobileOpen(false)
      }
    },
    [scrollTo]
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
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
                'text-[#0A1628]'
              )}
            >
              <span className="text-gray-500 font-bold">Stake</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">onix</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Canada page navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="text-sm font-medium text-gray-600 hover:text-[#0A1628] transition-colors"
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
                'text-sm font-medium transition-colors hover:text-[#00C896] text-gray-600'
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
              'text-gray-700 hover:bg-gray-100'
            )}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — full-height overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="text-sm font-medium text-gray-700 hover:text-[#0A1628] py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href={CTA_HREF}
                className="inline-flex items-center justify-center rounded-xl bg-[#0A1628] hover:bg-[#142035] text-white text-sm font-bold px-5 py-3.5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Check My Staking Options
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
