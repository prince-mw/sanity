'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InsightsLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await fetch('/api/internal-insights', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const json = await res.json().catch(() => ({}))
    setBusy(false)
    if (res.ok) router.refresh()
    else setError(json.error || 'Something went wrong.')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-precision-lg p-8">
        <div className="w-12 h-12 rounded-xl bg-[#062068] text-white flex items-center justify-center mb-5">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Internal Insights</h1>
        <p className="text-sm text-gray-500 mb-6">Enter the password to continue.</p>
        <label htmlFor="insights-pw" className="sr-only">Password</label>
        <input
          id="insights-pw"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mw-blue-500"
          placeholder="Password"
        />
        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full rounded-lg bg-[#062068] text-white font-semibold py-3 hover:bg-[#0a2a85] disabled:opacity-50 transition-colors"
        >
          {busy ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}
