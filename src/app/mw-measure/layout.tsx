import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Measure - OOH Campaign Measurement & Analytics | Moving Walls',
  description: 'Measure OOH campaign performance with MW Measure. Real-time analytics, attribution modeling, and comprehensive insights for outdoor advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-measure');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Measure OOH campaign performance with MW Measure.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/mw-measure",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MWMeasureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
