import { NextRequest, NextResponse } from 'next/server'

// GeoSignal test (Nov 2026): shows which visitor-location headers CloudFront / Amplify pass to the
// site, by echoing back the caller's OWN location fields. Nothing is stored or logged.
// Open https://www.movingwalls.com/api/geo-check after deploy; remove once the test is done.

export const dynamic = 'force-dynamic'

const GEO_HEADER = /^(cloudfront-viewer-|cloudfront-is-|x-amz-cf-|x-forwarded-for$|cf-ip|x-vercel-ip-)/i

export async function GET(request: NextRequest) {
  const found: Record<string, string> = {}
  request.headers.forEach((value, name) => {
    if (!GEO_HEADER.test(name)) return
    // Don't echo IP addresses back, only whether they arrived.
    found[name] = /address|forwarded-for/i.test(name) ? '(present)' : value
  })
  return NextResponse.json(
    {
      postalCodeAvailable: !!found['cloudfront-viewer-postal-code'],
      coordinatesAvailable: !!found['cloudfront-viewer-latitude'],
      cityAvailable: !!found['cloudfront-viewer-city'],
      headers: found,
    },
    { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } }
  )
}
