import { Metadata } from 'next'
import OurJourneyPageClient from '@/components/OurJourneyPageClient'

export const metadata: Metadata = {
  title: 'Our Journey | Moving Walls',
  description: 'Explore the milestones and achievements that shaped Moving Walls into a global leader in out-of-home advertising technology.',
  openGraph: {
    title: 'Our Journey | Moving Walls',
    description: 'Key milestones in our mission to transform outdoor advertising.',
    type: 'website',
  },
}

export const revalidate = 3600

export default function OurJourneyPage() {
  return <OurJourneyPageClient />
}
