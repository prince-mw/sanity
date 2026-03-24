import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

// Use force-dynamic to fetch content from Sanity at request time
export const dynamic = 'force-dynamic'

// Publishing filter for Sanity queries
const publishedFilter = `isPublished == true && status == "published" && (scheduledPublishAt == null || scheduledPublishAt <= now())`

// Fetch all slugs for sitemap
async function getSitemapData() {
  const query = `{
    "blogPosts": *[_type == "blogPost" && ${publishedFilter}] | order(publishedAt desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "caseStudies": *[_type == "caseStudy" && ${publishedFilter}] | order(publishedAt desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "pressReleases": *[_type == "pressRelease" && ${publishedFilter}] | order(publishedAt desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "events": *[_type == "event" && ${publishedFilter}] | order(startDate desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "webinars": *[_type == "webinar" && ${publishedFilter}] | order(date desc) {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "ebooks": *[_type == "ebook" && ${publishedFilter}] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "whitepapers": *[_type == "whitepaper" && ${publishedFilter}] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "landingPages": *[_type == "landingPage" && ${publishedFilter}] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "products": *[_type == "product" && ${publishedFilter}] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "teamMembers": *[_type == "teamMember" && ${publishedFilter}] {
      "slug": slug.current,
      "lastModified": _updatedAt
    }
  }`
  
  return client.fetch(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.movingwalls.com'
  const currentDate = new Date().toISOString()

  // Static pages with priorities
  const staticPages = [
    { route: '', priority: 1, changeFreq: 'daily' as const },
    { route: '/about', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/platform', priority: 0.9, changeFreq: 'weekly' as const },
    // Products
    { route: '/mw-planner', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-market', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-activate', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-measure', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-influence', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-science', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/mw-studio', priority: 0.9, changeFreq: 'weekly' as const },
    // Solutions
    { route: '/brands', priority: 0.85, changeFreq: 'weekly' as const },
    { route: '/agencies', priority: 0.85, changeFreq: 'weekly' as const },
    { route: '/media-owners', priority: 0.85, changeFreq: 'weekly' as const },
    { route: '/retail', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/healthcare', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/finance', priority: 0.8, changeFreq: 'monthly' as const },
    // Resources
    { route: '/blog', priority: 0.9, changeFreq: 'daily' as const },
    { route: '/case-studies', priority: 0.85, changeFreq: 'weekly' as const },
    { route: '/events', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/webinars', priority: 0.8, changeFreq: 'weekly' as const },
    { route: '/ebooks', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/whitepapers', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/press-news', priority: 0.8, changeFreq: 'weekly' as const },
    // About
    { route: '/our-story', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/our-journey', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/leadership', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/careers', priority: 0.8, changeFreq: 'weekly' as const },
    // Other
    { route: '/integrations', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/locations', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/ooh-formats', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/api-reference', priority: 0.6, changeFreq: 'monthly' as const },
    { route: '/documentation', priority: 0.6, changeFreq: 'monthly' as const },
    { route: '/community', priority: 0.6, changeFreq: 'monthly' as const },
    { route: '/help-center', priority: 0.6, changeFreq: 'monthly' as const },
    { route: '/products', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/movinghearts', priority: 0.4, changeFreq: 'yearly' as const },
    { route: '/search', priority: 0.5, changeFreq: 'weekly' as const },
    // Legal
    { route: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/cookies', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
    // Press releases (static)
    { route: '/series-c-funding', priority: 0.6, changeFreq: 'yearly' as const },
    { route: '/london-headquarters', priority: 0.6, changeFreq: 'yearly' as const },
    { route: '/ai-powered-audience-targeting', priority: 0.6, changeFreq: 'yearly' as const },
    { route: '/privacy-first-measurement', priority: 0.6, changeFreq: 'yearly' as const },
    { route: '/transit-partnership', priority: 0.6, changeFreq: 'yearly' as const },
    { route: '/adtech-company-of-year', priority: 0.6, changeFreq: 'yearly' as const },
  ]

  // Location pages
  const locationPages = [
    'australia', 'india', 'indonesia', 'japan', 'malaysia',
    'philippines', 'singapore', 'sri-lanka', 'thailand', 'usa'
  ].map(loc => ({
    route: `/locations/${loc}`,
    priority: 0.6,
    changeFreq: 'monthly' as const
  }))

  // Fetch dynamic content from Sanity
  let sanityData = {
    blogPosts: [] as Array<{ slug: string; lastModified: string }>,
    caseStudies: [] as Array<{ slug: string; lastModified: string }>,
    pressReleases: [] as Array<{ slug: string; lastModified: string }>,
    events: [] as Array<{ slug: string; lastModified: string }>,
    webinars: [] as Array<{ slug: string; lastModified: string }>,
    ebooks: [] as Array<{ slug: string; lastModified: string }>,
    whitepapers: [] as Array<{ slug: string; lastModified: string }>,
    landingPages: [] as Array<{ slug: string; lastModified: string }>,
    products: [] as Array<{ slug: string; lastModified: string }>,
    teamMembers: [] as Array<{ slug: string; lastModified: string }>,
  }

  try {
    sanityData = await getSitemapData()
  } catch (error) {
    console.error('Error fetching Sanity data for sitemap:', error)
  }

  // Static pages entries
  const staticEntries: MetadataRoute.Sitemap = [...staticPages, ...locationPages].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }))

  // Blog posts entries
  const blogEntries: MetadataRoute.Sitemap = sanityData.blogPosts
    .filter(post => post.slug)
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Case studies entries
  const caseStudyEntries: MetadataRoute.Sitemap = sanityData.caseStudies
    .filter(cs => cs.slug)
    .map(cs => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: cs.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Press releases entries
  const pressEntries: MetadataRoute.Sitemap = sanityData.pressReleases
    .filter(pr => pr.slug)
    .map(pr => ({
      url: `${baseUrl}/press-news/${pr.slug}`,
      lastModified: pr.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Events entries
  const eventEntries: MetadataRoute.Sitemap = sanityData.events
    .filter(event => event.slug)
    .map(event => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.lastModified || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  // Webinars entries
  const webinarEntries: MetadataRoute.Sitemap = sanityData.webinars
    .filter(webinar => webinar.slug)
    .map(webinar => ({
      url: `${baseUrl}/webinars/${webinar.slug}`,
      lastModified: webinar.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Ebooks entries
  const ebookEntries: MetadataRoute.Sitemap = sanityData.ebooks
    .filter(ebook => ebook.slug)
    .map(ebook => ({
      url: `${baseUrl}/ebooks/${ebook.slug}`,
      lastModified: ebook.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Whitepapers entries
  const whitepaperEntries: MetadataRoute.Sitemap = sanityData.whitepapers
    .filter(wp => wp.slug)
    .map(wp => ({
      url: `${baseUrl}/whitepapers/${wp.slug}`,
      lastModified: wp.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Landing pages entries
  const landingPageEntries: MetadataRoute.Sitemap = sanityData.landingPages
    .filter(lp => lp.slug)
    .map(lp => ({
      url: `${baseUrl}/${lp.slug}`,
      lastModified: lp.lastModified || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Leadership/team member entries
  const leadershipEntries: MetadataRoute.Sitemap = sanityData.teamMembers
    .filter(member => member.slug)
    .map(member => ({
      url: `${baseUrl}/leadership/${member.slug}`,
      lastModified: member.lastModified || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  return [
    ...staticEntries,
    ...blogEntries,
    ...caseStudyEntries,
    ...pressEntries,
    ...eventEntries,
    ...webinarEntries,
    ...ebookEntries,
    ...whitepaperEntries,
    ...landingPageEntries,
    ...leadershipEntries,
  ]
}
