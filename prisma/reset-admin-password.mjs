/**
 * Reset admin password. Run once then delete.
 * Usage:  node prisma/reset-admin-password.mjs
 *
 * Set NEW_PASSWORD below before running.
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const NEW_PASSWORD = 'ChangeMe123!' // <-- set your new password here

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash(NEW_PASSWORD, 12)

  const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } })

  if (admins.length === 0) {
    console.log('No ADMIN users found.')
    return
  }

  for (const admin of admins) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hash },
    })
    console.log(`Password reset for: ${admin.email}`)
  }

  console.log('Done. Delete this file after use.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
