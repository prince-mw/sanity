import { client, urlFor } from './client'

// SEO Interface - reusable for all content types
export interface SanitySEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
  keywords?: string[]
  enableKeywords?: boolean
  noIndex?: boolean
}

// Helper function to get Sanity image URL with optional transformations
export function getSanityImageUrl(
  image: any,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!image || !image.asset) return ''
  
  try {
    let builder = urlFor(image)
    
    if (options?.width) {
      builder = builder.width(options.width)
    }
    if (options?.height) {
      builder = builder.height(options.height)
    }
    if (options?.quality) {
      builder = builder.quality(options.quality)
    } else {
      builder = builder.quality(85) // Default quality
    }
    
    return builder.auto('format').url()
  } catch (error) {
    console.error('Error generating Sanity image URL:', error)
    return ''
  }
}

// Types
export interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any[] // Portable Text blocks
  publishedAt: string
  featuredImage?: any
  readTime?: string
  author?: {
    _id?: string
    name: string
    image?: any
    role?: string
    bio?: any[]
    linkedin?: string
  }
  categories?: Array<{
    title: string
    slug: { current: string }
    color?: string
  }>
  seo?: SanitySEO
}

export interface SanityCaseStudy {
  _id: string
  title: string
  slug: { current: string }
  client: string
  clientLogo?: any
  featuredImage?: any
  industry: string
  location: string
  excerpt: string
  content?: any[]
  challenge?: any[]
  solution?: any[]
  results?: any[]
  metrics?: any[]
  testimonial?: any
  gallery?: any[]
  publishedAt: string
  seo?: SanitySEO
}

// Helper for publishing filters - content must be published and not scheduled for future
const publishedFilter = `isPublished == true && status == "published" && (scheduledPublishAt == null || scheduledPublishAt <= now())`

// Blog Post Queries
export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `
    *[_type == "blogPost" && ${publishedFilter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featuredImage,
      "author": author->{name, image, role},
      "categories": categories[]->{title, slug, color}
    }
  `
  return client.fetch(query)
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      readTime,
      featuredImage,
      "author": author->{_id, name, image, role, bio, linkedin},
      "categories": categories[]->{title, slug, color},
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

export async function getBlogCategories(): Promise<Array<{ title: string; slug: { current: string } }>> {
  const query = `
    *[_type == "category"] | order(title asc) {
      title,
      slug
    }
  `
  return client.fetch(query)
}

export async function getFeaturedBlogPost(): Promise<SanityBlogPost | null> {
  const query = `
    *[_type == "blogPost" && ${publishedFilter}] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featuredImage,
      "author": author->{name, image, role},
      "categories": categories[]->{title, slug, color}
    }
  `
  return client.fetch(query)
}

// Improved related posts algorithm with multi-criteria matching
export async function getRelatedBlogPosts(
  currentSlug: string,
  categoryTitles: string[],
  authorId?: string,
  limit: number = 3
): Promise<SanityBlogPost[]> {
  // First, try to find posts with matching categories or same author
  const query = `
    *[_type == "blogPost" && slug.current != $currentSlug && ${publishedFilter}] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featuredImage,
      "author": author->{_id, name, image, role},
      "categories": categories[]->{title, slug, color},
      // Calculate relevance score
      "categoryMatchCount": count(categories[@->title in $categories]),
      "hasAuthorMatch": author._ref == $authorId
    }
    // Sort by category matches (more matches = higher), then author match, then recency
    | order(categoryMatchCount desc, hasAuthorMatch desc, publishedAt desc)
    [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      featuredImage,
      "author": author,
      "categories": categories
    }
  `
  
  const results = await client.fetch(query, { 
    currentSlug, 
    categories: categoryTitles.length > 0 ? categoryTitles : [''], 
    authorId: authorId || '',
    limit: limit - 1 
  })
  
  // If we don't have enough related posts, supplement with recent posts
  if (results.length < limit) {
    const existingSlugs = [currentSlug, ...results.map((p: SanityBlogPost) => p.slug?.current)]
    const neededCount = limit - results.length
    
    const recentQuery = `
      *[_type == "blogPost" && !(slug.current in $existingSlugs) && ${publishedFilter}] 
      | order(publishedAt desc)[0...$neededCount] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readTime,
        featuredImage,
        "author": author->{name, image, role},
        "categories": categories[]->{title, slug, color}
      }
    `
    
    const recentPosts = await client.fetch(recentQuery, { 
      existingSlugs, 
      neededCount: neededCount - 1 
    })
    
    return [...results, ...recentPosts]
  }
  
  return results
}

// Case Study Queries
export async function getAllCaseStudies(): Promise<SanityCaseStudy[]> {
  const query = `
    *[_type == "caseStudy" && ${publishedFilter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      client,
      clientLogo,
      featuredImage,
      industry,
      location,
      excerpt,
      publishedAt
    }
  `
  return client.fetch(query)
}

export async function getCaseStudyBySlug(slug: string): Promise<SanityCaseStudy | null> {
  const query = `
    *[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      clientLogo,
      featuredImage,
      industry,
      location,
      excerpt,
      content,
      challenge,
      solution,
      results,
      metrics,
      testimonial,
      gallery,
      publishedAt,
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

// Helper to convert Sanity blog post to format compatible with existing UI
export function transformBlogPost(post: SanityBlogPost) {
  return {
    slug: post.slug?.current || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: portableTextToHtml(post.content) || '',
    category: post.categories?.[0]?.title || 'General',
    author: post.author?.name || 'MovingWalls Team',
    authorRole: post.author?.role,
    authorImage: getSanityImageUrl(post.author?.image, { width: 100 }) || '',
    authorBio: post.author?.bio ? portableTextToHtml(post.author.bio) : '',
    authorLinkedin: post.author?.linkedin || '',
    date: post.publishedAt ? formatDate(post.publishedAt) : '',
    readTime: post.readTime || '5 min read',
    featuredImage: getSanityImageUrl(post.featuredImage, { width: 1200 }) || '/assets/images/blog-placeholder.svg',
    tags: post.categories?.map(c => c.title) || [],
    featured: false,
  }
}

// Helper to convert Sanity case study to format compatible with existing UI
export function transformCaseStudy(study: SanityCaseStudy) {
  // Helper to check if HTML has actual formatting (not just stripped text)
  const hasFormattedContent = (html: string) => {
    if (!html) return false;
    // Check if content has actual HTML tags beyond just text
    return /<(h[1-6]|ul|ol|li|strong|em|a|blockquote|figure|img)[^>]*>/i.test(html);
  };
  
  const content = portableTextToHtml(study.content) || '';
  const challenge = portableTextToHtml(study.challenge) || '';
  const solution = portableTextToHtml(study.solution) || '';
  const results = portableTextToHtml(study.results) || '';
  
  return {
    slug: study.slug?.current || '',
    title: study.title || '',
    brand: study.client || '',
    clientLogo: getSanityImageUrl(study.clientLogo, { width: 200 }) || '',
    country: study.location || '',
    industry: study.industry || 'Other',
    excerpt: study.excerpt || '',
    content: content,
    // Only include challenge/solution/results if they have real formatted content
    challenge: hasFormattedContent(challenge) ? challenge : '',
    solution: hasFormattedContent(solution) ? solution : '',
    results: hasFormattedContent(results) ? results : '',
    metrics: study.metrics || [],
    testimonial: study.testimonial || null,
    gallery: (study.gallery || []).map((img: any) => getSanityImageUrl(img, { width: 800 })).filter(Boolean),
    featuredImage: getSanityImageUrl(study.featuredImage, { width: 1200 }) || '/assets/images/case-study-placeholder.svg',
    date: study.publishedAt ? formatDate(study.publishedAt) : '',
  }
}

// Simple date formatter
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch {
    return isoDate
  }
}

// Enhanced portable text to HTML (for content display with proper formatting)
function portableTextToHtml(blocks: any[] | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  return blocks.map(block => {
    if (block._type === 'block') {
      // Process children with marks (bold, italic, links, etc.)
      const processChildren = (children: any[]): string => {
        if (!children || !Array.isArray(children)) return ''
        
        return children.map(child => {
          let text = child.text || ''
          const marks = child.marks || []
          
          // Find mark definitions for links
          const markDefs = block.markDefs || []
          
          // Apply marks in reverse order for proper nesting
          marks.forEach((mark: string) => {
            if (mark === 'strong') {
              text = `<strong>${text}</strong>`
            } else if (mark === 'em') {
              text = `<em>${text}</em>`
            } else if (mark === 'code') {
              text = `<code class="bg-mw-gray-100 text-mw-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`
            } else if (mark === 'underline') {
              text = `<span class="underline">${text}</span>`
            } else if (mark === 'strike-through') {
              text = `<span class="line-through">${text}</span>`
            } else {
              // Check for link marks
              const linkDef = markDefs.find((def: any) => def._key === mark)
              if (linkDef && linkDef._type === 'link') {
                const href = linkDef.href || '#'
                const isExternal = href.startsWith('http')
                if (isExternal) {
                  text = `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-mw-blue-600 hover:text-mw-blue-700 underline">${text}</a>`
                } else {
                  text = `<a href="${href}" class="text-mw-blue-600 hover:text-mw-blue-700 underline">${text}</a>`
                }
              }
            }
          })
          
          return text
        }).join('')
      }
      
      const content = processChildren(block.children)
      
      switch (block.style) {
        case 'h1': return `<h1 class="text-4xl font-bold text-mw-gray-900 mt-12 mb-6">${content}</h1>`
        case 'h2': return `<h2 class="text-3xl font-bold text-mw-gray-900 mt-10 mb-5">${content}</h2>`
        case 'h3': return `<h3 class="text-2xl font-bold text-mw-gray-900 mt-8 mb-4">${content}</h3>`
        case 'h4': return `<h4 class="text-xl font-semibold text-mw-gray-900 mt-6 mb-3">${content}</h4>`
        case 'blockquote': return `<blockquote class="border-l-4 border-mw-blue-500 bg-mw-blue-50 py-4 px-6 rounded-r-lg my-6 italic text-mw-gray-700">${content}</blockquote>`
        default: return `<p class="text-mw-gray-700 leading-relaxed mb-6">${content}</p>`
      }
    }
    
    // Handle list items
    if (block._type === 'list') {
      const listItems = block.children?.map((item: any) => {
        const itemContent = item.children?.map((child: any) => child.text || '').join('') || ''
        return `<li class="text-mw-gray-700 leading-relaxed">${itemContent}</li>`
      }).join('\n') || ''
      
      if (block.listItem === 'number') {
        return `<ol class="list-decimal list-inside space-y-2 my-6 text-mw-gray-700 ml-4">${listItems}</ol>`
      }
      return `<ul class="list-disc list-inside space-y-2 my-6 text-mw-gray-700 ml-4">${listItems}</ul>`
    }
    
    // Handle images
    if (block._type === 'image' && block.asset) {
      const imageUrl = getSanityImageUrl(block, { width: 1200 })
      const alt = block.alt || 'Content image'
      const caption = block.caption || ''
      
      if (imageUrl) {
        return `
          <figure class="my-8">
            <img src="${imageUrl}" alt="${alt}" class="w-full rounded-xl" loading="lazy" />
            ${caption ? `<figcaption class="text-center text-sm text-mw-gray-500 mt-3">${caption}</figcaption>` : ''}
          </figure>
        `
      }
    }
    
    return ''
  }).join('\n')
}

