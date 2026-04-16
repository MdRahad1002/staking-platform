import Link from 'next/link'
import { Mail, Shield, TrendingUp, Globe, Zap, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const footerLinks = {
  Platform: [
    { href: '/plans', label: 'Staking Plans' },
    { href: '/what-is-staking', label: 'What is Staking?' },
    { href: '/what-is-mining', label: 'What is Mining?' },
    { href: '/why-choose-us', label: 'Why Choose Us' },
    { href: '/referral-program', label: 'Referral Program' },
    { href: '/about', label: 'About Us' },
    { href: '/app-info', label: 'Mobile App' },
    { href: '/faq', label: 'FAQ' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/policy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
  Support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'Help Center' },
  ],
}

const trustBadges = [
  { label: 'SSL Secured' },
  { label: 'FCA Authorised' },
  { label: '170+ Countries' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-96 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Trust badges strip */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="font-medium">FCA Authorised</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-red-400" />
              <span className="font-medium">FINTRAC Registered</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="font-medium">170+ Assets</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo linkClassName="mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-5">
              FCA-authorised, FINTRAC-registered crypto staking platform.
              Stake 170+ digital assets with institutional-grade security and full regulatory compliance.
              Staking rewards are variable and not guaranteed.
            </p>
            <div className="space-y-2 mb-5">
              <a href="mailto:info@stakeonix.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@stakeonix.com</span>
              </a>
              <a href="tel:+16133664391" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+1 (613) 366-4391</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>130 King St W, Toronto, ON M5X 2A2, Canada</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>3rd Floor, 1 Ashley Road, Altrincham, Cheshire, WA14 2DT, UK</span>
              </div>
            </div>

            {/* Registration & Licensing badges */}
            <div className="space-y-2 mb-5">
              <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.04] border border-white/8 px-3 py-2.5">
                <Shield className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">FCA Authorised UK</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">ONIX HOLDINGS LIMITED · Co. No. 03449482 · Registered in England &amp; Wales · FCA Ref. No. 820033</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.04] border border-white/8 px-3 py-2.5">
                <Shield className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">FINTRAC Registered Canada</p>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5">ONIX INTERNATIONAL INC. · BN: 820033090 · Registry ID: 1782217 · Ontario Business Corp.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* X / Twitter */}
              <a href="https://x.com/StakeOnix" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.265 5.632 5.9-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/+bJzRzQK0W-Q2ZTU5" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/16133664391" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/stakeonix?igsh=MTFyaHV5cHh3ZXphaA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1D3Cw9AjJ3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@stakeonix" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.81a4.85 4.85 0 0 1-1.01-.12z" />
                </svg>
              </a>
              {/* Email */}
              <a href="mailto:info@stakeonix.com" aria-label="Email"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4 text-white/80">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:pl-1 duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} StakeOnix.</span>
              <span className="text-white/20">|</span>
              <span>All rights reserved.</span>
            </div>
            <span className="text-xs text-white/40">Operated by ONIX HOLDINGS LIMITED - Company No. 03449482 - Registered in England &amp; Wales</span>
            <span className="text-xs text-white/40">Canadian Business Registry: ONIX INTERNATIONAL INC. | BN: 820033090 | Registry ID: 1782217 | Ontario Business Corp.</span>
          </div>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/policy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
