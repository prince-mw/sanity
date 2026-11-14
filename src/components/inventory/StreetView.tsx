'use client'

// Google Street View for sites without a photo (Rif, 14 Nov 2026). Uses Google's
// own services only: the Street View Static API for a still image and the Maps
// Embed API for the viewer, loaded straight from Google in the visitor's browser
// (never through our image optimiser, never stored), with Google's attribution
// and our "Street View" label so nobody mistakes it for a photo of the face.
// Without NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY both render nothing.

import { useEffect, useRef, useState } from 'react'
import { Move, RotateCcw } from 'lucide-react'
import type { PublicSite } from '@/lib/inventory/types'

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY
export const streetViewEnabled = !!KEY

type SV = NonNullable<PublicSite['streetView']>
const year = (d: string | null) => (d ? d.slice(0, 4) : null)

function Label({ sv }: { sv: SV }) {
  return (
    <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
      Street View{year(sv.date) ? ` · ${year(sv.date)}` : ''}
    </span>
  )
}

/**
 * Street View points the camera at the map pin, and pins can be off (Rif,
 * 14 Nov 2026), so the screen may be just out of frame. Cards say so with a
 * small "Look around" chip; the page explains it once (StreetViewNote); the
 * Details viewer shows how to find it (StreetViewEmbed).
 */
export function StreetViewNote({ className = '' }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-sm text-gray-600 ${className}`}>
      <Move className="mt-0.5 h-4 w-4 flex-shrink-0 text-mw-blue-600" aria-hidden="true" />
      <span>Sites marked <strong className="font-semibold text-gray-800">Street View</strong> don&apos;t have a photo yet, so we show Google Street View of the spot. The camera may not face the screen: open Details and drag the view to find it.</span>
    </p>
  )
}

/** A still Street View image filling its (relative) parent; falls back to `fallback` if Google has none. */
export function StreetViewImage({ sv, alt, fallback = null, width = 640, height = 400, hint = false }: { sv: SV; alt: string; fallback?: React.ReactNode; width?: number; height?: number; /** Show the "Look around" chip (site cards). */ hint?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (!KEY || failed) return <>{fallback}</>
  const src = `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&pano=${encodeURIComponent(sv.panoId)}&heading=${sv.heading}&pitch=4&fov=70&return_error_code=true&key=${encodeURIComponent(KEY)}`
  return (
    <>
      {/* A plain img on purpose: Google's image must load from Google, not through next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      <Label sv={sv} />
      {hint && (
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-gray-800 shadow-sm">
          <Move className="h-3 w-3" aria-hidden="true" /> Look around in Details
        </span>
      )}
    </>
  )
}

/**
 * Google's interactive Street View viewer, pointed at the site. Visitors can
 * look around and walk along the road (the free viewer can't turn walking off),
 * so "Back to the site" reloads it at the site's panorama and heading.
 */
export function StreetViewEmbed({ sv, title }: { sv: SV; title: string }) {
  const [resets, setResets] = useState(0)
  // "How to find the screen" sits over the viewer until the visitor starts
  // using it (a click into Google's frame moves focus there) or taps "Got it".
  const [coach, setCoach] = useState(true)
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (!coach) return
    const onBlur = () => { if (document.activeElement === frame.current) setCoach(false) }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [coach])
  if (!KEY) return null
  const src = `https://www.google.com/maps/embed/v1/streetview?key=${encodeURIComponent(KEY)}&pano=${encodeURIComponent(sv.panoId)}&heading=${sv.heading}&pitch=4&fov=70`
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
      <iframe ref={frame} key={resets} src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      <Label sv={sv} />
      {coach && (
        <div className="pointer-events-none absolute inset-x-3 bottom-14 flex justify-center">
          <div role="note" className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-xl bg-gray-900/85 px-3 py-2 text-white shadow-lg sm:items-start sm:p-3">
            <Move className="h-4 w-4 flex-shrink-0 sm:mt-0.5 sm:h-5 sm:w-5" aria-hidden="true" />
            <div className="min-w-0 text-xs leading-relaxed sm:text-sm">
              <p className="font-semibold"><span className="sm:hidden">Drag to find the screen</span><span className="hidden sm:inline">Can&apos;t see the screen?</span></p>
              <p className="mt-0.5 hidden text-white/85 sm:block">Drag to look around, or click the arrows on the road to move closer. The screen is near this spot.</p>
            </div>
            <button type="button" onClick={() => setCoach(false)} className="mw-tap -my-1 flex-shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-white underline-offset-2 hover:underline">Got it</button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setResets(n => n + 1)}
        className="mw-tap absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow ring-1 ring-black/10 hover:text-[#2563eb]">
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Back to the site
      </button>
    </div>
  )
}
