import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getLocationBySlug, transformLocationFull, getSanityImageUrl } from '@/sanity/lib/fetch'
import { getStaticLocationData, STATIC_LOCATION_SLUGS, LocationData } from '@/data/staticLocationData'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Try Sanity first
  const sanityLocation = await getLocationBySlug(slug)
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

export const revalidate = 3600

// Generate static params for known locations
export async function generateStaticParams() {
  return STATIC_LOCATION_SLUGS.map((slug) => ({ slug }))
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Try to fetch from Sanity first
  const sanityLocation = await getLocationBySlug(slug)
  
  if (sanityLocation) {
    const locationData = transformLocationFull(sanityLocation)
    return <LocationDetailClient initialData={locationData} />
  }
  
  // Fall back to static data
  const staticData = getStaticLocationData(slug)
  
  if (staticData) {
    return <LocationDetailClient initialData={staticData} />
  }
  
  // No data found - 404
  notFound()
}
