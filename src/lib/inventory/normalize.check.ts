// Checks for the inventory rules. No test runner in this repo, so run directly:
//   npx -y tsx src/lib/inventory/normalize.check.ts
import { SAMPLE_RECORDS, SAMPLE_LEVELS, FAMOUS_AREAS } from '../../data/inventory-sample'
import { isPublishable, toPublicSite, areaPages, siteHasPage, parsePoint, assignAreas, distanceKm, AREA_MIN_SITES } from './normalize'
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

// Areas by coordinates: the nearest named area within the radius, else the address's own area.
const near = (lat: number, lng: number, id: string) => ({ ...a, id, lat, lng, areaName: 'Bandar Kuala Lumpur', areaSlug: 'bandar-kuala-lumpur' })
const anchors = [{ name: 'KLCC', lat: 3.1579, lng: 101.7116 }, { name: 'Bukit Bintang', lat: 3.1466, lng: 101.7113 }]
const placed = assignAreas([near(3.1585, 101.7120, 'k'), near(3.1470, 101.7110, 'b'), near(3.0, 101.5, 'far')], anchors)
check(placed[0].areaSlug === 'klcc' && placed[1].areaSlug === 'bukit-bintang', 'a site near a named area joins the nearest one')
check(placed[2].areaSlug === 'bandar-kuala-lumpur' && placed.length === 3, 'a site near no named area keeps its address area and is never dropped')
check(Math.abs(distanceKm(anchors[0], anchors[1]) - 1.26) < 0.05, 'distances are in kilometres')

console.log(bad ? `\n${bad} FAILED` : '\nall passed')
process.exit(bad ? 1 : 0)
