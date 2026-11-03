import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { areasFor, sitesFor, usingSample } from '@/lib/inventory/source'
import { siteHasPage } from '@/lib/inventory/normalize'
import { InventoryAreaClient } from '@/components/inventory/InventoryAreaClient'

// Area page: every site in one area of a city, from the Inventory API.
// Famous areas with fewer than 3 sites become "media owners wanted" pages.

type Props = { params: Promise<{ slug: string; citySlug: string; areaSlug: string }> }

export const revalidate = 86400 // inventory updates daily

async function load(country: string, city: string, areaSlug: string) {
  const [areas, citySites] = await Promise.all([areasFor(country, city), sitesFor(country, city)])
  const area = areas.find(a => a.slug === areaSlug)
  if (!area || !citySites.length) return null
  return { area, areas, citySites }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, citySlug, areaSlug } = await params
  const d = await load(slug, citySlug, areaSlug)
  if (!d) return {}
  const city = d.citySites[0].cityName
  const title = d.area.kind === 'buyer'
    ? `Billboard Advertising in ${d.area.name}, ${city} | ${d.area.sites.length} Sites | Moving Walls`
    : `Outdoor Advertising in ${d.area.name}, ${city} | Moving Walls`
  const description = d.area.kind === 'buyer'
    ? `Book ${d.area.sites.length} billboards and digital screens in ${d.area.name}, ${city}. See formats, sizes and locations, and get estimated prices.`
    : `Advertise in ${d.area.name}, ${city}, or list your billboards and screens there with Moving Walls.`
  const url = `https://www.movingwalls.com/locations/${slug}/${citySlug}/${areaSlug}`
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    // Preview: kept out of search until real inventory replaces the sample.
    robots: usingSample() ? { index: false, follow: false } : undefined,
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug, citySlug, areaSlug } = await params
  const d = await load(slug, citySlug, areaSlug)
  if (!d) notFound()
  const { area, areas, citySites } = d
  const first = citySites[0]
  const nearby = area.kind === 'supply' ? citySites.filter(s => s.areaSlug !== area.slug).slice(0, 6) : []
  const shown = [...area.sites, ...nearby]
  const url = `https://www.movingwalls.com/locations/${slug}/${citySlug}/${areaSlug}`
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Locations', item: 'https://www.movingwalls.com/locations' },
      { '@type': 'ListItem', position: 2, name: first.countryName, item: `https://www.movingwalls.com/locations/${slug}` },
      { '@type': 'ListItem', position: 3, name: first.cityName, item: `https://www.movingwalls.com/locations/${slug}/${citySlug}` },
      { '@type': 'ListItem', position: 4, name: area.name, item: url },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <InventoryAreaClient
        kind={area.kind}
        areaName={area.name}
        cityName={first.cityName}
        citySlug={citySlug}
        countryName={first.countryName}
        countrySlug={slug}
        sites={area.sites}
        pagedIds={shown.filter(siteHasPage).map(s => s.id)}
        nearby={nearby}
        otherAreas={areas.filter(a => a.slug !== area.slug).map(a => ({ name: a.name, slug: a.slug, kind: a.kind, count: a.sites.length }))}
        sample={usingSample()}
      />
    </>
  )
}
