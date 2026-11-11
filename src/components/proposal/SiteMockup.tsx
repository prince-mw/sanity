'use client'

// One site with the client's creative on its real photo: the still, or the
// moving preview when the creative is a video. Optional download of the clean
// PNG. Sites whose face has not been marked show the creative flat with a note.
// With `onAdjust` (after approval) the card shows how the file sits on this
// screen and opens the per-screen adjuster (Rif, 12 Nov 2026).

import { Download, ImageIcon, SlidersHorizontal } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { Creative, SiteFace } from '@/lib/proposal/types'
import { useSiteMockup } from '@/lib/mockup/render'
import { effectiveFor } from '@/lib/mockup/screens'

type Tag = { label: string; tone: 'ok' | 'warn' | 'info' }

export function SiteMockup({ site, face, creative, play = true, download = false, caption = true, cover = false, className = '', onAdjust }: {
  site: PublicSite; face: SiteFace | null | undefined; creative: Creative | null; play?: boolean; download?: boolean; caption?: boolean
  /** A fixed 16:10 frame (photo cropped to fit) so cards in a row stay the same height; the download keeps the full photo. */
  cover?: boolean; className?: string
  /** Shows the status tag and the "Adjust this screen" button. */
  onAdjust?: () => void
}) {
  const eff = effectiveFor(site.id, face, creative)
  const m = useSiteMockup(site, eff.face, eff.creative, play)
  const save = () => { const u = m.png(); if (!u) return; const a = document.createElement('a'); a.href = u; a.download = `${site.slug}-mockup.png`; a.click() }
  const tag: Tag | null = !onAdjust || !eff.creative ? null
    : eff.override ? { label: 'Adjusted', tone: 'info' }
    : m.stillFromVideo ? { label: 'Still from video', tone: 'warn' }
    : m.fit?.kind === 'bars' ? { label: 'Black bars', tone: 'warn' }
    : m.fit?.kind === 'crop' ? { label: 'Cropped', tone: 'warn' }
    : { label: 'Fits', tone: 'ok' }
  const toneCls = { ok: 'bg-emerald-50 text-emerald-800 ring-emerald-200', warn: 'bg-amber-50 text-amber-900 ring-amber-200', info: 'bg-mw-blue-50 text-[#1d4ed8] ring-mw-blue-200' }
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200 ${cover ? 'aspect-[16/10]' : ''}`} style={!cover && !(m.face && m.still) ? { aspectRatio: '16 / 9' } : undefined}>
        {m.live ? (
          <canvas ref={m.liveRef} className={cover ? 'absolute inset-0 h-full w-full object-cover' : 'block h-auto w-full'} aria-label={`Moving preview of the creative on ${site.name}`} />
        ) : m.still ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.still} alt={`The creative on ${site.name}`} className={cover ? 'absolute inset-0 h-full w-full object-cover' : 'block h-auto w-full'} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-gray-500">
            <ImageIcon className="mb-2 h-8 w-8 text-gray-300" aria-hidden="true" />
            <p className="text-xs">{m.error ?? (creative ? 'Building the preview…' : 'No creative yet.')}</p>
          </div>
        )}
        {tag && <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${toneCls[tag.tone]}`}>{tag.label}</span>}
      </div>
      {(caption || download || onAdjust) && (
        <figcaption className="mt-2">
          {caption && <span className="block min-w-0 text-sm"><span className="block truncate font-semibold text-gray-900">{site.name}</span><span className="block truncate text-xs text-gray-500">{!m.face ? 'Screen not yet marked on this photo; shown flat' : m.stillFromVideo ? 'Printed board: a still from your video' : [site.displayFormat ?? site.format, site.areaName].filter(Boolean).join(' · ')}</span></span>}
          {(onAdjust || (download && m.still)) && (
            <span className="mt-2 flex items-center gap-2 no-print">
              {onAdjust && <button type="button" onClick={onAdjust} className="mw-tap inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]"><SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Adjust this screen</button>}
              {download && m.still && <button type="button" onClick={save} aria-label={`Download the mock-up of ${site.name} as PNG`} className="mw-tap inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-mw-blue-400"><Download className="h-4 w-4" aria-hidden="true" /> PNG</button>}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
