import { Metadata } from 'next'
import OurStoryPageClient from '@/components/OurStoryPageClient'

export const metadata: Metadata = {
  title: 'Our Story | Moving Walls',
  description: 'Discover the story behind Moving Walls - from our founding vision to becoming a global leader in programmatic out-of-home advertising technology.',
  openGraph: {
    title: 'Our Story | Moving Walls',
    description: 'The journey of transforming outdoor advertising through innovation.',
    type: 'website',
  },
}

export const revalidate = 3600

export default function OurStoryPage() {
  return <OurStoryPageClient />
}
