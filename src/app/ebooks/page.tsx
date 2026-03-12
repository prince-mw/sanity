import { Metadata } from 'next'
import { getAllEbooks, transformEbook } from '@/sanity/lib/fetch'
import EbooksPageClient, { Ebook } from '@/components/EbooksPageClient'

export const metadata: Metadata = {
  title: 'E-Books &amp; Resources | Moving Walls',
  description: 'Download free e-books, guides, and whitepapers about out-of-home advertising, programmatic DOOH, and advertising technology from Moving Walls.',
  openGraph: {
    title: 'E-Books &amp; Resources | Moving Walls',
    description: 'Download free e-books, guides, and whitepapers about out-of-home advertising, programmatic DOOH, and advertising technology.',
    type: 'website',
  },
}

// Revalidate every 5 minutes
export const revalidate = 300

// Static fallback data
const fallbackEbooks: Ebook[] = [
  {
    id: 1,
    title: "The Ultimate Guide to Programmatic DOOH in 2026",
    description: "A comprehensive guide covering everything you need to know about programmatic digital out-of-home advertising, from basics to advanced strategies.",
    category: "Guide",
    image: "/assets/images/ebooks/programmatic-dooh-guide.jpg",
    featured: true,
    isNew: true,
    year: "2026",
    viewUrl: "#"
  },
  {
    id: 2,
    title: "OOH Measurement Playbook",
    description: "Learn how to effectively measure and optimize your out-of-home campaigns with proven methodologies and metrics.",
    category: "Playbook",
    image: "/assets/images/ebooks/measurement-playbook.jpg",
    featured: false,
    year: "2025",
    viewUrl: "#"
  },
  {
    id: 3,
    title: "APAC OOH Market Report 2025",
    description: "In-depth analysis of the Asia-Pacific out-of-home advertising market, trends, and growth opportunities.",
    category: "Market Report",
    image: "/assets/images/ebooks/apac-market-report.jpg",
    featured: false,
    isNew: true,
    year: "2025",
    viewUrl: "#"
  },
  {
    id: 4,
    title: "Audience Targeting in OOH: A Strategic Guide",
    description: "Master audience targeting strategies for out-of-home advertising campaigns using data-driven approaches.",
    category: "Guide",
    image: "/assets/images/ebooks/audience-targeting-guide.jpg",
    featured: false,
    year: "2025",
    viewUrl: "#"
  },
  {
    id: 5,
    title: "The Future of Retail Media Networks",
    description: "Explore how retail media networks are transforming the advertising landscape and creating new opportunities.",
    category: "Whitepaper",
    image: "/assets/images/ebooks/retail-media-whitepaper.jpg",
    featured: false,
    year: "2025",
    viewUrl: "#"
  },
  {
    id: 6,
    title: "Creative Best Practices for DOOH",
    description: "Design stunning digital out-of-home creatives that capture attention and drive engagement.",
    category: "Playbook",
    image: "/assets/images/ebooks/creative-best-practices.jpg",
    featured: false,
    year: "2024",
    viewUrl: "#"
  }
]

export default async function EbooksPage() {
  let ebooks: Ebook[] = fallbackEbooks
  
  try {
    const sanityEbooks = await getAllEbooks()
    
    if (sanityEbooks && sanityEbooks.length > 0) {
      ebooks = sanityEbooks.map(ebook => {
        const transformed = transformEbook(ebook)
        return {
          id: transformed.id,
          title: transformed.title,
          description: transformed.description,
          category: transformed.category,
          image: transformed.image || '/assets/images/ebooks/default-ebook.jpg',
          featured: transformed.featured,
          isNew: transformed.isNew,
          year: transformed.year || '2025',
          viewUrl: transformed.viewUrl || '#'
        }
      })
    }
  } catch (error) {
    console.error('Error fetching ebooks from Sanity:', error)
    // Using fallback data
  }
  
  return <EbooksPageClient ebooks={ebooks} />
}
