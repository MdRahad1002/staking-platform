import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Lock,
  Eye,
  Zap,
  RefreshCw,
  BadgeCheck,
  Activity,
  DollarSign,
  Users,
  Star,
  Globe,
  Clock,
  Rocket,
  Award,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.com'

export const metadata: Metadata = {
  title: 'Why Choose StakeOnix? | FCA-Authorised Crypto Staking',
  description:
    'StakeOnix is FCA-authorised and FINTRAC-registered. Bank-grade security, transparent operations, 170+ assets, and full regulatory compliance. See exactly what makes us different.',
  alternates: { canonical: `${APP_URL}/why-choose-us` },
  openGraph: {
    title: 'Why Choose StakeOnix? | FCA-Authorised Crypto Staking',
    description: 'FCA-authorised, FINTRAC-registered staking platform. Bank-grade security, transparent operations, 170+ supported assets. See exactly what makes us different.',
    url: `${APP_URL}/why-choose-us`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Why Choose StakeOnix — FCA-authorised crypto staking platform' }],
  },
}

const pillars = [
  {
    icon: <Lock className="h-6 w-6" />,
    color: 'bg-cyan-500/15 text-cyan-400',
    glow: 'from-cyan-500/10 to-blue-600/10 border-cyan-500/20 hover:border-cyan-500/40',
    title: 'Bank-Grade Security',
    headline: 'Your crypto is protected like a vault.',
    body: 'Every account is protected with 256-bit SSL encryption. Funds are held in multi-signature cold wallets, meaning no single party can authorise asset movement unilaterally. We run 24/7 automated threat detection and manual security audits on a regular basis. Our security architecture is designed to the standard required by our FCA authorisation.',
    proof: '256-bit SSL + Multi-Sig Cold Wallets',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    color: 'bg-green-500/15 text-green-400',
    glow: 'from-green-500/10 to-emerald-600/10 border-green-500/20 hover:border-green-500/40',
    title: '100% Transparent Operations',
    headline: 'We show you everything. No fine print.',
    body: "Every reward calculation, fee, and transaction is visible on your dashboard in real time. Our fee structure is published openly - there are no withdrawal penalties, no hidden maintenance charges, and no sudden rule changes. What the plan says you earn is exactly what you receive. If a mistake is ever made, we correct it publicly and immediately.",
    proof: 'Zero hidden fees - ever',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    color: 'bg-yellow-500/15 text-yellow-400',
    glow: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-500/40',
    title: 'Instant Withdrawals',
    headline: "It is your money. Access it when you choose.",
    body: 'Many platforms impose long lock-up periods or complex queuing to access funds. On flexible plans, StakeOnix allows you to request withdrawals at any time. Requests are processed subject to standard security review and network conditions. Fixed-term plans have defined maturity dates - please review plan terms before activating.',
    proof: 'Flexible plans: withdraw any time (subject to review)',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    color: 'bg-purple-500/15 text-purple-400',
    glow: 'from-purple-500/10 to-violet-600/10 border-purple-500/20 hover:border-purple-500/40',
    title: 'Daily Auto-Compounding',
    headline: 'Your rewards reinvested automatically.',
    body: 'Compounding is one of the most powerful mechanisms in long-term wealth building. On StakeOnix, rewards can be automatically reinvested, allowing your balance to grow progressively over time. The effect compounds most strongly when maintained consistently over longer plan durations. The exact compounding schedule is specified in each plan\'s terms.',
    proof: 'Auto-compounding available on eligible plans',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    color: 'bg-blue-500/15 text-blue-400',
    glow: 'from-blue-500/10 to-indigo-600/10 border-blue-500/20 hover:border-blue-500/40',
    title: 'Regulated & Fully Compliant',
    headline: 'Licensed. Audited. Accountable.',
    body: 'StakeOnix operates under financial services regulations in Canada, with full KYC (Know Your Customer) and AML (Anti-Money Laundering) compliance. Our legal team monitors regulatory changes across all 170+ countries we serve. Unlike many platforms, we actively welcome regulation because we have nothing to hide and everything to prove.',
    proof: 'Registered in Ontario, Canada',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    color: 'bg-orange-500/15 text-orange-400',
    glow: 'from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/40',
    title: '24/7 Human Support',
    headline: 'Real people, fast answers - always.',
    body: 'We do not hide behind ticket queues or bot responses. Our support team is available around the clock via live chat, Telegram, WhatsApp, and email. Typical first response is under 5 minutes. Every support agent is trained in both the technical and financial aspects of our platform, so you get real answers - not copy-paste scripts.',
    proof: 'Avg. response time: under 5 minutes',
  },
]

const comparisons = [
  { feature: 'Daily rewards', stakeonix: true, bank: false, dex: false },
  { feature: 'No lock-in periods', stakeonix: true, bank: false, dex: false },
  { feature: 'Instant withdrawals', stakeonix: true, bank: false, dex: true },
  { feature: 'No trading knowledge needed', stakeonix: true, bank: true, dex: false },
  { feature: 'Start from $200', stakeonix: true, bank: false, dex: false },
  { feature: 'Auto-compounding', stakeonix: true, bank: false, dex: false },
  { feature: 'Regulated & licensed', stakeonix: true, bank: true, dex: false },
  { feature: '24/7 human support', stakeonix: true, bank: false, dex: false },
]

