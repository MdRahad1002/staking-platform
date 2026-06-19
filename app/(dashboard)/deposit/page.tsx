'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatDateTime, formatCurrency } from '@/lib/utils'
import {
  Copy, ArrowDownToLine, CheckCircle2, Clock, XCircle, RefreshCw,
  AlertCircle, TrendingUp, Zap, ChevronRight, ShieldCheck, Lock,
  Wallet, BadgeCheck, ArrowRight, ReceiptText, Sparkles, ScanLine,
  CreditCard, ExternalLink, Landmark,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import QRCode from 'qrcode'

interface DepositCurrency {
  id: string; symbol: string; name: string; network: string
  minDeposit: number; iconUrl?: string | null
}
interface DepositHistory {
  id: string; amount: number; amountUsd?: number
  currency: { symbol: string }; payCurrency?: string; payAmount?: number
  address: string; txHash?: string | null; status: string
  createdAt: string; confirmations: number; requiredConfirmations: number
}
interface ActivePayment {
  depositId: string; paymentId: string; address: string
  payAmount: number; payCurrency: string; amountUsd: number
  expiresAt: string; status: string
}
interface StakingPlan {
  id: string; name: string; minAmount: number; maxAmount: number | null
  durationDays: number; dailyRoi: number; totalRoi: number
  isFeatured: boolean; sortOrder: number
}

const QUICK_PICKS = [200, 500, 1000, 5000, 10000, 25000]

/** Crypto coin icon with graceful fallback to a lettered chip. */
function CoinIcon({ symbol, iconUrl, className }: { symbol: string; iconUrl?: string | null; className?: string }) {
  const [errored, setErrored] = useState(false)
  const src = iconUrl || `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${symbol.toLowerCase()}.svg`
  if (errored) {
    return (
      <div className={cn('flex items-center justify-center rounded-full bg-blue-500/15 text-[10px] font-black text-blue-300', className)}>
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

const STATUS_LABEL: Record<string, string> = {
  waiting: 'Waiting for payment',
  confirming: 'Confirming on blockchain',
  confirmed: 'Payment confirmed!',
  sending: 'Sending to wallet',
  finished: 'Completed!',
  partially_paid: 'Partially paid - awaiting remainder',
  failed: 'Payment failed',
  expired: 'Payment expired',
  refunded: 'Refunded',
  PENDING: 'Waiting for payment',
  CONFIRMED: 'Payment confirmed!',
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
  const [method, setMethod] = useState<'crypto' | 'card'>('crypto')

  const selectedCurrency = currencies.find((c) => c.id === selected)
  const depositNum = parseFloat(amountUsd) || 0

  const matchedPlan = plans.length > 0 && depositNum > 0
    ? plans
        .filter((p) => p.minAmount <= depositNum && (p.maxAmount === null || p.maxAmount >= depositNum))
        .reduce((best: StakingPlan | null, p) => (!best || p.dailyRoi > best.dailyRoi ? p : best), null)
    : null

  const nextPlan = plans.length > 0 ? plans.find((p) => p.minAmount > depositNum) ?? null : null
  const missingForNext = nextPlan ? nextPlan.minAmount - depositNum : 0

  useEffect(() => {
    fetch('/api/deposit/currencies').then((r) => r.json()).then((d) => {
      const list = d.data || []
      setCurrencies(list)
      if (list.length > 0) setSelected(list[0].id)
    })
    fetch('/api/deposit/history').then((r) => r.json()).then((d) => setHistory(d.data || []))
    fetch('/api/staking/plans').then((r) => r.json()).then((d) => setPlans(d.data || []))
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
      toast.success('Payment address generated - send the exact amount shown')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setCreating(false)
    }
  }

  // Derive current step
  const currentStep = payment
    ? (['CONFIRMED', 'confirmed', 'finished', 'sending'].includes(pollStatus) ? 3 : 2)
    : 1

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ── Page Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/50 via-[#0a1020] to-background p-6 md:p-8 shadow-2xl shadow-blue-950/30">
        {/* Layered ambient glows */}
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl translate-y-1/2" />
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-700/20 border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <ArrowDownToLine className="h-6 w-6 text-blue-300" />
            <span className="absolute -inset-px rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 mb-2">
              <Sparkles className="h-3 w-3 text-blue-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Instant Crypto Funding</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Fund Your Account</h1>
            <p className="text-muted-foreground mt-1">
              Deposit cryptocurrency and receive USD credit instantly after network confirmation.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400">Secured & Encrypted</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="relative mt-6 flex items-center gap-0">
          {[
            { n: 1, label: 'Enter Amount' },
            { n: 2, label: 'Send Payment' },
            { n: 3, label: 'Credited' },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                  currentStep > step.n
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.n
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-secondary border-border text-muted-foreground'
                )}>
                  {currentStep > step.n ? <CheckCircle2 className="h-4 w-4" /> : step.n}
                </div>
                <span className={cn(
                  'text-[10px] font-semibold mt-1.5 text-center whitespace-nowrap',
                  currentStep === step.n ? 'text-blue-400' : currentStep > step.n ? 'text-green-400' : 'text-muted-foreground'
                )}>{step.label}</span>
              </div>
              {i < 2 && (
                <div className={cn('flex-1 h-0.5 mx-2 mb-5 rounded-full', currentStep > step.n ? 'bg-green-500/60' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT: Deposit Form / Active Payment ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Payment method toggle */}
          {!payment && (
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card p-1.5">
              {([
                { key: 'crypto', label: 'Pay with Crypto', icon: <Wallet className="h-4 w-4" /> },
                { key: 'card', label: 'Card / Bank', icon: <CreditCard className="h-4 w-4" /> },
              ] as const).map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMethod(m.key)}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all',
                    method === m.key
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/20'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  )}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          )}

          {!payment && method === 'card' ? (
            <CardPurchasePanel
              currencies={currencies}
              onConfirmed={() =>
                fetch('/api/deposit/history').then((r) => r.json()).then((d) => setHistory(d.data || []))
              }
            />
          ) : !payment ? (
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-blue-400" />
                  <h2 className="font-bold text-base">Deposit Details</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Select an amount and the crypto you want to pay with</p>
              </div>

              <div className="p-6 space-y-6">

                {/* Quick-pick amounts */}
                {plans.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Quick Select</Label>
                    <div className="grid grid-cols-3 gap-2">
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
                            className={cn(
                              'rounded-xl border px-3 py-3 text-center transition-all duration-150 hover:scale-[1.02]',
                              isActive
                                ? 'border-blue-500 bg-blue-500/15 ring-1 ring-blue-500/30'
                                : 'border-border bg-secondary/30 hover:border-blue-500/40 hover:bg-secondary/60'
                            )}
                          >
                            <p className={cn('font-black text-sm', isActive ? 'text-blue-400' : 'text-foreground')}>
                              ${amt >= 1000 ? `${amt / 1000}k` : amt}
                            </p>
                            {plan && (
                              <p className={cn('text-[9px] leading-tight mt-0.5 truncate', isActive ? 'text-blue-300/70' : 'text-muted-foreground')}>
                                {plan.name}
                              </p>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Amount input */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-bold">$</span>
                    <Input
                      type="number" min="0" step="0.01" placeholder="0.00"
                      className="pl-9 h-14 text-xl font-bold rounded-xl border-border/60 bg-secondary/30 focus:border-blue-500/60 focus:ring-blue-500/20"
                      value={amountUsd}
                      onChange={(e) => setAmountUsd(e.target.value)}
                    />
                  </div>
                  {selectedCurrency && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      Minimum deposit: <strong className="text-foreground">${selectedCurrency.minDeposit} USD</strong>
                    </p>
                  )}
                </div>

                {/* Earnings preview */}
                {depositNum >= 200 && matchedPlan && (
                  <div className="rounded-xl border border-green-500/25 bg-gradient-to-br from-green-950/30 to-emerald-950/20 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/20">
                          <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-green-400">Earnings Preview</span>
                      </div>
                      <Badge className="text-[10px] bg-green-500/20 text-green-400 border-green-500/30 border">{matchedPlan.name}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-black/20 border border-green-500/10 px-3 py-2.5 text-center">
                        <p className="text-[9px] text-muted-foreground mb-1">Daily Earnings</p>
                        <p className="font-black text-base text-green-400">+{formatCurrency((depositNum * matchedPlan.dailyRoi) / 100)}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{matchedPlan.dailyRoi}%/day</p>
                      </div>
                      <div className="rounded-xl bg-black/20 border border-green-500/10 px-3 py-2.5 text-center">
                        <p className="text-[9px] text-muted-foreground mb-1">Total Profit</p>
                        <p className="font-black text-base text-white">+{formatCurrency((depositNum * matchedPlan.totalRoi) / 100)}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{matchedPlan.totalRoi}%</p>
                      </div>
                      <div className="rounded-xl bg-black/20 border border-green-500/10 px-3 py-2.5 text-center">
                        <p className="text-[9px] text-muted-foreground mb-1">Total Payout</p>
                        <p className="font-black text-base text-blue-400">{formatCurrency(depositNum + (depositNum * matchedPlan.totalRoi) / 100)}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{matchedPlan.durationDays}d term</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upgrade nudge */}
                {nextPlan && missingForNext > 0 && missingForNext <= nextPlan.minAmount * 0.35 && (
                  <button
                    type="button"
                    onClick={() => setAmountUsd(String(nextPlan.minAmount))}
                    className="w-full rounded-xl border border-yellow-500/30 bg-yellow-500/8 px-4 py-3 flex items-center gap-3 hover:border-yellow-500/50 hover:bg-yellow-500/12 transition-all text-left"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/20 flex-shrink-0">
                      <Zap className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-yellow-400">
                        Add {formatCurrency(missingForNext)} more to unlock {nextPlan.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {nextPlan.dailyRoi}%/day · earn +{formatCurrency((nextPlan.minAmount * nextPlan.dailyRoi) / 100)}/day at minimum
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  </button>
                )}

                {/* Currency selector */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Pay With</Label>
                  <Select value={selected} onValueChange={setSelected}>
                    <SelectTrigger className="h-14 rounded-xl border-border/60 bg-secondary/30 focus:border-blue-500/60 [&>span]:flex [&>span]:items-center [&>span]:gap-3">
                      <SelectValue placeholder="Select cryptocurrency..." />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <span className="flex items-center gap-2.5">
                            <CoinIcon symbol={c.symbol} iconUrl={c.iconUrl} className="h-6 w-6 rounded-full" />
                            <span className="font-semibold">{c.symbol}</span>
                            <span className="text-muted-foreground">{c.name} · {c.network}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Selected currency at-a-glance */}
                  {selectedCurrency && (
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 p-1.5">
                        <CoinIcon symbol={selectedCurrency.symbol} iconUrl={selectedCurrency.iconUrl} className="h-full w-full rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-foreground leading-tight">
                          {selectedCurrency.name} <span className="text-muted-foreground font-normal">({selectedCurrency.symbol})</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Min ${selectedCurrency.minDeposit} USD
                        </p>
                      </div>
                      <Badge className="flex-shrink-0 text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        {selectedCurrency.network}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button
                  onClick={createPayment}
                  disabled={!selected || !amountUsd || creating}
                  className="w-full h-13 rounded-xl font-bold text-base gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white border-0 shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:scale-[1.01]"
                >
                  {creating
                    ? <><RefreshCw className="h-4 w-4 animate-spin" /> Generating address...</>
                    : <><ArrowDownToLine className="h-4 w-4" /> Generate Payment Address</>
                  }
                </Button>

              </div>
            </div>
          ) : (
            /* ── ACTIVE PAYMENT VIEW ── */
            <ActivePaymentCard
              payment={payment}
              pollStatus={pollStatus}
              onCopyAddress={() => { navigator.clipboard.writeText(payment.address); toast.success('Address copied!') }}
              onCopyAmount={() => { navigator.clipboard.writeText(String(payment.payAmount)); toast.success('Amount copied!') }}
              onCancel={() => { setPayment(null); stopPoll() }}
            />
          )}
        </div>

        {/* ── RIGHT: Trust + How It Works ── */}
        <div className="space-y-5">

          {/* Security badges */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform Security</p>
            <div className="space-y-3">
              {[
                { icon: <ShieldCheck className="h-4 w-4 text-green-400" />, label: 'SSL / TLS Encrypted', sub: 'All data in transit is encrypted' },
                { icon: <Lock className="h-4 w-4 text-blue-400" />, label: 'AES-256 at Rest', sub: 'Wallet data encrypted at rest' },
                { icon: <BadgeCheck className="h-4 w-4 text-yellow-400" />, label: 'FCA Authorised', sub: 'UK financial regulator oversight' },
                { icon: <Wallet className="h-4 w-4 text-purple-400" />, label: 'Cold Wallet Storage', sub: 'Majority of funds in cold storage' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/60 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">How It Works</p>
            <div className="space-y-4">
              {[
                { n: 1, color: 'bg-blue-500/20 text-blue-400', title: 'Enter USD amount', desc: 'Choose the amount you want to deposit and select your preferred cryptocurrency.' },
                { n: 2, color: 'bg-purple-500/20 text-purple-400', title: 'Send exact crypto', desc: 'A unique address is generated. Send the exact crypto amount shown — no more, no less.' },
                { n: 3, color: 'bg-green-500/20 text-green-400', title: 'Balance credited', desc: 'After network confirmation (15 min – 2 hrs), your USD balance is credited automatically.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-3">
                  <div className={cn('flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-black mt-0.5', step.color)}>
                    {step.n}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{step.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-orange-500/20 bg-orange-500/8 p-3 space-y-1">
              <p className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" /> Important
              </p>
              <ul className="text-[10px] text-muted-foreground space-y-1 pl-4 list-disc leading-relaxed">
                <li>Always send on the <strong className="text-foreground">correct network</strong></li>
                <li>Address valid for <strong className="text-foreground">~60 minutes</strong></li>
                <li>Wrong amount or network = <strong className="text-red-400">permanent loss</strong></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Deposit History ── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4 text-blue-400" />
            <h2 className="font-bold text-base">Deposit History</h2>
          </div>
          {history.length > 0 && (
            <span className="text-xs text-muted-foreground">{history.length} record{history.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/60">
              <ArrowDownToLine className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">No deposits yet</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your deposit history will appear here once you make your first deposit.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/20">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount USD</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Crypto Sent</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {history.map((dep) => {
                  const isConfirmed = dep.status === 'CONFIRMED' || dep.status === 'confirmed' || dep.status === 'finished'
                  const isFailed = dep.status === 'FAILED' || dep.status === 'failed' || dep.status === 'expired'
                  return (
                    <tr key={dep.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">{formatDateTime(dep.createdAt)}</td>
                      <td className="px-4 py-4 font-bold text-foreground whitespace-nowrap">
                        ${dep.amountUsd ?? dep.amount}
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          <CoinIcon symbol={dep.payCurrency ?? dep.currency.symbol} className="h-4 w-4 rounded-full" />
                          {dep.payAmount
                            ? <span className="font-mono">{dep.payAmount} {(dep.payCurrency ?? dep.currency.symbol).toUpperCase()}</span>
                            : <span>{dep.currency.symbol}</span>}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {isConfirmed
                            ? <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                            : isFailed
                              ? <XCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                              : <Clock className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />}
                          <Badge
                            variant={isConfirmed ? 'success' : isFailed ? 'destructive' : 'secondary'}
                            className="text-[10px] capitalize"
                          >
                            {dep.status.toLowerCase()}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Reputable consumer on-ramps that need NO operator account or KYB — we link to
 * the provider's OWN public buy page. The user completes their own KYC there,
 * selects the coin, and pastes the deposit address we display; our existing
 * NOWPayments webhook then credits the right user automatically.
 *
 * These providers don't publicly document deep-link params for prefilling the
 * coin/amount/address (that lives behind their partner API), so we link to the
 * verified public buy pages and rely on the on-page address + exact-amount
 * instructions, which is the robust part.
 */
function onrampLinks() {
  return [
    {
      name: 'Guardarian',
      desc: 'No account needed · Card, Apple/Google Pay, SEPA',
      url: 'https://guardarian.com/buy-crypto-with-card',
      recommended: true,
    },
    {
      name: 'MoonPay',
      desc: 'Card · Apple / Google Pay (quick sign-up)',
      url: 'https://www.moonpay.com/buy',
      recommended: false,
    },
    {
      name: 'Ramp',
      desc: 'Card & bank transfer',
      url: 'https://app.ramp.network',
      recommended: false,
    },
  ]
}

/**
 * Buy crypto with a card via a no-KYB consumer on-ramp. Generates a normal
 * NOWPayments deposit (unique address + exact amount), then points the user at
 * a third-party buy page to fund it by card. No partner account or business
 * verification required; crediting reuses the existing deposit webhook + poll.
 */
function CardPurchasePanel({ currencies, onConfirmed }: {
  currencies: DepositCurrency[]; onConfirmed: () => void
}) {
  const [amountUsd, setAmountUsd] = useState('')
  const [selected, setSelected] = useState('')
  const [creating, setCreating] = useState(false)
  const [deposit, setDeposit] = useState<ActivePayment | null>(null)
  const [pollStatus, setPollStatus] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectedCurrency = currencies.find((c) => c.id === selected)
  const num = parseFloat(amountUsd) || 0

  useEffect(() => {
    if (currencies.length > 0 && !selected) setSelected(currencies[0].id)
  }, [currencies, selected])

  const stopPoll = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])
  useEffect(() => () => stopPoll(), [stopPoll])

  const poll = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/deposit/status/${id}`)
      const data = await res.json()
      const s: string = data.data?.status ?? ''
      setPollStatus(s)
      if (['CONFIRMED', 'confirmed', 'finished', 'sending'].includes(s)) {
        stopPoll(); onConfirmed()
        toast.success('Purchase received! Your balance has been credited.')
      } else if (['FAILED', 'failed', 'expired'].includes(s)) {
        toast.error('Deposit failed or expired.'); stopPoll()
      }
    } catch { /* silent */ }
  }, [stopPoll, onConfirmed])

  useEffect(() => {
    if (!deposit?.address) return
    QRCode.toDataURL(deposit.address, { width: 180, margin: 2, color: { dark: '#0a0a0a', light: '#ffffff' } })
      .then(setQrDataUrl).catch(() => {})
  }, [deposit?.address])

  const start = async () => {
    if (!selected || num <= 0) { toast.error('Enter an amount and select a coin'); return }
    if (selectedCurrency && num < selectedCurrency.minDeposit) {
      toast.error(`Minimum is $${selectedCurrency.minDeposit}`); return
    }
    setCreating(true)
    try {
      const res = await fetch('/api/deposit/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId: selected, amountUsd: num }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Could not start purchase'); return }
      setDeposit(data.data)
      setPollStatus('waiting')
      stopPoll()
      poll(data.data.depositId)
      pollRef.current = setInterval(() => poll(data.data.depositId), 30_000)
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setCreating(false)
    }
  }

  const reset = () => { stopPoll(); setDeposit(null); setPollStatus(''); setQrDataUrl('') }
  const isDone = ['CONFIRMED', 'confirmed', 'finished', 'sending'].includes(pollStatus)

  // ── Success ──
  if (isDone) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/40 via-background to-background p-8 flex flex-col items-center text-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border-2 border-green-500/40">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Balance Credited!</h3>
          <p className="text-muted-foreground mt-1">
            <span className="text-green-400 font-bold">${deposit?.amountUsd} USD</span> has been added to your account.
          </p>
        </div>
        <Button onClick={reset} className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 rounded-xl">
          <ArrowRight className="h-4 w-4" /> Buy More
        </Button>
      </div>
    )
  }

  // ── Buy step: deposit created, show on-ramp links + address ──
  if (deposit) {
    const sym = (deposit.payCurrency || selectedCurrency?.symbol || '').toUpperCase()
    const links = onrampLinks()
    return (
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-amber-500/20 bg-amber-950/20">
          <RefreshCw className="h-5 w-5 text-amber-400 flex-shrink-0 animate-spin" />
          <div>
            <p className="font-bold text-sm text-amber-400">Waiting for your card purchase</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">We check every 30 seconds and credit you automatically once it arrives.</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* On-ramp choices */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">1. Buy with your card here</p>
            <div className="grid gap-2">
              {links.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-all hover:border-blue-500/50 hover:bg-secondary/60"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground flex items-center gap-2">
                      {p.name}
                      {p.recommended && (
                        <Badge className="text-[9px] bg-green-500/20 text-green-400 border border-green-500/30">Recommended</Badge>
                      )}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Exact amount + address to paste */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              2. Receive exactly this amount, to this address
            </p>

            <div className="rounded-xl border border-yellow-500/25 bg-yellow-950/20 px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Set &quot;You receive&quot; to</p>
                <p className="font-mono text-lg font-black text-yellow-400 break-all">{deposit.payAmount} {sym}</p>
              </div>
              <Button
                variant="outline" size="sm"
                className="gap-1.5 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 flex-shrink-0"
                onClick={() => { navigator.clipboard.writeText(String(deposit.payAmount)); toast.success('Amount copied!') }}
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </Button>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-950/15 p-3">
              {qrDataUrl && (
                <img src={qrDataUrl} alt="Deposit address QR" className="h-20 w-20 rounded-lg bg-white p-1 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-[10px] text-muted-foreground">Destination wallet address</p>
                <p className="font-mono text-xs break-all text-foreground/90 select-all">{deposit.address}</p>
                <Button
                  variant="outline" size="sm"
                  className="gap-1.5 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => { navigator.clipboard.writeText(deposit.address); toast.success('Address copied!') }}
                >
                  <Copy className="h-3.5 w-3.5" /> Copy Address
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/8 p-3 flex gap-3">
            <AlertCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              On the provider, choose <strong className="text-foreground">{sym}</strong> on the{' '}
              <strong className="text-foreground">{selectedCurrency?.network}</strong> network, set the amount you
              <em> receive</em> to the exact figure above, and paste this address as the destination. You pay the
              provider&apos;s fee on top in fiat.
            </p>
          </div>

          <Button variant="outline" className="w-full" onClick={reset}>Cancel</Button>
        </div>
      </div>
    )
  }

  // ── Form ──
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-blue-400" />
          <h2 className="font-bold text-base">Buy with Card or Bank</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Don&apos;t own crypto yet? Buy it by card through a trusted provider; it lands in your account automatically.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {[100, 250, 500].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmountUsd(String(amt))}
              className={cn(
                'rounded-xl border px-3 py-3 text-center font-black text-sm transition-all hover:scale-[1.02]',
                num === amt
                  ? 'border-blue-500 bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30'
                  : 'border-border bg-secondary/30 text-foreground hover:border-blue-500/40'
              )}
            >
              ${amt}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Amount (USD)</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-bold">$</span>
            <Input
              type="number" min="0" step="0.01" placeholder="0.00"
              className="pl-9 h-14 text-xl font-bold rounded-xl border-border/60 bg-secondary/30 focus:border-blue-500/60 focus:ring-blue-500/20"
              value={amountUsd}
              onChange={(e) => setAmountUsd(e.target.value)}
            />
          </div>
          {selectedCurrency && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-yellow-500" />
              Minimum: <strong className="text-foreground">${selectedCurrency.minDeposit} USD</strong>. Provider card fees apply on top.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Coin to Receive</Label>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="h-14 rounded-xl border-border/60 bg-secondary/30 focus:border-blue-500/60 [&>span]:flex [&>span]:items-center [&>span]:gap-3">
              <SelectValue placeholder="Select coin..." />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <span className="flex items-center gap-2.5">
                    <CoinIcon symbol={c.symbol} iconUrl={c.iconUrl} className="h-6 w-6 rounded-full" />
                    <span className="font-semibold">{c.symbol}</span>
                    <span className="text-muted-foreground">{c.name} · {c.network}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center gap-4 rounded-xl border border-border bg-secondary/20 px-4 py-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><CreditCard className="h-4 w-4 text-blue-400" /> Card</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Landmark className="h-4 w-4 text-blue-400" /> Bank</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Sparkles className="h-4 w-4 text-blue-400" /> Apple / Google Pay</span>
        </div>

        <Button
          onClick={start}
          disabled={!selected || !amountUsd || creating}
          className="w-full h-13 rounded-xl font-bold text-base gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white border-0 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
        >
          {creating
            ? <><RefreshCw className="h-4 w-4 animate-spin" /> Preparing...</>
            : <><CreditCard className="h-4 w-4" /> Continue to Card Providers</>}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          Identity verification is handled by the card provider. Your balance is credited automatically once the crypto arrives.
        </p>
      </div>
    </div>
  )
}

function ActivePaymentCard({ payment, pollStatus, onCopyAddress, onCopyAmount, onCancel }: {
  payment: ActivePayment; pollStatus: string
  onCopyAddress: () => void; onCopyAmount: () => void; onCancel: () => void
}) {
  const { display: countdown, expired } = useCountdown(payment.expiresAt)
  const isDone = ['CONFIRMED', 'confirmed', 'finished', 'sending'].includes(pollStatus)
  const isFailed = ['FAILED', 'failed', 'expired'].includes(pollStatus) || expired
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  useEffect(() => {
    if (!payment.address) return
    QRCode.toDataURL(payment.address, {
      width: 220,
      margin: 2,
      color: { dark: '#0a0a0a', light: '#ffffff' },
    }).then(setQrDataUrl).catch(() => {})
  }, [payment.address])

  if (isDone) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/40 via-background to-background p-8 flex flex-col items-center text-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border-2 border-green-500/40">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Balance Credited!</h3>
          <p className="text-muted-foreground mt-1">
            <span className="text-green-400 font-bold">${payment.amountUsd} USD</span> has been added to your account.
          </p>
        </div>
        <Button onClick={onCancel} className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 rounded-xl">
          <ArrowRight className="h-4 w-4" /> Make Another Deposit
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Status bar */}
      <div className={cn(
        'flex items-center gap-3 px-6 py-4 border-b',
        isFailed
          ? 'bg-red-950/20 border-red-500/20'
          : 'bg-amber-950/20 border-amber-500/20'
      )}>
        {isFailed
          ? <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          : <RefreshCw className="h-5 w-5 text-amber-400 flex-shrink-0 animate-spin" />}
        <div>
          <p className={cn('font-bold text-sm', isFailed ? 'text-red-400' : 'text-amber-400')}>
            {STATUS_LABEL[pollStatus] || 'Waiting for payment'}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            We check for confirmations every 30 seconds automatically
          </p>
        </div>
        {!isFailed && (
          <div className={cn(
            'ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-bold flex-shrink-0',
            expired ? 'bg-red-500/10 text-red-400' : 'bg-secondary text-foreground'
          )}>
            <Clock className="h-3.5 w-3.5" />
            {expired ? 'Expired' : countdown}
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">

        {!isFailed && (
          <>
            {/* Amount to send */}
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/25 bg-gradient-to-br from-yellow-950/30 to-background p-5">
              <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-yellow-500/10 blur-2xl translate-x-1/3 -translate-y-1/3" />
              <div className="relative flex items-center gap-2 mb-3">
                <CoinIcon symbol={payment.payCurrency} className="h-5 w-5 rounded-full" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Send Exactly</p>
              </div>
              <div className="relative flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-3xl font-black text-yellow-400 leading-none break-all">
                    {payment.payAmount}
                  </p>
                  <p className="text-lg font-bold text-yellow-300 mt-1">{payment.payCurrency.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground mt-2">≈ ${payment.amountUsd} USD</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 flex-shrink-0"
                  onClick={onCopyAmount}
                >
                  <Copy className="h-3.5 w-3.5" /> Copy Amount
                </Button>
              </div>
            </div>

            {/* Address + QR Code */}
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-background p-5 space-y-4">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <ScanLine className="h-3.5 w-3.5 text-blue-400" />
                Send to this {payment.payCurrency.toUpperCase()} Address
              </p>

              {/* QR Code */}
              {qrDataUrl && (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative rounded-2xl bg-white p-3 shadow-lg shadow-blue-950/40 ring-1 ring-white/10">
                    {/* Corner accents */}
                    <span className="absolute -top-1 -left-1 h-4 w-4 rounded-tl-lg border-t-2 border-l-2 border-blue-400" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-tr-lg border-t-2 border-r-2 border-blue-400" />
                    <span className="absolute -bottom-1 -left-1 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-blue-400" />
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-blue-400" />
                    <img
                      src={qrDataUrl}
                      alt={`QR code for ${payment.payCurrency.toUpperCase()} address`}
                      className="h-44 w-44 block"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">Scan with your wallet app</p>
                </div>
              )}

              <div className="rounded-xl bg-black/30 border border-white/5 px-4 py-3">
                <p className="font-mono text-sm break-all leading-relaxed text-foreground/90 select-all">
                  {payment.address}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full gap-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                onClick={onCopyAddress}
              >
                <Copy className="h-4 w-4" /> Copy Address
              </Button>
            </div>

            {/* Warning */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-red-400">Critical: Send exact amount only</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Sending a different amount or using the wrong network will result in permanent loss of funds.
                  Always double-check the address before sending.
                </p>
              </div>
            </div>
          </>
        )}

        {isFailed && (
          <div className="flex flex-col items-center text-center py-4 gap-3">
            <XCircle className="h-14 w-14 text-red-400" />
            <p className="font-bold text-foreground">Payment Failed or Expired</p>
            <p className="text-sm text-muted-foreground">The payment window has closed. Please create a new deposit.</p>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={onCancel}
        >
          {isFailed ? 'Create New Deposit' : 'Cancel Payment'}
        </Button>

      </div>
    </div>
  )
}
