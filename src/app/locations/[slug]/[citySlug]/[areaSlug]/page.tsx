import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { areasFor, sitesFor, usingSample } from '@/lib/inventory/source'
import { siteHasPage } from '@/lib/inventory/normalize'
import { InventoryAreaClient } from '@/components/inventory/InventoryAreaClient'
import { siteInsightsFor } from '@/lib/inventory/siteContent'
import { getPlaceContent } from '@/lib/inventory/placeContent'
import { CountryGuide } from '@/components/location/CountryGuide'
import { AreaFaq } from '@/components/location/AreaFaq'
import { ProposalPromo } from '@/components/proposal/ProposalPromo'
import { promoEnabled } from '@/lib/proposal/promo'
import { marketOf } from '@/lib/proposal/markets'
import { areaDraftFor, areaFaqJsonLd, areaGuideData, areaGuideFor } from '@/lib/location/areaTemplate'

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
    ? `Book ${d.area.sites.length} billboards and digital screens in ${d.area.name}, ${city}. See formats, sizes and locations, and build an instant proposal.`
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
  const content = await getPlaceContent({ kind: 'area', countrySlug: slug, countryName: first.countryName, citySlug, cityName: first.cityName, areaSlug, areaName: area.name })
  // The area template: the written guide and FAQ where one exists (data/area-guide-drafts.ts).
  const draft = areaDraftFor(slug, citySlug, areaSlug)
  const topics = areaGuideFor(draft, area.name, first.cityName)
  const showPromo = promoEnabled() && !!marketOf(slug)
  const faqJsonLd = areaFaqJsonLd(draft)
  const guide = topics.length ? (
    <CountryGuide country={area.name} countrySlug={slug} topics={topics} data={areaGuideData(area.sites)} draft={draft}
      linkBase={`/locations/${slug}/${citySlug}`} placeWord={['place', 'places']} proposalHref={showPromo ? '/proposals/new' : null} tone="brand" />
  ) : null
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
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <InventoryAreaClient
        kind={area.kind}
        areaName={area.name}
        cityName={first.cityName}
        citySlug={citySlug}
        countryName={first.countryName}
        countrySlug={slug}
        content={content}
        sites={area.sites}
        pagedIds={shown.filter(siteHasPage).map(s => s.id)}
        nearby={nearby}
        otherAreas={areas.filter(a => a.slug !== area.slug).map(a => ({ name: a.name, slug: a.slug, kind: a.kind, count: a.sites.length }))}
        sample={usingSample()}
        insights={await siteInsightsFor(area.sites)}
        heroImage={[...area.sites, ...nearby].find(s => s.photos[0])?.photos[0] ?? null}
        promo={showPromo ? <ProposalPromo variant="band" market={first.countryName} place={area.name} /> : null}
        guide={guide}
        faq={draft ? <AreaFaq placeName={area.name} faqs={draft.faqs} /> : null}
      />
    </>
  )
}
