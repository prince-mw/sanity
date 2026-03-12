import { Metadata } from 'next'
import { getPressReleases, getMediaFeatures, transformPressRelease, transformMediaFeature } from '@/sanity/lib/fetch'
import PressNewsPageClient, { PressRelease, MediaFeature } from '@/components/PressNewsPageClient'

export const metadata: Metadata = {
  title: 'Press & News | Moving Walls',
  description: 'Stay updated with MovingWalls latest announcements, product launches, partnerships, and industry recognition.',
  openGraph: {
    title: 'Press & News | Moving Walls',
    description: 'Latest news and announcements from Moving Walls.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackPressReleases: PressRelease[] = [
  {
    date: "November 15, 2024",
    category: "Product Launch",
    title: "MovingWalls Launches AI-Powered Audience Targeting Platform",
    excerpt: "Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition.",
    readTime: "3 min read",
    thumbnail: "/assets/images/press/ai-platform-launch.svg"
  },
  {
    date: "October 28, 2024",
    category: "Funding",
    title: "MovingWalls Closes $50M Series C Funding Round",
    excerpt: "Investment led by top-tier VCs will fuel international expansion and product development initiatives.",
    readTime: "4 min read",
    thumbnail: "/assets/images/press/funding-announcement.svg"
  },
  {
    date: "September 12, 2024",
    category: "Partnership",
    title: "Strategic Partnership with Global Transit Authority Network",
    excerpt: "Major partnership expands MovingWalls's out-of-home advertising network to 25 new metropolitan areas.",
    readTime: "2 min read",
    thumbnail: "/assets/images/press/transit-partnership.svg"
  },
  {
    date: "August 5, 2024",
    category: "Recognition",
    title: "MovingWalls Named 'AdTech Company of the Year' by Industry Awards",
    excerpt: "Recognition highlights company's innovation in programmatic advertising and measurement solutions.",
    readTime: "3 min read",
    thumbnail: "/assets/images/press/industry-award.svg"
  },
  {
    date: "July 22, 2024",
    category: "Product Update",
    title: "New Privacy-First Measurement Suite Launches",
    excerpt: "Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining effectiveness.",
    readTime: "5 min read",
    thumbnail: "/assets/images/press/privacy-suite.svg"
  },
  {
    date: "June 18, 2024",
    category: "Expansion",
    title: "MovingWalls Opens European Headquarters in London",
    excerpt: "New office serves as regional hub for European operations and client services expansion.",
    readTime: "2 min read",
    thumbnail: "/assets/images/press/london-office.svg"
  }
]

const fallbackMediaFeatures: MediaFeature[] = [
  {
    outlet: "AdWeek",
    title: "How MovingWalls is Revolutionizing Out-of-Home Advertising",
    date: "November 8, 2024",
    type: "Feature Article",
    thumbnail: "/assets/images/press/adweek-feature.svg"
  },
  {
    outlet: "TechCrunch",
    title: "The Future of Programmatic Advertising Technology",
    date: "October 15, 2024",
    type: "Industry Analysis",
    thumbnail: "/assets/images/press/techcrunch-analysis.svg"
  },
  {
    outlet: "Marketing Land",
    title: "CEO Interview: Building the Next Generation Ad Platform",
    date: "September 30, 2024",
    type: "Executive Interview",
    thumbnail: "/assets/images/press/ceo-interview.svg"
  },
  {
    outlet: "Forbes",
    title: "MovingWalls Among Top 50 Most Innovative Companies",
    date: "September 1, 2024",
    type: "Recognition",
    thumbnail: "/assets/images/press/forbes-recognition.svg"
  }
]

export default async function PressNewsPage() {
  let pressReleases: PressRelease[] = fallbackPressReleases
  let mediaFeatures: MediaFeature[] = fallbackMediaFeatures
  
  try {
    const [sanityPressReleases, sanityMediaFeatures] = await Promise.all([
      getPressReleases(),
      getMediaFeatures()
    ])
    
    if (sanityPressReleases && sanityPressReleases.length > 0) {
      pressReleases = sanityPressReleases.map(pr => {
        const transformed = transformPressRelease(pr)
        return {
          date: transformed.date || 'Recent',
          category: transformed.category || 'News',
          title: transformed.title,
          excerpt: transformed.excerpt,
          readTime: transformed.readTime || '3 min read',
          thumbnail: transformed.thumbnail
        }
      })
    }
    
    if (sanityMediaFeatures && sanityMediaFeatures.length > 0) {
      mediaFeatures = sanityMediaFeatures.map(mf => {
        const transformed = transformMediaFeature(mf)
        return {
          outlet: transformed.outlet || 'Media',
          title: transformed.title,
          date: transformed.date || 'Recent',
          type: transformed.type || 'Article',
          thumbnail: transformed.thumbnail
        }
      })
    }
  } catch (error) {
    console.error('Error fetching press data from Sanity:', error)
  }
  
  return <PressNewsPageClient pressReleases={pressReleases} mediaFeatures={mediaFeatures} />
}
