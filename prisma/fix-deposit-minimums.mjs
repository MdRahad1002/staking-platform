/**
 * One-time script: set minDeposit to sensible USD minimums for existing
 * DepositCurrency records (original seed used crypto amounts, not USD).
 *
 * Usage: node prisma/fix-deposit-minimums.mjs
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const MINIMUMS = {
  BTC:  10,
  ETH:  10,
  LTC:  10,
  TRX:  10,
  USDT: 10,
  USDC: 10,
  BNB:  10,
  SOL:  10,
}

async function main() {
  for (const [symbol, minDeposit] of Object.entries(MINIMUMS)) {
    const result = await db.depositCurrency.updateMany({
      where: { symbol, minDeposit: { lt: 1 } }, // only fix if still a crypto-unit value
      data: { minDeposit },
    })
    if (result.count > 0) {
      console.log(`✅ Updated ${symbol} minDeposit → $${minDeposit} USD`)
    }
  }
  console.log('Done.')
}

main().catch(console.error).finally(() => db.$disconnect())
