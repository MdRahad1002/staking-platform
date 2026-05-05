'use client'

import Link from 'next/link'
import { ArrowRight, Phone, MessageCircle, CheckCircle2, TrendingUp, Shield, Clock } from 'lucide-react'
import { CTA_HREF, SUPPORT_EMAIL } from '../data'

const facts = [
  {
    icon: TrendingUp,
    title: 'Staking is not speculation',
    body: 'When you stake crypto, your assets help validate blockchain transactions. In return the network pays you rewards. This is how blockchains like Ethereum work. It is infrastructure, not gambling.',
  },
  {
    icon: Shield,
    title: 'We are a real, registered company',
    body: 'StakeOnix is registered with FINTRAC (BN 820033090) and operates under Canadian financial regulations. You can verify us yourself at fintrac-canafe.gc.ca. No anonymity, no offshore shell.',
  },
  {
    icon: Clock,
    title: 'Rewards are earned, not promised',
    body: 'Your daily rewards come from on-chain staking yields, not from other users\u2019 deposits. We show you the exact source of every payout in your dashboard. Transparent, auditable, real.',
  },
  {
    icon: CheckCircle2,
    title: 'You can withdraw whenever you want',
    body: 'Your crypto remains yours. Unstaking takes 2\u20135 days depending on the network (this is a blockchain rule, not ours). After that, you receive your funds directly.',
  },
]

export function TrustStatement() {
  return (
    <section
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="trust-statement-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00C896] mb-3">
            Straight talk
          </p>
          <h2
            id="trust-statement-heading"
            className="text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight mb-5"
          >
            This is not a get-rich-quick scheme.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Staking is one of the most established ways to earn from crypto. Billions of dollars in rewards are paid out on-chain every year by networks like Ethereum and Solana. We give Canadians a regulated, simple way to participate.
          </p>
        </div>

        {/* Facts grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {facts.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-[#00C896]/30 hover:bg-[#00C896]/[0.02] transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#00C896]/10 mb-4">
                <Icon className="h-5 w-5 text-[#00C896]" aria-hidden="true" />
              </div>
              <h3 className="text-[#0A1628] font-bold text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div className="rounded-2xl bg-[#0A1628] p-8 sm:p-10 text-center">
          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Still have questions? Talk to a real person.
          </h3>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
            Our Canadian support team is available by email and live chat. If you prefer, leave your email and we will reach out to walk you through everything, no pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-bold text-base px-8 py-4 transition-all hover:shadow-xl hover:shadow-[#00C896]/25 shadow-lg shadow-[#00C896]/15"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold text-base px-8 py-4 transition-all"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Email our team
            </a>
          </div>

          <p className="text-white/30 text-xs">
            We respond to every inquiry within 24 hours.
          </p>
        </div>

      </div>
    </section>
  )
}
