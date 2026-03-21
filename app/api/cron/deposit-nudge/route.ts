import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendDepositFollowUpEmail } from '@/lib/mail'

function isAuthorized(req: NextRequest) {
  const auth   = req.headers.get('authorization')
  const secret = (process.env.CRON_SECRET || '').trim()
  if (!secret) return false
  return auth === `Bearer ${secret}`
}

/**
 * POST/GET /api/cron/deposit-nudge
 *
 * Runs daily. Finds users who:
 *  - Have verified their email
 *  - Have NOT made any deposit (any status)
 *  - Created their account at least 3 days ago (past the 8-min initial nudge window)
 *  - Are active and have not opted out of email
 *
 * Sends each one the follow-up deposit push email.
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

    const users = await prisma.user.findMany({
      where: {
        emailVerified: { not: null },
        isActive: true,
        emailOptOut: false,
        role: 'USER',
        createdAt: { lte: threeDaysAgo },
        deposits: { none: {} },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        username: true,
      },
    })

    let sent    = 0
    let failed  = 0
    const errors: string[] = []

    for (const user of users) {
      try {
        const name = user.firstName || user.username || user.email
        await sendDepositFollowUpEmail(user.email, name)
        sent++
      } catch (err) {
        failed++
        errors.push(`${user.email}: ${err instanceof Error ? err.message : 'unknown'}`)
      }
    }

    return NextResponse.json({
      ok: true,
      eligible: users.length,
      sent,
      failed,
      errors: errors.slice(0, 10),
    })
  } catch (err) {
    console.error('[CRON_DEPOSIT_NUDGE]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// Vercel Cron sends GET by default
export async function GET(req: NextRequest) {
  return POST(req)
}
