import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()
const plans = await db.stakingPlan.findMany({ orderBy: [{ isActive: 'desc' }, { minAmount: 'asc' }] })
plans.forEach(p => console.log(p.isActive ? 'ACTIVE  ' : 'inactive', `sort=${p.sortOrder}`, p.name.padEnd(20), `$${p.minAmount}`))
console.log('\nTotal:', plans.length, '| Active:', plans.filter(p=>p.isActive).length, '| Inactive:', plans.filter(p=>!p.isActive).length)
await db.$disconnect()
