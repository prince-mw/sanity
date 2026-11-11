// The market guide of the country template (Rif, 11 Nov 2026). Three rules:
// good for SEO, a good read, good design. So: five fixed topics with
// keyword-patterned headings; short paragraphs at reading width; and every
// long piece of content is STRUCTURED (city cards, format cards, a calendar)
// instead of prose beside an empty column. Visuals are generated from data,
// never drawn per country. No hooks here, so a server page renders it directly.
//
// Colour (`tone`): the site blue stays the main colour and the page stays
// light. The brand guide's three accent families — Sunburst, Emerald Wave,
// Crimson Blend — are "supporting accents" for small elements, so they tint
// panels, top bars, tags and hover states, never large areas.
//   none — white / off-white / blue only
//   a    — each topic owns one accent; its panels and cards carry a light tint
//   b    — white at rest; colour arrives on hover, a different accent per card
//   c    — a coloured top bar on every card, tinted panels, tint on hover

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SanityPortableText from '@/components/SanityPortableText'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import type { GuideTopic, MarketData, TopicId } from '@/lib/location/countryTemplate'
import type { GuideDraft, GuideMoment } from '@/data/country-guide-drafts'

export type Tone = 'none' | 'a' | 'b' | 'c'
type AccentId = 'sky' | 'sun' | 'emerald' | 'crimson'
// Full class strings (Tailwind only keeps classes it can read whole). Tints are the guide's colours at ~10%.
const AC: Record<AccentId, { tint: string; line: string; ink: string; bar: string; hov: string; chip: string; fill: string }> = {
  sky: { tint: 'bg-[#EEF7FE]', line: 'border-[#BFE7FB]', ink: 'text-[#2554A2]', bar: 'border-t-[#66C9F3]', hov: 'hover:bg-[#EEF7FE] hover:border-[#66C9F3]', chip: 'bg-[#DDF1FD] text-[#1F4788]', fill: 'bg-[#2563eb] text-white' },
  sun: { tint: 'bg-[#FFF9E0]', line: 'border-[#FBE58A]', ink: 'text-[#8A5200]', bar: 'border-t-[#FEDA24]', hov: 'hover:bg-[#FFF9E0] hover:border-[#F5B922]', chip: 'bg-[#FFF1B8] text-[#7A4A00]', fill: 'bg-[#FEDA24] text-[#1B1E2B]' },
  emerald: { tint: 'bg-[#ECF9EC]', line: 'border-[#BDEBBB]', ink: 'text-[#25534A]', bar: 'border-t-[#6DDF6A]', hov: 'hover:bg-[#ECF9EC] hover:border-[#6DDF6A]', chip: 'bg-[#D6F3D5] text-[#25534A]', fill: 'bg-[#3E9B5A] text-white' },
  crimson: { tint: 'bg-[#FDEEED]', line: 'border-[#F6C1BF]', ink: 'text-[#871A1C]', bar: 'border-t-[#E03A36]', hov: 'hover:bg-[#FDEEED] hover:border-[#E03A36]', chip: 'bg-[#FBDAD8] text-[#871A1C]', fill: 'bg-[#E03A36] text-white' },
}
const TOPIC_ACCENT: Record<TopicId, AccentId> = { digital: 'sky', audiences: 'sun', formats: 'emerald', buying: 'sky', seasons: 'crimson' }
const CYCLE: AccentId[] = ['sky', 'sun', 'emerald', 'crimson']

