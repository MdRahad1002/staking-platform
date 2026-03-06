import { NextRequest, NextResponse } from 'next/server'
import { requireWorker, requireSupport } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const actionSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT']),
  rejectionReason: z.string().min(5).max(500).optional(),
})

// GET /api/admin/kyc/[id] — view single submission including document images
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSupport()
    const { id } = await params
    const kyc = await prisma.kycSubmission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
        },
      },
    })
    if (!kyc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: kyc })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}

// PATCH /api/admin/kyc/[id] — approve or reject (worker + admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireWorker()
    const { id } = await params
    const body = await req.json()
    const parsed = actionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }
    const { action, rejectionReason } = parsed.data

    if (action === 'REJECT' && !rejectionReason) {
      return NextResponse.json({ error: 'Rejection reason is required.' }, { status: 400 })
    }

    const existing = await prisma.kycSubmission.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'KYC not found.' }, { status: 404 })
    if (existing.status !== 'PENDING') {
      return NextResponse.json({ error: 'Only PENDING submissions can be reviewed.' }, { status: 400 })
    }

    const updated = await prisma.kycSubmission.update({
      where: { id },
      data: {
        status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        rejectionReason: action === 'REJECT' ? rejectionReason : null,
        reviewedById: session.user.id,
        reviewedAt: new Date(),
      },
    })

    // Notify the user
    const notifMsg = action === 'APPROVE'
      ? 'Your identity has been verified successfully. You can now make withdrawals.'
      : `Your KYC was rejected: ${rejectionReason}. Please resubmit with correct documents.`

    await prisma.notification.create({
      data: {
        userId: existing.userId,
        type: 'KYC',
        title: action === 'APPROVE' ? '✅ KYC Approved' : '❌ KYC Rejected',
        message: notifMsg,
        link: '/settings/kyc',
      },
    }).catch(() => {})

    return NextResponse.json({ data: { id: updated.id, status: updated.status } })
  } catch (err) {
    console.error('[KYC_REVIEW]', err)
    return NextResponse.json({ error: 'Forbidden or internal error.' }, { status: 403 })
  }
}
