'use client'

// "See your ad here": the visitor drops a logo and a tagline, we build an ad
// (optional stock photo, generic layout, their colour) and put it on this
// billboard's real photo. Watermarked preview is free; the clean download
// opens the lead form (LeadForm) and is released only after it succeeds, with
// the file attached to the lead. Everything happens in the browser; the logo
// is never uploaded unless they submit the form.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Upload, Image as ImageIcon, Palette, RefreshCw } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { SiteContent } from '@/lib/inventory/siteContent'
import type { Face } from '@/lib/mockup/compose'
import { aspectFromSize, faceAspect, composeOnSite, drawCreative, loadImage, sampleAccent, wordmark, type Template } from '@/lib/mockup/compose'
import { LeadForm } from '../forms/LeadForm'

type StockPhoto = { id: number; src: string; thumb: string; alt: string; credit: string; creditUrl: string }

const TEMPLATES: { id: Template; label: string }[] = [
  { id: 'band', label: 'Photo + band' }, { id: 'split', label: 'Split' }, { id: 'poster', label: 'Poster' },
]
const INDUSTRIES = ['Retail', 'Food & beverage', 'Property', 'Automotive', 'Finance', 'Telco & tech', 'Travel', 'Beauty', 'Entertainment', 'Education', 'Healthcare', 'Other']

