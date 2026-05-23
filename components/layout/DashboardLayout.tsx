'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Menu, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function getBreadcrumb(pathname: string): string[] {
  const segments = pathname.split('/').filter(Boolean)
  return segments.map((seg) =>
    seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const breadcrumbs = getBreadcrumb(pathname)

  // Close mobile sidebar on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const initials = session?.user?.name
    ? session.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  const handleMenuClick = () => {
    // On mobile (<md), toggle the drawer; on desktop toggle collapse
    if (window.innerWidth < 768) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      {/* ── Ambient background glows (fixed, don't scroll) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/[0.06] blur-[160px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-violet-600/[0.06] blur-[140px] -translate-x-1/4 translate-y-1/4" />
        <div className="dot-grid absolute inset-0 opacity-100" />
      </div>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - desktop: inline flow, mobile: fixed drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 md:relative md:z-10 md:translate-x-0 transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar collapsed={collapsed} onClose={() => setMobileOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 relative z-10">
        {/* Header — glass effect */}
        <header className="flex h-14 md:h-16 items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-xl px-4 md:px-6 flex-shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile: logo mark */}
            <Link href="/dashboard" className="md:hidden flex items-center gap-2 mr-1">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 flex-shrink-0">
                <defs>
                  <linearGradient id="bnl" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill="url(#bnl)" />
                <rect x="12" y="10" width="13" height="5" rx="1.5" fill="white" />
                <rect x="12" y="10" width="5" height="10" rx="1.5" fill="white" />
                <rect x="12" y="17.5" width="16" height="5" rx="1.5" fill="white" />
                <rect x="23" y="20" width="5" height="10" rx="1.5" fill="white" />
                <rect x="15" y="25" width="13" height="5" rx="1.5" fill="white" />
              </svg>
              <span className="font-extrabold tracking-tight text-sm leading-none">
                <span className="text-muted-foreground">Stake</span>
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">onix</span>
              </span>
            </Link>

            {/* Desktop: hamburger + breadcrumbs */}
            <button
              onClick={handleMenuClick}
              className="hidden md:flex p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                  <span className={cn(i === breadcrumbs.length - 1 && 'text-foreground font-medium')}>
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <Link href="/notify">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-4.5 w-4.5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={session?.user?.avatar || ''} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Page content — extra bottom padding on mobile for BottomNav */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav onMenuOpen={() => setMobileOpen(true)} />
    </div>
  )
}
