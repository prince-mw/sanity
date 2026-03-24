import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Activate - Programmatic OOH Campaign Activation | Moving Walls',
  description: 'Execute programmatic OOH campaigns with MW Activate. Real-time bidding, automated buying, and seamless campaign activation across premium screens.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-activate');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Execute programmatic OOH campaigns with MW Activate.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/mw-activate",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MWActivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
