import { MetadataRoute } from 'next'

const APP_URL = 'https://www.stakeonix.ca'

// [path, changeFrequency, priority]
const ROUTES: [string, MetadataRoute.Sitemap[number]['changeFrequency'], number][] = [
  ['', 'daily', 1.0],
  ['/plans', 'daily', 0.95],
  // High-intent search landing pages
  ['/how-to-invest-in-crypto', 'weekly', 0.95],
  ['/best-crypto-staking-platform', 'weekly', 0.92],
  ['/canada', 'weekly', 0.92],
  ['/uk-crypto-staking', 'weekly', 0.92],
  // Education & trust
  ['/what-is-staking', 'weekly', 0.85],
  ['/why-choose-us', 'monthly', 0.85],
  ['/proof-of-rewards', 'daily', 0.85],
  ['/referral-program', 'monthly', 0.80],
  ['/about', 'monthly', 0.80],
  ['/faq', 'weekly', 0.80],
  ['/what-is-mining', 'monthly', 0.78],
  ['/blog/cra-staking-tax-guide', 'monthly', 0.78],
  ['/app-info', 'monthly', 0.70],
  ['/contact', 'monthly', 0.65],
  // Legal
  ['/policy', 'yearly', 0.30],
  ['/cookies', 'yearly', 0.20],
  ['/terms', 'yearly', 0.20],
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map(([path, changeFrequency, priority]) => ({
    url: `${APP_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
