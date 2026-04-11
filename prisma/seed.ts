import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Admin user ────────────────────────────────────────────────────────────
  const rawAdminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!rawAdminPassword) throw new Error('SEED_ADMIN_PASSWORD env var is required')
  const adminPassword = await bcrypt.hash(rawAdminPassword, 12)
  let admin = await db.user.findFirst({ where: { email: 'admin@stakeplatform.com' } })
  if (!admin) {
    admin = await db.user.create({
      data: {
        email: 'admin@stakeplatform.com',
        username: 'admin',
        firstName: 'Super',
        lastName: 'Admin',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: new Date(),
        referralCode: 'ADMIN001',
      }
    })
  }
  console.log('✅ Admin user:', admin.email)

  // ─── Worker user ───────────────────────────────────────────────────────────
  const rawWorkerPassword = process.env.SEED_WORKER_PASSWORD
  if (!rawWorkerPassword) throw new Error('SEED_WORKER_PASSWORD env var is required')
  const workerPassword = await bcrypt.hash(rawWorkerPassword, 12)
  let worker = await db.user.findFirst({ where: { email: 'worker@stakeplatform.com' } })
  if (!worker) {
    worker = await db.user.create({
      data: {
        email: 'worker@stakeplatform.com',
        username: 'worker1',
        firstName: 'Worker',
        lastName: 'User',
        password: workerPassword,
        role: 'WORKER',
        isActive: true,
        emailVerified: new Date(),
        referralCode: 'WORKER01',
      }
    })
  }
  console.log('✅ Worker user:', worker.email)

  // ─── Support user ──────────────────────────────────────────────────────────
  const rawSupportPassword = process.env.SEED_SUPPORT_PASSWORD
  if (!rawSupportPassword) throw new Error('SEED_SUPPORT_PASSWORD env var is required')
  const supportPassword = await bcrypt.hash(rawSupportPassword, 12)
  let support = await db.user.findFirst({ where: { email: 'support@stakeplatform.com' } })
  if (!support) {
    support = await db.user.create({
      data: {
        email: 'support@stakeplatform.com',
        username: 'support1',
        firstName: 'Support',
        lastName: 'Agent',
        password: supportPassword,
        role: 'SUPPORT',
        isActive: true,
        emailVerified: new Date(),
        referralCode: 'SUPPORT1',
      }
    })
  }
  console.log('✅ Support user:', support.email)

  // ─── Staking plans ─────────────────────────────────────────────────────────
  // FUNNEL DESIGN: Entry at $200 → quick 7-day proof → natural upgrades each cycle
  // Each tier pays out fast enough that users reinvest into the next tier up.
  const plans = [
    // ── TIER 1 TRIAL GATE ($200): The "prove it" plan ─────────────────────
    // Psychology: lowest barrier, shortest lock. User sees real money hit their
    // account within days → platform is trusted → next step is natural.
    {
      name: 'Starter Trial',
      description: 'Your risk-free entry into StakeOnix. Start with just $200, earn 1.5% every single day, and receive your full principal + profits back in 7 days. See real daily payouts hit your account before you commit to anything larger.',
      minAmount: 200,
      maxAmount: 499,
      durationDays: 7,
      dailyRoi: 1.5,
      totalRoi: 10.5,
      isActive: true,
      isFeatured: false,
      sortOrder: 1,
    },
    // ── TIER 2 FIRST UPGRADE ($500): After tasting success ─────────────────
    // $200 × 110.5% = $221 returned. User naturally adds ~$279 to reach $500.
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
    // ── TIER 3 GROWTH ($1,000): Mid-range commitment ───────────────────────
    {
      name: 'Growth Yield',
      description: 'Unlock the power of compounding returns. At $1,000+ you cross our algorithmic yield threshold 2.2%/day for 21 days = 46.2% total. Day-1 Booster investors who reinvest here see their first $1,000+ payday.',
      minAmount: 1000,
      maxAmount: 2499,
      durationDays: 21,
      dailyRoi: 2.2,
      totalRoi: 46.2,
      isActive: true,
      isFeatured: false,
      sortOrder: 3,
    },
    // ── TIER 4 MOMENTUM ($2,500): Serious stakers ──────────────────────────
    {
      name: 'Momentum',
      description: 'Where serious returns begin. 2.6%/day over 30 days delivers 78% total ROI enough to turn $2,500 into $4,450. Over 3x the best Bybit or Nexo fixed-term APY. Daily settlements, no lock penalties.',
      minAmount: 2500,
      maxAmount: 4999,
      durationDays: 30,
      dailyRoi: 2.6,
      totalRoi: 78.0,
      isActive: true,
      isFeatured: false,
      sortOrder: 4,
    },
    // ── TIER 5 PROFESSIONAL ($5,000): Portfolio builders ───────────────────
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
    // ── TIER 6 ADVANCED ($10,000): High-yield investors ────────────────────
    {
      name: 'Advanced Vault',
      description: 'Our 45-day advanced yield engine running at 3.3%/day 148.5% total return. $10,000 in = $24,850 out at maturity. Includes weekly performance reports, loyalty ROI boost (+0.1% on renewal), and VIP chat support.',
      minAmount: 10000,
      maxAmount: 24999,
      durationDays: 45,
      dailyRoi: 3.3,
      totalRoi: 148.5,
      isActive: true,
      isFeatured: true,
      sortOrder: 6,
    },
    // ── TIER 7 ELITE ($25,000): Wealth accumulation tier ───────────────────
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
    // ── TIER 8 BLACK DIAMOND ($50,000): Near-institutional ─────────────────
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
    // ── TIER 9 SOVEREIGN ($100,000+): Institutional access ─────────────────
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

  for (const plan of plans) {
    const existing = await db.stakingPlan.findFirst({ where: { name: plan.name } })
    if (!existing) {
      await db.stakingPlan.create({ data: plan })
      console.log(`✅ Plan created: ${plan.name}`)
    } else {
      console.log(`⏭️  Plan exists: ${plan.name}`)
    }
  }

  // ─── Deposit currencies ────────────────────────────────────────────────────
  // minDeposit is in USD NowPayments minimum is ~$19.18, so $20 is the safe floor
  const depositCurrencies = [
    { symbol: 'BTC',  name: 'Bitcoin',   network: 'BTC',   minDeposit: 20, isActive: true },
    { symbol: 'ETH',  name: 'Ethereum',  network: 'ERC20', minDeposit: 20, isActive: true },
    { symbol: 'USDT', name: 'Tether',    network: 'TRC20', minDeposit: 20, isActive: true },
    { symbol: 'USDC', name: 'USD Coin',  network: 'ERC20', minDeposit: 20, isActive: true },
    { symbol: 'LTC',  name: 'Litecoin',  network: 'LTC',   minDeposit: 20, isActive: true },
    { symbol: 'TRX',  name: 'TRON',      network: 'TRC20', minDeposit: 20, isActive: true },
  ]

  for (const c of depositCurrencies) {
    const existing = await db.depositCurrency.findFirst({ where: { symbol: c.symbol } })
    if (!existing) {
      await db.depositCurrency.create({ data: c })
      console.log(`✅ Deposit currency: ${c.symbol}`)
    }
  }

  // ─── Withdrawal currencies ─────────────────────────────────────────────────
  const withdrawCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', network: 'BTC', minWithdrawal: 0.001, fee: 0.0001, isActive: true },
    { symbol: 'ETH', name: 'Ethereum', network: 'ERC20', minWithdrawal: 0.01, fee: 0.003, isActive: true },
    { symbol: 'USDT', name: 'Tether', network: 'TRC20', minWithdrawal: 20, fee: 1, isActive: true },
    { symbol: 'USDC', name: 'USD Coin', network: 'ERC20', minWithdrawal: 20, fee: 2, isActive: true },
    { symbol: 'LTC', name: 'Litecoin', network: 'LTC', minWithdrawal: 0.05, fee: 0.005, isActive: true },
    { symbol: 'TRX', name: 'TRON', network: 'TRC20', minWithdrawal: 100, fee: 5, isActive: true },
  ]

  for (const c of withdrawCurrencies) {
    const existing = await db.withdrawalCurrency.findFirst({ where: { symbol: c.symbol } })
    if (!existing) {
      await db.withdrawalCurrency.create({ data: c })
      console.log(`✅ Withdrawal currency: ${c.symbol}`)
    }
  }

  // ─── Site settings ─────────────────────────────────────────────────────────
  const settings = [
    { key: 'site_name', value: 'StakeOnix' },
    { key: 'site_url', value: 'https://www.stakeonix.com' },
    { key: 'site_description', value: 'World-class crypto yield platform earn daily returns on your crypto with StakeOnix' },
    { key: 'support_email', value: 'support@stakeonix.com' },
    { key: 'support_phone', value: '' },
    { key: 'min_deposit', value: '200' },
    { key: 'min_withdrawal', value: '20' },
    // ── Referral commission tiers ──────────────────────────────────────────
    // Tier commissions increase as ambassadors bring more active investors.
    // Bronze (1–4 refs)=5% | Silver (5–9)=6% | Gold (10–24)=7% | Platinum(25+)=8%
    // referral_bonus_percent = base rate (Bronze). Admin can apply tier boosts manually or via future automation.
    { key: 'referral_bonus_percent', value: '5' },
    // Level-2 commission: earn on earnings of your referrals' referrals
    { key: 'referral_l2_bonus_percent', value: '2' },
    // Silver tier commission override
    { key: 'referral_silver_percent', value: '6' },
    // Gold tier commission override
    { key: 'referral_gold_percent', value: '7' },
    // Platinum tier commission override
    { key: 'referral_platinum_percent', value: '8' },
    // Referral tier thresholds (number of active, invested referrals)
    { key: 'referral_silver_min', value: '5' },
    { key: 'referral_gold_min', value: '10' },
    { key: 'referral_platinum_min', value: '25' },
    // Welcome bonus for newly referred investors (credited after first stake)
    { key: 'referral_signup_bonus_usd', value: '10' },
    { key: 'withdrawal_fee_percent', value: '1' },
    { key: 'deposit_fee_percent', value: '0' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'maintenance_message', value: 'We are currently undergoing scheduled maintenance. Please check back soon.' },
    { key: 'registration_enabled', value: 'true' },
    { key: 'deposits_enabled', value: 'true' },
    { key: 'withdrawals_enabled', value: 'true' },
  ]

  for (const s of settings) {
    const existing = await db.siteSetting.findFirst({ where: { key: s.key } })
    if (!existing) await db.siteSetting.create({ data: s })
  }
  console.log(`✅ Site settings seeded (${settings.length})`)

  // ─── Sample domain ─────────────────────────────────────────────────────────
  const domain = await db.domain.findFirst({ where: { domain: 'stakeplatform.com' } })
  if (!domain) {
    await db.domain.create({ data: { domain: 'stakeplatform.com', isActive: true } })
    console.log('✅ Domain: stakeplatform.com')
  }

  console.log('\n🎉 Seeding complete!')
  console.log('\n📋 Default credentials:')
  console.log('   Admin:   admin@stakeplatform.com / Admin@123456')
  console.log('   Worker:  worker@stakeplatform.com / Worker@123456')
  console.log('   Support: support@stakeplatform.com / Support@123456')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
