import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyIpnSignature, isPaymentConfirmed, isPaymentFailed } from '@/lib/nowpayments'
import { sendDepositConfirmedEmail } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()

    // Verify NOWPayments IPN signature (HMAC-SHA512 with recursive key sort)
    const sig = req.headers.get('x-nowpayments-sig') || ''
    if (!verifyIpnSignature(body, sig)) {
      console.warn('[DEPOSIT_WEBHOOK] Invalid signature — rejected')
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const {
      payment_id,
      parent_payment_id,  // set on re-deposits — do NOT auto-credit per NowPayments docs
      payment_status,
      order_id,           // our deposit.id
      actually_paid,
      pay_amount,
      pay_currency,
      price_amount,
    } = payload

    if (!order_id && !payment_id) {
      return NextResponse.json({ error: 'Missing identifiers.' }, { status: 400 })
    }

    // Re-deposits: parent_payment_id is set when the same address receives extra funds.
    // Per NowPayments docs: do NOT automatically credit — risk of underpayment.
    if (parent_payment_id) {
      console.warn(
        '[DEPOSIT_WEBHOOK] Re-deposit received — skipping auto-credit.',
        { payment_id, parent_payment_id, order_id, payment_status, actually_paid }
      )
      return NextResponse.json({ success: true })
    }

    // Look up deposit by order_id (our deposit.id) or by stored paymentId
    const deposit = await prisma.deposit.findFirst({
      where: order_id
        ? { id: order_id }
        : { paymentId: String(payment_id) },
      include: { user: true, currency: true },
    })

    if (!deposit) {
      console.warn('[DEPOSIT_WEBHOOK] Deposit not found', { order_id, payment_id })
      return NextResponse.json({ error: 'Deposit not found.' }, { status: 404 })
    }

    if (deposit.status === 'CONFIRMED' || deposit.status === 'FAILED') {
      // Already in terminal state — acknowledge silently
      return NextResponse.json({ success: true })
    }

    if (isPaymentConfirmed(payment_status)) {
      const usdAmount = deposit.amountUsd ?? price_amount ?? deposit.amount
      const cryptoAmount = actually_paid || pay_amount || 0

      await prisma.$transaction(async (tx) => {
        const updated = await tx.deposit.updateMany({
          where: { id: deposit.id, status: { notIn: ['CONFIRMED'] } },
          data: {
            status: 'CONFIRMED',
            amount: usdAmount,
            payAmount: cryptoAmount,
            payCurrency: pay_currency,
            confirmations: 3,
            confirmedAt: new Date(),
          },
        })
        if (updated.count === 0) return

        await tx.user.update({
          where: { id: deposit.userId },
          data: { balance: { increment: usdAmount } },
        })

        await tx.transaction.create({
          data: {
            userId: deposit.userId,
            type: 'DEPOSIT',
            amount: usdAmount,
            status: 'COMPLETED',
            description: `Deposit: ${cryptoAmount} ${(pay_currency ?? '').toUpperCase()} (~$${usdAmount} USD)`,
            referenceId: deposit.id,
          },
        })

        await tx.notification.create({
          data: {
            userId: deposit.userId,
            type: 'DEPOSIT',
            title: 'Deposit Confirmed',
            message: `Your deposit of $${usdAmount} USD has been confirmed.`,
          },
        })
      })

      sendDepositConfirmedEmail(
        deposit.user.email,
        deposit.amountUsd ?? price_amount ?? 0,
        (pay_currency ?? '').toUpperCase()
      ).catch(console.error)

    } else if (isPaymentFailed(payment_status)) {
      await prisma.deposit.update({
        where: { id: deposit.id },
        data: { status: 'FAILED' },
      })
    } else if (payment_status === 'partially_paid') {
      // Update the amount paid so far but don't credit balance yet
      await prisma.deposit.update({
        where: { id: deposit.id },
        data: {
          status: 'PARTIALLY_PAID',
          payAmount: actually_paid || pay_amount || deposit.payAmount,
        },
      })
    } else {
      // Intermediate states (waiting, confirming, sending…) — update payAmount only
      await prisma.deposit.update({
        where: { id: deposit.id },
        data: {
          payAmount: actually_paid || pay_amount || deposit.payAmount,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DEPOSIT_WEBHOOK]', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

