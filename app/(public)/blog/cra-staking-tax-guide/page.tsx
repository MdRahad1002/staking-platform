import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
  Info,
  ArrowRight,
} from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'Canadian Crypto Staking Tax Guide 2025: CRA Rules Explained | StakeOnix',
  description:
    "Canada's most complete guide to crypto staking taxes. Covers the CRA's January 2025 guidance on dispositions, how staking rewards are taxed as income, capital gains rules, record-keeping requirements, and TFSA/RRSP eligibility.",
  alternates: { canonical: `${APP_URL}/blog/cra-staking-tax-guide` },
  openGraph: {
    title: 'Canadian Crypto Staking Tax Guide 2025 | StakeOnix',
    description:
      "Understand exactly how the CRA taxes crypto staking rewards in Canada. Covers the January 2025 guidance, income vs capital gains, T1 reporting, and common mistakes to avoid.",
    url: `${APP_URL}/blog/cra-staking-tax-guide`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Canadian Crypto Staking Tax Guide 2025 | StakeOnix' }],
  },
  other: {
    'geo.region': 'CA',
    'geo.country': 'CA',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Canadian Crypto Staking Tax Guide 2025: CRA Rules Explained',
  description: "Canada's complete guide to crypto staking taxes under the CRA's January 2025 guidance.",
  url: `${APP_URL}/blog/cra-staking-tax-guide`,
  image: `${APP_URL}/opengraph-image`,
  datePublished: '2025-01-15',
  dateModified: '2026-05-01',
  author: { '@type': 'Organization', name: 'StakeOnix', url: APP_URL },
  publisher: {
    '@type': 'Organization',
    name: 'StakeOnix',
    url: APP_URL,
    logo: { '@type': 'ImageObject', url: `${APP_URL}/apple-icon`, width: 180, height: 180 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${APP_URL}/blog/cra-staking-tax-guide` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'Canada', item: `${APP_URL}/canada` },
    { '@type': 'ListItem', position: 3, name: 'CRA Tax Guide', item: `${APP_URL}/blog/cra-staking-tax-guide` },
  ],
}

const toc = [
  { id: 'overview', label: "The CRA's January 2025 Guidance" },
  { id: 'disposition', label: 'What Triggers a Disposition' },
  { id: 'rewards-as-income', label: 'Staking Rewards: Taxed as Income' },
  { id: 'capital-gains', label: 'Capital Gains When You Sell' },
  { id: 'tfsa-rrsp', label: 'TFSA and RRSP Eligibility' },
  { id: 'record-keeping', label: 'Record-Keeping Requirements' },
  { id: 'reporting', label: 'How to Report on Your T1' },
  { id: 'mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'faq', label: 'Frequently Asked Questions' },
]

const faqItems = [
  {
    q: 'Do I pay tax when I deposit crypto onto a staking platform?',
    a: "Under the CRA's January 2025 guidance, depositing crypto onto a CSA-registered platform generally does not trigger a taxable disposition. You are not considered to have sold your crypto simply by moving it to a registered platform for staking. However, this applies specifically to registered platforms — the rules may differ for unregistered offshore services.",
  },
  {
    q: 'Is staking itself a taxable event?',
    a: "The act of staking (committing your crypto to a validator) is not itself a taxable disposition under the CRA's current guidance. You have not sold, exchanged, or otherwise disposed of your asset. You continue to own it; it is simply locked in a validator contract. The taxable event occurs when you receive staking rewards.",
  },
  {
    q: 'How do I calculate the income from staking rewards?',
    a: "The income is the CAD fair market value of the rewards at the moment they are credited to your account. For example, if you receive 0.1 SOL as a reward when SOL is worth $200 CAD, you report $20 CAD as other income for that period. The same $20 CAD becomes your adjusted cost base (ACB) for those 0.1 SOL for future capital gains calculations.",
  },
  {
    q: 'Do I owe tax if I just hold my staking rewards and do not sell them?',
    a: 'Yes. Staking rewards are taxed as income when received, regardless of whether you sell them. The tax is triggered at the moment the rewards land in your account, not when you eventually sell. Many Canadians miss this and only report when they convert to CAD — that is an error that can result in arrears interest and penalties.',
  },
  {
    q: 'What if the value of my staking rewards drops after I receive them?',
    a: 'You still owe income tax on the full fair market value at the time of receipt. If the asset later declines in value and you sell at a loss, you can claim a capital loss at that point, which can offset capital gains in the current year or be carried back 3 years / forward indefinitely. You cannot retroactively reduce the income you already reported.',
  },
  {
    q: 'Can I deduct staking platform fees from my income?',
    a: "Platform fees charged in connection with earning staking rewards may be deductible as an expense against that income, depending on whether the CRA considers your staking activity a business or a passive investment. If you stake commercially at scale, you may be able to deduct fees, hardware, internet, and other expenses. For most retail stakers, staking is treated as investment income and fee deductibility is more limited. Consult a tax advisor.",
  },
  {
    q: 'What is the adjusted cost base (ACB) and why does it matter?',
    a: 'The ACB is your cost basis in a crypto asset — what you are treated as having paid for it. When you eventually sell, your capital gain or loss is calculated as (proceeds minus ACB). For staking rewards, the ACB equals the fair market value you already reported as income when you received them. Keeping accurate ACB records is critical to avoid double-taxation.',
  },
  {
    q: 'Do I need to report crypto on my T1 even if I made no CAD profit?',
    a: 'Yes. The CRA requires Canadians to report all world income, including staking rewards in crypto. If you received any staking rewards during the tax year — even if you did not sell them or convert them to CAD — you must report the fair market value as income on your T1. There is also a foreign asset reporting requirement (T1135) if your total foreign crypto holdings exceed $100,000 CAD at any point in the year.',
  },
]

export default function CRATaxGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-gradient-to-b from-[#0A1628] to-[#0d2040] pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/40 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/canada" className="hover:text-white/70 transition-colors">Canada</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">CRA Tax Guide</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-4 py-1.5 mb-6">
              <span className="text-[#00C896] text-xs font-semibold tracking-wide uppercase">
                Updated for 2025 Tax Year
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Canadian Crypto Staking<br className="hidden sm:block" /> Tax Guide 2025
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
              Everything Canadians need to know about how the CRA taxes crypto staking rewards. Based on the January 2025 CRA guidance and the Income Tax Act.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                15 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Last updated May 2026
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Covers 2024 and 2025 tax years
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-amber-800">
                <strong>Not tax advice.</strong> This guide is for general informational purposes only and does not constitute legal or tax advice. Tax rules change and individual circumstances vary. Always consult a qualified Canadian tax professional before filing.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 items-start">

            {/* Main content */}
            <article className="prose-custom min-w-0">

              {/* Table of Contents */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-12 not-prose">
                <h2 className="text-base font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#00C896]" aria-hidden="true" />
                  In this guide
                </h2>
                <ol className="space-y-2">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#00C896] transition-colors group"
                      >
                        <span className="text-xs font-mono text-gray-400 w-5 flex-shrink-0 group-hover:text-[#00C896]">{String(i + 1).padStart(2, '0')}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Section 1 */}
              <section id="overview" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<Shield className="h-6 w-6" />} number="01">
                  The CRA&apos;s January 2025 Guidance
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  In January 2025, the Canada Revenue Agency published updated administrative guidance clarifying how crypto asset transactions on <strong>CSA-registered platforms</strong> are treated for income tax purposes. This was a significant development for Canadian stakers because it reduced tax uncertainty on two key actions: depositing crypto onto a registered platform and the act of staking itself.
                </p>
                <p className="text-gray-700 leading-relaxed mb-5">
                  The core principle is that the CRA does not view these actions as a change in beneficial ownership sufficient to constitute a taxable disposition, provided you are using a platform registered with the Canadian Securities Administrators (CSA). The guidance does <em>not</em> apply to unregistered offshore platforms, where the tax treatment remains uncertain and potentially more aggressive.
                </p>
                <div className="rounded-xl bg-[#00C896]/8 border border-[#00C896]/20 p-5 mb-5">
                  <p className="text-sm font-semibold text-[#0A1628] mb-2">Key takeaway from the January 2025 guidance:</p>
                  <ul className="space-y-2">
                    {[
                      'Depositing crypto to a CSA-registered staking platform generally does not trigger a disposition.',
                      'Staking your crypto (locking it in a validator) generally does not trigger a disposition.',
                      'Receiving staking rewards IS a taxable event: rewards are included in income at fair market value on receipt.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-[#00C896] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  It is important to note that CRA guidance is administrative interpretation, not legislation. The Income Tax Act itself has not been amended specifically for crypto staking. The CRA&apos;s position can change, and court decisions could alter how the rules are applied. This is why consulting a Canadian tax professional remains important.
                </p>
              </section>

              {/* Section 2 */}
              <section id="disposition" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<TrendingUp className="h-6 w-6" />} number="02">
                  What Triggers a Taxable Disposition
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  A <strong>disposition</strong> occurs when you transfer ownership of a property under the Income Tax Act. For crypto, the most common dispositions are: selling for CAD, trading one crypto for another, using crypto to pay for goods or services, or gifting crypto to someone other than a spouse.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6 not-prose">
                  <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                    <p className="font-semibold text-red-800 text-sm mb-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4" aria-hidden="true" /> Triggers a disposition
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Selling crypto for CAD',
                        'Trading crypto for another crypto',
                        'Paying for goods or services with crypto',
                        'Gifting crypto (non-spouse)',
                        'Moving crypto to an unregistered offshore platform (possibly)',
                      ].map((item) => (
                        <li key={item} className="text-sm text-red-700 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-red-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                    <p className="font-semibold text-emerald-800 text-sm mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Generally NOT a disposition
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Depositing crypto to a CSA-registered platform',
                        'Staking your crypto (locking in validator)',
                        'Transferring between your own wallets',
                        'Receiving staking rewards (income, not capital)',
                        'Holding crypto in a cold wallet',
                      ].map((item) => (
                        <li key={item} className="text-sm text-emerald-700 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 not-prose">
                  <div className="flex items-start gap-3">
                    <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-amber-800">
                      <strong>Liquid staking tokens (e.g., stETH):</strong> Receiving a liquid staking token in exchange for your ETH may constitute a disposition because you are exchanging one property for another. The January 2025 guidance focused on direct staking, not liquid staking derivatives. Treat liquid staking token swaps as dispositions until the CRA clarifies further.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="rewards-as-income" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<DollarSign className="h-6 w-6" />} number="03">
                  Staking Rewards: Taxed as Income
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  When staking rewards arrive in your account, the CRA treats them as <strong>other income</strong> under section 3 of the Income Tax Act, taxable in the year received. The amount to report is the <strong>Canadian dollar fair market value of the rewards at the exact time they are credited</strong>.
                </p>

                <div className="rounded-2xl bg-[#0A1628] p-6 mb-6 not-prose">
                  <p className="text-[#00C896] text-xs font-semibold uppercase tracking-widest mb-4">Example calculation</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'You receive 0.05 ETH in staking rewards', value: '' },
                      { label: 'ETH price at time of receipt', value: 'CAD $5,000' },
                      { label: 'Income to report on T1', value: 'CAD $250' },
                      { label: 'Your new ACB for that 0.05 ETH', value: 'CAD $250' },
                    ].map((row, i) => (
                      <div key={i} className={`flex justify-between ${i === 2 ? 'text-[#00C896] font-semibold border-t border-white/10 pt-3 mt-3' : 'text-white/70'}`}>
                        <span>{row.label}</span>
                        {row.value && <span className="font-mono">{row.value}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-5">
                  This income is taxed at your <strong>marginal tax rate</strong> (combined federal + provincial), not the 50% capital gains inclusion rate. For most Canadians, this means staking rewards are taxed at a rate between 20% and 53% depending on province and total income.
                </p>
                <p className="text-gray-700 leading-relaxed mb-5">
                  The fair market value you report also becomes the adjusted cost base (ACB) for that batch of rewards. This matters when you eventually sell: your capital gain will be calculated on any appreciation <em>above</em> what you already reported as income. This prevents double-taxation on the same amount.
                </p>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 not-prose">
                  <p className="text-sm font-semibold text-[#0A1628] mb-2">Frequency matters for record-keeping</p>
                  <p className="text-sm text-gray-600">
                    Staking rewards that accrue daily require you to record the fair market value of each daily reward. StakeOnix provides a transaction history export that includes timestamps and amounts, which you can use with a crypto tax tool (Koinly, Coinpanda, CryptoTaxCalculator) to calculate total annual income automatically.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="capital-gains" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<TrendingUp className="h-6 w-6" />} number="04">
                  Capital Gains When You Sell
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  When you eventually sell, convert, or otherwise dispose of crypto you received as staking rewards (or purchased), any appreciation above your ACB is a <strong>capital gain</strong>. As of the 2024 federal budget, the capital gains inclusion rate increased from 50% to 2/3 for individuals with capital gains above $250,000 in a year.
                </p>

                <div className="rounded-2xl bg-[#0A1628] p-6 mb-6 not-prose">
                  <p className="text-[#00C896] text-xs font-semibold uppercase tracking-widest mb-4">Capital gain example</p>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between"><span>You received 0.05 ETH as staking reward (ACB = $250 CAD)</span></div>
                    <div className="flex justify-between"><span>ETH price rises; you sell 0.05 ETH for CAD $400</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-2 mt-2"><span>Capital gain</span><span className="font-mono text-white">$150 CAD</span></div>
                    <div className="flex justify-between"><span>Taxable portion (50% inclusion, under $250K threshold)</span><span className="font-mono text-[#00C896]">$75 CAD</span></div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-5">
                  Capital losses can offset capital gains in the current year. Unused capital losses can be carried back 3 years or carried forward indefinitely to offset future gains. They cannot offset ordinary income (such as employment income or staking reward income).
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The ACB calculation for crypto uses the <strong>average cost method</strong> in Canada (not FIFO or specific identification). If you hold multiple purchases and reward batches of the same token, your ACB per unit is the total cost divided by total units held.
                </p>
              </section>

              {/* Section 5 */}
              <section id="tfsa-rrsp" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<Shield className="h-6 w-6" />} number="05">
                  TFSA and RRSP Eligibility
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Crypto assets (including ETH, SOL, ADA, DOT) are <strong>not qualified investments</strong> under the Income Tax Act and cannot be held directly inside a TFSA or RRSP. Holding non-qualified investments in a registered account results in a 1% per month penalty tax on the fair market value of the non-qualified investment.
                </p>

                <div className="rounded-xl border border-red-100 bg-red-50 p-5 mb-6 not-prose">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-red-800 mb-1">Do not hold crypto directly in a TFSA or RRSP</p>
                      <p className="text-sm text-red-700">
                        Some self-directed brokerage platforms allow it technically but it is a violation of the Income Tax Act. The penalty is 1% per month on the full value — that can quickly exceed your staking yields. The CRA has audited and penalized Canadians for this.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>What you can hold in a TFSA or RRSP:</strong> Crypto-linked ETFs listed on designated stock exchanges (e.g., Purpose Bitcoin ETF, CI Galaxy Ethereum ETF) are qualified investments and can be held in registered accounts. These are not the same as holding the underlying crypto.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Staking rewards earned in a non-registered account are taxed as income that year. There is currently no way to shield staking income from tax using a TFSA or RRSP directly. This is an active policy area: advocacy groups have pushed the government to create a crypto-eligible registered account structure, but no legislation has passed as of 2026.
                </p>
              </section>

              {/* Section 6 */}
              <section id="record-keeping" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<FileText className="h-6 w-6" />} number="06">
                  Record-Keeping Requirements
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  The CRA requires you to keep records of all crypto transactions for <strong>six years</strong> from the end of the tax year to which they relate. For crypto, a full record includes:
                </p>

                <ul className="space-y-3 mb-6 not-prose">
                  {[
                    { label: 'Transaction date and time', desc: 'Exact timestamp for each reward, purchase, sale, or trade.' },
                    { label: 'Amount in crypto', desc: 'The number of tokens received, sent, or traded.' },
                    { label: 'Fair market value in CAD', desc: 'The CAD equivalent at the time of the transaction.' },
                    { label: 'Platform or exchange used', desc: 'Name of the platform where the transaction occurred.' },
                    { label: 'Wallet addresses', desc: 'Source and destination addresses for on-chain transactions.' },
                    { label: 'Fees paid', desc: 'Network gas fees and platform fees (may affect ACB or be deductible).' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <CheckCircle2 className="h-4 w-4 text-[#00C896] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A1628]">{item.label}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-700 leading-relaxed mb-4">
                  StakeOnix provides a downloadable transaction history from your account dashboard. We recommend exporting this quarterly and running it through a crypto tax tool. Popular options compatible with Canadian tax rules include <strong>Koinly</strong>, <strong>Coinpanda</strong>, and <strong>CryptoTaxCalculator</strong>, all of which support CAD reporting and T1 output.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you transact across multiple platforms or self-custody wallets, you will need to consolidate records from all sources to calculate your accurate ACB across your full portfolio.
                </p>
              </section>

              {/* Section 7 */}
              <section id="reporting" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<FileText className="h-6 w-6" />} number="07">
                  How to Report on Your T1
                </SectionHeading>
                <p className="text-gray-700 text-lg leading-relaxed mb-5">
                  Crypto income and gains are reported in two places on the T1 General:
                </p>

                <div className="space-y-4 mb-6 not-prose">
                  <div className="rounded-xl border border-gray-200 p-5">
                    <p className="text-sm font-bold text-[#0A1628] mb-1">Staking reward income</p>
                    <p className="text-sm text-gray-500 mb-3">Reported as <strong>Other Income</strong> on Line 13000 of the T1 General (or the equivalent provincial line).</p>
                    <p className="text-xs text-gray-400">Enter the total CAD fair market value of all staking rewards received during the tax year.</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-5">
                    <p className="text-sm font-bold text-[#0A1628] mb-1">Capital gains from selling crypto</p>
                    <p className="text-sm text-gray-500 mb-3">Reported on <strong>Schedule 3 (Capital Gains or Losses)</strong>, then carried to Line 12700 of the T1 General.</p>
                    <p className="text-xs text-gray-400">List each disposition: date, proceeds, ACB, and resulting gain/loss. The taxable portion flows to T1 Line 12700.</p>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
                    <p className="text-sm font-bold text-amber-800 mb-1">T1135: Foreign Asset Reporting</p>
                    <p className="text-sm text-amber-700">If the total cost of your foreign crypto holdings (crypto held on non-Canadian platforms or in foreign wallets) exceeded CAD $100,000 at any point during the tax year, you must file T1135. Failure to file results in significant penalties.</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Most crypto tax software (Koinly, etc.) will generate a summary report you can use to populate these forms. If your crypto activity is complex (many trades, multiple platforms, DeFi), working with a Canadian accountant who specialises in crypto is strongly recommended.
                </p>
              </section>

              {/* Section 8 */}
              <section id="mistakes" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<AlertTriangle className="h-6 w-6" />} number="08">
                  Common Mistakes to Avoid
                </SectionHeading>
                <div className="space-y-4 not-prose">
                  {[
                    {
                      title: 'Only reporting when you convert to CAD',
                      desc: "Staking rewards are taxable when received, not when sold. Many Canadians only report when they cash out to CAD, which means they underreport income in the year rewards were received and overreport capital gains later (or miss losses). The CRA has begun auditing crypto users and this error is a primary trigger.",
                    },
                    {
                      title: 'Incorrect ACB calculation',
                      desc: 'Canada requires the average cost method. If you buy ETH at $3,000, receive $250 in ETH staking rewards, then buy more ETH at $4,000, your ACB per unit is the total cost divided by total units. Many people calculate ACB incorrectly, especially when mixing purchases with rewards.',
                    },
                    {
                      title: 'Ignoring network fees in ACB',
                      desc: 'Transaction fees paid to acquire crypto (e.g., gas fees when purchasing ETH) are added to the ACB of that crypto. Fees paid when selling reduce your proceeds. Both reduce your taxable gain. Ignoring fees overstates your capital gains.',
                    },
                    {
                      title: 'Treating crypto-to-crypto trades as non-taxable',
                      desc: 'Swapping ETH for SOL (or any other crypto-to-crypto trade) is a disposition of the first asset and an acquisition of the second. You must report the capital gain or loss on the disposed asset. This catches many Canadians off guard.',
                    },
                    {
                      title: 'Not filing T1135 for foreign held crypto',
                      desc: 'If your total foreign crypto holdings exceeded $100,000 CAD at any point in the year, T1135 is mandatory. Penalties start at $500/month for late filing, capped at $12,000. Wilful failure can result in gross negligence penalties of 50% of the unreported amount.',
                    },
                    {
                      title: 'Holding crypto inside a TFSA or RRSP directly',
                      desc: 'Crypto is not a qualified investment for registered accounts. If your broker allows it (some do technically), it is still a violation. The 1% monthly penalty applies to the full value held, not just gains.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 rounded-xl border border-gray-200 p-5">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A1628] mb-1">{item.title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 9: FAQ */}
              <section id="faq" className="mb-14 scroll-mt-24">
                <SectionHeading icon={<BookOpen className="h-6 w-6" />} number="09">
                  Frequently Asked Questions
                </SectionHeading>
                <div className="space-y-4 not-prose">
                  {faqItems.map((item) => (
                    <details key={item.q} className="group rounded-xl border border-gray-200 overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-semibold text-[#0A1628]">{item.q}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
                      </summary>
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Final CTA */}
              <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#0d2040] p-8 not-prose">
                <p className="text-[#00C896] text-xs font-semibold uppercase tracking-widest mb-3">Start staking in Canada</p>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to earn staking rewards the CRA-compliant way?
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  StakeOnix is FINTRAC-registered and built for Canadian users. Stake ETH, SOL, ADA, and DOT with CAD deposits via Interac e-Transfer.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/signup?utm_source=cra-tax-guide"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#00C896] hover:bg-[#00b386] text-white font-semibold px-6 py-3 transition-all text-sm hover:shadow-lg hover:shadow-[#00C896]/25"
                  >
                    Open Your Account
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/canada"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 text-white/80 hover:text-white font-medium px-6 py-3 transition-colors text-sm"
                  >
                    Back to Canada page
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar — sticky ToC on desktop */}
            <aside className="hidden lg:block sticky top-24 self-start">
              <div className="rounded-2xl border border-gray-200 p-5 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">On this page</p>
                <nav aria-label="Article sections">
                  <ol className="space-y-2">
                    {toc.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center gap-2.5 text-xs text-gray-500 hover:text-[#00C896] transition-colors py-0.5"
                        >
                          <span className="font-mono text-gray-300 w-4 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <div className="rounded-2xl bg-[#00C896]/8 border border-[#00C896]/20 p-5">
                <p className="text-xs font-bold text-[#0A1628] uppercase tracking-widest mb-3">Quick facts</p>
                <ul className="space-y-3">
                  {[
                    { label: 'Rewards taxed as', value: 'Income' },
                    { label: 'Capital gains inclusion', value: '50% (under $250K)' },
                    { label: 'Records required for', value: '6 years' },
                    { label: 'TFSA/RRSP eligible', value: 'No (direct crypto)' },
                    { label: 'T1135 threshold', value: '$100K CAD foreign' },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="font-semibold text-[#0A1628]">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Final disclaimer */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
              <strong>Disclaimer:</strong> This guide is for general informational purposes only. It does not constitute legal, tax, or financial advice. Tax rules change frequently and individual circumstances vary significantly. StakeOnix is not a tax advisor. Always consult a qualified Canadian tax professional or CPA before filing your return or making decisions based on this content. Last reviewed May 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function SectionHeading({
  children,
  icon,
  number,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  number: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#00C896]/10 text-[#00C896] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-mono">{number}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628] leading-tight">{children}</h2>
      </div>
    </div>
  )
}
