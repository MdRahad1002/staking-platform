import { Metadata } from 'next'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Crypto Staking Help | StakeOnix',
  description:
    'Find answers to the most common questions about StakeOnix: how staking works, earning rewards, deposits, withdrawals, security, and the referral program.',
  keywords: [
    'crypto staking FAQ', 'StakeOnix FAQ', 'staking questions', 'how does staking work',
    'crypto withdrawal questions', 'staking rewards FAQ', 'crypto investment questions',
    'StakeOnix help', 'staking platform support',
  ],
  alternates: { canonical: `${APP_URL}/faq` },
  openGraph: {
    title: 'FAQ — Crypto Staking Questions Answered | StakeOnix',
    description: 'Everything you need to know about staking, earning, deposits, withdrawals, and security on StakeOnix.',
    url: `${APP_URL}/faq`,
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
        text: 'Simply create a free account, deposit funds in your preferred cryptocurrency, choose a staking plan that fits your goals, and activate your stake. You will start earning daily rewards immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a minimum deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum deposit amounts vary by cryptocurrency and staking plan. Generally, minimums start from $20 USD equivalent.',
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
      name: 'How does the referral program work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Share your unique referral link with friends. When they create an account and activate a stake, you earn a commission based on the staking amount. Commissions are automatically credited to your account.',
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

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
