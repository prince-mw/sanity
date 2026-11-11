import { ensureMarkets } from '@/lib/proposal/marketsData'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { siteInsightsFor } from '@/lib/inventory/siteContent'
import { marketOf } from '@/lib/proposal/markets'
import { buildDemoView } from '@/lib/proposal/demo'
import { ProposalEditor } from '@/components/proposal/ProposalEditor'

// The editor on the sample proposal: everything can be tried, nothing is saved.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Sample proposal · editor | Moving Walls', robots: { index: false, follow: false } }

export default async function DemoEditPage({ searchParams }: { searchParams: Promise<{ cities?: string }> }) {
  await ensureMarkets()
  if (!inventoryEnabled()) notFound()
  const { cities } = await searchParams
  const view = await buildDemoView(cities ? cities.split(',') : undefined)
  if (!view) notFound()
  const available = (marketOf(view.doc.brief.countrySlug)?.cities ?? []).filter(c => c.available).map(c => c.slug)
  const candidates = (await Promise.all(available.map(c => sitesFor(view.doc.brief.countrySlug, c)))).flat()
  const insights = await siteInsightsFor(candidates)
  return <ProposalEditor key={view.doc.brief.cities.join(',')} view={view} candidates={candidates} insights={insights} market={marketOf(view.doc.brief.countrySlug)} demo staff />
}
