import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendReferralNudgeEmail } from '@/lib/mail'

// Protect with the same CRON_SECRET used by process-stakes
function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return auth === `Bearer ${secret}`
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const appUrl = (process.env.NEXTAUTH_URL || 'https://www.stakeonix.com').replace(/\/$/, '')

    // Fetch commission rate setting
    const commissionSetting = await prisma.siteSetting.findUnique({
      where: { key: 'referral_bonus_percent' },
    })
    const commissionRate = commissionSetting ? parseFloat(commissionSetting.value) : 5

    // Find all users who have referred at least one person,
    // where that referred person has NEVER created a stake
    const referrers = await prisma.user.findMany({
      where: {
        isActive: true,
        referrals: {
          some: {
            stakes: { none: {} },
            isActive: true,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        referralCode: true,
        referrals: {
          where: {
            stakes: { none: {} },
            isActive: true,
          },
          select: { id: true },
        },
      },
    })

    let sent = 0
    let failed = 0
    const errors: string[] = []

    for (const referrer of referrers) {
      try {
        const inactiveCount = referrer.referrals.length
        if (inactiveCount === 0) continue

        const potentialEarnings = (inactiveCount * 300 * commissionRate) / 100
        const potentialStr = `$${potentialEarnings.toFixed(2)}`
        const referralLink = `${appUrl}/signup?ref=${referrer.referralCode}`
        const name = referrer.username || referrer.email

        await sendReferralNudgeEmail(
          referrer.email,
          name,
          inactiveCount,
          potentialStr,
          commissionRate,
          referralLink
        )
        sent++
      } catch (err) {
        failed++
        errors.push(`${referrer.email}: ${err instanceof Error ? err.message : 'unknown'}`)
      }
    }

    return NextResponse.json({
      ok: true,
      totalReferrers: referrers.length,
      sent,
      failed,
      errors: errors.slice(0, 10),
    })
  } catch (err) {
    console.error('[referral-nudge cron]', err)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}
