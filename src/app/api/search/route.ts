import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { getSanityImageUrl } from '@/sanity/lib/fetch'

export const dynamic = 'force-dynamic'

interface SearchResult {
  _id: string
  _type: string
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  category?: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  const type = searchParams.get('type') // Optional: filter by content type
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], total: 0 })
  }

  try {
    // Build the GROQ query for multi-type search
    const searchQuery = `
      *[
        (
          _type in ["blogPost", "caseStudy", "pressRelease", "event", "webinar", "ebook", "whitepaper"]
        ) && (
          isPublished == true && status == "published" && (scheduledPublishAt == null || scheduledPublishAt <= now())
        ) && (
          title match $searchTerm ||
          excerpt match $searchTerm ||
          content[].children[].text match $searchTerm ||
          description match $searchTerm
        )
        ${type ? `&& _type == "${type}"` : ''}
      ] | order(publishedAt desc, _createdAt desc) [0...$limit] {
        _id,
        _type,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, description, ""),
        "image": featuredImage,
        "date": coalesce(publishedAt, date, startDate, _createdAt),
        "category": select(
          _type == "blogPost" => categories[0]->title,
          _type == "caseStudy" => industry,
          _type == "pressRelease" => category,
          _type == "event" => eventType,
          _type == "webinar" => webinarType,
          _type == "ebook" => category,
          _type == "whitepaper" => category,
          null
        )
      }
    `

    const searchTerm = `*${query}*`
    const results = await client.fetch(searchQuery, { searchTerm, limit })

    // Transform results
    const transformedResults: SearchResult[] = results.map((item: any) => ({
      _id: item._id,
      _type: item._type,
      title: item.title || '',
      slug: item.slug || '',
      excerpt: truncateText(item.excerpt || '', 150),
      image: getSanityImageUrl(item.image, { width: 400 }) || '',
      date: item.date ? formatDate(item.date) : '',
      category: formatCategory(item.category, item._type),
    }))

    // Get total count
    const countQuery = `
      count(*[
        (
          _type in ["blogPost", "caseStudy", "pressRelease", "event", "webinar", "ebook", "whitepaper"]
        ) && (
          isPublished == true && status == "published"
        ) && (
          title match $searchTerm ||
          excerpt match $searchTerm ||
          content[].children[].text match $searchTerm ||
          description match $searchTerm
        )
        ${type ? `&& _type == "${type}"` : ''}
      ])
    `
    const total = await client.fetch(countQuery, { searchTerm })

    return NextResponse.json({
      results: transformedResults,
      total,
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [], total: 0 },
      { status: 500 }
    )
  }
}

function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

function formatCategory(category: string | null, type: string): string {
  if (category) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
  
  const typeLabels: Record<string, string> = {
    blogPost: 'Blog',
    caseStudy: 'Case Study',
    pressRelease: 'Press',
    event: 'Event',
    webinar: 'Webinar',
    ebook: 'E-Book',
    whitepaper: 'Whitepaper',
  }
  
  return typeLabels[type] || 'Content'
}
