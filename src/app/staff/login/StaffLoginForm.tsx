'use client'

import { useState } from 'react'
import Link from 'next/link'

export function StaffLoginForm({ back, expired }: { back?: string; expired?: boolean }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(expired ? 'That link has expired. Ask for a new one.' : null)
  const [devLink, setDevLink] = useState<string | null>(null)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setState('busy'); setError(null)
    const r = await fetch('/api/staff/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, back }) }).catch(() => null)
    const j = await r?.json().catch(() => null)
    if (!r || !r.ok) { setState('idle'); setError(j?.error ?? 'Something went wrong. Please try again.'); return }
    if (j?.link) setDevLink(j.link)
    setState('sent')
  }
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      {state === 'sent' ? (
        <>
          <h2 className="text-xl font-bold">Check your inbox</h2>
          <p className="mt-2 text-gray-600">We sent a sign-in link to <strong>{email}</strong>. It works for 20 minutes.</p>
          {devLink && <p className="mt-4 text-sm text-gray-500">Development: <Link href={devLink} className="font-semibold text-[#2563eb] underline">open the link</Link></p>}
        </>
      ) : (
        <form onSubmit={submit}>
          <label className="block text-sm font-semibold text-gray-700">Company email
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@movingwalls.com" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-mw-blue-500 focus:outline-none" />
          </label>
          {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
          <button type="submit" disabled={state === 'busy'} className="mw-tap mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#2563eb] px-5 py-3 font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60">{state === 'busy' ? 'Sending…' : 'Email me a sign-in link'}</button>
          <p className="mt-4 text-xs text-gray-500">Only @movingwalls.com addresses. Registering on the proposal form with your company address signs you in as well.</p>
        </form>
      )}
    </div>
  )
}
