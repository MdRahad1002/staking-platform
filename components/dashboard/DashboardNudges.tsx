'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine, Flame, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface IdleBurnCounterProps {
  idleBalance: number
  bestAvailableDailyRoi: number
  bestPlanId: string
  bestPlanName: string
}

/**
 * Shows how much money the user is "burning" per second by not staking their idle balance.
 * Highly visceral loss-aversion trigger.
 */
export function IdleBurnCounter({ idleBalance, bestAvailableDailyRoi, bestPlanId, bestPlanName }: IdleBurnCounterProps) {
  const dailyEarning = (idleBalance * bestAvailableDailyRoi) / 100
  const perSecond = dailyEarning / 86400
  const [burned, setBurned] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setBurned((Date.now() - startRef.current) / 1000 * perSecond)
    }, 100)
    return () => clearInterval(id)
  }, [perSecond])

  if (idleBalance < 200 || bestAvailableDailyRoi === 0) return null

  return (
    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 via-card to-card px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/20">
        <Flame className="h-5 w-5 text-red-400" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">
          Your <span className="text-red-400">{formatCurrency(idleBalance)}</span> balance is earning{' '}
          <span className="text-red-400">$0.00/day</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Since you opened this page, you&apos;ve missed{' '}
          <strong className="text-red-400">+{formatCurrency(burned)}</strong> in potential earnings.
          Stake with <strong className="text-white">{bestPlanName}</strong> and earn{' '}
          <strong className="text-primary">+{formatCurrency(dailyEarning)}/day</strong>.
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Link href={`/plan/stake?planId=${bestPlanId}`}>
          <Button variant="gradient" size="sm" className="gap-1.5 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" /> Stake Now
          </Button>
        </Link>
        <Link href="/deposit">
          <Button variant="outline" size="sm" className="gap-1.5 font-semibold border-red-500/30 text-red-400 hover:bg-red-500/10">
            <ArrowDownToLine className="h-3.5 w-3.5" /> Add More
          </Button>
        </Link>
      </div>
    </div>
  )
}

interface CompoundProjectionProps {
  dailyEarning: number
  principalStaked: number
  planDailyRoi: number
}

/**
 * Shows a 3-month compounding projection anchors on the large future number
 * to make the decision feel like a no-brainer.
 */
export function CompoundProjection({ dailyEarning, principalStaked, planDailyRoi }: CompoundProjectionProps) {
  if (dailyEarning <= 0 || principalStaked <= 0) return null

  // Simple compound: reinvest daily earnings, 90-day horizon
  const compounded90 = principalStaked * Math.pow(1 + planDailyRoi / 100, 90)
  const compoundedProfit = compounded90 - principalStaked

  // Simple (no reinvestment) comparison
  const simpleProfit = (principalStaked * planDailyRoi * 90) / 100

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/8 via-card to-card px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        <p className="text-sm font-bold text-primary">90-Day Growth Projection</p>
        <span className="text-[10px] text-muted-foreground ml-auto">based on your active stakes</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-secondary/40 border border-border p-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Daily Earnings</p>
          <p className="font-bold text-base text-green-400">+{formatCurrency(dailyEarning)}</p>
          <p className="text-[9px] text-muted-foreground">per day, now</p>
        </div>
        <div className="rounded-xl bg-secondary/40 border border-border p-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Without Reinvest</p>
          <p className="font-bold text-base text-white">+{formatCurrency(simpleProfit)}</p>
          <p className="text-[9px] text-muted-foreground">over 90 days</p>
        </div>
        <div className="rounded-xl bg-primary/10 border border-primary/30 p-3 text-center">
          <p className="text-[9px] uppercase tracking-widest text-primary/70 mb-1">With Reinvesting</p>
          <p className="font-bold text-base gradient-text">+{formatCurrency(compoundedProfit)}</p>
          <p className="text-[9px] text-muted-foreground">90-day compound</p>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-center">
        Reinvesting daily earnings compounds your returns. Go to{' '}
        <Link href="/plans" className="text-primary underline-offset-2 hover:underline">Stake more</Link>{' '}
        to add a second position and accelerate growth.
      </p>
    </div>
  )
}
