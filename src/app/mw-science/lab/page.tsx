import { Metadata } from 'next'
import MWScienceLabClient from '@/components/MWScienceLabClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

// MW Science Lab: child page of MW Science (Nov 2026 redesign). SEO can be overridden
// from a Sanity pageSeo document with pageId "mw-science-lab".
const defaultMeta = {
  title: 'MW Science Lab: Independent Consumer Research & Panels',
  description: 'MW Science Lab is the research arm of MW Science: a consumer panel in 40+ countries for audience research, brand lift and media studies.',
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = (await getPageSeo('mw-science-lab'))?.seo
  const title = seo?.metaTitle || defaultMeta.title
  const description = seo?.metaDescription || defaultMeta.description
  return {
    title,
    description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: { canonical: 'https://www.movingwalls.com/mw-science/lab' },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 3600

export default function MWScienceLabPage() {
  return <MWScienceLabClient />
}
