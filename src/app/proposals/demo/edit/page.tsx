import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { buildDemoView } from '@/lib/proposal/demo'
import { ProposalEditor } from '@/components/proposal/ProposalEditor'

// The editor on the sample proposal: everything can be tried, nothing is saved.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Sample proposal · editor | Moving Walls', robots: { index: false, follow: false } }

export default async function DemoEditPage() {
  if (!inventoryEnabled()) notFound()
  const view = await buildDemoView()
  if (!view) notFound()
  const candidates = await sitesFor(view.doc.brief.countrySlug, view.doc.brief.citySlug)
  return <ProposalEditor view={view} candidates={candidates} demo />
}
