import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import MWScienceClient from '@/components/MWScienceClient'
import { getPageSeo, getSanityImageUrl, getProductBySlug, type SanityProduct } from '@/sanity/lib/fetch'
import { previewClient } from '@/sanity/lib/client'

const defaultMeta = {
  title: 'MW Science: The Intelligence Behind Connected Media',
  description: 'MW Science is the intelligence layer behind every Moving Walls product. Measure what each channel in your media mix adds, online and in real life.',
}

// The copy fields this page reads from Sanity. In preview mode (/api/preview)
// they're read from the unpublished draft, so new copy can be reviewed before
// it's published; everything else on the product document is unchanged.
const DRAFT_COPY_FIELDS = 'heroSubtitle, description, ctaText, ctaLink, finalCtaTitle, finalCtaSubtitle'

async function getDraftOverrides() {
  try {
    return await previewClient.fetch<{
      product: Partial<SanityProduct> | null
      seo: { metaTitle?: string; metaDescription?: string } | null
    }>(
      `{
        "product": *[_type == "product" && slug.current == "mw-science"][0] { ${DRAFT_COPY_FIELDS} },
        "seo": *[_type == "pageSeo" && pageId == "mw-science"][0].seo { metaTitle, metaDescription }
      }`
    )
  } catch {
    return { product: null, seo: null }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isPreview } = await draftMode()
  const [pageSeo, draft] = await Promise.all([getPageSeo('mw-science'), isPreview ? getDraftOverrides() : null])
  const seo = { ...pageSeo?.seo, ...draft?.seo }
  const title = seo.metaTitle || defaultMeta.title
  const description = seo.metaDescription || defaultMeta.description
  // Social shares drop the "| Moving Walls" suffix — the site name shows there anyway.
  const ogTitle = title.replace(/\s*\|\s*Moving Walls\s*$/, '')
  return {
    title,
    description,
    keywords: seo.enableKeywords !== false && seo.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: ogTitle,
      description,
      type: 'website',
      images: seo.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: { canonical: 'https://www.movingwalls.com/mw-science' },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 3600;

export default async function MWSciencePage() {
  const { isEnabled: isPreview } = await draftMode()
  const [product, draft] = await Promise.all([getProductBySlug('mw-science'), isPreview ? getDraftOverrides() : null])
  return <MWScienceClient product={product && draft?.product ? { ...product, ...draft.product } : product} />
}
