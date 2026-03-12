import { Metadata } from 'next'
import LeadershipDetailClient from '@/components/LeadershipDetailClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  return {
    title: `${formattedName} | Leadership | Moving Walls`,
    description: `Meet ${formattedName} - a key leader driving innovation at Moving Walls.`,
    openGraph: {
      title: `${formattedName} | Moving Walls Leadership`,
      description: `Learn about ${formattedName}'s role and contributions at Moving Walls.`,
      type: 'profile',
    },
  }
}

export const revalidate = 3600

export default function LeadershipMemberPage() {
  return <LeadershipDetailClient />
}
