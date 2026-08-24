// One-time creation of the F1 2026 landing page's Sanity entry.
//
// This does NOT control the actual page content — /f1-2026 is a hand-coded Next.js page
// (src/app/f1-2026/page.tsx) because Sanity's generic landing-page section builder can't
// reproduce its bespoke design. This document exists purely so the page shows up under
// Studio's "Products & Pages > Landing Pages" list and so marketing can self-serve two
// things without a developer: editing the SEO fields, and taking the page down after the
// F1 race by switching "Published" off (or Status to "Archived").
//
// Run with: SANITY_API_TOKEN=... node scripts/seed-f1-2026-landing-page.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const f1LandingPageData = {
  _id: 'landingPage-f1-2026',
  _type: 'landingPage',
  title: 'F1 2026 - Curated Journeys (Malaysia & Singapore)',
  slug: { _type: 'slug', current: 'f1-2026' },
  isPublished: true,
  status: 'published',
  seo: {
    metaTitle: 'Curated Journeys - F1 Malaysia & Singapore | Moving Walls',
    metaDescription:
      "Own the journey to F1. Curated OOH & DOOH media packages across Sepang, Malaysia (4 Oct 2026) and Marina Bay, Singapore (11 Oct 2026) — reach audiences on the way to, around, and home from the race.",
    keywords: [
      'F1 Malaysia advertising',
      'F1 Singapore advertising',
      'Sepang OOH',
      'Marina Bay DOOH',
      'F1 sponsorship activation',
      'Curated Journeys',
      'OOH media packages',
    ],
    enableKeywords: true,
    noIndex: false,
  },
  // Left empty on purpose — the live page ignores this field and renders its own
  // hardcoded sections. Do not add sections here expecting them to appear on the site.
  sections: [],
}

async function seedF1LandingPage() {
  console.log('Seeding F1 2026 landing page entry...')

  try {
    const existing = await client.getDocument('landingPage-f1-2026')
    if (existing) {
      console.log('Document already exists. Updating...')
      await client.createOrReplace(f1LandingPageData)
    } else {
      await client.create(f1LandingPageData)
    }
    console.log('✅ F1 2026 landing page entry seeded successfully!')
  } catch (error) {
    console.error('Error seeding F1 2026 landing page entry:', error)
    process.exit(1)
  }
}

seedF1LandingPage()
