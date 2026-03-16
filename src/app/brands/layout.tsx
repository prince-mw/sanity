import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'OOH Advertising Solutions for Brands',
  description: 'Elevate your brand with MovingWalls OOH advertising solutions. Reach consumers at every stage of their journey with targeted outdoor campaigns.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('brands');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'OOH Advertising Solutions for Brands | MovingWalls',
      description: seo?.metaDescription || 'Elevate your brand with targeted outdoor advertising campaigns.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
