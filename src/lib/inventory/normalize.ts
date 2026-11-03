// Inventory pages: turning API records into what a page may show, and the
// rules for which places get a page of their own. Pure — no fetching.

import type { InventoryRecord, LevelMap, PublicSite, PriceQuote } from './types'

export const slugify = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** "POINT(101.71 3.14)" → { lat: 3.14, lng: 101.71 } */
export function parsePoint(wkt: string | null | undefined): { lat: number; lng: number } | null {
  const m = String(wkt ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)\s*\)/i)
  if (!m) return null
  const lng = Number(m[1]), lat = Number(m[2])
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null
}

const level = (r: InventoryRecord, n: number) =>
  (r as unknown as Record<string, string | null | undefined>)[`adminLevel${n}Name`]?.trim() || null

/** Only active, public sites ever reach the website. */
export const isPublishable = (r: InventoryRecord) =>
  (r.status ?? '').toLowerCase() === 'active' && (r.publication ?? '').toLowerCase() !== 'private'

/**
 * The public face of a site. The media owner and prices are left behind here
 * on purpose (owner, 26 Oct 2026: owner names never shown; prices only behind
 * the newsletter sign-up), so they can't leak into a page.
 */
export function toPublicSite(r: InventoryRecord, levels: LevelMap): PublicSite | null {
  const countryName = level(r, 0)
  const cityName = level(r, levels.city)
  const areaName = level(r, levels.area)
  if (!countryName || !cityName || !areaName || !r.name?.trim()) return null
  const point = parsePoint(r.geoms?.[0])
  const photos = [
    ...(r.medias ?? []).filter(m => (m.mediaType ?? 'image').toLowerCase().startsWith('image') && m.url).map(m => m.url as string),
    ...(r.thumbnailUrl ? [r.thumbnailUrl] : []),
  ].filter((u, i, a) => a.indexOf(u) === i)
  const d = r.digitalFields
  return {
    id: r.id,
    // Name for search, plus a short stable code so two sites with the same name never collide.
    slug: `${slugify(r.name)}-${(slugify(r.referenceId || r.id).split('-').pop() ?? '').slice(-6)}`,
    name: r.name.trim(),
    description: r.description?.trim() || null,
    format: r.typeName ?? null,
    displayFormat: r.displayFormatName ?? null,
    size: r.size ?? null,
    illuminated: r.classicFields?.illuminated ?? null,
    digital: d ? { spotSeconds: d.spotDuration ?? null, spotsPerLoop: d.spotsPerLoop ?? null, loopSeconds: d.loopDuration ?? null } : null,
    venueType: r.venueTaxonomyName ?? null,
    countryName, countrySlug: slugify(countryName),
    cityName, citySlug: slugify(cityName),
    areaName, areaSlug: slugify(areaName),
    address: r.address?.trim() || null,
    lat: point?.lat ?? null, lng: point?.lng ?? null,
    photos,
    audience: r.audience ?? null,
    sample: !!r.sample,
  }
}

export function toPriceQuote(r: InventoryRecord): PriceQuote | null {
  const p = (r.prices ?? []).find(x => x.daily != null || x.monthly != null)
  if (!p) return null
  return { siteId: r.id, currency: p.currency ?? '', daily: p.daily ?? null, monthly: p.monthly ?? null }
}

/** An area earns its own buyer page at this many sites (owner, 26 Oct 2026). */
export const AREA_MIN_SITES = 3

export type AreaPage = { kind: 'buyer' | 'supply'; name: string; slug: string; sites: PublicSite[] }

/**
 * Which areas get a page. Buyer page: 3+ sites. Supply-wanted page: a famous
 * area with fewer — it asks media owners to list their screens with us, and
 * still points buyers at what we have nearby.
 */
export function areaPages(sites: PublicSite[], famous: string[]): AreaPage[] {
  const by = new Map<string, AreaPage>()
  for (const s of sites) {
    const a = by.get(s.areaSlug) ?? { kind: 'buyer' as const, name: s.areaName, slug: s.areaSlug, sites: [] }
    a.sites.push(s)
    by.set(s.areaSlug, a)
  }
  const out: AreaPage[] = []
  for (const a of by.values()) if (a.sites.length >= AREA_MIN_SITES) out.push(a)
  for (const name of famous) {
    const slug = slugify(name)
    if (out.some(a => a.slug === slug)) continue
    out.push({ kind: 'supply', name, slug, sites: by.get(slug)?.sites ?? [] })
  }
  return out.sort((x, y) => (x.kind === y.kind ? y.sites.length - x.sites.length : x.kind === 'buyer' ? -1 : 1))
}

/** A site earns its own page only with a photo; without one it is listed, not paged. */
export const siteHasPage = (s: PublicSite) => s.photos.length > 0

export const formatCount = (n: number) => n.toLocaleString('en-US')
