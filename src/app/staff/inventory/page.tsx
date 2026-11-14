import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { readStaff } from '@/lib/staff/auth'
import { staffCountries, staffSites } from '@/lib/inventory/staffInventory'
import { ISSUE_TYPES, type Severity } from '@/lib/inventory/hygiene'

// Inventory hygiene for the team (Rif, 14 Nov 2026): every site with a problem,
// from the latest daily pull, and the corrections staff made. A correction
// replaces the API's value on the website, survives every pull, retires itself
// when the API catches up, and goes to onboarding as a CSV so the source is fixed.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Inventory hygiene | Moving Walls team', robots: { index: false, follow: false } }

const PAGE = 50
const SEV: Record<Severity, { label: string; cls: string; order: number }> = {
  blocking: { label: 'Blocking', cls: 'bg-red-50 text-red-700', order: 0 },
  high: { label: 'High', cls: 'bg-amber-50 text-amber-800', order: 1 },
  medium: { label: 'Medium', cls: 'bg-gray-100 text-gray-700', order: 2 },
  info: { label: 'Auto-fixed', cls: 'bg-emerald-50 text-emerald-700', order: 3 },
}
const STATUS = { active: { label: 'In use', cls: 'bg-mw-blue-50 text-[#2563eb]' }, conflict: { label: 'API changed: review', cls: 'bg-amber-50 text-amber-800' }, 'fixed-at-source': { label: 'Fixed at source', cls: 'bg-emerald-50 text-emerald-700' } } as const
const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')

