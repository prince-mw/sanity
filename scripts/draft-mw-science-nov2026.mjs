// Stage the November 2026 MW Science copy update as Sanity DRAFTS (not published).
//
// Source: "MW Science Website: Narrative & Copy Update (Nov 2026)" from Product Marketing,
// updated to Christin's final Stitch design (23 Nov 2026).
// Writes drafts of the `product` (slug mw-science) and `pageSeo` (mw-science) documents with
// the new hero, CTA, closing-section and SEO copy. The live site keeps showing the published
// versions until someone presses Publish on both documents in Studio.
//
// Preview locally: /api/preview?secret=<SANITY_PREVIEW_SECRET>&type=product&slug=mw-science
//
// Usage: node scripts/draft-mw-science-nov2026.mjs            (dry run, prints the changes)
//        node scripts/draft-mw-science-nov2026.mjs --write    (creates/updates the drafts)

import { createClient } from '@sanity/client'
import fs from 'fs'

const env = Object.fromEntries(
  fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    })
)

const client = createClient({
  projectId: 'u10im6di',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'raw',
})

const PRODUCT_COPY = {
  heroTitle: 'The intelligence behind connected media.',
  heroSubtitle:
    'MW Science is the intelligence layer behind every Moving Walls product. It measures what each channel in your media mix adds, online and in real life (IRL), so you can plan connected media with proof.',
  description: 'Most measurement counts who saw the ad. MW Science measures what changed.',
  ctaText: 'Talk to an MW Science expert',
  finalCtaTitle: 'No Boundaries.',
  finalCtaSubtitle:
    'Moving Walls is the OOH intelligence company. Powered by MW Science, our products help you plan, buy, run and prove out-of-home, and see what it adds to your whole media mix. The world moves. We connect it.',
}

const SEO_COPY = {
  metaTitle: 'MW Science: The Intelligence Behind Connected Media',
  metaDescription:
    'MW Science is the intelligence layer behind every Moving Walls product. Measure what each channel in your media mix adds, online and in real life.',
}

const write = process.argv.includes('--write')

async function stageDraft(publishedId, applyCopy) {
  const [published, existingDraft] = await Promise.all([
    client.getDocument(publishedId),
    client.getDocument(`drafts.${publishedId}`),
  ])
  if (!published) throw new Error(`Published document ${publishedId} not found`)
  // Build on an existing draft if someone already started one, so their edits aren't lost.
  console.log(`\n${publishedId}${existingDraft ? ' (existing draft found — updating it)' : ''}`)
  const next = applyCopy(structuredClone(existingDraft || published))
  next._id = `drafts.${publishedId}`
  delete next._rev
  delete next._updatedAt
  delete next._createdAt
  return next
}

const productId = await client.fetch(`*[_type == "product" && slug.current == "mw-science" && !(_id in path("drafts.**"))][0]._id`)
const docs = [
  await stageDraft(productId, (doc) => {
    for (const [k, v] of Object.entries(PRODUCT_COPY)) {
      console.log(`  ${k}:\n    - ${JSON.stringify(doc[k])}\n    + ${JSON.stringify(v)}`)
      doc[k] = v
    }
    return doc
  }),
  await stageDraft('pageSeo-mw-science', (doc) => {
    doc.seo = doc.seo || {}
    for (const [k, v] of Object.entries(SEO_COPY)) {
      console.log(`  seo.${k}:\n    - ${JSON.stringify(doc.seo[k])}\n    + ${JSON.stringify(v)}`)
      doc.seo[k] = v
    }
    return doc
  }),
]

if (!write) {
  console.log('\nDry run — nothing written. Re-run with --write to create the drafts.')
} else {
  const tx = client.transaction()
  docs.forEach((d) => tx.createOrReplace(d))
  await tx.commit()
  console.log(`\nDrafts written: ${docs.map((d) => d._id).join(', ')} (not published)`)
}