export function AdMockup({ site, content }: { site: PublicSite; content: Pick<SiteContent, 'faceCorners' | 'faceEdges' | 'faceKind'> }) {
  const faceCorners = content.faceCorners
  const face: Face | null = useMemo(() => faceCorners ? { corners: faceCorners, edges: content.faceEdges ?? null, kind: content.faceKind ?? (/led|digital|screen|panel|gantry/i.test(`${site.displayFormat} ${site.format}`) ? 'led' : 'print') } : null, [faceCorners, content.faceEdges, content.faceKind, site])
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [brand, setBrand] = useState('')
  const [logoName, setLogoName] = useState<string | null>(null)
  const [tagline, setTagline] = useState('')
  const [industry, setIndustry] = useState('')
  const [template, setTemplate] = useState<Template>('band')
  const [accent, setAccent] = useState('#1B1E2B')
  const [customAccent, setCustomAccent] = useState(false)
  const [photos, setPhotos] = useState<StockPhoto[]>([])
  const [photoId, setPhotoId] = useState<number | null>(null)
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null)
  const [siteImg, setSiteImg] = useState<HTMLImageElement | null>(null)
  const [searching, setSearching] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const cleanRef = useRef<string | null>(null)
  const creativeRef = useRef<HTMLCanvasElement | null>(null)

  // The creative takes the shape of the face in the photo, so it fills it exactly; the site's size is the fallback.
  const aspect = useMemo(() => siteImg && faceCorners ? faceAspect(faceCorners, siteImg.width, siteImg.height)
    : aspectFromSize(site.size, /unipole|portrait|panel|kiosk/i.test(`${site.displayFormat} ${site.format}`) ? 0.6 : 2), [site, siteImg, faceCorners])
  const ready = !!tagline.trim() || !!logo || !!brand.trim()

  // The site photo, once
  useEffect(() => {
    if (!site.photos[0]) return
    loadImage(`/api/mockup/photo?u=${encodeURIComponent(site.photos[0])}`).then(setSiteImg).catch(() => setError('The site photo could not be loaded for the mock-up.'))
  }, [site.photos])

  const onLogo = async (file: File | undefined) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setError('Please use a logo under 2 MB.'); return }
    const url = URL.createObjectURL(file)
    try {
      const img = await loadImage(url)
      setLogo(img); setLogoName(file.name); setError(null)
      if (!customAccent) setAccent(sampleAccent(img))
    } catch { setError('That file could not be read as an image.') }
  }

  const findPhotos = async () => {
    if (!tagline.trim() && !industry) return
    setSearching(true)
    try {
      const r = await fetch('/api/mockup/photos', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ tagline, industry }) })
      const j = await r.json().catch(() => ({ photos: [] }))
      setPhotos(j.photos ?? [])
      if (!j.photos?.length) { setPhotoId(null); setPhotoImg(null) }
    } finally { setSearching(false) }
  }

  const onOwnPhoto = async (file: File | undefined) => {
    if (!file) return
    if (file.size > 8 * 1024 * 1024) { setError('Please use a photo under 8 MB.'); return }
    try { setPhotoImg(await loadImage(URL.createObjectURL(file))); setPhotoId(-1); setError(null) } catch { setError('That file could not be read as an image.') }
  }

  const pickPhoto = async (p: StockPhoto | null) => {
    setPhotoId(p?.id ?? null)
    if (!p) { setPhotoImg(null); return }
    try { setPhotoImg(await loadImage(p.src)) } catch { setPhotoImg(null) }
  }

  // Render whenever an input changes
  const render = useCallback(() => {
    if (!ready) { setPreview(null); cleanRef.current = null; return }
    try {
      const W = 1200, H = Math.round(1200 / aspect)
      const creative = creativeRef.current ?? (creativeRef.current = document.createElement('canvas'))
      // no logo file: the brand name becomes the wordmark, in the colour the layout's text uses
      const dark = (() => { const n = parseInt(accent.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 < 0.5 })()
      const mark = logo ?? (brand.trim() ? wordmark(brand, template === 'poster' && photoImg ? '#ffffff' : dark ? '#ffffff' : '#111111') : null)
      drawCreative(creative, { width: W, height: Math.max(300, Math.min(H, 2000)), photo: photoImg, logo: mark, tagline: tagline.trim() || ' ', accent, template })
      let out: HTMLCanvasElement
      if (siteImg && face) out = composeOnSite(siteImg, creative, face)
      else { out = document.createElement('canvas'); out.width = creative.width; out.height = creative.height; out.getContext('2d')!.drawImage(creative, 0, 0) }
      cleanRef.current = out.toDataURL('image/png')
      setPreview(out.toDataURL('image/jpeg', 0.9))
      setError(null)
    } catch (e) {
      setError('Your browser could not build the preview. Try Chrome or Safari on a laptop.')
      console.error(e)
    }
  }, [ready, aspect, photoImg, logo, brand, tagline, accent, template, siteImg, face])
  useEffect(() => { const t = setTimeout(render, 150); return () => clearTimeout(t) }, [render])

  const download = () => {
    const url = cleanRef.current
    if (!url) return
    const a = document.createElement('a'); a.href = url; a.download = `ad-mockup-${site.slug}.png`; a.click()
  }

  const input = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none'
  const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? 'border-[#062068] bg-[#062068] text-white' : 'border-gray-200 bg-white text-gray-700'}`

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Your tagline</span>
          <input value={tagline} onChange={e => setTagline(e.target.value.slice(0, 60))} placeholder="e.g. Fresh coffee, 2 minutes from here" className={input} />
          <span className="mt-1 block text-xs text-gray-500">{60 - tagline.length} characters left</span>
        </label>

        <div>
          <span className="text-sm font-semibold text-gray-700">Your logo</span>
          <label className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 hover:border-mw-blue-400">
            <Upload className="h-5 w-5 flex-shrink-0 text-[#062068]" aria-hidden="true" />
            <span className="text-sm text-gray-700">{logoName ? logoName : 'Upload a PNG, SVG or JPG (under 2 MB)'}</span>
            <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" className="sr-only" onChange={e => onLogo(e.target.files?.[0])} />
          </label>
          <p className="mt-1 text-xs text-gray-500">Stays on your device until you download.</p>
          {!logo && (
            <label className="mt-3 block">
              <span className="text-sm font-semibold text-gray-700">No logo? Type your brand name</span>
              <input value={brand} onChange={e => setBrand(e.target.value.slice(0, 30))} placeholder="e.g. Jaosamut" className={input} />
              <span className="mt-1 block text-xs text-gray-500">We'll set it as a wordmark where the logo would go.</span>
            </label>
          )}
        </div>

        <div>
          <span className="text-sm font-semibold text-gray-700">Background photo <span className="font-normal text-gray-400">(optional)</span></span>
          <div className="mt-1 flex gap-2">
            <select value={industry} onChange={e => setIndustry(e.target.value)} className={`${input} mt-0 flex-1`} aria-label="Industry">
              <option value="">Industry…</option>
              {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
            </select>
            <button type="button" onClick={findPhotos} disabled={searching || (!tagline.trim() && !industry)} className="mw-tap inline-flex items-center gap-2 rounded-lg bg-[#062068] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {searching ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ImageIcon className="h-4 w-4" aria-hidden="true" />} Find photos
            </button>
          </div>
          {photos.length > 0 && (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              <li><button type="button" onClick={() => pickPhoto(null)} aria-pressed={photoId === null} className={`mw-tap flex aspect-[4/3] w-full items-center justify-center rounded-lg border-2 text-xs font-semibold ${photoId === null ? 'border-[#062068]' : 'border-gray-200'}`} style={{ background: accent, color: '#fff' }}>No photo</button></li>
              {photos.map(p => (
                <li key={p.id}>
                  <button type="button" onClick={() => pickPhoto(p)} aria-pressed={photoId === p.id} title={p.alt} className={`mw-tap block aspect-[4/3] w-full overflow-hidden rounded-lg border-2 ${photoId === p.id ? 'border-[#062068]' : 'border-gray-200'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.alt} className="h-full w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#062068] hover:underline">
            <Upload className="h-4 w-4" aria-hidden="true" /> or upload your own photo
            <input type="file" accept="image/*" className="sr-only" onChange={e => onOwnPhoto(e.target.files?.[0])} />
          </label>
          {photos.length > 0 && photoId != null && photoId !== -1 && (
            <p className="mt-1 text-xs text-gray-500">Photo by {photos.find(p => p.id === photoId)?.credit} on <a className="underline" href={photos.find(p => p.id === photoId)?.creditUrl} target="_blank" rel="noopener">Pexels</a></p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-gray-700">Layout</span>
          {TEMPLATES.map(t => <button key={t.id} type="button" aria-pressed={template === t.id} onClick={() => setTemplate(t.id)} className={chip(template === t.id)}>{t.label}</button>)}
        </div>

        <label className="flex items-center gap-3">
          <Palette className="h-5 w-5 text-[#062068]" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-700">Colour</span>
          <input type="color" value={accent} onChange={e => { setAccent(e.target.value); setCustomAccent(true) }} className="mw-tap h-10 w-14 cursor-pointer rounded border border-gray-300 bg-white p-1" aria-label="Accent colour" />
          <span className="text-xs text-gray-500">{customAccent ? 'Your pick' : logo ? 'Taken from your logo' : 'Default'}</span>
        </label>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </div>

      {/* Preview */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200" style={{ aspectRatio: siteImg && faceCorners ? `${siteImg.width} / ${siteImg.height}` : `${aspect}` }}>
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={`Preview of your ad on ${site.name}`} className="h-full w-full object-contain" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-gray-500">
              <ImageIcon className="mb-3 h-10 w-10 text-gray-300" aria-hidden="true" />
              <p className="text-sm">Type a tagline or add your logo to see your ad on {site.name}.</p>
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-gray-500">{faceCorners ? 'A preview of how your creative would look on this site. Final artwork is produced to the site’s specifications.' : 'Shown as a flat creative: the billboard face for this photo has not been marked yet.'}</p>
      </div>

      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} onSuccess={download} purpose="mockup-download" siteId={site.id} siteName={site.name}
        mockupDataUrl={cleanRef.current} title="Download your mock-up"
        intro={<>We’ll send the clean file to your screen now and keep a copy for our team, so we can quote <strong>{site.name}</strong> for you.</>}
        submitLabel="Get my mock-up" />
    </div>
  )
}
