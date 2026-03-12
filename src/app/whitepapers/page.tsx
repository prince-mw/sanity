import { Metadata } from 'next'
import { getAllWhitepapers, transformWhitepaper } from '@/sanity/lib/fetch'
import WhitepapersPageClient, { Whitepaper } from '@/components/WhitepapersPageClient'

export const metadata: Metadata = {
  title: 'Whitepapers & Research Reports | Moving Walls',
  description: 'Access in-depth whitepapers, research reports, and industry insights about out-of-home advertising, programmatic DOOH, and advertising technology.',
  openGraph: {
    title: 'Whitepapers & Research Reports | Moving Walls',
    description: 'Access in-depth whitepapers, research reports, and industry insights about out-of-home advertising.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackWhitepapers: Whitepaper[] = [
  {
    title: "The State of Digital Out-of-Home Advertising 2025",
    description: "Comprehensive analysis of DOOH trends, market dynamics, consumer behavior, and ROI metrics across industries.",
    category: "Industry Report",
    pages: 45,
    downloads: "12.5K+",
    publishDate: "Nov 2025",
    topics: ["Market Analysis", "Consumer Insights", "ROI Metrics", "Future Trends"],
    featured: true
  },
  {
    title: "AI-Powered Advertising: The Complete Guide",
    description: "How machine learning and artificial intelligence are transforming campaign optimization and audience targeting.",
    category: "Technology",
    pages: 38,
    downloads: "8.2K+",
    publishDate: "Oct 2025",
    topics: ["Machine Learning", "Optimization", "Targeting", "Automation"]
  },
  {
    title: "Programmatic DOOH: Best Practices for 2025",
    description: "Strategic framework for implementing and optimizing programmatic digital out-of-home advertising campaigns.",
    category: "Best Practices",
    pages: 32,
    downloads: "9.7K+",
    publishDate: "Sep 2025",
    topics: ["Programmatic", "Strategy", "Implementation", "Optimization"]
  },
  {
    title: "Healthcare Marketing Compliance Guide",
    description: "Navigate HIPAA regulations and healthcare advertising compliance while maximizing campaign effectiveness.",
    category: "Compliance",
    pages: 28,
    downloads: "5.4K+",
    publishDate: "Aug 2025",
    topics: ["HIPAA", "Compliance", "Healthcare", "Best Practices"]
  },
  {
    title: "Retail Advertising in the Omnichannel Era",
    description: "Strategies for connecting online and offline experiences to drive foot traffic and sales.",
    category: "Industry Guide",
    pages: 35,
    downloads: "7.8K+",
    publishDate: "Jul 2025",
    topics: ["Retail", "Omnichannel", "Foot Traffic", "Sales"]
  },
  {
    title: "Location Intelligence: Advanced Geo-Targeting",
    description: "Leveraging location data and geographic insights for precision advertising and audience targeting.",
    category: "Technology",
    pages: 42,
    downloads: "6.3K+",
    publishDate: "Jun 2025",
    topics: ["Geo-Targeting", "Location Data", "Audience", "Analytics"]
  }
]

export default async function WhitepapersPage() {
  let whitepapers: Whitepaper[] = fallbackWhitepapers
  
  try {
    const sanityWhitepapers = await getAllWhitepapers()
    
    if (sanityWhitepapers && sanityWhitepapers.length > 0) {
      whitepapers = sanityWhitepapers.map(wp => {
        const transformed = transformWhitepaper(wp)
        return {
          id: transformed.id,
          title: transformed.title,
          description: transformed.description,
          category: transformed.category || 'Research',
          pages: transformed.pages || 30,
          downloads: transformed.downloads || '1K+',
          publishDate: transformed.publishDate || 'Recent',
          topics: transformed.topics || [],
          featured: transformed.featured,
          downloadUrl: transformed.downloadUrl
        }
      })
    }
  } catch (error) {
    console.error('Error fetching whitepapers from Sanity:', error)
  }
  
  return <WhitepapersPageClient whitepapers={whitepapers} />
}
