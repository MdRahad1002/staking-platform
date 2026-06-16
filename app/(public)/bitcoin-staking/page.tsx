import { Metadata } from 'next'
import { AssetStakingPage, type AssetStakingData } from '@/components/seo/AssetStakingPage'

const APP_URL = 'https://www.stakeonix.ca'
const PATH = '/bitcoin-staking'

export const metadata: Metadata = {
  title: 'Bitcoin (BTC) Staking: How to Earn Rewards on BTC | StakeOnix',
  description:
    'Can you stake Bitcoin? Bitcoin is proof-of-work, but you can still earn daily rewards on your BTC with a StakeOnix staking plan. Start from $200 on a regulated platform.',
  alternates: { canonical: `${APP_URL}${PATH}` },
  keywords: [
    'bitcoin staking', 'btc staking', 'can you stake bitcoin', 'how to stake bitcoin',
    'bitcoin staking rewards', 'earn interest on bitcoin', 'bitcoin passive income',
    'best bitcoin staking platform', 'stake btc', 'bitcoin rewards', 'is bitcoin proof of stake',
  ],
  openGraph: {
    title: 'Bitcoin (BTC) Staking: How to Earn Rewards on BTC | StakeOnix',
    description: 'Bitcoin is proof-of-work, but you can still earn daily rewards on your BTC with StakeOnix. From $200.',
    url: `${APP_URL}${PATH}`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Bitcoin Staking | StakeOnix' }],
  },
}

const data: AssetStakingData = {
  name: 'Bitcoin',
  ticker: 'BTC',
  iconSymbol: 'btc',
  isProofOfStake: false,
  estApy: 'Variable',
  heroHeadline: 'Earn daily rewards on your Bitcoin',
  intro: 'Bitcoin itself does not use staking - but you can still put your BTC to work. StakeOnix lets you earn daily rewards on your Bitcoin through a staking-style rewards plan, starting from $200.',
  directAnswer:
    'Technically, Bitcoin cannot be "staked" because it uses proof-of-work (mining), not proof-of-stake. When platforms advertise "Bitcoin staking," they mean earning rewards on your BTC through a yield or rewards program rather than protocol-level staking. StakeOnix offers BTC rewards plans where your Bitcoin earns daily payouts under transparent terms - a simple way to make idle BTC productive.',
  whatIs: [
    'Bitcoin is secured by proof-of-work: miners use computing power to validate transactions and earn newly issued BTC. There is no native staking mechanism in Bitcoin, so strictly speaking you cannot stake BTC the way you stake Ethereum or Solana.',
    'So what is "Bitcoin staking"? In practice it refers to programs that pay you rewards for committing your BTC to a platform - more like an earn or yield product than true protocol staking. It is important to understand this distinction, because the rewards come from the platform’s programs, not from the Bitcoin network itself.',
    'StakeOnix offers Bitcoin rewards plans that credit daily payouts on your committed BTC. If you would rather earn from a genuine proof-of-stake asset, you can also stake Ethereum or Solana on the same account.',
  ],
  howWorks:
    'Because Bitcoin has no protocol staking, rewards on a BTC plan are generated and paid by the platform under the plan you select, not minted by the Bitcoin network. Rates are variable and shown before you commit. As always, only commit what you can afford, and remember BTC’s price can rise or fall.',
  whyStake: [
    { title: 'Make idle BTC productive', body: 'Instead of holding Bitcoin that earns nothing, put it on a rewards plan that pays daily.' },
    { title: 'Honest, clear terms', body: 'We are upfront that Bitcoin is not proof-of-stake. Plan rates and terms are shown before you start.' },
    { title: 'Start from $200', body: 'No large minimum - begin small and scale as you gain confidence.' },
    { title: 'Daily payouts', body: 'Rewards are credited every 24 hours and tracked transparently in your dashboard.' },
    { title: 'Regulated platform', body: 'FCA-authorised (UK) and FINTRAC-registered (Canada).' },
    { title: 'Bank-grade security', body: '2FA, AES-256 encryption, withdrawal PIN and cold-wallet storage for the majority of funds.' },
  ],
  faqs: [
    { q: 'Can you actually stake Bitcoin?', a: 'Not in the protocol sense. Bitcoin uses proof-of-work, so it has no native staking. "Bitcoin staking" on platforms means earning rewards on your BTC through a rewards or yield program rather than securing the network. StakeOnix offers BTC rewards plans with daily payouts.' },
    { q: 'Is Bitcoin proof-of-stake?', a: 'No. Bitcoin is proof-of-work - miners validate transactions using computing power. Proof-of-stake assets like Ethereum and Solana are the ones you can stake at the protocol level.' },
    { q: 'How do I earn rewards on my Bitcoin?', a: 'Create a StakeOnix account, deposit BTC (from $200 equivalent), choose a Bitcoin rewards plan, and receive daily payouts. You can reinvest rewards automatically with Staking Autopilot.' },
    { q: 'Is earning rewards on Bitcoin safe?', a: 'The main risks are platform risk and BTC price volatility. StakeOnix reduces platform risk with regulation, 2FA, encryption and cold storage, but no yield product is risk-free and Bitcoin’s price can fall.' },
    { q: 'What if I want true staking instead?', a: 'Stake a proof-of-stake asset like Ethereum (ETH) or Solana (SOL) on the same StakeOnix account to participate in genuine protocol staking.' },
  ],
}

export default function Page() {
  return <AssetStakingPage data={data} path={PATH} />
}
