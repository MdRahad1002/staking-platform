import { MetadataRoute } from 'next'
import { SEO_ROUTES } from '@/lib/seo-routes'

const APP_URL = 'https://www.stakeonix.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return SEO_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? APP_URL : `${APP_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
