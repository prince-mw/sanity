'use client'

// "Fit the ad to the screen": the handles sit on the rendered mock-up itself
// (passed in as children), so dragging a corner moves the ad live. Released
// corners snap onto the real screen edge in the photo's pixels (read through
// the proxy). Only this visitor's mock-up changes; nothing is written anywhere.

import { useEffect, useMemo, useRef, useState } from 'react'
import { faceOutline, type Face } from '@/lib/mockup/compose'
import { snapQuad } from '@/lib/mockup/snap'

const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

export function CornerEditor({ photo, face, onChange, children }: { photo: string; face: Face; onChange: (f: Face) => void; children: React.ReactNode }) {
  const [size, setSize] = useState<[number, number]>([800, 450])
  const [curved, setCurved] = useState(!!face.edges)
  const [six, setSix] = useState(!!face.seam)
  const box = useRef<HTMLDivElement>(null)
  const pixels = useRef<ImageData | null>(null)
  const drag = useRef<{ kind: 'c' | 'e' | 's'; i: number } | null>(null)
  const faceRef = useRef(face); faceRef.current = face
  const W = size[0], H = size[1]
  const edges = face.edges ?? [mid(face.corners[0], face.corners[1]), mid(face.corners[1], face.corners[2]), mid(face.corners[2], face.corners[3]), mid(face.corners[3], face.corners[0])]
  const seam = face.seam ?? [mid(face.corners[0], face.corners[1]), mid(face.corners[3], face.corners[2])]
  const outline = useMemo(() => faceOutline({ ...face, edges: curved && !six ? edges : null, seam: six ? seam : null }, W, H, 32), [face, edges, seam, curved, six, W, H])

  // the photo's pixels, through the same-origin proxy, for snapping
  useEffect(() => {
    const img = new Image(); img.crossOrigin = 'anonymous'
    img.onload = () => { const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; const g = c.getContext('2d', { willReadFrequently: true })!; g.drawImage(img, 0, 0); pixels.current = g.getImageData(0, 0, c.width, c.height); setSize([c.width, c.height]) }
    img.src = `/api/mockup/photo?u=${encodeURIComponent(photo)}`
  }, [photo])

  const toFrac = (e: PointerEvent): [number, number] => {
    const r = box.current!.getBoundingClientRect()
    return [Math.min(1.05, Math.max(-0.05, (e.clientX - r.left) / r.width)), Math.min(1.05, Math.max(-0.05, (e.clientY - r.top) / r.height))]
  }
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.current) return
      const p = toFrac(e), f = faceRef.current
      if (drag.current.kind === 'c') onChange({ ...f, corners: f.corners.map((q, i) => (i === drag.current!.i ? p : q)) })
      else if (drag.current.kind === 's') {
        const cur = f.seam ?? [mid(f.corners[0], f.corners[1]), mid(f.corners[3], f.corners[2])]
        onChange({ ...f, seam: cur.map((q, i) => (i === drag.current!.i ? p : q)) })
      } else {
        const cur = f.edges ?? [mid(f.corners[0], f.corners[1]), mid(f.corners[1], f.corners[2]), mid(f.corners[2], f.corners[3]), mid(f.corners[3], f.corners[0])]
        onChange({ ...f, edges: cur.map((q, i) => (i === drag.current!.i ? p : q)) })
      }
    }
    const up = () => {
      if (drag.current?.kind === 'c' && pixels.current) {
        const px = pixels.current, f = faceRef.current
        const { quad } = snapQuad(px, f.corners.map(([x, y]) => [x * px.width, y * px.height]), 8)
        onChange({ ...f, corners: quad.map(([x, y]) => [x / px.width, y / px.height]) })
      }
      drag.current = null
    }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [onChange])

  const handle = (p: [number, number], color: string, kind: 'c' | 'e' | 's', i: number) => (
    <g key={`${kind}${i}`} transform={`translate(${p[0] * W} ${p[1] * H})`} style={{ cursor: 'grab', touchAction: 'none' }}
      onPointerDown={e => { e.preventDefault(); drag.current = { kind, i } }}>
      <circle r={Math.max(10, W / 60)} fill={color} fillOpacity={0.85} stroke="#000" strokeWidth={1.5} />
    </g>
  )

  return (
    <div>
      <div ref={box} className="relative select-none">
        {children}
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" style={{ touchAction: 'none' }}>
          <polygon points={outline.map(p => p.join(',')).join(' ')} fill="none" stroke="#00ff44" strokeWidth={Math.max(1.5, W / 500)} strokeDasharray={`${W / 80} ${W / 120}`} />
          {face.corners.map((p, i) => handle(p, '#ffee00', 'c', i))}
          {curved && !six && edges.map((p, i) => handle(p, '#4fc3f7', 'e', i))}
          {six && seam.map((p, i) => handle(p, '#ff7ab6', 's', i))}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-gray-600">Drag the yellow dots onto the screen's corners; they snap to the edge when you let go.</span>
        <span className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1 text-gray-700"><input type="checkbox" checked={curved} disabled={six} onChange={e => { setCurved(e.target.checked); onChange({ ...face, edges: e.target.checked ? edges : null }) }} style={{ appearance: 'auto' }} /> curved screen</label>
          <label className="flex items-center gap-1 text-gray-700"><input type="checkbox" checked={six} onChange={e => { setSix(e.target.checked); if (e.target.checked) setCurved(false); onChange({ ...face, edges: null, seam: e.target.checked ? seam : null }) }} style={{ appearance: 'auto' }} /> bent screen (6 points)</label>
        </span>
      </div>
    </div>
  )
}
