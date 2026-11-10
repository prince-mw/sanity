'use client'

// "See your ad here": the visitor drops a logo and a tagline, we build an ad
// (optional stock photo, generic layout, their colour) and put it on this
// billboard's real photo. Watermarked preview is free; the clean download
// opens the lead form (LeadForm) and is released only after it succeeds, with
// the file attached to the lead. Everything happens in the browser; the logo
// is never uploaded unless they submit the form.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Upload, Image as ImageIcon, Palette, RefreshCw, Move, Lock, Mail, Send, Check, Unlock } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { SiteContent } from '@/lib/inventory/siteContent'
import type { Face } from '@/lib/mockup/compose'
import { aspectFromSize, faceAspect, composeOnSite, drawCreative, loadImage, sampleAccent, wordmark, type Template } from '@/lib/mockup/compose'
import { LeadForm, type LeadResult } from '../forms/LeadForm'
import { CornerEditor } from './CornerEditor'

type StockPhoto = { id: number; src: string; thumb: string; alt: string; credit: string; creditUrl: string }

const TEMPLATES: { id: Template; label: string }[] = [
  { id: 'band', label: 'Photo + band' }, { id: 'split', label: 'Split' }, { id: 'poster', label: 'Poster' },
]
const INDUSTRIES = ['Retail', 'Food & beverage', 'Property', 'Automotive', 'Finance', 'Telco & tech', 'Travel', 'Beauty', 'Entertainment', 'Education', 'Healthcare', 'Other']

