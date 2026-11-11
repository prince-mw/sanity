import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { inventoryEnabled } from '@/lib/inventory/source'
import { buildDemoView } from '@/lib/proposal/demo'
import { ProposalView } from '@/components/proposal/ProposalView'

// Sample proposal for design review: nothing is saved, Approve and Request
// changes are shown but inert.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Sample proposal | Moving Walls', robots: { index: false, follow: false } }

export default async function DemoProposalPage() {
  if (!inventoryEnabled()) notFound()
  const view = await buildDemoView()
  if (!view) notFound()
  return <ProposalView view={view} canEdit pagedIds={[]} demo />
}
