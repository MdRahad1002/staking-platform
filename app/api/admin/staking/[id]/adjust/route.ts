import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  adjustment: z.number().refine((v) => v !== 0, { message: 'Adjustment cannot be zero.' }),
  note: z.string().max(500).optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { adjustment, note } = parsed.data

    const stake = await prisma.stake.findUnique({ where: { id } })
    if (!stake) {
      return NextResponse.json({ error: 'Stake not found.' }, { status: 404 })
    }

    const newTotalEarned = parseFloat((stake.totalEarned + adjustment).toFixed(8))
    if (newTotalEarned < 0) {
      return NextResponse.json({ error: 'Adjustment would make totalEarned negative.' }, { status: 400 })
    }

    // Run all changes atomically
    await prisma.$transaction([
      // Update stake earnings
      prisma.stake.update({
        where: { id },
        data: { totalEarned: newTotalEarned },
      }),
      // Adjust user balance by the same delta
      prisma.user.update({
        where: { id: stake.userId },
        data: { balance: { increment: adjustment } },
      }),
      // Create StakePayment record for accounting
      prisma.stakePayment.create({
        data: {
          stakeId: id,
          amount: adjustment,
        },
      }),
      // Create Transaction for audit trail
      prisma.transaction.create({
        data: {
          userId: stake.userId,
          type: 'ADMIN_EARNING_ADJUSTMENT',
          amount: adjustment,
          currency: stake.currency,
          status: 'COMPLETED',
          description: note
            ? `Admin earning adjustment: ${note}`
            : 'Admin earning adjustment',
          referenceId: id,
        },
      }),
    ])

    return NextResponse.json({
      message: 'Earnings adjusted successfully.',
      stakeId: id,
      adjustment,
      newTotalEarned,
    })
  } catch (err) {
    console.error('[admin/staking/adjust]', err)
    return NextResponse.json({ error: 'Unauthorized or server error.' }, { status: 500 })
  }
}
