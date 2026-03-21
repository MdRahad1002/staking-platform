import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | StakeOnix',
  description:
    'Read the StakeOnix Cookie Policy to understand how we use cookies and similar tracking technologies to operate and improve our crypto staking platform.',
  alternates: { canonical: 'https://www.stakeonix.com/cookies' },
  robots: { index: false, follow: false },
}

const sections = [
  {
    title: '1. What Are Cookies?',
    content: `Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners.

Cookies do not contain viruses or malware and cannot access other information stored on your device. We use cookies to make StakeOnix work correctly, keep your account secure, and understand how you use our platform so we can improve it.`,
  },
  {
    title: '2. Types of Cookies We Use',
    content: `We use the following categories of cookies on the StakeOnix platform:

Strictly Necessary Cookies
These cookies are essential for the website to function and cannot be switched off. They are typically set in response to actions you make such as logging in, setting your privacy preferences, or filling in forms. Without these cookies, services you have asked for cannot be provided.
• Session authentication tokens (NextAuth.js)
• CSRF protection tokens
• Secure session identifiers
• Load balancer session cookies

Functional Cookies
These cookies allow the website to remember choices you have made (such as your language or dark/light mode preference) and provide enhanced, more personal features.
• Theme/display preferences
• Notification acknowledgement flags
• Dashboard layout preferences

Performance and Analytics Cookies
These cookies collect anonymous information about how visitors use our website. All information collected is aggregated and therefore anonymous. It helps us understand page popularity, traffic sources, and user flow so we can improve performance.
• Page visit counts and session duration
• Error tracking and performance monitoring
• Feature usage analytics

We do not currently use third-party advertising cookies or cross-site tracking cookies.`,
  },
  {
    title: '3. How Long Cookies Last',
    content: `Session Cookies Temporary cookies that expire when you close your browser. These are used for your login session and security tokens.

Persistent Cookies Remain on your device for a set period or until you delete them:
• Preference cookies: up to 12 months
• Analytics identifiers: up to 24 months
• Security tokens: up to 30 days (or until you log out)

You can delete all cookies at any time through your browser settings.`,
  },
  {
    title: '4. Third-Party Cookies',
    content: `Some cookies are placed by third-party services that appear on our pages. We carefully select and review any third parties that may set cookies. Currently, no third-party advertising or tracking networks are used on StakeOnix.

Vercel (hosting infrastructure) may set anonymous performance monitoring cookies to ensure platform uptime and speed. These do not identify you personally.`,
  },
  {
    title: '5. How to Control and Delete Cookies',
    content: `You have the right to decide whether to accept or reject optional cookies. You can exercise cookie preferences by adjusting your browser settings:

Google Chrome: Settings → Privacy and Security → Cookies and other site data
Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data
Safari: Preferences → Privacy → Manage Website Data
Microsoft Edge: Settings → Cookies and site permissions

Please note: if you block or delete strictly necessary cookies, some parts of StakeOnix may not work correctly in particular, you will not be able to log in to your account.

You can also opt out of analytics tracking globally by enabling "Do Not Track" in your browser settings. StakeOnix respects this signal.`,
  },
  {
    title: '6. Cookies and Your Security',
    content: `All authentication cookies on StakeOnix are:
• Transmitted over HTTPS only (secure flag set)
• Inaccessible to JavaScript (httpOnly flag set where supported)
• Scoped to our domain only (SameSite=Strict or Lax)
• Invalidated immediately on logout

We never store passwords, payment card data, or private wallet keys in cookies. Staking wallet credentials are held exclusively in encrypted server-side storage.`,
  },
  {
    title: '7. Changes to This Cookie Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our use of cookies. When we make material changes, we will update the "last updated" date at the top of this page and, where appropriate, notify you via email or platform notification.

We encourage you to review this page periodically to stay informed about our use of cookies.`,
  },
  {
    title: '8. Contact Us',
    content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us:

Email: info@stakeonix.com

Canada (Head Office)
ONIX HOLDINGS LIMITED
130 King St W, Toronto, ON M5X 2A2, Canada
Phone: +1 (613) 366-4391

United Kingdom (UK Office)
ONIX HOLDINGS LIMITED
Company No. 03449482 — Registered in England & Wales
Ashley Road, Altrincham, Cheshire, WA14 2DT, United Kingdom
Phone: +44 (0) 56 0384 6173

Our Data Protection team will respond to all cookie-related enquiries within 5 business days.`,
  },
]

export default function CookiesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: March 13, 2026</p>
          <div className="mt-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
            <p className="text-sm text-muted-foreground">
              This Cookie Policy explains how ONIX HOLDINGS LIMITED (Canada) and ONIX HOLDINGS LIMITED (Company No. 03449482, registered in England &amp; Wales) (together, &quot;StakeOnix&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) use cookies and similar technologies
              when you visit <Link href="/" className="text-cyan-400 hover:underline">www.stakeonix.com</Link>.
              It should be read alongside our{' '}
              <Link href="/policy" className="text-cyan-400 hover:underline">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="text-cyan-400 hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span className="text-white/20">|</span>
          <Link href="/policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-white/20">|</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
