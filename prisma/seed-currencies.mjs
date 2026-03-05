/**
 * Seeds DepositCurrency and WithdrawalCurrency records.
 * Run: node prisma/seed-currencies.mjs
 */
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

// NowPayments minimum is ~$19.18 USD for all currencies — use $20 as safe minimum
const depositCurrencies = [
  { symbol: 'BTC',  name: 'Bitcoin',   network: 'BTC',   minDeposit: 20, isActive: true },
  { symbol: 'ETH',  name: 'Ethereum',  network: 'ERC20', minDeposit: 20, isActive: true },
  { symbol: 'USDT', name: 'Tether',    network: 'TRC20', minDeposit: 20, isActive: true },
  { symbol: 'USDC', name: 'USD Coin',  network: 'ERC20', minDeposit: 20, isActive: true },
  { symbol: 'LTC',  name: 'Litecoin',  network: 'LTC',   minDeposit: 20, isActive: true },
  { symbol: 'TRX',  name: 'TRON',      network: 'TRC20', minDeposit: 20, isActive: true },
  { symbol: 'BNB',  name: 'BNB',       network: 'BEP20', minDeposit: 20, isActive: true },
  { symbol: 'SOL',  name: 'Solana',    network: 'SOL',   minDeposit: 20, isActive: true },
]

const withdrawalCurrencies = [
  { symbol: 'BTC',  name: 'Bitcoin',   network: 'BTC',   minWithdrawal: 20,  fee: 1,   isActive: true },
  { symbol: 'ETH',  name: 'Ethereum',  network: 'ERC20', minWithdrawal: 20,  fee: 2,   isActive: true },
  { symbol: 'USDT', name: 'Tether',    network: 'TRC20', minWithdrawal: 20,  fee: 1,   isActive: true },
  { symbol: 'USDC', name: 'USD Coin',  network: 'ERC20', minWithdrawal: 20,  fee: 2,   isActive: true },
  { symbol: 'LTC',  name: 'Litecoin',  network: 'LTC',   minWithdrawal: 20,  fee: 1,   isActive: true },
  { symbol: 'TRX',  name: 'TRON',      network: 'TRC20', minWithdrawal: 20,  fee: 1,   isActive: true },
  { symbol: 'BNB',  name: 'BNB',       network: 'BEP20', minWithdrawal: 20,  fee: 1,   isActive: true },
  { symbol: 'SOL',  name: 'Solana',    network: 'SOL',   minWithdrawal: 20,  fee: 1,   isActive: true },
]

async function main() {
  console.log('Seeding deposit currencies...')
  for (const c of depositCurrencies) {
    const existing = await db.depositCurrency.findFirst({ where: { symbol: c.symbol, domainId: null } })
    if (existing) {
      await db.depositCurrency.update({ where: { id: existing.id }, data: c })
      console.log(`  ✔ Updated deposit: ${c.symbol} (${c.network})`)
    } else {
      await db.depositCurrency.create({ data: c })
      console.log(`  ✔ Created deposit: ${c.symbol} (${c.network})`)
    }
  }

  console.log('\nSeeding withdrawal currencies...')
  for (const c of withdrawalCurrencies) {
    const existing = await db.withdrawalCurrency.findFirst({ where: { symbol: c.symbol, domainId: null } })
    if (existing) {
      await db.withdrawalCurrency.update({ where: { id: existing.id }, data: c })
      console.log(`  ✔ Updated withdrawal: ${c.symbol} (${c.network})`)
    } else {
      await db.withdrawalCurrency.create({ data: c })
      console.log(`  ✔ Created withdrawal: ${c.symbol} (${c.network})`)
    }
  }

  console.log('\nDone!')
}

main().catch(console.error).finally(() => db.$disconnect())
