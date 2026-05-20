// Canada Landing Page: All Content Data
// Update yields, FAQ answers, and comparison data here without touching components.

// ── Placeholders ─────────────────────────────────────────────────────────────
export const COMPANY_NAME = 'StakeOnix'
export const COMPANY_LEGAL_NAME = 'ONIX INTERNATIONAL INC.'
export const CSA_REGISTRATION_TYPE = '{{CSA_REGISTRATION_TYPE}}'
export const CSA_DECISION_URL = '{{CSA_DECISION_URL}}'
export const FINTRAC_MSB_NUMBER = 'BN: 820033090 · Registry ID: 1782217'
export const AUDITOR_NAME = 'Internal'
export const TOTAL_STAKED_CAD = '170+'
export const SUPPORT_EMAIL = 'info@stakeonix.ca'
export const WHATSAPP_NUMBER = '+1 (613) 366-4391'
export const WHATSAPP_HREF = 'https://wa.me/16133664391'
export const PHONE_NUMBER = '+1 (613) 366-4391'
export const PHONE_HREF = 'tel:+16133664391'
export const INSTAGRAM_URL = 'https://www.instagram.com/stakeonix'
export const FACEBOOK_URL = 'https://www.facebook.com/share/1D3Cw9AjJ3/'
export const TIKTOK_URL = 'https://www.tiktok.com/@stakeonix'
export const APP_URL = 'https://www.stakeonix.ca'

// ── Social proof stats ──────────────────────────────────────────────────────────────────────────────
interface StatItem { value: string; label: string }
export const canadaStats: StatItem[] = [
  { value: '6,200+', label: 'Canadian accounts' },
  { value: '$48M+', label: 'CAD equivalent staked' },
  { value: 'Up to 16.5%', label: 'Annual staking yield' },
  { value: '3× more', label: 'vs. avg 1-yr GIC' },
]

// ── CTA href ─────────────────────────────────────────────────────────────────
export const CTA_HREF = '/signup?utm_source=canada-lp'

// ── Yields ───────────────────────────────────────────────────────────────────
export interface YieldRow {
  token: string
  network: string
  apy: string
  apyValue: number // numeric, for sorting / styling
  unbonding: string
  minStake: string
  logoSymbol: string // e.g. "ETH"
  color: string // token accent color
}

export const yields: YieldRow[] = [
  {
    token: 'Ethereum',
    network: 'ETH',
    apy: '9%',
    apyValue: 9,
    unbonding: '2–5 days',
    minStake: '0.01 ETH',
    logoSymbol: 'eth',
    color: '#627EEA',
  },
  {
    token: 'Solana',
    network: 'SOL',
    apy: '12%',
    apyValue: 12,
    unbonding: '2–3 days',
    minStake: '0.1 SOL',
    logoSymbol: 'sol',
    color: '#9945FF',
  },
  {
    token: 'Cardano',
    network: 'ADA',
    apy: '8.5%',
    apyValue: 8.5,
    unbonding: 'None',
    minStake: '1 ADA',
    logoSymbol: 'ada',
    color: '#0033AD',
  },
  {
    token: 'Polkadot',
    network: 'DOT',
    apy: '16.5%',
    apyValue: 16.5,
    unbonding: '28 days',
    minStake: '1 DOT',
    logoSymbol: 'dot',
    color: '#E6007A',
  },
]

// ── Comparison Table ──────────────────────────────────────────────────────────
export interface ComparisonRow {
  product: string
  yield: string
  liquidity: string
  insured: string
  highlight?: boolean // marks "our" rows
}

