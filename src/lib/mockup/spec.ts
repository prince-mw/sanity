// What size the creative should be for a site, and how an uploaded file fits it.
//
// The corners marked on the photo give the screen's SHAPE, never its pixels, so
// the size comes in tiers (Rif, 11 Nov 2026): the record's resolution when the
// inventory has it (exact), else the board's physical size (exact ratio, pixels
// chosen by us), else the ratio measured from the photo's corners (approximate).
// A wrong-size upload is never stretched: letterboxed with black bars, like the
// real screen would, or cropped to fill when the visitor asks for that.

import type { Face } from './compose'
import type { PublicSite } from '@/lib/inventory/types'

/**
 * Digital screens play video; traditional (printed) boards show a still only
 * (Rif, 11 Nov 2026). Digital = the record has digital specs or video formats,
 * or the format says LED/digital/screen.
 */
export const isDigitalSite = (s: Pick<PublicSite, 'digital' | 'format' | 'displayFormat' | 'specs'>) =>
  !!s.digital || !!s.specs?.videoFormats?.length || /\b(led|digital|screen|dooh)\b/i.test(`${s.format ?? ''} ${s.displayFormat ?? ''}`)
import { faceAspect, aspectFromSize } from './compose'

export type SpecSource = 'resolution' | 'size' | 'photo' | 'format'
export type CreativeSpec = { width: number; height: number; ratio: number; ratioLabel: string; source: SpecSource }
export type Fit = 'letterbox' | 'fill'

const LONG_SIDE = 1920
const NICE: [number, number][] = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [3, 2], [4, 3], [5, 4], [16, 9], [16, 10], [21, 9], [5, 2], [7, 2], [8, 3], [7, 3], [9, 2]]

/** "2:1", "16:9", "9:16"… the nearest common ratio within 4%, else one decimal. */
export function ratioLabel(r: number): string {
  if (!(r > 0)) return '—'
  let best: [number, number] | null = null, err = Infinity
  for (const [a, b] of NICE) for (const [w, h] of [[a, b], [b, a]]) {
    const e = Math.abs(w / h - r) / r
    if (e < err) { err = e; best = [w, h] }
  }
  if (best && err <= 0.04) return `${best[0]}:${best[1]}`
  return r >= 1 ? `${r.toFixed(1)}:1` : `1:${(1 / r).toFixed(1)}`
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2)

/** Pixel size for a ratio: the long side is 1920. */
export function sizeForRatio(r: number): { width: number; height: number } {
  return r >= 1 ? { width: LONG_SIDE, height: even(LONG_SIDE / r) } : { width: even(LONG_SIDE * r), height: LONG_SIDE }
}

export function parseResolution(s: string | null | undefined): { width: number; height: number } | null {
  const m = s?.match(/(\d{2,5})\s*(?:px)?\s*[x×]\s*(\d{2,5})/i)
  if (!m) return null
  const w = parseInt(m[1], 10), h = parseInt(m[2], 10)
  return w > 0 && h > 0 ? { width: w, height: h } : null
}

/**
 * The creative size for a site. `face` + the photo's size give the measured
 * ratio when nothing better exists; `formatFallback` is the format's usual shape.
 */
export function creativeSpec(input: { resolution?: string | null; size?: string | null; face?: Face | null; photoW?: number; photoH?: number; formatFallback?: number }): CreativeSpec {
  const res = parseResolution(input.resolution)
  if (res) return { ...res, ratio: res.width / res.height, ratioLabel: ratioLabel(res.width / res.height), source: 'resolution' }
  const fromSize = input.size ? aspectFromSize(input.size, NaN) : NaN
  if (fromSize > 0) return { ...sizeForRatio(fromSize), ratio: fromSize, ratioLabel: ratioLabel(fromSize), source: 'size' }
  if (input.face && input.photoW && input.photoH) {
    const r = faceAspect(input.face, input.photoW, input.photoH)
    return { ...sizeForRatio(r), ratio: r, ratioLabel: ratioLabel(r), source: 'photo' }
  }
  const r = input.formatFallback ?? 2
  return { ...sizeForRatio(r), ratio: r, ratioLabel: ratioLabel(r), source: 'format' }
}

