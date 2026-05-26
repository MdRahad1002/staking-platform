/**
 * refund-failed-orders.mjs
 *
 * Fixes balances for users who had money deducted by failed trade orders
 * (the bug: balance was decremented before DB transaction, so failed orders
 * leaked money without creating any TradePosition or Transaction record).
 *
 * Usage:
 *   node prisma/refund-failed-orders.mjs
 *
 * Requires DATABASE_URL in environment (set in .env or Vercel env).
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Get all users that have any TradePosition or TRADE_OPEN transaction
  // (i.e., they used the trading feature and might be affected)
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { tradePositions: { some: {} } },
        { transactions: { some: { type: 'TRADE_OPEN' } } },
      ],
    },
    include: {
      tradePositions: { select: { margin: true, status: true } },
      transactions: {
        where: { type: { in: ['TRADE_OPEN', 'TRADE_CLOSE'] } },
        select: { type: true, amount: true },
      },
    },
  })

  console.log(`\nChecking ${users.length} user(s) who used trading...\n`)

  for (const user of users) {
    // Sum of TRADE_OPEN transaction amounts (stored as negative in DB)
    // These represent SUCCESSFUL order placements (both created a Position AND a Transaction)
    const tradeOpenTxSum = user.transactions
      .filter((t) => t.type === 'TRADE_OPEN')
      .reduce((sum, t) => sum + Number(t.amount), 0) // e.g. -46.88 for $46.88 order

    const tradeCloseTxSum = user.transactions
      .filter((t) => t.type === 'TRADE_CLOSE')
      .reduce((sum, t) => sum + Number(t.amount), 0) // positive: returned to balance

    // Total legitimately deducted via successful orders
    const legitimateDeductions = Math.abs(tradeOpenTxSum) // e.g. 46.88

    // Total margin in positions (should match legitimateDeductions if DB is consistent)
    const openMargin = user.tradePositions
      .filter((p) => p.status === 'OPEN')
      .reduce((sum, p) => sum + Number(p.margin), 0)
    const closedMargin = user.tradePositions
      .filter((p) => p.status === 'CLOSED')
      .reduce((sum, p) => sum + Number(p.margin), 0)
    const totalPositionMargin = openMargin + closedMargin

    // If legitimateDeductions !== totalPositionMargin, there's a data inconsistency
    const positionVsTxDiff = Math.abs(totalPositionMargin - legitimateDeductions)

    // The discrepancy = how much was deducted from balance for FAILED orders
    // (balance was decremented but no Position/Order/Transaction was created)
    // We can't compute this directly without knowing original balance,
    // but we know: correct_balance_effect = tradeOpenTxSum + tradeCloseTxSum
    // The actual balance effect from trading = original_trading_balance - current_balance
    // discrepancy = actual_effect - correct_effect
    //             = (orig - current) - (abs(tradeOpenTxSum) - tradeCloseTxSum)
    // Without orig, we flag users where positionVsTxDiff shows inconsistency
    // OR where we can compute from known original balance

    console.log(`User: ${user.email} (${user.id})`)
    console.log(`  Current balance:         $${Number(user.balance).toFixed(2)}`)
    console.log(`  TRADE_OPEN tx total:     -$${legitimateDeductions.toFixed(2)}`)
    console.log(`  TRADE_CLOSE tx total:    +$${tradeCloseTxSum.toFixed(2)}`)
    console.log(`  Open position margins:   $${openMargin.toFixed(2)}`)
    console.log(`  Closed position margins: $${closedMargin.toFixed(2)}`)
    console.log(`  Position vs tx diff:     $${positionVsTxDiff.toFixed(2)}`)
  }

  console.log('\n--- REFUND CALCULATION ---')
  console.log('The script needs the original balance before trading started.')
  console.log('Set ORIGINAL_BALANCE and USER_EMAIL below and re-run to apply refund.\n')

  // ── Apply refund for a specific user ──────────────────────────────────────
  // Set these values and uncomment the block below to apply the refund:

  const USER_EMAIL = 'mario@gmail.com'
  const ORIGINAL_BALANCE = 500 // balance before any trading activity

  const targetUser = users.find((u) => u.email === USER_EMAIL)
  if (!targetUser) {
    console.log(`User ${USER_EMAIL} not found or has no trading activity.`)
    await prisma.$disconnect()
    return
  }

  const tradeOpenTxSum = targetUser.transactions
    .filter((t) => t.type === 'TRADE_OPEN')
    .reduce((sum, t) => sum + Number(t.amount), 0)
  const tradeCloseTxSum = targetUser.transactions
    .filter((t) => t.type === 'TRADE_CLOSE')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  // What the balance SHOULD be:
  // original - legit deductions (from TRADE_OPEN txs, negative) + legit returns (TRADE_CLOSE txs, positive)
  // = ORIGINAL_BALANCE + tradeOpenTxSum + tradeCloseTxSum
  // (tradeOpenTxSum is already negative, so this subtracts correctly)
  const expectedBalance = ORIGINAL_BALANCE + tradeOpenTxSum + tradeCloseTxSum
  const actualBalance = Number(targetUser.balance)
  const refundAmount = parseFloat((expectedBalance - actualBalance).toFixed(2))

  console.log(`\nRefund calculation for ${USER_EMAIL}:`)
  console.log(`  Original balance:  $${ORIGINAL_BALANCE.toFixed(2)}`)
  console.log(`  Legit deductions:  -$${Math.abs(tradeOpenTxSum).toFixed(2)}`)
  console.log(`  Returns from close: +$${tradeCloseTxSum.toFixed(2)}`)
  console.log(`  Expected balance:  $${expectedBalance.toFixed(2)}`)
  console.log(`  Actual balance:    $${actualBalance.toFixed(2)}`)
  console.log(`  Refund to apply:   $${refundAmount.toFixed(2)}`)

  if (refundAmount <= 0) {
    console.log('\nNo refund needed balance is already correct.')
    await prisma.$disconnect()
    return
  }

  // Apply refund atomically
  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUser.id },
      data: { balance: { increment: refundAmount } },
    }),
    prisma.transaction.create({
      data: {
        userId: targetUser.id,
        type: 'DEPOSIT',
        amount: refundAmount,
        status: 'COMPLETED',
        description: `Refund: balance correction for failed trade orders (bug fix)`,
      },
    }),
  ])

  console.log(`\n✓ Refund of $${refundAmount.toFixed(2)} applied to ${USER_EMAIL}`)
  console.log(`  New balance: $${(actualBalance + refundAmount).toFixed(2)}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
