// Migration script for events data to Sanity
// Run with: node scripts/migrate-events-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
  useCdn: false,
})

// Events data from the static page
const eventsData = [
  {
    title: "The Future of Programmatic Advertising",
    eventType: "webinar",
    startDate: "2024-12-15T14:00:00-08:00",
    endDate: "2024-12-15T15:00:00-08:00",
    location: {
      isVirtual: true,
      venue: "Virtual Event",
    },
    excerpt: "Join our experts as we explore emerging trends in programmatic advertising and discuss how AI is reshaping the industry.",
    speakers: [
      { name: "Sarah Mitchell", role: "CEO" },
      { name: "David Chen", role: "CTO" }
    ],
    price: "Free",
    capacity: "500 attendees",
    category: "learning",
    featured: true
  },
  {
    title: "Moving Walls at AdTech Conference 2025",
    eventType: "conference",
    startDate: "2025-01-22T09:00:00-08:00",
    endDate: "2025-01-24T18:00:00-08:00",
    location: {
      venue: "Moscone Center",
      city: "San Francisco",
      country: "United States",
      isVirtual: false,
    },
    excerpt: "Meet our team at booth #245 and see live demos of our latest advertising technology innovations.",
    speakers: [
      { name: "Maria Rodriguez", role: "CMO" },
      { name: "Product Demo Team", role: "" }
    ],
    price: "Conference Pass Required",
    capacity: "Meet at Booth #245",
    category: "industry",
    featured: false
  },
  {
    title: "Data Privacy in Modern Advertising",
    eventType: "workshop",
    startDate: "2025-02-08T10:00:00-05:00",
    endDate: "2025-02-08T16:00:00-05:00",
    location: {
      venue: "New York Office",
      city: "New York",
      country: "United States",
      isVirtual: false,
    },
    excerpt: "Interactive workshop covering privacy-first advertising strategies and compliance with global data regulations.",
    speakers: [
      { name: "Dr. Lisa Park", role: "CDO" },
      { name: "Legal & Compliance Team", role: "" }
    ],
    price: "$299",
    capacity: "30 attendees",
    category: "learning",
    featured: false
  },
  {
    title: "Customer Success Stories & Best Practices",
    eventType: "webinar",
    startDate: "2025-02-20T13:00:00-05:00",
    endDate: "2025-02-20T14:00:00-05:00",
    location: {
      isVirtual: true,
      venue: "Virtual Event",
    },
    excerpt: "Learn from successful campaigns and discover best practices from leading brands using Moving Walls platforms.",
    speakers: [
      { name: "Michael Brown", role: "CRO" },
      { name: "Customer Success Team", role: "" }
    ],
    price: "Free",
    capacity: "1000 attendees",
    category: "product",
    featured: false
  },
  {
    title: "Moving Walls European Summit",
    eventType: "conference",
    startDate: "2025-03-15T09:00:00+00:00",
    endDate: "2025-03-15T17:00:00+00:00",
    location: {
      venue: "London Office",
      city: "London",
      country: "United Kingdom",
      isVirtual: false,
    },
    excerpt: "Annual European summit featuring keynotes, networking, and deep-dive sessions on advertising innovation.",
    speakers: [
      { name: "Full Leadership Team", role: "" },
      { name: "Industry Guest Speakers", role: "" }
    ],
    price: "Invitation Only",
    capacity: "150 attendees",
    category: "networking",
    featured: true
  },
  {
    title: "Mobile Advertising Masterclass",
    eventType: "workshop",
    startDate: "2025-03-28T11:00:00-08:00",
    endDate: "2025-03-28T15:00:00-08:00",
    location: {
      venue: "San Francisco Office",
      city: "San Francisco",
      country: "United States",
      isVirtual: false,
    },
    excerpt: "Hands-on training session focused on mobile advertising strategies and campaign optimization techniques.",
    speakers: [
      { name: "Product Training Team", role: "" },
      { name: "Mobile Strategy Experts", role: "" }
    ],
    price: "$199",
    capacity: "25 attendees",
    category: "learning",
    featured: false
  }
]

// Helper to create slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Main migration function
async function migrateEvents() {
  console.log('Starting events migration...')
  console.log(`Found ${eventsData.length} events to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const event of eventsData) {
    try {
      const slug = createSlug(event.title)
      
      // Check if event already exists
      const existing = await client.fetch(
        `*[_type == "event" && slug.current == $slug][0]`,
        { slug }
      )

      const doc = {
        _type: 'event',
        title: event.title,
        slug: { _type: 'slug', current: slug },
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        excerpt: event.excerpt,
        speakers: event.speakers,
        price: event.price,
        capacity: event.capacity,
        category: event.category,
        featured: event.featured,
      }

      if (existing) {
        // Update existing document
        await client.patch(existing._id).set(doc).commit()
        console.log(`✓ Updated: ${event.title}`)
      } else {
        // Create new document
        await client.create(doc)
        console.log(`✓ Created: ${event.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`✗ Error migrating "${event.title}":`, error.message)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Success: ${successCount}`)
  console.log(`Errors: ${errorCount}`)
}

migrateEvents().catch(console.error)