// Event Types and Queries
export interface SanityEvent {
  _id: string
  title: string
  slug: { current: string }
  featuredImage?: any
  eventType: string
  startDate: string
  endDate?: string
  location: {
    venue?: string
    address?: string
    city?: string
    country?: string
    isVirtual?: boolean
    virtualLink?: string
  }
  excerpt?: string
  content?: any[]
  registrationLink?: string
  price?: string
  capacity?: string
  category?: string
  featured?: boolean
  speakers?: Array<{
    name: string
    role?: string
    company?: string
    image?: any
  }>
  seo?: SanitySEO
}

export async function getAllEvents(): Promise<SanityEvent[]> {
  const query = `
    *[_type == "event" && ${publishedFilter}] | order(startDate asc) {
      _id,
      title,
      slug,
      featuredImage,
      eventType,
      startDate,
      endDate,
      location,
      excerpt,
      content,
      registrationLink,
      price,
      capacity,
      category,
      featured,
      speakers,
      seo
    }
  `
  return client.fetch(query)
}

export async function getUpcomingEvents(limit: number = 10): Promise<SanityEvent[]> {
  const now = new Date().toISOString()
  const query = `
    *[_type == "event" && ${publishedFilter} && startDate >= $now] | order(startDate asc)[0...$limit] {
      _id,
      title,
      slug,
      featuredImage,
      eventType,
      startDate,
      endDate,
      location,
      excerpt,
      content,
      registrationLink,
      price,
      capacity,
      category,
      featured,
      speakers,
      seo
    }
  `
  return client.fetch(query, { now, limit: limit - 1 })
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  const query = `
    *[_type == "event" && slug.current == $slug && ${publishedFilter}][0] {
      _id,
      title,
      slug,
      featuredImage,
      eventType,
      startDate,
      endDate,
      location,
      excerpt,
      content,
      registrationLink,
      price,
      capacity,
      category,
      featured,
      speakers,
      seo
    }
  `
  return client.fetch(query, { slug })
}

export function transformEvent(event: SanityEvent) {
  const startDate = event.startDate ? new Date(event.startDate) : new Date()
  const endDate = event.endDate ? new Date(event.endDate) : startDate
  
  // Format date range
  let dateStr = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  if (event.endDate && endDate.getTime() !== startDate.getTime()) {
    const endStr = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    // Same month
    if (startDate.getMonth() === endDate.getMonth()) {
      dateStr = `${startDate.toLocaleDateString('en-US', { month: 'long' })} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`
    } else {
      dateStr = `${dateStr} - ${endStr}`
    }
  }

  // Format time
  const timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) +
    (event.endDate ? ' - ' + endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '')

  // Format location
  const locationStr = event.location?.isVirtual 
    ? 'Virtual Event' 
    : [event.location?.venue, event.location?.city].filter(Boolean).join(', ')

  return {
    title: event.title || '',
    slug: event.slug?.current || '',
    type: formatEventType(event.eventType),
    date: dateStr,
    time: timeStr,
    location: locationStr || 'TBA',
    description: event.excerpt || '',
    content: portableTextToHtml(event.content) || '',
    featuredImage: getSanityImageUrl(event.featuredImage, { width: 1200 }) || '',
    speakers: event.speakers?.map(s => ({
      name: s.name,
      role: s.role || '',
      company: s.company || '',
      image: getSanityImageUrl(s.image, { width: 200 }) || '',
    })) || [],
    speakersList: event.speakers?.map(s => `${s.name}${s.role ? ', ' + s.role : ''}`) || [],
    price: event.price || 'Free',
    capacity: event.capacity || '',
    category: event.category || '',
    featured: event.featured || false,
    registrationLink: event.registrationLink,
    virtualLink: event.location?.virtualLink,
  }
}

function formatEventType(type: string): string {
  const types: Record<string, string> = {
    'conference': 'Conference',
    'webinar': 'Webinar',
    'workshop': 'Workshop',
    'meetup': 'Meetup',
    'trade-show': 'Trade Show',
    'launch-event': 'Launch Event',
    'summit': 'Summit',
    'training': 'Training',
  }
  return types[type] || type || 'Event'
}

// Press Release Types and Queries
export interface SanityPressRelease {
  _id: string
  title: string
  slug: { current: string }
  featuredImage?: any
  publishedAt: string
  source?: string
  externalLink?: string
  excerpt?: string
  content?: any[]
  category?: string
  readTime?: string
  isMediaFeature?: boolean
  hasFullArticle?: boolean
  articleSlug?: { current: string }
  seo?: SanitySEO
}

export async function getAllPressReleases(): Promise<SanityPressRelease[]> {
  const query = `
    *[_type == "pressRelease"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      featuredImage,
      publishedAt,
      source,
      externalLink,
      excerpt,
      category,
      readTime,
      isMediaFeature
    }
  `
  return client.fetch(query)
}

export async function getPressReleases(limit?: number): Promise<SanityPressRelease[]> {
  const query = limit 
    ? `*[_type == "pressRelease" && !isMediaFeature] | order(publishedAt desc)[0...$limit] {
        _id, title, slug, featuredImage, publishedAt, source, externalLink, excerpt, category, readTime, isMediaFeature
      }`
    : `*[_type == "pressRelease" && !isMediaFeature] | order(publishedAt desc) {
        _id, title, slug, featuredImage, publishedAt, source, externalLink, excerpt, category, readTime, isMediaFeature
      }`
  return client.fetch(query, { limit: limit ? limit - 1 : undefined })
}

export async function getMediaFeatures(limit?: number): Promise<SanityPressRelease[]> {
  const query = limit
    ? `*[_type == "pressRelease" && isMediaFeature == true] | order(publishedAt desc)[0...$limit] {
        _id, title, slug, featuredImage, publishedAt, source, externalLink, excerpt, category, readTime, isMediaFeature
      }`
    : `*[_type == "pressRelease" && isMediaFeature == true] | order(publishedAt desc) {
        _id, title, slug, featuredImage, publishedAt, source, externalLink, excerpt, category, readTime, isMediaFeature
      }`
  return client.fetch(query, { limit: limit ? limit - 1 : undefined })
}

