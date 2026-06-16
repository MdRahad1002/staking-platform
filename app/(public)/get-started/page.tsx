import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck, BadgeCheck, Lock, Globe, ArrowRight, CheckCircle2, Wallet,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Crypto Staking on a Regulated Platform | StakeOnix',
  description:
    'Put your crypto to work on a regulated platform. Stake 170+ assets including Bitcoin and Ethereum. FCA-authorised (UK), FINTRAC-registered (Canada). Capital at risk.',
  alternates: { canonical: `${APP_URL}/get-started` },
  // Dedicated paid landing page kept out of organic search.
  robots: { index: false, follow: true },
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen" style={{ background: '#080D1B' }}>
      {/* HERO */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/[0.1] blur-[160px] translate-x-1/4 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[150px]" />
        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="h-3.5 w-3.5" /> FCA-authorised &middot; FINTRAC-registered
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto text-white">
            Put your crypto to work on a regulated platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            StakeOnix lets you stake 170+ digital assets including Bitcoin and Ethereum, with
            bank-grade security and clear, transparent terms. Create a free account in minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 rounded-xl text-base px-10 shine-sweep">
                <CheckCircle2 className="h-4 w-4" /> Create free account
              </Button>
            </Link>
            <Link href="/what-is-staking">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                How staking works <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground/70 max-w-lg mx-auto">
            Capital at risk. Cryptocurrency values can go down as well as up. Staking rewards are variable and not guaranteed.
          </p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <BadgeCheck className="h-5 w-5" />, label: 'FCA-authorised (UK)' },
              { icon: <ShieldCheck className="h-5 w-5" />, label: 'FINTRAC-registered (CA)' },
              { icon: <Lock className="h-5 w-5" />, label: '2FA & cold storage' },
              { icon: <Globe className="h-5 w-5" />, label: '170+ assets' },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-white/10">{t.icon}</div>
                <p className="text-sm font-semibold text-white">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">A simpler, safer way to hold crypto</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">No trading or charts required. Create an account, choose an asset, and let your crypto participate in network staking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <ShieldCheck className="h-6 w-6" />, title: 'Regulated & verifiable', body: 'Authorised by the FCA (UK) and registered with FINTRAC (Canada) - credentials you can verify on the regulators’ registers.' },
              { icon: <Lock className="h-6 w-6" />, title: 'Bank-grade security', body: 'Two-factor authentication, AES-256 encryption, withdrawal PIN, and cold-wallet storage for the majority of funds.' },
              { icon: <Wallet className="h-6 w-6" />, title: 'Simple to start', body: 'Create a free account, complete verification, and choose from 170+ assets. No prior crypto experience needed.' },
            ].map((c) => (
              <div key={c.title} className="glass-card rounded-2xl p-6 border border-white/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">{c.icon}</div>
                <h3 className="font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-blue-950/10" />
        <div className="container relative mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Get started in minutes</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Join a regulated crypto platform trusted by users across 170+ countries.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2 rounded-xl text-base px-10 shine-sweep">
              <CheckCircle2 className="h-4 w-4" /> Create free account
            </Button>
          </Link>
          <p className="mt-6 text-xs text-muted-foreground/60 max-w-md mx-auto leading-relaxed">
            StakeOnix is a trading name of ONIX HOLDINGS LIMITED. Capital at risk. Cryptocurrency values can go down
            as well as up, and staking rewards are variable and not guaranteed. Only invest what you can afford to lose.
          </p>
        </div>
      </section>
    </main>
  )
}