/** One line telling the visitor what to upload, honest about how sure we are. */
export function specSentence(spec: CreativeSpec, siteName: string): string {
  const px = `${spec.width} × ${spec.height} px`
  switch (spec.source) {
    case 'resolution': return `${siteName} plays ${px} (${spec.ratioLabel}). Upload an image or video at that size.`
    case 'size': return `${siteName} is ${spec.ratioLabel}. Upload an image or video at ${px}, or any file with that ratio.`
    case 'photo': return `${siteName} is about ${spec.ratioLabel}, measured from the photo. Upload about ${px}, or any file near that ratio.`
    default: return `Upload an image or video at ${px} (${spec.ratioLabel}).`
  }
}

export type FitReport = { kind: 'exact' | 'bars' | 'crop'; text: string; barPx: number; side: 'left/right' | 'top/bottom' | null }

/** How an uploaded file sits on the screen: exact, letterboxed (bars of N px each) or cropped. */
export function fitReport(media: { width: number; height: number }, spec: CreativeSpec, fit: Fit): FitReport {
  const mr = media.width / media.height, sr = spec.ratio
  const label = `${media.width} × ${media.height} px (${ratioLabel(mr)})`
  if (Math.abs(mr - sr) / sr < 0.01) return { kind: 'exact', text: `Your file is ${label}: it matches this screen.`, barPx: 0, side: null }
  const wider = mr > sr
  const side = wider ? 'top/bottom' : 'left/right'
  // bars in screen pixels when the file is contained in the screen
  const barPx = Math.round(wider ? (spec.height - spec.width / mr) / 2 : (spec.width - spec.height * mr) / 2)
  if (fit === 'fill') return { kind: 'crop', text: `Your file is ${label}; this screen is ${spec.ratioLabel}. Filling the screen crops the ${wider ? 'sides' : 'top and bottom'}.`, barPx, side }
  return { kind: 'bars', text: `Your file is ${label}; this screen is ${spec.ratioLabel}. It leaves black bars ${side} of about ${barPx} px each, exactly as the screen would show it.`, barPx, side }
}

/** A blank artwork template at the spec's size: grey, safe zone dashed, the facts written in the middle. PNG data URL. */
export function templatePng(spec: CreativeSpec, siteName: string): string {
  const c = document.createElement('canvas'); c.width = spec.width; c.height = spec.height
  const g = c.getContext('2d')!
  g.fillStyle = '#d9dee7'; g.fillRect(0, 0, c.width, c.height)
  const inset = Math.round(Math.min(c.width, c.height) * 0.08)
  g.setLineDash([Math.round(inset / 2), Math.round(inset / 3)]); g.lineWidth = Math.max(2, Math.round(inset / 12)); g.strokeStyle = '#2563eb'
  g.strokeRect(inset, inset, c.width - inset * 2, c.height - inset * 2)
  g.setLineDash([])
  g.fillStyle = '#1B1E2B'; g.textAlign = 'center'; g.textBaseline = 'middle'
  const base = Math.round(Math.min(c.width, c.height) / 14)
  const lines: [string, number][] = [[siteName, base], [`${spec.width} × ${spec.height} px · ${spec.ratioLabel}${spec.source === 'photo' ? ' (approx.)' : ''}`, Math.round(base * 0.8)], ['Keep text and logos inside the dashed line', Math.round(base * 0.55)]]
  const total = lines.reduce((s, [, px]) => s + px * 1.3, 0)
  let y = c.height / 2 - total / 2
  for (const [t, px] of lines) { g.font = `${px === base ? 800 : 600} ${px}px Poppins, "Segoe UI", Arial, sans-serif`; g.fillText(t, c.width / 2, y + px * 0.65, c.width - inset * 3); y += px * 1.3 }
  return c.toDataURL('image/png')
}