export async function getPressReleaseBySlug(slug: string): Promise<SanityPressRelease | null> {
  const query = `
    *[_type == "pressRelease" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      featuredImage,
      publishedAt,
      source,
      externalLink,
      excerpt,
      content,
      category,
      readTime,
      isMediaFeature,
      hasFullArticle,
      articleSlug,
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

// Fetch full article press release by articleSlug (for dedicated article pages like /series-c-funding)
export async function getPressArticleBySlug(articleSlug: string): Promise<SanityPressRelease | null> {
  const query = `
    *[_type == "pressRelease" && articleSlug.current == $articleSlug && hasFullArticle == true][0] {
      _id,
      title,
      slug,
      featuredImage,
      publishedAt,
      source,
      externalLink,
      excerpt,
      content,
      category,
      readTime,
      isMediaFeature,
      hasFullArticle,
      articleSlug
    }
  `
  return client.fetch(query, { articleSlug })
}

// Get all press articles that have full article pages
export async function getAllPressArticles(): Promise<SanityPressRelease[]> {
  const query = `
    *[_type == "pressRelease" && hasFullArticle == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      featuredImage,
      publishedAt,
      source,
      externalLink,
      excerpt,
      category,
      readTime,
      articleSlug
    }
  `
  return client.fetch(query)
}

export function transformPressRelease(pr: SanityPressRelease) {
  const imageUrl = getSanityImageUrl(pr.featuredImage, { width: 800 })
  return {
    date: pr.publishedAt ? formatDate(pr.publishedAt) : '',
    category: formatPressCategory(pr.category),
    title: pr.title || '',
    excerpt: pr.excerpt || '',
    readTime: pr.readTime || '3 min read',
    slug: pr.slug?.current || '',
    externalLink: pr.externalLink,
    thumbnail: imageUrl || '', // Empty string lets component show category icons
  }
}

export function transformMediaFeature(pr: SanityPressRelease) {
  const imageUrl = getSanityImageUrl(pr.featuredImage, { width: 800 })
  return {
    outlet: pr.source || '',
    title: pr.title || '',
    date: pr.publishedAt ? formatDate(pr.publishedAt) : '',
    type: formatPressCategory(pr.category),
    slug: pr.slug?.current || '',
    externalLink: pr.externalLink,
    thumbnail: imageUrl || '', // Empty string lets component show category icons
  }
}

// Get related press releases (excluding current one, same category preferred)
export async function getRelatedPressReleases(currentSlug: string, category?: string, limit: number = 3): Promise<SanityPressRelease[]> {
  const query = `
    *[_type == "pressRelease" && slug.current != $currentSlug && !isMediaFeature] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      featuredImage,
      publishedAt,
      source,
      externalLink,
      excerpt,
      category,
      readTime,
      isMediaFeature
    }
  `
  return client.fetch(query, { currentSlug, limit: limit - 1 })
}

// Transform press release with full content for detail page
export function transformPressReleaseDetail(pr: SanityPressRelease) {
  return {
    date: pr.publishedAt ? formatDate(pr.publishedAt) : '',
    category: formatPressCategory(pr.category),
    title: pr.title || '',
    excerpt: pr.excerpt || '',
    readTime: pr.readTime || '3 min read',
    slug: pr.slug?.current || '',
    externalLink: pr.externalLink,
    source: pr.source || '',
    thumbnail: getSanityImageUrl(pr.featuredImage, { width: 1200 }) || '/assets/images/press-placeholder.svg',
    content: pr.content ? portableTextToHtml(pr.content) : '',
  }
}

function formatPressCategory(category: string | undefined): string {
  const categories: Record<string, string> = {
    'product-news': 'Product News',
    'media-spotlight': 'Media Spotlight',
    'company-news': 'Company News',
    'partnership': 'Partnership',
    'award': 'Award',
    'industry-news': 'Industry News',
    'product-launch': 'Product Launch',
    'funding': 'Funding',
    'recognition': 'Recognition',
    'product-update': 'Product Update',
    'expansion': 'Expansion',
  }
  return categories[category || ''] || category || 'News'
}

// Team Member Types and Queries
export interface SanityTeamMember {
  _id: string
  name: string
  slug: { current: string }
  role: string
  department?: string
  image?: any
  bio?: string
  fullBio?: any[]
  linkedin?: string
  twitter?: string
  email?: string
  isLeadership?: boolean
  order?: number
  seo?: SanitySEO
}

export async function getAllTeamMembers(): Promise<SanityTeamMember[]> {
  const query = `
    *[_type == "teamMember"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      role,
      department,
      image,
      bio,
      fullBio,
      linkedin,
      twitter,
      email,
      isLeadership,
      order
    }
  `
  return client.fetch(query)
}

export async function getLeadershipTeam(): Promise<SanityTeamMember[]> {
  const query = `
    *[_type == "teamMember" && isLeadership == true] | order(order asc, name asc) {
      _id,
      name,
      slug,
      role,
      department,
      image,
      bio,
      fullBio,
      linkedin,
      twitter,
      email,
      isLeadership,
      order
    }
  `
  return client.fetch(query)
}

export async function getTeamMemberBySlug(slug: string): Promise<SanityTeamMember | null> {
  const query = `
    *[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      role,
      department,
      image,
      bio,
      fullBio,
      linkedin,
      twitter,
      email,
      isLeadership,
      order,
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

export function transformTeamMember(member: SanityTeamMember) {
  return {
    name: member.name || '',
    slug: member.slug?.current || '',
    role: member.role || '',
    department: member.department || '',
    image: getSanityImageUrl(member.image, { width: 400 }) || '/assets/images/team-placeholder.svg',
    bio: member.bio || '',
    fullBio: member.fullBio ? portableTextToHtml(member.fullBio) : '',
    linkedin: member.linkedin,
    twitter: member.twitter,
    email: member.email,
  }
}

// Webinar Types and Queries
export interface WebinarSpeaker {
  _key?: string
  name: string
  role?: string
  company?: string
  bio?: string
  image?: any
  linkedin?: string
}

export interface SanityWebinar {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  featuredImage?: any
  speakerImage?: any
  webinarType: 'upcoming' | 'past'
  date?: string
  time?: string
  duration?: string
  speaker?: string
  speakerRole?: string
  speakers?: WebinarSpeaker[]
  registrationLink?: string
  watchLink?: string
  content?: any
  htmlContent?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
    keywords?: string[]
    enableKeywords?: boolean
    noIndex?: boolean
  }
}

export async function getAllWebinars(): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      featuredImage,
      speakerImage,
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      speakers[] {
        _key,
        name,
        role,
        company,
        bio,
        image,
        linkedin
      },
      registrationLink,
      watchLink
    }
  `
  return client.fetch(query)
}

export async function getUpcomingWebinars(): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar" && webinarType == "upcoming"] | order(date asc) {
      _id,
      title,
      slug,
      description,
      featuredImage,
      speakerImage,
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      speakers[] {
        _key,
        name,
        role,
        company,
        bio,
        image,
        linkedin
      },
      registrationLink
    }
  `
  return client.fetch(query)
}

export async function getPastWebinars(): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar" && webinarType == "past"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      featuredImage,
      speakerImage,
      webinarType,
      duration,
      speaker,
      speakerRole,
      speakers[] {
        _key,
        name,
        role,
        company,
        bio,
        image,
        linkedin
      },
      watchLink
    }
  `
  return client.fetch(query)
}

export function transformWebinar(webinar: SanityWebinar) {
  return {
    id: webinar._id,
    slug: webinar.slug?.current || '',
    title: webinar.title || '',
    description: webinar.description || '',
    date: webinar.date || '',
    time: webinar.time || '',
    duration: webinar.duration || '',
    speaker: webinar.speaker || '',
    speakerRole: webinar.speakerRole || '',
    speakerImage: getSanityImageUrl(webinar.speakerImage, { width: 200 }) || '',
    featuredImage: getSanityImageUrl(webinar.featuredImage, { width: 800 }) || '',
    webinarType: webinar.webinarType,
    registrationLink: webinar.registrationLink,
    watchLink: webinar.watchLink,
    speakers: webinar.speakers?.map(s => ({
      _key: s._key,
      name: s.name || '',
      role: s.role || '',
      company: s.company || '',
      bio: s.bio || '',
      image: getSanityImageUrl(s.image, { width: 200 }) || '',
      linkedin: s.linkedin || '',
    })) || [],
  }
}

export async function getWebinarBySlug(slug: string): Promise<SanityWebinar | null> {
  const query = `
    *[_type == "webinar" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      featuredImage,
      speakerImage,
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      speakers[] {
        _key,
        name,
        role,
        company,
        bio,
        image,
        linkedin
      },
      registrationLink,
      watchLink,
      content,
      htmlContent,
      seo
    }
  `
  return client.fetch(query, { slug })
}

export async function getRelatedWebinars(currentSlug: string, limit: number = 3): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar" && slug.current != $currentSlug] | order(date desc)[0...$limit] {
      _id,
      title,
      slug,
      description,
      featuredImage,
      speakerImage,
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      speakers[] {
        _key,
        name,
        role,
        company,
        bio,
        image,
        linkedin
      }
    }
  `
  return client.fetch(query, { currentSlug, limit })
}

// Job Position Types and Queries
export interface SanityJobPosition {
  _id: string
  title: string
  slug: { current: string }
  department?: string
  location?: string
  type?: string
  level?: string
  description?: string
  requirements?: string[]
  responsibilities?: string[]
  benefits?: string[]
  salaryRange?: string
  applyLink?: string
  applicationFormUrl?: string
  isActive?: boolean
  publishedAt?: string
}

export async function getActiveJobPositions(): Promise<SanityJobPosition[]> {
  const query = `
    *[_type == "jobPosition" && isActive == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      department,
      location,
      type,
      level,
      description,
      requirements,
      responsibilities,
      benefits,
      salaryRange,
      applyLink,
      applicationFormUrl
    }
  `
  return client.fetch(query)
}

export async function getAllJobPositions(): Promise<SanityJobPosition[]> {
  const query = `
    *[_type == "jobPosition"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      department,
      location,
      type,
      level,
      description,
      requirements,
      isActive
    }
  `
  return client.fetch(query)
}

export async function getJobPositionBySlug(slug: string): Promise<SanityJobPosition | null> {
  const query = `
    *[_type == "jobPosition" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      department,
      location,
      type,
      level,
      description,
      requirements,
      responsibilities,
      benefits,
      salaryRange,
      applyLink,
      applicationFormUrl,
      isActive,
      publishedAt
    }
  `
  return client.fetch(query, { slug })
}

export function transformJobPosition(job: SanityJobPosition) {
  return {
    id: job._id,
    title: job.title || '',
    slug: job.slug?.current || '',
    department: formatDepartment(job.department),
    location: job.location || '',
    type: formatJobType(job.type),
    level: job.level || '',
    description: job.description || '',
    requirements: job.requirements || [],
    responsibilities: job.responsibilities || [],
    benefits: job.benefits || [],
    salaryRange: job.salaryRange || '',
    applyLink: job.applyLink || '',
    applicationFormUrl: job.applicationFormUrl || '',
    isActive: job.isActive ?? true,
  }
}

function formatDepartment(dept: string | undefined): string {
  const depts: Record<string, string> = {
    'engineering': 'Engineering',
    'product': 'Product',
    'design': 'Design',
    'marketing': 'Marketing',
    'sales': 'Sales',
    'operations': 'Operations',
    'finance': 'Finance',
    'hr': 'Human Resources',
    'data-analytics': 'Data & Analytics',
  }
  return depts[dept || ''] || dept || 'General'
}

function formatJobType(type: string | undefined): string {
  const types: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship',
  }
  return types[type || ''] || type || 'Full-time'
}

// Ebook Types and Queries
export interface ZohoFormFieldData {
  label: string
  zohoFieldName: string
  fieldType: 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'hidden'
  placeholder?: string
  required?: boolean
  halfWidth?: boolean
  options?: string[]
  defaultValue?: string
  validationPattern?: string
  validationMessage?: string
}

