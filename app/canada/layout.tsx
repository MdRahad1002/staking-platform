import type { Metadata } from 'next'
import { APP_URL, COMPANY_NAME } from './data'

const title = `Crypto Staking in Canada — CSA-Registered | ${COMPANY_NAME}`
const description =
  'Stake ETH, SOL, ADA, and DOT on Canada\'s CSA-registered platform. CAD deposits via Interac, transparent yields, CRA-friendly tax treatment. Start in 5 minutes.'
const canonicalUrl = `${APP_URL}/canada`
const ogImage = `${APP_URL}/opengraph-image`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: COMPANY_NAME,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${COMPANY_NAME} — Crypto Staking in Canada` }],
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
}

export default function CanadaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
