import { NextRequest, NextResponse } from 'next/server'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { siteInsightsFor } from '@/lib/inventory/siteContent'

// One site's full public record for the Details popup. Site lists send only a
// slim card per site (toSiteCard) so a city with thousands of sites stays
// light; the specs, every photo and the description come from here on demand.
// Same data the site page shows: PublicSite never carries owners or prices.

export const runtime = 'nodejs'

const SLUG = /^[a-z0-9-]{1,80}$/

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams
  const country = q.get('country') ?? '', city = q.get('city') ?? '', id = q.get('id') ?? ''
  if (!SLUG.test(country) || !SLUG.test(city) || !id || id.length > 80) return NextResponse.json({ error: 'bad request' }, { status: 400 })
  if (!inventoryEnabled()) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const site = (await sitesFor(country, city)).find(s => s.id === id)
  if (!site) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const insights = (await siteInsightsFor([site]))[site.id] ?? null
  return NextResponse.json({ site, insights }, { headers: { 'cache-control': 'public, max-age=300, s-maxage=3600' } })
}
