import Link from 'next/link'
import { LogoIcon } from '@/components/shared/Logo'
import {
  COMPANY_NAME,
  COMPANY_LEGAL_NAME,
  FINTRAC_MSB_NUMBER,
  SUPPORT_EMAIL,
  APP_URL,
} from '../data'

const footerColumns = [
  {
    heading: 'Platform',
    links: [
      { label: 'Stake', href: '/signup?utm_source=canada-lp' },
      { label: 'Live Yields', href: '/canada#yields' },
      { label: 'Fees', href: '/fees' },
      { label: 'Supported Chains', href: '/canada#yields' },
    ],
  },
  {
    heading: 'Canadian Users',
    links: [
      { label: 'CRA Tax Guide', href: '/blog/cra-staking-tax-guide' },
      { label: 'FINTRAC Registration', href: 'https://www.fintrac-canafe.gc.ca/re-en', external: true },
      { label: 'Risk Disclosure', href: '/risk-disclosure' },
      { label: 'Proof of Reserves', href: '/proof-of-reserves' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/policy' },
      { label: 'AML Policy', href: '/aml-policy' },
      { label: 'Complaints', href: '/complaints' },
    ],
  },
]

export function CanadaFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060E1C] border-t border-white/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group" aria-label={`${COMPANY_NAME} home`}>
              <LogoIcon className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-extrabold text-xl tracking-tight leading-none">
                <span className="text-white/60 font-bold">Stake</span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent font-extrabold">onix</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Canada&apos;s CSA-registered multi-chain staking platform. Built for Canadian investors
              who want real yields, real custody, and real regulatory protection.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-4 inline-block text-[#00C896] text-sm hover:underline underline-offset-4"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          {/* Nav columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5" role="list">
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-[#00C896] text-sm transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-white/40 hover:text-[#00C896] text-sm transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration info */}
        <div className="border-t border-white/[0.07] pt-8 space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/30">
            <span>{COMPANY_LEGAL_NAME}</span>
            <span>FINTRAC: {FINTRAC_MSB_NUMBER}</span>
            <span>© {year} {COMPANY_NAME}. All rights reserved.</span>
          </div>

          {/* Risk disclaimer */}
          <p className="text-xs text-white/25 leading-relaxed max-w-4xl">
            Crypto staking involves risk, including potential loss of principal, market volatility,
            network risk, and slashing. Yields shown on this page are estimates based on current
            network conditions and are not guaranteed. Past performance does not indicate future
            results. {COMPANY_LEGAL_NAME} is registered with FINTRAC ({FINTRAC_MSB_NUMBER}) and
            operates under applicable Canadian securities laws. We are not a bank, trust company,
            or investment fund. Client crypto assets are not CDIC-insured. Please read our{' '}
            <a href="/risk-disclosure" className="underline hover:text-white/40 transition-colors">
              Risk Disclosure
            </a>{' '}
            before staking.
          </p>
        </div>
      </div>
    </footer>
  )
}
