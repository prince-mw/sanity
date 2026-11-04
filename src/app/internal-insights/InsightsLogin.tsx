'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SIGNIN_ERRORS: Record<string, string> = {
  denied: 'Only Moving Walls Google accounts can open this dashboard. Sign in with your @movingwalls.com account.',
  failed: 'Sign-in didn’t complete. Please try again.',
}

const lockIcon = (
  <div className="w-12 h-12 rounded-xl bg-[#062068] text-white flex items-center justify-center mb-5">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  </div>
)

/** `google`: Google sign-in is set up, so it replaces the password */
export default function InsightsLogin({ google = false, signinError }: { google?: boolean; signinError?: string }) {
  if (google) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-200 shadow-precision-lg p-8">
          {lockIcon}
          <h1 className="text-xl font-bold text-gray-900 mb-1">Internal Insights</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in with your Moving Walls Google account.</p>
          <a
            href="/api/internal-insights/google"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
            </svg>
            Sign in with Google
          </a>
          {signinError && <p className="mt-4 text-sm text-red-600" role="alert">{SIGNIN_ERRORS[signinError] || SIGNIN_ERRORS.failed}</p>}
          <p className="mt-5 text-xs text-gray-400">Only @movingwalls.com accounts have access.</p>
        </div>
      </div>
    )
  }
  return <PasswordLogin />
}

function PasswordLogin() {
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
        {lockIcon}
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
