import { Metadata } from 'next'
import { AssetStakingPage, type AssetStakingData } from '@/components/seo/AssetStakingPage'

const APP_URL = 'https://www.stakeonix.ca'
const PATH = '/ethereum-staking'

export const metadata: Metadata = {
  title: 'Ethereum (ETH) Staking | Earn Daily ETH Rewards | StakeOnix',
  description:
    'Stake Ethereum (ETH) and earn daily rewards from $200. StakeOnix is a regulated platform with auto-compounding, daily payouts and 170+ assets. Learn how ETH staking works.',
  alternates: { canonical: `${APP_URL}${PATH}` },
  keywords: [
    'ethereum staking', 'eth staking', 'how to stake ethereum', 'ethereum staking rewards',
    'ethereum staking calculator', 'eth staking apy', 'is ethereum staking worth it',
    'best ethereum staking platform', 'stake eth', 'ethereum proof of stake', 'earn eth rewards',
  ],
  openGraph: {
    title: 'Ethereum (ETH) Staking | Earn Daily ETH Rewards | StakeOnix',
    description: 'Stake ETH and earn daily rewards from $200 on a regulated platform. Learn how Ethereum staking works.',
    url: `${APP_URL}${PATH}`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Ethereum Staking | StakeOnix' }],
  },
}

const data: AssetStakingData = {
  name: 'Ethereum',
  ticker: 'ETH',
  iconSymbol: 'eth',
  isProofOfStake: true,
  estApy: '~3-5%',
  heroHeadline: 'Stake Ethereum and earn daily ETH rewards',
  intro: 'Ethereum runs on proof-of-stake, which means ETH holders can earn rewards for helping secure the network. StakeOnix makes it simple - stake from $200 and receive rewards credited daily.',
  directAnswer:
    'Ethereum staking means locking ETH to help validate the Ethereum proof-of-stake network in exchange for rewards. Running your own validator requires 32 ETH and technical setup; StakeOnix pools staking so you can start from $200 and receive daily rewards under transparent plan terms. Network staking yields are typically around 3-5% annually, though returns are variable.',
  whatIs: [
    'Since "The Merge" in September 2022, Ethereum no longer uses energy-intensive mining. Instead it secures itself with proof-of-stake: participants (validators) lock up ETH and are chosen to propose and attest to blocks. In return, the network pays them ETH rewards.',
    'Running a solo validator requires staking exactly 32 ETH plus running reliable node software 24/7. Most people instead use a staking service or pool, which combines many users’ ETH and shares the rewards proportionally - removing the 32 ETH barrier and the technical burden.',
    'On StakeOnix you can stake ETH from a $200 minimum. Rewards are credited to your account every 24 hours, and you can reinvest them automatically with Staking Autopilot to compound your returns over time.',
  ],
  howWorks:
    'Ethereum issues new ETH and distributes transaction tips and priority fees to validators that secure the chain. StakeOnix participates in this validation and credits your share of rewards daily based on your staked amount and chosen plan. Yields move with network conditions (total ETH staked, network activity), so rates are variable and not guaranteed.',
  whyStake: [
    { title: 'No 32 ETH minimum', body: 'Start staking ETH from just $200 - no need to fund a full validator or run any software.' },
    { title: 'Daily rewards', body: 'ETH rewards are credited every 24 hours and visible in your dashboard, not locked away for months.' },
    { title: 'Auto-compound', body: 'Turn on Staking Autopilot to reinvest ETH rewards automatically and grow your position.' },
    { title: 'Regulated', body: 'FCA-authorised (UK) and FINTRAC-registered (Canada) - verifiable, not anonymous.' },
    { title: 'Protected Staking', body: 'Optionally add a principal-protected, market-linked bonus when your reference asset rises.' },
    { title: 'Bank-grade security', body: '2FA, AES-256 encryption, withdrawal PIN and cold-wallet storage.' },
  ],
  faqs: [
    { q: 'How much can I earn staking Ethereum?', a: 'Ethereum network staking yields are typically around 3-5% per year, depending on how much total ETH is staked and network activity. On StakeOnix, your exact rate depends on the plan you choose and is shown before you commit. Returns are variable and not guaranteed.' },
    { q: 'Do I need 32 ETH to stake Ethereum?', a: 'No. 32 ETH is only required to run your own solo validator. Through a pooled service like StakeOnix you can stake ETH from a $200 minimum and still earn rewards.' },
    { q: 'Is Ethereum staking safe?', a: 'Staking itself is a core part of how Ethereum works. The main risks are platform risk and ETH price volatility. StakeOnix mitigates platform risk with regulation, 2FA, encryption and cold storage, but no staking is risk-free and ETH’s price can fall.' },
    { q: 'When do I receive my ETH staking rewards?', a: 'StakeOnix credits staking rewards every 24 hours to your account. You can withdraw or reinvest them, or enable auto-compounding to grow your balance automatically.' },
    { q: 'Can I unstake my Ethereum?', a: 'Withdrawal terms depend on your plan. Flexible plans allow withdrawal under their terms; fixed-term plans return your principal and rewards at maturity. Details are shown before you stake.' },
  ],
}

export default function Page() {
  return <AssetStakingPage data={data} path={PATH} />
}
