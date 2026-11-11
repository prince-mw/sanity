// Stand-in inventory for the Kuala Lumpur pilot, in the Inventory API's own
// record shape, used until INVENTORY_API_KEY is set.
//
// Three records are REAL: the featured sites on the hand-built Kuala Lumpur
// page (names, photos, reach and impressions as published there). Their area,
// address, coordinates and specs are placeholders until the API supplies them.
// Every other record is invented and marked `sample: true`, and the pages show
// a SAMPLE label on it — no visitor or colleague should mistake it for stock.

import type { InventoryRecord, LevelMap, SiteSpecs } from '@/lib/inventory/types'

const img = (ref: string) => `https://cdn.sanity.io/images/u10im6di/production/${ref}`

/** Assumed until the API data survey: Malaysia → state (1) → city (2) → area (3). */
export const SAMPLE_LEVELS: Record<string, LevelMap> = { malaysia: { city: 2, area: 3 } }

/** Famous areas per city: get a page even with few sites (supply-wanted). Rif approves the real list. */
export const FAMOUS_AREAS: Record<string, string[]> = {
  'malaysia/kuala-lumpur': ['Bukit Bintang', 'KLCC', 'TRX', 'Bangsar', 'Mid Valley', 'KL Sentral'],
}

const kl = (area: string) => ({ adminLevel0Name: 'Malaysia', adminLevel1Name: 'Wilayah Persekutuan Kuala Lumpur', adminLevel2Name: 'Kuala Lumpur', adminLevel3Name: area })
const base = { status: 'active', publication: 'public', mediaOwnerName: 'Hidden on the website' }