const testimonials = [
  {
    name: 'James O.',
    location: 'United Kingdom',
    text: 'I tried three other platforms before StakeOnix. The difference is the transparency and the withdrawals on my flexible plan. Every transaction is visible and that builds trust fast.',
    stars: 5,
  },
  {
    name: 'Aisha M.',
    location: 'Nigeria',
    text: 'As someone with no prior staking experience, the platform was clear and straightforward. The KYC was quick and the support team answered every question I had.',
    stars: 5,
  },
  {
    name: 'Marco T.',
    location: 'Italy',
    text: 'The regulatory credentials matter to me. FCA authorisation is not easy to obtain and it tells you something about how the company operates. That is why I chose this over others.',
    stars: 5,
  },
]

const whyChooseBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Why Choose StakeOnix?', item: `${APP_URL}/why-choose-us` },
  ],
}

const whyChooseWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Why Choose StakeOnix?',
  description: 'StakeOnix is FCA-authorised and FINTRAC-registered. Bank-grade security, transparent operations, 170+ assets, and full regulatory compliance.',
  url: `${APP_URL}/why-choose-us`,
  isPartOf: { '@type': 'WebSite', name: 'StakeOnix', url: APP_URL },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
      { '@type': 'ListItem', position: 2, name: 'Why Choose StakeOnix?', item: `${APP_URL}/why-choose-us` },
    ],
  },
}

export default function WhyChooseUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(whyChooseWebPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(whyChooseBreadcrumbSchema) }} />
      <main className="min-h-screen">
      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-background to-blue-950/25" />
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />
        <div className="glow-blob w-[700px] h-[700px] bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/3" />

        <div className="container relative mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Award className="h-3.5 w-3.5" />
            Our Advantage
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            A regulated platform<br />
            <span className="gradient-text">built to be trusted.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            There are hundreds of crypto platforms. Here is exactly why investors stake with us,
            what protections are in place, and what you should expect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 rounded-xl text-base px-8">
                <Rocket className="h-4 w-4" />
                Start Earning Today
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                View Plans <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF NUMBERS */}
      <section className="py-14 border-b border-white/5 bg-white/[0.015]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Shield className="h-5 w-5" />, color: 'text-blue-400 bg-blue-500/15', value: 'FCA', label: 'Authorised \u00b7 UK' },
              { icon: <Globe className="h-5 w-5" />, color: 'text-red-400 bg-red-500/15', value: 'FINTRAC', label: 'Registered \u00b7 Canada' },
              { icon: <Globe className="h-5 w-5" />, color: 'text-cyan-400 bg-cyan-500/15', value: '170+', label: 'Supported Assets' },
              { icon: <Activity className="h-5 w-5" />, color: 'text-yellow-400 bg-yellow-500/15', value: '99.9%', label: 'Uptime Target' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                  {s.icon}
                </div>
                <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 PILLARS */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-blob w-[600px] h-[600px] bg-blue-600/8 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">6 Reasons</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">What Makes Us Different</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Not marketing slogans - real, specific reasons backed by facts and numbers.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={p.title} className={`glass-card p-8 flex gap-6 bg-gradient-to-br ${p.glow} transition-all duration-300`}>
                <div className="flex-shrink-0">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.color}`}>
                    {p.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-sm font-medium text-cyan-400 mb-3">{p.headline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.body}</p>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                    {p.proof}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Head to Head</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">StakeOnix vs Other Options</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">How we stack up against traditional banks and decentralised exchanges.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 gap-0 border-b border-white/10 bg-white/[0.03]">
                <div className="p-4 text-sm font-semibold text-muted-foreground">Feature</div>
                <div className="p-4 text-center">
                  <span className="inline-block bg-cyan-500/15 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">StakeOnix</span>
                </div>
                <div className="p-4 text-center text-xs font-semibold text-muted-foreground/60">Bank</div>
                <div className="p-4 text-center text-xs font-semibold text-muted-foreground/60">DEX</div>
              </div>
              {comparisons.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-4 gap-0 border-b border-white/[0.05] last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                  <div className="p-4 text-sm text-muted-foreground">{row.feature}</div>
                  <div className="p-4 flex justify-center items-center">
                    {row.stakeonix
                      ? <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                      : <span className="h-5 w-5 flex items-center justify-center text-muted-foreground/30 text-lg">-</span>}
                  </div>
                  <div className="p-4 flex justify-center items-center">
                    {row.bank
                      ? <CheckCircle2 className="h-5 w-5 text-green-400" />
                      : <span className="h-5 w-5 flex items-center justify-center text-red-400/50 text-base font-bold">x</span>}
                  </div>
                  <div className="p-4 flex justify-center items-center">
                    {row.dex
                      ? <CheckCircle2 className="h-5 w-5 text-green-400" />
                      : <span className="h-5 w-5 flex items-center justify-center text-red-400/50 text-base font-bold">x</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Real Investors</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Hear From Our Community</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Thousands of real people from around the world earning daily on StakeOnix.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card p-7 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center border-t border-white/[0.06] pt-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-background to-blue-950/20" />
        <div className="glow-blob w-[600px] h-[400px] bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 mx-auto mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ready to Put Your Crypto to Work?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Join 87,000+ investors already earning daily passive income. No trading skills, no guesswork - just consistent, compounding returns.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2 rounded-xl text-base px-10">
                  <Wallet className="h-4 w-4" />
                  Create Free Account
                </Button>
              </Link>
              <Link href="/plans">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl text-base px-8 border-white/10">
                  Browse Plans <TrendingUp className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
