import { MetadataRoute } from 'next'
import { getLandingPageSlugs } from '@/sanity/lib/queries'

// Use force-dynamic to fetch landing pages from Sanity at request time
// This ensures the sitemap includes all published landing pages
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch landing pages from Sanity
  let landingPages: { slug: string }[] = []
  try {
    landingPages = await getLandingPageSlugs()
  } catch (error) {
    console.error('Error fetching landing pages for sitemap:', error)
  }

  // Static pages sitemap entries
  const staticEntries = allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : route.includes('mw-') ? 0.9 : 0.8,
  }))

  // Landing pages sitemap entries
  const landingPageEntries = landingPages.map((page) => ({
    url: `${baseUrl}/lp/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...landingPageEntries]
}
