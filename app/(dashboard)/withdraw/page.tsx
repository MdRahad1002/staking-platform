'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatCurrency, formatDateTime, truncateAddress } from '@/lib/utils'
import {
  ArrowUpFromLine, AlertTriangle, ShieldAlert, ShieldCheck, Lock,
  BadgeCheck, Wallet, KeyRound, CheckCircle2, Clock, XCircle,
  ChevronRight, ReceiptText, AlertCircle, RefreshCw, Info, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CoinIcon } from '@/components/shared/CoinIcon'

interface WithdrawalCurrency {
  id: string
  symbol: string
  name: string
  network: string
  minWithdrawal: number
  fee: number
}

interface WithdrawalHistory {
  id: string
  amount: number
  fee: number
  netAmount: number
  currency: { symbol: string }
  walletAddress: string
  status: string
  txHash?: string | null
  createdAt: string
}

interface SavedWallet {
  id: string
  label: string | null
  address: string
  network: string
  currency: string | null
}

const PCT_PICKS = [25, 50, 75, 100]

export default function WithdrawPage() {
  const router = useRouter()
  const [currencies, setCurrencies] = useState<WithdrawalCurrency[]>([])
  const [selected, setSelected] = useState('')
  const [amount, setAmount] = useState('')
  const [wallet, setWallet] = useState('')
  const [pin, setPin] = useState('')
  const [balance, setBalance] = useState<number>(0)
  const [history, setHistory] = useState<WithdrawalHistory[]>([])
  const [savedWallets, setSavedWallets] = useState<SavedWallet[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [kycRequired, setKycRequired] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/withdraw/currencies')
      .then((r) => r.json())
      .then((d) => {
        setCurrencies(d.data || [])
        if ((d.data || []).length > 0) setSelected(d.data[0].id)
      })

    fetch('/api/withdraw/balance')
      .then((r) => r.json())
      .then((d) => setBalance(d.data?.balance || 0))

    fetch('/api/withdraw/history')
      .then((r) => r.json())
      .then((d) => setHistory(d.data || []))

    fetch('/api/profile/wallets')
      .then((r) => r.json())
      .then((d) => setSavedWallets(d.data || []))
  }, [])

  const selectedCurrency = currencies.find((c) => c.id === selected)
  const numAmount = parseFloat(amount) || 0
  const estimatedFee = selectedCurrency ? selectedCurrency.fee : 0
  const youReceive = Math.max(0, numAmount - estimatedFee)

  const handleWithdraw = async () => {
    if (!selected || !amount || !wallet || !pin) {
      toast.error('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/withdraw/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId: selected, amount: numAmount, walletAddress: wallet, pin }),
      })
      const data = await res.json()
      if (res.ok) {
        setKycRequired(false)
        setSuccess(true)
        toast.success('Withdrawal request submitted!')
        setAmount('')
        setWallet('')
        setPin('')
        fetch('/api/withdraw/history').then(r => r.json()).then(d => setHistory(d.data || []))
        fetch('/api/withdraw/balance').then(r => r.json()).then(d => setBalance(d.data?.balance || 0))
        router.refresh()
      } else {
        if (data.kycRequired) setKycRequired(true)
        toast.error(data.error || 'Failed to submit withdrawal.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSubmitting(false)
  }

  // Derive step
  const currentStep = success ? 3 : (numAmount > 0 && wallet ? 2 : 1)

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ── Page Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-950/50 via-[#170f0a] to-background p-6 md:p-8 shadow-2xl shadow-orange-950/30">
        {/* Layered ambient glows */}
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl translate-y-1/2" />
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-700/20 border border-orange-400/30 shadow-lg shadow-orange-500/20">
            <ArrowUpFromLine className="h-6 w-6 text-orange-300" />
            <span className="absolute -inset-px rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 mb-2">
              <Zap className="h-3 w-3 text-orange-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-300">Fast Crypto Payouts</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Withdraw Funds</h1>
            <p className="text-muted-foreground mt-1">
              Send your earnings directly to your cryptocurrency wallet.
            </p>
          </div>
          {/* Live balance pill */}
          <div className="flex items-center gap-2 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-2.5 flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest leading-none mb-0.5">Available</p>
              <p className="text-base font-black text-green-400 leading-none">{formatCurrency(balance)}</p>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="relative mt-6 flex items-center gap-0">
          {[
            { n: 1, label: 'Enter Details' },
            { n: 2, label: 'Review & Submit' },
            { n: 3, label: 'Processed' },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all',
                  currentStep > step.n
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.n
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-secondary border-border text-muted-foreground'
                )}>
                  {currentStep > step.n ? <CheckCircle2 className="h-4 w-4" /> : step.n}
                </div>
                <span className={cn(
                  'text-[10px] font-semibold mt-1.5 text-center whitespace-nowrap',
                  currentStep === step.n ? 'text-orange-400' : currentStep > step.n ? 'text-green-400' : 'text-muted-foreground'
                )}>{step.label}</span>
              </div>
              {i < 2 && (
                <div className={cn('flex-1 h-0.5 mx-2 mb-5 rounded-full', currentStep > step.n ? 'bg-green-500/60' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── KYC Alert ── */}
      {kycRequired && (
        <div className="flex items-start gap-4 rounded-2xl border border-red-500/30 bg-red-950/20 p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/15">
            <ShieldAlert className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-bold text-sm text-red-400">KYC Verification Required</p>
            <p className="text-sm text-muted-foreground">
              Complete identity verification to enable withdrawals and protect your account.
            </p>
            <Link
              href="/settings/kyc"
              className="inline-flex items-center gap-1 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors mt-1"
            >
              Complete KYC Verification <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Success Banner ── */}
      {success && (
        <div className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/40 via-background to-background p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/20">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-green-400">Withdrawal Submitted!</p>
            <p className="text-sm text-muted-foreground mt-0.5">Your request is under review and will be processed within 24 hours.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-green-500/30 text-green-400 hover:bg-green-500/10 flex-shrink-0"
            onClick={() => setSuccess(false)}
          >
            New Withdrawal
          </Button>
        </div>
      )}

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT: Withdrawal Form ── */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">

            {/* Card header */}
            <div className="px-6 pt-6 pb-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <ArrowUpFromLine className="h-4 w-4 text-orange-400" />
                <h2 className="font-bold text-base">Withdrawal Request</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Select currency, enter amount, and provide your wallet address</p>
            </div>

            <div className="p-6 space-y-6">

              {/* Currency */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Withdraw As</Label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger className="h-14 rounded-xl border-border/60 bg-secondary/30 focus:border-orange-500/60 [&>span]:flex [&>span]:items-center [&>span]:gap-3">
                    <SelectValue placeholder="Select currency..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        <span className="flex items-center gap-2.5">
                          <CoinIcon symbol={c.symbol} className="h-6 w-6 rounded-full" />
                          <span className="font-semibold">{c.symbol}</span>
                          <span className="text-muted-foreground">{c.name} · {c.network}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected currency at-a-glance */}
                {selectedCurrency && (
                  <div className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/[0.06] px-4 py-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 p-1.5">
                      <CoinIcon symbol={selectedCurrency.symbol} className="h-full w-full rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-foreground leading-tight">
                        {selectedCurrency.name} <span className="text-muted-foreground font-normal">({selectedCurrency.symbol})</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Min {formatCurrency(selectedCurrency.minWithdrawal)} · Fee {formatCurrency(selectedCurrency.fee)}
                      </p>
                    </div>
                    <Badge className="flex-shrink-0 text-[10px] bg-orange-500/15 text-orange-300 border border-orange-500/30">
                      {selectedCurrency.network}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Amount (USD)</Label>
                  <span className="text-xs text-muted-foreground">
                    Available: <button
                      type="button"
                      className="text-orange-400 font-semibold hover:text-orange-300 transition-colors"
                      onClick={() => setAmount(String(balance))}
                    >{formatCurrency(balance)}</button>
                  </span>
                </div>

                {/* Quick % picks */}
                <div className="grid grid-cols-4 gap-2">
                  {PCT_PICKS.map((pct) => {
                    const val = Math.floor((balance * pct) / 100)
                    const isActive = numAmount === val && val > 0
                    return (
                      <button
                        key={pct}
                        type="button"
                        disabled={balance === 0}
                        onClick={() => setAmount(String(val))}
                        className={cn(
                          'rounded-xl border px-3 py-2 text-center text-xs font-bold transition-all duration-150 hover:scale-[1.03] disabled:opacity-40 disabled:cursor-not-allowed',
                          isActive
                            ? 'border-orange-500 bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30'
                            : 'border-border bg-secondary/30 text-muted-foreground hover:border-orange-500/40 hover:text-foreground'
                        )}
                      >
                        {pct}%
                      </button>
                    )
                  })}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-bold">$</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9 h-14 text-xl font-bold rounded-xl border-border/60 bg-secondary/30 focus:border-orange-500/60 focus:ring-orange-500/20"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {selectedCurrency && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-yellow-500" />
                    Minimum withdrawal: <strong className="text-foreground">{formatCurrency(selectedCurrency.minWithdrawal)}</strong>
                  </p>
                )}
              </div>

              {/* Fee breakdown */}
              {numAmount > 0 && selectedCurrency && (
                <div className="rounded-xl border border-orange-500/15 bg-gradient-to-br from-orange-950/20 to-background p-4 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Withdrawal Amount</span>
                      <span className="font-semibold text-foreground">{formatCurrency(numAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="font-semibold text-yellow-400">-{formatCurrency(estimatedFee)}</span>
                    </div>
                    <div className="border-t border-border/60 pt-2 flex justify-between">
                      <span className="font-bold text-sm text-foreground">You Receive</span>
                      <span className="font-black text-base text-orange-400">{formatCurrency(youReceive)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet address */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Destination Wallet</Label>

                {savedWallets.length > 0 && (
                  <Select onValueChange={(id) => {
                    const w = savedWallets.find((s) => s.id === id)
                    if (w) setWallet(w.address)
                  }}>
                    <SelectTrigger className="h-9 rounded-lg border-border/50 bg-secondary/20 text-xs text-muted-foreground">
                      <SelectValue placeholder="Quick-fill from saved wallets..." />
                    </SelectTrigger>
                    <SelectContent>
                      {savedWallets.map((w) => (
                        <SelectItem key={w.id} value={w.id}>
                          <span className="font-medium">{w.label ?? truncateAddress(w.address)}</span>
                          {w.currency && <span className="text-muted-foreground ml-1.5">({w.currency})</span>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <div className="relative">
                  <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Enter ${selectedCurrency?.symbol || 'crypto'} wallet address`}
                    className="pl-10 h-12 rounded-xl border-border/60 bg-secondary/30 font-mono text-sm focus:border-orange-500/60 focus:ring-orange-500/20"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                  />
                </div>

                {savedWallets.length === 0 && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Save wallets in{' '}
                    <Link href="/settings/withdraw" className="text-orange-400 hover:text-orange-300 font-medium">
                      Settings → Wallets
                    </Link>{' '}
                    for quick access.
                  </p>
                )}
              </div>

              {/* PIN */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Withdrawal PIN</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter your 4-digit PIN"
                    maxLength={4}
                    className="pl-10 h-12 rounded-xl border-border/60 bg-secondary/30 focus:border-orange-500/60 focus:ring-orange-500/20 tracking-widest"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Set your PIN under{' '}
                  <Link href="/settings/security" className="text-orange-400 hover:text-orange-300 font-medium">
                    Settings → Security
                  </Link>
                </p>
              </div>

              {/* Submit */}
              <Button
                onClick={handleWithdraw}
                disabled={!selected || !amount || !wallet || !pin || submitting}
                className="w-full h-13 rounded-xl font-bold text-base gap-2 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white border-0 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 hover:scale-[1.01]"
              >
                {submitting
                  ? <><RefreshCw className="h-4 w-4 animate-spin" /> Processing...</>
                  : <><ArrowUpFromLine className="h-4 w-4" /> Submit Withdrawal</>
                }
              </Button>

            </div>
          </div>
        </div>

        {/* ── RIGHT: Trust + Info ── */}
        <div className="space-y-5">

          {/* Security badges */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security</p>
            <div className="space-y-3">
              {[
                { icon: <ShieldCheck className="h-4 w-4 text-green-400" />, label: 'PIN Protected', sub: 'Every withdrawal requires your secret PIN' },
                { icon: <Lock className="h-4 w-4 text-blue-400" />, label: 'Admin Review', sub: 'All requests reviewed before processing' },
                { icon: <BadgeCheck className="h-4 w-4 text-yellow-400" />, label: 'KYC Verified', sub: 'Identity verification protects your funds' },
                { icon: <Wallet className="h-4 w-4 text-purple-400" />, label: 'Whitelist Wallets', sub: 'Pre-save trusted wallets for fast withdrawals' },
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
                { n: 1, color: 'bg-orange-500/20 text-orange-400', title: 'Fill in details', desc: 'Choose the currency, enter the USD amount and your destination wallet address.' },
                { n: 2, color: 'bg-blue-500/20 text-blue-400', title: 'Confirm with PIN', desc: 'Enter your 4-digit withdrawal PIN to authorise the request securely.' },
                { n: 3, color: 'bg-green-500/20 text-green-400', title: 'Funds sent', desc: 'Requests are reviewed and processed within 24 hours to your wallet.' },
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

            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/8 p-3 space-y-1">
              <p className="text-[11px] font-bold text-yellow-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> Warning
              </p>
              <ul className="text-[10px] text-muted-foreground space-y-1 pl-4 list-disc leading-relaxed">
                <li>Always double-check the wallet address</li>
                <li>Crypto transfers are <strong className="text-foreground">irreversible</strong></li>
                <li>Wrong network = <strong className="text-red-400">permanent loss</strong></li>
                <li>Network fees are deducted from the amount</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Withdrawal History ── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4 text-orange-400" />
            <h2 className="font-bold text-base">Withdrawal History</h2>
          </div>
          {history.length > 0 && (
            <span className="text-xs text-muted-foreground">{history.length} record{history.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/60">
              <ArrowUpFromLine className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">No withdrawals yet</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your withdrawal history will appear here once you make your first request.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/20">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">You Receive</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wallet</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {history.map((w) => {
                  const isCompleted = w.status === 'COMPLETED'
                  const isFailed = w.status === 'REJECTED' || w.status === 'FAILED'
                  return (
                    <tr key={w.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">{formatDateTime(w.createdAt)}</td>
                      <td className="px-4 py-4 font-bold text-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          <CoinIcon symbol={w.currency.symbol} className="h-4 w-4 rounded-full" />
                          {formatCurrency(w.amount)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-yellow-400 whitespace-nowrap">{formatCurrency(w.fee)}</td>
                      <td className="px-4 py-4 font-bold text-orange-400 whitespace-nowrap">{formatCurrency(w.netAmount)}</td>
                      <td className="px-4 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">{truncateAddress(w.walletAddress)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {isCompleted
                            ? <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                            : isFailed
                              ? <XCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                              : <Clock className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />}
                          <Badge
                            variant={isCompleted ? 'success' : isFailed ? 'destructive' : 'secondary'}
                            className="text-[10px] capitalize"
                          >
                            {w.status.toLowerCase()}
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
