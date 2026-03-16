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

// Press releases data with full content
const pressReleasesData = [
  {
    publishedAt: "2024-11-15",
    category: "product-news",
    title: "MovingWalls Launches AI-Powered Audience Targeting Platform",
    excerpt: "Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition.",
    readTime: "3 min read",
    isMediaFeature: false,
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls, a leading out-of-home (OOH) advertising technology company, today announced the launch of its revolutionary AI-Powered Audience Targeting Platform, designed to transform how brands reach their target audiences through outdoor advertising.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Key Features' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The new platform leverages advanced machine learning algorithms to analyze audience behavior patterns, location data, and demographic information to optimize campaign delivery in real-time.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Early adopters of the platform have reported a 40% improvement in campaign performance and significant reductions in cost per acquisition, demonstrating the power of AI-driven targeting in the OOH space.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Industry Impact' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '"This launch represents a major milestone in the evolution of outdoor advertising," said the company spokesperson. "We\'re bringing the precision of digital advertising to the physical world, enabling brands to reach the right audience at the right time and place."' }] },
    ]
  },
  {
    publishedAt: "2024-10-28",
    category: "company-news",
    title: "MovingWalls Closes $50M Series C Funding Round",
    excerpt: "Investment led by top-tier VCs will fuel international expansion and product development initiatives.",
    readTime: "4 min read",
    isMediaFeature: false,
    hasFullArticle: true,
    articleSlug: "series-c-funding",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls today announced the successful completion of a $50 million Series C funding round, marking a significant milestone in the company\'s growth trajectory.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Investment Details' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The funding round was led by prominent venture capital firms, with participation from existing investors who continue to show strong confidence in MovingWalls\' vision and execution.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Growth Plans' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The new capital will be deployed across three key areas: international market expansion, product development and innovation, and strategic talent acquisition to strengthen the leadership team.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '"This funding validates our strategy and positions us to accelerate growth in key markets globally," said the CEO. "We\'re excited to continue building the future of out-of-home advertising technology."' }] },
    ]
  },
  {
    publishedAt: "2024-09-12",
    category: "partnership",
    title: "Strategic Partnership with Global Transit Authority Network",
    excerpt: "Major partnership expands MovingWalls's out-of-home advertising network to 25 new metropolitan areas.",
    readTime: "2 min read",
    isMediaFeature: false,
    hasFullArticle: true,
    articleSlug: "transit-partnership",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls has announced a landmark partnership with a major global transit authority network, significantly expanding its out-of-home advertising footprint.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Partnership Scope' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This strategic alliance will bring MovingWalls\' cutting-edge advertising technology to 25 new metropolitan areas, reaching millions of daily commuters across multiple continents.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The partnership includes digital displays in subway stations, bus shelters, and major transit hubs, offering advertisers unprecedented access to high-traffic urban environments.' }] },
    ]
  },
  {
    publishedAt: "2024-08-05",
    category: "award",
    title: "MovingWalls Named 'AdTech Company of the Year' by Industry Awards",
    excerpt: "Recognition highlights company's innovation in programmatic advertising and measurement solutions.",
    readTime: "3 min read",
    isMediaFeature: false,
    hasFullArticle: true,
    articleSlug: "adtech-company-of-year",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls has been named "AdTech Company of the Year" at the prestigious Industry Awards ceremony, recognizing the company\'s exceptional contributions to advertising technology innovation.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Award Recognition' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The award specifically highlighted MovingWalls\' groundbreaking work in programmatic advertising and measurement solutions for the out-of-home sector.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '"This recognition belongs to our entire team who work tirelessly to push the boundaries of what\'s possible in outdoor advertising," said the company\'s Chief Technology Officer.' }] },
    ]
  },
  {
    publishedAt: "2024-07-22",
    category: "product-news",
    title: "New Privacy-First Measurement Suite Launches",
    excerpt: "Industry-leading privacy compliance tools help brands navigate evolving data regulations while maintaining effectiveness.",
    readTime: "5 min read",
    isMediaFeature: false,
    hasFullArticle: true,
    articleSlug: "privacy-first-measurement",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls today unveiled its new Privacy-First Measurement Suite, a comprehensive solution designed to help brands navigate the complex landscape of data privacy regulations while maintaining campaign effectiveness.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Privacy by Design' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The suite incorporates privacy-by-design principles, ensuring compliance with GDPR, CCPA, and other global data protection regulations without sacrificing measurement accuracy.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Key Capabilities' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Features include anonymized audience insights, aggregated measurement data, and transparent data handling practices that give brands confidence in their advertising investments.' }] },
    ]
  },
  {
    publishedAt: "2024-06-18",
    category: "company-news",
    title: "MovingWalls Opens European Headquarters in London",
    excerpt: "New office serves as regional hub for European operations and client services expansion.",
    readTime: "2 min read",
    isMediaFeature: false,
    hasFullArticle: true,
    articleSlug: "london-headquarters",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'MovingWalls has officially opened its European headquarters in London, marking a significant expansion of the company\'s global presence.' }] },
      { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Strategic Location' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The new London office will serve as the regional hub for all European operations, providing local support for the company\'s growing client base across the continent.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: '"London\'s position as a global business hub makes it the ideal location for our European headquarters," said the Regional Director. "We\'re committed to providing exceptional service to our European clients."' }] },
    ]
  }
]

