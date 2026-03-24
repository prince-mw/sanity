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

// Build a redirect URL string using native URL (avoids NextURL trailing-slash bugs)
function buildRedirectUrl(request: NextRequest, pathname: string): string {
  const url = new URL(request.url)
  url.pathname = pathname
  return url.toString()
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
      return normalizedSource.toLowerCase() === normalizedPath.toLowerCase()
    })

    if (match) {
      const normalizedDestination = match.destination.endsWith('/') && match.destination !== '/'
        ? match.destination.slice(0, -1)
        : match.destination

      // Skip self-referencing redirects (e.g., /careers/ -> /careers)
      // The trailing-slash handler below will take care of slash normalization
      if (!match.destination.startsWith('http') && normalizedDestination.toLowerCase() === normalizedPath.toLowerCase()) {
        // Fall through to trailing-slash handler
      } else {
        // Redirect to a different path or external URL
        const destination = match.destination.startsWith('http')
          ? match.destination
          : buildRedirectUrl(request, match.destination)

        return NextResponse.redirect(destination, {
          status: match.permanent ? 301 : 302,
        })
      }
    }
  }

  // Handle trailing slash normalization (since skipTrailingSlashRedirect is enabled)
  if (pathname !== normalizedPath) {
    return NextResponse.redirect(buildRedirectUrl(request, normalizedPath), 301)
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
