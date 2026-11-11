// The market guide of the country template (Rif, 11 Nov 2026). Three rules:
// good for SEO, a good read, good design. So: five fixed topics with
// keyword-patterned headings; short paragraphs at reading width; and every
// long piece of content is STRUCTURED (city cards, a format list, a calendar)
// instead of prose beside an empty column. Visuals are generated from data,
// never drawn per country. No hooks here, so a server page renders it directly.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SanityPortableText from '@/components/SanityPortableText'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import type { GuideTopic, MarketData, TopicId } from '@/lib/location/countryTemplate'
import type { GuideDraft, GuideMoment } from '@/data/country-guide-drafts'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const num = (n: number) => n.toLocaleString('en-US')
const short = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : String(n)
const key = (s: string) => s.trim().toLowerCase()
const panel = 'rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6'
const label = 'text-xs font-bold uppercase tracking-wider text-[#2563eb]'

function Text({ t }: { t: GuideTopic }) {
  return (
    <div className="prose mt-4 max-w-none text-gray-700">
      {t.blocks ? <SanityPortableText value={t.blocks as never} /> : t.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Facts({ tiles, country, note }: { tiles: { value: string; label: string }[]; country: string; note: string | null }) {
  return (
    <div className={panel}>
      <p className={label}>{country} at a glance</p>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map(t => <div key={t.label} className="rounded-xl bg-white p-4"><dd className="text-2xl font-bold text-gray-900 sm:text-3xl">{t.value}</dd><dt className="mt-1 text-sm text-gray-600">{t.label}</dt></div>)}
      </dl>
      {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
    </div>
  )
}

/** The formats topic: a short intro, then one card per format across the full width (same rule as the cities). */
function FormatsTopic({ t, list, data }: { t: GuideTopic; list: { name: string; job: string }[]; data: MarketData }) {
  const count = (name: string) => data.formats.find(f => key(f.name) === key(name))?.sites ?? 0
  const cols = list.length === 5 ? 'lg:grid-cols-5' : list.length % 3 === 0 && list.length % 4 !== 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  return (
    <>
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
        <Text t={t} />
      </div>
      <ul className={`mt-8 grid gap-4 sm:grid-cols-2 ${cols}`}>
        {list.map(f => (
          <li key={f.name} className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <h4 className="font-bold text-gray-900">{f.name}</h4>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{f.job}</p>
            {count(f.name) > 0 && <p className="mt-3 text-xs font-semibold text-[#2563eb]">{count(f.name)} {count(f.name) === 1 ? 'site' : 'sites'} to plan</p>}
          </li>
        ))}
      </ul>
    </>
  )
}

function FormatMix({ data }: { data: MarketData }) {
  const max = Math.max(...data.formats.map(f => f.sites), 1)
  return (
    <div className={panel}>
      <p className={label}>Format mix</p>
      <ol className="mt-4 space-y-3">
        {data.formats.map((f, i) => (
          <li key={f.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm"><span className="font-semibold text-gray-900">{f.name}</span><span className="text-gray-600">{f.sites} {f.sites === 1 ? 'site' : 'sites'}</span></div>
            <div className="mt-1.5 h-2 rounded-full bg-gray-200"><div className={`h-2 rounded-full ${i % 2 ? 'bg-[#66C9F3]' : 'bg-[#2563eb]'}`} style={{ width: `${Math.max(6, Math.round((f.sites / max) * 100))}%` }} /></div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Buying({ proposalHref }: { proposalHref: string | null }) {
  const steps: [string, string][] = [['Brief', 'Objective, dates, cities and audience.'], ['Site list', 'Sites picked for the brief, checked for your dates.'], ['Artwork', 'One file per site, to its specification.'], ['Live and measured', 'Play reports and audience results.']]
  return (
    <div className={panel}>
      <p className={label}>From brief to live</p>
      <ol className="mt-4 space-y-4">
        {steps.map(([h, b], i) => <li key={h} className="flex gap-3"><span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">{i + 1}</span><div><p className="font-semibold text-gray-900">{h}</p><p className="text-sm text-gray-600">{b}</p></div></li>)}
      </ol>
      {proposalHref && <Link href={proposalHref} className="mw-tap mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]">Start with an instant proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
    </div>
  )
}

function Seasons({ moments }: { moments: GuideMoment[] }) {
  return (
    <div className={panel}>
      <p className={label}>The year at a glance</p>
      <div className="mt-4 space-y-4">
        {moments.map(m => (
          <div key={m.name}>
            <p className="text-sm font-semibold text-gray-900">{m.name}{m.note && <span className="font-normal text-gray-500"> · {m.note}</span>}</p>
            <div className="mt-1.5 grid grid-cols-12 gap-1" role="img" aria-label={`${m.name}: ${m.months.map(x => MONTH_NAMES[x - 1]).join(', ')}`}>
              {MONTHS.map((l, i) => <span key={i} className={`flex h-7 items-center justify-center rounded text-[11px] font-semibold ${m.months.includes(i + 1) ? 'bg-[#2563eb] text-white' : 'bg-white text-gray-400'}`}>{l}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The cities topic: a short intro beside the map, then one card per city across the full width. */
function CitiesTopic({ t, draft, data, country, countrySlug, cityLinks }: { t: GuideTopic; draft: GuideDraft | null; data: MarketData; country: string; countrySlug: string; cityLinks: Record<string, string> }) {
  const stat = (name: string) => data.cities.find(c => key(c.name) === key(name)) ?? null
  // Written cities carry their own coordinates; without a written guide, the inventory's cities are used.
  const cities = draft?.audiences.cities ?? data.cities.filter(c => c.lat != null && c.lng != null).map(c => ({ name: c.name, lat: c.lat!, lng: c.lng!, body: '', bestFor: [] as string[] }))
  const hrefOf = (name: string) => cityLinks[key(name)] ?? (stat(name) ? `/locations/${countrySlug}/${stat(name)!.slug}` : null)
  const pins: MapPin[] = cities.map(c => { const s = stat(c.name); return { id: key(c.name), lat: c.lat, lng: c.lng, title: c.name, subtitle: s ? `${s.sites} ${s.sites === 1 ? 'site' : 'sites'}` : c.bestFor[0] ?? undefined, href: hrefOf(c.name) ?? undefined } })
  return (
    <>
      <div className={pins.length ? 'grid items-start gap-8 lg:grid-cols-12 lg:gap-12' : ''}>
        <div className={pins.length ? 'lg:col-span-5' : 'max-w-3xl'}>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
          <Text t={t} />
        </div>
        {pins.length > 0 && <div className="lg:col-span-7"><BrandMap pins={pins} title={`Map of the cities to advertise in, ${country}`} className="h-72 sm:h-80 lg:h-[360px]" /></div>}
      </div>
      {draft && (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {draft.audiences.cities.map(c => { const s = stat(c.name); const href = hrefOf(c.name); return (
            <li key={c.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-lg font-bold text-gray-900">{c.name}</h4>
                {s && <span className="flex-shrink-0 text-xs font-semibold text-[#2563eb]">{s.sites} {s.sites === 1 ? 'site' : 'sites'}{s.impressions > 0 ? ` · ${short(s.impressions)} / mo` : ''}</span>}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{c.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${c.name} is best for`}>{c.bestFor.map(b => <li key={b} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">{b}</li>)}</ul>
              {href && <Link href={href} className="mw-tap mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#2563eb] hover:underline">Advertising in {c.name} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            </li>
          ) })}
        </ul>
      )}
    </>
  )
}

export function CountryGuide({ country, countrySlug, topics, data, draft = null, cityLinks = {}, proposalHref = null }: { country: string; countrySlug: string; topics: GuideTopic[]; data: MarketData; draft?: GuideDraft | null; cityLinks?: Record<string, string>; proposalHref?: string | null }) {
  if (topics.length === 0) return null
  const inventoryTiles = data.sites > 0 ? [
    { value: num(data.sites), label: data.sites === 1 ? 'site to plan' : 'sites to plan' },
    { value: num(data.cities.length), label: data.cities.length === 1 ? 'city covered' : 'cities covered' },
    { value: num(data.formats.length), label: data.formats.length === 1 ? 'format' : 'formats' },
    ...(data.impressions > 0 ? [{ value: short(data.impressions), label: 'monthly impressions, as published' }] : []),
  ] : null
  const visual = (id: TopicId) => {
    if (id === 'digital') { const tiles = inventoryTiles ?? draft?.facts ?? null; return tiles ? <Facts tiles={tiles} country={country} note={inventoryTiles ? `Counted from the sites Moving Walls can plan in ${country} today.` : null} /> : null }
    if (id === 'formats') return data.formats.length > 0 ? <FormatMix data={data} /> : null
    if (id === 'buying') return <Buying proposalHref={proposalHref} />
    if (id === 'seasons') return draft?.moments.length ? <Seasons moments={draft.moments} /> : null
    return null
  }
  let side = 0
  return (
    <section className="bg-white mw-section" aria-labelledby="country-guide-title">
      <div className="mw-container">
        <p className={label}>Market guide</p>
        <h2 id="country-guide-title" className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">Out-of-home advertising in {country}</h2>
        <nav aria-label="In this guide" className="mt-6 flex flex-wrap gap-2">
          {topics.map(t => <a key={t.id} href={`#guide-${t.id}`} className="mw-tap rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]">{t.heading.split(':')[0]}</a>)}
        </nav>
        {topics.map(t => {
          if (t.id === 'audiences') return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <CitiesTopic t={t} draft={draft} data={data} country={country} countrySlug={countrySlug} cityLinks={cityLinks} />
            </article>
          )
          if (t.id === 'formats' && draft?.formats.list.length) return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <FormatsTopic t={t} list={draft.formats.list} data={data} />
            </article>
          )
          const v = visual(t.id)
          const right = v ? side++ % 2 === 0 : false
          return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <div className={v ? 'grid items-start gap-8 lg:grid-cols-12 lg:gap-12' : ''}>
                <div className={v ? `lg:col-span-7 ${right ? '' : 'lg:order-2'}` : 'max-w-3xl'}>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
                  <Text t={t} />
                </div>
                {v && <div className={`lg:col-span-5 ${right ? '' : 'lg:order-1'}`}>{v}</div>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
