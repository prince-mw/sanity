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
    '/privacy',
    '/cookies',
    '/ebooks',
    '/ooh-formats',
    '/terms',
  ]

  // About pages
  const aboutPages = [
    '/our-story',
    // '/our-journey',
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
    '/blog',
    '/case-studies',
    '/whitepapers',
    '/documentation',
    '/help-center',
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
    priority: route === '' ? 1 : route.includes('mw-') ? 0.9 : 0.8,
  }))
}
