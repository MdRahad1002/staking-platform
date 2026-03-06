import { prisma } from '@/lib/db'
import { requireSupport } from '@/lib/auth-helpers'
import AdminKycClient from '@/app/(admin)/admin/kyc/AdminKycClient'

export const dynamic = 'force-dynamic'

export default async function SupportKycPage() {
  await requireSupport()

  const submissions = await prisma.kycSubmission.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
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

  // Support can only view KYC, not approve/reject
  return <AdminKycClient submissions={submissions} readOnly />
}
