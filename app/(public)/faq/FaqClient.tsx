'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What is StakeOnix?',
        a: 'StakeOnix is an FCA-authorised, FINTRAC-registered cryptocurrency staking platform. We pool assets into professionally managed staking protocols and distribute rewards to members according to their chosen plan terms. We are operated by ONIX HOLDINGS LIMITED (FCA Ref. 820033) in the UK and ONIX INTERNATIONAL INC. (FINTRAC BN: 820033090) in Canada.',
      },
      {
        q: 'How do I start staking?',
        a: 'Create a free account, complete KYC verification, deposit your chosen cryptocurrency, and select a staking plan. Once your stake is activated your account will reflect reward credits according to the plan schedule. Please note that staking rewards are variable and not guaranteed.',
      },
      {
        q: 'Is there a minimum deposit?',
        a: 'Minimum deposit amounts vary by cryptocurrency and staking plan. Specific minimums are shown on each plan\'s details page after you log in. Generally, minimums start from the USD equivalent of $200.',
      },
    ],
  },
  {
    category: 'Staking & Earnings',
    items: [
      {
        q: 'How are staking rewards calculated?',
        a: 'Rewards are calculated based on your staked amount, the plan you have chosen, and prevailing network conditions. Plan terms (including reward rates) are visible after you log in. Rewards are credited to your account on the schedule defined by your plan. Returns are variable and past performance does not guarantee future results.',
      },
      {
        q: 'Can I have multiple active stakes?',
        a: 'Yes. You can hold multiple active stakes across different plans simultaneously, which allows you to diversify your staking approach across different term lengths and assets.',
      },
      {
        q: 'What happens when my stake completes?',
        a: 'When your stake reaches its end date, your principal and any rewards earned during the plan period are credited to your account balance, subject to plan terms. You can then withdraw or activate a new stake.',
      },
    ],
  },
  {
    category: 'Deposits & Withdrawals',
    items: [
      {
        q: 'How do I deposit funds?',
        a: 'Navigate to the Deposit page, select your cryptocurrency, and you will receive a unique deposit address. Send funds to that address and they will be credited after network confirmations.',
      },
      {
        q: 'How long do withdrawals take?',
        a: 'Withdrawal requests are reviewed and processed subject to our standard security checks. Processing times vary depending on network conditions and our compliance review process. We aim to process withdrawals promptly. Some plans may have specific lock-up or notice periods - check your plan terms.',
      },
      {
        q: 'Are there withdrawal fees?',
        a: 'Yes, small network fees apply to cover blockchain transaction costs. The exact fee is shown before you confirm any withdrawal.',
      },
    ],
  },
  {
    category: 'Security',
    items: [
      {
        q: 'How secure is StakeOnix?',
        a: 'We employ industry-leading security measures including SSL encryption, two-factor authentication (2FA), withdrawal PIN codes, and cold storage for the majority of user funds.',
      },
      {
        q: 'What is 2FA and should I enable it?',
        a: 'Two-Factor Authentication adds an extra layer of security by requiring a time-based code from your authenticator app in addition to your password. We strongly recommend enabling it.',
      },
    ],
  },
  {
    category: 'Referral Program',
    items: [
      {
        q: 'How does the referral program work?',
        a: 'When a person you refer creates a verified account and activates a staking plan, you earn a commission based on their staking activity. Commission rates are tiered and depend on the number of verified referrals you have. Full details are available on the Referral Program page. Commissions are credited to your account automatically.',
      },
      {
        q: 'Is there a limit to referral earnings?',
        a: 'There is no hard cap on the number of referrals you can make. However, commissions are calculated on actual staking activity and are subject to our referral terms. Abuse of the referral system (e.g., self-referral, fake accounts) will result in account suspension.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setOpen(!open)}
      >
        {q}
        <ChevronDown
          className={cn('h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</div>
      )}
    </div>
  )
}

export default function FaqClient() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to the most common questions about StakeOnix.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-semibold mb-3 text-primary">{category.category}</h2>
              <div className="glass-card px-6 divide-y divide-border">
                {category.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glass-card p-8">
          <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is available 24/7 to help you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
