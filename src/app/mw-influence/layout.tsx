import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Influence - Influencer & OOH Integration | Moving Walls',
  description: 'Combine influencer marketing with OOH advertising using MW Influence. Amplify your campaigns across digital and physical channels.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-influence');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Combine influencer marketing with OOH advertising.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/mw-influence",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function MWInfluenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
