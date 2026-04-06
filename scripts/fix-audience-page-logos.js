/**
 * Fix audiencePage customerLogos by uploading PNG logos and linking them.
 * 
 * The audiencePage documents have customerLogos entries with names but no logo images.
 * This script:
 * 1. Uploads the local PNG logos from public/assets/images/our-customers-logos/
 * 2. Patches all 3 audiencePage documents (brands, agencies, media-owners) with proper logo references
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'skzWqNrd9gVclCzZ5lCqkB7001eELcKxoGqcrdEcnptysBG2llbIRIYsaSZFpkdXHhjIltR4tsxEJlGrlvviDRkVQuT7JozlQ8Cm3SLbbWgqzZtiiNqMftcrRXzKABCWrJdymtgakhSwDBqk23lCxEu3cATa2AayhCsHZyDbRFPseSIBq9UM',
})

// Logos for brands and agencies audience pages
const brandLogos = [
  { name: 'Coca-Cola', file: 'coca-cola.png' },
  { name: "McDonald's", file: 'mcdonalds.png' },
  { name: 'Samsung', file: 'samsung.png' },
  { name: 'Netflix', file: 'netflix.png' },
  { name: 'Dell', file: 'dell.png' },
  { name: 'Bosch', file: 'bosch.png' },
  { name: "L'Oreal Paris", file: 'l_oreal paris.png' },
  { name: 'Sunsilk', file: 'sunsilk.png' },
  { name: 'AirAsia', file: 'airasia.png' },
  { name: 'Grab', file: 'grab.png' },
  { name: 'Foodpanda', file: 'foodpanda.png' },
  { name: 'Lalamove', file: 'lalamove.png' },
  { name: 'HBO Go', file: 'hbo-go.png' },
  { name: 'Astro', file: 'astro.png' },
  { name: 'Gamuda', file: 'gamuda.png' },
  { name: 'Laguna', file: 'laguna.png' },
  { name: 'SeaOil', file: 'seaoil.png' },
  { name: 'Fair Price', file: 'fair-price.png' },
]

// Logos for media owners audience page
const mediaOwnerLogos = [
  { name: '3thirds Inc', file: '3thirds-inc.png' },
  { name: 'Act Media', file: 'act-media.png' },
  { name: 'Aqua Corporation', file: 'aqua-corporation.png' },
  { name: 'Brands on Road', file: 'brands-on-road.png' },
  { name: 'Bright Sky', file: 'bright-sky.png' },
  { name: 'Eye', file: 'eye.png' },
  { name: 'FC Media', file: 'fc-media.png' },
  { name: 'Focus Media Network', file: 'focus-media-network.png' },
  { name: 'Lantern Media', file: 'lantern-media.png' },
  { name: 'Medik TV', file: 'medik-tv.png' },
  { name: 'Ming Media Promotion', file: 'ming-media-promotion.png' },
  { name: 'Moove Media', file: 'moove-media.png' },
  { name: 'Phar', file: 'phar.png' },
  { name: 'Primedia Outdoor', file: 'primedia-outdoor.png' },
  { name: 'Spectrum Outdoor', file: 'spectrum-outdoor.png' },
  { name: 'Times OOH', file: 'times-ooh.png' },
  { name: 'Vlink Interactive', file: 'vlink-interactive.png' },
  { name: 'Warna Warni', file: 'warna-warni.png' },
]

const LOGO_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'our-customers-logos')
const MEDIA_OWNER_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'media-owners')

async function uploadLogo(filePath, filename) {
  const fullPath = path.join(filePath, filename)
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${fullPath}`)
    return null
  }
  
  const fileBuffer = fs.readFileSync(fullPath)
  try {
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: filename,
      contentType: 'image/png',
    })
    console.log(`  ✅ Uploaded: ${filename} -> ${asset._id}`)
    return asset._id
  } catch (err) {
    console.error(`  ❌ Failed to upload ${filename}:`, err.message)
    return null
  }
}

async function buildLogoArray(logos, baseDir) {
  const result = []
  for (const logo of logos) {
    console.log(`  Uploading ${logo.file}...`)
    const assetId = await uploadLogo(baseDir, logo.file)
    if (assetId) {
      result.push({
        _key: logo.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        _type: 'object',
        name: logo.name,
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        },
      })
    }
  }
  return result
}

async function patchAudiencePage(docId, logoArray, label) {
  console.log(`\n📝 Patching ${label} (${docId}) with ${logoArray.length} logos...`)
  try {
    await client.patch(docId).set({ customerLogos: logoArray }).commit()
    console.log(`  ✅ ${label} updated successfully!`)
  } catch (err) {
    console.error(`  ❌ Failed to patch ${label}:`, err.message)
  }
}

async function main() {
  console.log('🚀 Starting audience page logo fix...\n')

  // 1. Upload and build brand/agency logos
  console.log('📸 Uploading brand logos...')
  const brandLogoArray = await buildLogoArray(brandLogos, LOGO_DIR)
  console.log(`  → ${brandLogoArray.length}/${brandLogos.length} brand logos ready\n`)

  // 2. Upload and build media owner logos  
  console.log('📸 Uploading media owner logos...')
  let mediaOwnerDir = MEDIA_OWNER_DIR
  if (!fs.existsSync(mediaOwnerDir)) {
    // Fallback: media owner logos might also be in the main logos dir
    mediaOwnerDir = LOGO_DIR
  }
  const mediaOwnerLogoArray = await buildLogoArray(mediaOwnerLogos, mediaOwnerDir)
  console.log(`  → ${mediaOwnerLogoArray.length}/${mediaOwnerLogos.length} media owner logos ready\n`)

  // 3. Patch audience pages
  await patchAudiencePage('audiencePage-brands', brandLogoArray, 'Brands Page')
  await patchAudiencePage('audiencePage-agencies', brandLogoArray, 'Agencies Page')
  await patchAudiencePage('audiencePage-media-owners', mediaOwnerLogoArray, 'Media Owners Page')

  console.log('\n✨ Done! All audience pages have been updated with logos.')
}

main().catch(console.error)
