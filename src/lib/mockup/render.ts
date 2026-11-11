'use client'

// A site mock-up from a stored creative (the proposal's `creative`), for any
// site whose billboard face was marked: loads the photo and the creative's
// assets, draws the creative (our layout, or their file as is) and composes it
// on the photo. A video creative also gets a live canvas. Same pipeline as the
// site page's AdMockup, without the form.

import { useEffect, useMemo, useRef, useState } from 'react'
import type { PublicSite } from '@/lib/inventory/types'
import type { Creative, SiteFace } from '@/lib/proposal/types'
import { aspectFromSize, composeOnSite, drawCreative, drawOwnCreative, faceAspect, loadImage, mediaSize, wordmark, type Face, type Media } from './compose'
import { creativeSpec, fitReport, isDigitalSite, type CreativeSpec, type FitReport } from './spec'

const proxied = (u: string) => u.startsWith('data:') || u.startsWith('blob:') ? u : `/api/mockup/photo?u=${encodeURIComponent(u)}`

const imgCache = new Map<string, Promise<HTMLImageElement>>()
const cachedImage = (u: string) => { let p = imgCache.get(u); if (!p) { p = loadImage(proxied(u)); imgCache.set(u, p) } return p }

function loadVideo(u: string): Promise<HTMLVideoElement> {
  return new Promise((res, rej) => {
    const v = document.createElement('video')
    v.crossOrigin = 'anonymous'; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'
    v.onloadeddata = () => { v.play().catch(() => undefined); res(v) }
    v.onerror = () => rej(new Error('video'))
    v.src = u
  })
}

export const faceFor = (site: PublicSite, f: SiteFace | null | undefined): Face | null => f && f.corners.length === 4
  ? { corners: f.corners as Face['corners'], edges: f.edges ?? null, seam: f.seam ?? null, kind: f.kind ?? (/led|digital|screen|panel|gantry/i.test(`${site.displayFormat} ${site.format}`) ? 'led' : 'print') }
  : null

const portrait = (site: PublicSite) => /unipole|portrait|panel|kiosk/i.test(`${site.displayFormat} ${site.format}`) ? 0.6 : 2

const luminance = (hex: string) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 }

type Assets = { logo: HTMLImageElement | null; own: Media | null }

/** The creative on a canvas, sized for the site: our layout at the face's shape, their file at the screen's spec. */
export function creativeCanvas(c: Creative, a: Assets, spec: CreativeSpec, aspect: number, into = document.createElement('canvas')): HTMLCanvasElement {
  if (c.mode === 'own' && a.own) { drawOwnCreative(into, { width: spec.width, height: spec.height, media: a.own, fit: c.fit }); return into }
  const W = 1200, H = Math.max(300, Math.min(Math.round(1200 / aspect), 2000))
  const dark = luminance(c.accent) < 0.5
  const mark = a.logo ?? (c.brand ? wordmark(c.brand, dark ? '#ffffff' : '#111111') : null)
  drawCreative(into, { width: W, height: H, photo: null, logo: mark, tagline: c.tagline || ' ', accent: c.accent, template: c.template })
  return into
}

/**
 * Still (JPEG data URL) of the creative on the site, and a live canvas when
 * the creative is a video and `play` is on. `png()` renders the clean file.
 */
export function useSiteMockup(site: PublicSite, siteFace: SiteFace | null | undefined, creative: Creative | null, play = false) {
  const face = useMemo(() => faceFor(site, siteFace), [site, siteFace])
  const [siteImg, setSiteImg] = useState<HTMLImageElement | null>(null)
  const [assets, setAssets] = useState<Assets | null>(null)
  const [still, setStill] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const liveRef = useRef<HTMLCanvasElement | null>(null)
  const photo = site.photos[0]

  useEffect(() => { if (!photo) return; cachedImage(photo).then(setSiteImg).catch(() => setError('The site photo could not be loaded.')) }, [photo])
  useEffect(() => {
    let gone = false
    if (!creative) { setAssets(null); return }
    const logo = creative.mode === 'make' && creative.logoUrl ? cachedImage(creative.logoUrl).catch(() => null) : Promise.resolve(null)
    const own = creative.mode === 'own' && creative.own ? (creative.own.kind === 'video' ? loadVideo(creative.own.url).catch(() => null) : cachedImage(creative.own.url).catch(() => null)) : Promise.resolve(null)
    Promise.all([logo, own]).then(([l, o]) => { if (!gone) setAssets({ logo: l, own: o as Media | null }) })
    return () => { gone = true }
  }, [creative])

  const spec = useMemo(() => creativeSpec({ resolution: site.specs?.resolution, size: site.size, face, photoW: siteImg?.width, photoH: siteImg?.height, formatFallback: portrait(site) }), [site, face, siteImg])
  const aspect = useMemo(() => siteImg && face ? faceAspect(face, siteImg.width, siteImg.height) : aspectFromSize(site.size, portrait(site)), [site, siteImg, face])

  const render = (quality: 'jpeg' | 'png' = 'jpeg'): string | null => {
    if (!creative || !assets || !siteImg) return null
    try {
      const cv = creativeCanvas(creative, assets, spec, aspect)
      const out = face ? composeOnSite(siteImg, cv, face) : cv
      return quality === 'png' ? out.toDataURL('image/png') : out.toDataURL('image/jpeg', 0.9)
    } catch (e) { console.error(e); setError('Your browser could not build the preview.'); return null }
  }
  useEffect(() => { setStill(render()) }, [creative, assets, siteImg, face, spec, aspect]) // eslint-disable-line react-hooks/exhaustive-deps

  const isVideo = !!assets?.own && 'videoWidth' in assets.own
  const digital = isDigitalSite(site)
  // a printed board shows the video's first frame as a still
  const live = play && isVideo && digital && !!siteImg && !!face
  useEffect(() => {
    if (!live || !creative || !assets?.own || !siteImg || !face) return
    const v = assets.own as HTMLVideoElement
    const cv = document.createElement('canvas')
    let raf = 0, last = 0, stop = false
    v.play().catch(() => undefined)
    const tick = (t: number) => {
      if (stop) return
      raf = requestAnimationFrame(tick)
      if (t - last < 80 || v.readyState < 2) return
      last = t
      try {
        creativeCanvas(creative, assets, spec, aspect, cv)
        const out = composeOnSite(siteImg, cv, face, 900)
        const c = liveRef.current; if (!c) return
        if (c.width !== out.width || c.height !== out.height) { c.width = out.width; c.height = out.height }
        c.getContext('2d')!.drawImage(out, 0, 0)
      } catch { stop = true }
    }
    raf = requestAnimationFrame(tick)
    return () => { stop = true; cancelAnimationFrame(raf) }
  }, [live, creative, assets, siteImg, face, spec, aspect])

  // how their own file sits on this screen: exact, black bars or cropped (for the card's tag)
  const fit: FitReport | null = useMemo(() => {
    if (!creative || creative.mode !== 'own' || !assets?.own) return null
    const size = mediaSize(assets.own); return size.width > 0 ? fitReport(size, spec, creative.fit) : null
  }, [creative, assets, spec])
  return { still, live, liveRef, error, spec, face, fit, digital, photoAspect: siteImg && face ? aspect : null, ready: !!siteImg && !!assets, png: () => render('png'), stillFromVideo: isVideo && !digital }
}
