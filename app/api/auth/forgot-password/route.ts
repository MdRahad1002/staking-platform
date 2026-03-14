import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/mail'
import crypto from 'crypto'
import { z } from 'zod'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { getClientIp, isIpBlocked } from '@/lib/ip-check'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 requests per IP per 15 minutes ────────────────────────────
  const ip = getClientIp(req)
  if (ip && await isIpBlocked(ip)) {
    return NextResponse.json({ error: 'Your access has been restricted.' }, { status: 403 })
  }
  const rl = rateLimit(`forgot:${ip ?? 'unknown'}`, 5, 15 * 60_000, 15 * 60_000)
  if (!rl.success) return rateLimitResponse(rl.retryAfter)

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    })

    // Always return success to avoid email enumeration.
    // Also silently skip suspended/banned accounts login gate will block them anyway.
    if (!user || !user.isActive || user.bannedAt) {
      return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    })

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/auth-re-password?token=${token}`

    // Awaited Vercel serverless terminates non-awaited promises before they complete
    try {
      await sendPasswordResetEmail(user.email, resetUrl, user.firstName || undefined)
    } catch (err) {
      console.error('[FORGOT_PASSWORD] Email send failed:', err)
      // Still return success to avoid email enumeration
    }

    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('[FORGOT_PASSWORD]', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
