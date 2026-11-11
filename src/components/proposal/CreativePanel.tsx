'use client'

// The creative for a proposal's mock-ups, edited by sales in the editor or by
// the client after approval: our layout from logo/brand + tagline, or their
// own image or video as is. Previews live on the lead site; Save stores it on
// the proposal (files as data URLs; images are downsized here first so the
// request stays small).

import { useMemo, useState } from 'react'
import { Film, Palette, Ruler, Upload, Wand2 } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { Creative, SiteFace } from '@/lib/proposal/types'
import { loadImage, sampleAccent } from '@/lib/mockup/compose'
import { creativeSpec, fitReport, specSentence } from '@/lib/mockup/spec'
import { SiteMockup } from './SiteMockup'

export type CreativePayload = { creative: Partial<Creative> & { logo?: string; ownFile?: string }; }

const TEMPLATES: { id: Creative['template']; label: string }[] = [{ id: 'band', label: 'Band' }, { id: 'split', label: 'Split' }, { id: 'poster', label: 'Poster' }]
const MAX_VIDEO_MB = 4.5
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white text-gray-700'}`
const input = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none'

/** A file as a data URL; images are downsized to 1920 px on the long side (logos keep PNG for transparency). */
async function fileToDataUrl(file: File, kind: 'logo' | 'image' | 'video'): Promise<{ url: string; width: number; height: number }> {
  if (kind === 'video') {
    const url = await new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = () => rej(r.error); r.readAsDataURL(file) })
    const v = document.createElement('video'); v.src = URL.createObjectURL(file)
    await new Promise<void>((res, rej) => { v.onloadedmetadata = () => res(); v.onerror = () => rej(new Error('video')) })
    return { url, width: v.videoWidth, height: v.videoHeight }
  }
  const img = await loadImage(URL.createObjectURL(file))
  const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height
  const s = Math.min(1, 1920 / Math.max(w, h))
  if (s === 1 && file.size < 1.5 * 1024 * 1024) {
    const url = await new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = () => rej(r.error); r.readAsDataURL(file) })
    return { url, width: w, height: h }
  }
  const c = document.createElement('canvas'); c.width = Math.round(w * s); c.height = Math.round(h * s)
  c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
  return { url: kind === 'logo' ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.9), width: w, height: h }
}

