import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { sendReferralNudgeEmail } from '@/lib/mail'

export async function POST() {
  try {
    await requireAdmin()

    const appUrl = (process.env.NEXTAUTH_URL || 'https://www.stakeonix.com').replace(/\/$/, '')

    const commissionSetting = await prisma.siteSetting.findUnique({
      where: { key: 'referral_bonus_percent' },
    })
    const commissionRate = commissionSetting ? parseFloat(commissionSetting.value) : 5

    const referrers = await prisma.user.findMany({
      where: {
        isActive: true,
        NOT: { referralCode: null },
        referredUsers: {
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
        referredUsers: {
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
        const inactiveCount = referrer.referredUsers.length
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
    const msg = err instanceof Error ? err.message : 'Unauthorized'
    return NextResponse.json({ error: msg }, { status: 401 })
  }
}
