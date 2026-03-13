import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mail'

// Protected by a server-side env var.
// Set TEST_EMAIL_SECRET in your .env / Vercel dashboard.
// Usage: GET /api/test-email?secret=<TEST_EMAIL_SECRET>&to=you@email.com
export async function GET(req: Request) {
  const expectedSecret = process.env.TEST_EMAIL_SECRET
  if (!expectedSecret) {
    // Endpoint is disabled if TEST_EMAIL_SECRET is not configured
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret') ?? ''

  // Constant-time comparison prevents timing side-channel attacks
  const { timingSafeEqual } = await import('crypto')
  const buf1 = Buffer.from(secret, 'utf8')
  const buf2 = Buffer.from(expectedSecret, 'utf8')
  const secretValid =
    buf1.length === buf2.length && timingSafeEqual(buf1, buf2)

  if (!secretValid) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const to = searchParams.get('to')
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({ error: 'Missing or invalid ?to= param.' }, { status: 400 })
  }

  try {
    await sendEmail({
      to,
      subject: 'StakeOnix - Email Test',
      html: '<p>Email delivery is working correctly via Resend.</p>',
    })
    return NextResponse.json({ ok: true, message: `Email sent to ${to}` })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[TEST_EMAIL] Error:', message)
    // Never return internal details (API keys, stack traces) to the caller
    return NextResponse.json(
      { ok: false, error: 'Email send failed. Check server logs.' },
      { status: 500 },
    )
  }
}
