import { Metadata } from 'next'
import AboutPageClient from '@/components/AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us | Moving Walls',
  description: 'MovingWalls is a global connected media and programmatic out-of-home company powered by US patented measurement technology. Learn about our mission to transform outdoor advertising.',
  openGraph: {
    title: 'About Moving Walls',
    description: 'Transforming how brands reach real people in real places.',
    type: 'website',
  },
}

export const revalidate = 3600 // Revalidate every hour

export default function AboutPage() {
  return <AboutPageClient />
}
