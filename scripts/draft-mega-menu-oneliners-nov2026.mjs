// Stage the November 2026 Products-menu one-liners as a Sanity DRAFT of megaMenu (not published).
//
// Updates the MW Science, MW Influence and MW Studio descriptions in all 7 languages so they match
// the new MW Science narrative. Nothing changes on the live site until someone presses Publish on
// the Mega Menu in Studio. NOTE: megaMenu already had an older unpublished draft (from 2026-10-15);
// if it still exists, this script updates that draft, so review it in Studio before publishing.
//
// Usage: node scripts/draft-mega-menu-oneliners-nov2026.mjs            (dry run, prints the changes)
//        node scripts/draft-mega-menu-oneliners-nov2026.mjs --write    (creates/updates the draft)

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

// Keyed by the menu link's _key (Products menu).
const DESCRIPTIONS = {
  // MW Science
  '70ahw6ls': {
    en: 'The intelligence layer behind every Moving Walls product.',
    es: 'La capa de inteligencia detrás de cada producto de Moving Walls.',
    id: 'Lapisan intelijen di balik setiap produk Moving Walls.',
    ja: 'すべてのMoving Walls製品を支えるインテリジェンスレイヤー。',
    ko: '모든 Moving Walls 제품을 뒷받침하는 인텔리전스 레이어.',
    pt: 'A camada de inteligência por trás de cada produto Moving Walls.',
    zh: '驱动每一款Moving Walls产品的智能层。',
  },
  // MW Influence
  lrss8in5: {
    en: 'Fill every slot with its highest-value demand.',
    es: 'Asigne cada espacio a la demanda de mayor valor.',
    id: 'Isi setiap slot dengan permintaan bernilai tertinggi.',
    ja: 'すべての枠を最も価値の高い需要で埋める。',
    ko: '모든 슬롯을 가장 가치 높은 수요로 채우세요.',
    pt: 'Preencha cada espaço com a demanda de maior valor.',
    zh: '让每个广告时段匹配最高价值的需求。',
  },
  // MW Studio
  qdb3prmy: {
    en: 'Organise inventory, deliver content and sell through your own storefront.',
    es: 'Organice su inventario, entregue contenido y venda desde su propia tienda.',
    id: 'Kelola inventaris, kirim konten, dan jual melalui etalase Anda sendiri.',
    ja: '在庫を整理し、コンテンツを配信し、自社ストアフロントで販売。',
    ko: '인벤토리를 정리하고 콘텐츠를 송출하며 자체 스토어프론트로 판매하세요.',
    pt: 'Organize o inventário, entregue conteúdo e venda pela sua própria vitrine.',
    zh: '整理库存、投放内容，并通过自有店面销售。',
  },
}

const write = process.argv.includes('--write')

const [published, existingDraft] = await Promise.all([
  client.getDocument('megaMenu'),
  client.getDocument('drafts.megaMenu'),
])
if (!published) throw new Error('megaMenu not found')
console.log(existingDraft ? 'Existing megaMenu draft found — updating it.' : 'No draft — creating one from the published menu.')

const doc = structuredClone(existingDraft || published)
const found = new Set()
for (const item of doc.mainNavItems || []) {
  for (const col of item.columns || []) {
    for (const link of col.links || []) {
      const next = DESCRIPTIONS[link._key]
      if (!next) continue
      found.add(link._key)
      console.log(`\n${link._key}:\n  - ${JSON.stringify(link.description?.en)}\n  + ${JSON.stringify(next.en)}`)
      link.description = { _type: 'localeString', ...(link.description || {}), ...next }
    }
  }
}
const missing = Object.keys(DESCRIPTIONS).filter((k) => !found.has(k))
if (missing.length) throw new Error(`Menu links not found: ${missing.join(', ')}`)

doc._id = 'drafts.megaMenu'
delete doc._rev
delete doc._updatedAt
delete doc._createdAt

if (!write) {
  console.log('\nDry run — nothing written. Re-run with --write to create the draft.')
} else {
  await client.createOrReplace(doc)
  console.log('\nDraft written: drafts.megaMenu (not published)')
}
