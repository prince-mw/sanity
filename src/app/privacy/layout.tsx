import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Privacy Policy | Moving Walls',
  description: 'Moving Walls Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and CCPA.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('privacy');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'Privacy Policy | MovingWalls',
      description: seo?.metaDescription || 'Learn how MovingWalls collects, uses, and protects your personal data.',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
