import { client } from './client'

// Blog Posts Queries
export const blogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage,
    "author": author->{name, image},
    "categories": categories[]->{title, slug, color}
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featuredImage,
    seoTitle,
    seoDescription,
    "author": author->{name, image, role, bio, linkedin},
    "categories": categories[]->{title, slug, color}
  }
`

// Case Studies Queries
export const caseStudiesQuery = `
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

export const caseStudyBySlugQuery = `
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

// Press Releases Queries
export const pressReleasesQuery = `
  *[_type == "pressRelease"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    source,
    excerpt,
    externalLink
  }
`

export const pressReleaseBySlugQuery = `
  *[_type == "pressRelease" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    source,
    excerpt,
    content,
    externalLink
  }
`

// Events Queries
export const eventsQuery = `
  *[_type == "event"] | order(startDate desc) {
    _id,
    title,
    slug,
    featuredImage,
    eventType,
    startDate,
    endDate,
    location,
    excerpt,
    registrationLink
  }
`

export const upcomingEventsQuery = `
  *[_type == "event" && startDate >= now()] | order(startDate asc) {
    _id,
    title,
    slug,
    featuredImage,
    eventType,
    startDate,
    endDate,
    location,
    excerpt,
    registrationLink
  }
`

export const eventBySlugQuery = `
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
    speakers
  }
`

// Landing Pages Queries
export const landingPageBySlugQuery = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    ogImage,
    sections
  }
`

// Authors Query
export const authorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    role,
    bio
  }
`

// Categories Query
export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// Fetch functions
export async function getBlogPosts() {
  return client.fetch(blogPostsQuery)
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(blogPostBySlugQuery, { slug })
}

export async function getCaseStudies() {
  return client.fetch(caseStudiesQuery)
}

export async function getCaseStudyBySlug(slug: string) {
  return client.fetch(caseStudyBySlugQuery, { slug })
}

export async function getPressReleases() {
  return client.fetch(pressReleasesQuery)
}

export async function getPressReleaseBySlug(slug: string) {
  return client.fetch(pressReleaseBySlugQuery, { slug })
}

export async function getEvents() {
  return client.fetch(eventsQuery)
}

export async function getUpcomingEvents() {
  return client.fetch(upcomingEventsQuery)
}

export async function getEventBySlug(slug: string) {
  return client.fetch(eventBySlugQuery, { slug })
}

export async function getLandingPageBySlug(slug: string) {
  return client.fetch(landingPageBySlugQuery, { slug })
}

export async function getAuthors() {
  return client.fetch(authorsQuery)
}

export async function getCategories() {
  return client.fetch(categoriesQuery)
}
