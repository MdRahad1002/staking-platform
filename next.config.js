/** @type {import('next').NextConfig} */

const APP_DOMAIN = process.env.NEXTAUTH_URL
  ? new URL(process.env.NEXTAUTH_URL).hostname
  : 'stakeonix.com'

// ── Content-Security-Policy ───────────────────────────────────────────────────
// Adjust 'script-src' / 'connect-src' if you add third-party scripts later.
const CSP = [
  "default-src 'self'",
  // Inline styles required by Tailwind / CSS-in-JS; hashes can replace unsafe-inline in future
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  // next/image, avatar URLs, coin icons from external CDNs
  "img-src 'self' blob: data: https:",
  // Next.js runtime + any analytics you add
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  // WebSockets for Next.js HMR in dev, API calls, and Resend CDN
  `connect-src 'self' https://api.resend.com https://api.nowpayments.io https://api.westwallet.io wss:`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Upgrade insecure HTTP sub-resource requests to HTTPS
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  // Prevent the site being iframed (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Stop browsers guessing MIME types
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Disable referrer leakage to external domains
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Force HTTPS for 2 years, include subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Control browser feature access
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: CSP },
  // Prevent IE compatibility mode
  { key: 'X-UA-Compatible', value: 'IE=edge' },
  // DNS prefetch for performance without leaking origins
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      // Lock Server Actions to the app's own origin never wildcard in production
      allowedOrigins: [APP_DOMAIN, `www.${APP_DOMAIN}`, 'localhost:3000'],
    },
  },
  // Force non-www → www so Google always sees a clean 301 to the canonical domain
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'stakeonix.com' }],
        destination: 'https://www.stakeonix.com/:path*',
        permanent: true,
      },
    ]
  },
  // /favicon.ico → /icon (the Next.js generated PNG) so Google can fetch the favicon
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon',
      },
    ]
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively; they are fingerprinted by Next.js
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig
