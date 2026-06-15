'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

/** Crypto coin icon with graceful fallback to a lettered chip. */
export function CoinIcon({
  symbol,
  iconUrl,
  className,
}: {
  symbol: string
  iconUrl?: string | null
  className?: string
}) {
  const [errored, setErrored] = useState(false)
  const src = iconUrl || `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${symbol.toLowerCase()}.svg`

  if (errored) {
    return (
      <div className={cn('flex items-center justify-center rounded-full bg-secondary text-[10px] font-black text-muted-foreground', className)}>
        {symbol.slice(0, 3).toUpperCase()}
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={symbol}
      onError={() => setErrored(true)}
      className={cn('object-contain', className)}
    />
  )
}
