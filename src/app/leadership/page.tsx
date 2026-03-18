import { Metadata } from 'next'
import { getLeadershipTeam, transformTeamMember, getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'
import LeadershipPageClient, { LeadershipMember } from '@/components/LeadershipPageClient'

const defaultMeta = {
  title: 'Leadership Team | Moving Walls',
  description: 'Meet the visionaries behind Moving Walls - the team driving innovation in outdoor advertising technology across the globe.',
};

export async function generateMetadata(): Promise<Metadata> {
  // Hide from search engines
  return {
    title: 'Leadership Team | Moving Walls',
    description: 'This page is currently hidden.',
    robots: { index: false, follow: false },
  };
}

export const revalidate = 300


// Leadership page is hidden from users
export default function LeadershipPage() {
  return null;
}
}
