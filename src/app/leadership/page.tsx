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

const fallbackLeadership: LeadershipMember[] = [
  {
    name: "Srikanth Ramachandran",
    slug: "srikanth-ramachandran",
    role: "Founder & Group CEO",
    department: "executive",
    bio: "Srikanth is the visionary founder of Moving Walls with over 20 years of experience in advertising technology. He has been instrumental in transforming out-of-home advertising through data-driven solutions.",
    linkedin: "https://www.linkedin.com/in/srikanthramachandran/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Natasha Rawlings",
    slug: "natasha-rawlings",
    role: "Chief Revenue Officer",
    department: "executive",
    bio: "Natasha leads global revenue strategy with deep expertise in digital advertising and enterprise sales. She has driven significant growth across APAC and European markets.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Gautam Bhirani",
    slug: "gautam-bhirani",
    role: "Co-Founder & CEO, Moving Walls India",
    department: "executive",
    bio: "Gautam co-founded Moving Walls and leads Indian operations. His expertise in media planning and technology has been pivotal in building the company's presence in one of the world's fastest-growing markets.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Dr. Ahmad Nazri",
    slug: "dr-ahmad-nazri",
    role: "Chief Technology Officer",
    department: "technology",
    bio: "Dr. Ahmad oversees all technology initiatives and R&D. He brings a wealth of experience in AI/ML, ad-tech platforms, and scalable cloud architectures.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Michelle Tan",
    slug: "michelle-tan",
    role: "Chief Marketing Officer",
    department: "marketing",
    bio: "Michelle leads global marketing strategy and brand development. She has extensive experience in building tech brands and driving demand generation at scale.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "James Wilson",
    slug: "james-wilson",
    role: "Chief Financial Officer",
    department: "finance",
    bio: "James oversees financial strategy, operations, and investor relations. He brings expertise from leading roles at major technology companies.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Priya Sharma",
    slug: "priya-sharma",
    role: "VP of Product",
    department: "product",
    bio: "Priya leads product strategy and roadmap development. She has a track record of building award-winning ad-tech products that solve real advertiser challenges.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
  {
    name: "Daniel Lee",
    slug: "daniel-lee",
    role: "VP of Engineering",
    department: "technology",
    bio: "Daniel leads engineering teams across multiple offices. He specializes in building high-performance, scalable systems for programmatic advertising.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.svg",
  },
]

export default async function LeadershipPage() {
  let leadership: LeadershipMember[] = fallbackLeadership
  
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
  
  return <LeadershipPageClient leadership={leadership} />
}
