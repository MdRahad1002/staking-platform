import type { Metadata } from 'next'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Earn 5–8% Referral Commissions on Crypto Staking | StakeOnix',
  description:
    'Refer friends to StakeOnix and earn 5–8% on every dollar they earn (Level 1) plus 2% on their referrals (Level 2) paid daily, no cap. Your referrals also get a $10 welcome bonus.',
  keywords: [
    'crypto referral program',
    'earn money referring friends crypto',
    'crypto affiliate program 2026',
    'staking referral commissions',
    'earn passive income referrals',
    'bitcoin referral program',
    'best crypto referral program 2026',
    'earn 5 percent referral crypto',
    'how to earn from crypto referrals',
    'two-level referral staking',
    'passive income referral link',
    'earn without investing referral',
  ],
  alternates: { canonical: `${APP_URL}/referral-program` },
  openGraph: {
    title: 'Earn 5–8% Daily from Every Friend You Refer to StakeOnix',
    description:
      'Two-level referral commissions: earn 5–8% on your direct referrals and 2% on their referrals forever, paid daily. Your friends get $10 just for signing up.',
    url: `${APP_URL}/referral-program`,
  },
}

export default function ReferralProgramLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