export interface ZohoFormData {
  _id: string
  name: string
  formUrl?: string
  formType?: string
  renderMode: 'iframe' | 'native'
  displayMode?: 'iframe' | 'modal' | 'newtab'
  height?: number
  width?: string
  isActive?: boolean
  assignedPages?: string[]
  // Native mode fields
  zohoFormPermalink?: string
  zohoFormLinkName?: string
  zohoPortalName?: string
  fields?: ZohoFormFieldData[]
  submitButtonText?: string
  successMessage?: string
  successRedirectUrl?: string
}

export interface SanityEbook {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  category?: string
  image?: any
  year?: string
  featured?: boolean
  isNew?: boolean
  viewUrl?: string
  pdfFileUrl?: string
  pages?: number
  downloads?: string
  topics?: string[]
  body?: any[]
  order?: number
  zohoForm?: ZohoFormData
  seo?: SanitySEO
}

export async function getAllEbooks(): Promise<SanityEbook[]> {
  const query = `
    *[_type == "ebook"] | order(order asc, year desc) {
      _id,
      title,
      slug,
      description,
      category,
      image,
      year,
      featured,
      isNew,
      viewUrl,
      "pdfFileUrl": pdfFile.asset->url,
      pages,
      downloads,
      topics,
      order,
      zohoForm->{
        _id,
        name,
        formUrl,
        formType,
        "displayMode": embedSettings.displayMode,
        "height": embedSettings.height,
        "width": embedSettings.width,
        isActive
      }
    }
  `
  return client.fetch(query)
}

export async function getEbookBySlug(slug: string): Promise<SanityEbook | null> {
  const query = `
    *[_type == "ebook" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      category,
      image,
      year,
      featured,
      isNew,
      viewUrl,
      "pdfFileUrl": pdfFile.asset->url,
      pages,
      downloads,
      topics,
      body,
      order,
      seo,
      zohoForm->{
        _id,
        name,
        formUrl,
        formType,
        "displayMode": embedSettings.displayMode,
        "height": embedSettings.height,
        "width": embedSettings.width,
        isActive
      }
    }
  `
  return client.fetch(query, { slug })
}

export async function getFeaturedEbook(): Promise<SanityEbook | null> {
  const query = `
    *[_type == "ebook" && featured == true][0] {
      _id,
      title,
      slug,
      description,
      category,
      image,
      year,
      featured,
      isNew,
      viewUrl,
      pages,
      downloads,
      topics,
      order
    }
  `
  return client.fetch(query)
}

export async function getEbooksByCategory(category: string): Promise<SanityEbook[]> {
  const query = `
    *[_type == "ebook" && category == $category] | order(order asc) {
      _id,
      title,
      slug,
      description,
      category,
      image,
      year,
      featured,
      isNew,
      viewUrl,
      "pdfFileUrl": pdfFile.asset->url,
      pages,
      downloads,
      topics,
      order
    }
  `
  return client.fetch(query, { category })
}

export function transformEbook(ebook: SanityEbook) {
  // Use viewUrl if set, otherwise use pdfFileUrl if available
  const viewUrl = ebook.viewUrl || ebook.pdfFileUrl || '';
  
  return {
    id: ebook._id,
    title: ebook.title || '',
    slug: ebook.slug?.current || '',
    description: ebook.description || '',
    category: formatEbookCategory(ebook.category),
    image: getSanityImageUrl(ebook.image, { width: 600 }) || '/assets/images/ebook-placeholder.svg',
    year: ebook.year || '',
    featured: ebook.featured || false,
    isNew: ebook.isNew || false,
    viewUrl: viewUrl,
    pages: ebook.pages || 0,
    downloads: ebook.downloads || '0',
    topics: ebook.topics || [],
    body: ebook.body || [],
    zohoForm: ebook.zohoForm && ebook.zohoForm.isActive !== false ? {
      formUrl: ebook.zohoForm.formUrl,
      name: ebook.zohoForm.name,
      displayMode: ebook.zohoForm.displayMode || 'modal',
      height: ebook.zohoForm.height || 600,
      width: ebook.zohoForm.width || '100%',
    } : undefined,
  }
}

function formatEbookCategory(category: string | undefined): string {
  const categories: Record<string, string> = {
    'guide': 'Guide',
    'whitepaper': 'Whitepaper',
    'playbook': 'Playbook',
    'market-report': 'Market Report',
    'case-study': 'Case Study',
  }
  return categories[category || ''] || category || 'Guide'
}

// Whitepaper Types and Queries
export interface SanityWhitepaper {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  category?: string
  image?: any
  pages?: number
  downloads?: string
  publishDate?: string
  topics?: string[]
  featured?: boolean
  downloadUrl?: string
  pdfFile?: any
  order?: number
}

export async function getAllWhitepapers(): Promise<SanityWhitepaper[]> {
  const query = `
    *[_type == "whitepaper"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      category,
      image,
      pages,
      downloads,
      publishDate,
      topics,
      featured,
      downloadUrl,
      order
    }
  `
  return client.fetch(query)
}

export async function getFeaturedWhitepaper(): Promise<SanityWhitepaper | null> {
  const query = `
    *[_type == "whitepaper" && featured == true][0] {
      _id,
      title,
      slug,
      description,
      category,
      image,
      pages,
      downloads,
      publishDate,
      topics,
      featured,
      downloadUrl,
      order
    }
  `
  return client.fetch(query)
}

export function transformWhitepaper(paper: SanityWhitepaper) {
  return {
    id: paper._id,
    title: paper.title || '',
    slug: paper.slug?.current || '',
    description: paper.description || '',
    category: formatWhitepaperCategory(paper.category),
    image: getSanityImageUrl(paper.image, { width: 600 }) || '/assets/images/ebook-placeholder.svg',
    pages: paper.pages || 0,
    downloads: paper.downloads || '0',
    publishDate: paper.publishDate || '',
    topics: paper.topics || [],
    featured: paper.featured || false,
    downloadUrl: paper.downloadUrl,
  }
}

function formatWhitepaperCategory(category: string | undefined): string {
  const categories: Record<string, string> = {
    'industry-report': 'Industry Report',
    'technology': 'Technology',
    'best-practices': 'Best Practices',
    'compliance': 'Compliance',
    'industry-guide': 'Industry Guide',
    'analytics': 'Analytics',
  }
  return categories[category || ''] || category || 'Report'
}

// Location Types and Queries
export interface SanityLocationMarket {
  city: string
  code: string
  population: string
  screens: number
  screensGrowth: number
  dailyReach: string
  dailyReachGrowth: number
  monthlyImpressions: string
  monthlyImpressionsGrowth: number
  yoyGrowth: number
  avgDwell: string
  peakHours: string
  topCategory: string
  viewability: number
  description: string
  hourlyData?: number[]
  locations?: Array<{
    name: string
    desc: string
    traffic: number
    screens: number
    score: number
  }>
  audience?: Array<{
    name: string
    percentage: number
    color: string
  }>
  mediaFormats?: Array<{
    name: string
    percentage: number
  }>
}

export interface SanityLocation {
  _id: string
  country: string
  slug: { current: string }
  city?: string
  flag?: string
  heroImage?: any
  description?: string
  fullDescription?: string
  billboards?: string
  contactFormUrl?: string
  whyInvest?: string[]
  highVisibilityBillboards?: Array<{
    name: string
    location: string
    reach: string
    impressions: string
    description: string
    image?: any
  }>
  stats?: Array<{ label: string; value: string }>
  majorCities?: string[]
  mediaTypes?: Array<{
    name: string
    icon: string
    description: string
  }>
  keyMarkets?: SanityLocationMarket[]
  faqs?: Array<{
    question: string
    answer: string
  }>
  caseStudies?: Array<{
    title: string
    client: string
    results: string
  }>
  partners?: string[]
  order?: number
  isActive?: boolean
  seo?: SanitySEO
  sections?: any[]
  sectionsPosition?: string
}

export async function getAllLocations(): Promise<SanityLocation[]> {
  const query = `
    *[_type == "location" && isActive == true] | order(order asc) {
      _id,
      country,
      slug,
      city,
      flag,
      heroImage,
      description,
      billboards,
      order
    }
  `
  return client.fetch(query)
}

