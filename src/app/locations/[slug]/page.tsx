import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getLocationBySlug, transformLocationFull, getCitiesByCountry, transformCityForList, getSanityImageUrl } from '@/sanity/lib/fetch'
import { getStaticLocationData, STATIC_LOCATION_SLUGS, LocationData } from '@/data/staticLocationData'
import { LOCATION_LANGUAGE_GROUPS, getLocationPageLang } from '@/lib/locationLanguageGroups'
import { buildLocationJsonLd } from '@/lib/locationSchema'
import { ProposalPromo } from '@/components/proposal/ProposalPromo'
import { marketOf } from '@/lib/proposal/markets'
import { promoEnabled } from '@/lib/proposal/promo'
import { LandingPageRenderer } from '@/components/landing'
import { CountryGuide } from '@/components/location/CountryGuide'
import { sitesFor } from '@/lib/inventory/source'
import { guideFor, handPickedSlugs, legacySections, marketData, tailSections, type TemplateSection } from '@/lib/location/countryTemplate'
import { getCountryContent } from '@/lib/inventory/placeContent'
import { inventoryCityCards } from '@/lib/location/inventoryPlaces'
import { RelatedContent } from '@/components/inventory/ContentBlocks'
import { COUNTRY_GUIDE_DRAFTS } from '@/data/country-guide-drafts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Try Sanity first
  const { isEnabled: isPreview } = await draftMode()
  const sanityLocation = await getLocationBySlug(slug, isPreview)
  if (sanityLocation) {
    const seo = sanityLocation.seo
    const title = seo?.metaTitle || sanityLocation.country
    const description = seo?.metaDescription || sanityLocation.description || `Explore OOH advertising opportunities in ${sanityLocation.country}.`
    const ogImage = seo?.ogImage 
      ? getSanityImageUrl(seo.ogImage, { width: 1200 })
      : getSanityImageUrl(sanityLocation.heroImage, { width: 1200 })
    
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
        canonical: `https://www.movingwalls.com/locations/${slug}`,
        languages: LOCATION_LANGUAGE_GROUPS[slug] ?? undefined,
      },
      robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    }
  }
  
  // Fall back to static data
  const staticData = getStaticLocationData(slug)
  if (staticData) {
    return {
      title: staticData.name,
      description: staticData.description,
      openGraph: {
        title: staticData.name,
        description: staticData.description,
        type: 'website',
      },
    }
  }
  
  // Default metadata for unknown slugs
  const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return {
    title: formattedName,
    description: `Explore Moving Walls operations and OOH advertising opportunities in ${formattedName}.`,
  }
}

export const revalidate = 3600;

// Generate static params for known locations
export async function generateStaticParams() {
  return STATIC_LOCATION_SLUGS.map((slug) => ({ slug }))
}

function buildFaqJsonLd(faqs: LocationData['faqs']) {
  if (!faqs || faqs.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Try to fetch from Sanity first
  const { isEnabled: isPreview } = await draftMode()
  const sanityLocation = await getLocationBySlug(slug, isPreview)

  if (sanityLocation) {
    const locationData = transformLocationFull(sanityLocation)
    // Pages that link to their sub-pages from their own sections (e.g. Philippines) hide the automatic city grid
    const cmsCities = (sanityLocation as { hideCityCards?: boolean }).hideCityCards
      ? []
      : (await getCitiesByCountry(slug, isPreview)).map(transformCityForList)
    // Cities the inventory has but the CMS does not list yet still get a card (and a page).
    const cities = (sanityLocation as { hideCityCards?: boolean }).hideCityCards ? cmsCities : [...cmsCities, ...await inventoryCityCards(slug, cmsCities)]
    const faqJsonLd = buildFaqJsonLd(locationData.faqs)
    const locationJsonLd = buildLocationJsonLd({ countrySlug: slug, countryName: sanityLocation.country || locationData.name })
    // The country template (approved by Rif, 11 Nov 2026), on EVERY country since 12 Nov: fixed slot order, the
    // market guide, visuals from data. Without a written guide the topics come from the CMS blocks by role and
    // the rest of the old content stays after the guide (legacySections). Only full-page custom layouts
    // (hideDefaultHero, e.g. the Americas pages) keep their own page.
    const draft = COUNTRY_GUIDE_DRAFTS[slug] ?? null
    const countryName = sanityLocation.country || locationData.name
    // The page's own country name (Sanity), not the market list's (which spelled the UAE "Uae").
    const promo = promoEnabled() && marketOf(slug) ? <ProposalPromo variant="band" market={countryName} /> : null
    if (!locationData.hideDefaultHero) {
      const sections = (locationData.sections ?? []) as TemplateSection[]
      const [sites, related] = await Promise.all([sitesFor(slug), getCountryContent(countryName, cities.map(c => c.city))])
      const data = marketData(sites)
      const picked = handPickedSlugs(sections)
      const caseStudies = related.caseStudies.filter(c => !picked.some(p => c.href.endsWith(`/${p}`)))
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
          {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
          <LocationDetailClient
            initialData={{ ...locationData, sectionsPosition: 'before-faqs' }}
            cities={cities}
            pageType="country"
            lang={getLocationPageLang(slug)}
            accents
            afterHero={promo}
            sectionsOverride={<>
              <CountryGuide country={countryName} countrySlug={slug} topics={guideFor(slug, countryName, sections)} data={data} draft={draft} cityLinks={Object.fromEntries(cities.map(c => [c.city.trim().toLowerCase(), c.href]))} proposalHref={promo ? '/proposals/new' : null} tone="brand" />
              <LandingPageRenderer sections={legacySections(sections, !!draft)} />
              <LandingPageRenderer sections={tailSections(sections, 'proof')} />
              <RelatedContent cityName={countryName} countryName={countryName} caseStudies={caseStudies} posts={related.posts} firstBg="bg-white" />
              <LandingPageRenderer sections={tailSections(sections, 'cta')} />
            </>}
          />
        </>
      )
    }
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <LocationDetailClient initialData={locationData} cities={cities} pageType="country" lang={getLocationPageLang(slug)} afterHero={promoEnabled() && marketOf(slug) ? <ProposalPromo variant="band" market={marketOf(slug)!.countryName} /> : null} />
      </>
    )
  }

  // Fall back to static data
  const staticData = getStaticLocationData(slug)

  if (staticData) {
    const faqJsonLd = buildFaqJsonLd(staticData.faqs)
    const locationJsonLd = buildLocationJsonLd({ countrySlug: slug, countryName: staticData.name })
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <LocationDetailClient initialData={staticData} pageType="country" afterHero={promoEnabled() && marketOf(slug) ? <ProposalPromo variant="band" market={marketOf(slug)!.countryName} /> : null} />
      </>
    )
  }

  // No data found - 404
  notFound()
}
