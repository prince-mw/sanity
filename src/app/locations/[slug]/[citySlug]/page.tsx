import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getCityBySlug, getAllCitySlugPairs, transformCityFull, getSanityImageUrl } from '@/sanity/lib/fetch'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; citySlug: string }> }): Promise<Metadata> {
  const { slug, citySlug } = await params

  const city = await getCityBySlug(slug, citySlug)
  if (!city) {
    const formattedName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return {
      title: formattedName,
      description: `Explore Moving Walls operations and OOH advertising opportunities in ${formattedName}.`,
    }
  }

  const seo = city.seo
  const title = seo?.metaTitle || `${city.city}, ${city.country?.country || ''}`
  const description = seo?.metaDescription || city.description || `Explore OOH advertising opportunities in ${city.city}.`
  const ogImage = seo?.ogImage
    ? getSanityImageUrl(seo.ogImage, { width: 1200 })
    : getSanityImageUrl(city.heroImage, { width: 1200 })

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
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 30

export async function generateStaticParams() {
  const pairs = await getAllCitySlugPairs()
  return pairs.map(({ countrySlug, citySlug }) => ({ slug: countrySlug, citySlug }))
}

export default async function CityPage({ params }: { params: Promise<{ slug: string; citySlug: string }> }) {
  const { slug, citySlug } = await params

  const city = await getCityBySlug(slug, citySlug)
  if (!city) {
    notFound()
  }

  const cityData = transformCityFull(city)

  return (
    <LocationDetailClient
      initialData={cityData}
      backHref={`/locations/${slug}`}
      backLabel={`Back to ${city.country?.country || 'Country'}`}
      pageType="city"
    />
  )
}
