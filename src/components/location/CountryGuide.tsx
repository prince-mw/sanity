// The market guide of the country template (Rif, 11 Nov 2026): five fixed
// topics, each a keyword-patterned heading, its text, and a visual that is
// GENERATED from data (inventory, the city list, a calendar), never drawn per
// country. Text and visual always sit side by side, alternating sides; a topic
// with no visual keeps a reading-width column; a topic with no text is not
// rendered. No hooks here, so a server page can render it directly.

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SanityPortableText from '@/components/SanityPortableText'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import type { GuideTopic, MarketData, TopicId } from '@/lib/location/countryTemplate'

type Moment = { name: string; months: number[]; note?: string }
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const num = (n: number) => n.toLocaleString('en-US')
const short = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : String(n)
const panel = 'rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6'
const label = 'text-xs font-bold uppercase tracking-wider text-[#2563eb]'

function Facts({ data, country }: { data: MarketData; country: string }) {
  const tiles: [string, string][] = [
    [num(data.sites), data.sites === 1 ? 'site to plan' : 'sites to plan'],
    [num(data.cities.length), data.cities.length === 1 ? 'city covered' : 'cities covered'],
    [num(data.formats.length), data.formats.length === 1 ? 'format' : 'formats'],
    ...(data.impressions > 0 ? [[short(data.impressions), 'monthly impressions, as published'] as [string, string]] : []),
  ]
  return (
    <div className={panel}>
      <p className={label}>{country} at a glance</p>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map(([v, k]) => <div key={k} className="rounded-xl bg-white p-4"><dd className="text-2xl font-bold text-gray-900 sm:text-3xl">{v}</dd><dt className="mt-1 text-sm text-gray-600">{k}</dt></div>)}
      </dl>
      <p className="mt-3 text-xs text-gray-500">Counted from the sites Moving Walls can plan in {country} today.</p>
    </div>
  )
}

function Cities({ data, country, countrySlug }: { data: MarketData; country: string; countrySlug: string }) {
  const pins: MapPin[] = data.cities.filter(c => c.lat != null && c.lng != null).map(c => ({ id: c.slug, lat: c.lat!, lng: c.lng!, title: c.name, subtitle: `${c.sites} ${c.sites === 1 ? 'site' : 'sites'}`, href: `/locations/${countrySlug}/${c.slug}` }))
  const max = Math.max(...data.cities.map(c => c.sites), 1)
  return (
    <div className={panel}>
      <p className={label}>Cities by sites</p>
      {pins.length > 0 && <div className="mt-4"><BrandMap pins={pins} title={`Map of the cities Moving Walls plans in ${country}`} className="h-64 sm:h-72" /></div>}
      <ol className="mt-4 space-y-3">
        {data.cities.map(c => (
          <li key={c.slug}>
            <div className="flex items-baseline justify-between gap-3 text-sm"><Link href={`/locations/${countrySlug}/${c.slug}`} className="font-semibold text-gray-900 hover:text-[#2563eb]">{c.name}</Link><span className="text-gray-600">{c.sites} {c.sites === 1 ? 'site' : 'sites'}{c.impressions > 0 ? ` · ${short(c.impressions)} impressions / mo` : ''}</span></div>
            <div className="mt-1.5 h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-[#2563eb]" style={{ width: `${Math.max(6, Math.round((c.sites / max) * 100))}%` }} /></div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Formats({ data }: { data: MarketData }) {
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

function Seasons({ moments }: { moments: Moment[] }) {
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

export function CountryGuide({ country, countrySlug, topics, data, moments = [], proposalHref = null }: { country: string; countrySlug: string; topics: GuideTopic[]; data: MarketData; moments?: Moment[]; proposalHref?: string | null }) {
  if (topics.length === 0) return null
  const visual = (id: TopicId) => {
    if (id === 'digital') return data.sites > 0 ? <Facts data={data} country={country} /> : null
    if (id === 'audiences') return data.cities.length > 0 ? <Cities data={data} country={country} countrySlug={countrySlug} /> : null
    if (id === 'formats') return data.formats.length > 0 ? <Formats data={data} /> : null
    if (id === 'buying') return <Buying proposalHref={proposalHref} />
    return moments.length > 0 ? <Seasons moments={moments} /> : null
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
          const v = visual(t.id)
          const right = v ? side++ % 2 === 0 : false
          return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <div className={v ? 'grid items-start gap-8 lg:grid-cols-12 lg:gap-12' : ''}>
                <div className={v ? `lg:col-span-7 ${right ? '' : 'lg:order-2'}` : 'max-w-3xl'}>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
                  <div className="prose mt-4 max-w-none text-gray-700">
                    {t.blocks ? <SanityPortableText value={t.blocks as never} /> : t.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
                {v && <div className={`lg:col-span-5 lg:sticky lg:top-28 ${right ? '' : 'lg:order-1'}`}>{v}</div>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
