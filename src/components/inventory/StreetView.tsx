'use client'

// Google Street View for sites without a photo (Rif, 14 Nov 2026). Uses Google's
// own services only: the Street View Static API for a still image and the Maps
// Embed API for the viewer, loaded straight from Google in the visitor's browser
// (never through our image optimiser, never stored), with Google's attribution
// and our "Street View" label so nobody mistakes it for a photo of the face.
// Without NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY both render nothing.

import { useState } from 'react'
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

/** A still Street View image filling its (relative) parent; falls back to `fallback` if Google has none. */
export function StreetViewImage({ sv, alt, fallback = null, width = 640, height = 400 }: { sv: SV; alt: string; fallback?: React.ReactNode; width?: number; height?: number }) {
  const [failed, setFailed] = useState(false)
  if (!KEY || failed) return <>{fallback}</>
  const src = `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&pano=${encodeURIComponent(sv.panoId)}&heading=${sv.heading}&pitch=4&fov=70&return_error_code=true&key=${encodeURIComponent(KEY)}`
  return (
    <>
      {/* A plain img on purpose: Google's image must load from Google, not through next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      <Label sv={sv} />
    </>
  )
}

/** Google's interactive Street View viewer, pointed at the site. */
export function StreetViewEmbed({ sv, title }: { sv: SV; title: string }) {
  if (!KEY) return null
  const src = `https://www.google.com/maps/embed/v1/streetview?key=${encodeURIComponent(KEY)}&pano=${encodeURIComponent(sv.panoId)}&heading=${sv.heading}&pitch=4&fov=70`
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
      <iframe src={src} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      <Label sv={sv} />
    </div>
  )
}
