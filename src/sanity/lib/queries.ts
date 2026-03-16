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
const landingPagePublishedFilter = `isPublished == true && status == "published" && (scheduledPublishAt == null || scheduledPublishAt <= now())`

export const landingPagesQuery = `
  *[_type == "landingPage" && ${landingPagePublishedFilter}] | order(_createdAt desc) {
    _id,
    title,
    slug,
    isPublished,
    status,
    _createdAt,
    _updatedAt
  }
`

export const landingPageSlugsQuery = `
  *[_type == "landingPage" && ${landingPagePublishedFilter}] {
    "slug": slug.current
  }
`

export const landingPageBySlugQuery = `
  *[_type == "landingPage" && slug.current == $slug && ${landingPagePublishedFilter}][0] {
    _id,
    title,
    slug,
    isPublished,
    "seo": seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    },
    sections[] {
      _type,
      _key,
      heading,
      subheading,
      content,
      alignment,
      maxWidth,
      backgroundColor,
      // Hero specific
      "backgroundImage": backgroundImage.asset->url,
      backgroundVideo,
      overlay,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      height,
      // Two Column specific
      "image": image.asset->url,
      imagePosition,
      // Feature Grid specific
      columns,
      features[] {
        _key,
        title,
        description,
        "icon": icon.asset->url,
        link
      },
      // Stats specific
      stats[] {
        _key,
        value,
        label,
        prefix,
        suffix
      },
      // Logo Carousel specific
      logos[] {
        _key,
        name,
        "logo": logo.asset->url,
        link
      },
      grayscale,
      // Video Embed specific
      videoUrl,
      "thumbnail": thumbnail.asset->url,
      aspectRatio,
      autoplay,
      // Image Gallery specific
      images[] {
        _key,
        "image": image.asset->url,
        caption,
        alt
      },
      layout,
      // Testimonials specific
      items[] {
        _key,
        quote,
        name,
        role,
        company,
        "image": image.asset->url,
        rating
      },
      // FAQ specific
      "faqItems": items[] {
        _key,
        question,
        answer
      },
      // Pricing specific
      plans[] {
        _key,
        name,
        description,
        price,
        period,
        features,
        ctaText,
        ctaLink,
        highlighted,
        badge
      },
      // Contact Form specific
      formType,
      fields[] {
        _key,
        name,
        label,
        type,
        required,
        options
      },
      submitText,
      successMessage,
      // Spacer specific
      showDivider,
      // Custom Embed specific
      title,
      code
    }
  }
`

// Landing Page Preview Query (no publishing filter - for preview mode)
export const landingPagePreviewBySlugQuery = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    isPublished,
    status,
    "seo": seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    },
    sections[] {
      _type,
      _key,
      heading,
      subheading,
      content,
      alignment,
      maxWidth,
      backgroundColor,
      "backgroundImage": backgroundImage.asset->url,
      backgroundVideo,
      overlay,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      height,
      "image": image.asset->url,
      imagePosition,
      columns,
      features[] {
        _key,
        title,
        description,
        "icon": icon.asset->url,
        link
      },
      stats[] {
        _key,
        value,
        label,
        prefix,
        suffix
      },
      logos[] {
        _key,
        name,
        "logo": logo.asset->url,
        link
      },
      grayscale,
      videoUrl,
      "thumbnail": thumbnail.asset->url,
      aspectRatio,
      autoplay,
      images[] {
        _key,
        "image": image.asset->url,
        caption,
        alt
      },
      layout,
      items[] {
        _key,
        question,
        answer,
        quote,
        name,
        role,
        company,
        "image": image.asset->url,
        rating
      },
      plans[] {
        _key,
        name,
        description,
        price,
        period,
        features,
        ctaText,
        ctaLink,
        highlighted,
        badge
      },
      formType,
      fields[] {
        _key,
        name,
        label,
        type,
        required,
        options
      },
      submitText,
      successMessage,
      showDivider,
      title,
      code
    }
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

export async function getLandingPageBySlug(slug: string, preview: boolean = false) {
  const query = preview ? landingPagePreviewBySlugQuery : landingPageBySlugQuery
  return client.fetch(query, { slug })
}

export async function getLandingPages() {
  return client.fetch(landingPagesQuery)
}

export async function getLandingPageSlugs() {
  return client.fetch(landingPageSlugsQuery)
}

export async function getAuthors() {
  return client.fetch(authorsQuery)
}

export async function getCategories() {
  return client.fetch(categoriesQuery)
}

// Mega Menu Query
export const megaMenuQuery = `
  *[_type == "megaMenu" && _id == "megaMenu"][0] {
    _id,
    title,
    mainNavItems[] {
      _key,
      isEnabled,
      title,
      menuType,
      linkType,
      url,
      internalPage,
      openInNewTab,
      highlight,
      "icon": icon.asset->url,
      columns[] {
        _key,
        heading,
        links[] {
          _key,
          isEnabled,
          title,
          description,
          linkType,
          url,
          internalPage,
          "icon": icon.asset->url,
          openInNewTab,
          "productRef": productRef->{
            _id,
            title,
            "slug": slug.current
          },
          "caseStudyRef": caseStudyRef->{
            _id,
            title,
            "slug": slug.current
          },
          "blogPostRef": blogPostRef->{
            _id,
            title,
            "slug": slug.current
          }
        }
      },
      featuredContent {
        enabled,
        title,
        description,
        "image": image.asset->url,
        linkType,
        url,
        internalPage,
        buttonText
      },
      showFeaturedContent
    },
    ctaButton {
      enabled,
      text,
      linkType,
      url,
      internalPage,
      style
    },
    settings {
      stickyHeader,
      showSearch,
      mobileBreakpoint
    }
  }
`

export async function getMegaMenu() {
  return client.fetch(megaMenuQuery)
}

// Testimonials Filter
const testimonialPublishedFilter = `isPublished == true && status == "published"`

// Testimonials Queries
export const testimonialsQuery = `
  *[_type == "testimonial" && ${testimonialPublishedFilter}] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image,
    companyLogo,
    metric,
    industry,
    order,
    isFeatured
  }
`

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && ${testimonialPublishedFilter} && isFeatured == true] | order(order asc) {
    _id,
    quote,
    author,
    role,
    company,
    image,
    companyLogo,
    metric,
    industry,
    order
  }
`

export async function getTestimonials() {
  return client.fetch(testimonialsQuery)
}

export async function getFeaturedTestimonials() {
  return client.fetch(featuredTestimonialsQuery)
}
