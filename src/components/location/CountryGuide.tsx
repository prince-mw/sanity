// The market guide of the country template (Rif, 11 Nov 2026). Three rules:
// good for SEO, a good read, good design. So: five fixed topics with
// keyword-patterned headings; short paragraphs at reading width; and every
// long piece of content is STRUCTURED (city cards, format cards, a calendar)
// instead of prose beside an empty column. Visuals are generated from data,
// never drawn per country. No hooks here, so a server page renders it directly.
//
// Colour (`tone`), settled with Rif on 11 Nov 2026: use the look the site
// already has on its Brands and Solutions pages, not a new one. Gradient icon
// tiles on white cards (emerald, orange-to-rose, amber, violet, cyan, blue),
// one soft tinted panel, one featured purple panel, and blue for data. No
// chevrons, no wave band. The calendar stays blue.
//   none  — white / off-white / blue only
//   brand — the treatment above

import Link from 'next/link'
import { ArrowRight, BarChart3, Building2, CalendarDays, Lightbulb, MapPin as MapPinIcon, Monitor, PanelTop, RectangleHorizontal, ShoppingBag, Store, TrainFront, Zap, Briefcase, Camera, Car, GraduationCap, Home, Moon, Plane, Users, type LucideIcon } from 'lucide-react'
import SanityPortableText from '@/components/SanityPortableText'
import { BrandMap, type MapPin } from '../inventory/BrandMap'
import type { GuideTopic, MarketData, TopicId } from '@/lib/location/countryTemplate'
import type { GuideDraft, GuideMoment } from '@/data/country-guide-drafts'

export type Tone = 'none' | 'brand'
// The gradients the site's product cards use, in the same order. Orange-to-rose is where the red lives.
const TILES = ['from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-rose-600', 'from-amber-500 to-yellow-600', 'from-indigo-500 to-violet-600', 'from-mw-blue-500 to-purple-600']
type PanelKind = 'soft' | 'featured' | 'plain'

/** Every colour decision in one place, so the tone is a rule and not a per-element choice. */
function look(tone: Tone) {
  const on = tone === 'brand'
  return {
    on,
    panel: (kind: PanelKind) => !on ? 'rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6'
      : kind === 'soft' ? 'rounded-2xl border-2 border-mw-blue-200 bg-gradient-to-br from-mw-blue-50 to-cyan-100 p-6 shadow-lg'
      : kind === 'featured' ? 'rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white shadow-2xl sm:p-8'
      : 'rounded-2xl border border-mw-blue-100 bg-white p-6 shadow-mw-lg',
    label: (kind: PanelKind) => `text-xs font-bold uppercase tracking-wider ${on && kind === 'featured' ? 'text-purple-200' : 'text-[#2563eb]'}`,
    card: (rest: 'white' | 'soft') => on
      ? 'group border border-mw-blue-100 bg-white shadow-mw-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-mw-xl'
      : `border border-gray-200 ${rest === 'white' ? 'bg-white' : 'bg-gray-50'}`,
    tile: (i: number) => `flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${TILES[i % TILES.length]} text-white transition-transform group-hover:scale-110`,
    chip: () => on ? 'bg-mw-blue-50 text-mw-blue-700' : 'bg-gray-100 text-gray-700',
  }
}
type Look = ReturnType<typeof look>

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const num = (n: number) => n.toLocaleString('en-US')
const short = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : String(n)
const key = (s: string) => s.trim().toLowerCase()
const FORMAT_ICONS: [RegExp, LucideIcon][] = [[/transit|rail|bus/i, TrainFront], [/mall|airport/i, ShoppingBag], [/indoor/i, Store], [/lightbox/i, Lightbulb], [/wall/i, Building2], [/gantry|bridge/i, PanelTop], [/led|videotron|digital|screen/i, Monitor], [/unipole|billboard/i, RectangleHorizontal]]
const formatIcon = (name: string): LucideIcon => FORMAT_ICONS.find(([re]) => re.test(name))?.[1] ?? Monitor
/** A panel's heading row: on the brand tone, a gradient icon tile beside the label. */
function PanelHead({ lk, kind, tile, Icon, children }: { lk: Look; kind: PanelKind; tile: number; Icon: LucideIcon; children: React.ReactNode }) {
  if (!lk.on) return <p className={lk.label(kind)}>{children}</p>
  return (
    <div className="flex items-center gap-3">
      <span className={kind === 'featured' ? 'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white' : lk.tile(tile)}><Icon className="h-6 w-6" aria-hidden="true" /></span>
      <p className={lk.label(kind)}>{children}</p>
    </div>
  )
}

