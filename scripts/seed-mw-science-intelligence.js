/**
 * Sync the mw-science product document in Sanity with the new
 * "Intelligence Layer" page design (hero, pillars, outcomes).
 *
 * Usage: SANITY_API_TOKEN=... node scripts/seed-mw-science-intelligence.js
 * (or it reads from .env.local automatically)
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Load token from .env.local if not in env
if (!process.env.SANITY_API_TOKEN) {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = /^SANITY_API_TOKEN=(.*)$/.exec(line.trim())
      if (m) process.env.SANITY_API_TOKEN = m[1]
    }
  }
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN not found. Set it in env or .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const PILLAR_ITEMS = [
  {
    _key: 'pillar-experience',
    title: 'Experience Intelligence',
    description: 'Understanding how people experience brands across every interaction and every moment that shapes decision-making.',
    detail: [
      'CX measurement and monitoring',
      'CSAT and NPS tracking',
      'Real-time feedback collection',
      'Experience journey analysis',
      'Operational improvement insights',
    ].join('\n'),
  },
  {
    _key: 'pillar-media',
    title: 'Media Intelligence',
    description: 'Helping brands understand what media works, why it works, and how to continuously improve performance across channels.',
    detail: [
      'OOH measurement and attribution',
      'Cross-channel effectiveness analysis',
      'Incrementality science',
      'Campaign performance forecasting',
      'Media mix optimisation',
    ].join('\n'),
  },
  {
    _key: 'pillar-location',
    title: 'Location Intelligence',
    description: 'Connecting physical environments with consumer behaviour to understand how place influences decisions.',
    detail: [
      'Footfall and mobility analysis',
      'Place-based audience segmentation',
      'Context-aware targeting',
      'Physical journey mapping',
      'Retail environment intelligence',
    ].join('\n'),
  },
  {
    _key: 'pillar-audience',
    title: 'Audience Intelligence',
    description: 'Moving beyond demographics to understand intent, motivations, behaviours, and evolving audience needs.',
    detail: [
      'Audience personas and segmentation',
      'Usage and attitude studies',
      'Consumer journey mapping',
      'Behavioral and preference analysis',
      'Market and category intelligence',
    ].join('\n'),
  },
  {
    _key: 'pillar-innovation',
    title: 'Innovation Intelligence',
    description: 'Exploring AI and new methodologies that continuously shape the future of marketing intelligence and decision-making.',
    detail: [
      'Concept and creative testing',
      'Message and product validation',
      'A/B experimentation frameworks',
      'Predictive analytics',
      'AI-powered research synthesis',
    ].join('\n'),
  },
]

const OUTCOME_ITEMS = [
  { _key: 'out-1', title: 'Better Customer Understanding', metric: '94%', metricLabel: 'audience prediction accuracy', description: "Know who your audience is, what they want, and when they're ready to act." },
  { _key: 'out-2', title: 'Smarter Media Investments', metric: '+287%', metricLabel: 'average audience lift', description: 'Allocate budgets to the moments and channels that drive measurable impact.' },
  { _key: 'out-3', title: 'More Effective Planning', metric: '3.2×', metricLabel: 'ROI improvement on planned campaigns', description: 'Build plans grounded in evidence, not assumption, before spend begins.' },
  { _key: 'out-4', title: 'Higher Marketing Performance', metric: '40%', metricLabel: 'reduction in wasted spend', description: 'Continuous optimisation that gets smarter with every campaign cycle.' },
  { _key: 'out-5', title: 'Continuous Optimisation', metric: '60+', metricLabel: 'signals processed per second', description: 'Real-time intelligence that adapts as markets and audiences evolve.' },
  { _key: 'out-6', title: 'Confident Business Decisions', metric: '4B+', metricLabel: 'physical signals analysed', description: 'Turn physical-world complexity into clear, actionable recommendations.' },
]

async function run() {
  const doc = await client.fetch(`*[_type == "product" && slug.current == "mw-science"][0]{_id, detailPageSections}`)
  if (!doc) {
    console.error('❌ mw-science product document not found')
    process.exit(1)
  }

  // Preserve any sections that are not ours
  const otherSections = (doc.detailPageSections || []).filter(
    s => !['intelligence-pillars', 'outcomes'].includes(s.sectionKey)
  )

  await client
    .patch(doc._id)
    .set({
      heroTitle: 'The Intelligence Layer Behind Better Decisions',
      heroSubtitle:
        'MW Science transforms human, spatial and behavioural signals into intelligence that helps businesses make better decisions across every moment of the customer journey.',
      heroStats: [
        { _key: 'stat-signals', value: '4B+', label: 'signals analysed' },
        { _key: 'stat-markets', value: '30+', label: 'markets covered' },
        { _key: 'stat-domains', value: '5', label: 'intelligence domains' },
      ],
      ctaText: 'Get Started',
      ctaLink: '/contact',
      detailPageSections: [
        ...otherSections,
        {
          _key: 'section-pillars',
          sectionKey: 'intelligence-pillars',
          sectionTitle: 'Five Pillars of Intelligence',
          sectionSubtitle:
            'Each pillar represents a domain where MW Science develops proprietary intelligence—not a methodology, but a living capability that continuously improves.',
          items: PILLAR_ITEMS,
        },
        {
          _key: 'section-outcomes',
          sectionKey: 'outcomes',
          sectionTitle: 'Intelligence That Creates Outcomes',
          sectionSubtitle:
            "Instead of talking about features, here's what businesses actually achieve when intelligence replaces guesswork.",
          items: OUTCOME_ITEMS,
        },
      ],
    })
    .commit()

  console.log('✅ mw-science document updated with Intelligence Layer content')
  console.log(`   - heroTitle, heroSubtitle, 3 heroStats, ctaText/ctaLink`)
  console.log(`   - detailPageSections: intelligence-pillars (5), outcomes (6)`)
  if (otherSections.length) {
    console.log(`   - preserved existing sections: ${otherSections.map(s => s.sectionKey).join(', ')}`)
  }
}

run().catch(err => {
  console.error('❌ Failed:', err.message)
  process.exit(1)
})
