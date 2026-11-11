'use client'

// The second lead moment: someone who is not the creator acts on a proposal
// (approve, add, request) and gives a name and work email once. Kept in the
// browser so it is asked only once per device; sent with the action so the
// proposal and the CRM lead record who decided. Rif, 11 Nov 2026.

import { useEffect, useRef, useState } from 'react'

export type Identity = { name: string; email: string }
const KEY = 'mw_proposal_identity'

export function loadIdentity(): Identity | null {
  try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); return j && typeof j.email === 'string' ? j : null } catch { return null }
}
export function saveIdentity(i: Identity) { try { localStorage.setItem(KEY, JSON.stringify(i)) } catch { /* private mode */ } }

export function IdentitySheet({ open, action, onClose, onDone }: { open: boolean; action: string; onClose: () => void; onDone: (i: Identity) => void }) {
  const first = useRef<HTMLInputElement>(null)
  const [consent, setConsent] = useState(false)
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => first.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const i = { name: (f.name || '').trim(), email: (f.email || '').trim().toLowerCase() }
    saveIdentity(i); onDone(i)
  }
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="identity-title" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <form onSubmit={submit} className="w-full rounded-t-2xl bg-white p-6 shadow-2xl sm:max-w-md sm:rounded-2xl">
        <h2 id="identity-title" className="text-xl font-bold text-[#2563eb]">One thing before we {action}</h2>
        <p className="mt-1 text-sm text-gray-600">Tell us who is deciding, so the Moving Walls planner knows who to confirm with. Asked once.</p>
        <div className="mt-4 space-y-3">
          <label className="block"><span className="text-sm font-semibold text-gray-700">Name</span>
            <input ref={first} name="name" type="text" required autoComplete="name" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none" />
          </label>
          <label className="block"><span className="text-sm font-semibold text-gray-700">Work email</span>
            <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none" />
          </label>
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 h-4 w-4 flex-shrink-0 appearance-auto accent-[#2563eb]" style={{ appearance: 'auto' }} />
            <span>Moving Walls may contact me about this proposal.</span>
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button type="submit" className="mw-tap flex-1 rounded-lg bg-[#2563eb] px-4 py-2.5 font-semibold text-white hover:bg-[#1d4ed8]">Continue</button>
          <button type="button" onClick={onClose} className="mw-tap rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700">Cancel</button>
        </div>
      </form>
    </div>
  )
}
