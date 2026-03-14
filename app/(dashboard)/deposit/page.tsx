'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatDateTime } from '@/lib/utils'
import { Copy, ArrowDownToLine, CheckCircle2, Clock, XCircle, RefreshCw, AlertCircle, TrendingUp, Zap, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'

interface DepositCurrency {
  id: string
  symbol: string
  name: string
  network: string
  minDeposit: number
  iconUrl?: string | null
}

interface DepositHistory {
  id: string
  amount: number
  amountUsd?: number
  currency: { symbol: string }
  payCurrency?: string
  payAmount?: number
  address: string
  txHash?: string | null
  status: string
  createdAt: string
  confirmations: number
  requiredConfirmations: number
}

interface ActivePayment {
  depositId: string
  paymentId: string
  address: string
  payAmount: number
  payCurrency: string
  amountUsd: number
  expiresAt: string
  status: string
}

interface StakingPlan {
  id: string
  name: string
  minAmount: number
  maxAmount: number | null
  durationDays: number
  dailyRoi: number
  totalRoi: number
  isFeatured: boolean
  sortOrder: number
}

const QUICK_PICKS = [200, 500, 1000, 5000, 10000, 25000]

const STATUS_LABEL: Record<string, string> = {
  waiting: 'Waiting for payment…',
  confirming: 'Confirming transaction…',
  confirmed: 'Confirmed!',
  sending: 'Sending to wallet…',
  finished: 'Completed!',
  partially_paid: 'Partially paid - waiting for more',
  failed: 'Payment failed',
  expired: 'Payment expired',
  refunded: 'Refunded',
  PENDING: 'Waiting for payment…',
  CONFIRMED: 'Confirmed!',
  FAILED: 'Failed',
  PARTIALLY_PAID: 'Partially paid',
}

function useCountdown(expiresAt: string | null) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!expiresAt) return
    const update = () => {
      const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
      setSeconds(diff)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [expiresAt])
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return { display: `${m}:${s}`, expired: seconds === 0 }
}

