import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.NOWPAYMENTS_API_KEY || ''
  const hex = Buffer.from(key).toString('hex')
  // Test the key directly
  let npStatus = null
  try {
    const r = await fetch('https://api.nowpayments.io/v1/status', {
      headers: { 'x-api-key': key }
    })
    npStatus = await r.json()
  } catch (e) {
    npStatus = { error: String(e) }
  }
  return NextResponse.json({
    len: key.length,
    first8: key.substring(0, 8),
    last4: key.substring(key.length - 4),
    hex,
    hasNewline: key.includes('\n') || key.includes('\r'),
    npStatus,
  })
}