/** Every colour decision in one place, so a tone is a rule and not a per-element choice. */
function look(tone: Tone) {
  const tinted = tone === 'a' || tone === 'c'
  return {
    panel: (t: TopicId) => `rounded-2xl border p-5 sm:p-6 ${tinted ? `${AC[TOPIC_ACCENT[t]].tint} ${AC[TOPIC_ACCENT[t]].line}` : 'border-gray-200 bg-gray-50'} ${tone === 'b' ? `border-t-4 ${AC[TOPIC_ACCENT[t]].bar}` : ''}`,
    label: (t: TopicId) => `text-xs font-bold uppercase tracking-wider ${tinted ? AC[TOPIC_ACCENT[t]].ink : 'text-[#2563eb]'}`,
    card: (t: TopicId, i: number, rest: 'white' | 'soft') => {
      const own = AC[TOPIC_ACCENT[t]], turn = AC[CYCLE[i % CYCLE.length]]
      if (tone === 'a') return `border ${own.tint} ${own.line}`
      if (tone === 'b') return `border border-gray-200 bg-white transition-colors duration-200 ${turn.hov}`
      if (tone === 'c') return `border border-gray-200 border-t-4 ${turn.bar} bg-white transition-colors duration-200 ${turn.hov}`
      return `border border-gray-200 ${rest === 'white' ? 'bg-white' : 'bg-gray-50'}`
    },
    chip: (t: TopicId, i: number) => tone === 'a' ? `bg-white/80 ${AC[TOPIC_ACCENT[t]].ink}` : tone === 'c' ? AC[CYCLE[i % CYCLE.length]].chip : 'bg-gray-100 text-gray-700',
    fill: (t: TopicId) => tinted ? AC[TOPIC_ACCENT[t]].fill : 'bg-[#2563eb] text-white',
  }
}
type Look = ReturnType<typeof look>

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const num = (n: number) => n.toLocaleString('en-US')
const short = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : String(n)
const key = (s: string) => s.trim().toLowerCase()

