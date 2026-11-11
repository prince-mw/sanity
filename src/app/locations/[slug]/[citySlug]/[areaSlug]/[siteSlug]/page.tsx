import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { sitesFor, usingSample } from '@/lib/inventory/source'
import { siteHasPage } from '@/lib/inventory/normalize'
import { getSiteContent, similarSites, siteInsightsFor } from '@/lib/inventory/siteContent'
import { contentWords, siteFaqs, siteOverview } from '@/lib/inventory/siteFaq'
import { getCountryContent } from '@/lib/inventory/placeContent'
import { safeFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import type { RelatedItem } from '@/lib/inventory/siteContent'

// Last resort for the related rows: the latest case studies and articles, so each row always has three
// cards (Rif, 11 Nov 2026: "fill it up with all 3").
async function latest(): Promise<{ posts: RelatedItem[]; caseStudies: RelatedItem[] }> {
  const q = (t: string) => `*[_type == "${t}" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3]{ _id, title, "slug": slug.current, excerpt, featuredImage, publishedAt }`
  const [p, c] = await Promise.all([safeFetch<any[]>(q('blogPost'), {}, []), safeFetch<any[]>(q('caseStudy'), {}, [])]) // eslint-disable-line @typescript-eslint/no-explicit-any
  const img = (f: unknown) => { try { return f ? urlFor(f).width(800).height(500).fit('crop').url() : null } catch { return null } }
  const map = (kind: RelatedItem['kind'], d: any): RelatedItem => ({ kind, id: d._id, title: d.title, href: kind === 'post' ? `/blog/${d.slug}` : `/case-studies/${d.slug}`, image: img(d.featuredImage), excerpt: d.excerpt ?? null, publishedAt: d.publishedAt ?? null, score: 10, reason: 'Latest' }) // eslint-disable-line @typescript-eslint/no-explicit-any
  return { posts: (p ?? []).filter(d => d?.slug).map(d => map('post', d)), caseStudies: (c ?? []).filter(d => d?.slug).map(d => map('caseStudy', d)) }
}
import { InventorySiteClient } from '@/components/inventory/InventorySiteClient'

// Site page: one billboard or screen. Only sites with a photo get one; a site
// that leaves the inventory redirects to its area, so its ranking carries over.

type Props = { params: Promise<{ slug: string; citySlug: string; areaSlug: string; siteSlug: string }> }

export const revalidate = 86400

async function load(p: Awaited<Props['params']>) {
  const sites = await sitesFor(p.slug, p.citySlug)
  const site = sites.find(s => s.slug === p.siteSlug && s.areaSlug === p.areaSlug)
  return { sites, site }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params
  const { site } = await load(p)
  if (!site) return {}
  const format = site.displayFormat ?? site.format ?? 'Billboard'
  const title = `${site.name} — ${format} in ${site.areaName}, ${site.cityName} | Moving Walls`
  const content = await getSiteContent(site)
  const description = content.description
    ? content.description.slice(0, 155).replace(/\s+\S*$/, '') + '…'
    : `${format}${site.size ? `, ${site.size}` : ''} at ${site.address ?? `${site.areaName}, ${site.cityName}`}. See the site details and location, and add it to an instant proposal.`
  const url = `https://www.movingwalls.com/locations/${p.slug}/${p.citySlug}/${p.areaSlug}/${p.siteSlug}`
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', images: site.photos[0] ? [{ url: site.photos[0] }] : [] },
    robots: usingSample() ? { index: false, follow: false } : undefined,
  }
}

export default async function SitePage({ params }: Props) {
  const p = await params
  const { sites, site } = await load(p)
  if (!site) {
    // Gone from the inventory: send people (and its ranking) to the area page.
    if (sites.some(s => s.areaSlug === p.areaSlug)) permanentRedirect(`/locations/${p.slug}/${p.citySlug}/${p.areaSlug}`)
    notFound()
  }
  if (!siteHasPage(site)) permanentRedirect(`/locations/${p.slug}/${p.citySlug}/${p.areaSlug}`)

  const [siteContent, similar] = [await getSiteContent(site), similarSites(site, sites)]
  // Fewer than three related items that name the city: top up with the country's own, as the city
  // pages do (Rif, 11 Nov 2026: Penang sites showed none). Done here, not in getSiteContent, so the
  // proposal pages that also read site content do not pay for the extra query.
  const wide = siteContent.posts.length < 3 || siteContent.caseStudies.length < 3 ? await getCountryContent(site.countryName) : null
  const merge = <T extends { id: string }>(a: T[], b: T[]) => [...a, ...b.filter(x => !a.some(y => y.id === x.id))]
  const topped = wide ? { ...siteContent, posts: merge(siteContent.posts, wide.posts), caseStudies: merge(siteContent.caseStudies, wide.caseStudies) } : siteContent
  const last = topped.posts.length < 3 || topped.caseStudies.length < 3 ? await latest() : null
  const content = last ? { ...topped, posts: merge(topped.posts, last.posts), caseStudies: merge(topped.caseStudies, last.caseStudies) } : topped
  const [insights, faqs] = [await siteInsightsFor(similar), siteFaqs(site, content.personas.map(x => x.name))]
  const description = content.description ?? site.description
  const overview = siteOverview(site, description)
  // The 150-word floor (Rif, 11 Nov 2026): the page's own words, not menus, footer or related links.
  const own = contentWords(site.name, description, overview, ...content.personas.flatMap(x => [x.name, x.who, x.when, x.why]), ...faqs.flatMap(f => [f.q, f.a]))
  if (own < 150) console.warn(`[site page] ${site.id} has ${own} words of its own content, under the 150 floor`)
  const url = `https://www.movingwalls.com/locations/${p.slug}/${p.citySlug}/${p.areaSlug}/${p.siteSlug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Locations', item: 'https://www.movingwalls.com/locations' },
        { '@type': 'ListItem', position: 2, name: site.countryName, item: `https://www.movingwalls.com/locations/${p.slug}` },
        { '@type': 'ListItem', position: 3, name: site.cityName, item: `https://www.movingwalls.com/locations/${p.slug}/${p.citySlug}` },
        { '@type': 'ListItem', position: 4, name: site.areaName, item: `https://www.movingwalls.com/locations/${p.slug}/${p.citySlug}/${p.areaSlug}` },
        { '@type': 'ListItem', position: 5, name: site.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'Place', name: site.name, url,
      address: site.address ?? undefined,
      geo: site.lat != null ? { '@type': 'GeoCoordinates', latitude: site.lat, longitude: site.lng } : undefined,
      image: site.photos[0] ?? undefined,
    },
    ...(faqs.length ? [{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }] : []),
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InventorySiteClient site={site} content={content} similar={similar} pagedIds={similar.filter(siteHasPage).map(s => s.id)} faqs={faqs} insights={insights} overview={overview} />
    </>
  )
}
