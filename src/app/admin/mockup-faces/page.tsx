import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sitesFor } from '@/lib/inventory/source'
import { siteHasPage } from '@/lib/inventory/normalize'
import { getSiteContent } from '@/lib/inventory/siteContent'
import { adminAllowed } from '@/lib/admin-auth'
import { FaceMarker, type MarkerSite } from '@/components/admin/FaceMarker'

// Hidden page: mark the advertising face on each site photo for the ad
// mock-up. AI proposes, a person drags the points, Save writes Sanity.
// Open with ?key=<ADMIN_KEY> (the key is then kept in the browser).

export const metadata: Metadata = { title: 'Mock-up faces', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ key?: string; country?: string }> }) {
  const { key, country = 'malaysia' } = await searchParams
  if (!adminAllowed(key ?? null) && process.env.ADMIN_KEY) notFound() // the client re-checks on every save with the stored key
  const sites = (await sitesFor(country)).filter(siteHasPage)
  const rows: MarkerSite[] = []
  for (const s of sites) {
    const c = await getSiteContent(s)
    rows.push({
      id: s.id, name: s.name, format: s.displayFormat ?? s.format ?? '', photo: s.photos[0],
      path: `/locations/${s.countrySlug}/${s.citySlug}/${s.areaSlug}/${s.slug}`,
      corners: c.faceCorners, edges: c.faceEdges, kind: c.faceKind, saved: c.fromSanity,
    })
  }
  return (
    <main className="mw-container py-10 mw-hero-top">
      <h1 className="text-2xl font-bold text-[#062068]">Mock-up faces · {country}</h1>
      <p className="mt-1 text-sm text-gray-600">Drag the yellow corners onto the screen's corners. Tick "curved edges" and drag the blue midpoints for a bowed screen. Save writes the site's Sanity document; the page uses it on its next load.</p>
      <FaceMarker sites={rows} initialKey={key ?? ''} />
    </main>
  )
}
