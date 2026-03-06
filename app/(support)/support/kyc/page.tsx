import { prisma } from '@/lib/db'
import { requireSupport } from '@/lib/auth-helpers'
import AdminKycClient from '@/app/(admin)/admin/kyc/AdminKycClient'

export const dynamic = 'force-dynamic'

export default async function SupportKycPage() {
  await requireSupport()

  const submissions = await prisma.kycSubmission.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    include: {
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
