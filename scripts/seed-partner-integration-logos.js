/**
 * Seed Partner Integration Logos to Sanity CMS
 * Uploads SVG logos from public/assets/images/integrations/ and creates
 * partnerIntegrationLogo documents.
 *
 * Run: node scripts/seed-partner-integration-logos.js
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skjvkHRa4ivcG1V1JgDhBrQiLTQ9nv511zbMagRQt1jtJDd0cTc4se20lfjZULVk32BQvQevUjbUMhUDrtDOgVYPZmnK0Hozbcz4PP0hPYhXQ8INkRjuJc0k21FuViGoXO6p81DFVy3CYliivDiCwGoFWWGphjgANw3JUOLY9eImF6Il0PcO',
})

const LOGOS_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'integrations')

const integrations = [
  { name: 'VIOOH', category: 'SSP', file: 'viooh.svg', order: 1 },
  { name: 'DV360', category: 'SSP', file: 'dv360.svg', order: 2 },
  { name: 'Magnite', category: 'SSP', file: 'magnite.svg', order: 3 },
  { name: 'Google Ad Manager 360', category: 'SSP', file: 'google-ad-manager-360.svg', order: 4 },
  { name: 'The Trade Desk', category: 'DSP', file: 'the-trade-desk.svg', order: 5 },
  { name: 'Cassie', category: 'DSP', file: 'cassie.svg', order: 6 },
  { name: 'MAX', category: 'DSP', file: 'max.svg', order: 7 },
  { name: 'StackAdapt', category: 'DSP', file: 'stackadapt.svg', order: 8 },
  { name: 'Amobee', category: 'DSP', file: 'amobee.svg', order: 9 },
  { name: 'AppNexus', category: 'DSP', file: 'appnexus.svg', order: 10 },
  { name: 'MediaMath', category: 'DSP', file: 'mediamath.svg', order: 11 },
  { name: 'Verizon Media', category: 'DSP', file: 'verizon.svg', order: 12 },
  { name: 'Mediasmart', category: 'DSP', file: 'mediasmart.svg', order: 13 },
  { name: 'Hivestack', category: 'SSP', file: 'hivestack.svg', order: 14 },
]

async function uploadLogo(filePath, filename) {
  const fileBuffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', fileBuffer, {
    filename,
    contentType: 'image/svg+xml',
  })
  return asset
}

async function seed() {
  console.log('🚀 Starting Partner Integration Logos seed...\n')

  // Check for existing documents to avoid duplicates
  const existing = await client.fetch('*[_type == "partnerIntegrationLogo"]{name}')
  const existingNames = new Set(existing.map((d) => d.name))

  let created = 0
  let skipped = 0

  for (const integration of integrations) {
    if (existingNames.has(integration.name)) {
      console.log(`⏭️  Skipped (already exists): ${integration.name}`)
      skipped++
      continue
    }

    const filePath = path.join(LOGOS_DIR, integration.file)
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${integration.file} — skipping ${integration.name}`)
      skipped++
      continue
    }

    try {
      console.log(`📤 Uploading logo: ${integration.file}...`)
      const asset = await uploadLogo(filePath, integration.file)

      const doc = {
        _type: 'partnerIntegrationLogo',
        name: integration.name,
        category: integration.category,
        order: integration.order,
        isActive: true,
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      }

      await client.create(doc)
      console.log(`✅ Created: ${integration.name} (${integration.category})`)
      created++
    } catch (err) {
      console.error(`❌ Error creating ${integration.name}:`, err.message)
    }
  }

  console.log(`\n🎉 Done! Created: ${created}, Skipped: ${skipped}`)
}

seed().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
