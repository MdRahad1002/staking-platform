/**
 * Hard-delete all inactive (old) staking plans IF no stakes reference them.
 * Plans that still have stake records will remain (deactivated) to preserve history.
 */
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {
  const inactive = await db.stakingPlan.findMany({ where: { isActive: false } })
  console.log(`Found ${inactive.length} inactive plan(s) to evaluate...\n`)

  let deleted = 0
  let skipped = 0

  for (const plan of inactive) {
    const stakeCount = await db.stake.count({ where: { planId: plan.id } })
    if (stakeCount === 0) {
      await db.stakingPlan.delete({ where: { id: plan.id } })
      console.log(`🗑️  Deleted:  ${plan.name}`)
      deleted++
    } else {
      console.log(`⚠️  Kept (${stakeCount} stake record${stakeCount > 1 ? 's' : ''}): ${plan.name}`)
      skipped++
    }
  }

  console.log(`\n✅ Done deleted ${deleted}, kept ${skipped} (has stake history)`)

  const remaining = await db.stakingPlan.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })
  console.log('\nActive plans now in DB:')
  remaining.forEach((p, i) => console.log(`  ${i + 1}. ${p.name} ($${p.minAmount}–${p.maxAmount ?? '∞'} | ${p.durationDays}d | ${p.dailyRoi}%/day)`))
}

main().catch(console.error).finally(() => db.$disconnect())
