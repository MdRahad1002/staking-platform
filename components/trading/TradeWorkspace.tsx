'use client'

import { useState } from 'react'
import TradingTerminal from './TradingTerminal'
import { MarketWatchlist, type WatchlistSymbol } from './MarketWatchlist'

const WATCHLIST: WatchlistSymbol[] = [
  { value: 'BTCUSDT', label: 'BTC/USDT', name: 'Bitcoin' },
  { value: 'ETHUSDT', label: 'ETH/USDT', name: 'Ethereum' },
  { value: 'BNBUSDT', label: 'BNB/USDT', name: 'BNB' },
  { value: 'SOLUSDT', label: 'SOL/USDT', name: 'Solana' },
  { value: 'XRPUSDT', label: 'XRP/USDT', name: 'XRP' },
  { value: 'ADAUSDT', label: 'ADA/USDT', name: 'Cardano' },
  { value: 'AVAXUSDT', label: 'AVAX/USDT', name: 'Avalanche' },
  { value: 'DOTUSDT', label: 'DOT/USDT', name: 'Polkadot' },
  { value: 'MATICUSDT', label: 'MATIC/USDT', name: 'Polygon' },
  { value: 'LINKUSDT', label: 'LINK/USDT', name: 'Chainlink' },
]

export default function TradeWorkspace({ userBalance }: { userBalance: number }) {
  const [symbol, setSymbol] = useState('BTCUSDT')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-4">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <MarketWatchlist symbols={WATCHLIST} selected={symbol} onSelect={setSymbol} />
      </aside>
      <div className="min-w-0">
        <TradingTerminal userBalance={userBalance} symbol={symbol} onSymbolChange={setSymbol} />
      </div>
    </div>
  )
}
