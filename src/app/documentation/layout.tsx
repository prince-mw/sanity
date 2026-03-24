import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Documentation - Moving Walls Platform Guide',
  description: 'Complete documentation for Moving Walls platform. Learn how to plan, activate, and measure your OOH advertising campaigns.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('documentation');
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
      canonical: "https://www.movingwalls.com/documentation",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