export async function getLocationBySlug(slug: string): Promise<SanityLocation | null> {
  const query = `
    *[_type == "location" && slug.current == $slug][0] {
      _id,
      country,
      slug,
      city,
      flag,
      heroImage,
      description,
      fullDescription,
      billboards,
      contactFormUrl,
      whyInvest,
      highVisibilityBillboards[] {
        name,
        location,
        reach,
        impressions,
        description,
        image
      },
      stats,
      majorCities,
      mediaTypes,
      keyMarkets,
      faqs,
      caseStudies,
      partners,
      order,
      isActive,
      sections,
      sectionsPosition,
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

export function transformLocationForList(location: SanityLocation) {
  return {
    country: location.country || '',
    city: location.city || '',
    flag: location.flag || '',
    href: `/locations/${location.slug?.current || ''}`,
    description: location.description || '',
    billboards: location.billboards || '0',
    image: getSanityImageUrl(location.heroImage, { width: 800 }) || '',
  }
}

export function transformLocationFull(location: SanityLocation) {
  return {
    name: location.country || '',
    slug: location.slug?.current || '',
    city: location.city || '',
    flag: location.flag || '',
    description: location.fullDescription || location.description || '',
    heroImage: getSanityImageUrl(location.heroImage, { width: 1200 }) || '',
    contactFormUrl: location.contactFormUrl || '',
    whyInvest: location.whyInvest || [],
    highVisibilityBillboards: (location.highVisibilityBillboards || []).map(billboard => ({
      name: billboard.name || '',
      location: billboard.location || '',
      reach: billboard.reach || '',
      impressions: billboard.impressions || '',
      description: billboard.description || '',
      image: getSanityImageUrl(billboard.image, { width: 800 }) || '',
    })),
    stats: location.stats || [],
    majorCities: location.majorCities || [],
    mediaTypes: location.mediaTypes || [],
    keyMarkets: location.keyMarkets || [],
    faqs: location.faqs || [],
    caseStudies: location.caseStudies || [],
    partners: location.partners || [],
    sections: location.sections || [],
    sectionsPosition: location.sectionsPosition || 'after-faqs',
  }
}

// Product Types and Queries
export interface SanityProductFeature {
  icon?: string
  title: string
  description: string
  metric?: string
}

export interface SanityProductStat {
  value: string
  label: string
  growth?: number
}

export interface SanityProductIntegration {
  name: string
  logo?: any
  category?: string
}

export interface SanityProductTestimonial {
  quote: string
  author: string
  role: string
  company: string
  metric?: string
  avatar?: any
}

export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  tagline?: string
  description?: string
  icon?: string
  heroImage?: any
  category?: string
  features?: SanityProductFeature[]
  benefits?: string[]
  stats?: SanityProductStat[]
  integrations?: SanityProductIntegration[]
  testimonials?: SanityProductTestimonial[]
  useCases?: Array<{ title: string; description: string; industry?: string }>
  ctaText?: string
  ctaLink?: string
  demoVideo?: string
  order?: number
  isActive?: boolean
}

export async function getAllProducts(): Promise<SanityProduct[]> {
  const query = `
    *[_type == "product" && isActive == true] | order(order asc) {
      _id,
      name,
      slug,
      tagline,
      description,
      icon,
      heroImage,
      category,
      order
    }
  `
  return client.fetch(query)
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      description,
      icon,
      heroImage,
      category,
      features,
      benefits,
      stats,
      integrations,
      testimonials,
      useCases,
      ctaText,
      ctaLink,
      demoVideo,
      order,
      isActive
    }
  `
  return client.fetch(query, { slug })
}

export function transformProduct(product: SanityProduct) {
  return {
    name: product.name || '',
    slug: product.slug?.current || '',
    tagline: product.tagline || '',
    description: product.description || '',
    icon: product.icon || '',
    heroImage: getSanityImageUrl(product.heroImage, { width: 1200 }) || '',
    category: product.category || '',
    features: product.features || [],
    benefits: product.benefits || [],
    stats: product.stats || [],
    integrations: (product.integrations || []).map((i) => ({
      name: i.name,
      logo: getSanityImageUrl(i.logo, { width: 200 }) || '',
      category: i.category || '',
    })),
    testimonials: product.testimonials || [],
    useCases: product.useCases || [],
    ctaText: product.ctaText || 'Get Started',
    ctaLink: product.ctaLink || '/contact',
    demoVideo: product.demoVideo || '',
  }
}

// Company Page Types and Queries
export interface SanityCompanyPageValue {
  icon?: string
  title: string
  description: string
}

export interface SanityCompanyPageAssociation {
  name: string
  logo?: any
  url?: string
}

export interface SanityCompanyPageAward {
  name: string
  year?: string
  description?: string
  logo?: any
}

export interface SanityCompanyPage {
  _id: string
  pageType: string
  title: string
  subtitle?: string
  heroDescription?: string
  heroImage?: any
  mission?: string
  vision?: string
  values?: SanityCompanyPageValue[]
  capabilities?: SanityCompanyPageValue[]
  stats?: Array<{ value: string; label: string }>
  associations?: SanityCompanyPageAssociation[]
  awards?: SanityCompanyPageAward[]
  content?: any
  seoTitle?: string
  seoDescription?: string
}

export async function getCompanyPage(pageType: string): Promise<SanityCompanyPage | null> {
  const query = `
    *[_type == "companyPage" && pageType == $pageType][0] {
      _id,
      pageType,
      title,
      subtitle,
      heroDescription,
      heroImage,
      mission,
      vision,
      values,
      capabilities,
      stats,
      associations,
      awards,
      content,
      seoTitle,
      seoDescription
    }
  `
  return client.fetch(query, { pageType })
}

export function transformCompanyPage(page: SanityCompanyPage) {
  return {
    pageType: page.pageType,
    title: page.title || '',
    subtitle: page.subtitle || '',
    heroDescription: page.heroDescription || '',
    heroImage: getSanityImageUrl(page.heroImage, { width: 1200 }) || '',
    mission: page.mission || '',
    vision: page.vision || '',
    values: page.values || [],
    capabilities: page.capabilities || [],
    stats: page.stats || [],
    associations: (page.associations || []).map((a) => ({
      name: a.name,
      logo: getSanityImageUrl(a.logo, { width: 200 }) || '',
      url: a.url || '',
    })),
    awards: (page.awards || []).map((a) => ({
      name: a.name,
      year: a.year || '',
      description: a.description || '',
      logo: getSanityImageUrl(a.logo, { width: 200 }) || '',
    })),
  }
}

// Timeline Event Types and Queries
export interface SanityTimelineEvent {
  _id: string
  year: string
  quarter?: string
  title: string
  description?: string
  achievement?: string
  icon?: string
  color?: string
  phase?: string
  metrics?: Array<{ label: string; value: string }>
  order: number
  isHighlight?: boolean
}

export async function getTimelineEvents(): Promise<SanityTimelineEvent[]> {
  const query = `
    *[_type == "timelineEvent"] | order(order asc) {
      _id,
      year,
      quarter,
      title,
      description,
      achievement,
      icon,
      color,
      phase,
      metrics,
      order,
      isHighlight
    }
  `
  return client.fetch(query)
}

export async function getTimelineEventsByPhase(phase: string): Promise<SanityTimelineEvent[]> {
  const query = `
    *[_type == "timelineEvent" && phase == $phase] | order(order asc) {
      _id,
      year,
      quarter,
      title,
      description,
      achievement,
      icon,
      color,
      phase,
      metrics,
      order,
      isHighlight
    }
  `
  return client.fetch(query, { phase })
}

export function transformTimelineEvent(event: SanityTimelineEvent) {
  return {
    year: event.year,
    quarter: event.quarter || '',
    title: event.title,
    description: event.description || '',
    achievement: event.achievement || '',
    icon: event.icon || '',
    color: event.color || 'blue',
    phase: event.phase || '',
    metrics: event.metrics || [],
    isHighlight: event.isHighlight || false,
  }
}

// Office Types and Queries
export interface SanityOffice {
  _id: string
  city: string
  country: string
  type?: string
  address?: string
  phone?: string
  email?: string
  flag?: string
  coordinates?: { lat: number; lng: number }
  image?: any
  timezone?: string
  workingHours?: string
  isHeadquarters?: boolean
  order?: number
  isActive?: boolean
}

export async function getAllOffices(): Promise<SanityOffice[]> {
  const query = `
    *[_type == "office" && isActive == true] | order(order asc) {
      _id,
      city,
      country,
      type,
      address,
      phone,
      email,
      flag,
      coordinates,
      image,
      timezone,
      workingHours,
      isHeadquarters,
      order
    }
  `
  return client.fetch(query)
}

export async function getHeadquarters(): Promise<SanityOffice | null> {
  const query = `
    *[_type == "office" && isHeadquarters == true][0] {
      _id,
      city,
      country,
      type,
      address,
      phone,
      email,
      flag,
      coordinates,
      image,
      timezone,
      workingHours,
      isHeadquarters
    }
  `
  return client.fetch(query)
}

export function transformOffice(office: SanityOffice) {
  return {
    city: office.city,
    country: office.country,
    type: office.type || 'regional',
    address: office.address || '',
    phone: office.phone || '',
    email: office.email || '',
    flag: office.flag || '',
    coordinates: office.coordinates || null,
    image: getSanityImageUrl(office.image, { width: 600 }) || '',
    timezone: office.timezone || '',
    workingHours: office.workingHours || '',
    isHeadquarters: office.isHeadquarters || false,
  }
}

// ============================================
// AUDIENCE PAGE TYPES AND QUERIES
// ============================================

export interface SanityAudiencePage {
  _id: string
  pageType: 'agencies' | 'brands' | 'media-owners'
  title: string
  titleHighlight?: string
  subtitle?: string
  primaryCTA?: { text: string; href: string }
  secondaryCTA?: { text: string; href: string }
  heroImage?: any
  platformSectionTitle?: string
  platformSectionSubtitle?: string
  platformFeatures?: Array<{
    _key: string
    id: string
    tabLabel?: string
    name: string
    title: string
    description: string
    image?: any
    icon?: string
    features?: string[]
    linkHref?: string
    linkText?: string
  }>
  trustBarTitle?: string
  customerLogos?: Array<{
    _key: string
    name: string
    logo?: any
  }>
  journeyTitle?: string
  journeySubtitle?: string
  journeySteps?: Array<{
    _key: string
    stepLabel: string
    stepName: string
    description: string
    items: string[]
  }>
  caseStudySectionTitle?: string
  caseStudySectionSubtitle?: string
  caseStudies?: Array<{
    _key: string
    client: string
    category: string
    title: string
    description: string
    image?: any
    duration: string
    budget: string
    metrics: Array<{ label: string; value: string }>
  }>
  featureGridTitle?: string
  featureGridSubtitle?: string
  featureGrid?: Array<{
    _key: string
    title: string
    description: string
    iconName?: string
  }>
  benefits?: Array<{
    _key: string
    title: string
    description: string
    icon?: string
    image?: any
  }>
  stats?: Array<{
    _key: string
    value: string
    label: string
  }>
  services?: Array<{
    _key: string
    title: string
    description: string
    icon?: string
    image?: any
    offerings: string[]
  }>
  faqs?: Array<{
    _key: string
    question: string
    answer: string
  }>
  seoTitle?: string
  seoDescription?: string
}

