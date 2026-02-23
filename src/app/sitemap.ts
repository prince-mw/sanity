import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.movingwalls.com'
  const currentDate = new Date().toISOString()

  // Main pages
  const mainPages = [
    '',
    '/contact',
    '/events',
    '/locations',
    '/partners',
    '/privacy',
    '/cookies',
  ]

  // About pages
  const aboutPages = [
    '/about/our-story',
    // '/about/our-journey',
    '/about/leadership',
    '/about/careers',
    '/about/press-news',
  ]

  // Products pages
  const productPages = [
    '/products/mw-planner',
    '/products/mw-market',
    '/products/mw-activate',
    '/products/mw-measure',
    '/products/mw-influence',
    '/products/mw-science',
    '/products/mw-studio',
  ]

  // Solutions pages
  const solutionPages = [
    '/solutions/brands',
    '/solutions/agencies',
    '/solutions/media-owners',
    '/solutions/retail',
    '/solutions/healthcare',
    '/solutions/finance',
  ]

  // Resources pages
  const resourcePages = [
    '/resources',
    '/resources/blog',
    '/resources/case-studies',
    '/resources/whitepapers',
    '/resources/documentation',
    '/resources/help-center',
  ]

  // Press pages
  const pressPages = [
    '/press/series-c-funding',
    '/press/london-headquarters',
    '/press/ai-powered-audience-targeting',
    '/press/privacy-first-measurement',
    '/press/transit-partnership',
    '/press/adtech-company-of-year',
  ]

  // Combine all pages
  const allPages = [
    ...mainPages,
    ...aboutPages,
    ...productPages,
    ...solutionPages,
    ...resourcePages,
    ...pressPages,
  ]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('/products/') ? 0.9 : 0.8,
  }))
}
