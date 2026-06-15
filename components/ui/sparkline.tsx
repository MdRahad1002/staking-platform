'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

interface SparklineProps {
  data: number[]
  up?: boolean
  className?: string
  width?: number
  height?: number
  strokeWidth?: number
}

/** Lightweight dependency-free SVG sparkline built from a numeric series. */
export function Sparkline({
  data,
  up,
  className,
  width = 80,
  height = 24,
  strokeWidth = 1.5,
}: SparklineProps) {
  const gradientId = useId()

  if (!data || data.length < 2) {
    return <div className={cn('inline-block', className)} style={{ width, height }} aria-hidden />
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const coords = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - strokeWidth * 2) - strokeWidth
    return [x, y] as const
  })

  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  const isUp = up ?? data[data.length - 1] >= data[0]
  const color = isUp ? '#22c55e' : '#ef4444'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('overflow-visible', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
