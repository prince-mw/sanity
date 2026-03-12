import { Metadata } from 'next'
import MWPlannerPageClient from '@/components/MWPlannerPageClient'

export const metadata: Metadata = {
  title: 'MW Planner | Moving Walls',
  description: 'Plan smarter OOH campaigns with MW Planner - AI-powered audience targeting, location planning, and budget optimization for outdoor advertising.',
  openGraph: {
    title: 'MW Planner | Moving Walls',
    description: 'AI-powered planning tool for out-of-home advertising campaigns.',
    type: 'website',
  },
}

export const revalidate = 3600

export default function MWPlannerPage() {
  return <MWPlannerPageClient />
}
