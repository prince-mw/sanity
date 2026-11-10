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
const chip = (on: boolean) => `mw-tap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-[#062068] bg-[#062068] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#062068]'}`

export function BriefForm({ markets, formats }: Props) {
  const router = useRouter()
  const { items, remove, clear, ready } = useShortlist()
  const [market, setMarket] = useState(`${markets[0].countrySlug}/${markets[0].cities[0].slug}`)
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

  const [countrySlug, citySlug] = market.split('/')
  const shortlistHere = items.filter(i => i.countrySlug === countrySlug && i.citySlug === citySlug)
  const formatChoices = formats[market] ?? []
  const minDate = new Date(Date.now() + 7 * 86400_000).toISOString().slice(0, 10)

  const generate = async (mode: 'brief' | 'shortlist') => {
    setBusy(mode); setError(null)
    const body = {
      mode, shortlistIds: shortlistHere.map(i => i.id),
      brief: { countrySlug, citySlug, startDate: startDate || null, durationWeeks: duration, objective, audience, industry, budgetBand: budget, formats: picked, targetSites: count },
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
              <legend className="text-lg font-bold text-[#062068]">Where and when</legend>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <label className="block sm:col-span-1"><span className="text-sm font-semibold text-gray-700">Market</span>
                  <select value={market} onChange={e => setMarket(e.target.value)} className={input}>
                    {markets.flatMap(m => m.cities.map(c => <option key={`${m.countrySlug}/${c.slug}`} value={`${m.countrySlug}/${c.slug}`}>{c.name}, {m.countryName}</option>))}
                  </select>
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Start <span className="font-normal text-gray-400">(optional)</span></span>
                  <input type="date" min={minDate} value={startDate} onChange={e => setStartDate(e.target.value)} className={input} />
                </label>
                <label className="block"><span className="text-sm font-semibold text-gray-700">Duration</span>
                  <select value={duration} onChange={e => setDuration(Number(e.target.value))} className={input}>
                    {DURATIONS.map(d => <option key={d} value={d}>{d} weeks</option>)}
                  </select>
                </label>
              </div>
              {markets.length === 1 && markets[0].cities.length === 1 && <p className="mt-2 text-xs text-gray-500">More markets are coming as inventory is connected.</p>}
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold text-[#062068]">What it is for</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {OBJECTIVES.map(o => (
                  <button key={o.id} type="button" onClick={() => setObjective(o.id)} aria-pressed={objective === o.id}
                    className={`mw-tap rounded-xl border p-4 text-left transition-colors ${objective === o.id ? 'border-[#062068] bg-[#062068] text-white' : 'border-gray-200 bg-white hover:border-[#062068]'}`}>
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
              <legend className="text-lg font-bold text-[#062068]">Size of the plan</legend>
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
              <button type="submit" disabled={busy !== null} className="mw-tap inline-flex items-center justify-center rounded-lg bg-[#062068] px-6 py-3 font-semibold text-white hover:bg-[#0a2a8a] disabled:opacity-60">
                {busy === 'brief' ? 'Matching sites…' : 'Generate my proposal'}
              </button>
              <p className="self-center text-sm text-gray-500">{busy === 'brief' ? 'This takes about 15 seconds.' : 'No sales call needed. Our team confirms availability after.'}</p>
            </div>
          </form>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-bold text-[#062068]">Sites you shortlisted</h2>
              {!ready || shortlistHere.length === 0 ? (
                <p className="mt-2 text-sm text-gray-600">None yet. Browse <Link href={`/locations/${countrySlug}/${citySlug}`} className="font-semibold text-mw-blue-600 hover:underline">the sites in {markets.find(m => m.countrySlug === countrySlug)?.cities.find(c => c.slug === citySlug)?.name}</Link> and tap “Add to proposal” on any you like. They are always kept in the plan.</p>
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
                  <button type="button" onClick={() => submit('shortlist')} disabled={busy !== null} className="mw-tap mt-4 w-full rounded-lg border-2 border-[#062068] bg-white px-4 py-2.5 font-semibold text-[#062068] hover:bg-mw-blue-50 disabled:opacity-60">
                    {busy === 'shortlist' ? 'Building…' : `Build from these ${shortlistHere.length} sites only`}
                  </button>
                </>
              )}
            </div>
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              <h3 className="font-bold text-[#062068]">What you get</h3>
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
