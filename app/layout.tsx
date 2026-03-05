import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'StakeOnix — #1 Crypto Staking Platform | Earn Daily Passive Income',
    template: '%s | StakeOnix',
  },
  description:
    'StakeOnix is a professional crypto staking platform. Earn up to 5% daily passive income on Bitcoin, Ethereum, USDT, Solana & more. Secure, transparent, and trusted by thousands of investors worldwide.',
  keywords: [
    'crypto staking platform',
    'cryptocurrency staking',
    'earn passive income crypto',
    'bitcoin staking',
    'ethereum staking',
    'USDT staking',
    'Solana staking',
    'DeFi staking',
    'daily crypto rewards',
    'best staking platform 2026',
    'secure crypto investment',
    'high yield staking',
    'staking rewards platform',
    'crypto passive income',
    'StakeOnix',
    'stake crypto online',
    'crypto yield platform',
    'BTC staking',
    'ETH staking',
    'blockchain staking',
  ],
  authors: [{ name: 'StakeOnix', url: APP_URL }],
  creator: 'StakeOnix',
  publisher: 'StakeOnix',
  category: 'Finance',
  classification: 'Cryptocurrency Staking Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'StakeOnix — #1 Crypto Staking Platform | Earn Daily Passive Income',
    description:
      'Earn daily passive income on Bitcoin, Ethereum, USDT, Solana & 10+ cryptocurrencies. Trusted by thousands of investors. Start staking with as little as $20.',
    siteName: 'StakeOnix',
    images: [
      {
        url: `${APP_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'StakeOnix — Crypto Staking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StakeOnix — Earn Daily Passive Income on Crypto',
    description:
      'Stake Bitcoin, Ethereum, USDT & more. Earn up to 5% daily. Secure, transparent crypto staking platform trusted worldwide.',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
    // bing: 'YOUR_BING_WEBMASTER_TOKEN',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StakeOnix',
  url: APP_URL,
  logo: `${APP_URL}/logo.png`,
  description:
    'StakeOnix is a professional cryptocurrency staking platform enabling investors to earn daily passive income on Bitcoin, Ethereum, USDT, Solana and more.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-613-366-4391',
    contactType: 'customer support',
    email: 'info@stakeonix.com',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '130 King St W',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M5X 2A2',
    addressCountry: 'CA',
  },
  sameAs: [
    'https://twitter.com/StakeOnix',
    'https://t.me/StakeOnix',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'StakeOnix',
  url: APP_URL,
  description: 'Professional crypto staking platform. Earn daily passive income on 10+ cryptocurrencies.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${APP_URL}/plans?q={search_term_string}`,
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
      </body>
    </html>
  )
}
