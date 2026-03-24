import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Help Center - Moving Walls Support',
  description: 'Get help with Moving Walls platform. Find answers to common questions, tutorials, and support resources for OOH advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('help-center');
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
      canonical: "https://www.movingwalls.com/help-center",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
