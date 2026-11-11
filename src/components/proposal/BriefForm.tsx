'use client'

// /proposals/new — the brief. Markets, dates, objective, audience, budget band
// (sizes the list, never shown), formats and the shortlist built while
// browsing. Registration (LeadForm, purpose "proposal") happens once, on the
// first submit; then the proposal is generated and the creator lands on its
// edit link. Rif, 11 Nov 2026.

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { LeadForm } from '../forms/LeadForm'
import { SG_NAVY } from '../SingaporeShared'
import { useShortlist } from '@/lib/proposal/shortlist'
import { BUDGET_BANDS, DURATIONS, OBJECTIVES, targetSitesFor, type Market } from '@/lib/proposal/markets'
import type { Objective } from '@/lib/proposal/types'

type Props = { markets: Market[]; formats: Record<string, string[]> }

const input = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 focus:border-mw-blue-500 focus:outline-none'
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#2563eb]'}`

export function BriefForm({ markets, formats }: Props) {
  const router = useRouter()
  const { items, remove, clear, ready } = useShortlist()
  const [countrySlug, setCountrySlug] = useState(markets[0].countrySlug)
  const [cities, setCities] = useState<string[]>([markets[0].cities.find(c => c.available)?.slug ?? markets[0].cities[0].slug])
  const [countryWide, setCountryWide] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [duration, setDuration] = useState<number>(4)
  const [objective, setObjective] = useState<Objective | null>(null)
  const [audience, setAudience] = useState('')
  const [industry, setIndustry] = useState('')
  const [budget, setBudget] = useState<string>('mid')
  const [picked, setPicked] = useState<string[]>([])
  const [count, setCount] = useState<number>(targetSitesFor('mid'))
  const [countTouched, setCountTouched] = useState(false)
  const [registered, setRegistered] = useState<boolean | null>(null)
  const [gate, setGate] = useState(false)
  const [busy, setBusy] = useState<'brief' | 'shortlist' | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { fetch('/api/proposals/access').then(r => r.json()).then(j => setRegistered(j.state === 'registered')).catch(() => setRegistered(false)) }, [])
  useEffect(() => { if (!countTouched) setCount(targetSitesFor(budget)) }, [budget, countTouched])

  const marketDef = markets.find(m => m.countrySlug === countrySlug) ?? markets[0]
  const chosen = countryWide ? marketDef.cities.map(c => c.slug) : cities
  const shortlistHere = items.filter(i => i.countrySlug === countrySlug && chosen.includes(i.citySlug))
  const formatChoices = Array.from(new Set(chosen.flatMap(c => formats[`${countrySlug}/${c}`] ?? []))).sort()
  const leadCity = chosen.find(c => marketDef.cities.find(x => x.slug === c)?.available) ?? chosen[0]
  const toggleCity = (slug: string) => setCities(cs => cs.includes(slug) ? (cs.length > 1 ? cs.filter(x => x !== slug) : cs) : [...cs, slug])
  const minDate = new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 10)

  const generate = async (mode: 'brief' | 'shortlist') => {
    setBusy(mode); setError(null)
    const body = {
      mode, shortlistIds: shortlistHere.map(i => i.id),
      brief: { countrySlug, cities: chosen, countryWide, citySlug: leadCity, startDate: startDate || null, durationWeeks: duration, objective, audience, industry, budgetBand: budget, formats: picked, targetSites: count },
    }
    const r = await fetch('/api/proposals', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    if (r?.status === 401) { setBusy(null); setRegistered(false); setGate(true); return }
    if (!r || !r.ok) { setBusy(null); setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    clear()
    router.push(`/proposals/${j.shareId}/edit?t=${encodeURIComponent(j.editToken)}`)
  }

  const [pendingMode, setPendingMode] = useState<'brief' | 'shortlist'>('brief')
  const submit = (mode: 'brief' | 'shortlist') => {
    if (mode === 'brief' && !objective) { setError('Pick an objective so we know what the campaign is for.'); return }
    setPendingMode(mode)
    if (registered === false) { setGate(true); return }
    generate(mode)
  }

  return (
    <div className="bg-white text-gray-900">
      <section className={`relative overflow-hidden ${SG_NAVY} text-white pb-10 lg:pb-14 mw-hero-top`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="relative mw-container">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-300">Instant proposal</span>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">Your OOH proposal, in a minute.</h1>
          <p className="mt-3 max-w-[60ch] text-lg text-blue-100/90">Tell us what the campaign is for and who it should reach. We match it to real sites with the reason for each, on a link you can share, print and change whenever the client does.</p>
        </div>
      </section>

      <section className="bg-gray-50 mw-section">
        <div className="mw-container grid gap-10 lg:grid-cols-12">
          <form className="lg:col-span-7 space-y-7" onSubmit={e => { e.preventDefault(); submit('brief') }}>
            <fieldset>
              <legend className="text-lg font-bold text-[#2563eb]">Where and when</legend>
              <div className="mt-3">
                <span className="text-sm font-semibold text-gray-700">Country</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {markets.map(m => <button key={m.countrySlug} type="button" aria-pressed={countrySlug === m.countrySlug} onClick={() => { setCountrySlug(m.countrySlug); setCities([m.cities.find(c => c.available)?.slug ?? m.cities[0].slug]); setCountryWide(false) }} className={chip(countrySlug === m.countrySlug)}>{m.countryName}</button>)}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-semibold text-gray-700">Cities <span className="font-normal text-gray-400">(pick one or more)</span></span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" aria-pressed={countryWide} onClick={() => setCountryWide(w => !w)} className={chip(countryWide)}>Whole of {marketDef.countryName}</button>
                  {marketDef.cities.map(c => (
                    <button key={c.slug} type="button" disabled={countryWide} aria-pressed={chosen.includes(c.slug)} onClick={() => toggleCity(c.slug)} className={`${chip(chosen.includes(c.slug))} disabled:opacity-60`}>
                      {c.name}{!c.available && <span className="ml-1 font-normal text-gray-400">· on request</span>}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">Cities marked “on request” have no inventory on the site yet: a planner builds them by hand and adds them to your proposal.</p>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-semibold text-gray-700">Start <span className="font-normal text-gray-400">(optional)</span></span>
                  <input type="date" min={minDate} value={startDate} onChange={e => setStartDate(e.target.value)} className={input} />
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Duration</span>
                  <select value={duration} onChange={e => setDuration(Number(e.target.value))} className={input}>
                    {DURATIONS.map(d => <option key={d} value={d}>{d} weeks</option>)}
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-[#2563eb]">What it is for</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {OBJECTIVES.map(o => (
                  <button key={o.id} type="button" onClick={() => setObjective(o.id)} aria-pressed={objective === o.id}
                    className={`mw-tap flex-col !items-start !justify-start rounded-xl border p-4 text-left transition-colors ${objective === o.id ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-gray-200 bg-white hover:border-[#2563eb]'}`}>
                    <span className="block font-bold">{o.label}</span>
                    <span className={`block text-sm ${objective === o.id ? 'text-blue-100/90' : 'text-gray-600'}`}>{o.hint}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2"><span className="text-sm font-semibold text-gray-700">Who should see it? <span className="font-normal text-gray-400">(in your words)</span></span>
                  <textarea value={audience} onChange={e => setAudience(e.target.value)} rows={3} maxLength={600} placeholder="e.g. Office workers in the Golden Triangle, 25–45, who shop at KLCC and Pavilion after work" className={input} />
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Industry <span className="font-normal text-gray-400">(optional)</span></span>
                  <input value={industry} onChange={e => setIndustry(e.target.value)} maxLength={80} placeholder="e.g. Beauty, Banking, F&B" className={input} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-[#2563eb]">Size of the plan</legend>
              <p className="mt-1 text-sm text-gray-600">The budget band only sizes the site list. It is never shown on the proposal.</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-semibold text-gray-700">Budget band</span>
                  <select value={budget} onChange={e => setBudget(e.target.value)} className={input}>
                    {BUDGET_BANDS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                  </select>
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Roughly how many sites</span>
                  <input type="number" min={2} max={12} value={count} onChange={e => { setCountTouched(true); setCount(Number(e.target.value)) }} className={input} />
                </label>
              </div>
              {formatChoices.length > 0 && (
                <div className="mt-4">
                  <span className="text-sm font-semibold text-gray-700">Preferred formats <span className="font-normal text-gray-400">(optional)</span></span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formatChoices.map(f => <button key={f} type="button" aria-pressed={picked.includes(f)} onClick={() => setPicked(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f])} className={chip(picked.includes(f))}>{f}</button>)}
                  </div>
                </div>
              )}
            </fieldset>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" disabled={busy !== null} className="mw-tap inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60">
                {busy === 'brief' ? 'Matching sites…' : 'Generate my proposal'}
              </button>
              <p className="self-center text-sm text-gray-500">{busy === 'brief' ? 'This takes about 15 seconds.' : 'No sales call needed. Our team confirms availability after.'}</p>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#2563eb]">Sites you shortlisted</h2>
              {!ready || shortlistHere.length === 0 ? (
                <p className="mt-2 text-sm text-gray-600">None yet. Browse <Link href={`/locations/${countrySlug}/${leadCity}`} className="font-semibold text-mw-blue-600 hover:underline">the sites in {marketDef.cities.find(c => c.slug === leadCity)?.name}</Link> and tap “Add to proposal” on any you like. They are always kept in the plan.</p>
              ) : (
                <>
                  <p className="mt-1 text-sm text-gray-600">These are kept in the plan whatever the brief says.</p>
                  <ul className="mt-3 divide-y divide-gray-100">
                    {shortlistHere.map(i => (
                      <li key={i.id} className="flex items-center gap-3 py-2.5">
                        <span className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">{i.photo && <Image src={i.photo} alt="" fill sizes="64px" className="object-cover" />}</span>
                        <span className="min-w-0 flex-1"><span className="block truncate font-semibold text-gray-900">{i.name}</span><span className="block text-xs text-gray-500">{[i.format, i.areaName].filter(Boolean).join(' · ')}</span></span>
                        <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`} className="mw-tap rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X className="h-4 w-4" aria-hidden="true" /></button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => submit('shortlist')} disabled={busy !== null} className="mw-tap mt-4 w-full rounded-lg border-2 border-[#2563eb] bg-white px-4 py-2.5 font-semibold text-[#2563eb] hover:bg-mw-blue-50 disabled:opacity-60">
                    {busy === 'shortlist' ? 'Building…' : `Build from these ${shortlistHere.length} sites only`}
                  </button>
                </>
              )}
            </div>
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              <h3 className="font-bold text-[#2563eb]">What you get</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>A proposal page with every site’s photo, format, area, audience figures and why it was picked.</li>
                <li>A private link to share with your client, and a print view.</li>
                <li>Change sites or the brief any time; the same link shows the new version.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <LeadForm open={gate} purpose="proposal" closeOnSuccess onClose={() => setGate(false)}
        title="Register once to build proposals" intro="Your details stay with Moving Walls; a planner from our team confirms availability once you share the plan."
        onSuccess={() => { setRegistered(true); setGate(false); generate(pendingMode) }} />
    </div>
  )
}
