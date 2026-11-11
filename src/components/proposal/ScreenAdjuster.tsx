'use client'

// One screen at a time, after approval (Rif, 12 Nov 2026): fit the ad to this
// photo (4 corners, a curved edge or 6 points, same tool as the site page) and,
// if this screen needs it, a file of its own at its own resolution. Previous /
// Next walks the plan without closing. Saving stores the screen's settings on
// the proposal so the client, sales and the planner see the same mock-up.

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Film, Monitor, Move, Check, RotateCcw, Ruler, Upload, X } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { Creative, ScreenOverride, SiteFace } from '@/lib/proposal/types'
import { useSiteMockup, faceFor } from '@/lib/mockup/render'
import { effectiveFor, faceToJson } from '@/lib/mockup/screens'
import { fitReport, isDigitalSite, ratioLabel, specSentence, templatePng, type Fit } from '@/lib/mockup/spec'
import { compressVideo } from '@/lib/mockup/compressVideo'
import type { Face } from '@/lib/mockup/compose'
import { CornerEditor } from '../inventory/CornerEditor'
import { fileToDataUrl } from './CreativePanel'

/** What Save sends: the face (or null = keep the marked one), the file for this screen (or null = the plan's), the fit. */
export type ScreenSave = { siteId: string; face: SiteFace | null; own: Creative['own']; ownFile?: string; fit: Fit | null; reset?: boolean }

