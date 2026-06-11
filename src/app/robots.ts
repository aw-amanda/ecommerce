import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = false

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aw-amanda.github.io/ecommerce'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}