import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getLocationBySlug, transformLocationFull, getCitiesByCountry, transformCityForList, getSanityImageUrl } from '@/sanity/lib/fetch'
import { getStaticLocationData, STATIC_LOCATION_SLUGS, LocationData } from '@/data/staticLocationData'
import { LOCATION_LANGUAGE_GROUPS } from '@/lib/locationLanguageGroups'
import { buildLocationJsonLd } from '@/lib/locationSchema'

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
    const cities = (sanityLocation as { hideCityCards?: boolean }).hideCityCards
      ? []
      : (await getCitiesByCountry(slug, isPreview)).map(transformCityForList)
    const faqJsonLd = buildFaqJsonLd(locationData.faqs)
    const locationJsonLd = buildLocationJsonLd({ countrySlug: slug, countryName: sanityLocation.country || locationData.name })
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd) }} />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <LocationDetailClient initialData={locationData} cities={cities} pageType="country" />
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
        <LocationDetailClient initialData={staticData} pageType="country" />
      </>
    )
  }

  // No data found - 404
  notFound()
}
