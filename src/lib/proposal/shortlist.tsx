'use client'

// The visitor's proposal shortlist: sites picked while browsing the location
// pages, kept in localStorage until they build a proposal from it. A slim
// snapshot of each site is stored so the bar can render without a fetch; the
// server re-resolves sites by id when the proposal is generated.
// Rif, 11 Nov 2026.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { PublicSite } from '@/lib/inventory/types'

export type ShortlistItem = {
  id: string; slug: string; name: string; format: string | null
  areaName: string; areaSlug: string; cityName: string; citySlug: string; countryName: string; countrySlug: string
  lat: number | null; lng: number | null; photo: string | null
  audience: { reach?: string; impressions?: string } | null; sample: boolean
}

export const SHORTLIST_KEY = 'mw_proposal_shortlist'
export const SHORTLIST_MAX = 30

export const toShortlistItem = (s: PublicSite): ShortlistItem => ({
  id: s.id, slug: s.slug, name: s.name, format: s.displayFormat ?? s.format ?? null,
  areaName: s.areaName, areaSlug: s.areaSlug, cityName: s.cityName, citySlug: s.citySlug, countryName: s.countryName, countrySlug: s.countrySlug,
  lat: s.lat ?? null, lng: s.lng ?? null, photo: s.photos[0] ?? null, audience: s.audience ?? null, sample: !!s.sample,
})

type Ctx = {
  items: ShortlistItem[]; ready: boolean
  has: (id: string) => boolean; add: (site: PublicSite) => void; remove: (id: string) => void; clear: () => void
}

const ShortlistContext = createContext<Ctx | null>(null)

function load(): ShortlistItem[] {
  try {
    const raw = window.localStorage.getItem(SHORTLIST_KEY)
    if (!raw) return []
    const j = JSON.parse(raw) as { v?: number; items?: ShortlistItem[] }
    return Array.isArray(j.items) ? j.items.filter(i => i && typeof i.id === 'string').slice(0, SHORTLIST_MAX) : []
  } catch { return [] }
}

function save(items: ShortlistItem[]) {
  try { window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify({ v: 1, items })) } catch { /* private mode, quota: the bar still works for this page view */ }
}

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShortlistItem[]>([])
  const [ready, setReady] = useState(false)
  // Hydrate after mount so server and client markup match (localStorage is browser-only).
  useEffect(() => { setItems(load()); setReady(true) }, [])
  // Other tabs: keep the count in step.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === SHORTLIST_KEY) setItems(load()) }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const update = useCallback((fn: (prev: ShortlistItem[]) => ShortlistItem[]) => {
    setItems(prev => { const next = fn(prev); save(next); return next })
  }, [])
  const has = useCallback((id: string) => items.some(i => i.id === id), [items])
  const add = useCallback((site: PublicSite) => update(prev => prev.some(i => i.id === site.id) ? prev : [...prev, toShortlistItem(site)].slice(0, SHORTLIST_MAX)), [update])
  const remove = useCallback((id: string) => update(prev => prev.filter(i => i.id !== id)), [update])
  const clear = useCallback(() => update(() => []), [update])

  const value = useMemo<Ctx>(() => ({ items, ready, has, add, remove, clear }), [items, ready, has, add, remove, clear])
  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>
}

/** Safe without a provider (returns an empty, inert shortlist) so cards render anywhere. */
export function useShortlist(): Ctx {
  const ctx = useContext(ShortlistContext)
  return ctx ?? { items: [], ready: false, has: () => false, add: () => {}, remove: () => {}, clear: () => {} }
}
