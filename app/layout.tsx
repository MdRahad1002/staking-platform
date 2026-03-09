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
    'Want to earn money from your crypto without trading? StakeOnix pays you daily rewards on Bitcoin, Ethereum, USDT & more — like a high-yield savings account for crypto. Start earning from just $20. Trusted by 10,000+ investors worldwide.',
  keywords: [
    'how to make money with crypto',
    'earn money online 2026',
    'passive income ideas for beginners',
    'how to earn money while you sleep',
    'earn interest on bitcoin',
    'how to make money from home',
    'crypto savings account',
    'earn daily income online',
    'how to make $100 a day crypto',
    'make money with ethereum',
    'best way to earn with cryptocurrency',
    'how to grow money with crypto',
    'earn money without trading crypto',
    'daily income from crypto',
    'how to invest small amounts in crypto',
    'money making investments 2026',
    'earn rewards on crypto automatically',
    'how to double money with crypto',
    'crypto staking platform',
    'bitcoin staking',
    'ethereum staking',
    'USDT staking',
    'best staking platform 2026',
    'high yield crypto staking',
    'earn passive income crypto',
    'StakeOnix',
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
    title: 'StakeOnix — Earn Daily Income on Your Crypto | Like a Savings Account',
    description:
      'Put your crypto to work and get paid every single day. Bitcoin, Ethereum, USDT & 10+ coins. No trading needed. Start earning from just $20. Join 10,000+ people already making daily income.',
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
    title: 'StakeOnix — Make Money With Crypto Daily (No Trading Required)',
    description:
      'Earn daily income on your Bitcoin, Ethereum & USDT automatically. No trading, no experience needed. Start with $20. People are making real money every day — join them on StakeOnix.',
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
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
    // yandex: 'YOUR_YANDEX_TOKEN',
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
