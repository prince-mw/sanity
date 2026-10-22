import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'Moving Hearts: Donated DOOH for Social Causes | Moving Walls',
  description: 'Moving Hearts connects nonprofits with media owners who donate digital out-of-home screen time to social and humanitarian causes. Get started today.',
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
    alternates: {
      canonical: "https://www.movingwalls.com/moving-hearts",
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
