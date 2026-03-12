// Migration script for press releases and media features to Sanity
// Run with: node scripts/migrate-press-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

// Press releases data from the static page
const pressReleasesData = [
  {
    publishedAt: "2024-11-15",
    category: "product-news",
    title: "MovingWalls Launches AI-Powered Audience Targeting Platform",
    excerpt: "Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition.",
    readTime: "3 min read",
    isMediaFeature: false,
  },
  {
    publishedAt: "2024-10-28",
    category: "funding",
    title: "MovingWalls Closes $50M Series C Funding Round",
    excerpt: "Investment led by top-tier VCs will fuel international expansion and product development initiatives.",
    readTime: "4 min read",
    isMediaFeature: false,
  },
  {
    publishedAt: "2024-09-12",
    category: "partnership",
    title: "Strategic Partnership with Global Transit Authority Network",
    excerpt: "Major partnership expands MovingWalls's out-of-home advertising network to 25 new metropolitan areas.",
    readTime: "2 min read",
    isMediaFeature: false,
  },
  {
    publishedAt: "2024-08-05",
    category: "award",
    title: "MovingWalls Named 'AdTech Company of the Year' by Industry Awards",
    excerpt: "Recognition highlights company's innovation in programmatic advertising and measurement solutions.",
    readTime: "3 min read",
    isMediaFeature: false,
  },
  {
    publishedAt: "2024-07-22",
    category: "product-news",
    title: "New Privacy-First Measurement Suite Launches",
    excerpt: "Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining effectiveness.",
    readTime: "5 min read",
    isMediaFeature: false,
  },
  {
    publishedAt: "2024-06-18",
    category: "company-news",
    title: "MovingWalls Opens European Headquarters in London",
    excerpt: "New office serves as regional hub for European operations and client services expansion.",
    readTime: "2 min read",
    isMediaFeature: false,
  }
]

// Media features data from the static page
const mediaFeaturesData = [
  {
    source: "AdWeek",
    title: "How MovingWalls is Revolutionizing Out-of-Home Advertising",
    publishedAt: "2024-11-08",
    category: "media-spotlight",
    isMediaFeature: true,
  },
  {
    source: "TechCrunch",
    title: "The Future of Programmatic Advertising Technology",
    publishedAt: "2024-10-15",
    category: "industry-news",
    isMediaFeature: true,
  },
  {
    source: "Marketing Land",
    title: "CEO Interview: Building the Next Generation Ad Platform",
    publishedAt: "2024-09-30",
    category: "media-spotlight",
    isMediaFeature: true,
  },
  {
    source: "Forbes",
    title: "MovingWalls Among Top 50 Most Innovative Companies",
    publishedAt: "2024-09-01",
    category: "award",
    isMediaFeature: true,
  }
]

// Combine all data
const allPressData = [...pressReleasesData, ...mediaFeaturesData]

// Helper to create slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Main migration function
async function migratePressReleases() {
  console.log('Starting press releases migration...')
  console.log(`Found ${allPressData.length} items to migrate (${pressReleasesData.length} press releases, ${mediaFeaturesData.length} media features)`)

  let successCount = 0
  let errorCount = 0

  for (const item of allPressData) {
    try {
      const slug = createSlug(item.title)
      
      // Check if item already exists
      const existing = await client.fetch(
        `*[_type == "pressRelease" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'pressRelease',
        title: item.title,
        slug: { _type: 'slug', current: slug },
        publishedAt: new Date(item.publishedAt).toISOString(),
        category: item.category,
        excerpt: item.excerpt || '',
        readTime: item.readTime || '3 min read',
        source: item.source || 'MovingWalls',
        isMediaFeature: item.isMediaFeature || false,
      }

      if (existing) {
        // Update existing document
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${item.title}`)
      } else {
        // Create new document
        await client.create(doc)
        console.log(`✓ Created: ${item.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${item.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migratePressReleases().catch(console.error)
