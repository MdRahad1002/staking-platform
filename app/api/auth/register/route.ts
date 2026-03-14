import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '@/lib/mail'
import { generateReferralCode } from '@/lib/utils'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { getClientIp, isIpBlocked } from '@/lib/ip-check'

// Password must be 8–128 chars and contain uppercase, lowercase, digit, special char
const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .max(128, 'Password must be at most 128 characters.')
  .refine((p) => /[A-Z]/.test(p), { message: 'Password must contain at least one uppercase letter.' })
  .refine((p) => /[a-z]/.test(p), { message: 'Password must contain at least one lowercase letter.' })
  .refine((p) => /[0-9]/.test(p), { message: 'Password must contain at least one number.' })
  .refine((p) => /[^A-Za-z0-9]/.test(p), { message: 'Password must contain at least one special character.' })

const schema = z.object({
  email: z.string().email('Invalid email address.').max(254),
  password: strongPassword,
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  // min(1) rejects empty strings undefined/absent is still fine
  username: z.string().min(1).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username may only contain letters, numbers and underscores.').optional(),
  referralCode: z.string().max(20).optional(),
  phone: z.string().max(20).optional(),
})

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 registrations per IP per hour ─────────────────────────────
  const ip = getClientIp(req)
  if (ip && await isIpBlocked(ip)) {
    return NextResponse.json({ error: 'Your access has been restricted.' }, { status: 403 })
  }
  const rl = rateLimit(`register:${ip ?? 'unknown'}`, 5, 60 * 60_000, 30 * 60_000)
  if (!rl.success) return rateLimitResponse(rl.retryAfter)

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }
    const { email, password, firstName, lastName, username, referralCode, phone } = parsed.data

    // Check existing
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 409 })
    }

    let referredById: string | null = null
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } })
      if (referrer) referredById = referrer.id
    }

    const hash = await bcrypt.hash(password, 12)

    // Auto-generate a unique username if not supplied
    const baseUsername = username
      || (firstName ? firstName.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 9000 + 1000) : null)
      || 'user' + Math.floor(Math.random() * 900000 + 100000)
    let finalUsername = baseUsername
    let uAttempts = 0
    while (uAttempts < 10) {
      const taken = await prisma.user.findUnique({ where: { username: finalUsername } })
      if (!taken) break
      finalUsername = baseUsername + Math.floor(Math.random() * 9000 + 1000)
      uAttempts++
    }

    // Generate a unique referral code with collision retry
    let myReferralCode = generateReferralCode()
    let attempts = 0
    while (attempts < 5) {
      const exists = await prisma.user.findUnique({ where: { referralCode: myReferralCode } })
      if (!exists) break
      myReferralCode = generateReferralCode()
      attempts++
    }

    let user
    try {
      const verificationToken   = randomBytes(32).toString('hex')
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 h

      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hash,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          phone: phone ?? null,
          username: finalUsername,
          referralCode: myReferralCode,
          referredById,
          // Auto-verify so users can login immediately; still send welcome email
          emailVerified: new Date(),
          emailVerificationToken: verificationToken,
          emailVerificationExpires: verificationExpires,
        },
      })

      // Send welcome/verification email awaited so Vercel doesn't kill it before it completes
      try {
        await sendVerificationEmail(user.email, firstName || user.email, verificationToken)
      } catch (emailError) {
        console.error('[REGISTER] Email send error:', emailError)
        // Don't fail the request account is created, email is cosmetic
      }
    } catch (createError: any) {
      // P2002 = unique constraint violation (race condition on email)
      if (createError?.code === 'P2002') {
        return NextResponse.json({ error: 'Email already in use.' }, { status: 409 })
      }
      throw createError
    }

    return NextResponse.json({ message: 'Account created. Please check your email to verify your account.', userId: user.id }, { status: 201 })
  } catch (error) {
    console.error('[REGISTER] Full error:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      error,
    })
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
