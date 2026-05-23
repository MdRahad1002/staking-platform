import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  valueClassName?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  valueClassName,
}: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1 truncate">{title}</p>
          <p className={cn('text-lg sm:text-2xl font-bold tracking-tight truncate', valueClassName)}>{value}</p>

          {change !== undefined && (
            <div className="flex items-center gap-1 mt-1.5">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 flex-shrink-0" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {isPositive ? '+' : ''}
                {change.toFixed(1)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground hidden sm:inline">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div className="flex h-9 w-9 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
