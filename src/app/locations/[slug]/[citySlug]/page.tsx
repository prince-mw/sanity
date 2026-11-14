import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getServerT } from '@/i18n/serverT'
import { getCityBySlug, getAllCitySlugPairs, transformCityFull, getSanityImageUrl, getCitiesByCountry, transformCityForList } from '@/sanity/lib/fetch'
import { buildLocationJsonLd } from '@/lib/locationSchema'
import { LOCATION_LANGUAGE_GROUPS, getLocationPageLang } from '@/lib/locationLanguageGroups'
import { areasFor, sitesFor, usingSample } from '@/lib/inventory/source'
import { siteHasPage, toSiteCard } from '@/lib/inventory/normalize'
import { CityInventorySection } from '@/components/inventory/CityInventorySection'
import { ProposalPromo } from '@/components/proposal/ProposalPromo'
import { LandingPageRenderer } from '@/components/landing'
import { CountryGuide } from '@/components/location/CountryGuide'
import { cityGuideFor, dataGuideFor, legacySections, marketData, tailSections, type TemplateSection } from '@/lib/location/countryTemplate'
import { CITY_GUIDE_DRAFTS } from '@/data/city-guide-drafts'
import { promoEnabled } from '@/lib/proposal/promo'
import { marketOf } from '@/lib/proposal/markets'
import { getPlaceContent } from '@/lib/inventory/placeContent'
import { inventoryCity, inventoryCityCards } from '@/lib/location/inventoryPlaces'
import { PLACE_PHOTOS } from '@/data/place-photos'
import { PLACE_PLANS } from '@/data/place-names'
import type { SanityLocationCity } from '@/sanity/lib/fetch'
import { RelatedContent } from '@/components/inventory/ContentBlocks'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; citySlug: string }> }): Promise<Metadata> {
  const { slug, citySlug } = await params

  const { isEnabled: isPreview } = await draftMode()
  const city = (await getCityBySlug(slug, citySlug, isPreview)) ?? (await inventoryCity(slug, citySlug) as unknown as SanityLocationCity | null)
  if (!city) {
    const formattedName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return {
      title: formattedName,
      description: `Explore Moving Walls operations and OOH advertising opportunities in ${formattedName}.`,
    }
  }

  const seo = city.seo
  const country = city.country?.country || ''
  // Places made by the inventory have no SEO fields: name the search phrase in the title.
  const title = seo?.metaTitle || `Billboard & Outdoor Advertising in ${city.city}${country ? `, ${country}` : ''} | Moving Walls`
  const description = seo?.metaDescription || city.description || `Explore OOH advertising opportunities in ${city.city}.`
  const ogImage = seo?.ogImage
    ? getSanityImageUrl(seo.ogImage, { width: 1200 })
    : getSanityImageUrl(city.heroImage, { width: 1200 }) || PLACE_PHOTOS[`${slug}/${citySlug}`]?.image

  return {
    title,
    description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: `https://www.movingwalls.com/locations/${slug}/${citySlug}`,
      languages: LOCATION_LANGUAGE_GROUPS[`${slug}/${citySlug}`] ?? undefined,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const pairs = await getAllCitySlugPairs()
  return pairs.map(({ countrySlug, citySlug }) => ({ slug: countrySlug, citySlug }))
}

export default async function CityPage({ params }: { params: Promise<{ slug: string; citySlug: string }> }) {
  const { slug, citySlug } = await params
  const t = await getServerT()

  const { isEnabled: isPreview } = await draftMode()
  // Sanity's city page when there is one, else the inventory's city: sites decide what exists.
  const city = (await getCityBySlug(slug, citySlug, isPreview)) ?? (await inventoryCity(slug, citySlug) as unknown as SanityLocationCity | null)
  if (!city) {
    notFound()
  }

  const cityData = transformCityFull(city)
  // A place without its own hero photo shows its landmark (src/data/place-photos.ts), credited.
  const placePhoto = PLACE_PHOTOS[`${slug}/${citySlug}`]
  if (!cityData.heroImage && placePhoto) cityData.heroImage = placePhoto.image
  const heroCredit = cityData.heroImage && placePhoto && cityData.heroImage === placePhoto.image ? `Photo: ${placePhoto.by} · ${placePhoto.license}, via Wikimedia Commons` : undefined
  // Countries grouped into big cities and states link the biggest other places (two full rows),
  // the same set the country page shows; others keep their CMS city list.
  const cmsRelated = (await getCitiesByCountry(slug, isPreview)).map(transformCityForList)
  const relatedCities = (PLACE_PLANS[slug] ? (await inventoryCityCards(slug, cmsRelated)).slice(0, 9) : cmsRelated)
    .filter((c) => c.href !== `/locations/${slug}/${citySlug}`)
    .slice(0, PLACE_PLANS[slug] ? 8 : undefined)

  const faqJsonLd = cityData.faqs && cityData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null

  // Inventory from the Inventory API (sample until the key is set): only cities that have some.
  const [inventory, inventoryAreas] = await Promise.all([sitesFor(slug, citySlug), areasFor(slug, citySlug)])
  const placeContent = await getPlaceContent({ kind: 'city', countrySlug: slug, countryName: city.country?.country || slug, citySlug, cityName: city.city || citySlug })

  // The city template (Rif, 11 Nov 2026), on EVERY city since 12 Nov: hero, proposal band, every site,
  // the city guide, related content, proof, FAQ. Without a written guide the topics come from the CMS
  // blocks by role and the rest of the old content stays (legacySections).
  const cityName = city.city || citySlug
  const citySections = ((cityData as { sections?: TemplateSection[] }).sections ?? []) as TemplateSection[]
  const writtenTopics = cityGuideFor(slug, citySlug, cityName, citySections)
  // No written guide and no CMS text (most places the inventory makes): a guide from the data.
  const guideTopics = writtenTopics.length ? writtenTopics : dataGuideFor(cityName, inventory)
  const cityDraft = CITY_GUIDE_DRAFTS[`${slug}/${citySlug}`] ?? null
  const templated = !(cityData as { hideDefaultHero?: boolean }).hideDefaultHero
  const showPromo = promoEnabled() && !!marketOf(slug)
  const guide = templated && guideTopics.length > 0 ? (
    <CountryGuide key="guide" country={cityName} countrySlug={slug} topics={guideTopics} data={marketData(inventory, 'area')} draft={cityDraft}
      cityLinks={Object.fromEntries(inventoryAreas.map(a => [a.name.trim().toLowerCase(), `/locations/${slug}/${citySlug}/${a.slug}`]))}
      linkBase={`/locations/${slug}/${citySlug}`} placeWord={['area', 'areas']} proposalHref={showPromo ? '/proposals/new' : null} tone="brand" />
  ) : null

  const locationJsonLd = buildLocationJsonLd({
    countrySlug: slug,
    countryName: city.country?.country || slug,
    citySlug,
    cityName: city.city || citySlug,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <LocationDetailClient
        initialData={cityData}
        backHref={`/locations/${slug}`}
        backLabel={getLocationPageLang(slug) === 'zh' ? '返回中国市场页面' : (t('ui.locations.backTo') as string).replace('{name}', city.country?.country || 'Country')}
        lang={getLocationPageLang(slug)}
        pageType="city"
        relatedCities={relatedCities}
        countryName={city.country?.country || undefined}
        relatedHeading={(city.country as { relatedPagesHeading?: string } | undefined)?.relatedPagesHeading || (PLACE_PLANS[slug] ? `Explore other cities and states in ${city.country?.country || slug}` : undefined)}
        heroCredit={heroCredit}
        accents={templated}
        sectionsOverride={templated ? <><LandingPageRenderer sections={legacySections(citySections, !!cityDraft)} /><LandingPageRenderer sections={tailSections(citySections)} /></> : undefined}
        afterHero={inventory.length > 0 ? (<>
          <ProposalPromo key="promo" variant="band" market={city.country?.country || slug} place={city.city || citySlug} />
          <CityInventorySection key="inventory"
            cityName={city.city || citySlug}
            citySlug={citySlug}
            countrySlug={slug}
            countryName={city.country?.country || slug}
            content={placeContent!}
            sites={inventory.map(toSiteCard)}
            pagedIds={inventory.filter(siteHasPage).map(s => s.id)}
            areas={inventoryAreas.filter(a => a.slug !== citySlug).map(a => ({ name: a.name, slug: a.slug, kind: a.kind, count: a.sites.length }))}
            sample={usingSample()}
            guide={guide ?? undefined}
            showAreas={!cityDraft?.audiences?.cities?.length}
            /* Descriptions load with Details (api/inventory/site), not for every site up front. */
          />
        </>) : templated ? <>{guide}<RelatedContent key="related" cityName={cityName} countryName={city.country?.country || slug} caseStudies={placeContent.caseStudies} posts={placeContent.posts} firstBg="bg-white" /></> : null}
      />
    </>
  )
}
