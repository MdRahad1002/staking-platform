import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

/**
 * POST /api/admin/refund-failed-orders
 *
 * One-time fix: refunds users whose balance was incorrectly deducted by
 * failed trade orders (bug where balance was decremented outside a DB transaction,
 * so a server error would leave balance deducted with no Position/Order/Transaction created).
 *
 * Body: { userEmail: string, originalBalance: number }
 * - originalBalance: the balance the user had BEFORE any trading activity
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin()

    const { userEmail, originalBalance } = await req.json()
    if (!userEmail || typeof originalBalance !== 'number' || originalBalance < 0) {
      return NextResponse.json({ error: 'userEmail and originalBalance (number) are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        transactions: {
          where: { type: { in: ['TRADE_OPEN', 'TRADE_CLOSE'] } },
          select: { type: true, amount: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tradeOpenSum = user.transactions
      .filter((t) => t.type === 'TRADE_OPEN')
      .reduce((sum, t) => sum + Number(t.amount), 0) // stored as negative

    const tradeCloseSum = user.transactions
      .filter((t) => t.type === 'TRADE_CLOSE')
      .reduce((sum, t) => sum + Number(t.amount), 0) // stored as positive

    const expectedBalance = originalBalance + tradeOpenSum + tradeCloseSum
    const actualBalance = Number(user.balance)
    const refundAmount = parseFloat((expectedBalance - actualBalance).toFixed(2))

    const report = {
      user: { id: user.id, email: user.email },
      originalBalance,
      legitimateDeductions: Math.abs(tradeOpenSum),
      returnsFromClose: tradeCloseSum,
      expectedBalance,
      actualBalance,
      refundAmount,
    }

    if (refundAmount <= 0) {
      return NextResponse.json({ message: 'No refund needed balance is already correct.', report })
    }

    // Apply refund atomically
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { balance: { increment: refundAmount } },
      }),
      prisma.transaction.create({
        data: {
          userId: user.id,
          type: 'DEPOSIT',
          amount: refundAmount,
          status: 'COMPLETED',
          description: `Refund: balance correction for failed trade orders (bug fix)`,
        },
      }),
    ])

    return NextResponse.json({
      message: `Refund of $${refundAmount.toFixed(2)} applied successfully.`,
      newBalance: actualBalance + refundAmount,
      report,
    })
  } catch (error) {
    console.error('[REFUND_FAILED_ORDERS]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
