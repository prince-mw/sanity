'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CUSTOM_MIN, RANGE_KEYS, RANGE_LABELS, customDates, customRange, type RangeKey } from '@/lib/insights/ranges'
import { TABS, type TabKey } from '@/lib/insights/tabs'

const fmtDate = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

type Period = { start: string; end: string; prevStart: string; prevEnd: string }

/** Frame shared by every tab: title, tab bar, pinned date bar and sign out */
/** `snapshot`: a tab with fixed, point-in-time data shows this label instead of the date buttons */
/** `user`: the signed-in Google account, '' with the shared password */
export default function InsightsShell({ user, tab, range, period, snapshot, children }: { user: string; tab: TabKey; range: RangeKey; period: Period; snapshot?: string; children: React.ReactNode }) {
  const router = useRouter()
  const current = TABS.find((t) => t.key === tab) || TABS[0]

  // Date bar: CSS sticky doesn't work site-wide (body has overflow set), so pin it with JS
  const barSentinel = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [barHeight, setBarHeight] = useState(0)
  useEffect(() => {
    const sentinel = barSentinel.current
    if (!sentinel) return
    const update = () => {
      if (barRef.current && !pinned) setBarHeight(barRef.current.offsetHeight)
      setPinned(sentinel.getBoundingClientRect().top < 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pinned])

  // Custom dates: a small picker under the "Custom" button
  const custom = customDates(range)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [from, setFrom] = useState(custom?.start || period.start)
  const [to, setTo] = useState(custom?.end || period.end)
  const today = new Date().toISOString().slice(0, 10)
  const validCustom = !!from && !!to && from <= to && from >= CUSTOM_MIN && to <= today
  function applyCustom(e: React.FormEvent) {
    e.preventDefault()
    if (!validCustom) return
    setPickerOpen(false)
    router.push(`/internal-insights?tab=${tab}&range=${customRange(from, to)}`, { scroll: false })
  }

  async function signOut() {
    await fetch('/api/internal-insights', { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <nav className="flex gap-1 overflow-x-auto border-b border-gray-200 mb-5" aria-label="Dashboard sections">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={`/internal-insights?tab=${t.key}&range=${range}`}
              aria-current={tab === t.key ? 'page' : undefined}
              className={`-mb-px whitespace-nowrap border-b-2 px-3 sm:px-4 py-2.5 text-sm font-semibold ${tab === t.key ? 'border-[#062068] text-[#062068]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{current.title}</h1>

        {/* Date bar */}
        <div ref={barSentinel} aria-hidden="true" />
        <div style={{ height: pinned ? barHeight : undefined }} className="mb-6">
          <div ref={barRef} className={`z-40 py-2 sm:py-3 bg-gray-50 border-b border-gray-200 ${pinned ? 'fixed left-0 right-0 top-0 shadow-sm' : '-mx-4 sm:-mx-6 lg:-mx-8'}`}>
            <div className={`${pinned ? 'max-w-7xl mx-auto' : ''} px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3`}>
              {snapshot ? (
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{snapshot}</p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{fmtDate(period.start)} – {fmtDate(period.end)}</span>
                  <span className="hidden sm:inline text-gray-400"> vs {fmtDate(period.prevStart)} – {fmtDate(period.prevEnd)}</span>
                </p>
              )}
              <div className="flex items-center gap-2">
                <div className={`${snapshot ? 'hidden' : 'inline-flex'} flex-wrap rounded-lg border border-gray-200 bg-white p-1`} role="group" aria-label="Date range">
                  {RANGE_KEYS.map((r) => (
                    <Link
                      key={r}
                      href={`/internal-insights?tab=${tab}&range=${r}`}
                      scroll={false}
                      aria-current={range === r ? 'true' : undefined}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap ${range === r ? 'bg-[#062068] text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {RANGE_LABELS[r]}
                    </Link>
                  ))}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setPickerOpen((o) => !o)}
                      aria-expanded={pickerOpen}
                      aria-current={custom ? 'true' : undefined}
                      className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap ${custom ? 'bg-[#062068] text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Custom
                    </button>
                    {pickerOpen && (
                      <form onSubmit={applyCustom} className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Choose dates</p>
                        <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="insights-from">From</label>
                        <input id="insights-from" type="date" value={from} min={CUSTOM_MIN} max={to || today} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-mw-blue-500" />
                        <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="insights-to">To</label>
                        <input id="insights-to" type="date" value={to} min={from || CUSTOM_MIN} max={today} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mw-blue-500" />
                        <p className="mt-2 text-[11px] text-gray-400">Compared with the same number of days just before.</p>
                        <div className="mt-3 flex gap-2">
                          <button type="submit" disabled={!validCustom} className="flex-1 rounded-lg bg-[#062068] py-2 text-sm font-semibold text-white hover:bg-[#0a2a85] disabled:opacity-50">Apply</button>
                          <button type="button" onClick={() => setPickerOpen(false)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900">Cancel</button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                <button type="button" onClick={signOut} title={user ? `Signed in as ${user}` : undefined} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900">Sign out</button>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
