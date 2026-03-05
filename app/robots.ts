import { MetadataRoute } from 'next'

const APP_URL = 'https://www.stakeonix.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/deposit/',
          '/withdraw/',
          '/settings/',
          '/orders/',
          '/referrals/',
          '/notify/',
          '/ticket/',
          '/plan/',
          '/bill/',
          '/support/',
          '/worker/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  }
}
