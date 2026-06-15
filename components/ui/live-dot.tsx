'use client'

import { cn } from '@/lib/utils'

interface LiveDotProps {
  label?: string
  className?: string
  /** Tailwind color class for the dot, e.g. 'bg-blue-400' (default) or 'bg-green-400'. */
  colorClass?: string
}

/** Pulsing "live" indicator dot with an optional label. */
export function LiveDot({ label, className, colorClass = 'bg-blue-400' }: LiveDotProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="relative flex h-2 w-2">
        <span className={cn('live-ping absolute inline-flex h-full w-full rounded-full', colorClass)} />
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', colorClass)} />
      </span>
      {label && <span className="text-xs font-semibold text-blue-300">{label}</span>}
    </span>
  )
}
