// Americas pages (EN / ES / PT, 11 Nov 2026): in "Connecting The Americas", link the United States mention to the
// new /locations/united-states page. Creates DRAFTS; publish together with the United States pages.
import fs from 'fs'
import { createClient } from '@sanity/client'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const c = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })

const LINK = (text) => `<a href="/locations/united-states" style="color:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px">${text}</a>`
const PAGES = [
  ['americas', 'partners across Canada, the United States,', `partners across Canada, ${LINK('the United States')},`],
  ['americas-es', 'socios en Canadá, Estados Unidos,', `socios en Canadá, ${LINK('Estados Unidos')},`],
  ['americas-pt', 'parceiros no Canadá, nos Estados Unidos,', `parceiros no Canadá, nos ${LINK('Estados Unidos')},`],
]
const tx = c.transaction()
for (const [slug, from, to] of PAGES) {
  const { _id } = await c.fetch('*[_type=="location" && slug.current==$s][0]{_id}', { s: slug })
  if (await c.getDocument('drafts.' + _id)) throw new Error('A draft already exists for ' + slug)
  const doc = await c.getDocument(_id)
  let hits = 0
  const sections = doc.sections.map((s) => {
    if (s._type !== 'customEmbed' || !s.code.includes(from)) return s
    hits++
    return { ...s, code: s.code.replace(from, to) }
  })
  if (hits !== 1) throw new Error(`Expected the United States sentence once on ${slug}, found ${hits}`)
  const { _rev, _createdAt, _updatedAt, ...rest } = doc
  tx.create({ ...rest, _id: 'drafts.' + _id, sections })
}
await tx.commit()
console.log('Drafts created: americas, americas-es, americas-pt (United States linked)')
