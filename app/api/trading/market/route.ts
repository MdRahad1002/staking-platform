import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'

const BINANCE_BASE = 'https://api.binance.com/api/v3'

export async function GET(req: NextRequest) {
  try {
    await requireAuth()

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'klines'
    const symbol = (searchParams.get('symbol') || 'BTCUSDT').toUpperCase()
    const interval = searchParams.get('interval') || '1h'
    const limit = Math.min(parseInt(searchParams.get('limit') || '500'), 1000)

    // Allowlist of valid symbols to prevent SSRF
    if (!/^[A-Z]{2,10}$/.test(symbol)) {
      return NextResponse.json({ error: 'Invalid symbol' }, { status: 400 })
    }

    let url = ''
    if (type === 'klines') {
      url = `${BINANCE_BASE}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    } else if (type === 'ticker') {
      url = `${BINANCE_BASE}/ticker/24hr?symbol=${symbol}`
    } else if (type === 'price') {
      url = `${BINANCE_BASE}/ticker/price?symbol=${symbol}`
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const res = await fetch(url, {
      next: { revalidate: 0 },
      headers: { 'Accept': 'application/json' },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Market data unavailable' }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
