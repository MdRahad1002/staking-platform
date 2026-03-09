'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface EarningsCalculatorProps {
  commissionRate: number | null
}

const PRESETS = [
  { friends: 3, stakeAmount: 100 },
  { friends: 5, stakeAmount: 300 },
  { friends: 10, stakeAmount: 500 },
]

export default function EarningsCalculator({ commissionRate }: EarningsCalculatorProps) {
  const [friends, setFriends] = useState(5)
  const [stakeAmount, setStakeAmount] = useState(300)

  const rate = commissionRate ?? 5
  const perFriend = (stakeAmount * rate) / 100
  const total = perFriend * friends
  const monthly = total // commission fires per stake created, this is on activation

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Friends invited
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={50}
              value={friends}
              onChange={(e) => setFriends(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="text-2xl font-bold text-primary w-10 text-right">{friends}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Avg. stake size (USD)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={20}
              max={5000}
              step={20}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="text-2xl font-bold text-primary w-20 text-right">${stakeAmount}</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You would earn</p>
          <p className="text-3xl font-black text-primary">${total.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {friends} friends x ${stakeAmount} x {rate}% commission
          </p>
        </div>
        <TrendingUp className="h-12 w-12 text-primary/20" />
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={`${p.friends}-${p.stakeAmount}`}
            onClick={() => { setFriends(p.friends); setStakeAmount(p.stakeAmount) }}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              friends === p.friends && stakeAmount === p.stakeAmount
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          >
            {p.friends} friends @ ${p.stakeAmount}
          </button>
        ))}
      </div>
    </div>
  )
}
