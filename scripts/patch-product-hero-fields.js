const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Hero content patches for each product slug
const patches = [
  {
    slug: 'mw-studio',
    fields: {
      heroTitle: 'MW Studio',
      heroSubtitle: 'Build Marketplaces & Create Campaigns',
      heroBadge: 'No-Code Creative Platform',
      heroStats: [
        { _key: 'stat1', value: '500+', label: 'Templates' },
        { _key: 'stat2', value: '5 min', label: 'Avg Setup Time' },
        { _key: 'stat3', value: 'Live', label: 'Inventory Sync' },
        { _key: 'stat4', value: '200+', label: 'Design Components' },
      ],
    },
  },
  {
    slug: 'mw-planner',
    fields: {
      heroStats: [
        { _key: 'stat1', value: '287%', label: 'Avg ROI Improvement' },
        { _key: 'stat2', value: '94%', label: 'Forecast Accuracy' },
        { _key: 'stat3', value: '3x', label: 'Faster Planning' },
        { _key: 'stat4', value: '500+', label: 'Campaigns Run' },
      ],
    },
  },
  {
    slug: 'mw-activate',
    fields: {
      heroBadge: 'AI-Powered DSP',
      heroStats: [
        { _key: 'stat1', value: '99.5%', label: 'Uptime SLA' },
        { _key: 'stat2', value: '<150ms', label: 'Bid Response' },
        { _key: 'stat3', value: '50+', label: 'Countries' },
        { _key: 'stat4', value: '1B+', label: 'Daily Bids' },
      ],
    },
  },
  {
    slug: 'mw-influence',
    fields: {
      heroBadge: 'Intelligent Ad Server',
      heroStats: [
        { _key: 'stat1', value: '10K+', label: 'Screens Managed' },
        { _key: 'stat2', value: '$2.4B', label: 'Ad Spend Managed' },
        { _key: 'stat3', value: '99.9%', label: 'Delivery Accuracy' },
        { _key: 'stat4', value: '32%', label: 'Avg Revenue Lift' },
      ],
    },
  },
  {
    slug: 'mw-science',
    fields: {
      heroBadge: 'AI & Audience Intelligence',
      heroStats: [
        { _key: 'stat1', value: '94.2%', label: 'Prediction Accuracy' },
        { _key: 'stat2', value: '1M+', label: 'Data Points/sec' },
        { _key: 'stat3', value: '250+', label: 'AI Models' },
        { _key: 'stat4', value: '15K+', label: 'Tests Run' },
      ],
    },
  },
  {
    slug: 'mw-market',
    fields: {
      heroBadge: 'Global OOH Marketplace',
      heroStats: [
        { _key: 'stat1', value: '500K+', label: 'Billboard Inventory' },
        { _key: 'stat2', value: '100+', label: 'Countries' },
        { _key: 'stat3', value: '15K+', label: 'Active Buyers' },
        { _key: 'stat4', value: '$500M+', label: 'GMV Processed' },
      ],
    },
  },
]

async function patchProducts() {
  console.log('Patching product hero fields in Sanity...\n')

  for (const patch of patches) {
    try {
      // Fetch the document ID first
      const doc = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]{ _id, slug }`,
        { slug: patch.slug }
      )

      if (!doc) {
        console.log(`  ✗ NOT FOUND: ${patch.slug}`)
        continue
      }

      await client
        .patch(doc._id)
        .set(patch.fields)
        .commit()

      const fieldNames = Object.keys(patch.fields).join(', ')
      console.log(`  ✓ Patched ${patch.slug}: ${fieldNames}`)
    } catch (err) {
      console.error(`  ✗ Error patching ${patch.slug}:`, err.message)
    }
  }

  console.log('\nDone.')
}

patchProducts()
