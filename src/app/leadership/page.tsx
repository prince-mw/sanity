import { Metadata } from 'next'
import { getLeadershipTeam, transformTeamMember, getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'
import LeadershipPageClient, { LeadershipMember } from '@/components/LeadershipPageClient'

const defaultMeta = {
  title: 'Leadership Team | Moving Walls',
  description: 'Meet the visionaries behind Moving Walls - the team driving innovation in outdoor advertising technology across the globe.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('leadership');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'Leadership Team | Moving Walls',
      description: seo?.metaDescription || 'Meet the leadership team at Moving Walls.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 300


export default async function LeadershipPage() {
  let leadership: LeadershipMember[] = []
  
  try {
    const sanityLeadership = await getLeadershipTeam()
    if (sanityLeadership && sanityLeadership.length > 0) {
      leadership = sanityLeadership.map(member => {
        const transformed = transformTeamMember(member)
        return {
          name: transformed.name,
          slug: transformed.slug || transformed.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          role: transformed.role,
          department: transformed.department || 'executive',
          bio: transformed.bio,
          fullBio: transformed.fullBio,
          linkedin: transformed.linkedin,
          twitter: transformed.twitter,
          email: transformed.email,
          image: transformed.image || '/assets/images/team-placeholder.svg'
        }
      })
    }
  } catch (error) {
    console.error('Error fetching leadership from Sanity:', error)
  }
  // If no CMS data, show nothing (or optionally a message)
  return <LeadershipPageClient leadership={leadership} />
}
