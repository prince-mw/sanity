import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

// Preview secret - use environment variable or fallback for development
const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET || 'preview-secret-key'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'blogPost'

  // Check the secret and next parameters
  if (secret !== PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug) {
    return new Response('Slug parameter is missing', { status: 400 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the post/page
  const typeToPath: Record<string, string> = {
    blogPost: '/blog',
    caseStudy: '/case-studies',
    pressRelease: '/press-news',
    event: '/events',
    webinar: '/webinars',
    ebook: '/ebooks',
    whitepaper: '/whitepapers',
    product: '/products',
    landingPage: '',
  }

  const basePath = typeToPath[type] || ''
  const path = basePath ? `${basePath}/${slug}` : `/${slug}`
  redirect(path)
}
