// A proposal's per-screen settings (Rif, 12 Nov 2026): after approval each site
// can have its own fit (4 corners, a curved edge or 6 points) and its own file
// at that screen's resolution. These helpers turn the stored override into the
// face and the creative that site's mock-up uses. Client-safe.

import type { Creative, ScreenOverride, SiteFace } from '@/lib/proposal/types'

export const screenFor = (creative: Creative | null | undefined, siteId: string): ScreenOverride | null =>
  creative?.screens?.find(s => s.siteId === siteId) ?? null

export function parseFace(json: string | null | undefined): SiteFace | null {
  if (!json) return null
  try {
    const f = JSON.parse(json) as SiteFace
    const ok = (p: unknown) => Array.isArray(p) && p.length === 2 && p.every(n => typeof n === 'number' && n >= -0.5 && n <= 1.5)
    if (!Array.isArray(f.corners) || f.corners.length !== 4 || !f.corners.every(ok)) return null
    return { corners: f.corners, edges: Array.isArray(f.edges) && f.edges.length === 4 && f.edges.every(ok) ? f.edges : null, seam: Array.isArray(f.seam) && f.seam.length === 2 && f.seam.every(ok) ? f.seam : null, kind: f.kind ?? null }
  } catch { return null }
}

/** The face and the creative one site's mock-up should use, with its own settings applied. */
export function effectiveFor(siteId: string, siteFace: SiteFace | null | undefined, creative: Creative | null): { face: SiteFace | null; creative: Creative | null; override: ScreenOverride | null } {
  const o = screenFor(creative, siteId)
  if (!creative || !o) return { face: siteFace ?? null, creative, override: null }
  const own = parseFace(o.faceJson)
  const face = own ? { ...own, kind: own.kind ?? siteFace?.kind ?? null } : siteFace ?? null
  const c: Creative = o.own ? { ...creative, mode: 'own', own: o.own, fit: o.fit ?? creative.fit } : o.fit ? { ...creative, fit: o.fit } : creative
  return { face, creative: c, override: o }
}

/** Sanity cannot store arrays of arrays: the face travels as JSON text. */
export const faceToJson = (f: SiteFace) => JSON.stringify({ corners: f.corners, edges: f.edges ?? null, seam: f.seam ?? null, kind: f.kind ?? null })
