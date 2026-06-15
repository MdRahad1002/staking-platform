import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Protect with a secret so only authorized callers (Vercel Cron, server job, etc.) can trigger this
function isAuthorized(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const cronSecret = (process.env.CRON_SECRET || '').trim()
  if (!cronSecret) return false
  return auth === `Bearer ${cronSecret}`
}

/** Best-effort server-side spot price for a Binance symbol (used for Protected Staking bonus). */
async function fetchBinancePrice(symbol: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    const price = parseFloat(data?.price)
    return Number.isFinite(price) ? price : null
  } catch {
    return null
  }
}

const round2 = (n: number) => parseFloat(n.toFixed(2))

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

    // Pre-load Autopilot settings for every involved user (one query, not N)
    const userIds = [...new Set(stakes.map((s) => s.userId))]
    const autopilotRows = userIds.length
      ? await prisma.autopilotSetting.findMany({ where: { userId: { in: userIds } } })
      : []
    const autopilotByUser = new Map(autopilotRows.map((a) => [a.userId, a]))

    let processed = 0
    let completed = 0
    let compoundedRuns = 0
    let bonusesPaid = 0
    const errors: string[] = []

    for (const stake of stakes) {
      try {
        // Calculate how many daily periods have been missed
        const msPerDay = 24 * 60 * 60 * 1000
        const missedDays = Math.max(1, Math.floor((now.getTime() - stake.nextProcessAt!.getTime()) / msPerDay) + 1)

        const dailyProfit = round2((stake.amount * stake.dailyRoi) / 100)
        const totalProfit = round2(dailyProfit * missedDays)
        const isLastPayment = stake.endDate <= now
        const newTotalEarned = round2(stake.totalEarned + totalProfit)

        // ── Staking Autopilot: split this reward between reinvest (compound) and cash ──
        const autopilot = autopilotByUser.get(stake.userId)
        let compoundPct = 0
        if (!isLastPayment && autopilot) {
          if (autopilot.mode === 'COMPOUND') compoundPct = 100
          else if (autopilot.mode === 'SPLIT') compoundPct = Math.min(100, Math.max(0, autopilot.compoundPercent))
        }
        const compoundPart = round2((totalProfit * compoundPct) / 100)
        const cashPart = round2(totalProfit - compoundPart)

        // ── Protected Staking: principal-protected, market-linked bonus at maturity ──
        let bonus = 0
        if (isLastPayment && stake.isProtected && stake.refSymbol && stake.refStartPrice && stake.refStartPrice > 0) {
          const curPrice = await fetchBinancePrice(stake.refSymbol)
          if (curPrice && curPrice > 0) {
            const upside = Math.max(0, (curPrice - stake.refStartPrice) / stake.refStartPrice)
            bonus = round2(stake.amount * upside * (stake.protectionParticipation / 100))
          }
        }

        await prisma.$transaction(async (tx) => {
          // Record one payment entry per missed day (gross daily reward, for history + proof)
          for (let d = 0; d < missedDays; d++) {
            const payDate = new Date(stake.nextProcessAt!.getTime() + d * msPerDay)
            await tx.stakePayment.create({
              data: { stakeId: stake.id, amount: dailyProfit, date: payDate },
            })
          }

          // Update stake (compound reinvested rewards into principal when applicable)
          if (isLastPayment) {
            await tx.stake.update({
              where: { id: stake.id },
              data: {
                totalEarned: newTotalEarned,
                status: 'COMPLETED',
                lastProcessed: now,
                nextProcessAt: null,
                bonusPaid: bonus,
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
                ...(compoundPart > 0
                  ? { amount: { increment: compoundPart }, compoundedAmount: { increment: compoundPart } }
                  : {}),
              },
            })
            if (compoundPart > 0) compoundedRuns++
          }

          // Credit user balance:
          //  - cash portion of the reward (compounded portion stays in the stake)
          //  - principal returned on completion (already includes prior compounded amounts)
          //  - market-linked bonus on completion
          const credit = isLastPayment
            ? round2(cashPart + stake.amount + bonus)
            : cashPart
          if (credit > 0) {
            await tx.user.update({
              where: { id: stake.userId },
              data: { balance: { increment: credit } },
            })
          }

          // Transaction ledger entry for the reward
          await tx.transaction.create({
            data: {
              userId: stake.userId,
              type: 'STAKING_RETURN',
              amount: totalProfit,
              status: 'COMPLETED',
              description: compoundPart > 0
                ? `Daily ROI from ${stake.plan.name} (${round2(compoundPart)} reinvested via Autopilot)`
                : missedDays > 1
                  ? `Daily ROI from ${stake.plan.name} (${missedDays} days catch-up)`
                  : `Daily ROI from ${stake.plan.name}`,
              referenceId: stake.id,
            },
          })

          if (isLastPayment) {
            // Principal return ledger entry
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

            // Protected Staking bonus ledger entry + notification
            if (bonus > 0) {
              await tx.transaction.create({
                data: {
                  userId: stake.userId,
                  type: 'STAKING_BONUS',
                  amount: bonus,
                  status: 'COMPLETED',
                  description: `Protected Staking market bonus (${stake.refSymbol?.replace('USDT', '')} upside)`,
                  referenceId: stake.id,
                },
              })
              bonusesPaid++
            }

            await tx.notification.create({
              data: {
                userId: stake.userId,
                type: 'STAKING',
                title: 'Stake Completed',
                message: bonus > 0
                  ? `Your stake in ${stake.plan.name} has matured. Total earned: $${newTotalEarned.toFixed(2)} + $${bonus.toFixed(2)} market bonus.`
                  : `Your stake in ${stake.plan.name} has matured. Total earned: $${newTotalEarned.toFixed(2)}.`,
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

    return NextResponse.json({ processed, completed, compoundedRuns, bonusesPaid, errors, timestamp: now.toISOString() })
  } catch (error) {
    console.error('[CRON_PROCESS_STAKES]', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// Also support GET for Vercel Cron (which sends GET by default)
export async function GET(req: NextRequest) {
  return POST(req)
}
