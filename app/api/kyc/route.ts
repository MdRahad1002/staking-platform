import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const submitSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().min(8),
  country: z.string().min(2).max(100),
  documentType: z.enum(['PASSPORT', 'NATIONAL_ID', 'DRIVERS_LICENSE']),
  documentNumber: z.string().min(3).max(100),
  frontImage: z.string().min(100),   // base64 data URI
  backImage: z.string().optional(),  // base64 data URI (optional for passport)
  selfieImage: z.string().min(100),  // base64 data URI
})

// GET /api/kyc — fetch own KYC status
export async function GET() {
  try {
    const session = await requireAuth()
    const kyc = await prisma.kycSubmission.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        status: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        country: true,
        documentType: true,
        documentNumber: true,
        rejectionReason: true,
        createdAt: true,
        updatedAt: true,
        reviewedAt: true,
      },
    })
    return NextResponse.json({ data: kyc })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// POST /api/kyc — submit KYC
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await req.json()
    const parsed = submitSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    // Validate base64 image size (max ~5MB each = ~6.7MB base64)
    const maxBase64Len = 7_000_000
    if (parsed.data.frontImage.length > maxBase64Len) {
      return NextResponse.json({ error: 'Front image too large. Max 5MB.' }, { status: 400 })
    }
    if (parsed.data.backImage && parsed.data.backImage.length > maxBase64Len) {
      return NextResponse.json({ error: 'Back image too large. Max 5MB.' }, { status: 400 })
    }
    if (parsed.data.selfieImage.length > maxBase64Len) {
      return NextResponse.json({ error: 'Selfie image too large. Max 5MB.' }, { status: 400 })
    }

    // Check existing KYC
    const existing = await prisma.kycSubmission.findUnique({
      where: { userId: session.user.id },
    })

    if (existing?.status === 'APPROVED') {
      return NextResponse.json({ error: 'Your KYC is already approved.' }, { status: 400 })
    }
    if (existing?.status === 'PENDING') {
      return NextResponse.json({ error: 'Your KYC is already under review.' }, { status: 400 })
    }

    const kyc = existing
      ? await prisma.kycSubmission.update({
          where: { userId: session.user.id },
          data: {
            ...parsed.data,
            status: 'PENDING',
            rejectionReason: null,
            reviewedById: null,
            reviewedAt: null,
          },
        })
      : await prisma.kycSubmission.create({
          data: { userId: session.user.id, ...parsed.data },
        })

    // Notify admin via notification (optional)
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'KYC',
        title: 'KYC Submitted',
        message: 'Your identity verification documents have been submitted and are under review. You will be notified within 24–48 hours.',
        link: '/settings/kyc',
      },
    }).catch(() => {})

    return NextResponse.json({ data: { id: kyc.id, status: kyc.status } }, { status: 201 })
  } catch (err) {
    console.error('[KYC_SUBMIT]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
