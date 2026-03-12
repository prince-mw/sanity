// Migration script for ebooks to Sanity
// Run with: node scripts/migrate-ebooks-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

const ebooks = [
  {
    title: "The Ultimate Guide to Programmatic Out-of-Home Advertising",
    description: "How leading brands and agencies are using data-driven, measurable OOH to win attention in a fragmented, performance-driven connected media world.",
    category: "guide",
    featured: true,
    isNew: true,
    year: "2026",
    order: 1,
  },
  {
    title: "Solutions by MovingWalls: Unlocking the Power of Last Mile Advertising",
    description: "Discover how data-driven retail media and last-mile advertising can boost engagement and sales at the point of purchase.",
    category: "playbook",
    featured: false,
    isNew: true,
    year: "2025",
    order: 2,
  },
  {
    title: "Sustainability in Out-of-Home Media: An Open-Source Industry Roadmap",
    description: "Discover how the OOH industry is adopting sustainability with actionable insights and best practices to reduce carbon emissions.",
    category: "whitepaper",
    featured: false,
    isNew: false,
    year: "2025",
    order: 3,
  },
  {
    title: "The Future of OOH & DOOH in Japan: Trends, Innovation, and Market Predictions for 2025",
    description: "Explore the transformative trends reshaping Japan's Out-of-Home and Digital Out-of-Home advertising landscape.",
    category: "market-report",
    featured: false,
    isNew: false,
    year: "2024",
    order: 4,
  },
  {
    title: "The Future of OOH & DOOH in Vietnam: Trends, Innovation, and Market Predictions for 2025",
    description: "Explore Vietnam's evolving OOH landscape. From the growth of programmatic DOOH to new LED installations.",
    category: "market-report",
    featured: false,
    isNew: false,
    year: "2024",
    order: 5,
  },
  {
    title: "Why Out-of-Home (OOH) Must Be Part of Your Marketing Plan",
    description: "Discover the unparalleled advantages of OOH media. Explore how integrating OOH into your marketing strategy can amplify your brand's reach.",
    category: "whitepaper",
    featured: false,
    isNew: false,
    year: "2024",
    order: 6,
  },
  {
    title: "Ultimate Guide to DOOH 2024",
    description: "Dive into the dynamic world of Digital Out-of-Home advertising in the Asia-Pacific region with our comprehensive guide.",
    category: "guide",
    featured: false,
    isNew: false,
    year: "2024",
    order: 7,
  },
  {
    title: "Your Guide to Cyber Security for Digital Signage and OOH Screens",
    description: "In an era where data security is paramount, ensuring the safety of your digital signage and OOH screens is crucial.",
    category: "guide",
    featured: false,
    isNew: false,
    year: "2024",
    order: 8,
  },
  {
    title: "Navigating Outside the Home Media Using Data and Emerging Technology",
    description: "Discover the Outernet Campaign Playbook showcasing innovative executions. Explore planning, delivery, measurement, and verification strategies.",
    category: "playbook",
    featured: false,
    isNew: false,
    year: "2023",
    order: 9,
  },
  {
    title: "Mastering Digital Out-of-Home in Malaysia",
    description: "Discover the potential of DOOH advertising in Malaysia and revolutionize your marketing efforts. Stay ahead with valuable insights.",
    category: "guide",
    featured: false,
    isNew: false,
    year: "2023",
    order: 10,
  },
  {
    title: "Always On DOOH Advertising",
    description: "Discover the power of real-world data. Learn how to engage your target audience, increase foot traffic, and create impactful DOOH campaigns.",
    category: "guide",
    featured: false,
    isNew: false,
    year: "2023",
    order: 11,
  },
  {
    title: "Enhanced Customer Experience with CMS",
    description: "Boost system efficiency by embracing a reliable, effective, and streamlined approach to content delivery on screens.",
    category: "whitepaper",
    featured: false,
    isNew: false,
    year: "2023",
    order: 12,
  },
  {
    title: "ICC Coffee Table: Activate Your Fans, Grow Your Viewership",
    description: "Unlock the power of sponsored highlights content on digital screens outside homes. Engage new audiences with relevant content.",
    category: "playbook",
    featured: false,
    isNew: false,
    year: "2023",
    order: 13,
  },
  {
    title: "Optimising DOOH: Foodpanda's Playbook for OOH Media",
    description: "Discover the pandemic's impact on traditional media and the rising potential of Outernet Marketing with data-driven strategies.",
    category: "playbook",
    featured: false,
    isNew: false,
    year: "2023",
    order: 14,
  },
  {
    title: "Sustainable, Inclusive Innovation is Fueling India",
    description: "Discover the immense potential of India's thriving Out-of-Home advertising industry. Explore the latest trends and revenue insights.",
    category: "market-report",
    featured: false,
    isNew: false,
    year: "2023",
    order: 15,
  },
  {
    title: "Unlocking the Power of the Outernet 2023",
    description: "Unlock the power of Outernet advertising and harness its impact in a digitally-driven world. Gain insights into OOH campaign effectiveness.",
    category: "whitepaper",
    featured: false,
    isNew: false,
    year: "2023",
    order: 16,
  },
]

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function migrateEbooks() {
  console.log('Starting ebooks migration...')
  console.log(`Found ${ebooks.length} ebooks to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const ebook of ebooks) {
    try {
      const slug = createSlug(ebook.title)
      
      const existing = await client.fetch(
        `*[_type == "ebook" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'ebook',
        title: ebook.title,
        slug: { _type: 'slug', current: slug },
        description: ebook.description,
        category: ebook.category,
        featured: ebook.featured,
        isNew: ebook.isNew,
        year: ebook.year,
        order: ebook.order,
      }

      if (existing) {
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${ebook.title}`)
      } else {
        await client.create(doc)
        console.log(`✓ Created: ${ebook.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${ebook.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateEbooks().catch(console.error)
