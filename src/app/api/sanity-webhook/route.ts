import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Webhook secret for verification
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

// Type to path mapping for revalidation
const typeToPath: Record<string, string[]> = {
  blogPost: ['/blog', '/'],
  caseStudy: ['/case-studies', '/'],
  pressRelease: ['/press-news', '/'],
  event: ['/events', '/'],
  webinar: ['/webinars', '/'],
  ebook: ['/ebooks', '/'],
  whitepaper: ['/whitepapers', '/'],
  product: ['/products', '/platform', '/'],
  landingPage: ['/'],
  teamMember: ['/leadership', '/about', '/'],
  jobPosition: ['/careers', '/'],
  careersPage: ['/careers'],
  footerConfig: ['/'],
  contactPage: ['/contact'],
  trustBar: ['/'],
  clientPartners: ['/'],
  zohoForm: ['/'],
  office: ['/locations', '/offices', '/'],
  redirectSettings: ['/'],
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
    // Verify webhook secret
    const signature = request.headers.get('sanity-webhook-signature')
    
    if (!WEBHOOK_SECRET) {
      console.error('[Sanity Webhook] SANITY_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    if (signature !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    const body: SanityWebhookPayload = await request.json()
    const { _type, slug } = body

    console.log(`[Sanity Webhook] Received: ${_type} - ${slug?.current || body._id}`)

    // Get paths to revalidate
    const pathsToRevalidate = typeToPath[_type] || ['/']
    
    // Revalidate specific content page if slug exists
    if (slug?.current) {
      const basePath = pathsToRevalidate[0]
      if (basePath && basePath !== '/') {
        pathsToRevalidate.push(`${basePath}/${slug.current}`)
      } else {
        // For landing pages, revalidate at root
        pathsToRevalidate.push(`/${slug.current}`)
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
