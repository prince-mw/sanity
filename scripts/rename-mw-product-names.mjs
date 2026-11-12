// Site-wide copy fix (12 Nov 2026, Dg): write product names as "MW Planner", "MW Measure" etc., not
// "Moving Walls Planner" / "Moving Walls’ Measure". Rewrites text in every document (published and drafts)
// that contains a long form; slugs and URLs are unaffected (they have no spaces).
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN, perspective: 'raw' })

const RE = /Moving Walls[’']?\s+(Planner|Measure|Science|Activate|Market|Studio|Influence|Inventory)\b/g
const docs = await c.fetch(`*[!(_type match "sanity.*") && !(_id in path("secrets.**"))]._id`)
const changed = []
for (let i = 0; i < docs.length; i += 100) {
  const batch = await c.fetch('*[_id in $ids]', { ids: docs.slice(i, i + 100) })
  for (const d of batch) {
    const s = JSON.stringify(d)
    const n = (s.match(RE) || []).length
    if (!n) continue
    const { _rev, _createdAt, _updatedAt, ...rest } = JSON.parse(s.replace(RE, 'MW $1'))
    changed.push([rest, n, `${d._type} | ${d.slug?.current || ''} | ${d._id}`])
  }
}
for (let i = 0; i < changed.length; i += 10) {
  const tx = c.transaction()
  changed.slice(i, i + 10).forEach(([doc]) => tx.createOrReplace(doc))
  await tx.commit()
}
changed.forEach(([, n, label]) => console.log(`${n}x  ${label}`))
console.log('documents updated:', changed.length, '| replacements:', changed.reduce((a, [, n]) => a + n, 0))
