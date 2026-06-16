import { Metadata } from 'next'
import { AssetStakingPage, type AssetStakingData } from '@/components/seo/AssetStakingPage'

const APP_URL = 'https://www.stakeonix.ca'
const PATH = '/solana-staking'

export const metadata: Metadata = {
  title: 'Solana (SOL) Staking | Earn Daily SOL Rewards | StakeOnix',
  description:
    'Stake Solana (SOL) and earn daily rewards from $200. Learn how SOL staking works, typical APY, and why StakeOnix is a regulated way to stake Solana with daily payouts.',
  alternates: { canonical: `${APP_URL}${PATH}` },
  keywords: [
    'solana staking', 'sol staking', 'how to stake solana', 'solana staking rewards',
    'solana staking apy', 'best solana staking platform', 'stake sol', 'solana staking calculator',
    'is solana staking worth it', 'earn sol rewards',
  ],
  openGraph: {
    title: 'Solana (SOL) Staking | Earn Daily SOL Rewards | StakeOnix',
    description: 'Stake SOL and earn daily rewards from $200 on a regulated platform. Learn how Solana staking works.',
    url: `${APP_URL}${PATH}`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Solana Staking | StakeOnix' }],
  },
}

const data: AssetStakingData = {
  name: 'Solana',
  ticker: 'SOL',
  iconSymbol: 'sol',
  isProofOfStake: true,
  estApy: '~6-8%',
  heroHeadline: 'Stake Solana and earn daily SOL rewards',
  intro: 'Solana is a high-speed proof-of-stake blockchain, and SOL holders can earn rewards for helping secure it. StakeOnix makes Solana staking simple - start from $200 and receive rewards daily.',
  directAnswer:
    'Solana staking means delegating SOL to validators that secure the Solana proof-of-stake network, earning a share of rewards in return. Native Solana staking yields are typically around 6-8% annually. StakeOnix lets you stake SOL from $200 with rewards credited daily - no need to choose validators or manage a wallet yourself. Returns are variable and not guaranteed.',
  whatIs: [
    'Solana uses a proof-of-stake design (combined with its "proof-of-history" timing mechanism) to process thousands of transactions per second. Validators stake SOL to participate in securing the network, and SOL holders can delegate their tokens to those validators to share in the rewards.',
    'Delegating directly means picking validators, managing a Solana wallet, and tracking epochs. A staking service like StakeOnix removes that complexity - it handles the infrastructure and credits your share of rewards to your account.',
    'On StakeOnix you can stake SOL from a $200 minimum, receive daily rewards, and reinvest them automatically with Staking Autopilot to compound over time.',
  ],
  howWorks:
    'The Solana network issues staking rewards to validators (and their delegators) for securing the chain. StakeOnix participates in this and credits your share daily based on your staked SOL and chosen plan. Solana yields fluctuate with network inflation and total SOL staked, so rates are variable and not guaranteed.',
  whyStake: [
    { title: 'Simple delegation', body: 'No validator selection or wallet management - stake SOL and StakeOnix handles the infrastructure.' },
    { title: 'Competitive yields', body: 'Solana staking yields are typically around 6-8% annually, though variable. Your plan rate is shown upfront.' },
    { title: 'Daily rewards', body: 'SOL rewards are credited every 24 hours, not locked for long epochs.' },
    { title: 'Auto-compound', body: 'Reinvest SOL rewards automatically with Staking Autopilot.' },
    { title: 'Regulated', body: 'FCA-authorised (UK) and FINTRAC-registered (Canada).' },
    { title: 'Secure', body: '2FA, AES-256 encryption, withdrawal PIN and cold-wallet storage.' },
  ],
  faqs: [
    { q: 'How much can I earn staking Solana?', a: 'Native Solana staking yields are typically around 6-8% per year, depending on network inflation and how much SOL is staked overall. On StakeOnix your exact rate depends on the plan you choose and is shown before you stake. Returns are variable and not guaranteed.' },
    { q: 'How does Solana staking work?', a: 'SOL is delegated to validators that secure the proof-of-stake network, and delegators earn a share of the rewards. StakeOnix manages validator infrastructure for you and credits rewards daily.' },
    { q: 'Is Solana staking safe?', a: 'Staking is native to how Solana works. The main risks are platform risk and SOL price volatility. StakeOnix reduces platform risk with regulation, 2FA, encryption and cold storage, but no staking is risk-free and SOL’s price can fall.' },
    { q: 'When are Solana staking rewards paid?', a: 'StakeOnix credits SOL staking rewards every 24 hours. You can withdraw, reinvest, or enable auto-compounding.' },
    { q: 'Can I unstake my SOL?', a: 'Withdrawal terms depend on your plan. Flexible plans allow withdrawal under their terms; fixed-term plans return principal and rewards at maturity. Details are shown before you stake.' },
  ],
}

export default function Page() {
  return <AssetStakingPage data={data} path={PATH} />
}
