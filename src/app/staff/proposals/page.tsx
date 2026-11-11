import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { readStaff } from '@/lib/staff/auth'
import { listAllProposals } from '@/lib/proposal/store'
import { ensureMarkets } from '@/lib/proposal/marketsData'
import { MARKETS, citiesLabel } from '@/lib/proposal/markets'
import { marketLeads, marketOfCountry, OWNER } from '@/lib/staff/people'

// The proposals dashboard for the team (Rif, 11 Nov 2026): how many were
// generated, from which country, assigned to whom (the market lead for the
// country), with status and whether a creative/mock-up was added. Market
// leads land on their own proposals; anyone can widen the filter.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Proposals | Moving Walls team', robots: { index: false, follow: false } }

const STATUS: Record<string, { label: string; cls: string }> = {
  draft: { label: 'Draft', cls: 'bg-gray-100 text-gray-700' }, sent: { label: 'For review', cls: 'bg-mw-blue-50 text-[#2563eb]' },
  approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-700' }, 'changes-requested': { label: 'Changes requested', cls: 'bg-amber-50 text-amber-700' },
}
const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const monthKey = (iso: string) => iso.slice(0, 7)

export default async function StaffProposalsPage({ searchParams }: { searchParams: Promise<{ owner?: string; country?: string; status?: string }> }) {
  const staff = await readStaff()
  if (!staff) redirect('/staff/login?back=/staff/proposals')
  await ensureMarkets()
  const sp = await searchParams
  const all = await listAllProposals()
  const me = marketLeads().find(p => p.email === staff.email)
  // a market lead opens on their own proposals; 'all' widens
  const owner = sp.owner ?? (me ? me.email : 'all')
  const rows = all.filter(p => (owner === 'all' || p.owner?.email === owner) && (!sp.country || p.brief.countrySlug === sp.country) && (!sp.status || p.status === sp.status))
  const countryName = (slug: string) => MARKETS.find(m => m.countrySlug === slug)?.countryName ?? slug
  const count = <K extends string>(items: typeof all, key: (p: typeof all[number]) => K) => { const m = new Map<K, number>(); for (const p of items) m.set(key(p), (m.get(key(p)) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1]) }
  const byCountry = count(all, p => p.brief.countrySlug)
  const byOwner = count(all, p => p.owner?.name ?? OWNER.name)
  const byStatus = count(all, p => p.status)
  const thisMonth = all.filter(p => monthKey(p.createdAt) === monthKey(new Date().toISOString())).length
  const link = (q: Record<string, string | undefined>) => { const u = new URLSearchParams(); for (const [k, v] of Object.entries({ owner, country: sp.country, status: sp.status, ...q })) if (v && v !== 'all') u.set(k, v); const s = u.toString(); return `/staff/proposals${s ? `?${s}` : ''}` }
  const chip = (on: boolean) => `mw-tap inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-[#2563eb] text-white mw-hero-top pb-8">
        <div className="mw-container">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Moving Walls team</span>
            <span className="ml-auto text-sm text-blue-100">{staff.name} · <Link href="/api/staff/login?off=1" prefetch={false} className="underline">Sign out</Link></span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Proposals</h1>
          <p className="mt-2 max-w-[60ch] text-blue-100/90">Every instant proposal built on the website, assigned to the market lead for its country.</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[['All time', all.length], ['This month', thisMonth], ['Approved', byStatus.find(([s]) => s === 'approved')?.[1] ?? 0], ['With a creative', all.filter(p => p.creative).length]].map(([k, v]) => (
              <div key={String(k)} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15"><dt className="text-xs font-semibold uppercase tracking-wider text-blue-100/80">{k}</dt><dd className="mt-1 text-2xl font-bold">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-gray-50 mw-section-sm">
        <div className="mw-container grid gap-6 lg:grid-cols-3">
          {[['By country', byCountry.map(([k, n]) => [countryName(k), n, link({ country: k })] as const)], ['By owner', byOwner.map(([k, n]) => [k, n, link({ owner: marketLeads().find(p => p.name === k)?.email ?? (k === OWNER.name ? OWNER.email : 'all') })] as const)], ['By status', byStatus.map(([k, n]) => [STATUS[k]?.label ?? k, n, link({ status: k })] as const)]].map(([title, items]) => (
            <div key={String(title)} className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">{title}</h2>
              <ul className="mt-3 space-y-1.5">
                {(items as readonly (readonly [string, number, string])[]).length === 0 && <li className="text-sm text-gray-500">None yet</li>}
                {(items as readonly (readonly [string, number, string])[]).map(([k, n, href]) => <li key={k} className="flex items-center justify-between text-sm"><Link href={href} className="font-semibold text-gray-800 hover:text-[#2563eb]">{k}</Link><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700">{n}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white mw-section">
        <div className="mw-container">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-gray-700">Owner</span>
            <Link href={link({ owner: 'all' })} className={chip(owner === 'all')}>Everyone</Link>
            {marketLeads().map(p => <Link key={p.email} href={link({ owner: p.email })} className={chip(owner === p.email)}>{p.name} · {p.title}</Link>)}
            <Link href={link({ owner: OWNER.email })} className={chip(owner === OWNER.email)}>{OWNER.name} (fallback)</Link>
            {(sp.country || sp.status) && <Link href={link({ country: undefined, status: undefined })} className="ml-2 text-xs font-semibold text-[#2563eb] hover:underline">Clear country/status</Link>}
          </div>
          {rows.length === 0 ? <p className="text-gray-600">No proposals match.</p> : (
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3">Proposal</th><th className="px-3 py-3">Country · cities</th><th className="px-3 py-3">Client</th><th className="px-3 py-3">Owner</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Creative</th><th className="px-3 py-3">Created</th><th className="px-3 py-3"></th>
                </tr></thead>
                <tbody>
                  {rows.map(p => (
                    <tr key={p.shareId} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3"><span className="font-semibold text-gray-900">{p.titleLine}</span><span className="block text-xs text-gray-500">v{p.currentVersion}{p.participants?.length ? ` · ${p.participants.length} client ${p.participants.length === 1 ? 'action' : 'actions'}` : ''}</span></td>
                      <td className="px-3 py-3 text-gray-700">{countryName(p.brief.countrySlug)}<span className="block text-xs text-gray-500">{citiesLabel(p.brief.countrySlug, p.brief.cities ?? [p.brief.citySlug], p.brief.countryWide)}{marketOfCountry(p.brief.countrySlug) ? ` · ${marketOfCountry(p.brief.countrySlug)!.label}` : ''}</span></td>
                      <td className="px-3 py-3 text-gray-700">{p.creator.company || '—'}<span className="block text-xs text-gray-500">{p.creator.name}{p.creator.email ? ` · ${p.creator.email}` : ''}</span></td>
                      <td className="px-3 py-3 text-gray-700">{p.owner?.name ?? OWNER.name}{p.owner?.fallback ? <span className="block text-xs text-amber-700">no lead for this market</span> : null}</td>
                      <td className="px-3 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS[p.status]?.cls ?? ''}`}>{STATUS[p.status]?.label ?? p.status}</span></td>
                      <td className="px-3 py-3 text-xs text-gray-600">{p.creative ? `${p.creative.mode === 'own' ? (p.creative.own?.kind === 'video' ? 'Video' : 'Image') : 'Logo + tagline'} · ${p.creative.by}` : '—'}</td>
                      <td className="px-3 py-3 text-xs text-gray-600">{fmt(p.createdAt)}</td>
                      <td className="px-3 py-3 whitespace-nowrap"><Link href={`/proposals/${p.shareId}`} className="font-semibold text-[#2563eb] hover:underline">Open</Link> · <Link href={`/proposals/${p.shareId}/edit`} className="font-semibold text-[#2563eb] hover:underline">Edit</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-xs text-gray-500">Owner = the market lead for the proposal&apos;s country (from the team list); Rif when a market has no lead. The CRM lead follows the same rule once the assignment rule is set up.</p>
        </div>
      </section>
    </div>
  )
}
