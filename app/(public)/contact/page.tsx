import { Metadata } from 'next'
import { ContactForm } from './ContactForm'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Contact StakeOnix | Crypto Staking Support | Canada & UK',
  description:
    'Contact the StakeOnix support team for help with crypto staking, deposits, withdrawals, or your account. Canada (Toronto) and UK (Altrincham) offices. Fast response guaranteed.',
  alternates: { canonical: `${APP_URL}/contact` },
  openGraph: {
    title: 'Contact StakeOnix - We Are Here to Help',
    description: 'Get in touch with the StakeOnix team. Canada and UK offices. Fast response on deposits, withdrawals, and staking questions.',
    url: `${APP_URL}/contact`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Contact StakeOnix' }],
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact StakeOnix',
  url: `${APP_URL}/contact`,
  description: 'Contact StakeOnix for support with crypto staking, deposits, withdrawals, and account management.',
  mainEntity: {
    '@type': 'Organization',
    name: 'StakeOnix',
    url: APP_URL,
    email: 'info@stakeonix.ca',
    telephone: ['+1-613-366-4391', '+44-056-0384-6173'],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '130 King St W',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        postalCode: 'M5X 2A2',
        addressCountry: 'CA',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Ashley Road',
        addressLocality: 'Altrincham',
        addressRegion: 'Cheshire',
        postalCode: 'WA14 2DT',
        addressCountry: 'GB',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Have a question or need help? We&#39;re here for you.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

