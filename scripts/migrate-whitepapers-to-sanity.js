// Migration script for whitepapers to Sanity
// Run with: node scripts/migrate-whitepapers-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

const whitepapers = [
  {
    title: "The State of Digital Out-of-Home Advertising 2025",
    description: "Comprehensive analysis of DOOH trends, market dynamics, consumer behavior, and ROI metrics across industries.",
    category: "industry-report",
    pages: 45,
    downloads: "12.5K+",
    publishDate: "Nov 2025",
    topics: ["Market Analysis", "Consumer Insights", "ROI Metrics", "Future Trends"],
    featured: true,
    order: 1,
  },
  {
    title: "AI-Powered Advertising: The Complete Guide",
    description: "How machine learning and artificial intelligence are transforming campaign optimization and audience targeting.",
    category: "technology",
    pages: 38,
    downloads: "8.2K+",
    publishDate: "Oct 2025",
    topics: ["Machine Learning", "Optimization", "Targeting", "Automation"],
    featured: false,
    order: 2,
  },
  {
    title: "Programmatic DOOH: Best Practices for 2025",
    description: "Strategic framework for implementing and optimizing programmatic digital out-of-home advertising campaigns.",
    category: "best-practices",
    pages: 32,
    downloads: "9.7K+",
    publishDate: "Sep 2025",
    topics: ["Programmatic", "Strategy", "Implementation", "Optimization"],
    featured: false,
    order: 3,
  },
  {
    title: "Healthcare Marketing Compliance Guide",
    description: "Navigate HIPAA regulations and healthcare advertising compliance while maximizing campaign effectiveness.",
    category: "compliance",
    pages: 28,
    downloads: "5.4K+",
    publishDate: "Aug 2025",
    topics: ["HIPAA", "Compliance", "Healthcare", "Best Practices"],
    featured: false,
    order: 4,
  },
  {
    title: "Retail Advertising in the Omnichannel Era",
    description: "Strategies for connecting online and offline experiences to drive foot traffic and sales.",
    category: "industry-guide",
    pages: 35,
    downloads: "7.8K+",
    publishDate: "Jul 2025",
    topics: ["Retail", "Omnichannel", "Foot Traffic", "Sales"],
    featured: false,
    order: 5,
  },
  {
    title: "Location Intelligence: Advanced Geo-Targeting",
    description: "Leveraging location data and geographic insights for precision advertising and audience targeting.",
    category: "technology",
    pages: 42,
    downloads: "6.3K+",
    publishDate: "Jun 2025",
    topics: ["Geo-Targeting", "Location Data", "Audience", "Analytics"],
    featured: false,
    order: 6,
  },
  {
    title: "Automotive Advertising Playbook",
    description: "Proven strategies for reaching car shoppers throughout their journey from research to purchase.",
    category: "industry-guide",
    pages: 40,
    downloads: "4.9K+",
    publishDate: "May 2025",
    topics: ["Automotive", "Lead Generation", "Dealerships", "Strategy"],
    featured: false,
    order: 7,
  },
  {
    title: "Measuring Campaign Success: KPIs That Matter",
    description: "Comprehensive guide to tracking, analyzing, and optimizing advertising performance with key metrics.",
    category: "analytics",
    pages: 30,
    downloads: "10.1K+",
    publishDate: "Apr 2025",
    topics: ["KPIs", "Analytics", "Measurement", "Optimization"],
    featured: false,
    order: 8,
  }
]

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function migrateWhitepapers() {
  console.log('Starting whitepapers migration...')
  console.log(`Found ${whitepapers.length} whitepapers to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const paper of whitepapers) {
    try {
      const slug = createSlug(paper.title)
      
      const existing = await client.fetch(
        `*[_type == "whitepaper" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'whitepaper',
        title: paper.title,
        slug: { _type: 'slug', current: slug },
        description: paper.description,
        category: paper.category,
        pages: paper.pages,
        downloads: paper.downloads,
        publishDate: paper.publishDate,
        topics: paper.topics,
        featured: paper.featured,
        order: paper.order,
      }

      if (existing) {
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${paper.title}`)
      } else {
        await client.create(doc)
        console.log(`✓ Created: ${paper.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${paper.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateWhitepapers().catch(console.error)
