import { MetadataRoute } from 'next'

const APP_URL = 'https://www.stakeonix.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: APP_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${APP_URL}/plans`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${APP_URL}/what-is-staking`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${APP_URL}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${APP_URL}/app-info`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.40,
    },
    {
      url: `${APP_URL}/policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.40,
    },
  ]
}
