import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Community - Moving Walls',
  description: 'Join the Moving Walls community. Connect with industry professionals, share insights, and stay updated on OOH advertising trends.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('community');
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
      canonical: "https://www.movingwalls.com/community",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
