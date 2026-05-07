import { Metadata } from 'next'
import { Shield, Target, Users, TrendingUp, Mail, Phone, MapPin } from 'lucide-react'

const APP_URL = 'https://www.stakeonix.ca'

export const metadata: Metadata = {
  title: 'About StakeOnix | FCA-Authorised Crypto Staking Platform',
  description:
    'StakeOnix is an FCA-authorised, FINTRAC-registered crypto staking platform operated by ONIX HOLDINGS LIMITED. Learn about our mission, regulatory credentials, and how we make professional crypto staking accessible.',
  alternates: { canonical: `${APP_URL}/about` },
  openGraph: {
    title: 'About StakeOnix | FCA-Authorised Crypto Staking Platform',
    description: 'FCA-authorised, FINTRAC-registered crypto staking platform. Learn about our mission, regulatory credentials, and security standards.',
    url: `${APP_URL}/about`,
    images: [{ url: `${APP_URL}/opengraph-image`, width: 1200, height: 630, alt: 'About StakeOnix' }],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'StakeOnix',
  url: APP_URL,
  description:
    'StakeOnix is a regulated cryptocurrency staking platform built on professional-grade infrastructure. Authorised by the FCA in the UK and registered with FINTRAC in Canada, we provide transparent, compliant staking services on 170+ digital assets.',
  foundingDate: '2020',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
  legalName: 'ONIX HOLDINGS LIMITED',
  email: 'info@stakeonix.ca',
  telephone: ['+1-613-366-4391', '+44-056-0384-6173'],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '130 King St W',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      postalCode: 'M5X 2A2',
      addressCountry: 'CA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '1 Ashley Road',
      addressLocality: 'Altrincham',
      addressRegion: 'Cheshire',
      postalCode: 'WA14 2DT',
      addressCountry: 'GB',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+1-613-366-4391',
      contactType: 'customer support',
      email: 'info@stakeonix.ca',
      availableLanguage: 'English',
      areaServed: 'CA',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-056-0384-6173',
      contactType: 'customer support',
      availableLanguage: 'English',
      areaServed: 'GB',
    },
  ],
  sameAs: [
    'https://x.com/StakeOnix',
    'https://t.me/StakeOnix',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: APP_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${APP_URL}/about` },
  ],
}

const values = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Regulatory Compliance',
    description: 'FCA-authorised in the UK, FINTRAC-registered in Canada. We operate under the same standards as traditional financial institutions.',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Transparency',
    description: 'Every reward, fee, and transaction is visible on your dashboard. No fine print, no hidden charges, no surprises.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Accessibility',
    description: 'Professional staking infrastructure made available to individuals, not just institutions. One account, 170+ assets.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Security First',
    description: 'AES-256 encryption, multi-signature cold wallets, 2FA, withdrawal PIN protection and 24/7 automated threat monitoring.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About StakeOnix</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A regulated, transparent cryptocurrency staking platform built for individuals
            who want professional-grade infrastructure without the institutional barriers.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            StakeOnix was founded to make professional crypto staking accessible to individuals.
            Institutional-grade staking has historically been the preserve of large capital allocators.
            We built the infrastructure to change that, regulated in both Canada and the UK, so that
            anyone with a verified account and eligible assets can participate.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            We do not promise specific returns. Staking rewards are variable and depend on network
            conditions, asset type, and plan terms. What we do promise: full transparency, regulatory
            compliance, and infrastructure that operates to the standard of a licensed financial entity.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Regulatory Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            {[
              { value: 'FCA', label: 'Authorised \u00b7 UK (Ref. 820033)' },
              { value: 'FINTRAC', label: 'Registered \u00b7 Canada (BN: 820033090)' },
              { value: '170+', label: 'Supported Assets' },
              { value: '99.9%', label: 'Platform Uptime Target' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Headquarters */}
        <div className="mt-16 glass-card p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Our Headquarters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <a href="mailto:info@stakeonix.ca" className="text-sm font-medium hover:text-primary transition-colors">info@stakeonix.ca</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Canada HQ</p>
                <a href="tel:+16133664391" className="text-sm font-medium hover:text-primary transition-colors">+1 (613) 366-4391</a>
                <p className="text-xs text-muted-foreground mt-2 mb-1">UK Office</p>
                <a href="tel:+4405603846173" className="text-sm font-medium hover:text-primary transition-colors">+44 (0) 56 0384 6173</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Canada (Head Office)</p>
                <p className="text-sm font-medium">130 King St W, Toronto,<br />ON M5X 2A2, Canada</p>
                <p className="text-xs text-muted-foreground mt-2 mb-1">United Kingdom</p>
                <p className="text-sm font-medium">Ashley Road, Altrincham,<br />Cheshire, WA14 2DT, UK</p>
                <p className="text-xs text-muted-foreground mt-1">ONIX HOLDINGS LIMITED<br />Company No. 03449482<br />Registered in England &amp; Wales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