const MAX_VIDEO_BYTES = 4 * 1024 * 1024
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-[#2563eb]'}`

export function ScreenAdjuster({ sites, faces, creative, index, onIndex, onClose, onSave }: {
  sites: PublicSite[]; faces: Record<string, SiteFace>; creative: Creative; index: number
  onIndex: (i: number) => void; onClose: () => void; onSave: (s: ScreenSave) => Promise<boolean>
}) {
  const site = sites[index]
  const eff = effectiveFor(site.id, faces[site.id], creative)
  const digital = isDigitalSite(site)
  // drafts, reset whenever the screen changes
  const [face, setFace] = useState<SiteFace | null>(eff.face)
  const [source, setSource] = useState<'plan' | 'own'>(eff.override?.own ? 'own' : 'plan')
  const [own, setOwn] = useState<Creative['own']>(eff.override?.own ?? null)
  const [ownFile, setOwnFile] = useState<string | undefined>(undefined)
  const [fit, setFit] = useState<Fit>(eff.override?.fit ?? creative.fit)
  const [adjusting, setAdjusting] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  useEffect(() => {
    const e = effectiveFor(site.id, faces[site.id], creative)
    setFace(e.face); setSource(e.override?.own ? 'own' : 'plan'); setOwn(e.override?.own ?? null); setOwnFile(undefined)
    setFit(e.override?.fit ?? creative.fit); setAdjusting(false); setNote(null); setError(null); setDirty(false)
  }, [site.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // the draft as the renderer sees it
  const draft: Creative = useMemo(() => {
    const base = { ...creative, screens: [] as ScreenOverride[] }
    if (source === 'own' && own) return { ...base, mode: 'own', own, fit }
    return creative.mode === 'own' ? { ...base, fit } : base
  }, [creative, source, own, fit])
  const m = useSiteMockup(site, face, draft, !adjusting)
  const planFile = creative.mode === 'own' && creative.own ? creative.own : null
  const report = (() => { const f = source === 'own' ? own : planFile; return f && f.width > 0 ? fitReport(f, m.spec, fit) : null })()
  const engineFace: Face | null = face ? faceFor(site, face) : null
  // the listed size and the screen in the photo should have the same shape; when they clearly don't
  // (e.g. a tall unipole listed as 2:1), say so: the artwork brief would be wrong, not just the mock-up
  const mismatch = m.photoAspect && m.spec.source !== 'photo' && Math.max(m.photoAspect, m.spec.ratio) / Math.min(m.photoAspect, m.spec.ratio) > 1.6

  const onFile = async (file: File | undefined) => {
    if (!file) return
    const video = file.type.startsWith('video/')
    if (video && !digital) { setError(`${site.name} is a printed board, so it shows a still image. Upload an image instead.`); return }
    setError(null); setBusy('read')
    try {
      if (video && file.size > MAX_VIDEO_BYTES) {
        const c = await compressVideo(file, { maxBytes: MAX_VIDEO_BYTES, maxSeconds: 15, onProgress: (d, t) => setNote(`Shrinking the video… ${Math.floor(d)} of ${Math.round(t)} s`) })
        setOwn({ url: c.dataUrl, kind: 'video', width: c.sourceWidth, height: c.sourceHeight, name: file.name }); setOwnFile(c.dataUrl)
        setNote(`Shrunk for the proposal: ${(c.bytes / 1048576).toFixed(1)} MB, ${Math.round(c.seconds)} s, no sound.`)
      } else {
        const d = await fileToDataUrl(file, video ? 'video' : 'image')
        setOwn({ url: d.url, kind: video ? 'video' : 'image', width: d.width, height: d.height, name: file.name }); setOwnFile(d.url); setNote(null)
      }
      setSource('own'); setDirty(true)
    } catch (e) { setError(e instanceof Error ? e.message : 'That file could not be read.') } finally { setBusy(null) }
  }
  const download = () => { const a = document.createElement('a'); a.href = templatePng(m.spec, site.name); a.download = `${site.slug}-template-${m.spec.width}x${m.spec.height}.png`; a.click() }
  const save = async (reset = false) => {
    setBusy(reset ? 'reset' : 'save'); setError(null)
    const faceChanged = !!face && faceToJson(face) !== faceToJson(faces[site.id] ?? face)
    const ok = await onSave(reset ? { siteId: site.id, face: null, own: null, fit: null, reset: true }
      : { siteId: site.id, face: faceChanged ? face : null, own: source === 'own' ? own : null, ownFile: source === 'own' ? ownFile : undefined, fit: fit !== creative.fit ? fit : null })
    setBusy(null)
    if (ok) { setDirty(false); setOwnFile(undefined); setNote(reset ? 'Back to the plan’s creative and the marked screen.' : 'Saved. Everyone opening the plan sees this screen like this.') }
    else setError('Could not save. Please try again.')
  }
  const go = (d: number) => { const i = index + d; if (i >= 0 && i < sites.length) onIndex(i) }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-white" role="dialog" aria-modal="true" aria-labelledby="adjust-title">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 sm:px-6">
        <span className="hidden text-sm font-semibold text-gray-500 sm:inline">Screen {index + 1} of {sites.length}</span>
        <h2 id="adjust-title" className="min-w-0 flex-1 truncate text-lg font-bold text-gray-900">{site.name}<span className="ml-2 text-sm font-normal text-gray-500">{[site.displayFormat ?? site.format, site.areaName].filter(Boolean).join(' · ')}</span></h2>
        <button type="button" onClick={onClose} aria-label="Close" className="mw-tap rounded-lg p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" aria-hidden="true" /></button>
      </div>

      <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-4 sm:p-6 lg:grid-cols-12">
        {/* the mock-up */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">
            {adjusting && engineFace && site.photos[0] && m.still ? (
              <CornerEditor photo={site.photos[0]} face={engineFace} onChange={f => { setFace({ corners: f.corners as [number, number][], edges: f.edges ?? null, seam: f.seam ?? null, kind: face?.kind ?? null }); setDirty(true) }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.still} alt={`The creative on ${site.name}`} className="block h-auto w-full" draggable={false} />
              </CornerEditor>
            ) : m.live ? (
              <canvas ref={m.liveRef} className="block h-auto w-full" aria-label={`Moving preview on ${site.name}`} />
            ) : m.still ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.still} alt={`The creative on ${site.name}`} className="block h-auto w-full" />
            ) : <div className="flex aspect-video items-center justify-center text-sm text-gray-500">{m.error ?? 'Building the preview…'}</div>}
          </div>
          {engineFace && (
            <button type="button" onClick={() => setAdjusting(a => !a)} aria-expanded={adjusting}
              className={`mw-tap mt-4 flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left text-white shadow-lg transition-colors ${adjusting ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2563eb] hover:bg-[#1d4ed8]'}`}>
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">{adjusting ? <Check className="h-5 w-5" aria-hidden="true" /> : <Move className="h-5 w-5" aria-hidden="true" />}</span>
              <span className="flex-1">
                <span className="block text-base font-bold">{adjusting ? 'Looks right — preview without the points' : 'Fit the ad to the screen'}</span>
                <span className="block text-sm text-white/80">{adjusting ? 'Tick “curved screen” or “bent screen (6 points)” under the photo if this screen needs it.' : 'Shows the points on this photo: drag the corners, curve an edge, or use 6 points for a bent screen.'}</span>
              </span>
            </button>
          )}
        </div>

        {/* this screen's facts and its creative */}
        <div className="space-y-5 lg:col-span-4">
          <div className="rounded-2xl border border-mw-blue-100 bg-mw-blue-50/60 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-gray-900"><Monitor className="h-4 w-4 text-[#2563eb]" aria-hidden="true" /> This screen</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-gray-800"><Ruler className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2563eb]" aria-hidden="true" /><span>{digital ? specSentence(m.spec, site.name) : specSentence(m.spec, site.name).replace('an image or video', 'an image')}</span></p>
            <p className="mt-1 text-xs text-gray-600">{digital ? 'Digital screen: image or video.' : 'Printed board: images only.'}</p>
            {mismatch && <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 ring-1 ring-amber-200">The listed size ({m.spec.ratioLabel}) doesn’t match the screen in this photo (about {ratioLabel(m.photoAspect!)}). Check this screen’s specifications with your planner before making artwork.</p>}
            <button type="button" onClick={download} className="mw-tap mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline"><Download className="h-4 w-4" aria-hidden="true" /> Blank template ({m.spec.width} × {m.spec.height} px)</button>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700">Creative on this screen</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" aria-pressed={source === 'plan'} onClick={() => { setSource('plan'); setDirty(true) }} className={chip(source === 'plan')}>The plan’s creative</button>
              <button type="button" aria-pressed={source === 'own'} onClick={() => { setSource('own'); setDirty(true) }} className={chip(source === 'own')}>Just for this screen</button>
            </div>
            {source === 'own' && (
              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 hover:border-mw-blue-400">
                {digital ? <Film className="h-5 w-5 flex-shrink-0 text-[#2563eb]" aria-hidden="true" /> : <Upload className="h-5 w-5 flex-shrink-0 text-[#2563eb]" aria-hidden="true" />}
                <span className="text-sm text-gray-700">{own?.name || (digital ? `Upload an image or video made at ${m.spec.width} × ${m.spec.height} px` : `Upload an image made at ${m.spec.width} × ${m.spec.height} px`)}</span>
                <input type="file" accept={digital ? 'image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime' : 'image/png,image/jpeg,image/webp'} className="sr-only" onChange={e => onFile(e.target.files?.[0])} />
              </label>
            )}
          </div>

          {report && (
            <div>
              <p className={`text-sm ${report.kind === 'exact' ? 'text-emerald-700' : 'text-gray-700'}`}>{report.text}</p>
              {report.kind !== 'exact' && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" aria-pressed={fit === 'letterbox'} onClick={() => { setFit('letterbox'); setDirty(true) }} className={chip(fit === 'letterbox')}>Keep whole (black bars)</button>
                  <button type="button" aria-pressed={fit === 'fill'} onClick={() => { setFit('fill'); setDirty(true) }} className={chip(fit === 'fill')}>Fill the screen (crop)</button>
                </div>
              )}
            </div>
          )}
          {source === 'plan' && creative.mode === 'make' && <p className="text-sm text-gray-600">The plan’s creative is drawn at this screen’s shape, so it always fills it.</p>}
          {note && <p className="text-sm text-emerald-700">{note}</p>}
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </div>

      {/* bottom bar */}
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 px-4 py-3 sm:px-6">
        <button type="button" onClick={() => go(-1)} disabled={index === 0} className="mw-tap inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40"><ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous</button>
        <button type="button" onClick={() => go(1)} disabled={index === sites.length - 1} className="mw-tap inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40">Next <ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
        <span className="ml-auto flex flex-wrap items-center gap-2">
          {eff.override && <button type="button" onClick={() => save(true)} disabled={busy !== null} className="mw-tap inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset this screen</button>}
          <button type="button" onClick={() => save(false)} disabled={busy !== null || !dirty || (source === 'own' && !own)} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-2.5 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50">{busy === 'save' ? 'Saving…' : busy === 'read' ? 'Reading the file…' : 'Save this screen'}</button>
        </span>
      </div>
    </div>
  )
}
