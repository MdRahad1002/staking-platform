'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefreshCw, Activity, X, Edit2, Check, LineChart, Layers, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const PriceChart = dynamic(() => import('./PriceChart'), { ssr: false })

// ─── Constants ─────────────────────────────────────────────────────────────

const SYMBOLS = [
  { value: 'BTCUSDT', label: 'BTC/USDT' },
  { value: 'ETHUSDT', label: 'ETH/USDT' },
  { value: 'BNBUSDT', label: 'BNB/USDT' },
  { value: 'SOLUSDT', label: 'SOL/USDT' },
  { value: 'XRPUSDT', label: 'XRP/USDT' },
  { value: 'ADAUSDT', label: 'ADA/USDT' },
  { value: 'AVAXUSDT', label: 'AVAX/USDT' },
  { value: 'DOTUSDT', label: 'DOT/USDT' },
  { value: 'MATICUSDT', label: 'MATIC/USDT' },
  { value: 'LINKUSDT', label: 'LINK/USDT' },
]

const CHART_INTERVALS = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1H' },
  { value: '4h', label: '4H' },
  { value: '1d', label: '1D' },
]

const LEVERAGES = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100]

const COIN_LOGOS: Record<string, string> = {
  BTCUSDT:   'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ETHUSDT:   'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  BNBUSDT:   'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  SOLUSDT:   'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  XRPUSDT:   'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  ADAUSDT:   'https://assets.coingecko.com/coins/images/975/small/cardano.png',
  AVAXUSDT:  'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  DOTUSDT:   'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
  MATICUSDT: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  LINKUSDT:  'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
}

// ─── Types ──────────────────────────────────────────────────────────────────

interface Ticker {
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: number
}

interface Position {
  id: string
  symbol: string
  side: string
  leverage: number
  entryPrice: number
  quantity: number
  margin: number
  stopLoss: number | null
  takeProfit: number | null
  createdAt: string
}

interface HistoryPosition {
  id: string
  symbol: string
  side: string
  leverage: number
  entryPrice: number
  quantity: number
  margin: number
  realizedPnl: number
  closePrice: number | null
  status: string
  closedAt: string | null
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function calcPnl(pos: Position, price: number): number {
  if (pos.side === 'SPOT_BUY' || pos.side === 'LONG') {
    return pos.quantity * (price - pos.entryPrice)
  }
  return pos.quantity * (pos.entryPrice - price)
}

function calcLiqPrice(pos: Position): number | null {
  if (pos.side === 'SPOT_BUY' || pos.leverage <= 1) return null
  const mmRate = 0.005
  if (pos.side === 'LONG') return pos.entryPrice * (1 - 1 / pos.leverage + mmRate)
  return pos.entryPrice * (1 + 1 / pos.leverage - mmRate)
}

// ─── Component ──────────────────────────────────────────────────────────────

interface TradingTerminalProps {
  userBalance: number
  /** Optional controlled symbol (e.g. from an external watchlist). */
  symbol?: string
  onSymbolChange?: (symbol: string) => void
}

export default function TradingTerminal({ userBalance: initialBalance, symbol: controlledSymbol, onSymbolChange }: TradingTerminalProps) {
  // Market state — supports both internal and controlled (watchlist) symbol selection
  const [internalSymbol, setInternalSymbol] = useState('BTCUSDT')
  const symbol = controlledSymbol ?? internalSymbol
  const setSymbol = useCallback((s: string) => {
    if (onSymbolChange) onSymbolChange(s)
    else setInternalSymbol(s)
  }, [onSymbolChange])
  const [chartInterval, setChartInterval] = useState('1h')
  const [ticker, setTicker] = useState<Ticker | null>(null)
  const [livePrice, setLivePrice] = useState<number | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // Order form state
  const [tradeType, setTradeType] = useState<'SPOT' | 'LEVERAGE'>('SPOT')
  const [side, setSide] = useState<'BUY' | 'SELL' | 'LONG' | 'SHORT'>('BUY')
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP_LIMIT'>('MARKET')
  const [leverage, setLeverage] = useState(10)
  const [amountUsd, setAmountUsd] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [stopPrice, setStopPrice] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [placing, setPlacing] = useState(false)
  const [balance, setBalance] = useState(initialBalance)

  // Positions state
  const [positions, setPositions] = useState<Position[]>([])
  const [history, setHistory] = useState<HistoryPosition[]>([])
  const [positionPrices, setPositionPrices] = useState<Record<string, number>>({})
  const [closingId, setClosingId] = useState<string | null>(null)

  // Mobile view tab
  const [mobileView, setMobileView] = useState<'chart' | 'order' | 'positions'>('chart')

  // Inline SL/TP editing
  const [editingPosId, setEditingPosId] = useState<string | null>(null)
  const [editSl, setEditSl] = useState('')
  const [editTp, setEditTp] = useState('')
  const [adjusting, setAdjusting] = useState(false)

  // Track which positions have already been auto-closed by SL/TP to avoid duplicate requests
  const slTpTriggeredRef = useRef<Set<string>>(new Set())

  // ── Ticker ──────────────────────────────────────────────────────────────

  const fetchTicker = useCallback(async () => {
    try {
      // Fetch directly from Binance to avoid Vercel server-side rate-limiting
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
      if (!res.ok) return
      const data = await res.json()
      if (data.lastPrice) {
        setTicker({
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChange),
          changePercent: parseFloat(data.priceChangePercent),
          high: parseFloat(data.highPrice),
          low: parseFloat(data.lowPrice),
          volume: parseFloat(data.volume),
        })
        setLivePrice(parseFloat(data.lastPrice))
      }
    } catch {
      // ignore
    }
  }, [symbol])