// Media features data from the static page
const mediaFeaturesData = [
  {
    source: "AdWeek",
    title: "How MovingWalls is Revolutionizing Out-of-Home Advertising",
    publishedAt: "2024-11-08",
    category: "media-spotlight",
    excerpt: "An in-depth look at how MovingWalls is transforming the out-of-home advertising industry with innovative technology solutions.",
    readTime: "5 min read",
    isMediaFeature: true,
    externalLink: "https://www.adweek.com",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'AdWeek takes an in-depth look at MovingWalls and its mission to revolutionize the out-of-home advertising industry through technology and innovation.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The feature article explores how the company\'s platform is bridging the gap between traditional outdoor advertising and the precision targeting capabilities of digital advertising.' }] },
    ]
  },
  {
    source: "TechCrunch",
    title: "The Future of Programmatic Advertising Technology",
    publishedAt: "2024-10-15",
    category: "industry-news",
    excerpt: "TechCrunch explores the cutting-edge technology driving the future of programmatic advertising.",
    readTime: "4 min read",
    isMediaFeature: true,
    externalLink: "https://www.techcrunch.com",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'TechCrunch explores the rapidly evolving landscape of programmatic advertising, featuring insights from MovingWalls on the future of automated ad buying and selling.' }] },
    ]
  },
  {
    source: "Marketing Land",
    title: "CEO Interview: Building the Next Generation Ad Platform",
    publishedAt: "2024-09-30",
    category: "media-spotlight",
    excerpt: "An exclusive interview with our CEO on the vision and technology behind the next generation advertising platform.",
    readTime: "6 min read",
    isMediaFeature: true,
    externalLink: "https://www.marketingland.com",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Marketing Land sits down with MovingWalls\' CEO for an exclusive interview about the company\'s vision for the future of advertising technology.' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The interview covers topics ranging from AI integration to privacy-first measurement approaches.' }] },
    ]
  },
  {
    source: "Forbes",
    title: "MovingWalls Among Top 50 Most Innovative Companies",
    publishedAt: "2024-09-01",
    category: "award",
    excerpt: "Forbes recognizes MovingWalls as one of the top 50 most innovative companies in the advertising technology sector.",
    readTime: "3 min read",
    isMediaFeature: true,
    externalLink: "https://www.forbes.com",
    content: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Forbes has recognized MovingWalls as one of the Top 50 Most Innovative Companies in the advertising technology sector, highlighting the company\'s breakthrough approaches to out-of-home advertising.' }] },
    ]
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

// Helper to generate block key
function generateKey() {
  return Math.random().toString(36).substring(2, 15)
}

// Add keys to blocks
function addKeysToBlocks(blocks) {
  if (!blocks) return undefined
  return blocks.map(block => ({
    ...block,
    _key: generateKey(),
    children: block.children?.map(child => ({
      ...child,
      _key: generateKey()
    }))
  }))
}

// Main migration function
async function migratePressReleases() {
  console.log('Starting press/news migration...')
  console.log(`Found ${allPressData.length} items to migrate (${pressReleasesData.length} news releases, ${mediaFeaturesData.length} media features)`)

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
        externalLink: item.externalLink || undefined,
        hasFullArticle: item.hasFullArticle || false,
        articleSlug: item.articleSlug ? { _type: 'slug', current: item.articleSlug } : undefined,
        content: addKeysToBlocks(item.content),
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
