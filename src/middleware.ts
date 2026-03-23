import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface RedirectRule {
  source: string
  destination: string
  permanent: boolean
}

// In-memory cache for redirects
let redirectCache: RedirectRule[] | null = null
let cacheTimestamp = 0
const CACHE_TTL = 60 * 1000 // 60 seconds

async function fetchRedirects(): Promise<RedirectRule[]> {
  const now = Date.now()
  if (redirectCache && now - cacheTimestamp < CACHE_TTL) {
    return redirectCache
  }

  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'u10im6di'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    const query = encodeURIComponent(
      `*[_type == "redirectSettings" && _id == "redirectSettings"][0]{"redirects": redirects[isActive == true]{source, destination, permanent}}`
    )
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      console.error('Failed to fetch redirects:', res.status)
      return redirectCache || []
    }

    const data = await res.json()
    redirectCache = data?.result?.redirects || []
    cacheTimestamp = now
    return redirectCache!
  } catch (error) {
    console.error('Error fetching redirects:', error)
    return redirectCache || []
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.includes('.') // static files like .css, .js, .png, etc.
  ) {
    return NextResponse.next()
  }

  // Normalize: strip trailing slash for consistent matching
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname

  const redirects = await fetchRedirects()

  if (redirects.length) {
    const match = redirects.find((r) => {
      const normalizedSource = r.source.endsWith('/') && r.source !== '/'
        ? r.source.slice(0, -1)
        : r.source
      return normalizedSource === normalizedPath
    })

    if (match) {
      const destination = match.destination.startsWith('http')
        ? match.destination
        : new URL(match.destination, request.url).toString()

      return NextResponse.redirect(destination, {
        status: match.permanent ? 308 : 307,
      })
    }
  }

  // Handle trailing slash normalization (since skipTrailingSlashRedirect is enabled)
  if (pathname !== normalizedPath) {
    const url = request.nextUrl.clone()
    url.pathname = normalizedPath
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
