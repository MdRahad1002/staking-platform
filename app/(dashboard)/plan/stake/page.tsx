'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatCurrency, calculateStakingReturns } from '@/lib/utils'
import { TrendingUp, Clock, DollarSign, Calculator, ShieldCheck, Info } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const REF_ASSETS = [
  { value: 'BTCUSDT', label: 'Bitcoin (BTC)' },
  { value: 'ETHUSDT', label: 'Ethereum (ETH)' },
  { value: 'SOLUSDT', label: 'Solana (SOL)' },
  { value: 'BNBUSDT', label: 'BNB (BNB)' },
  { value: 'XRPUSDT', label: 'XRP (XRP)' },
  { value: 'ADAUSDT', label: 'Cardano (ADA)' },
  { value: 'AVAXUSDT', label: 'Avalanche (AVAX)' },
  { value: 'DOTUSDT', label: 'Polkadot (DOT)' },
  { value: 'MATICUSDT', label: 'Polygon (MATIC)' },
  { value: 'LINKUSDT', label: 'Chainlink (LINK)' },
]
const PROTECTION_PARTICIPATION = 50

interface Plan {
  id: string
  name: string
  description?: string
  dailyRoi: number
  totalRoi: number
  durationDays: number
  minAmount: number
  maxAmount?: number | null
  isFeatured: boolean
}

export default function StakePage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-secondary/30" />}>
      <StakeForm />
    </Suspense>
  )
}

function StakeForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState(searchParams.get('planId') || '')
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [isProtected, setIsProtected] = useState(false)
  const [refSymbol, setRefSymbol] = useState('BTCUSDT')

  useEffect(() => {
    fetch('/api/staking/plans')
      .then((r) => r.json())
      .then((d) => {
        setPlans(d.data || [])
        if (!selectedPlanId && (d.data || []).length > 0) {
          setSelectedPlanId(d.data[0].id)
        }
      })

    fetch('/api/withdraw/balance')
      .then((r) => r.json())
      .then((d) => setBalance(d.data?.balance || 0))
  }, [])

  const selectedPlan = plans.find((p) => p.id === selectedPlanId)
  const numAmount = parseFloat(amount) || 0

  const returns = selectedPlan && numAmount > 0
    ? calculateStakingReturns(numAmount, selectedPlan.dailyRoi, selectedPlan.durationDays)
    : null
  const totalReturn = returns?.totalReturn ?? 0
  const profit = returns?.totalProfit ?? 0

  const handleStake = async () => {
    if (!selectedPlanId || !amount) {
      toast.error('Please select a plan and enter an amount.')
      return
    }
    if (!selectedPlan) return
    if (numAmount < selectedPlan.minAmount) {
      toast.error(`Minimum amount is ${formatCurrency(selectedPlan.minAmount)}`)
      return
    }
    if (selectedPlan.maxAmount && numAmount > selectedPlan.maxAmount) {
      toast.error(`Maximum amount is ${formatCurrency(selectedPlan.maxAmount)}`)
      return
    }
    if (numAmount > balance) {
      toast.error('Insufficient balance.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/staking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlanId,
          amount: numAmount,
          isProtected,
          ...(isProtected ? { refSymbol } : {}),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Stake created successfully!')
        router.push('/orders')
      } else {
        toast.error(data.error || 'Failed to create stake.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Create Stake</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Select a plan and amount to start earning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stake Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stake Details</CardTitle>
            <CardDescription>
              Available:{' '}
              <span className="text-primary font-semibold">{formatCurrency(balance)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Select Plan</Label>
              <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan..." />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - {p.dailyRoi}% daily
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPlan && (
              <div className="rounded-lg bg-secondary/30 p-3 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Daily ROI</span>
                  <span className="text-primary font-semibold">
                    {selectedPlan.dailyRoi}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total ROI</span>
                  <span className="text-green-500 font-semibold">
                    {selectedPlan.totalRoi}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{selectedPlan.durationDays} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Min Amount</span>
                  <span>{formatCurrency(selectedPlan.minAmount)}</span>
                </div>
                {selectedPlan.maxAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Max Amount</span>
                    <span>{formatCurrency(selectedPlan.maxAmount)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Investment Amount (USD)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* ── Protected Staking opt-in ── */}
            <div className={cn(
              'rounded-xl border p-4 transition-colors',
              isProtected ? 'border-blue-500/40 bg-blue-500/[0.06]' : 'border-border bg-secondary/20'
            )}>
              <div className="flex items-start gap-3">
                <div className={cn('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl', isProtected ? 'bg-blue-500/20 text-blue-400' : 'bg-secondary text-muted-foreground')}>
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-foreground">Protected Staking</p>
                    {/* Toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isProtected}
                      onClick={() => setIsProtected((v) => !v)}
                      className={cn(
                        'relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full px-0.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
                        isProtected ? 'bg-blue-500' : 'bg-white/15'
                      )}
                    >
                      <span className={cn(
                        'h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                        isProtected ? 'translate-x-5' : 'translate-x-0'
                      )} />
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Keep all your daily rewards and principal, plus earn a bonus if your chosen market rises by maturity.
                    If it falls, you lose nothing. You receive {PROTECTION_PARTICIPATION}% of the asset&apos;s upside.
                  </p>

                  {isProtected && (
                    <div className="mt-3 space-y-1.5">
                      <Label className="text-xs">Reference market</Label>
                      <Select value={refSymbol} onValueChange={setRefSymbol}>
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {REF_ASSETS.map((a) => (
                            <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] text-muted-foreground flex items-start gap-1.5 pt-1">
                        <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        The asset&apos;s price is locked in now. At maturity we compare it to the live price and pay your bonus. Your fixed staking rewards are unchanged.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleStake}
              variant="gradient"
              className="w-full gap-2"
              loading={submitting}
              disabled={
                !selectedPlanId ||
                !amount ||
                numAmount <= 0 ||
                (!!selectedPlan && numAmount < selectedPlan.minAmount) ||
                (!!selectedPlan?.maxAmount && numAmount > selectedPlan.maxAmount) ||
                numAmount > balance
              }
            >
              <TrendingUp className="h-4 w-4" />
              Start Staking
            </Button>
          </CardContent>
        </Card>

        {/* Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Profit Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPlan && numAmount > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary/40 p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Investment</p>
                    <p className="font-bold text-lg">{formatCurrency(numAmount)}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Total Return</p>
                    <p className="font-bold text-lg text-primary">{formatCurrency(totalReturn)}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-primary/10 to-green-500/10 border border-primary/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Expected Profit</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">+{formatCurrency(profit)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    After {selectedPlan.durationDays} days at {selectedPlan.dailyRoi}% daily
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Matures in {selectedPlan.durationDays} days</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Principal is included in total return</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Select a plan and enter an amount to see profit estimates.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Plans overview */}
      {plans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left pb-3 font-medium">Plan</th>
                    <th className="text-left pb-3 font-medium">ROI</th>
                    <th className="text-left pb-3 font-medium">Duration</th>
                    <th className="text-left pb-3 font-medium">Min Amount</th>
                    <th className="text-left pb-3 font-medium">Max Amount</th>
                    <th className="text-left pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {plans.map((p) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-secondary/30 transition-colors cursor-pointer ${
                        p.id === selectedPlanId ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedPlanId(p.id)}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {p.name}
                          {p.isFeatured && (
                            <Badge variant="success" className="text-xs">Featured</Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-primary font-medium">
                        {p.dailyRoi}% daily
                      </td>
                      <td className="py-3">{p.durationDays}d</td>
                      <td className="py-3">{formatCurrency(p.minAmount)}</td>
                      <td className="py-3">
                        {p.maxAmount ? formatCurrency(p.maxAmount) : 'Unlimited'}
                      </td>
                      <td className="py-3">
                        <Button
                          size="sm"
                          variant={p.id === selectedPlanId ? 'gradient' : 'outline'}
                          onClick={(e) => { e.stopPropagation(); setSelectedPlanId(p.id) }}
                        >
                          {p.id === selectedPlanId ? 'Selected' : 'Select'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
