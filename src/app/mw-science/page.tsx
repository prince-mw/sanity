import { Metadata } from 'next'
import MWScienceClient from '@/components/MWScienceClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Science | Moving Walls',
  description: 'MW Science is the intelligence layer powering the Moving Walls operating system—transforming human, spatial and behavioural signals into intelligence that helps businesses make better decisions.',
}

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-science')
  const seo = pageSeo?.seo
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: { canonical: 'https://www.movingwalls.com/mw-science' },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export const revalidate = 30

export default function MWSciencePage() {
  return <MWScienceClient />
}
