'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
  ChevronRight,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/shared/Logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Staking Plans' },
  { href: '/what-is-staking', label: 'What is Staking?' },
  { href: '/what-is-mining', label: 'What is Mining?' },
  { href: '/why-choose-us', label: 'Why Us' },
  { href: '/referral-program', label: 'Referrals' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setUserDropdown(false)
  }, [pathname])

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    if (!userDropdown) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [userDropdown])

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <>
      <nav
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-white/10 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/20'
            : 'border-b border-transparent bg-background/60 backdrop-blur-md'
        )}
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav only visible on lg+ */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative flex items-center px-2.5 xl:px-3.5 py-2 text-sm transition-all rounded-xl whitespace-nowrap',
                  pathname === link.href
                    ? 'text-foreground bg-white/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth buttons desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                >
                  <Avatar className="h-7 w-7 ring-1 ring-white/10">
                    <AvatarImage src={session.user.avatar || ''} />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-amber-500 to-amber-600">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{session.user.name?.split(' ')[0]}</span>
                  <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform duration-200', userDropdown && 'rotate-180')} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50 overflow-hidden z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-sm font-semibold">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-white/5 transition-colors" onClick={() => setUserDropdown(false)}>
                      <LayoutDashboard className="h-4 w-4 text-amber-400" />
                      Dashboard
                    </Link>
                    <Link href="/notify" className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-white/5 transition-colors" onClick={() => setUserDropdown(false)}>
                      <Bell className="h-4 w-4 text-blue-400" />
                      Notifications
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-white/5 transition-colors" onClick={() => setUserDropdown(false)}>
                      <Settings className="h-4 w-4 text-purple-400" />
                      Settings
                    </Link>
                    <div className="border-t border-white/5">
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/5 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="gap-1.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white border-0 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <Rocket className="h-3.5 w-3.5" />
                    Start Earning
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger shown on mobile & tablet (< lg) */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={cn('transition-all duration-200', mobileOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-100')}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Drawer full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel slides down from top */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 bg-background border-b border-white/10 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="overflow-y-auto max-h-[calc(100svh-4rem)]">
            <div className="px-3 py-3 space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between py-3.5 px-4 text-base rounded-xl transition-colors font-medium',
                    pathname === link.href
                      ? 'text-foreground bg-white/[0.08] border border-white/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5 active:bg-white/10'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  {pathname === link.href
                    ? <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-amber-400 to-amber-500" />
                    : <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                  }
                </Link>
              ))}
            </div>

            {/* Auth section */}
            <div className="px-3 pb-6 pt-2 border-t border-white/5 mx-3 mt-1">
              {session ? (
                <>
                  {/* User info strip */}
                  <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl bg-white/[0.04] border border-white/5">
                    <Avatar className="h-9 w-9 ring-1 ring-white/10 flex-shrink-0">
                      <AvatarImage src={session.user.avatar || ''} />
                      <AvatarFallback className="text-sm bg-gradient-to-br from-amber-500 to-amber-600">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/dashboard" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 rounded-xl h-11 font-semibold" size="sm">
                        <LayoutDashboard className="h-4 w-4 mr-1.5" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-11 px-4 rounded-xl border border-white/10 w-full justify-center"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2.5 pt-3">
                  <Link href="/signup" className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 rounded-xl h-12 text-base font-semibold shadow-lg shadow-amber-500/20">
                      <Rocket className="h-4 w-4 mr-2" />
                      Start Earning
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-white/10 h-12 text-base rounded-xl">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
