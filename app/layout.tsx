import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'StakeOnix – Crypto Staking Platform | Earn Daily Passive Income',
    template: '%s | StakeOnix',
  },
  description:
    'StakeOnix is an FCA-authorised, FINTRAC-registered crypto staking platform. Learn how to stake crypto and earn daily passive income on Bitcoin, Ethereum, USDT and 170+ digital assets. Free to join.',
  authors: [{ name: 'StakeOnix', url: APP_URL }],
  creator: 'StakeOnix',
  publisher: 'StakeOnix',
  category: 'Finance',
  classification: 'Cryptocurrency Staking Platform',
  keywords: [
    // High-volume informational intent
    'how to invest in cryptocurrency',
    'how to stake crypto',
    'what is crypto staking',
    'how to earn passive income with crypto',
    'how does crypto staking work',
    'how to invest in bitcoin',
    'how to invest in ethereum',
    'crypto investment for beginners',
    'is crypto staking safe',
    'best way to earn crypto',
    // Platform / product intent
    'crypto staking platform',
    'best crypto staking platform',
    'best crypto investment platform',
    'regulated crypto staking platform',
    'crypto staking platform Canada',
    'crypto yield platform',
    'crypto interest account',
    'daily crypto rewards',
    // Asset-specific
    'bitcoin staking',
    'ethereum staking',
    'USDT staking',
    'solana staking',
    'stake BTC',
    'stake ETH',
    // Passive income
    'earn crypto passive income',
    'passive income cryptocurrency',
    'crypto passive income 2026',
    'earn daily crypto rewards',
    // Regulatory trust signals
    'FCA regulated crypto',
    'FCA authorised crypto platform',
    'FINTRAC registered crypto',
    'regulated crypto platform UK',
    'regulated crypto platform Canada',
    // Geo
    'crypto staking UK',
    'crypto staking Canada',
    'best crypto platform Canada',
    'best crypto platform UK',
    // Comparison intent
    'best crypto staking rates 2026',
    'crypto staking vs savings account',
    'top crypto staking platforms 2026',
    'proof of stake rewards',
    'cryptocurrency staking 2026',
    // Brand
    'StakeOnix',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'StakeOnix – Crypto Staking Platform | Earn Daily Passive Income',
    description:
      'Learn how to stake crypto and earn daily passive income. FCA-authorised, FINTRAC-registered platform. Stake Bitcoin, Ethereum, USDT and 170+ assets. Free to join.',
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
    title: 'StakeOnix – How to Stake Crypto & Earn Daily Rewards',
    description:
      'How to stake crypto in 3 steps. Earn daily passive income on BTC, ETH, USDT & 170+ assets. FCA-authorised UK, FINTRAC Canada. Free to join.',
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
    languages: {
      'en': APP_URL,
      'en-US': APP_URL,
      'en-GB': APP_URL,
      'en-CA': APP_URL,
      'x-default': APP_URL,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: 'AcDBONrkSsQ5_pjS0bOmNC15NE_B6vEls7U3CKfbzJ4',
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
      email: 'info@stakeonix.ca',
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
  '@id': `${APP_URL}/#website`,
  name: 'StakeOnix',
  url: APP_URL,
  description: 'FCA-authorised, FINTRAC-registered professional cryptocurrency staking platform. Earn daily passive income on Bitcoin, Ethereum, USDT and 170+ digital assets.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${APP_URL}/faq?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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
        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  )
}