export default function DepositPage() {
  const [currencies, setCurrencies] = useState<DepositCurrency[]>([])
  const [selected, setSelected] = useState('')
  const [amountUsd, setAmountUsd] = useState('')
  const [history, setHistory] = useState<DepositHistory[]>([])
  const [creating, setCreating] = useState(false)
  const [payment, setPayment] = useState<ActivePayment | null>(null)
  const [pollStatus, setPollStatus] = useState<string>('')
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [plans, setPlans] = useState<StakingPlan[]>([])

  const selectedCurrency = currencies.find((c) => c.id === selected)

  const depositNum = parseFloat(amountUsd) || 0

  const matchedPlan = plans.length > 0 && depositNum > 0
    ? plans
        .filter((p) => p.minAmount <= depositNum && (p.maxAmount === null || p.maxAmount >= depositNum))
        .reduce((best: StakingPlan | null, p) => (!best || p.dailyRoi > best.dailyRoi ? p : best), null)
    : null

  const nextPlan = plans.length > 0
    ? plans.find((p) => p.minAmount > depositNum) ?? null
    : null

  const missingForNext = nextPlan ? nextPlan.minAmount - depositNum : 0

  useEffect(() => {
    fetch('/api/deposit/currencies')
      .then((r) => r.json())
      .then((d) => {
        const list = d.data || []
        setCurrencies(list)
        if (list.length > 0) setSelected(list[0].id)
      })
    fetch('/api/deposit/history')
      .then((r) => r.json())
      .then((d) => setHistory(d.data || []))
    fetch('/api/staking/plans')
      .then((r) => r.json())
      .then((d) => setPlans(d.data || []))
  }, [])

  const stopPoll = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])

  const pollOnce = useCallback(async (depositId: string) => {
    try {
      const res = await fetch(`/api/deposit/status/${depositId}`)
      const data = await res.json()
      const s: string = data.data?.status ?? ''
      setPollStatus(s)
      if (['CONFIRMED', 'confirmed', 'finished', 'sending'].includes(s)) {
        toast.success('Deposit confirmed! Your balance has been credited.')
        setPayment(null)
        stopPoll()
        fetch('/api/deposit/history').then(r => r.json()).then(d => setHistory(d.data || []))
      } else if (['FAILED', 'failed', 'expired'].includes(s)) {
        toast.error('Payment failed or expired.')
        setPayment(null)
        stopPoll()
      }
    } catch { /* silent */ }
  }, [stopPoll])

  const startPoll = useCallback((depositId: string) => {
    stopPoll()
    pollOnce(depositId)
    pollRef.current = setInterval(() => pollOnce(depositId), 30_000)
  }, [pollOnce, stopPoll])

  useEffect(() => () => stopPoll(), [stopPoll])

  const createPayment = async () => {
    if (!selected || !amountUsd) return
    const num = parseFloat(amountUsd)
    if (isNaN(num) || num <= 0) { toast.error('Enter a valid amount'); return }
    if (selectedCurrency && num < selectedCurrency.minDeposit) {
      toast.error(`Minimum deposit is $${selectedCurrency.minDeposit}`); return
    }
    setCreating(true)
    try {
      const res = await fetch('/api/deposit/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId: selected, amountUsd: num }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to create payment'); return }
      setPayment(data.data)
      setPollStatus('waiting')
      startPoll(data.data.depositId)
      toast.success('Payment created - send the exact amount to the address below')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Deposit</h1>
        <p className="text-muted-foreground text-sm mt-1">Add funds to your account using cryptocurrency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{payment ? 'Send Payment' : 'Create Deposit'}</CardTitle>
            <CardDescription>{payment ? 'Send the exact amount to the address below.' : 'Enter amount and select cryptocurrency.'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!payment ? (
              <>
                {/* Quick-pick amounts */}
                {plans.length > 0 && (
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Quick Select</Label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {QUICK_PICKS.map((amt) => {
                        const plan = plans.find(
                          (p) => p.minAmount <= amt && (p.maxAmount === null || p.maxAmount >= amt)
                        )
                        const isActive = depositNum === amt
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setAmountUsd(String(amt))}
                            className={`rounded-xl border px-2 py-2.5 text-center transition-all ${
                              isActive
                                ? 'border-primary bg-primary/15 text-primary'
                                : 'border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                            }`}
                          >
                            <p className="font-bold text-sm">${amt >= 1000 ? `${amt / 1000}k` : amt}</p>
                            {plan && (
                              <p className="text-[9px] leading-tight mt-0.5 truncate opacity-70">{plan.name}</p>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input type="number" min="0" step="0.01" placeholder="200.00" className="pl-7" value={amountUsd} onChange={(e) => setAmountUsd(e.target.value)} />
                  </div>
                  {selectedCurrency && <p className="text-xs text-muted-foreground">Minimum: ${selectedCurrency.minDeposit} USD</p>}
                </div>

                {/* Live earnings preview */}
                {depositNum >= 200 && matchedPlan && (
                  <div className="rounded-xl border border-green-500/25 bg-green-500/8 p-3 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                      <p className="text-[11px] font-bold uppercase tracking-widest text-green-400">
                        Your Earnings Preview
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Matched Plan</p>
                        <p className="font-bold text-sm text-white">{matchedPlan.name}</p>
                        <p className="text-[10px] text-muted-foreground">{matchedPlan.durationDays}d · {matchedPlan.dailyRoi}%/day</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-muted-foreground">Daily Earnings</p>
                        <p className="font-bold text-lg text-green-400">+{formatCurrency((depositNum * matchedPlan.dailyRoi) / 100)}</p>
                        <p className="text-[10px] text-muted-foreground">per day</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-t border-green-500/15 pt-2">
                      <div className="rounded-lg bg-black/20 px-2.5 py-1.5 text-center">
                        <p className="text-[9px] text-muted-foreground">Total Profit</p>
                        <p className="font-bold text-sm gradient-text">+{formatCurrency((depositNum * matchedPlan.totalRoi) / 100)}</p>
                      </div>
                      <div className="rounded-lg bg-black/20 px-2.5 py-1.5 text-center">
                        <p className="text-[9px] text-muted-foreground">Total Payout</p>
                        <p className="font-bold text-sm text-white">{formatCurrency(depositNum + (depositNum * matchedPlan.totalRoi) / 100)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* "Just $X more" unlock nudge */}
                {nextPlan && missingForNext > 0 && missingForNext <= nextPlan.minAmount * 0.35 && (
                  <div
                    className="rounded-xl border border-yellow-500/30 bg-yellow-500/8 px-3 py-2 flex items-center gap-2 cursor-pointer hover:border-yellow-500/50 transition-colors"
                    onClick={() => setAmountUsd(String(nextPlan.minAmount))}
                  >
                    <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-yellow-400">
                        Just {formatCurrency(missingForNext)} more to unlock <strong>{nextPlan.name}</strong>
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {nextPlan.dailyRoi}%/day · earn{' '}
                        +{formatCurrency((nextPlan.minAmount * nextPlan.dailyRoi) / 100)}/day at minimum
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Pay with</Label>
                  <Select value={selected} onValueChange={setSelected}>
                    <SelectTrigger><SelectValue placeholder="Select currency..." /></SelectTrigger>
                    <SelectContent>
                      {currencies.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.symbol} - {c.name} ({c.network})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createPayment} variant="gradient" className="w-full gap-2" disabled={!selected || !amountUsd || creating}>
                  {creating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowDownToLine className="h-4 w-4" />}
                  {creating ? 'Creating…' : 'Create Payment'}
                </Button>
              </>
            ) : (
              <ActivePaymentCard
                payment={payment}
                pollStatus={pollStatus}
                onCopyAddress={() => { navigator.clipboard.writeText(payment.address); toast.success('Address copied!') }}
                onCopyAmount={() => { navigator.clipboard.writeText(String(payment.payAmount)); toast.success('Amount copied!') }}
                onCancel={() => { setPayment(null); stopPoll() }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">How It Works</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {['Enter the USD amount you want to deposit and choose a cryptocurrency.','A unique payment address is generated. Send the exact crypto amount shown.','After network confirmation, your USD balance is credited automatically.'].map((text, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">{i+1}</span>
                <p>{text}</p>
              </div>
            ))}
            <div className="mt-4 rounded-lg bg-secondary/30 p-3 space-y-1.5">
              <p className="font-medium text-foreground text-xs">Important</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Send the <strong>exact</strong> amount shown</li>
                <li>Each payment address is valid for ~60 minutes</li>
                <li>Always send on the correct network</li>
                <li>Processing time: 15 min – 2 hours</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Deposit History</CardTitle></CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No deposits yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left pb-3 font-medium">Date</th>
                    <th className="text-left pb-3 font-medium">Amount (USD)</th>
                    <th className="text-left pb-3 font-medium">Crypto</th>
                    <th className="text-left pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {history.map((dep) => (
                    <tr key={dep.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-3 text-xs">{formatDateTime(dep.createdAt)}</td>
                      <td className="py-3 font-medium">${dep.amountUsd ?? dep.amount}</td>
                      <td className="py-3 text-xs text-muted-foreground">
                        {dep.payAmount ? `${dep.payAmount} ${(dep.payCurrency ?? dep.currency.symbol).toUpperCase()}` : dep.currency.symbol}
                      </td>
                      <td className="py-3">
                        <Badge variant={dep.status === 'CONFIRMED' ? 'success' : dep.status === 'FAILED' ? 'destructive' : 'secondary'} className="text-xs">
                          {dep.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ActivePaymentCard({ payment, pollStatus, onCopyAddress, onCopyAmount, onCancel }: {
  payment: ActivePayment; pollStatus: string
  onCopyAddress: () => void; onCopyAmount: () => void; onCancel: () => void
}) {
  const { display: countdown, expired } = useCountdown(payment.expiresAt)
  const isDone = ['CONFIRMED','confirmed','finished','sending'].includes(pollStatus)
  const isFailed = ['FAILED','failed','expired'].includes(pollStatus) || expired

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-2 rounded-lg p-3 text-sm font-medium ${
        isDone ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
        isFailed ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
      }`}>
        {isDone ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> :
         isFailed ? <XCircle className="h-4 w-4 flex-shrink-0" /> :
         <RefreshCw className="h-4 w-4 flex-shrink-0 animate-spin" />}
        {STATUS_LABEL[pollStatus] || 'Waiting for payment…'}
      </div>

      {!isDone && !isFailed && (
        <>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Send exactly</p>
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg font-bold text-yellow-400">{payment.payAmount} <span className="text-sm">{payment.payCurrency.toUpperCase()}</span></p>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={onCopyAmount}><Copy className="h-3.5 w-3.5" /> Copy</Button>
            </div>
            <p className="text-xs text-muted-foreground">≈ ${payment.amountUsd} USD</p>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-1">
            <p className="text-xs text-muted-foreground">To this {payment.payCurrency.toUpperCase()} address</p>
            <p className="font-mono text-xs break-all leading-relaxed">{payment.address}</p>
            <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs gap-1" onClick={onCopyAddress}><Copy className="h-3.5 w-3.5" /> Copy Address</Button>
          </div>

          <div className={`flex items-center gap-2 text-sm rounded-lg p-2.5 ${
            expired ? 'bg-red-500/10 text-red-400' : 'bg-secondary/40 text-muted-foreground'
          }`}>
            <Clock className="h-4 w-4 flex-shrink-0" />
            {expired ? 'Payment expired' : `Expires in ${countdown}`}
          </div>

          <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 p-3 text-xs text-orange-400 flex gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>Send the <strong>exact</strong> amount shown. Wrong amount or wrong network = permanent loss.</p>
          </div>
        </>
      )}

      {isDone && (
        <div className="text-center py-4 space-y-2">
          <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto" />
          <p className="font-semibold">Balance credited!</p>
          <p className="text-sm text-muted-foreground">${payment.amountUsd} USD added to your account.</p>
        </div>
      )}

      <Button variant="outline" size="sm" className="w-full" onClick={onCancel}>
        {isDone || isFailed ? 'Make another deposit' : 'Cancel'}
      </Button>
    </div>
  )
}
