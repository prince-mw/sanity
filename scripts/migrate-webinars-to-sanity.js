// Migration script for webinars data to Sanity
// Run with: node scripts/migrate-webinars-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

// Upcoming webinars
const upcomingWebinars = [
  {
    title: "AI-Powered Campaign Optimization: Advanced Strategies",
    description: "Learn cutting-edge techniques for leveraging AI and machine learning to optimize your advertising campaigns in real-time.",
    date: "2025-12-15T14:00:00-05:00",
    time: "2:00 PM EST",
    duration: "60 min",
    speaker: "Dr. Sarah Mitchell",
    speakerRole: "Chief Data Scientist",
    attendees: 234,
    level: "advanced",
    webinarType: "upcoming"
  },
  {
    title: "Getting Started with Programmatic DOOH",
    description: "A comprehensive introduction to programmatic digital out-of-home advertising for beginners.",
    date: "2025-12-20T11:00:00-05:00",
    time: "11:00 AM EST",
    duration: "45 min",
    speaker: "Michael Torres",
    speakerRole: "Product Manager",
    attendees: 456,
    level: "beginner",
    webinarType: "upcoming"
  },
  {
    title: "Healthcare Marketing Compliance & Best Practices",
    description: "Navigate healthcare advertising regulations while maximizing campaign effectiveness.",
    date: "2026-01-08T13:00:00-05:00",
    time: "1:00 PM EST",
    duration: "50 min",
    speaker: "Dr. Amanda Lee",
    speakerRole: "Healthcare Marketing Expert",
    attendees: 189,
    level: "intermediate",
    webinarType: "upcoming"
  }
]

// On-demand webinars
const onDemandWebinars = [
  {
    title: "Maximizing ROI with MW Planner: Complete Workshop",
    description: "Deep dive into campaign planning and optimization strategies using MW Planner platform.",
    duration: "75 min",
    speaker: "James Wilson",
    speakerRole: "Senior Solutions Architect",
    views: 2456,
    rating: 4.8,
    level: "intermediate",
    webinarType: "on-demand"
  },
  {
    title: "The Future of Retail Advertising in 2025",
    description: "Explore emerging trends and technologies shaping the future of retail marketing.",
    duration: "45 min",
    speaker: "Lisa Chen",
    speakerRole: "Industry Analyst",
    views: 3892,
    rating: 4.9,
    level: "all-levels",
    webinarType: "on-demand"
  },
  {
    title: "Location-Based Targeting Masterclass",
    description: "Advanced techniques for geo-targeting and location intelligence in advertising.",
    duration: "60 min",
    speaker: "Robert Martinez",
    speakerRole: "Targeting Specialist",
    views: 1823,
    rating: 4.7,
    level: "advanced",
    webinarType: "on-demand"
  },
  {
    title: "Creative Best Practices for DOOH Campaigns",
    description: "Design principles and creative strategies that drive engagement in outdoor advertising.",
    duration: "40 min",
    speaker: "Emily Rodriguez",
    speakerRole: "Creative Director",
    views: 4123,
    rating: 4.9,
    level: "all-levels",
    webinarType: "on-demand"
  },
  {
    title: "Data-Driven Audience Insights with MW Science",
    description: "Unlock the power of AI-driven audience analysis for better targeting.",
    duration: "55 min",
    speaker: "David Park",
    speakerRole: "Data Science Lead",
    views: 2789,
    rating: 4.8,
    level: "intermediate",
    webinarType: "on-demand"
  },
  {
    title: "Automotive Campaign Strategies That Convert",
    description: "Proven tactics for reaching car shoppers and driving dealership visits.",
    duration: "50 min",
    speaker: "Jennifer Brooks",
    speakerRole: "Automotive Specialist",
    views: 1567,
    rating: 4.6,
    level: "intermediate",
    webinarType: "on-demand"
  }
]

const allWebinars = [...upcomingWebinars, ...onDemandWebinars]

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function migrateWebinars() {
  console.log('Starting webinars migration...')
  console.log(`Found ${allWebinars.length} webinars to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const webinar of allWebinars) {
    try {
      const slug = createSlug(webinar.title)
      
      const existing = await client.fetch(
        `*[_type == "webinar" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'webinar',
        title: webinar.title,
        slug: { _type: 'slug', current: slug },
        description: webinar.description,
        webinarType: webinar.webinarType,
        date: webinar.date || null,
        time: webinar.time || null,
        duration: webinar.duration,
        speaker: webinar.speaker,
        speakerRole: webinar.speakerRole,
        attendees: webinar.attendees || null,
        views: webinar.views || null,
        rating: webinar.rating || null,
        level: webinar.level,
      }

      if (existing) {
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${webinar.title}`)
      } else {
        await client.create(doc)
        console.log(`✓ Created: ${webinar.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${webinar.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateWebinars().catch(console.error)
