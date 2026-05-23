'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CandlestickChart,
  ArrowDownToLine,
  List,
  MoreHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  onMenuOpen: () => void
}

const TABS = [
  { href: '/dashboard', label: 'Home', Icon: LayoutDashboard, exact: true },
  { href: '/trade', label: 'Trade', Icon: CandlestickChart },
  { href: '/deposit', label: 'Deposit', Icon: ArrowDownToLine },
  { href: '/orders', label: 'Stakes', Icon: List },
]

export function BottomNav({ onMenuOpen }: BottomNavProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border"
      style={{ background: 'hsl(225, 58%, 7%)' }}
    >
      {/* Safe area inset for devices with home indicator */}
      <div className="flex h-16 pb-[env(safe-area-inset-bottom)]">
        {TABS.map(({ href, label, Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full transition-all',
                  active && 'bg-primary/15'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span>{label}</span>
            </Link>
          )
        })}

        {/* More → opens full sidebar drawer */}
        <button
          onClick={onMenuOpen}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground transition-colors active:text-foreground"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </div>
          <span>More</span>
        </button>
      </div>
    </nav>
  )
}
