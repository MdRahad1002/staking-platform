import { NextResponse } from 'next/server'
import { requireSupport } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

// GET /api/admin/kyc — list all submissions (admin + worker + support)
export async function GET() {
  try {
    await requireSupport()
    const submissions = await prisma.kycSubmission.findMany({
      orderBy: { createdAt: 'desc' },
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
        reviewedAt: true,
        reviewedById: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })
    return NextResponse.json({ data: submissions })
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
}
