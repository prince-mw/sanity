import { ensureMarkets } from '@/lib/proposal/marketsData'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getProposalByShareId, resolveSites } from '@/lib/proposal/store'
import { readProposalGrant, canEdit, isStaffEmail } from '@/lib/proposal/access'
import { sitesFor } from '@/lib/inventory/source'
import { siteInsightsFor } from '@/lib/inventory/siteContent'
import { marketOf } from '@/lib/proposal/markets'
import { ProposalEditor } from '@/components/proposal/ProposalEditor'
import { SG_NAVY } from '@/components/SingaporeShared'

// The creator's side of a proposal. The edit link carries ?t=<token> once:
// /api/proposals/<id>/claim checks it, sets the cookie and sends the browser
// back here without the token (cookies cannot be set while a page renders).
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit your proposal | Moving Walls', robots: { index: false, follow: false } }

type Props = { params: Promise<{ shareId: string }>; searchParams: Promise<{ t?: string }> }

export default async function EditProposalPage({ params, searchParams }: Props) {
  await ensureMarkets()
  const { shareId } = await params
  const { t } = await searchParams
  const doc = await getProposalByShareId(shareId)
  if (!doc) notFound()

  if (t) redirect(`/api/proposals/${shareId}/claim?t=${encodeURIComponent(t)}`)

  const grant = await readProposalGrant()
  if (!canEdit(grant, shareId)) {
    return (
      <div className={`${SG_NAVY} text-white mw-hero-top pb-16`}>
        <div className="mw-container max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal</span>
          <h1 className="mt-2 text-3xl font-bold">This link belongs to the person who created the proposal.</h1>
          <p className="mt-3 text-blue-100/90">Open the edit link from the device you built it on, or ask the person who shared it with you to make the change. You can still read the proposal.</p>
          <Link href={`/proposals/${shareId}`} className="mw-tap mt-6 inline-flex rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb]">View the proposal</Link>
        </div>
      </div>
    )
  }

  const available = (marketOf(doc.brief.countrySlug)?.cities ?? []).filter(c => c.available).map(c => c.slug)
  const [view, lists] = await Promise.all([resolveSites(doc), Promise.all(available.map(c => sitesFor(doc.brief.countrySlug, c)))])
  const candidates = lists.flat()
  const insights = await siteInsightsFor(candidates)
  const { editTokenHash: _h, ...pub } = view.doc // eslint-disable-line @typescript-eslint/no-unused-vars
  return <ProposalEditor key={`${doc.shareId}-${doc.currentVersion}-${doc.brief.cities.join(',')}`} view={{ ...view, doc: { ...pub, editTokenHash: '' } }} candidates={candidates} insights={insights} market={marketOf(doc.brief.countrySlug)} staff={!!grant && (grant.tester === true || isStaffEmail(grant.email))} />
}
