import dynamic from 'next/dynamic'

// ── Above-fold: eager (blocking) ─────────────────────────────────────────────
import { Hero } from './components/Hero'
import { CanadaNav } from './components/CanadaNav'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { CountdownTimer } from './components/CountdownTimer'
import { LiveFeed } from './components/LiveFeed'
import { ExitIntent } from './components/ExitIntent'
import { ProblemSection } from './components/ProblemSection'
import { PathSelector } from './components/PathSelector'
import { ValueProp } from './components/ValueProp'

// ── Below-fold: lazy (non-blocking) ─────────────────────────────────────────
const TrustBar       = dynamic(() => import('./components/TrustBar').then(m => ({ default: m.TrustBar })), { ssr: true })
const CanadaStats    = dynamic(() => import('./components/CanadaStats').then(m => ({ default: m.CanadaStats })), { ssr: true })
const YieldsTable    = dynamic(() => import('./components/YieldsTable').then(m => ({ default: m.YieldsTable })), { ssr: true })
const CADCalculator  = dynamic(() => import('./components/CADCalculator').then(m => ({ default: m.CADCalculator })), { ssr: true })
const TaxAdvantage   = dynamic(() => import('./components/TaxAdvantage').then(m => ({ default: m.TaxAdvantage })), { ssr: true })
const ComparisonTable= dynamic(() => import('./components/ComparisonTable').then(m => ({ default: m.ComparisonTable })), { ssr: true })
const HowItWorks     = dynamic(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })), { ssr: true })
const Security       = dynamic(() => import('./components/Security').then(m => ({ default: m.Security })), { ssr: true })
const TrustStatement = dynamic(() => import('./components/TrustStatement').then(m => ({ default: m.TrustStatement })), { ssr: true })
const FAQ            = dynamic(() => import('./components/FAQ').then(m => ({ default: m.FAQ })), { ssr: true })
const FinalCTA       = dynamic(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })), { ssr: true })
const CanadaFooter   = dynamic(() => import('./components/Footer').then(m => ({ default: m.CanadaFooter })), { ssr: true })

// CanadaComments uses ssr:false must live in a Client Component wrapper
import { CanadaCommentsClient } from './components/CanadaCommentsClient'
import {
  COMPANY_NAME,
  APP_URL,
  CSA_DECISION_URL,
  CSA_REGISTRATION_TYPE,
  FINTRAC_MSB_NUMBER,
  yields,
  faqItems,
} from './data'

// ── Structured data (JSON-LD) ─────────────────────────────────────────────────
const financialProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: `${COMPANY_NAME} Canadian Crypto Staking`,
  url: `${APP_URL}/canada`,
  description:
    'CSA-registered multi-chain crypto staking platform for Canadian investors. Stake ETH, SOL, ADA, and DOT with CAD deposits via Interac.',
  provider: {
    '@type': 'FinancialService',
    name: COMPANY_NAME,
    url: APP_URL,
    areaServed: 'CA',
    regulatoryBody: {
      '@type': 'Organization',
      name: 'Canadian Securities Administrators',
      url: CSA_DECISION_URL,
    },
  },
  feesAndCommissionsSpecification: 'Transparent platform fee shown before staking confirmation.',
  offers: yields.map((y) => ({
    '@type': 'Offer',
    name: `${y.token} Staking`,
    description: `Stake ${y.network} at approximately ${y.apy} APY. Unbonding: ${y.unbonding}. Minimum: ${y.minStake}.`,
    eligibleRegion: { '@type': 'Country', name: 'Canada' },
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY_NAME,
  url: APP_URL,
  logo: `${APP_URL}/logos/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'info@stakeonix.ca',
    availableLanguage: ['English', 'French'],
    areaServed: 'CA',
  },
  sameAs: [
    'https://twitter.com/stakeonix',
    'https://linkedin.com/company/stakeonix',
  ],
}

export default function CanadaPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Page layout: self-contained, does not use the (public) group layout */}
      <div className="min-h-screen">
        <CanadaNav />
        <main id="main-content">
          {/* ── Urgency bar: real countdown to BoC rate decision ─────────── */}
          <CountdownTimer />
          {/* ── Above fold ───────────────────────────────────────────────── */}
          <Hero />

          {/* ── Live social proof feed ───────────────────────────────────── */}
          <div className="bg-[#070e1c] border-y border-white/[0.06] px-4 py-3 flex justify-center overflow-hidden">
            <LiveFeed />
          </div>

          <ProblemSection />
          <PathSelector />
          <ValueProp />

          {/* ── Detail / proof sections ──────────────────────────────────── */}
          <TrustBar />
          <CanadaStats />
          <YieldsTable />
          <CADCalculator />
          <TaxAdvantage />
          <ComparisonTable />
          <HowItWorks />
          <Security />
          <FAQ />
          <TrustStatement />
          <CanadaCommentsClient />
          <FinalCTA />
        </main>
        <CanadaFooter />
        <StickyMobileCTA />
        <ExitIntent />
      </div>
    </>
  )
}
