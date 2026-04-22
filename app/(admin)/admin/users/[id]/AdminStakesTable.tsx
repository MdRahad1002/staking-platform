'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Stake {
  id: string
  amount: number
  totalEarned: number
  expectedReturn: number
  dailyRoi: number
  status: string
  currency: string
  createdAt: string
  plan: { name: string }
}

interface AdjustState {
  stake: Stake
  adjustment: string
  note: string
}

export default function AdminStakesTable({ stakes }: { stakes: Stake[] }) {
  const router = useRouter()
  const [adjust, setAdjust] = useState<AdjustState | null>(null)
  const [saving, setSaving] = useState(false)

  const handleAdjust = async () => {
    if (!adjust) return
    const adjustment = parseFloat(adjust.adjustment)
    if (isNaN(adjustment) || adjustment === 0) {
      toast.error('Enter a non-zero adjustment amount.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/staking/${adjust.stake.id}/adjust`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adjustment, note: adjust.note }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Earnings adjusted successfully.')
        setAdjust(null)
        router.refresh()
      } else {
        toast.error(data.error || 'Failed.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSaving(false)
  }

  if (stakes.length === 0) {
    return <p className="text-sm text-muted-foreground py-4 text-center">No stakes found.</p>
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left pb-2 font-medium">Plan</th>
              <th className="text-left pb-2 font-medium">Amount</th>
              <th className="text-left pb-2 font-medium">Earned</th>
              <th className="text-left pb-2 font-medium">Expected Return</th>
              <th className="text-left pb-2 font-medium">Status</th>
              <th className="text-left pb-2 font-medium">Date</th>
              <th className="text-left pb-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {stakes.map((s) => (
              <tr key={s.id}>
                <td className="py-2">{s.plan.name}</td>
                <td className="py-2">{formatCurrency(s.amount)}</td>
                <td className="py-2 text-emerald-500 font-medium">{formatCurrency(s.totalEarned)}</td>
                <td className="py-2 text-primary">{formatCurrency(s.expectedReturn)}</td>
                <td className="py-2">
                  <Badge variant={s.status === 'ACTIVE' ? 'success' : 'info'} className="text-xs">{s.status}</Badge>
                </td>
                <td className="py-2 text-muted-foreground text-xs">{formatDateTime(s.createdAt)}</td>
                <td className="py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 h-7 text-xs"
                    onClick={() => setAdjust({ stake: s, adjustment: '', note: '' })}
                  >
                    <Pencil className="h-3 w-3" /> Adjust
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjust Earnings Dialog */}
      <Dialog open={!!adjust} onOpenChange={(open) => { if (!open) setAdjust(null) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Stake Earnings</DialogTitle>
          </DialogHeader>

          {adjust && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-secondary/40 p-3 text-sm space-y-1">
                <p><span className="text-muted-foreground">Plan:</span> {adjust.stake.plan.name}</p>
                <p><span className="text-muted-foreground">Staked:</span> {formatCurrency(adjust.stake.amount)}</p>
                <p>
                  <span className="text-muted-foreground">Current earned:</span>{' '}
                  <span className="text-emerald-500 font-semibold">{formatCurrency(adjust.stake.totalEarned)}</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="adj-amount">Adjustment amount (USD)</Label>
                <Input
                  id="adj-amount"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 25.00 or -10.00"
                  value={adjust.adjustment}
                  onChange={(e) => setAdjust({ ...adjust, adjustment: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Positive to add earnings, negative to deduct.
                  {adjust.adjustment && !isNaN(parseFloat(adjust.adjustment)) && (
                    <span className="ml-1 font-medium text-foreground">
                      New total: {formatCurrency(adjust.stake.totalEarned + parseFloat(adjust.adjustment))}
                    </span>
                  )}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="adj-note">Reason / note (optional)</Label>
                <Input
                  id="adj-note"
                  placeholder="e.g. Cron missed payment on 2026-04-22"
                  value={adjust.note}
                  onChange={(e) => setAdjust({ ...adjust, note: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjust(null)} disabled={saving}>Cancel</Button>
            <Button onClick={handleAdjust} disabled={saving}>
              {saving ? 'Saving...' : 'Apply Adjustment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
