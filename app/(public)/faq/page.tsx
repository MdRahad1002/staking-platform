import { Metadata } from 'next'
import FaqClient from './FaqClient'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | StakeOnix',
  description:
    'Answers to common questions about StakeOnix: how staking works, how rewards are calculated, deposit and withdrawal processes, security measures, and our referral programme.',
  alternates: { canonical: `${APP_URL}/faq` },
  openGraph: {
    title: 'Frequently Asked Questions | StakeOnix',
    description: 'How does staking work? How are rewards calculated? How do withdrawals work? Full answers from an FCA-authorised, FINTRAC-registered staking platform.',
    url: `${APP_URL}/faq`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix FAQ' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // Getting Started
    {
      '@type': 'Question',
      name: 'What is StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix is an FCA-authorised, FINTRAC-registered cryptocurrency staking platform. We pool assets into professionally managed staking protocols and distribute rewards to members according to their chosen plan terms. We are operated by ONIX HOLDINGS LIMITED (FCA Ref. 820033) in the UK and ONIX INTERNATIONAL INC. (FINTRAC BN: 820033090) in Canada.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start staking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a free account, complete KYC verification, deposit your chosen cryptocurrency, and select a staking plan. Once your stake is activated your account will reflect reward credits according to the plan schedule. Please note that staking rewards are variable and not guaranteed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a minimum deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Minimum deposit amounts vary by cryptocurrency and staking plan. Specific minimums are shown on each plan's details page after you log in. Generally, minimums start from the USD equivalent of $200.",
      },
    },
    // Staking & Earnings
    {
      '@type': 'Question',
      name: 'How are staking rewards calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rewards are calculated based on your staked amount, the plan you have chosen, and prevailing network conditions. Plan terms (including reward rates) are visible after you log in. Rewards are credited to your account on the schedule defined by your plan. Returns are variable and past performance does not guarantee future results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have multiple active stakes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can hold multiple active stakes across different plans simultaneously, which allows you to diversify your staking approach across different term lengths and assets.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens when my stake completes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When your stake reaches its end date, your principal and any rewards earned during the plan period are credited to your account balance, subject to plan terms. You can then withdraw or activate a new stake.',
      },
    },
    // Deposits & Withdrawals
    {
      '@type': 'Question',
      name: 'How do I deposit funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Navigate to the Deposit page, select your cryptocurrency, and you will receive a unique deposit address. Send funds to that address and they will be credited after network confirmations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do withdrawals take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Withdrawal requests are reviewed and processed subject to our standard security checks. Processing times vary depending on network conditions and our compliance review process. We aim to process withdrawals promptly. Some plans may have specific lock-up or notice periods - check your plan terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there withdrawal fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, small network fees apply to cover blockchain transaction costs. The exact fee is shown before you confirm any withdrawal.',
      },
    },
    // Security
    {
      '@type': 'Question',
      name: 'How secure is StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We employ industry-leading security measures including SSL encryption, two-factor authentication (2FA), withdrawal PIN codes, and cold storage for the majority of user funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is 2FA and should I enable it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Two-Factor Authentication adds an extra layer of security by requiring a time-based code from your authenticator app in addition to your password. We strongly recommend enabling it.',
      },
    },
    // Referral Program
    {
      '@type': 'Question',
      name: 'How does the referral program work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When a person you refer creates a verified account and activates a staking plan, you earn a commission based on their staking activity. Commission rates are tiered and depend on the number of verified referrals you have. Full details are available on the Referral Program page. Commissions are credited to your account automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a limit to referral earnings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no hard cap on the number of referrals you can make. However, commissions are calculated on actual staking activity and are subject to our referral terms. Abuse of the referral system (e.g., self-referral, fake accounts) will result in account suspension.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${APP_URL}/faq` },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FaqClient />
    </>
  )
}