import { ensureMarkets } from '@/lib/proposal/marketsData'
import type { Metadata } from 'next'
import Link from 'next/link'
import { readProposalGrant } from '@/lib/proposal/access'
import { listProposalsFor } from '@/lib/proposal/store'
import { citiesLabel } from '@/lib/proposal/markets'
import { SG_NAVY } from '@/components/SingaporeShared'
import { readStaff } from '@/lib/staff/auth'

// Every proposal this person created, with status and versions.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Your proposals | Moving Walls', robots: { index: false, follow: false } }

const STATUS: Record<string, string> = { draft: 'Draft', sent: 'For review', approved: 'Approved', 'changes-requested': 'Changes requested' }
const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default async function MyProposalsPage() {
  await ensureMarkets()
  const grant = await readProposalGrant()
  const list = grant ? await listProposalsFor(grant.email, grant.proposals) : []
  const staff = await readStaff()
  return (
    <div className="bg-white text-gray-900">
      <section className={`${SG_NAVY} text-white mw-hero-top pb-10`}>
        <div className="mw-container">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal</span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your proposals</h1>
          <p className="mt-3 max-w-[60ch] text-blue-100/90">{grant ? `Everything built by ${grant.name || grant.email}. Open one to edit it or copy its client link.` : 'Register once on the proposal form and your proposals appear here.'}</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/proposals/new" className="mw-tap inline-flex items-center rounded-lg bg-white px-5 py-2.5 font-semibold text-[#2563eb] hover:bg-cyan-50">Build a new proposal</Link>{staff && <Link href="/staff/proposals" className="mw-tap inline-flex items-center rounded-lg border-2 border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10">Team dashboard: all proposals</Link>}</div>
        </div>
      </section>
      <section className="bg-gray-50 mw-section">
        <div className="mw-container">
          {list.length === 0 ? (
            <p className="text-gray-600">No proposals yet.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map(p => (
                <li key={p.shareId} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-mw-blue-50 px-3 py-1 text-xs font-bold text-[#2563eb]">{STATUS[p.status] ?? p.status}</span>
                    <span className="text-xs text-gray-500">v{p.currentVersion}</span>
                  </div>
                  <h2 className="mt-3 font-bold text-gray-900">{p.titleLine}</h2>
                  <p className="mt-1 text-sm text-gray-600">{citiesLabel(p.brief.countrySlug, p.brief.cities ?? [p.brief.citySlug], p.brief.countryWide)} · {p.brief.durationWeeks ? `${p.brief.durationWeeks} weeks` : 'duration open'}</p>
                  <p className="mt-1 text-xs text-gray-500">Updated {fmt(p.updatedAt)}{p.derivedFrom ? ` · started from an earlier proposal` : ''}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/proposals/${p.shareId}/edit`} className="mw-tap inline-flex items-center rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]">Edit</Link>
                    <Link href={`/proposals/${p.shareId}`} className="mw-tap inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#2563eb]">Client view</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
