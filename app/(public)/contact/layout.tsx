import { Metadata } from 'next'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Contact StakeOnix — 24/7 Crypto Staking Support',
  description:
    'Get in touch with the StakeOnix support team. We are available 24/7 to help with your crypto staking questions, deposits, withdrawals, and account issues.',
  keywords: [
    'contact StakeOnix', 'crypto staking support', 'StakeOnix customer service',
    'staking platform help', 'crypto investment support', 'StakeOnix live chat',
  ],
  alternates: { canonical: `${APP_URL}/contact` },
  openGraph: {
    title: 'Contact StakeOnix — 24/7 Crypto Staking Support',
    description: 'Reach our support team 24/7 for help with staking, deposits, withdrawals, and account management.',
    url: `${APP_URL}/contact`,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'StakeOnix',
  url: APP_URL,
  telephone: '+1-613-366-4391',
  email: 'info@stakeonix.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '130 King St W',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M5X 2A2',
    addressCountry: 'CA',
  },
  openingHours: 'Mo-Su 00:00-23:59',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+1-613-366-4391',
      email: 'info@stakeonix.com',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  ],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  )
}
