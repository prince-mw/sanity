import { NextRequest, NextResponse } from 'next/server'

interface ZohoSubmissionRequest {
  zohoFormPermalink: string
  zohoPortalName: string
  fields: Record<string, string>
}

// Simple in-memory rate limiting (per-IP, per form)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5 // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = (await request.json()) as ZohoSubmissionRequest
    const { zohoFormPermalink, zohoPortalName, fields } = body

    // Validate required fields
    if (!zohoFormPermalink || !fields || typeof fields !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: zohoFormPermalink and fields' },
        { status: 400 }
      )
    }

    // Honeypot check — if the hidden field has a value, it's likely a bot
    if (fields._honeypot) {
      // Silently accept to not reveal the honeypot to bots
      return NextResponse.json({ success: true })
    }

    // Remove honeypot field before submission
    const sanitizedFields = { ...fields }
    delete sanitizedFields._honeypot

    // Build the Zoho Forms submission URL
    const portalName = zohoPortalName || 'movingwalls'
    const zohoUrl = `https://forms.zoho.com/${encodeURIComponent(portalName)}/${encodeURIComponent(zohoFormPermalink)}/htmlRecords/submit`

    // Build form data for Zoho submission
    const formData = new URLSearchParams()
    for (const [key, value] of Object.entries(sanitizedFields)) {
      if (typeof value === 'string') {
        formData.append(key, value)
      }
    }

    // Submit to Zoho Forms
    const zohoResponse = await fetch(zohoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    if (!zohoResponse.ok) {
      console.error('Zoho form submission failed:', zohoResponse.status, await zohoResponse.text())
      return NextResponse.json(
        { success: false, error: 'Form submission failed. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in Zoho form submission API:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
