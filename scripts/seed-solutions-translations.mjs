// Writes the Solutions-page translations into Sanity: one `pageTranslation` doc per page + language
// (id pageTranslation-<page>-<lang>), each entry = English text shown on that page + its translation.
// Data: scripts/data/solutions-translations/sources.json ([{ en, pages }]) and translations/<lang>.json
// ({ english: translation }). Editors can fix a translation in Studio (Products & Pages → Page Translations).
// Re-running replaces the docs, so Studio edits would be overwritten — update the JSON first if needed.
//
//   node scripts/seed-solutions-translations.mjs --dry     check only
//   node scripts/seed-solutions-translations.mjs --write   create/replace the 24 docs
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]))
const client = createClient({ projectId: 'u10im6di', dataset: 'production', apiVersion: '2025-01-01', useCdn: false, token: env.SANITY_API_TOKEN })
const DATA = path.join('scripts', 'data', 'solutions-translations')
const PAGES = ['agencies', 'brands', 'media-owners', 'retail']
const LANGS = ['ja', 'ko', 'zh', 'id', 'es', 'pt']
const mode = process.argv[2] || '--dry'

const sources = JSON.parse(fs.readFileSync(path.join(DATA, 'sources.json'), 'utf8'))
const docs = []
let missing = 0
for (const lang of LANGS) {
  const tr = JSON.parse(fs.readFileSync(path.join(DATA, 'translations', `${lang}.json`), 'utf8'))
  for (const page of PAGES) {
    const entries = sources
      .filter((s) => s.pages.includes(page))
      .map((s, i) => {
        if (!tr[s.en]) missing++
        return { _key: `e${i}`, _type: 'object', source: s.en, translation: tr[s.en] || '' }
      })
    docs.push({ _id: `pageTranslation-${page}-${lang}`, _type: 'pageTranslation', page, language: lang, entries })
  }
}
console.log(`${docs.length} docs, ${docs.reduce((a, d) => a + d.entries.length, 0)} entries, ${missing} missing translations`)
if (mode === '--write') {
  if (missing) process.exit(1)
  const tx = client.transaction()
  for (const d of docs) tx.createOrReplace(d)
  await tx.commit()
  console.log('written')
}