export async function getAudiencePage(pageType: string): Promise<SanityAudiencePage | null> {
  const query = `
    *[_type == "audiencePage" && pageType == $pageType][0] {
      _id,
      pageType,
      title,
      titleHighlight,
      subtitle,
      primaryCTA,
      secondaryCTA,
      heroImage,
      platformSectionTitle,
      platformSectionSubtitle,
      platformFeatures,
      trustBarTitle,
      customerLogos[] {
        _key,
        name,
        logo
      },
      journeyTitle,
      journeySubtitle,
      journeySteps,
      caseStudySectionTitle,
      caseStudySectionSubtitle,
      caseStudies[] {
        _key,
        client,
        category,
        title,
        description,
        image,
        duration,
        budget,
        metrics
      },
      featureGridTitle,
      featureGridSubtitle,
      featureGrid,
      benefits,
      stats,
      services,
      faqs,
      seoTitle,
      seoDescription
    }
  `
  return client.fetch(query, { pageType })
}

export function transformAudiencePage(page: SanityAudiencePage) {
  return {
    pageType: page.pageType,
    title: page.title || '',
    titleHighlight: page.titleHighlight || '',
    subtitle: page.subtitle || '',
    primaryCTA: page.primaryCTA || { text: 'Contact Us', href: '/contact' },
    secondaryCTA: page.secondaryCTA || { text: 'Learn More', href: '#' },
    heroImage: getSanityImageUrl(page.heroImage, { width: 1200 }) || '',
    platformSectionTitle: page.platformSectionTitle || '',
    platformSectionSubtitle: page.platformSectionSubtitle || '',
    platformFeatures: (page.platformFeatures || []).map(f => ({
      ...f,
      image: f.image ? getSanityImageUrl(f.image, { width: 800 }) : '',
    })),
    trustBarTitle: page.trustBarTitle || '',
    customerLogos: (page.customerLogos || []).map(l => ({
      name: l.name,
      logo: l.logo ? getSanityImageUrl(l.logo, { width: 240 }) : '',
    })),
    journeyTitle: page.journeyTitle || '',
    journeySubtitle: page.journeySubtitle || '',
    journeySteps: page.journeySteps || [],
    caseStudySectionTitle: page.caseStudySectionTitle || '',
    caseStudySectionSubtitle: page.caseStudySectionSubtitle || '',
    caseStudies: (page.caseStudies || []).map(cs => ({
      ...cs,
      image: cs.image ? getSanityImageUrl(cs.image, { width: 800 }) : '',
    })),
    featureGridTitle: page.featureGridTitle || '',
    featureGridSubtitle: page.featureGridSubtitle || '',
    featureGrid: page.featureGrid || [],
    benefits: (page.benefits || []).map(b => ({
      ...b,
      image: b.image ? getSanityImageUrl(b.image, { width: 600 }) : '',
    })),
    stats: page.stats || [],
    services: (page.services || []).map(s => ({
      ...s,
      image: s.image ? getSanityImageUrl(s.image, { width: 800 }) : '',
    })),
    faqs: page.faqs || [],
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
  }
}

// ============================================
// TESTIMONIALS BY CATEGORY
// ============================================

export interface SanityTestimonial {
  _id: string
  internalName: string
  quote: { en?: string; [key: string]: string | undefined }
  author: string
  role?: string
  company?: string
  avatar?: any
  companyLogo?: any
  rating?: number
  featured?: boolean
  categories?: string[]
}

export async function getTestimonialsByCategory(category: string): Promise<SanityTestimonial[]> {
  const query = `
    *[_type == "reusableTestimonial" && $category in categories] | order(featured desc) {
      _id,
      internalName,
      quote,
      author,
      role,
      company,
      avatar,
      companyLogo,
      rating,
      featured,
      categories
    }
  `
  return client.fetch(query, { category })
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  const query = `
    *[_type == "reusableTestimonial"] | order(featured desc) {
      _id,
      internalName,
      quote,
      author,
      role,
      company,
      avatar,
      companyLogo,
      rating,
      featured,
      categories
    }
  `
  return client.fetch(query)
}

export function transformTestimonial(testimonial: SanityTestimonial, locale: string = 'en') {
  return {
    _id: testimonial._id,
    quote: testimonial.quote?.[locale] || testimonial.quote?.en || '',
    author: testimonial.author || '',
    role: testimonial.role || '',
    company: testimonial.company || '',
    image: testimonial.avatar ? { asset: { _ref: testimonial.avatar.asset?._ref } } : undefined,
    companyLogo: testimonial.companyLogo ? { asset: { _ref: testimonial.companyLogo.asset?._ref } } : undefined,
    metric: '',
    industry: '',
  }
}

// ============================================
// INDUSTRY PAGE TYPES AND QUERIES
// ============================================

export interface SanityIndustryPage {
  _id: string
  industry: string
  slug: { current: string }
  badgeText?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  heroImage?: any
  heroStats?: Array<{
    _key: string
    value: string
    label: string
  }>
  benefits?: Array<{
    _key: string
    title: string
    description: string
  }>
  benefitsSectionTitle?: string
  benefitsSectionSubtitle?: string
  services?: Array<{
    _key: string
    title: string
    description: string
    offerings: string[]
  }>
  servicesSectionTitle?: string
  servicesSectionSubtitle?: string
  trustFactors?: Array<{
    _key: string
    metric: string
    description: string
  }>
  caseStudies?: Array<{
    _key: string
    brand: string
    metric: string
    description: string
  }>
  seoTitle?: string
  seoDescription?: string
  order?: number
  isActive?: boolean
}

export async function getIndustryPage(industry: string): Promise<SanityIndustryPage | null> {
  const query = `
    *[_type == "industryPage" && industry == $industry][0] {
      _id,
      industry,
      slug,
      badgeText,
      title,
      titleHighlight,
      subtitle,
      heroImage,
      heroStats,
      benefits,
      benefitsSectionTitle,
      benefitsSectionSubtitle,
      services,
      servicesSectionTitle,
      servicesSectionSubtitle,
      trustFactors,
      caseStudies,
      seoTitle,
      seoDescription
    }
  `
  return client.fetch(query, { industry })
}

export async function getAllIndustryPages(): Promise<SanityIndustryPage[]> {
  const query = `
    *[_type == "industryPage" && isActive == true] | order(order asc) {
      _id,
      industry,
      slug,
      title,
      titleHighlight,
      subtitle,
      heroImage
    }
  `
  return client.fetch(query)
}

export function transformIndustryPage(page: SanityIndustryPage) {
  return {
    industry: page.industry,
    slug: page.slug?.current || '',
    badgeText: page.badgeText || '',
    title: page.title || '',
    titleHighlight: page.titleHighlight || '',
    subtitle: page.subtitle || '',
    heroImage: getSanityImageUrl(page.heroImage, { width: 1200 }) || '',
    heroStats: page.heroStats || [],
    benefits: page.benefits || [],
    benefitsSectionTitle: page.benefitsSectionTitle || '',
    benefitsSectionSubtitle: page.benefitsSectionSubtitle || '',
    services: page.services || [],
    servicesSectionTitle: page.servicesSectionTitle || '',
    servicesSectionSubtitle: page.servicesSectionSubtitle || '',
    trustFactors: page.trustFactors || [],
    caseStudies: page.caseStudies || [],
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
  }
}

// ============================================
// INTEGRATION TYPES AND QUERIES
// ============================================

export interface SanityIntegration {
  _id: string
  name: string
  slug: { current: string }
  category: string
  description: string
  logo?: any
  logoUrl?: string
  products?: string[]
  features?: string[]
  apiDocs?: string
  apiDocsUrl?: string
  status?: string
  website?: string
  order?: number
  isFeatured?: boolean
  isActive?: boolean
}

export async function getAllIntegrations(): Promise<SanityIntegration[]> {
  const query = `
    *[_type == "integration"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      category,
      description,
      logo,
      logoUrl,
      products,
      features,
      apiDocs,
      apiDocsUrl,
      status,
      website,
      order,
      isFeatured
    }
  `
  return client.fetch(query)
}

export async function getIntegrationsByCategory(category: string): Promise<SanityIntegration[]> {
  const query = `
    *[_type == "integration" && category == $category] | order(order asc) {
      _id,
      name,
      slug,
      category,
      description,
      logo,
      logoUrl,
      products,
      features,
      apiDocs,
      apiDocsUrl,
      status
    }
  `
  return client.fetch(query, { category })
}

export async function getFeaturedIntegrations(): Promise<SanityIntegration[]> {
  const query = `
    *[_type == "integration" && isFeatured == true] | order(order asc) {
      _id,
      name,
      slug,
      category,
      description,
      logo,
      logoUrl,
      products,
      features,
      status
    }
  `
  return client.fetch(query)
}

export function transformIntegration(integration: SanityIntegration) {
  return {
    id: integration.slug?.current || integration._id,
    name: integration.name,
    category: integration.category,
    description: integration.description || '',
    logo: getSanityImageUrl(integration.logo, { width: 200 }) || integration.logoUrl || '',
    products: integration.products || [],
    features: integration.features || [],
    apiDocs: integration.apiDocs || integration.apiDocsUrl || '/api-reference',
    status: integration.status || 'live',
    website: integration.website || '',
    isFeatured: integration.isFeatured || false,
  }
}

// ============================================
// OOH FORMAT TYPES AND QUERIES
// ============================================

export interface SanityOohFormat {
  _id: string
  name: string
  slug: { current: string }
  category: string
  icon?: string
  shortDescription?: string
  longDescription?: string
  specs?: string[]
  benefits?: string[]
  image?: any
  imageUrl?: string
  videoUrl?: string
  averageCpm?: string
  typicalReach?: string
  bestFor?: string[]
  order?: number
  isFeatured?: boolean
  isActive?: boolean
}

export async function getAllOohFormats(): Promise<SanityOohFormat[]> {
  const query = `
    *[_type == "oohFormat"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      category,
      icon,
      shortDescription,
      longDescription,
      specs,
      benefits,
      image,
      imageUrl,
      videoUrl,
      averageCpm,
      typicalReach,
      bestFor,
      order,
      isFeatured
    }
  `
  return client.fetch(query)
}

