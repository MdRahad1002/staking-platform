import type { MetadataRoute } from 'next'

export type SeoRoute = {
  path: string // canonical path, '/' for home
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

/**
 * Single source of truth for public, indexable content routes.
 * Consumed by BOTH app/sitemap.ts and middleware.ts so the sitemap and the
 * auth allowlist can never desync (a desync previously auth-gated new SEO
 * pages and got them reported as "Blocked by robots.txt").
 */
export const SEO_ROUTES: SeoRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/plans', changeFrequency: 'daily', priority: 0.95 },
  // High-intent search landing pages
  { path: '/how-to-invest-in-crypto', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/best-crypto-staking-platform', changeFrequency: 'weekly', priority: 0.92 },
  { path: '/canada', changeFrequency: 'weekly', priority: 0.92 },
  { path: '/uk-crypto-staking', changeFrequency: 'weekly', priority: 0.92 },
  { path: '/crypto-staking-calculator', changeFrequency: 'weekly', priority: 0.9 },
  // Asset-level staking pages
  { path: '/ethereum-staking', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/bitcoin-staking', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/solana-staking', changeFrequency: 'weekly', priority: 0.88 },
  { path: '/usdt-staking', changeFrequency: 'weekly', priority: 0.88 },
  // Education & trust
  { path: '/what-is-staking', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/why-choose-us', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/proof-of-rewards', changeFrequency: 'daily', priority: 0.85 },
  { path: '/referral-program', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/what-is-mining', changeFrequency: 'monthly', priority: 0.78 },
  { path: '/blog/cra-staking-tax-guide', changeFrequency: 'monthly', priority: 0.78 },
  { path: '/app-info', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.65 },
  // Legal
  { path: '/policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

/** Just the path strings, for the middleware public allowlist. */
export const PUBLIC_CONTENT_PATHS: string[] = SEO_ROUTES.map((r) => r.path)
