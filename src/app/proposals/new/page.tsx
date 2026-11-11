import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sitesFor, inventoryEnabled } from '@/lib/inventory/source'
import { ensureMarkets } from '@/lib/proposal/marketsData'
import { BriefForm } from '@/components/proposal/BriefForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Build an instant OOH proposal | Moving Walls', robots: { index: false, follow: false } }

export default async function NewProposalPage() {
  if (!inventoryEnabled()) notFound()
  // Format choices come from the live inventory of the first market with sites.
  const markets = await ensureMarkets()
  const formats: Record<string, string[]> = {}
  for (const m of markets) for (const c of m.cities.filter(x => x.available)) {
    const sites = await sitesFor(m.countrySlug, c.slug)
    formats[`${m.countrySlug}/${c.slug}`] = Array.from(new Set(sites.map(s => s.displayFormat ?? s.format).filter(Boolean) as string[])).sort()
  }
  return <BriefForm markets={markets} formats={formats} />
}
