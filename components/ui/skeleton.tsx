import { cn } from '@/lib/utils'

/** Shimmering placeholder block used while live data loads. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-md bg-white/[0.06]', className)} aria-hidden />
}