  useEffect(() => {
    fetchTicker()
  }, [fetchTicker])

  // ── WebSocket live price ────────────────────────────────────────────────

  useEffect(() => {
    if (wsRef.current) wsRef.current.close()
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@miniTicker`
    )
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setLivePrice(parseFloat(data.c))
      } catch {
        // ignore
      }
    }
    wsRef.current = ws
    return () => ws.close()
  }, [symbol])

  // ── Positions ───────────────────────────────────────────────────────────

  const fetchPositions = useCallback(async () => {
    try {
      const [posRes, histRes] = await Promise.all([
        fetch('/api/trading/positions'),
        fetch('/api/trading/history'),
      ])
      const [posData, histData] = await Promise.all([posRes.json(), histRes.json()])
      if (posData.data) setPositions(posData.data)
      if (histData.data) setHistory(histData.data)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    fetchPositions()
  }, [fetchPositions])

  // Poll live prices for all open position symbols every 5 s
  useEffect(() => {
    const symbols = [...new Set(positions.map((p) => p.symbol))]
    if (symbols.length === 0) return
    const poll = async () => {
      const results: Record<string, number> = {}
      await Promise.all(
        symbols.map(async (sym) => {
          try {
            // Fetch directly from Binance client-side to avoid Vercel IP rate-limiting
            const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${sym}`)
            if (!res.ok) return
            const data = await res.json()
            results[sym] = parseFloat(data.price)
          } catch {
            // ignore
          }
        })
      )
      setPositionPrices((prev) => ({ ...prev, ...results }))
    }
    poll()
    const id = setInterval(poll, 5000)
    return () => clearInterval(id)
  }, [positions])

  // ── Place order ─────────────────────────────────────────────────────────

  const handlePlaceOrder = async () => {
    const amt = parseFloat(amountUsd)
    if (isNaN(amt) || amt < 10) { toast.error('Minimum order amount is $10'); return }
    if (amt > balance) { toast.error('Insufficient balance'); return }

    setPlacing(true)
    try {
      const res = await fetch('/api/trading/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          side,
          type: orderType,
          tradeType,
          leverage: tradeType === 'LEVERAGE' ? leverage : 1,
          amountUsd: amt,
          price: limitPrice ? parseFloat(limitPrice) : undefined,
          stopPrice: stopPrice ? parseFloat(stopPrice) : undefined,
          stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
          takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
          // Send live WebSocket price as fallback if server-side Binance fetch is rate-limited
          clientPrice: livePrice ?? undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to place order'); return }
      toast.success('Order placed successfully!')
      setBalance((b) => b - amt)
      setAmountUsd('')
      setStopLoss('')
      setTakeProfit('')
      setLimitPrice('')
      setStopPrice('')
      fetchPositions()
    } catch {
      toast.error('Network error, please try again')
    } finally {
      setPlacing(false)
    }
  }

  // ── Adjust SL/TP ────────────────────────────────────────────────────────

  const handleAdjust = async (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId)
    const currentP = pos
      ? (positionPrices[pos.symbol] ?? (pos.symbol === symbol ? livePrice : null))
      : null

    // Validate SL/TP direction relative to current price
    if (currentP && pos) {
      const isLong = pos.side === 'SPOT_BUY' || pos.side === 'LONG'
      if (editSl !== '') {
        const sl = parseFloat(editSl)
        if (isLong && sl >= currentP) {
          toast.error('Stop Loss must be below current price for a BUY/LONG position')
          return
        }
        if (!isLong && sl <= currentP) {
          toast.error('Stop Loss must be above current price for a SELL/SHORT position')
          return
        }
      }
      if (editTp !== '') {
        const tp = parseFloat(editTp)
        if (isLong && tp <= currentP) {
          toast.error('Take Profit must be above current price for a BUY/LONG position')
          return
        }
        if (!isLong && tp >= currentP) {
          toast.error('Take Profit must be below current price for a SELL/SHORT position')
          return
        }
      }
    }

    setAdjusting(true)
    try {
      const res = await fetch('/api/trading/adjust', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positionId,
          stopLoss: editSl !== '' ? parseFloat(editSl) : null,
          takeProfit: editTp !== '' ? parseFloat(editTp) : null,
          currentPrice: currentP,
        }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to update'); return }
      toast.success('SL / TP updated')
      setEditingPosId(null)
      fetchPositions()
    } catch {
      toast.error('Network error')
    } finally {
      setAdjusting(false)
    }
  }

  // ── Close position ──────────────────────────────────────────────────────

  const handleClose = async (positionId: string, triggerReason?: string) => {
    const pos = positions.find((p) => p.id === positionId)

    // Resolve best available client-side price for this specific position's symbol
    let clientPrice: number | undefined =
      pos
        ? (positionPrices[pos.symbol] ?? (pos.symbol === symbol ? (livePrice ?? undefined) : undefined))
        : undefined

    // If no cached price yet, fetch directly from Binance (client IPs are not rate-limited)
    if (!clientPrice && pos) {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${pos.symbol}`
        )
        const data = await res.json()
        const p = parseFloat(data.price)
        if (!isNaN(p) && p > 0) clientPrice = p
      } catch {
        // continue server will try its own fetch
      }
    }

    setClosingId(positionId)
    try {
      const res = await fetch('/api/trading/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positionId, clientPrice }),
      })
      const data = await res.json()
      if (!res.ok) { toast.error(data.error || 'Failed to close position'); return }
      const pnl: number = data.pnl
      const prefix = triggerReason ? `${triggerReason}: ` : ''
      toast.success(`${prefix}Position closed | PnL: ${pnl >= 0 ? '+' : ''}$${Math.abs(pnl) < 0.01 ? pnl.toFixed(4) : pnl.toFixed(2)}`)
      setBalance((b) => b + data.returnAmount)
      fetchPositions()
    } catch {
      toast.error('Network error, please try again')
    } finally {
      setClosingId(null)
    }
  }

  // ── Client-side SL/TP auto-trigger ─────────────────────────────────────
  // The cron runs every minute; this catches SL/TP in real-time from WebSocket prices

  useEffect(() => {
    for (const pos of positions) {
      if (slTpTriggeredRef.current.has(pos.id)) continue

      const price =
        positionPrices[pos.symbol] ??
        (pos.symbol === symbol ? livePrice : null)
      if (!price) continue

      const isLong = pos.side === 'SPOT_BUY' || pos.side === 'LONG'
      let triggered = false
      let reason = ''

      if (pos.stopLoss !== null && isFinite(pos.stopLoss as number)) {
        const slHit = isLong ? price <= (pos.stopLoss as number) : price >= (pos.stopLoss as number)
        if (slHit) { triggered = true; reason = 'Stop Loss hit' }
      }
      if (!triggered && pos.takeProfit !== null && isFinite(pos.takeProfit as number)) {
        const tpHit = isLong ? price >= (pos.takeProfit as number) : price <= (pos.takeProfit as number)
        if (tpHit) { triggered = true; reason = 'Take Profit hit' }
      }

      if (triggered) {
        slTpTriggeredRef.current.add(pos.id)
        handleClose(pos.id, reason)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionPrices, livePrice, positions])

  // ── Derived values ──────────────────────────────────────────────────────

  const currentPrice = livePrice ?? ticker?.price ?? null
  const effectiveLev = tradeType === 'LEVERAGE' ? leverage : 1

  const positionSize = (): number | null => {
    const amt = parseFloat(amountUsd)
    if (isNaN(amt) || !currentPrice) return null
    return (amt * effectiveLev) / currentPrice
  }

  const estLiqPrice = (): number | null => {
    if (tradeType !== 'LEVERAGE' || !currentPrice) return null
    if (side === 'LONG') return currentPrice * (1 - 1 / leverage)
    return currentPrice * (1 + 1 / leverage)
  }

  const isPositive = (ticker?.changePercent ?? 0) >= 0
  const baseAsset = symbol.replace('USDT', '')
  const symbolLabel = SYMBOLS.find((s) => s.value === symbol)?.label ?? symbol

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* ── Header / Ticker bar ─────────────────────────────────────── */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardContent className="py-2.5 px-3 sm:px-4">
          <div className="flex flex-col gap-1">
            {/* Row 1: coin logo · symbol selector · price · % change · refresh */}
            <div className="flex items-center gap-2">
              {/* Coin logo */}
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8">
                <img
                  src={COIN_LOGOS[symbol] ?? ''}
                  alt={baseAsset}
                  className="w-full h-full rounded-full ring-1 ring-white/10 bg-zinc-800 object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <Select value={symbol} onValueChange={(v) => { setSymbol(v); setLivePrice(null) }}>
                <SelectTrigger className="w-28 sm:w-36 bg-zinc-800 border-zinc-700 font-semibold text-white h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  {SYMBOLS.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-zinc-200">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 min-w-0 flex-1">
                {livePrice && (
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                )}
                <span
                  className={cn(
                    'text-base sm:text-2xl font-bold font-mono truncate',
                    isPositive ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {currentPrice
                    ? `$${currentPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}`
                    : ''}
                </span>
                {ticker && (
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs flex-shrink-0',
                      isPositive
                        ? 'text-green-400 border-green-400/30'
                        : 'text-red-400 border-red-400/30'
                    )}
                  >
                    {isPositive ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={fetchTicker}
                className="flex-shrink-0 text-zinc-500 hover:text-zinc-300 h-7 w-7 p-0"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>

            {/* Row 2: H / L / Vol / Δ horizontally scrollable */}
            {ticker && (
              <div className="flex gap-3 text-[11px] text-zinc-500 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <span className="whitespace-nowrap flex-shrink-0">
                  H: <span className="text-zinc-300">${ticker.high.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </span>
                <span className="whitespace-nowrap flex-shrink-0">
                  L: <span className="text-zinc-300">${ticker.low.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </span>
                <span className="whitespace-nowrap flex-shrink-0">
                  Vol: <span className="text-zinc-300">{ticker.volume.toLocaleString('en-US', { maximumFractionDigits: 0 })} {baseAsset}</span>
                </span>
                <span className="whitespace-nowrap flex-shrink-0">
                  24h: <span className={isPositive ? 'text-green-400' : 'text-red-400'}>{isPositive ? '+' : ''}${ticker.change.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mobile tab switcher (hidden on lg+) */}
      <div className="flex lg:hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 p-1.5 gap-1 shadow-xl shadow-black/30">
        {([
          { id: 'chart' as const, label: 'Chart', Icon: LineChart },
          { id: 'order' as const, label: 'Order', Icon: Layers },
          { id: 'positions' as const, label: positions.length > 0 ? `Pos (${positions.length})` : 'Positions', Icon: Wallet },
        ]).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setMobileView(id)}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all duration-200',
              mobileView === id ? 'bg-amber-500/10' : 'hover:bg-zinc-800/50'
            )}
          >
            <span className={cn(
              'flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-200',
              mobileView === id ? 'bg-amber-500/20' : 'bg-zinc-800/80'
            )}>
              <Icon className={cn('h-4 w-4', mobileView === id ? 'text-amber-400' : 'text-zinc-400')} />
            </span>
            <span className={cn(
              'text-[10px] font-bold tracking-wider uppercase',
              mobileView === id ? 'text-amber-400' : 'text-zinc-500'
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Chart + Order Form ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-4">
        {/* Chart */}
        <Card className={cn('border-zinc-800/80 bg-zinc-900 overflow-hidden shadow-xl shadow-black/20', mobileView !== 'chart' && 'hidden lg:block')}>
          <CardContent className="p-0">
            {/* Interval selector */}
            <div className="flex items-center gap-1 px-3 pt-3 pb-2 border-b border-zinc-800 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CHART_INTERVALS.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setChartInterval(i.value)}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-lg font-semibold transition-all duration-150 whitespace-nowrap flex-shrink-0',
                    chartInterval === i.value
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {i.label}
                </button>
              ))}
            </div>
            <div className="h-[320px] sm:h-[360px] lg:h-[420px]">
              <PriceChart symbol={symbol} interval={chartInterval} />
            </div>
          </CardContent>
        </Card>

        {/* Order Form */}
        <Card className={cn('border-zinc-800/80 bg-zinc-900 shadow-xl shadow-black/20', mobileView !== 'order' && 'hidden lg:block')}>
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/15">
                <Activity className="h-3.5 w-3.5 text-amber-400" />
              </span>
              Place Order
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {/* Trade type toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-800/60 rounded-xl border border-zinc-700/40">
              {(['SPOT', 'LEVERAGE'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTradeType(t)
                    setSide(t === 'SPOT' ? 'BUY' : 'LONG')
                  }}
                  className={cn(
                    'py-1.5 text-xs font-semibold rounded-lg transition-all duration-200',
                    tradeType === t ? 'bg-amber-500/15 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {t === 'SPOT' ? 'Spot' : 'Leverage'}
                </button>
              ))}
            </div>

            {/* Side */}
            <div className="grid grid-cols-2 gap-1.5">
              {(tradeType === 'SPOT' ? ['BUY', 'SELL'] : ['LONG', 'SHORT']).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s as typeof side)}
                  className={cn(
                    'py-2.5 text-xs font-bold rounded-xl transition-all duration-200',
                    side === s
                      ? s === 'BUY' || s === 'LONG'
                        ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25'
                      : 'border border-zinc-700/50 bg-zinc-800/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/40'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Leverage picker */}
            {tradeType === 'LEVERAGE' && (
              <div>
                <Label className="text-xs text-zinc-400 mb-1 block">
                  Leverage: <span className="text-amber-400 font-bold">{leverage}x</span>
                </Label>
                <div className="flex flex-wrap gap-1">
                  {LEVERAGES.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLeverage(l)}
                      className={cn(
                        'px-2.5 py-1 text-xs rounded-lg border transition-all duration-150',
                        leverage === l
                          ? 'bg-amber-500 border-amber-500 text-black font-bold shadow-md shadow-amber-500/30'
                          : 'border-zinc-700/50 bg-zinc-800/40 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                      )}
                    >
                      {l}x
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order type */}
            <div>
              <Label className="text-xs text-zinc-400">Order Type</Label>
              <Select value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)}>
                <SelectTrigger className="mt-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="MARKET">Market</SelectItem>
                  <SelectItem value="LIMIT">Limit</SelectItem>
                  <SelectItem value="STOP_LIMIT">Stop-Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label className="text-xs text-zinc-400">Amount (USD)</Label>
              <div className="relative mt-1">
                <Input
                  type="number"
                  min={10}
                  placeholder="0.00"
                  value={amountUsd}
                  onChange={(e) => setAmountUsd(e.target.value)}
                  className="h-10 text-sm bg-zinc-800 border-zinc-700 pr-12 text-zinc-200"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  USD
                </span>
              </div>
              <div className="flex gap-1 mt-1">
                {[25, 50, 75, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setAmountUsd(((balance * pct) / 100).toFixed(2))}
                    className="flex-1 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 rounded-lg hover:border-zinc-500 transition-colors"
                  >
                    {pct === 100 ? 'MAX' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Limit price */}
            {(orderType === 'LIMIT' || orderType === 'STOP_LIMIT') && (
              <div>
                <Label className="text-xs text-zinc-400">Limit Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="mt-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-200"
                />
              </div>
            )}

            {/* Stop price */}
            {orderType === 'STOP_LIMIT' && (
              <div>
                <Label className="text-xs text-zinc-400">Stop Price (USD)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  className="mt-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-200"
                />
              </div>
            )}

            {/* SL / TP */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-zinc-400">Stop Loss</Label>
                <Input
                  type="number"
                  placeholder="Optional"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="mt-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-200"
                />
              </div>
              <div>
                <Label className="text-xs text-zinc-400">Take Profit</Label>
                <Input
                  type="number"
                  placeholder="Optional"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="mt-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-200"
                />
              </div>
            </div>

            {/* Position info preview */}
            {positionSize() !== null && (
              <div className="bg-zinc-800 rounded p-2 text-xs space-y-1">
                <div className="flex justify-between text-zinc-400">
                  <span>Position Size</span>
                  <span className="text-zinc-200">
                    {positionSize()!.toFixed(6)} {baseAsset}
                  </span>
                </div>
                {tradeType === 'LEVERAGE' && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Notional Value</span>
                    <span className="text-zinc-200">
                      ${(parseFloat(amountUsd) * leverage).toFixed(2)}
                    </span>
                  </div>
                )}
                {estLiqPrice() !== null && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Est. Liq. Price</span>
                    <span className="text-red-400">${estLiqPrice()!.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handlePlaceOrder}
              disabled={placing || !amountUsd || parseFloat(amountUsd) < 10}
              className={cn(
                'w-full font-bold text-base h-12 rounded-xl border-0 transition-all duration-200',
                side === 'BUY' || side === 'LONG'
                  ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:shadow-none'
                  : 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-50 disabled:shadow-none'
              )}
            >
              {placing
                ? 'Placing order…'
                : side === 'BUY'
                ? `Buy ${baseAsset}`
                : side === 'SELL'
                ? `Sell ${baseAsset}`
                : side === 'LONG'
                ? `Open Long ${effectiveLev}x`
                : `Open Short ${effectiveLev}x`}
            </Button>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-zinc-500">Available balance</span>
              <span className="text-sm font-semibold text-amber-400">${balance.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions & History */}
        <Card className={cn('border-zinc-800/80 bg-zinc-900 shadow-xl shadow-black/20', mobileView !== 'positions' && 'hidden lg:block')}>
        <CardContent className="p-0">
          <Tabs defaultValue="positions">
            <TabsList className="w-full rounded-none border-b border-zinc-800 bg-transparent h-10 justify-start px-2">
              <TabsTrigger
                value="positions"
                className="text-xs data-[state=active]:bg-transparent data-[state=active]:text-amber-400 data-[state=active]:border-b-2 data-[state=active]:border-amber-400 rounded-none"
              >
                Open Positions ({positions.length})
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-xs data-[state=active]:bg-transparent data-[state=active]:text-amber-400 data-[state=active]:border-b-2 data-[state=active]:border-amber-400 rounded-none"
              >
                Trade History
              </TabsTrigger>
            </TabsList>

            {/* Open Positions */}
            <TabsContent value="positions" className="mt-0">
              {positions.length === 0 ? (
                <p className="text-center text-zinc-500 text-sm py-10">No open positions</p>
              ) : (
                <>
                  {/* ── Mobile cards (hidden on lg+) ──────────────────────── */}
                  <div className="lg:hidden space-y-2.5 p-3">
                    {positions.map((pos) => {
                      const price =
                        (symbol === pos.symbol && livePrice)
                          ? livePrice
                          : (positionPrices[pos.symbol] ?? (symbol === pos.symbol ? (livePrice ?? 0) : 0))
                      const pnl = price ? calcPnl(pos, price) : 0
                      const pnlPct = pos.margin > 0 ? (pnl / pos.margin) * 100 : 0
                      const pnlStr = Math.abs(pnl) < 0.01 ? pnl.toFixed(4) : pnl.toFixed(2)
                      const liq = calcLiqPrice(pos)
                      const isLong = pos.side === 'LONG' || pos.side === 'SPOT_BUY'
                      const isEditing = editingPosId === pos.id
                      return (
                        <div
                          key={pos.id}
                          className={cn(
                            'rounded-2xl border p-4 space-y-3',
                            isLong
                              ? 'border-emerald-700/25 bg-gradient-to-br from-emerald-900/20 via-zinc-800/50 to-zinc-800/40'
                              : 'border-red-700/25 bg-gradient-to-br from-red-900/20 via-zinc-800/50 to-zinc-800/40'
                          )}
                        >
                          {/* Header row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-zinc-100">
                                {pos.symbol.replace('USDT', '/USDT')}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[10px] px-1.5 py-0',
                                  isLong ? 'text-green-400 border-green-400/30' : 'text-red-400 border-red-400/30'
                                )}
                              >
                                {pos.side === 'SPOT_BUY' ? 'SPOT' : pos.side}
                                {pos.leverage > 1 && ` ${pos.leverage}x`}
                              </Badge>
                            </div>
                            <div className="flex gap-1.5">
                              {isEditing ? (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAdjust(pos.id)}
                                    disabled={adjusting}
                                    className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl"
                                  >
                                    {adjusting ? '…' : <><Check className="h-3 w-3 mr-1" />Save</>}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingPosId(null)}
                                    className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-200 rounded-xl"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setEditingPosId(pos.id)
                                      setEditSl(pos.stopLoss?.toString() ?? '')
                                      setEditTp(pos.takeProfit?.toString() ?? '')
                                    }}
                                    className="h-8 px-3 text-xs border-zinc-700 hover:bg-blue-500/10 hover:border-blue-500/50 text-zinc-400 hover:text-blue-400 rounded-xl"
                                  >
                                    <Edit2 className="h-3 w-3 mr-1" />SL/TP
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleClose(pos.id)}
                                    disabled={closingId === pos.id}
                                    className="h-8 px-3 text-xs bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 rounded-xl"
                                  >
                                    {closingId === pos.id ? '…' : 'Close'}
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>

                          {/* PnL prominent */}
                          <div className={cn(
                            'self-start inline-flex items-baseline gap-1.5 rounded-xl px-3 py-2 font-bold font-mono',
                            pnl >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          )}>
                            <span className="text-2xl leading-none">{pnl >= 0 ? '+' : ''}${pnlStr}</span>
                            <span className="text-xs opacity-60 font-medium">
                              ({pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%)
                            </span>
                          </div>

                          {/* Stats grid */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] pt-2.5 border-t border-zinc-700/40">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Entry</span>
                              <span className="text-zinc-300 font-mono">${pos.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Current</span>
                              <span className="text-zinc-300 font-mono">{price ? `$${price.toLocaleString('en-US', { maximumFractionDigits: 4 })}` : ''}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Margin</span>
                              <span className="text-zinc-300">${pos.margin.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Liq.</span>
                              <span className="text-red-400/70">{liq ? `$${liq.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : ''}</span>
                            </div>
                            {isEditing ? (
                              <>
                                <div>
                                  <p className="text-zinc-500 mb-1">Stop Loss</p>
                                  <Input
                                    type="number"
                                    value={editSl}
                                    onChange={(e) => setEditSl(e.target.value)}
                                    placeholder="0.00"
                                    className="h-8 text-xs bg-zinc-700 border-zinc-600 text-zinc-200"
                                  />
                                </div>
                                <div>
                                  <p className="text-zinc-500 mb-1">Take Profit</p>
                                  <Input
                                    type="number"
                                    value={editTp}
                                    onChange={(e) => setEditTp(e.target.value)}
                                    placeholder="0.00"
                                    className="h-8 text-xs bg-zinc-700 border-zinc-600 text-zinc-200"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Stop Loss</span>
                                  <span className="text-zinc-400">{pos.stopLoss ? `$${pos.stopLoss.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : ''}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Take Profit</span>
                                  <span className="text-zinc-400">{pos.takeProfit ? `$${pos.takeProfit.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : ''}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* ── Desktop table (lg+) ───────────────────────────────── */}
                  <div className="hidden lg:block overflow-x-auto p-4">
                    <table className="w-full text-xs min-w-[700px]">
                      <thead>
                        <tr className="text-zinc-500 border-b border-zinc-800">
                          <th className="pb-2 text-left font-normal">Symbol</th>
                          <th className="pb-2 text-left font-normal">Side</th>
                          <th className="pb-2 text-right font-normal">Margin</th>
                          <th className="pb-2 text-right font-normal">Entry Price</th>
                          <th className="pb-2 text-right font-normal">Current</th>
                          <th className="pb-2 text-right font-normal">Unrealized PnL</th>
                          <th className="pb-2 text-right font-normal">Liq. Price</th>
                          <th className="pb-2 text-right font-normal">SL</th>
                          <th className="pb-2 text-right font-normal">TP</th>
                          <th className="pb-2 text-right font-normal"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((pos) => {
                          const price =
                            (symbol === pos.symbol && livePrice)
                              ? livePrice
                              : (positionPrices[pos.symbol] ?? (symbol === pos.symbol ? (livePrice ?? 0) : 0))
                          const pnl = price ? calcPnl(pos, price) : 0
                          const pnlPct = pos.margin > 0 ? (pnl / pos.margin) * 100 : 0
                          const pnlStr = Math.abs(pnl) < 0.01 ? pnl.toFixed(4) : pnl.toFixed(2)
                          const liq = calcLiqPrice(pos)
                          const isLong = pos.side === 'LONG' || pos.side === 'SPOT_BUY'
                          return (
                            <tr
                              key={pos.id}
                              className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                            >
                              <td className="py-2.5 font-medium text-zinc-200">
                                {pos.symbol.replace('USDT', '/USDT')}
                              </td>
                              <td className="py-2.5">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    isLong
                                      ? 'text-green-400 border-green-400/30'
                                      : 'text-red-400 border-red-400/30'
                                  )}
                                >
                                  {pos.side === 'SPOT_BUY' ? 'SPOT' : pos.side}
                                  {pos.leverage > 1 && ` ${pos.leverage}x`}
                                </Badge>
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                ${pos.margin.toFixed(2)}
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                ${pos.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                {price
                                  ? `$${price.toLocaleString('en-US', { maximumFractionDigits: 4 })}`
                                  : ''}
                              </td>
                              <td
                                className={cn(
                                  'py-2.5 text-right font-medium',
                                  pnl >= 0 ? 'text-green-400' : 'text-red-400'
                                )}
                              >
                                {pnl >= 0 ? '+' : ''}${pnlStr}{' '}
                                <span className="text-zinc-500 font-normal">
                                  ({pnlPct >= 0 ? '+' : ''}
                                  {pnlPct.toFixed(2)}%)
                                </span>
                              </td>
                              <td className="py-2.5 text-right text-red-400/70">
                                {liq
                                  ? `$${liq.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                                  : ''}
                              </td>
                              {/* SL */}
                              <td className="py-2.5 text-right">
                                {editingPosId === pos.id ? (
                                  <Input
                                    type="number"
                                    value={editSl}
                                    onChange={(e) => setEditSl(e.target.value)}
                                    placeholder="0.00"
                                    className="h-6 w-20 text-xs bg-zinc-700 border-zinc-600 text-zinc-200 px-1"
                                  />
                                ) : (
                                  <span className="text-zinc-500">
                                    {pos.stopLoss
                                      ? `$${pos.stopLoss.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                                      : ''}
                                  </span>
                                )}
                              </td>
                              {/* TP */}
                              <td className="py-2.5 text-right">
                                {editingPosId === pos.id ? (
                                  <Input
                                    type="number"
                                    value={editTp}
                                    onChange={(e) => setEditTp(e.target.value)}
                                    placeholder="0.00"
                                    className="h-6 w-20 text-xs bg-zinc-700 border-zinc-600 text-zinc-200 px-1"
                                  />
                                ) : (
                                  <span className="text-zinc-500">
                                    {pos.takeProfit
                                      ? `$${pos.takeProfit.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                                      : ''}
                                  </span>
                                )}
                              </td>
                              {/* Actions */}
                              <td className="py-2.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {editingPosId === pos.id ? (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleAdjust(pos.id)}
                                        disabled={adjusting}
                                        className="h-6 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0"
                                      >
                                        {adjusting ? '…' : <Check className="h-3 w-3" />}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingPosId(null)}
                                        className="h-6 px-2 text-xs text-zinc-400 hover:text-zinc-200"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setEditingPosId(pos.id)
                                          setEditSl(pos.stopLoss?.toString() ?? '')
                                          setEditTp(pos.takeProfit?.toString() ?? '')
                                        }}
                                        className="h-6 px-2 text-xs border-zinc-700 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400"
                                      >
                                        <Edit2 className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleClose(pos.id)}
                                        disabled={closingId === pos.id}
                                        className="h-6 px-2 text-xs border-zinc-700 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
                                      >
                                        {closingId === pos.id ? '…' : <X className="h-3 w-3" />}
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </TabsContent>

            {/* Trade History */}
            <TabsContent value="history" className="mt-0">
              {history.length === 0 ? (
                <p className="text-center text-zinc-500 text-sm py-10">No closed trades yet</p>
              ) : (
                <>
                  {/* ── Mobile cards (hidden on lg+) ──────────────────────── */}
                  <div className="lg:hidden space-y-2.5 p-3">
                    {history.map((pos) => {
                      const isLong = pos.side === 'LONG' || pos.side === 'SPOT_BUY'
                      return (
                        <div
                          key={pos.id}
                          className="rounded-2xl border border-zinc-700/50 bg-zinc-800/40 p-4 space-y-2.5"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-zinc-100">
                                {pos.symbol.replace('USDT', '/USDT')}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[10px] px-1.5 py-0',
                                  isLong ? 'text-green-400 border-green-400/30' : 'text-red-400 border-red-400/30'
                                )}
                              >
                                {pos.side === 'SPOT_BUY' ? 'SPOT' : pos.side}
                                {pos.leverage > 1 && ` ${pos.leverage}x`}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[10px] px-1.5',
                                  pos.status === 'LIQUIDATED'
                                    ? 'text-red-400 border-red-400/30'
                                    : 'text-zinc-400 border-zinc-600'
                                )}
                              >
                                {pos.status}
                              </Badge>
                              <span className="text-[11px] text-zinc-500">
                                {pos.closedAt ? new Date(pos.closedAt).toLocaleDateString() : ''}
                              </span>
                            </div>
                          </div>

                          {/* Realized PnL */}
                          <div className={cn(
                            'self-start inline-flex items-center rounded-xl px-3 py-1.5 font-bold font-mono',
                            pos.realizedPnl >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          )}>
                            <span className="text-xl">
                              {pos.realizedPnl >= 0 ? '+' : ''}${pos.realizedPnl.toFixed(2)}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] pt-2.5 border-t border-zinc-700/40">
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Entry</span>
                              <span className="text-zinc-300 font-mono">${pos.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Close</span>
                              <span className="text-zinc-300 font-mono">
                                {pos.closePrice ? `$${pos.closePrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}` : ''}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-500">Margin</span>
                              <span className="text-zinc-300">${pos.margin.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* ── Desktop table (lg+) ───────────────────────────────── */}
                  <div className="hidden lg:block overflow-x-auto p-4">
                    <table className="w-full text-xs min-w-[700px]">
                      <thead>
                        <tr className="text-zinc-500 border-b border-zinc-800">
                          <th className="pb-2 text-left font-normal">Symbol</th>
                          <th className="pb-2 text-left font-normal">Side</th>
                          <th className="pb-2 text-right font-normal">Margin</th>
                          <th className="pb-2 text-right font-normal">Entry</th>
                          <th className="pb-2 text-right font-normal">Close</th>
                          <th className="pb-2 text-right font-normal">Realized PnL</th>
                          <th className="pb-2 text-right font-normal">Status</th>
                          <th className="pb-2 text-right font-normal">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((pos) => {
                          const isLong = pos.side === 'LONG' || pos.side === 'SPOT_BUY'
                          return (
                            <tr
                              key={pos.id}
                              className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                            >
                              <td className="py-2.5 font-medium text-zinc-200">
                                {pos.symbol.replace('USDT', '/USDT')}
                              </td>
                              <td className="py-2.5">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    isLong
                                      ? 'text-green-400 border-green-400/30'
                                      : 'text-red-400 border-red-400/30'
                                  )}
                                >
                                  {pos.side === 'SPOT_BUY' ? 'SPOT' : pos.side}
                                  {pos.leverage > 1 && ` ${pos.leverage}x`}
                                </Badge>
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                ${pos.margin.toFixed(2)}
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                ${pos.entryPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                              </td>
                              <td className="py-2.5 text-right text-zinc-300">
                                {pos.closePrice
                                  ? `$${pos.closePrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}`
                                  : ''}
                              </td>
                              <td
                                className={cn(
                                  'py-2.5 text-right font-medium',
                                  pos.realizedPnl >= 0 ? 'text-green-400' : 'text-red-400'
                                )}
                              >
                                {pos.realizedPnl >= 0 ? '+' : ''}${pos.realizedPnl.toFixed(2)}
                              </td>
                              <td className="py-2.5 text-right">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    pos.status === 'LIQUIDATED'
                                      ? 'text-red-400 border-red-400/30'
                                      : 'text-zinc-400 border-zinc-600'
                                  )}
                                >
                                  {pos.status}
                                </Badge>
                              </td>
                              <td className="py-2.5 text-right text-zinc-500">
                                {pos.closedAt
                                  ? new Date(pos.closedAt).toLocaleDateString()
                                  : ''}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