function Text({ t }: { t: GuideTopic }) {
  return (
    <div className="prose mt-4 max-w-none text-gray-700">
      {t.blocks ? <SanityPortableText value={t.blocks as never} /> : t.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Facts({ tiles, country, note, lk }: { tiles: { value: string; label: string }[]; country: string; note: string | null; lk: Look }) {
  return (
    <div className={lk.panel('digital')}>
      <p className={lk.label('digital')}>{country} at a glance</p>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        {tiles.map(t => <div key={t.label} className="rounded-xl bg-white p-4"><dd className="text-2xl font-bold text-gray-900 sm:text-3xl">{t.value}</dd><dt className="mt-1 text-sm text-gray-600">{t.label}</dt></div>)}
      </dl>
      {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
    </div>
  )
}

function FormatMix({ data, lk }: { data: MarketData; lk: Look }) {
  const max = Math.max(...data.formats.map(f => f.sites), 1)
  return (
    <div className={lk.panel('formats')}>
      <p className={lk.label('formats')}>Format mix</p>
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

function Buying({ proposalHref, lk }: { proposalHref: string | null; lk: Look }) {
  const steps: [string, string][] = [['Brief', 'Objective, dates, cities and audience.'], ['Site list', 'Sites picked for the brief, checked for your dates.'], ['Artwork', 'One file per site, to its specification.'], ['Live and measured', 'Play reports and audience results.']]
  return (
    <div className={lk.panel('buying')}>
      <p className={lk.label('buying')}>From brief to live</p>
      <ol className="mt-4 space-y-4">
        {steps.map(([h, b], i) => <li key={h} className="flex gap-3"><span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white">{i + 1}</span><div><p className="font-semibold text-gray-900">{h}</p><p className="text-sm text-gray-600">{b}</p></div></li>)}
      </ol>
      {proposalHref && <Link href={proposalHref} className="mw-tap mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]">Start with an instant proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
    </div>
  )
}

function Seasons({ moments, lk }: { moments: GuideMoment[]; lk: Look }) {
  return (
    <div className={lk.panel('seasons')}>
      <p className={lk.label('seasons')}>The year at a glance</p>
      <div className="mt-4 space-y-4">
        {moments.map(m => (
          <div key={m.name}>
            <p className="text-sm font-semibold text-gray-900">{m.name}{m.note && <span className="font-normal text-gray-500"> · {m.note}</span>}</p>
            <div className="mt-1.5 grid grid-cols-12 gap-1" role="img" aria-label={`${m.name}: ${m.months.map(x => MONTH_NAMES[x - 1]).join(', ')}`}>
              {MONTHS.map((l, i) => <span key={i} className={`flex h-7 items-center justify-center rounded text-[11px] font-semibold ${m.months.includes(i + 1) ? lk.fill('seasons') : 'bg-white text-gray-400'}`}>{l}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The formats topic: a short intro, then one card per format across the full width (same rule as the cities). */
function FormatsTopic({ t, list, data, lk }: { t: GuideTopic; list: { name: string; job: string }[]; data: MarketData; lk: Look }) {
  const count = (name: string) => data.formats.find(f => key(f.name) === key(name))?.sites ?? 0
  const cols = list.length === 5 ? 'lg:grid-cols-5' : list.length % 3 === 0 && list.length % 4 !== 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  return (
    <>
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
        <Text t={t} />
      </div>
      <ul className={`mt-8 grid gap-4 sm:grid-cols-2 ${cols}`}>
        {list.map((f, i) => (
          <li key={f.name} className={`flex flex-col rounded-2xl p-5 ${lk.card('formats', i, 'soft')}`}>
            <h4 className="font-bold text-gray-900">{f.name}</h4>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{f.job}</p>
            {count(f.name) > 0 && <p className="mt-3 text-xs font-semibold text-[#2563eb]">{count(f.name)} {count(f.name) === 1 ? 'site' : 'sites'} to plan</p>}
          </li>
        ))}
      </ul>
    </>
  )
}

/** The cities topic: a short intro beside the map, then one card per city across the full width. */
function CitiesTopic({ t, draft, data, country, countrySlug, cityLinks, lk }: { t: GuideTopic; draft: GuideDraft | null; data: MarketData; country: string; countrySlug: string; cityLinks: Record<string, string>; lk: Look }) {
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
          {draft.audiences.cities.map((c, i) => { const s = stat(c.name); const href = hrefOf(c.name); return (
            <li key={c.name} className={`flex flex-col rounded-2xl p-5 ${lk.card('audiences', i, 'white')}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-lg font-bold text-gray-900">{c.name}</h4>
                {s && <span className="flex-shrink-0 text-xs font-semibold text-[#2563eb]">{s.sites} {s.sites === 1 ? 'site' : 'sites'}{s.impressions > 0 ? ` · ${short(s.impressions)} / mo` : ''}</span>}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{c.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${c.name} is best for`}>{c.bestFor.map(b => <li key={b} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${lk.chip('audiences', i)}`}>{b}</li>)}</ul>
              {href && <Link href={href} className="mw-tap mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#2563eb] hover:underline">Advertising in {c.name} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            </li>
          ) })}
        </ul>
      )}
    </>
  )
}

export function CountryGuide({ country, countrySlug, topics, data, draft = null, cityLinks = {}, proposalHref = null, tone = 'none' }: { country: string; countrySlug: string; topics: GuideTopic[]; data: MarketData; draft?: GuideDraft | null; cityLinks?: Record<string, string>; proposalHref?: string | null; tone?: Tone }) {
  if (topics.length === 0) return null
  const lk = look(tone)
  const inventoryTiles = data.sites > 0 ? [
    { value: num(data.sites), label: data.sites === 1 ? 'site to plan' : 'sites to plan' },
    { value: num(data.cities.length), label: data.cities.length === 1 ? 'city covered' : 'cities covered' },
    { value: num(data.formats.length), label: data.formats.length === 1 ? 'format' : 'formats' },
    ...(data.impressions > 0 ? [{ value: short(data.impressions), label: 'monthly impressions, as published' }] : []),
  ] : null
  const visual = (id: TopicId) => {
    if (id === 'digital') { const tiles = inventoryTiles ?? draft?.facts ?? null; return tiles ? <Facts tiles={tiles} country={country} note={inventoryTiles ? `Counted from the sites Moving Walls can plan in ${country} today.` : null} lk={lk} /> : null }
    if (id === 'formats') return data.formats.length > 0 ? <FormatMix data={data} lk={lk} /> : null
    if (id === 'buying') return <Buying proposalHref={proposalHref} lk={lk} />
    if (id === 'seasons') return draft?.moments.length ? <Seasons moments={draft.moments} lk={lk} /> : null
    return null
  }
  let side = 0
  return (
    <section className="bg-white mw-section" aria-labelledby="country-guide-title">
      <div className="mw-container">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Market guide</p>
        <h2 id="country-guide-title" className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">Out-of-home advertising in {country}</h2>
        <nav aria-label="In this guide" className="mt-6 flex flex-wrap gap-2">
          {topics.map(t => <a key={t.id} href={`#guide-${t.id}`} className="mw-tap rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]">{t.heading.split(':')[0]}</a>)}
        </nav>
        {topics.map(t => {
          if (t.id === 'audiences') return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <CitiesTopic t={t} draft={draft} data={data} country={country} countrySlug={countrySlug} cityLinks={cityLinks} lk={lk} />
            </article>
          )
          if (t.id === 'formats' && draft?.formats.list.length) return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <FormatsTopic t={t} list={draft.formats.list} data={data} lk={lk} />
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
