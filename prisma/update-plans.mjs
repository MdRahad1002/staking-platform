/**
 * One-time script: replace all staking plans with the new 9-tier funnel.
 *
 * What it does:
 * 1. Deactivates any plan whose name is NOT in the new tier list
 * 2. Upserts all 9 new plans (creates or updates by name)
 *
 * Usage: node prisma/update-plans.mjs
 * Requires DATABASE_URL env var (reads from .env / .env.local automatically via dotenv).
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const NEW_PLANS = [
  {
    name: 'Starter Trial',
    description: 'The perfect entry point. Deposit just $200, earn 1.5% every day for 7 days, and receive your full principal + $21 profit back in one week. No commitment beyond trial period — designed to prove the platform works before you invest more.',
    minAmount: 200,
    maxAmount: 499,
    durationDays: 7,
    dailyRoi: 1.5,
    totalRoi: 10.5,
    isActive: true,
    isFeatured: false,
    sortOrder: 1,
  },
  {
    name: 'Booster Plan',
    description: 'The natural next step after Starter. Our members average an 80% reinvestment rate from Starter → Booster. Earn 1.8%/day for 14 days with daily payouts straight to your balance. $500 in, $626 out.',
    minAmount: 500,
    maxAmount: 999,
    durationDays: 14,
    dailyRoi: 1.8,
    totalRoi: 25.2,
    isActive: true,
    isFeatured: false,
    sortOrder: 2,
  },
  {
    name: 'Growth Yield',
    description: 'Unlock the power of compounding returns. At $1,000+ you cross our algorithmic yield threshold — 2.2%/day for 21 days = 46.2% total. Day-1 Booster investors who reinvest here see their first $1,000+ payday.',
    minAmount: 1000,
    maxAmount: 2499,
    durationDays: 21,
    dailyRoi: 2.2,
    totalRoi: 46.2,
    isActive: true,
    isFeatured: false,
    sortOrder: 3,
  },
  {
    name: 'Momentum',
    description: 'Where serious returns begin. 2.6%/day over 30 days delivers 78% total ROI — enough to turn $2,500 into $4,450. Over 3x the best Bybit or Nexo fixed-term APY. Daily settlements, no lock penalties.',
    minAmount: 2500,
    maxAmount: 4999,
    durationDays: 30,
    dailyRoi: 2.6,
    totalRoi: 78.0,
    isActive: true,
    isFeatured: false,
    sortOrder: 4,
  },
  {
    name: 'Professional',
    description: 'Chosen by over 60% of our repeat investors. 3.0%/day × 30 days = 90% total. Turn $5,000 into $9,500 in one month. Priority queue processing, dedicated account dashboard, and same-day withdrawal approvals.',
    minAmount: 5000,
    maxAmount: 9999,
    durationDays: 30,
    dailyRoi: 3.0,
    totalRoi: 90.0,
    isActive: true,
    isFeatured: true,
    sortOrder: 5,
  },
  {
    name: 'Advanced Vault',
    description: 'Our 45-day advanced yield engine running at 3.3%/day — 148.5% total return. $10,000 in = $24,850 out at maturity. Includes weekly performance reports, loyalty ROI boost (+0.1% on renewal), and VIP chat support.',
    minAmount: 10000,
    maxAmount: 24999,
    durationDays: 45,
    dailyRoi: 3.3,
    totalRoi: 148.5,
    isActive: true,
    isFeatured: true,
    sortOrder: 6,
  },
  {
    name: 'Elite Vault',
    description: 'Reserved for committed wealth-builders. 3.6%/day over 60 days = 216% total ROI. $25,000 becomes $79,000 by maturity. Dedicated relationship manager, instant withdrawals, and exclusive early access to new plans.',
    minAmount: 25000,
    maxAmount: 49999,
    durationDays: 60,
    dailyRoi: 3.6,
    totalRoi: 216.0,
    isActive: true,
    isFeatured: true,
    sortOrder: 7,
  },
  {
    name: 'Black Diamond',
    description: 'The pinnacle of personal staking. 3.9%/day × 90 days = 351% total ROI. $50,000 grows to $225,500 in 90 days. Includes a private liquidity suite, zero withdrawal fees, 24/7 concierge support, and monthly strategy calls.',
    minAmount: 50000,
    maxAmount: 99999,
    durationDays: 90,
    dailyRoi: 3.9,
    totalRoi: 351.0,
    isActive: true,
    isFeatured: true,
    sortOrder: 8,
  },
  {
    name: 'Sovereign',
    description: 'Institutional-grade staking with sovereign-level yields. 4.5%/day × 90 days = 405% total ROI. Minimum $100,000. Includes a dedicated liquidity desk, white-glove onboarding, unlimited withdrawals, tax report generation, and a personal fund manager.',
    minAmount: 100000,
    maxAmount: null,
    durationDays: 90,
    dailyRoi: 4.5,
    totalRoi: 405.0,
    isActive: true,
    isFeatured: true,
    sortOrder: 9,
  },
]

const NEW_PLAN_NAMES = NEW_PLANS.map((p) => p.name)

async function main() {
  console.log('🔄 Updating staking plans...\n')

  // Step 1: Deactivate any plan not in the new list
  const deactivated = await db.stakingPlan.updateMany({
    where: { name: { notIn: NEW_PLAN_NAMES } },
    data: { isActive: false },
  })
  if (deactivated.count > 0) {
    console.log(`⚠️  Deactivated ${deactivated.count} old plan(s) (not deleted — preserves active staking records)`)
  } else {
    console.log('✅ No old plans to deactivate')
  }

  // Step 2: Upsert each new plan by name
  for (const plan of NEW_PLANS) {
    const existing = await db.stakingPlan.findFirst({ where: { name: plan.name } })
    if (existing) {
      await db.stakingPlan.update({
        where: { id: existing.id },
        data: plan,
      })
      console.log(`✏️  Updated: ${plan.name}  ($${plan.minAmount}–${plan.maxAmount ? '$' + plan.maxAmount : '∞'} | ${plan.durationDays}d | ${plan.dailyRoi}%/day)`)
    } else {
      await db.stakingPlan.create({ data: plan })
      console.log(`✅ Created: ${plan.name}  ($${plan.minAmount}–${plan.maxAmount ? '$' + plan.maxAmount : '∞'} | ${plan.durationDays}d | ${plan.dailyRoi}%/day)`)
    }
  }

  console.log('\n🎉 Plans updated successfully!')
  console.log('   Active plans:', NEW_PLAN_NAMES.join(', '))
}

main().catch(console.error).finally(() => db.$disconnect())
