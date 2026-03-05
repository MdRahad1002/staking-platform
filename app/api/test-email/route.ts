import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mail'

// Protected by a secret — usage: GET /api/test-email?secret=stakeonix_debug_2026&to=you@email.com
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'stakeonix_debug_2026') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const to = searchParams.get('to')
  if (!to) return NextResponse.json({ error: 'Missing ?to= param' }, { status: 400 })

  try {
    await sendEmail({
      to,
      subject: 'StakeOnix — Email Test',
      html: '<p>✅ Email delivery is working correctly on Vercel via Resend.</p>',
    })
    return NextResponse.json({ ok: true, message: `Email sent to ${to}` })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[TEST_EMAIL] Error:', message)
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
