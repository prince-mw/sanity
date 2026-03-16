import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Moving Hearts - Social Impact Initiative | Moving Walls',
  description: 'Moving Hearts initiative by Moving Walls. Using OOH advertising technology to support social causes and community impact.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('movinghearts');
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
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MovingHeartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
