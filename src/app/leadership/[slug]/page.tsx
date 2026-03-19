import { Metadata } from 'next'
import LeadershipDetailClient from '@/components/LeadershipDetailClient'
import { getTeamMemberBySlug, getSanityImageUrl } from '@/sanity/lib/fetch'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const member = await getTeamMemberBySlug(slug)
    
    if (member) {
      const seo = member.seo
      const title = seo?.metaTitle || member.name
      const description = seo?.metaDescription || member.bio || `Meet ${member.name} - ${member.role} at Moving Walls.`
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : getSanityImageUrl(member.image, { width: 1200 })
      
      return {
        title,
        description,
        keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
        openGraph: {
          title,
          description,
          type: 'profile',
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        },
        robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }
  
  const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  return {
    title: formattedName,
    description: `Meet ${formattedName} - a key leader driving innovation at Moving Walls.`,
    openGraph: {
      title: formattedName,
      description: `Learn about ${formattedName}'s role and contributions at Moving Walls.`,
      type: 'profile',
    },
  }
}

export const revalidate = 3600

export default function LeadershipMemberPage() {
  return <LeadershipDetailClient />
}
