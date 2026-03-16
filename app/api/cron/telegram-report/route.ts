import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendTelegramMessage } from '@/lib/telegram'

// Protect with CRON_SECRET — same pattern as other cron routes
function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const cronSecret = (process.env.CRON_SECRET || '').trim()
  if (!cronSecret) return false
  return auth === `Bearer ${cronSecret}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const now = new Date()
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  try {
    // ── Gather today's stats in parallel ────────────────────────────────────
    const [
      totalUsers,
      newUsersToday,
      activeStakes,
      newStakesToday,
      totalStakedResult,
      depositsToday,
      withdrawalsToday,
      pendingWithdrawals,
      profitsPaidToday,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where: { role: 'USER', createdAt: { gte: startOfToday } } }),
      prisma.stake.count({ where: { status: 'ACTIVE' } }),
      prisma.stake.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.stake.aggregate({ where: { status: 'ACTIVE' }, _sum: { amount: true } }),
      prisma.deposit.aggregate({
        where: { status: 'CONFIRMED', createdAt: { gte: startOfToday } },
        _sum: { amountUsd: true },
        _count: true,
      }),
      prisma.withdrawal.aggregate({
        where: {
          status: 'APPROVED',
          processedAt: { gte: startOfToday },
        },
        _sum: { amountUsd: true },
        _count: true,
      }),
      prisma.withdrawal.count({ where: { status: 'PENDING' } }),
      prisma.stakePayment.aggregate({
        where: { date: { gte: startOfToday } },
        _sum: { amount: true },
        _count: true,
      }),
    ])

    const fmt = (n: number | null | undefined) =>
      `$${(n ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const message = [
      `📊 <b>Daily Platform Report</b>`,
      `📅 ${dateStr}`,
      ``,
      `👥 <b>Users</b>`,
      `  • Total users: <b>${totalUsers.toLocaleString()}</b>`,
      `  • New today: <b>+${newUsersToday}</b>`,
      ``,
      `🏦 <b>Staking</b>`,
      `  • Active stakes: <b>${activeStakes.toLocaleString()}</b>`,
      `  • New today: <b>+${newStakesToday}</b>`,
      `  • Total staked: <b>${fmt(totalStakedResult._sum.amount)}</b>`,
      ``,
      `💰 <b>Deposits (today)</b>`,
      `  • Count: <b>${depositsToday._count}</b>`,
      `  • Volume: <b>${fmt(depositsToday._sum.amountUsd)}</b>`,
      ``,
      `💸 <b>Withdrawals (today)</b>`,
      `  • Processed: <b>${withdrawalsToday._count}</b>  (${fmt(withdrawalsToday._sum.amountUsd)})`,
      `  • Pending approval: <b>${pendingWithdrawals}</b>`,
      ``,
      `🎁 <b>Profits paid (today)</b>`,
      `  • Payments: <b>${profitsPaidToday._count}</b>`,
      `  • Total: <b>${fmt(profitsPaidToday._sum.amount)}</b>`,
      ``,
      `⏰ Generated at ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC`,
    ].join('\n')

    const sent = await sendTelegramMessage(message)

    return NextResponse.json({
      success: true,
      telegramSent: sent,
      stats: {
        totalUsers,
        newUsersToday,
        activeStakes,
        newStakesToday,
        totalStaked: totalStakedResult._sum.amount ?? 0,
        depositsToday: { count: depositsToday._count, volume: depositsToday._sum.amountUsd ?? 0 },
        withdrawalsToday: { count: withdrawalsToday._count, volume: withdrawalsToday._sum.amountUsd ?? 0 },
        pendingWithdrawals,
        profitsPaidToday: { count: profitsPaidToday._count, total: profitsPaidToday._sum.amount ?? 0 },
      },
    })
  } catch (error) {
    console.error('[CRON TELEGRAM REPORT]', error)
    return NextResponse.json({ error: 'Failed to generate report.' }, { status: 500 })
  }
}
