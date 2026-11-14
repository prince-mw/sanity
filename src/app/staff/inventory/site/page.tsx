import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { readStaff } from '@/lib/staff/auth'
import { staffSites } from '@/lib/inventory/staffInventory'
import { apiValueOf, CORRECTABLE, type CorrectionField } from '@/lib/inventory/correctionsCore'

// One site on /staff/inventory: every field staff can correct, what the API
// says, what the website shows, and a form per field. Plain forms posting to
// /api/staff/inventory/corrections, so it works without any client script.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Review site | Moving Walls team', robots: { index: false, follow: false } }

const STATUS = { active: { label: 'Your correction is in use', cls: 'bg-mw-blue-50 text-[#2563eb]' }, conflict: { label: 'The API changed this field since: review', cls: 'bg-amber-50 text-amber-800' }, 'fixed-at-source': { label: 'Fixed at source: the API now agrees', cls: 'bg-emerald-50 text-emerald-700' } } as const

export default async function StaffSitePage({ searchParams }: { searchParams: Promise<{ country?: string; id?: string; saved?: string; error?: string }> }) {
  const sp = await searchParams
  const back = `/staff/inventory/site?country=${sp.country ?? ''}&id=${sp.id ?? ''}`
  const staff = await readStaff()
  if (!staff) redirect(`/staff/login?back=${encodeURIComponent(back)}`)
  if (!sp.country || !sp.id) notFound()
  const { sites } = await staffSites(sp.country)
  const s = sites.find(x => x.raw.id === sp.id)
  if (!s) notFound()
  const [savedField, savedNote] = (sp.saved ?? '').split(':')
  const [errField, ...errMsg] = (sp.error ?? '').split(':')
  const shownValue = (f: CorrectionField) => f === 'hidden' ? (s.hidden ? 'yes' : 'no') : apiValueOf(s.shown, f)
  const pageHref = s.page && !s.hidden ? `/locations/${sp.country}/${s.page.citySlug}/${s.page.areaSlug}/${s.page.slug}` : null
  const m = String(s.shown.geoms?.[0] ?? '').match(/POINT\s*\(\s*(-?[\d.]+)\s+(-?[\d.]+)/i)
  const maps = m ? `https://www.google.com/maps/search/?api=1&query=${m[2]},${m[1]}` : null

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-[#2563eb] text-white mw-hero-top pb-8">
        <div className="mw-container">
          <Link href={`/staff/inventory?country=${sp.country}`} className="text-sm text-blue-100 underline">← Inventory hygiene</Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{s.shown.name}</h1>
          <p className="mt-1 text-sm text-blue-100">{s.raw.referenceId ?? s.raw.id} · {s.hidden ? 'Hidden by staff' : s.page ? `${s.page.areaName}, ${s.page.cityName}` : s.shown.adminLevel1Name}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {pageHref && <Link href={pageHref} className="mw-tap rounded-full bg-white px-4 py-1.5 font-semibold text-[#2563eb]">Open the site page</Link>}
            {maps && <a href={maps} target="_blank" rel="noopener nofollow" className="mw-tap rounded-full bg-white/10 px-4 py-1.5 font-semibold text-white ring-1 ring-white/25">Map point in Google Maps</a>}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 mw-section-sm">
        <div className="mw-container">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Issues</h2>
          {s.issues.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">{s.issues.map(i => <li key={i.code} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800 ring-1 ring-gray-200">{i.label}{i.fix ? <span className="text-gray-500"> → correct “{CORRECTABLE[i.fix].label}” below</span> : i.code === 'no-photo' ? <span className="text-gray-500"> → onboarding adds a photo</span> : null}</li>)}</ul>
          ) : <p className="mt-2 text-sm text-gray-600">No open issues.</p>}
          {s.raw.resolved?.adminLevel1Name && (
            <p className="mt-3 text-sm text-gray-600">Stored in the API as <b>{[s.raw.adminLevel1Name, s.raw.adminLevel2Name].filter(Boolean).join(' / ') || '—'}</b>; its map point is in <b>{[s.raw.resolved.adminLevel1Name, s.raw.resolved.adminLevel2Name].filter(Boolean).join(' / ')}</b>; the address says <b>{s.raw.address ?? 'nothing'}</b>.</p>
          )}
        </div>
      </section>

      <section className="bg-white mw-section">
        <div className="mw-container">
          {savedField && <p role="status" className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{savedNote === 'removed' ? 'Correction removed: the website uses the API value again.' : `Saved: ${savedNote}. The website uses it from now on, whatever the next pull says.`}</p>}
          <div className="grid gap-4">
            {(Object.keys(CORRECTABLE) as CorrectionField[]).map(f => {
              const c = s.corrections.find(x => x.field === f)
              const err = errField === f ? errMsg.join(':') : null
              return (
                <form key={f} method="post" action="/api/staff/inventory/corrections" className={`grid gap-3 rounded-2xl border p-4 md:grid-cols-12 md:items-end ${f === savedField ? 'border-emerald-300' : 'border-gray-200'}`}>
                  <input type="hidden" name="country" value={sp.country} /><input type="hidden" name="siteId" value={s.raw.id} /><input type="hidden" name="field" value={f} />
                  <div className="md:col-span-3">
                    <p className="font-semibold">{CORRECTABLE[f].label}</p>
                    <p className="text-xs text-gray-500">API: <span className="text-gray-700">{apiValueOf(s.raw, f) ?? '—'}</span></p>
                    <p className="text-xs text-gray-500">Website: <span className="font-semibold text-gray-800">{shownValue(f) ?? '—'}</span></p>
                    {c && <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS[c.status].cls}`}>{STATUS[c.status].label}</span>}
                  </div>
                  <label className="text-sm md:col-span-3"><span className="block text-xs font-semibold text-gray-500">Correct value</span>
                    <input name="value" defaultValue={c?.value ?? ''} placeholder={CORRECTABLE[f].hint} className="mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-sm" /></label>
                  <label className="text-sm md:col-span-4"><span className="block text-xs font-semibold text-gray-500">Why (goes to onboarding)</span>
                    <input name="reason" defaultValue={c?.reason ?? ''} placeholder="e.g. address and map point are in Pahang" className="mt-1 h-11 w-full rounded-lg border border-gray-300 px-3 text-sm" /></label>
                  <div className="flex gap-2 md:col-span-2 md:justify-end">
                    <button name="op" value="save" className="mw-tap h-11 rounded-full bg-[#2563eb] px-5 text-sm font-semibold text-white">Save</button>
                    {c && <button name="op" value="remove" className="mw-tap h-11 rounded-full border-2 border-gray-300 px-4 text-sm font-semibold text-gray-700 hover:border-red-400 hover:text-red-700">Remove</button>}
                  </div>
                  {err && <p role="alert" className="text-sm font-semibold text-red-700 md:col-span-12">{err}</p>}
                  {c && <p className="text-xs text-gray-500 md:col-span-12">Corrected by {c.byName} on {new Date(c.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}: {c.reason}</p>}
                </form>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
