'use client'

// The website's own lead form: a modal that posts to /api/leads and fires the
// GA4 conversion itself. Used on the inventory pages for "Enquire" and to
// unlock the ad mock-up download. Not a Zoho Forms iframe, so GA4 sees the
// conversion and the lead still lands in Zoho CRM (server side).

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { getUTMCookies } from '@/lib/utmCookies'

export type LeadPurpose = 'enquiry' | 'mockup' | 'proposal'
export type LeadResult = { ok: true; owner?: { name: string; email: string | null } | null; leadId?: string | null }

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: (result: LeadResult) => void
  /** Called when the visitor already used their one mock-up on another site. */
  onAlreadyUsed?: (info: { siteName?: string; owner?: { name: string; email: string | null } | null }) => void
  /** Hide the built-in thank-you; the caller shows its own. */
  closeOnSuccess?: boolean
  purpose: LeadPurpose
  siteId?: string
  siteName?: string
  title?: string
  intro?: ReactNode
  /** For mock-up downloads: the clean PNG as a data URL, attached to the lead. */
  mockupDataUrl?: string | null
  submitLabel?: string
}

declare global { interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] } }

function track(event: string, params: Record<string, unknown>) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, params)
    else (window.dataLayer ||= []).push({ event, ...params })
  } catch { /* analytics must never break the form */ }
}

export function LeadForm({ open, onClose, onSuccess, onAlreadyUsed, closeOnSuccess, purpose, siteId, siteName, title, intro, mockupDataUrl, submitLabel }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const startedAt = useRef(Date.now())
  const first = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    startedAt.current = Date.now()
    setError(null); setDone(false)
    const t = setTimeout(() => first.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  if (!open) return null

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const body = {
      ...f, purpose, siteId, siteName, pageUrl: location.href, startedAt: startedAt.current,
      utm: getUTMCookies(), mockup: purpose === 'mockup' ? mockupDataUrl ?? undefined : undefined,
    }
    const r = await fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null)
    setBusy(false)
    const j = await r?.json().catch(() => null)
    if (r && r.status === 409 && j?.error === 'already-used') { onAlreadyUsed?.({ siteName: j.siteName, owner: j.owner }); onClose(); return }
    if (!r || !r.ok) { setError(j?.error ?? 'Something went wrong. Please try again or email us.'); return }
    // Conversion events: they only reach Google when the production analytics config is loaded (nothing on staging).
    track('generate_lead', { lead_purpose: purpose, site_id: siteId, site_name: siteName, currency: 'MYR', value: purpose === 'mockup' ? 20 : purpose === 'proposal' ? 30 : 50 })
    if (purpose === 'mockup') track('page_view', { page_location: `${location.origin}/mockup/thank-you`, page_title: 'Mock-up registered' })
    if (closeOnSuccess) onClose(); else setDone(true)
    onSuccess?.(j ?? { ok: true })
  }

  const heading = title ?? (purpose === 'mockup' ? 'See your ad on this screen' : purpose === 'proposal' ? 'Register once to build proposals' : `Enquire about ${siteName ?? 'this site'}`)
  const field = (name: string, label: string, type = 'text', required = true, extra: Record<string, unknown> = {}) => (
    <label key={name} className="block">
      <span className="text-sm font-semibold text-gray-700">{label}{required ? '' : <span className="font-normal text-gray-400"> (optional)</span>}</span>
      <input ref={name === 'name' ? first : undefined} name={name} type={type} required={required} autoComplete={type === 'email' ? 'email' : name === 'name' ? 'name' : name === 'company' ? 'organization' : name === 'phone' ? 'tel' : 'on'}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none" {...extra} />
    </label>
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="lead-form-title" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white p-6 shadow-2xl">
        {done ? (
          <div>
            <h2 id="lead-form-title" className="text-xl font-bold text-[#2563eb]">Thank you</h2>
            <p className="mt-2 text-gray-700">
              {purpose === 'mockup' ? 'Your mock-up is on its way to your inbox.' : purpose === 'proposal' ? 'You can now build proposals.' : 'Our Malaysia team will reply within one working day.'}
            </p>
            <button type="button" onClick={onClose} className="mw-tap mt-5 w-full rounded-lg bg-[#2563eb] px-4 py-2.5 font-semibold text-white hover:bg-[#1d4ed8]">Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 id="lead-form-title" className="text-xl font-bold text-[#2563eb]">{heading}</h2>
            {intro && <div className="mt-1 text-sm text-gray-600">{intro}</div>}
            <div className="mt-4 space-y-3">
              {field('name', 'Name')}
              {field('email', 'Work email', 'email')}
              {field('company', 'Company')}
              {field('country', 'Country', 'text', true, { defaultValue: 'Malaysia' })}
              {purpose === 'enquiry' && (
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Your campaign <span className="font-normal text-gray-400">(optional)</span></span>
                  <textarea name="message" rows={3} placeholder="Dates, budget, what you want to achieve" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none" />
                </label>
              )}
              {purpose === 'proposal' && (
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 flex-shrink-0 appearance-auto accent-[#2563eb]" style={{ appearance: 'auto' }} />
                  <span>Yes, Moving Walls may contact me about this proposal and send me outdoor advertising news. I can unsubscribe at any time.</span>
                </label>
              )}
              {/* honeypot: hidden from people, filled by bots */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
            <p className="mt-3 text-xs text-gray-500">By sending this you agree to be contacted by Moving Walls about outdoor advertising. We never share your details.</p>
            <div className="mt-5 flex gap-3">
              <button type="submit" disabled={busy} className="mw-tap flex-1 rounded-lg bg-[#2563eb] px-4 py-2.5 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60">
                {busy ? 'Sending…' : submitLabel ?? (purpose === 'mockup' ? 'Show my mock-up' : purpose === 'proposal' ? 'Build my proposal' : 'Send enquiry')}
              </button>
              <button type="button" onClick={onClose} className="mw-tap rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
