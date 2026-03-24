import { Metadata } from 'next'
import AboutPageClient from '@/components/AboutPageClient'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'About Us | Moving Walls',
  description: 'MovingWalls is a global connected media and programmatic out-of-home company powered by US patented measurement technology. Learn about our mission to transform outdoor advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('about');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'About Moving Walls',
      description: seo?.metaDescription || 'Transforming how brands reach real people in real places.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/about",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600 // Revalidate every hour

export default function AboutPage() {
  return <AboutPageClient />
}
