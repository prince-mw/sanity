'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RANGE_KEYS, RANGE_LABELS, type RangeKey } from '@/lib/insights/ranges'
import { TABS, type TabKey } from '@/lib/insights/tabs'

const fmtDate = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

type Period = { start: string; end: string; prevStart: string; prevEnd: string }

/** Frame shared by every tab: title, tab bar, pinned date bar and sign out */
export default function InsightsShell({ tab, range, period, children }: { tab: TabKey; range: RangeKey; period: Period; children: React.ReactNode }) {
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
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{fmtDate(period.start)} – {fmtDate(period.end)}</span>
                <span className="hidden sm:inline text-gray-400"> vs {fmtDate(period.prevStart)} – {fmtDate(period.prevEnd)}</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="inline-flex flex-wrap rounded-lg border border-gray-200 bg-white p-1" role="group" aria-label="Date range">
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
                </div>
                <button type="button" onClick={signOut} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900">Sign out</button>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
