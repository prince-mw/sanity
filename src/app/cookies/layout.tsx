import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Cookie Policy | Moving Walls',
  description: 'MovingWalls Cookie Policy. Understand how we use cookies and similar technologies to enhance your browsing experience.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('cookies');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'Cookie Policy | MovingWalls',
      description: seo?.metaDescription || 'Understand how MovingWalls uses cookies and similar technologies.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
