'use client'

// Moving Walls branded map: MapLibre (open source) drawing OpenFreeMap's free
// OpenStreetMap vector tiles, recoloured to the brand palette. Works for every
// country with no API key. Pins come from props, so filters drive them.

import { useEffect, useRef, useState } from 'react'
import type { Map as MLMap, GeoJSONSource, StyleSpecification, LayerSpecification, FilterSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export type MapPin = { id: string; lat: number; lng: number; title: string; subtitle?: string; href?: string }

const MW = { navy: '#1B1E2B', blue: '#2554A2', sky: '#66C9F3', ice: '#BFE7FB', sun: '#FEDA24', body: '#4A5468' }
const BASE_STYLE = 'https://tiles.openfreemap.org/styles/positron'

/** Paint colours per base-map layer id (prefix match), all from the brand palette. */
const PAINT: [RegExp, Record<string, unknown>][] = [
  [/^background$/, { 'background-color': '#EEF3F8' }],
  [/^water$/, { 'fill-color': MW.ice }],
  [/^waterway$/, { 'line-color': '#A9DDF6' }],
  [/^park$|^landcover_wood$/, { 'fill-color': '#E2EFF6' }],
  [/^landuse_residential$/, { 'fill-color': '#E9F0F7' }],
  [/^building$/, { 'fill-color': '#DDE6F0', 'fill-outline-color': '#CFDAE6' }],
  [/^highway_(minor|path)$/, { 'line-color': '#FFFFFF' }],
  [/^highway_major_casing$/, { 'line-color': '#CCD8E5' }],
  [/^highway_major_(inner|subtle)$/, { 'line-color': '#FFFFFF' }],
  // Motorways in neutral blue-grey so they never read as rivers.
  [/motorway.*casing$/, { 'line-color': '#B4C3D6' }],
  [/motorway.*(inner|subtle)$/, { 'line-color': '#FFFFFF' }],
  [/^railway/, { 'line-color': '#9DB3D6' }],
  [/^boundary/, { 'line-color': '#A7B4C8' }],
  [/water_name|waterway_line_label/, { 'text-color': MW.blue, 'text-halo-color': '#FFFFFF' }],
  [/^label_(city|country)/, { 'text-color': MW.navy, 'text-halo-color': '#FFFFFF' }],
  [/^label_|^highway-name|^airport$/, { 'text-color': MW.body, 'text-halo-color': '#FFFFFF' }],
]

let stylePromise: Promise<StyleSpecification> | null = null
function brandStyle(): Promise<StyleSpecification> {
  stylePromise ??= fetch(BASE_STYLE).then(r => r.json()).then((s: StyleSpecification) => {
    s.layers = s.layers.map(l => {
      const hit = PAINT.find(([re]) => re.test(l.id))
      if (!hit) return l
      const paint = { ...(l as { paint?: Record<string, unknown> }).paint }
      for (const [k, v] of Object.entries(hit[1])) if (k in paint || l.type === 'background' || k.startsWith('text-')) paint[k] = v
      return { ...l, paint } as LayerSpecification
    })
    return s
  }).catch(e => { stylePromise = null; throw e })
  return stylePromise
}

/** Narrow maps and touch screens start with the credits as the (i) button: the open credits' links are too small to tap and cover pins. */
const narrowOrTouch = (el: HTMLElement) => el.clientWidth < 640 || window.matchMedia('(pointer: coarse)').matches

const toGeoJSON = (pins: MapPin[]) => ({
  type: 'FeatureCollection' as const,
  features: pins.map(p => ({ type: 'Feature' as const, properties: { id: p.id }, geometry: { type: 'Point' as const, coordinates: [p.lng, p.lat] } })),
})

export function BrandMap({ pins, activeId = null, onPinClick, title, className = 'h-80' }: {
  pins: MapPin[]
  activeId?: string | null
  onPinClick?: (id: string) => void
  title: string
  className?: string
}) {
  const box = useRef<HTMLDivElement>(null)
  const map = useRef<MLMap | null>(null)
  const lib = useRef<typeof import('maplibre-gl') | null>(null)
  const popup = useRef<import('maplibre-gl').Popup | null>(null)
  const pinsRef = useRef(pins)
  const clickRef = useRef(onPinClick)
  pinsRef.current = pins
  clickRef.current = onPinClick
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Create the map once.
  useEffect(() => {
    let dead = false
    ;(async () => {
      try {
        const [ml, style] = await Promise.all([import('maplibre-gl'), brandStyle()])
        if (dead || !box.current) return
        lib.current = ml
        const m = new ml.Map({
          container: box.current, style, attributionControl: { compact: narrowOrTouch(box.current) },
          center: [101.69, 3.14], zoom: 11, cooperativeGestures: true, dragRotate: false, pitchWithRotate: false,
        })
        m.touchZoomRotate.disableRotation()
        m.addControl(new ml.NavigationControl({ showCompass: false }), 'top-right')
        map.current = m
        m.on('error', e => { if (!m.loaded() && /webgl/i.test(String(e.error?.message))) setFailed(true) })
        m.on('load', () => {
          // Narrow maps: credits start as the (i) button so they don't cover pins; wide maps show them in full.
          if (box.current && narrowOrTouch(box.current)) box.current.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show')
          m.addSource('sites', { type: 'geojson', data: toGeoJSON(pinsRef.current), cluster: true, clusterRadius: 36, clusterMaxZoom: 14 })
          m.addLayer({ id: 'cluster', type: 'circle', source: 'sites', filter: ['has', 'point_count'],
            paint: { 'circle-color': MW.blue, 'circle-radius': ['step', ['get', 'point_count'], 16, 10, 20, 50, 26], 'circle-stroke-color': '#FFFFFF', 'circle-stroke-width': 3 } })
          m.addLayer({ id: 'cluster-count', type: 'symbol', source: 'sites', filter: ['has', 'point_count'],
            layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-font': ['Noto Sans Bold'], 'text-size': 13, 'text-allow-overlap': true },
            paint: { 'text-color': '#FFFFFF' } })
          m.addLayer({ id: 'pin-halo', type: 'circle', source: 'sites', filter: ['==', ['get', 'id'], '__none__'],
            paint: { 'circle-color': MW.sun, 'circle-opacity': 0.45, 'circle-radius': 20 } })
          m.addLayer({ id: 'pin', type: 'circle', source: 'sites', filter: ['!', ['has', 'point_count']],
            paint: { 'circle-color': MW.navy, 'circle-radius': 9, 'circle-stroke-color': '#FFFFFF', 'circle-stroke-width': 3 } })
          m.addLayer({ id: 'pin-active', type: 'circle', source: 'sites', filter: ['==', ['get', 'id'], '__none__'],
            paint: { 'circle-color': MW.blue, 'circle-radius': 11, 'circle-stroke-color': '#FFFFFF', 'circle-stroke-width': 3 } })

          for (const id of ['pin', 'pin-active', 'cluster']) {
            m.on('mouseenter', id, () => { m.getCanvas().style.cursor = 'pointer' })
            m.on('mouseleave', id, () => { m.getCanvas().style.cursor = '' })
          }
          m.on('click', 'cluster', async e => {
            const f = e.features?.[0]
            if (!f) return
            const zoom = await (m.getSource('sites') as GeoJSONSource).getClusterExpansionZoom(f.properties.cluster_id)
            m.easeTo({ center: (f.geometry as GeoJSON.Point).coordinates as [number, number], zoom })
          })
          m.on('click', 'pin', e => {
            const id = e.features?.[0]?.properties?.id as string | undefined
            if (id) clickRef.current?.(id)
          })
          setReady(true)
        })
      } catch {
        if (!dead) setFailed(true)
      }
    })()
    return () => { dead = true; map.current?.remove(); map.current = null }
  }, [])

  // Pins follow the filters: replace the data and fit the view to them.
  useEffect(() => {
    const m = map.current
    if (!ready || !m || !lib.current) return
    ;(m.getSource('sites') as GeoJSONSource).setData(toGeoJSON(pins))
    if (!pins.length) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pins.length === 1) { m.jumpTo({ center: [pins[0].lng, pins[0].lat], zoom: 15 }); return }
    const b = new lib.current.LngLatBounds()
    pins.forEach(p => b.extend([p.lng, p.lat]))
    m.fitBounds(b, { padding: 56, maxZoom: 15, duration: reduce ? 0 : 600 })
  }, [pins, ready])

  // The active site: highlighted pin plus a small label card.
  useEffect(() => {
    const m = map.current
    if (!ready || !m || !lib.current) return
    const f = ['==', ['get', 'id'], activeId ?? '__none__'] as FilterSpecification
    m.setFilter('pin-active', f)
    m.setFilter('pin-halo', f)
    popup.current?.remove()
    const p = pins.find(x => x.id === activeId)
    if (!p) return
    const el = document.createElement('div')
    el.style.fontFamily = getComputedStyle(document.body).fontFamily // site font (Poppins), not MapLibre's default
    const t = document.createElement(p.href ? 'a' : 'strong')
    t.textContent = p.title
    t.className = 'block font-semibold text-[#1B1E2B] text-sm leading-snug'
    if (p.href) (t as HTMLAnchorElement).href = p.href
    el.appendChild(t)
    if (p.subtitle) { const s = document.createElement('span'); s.textContent = p.subtitle; s.className = 'block text-xs text-[#4A5468] mt-0.5'; el.appendChild(s) }
    popup.current = new lib.current.Popup({ closeButton: false, offset: 16, maxWidth: '240px', className: 'mw-map-popup' })
      .setLngLat([p.lng, p.lat]).setDOMContent(el).addTo(m)
    const b = m.getBounds()
    if (!b.contains([p.lng, p.lat])) m.easeTo({ center: [p.lng, p.lat] })
  }, [activeId, pins, ready])

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-mw-blue-100 bg-[#F6FAFD] ${className}`} role="region" aria-label={title}>
      {/* MapLibre's own CSS sets .maplibregl-map to position:relative, so size the box explicitly. */}
      <div ref={box} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {failed && (
        <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-gray-500">
          The map can&apos;t load on this device. Every site is listed with its address.
        </p>
      )}
    </div>
  )
}