export function AdMockup({ site, content }: { site: PublicSite; content: Pick<SiteContent, 'faceCorners' | 'faceEdges' | 'faceKind'> }) {
  const faceCorners = content.faceCorners
  const initialFace: Face | null = useMemo(() => faceCorners ? { corners: faceCorners, edges: content.faceEdges ?? null, kind: content.faceKind ?? (/led|digital|screen|panel|gantry/i.test(`${site.displayFormat} ${site.format}`) ? 'led' : 'print') } : null, [faceCorners, content.faceEdges, content.faceKind, site])
  // the visitor may nudge the corners for their own mock-up
  const [faceOverride, setFaceOverride] = useState<Face | null>(null)
  const [adjusting, setAdjusting] = useState(false)
  const face = faceOverride ?? initialFace
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
  // One mock-up per person: 'loading' → 'none' (not registered) | 'this' (this site unlocked) | 'other' (used on another site)
  type Owner = { name: string; email: string | null } | null
  const [access, setAccess] = useState<{ state: 'loading' | 'none' | 'this' | 'other'; siteName?: string; owner?: Owner; tester?: boolean }>({ state: 'loading' })
  const [thanks, setThanks] = useState<{ owner: Owner } | null>(null)
  const [sent, setSent] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [sentPopup, setSentPopup] = useState(false)
  useEffect(() => {
    fetch(`/api/mockup/access?site=${encodeURIComponent(site.id)}`).then(r => r.json()).then(j => setAccess({ state: j.state, siteName: j.siteName, owner: j.owner, tester: !!j.tester })).catch(() => setAccess({ state: 'none' }))
  }, [site.id])
  const unlocked = access.state === 'this'
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

  const registered = (r: LeadResult & { tester?: boolean }) => {
    setAccess({ state: 'this', siteName: site.name, owner: r.owner ?? null, tester: !!r.tester })
    if (!r.tester) setThanks({ owner: r.owner ?? null })
  }
  const sendUpdate = async () => {
    if (!cleanRef.current) return
    setSent('sending')
    const r = await fetch('/api/mockup/update', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ siteId: site.id, mockup: cleanRef.current }) }).catch(() => null)
    setSent(r?.ok ? 'done' : 'failed')
    if (r?.ok) setSentPopup(true)
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
              {photos.slice(0, 3).map(p => (
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
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200" style={unlocked && adjusting && face ? undefined : { aspectRatio: siteImg && faceCorners ? `${siteImg.width} / ${siteImg.height}` : `${aspect}` }}>
          {preview && !unlocked && access.state !== 'loading' && (
            // the ad is drawn but hidden until they register (or they used their one mock-up elsewhere)
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 p-6 text-center backdrop-blur-md">
              <Lock className="mb-3 h-8 w-8 text-[#062068]" aria-hidden="true" />
              {access.state === 'other' ? (
                <>
                  <p className="max-w-sm text-sm font-semibold text-gray-900">You've already made a mock-up for {access.siteName}.</p>
                  <p className="mt-1 max-w-sm text-sm text-gray-600">Want to see your ad on {site.name} too? {access.owner?.name ? <>{access.owner.name} can do that for you{access.owner.email ? <>: <a className="underline" href={`mailto:${access.owner.email}`}>{access.owner.email}</a></> : '.'}</> : 'Our team can do that for you.'}</p>
                </>
              ) : (
                <>
                  <p className="max-w-sm text-sm font-semibold text-gray-900">Your ad is ready to see on {site.name}.</p>
                  <p className="mt-1 max-w-sm text-sm text-gray-600">Register once and we'll show it here, email it to you, and put you in touch with the person who can book this site.</p>
                  <button type="button" onClick={() => setFormOpen(true)} className="mw-tap mt-4 inline-flex items-center gap-2 rounded-lg bg-[#062068] px-5 py-2.5 font-semibold text-white hover:bg-[#0a2a8a]">Show my mock-up</button>
                </>
              )}
            </div>
          )}
          {preview && unlocked && adjusting && face && site.photos[0] ? (
            // the points sit on the mock-up itself; dragging re-renders it live
            <CornerEditor photo={site.photos[0]} face={face} onChange={setFaceOverride}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt={`Preview of your ad on ${site.name}`} className="block h-auto w-full" draggable={false} />
            </CornerEditor>
          ) : preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={`Preview of your ad on ${site.name}`} className={`h-full w-full object-contain ${unlocked ? '' : 'blur-xl scale-105'}`} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-gray-500">
              <ImageIcon className="mb-3 h-10 w-10 text-gray-300" aria-hidden="true" />
              <p className="text-sm">Type a tagline or add your logo to see your ad on {site.name}.</p>
            </div>
          )}
        </div>
        {/* The fit: the one control that makes or breaks the mock-up, so it is the main action under the preview */}
        {unlocked && face && site.photos[0] && (
          <div className="mt-4">
            <button type="button" onClick={() => setAdjusting(a => !a)} aria-expanded={adjusting}
              className={`mw-tap flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left text-white shadow-lg transition-colors ${adjusting ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#062068] hover:bg-[#0a2a8a]'}`}>
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">{adjusting ? <Check className="h-5 w-5" aria-hidden="true" /> : <Move className="h-5 w-5" aria-hidden="true" />}</span>
              <span className="flex-1">
                <span className="block text-base font-bold">{adjusting ? 'Looks right — preview without the points' : 'Fit the ad to the screen'}</span>
                <span className="block text-sm text-white/80">{adjusting ? 'Press when the ad sits exactly on the screen.' : 'Shows the corner points on your mock-up; drag them and the ad follows.'}</span>
              </span>
            </button>
          </div>
        )}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">{face ? 'A preview of how your creative would look on this site. Final artwork is produced to the site’s specifications.' : 'Shown as a flat creative: the screen in this photo has not been located yet.'}</p>
        </div>
        {unlocked && preview && (
          <button type="button" onClick={sendUpdate} disabled={sent === 'sending'} aria-live="polite"
            className="mw-tap mt-3 flex w-full items-center gap-3 rounded-xl border-2 border-[#062068] bg-white px-5 py-4 text-left text-[#062068] transition-colors hover:bg-mw-blue-50 disabled:opacity-60">
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-mw-blue-50"><Send className="h-5 w-5" aria-hidden="true" /></span>
            <span className="flex-1">
              <span className="block text-base font-bold">{sent === 'sending' ? 'Sending…' : sent === 'done' ? 'Sent — check your inbox' : sent === 'failed' ? 'Could not send — try again' : 'Send to our team'}</span>
              <span className="block text-sm text-[#062068]/70">{sent === 'done' ? 'You can keep editing and send a new version any time.' : 'We email you this exact version, with the details of the person who books this site.'}</span>
            </span>
          </button>
        )}
      </div>

      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} onSuccess={registered} closeOnSuccess purpose="mockup" siteId={site.id} siteName={site.name}
        onAlreadyUsed={info => setAccess({ state: 'other', siteName: info.siteName, owner: info.owner ?? null })}
        mockupDataUrl={cleanRef.current} title="See your ad on this screen"
        intro={<>One registration shows you your ad on <strong>{site.name}</strong>, emails it to you, and connects you with the person who books this site.</>}
        submitLabel="Show my mock-up" />

      {thanks && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="mockup-thanks-title" onClick={e => { if (e.target === e.currentTarget) setThanks(null) }}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Unlock className="h-6 w-6" aria-hidden="true" /></span>
            <h2 id="mockup-thanks-title" className="text-xl font-bold text-[#062068]">Your mock-up is unlocked</h2>
            <p className="mt-2 text-gray-700">See your ad on {site.name} below. Change the words, logo, photo or layout as often as you like.</p>
            <ol className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex gap-3"><span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#062068] text-xs font-bold text-white">1</span><span>Use <strong>Fit the ad to the screen</strong> if the ad isn't sitting exactly on the screen.</span></li>
              <li className="flex gap-3"><span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#062068] text-xs font-bold text-white">2</span><span>When you're happy, press <strong>Send to our team</strong>: we email you that version{thanks.owner?.name ? <> together with the details of <strong>{thanks.owner.name}</strong>, who books this site</> : <> with the details of the person who books this site</>}.</span></li>
            </ol>
            <button type="button" onClick={() => setThanks(null)} className="mw-tap mt-5 w-full rounded-lg bg-[#062068] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2a8a]">Show me my ad</button>
          </div>
        </div>
      )}

      {sentPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="mockup-sent-title" onClick={e => { if (e.target === e.currentTarget) setSentPopup(false) }}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mw-blue-50 text-[#062068]"><Mail className="h-6 w-6" aria-hidden="true" /></span>
            <h2 id="mockup-sent-title" className="text-xl font-bold text-[#062068]">Sent — check your inbox</h2>
            <p className="mt-2 text-gray-700">This version of your ad on {site.name} is on its way to your email{access.owner?.name ? <>, together with a note from <strong>{access.owner.name}</strong>{access.owner.email ? <> ({access.owner.email})</> : null}, who looks after this site</> : ', with the details of the person who books this site'}.</p>
            <p className="mt-2 text-sm text-gray-600">Changed your mind? Keep editing and send again.</p>
            <button type="button" onClick={() => setSentPopup(false)} className="mw-tap mt-5 w-full rounded-lg bg-[#062068] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2a8a]">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
