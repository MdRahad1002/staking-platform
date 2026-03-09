import { Metadata } from 'next'
import FaqClient from './FaqClient'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'FAQ — Crypto Staking Questions Answered | StakeOnix',
  description:
    'Get answers to the most common questions about StakeOnix: how staking works, deposits, withdrawals, security, referral program, and more.',
  keywords: [
    'crypto staking FAQ', 'how does staking work', 'crypto staking questions',
    'StakeOnix FAQ', 'staking rewards explained', 'crypto passive income guide',
    'how to stake cryptocurrency', 'staking platform help',
  ],
  alternates: { canonical: `${APP_URL}/faq` },
  openGraph: {
    title: 'FAQ — Crypto Staking Questions Answered | StakeOnix',
    description: 'Everything you need to know about staking on StakeOnix — earnings, security, deposits, withdrawals, and more.',
    url: `${APP_URL}/faq`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'StakeOnix FAQ' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is StakeOnix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix is a cryptocurrency staking platform that allows you to earn passive income by staking your digital assets. We pool staking resources and distribute rewards to our users daily.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start staking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create a free account, deposit funds in your preferred cryptocurrency, choose a staking plan, and activate your stake. You will start earning daily rewards immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are staking rewards calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rewards are calculated based on your staked amount multiplied by the daily ROI percentage of your chosen plan. Rewards are credited to your account every 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do withdrawals take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Withdrawal requests are typically processed within 24 hours. Processing time may vary depending on network congestion and our security review process.',
      },
    },
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
      name: 'Is there a minimum deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum deposit amounts vary by cryptocurrency and staking plan. Generally, minimums start from $10 USD equivalent.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the referral program work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Share your unique referral link with friends. When they create an account and activate a stake, you earn a commission. Commissions are automatically credited to your account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have multiple active stakes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! You can have multiple active stakes with different plans simultaneously, allowing you to diversify your staking strategy.',
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