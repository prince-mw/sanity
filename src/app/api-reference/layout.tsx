import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'API Reference - Developer Documentation | Moving Walls',
  description: 'Comprehensive API reference for Moving Walls platform. Integrate programmatic OOH capabilities into your applications.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('api-reference');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || defaultMeta.description,
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/api-reference",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function ApiReferenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