export default async function StaffInventoryPage({ searchParams }: { searchParams: Promise<{ country?: string; issue?: string; state?: string; q?: string; page?: string; view?: string }> }) {
  const staff = await readStaff()
  if (!staff) redirect('/staff/login?back=/staff/inventory')
  const sp = await searchParams
  const countries = await staffCountries()
  const country = sp.country && countries.some(c => c.slug === sp.country) ? sp.country : countries.find(c => c.slug === 'malaysia')?.slug ?? countries[0]?.slug
  if (!country) return <main className="mw-container mw-section"><h1 className="text-2xl font-bold">Inventory hygiene</h1><p className="mt-2 text-gray-600">No inventory has been pulled yet.</p></main>
  const { sites, pulledAt, staging, corrections } = await staffSites(country)
  const view = sp.view === 'corrections' ? 'corrections' : 'sites'

  const withIssues = sites.filter(s => s.issues.length)
  const count = (code: string) => sites.filter(s => s.issues.some(i => i.code === code)).length
  const states = [...new Set(sites.map(s => s.shown.adminLevel1Name).filter(Boolean) as string[])].sort()
  const needle = (sp.q ?? '').trim().toLowerCase()
  const rows = withIssues
    .filter(s => (!sp.issue || s.issues.some(i => i.code === sp.issue)) && (!sp.state || s.shown.adminLevel1Name === sp.state)
      && (!needle || [s.raw.name, s.raw.referenceId, s.raw.address].some(v => v?.toLowerCase().includes(needle))))
    .sort((a, b) => Math.min(...a.issues.map(i => SEV[i.severity].order)) - Math.min(...b.issues.map(i => SEV[i.severity].order)) || b.issues.length - a.issues.length)
  const pages = Math.max(1, Math.ceil(rows.length / PAGE))
  const page = Math.min(pages, Math.max(1, Number(sp.page) || 1))
  const shown = rows.slice((page - 1) * PAGE, page * PAGE)
  const link = (q: Record<string, string | undefined>) => { const u = new URLSearchParams(); for (const [k, v] of Object.entries({ country, issue: sp.issue, state: sp.state, q: sp.q, view: sp.view, ...q })) if (v) u.set(k, v); return `/staff/inventory?${u}` }
  const chip = (on: boolean) => `mw-tap inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`
  const open = corrections.filter(c => c.status !== 'fixed-at-source')

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-[#2563eb] text-white mw-hero-top pb-8">
        <div className="mw-container">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Moving Walls team</span>
            <Link href="/staff/proposals" className="text-sm text-blue-100 underline">Proposals</Link>
            <span className="ml-auto text-sm text-blue-100">{staff.name} · <Link href="/api/staff/login?off=1" prefetch={false} className="underline">Sign out</Link></span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Inventory hygiene</h1>
          <p className="mt-2 max-w-[70ch] text-blue-100/90">Sites with a problem in the latest pull from the Inventory API. A correction you make here replaces the API&apos;s value on the website and survives every pull. It retires itself once onboarding fixes the source.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {countries.map(c => <Link key={c.slug} href={`/staff/inventory?country=${c.slug}`} className={`mw-tap rounded-full px-3 py-1 text-xs font-semibold ${c.slug === country ? 'bg-white text-[#2563eb]' : 'bg-white/10 text-white ring-1 ring-white/25'}`}>{c.name}</Link>)}
            <span className="text-xs text-blue-100">Pulled {fmt(pulledAt)}{staging ? ' · staging (test data)' : ''}</span>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {([['Sites', sites.length], ['With an issue', withIssues.length], ['Placed by map point', count('state-auto')], ['Staff corrections in use', open.length]] as const).map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15"><dt className="text-xs font-semibold uppercase tracking-wider text-blue-100/80">{k}</dt><dd className="mt-1 text-2xl font-bold">{v.toLocaleString('en-US')}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-gray-50 mw-section-sm">
        <div className="mw-container flex flex-wrap items-center gap-3">
          <Link href={link({ view: undefined, page: undefined })} className={chip(view === 'sites')}>Sites to review</Link>
          <Link href={link({ view: 'corrections', page: undefined })} className={chip(view === 'corrections')}>Corrections ({corrections.length})</Link>
          <span className="ml-auto flex flex-wrap gap-2 text-sm">
            <a href={`/api/staff/inventory/export?country=${country}&kind=corrections`} className="mw-tap rounded-full border-2 border-[#2563eb] bg-white px-4 py-1.5 font-semibold text-[#2563eb] hover:bg-mw-blue-50">Corrections CSV for onboarding</a>
            <a href={`/api/staff/inventory/export?country=${country}&kind=issues`} className="mw-tap rounded-full border-2 border-gray-300 bg-white px-4 py-1.5 font-semibold text-gray-700 hover:border-[#2563eb]">All issues CSV</a>
          </span>
        </div>
      </section>

      {view === 'sites' ? (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm font-semibold text-gray-700">Issue</span>
              <Link href={link({ issue: undefined, page: undefined })} className={chip(!sp.issue)}>All ({withIssues.length.toLocaleString('en-US')})</Link>
              {Object.entries(ISSUE_TYPES).map(([code, t]) => ({ code, t, n: count(code) })).filter(x => x.n).sort((a, b) => SEV[a.t.severity].order - SEV[b.t.severity].order || b.n - a.n).map(({ code, t, n }) => (
                <Link key={code} href={link({ issue: code, page: undefined })} className={chip(sp.issue === code)}>{t.label} <span className="opacity-70">{n.toLocaleString('en-US')}</span></Link>
              ))}
            </div>
            <form action="/staff/inventory" className="mt-4 flex flex-wrap items-end gap-3">
              <input type="hidden" name="country" value={country} />
              {sp.issue && <input type="hidden" name="issue" value={sp.issue} />}
              <label className="text-sm"><span className="block text-xs font-semibold text-gray-500">State shown on the website</span>
                <select name="state" defaultValue={sp.state ?? ''} className="mt-1 h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm"><option value="">All states</option>{states.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
              <label className="text-sm"><span className="block text-xs font-semibold text-gray-500">Search</span>
                <input name="q" defaultValue={sp.q ?? ''} placeholder="Name, reference or address" className="mt-1 h-11 w-72 max-w-full rounded-lg border border-gray-300 px-3 text-sm" /></label>
              <button className="mw-tap h-11 rounded-full bg-[#2563eb] px-5 text-sm font-semibold text-white">Filter</button>
            </form>
            <p className="mt-4 text-sm text-gray-500">{rows.length.toLocaleString('en-US')} sites · page {page} of {pages}</p>
            <div className="mt-2 overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3">Site</th><th className="px-3 py-3">On the website</th><th className="px-3 py-3">Issues</th><th className="px-3 py-3">Corrections</th><th className="px-3 py-3"></th>
                </tr></thead>
                <tbody>
                  {shown.map(s => (
                    <tr key={s.raw.id} className="border-b border-gray-100 last:border-0 align-top">
                      <td className="px-4 py-3"><span className="font-semibold text-gray-900">{s.shown.name}</span><span className="block text-xs text-gray-500">{s.raw.referenceId ?? s.raw.id}</span></td>
                      <td className="px-3 py-3 text-gray-700">{s.hidden ? <span className="text-xs font-semibold text-red-700">Hidden by staff</span> : <>{s.page ? `${s.page.areaName}, ${s.page.cityName}` : s.shown.adminLevel1Name}<span className="block text-xs text-gray-500">{s.source === 'point' ? 'placed by map point' : s.source === 'staff' ? 'placed by staff' : s.source === 'stored' ? 'stored state kept' : 'no map point'}</span></>}</td>
                      <td className="px-3 py-3"><ul className="flex flex-wrap gap-1.5">{s.issues.map(i => <li key={i.code} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${SEV[i.severity].cls}`}>{i.label}</li>)}</ul></td>
                      <td className="px-3 py-3 text-xs text-gray-600">{s.corrections.length ? s.corrections.map(c => <span key={c.field} className={`mr-1 inline-block rounded-full px-2 py-0.5 font-semibold ${STATUS[c.status].cls}`}>{c.field}</span>) : '—'}</td>
                      <td className="px-3 py-3 text-right"><Link href={`/staff/inventory/site?country=${country}&id=${s.raw.id}`} className="mw-tap inline-flex h-9 items-center rounded-full border-2 border-[#2563eb] px-4 text-xs font-semibold text-[#2563eb] hover:bg-mw-blue-50">Review</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pages > 1 && (
              <nav aria-label="Pages" className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                {page > 1 && <Link href={link({ page: String(page - 1) })} className={chip(false)}>Previous</Link>}
                <span className="px-2 text-gray-600">Page {page} of {pages}</span>
                {page < pages && <Link href={link({ page: String(page + 1) })} className={chip(false)}>Next</Link>}
              </nav>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-white mw-section">
          <div className="mw-container">
            <p className="max-w-[75ch] text-sm text-gray-600"><b>In use</b>: the website shows your value. <b>API changed: review</b>: the API now says something different from both its old value and yours; your value is still used until you decide. <b>Fixed at source</b>: the API now says what you said, so the correction is no longer needed.</p>
            {corrections.length === 0 ? <p className="mt-4 text-gray-600">No corrections yet. Open a site from Sites to review to make one.</p> : (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3">Site</th><th className="px-3 py-3">Field</th><th className="px-3 py-3">API said</th><th className="px-3 py-3">Corrected to</th><th className="px-3 py-3">Why</th><th className="px-3 py-3">By</th><th className="px-3 py-3">Status</th>
                  </tr></thead>
                  <tbody>
                    {corrections.map(c => (
                      <tr key={c._id} className="border-b border-gray-100 last:border-0 align-top">
                        <td className="px-4 py-3"><Link href={`/staff/inventory/site?country=${country}&id=${c.siteId}`} className="font-semibold text-gray-900 hover:text-[#2563eb]">{c.siteName}</Link></td>
                        <td className="px-3 py-3 text-gray-700">{c.field}</td>
                        <td className="px-3 py-3 text-gray-500">{c.apiValue ?? '—'}</td>
                        <td className="px-3 py-3 font-semibold text-gray-900">{c.value}</td>
                        <td className="px-3 py-3 text-gray-600">{c.reason}</td>
                        <td className="px-3 py-3 text-xs text-gray-600">{c.byName}<span className="block">{fmt(c.at)}</span></td>
                        <td className="px-3 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS[c.status].cls}`}>{STATUS[c.status].label}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
