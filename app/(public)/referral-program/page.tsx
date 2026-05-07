import { Metadata } from 'next'
import ReferralProgramClient from './ReferralProgramClient'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Earn Crypto by Referring Friends | Up to 8% Commission | StakeOnix',
  description:
    'Earn crypto passively by sharing your referral link. Get 5–8% commission on everything your referrals earn, plus 2% from their referrals. Daily payouts, no cap. The easiest way to earn crypto online.',
  alternates: { canonical: `${APP_URL}/referral-program` },
  openGraph: {
    title: 'Earn Up to 8% Commission Referring Friends | StakeOnix',
    description:
      'Share one link. Earn 5–8% L1 commission + 2% L2 commission on everything your referrals earn. Paid daily, no cap. Friends get a $10 welcome bonus.',
    url: `${APP_URL}/referral-program`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix Referral Program' }],
  },
}

const referralBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Referral Program', item: `${APP_URL}/referral-program` },
  ],
}

export default function ReferralProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(referralBreadcrumbSchema) }}
      />
      <ReferralProgramClient />
    </>
  )
}
