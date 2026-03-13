import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mail'
import { z } from 'zod'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { getClientIp, isIpBlocked } from '@/lib/ip-check'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  // ── Rate limit: 3 contact submissions per IP per 10 minutes ─────────────────
  const ip = getClientIp(req)
  if (ip && await isIpBlocked(ip)) {
    return NextResponse.json({ error: 'Your access has been restricted.' }, { status: 403 })
  }
  const rl = rateLimit(`contact:${ip ?? 'unknown'}`, 3, 10 * 60_000)
  if (!rl.success) return rateLimitResponse(rl.retryAfter)

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    await sendContactEmail(parsed.data)

    return NextResponse.json({ message: 'Message sent. We will get back to you soon.' })
  } catch (error) {
    console.error('[CONTACT]', error)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