export async function getOohFormatsByCategory(category: string): Promise<SanityOohFormat[]> {
  const query = `
    *[_type == "oohFormat" && category == $category] | order(order asc) {
      _id,
      name,
      slug,
      category,
      icon,
      shortDescription,
      specs,
      benefits,
      image,
      imageUrl
    }
  `
  return client.fetch(query, { category })
}

export async function getOohFormatBySlug(slug: string): Promise<SanityOohFormat | null> {
  const query = `
    *[_type == "oohFormat" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      category,
      icon,
      shortDescription,
      longDescription,
      specs,
      benefits,
      image,
      imageUrl,
      videoUrl,
      averageCpm,
      typicalReach,
      bestFor
    }
  `
  return client.fetch(query, { slug })
}

export function transformOohFormat(format: SanityOohFormat) {
  return {
    name: format.name,
    slug: format.slug?.current || '',
    category: format.category,
    icon: format.icon || 'billboard',
    description: format.shortDescription || '',
    longDescription: format.longDescription || '',
    specs: format.specs || [],
    benefits: format.benefits || [],
    image: getSanityImageUrl(format.image, { width: 800 }) || format.imageUrl || '',
    video: format.videoUrl || '',
    averageCpm: format.averageCpm || '',
    typicalReach: format.typicalReach || '',
    bestFor: format.bestFor || [],
    isFeatured: format.isFeatured || false,
  }
}

// Analytics Configuration Interface
export interface AnalyticsConfig {
  googleAnalytics?: {
    enabled: boolean
    measurementId?: string
  }
  googleTagManager?: {
    enabled: boolean
    containerId?: string
  }
  metaPixel?: {
    enabled: boolean
    pixelId?: string
  }
  linkedinInsight?: {
    enabled: boolean
    partnerId?: string
  }
  twitterPixel?: {
    enabled: boolean
    pixelId?: string
  }
  tiktokPixel?: {
    enabled: boolean
    pixelId?: string
  }
}

// Fetch Analytics Configuration
export async function getAnalyticsConfig(): Promise<AnalyticsConfig | null> {
  try {
    const query = `
      *[_type == "analyticsConfig"][0] {
        googleAnalytics,
        googleTagManager,
        metaPixel,
        linkedinInsight,
        twitterPixel,
        tiktokPixel
      }
    `
    return await client.fetch(query)
  } catch (error) {
    console.error('Failed to fetch analytics config:', error)
    return null
  }
}

// Page SEO Interface
export interface PageSeoConfig {
  pageId: string
  pageName?: string
  seo?: SanitySEO
}

// Fetch SEO configuration for a specific page
export async function getPageSeo(pageId: string): Promise<PageSeoConfig | null> {
  try {
    const query = `
      *[_type == "pageSeo" && pageId == $pageId][0] {
        pageId,
        pageName,
        seo {
          metaTitle,
          metaDescription,
          ogImage,
          keywords,
          enableKeywords,
          noIndex
        }
      }
    `
    return await client.fetch(query, { pageId })
  } catch (error) {
    console.error('Failed to fetch page SEO:', error)
    return null
  }
}

// ============================================
// ENHANCED PRODUCT PAGE TYPES AND QUERIES
// ============================================

export interface SanityProductPainPoint {
  _key?: string
  icon?: string
  title: string
  description: string
  beforeState?: string
  afterState?: string
}

export interface SanityProductHowItWorksStep {
  _key?: string
  stepNumber?: number
  title: string
  description: string
  icon?: string
  image?: any
}

export interface SanityProductExternalResource {
  _key?: string
  title: string
  description?: string
  url: string
  type?: 'documentation' | 'api' | 'guide' | 'video' | 'other'
}

export interface SanityEnhancedProduct extends SanityProduct {
  // Hero Section
  heroBadge?: string
  heroTitle?: string
  heroSubtitle?: string
  heroGradient?: string
  heroVideo?: string
  secondaryCta?: {
    text: string
    link?: string
    isVideo?: boolean
  }
  heroStats?: Array<{ _key?: string; value: string; label: string }>
  
  // Pain Points Section
  painPointsTitle?: string
  painPointsSubtitle?: string
  painPoints?: SanityProductPainPoint[]
  
  // Features Section (enhanced)
  featuresTitle?: string
  featuresSubtitle?: string
  featuresLayout?: '2-col' | '3-col' | 'alternating'
  
  // How It Works Section
  howItWorksTitle?: string
  howItWorksSubtitle?: string
  howItWorksSteps?: SanityProductHowItWorksStep[]
  
  // Integrations Section (enhanced)
  integrationsTitle?: string
  integrationsSubtitle?: string
  
  // Testimonials Section (enhanced)
  testimonialsTitle?: string
  
  // Resources Section
  resourcesTitle?: string
  relatedCaseStudies?: SanityCaseStudy[]
  relatedBlogPosts?: SanityBlogPost[]
  relatedWhitepapers?: SanityWhitepaper[]
  externalResources?: SanityProductExternalResource[]
  
  // Final CTA
  finalCtaTitle?: string
  finalCtaSubtitle?: string
  
  // SEO
  seo?: SanitySEO
}

