import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import crypto from 'crypto'

// Webhook secret for verification
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

/**
 * Verify a Sanity HMAC-SHA256 webhook signature.
 * Sanity sends the signature header as: t=<unix_timestamp>,v1=<hex_hmac_sha256>
 * The HMAC is computed over: "<timestamp>.<rawBody>"
 * Falls back to plain-string comparison for legacy simple-secret configs.
 */
function isValidWebhookSignature(
  signatureHeader: string,
  rawBody: string,
  secret: string
): boolean {
  // Attempt HMAC format: t=<ts>,v1=<hex>
  const tsMatch = signatureHeader.match(/t=(\d+)/)
  const v1Match = signatureHeader.match(/v1=([a-f0-9]+)/)

  if (tsMatch && v1Match) {
    const timestamp = tsMatch[1]
    const receivedHex = v1Match[1]

    // Reject timestamps older than 5 minutes (replay-attack prevention)
    const ts = parseInt(timestamp, 10)
    const nowSec = Math.floor(Date.now() / 1000)
    if (Math.abs(nowSec - ts) > 300) return false

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.${rawBody}`)
      .digest('hex')

    try {
      return crypto.timingSafeEqual(
        Buffer.from(receivedHex, 'hex'),
        Buffer.from(expected, 'hex')
      )
    } catch {
      return false
    }
  }

  // Legacy: plain-string secret sent via x-webhook-secret or query param
  return signatureHeader === secret
}

// Type to path mapping for revalidation
const typeToPath: Record<string, string[]> = {
  blogPost: ['/blog', '/'],
  caseStudy: ['/case-studies', '/'],
  pressRelease: ['/press-news', '/'],
  event: ['/events', '/'],
  webinar: ['/webinars', '/'],
  ebook: ['/ebooks', '/'],
  whitepaper: ['/whitepapers', '/'],
  product: ['/products', '/platform', '/mw-planner', '/mw-market', '/mw-activate', '/mw-measure', '/mw-influence', '/mw-science', '/mw-studio', '/'],
  landingPage: ['/lp', '/'],
  teamMember: ['/leadership', '/about', '/'],
  jobPosition: ['/careers', '/'],
  careersPage: ['/careers'],
  footerConfig: ['/'],
  contactPage: ['/contact'],
  trustBar: ['/'],
  clientPartners: ['/'],
  zohoForm: ['/', '/newsletter', '/contact'],
  office: ['/locations', '/'],
  location: ['/locations', '/'],
  redirectSettings: ['/'],
  megaMenu: ['/'],
  analyticsConfig: ['/'],
  pageSeo: ['/'],
  category: ['/blog', '/'],
  author: ['/blog', '/'],
  integration: ['/integrations', '/'],
  oohFormat: ['/ooh-formats', '/'],
  audiencePage: ['/agencies', '/brands', '/media-owners', '/'],
  industryPage: ['/finance', '/healthcare', '/retail', '/'],
  testimonial: ['/'],
  companyPage: ['/about', '/our-story', '/our-journey', '/'],
  timelineEvent: ['/our-journey', '/'],
  apiReferencePage: ['/api-reference', '/'],
  communityPage: ['/community', '/'],
  helpCenterFaq: ['/help-center', '/'],
  legalPage: ['/privacy', '/terms', '/'],
  platformConfig: ['/platform', '/'],
}

interface SanityWebhookPayload {
  _id: string
  _type: string
  slug?: { current: string }
  _rev?: string
  operation?: 'create' | 'update' | 'delete'
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret - check multiple header locations for compatibility
    // Sanity webhooks can send secret via custom header or query param depending on config
    const signature = request.headers.get('sanity-webhook-signature') 
      || request.headers.get('x-webhook-secret')
      || request.nextUrl.searchParams.get('secret')
    
    if (!WEBHOOK_SECRET) {
      console.error('[Sanity Webhook] SANITY_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    if (!signature) {
      console.error('[Sanity Webhook] No signature received')
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 }
      )
    }

    // Read raw body for HMAC verification before parsing as JSON
    const rawBody = await request.text()

    if (!isValidWebhookSignature(signature, rawBody, WEBHOOK_SECRET)) {
      console.error('[Sanity Webhook] Invalid signature received')
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    const body: SanityWebhookPayload = JSON.parse(rawBody)
    const { _type, slug } = body

    console.log(`[Sanity Webhook] Received: ${_type} - ${slug?.current || body._id}`)

    // Get paths to revalidate
    const pathsToRevalidate = typeToPath[_type] || ['/']
    
    // Revalidate specific content page if slug exists
    if (slug?.current) {
      if (_type === 'landingPage') {
        // Landing pages serve from both /{slug} (catch-all) and /lp/{slug}
        pathsToRevalidate.push(`/${slug.current}`)
        pathsToRevalidate.push(`/lp/${slug.current}`)
      } else {
        const basePath = pathsToRevalidate[0]
        if (basePath && basePath !== '/') {
          pathsToRevalidate.push(`${basePath}/${slug.current}`)
        } else {
          pathsToRevalidate.push(`/${slug.current}`)
        }
      }
    }

    // Revalidate all affected paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        console.log(`[Sanity Webhook] Revalidated path: ${path}`)
      } catch (err) {
        console.error(`[Sanity Webhook] Failed to revalidate path: ${path}`, err)
      }
    }

    // Revalidate by tag (for more granular cache control)
    try {
      revalidateTag(_type)
      revalidateTag('sanity')
      console.log(`[Sanity Webhook] Revalidated tags: ${_type}, sanity`)
    } catch (err) {
      console.error('[Sanity Webhook] Failed to revalidate tags', err)
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated ${pathsToRevalidate.length} paths`,
      paths: pathsToRevalidate,
    })
  } catch (error) {
    console.error('[Sanity Webhook] Error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'sanity-webhook' })
}
