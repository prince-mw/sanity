import { Metadata } from 'next'
import PlatformPageClient from '@/components/PlatformPageClient'

export const metadata: Metadata = {
  title: 'Platform | Moving Walls',
  description: 'Discover the Moving Walls platform - a unified solution for planning, activating, and measuring out-of-home advertising campaigns at scale.',
  openGraph: {
    title: 'Moving Walls Platform',
    description: 'The complete OOH advertising platform for modern marketers.',
    type: 'website',
  },
}

export const revalidate = 3600

export default function PlatformPage() {
  return <PlatformPageClient />
}
