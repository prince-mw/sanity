import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to validate webhook requests from Sanity
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

// Map Sanity document types to their page paths
const documentTypeToPath: Record<string, string[]> = {
  integration: ['/integrations'],
  oohFormat: ['/ooh-formats'],
  audiencePage: ['/agencies', '/brands', '/media-owners'],
  industryPage: ['/finance', '/healthcare', '/retail'],
  blogPost: ['/blog'],
  caseStudy: ['/case-studies'],
  ebook: ['/ebooks'],
  whitepaper: ['/whitepapers'],
  webinar: ['/webinars'],
  event: ['/events'],
  pressRelease: ['/press-news'],
  teamMember: ['/leadership'],
  job: ['/careers'],
}

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (!REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'REVALIDATE_SECRET not configured' },
        { status: 500 }
      )
    }

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret token' },
        { status: 401 }
      )
    }

    // Parse the webhook payload from Sanity
    const body = await request.json()
    const { _type: documentType, slug } = body

    // Get paths to revalidate based on document type
    const pathsToRevalidate = documentTypeToPath[documentType] || []

    if (pathsToRevalidate.length === 0) {
      return NextResponse.json(
        { message: `No revalidation configured for type: ${documentType}` },
        { status: 200 }
      )
    }

    // Revalidate all relevant paths
    const revalidated: string[] = []
    for (const path of pathsToRevalidate) {
      revalidatePath(path)
      revalidated.push(path)
      
      // If there's a slug, also revalidate the detail page
      if (slug?.current) {
        const detailPath = `${path}/${slug.current}`
        revalidatePath(detailPath)
        revalidated.push(detailPath)
      }
    }

    console.log(`[Revalidate] Triggered for ${documentType}:`, revalidated)

    return NextResponse.json({
      message: 'Revalidation successful',
      revalidated,
      documentType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    )
  }

  if (!path) {
    return NextResponse.json(
      { message: 'Missing path parameter' },
      { status: 400 }
    )
  }

  revalidatePath(path)
  
  return NextResponse.json({
    message: 'Path revalidated',
    path,
    timestamp: new Date().toISOString(),
  })
}
