'use client'

// One site with the client's creative on its real photo: the still, or the
// moving preview when the creative is a video. Optional download of the clean
// PNG. Sites whose face has not been marked show the creative flat with a note.

import { Download, ImageIcon } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'
import type { Creative, SiteFace } from '@/lib/proposal/types'
import { useSiteMockup } from '@/lib/mockup/render'

export function SiteMockup({ site, face, creative, play = true, download = false, caption = true, cover = false, className = '' }: {
  site: PublicSite; face: SiteFace | null | undefined; creative: Creative | null; play?: boolean; download?: boolean; caption?: boolean
  /** A fixed 16:10 frame (photo cropped to fit) so cards in a row stay the same height; the download keeps the full photo. */
  cover?: boolean; className?: string
}) {
  const m = useSiteMockup(site, face, creative, play)
  const save = () => { const u = m.png(); if (!u) return; const a = document.createElement('a'); a.href = u; a.download = `${site.slug}-mockup.png`; a.click() }
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
      </div>
      {(caption || download) && (
        <figcaption className="mt-2 flex items-start justify-between gap-3">
          {caption && <span className="min-w-0 text-sm"><span className="block truncate font-semibold text-gray-900">{site.name}</span><span className="block truncate text-xs text-gray-500">{!m.face ? 'Screen not yet marked on this photo; shown flat' : m.stillFromVideo ? 'Printed board: a still from your video' : [site.displayFormat ?? site.format, site.areaName].filter(Boolean).join(' · ')}</span></span>}
          {download && m.still && <button type="button" onClick={save} className="mw-tap inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-mw-blue-400"><Download className="h-3.5 w-3.5" aria-hidden="true" /> PNG</button>}
        </figcaption>
      )}
    </figure>
  )
}
