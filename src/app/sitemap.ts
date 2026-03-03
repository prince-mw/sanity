import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.movingwalls.com'
  const currentDate = new Date().toISOString()

  // Main pages
  const mainPages = [
    '',
    '/about',
    '/contact',
    '/events',
    '/integrations',
    '/locations',
    '/platform',
    '/privacy',
    '/cookies',
    '/ebooks',
    '/ooh-formats',
    '/terms',
  ]

  // About pages
  const aboutPages = [
    '/our-story',
    '/our-journey',
    '/leadership',
    '/careers',
    '/press-news',
  ]

  // Products pages
  const productPages = [
    '/mw-planner',
    '/mw-market',
    '/mw-activate',
    '/mw-measure',
    '/mw-influence',
    '/mw-science',
    '/mw-studio',
  ]

  // Solutions pages
  const solutionPages = [
    '/brands',
    '/agencies',
    '/media-owners',
    '/retail',
    '/healthcare',
    '/finance',
  ]

  // Resources pages
  const resourcePages = [
    '/api-reference',
    '/blog',
    '/case-studies',
    '/community',
    '/documentation',
    '/help-center',
    '/webinars',
    '/whitepapers',
  ]

  // Press pages
  const pressPages = [
    '/series-c-funding',
    '/london-headquarters',
    '/ai-powered-audience-targeting',
    '/privacy-first-measurement',
    '/transit-partnership',
    '/adtech-company-of-year',
  ]

  // Location pages
  const locationPages = [
    '/locations/australia',
    '/locations/india',
    '/locations/indonesia',
    '/locations/japan',
    '/locations/malaysia',
    '/locations/philippines',
    '/locations/singapore',
    '/locations/sri-lanka',
    '/locations/thailand',
  ]

  // Combine all pages
  const allPages = [
    ...mainPages,
    ...aboutPages,
    ...productPages,
    ...solutionPages,
    ...resourcePages,
    ...pressPages,
    ...locationPages,
  ]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('mw-') ? 0.9 : 0.8,
  }))
}
