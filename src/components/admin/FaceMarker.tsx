'use client'

// Drag-the-corners tool for the ad mock-up. Points are fractions of the
// photo, so they work at any display size. The outline is drawn with the same
// facePoint() the renderer uses, so what you see is what the mock-up gets.

import { useEffect, useMemo, useRef, useState } from 'react'
import { faceOutline, type Face } from '@/lib/mockup/compose'

export type MarkerSite = {
  id: string; name: string; format: string; photo: string; path: string
  corners: [number, number][] | null; edges: [number, number][] | null; kind: 'led' | 'print' | null; saved: boolean
}

const DEFAULT: [number, number][] = [[0.3, 0.2], [0.7, 0.2], [0.7, 0.6], [0.3, 0.6]]
const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

export function FaceMarker({ sites, initialKey }: { sites: MarkerSite[]; initialKey: string }) {
  const [key, setKey] = useState(initialKey)
  useEffect(() => {
    try { if (initialKey) localStorage.setItem('mw-admin-key', initialKey); else setKey(localStorage.getItem('mw-admin-key') ?? '') } catch { /* private mode */ }
  }, [initialKey])
  return (
    <div className="mt-8 space-y-12">
      {sites.map(s => <One key={s.id} site={s} adminKey={key} />)}
    </div>
  )
}

function One({ site, adminKey }: { site: MarkerSite; adminKey: string }) {
  const [corners, setCorners] = useState<[number, number][]>(site.corners ?? DEFAULT)
  const [curved, setCurved] = useState(!!site.edges)
  const [edges, setEdges] = useState<[number, number][]>(site.edges ?? [mid(corners[0], corners[1]), mid(corners[1], corners[2]), mid(corners[2], corners[3]), mid(corners[3], corners[0])])
  const [kind, setKind] = useState<'led' | 'print'>(site.kind ?? (/led|digital|screen|panel|gantry/i.test(site.format) ? 'led' : 'print'))
  const [size, setSize] = useState<[number, number]>([800, 450])
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [zoom, setZoom] = useState(1)
  const box = useRef<HTMLDivElement>(null)
  const drag = useRef<{ kind: 'c' | 'e'; i: number } | null>(null)

  const face: Face = useMemo(() => ({ corners, edges: curved ? edges : null, kind }), [corners, edges, curved, kind])
  const W = size[0], H = size[1]
  const outline = useMemo(() => faceOutline(face, W, H, 32), [face, W, H])

  // when corners move with curved mode off, keep the midpoints on the straight edges
  useEffect(() => { if (!curved) setEdges([mid(corners[0], corners[1]), mid(corners[1], corners[2]), mid(corners[2], corners[3]), mid(corners[3], corners[0])]) }, [corners, curved])

  const toFrac = (e: PointerEvent | React.PointerEvent): [number, number] => {
    const r = box.current!.getBoundingClientRect()
    return [Math.min(1.05, Math.max(-0.05, (e.clientX - r.left) / r.width)), Math.min(1.05, Math.max(-0.05, (e.clientY - r.top) / r.height))]
  }
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.current) return
      const p = toFrac(e)
      if (drag.current.kind === 'c') setCorners(c => c.map((q, i) => (i === drag.current!.i ? p : q)))
      else setEdges(c => c.map((q, i) => (i === drag.current!.i ? p : q)))
      setDirty(true)
    }
    const up = () => { drag.current = null }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [])

  const call = async (body: Record<string, unknown>) => {
    const r = await fetch('/api/admin/faces', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-key': adminKey }, body: JSON.stringify(body) })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(j.error ?? `HTTP ${r.status}`)
    return j
  }
  const propose = async () => {
    setBusy(true); setMsg(null)
    try {
      const m = site.photo.match(/-(\d+)x(\d+)\.\w+$/)
      const j = await call({ action: 'propose', photo: site.photo, width: m ? Number(m[1]) : W, height: m ? Number(m[2]) : H })
      setCorners(j.corners); setCurved(false); setDirty(true); setMsg('AI proposal loaded — check and adjust, then save.')
    } catch (e) { setMsg(String((e as Error).message)) } finally { setBusy(false) }
  }
  const save = async () => {
    setBusy(true); setMsg(null)
    try {
      await call({ action: 'save', siteId: site.id, siteName: site.name, path: site.path, faceCorners: corners, faceEdges: curved ? edges : null, faceKind: kind })
      setDirty(false); setMsg('Saved to Sanity.')
    } catch (e) { setMsg(String((e as Error).message)) } finally { setBusy(false) }
  }

  const handle = (p: [number, number], color: string, onDown: () => void, label: string) => (
    <g key={label} transform={`translate(${p[0] * W} ${p[1] * H})`} style={{ cursor: 'grab' }} onPointerDown={e => { e.preventDefault(); onDown() }}>
      <circle r={9 / zoom} fill={color} stroke="#000" strokeWidth={1.5 / zoom} />
      <text x={12 / zoom} y={-8 / zoom} fontSize={14 / zoom} fontWeight="700" fill={color} stroke="#000" strokeWidth={0.4 / zoom}>{label}</text>
    </g>
  )

  return (
    <section className="rounded-2xl border border-gray-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{site.name} <span className="ml-2 text-sm font-normal text-gray-500">{site.format}</span></h2>
          <p className="text-xs text-gray-500">{site.saved ? 'Corners from Sanity' : 'Corners from the preview file (not saved yet)'} · <a className="underline" href={site.path} target="_blank" rel="noopener">open page</a></p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <label className="flex items-center gap-1"><input type="checkbox" checked={curved} onChange={e => { setCurved(e.target.checked); setDirty(true) }} style={{ appearance: 'auto' }} /> curved edges</label>
          <select value={kind} onChange={e => { setKind(e.target.value as 'led' | 'print'); setDirty(true) }} className="rounded border border-gray-300 px-2 py-1">
            <option value="led">LED / digital</option><option value="print">Printed</option>
          </select>
          <label className="flex items-center gap-1">zoom <input type="range" min={1} max={3} step={0.25} value={zoom} onChange={e => setZoom(Number(e.target.value))} /></label>
          <button type="button" onClick={propose} disabled={busy} className="mw-tap rounded-lg border border-[#062068] px-3 py-1.5 font-semibold text-[#062068] disabled:opacity-50">Ask AI</button>
          <button type="button" onClick={save} disabled={busy || !dirty} className="mw-tap rounded-lg bg-[#062068] px-3 py-1.5 font-semibold text-white disabled:opacity-50">Save</button>
        </div>
      </div>
      {msg && <p className="mt-2 text-sm text-gray-700">{msg}</p>}
      <div className="mt-4 overflow-auto rounded-xl border border-gray-200 bg-gray-50" style={{ maxHeight: '80vh' }}>
        <div ref={box} className="relative select-none" style={{ width: `${100 * zoom}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.photo} alt="" className="block w-full" draggable={false} onLoad={e => setSize([e.currentTarget.naturalWidth, e.currentTarget.naturalHeight])} />
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" style={{ touchAction: 'none' }}>
            <polygon points={outline.map(p => p.join(',')).join(' ')} fill="rgba(0,255,0,0.22)" stroke="#0f0" strokeWidth={2 / zoom} />
            {corners.map((p, i) => handle(p, '#ffee00', () => { drag.current = { kind: 'c', i } }, String(i + 1)))}
            {curved && edges.map((p, i) => handle(p, '#4fc3f7', () => { drag.current = { kind: 'e', i } }, ['T', 'R', 'B', 'L'][i]))}
          </svg>
        </div>
      </div>
    </section>
  )
}