const RAW: InventoryRecord[] = [
  // ── real, from the hand-built Kuala Lumpur page
  {
    ...base, ...kl('KLCC'), id: 'real-menara-tan-tan', referenceId: 'MY-KL-TT01',
    name: 'Menara Tan & Tan', typeName: 'Digital Billboard', displayFormatName: 'Roadside LED',
    address: 'Jalan Tun Razak, Kuala Lumpur', geoms: ['POINT(101.7186 3.1588)'],
    medias: [{ mediaType: 'image', url: img('154bbff7d23c8bfff79379bcc66544b647d95077-800x449.webp') }],
    audience: { reach: '182,669', impressions: '993,720' },
    prices: [{ currency: 'MYR', daily: 1800, monthly: 42000 }],
  },
  {
    ...base, ...kl('Dutamas'), id: 'real-duta-park', referenceId: 'MY-KL-DP01',
    name: 'Duta Park', typeName: 'Digital Billboard', displayFormatName: 'Highway Unipole',
    address: 'From Dutamas / Selayang, Kuala Lumpur', geoms: ['POINT(101.6729 3.1752)'],
    medias: [{ mediaType: 'image', url: img('a963efb089a720d86e06c198b61e066ca47f430d-800x450.webp') }],
    audience: { reach: '230,556', impressions: '1,357,980' },
    prices: [{ currency: 'MYR', daily: 1500, monthly: 36000 }],
  },
  {
    ...base, ...kl('Pantai Dalam'), id: 'real-npe-pantai-baru', referenceId: 'MY-KL-NPE01',
    name: 'Lebuhraya Pantai Baru NPE', typeName: 'Digital Billboard', displayFormatName: 'Highway Unipole',
    address: 'New Pantai Expressway (NPE), Kuala Lumpur', geoms: ['POINT(101.6681 3.1129)'],
    medias: [{ mediaType: 'image', url: img('1c34e4270b8de61a1b8649e269d55a070245d313-800x484.webp') }],
    audience: { reach: '587,921', impressions: '1,236,240' },
    prices: [{ currency: 'MYR', daily: 2100, monthly: 50000 }],
  },

  // ── SAMPLE: Bukit Bintang (5, so the area gets a buyer page; one has no photo)
  {
    ...base, ...kl('Bukit Bintang'), sample: true, id: 'sample-bb-01', referenceId: 'SAMPLE-BB01',
    name: 'Jalan Bukit Bintang Digital Billboard', typeName: 'Digital Billboard', displayFormatName: 'Roadside LED',
    description: 'Facing the evening crowds on Jalan Bukit Bintang, between the shopping malls and the nightlife streets.',
    size: '12m × 6m', classicFields: { illuminated: true },
    digitalFields: { spotDuration: 15, spotsPerLoop: 8, loopDuration: 120 }, venueTaxonomyName: 'Roadside',
    address: 'Jalan Bukit Bintang, 55100 Kuala Lumpur', geoms: ['POINT(101.7110 3.1466)'],
    medias: [{ mediaType: 'image', url: img('ea8587579959167f504a083c7e591b573e9edc15-646x484.webp') }],
    prices: [{ currency: 'MYR', daily: 2400, monthly: 58000 }],
  },
  {
    ...base, ...kl('Bukit Bintang'), sample: true, id: 'sample-bb-02', referenceId: 'SAMPLE-BB02',
    name: 'Pavilion Entrance LED Screen', typeName: 'Digital Screen', displayFormatName: 'Mall Entrance LED',
    description: 'Above the main entrance plaza, where shoppers queue and meet.',
    size: '8m × 4m', classicFields: { illuminated: true },
    digitalFields: { spotDuration: 15, spotsPerLoop: 6, loopDuration: 90 }, venueTaxonomyName: 'Shopping mall',
    address: 'Jalan Bukit Bintang, 55100 Kuala Lumpur', geoms: ['POINT(101.7140 3.1490)'],
    medias: [{ mediaType: 'image', url: img('7f68681aa6418acf2b0e3b8900dc860b85e73269-800x467.webp') }],
    prices: [{ currency: 'MYR', daily: 3000, monthly: 72000 }],
  },
  {
    ...base, ...kl('Bukit Bintang'), sample: true, id: 'sample-bb-03', referenceId: 'SAMPLE-BB03',
    name: 'Jalan Imbi Roadside Unipole', typeName: 'Static Billboard', displayFormatName: 'Unipole',
    description: 'Catching traffic on Jalan Imbi heading into the Golden Triangle.',
    size: '18m × 6m', classicFields: { illuminated: true }, venueTaxonomyName: 'Roadside',
    address: 'Jalan Imbi, 55100 Kuala Lumpur', geoms: ['POINT(101.7175 3.1440)'],
    medias: [{ mediaType: 'image', url: img('c2e5009f2257a88f124720d8eea9ff857c0c0127-800x449.webp') }],
    prices: [{ currency: 'MYR', daily: 1200, monthly: 28000 }],
  },
  {
    ...base, ...kl('Bukit Bintang'), sample: true, id: 'sample-bb-04', referenceId: 'SAMPLE-BB04',
    name: 'Changkat Bukit Bintang Wall Screen', typeName: 'Digital Screen', displayFormatName: 'Wall LED',
    description: 'On the dining and nightlife strip, visible to evening foot traffic.',
    size: '6m × 3m', classicFields: { illuminated: true },
    digitalFields: { spotDuration: 10, spotsPerLoop: 10, loopDuration: 100 }, venueTaxonomyName: 'Street',
    address: 'Changkat Bukit Bintang, 50200 Kuala Lumpur', geoms: ['POINT(101.7085 3.1475)'],
    medias: [{ mediaType: 'image', url: img('dec4eb581b15b272b1e8a3cdd098a75dc07b724b-800x450.webp') }],
    prices: [{ currency: 'MYR', daily: 900, monthly: 21000 }],
  },
  {
    ...base, ...kl('Bukit Bintang'), sample: true, id: 'sample-bb-05', referenceId: 'SAMPLE-BB05',
    name: 'Lot 10 Junction Lightbox', typeName: 'Static Billboard', displayFormatName: 'Lightbox',
    size: '3m × 2m', classicFields: { illuminated: true }, venueTaxonomyName: 'Street',
    address: 'Jalan Sultan Ismail, 50250 Kuala Lumpur', geoms: ['POINT(101.7120 3.1475)'],
    medias: [], // no photo: listed on the area page, no page of its own
    prices: [{ currency: 'MYR', daily: 400, monthly: 9000 }],
  },

  // ── SAMPLE: two more in KLCC, so KLCC (with the real Menara Tan & Tan) reaches 3
  {
    ...base, ...kl('KLCC'), sample: true, id: 'sample-klcc-01', referenceId: 'SAMPLE-KC01',
    name: 'Jalan Ampang Gantry Screen', typeName: 'Digital Billboard', displayFormatName: 'Gantry LED',
    size: '15m × 4m', classicFields: { illuminated: true },
    digitalFields: { spotDuration: 15, spotsPerLoop: 8, loopDuration: 120 }, venueTaxonomyName: 'Roadside',
    address: 'Jalan Ampang, 50450 Kuala Lumpur', geoms: ['POINT(101.7120 3.1590)'],
    medias: [{ mediaType: 'image', url: img('8b45e85fc570958875218f0203a266cf2506fc1c-800x501.webp') }],
    prices: [{ currency: 'MYR', daily: 2600, monthly: 62000 }],
  },
  {
    ...base, ...kl('KLCC'), sample: true, id: 'sample-klcc-02', referenceId: 'SAMPLE-KC02',
    name: 'Suria Concourse Digital Panel', typeName: 'Digital Screen', displayFormatName: 'Indoor Panel',
    size: '2m × 3m', venueTaxonomyName: 'Shopping mall',
    digitalFields: { spotDuration: 10, spotsPerLoop: 12, loopDuration: 120 },
    address: 'Jalan Ampang, 50088 Kuala Lumpur', geoms: ['POINT(101.7118 3.1579)'],
    medias: [{ mediaType: 'image', url: img('9f1db7e1b13c3748e5761d710f8498a6557dc99f-800x441.webp') }],
    prices: [{ currency: 'MYR', daily: 700, monthly: 16000 }],
  },

  // ── SAMPLE: one in TRX — a famous area under 3 sites, so it gets a supply-wanted page
  {
    ...base, ...kl('TRX'), sample: true, id: 'sample-trx-01', referenceId: 'SAMPLE-TRX01',
    name: 'Jalan Imbi / TRX Roadside Screen', typeName: 'Digital Billboard', displayFormatName: 'Roadside LED',
    size: '10m × 5m', classicFields: { illuminated: true }, venueTaxonomyName: 'Roadside',
    address: 'Jalan Tun Razak, 55188 Kuala Lumpur', geoms: ['POINT(101.7195 3.1420)'],
    medias: [{ mediaType: 'image', url: img('c2e5009f2257a88f124720d8eea9ff857c0c0127-800x449.webp') }],
    prices: [{ currency: 'MYR', daily: 1700, monthly: 40000 }],
  },
  // a private site: must never appear
  { ...kl('Bukit Bintang'), status: 'active', publication: 'private', sample: true, id: 'sample-private', name: 'Private test site', mediaOwnerName: 'Hidden' },
]

// Stand-in specifications so the proposal page shows the full block while the
// API is not connected. Replaced by the API's values; marked `sample` until then.
function sampleSpecs(r: InventoryRecord): SiteSpecs {
  const digital = /digital|led|screen|panel/i.test(`${r.typeName} ${r.displayFormatName}`)
  const big = /unipole|highway|gantry|billboard/i.test(`${r.displayFormatName} ${r.typeName}`)
  return digital ? {
    resolution: big ? '1920 px × 960 px' : '1080 px × 1920 px', panels: 1, screens: big ? 1 : 3, leadTimeDays: big ? 7 : 10,
    playerSoftware: 'CS Play', contentApproval: true, boardType: big ? 'BILLBOARD' : 'STANDEE',
    videoFormats: ['mp4'], imageFormats: ['jpg', 'png'], audioFormats: [], sample: true,
  } : {
    resolution: null, panels: 1, screens: null, leadTimeDays: 14, playerSoftware: null, contentApproval: true, boardType: 'STATIC',
    videoFormats: [], imageFormats: ['pdf', 'ai'], audioFormats: [], sample: true,
  }
}

export const SAMPLE_RECORDS: InventoryRecord[] = RAW.map(r => ({ specs: sampleSpecs(r), ...r }))
