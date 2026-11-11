import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposalByShareId, resolveSites } from '@/lib/proposal/store'
import { readProposalGrant, canEdit } from '@/lib/proposal/access'
import { ProposalView } from '@/components/proposal/ProposalView'

// The proposal the client receives: a private link, never indexed.
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ shareId: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { shareId } = await params
  const doc = await getProposalByShareId(shareId)
  if (!doc) return { title: 'Proposal not found | Moving Walls', robots: { index: false, follow: false } }
  const view = await resolveSites(doc)
  return {
    title: `OOH proposal: ${doc.titleLine} | Moving Walls`,
    description: view.version.summary.slice(0, 160),
    robots: { index: false, follow: false },
    openGraph: { title: doc.titleLine, description: view.version.summary.slice(0, 200), images: view.sites[0]?.photos[0] ? [{ url: view.sites[0].photos[0] }] : undefined },
  }
}

export default async function ProposalPage({ params }: Params) {
  const { shareId } = await params
  const doc = await getProposalByShareId(shareId)
  if (!doc) notFound()
  const [view, grant] = await Promise.all([resolveSites(doc), readProposalGrant()])
  const { editTokenHash: _h, creator, ...pub } = view.doc // eslint-disable-line @typescript-eslint/no-unused-vars
  const safe = { ...view, doc: { ...pub, editTokenHash: '', creator: { name: '', email: '', country: '', company: creator.company } } }
  return <ProposalView view={safe} canEdit={canEdit(grant, shareId)} pagedIds={[]} />
}
