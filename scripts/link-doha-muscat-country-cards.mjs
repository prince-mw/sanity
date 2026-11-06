// Qatar and Oman country pages (5 Nov 2026): hide the automatic "Explore by City" grid (Doha / Muscat appeared
// twice) and turn the Doha / Muscat cards in each page's own city section into links to the new city pages.
// Creates DRAFTS of both country pages; publish after checking.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const CSS = `<style>
  .custom-embed .mw-citylink-title{ color:inherit !important; text-decoration:none !important; }
  .custom-embed .mw-citylink-title:hover{ color:#2F5FE0 !important; }
  .custom-embed .mw-citylink{ display:inline-flex; align-items:center; gap:6px; margin-top:14px; font-size:14px; font-weight:700;
    color:#2F5FE0 !important; text-decoration:none !important; }
  .custom-embed .mw-citylink:hover{ gap:9px; }
  .custom-embed .mw-citylink svg{ width:15px; height:15px; }
</style>
`
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'

const PAGES = [
  { id: 'a2e4b742-ef32-4d65-8849-2ed943e4d607', city: 'Doha', href: '/locations/qatar/doha' },
  { id: 'location-oman', city: 'Muscat', href: '/locations/oman/muscat' },
]
const tx = c.transaction()
for (const p of PAGES) {
  if (await c.getDocument('drafts.' + p.id)) throw new Error('Draft already exists for ' + p.city)
  const doc = await c.getDocument(p.id)
  const sections = doc.sections.map((s) => {
    if (s._type !== 'customEmbed' || !s.code.includes(`<h3>${p.city}</h3>`)) return s
    if (s.code.includes('mw-citylink')) throw new Error('Already linked: ' + p.city)
    const parts = s.code.split(`<h3>${p.city}</h3>`)
    if (parts.length !== 2) throw new Error(`Expected one ${p.city} card`)
    // the card's description paragraph ends at the first </p> after the heading
    const end = parts[1].indexOf('</p>') + 4
    const after = parts[1].slice(0, end) + `\n<a class="mw-citylink" href="${p.href}">Explore ${p.city} ${arrow}</a>` + parts[1].slice(end)
    return { ...s, code: CSS + parts[0] + `<h3><a class="mw-citylink-title" href="${p.href}">${p.city}</a></h3>` + after }
  })
  if (JSON.stringify(sections) === JSON.stringify(doc.sections)) throw new Error('No card found for ' + p.city)
  const { _rev, _createdAt, _updatedAt, ...rest } = doc
  tx.create({ ...rest, _id: 'drafts.' + p.id, hideCityCards: true, sections })
}
await tx.commit()
console.log('Drafts created for Qatar and Oman')
