import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { sitesFor, usingSample } from '@/lib/inventory/source'
import { siteHasPage } from '@/lib/inventory/normalize'
import { getSiteContent, similarSites } from '@/lib/inventory/siteContent'
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
    : `${format}${site.size ? `, ${site.size}` : ''} at ${site.address ?? `${site.areaName}, ${site.cityName}`}. See the site details and location, and get an estimated price.`
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

  const [content, similar] = [await getSiteContent(site), similarSites(site, sites)]
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
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InventorySiteClient site={site} content={content} similar={similar} pagedIds={similar.filter(siteHasPage).map(s => s.id)} />
    </>
  )
}
