import { Metadata } from 'next'
import FaqClient from './FaqClient'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Common Questions — Is This Legit? How Much Can I Earn? | StakeOnix FAQ',
  description:
    'Real answers to real questions: Is StakeOnix legit? How much money can I actually earn? Is my crypto safe? How quickly can I withdraw? Everything you want to know before you start.',
  keywords: [
    'is crypto staking legit',
    'is StakeOnix safe',
    'how much money can I make staking crypto',
    'can I really earn money with crypto',
    'how to withdraw staking earnings',
    'is my crypto safe in staking',
    'how to start earning with crypto',
    'crypto staking questions answered',
    'staking for complete beginners',
    'does crypto staking actually work',
    'how to make money online safely',
    'legitimate ways to earn money with crypto',
  ],
  alternates: { canonical: `${APP_URL}/faq` },
  openGraph: {
    title: 'FAQ — Crypto Staking Questions Answered | StakeOnix',
    description: 'Real people asking real questions: Is this legit? How much can I earn? Is my money safe? How do I withdraw? Get straight answers before you start.',
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
    {
      '@type': 'Question',
      name: 'Can I really make money with crypto staking, or is this a scam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'StakeOnix is a legitimate crypto staking platform. Staking is a well-established way to earn rewards on cryptocurrency — similar to how a bank pays interest on your savings, but with higher potential returns. We are transparent about our rates and thousands of real users earn daily rewards through our platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much money can I realistically earn from staking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on how much you stake and which plan you choose. For example, if you stake $500 on a plan paying 1.5% daily, you earn $7.50 every single day — that is $225 per month automatically. Earnings scale directly with the amount you stake.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need any experience to start earning with crypto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No experience is needed at all. If you can create an account and make a deposit, you are ready to go. There is no trading, no charts to watch, and no technical knowledge required. Just choose a plan, deposit your crypto, and let it earn for you automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum amount I can start with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can start earning with as little as $20 worth of cryptocurrency. This makes StakeOnix accessible to almost anyone who wants to start building a passive income from crypto, regardless of their budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my crypto safe? What happens if something goes wrong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Security is our top priority. We use SSL encryption, two-factor authentication, withdrawal PIN protection, and cold storage for user funds. Your account is protected by multiple layers of security and your withdrawal requests are reviewed before processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from a regular savings account at a bank?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A traditional bank savings account pays around 0.5–5% per year. Crypto staking on StakeOnix can pay that same amount in daily rewards. The key difference is that you are earning on cryptocurrency instead of regular money, which means higher potential returns — alongside the normal risks of crypto markets.',
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