export function CreativePanel({ site, face, initial, who, onSave, saving = false, note }: {
  site: PublicSite; face: SiteFace | null | undefined; initial: Creative | null; who: 'staff' | 'client'
  onSave: (payload: CreativePayload) => Promise<boolean>; saving?: boolean; note?: string | null
}) {
  const [mode, setMode] = useState<Creative['mode']>(initial?.mode ?? 'make')
  const [brand, setBrand] = useState(initial?.brand ?? '')
  const [tagline, setTagline] = useState(initial?.tagline ?? '')
  const [accent, setAccent] = useState(initial?.accent ?? '#1B1E2B')
  const [template, setTemplate] = useState<Creative['template']>(initial?.template ?? 'band')
  const [logoUrl, setLogoUrl] = useState<string | null>(initial?.logoUrl ?? null)   // existing URL or a new data URL
  const [logoNew, setLogoNew] = useState<string | null>(null)
  const [own, setOwn] = useState<Creative['own']>(initial?.own ?? null)
  const [ownNew, setOwnNew] = useState<string | null>(null)
  const [fit, setFit] = useState<Creative['fit']>(initial?.fit ?? 'letterbox')
  const [error, setError] = useState<string | null>(null)
  const [reading, setReading] = useState(false)

  const spec = useMemo(() => creativeSpec({ resolution: site.specs?.resolution, size: site.size, formatFallback: /unipole|portrait|panel|kiosk/i.test(`${site.displayFormat} ${site.format}`) ? 0.6 : 2 }), [site])
  const fitInfo = own && own.width > 0 ? fitReport(own, spec, fit) : null
  const draft: Creative | null = useMemo(() => {
    const base = { brand, tagline, accent, template, fit, by: who, byName: '', at: '' }
    if (mode === 'own') return own ? { ...base, mode: 'own', logoUrl: null, own } : null
    return brand || tagline || logoUrl ? { ...base, mode: 'make', logoUrl, own: null } : null
  }, [mode, brand, tagline, accent, template, fit, logoUrl, own, who])

  const onLogo = async (file: File | undefined) => {
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setError('Please use a logo under 2 MB.'); return }
    setReading(true)
    try { const d = await fileToDataUrl(file, 'logo'); setLogoUrl(d.url); setLogoNew(d.url); setError(null); try { setAccent(sampleAccent(await loadImage(d.url))) } catch { /* keep */ } }
    catch { setError('That file could not be read as an image.') } finally { setReading(false) }
  }
  const onOwn = async (file: File | undefined) => {
    if (!file) return
    const video = file.type.startsWith('video/')
    if (video && file.size > MAX_VIDEO_MB * 1024 * 1024) { setError(`Videos in a proposal are limited to ${MAX_VIDEO_MB} MB here. A 10-second 1080p H.264 clip at 3 Mbps is about 4 MB; or send the file to your planner.`); return }
    if (!video && file.size > 15 * 1024 * 1024) { setError('Please use an image under 15 MB.'); return }
    setReading(true)
    try { const d = await fileToDataUrl(file, video ? 'video' : 'image'); setOwn({ url: d.url, kind: video ? 'video' : 'image', width: d.width, height: d.height, name: file.name }); setOwnNew(d.url); setError(null) }
    catch { setError(video ? 'That video could not be read. Use an MP4 (H.264) or WebM file.' : 'That file could not be read as an image.') } finally { setReading(false) }
  }
  const save = async () => {
    if (!draft) { setError(mode === 'own' ? 'Upload an image or a video.' : 'Add a logo, a brand name or a tagline.'); return }
    setError(null)
    const ok = await onSave({ creative: { mode, brand, tagline, accent, template, fit, logoUrl: logoNew ? null : logoUrl, logo: logoNew ?? undefined, own: own ? { ...own, url: ownNew ? '' : own.url } : null, ownFile: ownNew ?? undefined } })
    if (ok) { setLogoNew(null); setOwnNew(null) }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-5 lg:col-span-5">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1" role="tablist" aria-label="Kind of creative">
          <button type="button" role="tab" aria-selected={mode === 'make'} onClick={() => setMode('make')} className={`mw-tap inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${mode === 'make' ? 'bg-white text-[#2563eb] shadow' : 'text-gray-600'}`}><Wand2 className="h-4 w-4" aria-hidden="true" /> Logo + tagline</button>
          <button type="button" role="tab" aria-selected={mode === 'own'} onClick={() => setMode('own')} className={`mw-tap inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${mode === 'own' ? 'bg-white text-[#2563eb] shadow' : 'text-gray-600'}`}><Film className="h-4 w-4" aria-hidden="true" /> Finished creative</button>
        </div>

        {mode === 'make' ? (
          <>
            <div>
              <span className="text-sm font-semibold text-gray-700">Logo</span>
              <label className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 hover:border-mw-blue-400">
                <Upload className="h-5 w-5 flex-shrink-0 text-[#2563eb]" aria-hidden="true" />
                <span className="text-sm text-gray-700">{logoUrl ? 'Logo added — upload another to replace it' : 'Upload a PNG, SVG or JPG (under 2 MB)'}</span>
                <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" className="sr-only" onChange={e => onLogo(e.target.files?.[0])} />
              </label>
            </div>
            <label className="block"><span className="text-sm font-semibold text-gray-700">Brand name <span className="font-normal text-gray-400">(used as a wordmark when there is no logo)</span></span>
              <input value={brand} onChange={e => setBrand(e.target.value.slice(0, 30))} className={input} placeholder="e.g. Example Beauty Co." /></label>
            <label className="block"><span className="text-sm font-semibold text-gray-700">Tagline</span>
              <input value={tagline} onChange={e => setTagline(e.target.value.slice(0, 60))} className={input} placeholder="e.g. The scent of the city" />
              <span className="mt-1 block text-xs text-gray-500">{60 - tagline.length} characters left</span></label>
            <div className="flex flex-wrap items-center gap-2"><span className="mr-1 text-sm font-semibold text-gray-700">Layout</span>{TEMPLATES.map(t => <button key={t.id} type="button" aria-pressed={template === t.id} onClick={() => setTemplate(t.id)} className={chip(template === t.id)}>{t.label}</button>)}</div>
            <label className="flex items-center gap-3"><Palette className="h-5 w-5 text-[#2563eb]" aria-hidden="true" /><span className="text-sm font-semibold text-gray-700">Colour</span>
              <input type="color" value={accent} onChange={e => setAccent(e.target.value)} className="mw-tap h-10 w-14 cursor-pointer rounded border border-gray-300 bg-white p-1" aria-label="Accent colour" /></label>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-mw-blue-100 bg-mw-blue-50/60 p-4">
              <p className="flex items-start gap-2 text-sm text-gray-800"><Ruler className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2563eb]" aria-hidden="true" /><span>{specSentence(spec, site.name)} Every other site in the plan is fitted from this file too.</span></p>
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 hover:border-mw-blue-400">
              <Upload className="h-5 w-5 flex-shrink-0 text-[#2563eb]" aria-hidden="true" />
              <span className="text-sm text-gray-700">{own?.name || `Upload an image (under 15 MB) or a video (MP4/WebM, under ${MAX_VIDEO_MB} MB)`}</span>
              <input type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime" className="sr-only" onChange={e => onOwn(e.target.files?.[0])} />
            </label>
            {fitInfo && (
              <div>
                <p className={`text-sm ${fitInfo.kind === 'exact' ? 'text-emerald-700' : 'text-gray-700'}`}>{fitInfo.text}</p>
                {fitInfo.kind !== 'exact' && <div className="mt-2 flex flex-wrap gap-2"><button type="button" aria-pressed={fit === 'letterbox'} onClick={() => setFit('letterbox')} className={chip(fit === 'letterbox')}>Keep whole (black bars)</button><button type="button" aria-pressed={fit === 'fill'} onClick={() => setFit('fill')} className={chip(fit === 'fill')}>Fill the screen (crop)</button></div>}
              </div>
            )}
          </>
        )}
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={save} disabled={saving || reading || !draft} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{saving ? 'Saving…' : reading ? 'Reading the file…' : who === 'staff' ? 'Save the creative' : 'Use this creative'}</button>
          {note && <span className="text-sm text-gray-500">{note}</span>}
        </div>
      </div>
      <div className="lg:col-span-7">
        <SiteMockup site={site} face={face} creative={draft} play download={false} />
        <p className="mt-2 text-xs text-gray-500">Previewed on {site.name}, the lead site. {who === 'staff' ? 'The client page opens with this on the lead site; every site shows it once they approve.' : 'Once saved, every site in your plan shows it.'}</p>
      </div>
    </div>
  )
}
