import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'StakeOnix – Professional Crypto Staking Platform | Earn Daily Passive Income',
    template: '%s | StakeOnix',
  },
  description:
    'StakeOnix is an FCA-authorised, FINTRAC-registered crypto staking platform. Stake Bitcoin, Ethereum, USDT and 170+ digital assets with institutional-grade security. Staking rewards are variable and not guaranteed.',
  authors: [{ name: 'StakeOnix', url: APP_URL }],
  creator: 'StakeOnix',
  publisher: 'StakeOnix',
  category: 'Finance',
  classification: 'Cryptocurrency Staking Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'StakeOnix – Professional Crypto Staking Platform | Earn Daily Passive Income',
    description:
      'FCA-authorised, FINTRAC-registered crypto staking platform. Stake Bitcoin, Ethereum, USDT and 170+ digital assets with institutional-grade security and full regulatory compliance. Staking rewards are variable.',
    siteName: 'StakeOnix',
    images: [
      {
        url: `${APP_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'StakeOnix - Crypto Staking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StakeOnix – FCA-Authorised Crypto Staking Platform',
    description:
      'Stake Bitcoin, Ethereum, USDT and 170+ digital assets on a regulated platform. FCA authorised in the UK. FINTRAC registered in Canada. Staking rewards are variable and not guaranteed.',
    images: [`${APP_URL}/opengraph-image`],
    creator: '@StakeOnix',
    site: '@StakeOnix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
    // yandex: 'YOUR_YANDEX_TOKEN',
    other: {
      'msvalidate.01': '2D9BDEB489BB2ADD2471AAE0F2C43EE9',
    },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StakeOnix',
  url: APP_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${APP_URL}/apple-icon`,
    width: 180,
    height: 180,
  },
  description:
    'StakeOnix is a professional cryptocurrency staking platform enabling investors to earn daily passive income on Bitcoin, Ethereum, USDT, Solana and more.',
  foundingDate: '2024',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-613-366-4391',
      contactType: 'customer support',
      areaServed: 'CA',
      email: 'info@stakeonix.com',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-056-0384-6173',
      contactType: 'customer support',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
  ],
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
      streetAddress: '1 Ashley Road',
      addressLocality: 'Altrincham',
      addressRegion: 'Cheshire',
      postalCode: 'WA14 2DT',
      addressCountry: 'GB',
    },
  ],
  legalName: 'ONIX HOLDINGS LIMITED',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Regulatory Authorisation',
      name: 'FCA Authorisation',
      description: 'Authorised by the Financial Conduct Authority (FCA) of the United Kingdom. Reference number: 820033.',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Financial Conduct Authority',
        url: 'https://www.fca.org.uk',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Regulatory Registration',
      name: 'FINTRAC Registration',
      description: 'Registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC). Business Number: 820033090.',
      recognizedBy: {
        '@type': 'Organization',
        name: 'FINTRAC',
        url: 'https://www.fintrac-canafe.gc.ca',
      },
    },
  ],
  knowsAbout: [
    'Cryptocurrency Staking',
    'Bitcoin',
    'Ethereum',
    'Digital Asset Management',
    'Proof-of-Stake',
    'Passive Income',
    'Blockchain Technology',
  ],
  sameAs: [
    'https://x.com/StakeOnix',
    'https://twitter.com/StakeOnix',
    'https://t.me/StakeOnix',
    'https://t.me/+bJzRzQK0W-Q2ZTU5',
    'https://wa.me/qr/PER5MG7B7R6EF1',
    'https://www.instagram.com/stakeonix',
    'https://www.facebook.com/share/1D3Cw9AjJ3/',
    'https://www.tiktok.com/@stakeonix',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'StakeOnix',
  url: APP_URL,
  description: 'Professional crypto staking platform. Earn daily passive income on 10+ cryptocurrencies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            richColors
            closeButton
          />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
