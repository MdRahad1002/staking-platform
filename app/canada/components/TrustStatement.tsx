'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle, CheckCircle2, TrendingUp, Shield, Clock } from 'lucide-react'
import { CTA_HREF, SUPPORT_EMAIL, WHATSAPP_HREF, PHONE_NUMBER, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from '../data'

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
          <p className="text-white/85 text-base mb-8 max-w-xl mx-auto">
            Our team is available by phone, WhatsApp, email and live chat. Reach out any way you prefer and we will walk you through everything, no pressure.
          </p>

          {/* Primary CTA */}
          <Link
            href={CTA_HREF}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-bold text-base px-8 py-4 transition-all hover:shadow-xl hover:shadow-[#00C896]/25 shadow-lg shadow-[#00C896]/15 mb-8"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Contact channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 px-4 py-3.5 transition-all group"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.055 23.454a.5.5 0 0 0 .491.606l5.797-1.524A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 0 1-5.003-1.373l-.36-.214-3.717.977.993-3.62-.234-.373A9.78 9.78 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">WhatsApp / Call</p>
                <p className="text-white/75 text-xs">{PHONE_NUMBER}</p>
              </div>
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-[#00C896]/50 hover:bg-[#00C896]/10 px-4 py-3.5 transition-all"
            >
              <MessageCircle className="h-5 w-5 text-[#00C896] flex-shrink-0" aria-hidden="true" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Email us</p>
                <p className="text-white/75 text-xs">{SUPPORT_EMAIL}</p>
              </div>
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '').replace(/^/, '+')}`}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:border-blue-400/50 hover:bg-blue-400/10 px-4 py-3.5 transition-all"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-blue-400 flex-shrink-0" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.01l-2.2 2.21z"/>
              </svg>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Call us</p>
                <p className="text-white/75 text-xs">{PHONE_NUMBER}</p>
              </div>
            </a>
          </div>

          {/* Social media */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs mb-4 uppercase tracking-wider font-semibold">Follow us</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StakeOnix on Instagram"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] hover:border-pink-500/50 hover:bg-pink-500/10 px-4 py-2.5 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-pink-400" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-white/70 text-xs font-medium">Instagram</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StakeOnix on Facebook"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] hover:border-blue-500/50 hover:bg-blue-500/10 px-4 py-2.5 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-blue-400" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white/70 text-xs font-medium">Facebook</span>
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StakeOnix on TikTok"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/10 px-4 py-2.5 transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span className="text-white/70 text-xs font-medium">TikTok</span>
              </a>
            </div>
          </div>

          <p className="mt-6 text-white/25 text-xs">
            We respond to every inquiry within 24 hours.
          </p>
        </div>

      </div>
    </section>
  )
}
