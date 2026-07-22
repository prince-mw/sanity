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
    },
    "locations": *[_type == "location" && isActive == true] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "locationCities": *[_type == "locationCity" && isActive == true && defined(country->slug.current) && defined(slug.current)] {
      "countrySlug": country->slug.current,
      "citySlug": slug.current,
      "lastModified": _updatedAt
    },
    "pageSeoDocs": *[_type == "pageSeo" && defined(pageId)] {
      pageId,
      "lastModified": _updatedAt
    }
  }`

  return client.fetch(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.movingwalls.com'
  const currentDate = new Date().toISOString()

  // Static pages with priorities. changeFreq reflects how often each page's content
  // actually changes — avoid 'daily' unless content genuinely updates that often.
  const staticPages = [
    { route: '', priority: 1, changeFreq: 'monthly' as const },
    { route: '/about', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/contact', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/platform', priority: 0.9, changeFreq: 'weekly' as const },
    // Products
    { route: '/mw-planner', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-market', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-activate', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-measure', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-influence', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-science', priority: 0.9, changeFreq: 'monthly' as const },
    { route: '/mw-studio', priority: 0.9, changeFreq: 'monthly' as const },
    // Solutions
    { route: '/brands', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/agencies', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/media-owners', priority: 0.85, changeFreq: 'monthly' as const },
    // Retail/Healthcare/Finance industry pages temporarily hidden — templated content, not final. Re-add once published.
    // Resources
    { route: '/blog', priority: 0.9, changeFreq: 'weekly' as const },
    { route: '/case-studies', priority: 0.85, changeFreq: 'weekly' as const },
    { route: '/events', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/webinars', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/ebooks', priority: 0.75, changeFreq: 'monthly' as const },
    // Whitepapers page temporarily hidden — being reworked. Re-add once published.
    { route: '/press-news', priority: 0.8, changeFreq: 'weekly' as const },
    // About
    { route: '/our-story', priority: 0.7, changeFreq: 'monthly' as const },
    { route: '/our-journey', priority: 0.7, changeFreq: 'monthly' as const },
    // Leadership page temporarily hidden — under construction. Re-add once published.
    { route: '/careers', priority: 0.8, changeFreq: 'weekly' as const },
    // Other
    // Integrations page temporarily hidden — being updated. Re-add once published.
    { route: '/locations', priority: 0.7, changeFreq: 'weekly' as const },
    { route: '/ooh-formats', priority: 0.7, changeFreq: 'monthly' as const },
    // API Reference page temporarily hidden — being reworked. Re-add once published.
    // Documentation page temporarily hidden — being reworked. Re-add once published.
    { route: '/community', priority: 0.6, changeFreq: 'monthly' as const },
    // Help Center page temporarily hidden — being updated. Re-add once published.
    { route: '/products', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/movinghearts', priority: 0.4, changeFreq: 'yearly' as const },
    { route: '/search', priority: 0.5, changeFreq: 'weekly' as const },
    // Legal
    { route: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/cookies', priority: 0.3, changeFreq: 'yearly' as const },
    { route: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
    // Press releases (series-c-funding, london-headquarters, ai-powered-audience-targeting,
    // privacy-first-measurement, transit-partnership, adtech-company-of-year) temporarily
    // hidden — being reworked. Re-add once published.
  ]

  // Fetch dynamic content from Sanity
  let sanityData = {
    blogPosts: [] as Array<{ slug: string; lastModified: string }>,
    caseStudies: [] as Array<{ slug: string; lastModified: string }>,
    pressReleases: [] as Array<{ slug: string; lastModified: string }>,
    events: [] as Array<{ slug: string; lastModified: string }>,
    webinars: [] as Array<{ slug: string; lastModified: string }>,
    ebooks: [] as Array<{ slug: string; lastModified: string }>,
    landingPages: [] as Array<{ slug: string; lastModified: string }>,
    products: [] as Array<{ slug: string; lastModified: string }>,
    teamMembers: [] as Array<{ slug: string; lastModified: string }>,
    locations: [] as Array<{ slug: string; lastModified: string }>,
    locationCities: [] as Array<{ countrySlug: string; citySlug: string; lastModified: string }>,
    pageSeoDocs: [] as Array<{ pageId: string; lastModified: string }>,
  }

  try {
    sanityData = await getSitemapData()
  } catch (error) {
    console.error('Error fetching Sanity data for sitemap:', error)
  }

  // Map each static route to its pageSeo document's real last-updated time (pageId matches the
  // route slug without a leading "/"; the homepage uses pageId "home"). Falls back to the current
  // build/request time for routes that have no pageSeo document (e.g. /products, /search).
  const pageSeoLastModified = new Map(sanityData.pageSeoDocs.map((doc) => [doc.pageId, doc.lastModified]))
  const lastModifiedForRoute = (route: string) => pageSeoLastModified.get(route === '' ? 'home' : route.slice(1)) || currentDate

  // Static pages entries
  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedForRoute(route),
    changeFrequency: changeFreq,
    priority,
  }))

  // Location pages entries (sourced from Sanity so new/removed countries stay in sync)
  const locationEntries: MetadataRoute.Sitemap = sanityData.locations
    .filter((loc) => loc.slug)
    .map((loc) => ({
      url: `${baseUrl}/locations/${loc.slug}`,
      lastModified: loc.lastModified || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
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
      changeFrequency: 'monthly' as const,
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

  // Location city entries
  const locationCityEntries: MetadataRoute.Sitemap = sanityData.locationCities
    .filter(city => city.countrySlug && city.citySlug)
    .map(city => ({
      url: `${baseUrl}/locations/${city.countrySlug}/${city.citySlug}`,
      lastModified: city.lastModified || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.55,
    }))

  return [
    ...staticEntries,
    ...locationEntries,
    ...blogEntries,
    ...caseStudyEntries,
    ...pressEntries,
    ...eventEntries,
    ...webinarEntries,
    ...ebookEntries,
    ...landingPageEntries,
    ...leadershipEntries,
    ...locationCityEntries,
  ]
}