export async function getEnhancedProductBySlug(slug: string): Promise<SanityEnhancedProduct | null> {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      tagline,
      description,
      icon,
      heroImage,
      category,
      
      // Hero Section
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroGradient,
      heroVideo,
      secondaryCta,
      heroStats,
      
      // Pain Points Section
      painPointsTitle,
      painPointsSubtitle,
      painPoints[] {
        _key,
        icon,
        title,
        description,
        beforeState,
        afterState
      },
      
      // Features Section
      featuresTitle,
      featuresSubtitle,
      featuresLayout,
      features[] {
        _key,
        icon,
        title,
        description,
        metric
      },
      
      // How It Works Section
      howItWorksTitle,
      howItWorksSubtitle,
      howItWorksSteps[] {
        _key,
        stepNumber,
        title,
        description,
        icon,
        image
      },
      
      // Integrations Section
      integrationsTitle,
      integrationsSubtitle,
      integrations[] {
        _key,
        name,
        logo,
        category
      },
      
      // Testimonials Section
      testimonialsTitle,
      testimonials[] {
        _key,
        quote,
        author,
        role,
        company,
        avatar,
        metric
      },
      
      // Resources Section
      resourcesTitle,
      "relatedCaseStudies": relatedCaseStudies[]->{
        _id,
        title,
        slug,
        client,
        featuredImage,
        excerpt
      },
      "relatedBlogPosts": relatedBlogPosts[]->{
        _id,
        title,
        slug,
        featuredImage,
        excerpt,
        publishedAt
      },
      "relatedWhitepapers": relatedWhitepapers[]->{
        _id,
        title,
        slug,
        image,
        description
      },
      externalResources[] {
        _key,
        title,
        description,
        url,
        type
      },
      
      // Final CTA
      finalCtaTitle,
      finalCtaSubtitle,
      
      // Basic fields
      benefits,
      stats,
      useCases,
      ctaText,
      ctaLink,
      demoVideo,
      order,
      isActive,
      
      // SEO
      seo {
        metaTitle,
        metaDescription,
        ogImage,
        keywords,
        enableKeywords,
        noIndex
      }
    }
  `
  return client.fetch(query, { slug })
}

// Transform enhanced product for use with section components
export function transformEnhancedProduct(product: SanityEnhancedProduct) {
  return {
    // Basic Info
    name: product.name || '',
    slug: product.slug?.current || '',
    tagline: product.tagline || '',
    description: product.description || '',
    icon: product.icon || '',
    category: product.category || '',
    
    // Hero Section
    hero: {
      badge: product.heroBadge || '',
      title: product.heroTitle || product.name || '',
      subtitle: product.heroSubtitle || '',
      description: product.tagline || product.description || '',
      gradient: product.heroGradient || 'blue-indigo',
      heroImage: getSanityImageUrl(product.heroImage, { width: 1200 }) || '',
      heroVideo: product.heroVideo || product.demoVideo || '',
      ctaText: product.ctaText || 'Get Started',
      ctaLink: product.ctaLink || '/contact',
      secondaryCta: product.secondaryCta || undefined,
      stats: product.heroStats || product.stats?.map(s => ({ value: s.value, label: s.label })) || [],
    },
    
    // Pain Points Section
    painPoints: {
      title: product.painPointsTitle || 'Common Challenges',
      subtitle: product.painPointsSubtitle || '',
      items: product.painPoints || [],
    },
    
    // Features Section
    features: {
      title: product.featuresTitle || 'Features',
      subtitle: product.featuresSubtitle || '',
      layout: product.featuresLayout || '3-col',
      items: product.features || [],
    },
    
    // How It Works Section
    howItWorks: {
      title: product.howItWorksTitle || 'How It Works',
      subtitle: product.howItWorksSubtitle || '',
      steps: (product.howItWorksSteps || []).map((step, index) => ({
        stepNumber: step.stepNumber || index + 1,
        title: step.title,
        description: step.description,
        icon: step.icon || '',
        image: getSanityImageUrl(step.image, { width: 600 }) || '',
      })),
    },
    
    // Integrations Section
    integrations: {
      title: product.integrationsTitle || 'Seamless Integrations',
      subtitle: product.integrationsSubtitle || '',
      items: (product.integrations || []).map(i => ({
        name: i.name,
        logo: getSanityImageUrl(i.logo, { width: 200 }) || '',
        category: i.category || '',
      })),
    },
    
    // Testimonials Section
    testimonials: {
      title: product.testimonialsTitle || 'What Our Customers Say',
      items: (product.testimonials || []).map(t => ({
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
        avatar: getSanityImageUrl(t.avatar, { width: 100 }) || '',
        metric: t.metric || '',
      })),
    },
    
    // Resources Section
    resources: {
      title: product.resourcesTitle || 'Resources',
      caseStudies: (product.relatedCaseStudies || []).map(cs => ({
        _id: cs._id,
        title: cs.title,
        slug: cs.slug,
        client: cs.client,
        heroImage: getSanityImageUrl(cs.featuredImage, { width: 600 }) || '',
        excerpt: cs.excerpt || '',
      })),
      blogPosts: (product.relatedBlogPosts || []).map(bp => ({
        _id: bp._id,
        title: bp.title,
        slug: bp.slug,
        featuredImage: getSanityImageUrl(bp.featuredImage, { width: 600 }) || '',
        excerpt: bp.excerpt || '',
        publishedAt: bp.publishedAt,
      })),
      whitepapers: (product.relatedWhitepapers || []).map(wp => ({
        _id: wp._id,
        title: wp.title,
        slug: wp.slug,
        coverImage: getSanityImageUrl(wp.image, { width: 400 }) || '',
        description: wp.description || '',
      })),
      externalResources: product.externalResources || [],
    },
    
    // Final CTA
    finalCta: {
      title: product.finalCtaTitle || 'Ready to Get Started?',
      subtitle: product.finalCtaSubtitle || `Transform your advertising with ${product.name}.`,
      ctaText: product.ctaText || 'Schedule a Demo',
      ctaLink: product.ctaLink || '/contact',
    },
    
    // Legacy fields for backwards compatibility
    benefits: product.benefits || [],
    useCases: product.useCases || [],
    demoVideo: product.demoVideo || '',
    
    // SEO
    seo: product.seo || {},
  }
}

// ── Zoho Form Queries ──────────────────────────────────────

const zohoFormProjection = `{
  _id,
  name,
  formUrl,
  formType,
  renderMode,
  "displayMode": embedSettings.displayMode,
  "height": embedSettings.height,
  "width": embedSettings.width,
  isActive,
  assignedPages,
  zohoFormPermalink,
  zohoFormLinkName,
  zohoPortalName,
  fields[] {
    label,
    zohoFieldName,
    fieldType,
    placeholder,
    required,
    halfWidth,
    options,
    defaultValue,
    validationPattern,
    validationMessage
  },
  submitButtonText,
  successMessage,
  successRedirectUrl
}`

function transformZohoForm(form: any): ZohoFormData | undefined {
  if (!form || form.isActive === false) return undefined
  return {
    _id: form._id,
    name: form.name,
    formUrl: form.formUrl,
    formType: form.formType,
    renderMode: form.renderMode || 'iframe',
    displayMode: form.displayMode || 'iframe',
    height: form.height || 600,
    width: form.width || '100%',
    isActive: form.isActive,
    assignedPages: form.assignedPages || [],
    zohoFormPermalink: form.zohoFormPermalink,
    zohoFormLinkName: form.zohoFormLinkName,
    zohoPortalName: form.zohoPortalName,
    fields: form.fields || [],
    submitButtonText: form.submitButtonText || 'Submit',
    successMessage: form.successMessage || 'Thank you! Your submission has been received.',
    successRedirectUrl: form.successRedirectUrl,
  }
}

export async function getZohoFormById(formId: string): Promise<ZohoFormData | undefined> {
  try {
    const query = `*[_type == "zohoForm" && _id == $formId][0] ${zohoFormProjection}`
    const form = await client.fetch(query, { formId })
    return transformZohoForm(form)
  } catch (error) {
    console.error('Error fetching Zoho form by ID:', error)
    return undefined
  }
}

export async function getZohoFormsByType(formType: string): Promise<ZohoFormData[]> {
  try {
    const query = `*[_type == "zohoForm" && formType == $formType && isActive != false] ${zohoFormProjection}`
    const forms = await client.fetch(query, { formType })
    return (forms || []).map(transformZohoForm).filter(Boolean) as ZohoFormData[]
  } catch (error) {
    console.error('Error fetching Zoho forms by type:', error)
    return []
  }
}

export async function getAllActiveZohoForms(): Promise<ZohoFormData[]> {
  try {
    const query = `*[_type == "zohoForm" && isActive != false] | order(name asc) ${zohoFormProjection}`
    const forms = await client.fetch(query)
    return (forms || []).map(transformZohoForm).filter(Boolean) as ZohoFormData[]
  } catch (error) {
    console.error('Error fetching all Zoho forms:', error)
    return []
  }
}

export async function getZohoFormsForPage(pagePath: string): Promise<ZohoFormData[]> {
  try {
    const query = `*[_type == "zohoForm" && isActive != false && $pagePath in assignedPages] | order(name asc) ${zohoFormProjection}`
    const forms = await client.fetch(query, { pagePath })
    return (forms || []).map(transformZohoForm).filter(Boolean) as ZohoFormData[]
  } catch (error) {
    console.error('Error fetching Zoho forms for page:', error)
    return []
  }
}

// URL Redirects
export interface RedirectRule {
  source: string
  destination: string
  permanent: boolean
}

export async function getRedirects(): Promise<RedirectRule[]> {
  try {
    const query = `*[_type == "redirectSettings" && _id == "redirectSettings"][0]{
      "redirects": redirects[isActive == true]{
        source,
        destination,
        permanent
      }
    }`
    const result = await client.fetch(query)
    return result?.redirects || []
  } catch (error) {
    console.error('Error fetching redirects:', error)
    return []
  }
}

// Careers Page Content
export interface CareersPageStat {
  number: string
  label: string
}

export interface CareersPageBenefit {
  title: string
  description: string
  iconName: string
}

export interface CareersPageDepartment {
  name: string
  departmentKey: string
  color: string
  roleCount: number
}

export interface CareersPageContent {
  heroBadge: string
  heroTitle: string
  heroTitleHighlight: string
  heroDescription: string
  heroCtaText: string
  stats: CareersPageStat[]
  benefitsTitle: string
  benefitsDescription: string
  benefits: CareersPageBenefit[]
  departmentsTitle: string
  departmentsDescription: string
  departments: CareersPageDepartment[]
  openPositionsTitle: string
  openPositionsDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaPrimaryButtonText: string
  ctaPrimaryButtonLink: string
  ctaSecondaryButtonText: string
  ctaSecondaryButtonLink: string
}

export async function getCareersPageContent(): Promise<CareersPageContent | null> {
  try {
    const query = `
      *[_type == "careersPage" && _id == "careersPage"][0] {
        heroBadge,
        heroTitle,
        heroTitleHighlight,
        heroDescription,
        heroCtaText,
        stats[] { number, label },
        benefitsTitle,
        benefitsDescription,
        benefits[] { title, description, iconName },
        departmentsTitle,
        departmentsDescription,
        departments[] {
          name,
          departmentKey,
          color,
          "roleCount": count(*[_type == "jobPosition" && isActive == true && department == ^.departmentKey])
        },
        openPositionsTitle,
        openPositionsDescription,
        ctaTitle,
        ctaDescription,
        ctaPrimaryButtonText,
        ctaPrimaryButtonLink,
        ctaSecondaryButtonText,
        ctaSecondaryButtonLink
      }
    `
    return client.fetch(query)
  } catch (error) {
    console.error('Error fetching careers page content:', error)
    return null
  }
}

// Footer Configuration
export interface FooterNavLink {
  name: string
  href: string
}

export interface FooterNavCategory {
  title: string
  showLocationIcon: boolean
  links: FooterNavLink[]
}

export interface FooterSocialLink {
  platform: string
  url: string
}

export interface FooterLegalLink {
  label: string
  href: string
}

export interface FooterContent {
  companyDescription: string
  navCategories: FooterNavCategory[]
  socialLinks: FooterSocialLink[]
  movingHeartsTitle: string
  movingHeartsStatsValue: string
  movingHeartsStatsLabel: string
  movingHeartsTagline: string
  movingHeartsUrl: string
  movingHeartsCtaText: string
  legalLinks: FooterLegalLink[]
  copyrightText: string
}

export async function getFooterContent(): Promise<FooterContent | null> {
  try {
    const query = `
      *[_type == "footerConfig" && _id == "footerConfig"][0] {
        companyDescription,
        navCategories[] {
          title,
          showLocationIcon,
          links[] { name, href }
        },
        socialLinks[] { platform, url },
        movingHeartsTitle,
        movingHeartsStatsValue,
        movingHeartsStatsLabel,
        movingHeartsTagline,
        movingHeartsUrl,
        movingHeartsCtaText,
        legalLinks[] { label, href },
        copyrightText
      }
    `
    return client.fetch(query)
  } catch (error) {
    console.error('Error fetching footer content:', error)
    return null
  }
}

// Contact Page Configuration
export interface ContactMethod {
  iconType: 'phone' | 'email' | 'location' | 'demo'
  title: string
  details: string
  description: string
}

export interface ContactDepartment {
  title: string
  email: string
  description: string
  iconType: 'growth' | 'settings' | 'enterprise' | 'partnerships' | 'press' | 'careers'
  responseTime: string
}

export interface ContactPageContent {
  heroTitle: string
  heroTitleHighlight: string
  heroDescription: string
  heroCtaText: string
  heroCtaLink: string
  officesSectionTitle: string
  officesSectionDescription: string
  contactMethods: ContactMethod[]
  departments: ContactDepartment[]
  formSectionTitle: string
  formSectionDescription: string
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  zohoFormUrl: string
  zohoFormHeight: number
}

export async function getContactPageContent(): Promise<ContactPageContent | null> {
  try {
    const query = `
      *[_type == "contactPage" && _id == "contactPage"][0] {
        heroTitle,
        heroTitleHighlight,
        heroDescription,
        heroCtaText,
        heroCtaLink,
        officesSectionTitle,
        officesSectionDescription,
        contactMethods[] { iconType, title, details, description },
        departments[] { title, email, description, iconType, responseTime },
        formSectionTitle,
        formSectionDescription,
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        zohoFormUrl,
        zohoFormHeight
      }
    `
    return client.fetch(query)
  } catch (error) {
    console.error('Error fetching contact page content:', error)
    return null
  }
}
