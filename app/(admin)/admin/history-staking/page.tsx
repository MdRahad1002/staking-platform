'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Stake {
  id: string
  amount: number
  totalEarned: number
  expectedReturn: number
  dailyRoi: number
  status: string
  startDate: string
  endDate: string
  createdAt: string
  user: { id: string; email: string; username: string | null }
  plan: { name: string }
}

interface AdjustState {
  stake: Stake
  adjustment: string
  note: string
}

export default function AdminHistoryStakingPage() {
  const [stakes, setStakes] = useState<Stake[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [adjust, setAdjust] = useState<AdjustState | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch('/api/admin/staking/history')
      .then((r) => r.json())
      .then((d) => setStakes(d.data || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const filtered = stakes.filter((s) => {
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    const q = search.toLowerCase()
    const matchesSearch = !q || s.user.email.toLowerCase().includes(q) || (s.user.username || '').toLowerCase().includes(q) || s.plan.name.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  })

  const openAdjust = (s: Stake) => setAdjust({ stake: s, adjustment: '', note: '' })

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
        load()
      } else {
        toast.error(data.error || 'Failed.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Staking History ({filtered.length})</h1>
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search user or plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-52"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left px-4 py-3 font-medium">User</th>
                    <th className="text-left px-4 py-3 font-medium">Plan</th>
                    <th className="text-left px-4 py-3 font-medium">Amount</th>
                    <th className="text-left px-4 py-3 font-medium">Earned</th>
                    <th className="text-left px-4 py-3 font-medium">Expected</th>
                    <th className="text-left px-4 py-3 font-medium">Daily ROI</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Start</th>
                    <th className="text-left px-4 py-3 font-medium">End</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground text-sm">No stakes found.</td>
                    </tr>
                  ) : filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/admin/users/${s.user.id}`} className="text-primary text-xs hover:underline">
                          {s.user.username || s.user.email}
                        </Link>
                        <p className="text-xs text-muted-foreground">{s.user.email}</p>
                      </td>
                      <td className="px-4 py-3 font-medium">{s.plan.name}</td>
                      <td className="px-4 py-3">{formatCurrency(s.amount)}</td>
                      <td className="px-4 py-3 text-emerald-500">{formatCurrency(s.totalEarned)}</td>
                      <td className="px-4 py-3">{formatCurrency(s.expectedReturn)}</td>
                      <td className="px-4 py-3">{s.dailyRoi}%</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.status === 'ACTIVE' ? 'success' : 'info'} className="text-xs">{s.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{formatDateTime(s.startDate)}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{formatDateTime(s.endDate)}</td>
                      <td className="px-4 py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 h-7 text-xs"
                          onClick={() => openAdjust(s)}
                        >
                          <Pencil className="h-3 w-3" /> Adjust
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adjust Earnings Dialog */}
      <Dialog open={!!adjust} onOpenChange={(open) => { if (!open) setAdjust(null) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Stake Earnings</DialogTitle>
          </DialogHeader>

          {adjust && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-secondary/40 p-3 text-sm space-y-1">
                <p><span className="text-muted-foreground">User:</span> {adjust.stake.user.email}</p>
                <p><span className="text-muted-foreground">Plan:</span> {adjust.stake.plan.name}</p>
                <p><span className="text-muted-foreground">Current earned:</span> <span className="text-emerald-500 font-semibold">{formatCurrency(adjust.stake.totalEarned)}</span></p>
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
                  Use a positive number to add earnings, negative to deduct.
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
                  placeholder="e.g. Cron missed payment on 2026-04-18"
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
    </div>
  )
}
