import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendFirstDepositNudgeEmail } from '@/lib/mail'

// GET /api/auth/verify-email?token=<hex-token>
export async function GET(req: NextRequest) {
  // Behind a reverse proxy req.url resolves to the internal origin (localhost:3000),
  // so build redirects from the public app URL instead.
  const base = process.env.NEXT_PUBLIC_APP_URL || req.url
  const token = req.nextUrl.searchParams.get('token')

  if (!token || typeof token !== 'string') {
    return NextResponse.redirect(new URL('/verify-email?error=missing', base))
  }

  try {
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    })

    if (!user) {
      return NextResponse.redirect(new URL('/verify-email?error=invalid', base))
    }

    // Check expiry
    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      return NextResponse.redirect(new URL('/verify-email?error=expired', base))
    }

    // Already verified
    if (user.emailVerified) {
      return NextResponse.redirect(new URL('/verify-email?success=already', base))
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    })

    // Fire-and-forget: schedule deposit nudge email ~8 min after verification
    const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
    void sendFirstDepositNudgeEmail(user.email, displayName)

    return NextResponse.redirect(new URL('/verify-email?success=true', base))
  } catch (err) {
    console.error('[verify-email]', err)
    return NextResponse.redirect(new URL('/verify-email?error=server', base))
  }
}
