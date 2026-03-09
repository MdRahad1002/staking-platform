import Link from 'next/link'
import { Twitter, Mail, Shield, TrendingUp, Globe, Zap, Phone, MapPin, Instagram, Facebook, MessageCircle, Send } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

const footerLinks = {
  Platform: [
    { href: '/plans', label: 'Staking Plans' },
    { href: '/what-is-staking', label: 'What is Staking?' },
    { href: '/about', label: 'About Us' },
    { href: '/app-info', label: 'Mobile App' },
    { href: '/faq', label: 'FAQ' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/policy', label: 'Privacy Policy' },
  ],
  Support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'Help Center' },
  ],
}

const trustBadges = [
  { label: 'SSL Secured' },
  { label: 'Instant Payouts' },
  { label: '$2.5B+ Managed' },
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
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Instant Payouts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="font-medium">$2.5B+ Managed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="font-medium">170+ Countries</span>
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
              The most trusted crypto staking platform. Grow your digital assets with
              institutional-grade security and competitive daily returns.
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
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="https://x.com/StakeOnix" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://t.me/+bJzRzQK0W-Q2ZTU5" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <Send className="h-4 w-4" />
              </a>
              <a href="https://wa.me/qr/PER5MG7B7R6EF1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/stakeonix?igsh=MTFyaHV5cHh3ZXphaA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/share/1D3Cw9AjJ3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@stakeonix" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.83 1.56V6.81a4.85 4.85 0 01-1.06-.12z" />
                </svg>
              </a>
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} StakeOnix.</span>
            <span className="text-white/20">|</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/policy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
