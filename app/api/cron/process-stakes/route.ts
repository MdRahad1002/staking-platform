import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Protect with a secret so only authorized callers (Vercel Cron, server job, etc.) can trigger this
function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const cronSecret = (process.env.CRON_SECRET || '').trim()
  if (!cronSecret) return false
  return auth === `Bearer ${cronSecret}`
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const now = new Date()

  try {
    // Find all ACTIVE stakes whose nextProcessAt is due
    const stakes = await prisma.stake.findMany({
      where: {
        status: 'ACTIVE',
        nextProcessAt: { lte: now },
      },
      include: { plan: true },
    })

    let processed = 0
    let completed = 0
    const errors: string[] = []

    for (const stake of stakes) {
      try {
        // Calculate how many daily periods have been missed
        const msPerDay = 24 * 60 * 60 * 1000
        const missedDays = Math.max(1, Math.floor((now.getTime() - stake.nextProcessAt!.getTime()) / msPerDay) + 1)

        const dailyProfit = parseFloat(((stake.amount * stake.dailyRoi) / 100).toFixed(2))
        const totalProfit = parseFloat((dailyProfit * missedDays).toFixed(2))
        const isLastPayment = stake.endDate <= now
        const newTotalEarned = parseFloat((stake.totalEarned + totalProfit).toFixed(2))

      await prisma.$transaction(async (tx) => {
        // Record one payment entry per missed day
        for (let d = 0; d < missedDays; d++) {
          const payDate = new Date(stake.nextProcessAt!.getTime() + d * msPerDay)
          await tx.stakePayment.create({
            data: { stakeId: stake.id, amount: dailyProfit, date: payDate },
          })
        }

        // Update stake
        if (isLastPayment) {
          await tx.stake.update({
            where: { id: stake.id },
            data: {
              totalEarned: newTotalEarned,
              status: 'COMPLETED',
              lastProcessed: now,
              nextProcessAt: null,
            },
          })
          completed++
        } else {
          const nextProcessAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
          await tx.stake.update({
            where: { id: stake.id },
            data: {
              totalEarned: newTotalEarned,
              lastProcessed: now,
              nextProcessAt,
            },
          })
        }

        // Credit user balance with all missed profits at once,
        // and return principal when the stake is completed
        await tx.user.update({
          where: { id: stake.userId },
          data: { balance: { increment: isLastPayment ? parseFloat((totalProfit + stake.amount).toFixed(2)) : totalProfit } },
        })

        // Transaction ledger entry
        await tx.transaction.create({
          data: {
            userId: stake.userId,
            type: 'STAKING_RETURN',
            amount: totalProfit,
            status: 'COMPLETED',
            description: missedDays > 1
              ? `Daily ROI from ${stake.plan.name} (${missedDays} days catch-up)`
              : `Daily ROI from ${stake.plan.name}`,
            referenceId: stake.id,
          },
        })

        // Record principal return as a separate ledger entry on completion
        if (isLastPayment) {
          await tx.transaction.create({
            data: {
              userId: stake.userId,
              type: 'STAKING_RETURN',
              amount: stake.amount,
              status: 'COMPLETED',
              description: `Principal returned from ${stake.plan.name}`,
              referenceId: stake.id,
            },
          })
        }

        // Notify on completion only
        if (isLastPayment) {
          await tx.notification.create({
            data: {
              userId: stake.userId,
              type: 'STAKING',
              title: 'Stake Completed',
              message: `Your stake in ${stake.plan.name} has matured. Total earned: $${newTotalEarned.toFixed(2)}.`,
            },
          })
        }
      })

      processed++
      } catch (stakeError) {
        console.error(`[CRON_PROCESS_STAKES] Failed to process stake ${stake.id}:`, stakeError)
        errors.push(stake.id)
      }
    }

    return NextResponse.json({ processed, completed, errors, timestamp: now.toISOString() })
  } catch (error) {
    console.error('[CRON_PROCESS_STAKES]', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// Also support GET for Vercel Cron (which sends GET by default)
export async function GET(req: NextRequest) {
  return POST(req)
}