export const comparisonRows: ComparisonRow[] = [
  {
    product: 'Big Bank HISA',
    yield: '1.5 – 2.5%',
    liquidity: 'Daily',
    insured: 'CDIC ✓',
  },
  {
    product: '1-Year GIC',
    yield: '3.5 – 4.5%',
    liquidity: 'Locked',
    insured: 'CDIC ✓',
  },
  {
    product: '5-Year GIC',
    yield: '4.0 – 5.0%',
    liquidity: 'Locked',
    insured: 'CDIC ✓',
  },
  {
    product: 'ETH Staking (us)',
    yield: '9%',
    liquidity: '2–5 days',
    insured: 'Not CDIC',
    highlight: true,
  },
  {
    product: 'SOL Staking (us)',
    yield: '12%',
    liquidity: '2–3 days',
    insured: 'Not CDIC',
    highlight: true,
  },
  {
    product: 'DOT Staking (us)',
    yield: '16.5%',
    liquidity: '28 days',
    insured: 'Not CDIC',
    highlight: true,
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: 'Is crypto staking legal in Canada?',
    answer:
      'Yes. Crypto staking is legal in Canada. The Canadian Securities Administrators (CSA) regulate crypto trading platforms and staking services. StakeOnix operates as a registered platform under applicable CSA rules, meaning we meet Canadian compliance standards for custody, disclosure, and client asset protection.',
  },
  {
    question: 'Do I pay tax when I deposit or stake?',
    answer:
      "Under CRA's January 2025 guidance, depositing crypto onto a CSA-registered platform generally does not trigger a taxable disposition. The act of staking itself also generally does not constitute a disposition. You are taxed on staking rewards as income at the time they are received. Consult a Canadian tax professional for advice specific to your situation. Read our full CRA guide for more detail.",
  },
  {
    question: 'Can I deposit Canadian dollars directly?',
    answer:
      'Yes. We accept CAD deposits via Interac e-Transfer and domestic wire transfer. You can also deposit crypto directly from any self-custody wallet. CAD deposits are converted to the asset of your choice at the mid-market rate with a transparent fee shown before you confirm.',
  },
  {
    question: 'What happens if I want to unstake?',
    answer:
      'You can initiate an unstake at any time. The unbonding period depends on the network: ETH takes 2–5 days, SOL 2–3 days, ADA has no unbonding period, and DOT requires 28 days. During the unbonding period your assets remain in your account but do not earn rewards. Once complete, you can withdraw to your wallet or hold on platform.',
  },
  {
    question: 'Are my assets insured?',
    answer:
      "Crypto assets held with StakeOnix are not CDIC-insured. CDIC coverage applies only to eligible Canadian dollar deposits at member institutions. However, we segregate all client crypto from company assets as required by Canadian regulators, hold 80%+ in regulated cold custody, and publish weekly proof-of-reserves attestations. We are transparent about what we can and cannot guarantee.",
  },
  {
    question: "What's the minimum to start staking?",
    answer:
      'Minimums vary by chain: 0.01 ETH for Ethereum, 0.1 SOL for Solana, 1 ADA for Cardano, and 1 DOT for Polkadot. There is no platform minimum; you can start with whatever amount you hold. CAD deposit minimums apply and are shown during the deposit flow.',
  },
  {
    question: 'How are you different from Coinbase or Wealthsimple Crypto?',
    answer:
      'Coinbase is a US-registered exchange; it does not hold CSA registration, and its Canadian staking products operate under different regulatory conditions. Wealthsimple Crypto does not currently offer native chain staking. StakeOnix is purpose-built for Canadian stakers: CAD deposits via Interac, CSA registration, segregated client assets, and proof of reserves, all in one place.',
  },
  {
    question: 'What chains do you support?',
    answer:
      'We currently support Ethereum (ETH), Solana (SOL), Cardano (ADA), and Polkadot (DOT) for staking. Additional chains are evaluated based on regulatory clarity, network security, and Canadian demand. Sign up for our newsletter to be notified when new chains launch.',
  },
  {
    question: 'How are staking rewards calculated?',
    answer:
      'Staking rewards are calculated based on the underlying network\'s reward rate at the time of staking, minus a platform fee (shown transparently before you confirm). Rewards accrue daily and are visible in your dashboard. APYs shown on this page are updated every 24 hours and reflect current network conditions; they are estimates, not guarantees.',
  },
  {
    question: 'Can I hold staking rewards in my TFSA or RRSP?',
    answer:
      'Currently, the CRA does not permit crypto assets to be held inside a TFSA or RRSP because crypto is not a "qualified investment" under the Income Tax Act. Staking rewards earned in a non-registered account are taxed as income in the year received. However, if you convert staking rewards into a qualifying investment (such as a crypto ETF listed on a designated stock exchange) and then transfer them into a registered account, different rules may apply. We strongly recommend consulting a Canadian tax advisor for your specific situation.',
  },
  {
    question: 'How do I deposit Canadian dollars via Interac e-Transfer?',
    answer:
      'Log in to your StakeOnix account and navigate to Deposit. Select CAD and choose Interac e-Transfer. You will receive an email address to send your e-Transfer to along with a security question and answer. Initiate the transfer from your Canadian bank account using your online or mobile banking app. Deposits typically arrive and are credited within 15–60 minutes during business hours. There is no fee charged by StakeOnix for Interac deposits; your bank may charge a small fee depending on your account type.',
  },
  {
    question: 'What is slashing and am I exposed to it?',
    answer:
      'Slashing is a penalty mechanism built into proof-of-stake networks that reduces a validator\'s stake for protocol violations (e.g., double-signing). StakeOnix uses professionally operated, institutional-grade validators with automated slashing protection. Your exposure to slashing risk is minimal, but it is not zero, and we disclose this honestly. We have never experienced a slashing event on behalf of clients.',
  },
]

// ── Security items ────────────────────────────────────────────────────────────
export interface SecurityItem {
  icon: string // lucide icon name (used as identifier in component)
  headline: string
  body: string
}

export const securityItems: SecurityItem[] = [
  {
    icon: 'Shield',
    headline: 'CSA-Registered',
    body: `Operating under ${CSA_REGISTRATION_TYPE} with the Ontario Securities Commission. Our registration details are publicly verifiable on the CSA website.`,
  },
  {
    icon: 'Layers',
    headline: 'Segregated client assets',
    body: 'Your crypto is held separately from company assets, as required by Canadian securities regulations. We cannot commingle client funds with operational capital.',
  },
  {
    icon: 'Lock',
    headline: 'Cold storage majority',
    body: '95% of client assets are held in regulated cold custody. Hot wallets hold only the minimum needed for daily operations, reducing attack surface significantly.',
  },
  {
    icon: 'Eye',
    headline: 'Proof of reserves',
    body: 'Weekly Merkle-tree attestations are published publicly. You can independently verify that StakeOnix holds sufficient assets to cover all client balances.',
  },
]

// ── Trust bar items ───────────────────────────────────────────────────────────
export const trustBarItems = [
  { label: 'FINTRAC Registered · BN 820033090', href: 'https://www.fintrac-canafe.gc.ca/re-en', external: true },
  { label: '⚡ BTC at $106,000 CAD — all-time high', href: '#yields' },
  { label: 'BoC Rate Decision · June 10', href: '#problem' },
  { label: '95% Funds in Cold Storage', href: '#security' },
  { label: 'Interac & Wire Deposits', href: '#how-it-works' },
]
