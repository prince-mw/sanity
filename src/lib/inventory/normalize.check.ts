// Checks for the inventory rules. No test runner in this repo, so run directly:
//   npx -y tsx src/lib/inventory/normalize.check.ts
import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '../../data/inventory-sample'
import { isPublishable, trustedLevels, placementOf, plausibleSize, toPublicSite, toSiteCard, areaPages, siteHasPage, parsePoint, assignAreas, distanceKm, AREA_MIN_SITES } from './normalize'
import type { PublicSite } from './types'

let bad = 0
const check = (ok: boolean, m: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${m}`); if (!ok) bad++ }

const sites = SAMPLE_RECORDS.filter(isPublishable).map(r => toPublicSite(r, SAMPLE_LEVELS.malaysia)).filter(Boolean) as PublicSite[]
const json = JSON.stringify(sites)

check(!sites.some(s => s.name === 'Private test site'), 'a private site never becomes a public site')
check(!/mediaOwner|Hidden on the website/.test(json), 'no media owner reaches a public site')
check(!/"prices"|daily|monthly|cpm|MYR/.test(json), 'no price reaches a public site')
check(new Set(sites.map(s => s.slug)).size === sites.length, 'every site slug is unique')
check(sites.every(s => /^[a-z0-9-]+$/.test(s.slug)), 'slugs are clean URL text')
check(toPublicSite(SAMPLE_RECORDS[0], SAMPLE_LEVELS.malaysia)!.slug === toPublicSite(SAMPLE_RECORDS[0], SAMPLE_LEVELS.malaysia)!.slug, 'a slug is stable between runs')

const areas = areaPages(sites, FAMOUS_AREAS['malaysia/kuala-lumpur'])
const bb = areas.find(a => a.slug === 'bukit-bintang')
check(bb?.kind === 'buyer' && bb.sites.length >= AREA_MIN_SITES, 'an area with 3+ sites gets a buyer page')
check(areas.find(a => a.slug === 'trx')?.kind === 'supply', 'a famous area under 3 sites gets a media-owners-wanted page')
check(areas.find(a => a.slug === 'bangsar')?.kind === 'supply', 'a famous area with no sites still gets a page')
check(!areas.some(a => a.slug === 'dutamas'), 'a non-famous area under 3 sites gets no page (its sites stay on the city page)')
check(!siteHasPage(sites.find(s => s.name === 'Lot 10 Junction Lightbox')!), 'a site with no photo gets no page of its own')
check(siteHasPage(sites.find(s => s.name === 'Menara Tan & Tan')!), 'a site with a photo gets a page')
check(JSON.stringify(parsePoint('POINT(101.71 3.14)')) === '{"lat":3.14,"lng":101.71}', 'map points read longitude first, as the API sends them')

// The address decides the place, and no site is dropped over a missing level (Rif, 11 Nov 2026).
const base = SAMPLE_RECORDS.find(r => isPublishable(r))!
const noArea = toPublicSite({ ...base, id: 'x-no-area', adminLevel3Name: null, adminLevel4Name: null }, { city: 2, area: 3 })
check(!!noArea && noArea.areaName === noArea.cityName, 'a site with no area is kept, listed under its city')
const noCity = toPublicSite({ ...base, id: 'x-no-city', adminLevel2Name: null }, { city: 2, area: 3 })
check(!!noCity && noCity.cityName === base.adminLevel1Name?.trim(), 'a site with no city level falls back to the level above')

// The live API's own shapes (staging pull, 13 Nov 2026).
const api = { ...base, id: 'api-1', referenceId: 'MYS-LAN-D-00000-10491', specs: null, size: null, venueTaxonomyName: null,
  medias: [{ mediaType: 'asset', url: 'https://cdn.example/a.jpg' }, { mediaType: 'thumbnail', url: 'https://cdn.example/t.jpg' }, { mediaType: 'asset', url: 'https://cdn.example/v.mp4' }],
  thumbnailUrl: 'https://cdn.example/tn_t.jpg', thumbnailUrlOriginal: 'https://cdn.example/t.jpg',
  venues: [{ name: 'Retail' }, { name: 'Mall' }], panels: [{ pixelWidth: 1080, pixelHeight: 1920, physicalWidth: 2.27, physicalHeight: 3.97, screenCount: 1 }],
  requiresContentApproval: true }
const a = toPublicSite(api, { city: 2, area: 3 })!
check(a.photos[0] === 'https://cdn.example/t.jpg' && a.photos.includes('https://cdn.example/a.jpg'), 'API photos marked "asset"/"thumbnail" are kept, the chosen one first')
check(!a.photos.some(u => u.endsWith('.mp4') || u.includes('tn_')), 'videos and the small tn_ copy are not used as photos')
check(a.venueType === 'Mall' && a.size === '2.27m × 3.97m', 'venue and size come from the API venues and panels')
check(a.specs?.resolution === '1080 px × 1920 px' && a.specs?.contentApproval === true, 'screen resolution comes from the API panels')
check(!isPublishable({ ...api, archived: true }), 'an archived site never shows')
check(!isPublishable({ ...api, publication: 'specific' }), 'a site shown to chosen agencies only never shows publicly')
check(!isPublishable({ ...api, name: 'TEST - Jln Bukit Bintang' }) && !isPublishable({ ...api, name: 'DisplayInventory1016b34' }), 'test placeholders never show')
check(isPublishable({ ...api, name: 'Testing Grounds Mall' }), 'a real name that starts with "Test…" still shows')
for (const n of ['Kelantan Rive1d562', 'QA THIS IS MY DATA 23', 'Import Digital 2026-09-30T11-18-02 #1', 'FLEET CLASSIC CHECK', 'Classic Check 7508', 'test123', 'Testing fits qa 0217', 'digital invnetory 19/08', 'single board', 'vic-qa']) check(!isPublishable({ ...api, name: n }), `test record "${n}" never shows`)
for (const n of ['Menara Tan & Tan', 'JIM Melaka 2', 'LOW8 - Plaza Low Yat (8)', 'Jalan Bukit Bintang-1', 'DC4 - Damansara City Mall (4)']) check(isPublishable({ ...api, name: n }), `real name "${n}" still shows`)

// Areas by coordinates: the nearest named area within the radius, else the address's own area.
const near = (lat: number, lng: number, id: string) => ({ ...a, id, lat, lng, areaName: 'Bandar Kuala Lumpur', areaSlug: 'bandar-kuala-lumpur' })
const anchors = [{ name: 'KLCC', lat: 3.1579, lng: 101.7116 }, { name: 'Bukit Bintang', lat: 3.1466, lng: 101.7113 }]
const placed = assignAreas([near(3.1585, 101.7120, 'k'), near(3.1470, 101.7110, 'b'), near(3.0, 101.5, 'far')], anchors)
check(placed[0].areaSlug === 'klcc' && placed[1].areaSlug === 'bukit-bintang', 'a site near a named area joins the nearest one')
check(placed[2].areaSlug === 'bandar-kuala-lumpur' && placed.length === 3, 'a site near no named area keeps its address area and is never dropped')
check(Math.abs(distanceKm(anchors[0], anchors[1]) - 1.26) < 0.05, 'distances are in kilometres')

// Site lists send a slim card; Details fetches the rest (13 Nov 2026: KL page weight).
const card = toSiteCard(a)
check(card.photos.length === 1 && !('specs' in card) && !('description' in card), 'a list card carries one photo and no specs or description')
check(!Object.values(card).some(v => v == null), 'a list card leaves empty fields out')
check(card.id === a.id && card.slug === a.slug && card.lat === a.lat && card.areaSlug === a.areaSlug, 'a list card keeps what the card, filters and map need')

// Place by the map point (hygiene scan, 14 Nov 2026). Rif's two examples, as the API holds them.
const MY = { states: { Pahang: ['pahang'], Kedah: ['kedah'], 'Kuala Lumpur': ['kuala lumpur'], Selangor: ['selangor'] }, postcodes: [[25, 28, 'Pahang'], [5, 9, 'Kedah'], [50, 60, 'Kuala Lumpur'], [40, 48, 'Selangor']] as [number, number, string][] }
const tl = { ...api, adminLevel0Name: 'Malaysia', adminLevel1Name: 'Kuala Lumpur', adminLevel2Name: 'Kuala Lumpur', adminLevel3Name: null, address: 'Jalan Tanjung Lumpur, 26060 Balok, Pahang, Malaysia', resolved: { adminLevel0Name: 'Malaysia', adminLevel1Name: 'Pahang', adminLevel2Name: 'Kuantan', adminLevel3Name: 'Kuala Kuantan' } }
const moved = trustedLevels(tl, MY)
check(moved.source === 'point' && moved.record.adminLevel1Name === 'Pahang' && moved.record.adminLevel2Name === 'Kuantan', 'a site whose point and address say Pahang is placed in Pahang, not its stored Kuala Lumpur')
const pin = trustedLevels({ ...tl, address: 'Jalan Ampang, 50450 Kuala Lumpur', resolved: { adminLevel0Name: 'Malaysia', adminLevel1Name: 'Kedah', adminLevel2Name: 'Kuala Muda' } }, MY)
check(pin.source === 'stored' && pin.record.adminLevel1Name === 'Kuala Lumpur', 'when the address confirms the stored state, a misplaced pin does not move the site')
check(trustedLevels({ ...tl, resolved: null }, MY).source === 'no-point', 'a site without a resolved point keeps its stored place')
check(trustedLevels({ ...tl, resolved: { adminLevel0Name: 'Singapore', adminLevel1Name: 'Singapore' } }, MY).source === 'stored', 'a point in another country never moves a site out of its country')
check(trustedLevels({ ...tl, address: null }, MY).source === 'point', 'with no address, the point wins')

// Sizes: never show an impossible one.
const indoorRec = { ...api, venues: [{ name: 'Office Buildings' }] }
check(!plausibleSize(indoorRec, 40, 60) && plausibleSize(indoorRec, 2.27, 3.97), 'an indoor screen of 40 m x 60 m is hidden; 2.27 m x 3.97 m shows')
check(!plausibleSize({ ...api, venues: [{ name: 'Outdoor' }], panels: [{ pixelWidth: 1920, pixelHeight: 1080 }] }, 1920, 1080), 'pixel counts typed into metres are hidden')
check(plausibleSize({ ...api, venues: [{ name: 'Outdoor' }] }, 30, 20), 'a 30 m x 20 m roadside billboard shows')

// The display bar: two of stored state, map point and address must agree (Rif, 14 Nov 2026).
const bar = (stored: string, point: string | null, addr: string | null, defaultPin = false) =>
  placementOf({ ...tl, adminLevel1Name: stored, address: addr, resolved: point ? { adminLevel0Name: 'Malaysia', adminLevel1Name: point } : null }, MY, defaultPin)
check(bar('Kuala Lumpur', 'Pahang', '26060 Balok, Pahang').display === 'show' && bar('Kuala Lumpur', 'Pahang', '26060 Balok, Pahang').record.adminLevel1Name === 'Pahang', 'point + address agree: shown, placed by the point')
check(bar('Selangor', 'Selangor', null).display === 'show', 'stored + point agree with no address: shown')
const np = bar('Kedah', 'Selangor', 'Sungai Petani, Kedah')
check(np.display === 'no-pin' && np.record.adminLevel1Name === 'Kedah' && !np.record.geoms?.length, 'stored + address agree, point elsewhere: shown under its stored state without a pin')
check(bar('Kedah', 'Kedah', 'Sungai Petani, Kedah', true).display === 'no-pin', 'a shared default pin is not trusted even when it agrees')
check(bar('Kedah', 'Negeri Sembilan', null).display === 'hold' && bar('Kedah', 'Negeri Sembilan', null).reason === 'no-tiebreak', 'stored and point disagree with no address: held')
check(bar('Kedah', null, null, true).reason === 'single-signal', 'default pin and no address: held')
check(bar('Kedah', 'Selangor', 'Balok, Pahang').reason === 'three-way', 'all three disagree: held')

console.log(bad ? `\n${bad} FAILED` : '\nall passed')
process.exit(bad ? 1 : 0)
