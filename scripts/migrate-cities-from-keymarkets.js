/**
 * Migrate cities from location.keyMarkets into standalone locationCity documents
 *
 * Each `location` (country) document may have a `keyMarkets` array holding
 * detailed per-city stats (screens, dailyReach, hourlyData, etc). This script
 * creates one `locationCity` document per keyMarkets entry, referencing its
 * parent country, so each city gets its own page at /locations/{country}/{city}.
 *
 * Idempotent: skips any country+city pair that already has a locationCity doc.
 *
 * Run with: SANITY_API_TOKEN=... node scripts/migrate-cities-from-keymarkets.js
 * Add --dry-run to preview without writing anything.
 */

const { createClient } = require('@sanity/client')
const crypto = require('crypto')

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function generateKey() {
  return crypto.randomBytes(6).toString('hex')
}

function addKeysToArrayItems(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return { _key: generateKey(), ...addKeysToArrayItems(item) }
      }
      return item
    })
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {}
    for (const key of Object.keys(obj)) {
      result[key] = addKeysToArrayItems(obj[key])
    }
    return result
  }
  return obj
}

const COMBINING_DIACRITICS = new RegExp('[̀-ͯ]', 'g')

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_DIACRITICS, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  const countries = await client.fetch(
    `*[_type == "location" && defined(keyMarkets) && count(keyMarkets) > 0]{
      _id,
      country,
      "slug": slug.current,
      keyMarkets
    }`
  )

  console.log(`Found ${countries.length} countries with keyMarkets data.`)

  let created = 0
  let skipped = 0

  for (const country of countries) {
    for (const market of country.keyMarkets || []) {
      if (!market.city) continue

      const citySlug = slugify(market.city)

      const existing = await client.fetch(
        `count(*[_type == "locationCity" && country._ref == $countryId && slug.current == $citySlug])`,
        { countryId: country._id, citySlug }
      )

      if (existing > 0) {
        console.log(`  Skip (exists): ${country.country} / ${market.city}`)
        skipped++
        continue
      }

      const doc = addKeysToArrayItems({
        _type: 'locationCity',
        country: { _type: 'reference', _ref: country._id },
        city: market.city,
        slug: { _type: 'slug', current: citySlug },
        code: market.code || '',
        population: market.population || '',
        screens: market.screens,
        screensGrowth: market.screensGrowth,
        dailyReach: market.dailyReach || '',
        dailyReachGrowth: market.dailyReachGrowth,
        monthlyImpressions: market.monthlyImpressions || '',
        monthlyImpressionsGrowth: market.monthlyImpressionsGrowth,
        yoyGrowth: market.yoyGrowth,
        avgDwell: market.avgDwell || '',
        peakHours: market.peakHours || '',
        topCategory: market.topCategory || '',
        viewability: market.viewability,
        description: market.description || '',
        fullDescription: market.description || '',
        hourlyData: market.hourlyData || [],
        locations: market.locations || [],
        audience: market.audience || [],
        mediaFormats: market.mediaFormats || [],
        isActive: true,
      })

      console.log(`  Create: ${country.country} / ${market.city} -> /locations/${country.slug}/${citySlug}`)

      if (!DRY_RUN) {
        await client.create(doc)
      }
      created++
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped (already existed): ${skipped}${DRY_RUN ? ' [DRY RUN - nothing written]' : ''}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
