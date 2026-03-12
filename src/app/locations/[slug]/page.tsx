import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationDetailClient from '@/components/LocationDetailClient'
import { getLocationBySlug, transformLocationFull } from '@/sanity/lib/fetch'
import { getStaticLocationData, STATIC_LOCATION_SLUGS, LocationData } from '@/data/staticLocationData'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Try Sanity first
  const sanityLocation = await getLocationBySlug(slug)
  if (sanityLocation) {
    return {
      title: `${sanityLocation.country} | OOH Advertising | Moving Walls`,
      description: sanityLocation.description || `Explore OOH advertising opportunities in ${sanityLocation.country}.`,
      openGraph: {
        title: `OOH Advertising in ${sanityLocation.country} | Moving Walls`,
        description: sanityLocation.description || `Out-of-home advertising solutions in ${sanityLocation.country}.`,
        type: 'website',
      },
    }
  }
  
  // Fall back to static data
  const staticData = getStaticLocationData(slug)
  if (staticData) {
    return {
      title: `${staticData.name} | OOH Advertising | Moving Walls`,
      description: staticData.description,
      openGraph: {
        title: `OOH Advertising in ${staticData.name} | Moving Walls`,
        description: staticData.description,
        type: 'website',
      },
    }
  }
  
  // Default metadata for unknown slugs
  const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return {
    title: `${formattedName} | Locations | Moving Walls`,
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
