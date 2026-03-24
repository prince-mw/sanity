import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Studio - Creative OOH Design & Production | Moving Walls',
  description: 'Create stunning OOH creatives with MW Studio. Design tools, templates, and production services for impactful outdoor advertising campaigns.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-studio');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Create stunning OOH creatives with MW Studio.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/mw-studio",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MWStudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
