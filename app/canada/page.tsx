import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { YieldsTable } from './components/YieldsTable'
import { TaxAdvantage } from './components/TaxAdvantage'
import { ComparisonTable } from './components/ComparisonTable'
import { HowItWorks } from './components/HowItWorks'
import { Security } from './components/Security'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { CanadaFooter } from './components/Footer'
import { CanadaNav } from './components/CanadaNav'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { CanadaStats } from './components/CanadaStats'
import { CADCalculator } from './components/CADCalculator'
import { CanadaComments } from './components/CanadaComments'
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
    email: 'info@stakeonix.com',
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
          <Hero />
          <TrustBar />
          <CanadaStats />
          <YieldsTable />
          <CADCalculator />
          <TaxAdvantage />
          <ComparisonTable />
          <HowItWorks />
          <Security />
          <FAQ />
          <CanadaComments />
          <FinalCTA />
        </main>
        <CanadaFooter />
        <StickyMobileCTA />
      </div>
    </>
  )
}
