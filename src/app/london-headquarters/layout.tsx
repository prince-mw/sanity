import { Metadata } from 'next'
import { getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'London Headquarters - Moving Walls UK Office',
  description: 'Visit Moving Walls London headquarters. Our UK office serves as the hub for European operations in programmatic out-of-home advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('london-headquarters');
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
      canonical: "https://www.movingwalls.com/london-headquarters",
    },
    // Temporarily hidden — page itself calls notFound(); force noindex here too since this layout still wraps the 404 boundary.
    robots: { index: false, follow: false },
  };
}

export default function LondonHeadquartersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
