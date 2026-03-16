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
    description: "Learn cutting-edge techniques for leveraging AI and machine learning to optimize your advertising campaigns in real-time. This webinar will cover predictive analytics, automated bidding strategies, and how to leverage data for better campaign performance.",
    date: "2026-04-15T14:00:00-05:00",
    time: "2:00 PM EST",
    duration: "60 min",
    speaker: "Dr. Sarah Mitchell",
    speakerRole: "Chief Data Scientist",
    attendees: 234,
    level: "advanced",
    webinarType: "upcoming",
    registrationLink: "https://movingwalls.com/register/ai-optimization"
  },
  {
    title: "Getting Started with Programmatic DOOH",
    description: "A comprehensive introduction to programmatic digital out-of-home advertising for beginners. Learn the fundamentals of automated media buying, real-time bidding, and how to launch your first pDOOH campaign.",
    date: "2026-04-20T11:00:00-05:00",
    time: "11:00 AM EST",
    duration: "45 min",
    speaker: "Michael Torres",
    speakerRole: "Product Manager",
    attendees: 456,
    level: "beginner",
    webinarType: "upcoming",
    registrationLink: "https://movingwalls.com/register/pdooh-basics"
  },
  {
    title: "Healthcare Marketing Compliance & Best Practices",
    description: "Navigate healthcare advertising regulations while maximizing campaign effectiveness. Learn HIPAA-compliant targeting strategies and how to reach healthcare consumers ethically.",
    date: "2026-05-08T13:00:00-05:00",
    time: "1:00 PM EST",
    duration: "50 min",
    speaker: "Dr. Amanda Lee",
    speakerRole: "Healthcare Marketing Expert",
    attendees: 189,
    level: "intermediate",
    webinarType: "upcoming",
    registrationLink: "https://movingwalls.com/register/healthcare-marketing"
  },
  {
    title: "Retail Media Networks: The DOOH Opportunity",
    description: "Discover how retail media networks are transforming out-of-home advertising. Learn strategies to reach shoppers at point-of-purchase and drive measurable retail outcomes.",
    date: "2026-05-22T10:00:00-05:00",
    time: "10:00 AM EST",
    duration: "55 min",
    speaker: "Rachel Kim",
    speakerRole: "Retail Strategy Director",
    attendees: 312,
    level: "intermediate",
    webinarType: "upcoming",
    registrationLink: "https://movingwalls.com/register/retail-media"
  }
]

// Past webinars (previously recorded)
const pastWebinars = [
  {
    title: "Maximizing ROI with MW Planner: Complete Workshop",
    description: "Deep dive into campaign planning and optimization strategies using MW Planner platform. Learn how to set budgets, select inventory, and optimize campaigns for maximum return on investment.",
    date: "2025-11-15T14:00:00-05:00",
    time: "2:00 PM EST",
    duration: "75 min",
    speaker: "James Wilson",
    speakerRole: "Senior Solutions Architect",
    views: 2456,
    rating: 4.8,
    level: "intermediate",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/mw-planner-workshop"
  },
  {
    title: "The Future of Retail Advertising in 2025",
    description: "Explore emerging trends and technologies shaping the future of retail marketing. From in-store digital displays to connected shopping experiences, discover what's next for retail media.",
    date: "2025-10-20T11:00:00-05:00",
    time: "11:00 AM EST",
    duration: "45 min",
    speaker: "Lisa Chen",
    speakerRole: "Industry Analyst",
    views: 3892,
    rating: 4.9,
    level: "all-levels",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/retail-future"
  },
  {
    title: "Location-Based Targeting Masterclass",
    description: "Advanced techniques for geo-targeting and location intelligence in advertising. Learn how to leverage mobile location data, geofencing, and audience mobility patterns.",
    date: "2025-09-10T15:00:00-05:00",
    time: "3:00 PM EST",
    duration: "60 min",
    speaker: "Robert Martinez",
    speakerRole: "Targeting Specialist",
    views: 1823,
    rating: 4.7,
    level: "advanced",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/location-targeting"
  },
  {
    title: "Creative Best Practices for DOOH Campaigns",
    description: "Design principles and creative strategies that drive engagement in outdoor advertising. Learn optimal formats, motion graphics best practices, and contextual creative optimization.",
    date: "2025-08-05T13:00:00-05:00",
    time: "1:00 PM EST",
    duration: "40 min",
    speaker: "Emily Rodriguez",
    speakerRole: "Creative Director",
    views: 4123,
    rating: 4.9,
    level: "all-levels",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/creative-best-practices"
  },
  {
    title: "Data-Driven Audience Insights with MW Science",
    description: "Unlock the power of AI-driven audience analysis for better targeting. Discover how movement data and behavioral insights can transform your campaign strategy.",
    date: "2025-07-18T14:00:00-05:00",
    time: "2:00 PM EST",
    duration: "55 min",
    speaker: "David Park",
    speakerRole: "Data Science Lead",
    views: 2789,
    rating: 4.8,
    level: "intermediate",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/mw-science-insights"
  },
  {
    title: "Automotive Campaign Strategies That Convert",
    description: "Proven tactics for reaching car shoppers and driving dealership visits. Learn how to target in-market buyers and measure footfall attribution for automotive campaigns.",
    date: "2025-06-20T11:00:00-05:00",
    time: "11:00 AM EST",
    duration: "50 min",
    speaker: "Jennifer Brooks",
    speakerRole: "Automotive Specialist",
    views: 1567,
    rating: 4.6,
    level: "intermediate",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/automotive-strategies"
  },
  {
    title: "Introduction to MW Activate: Your First Campaign",
    description: "Step-by-step guide to launching your first programmatic DOOH campaign with MW Activate. From setup to optimization, learn everything you need to get started.",
    date: "2025-05-12T10:00:00-05:00",
    time: "10:00 AM EST",
    duration: "45 min",
    speaker: "Alex Thompson",
    speakerRole: "Product Specialist",
    views: 5234,
    rating: 4.9,
    level: "beginner",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/mw-activate-intro"
  },
  {
    title: "Measuring OOH Success: Attribution & Analytics",
    description: "Deep dive into OOH measurement methodologies. Learn about footfall attribution, brand lift studies, and how to prove ROI for out-of-home campaigns.",
    date: "2025-04-08T14:00:00-05:00",
    time: "2:00 PM EST",
    duration: "65 min",
    speaker: "Michelle Wang",
    speakerRole: "Analytics Director",
    views: 3421,
    rating: 4.8,
    level: "intermediate",
    webinarType: "past",
    watchLink: "https://movingwalls.com/watch/ooh-measurement"
  }
]

const allWebinars = [...upcomingWebinars, ...pastWebinars]

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function migrateWebinars() {
  console.log('Starting webinars migration...')
  console.log(`Found ${allWebinars.length} webinars to migrate`)
  console.log(`  - ${upcomingWebinars.length} upcoming webinars`)
  console.log(`  - ${pastWebinars.length} past webinars`)

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
        registrationLink: webinar.registrationLink || null,
        watchLink: webinar.watchLink || null,
        seo: {
          metaTitle: webinar.title,
          metaDescription: webinar.description,
        }
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
