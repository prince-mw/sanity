// English site names (Rif, 14 Nov 2026: "English only"). Many Inventory API
// names are Malay directions ("KM132.74 Di jejantas pejalan kaki dari Permatang
// Pauh menuju ke Sg. Dua"). Claude turns each into a short English site name,
// keeping road and place names, KM markers and the direction of travel.
//
//   node scripts/inventory-names.mjs malaysia      (also run by inventory-pull.mjs)
//
// Cached in .inventory/names-en-<country>.json as { original: english }; only
// names not in the cache are sent, so the daily pull costs nothing once done.
// Names that are already English come back unchanged. Staff can still correct
// any name on /staff/inventory; their correction wins.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
const OUT = process.env.INVENTORY_SNAPSHOT_DIR || path.join(ROOT, '.inventory')
const MODEL = 'claude-haiku-5-5'
const BATCH = 40
// Malay words that show up in site names; a name with none of them is left alone.
export const MALAY = /\b(di|dari|ke|menuju|menghala|berhampiran|berdepan|bertempat|hadapan|depan|sebelah|arah|persimpangan|simpang|jejantas|pejalan|kaki|selepas|sebelum|bertentangan|susur|keluar|masuk|pandangan|bangunan|sek|keb|stesen|pusat|lebuhraya|kawasan|tepi|bulatan|lampu|isyarat|jambatan|trafik|tol)\b/i

function key() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY
  const f = path.join(ROOT, '.env.local')
  if (!fs.existsSync(f)) return null
  const m = fs.readFileSync(f, 'utf8').match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+)\s*$/m)
  return m ? m[1].replace(/^['"]|['"]$/g, '') : null
}

const PROMPT = `You name outdoor advertising sites for an English website in Malaysia.
Each input is a site name from the inventory, often a Malay direction.
Return a short, natural English site name for each, at most 60 characters:
- Translate Malay words (di = at, dari = from, ke / menuju / menghala = towards, berhampiran = near, persimpangan / simpang = junction, jejantas pejalan kaki = pedestrian bridge, lebuhraya = highway, susur keluar = exit ramp, bulatan = roundabout, selepas = after, sebelum = before, bertentangan = opposite, trafik = traffic).
- Keep proper names as they are: roads (Jalan Ampang, Lebuh Ayer Keroh), places, buildings, highway codes (NSE, AMJ, MRR2, LDP), KM markers and direction codes (NB, SB).
- Keep the most useful facts: where it is and which way traffic faces. Drop filler.
- If a name is already English, return it unchanged.
Reply with JSON only: an array of strings, same order and same length as the input.`

async function translate(batch, apiKey) {
  for (let i = 1; i <= 4; i++) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: PROMPT, messages: [{ role: 'user', content: JSON.stringify(batch) }] }),
        signal: AbortSignal.timeout(120_000),
      })
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 120)}`)
      const text = (await r.json()).content?.find(c => c.type === 'text')?.text ?? ''
      const out = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1))
      if (!Array.isArray(out) || out.length !== batch.length) throw new Error('length mismatch')
      return out.map((s, j) => (typeof s === 'string' && s.trim() ? s.trim().slice(0, 80) : batch[j]))
    } catch (e) {
      if (i === 4) { console.error(`  names batch failed: ${e.message}`); return null }
      await new Promise(res => setTimeout(res, 1500 * i))
    }
  }
}

/** Translate the Malay names among `rows` that the cache doesn't have yet. Returns the number translated. */
export async function translateNames(slug, rows) {
  const apiKey = key()
  const file = path.join(OUT, `names-en-${slug}.json`)
  const cache = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}
  const todo = [...new Set(rows.map(r => (r.name ?? '').trim()).filter(n => n && MALAY.test(n) && !(n in cache)))]
  if (!todo.length) return 0
  if (!apiKey) { console.log(`  ${todo.length} Malay names not translated (no ANTHROPIC_API_KEY)`); return 0 }
  console.log(`  translating ${todo.length} names…`)
  let done = 0
  const queue = []
  for (let i = 0; i < todo.length; i += BATCH) queue.push(todo.slice(i, i + BATCH))
  await Promise.all(Array.from({ length: 4 }, async () => {
    for (let b = queue.shift(); b; b = queue.shift()) {
      const out = await translate(b, apiKey)
      if (!out) continue
      b.forEach((n, j) => { cache[n] = out[j] })
      done += b.length
      fs.writeFileSync(file, JSON.stringify(cache, null, 1))
    }
  }))
  fs.writeFileSync(file, JSON.stringify(cache, null, 1))
  return done
}

// Standalone: node scripts/inventory-names.mjs <country>
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const slug = (process.argv[2] ?? '').toLowerCase()
  const file = path.join(OUT, `${slug}.json`)
  if (!slug || !fs.existsSync(file)) { console.error('Usage: node scripts/inventory-names.mjs <country>  (pull the country first)'); process.exit(1) }
  const rows = JSON.parse(fs.readFileSync(file, 'utf8')).records
  const n = await translateNames(slug, rows)
  console.log(`${slug}: ${n} names translated`)
}