function Text({ t }: { t: GuideTopic }) {
  return (
    <div className="prose mt-4 max-w-none text-gray-700">
      {t.blocks ? <SanityPortableText value={t.blocks as never} /> : t.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

function Facts({ tiles, country, note, lk }: { tiles: { value: string; label: string }[]; country: string; note: string | null; lk: Look }) {
  return (
    <div className={lk.panel('soft')}>
      <PanelHead lk={lk} kind="soft" tile={0} Icon={BarChart3}>{country} at a glance</PanelHead>
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
    <div className={lk.panel('plain')}>
      <PanelHead lk={lk} kind="plain" tile={1} Icon={Monitor}>Format mix</PanelHead>
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
    <div className={lk.panel('featured')}>
      <PanelHead lk={lk} kind="featured" tile={4} Icon={Zap}>From brief to live</PanelHead>
      <ol className="mt-5 space-y-4">
        {steps.map(([h, b], i) => <li key={h} className="flex gap-3"><span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${lk.on ? 'bg-white/20 text-white' : 'bg-[#2563eb] text-white'}`}>{i + 1}</span><div><p className={`font-semibold ${lk.on ? 'text-white' : 'text-gray-900'}`}>{h}</p><p className={`text-sm ${lk.on ? 'text-purple-100' : 'text-gray-600'}`}>{b}</p></div></li>)}
      </ol>
      {proposalHref && <Link href={proposalHref} className={`mw-tap mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold ${lk.on ? 'bg-white text-purple-700 hover:bg-purple-50' : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'}`}>Start with an instant proposal <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
    </div>
  )
}

function Seasons({ moments, lk }: { moments: GuideMoment[]; lk: Look }) {
  return (
    <div className={lk.panel('plain')}>
      <PanelHead lk={lk} kind="plain" tile={2} Icon={CalendarDays}>The year at a glance</PanelHead>
      <div className="mt-4 space-y-4">
        {moments.map(m => (
          <div key={m.name}>
            <p className="text-sm font-semibold text-gray-900">{m.name}{m.note && <span className="font-normal text-gray-500"> · {m.note}</span>}</p>
            <div className="mt-1.5 grid grid-cols-12 gap-1" role="img" aria-label={`${m.name}: ${m.months.map(x => MONTH_NAMES[x - 1]).join(', ')}`}>
              {MONTHS.map((l, i) => <span key={i} className={`flex h-7 items-center justify-center rounded text-xs font-semibold ${m.months.includes(i + 1) ? 'bg-[#2563eb] text-white' : lk.on ? 'bg-mw-blue-50 text-gray-400' : 'bg-white text-gray-400'}`}>{l}</span>)}
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
          <li key={f.name} className={`flex flex-col rounded-2xl p-5 ${lk.card('soft')}`}>
            {lk.on && (() => { const Icon = formatIcon(f.name); return <span className={`mb-4 ${lk.tile(i + 1)}`}><Icon className="h-6 w-6" aria-hidden="true" /></span> })()}
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
const PERSON_ICONS: Record<string, LucideIcon> = { commuter: TrainFront, shopper: ShoppingBag, tourist: Camera, office: Briefcase, family: Users, student: GraduationCap, nightlife: Moon, traveller: Plane, driver: Car, resident: Home }

/** City guides: who you reach, one card per audience with when they are there. */
function PeopleTopic({ t, list, lk }: { t: GuideTopic; list: { name: string; icon: string; who: string; when: string }[]; lk: Look }) {
  return (
    <>
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
        <Text t={t} />
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => { const Icon = PERSON_ICONS[p.icon] ?? Users; return (
          <li key={p.name} className={`flex gap-4 rounded-2xl p-5 ${lk.card('white')}`}>
            <span className={lk.on ? lk.tile(i + 2) : 'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-mw-blue-50 text-mw-blue-600'}><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <div className="flex min-w-0 flex-1 flex-col">
              <h4 className="font-bold text-gray-900">{p.name}</h4>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-700">{p.who}</p>
              <p className="mt-3 text-xs font-semibold text-[#2563eb]">{p.when}</p>
            </div>
          </li>
        ) })}
      </ul>
    </>
  )
}

function CitiesTopic({ t, draft, data, country, linkBase, cityLinks, lk }: { t: GuideTopic; draft: GuideDraft | null; data: MarketData; country: string; linkBase: string; cityLinks: Record<string, string>; lk: Look }) {
  const stat = (name: string) => data.cities.find(c => key(c.name) === key(name)) ?? null
  // Written cities carry their own coordinates; without a written guide, the inventory's cities are used.
  const cities = draft?.audiences.cities ?? data.cities.filter(c => c.lat != null && c.lng != null).map(c => ({ name: c.name, lat: c.lat!, lng: c.lng!, body: '', bestFor: [] as string[] }))
  const hrefOf = (name: string) => cityLinks[key(name)] ?? (stat(name) ? `${linkBase}/${stat(name)!.slug}` : null)
  const pins: MapPin[] = cities.map(c => { const s = stat(c.name); return { id: key(c.name), lat: c.lat, lng: c.lng, title: c.name, subtitle: s ? `${s.sites} ${s.sites === 1 ? 'site' : 'sites'}` : c.bestFor[0] ?? undefined, href: hrefOf(c.name) ?? undefined } })
  return (
    <>
      <div className={pins.length ? 'grid items-start gap-8 lg:grid-cols-12 lg:gap-12' : ''}>
        <div className={pins.length ? 'lg:col-span-5' : 'max-w-3xl'}>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">{t.heading}</h3>
          <Text t={t} />
        </div>
        {pins.length > 0 && <div className="lg:col-span-7"><BrandMap pins={pins} title={`Map of where to advertise in ${country}`} className="h-72 sm:h-80 lg:h-[360px]" /></div>}
      </div>
      {draft && (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {draft.audiences.cities.map((c, i) => { const s = stat(c.name); const href = hrefOf(c.name); return (
            <li key={c.name} className={`flex flex-col rounded-2xl p-6 ${lk.card('white')}`}>
              {lk.on && <span className={`mb-4 ${lk.tile(i)}`}><MapPinIcon className="h-6 w-6" aria-hidden="true" /></span>}
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-lg font-bold text-gray-900">{c.name}</h4>
                {s && <span className="flex-shrink-0 text-xs font-semibold text-[#2563eb]">{s.sites} {s.sites === 1 ? 'site' : 'sites'}{s.impressions > 0 ? ` · ${short(s.impressions)} / mo` : ''}</span>}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{c.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${c.name} is best for`}>{c.bestFor.map(b => <li key={b} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${lk.chip()}`}>{b}</li>)}</ul>
              {href && <Link href={href} className="mw-tap mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#2563eb] hover:underline">Advertising in {c.name} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
            </li>
          ) })}
        </ul>
      )}
    </>
  )
}

/**
 * `country` is the place the guide is about (a country, or a city on the city template).
 * `linkBase` is where its place cards link under; `placeWord` names those places.
 */
export function CountryGuide({ country, countrySlug, topics, data, draft = null, cityLinks = {}, proposalHref = null, tone = 'none', linkBase, placeWord = ['city', 'cities'] }: { country: string; countrySlug: string; topics: GuideTopic[]; data: MarketData; draft?: GuideDraft | null; cityLinks?: Record<string, string>; proposalHref?: string | null; tone?: Tone; linkBase?: string; placeWord?: [string, string] }) {
  if (topics.length === 0) return null
  const lk = look(tone)
  const inventoryTiles = data.sites > 0 ? [
    { value: num(data.sites), label: data.sites === 1 ? 'site to plan' : 'sites to plan' },
    { value: num(data.cities.length), label: `${data.cities.length === 1 ? placeWord[0] : placeWord[1]} covered` },
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
          if (t.id === 'people' && draft?.people?.list.length) return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <PeopleTopic t={t} list={draft.people.list} lk={lk} />
            </article>
          )
          if (t.id === 'audiences') return (
            <article key={t.id} id={`guide-${t.id}`} className="mt-12 scroll-mt-28 border-t border-gray-200 pt-12">
              <CitiesTopic t={t} draft={draft} data={data} country={country} linkBase={linkBase ?? `/locations/${countrySlug}`} cityLinks={cityLinks} lk={lk} />
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
