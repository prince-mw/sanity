import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { safeFetch } from '@/sanity/lib/fetch'
import { inventoryEnabled, sitesFor } from '@/lib/inventory/source'
import { COUNTRY_GUIDE_DRAFTS, type GuideDraft } from '@/data/country-guide-drafts'
import { CITY_GUIDE_DRAFTS } from '@/data/city-guide-drafts'
import { AREA_GUIDE_DRAFTS } from '@/data/area-guide-drafts'

// The location guide checklist (Rif, 12 Nov 2026): every country, city and area
// in one view, with what is written, approved or missing, so the gaps are
// visible before the Inventory API lands. Staging and local only; never indexed.
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Location guide status | Moving Walls', robots: { index: false, follow: false } }

type Row = { slug: string; country: string; hideDefaultHero?: boolean; blocks: string[]; cities: { slug: string; city: string }[] }
type Status = 'approved' | 'draft' | 'missing' | 'own-layout'

const statusOf = (d: GuideDraft | undefined): Status => d ? (d.status === 'approved' ? 'approved' : 'draft') : 'missing'
const PILL: Record<Status, string> = {
  approved: 'bg-emerald-100 text-emerald-800',
  draft: 'bg-amber-100 text-amber-900',
  missing: 'bg-gray-100 text-gray-600',
  'own-layout': 'bg-mw-blue-50 text-mw-blue-700',
}
const LABEL: Record<Status, string> = { approved: 'Approved', draft: 'Draft, to review', missing: 'Not written', 'own-layout': 'Own layout' }
const Pill = ({ s }: { s: Status }) => <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${PILL[s]}`}>{LABEL[s]}</span>

// Blocks the template shows in its own slots; anything else is old content kept until the guide is written.
const SLOTTED = ['twoColumn', 'textBlock', 'imageGallery', 'logoCarousel', 'successStories', 'ctaBanner']

export default async function GuideStatusPage() {
  if (!inventoryEnabled()) notFound()
  const rows = await safeFetch<Row[]>(`*[_type == "location" && isActive == true] | order(country asc){
    "slug": slug.current, country, hideDefaultHero, "blocks": sections[]._type,
    "cities": *[_type == "locationCity" && isActive == true && country._ref == ^._id] | order(city asc){ "slug": slug.current, city }
  }`, {}, [])
  const sites = Object.fromEntries(await Promise.all((rows ?? []).map(async r => [r.slug, (await sitesFor(r.slug).catch(() => [])).length] as const)))

  const data = (rows ?? []).map(r => {
    const own = !!r.hideDefaultHero
    const guide: Status = own ? 'own-layout' : statusOf(COUNTRY_GUIDE_DRAFTS[r.slug])
    const legacy = guide === 'missing' ? (r.blocks ?? []).filter(t => !SLOTTED.includes(t)).length : 0
    const cities = (r.cities ?? []).map(c => ({ ...c, status: statusOf(CITY_GUIDE_DRAFTS[`${r.slug}/${c.slug}`]) }))
    const areas = Object.entries(AREA_GUIDE_DRAFTS).filter(([k]) => k.startsWith(`${r.slug}/`)).map(([k, d]) => ({ key: k, status: statusOf(d) }))
    return { ...r, own, guide, legacy, cities, areas, sites: sites[r.slug] ?? 0 }
  })
  const count = (xs: Status[]) => ({ approved: xs.filter(x => x === 'approved').length, draft: xs.filter(x => x === 'draft').length, missing: xs.filter(x => x === 'missing').length })
  const countries = count(data.map(d => d.guide))
  const cities = count(data.flatMap(d => d.cities.map(c => c.status)))
  const areas = count(data.flatMap(d => d.areas.map(a => a.status)))

  return (
    <div className="bg-gray-50 pb-16 mw-hero-top">
      <div className="mw-container">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Location guides</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">What is written, approved or missing</h1>
        <p className="mt-3 max-w-3xl text-gray-600">Every country and city page uses the template. A place without a written guide still works: its topics come from the old page text, and any old blocks the template has no slot for stay on the page until the guide is written. Inventory counts are sample data until the API key is set.</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {([['Countries', countries], ['Cities', cities], ['Areas', areas]] as const).map(([k, c]) => (
            <div key={k} className="h-full rounded-2xl border border-mw-blue-100 bg-white p-5 shadow-mw-lg">
              <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">{k}</dt>
              <dd className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-800">{c.approved} approved</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-900">{c.draft} to review</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 font-semibold text-gray-600">{c.missing} not written</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
              <tr><th className="px-4 py-3">Country</th><th className="px-4 py-3">Country guide</th><th className="px-4 py-3">City guides</th><th className="px-4 py-3">Area guides</th><th className="px-4 py-3">Old blocks kept</th><th className="px-4 py-3">Sites</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map(d => (
                <tr key={d.slug} className="align-top">
                  <td className="px-4 py-3"><Link href={`/locations/${d.slug}`} className="mw-tap !justify-start font-semibold text-[#2563eb] hover:underline">{d.country}</Link></td>
                  <td className="px-4 py-3"><Pill s={d.guide} /></td>
                  <td className="px-4 py-3">
                    {d.cities.length === 0 ? <span className="text-gray-400">No city pages</span> : (
                      <ul className="flex flex-wrap gap-1.5">
                        {d.cities.map(c => <li key={c.slug}><Link href={`/locations/${d.slug}/${c.slug}`} className={`mw-tap inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold hover:underline ${PILL[c.status]}`}>{c.city}</Link></li>)}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {d.areas.length === 0 ? <span className="text-gray-400">None</span> : (
                      <ul className="flex flex-wrap gap-1.5">
                        {d.areas.map(a => { const [, city, area] = a.key.split('/'); return <li key={a.key}><Link href={`/locations/${a.key}`} className={`mw-tap inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold hover:underline ${PILL[a.status]}`}>{area} · {city}</Link></li> })}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{d.legacy || '–'}</td>
                  <td className="px-4 py-3 text-gray-700">{d.sites || '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-lg text-xs text-gray-500">City chips are coloured by their guide: green approved, amber to review, grey not written. Singapore uses its own venue pages and is not on this template.</p>
      </div>
    </div>
  )
}
