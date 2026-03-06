import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import AdminKycClient from './AdminKycClient'

export const dynamic = 'force-dynamic'

export default async function AdminKycPage() {
  await requireAdmin()

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

  return <AdminKycClient submissions={submissions} />
}
