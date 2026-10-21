// Sets photos on a Philippines sub-page draft from existing Sanity CDN image URLs.
// Usage: node scripts/set-philippines-subpage-images.mjs <slug> hero=<url> why=<url> [sites=<url>] "<Card name>=<url>" ...
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const [slug, ...pairs] = process.argv.slice(2)
// https://cdn.sanity.io/images/<project>/<dataset>/<hash>-<w>x<h>.<ext>  ->  image-<hash>-<w>x<h>-<ext>
const toRef = (url) => {
  const m = url.match(/\/([a-f0-9]{40})-(\d+x\d+)\.(\w+)/)
  if (!m) throw new Error('Not a Sanity image URL: ' + url)
  return `image-${m[1]}-${m[2]}-${m[3]}`
}
const map = Object.fromEntries(pairs.map((p) => { const i = p.lastIndexOf('=http'); return [p.slice(0, i), toRef(p.slice(i + 1))] }))
const found = await c.fetch('*[_id in $ids]{_id, originalFilename}', { ids: Object.values(map) })
for (const [k, ref] of Object.entries(map)) console.log(k.padEnd(34), found.find((f) => f._id === ref)?.originalFilename || 'MISSING ' + ref)
if (found.length !== new Set(Object.values(map)).size) { console.error('Some images are missing in Sanity, nothing changed'); process.exit(1) }

const img = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })
const ID = `drafts.city-philippines-${slug}`
const d = await c.getDocument(ID)
if (!d) throw new Error('No draft ' + ID)
const set = {}
if (map.hero) set.heroImage = img(map.hero)
set.highVisibilityBillboards = d.highVisibilityBillboards.map((b) => (map[b.name] ? { ...b, image: img(map[b.name]) } : b))
const unmatched = d.highVisibilityBillboards.filter((b) => !map[b.name] && !b.image?.asset?._ref).map((b) => b.name)
set.sections = d.sections.map((s) => {
  if (s._type !== 'twoColumn') return s
  const which = /^Why Advertise/.test(s.heading || '') ? 'why' : 'sites'
  return map[which] ? { ...s, image: img(map[which]) } : s
})
await c.patch(ID).set(set).commit({ visibility: 'sync' })
console.log('Updated', ID, unmatched.length ? `| cards WITHOUT a photo: ${unmatched.join(', ')}` : '| all cards have photos')
