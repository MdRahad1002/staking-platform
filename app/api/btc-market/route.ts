import { NextResponse } from 'next/server'

function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function formatVolume(vol: number): string {
  if (vol >= 1_000_000_000) return `$${(vol / 1_000_000_000).toFixed(1)}B`
  if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`
  if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`
  return `$${vol.toFixed(0)}`
}

type MarketRow = {
  current_price: number
  price_change_percentage_24h: number
  high_24h: number
  low_24h: number
  total_volume: number
}

const FALLBACK = {
  price: '$67,842',
  change: '+2.34%',
  up: true,
  high: '$68,421',
  low: '$65,210',
  volume: '$2.4B',
}

export async function GET() {
  try {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&price_change_percentage=24h'

    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
    })

    if (!res.ok) throw new Error(`CoinGecko responded with ${res.status}`)

    const data: MarketRow[] = await res.json()
    const row = data?.[0]
    if (!row) throw new Error('No BTC market data returned')

    const change = row.price_change_percentage_24h ?? 0

    return NextResponse.json(
      {
        price: formatPrice(row.current_price),
        change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        up: change >= 0,
        high: formatPrice(row.high_24h),
        low: formatPrice(row.low_24h),
        volume: formatVolume(row.total_volume),
      },
      { headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=15' } }
    )
  } catch (err) {
    console.error('[btc-market] fetch error:', err)
    return NextResponse.json(FALLBACK, { status: 200 })
  }
}
