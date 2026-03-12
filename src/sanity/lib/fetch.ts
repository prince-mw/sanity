import { client, urlFor } from './client'

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
  challenge?: any[]
  solution?: any[]
  results?: any[]
  metrics?: any[]
  testimonial?: any
  gallery?: any[]
  publishedAt: string
}

// Blog Post Queries
export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
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
      "author": author->{name, image, role, bio, linkedin},
      "categories": categories[]->{title, slug, color}
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
    *[_type == "blogPost"] | order(publishedAt desc)[0] {
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

export async function getRelatedBlogPosts(
  currentSlug: string,
  categoryTitle: string,
  limit: number = 3
): Promise<SanityBlogPost[]> {
  const query = `
    *[_type == "blogPost" && slug.current != $currentSlug && $category in categories[]->title] | order(publishedAt desc)[0...$limit] {
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
  return client.fetch(query, { currentSlug, category: categoryTitle, limit: limit - 1 })
}

// Case Study Queries
export async function getAllCaseStudies(): Promise<SanityCaseStudy[]> {
  const query = `
    *[_type == "caseStudy"] | order(publishedAt desc) {
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
      challenge,
      solution,
      results,
      metrics,
      testimonial,
      gallery,
      publishedAt
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
    date: post.publishedAt ? formatDate(post.publishedAt) : '',
    readTime: post.readTime || '5 min read',
    featuredImage: getSanityImageUrl(post.featuredImage, { width: 1200 }) || '/assets/images/blog-placeholder.svg',
    tags: post.categories?.map(c => c.title) || [],
    featured: false,
  }
}

// Helper to convert Sanity case study to format compatible with existing UI
export function transformCaseStudy(study: SanityCaseStudy) {
  return {
    slug: study.slug?.current || '',
    title: study.title || '',
    brand: study.client || '',
    country: study.location || '',
    industry: study.industry || 'Other',
    excerpt: study.excerpt || '',
    content: portableTextToHtml(study.challenge) || '',
    challenge: portableTextToHtml(study.challenge) || '',
    solution: portableTextToHtml(study.solution) || '',
    results: portableTextToHtml(study.results) || '',
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
}

export async function getAllEvents(): Promise<SanityEvent[]> {
  const query = `
    *[_type == "event"] | order(startDate asc) {
      _id,
      title,
      slug,
      featuredImage,
      eventType,
      startDate,
      endDate,
      location,
      excerpt,
      registrationLink,
      price,
      capacity,
      category,
      featured,
      speakers
    }
  `
  return client.fetch(query)
}

export async function getUpcomingEvents(limit: number = 10): Promise<SanityEvent[]> {
  const now = new Date().toISOString()
  const query = `
    *[_type == "event" && startDate >= $now] | order(startDate asc)[0...$limit] {
      _id,
      title,
      slug,
      featuredImage,
      eventType,
      startDate,
      endDate,
      location,
      excerpt,
      registrationLink,
      price,
      capacity,
      category,
      featured,
      speakers
    }
  `
  return client.fetch(query, { now, limit: limit - 1 })
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  const query = `
    *[_type == "event" && slug.current == $slug][0] {
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
      speakers
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
    speakers: event.speakers?.map(s => `${s.name}${s.role ? ', ' + s.role : ''}`) || [],
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
      articleSlug
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
  return {
    date: pr.publishedAt ? formatDate(pr.publishedAt) : '',
    category: formatPressCategory(pr.category),
    title: pr.title || '',
    excerpt: pr.excerpt || '',
    readTime: pr.readTime || '3 min read',
    slug: pr.slug?.current || '',
    externalLink: pr.externalLink,
    thumbnail: getSanityImageUrl(pr.featuredImage, { width: 800 }) || '/assets/images/press-placeholder.svg',
  }
}

export function transformMediaFeature(pr: SanityPressRelease) {
  return {
    outlet: pr.source || '',
    title: pr.title || '',
    date: pr.publishedAt ? formatDate(pr.publishedAt) : '',
    type: formatPressCategory(pr.category),
    slug: pr.slug?.current || '',
    externalLink: pr.externalLink,
    thumbnail: getSanityImageUrl(pr.featuredImage, { width: 800 }) || '/assets/images/press-placeholder.svg',
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
      linkedin,
      twitter,
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
      linkedin,
      twitter,
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
      order
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
    linkedin: member.linkedin,
    twitter: member.twitter,
  }
}

// Webinar Types and Queries
export interface SanityWebinar {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  featuredImage?: any
  webinarType: 'upcoming' | 'on-demand'
  date?: string
  time?: string
  duration?: string
  speaker?: string
  speakerRole?: string
  attendees?: number
  views?: number
  rating?: number
  level?: string
  registrationLink?: string
  watchLink?: string
}

export async function getAllWebinars(): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      featuredImage,
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      attendees,
      views,
      rating,
      level,
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
      webinarType,
      date,
      time,
      duration,
      speaker,
      speakerRole,
      attendees,
      level,
      registrationLink
    }
  `
  return client.fetch(query)
}

export async function getOnDemandWebinars(): Promise<SanityWebinar[]> {
  const query = `
    *[_type == "webinar" && webinarType == "on-demand"] | order(views desc) {
      _id,
      title,
      slug,
      description,
      featuredImage,
      webinarType,
      duration,
      speaker,
      speakerRole,
      views,
      rating,
      level,
      watchLink
    }
  `
  return client.fetch(query)
}

export function transformWebinar(webinar: SanityWebinar) {
  return {
    id: webinar._id,
    title: webinar.title || '',
    description: webinar.description || '',
    date: webinar.date || '',
    time: webinar.time || '',
    duration: webinar.duration || '',
    speaker: webinar.speaker || '',
    speakerRole: webinar.speakerRole || '',
    attendees: webinar.attendees || 0,
    views: webinar.views || 0,
    rating: webinar.rating || 0,
    level: webinar.level || 'all-levels',
    webinarType: webinar.webinarType,
    registrationLink: webinar.registrationLink,
    watchLink: webinar.watchLink,
  }
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
      requirements
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
  pdfFile?: any
  pages?: number
  downloads?: string
  topics?: string[]
  order?: number
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
      pages,
      downloads,
      topics,
      order
    }
  `
  return client.fetch(query)
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
      pages,
      downloads,
      topics,
      order
    }
  `
  return client.fetch(query, { category })
}

export function transformEbook(ebook: SanityEbook) {
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
    viewUrl: ebook.viewUrl,
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
      highVisibilityBillboards[] {
        name,
        location,
        reach,
        impressions,
        description,
        "image": image.asset->url
      },
      stats,
      majorCities,
      mediaTypes,
      keyMarkets,
      faqs,
      caseStudies,
      partners,
      order,
      isActive
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
    highVisibilityBillboards: location.highVisibilityBillboards || [],
    stats: location.stats || [],
    majorCities: location.majorCities || [],
    mediaTypes: location.mediaTypes || [],
    keyMarkets: location.keyMarkets || [],
    faqs: location.faqs || [],
    caseStudies: location.caseStudies || [],
    partners: location.partners || [],
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
  platformFeatures?: Array<{
    _key: string
    id: string
    name: string
    title: string
    description: string
    linkHref?: string
    linkText?: string
  }>
  benefits?: Array<{
    _key: string
    title: string
    description: string
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
      platformFeatures,
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
    platformFeatures: page.platformFeatures || [],
    benefits: page.benefits || [],
    stats: page.stats || [],
    services: page.services || [],
    faqs: page.faqs || [],
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
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
