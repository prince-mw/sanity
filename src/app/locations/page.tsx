import { Metadata } from 'next'
import LocationsPageClient from '@/components/LocationsPageClient'

export const metadata: Metadata = {
  title: 'Global Locations | Moving Walls',
  description: 'Moving Walls operates across Asia Pacific - Malaysia, Singapore, Indonesia, India, Philippines, Japan, Thailand, Sri Lanka, Australia, and USA.',
  openGraph: {
    title: 'Our Global Locations | Moving Walls',
    description: 'Discover Moving Walls offices and operations across the globe.',
    type: 'website',
  },
}

export const revalidate = 3600

export default function LocationsPage() {
  return <LocationsPageClient />
}
