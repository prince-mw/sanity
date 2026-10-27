import { NextRequest, NextResponse } from 'next/server'
import { isAuthed } from '@/lib/insights/auth'
import { setActionStatus, type ActionStatus } from '@/lib/insights/actions'

// POST { id, status } → saves an action item's shared status. Requires the dashboard login cookie.

const headers = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' }
const STATUSES: ActionStatus[] = ['not-started', 'wip', 'done']

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ ok: false, error: 'Not signed in.' }, { status: 401, headers })
  const { id, status } = await req.json().catch(() => ({}))
  if (typeof id !== 'string' || !/^[a-f0-9]{16}$/.test(id) || !STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400, headers })
  }
  try {
    await setActionStatus(id, status)
    return NextResponse.json({ ok: true }, { headers })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Save failed.' }, { status: 500, headers })
  }
}
