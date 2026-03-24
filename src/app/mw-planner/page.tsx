import { Metadata } from 'next'
import MWPlannerPageClient from '@/components/MWPlannerPageClient'
import { getPageSeo, getSanityImageUrl, getAllBlogPosts, transformBlogPost, getProductBySlug } from '@/sanity/lib/fetch'

const defaultMeta = {
  title: 'MW Planner | Moving Walls',
  description: 'Plan smarter OOH campaigns with MW Planner - AI-powered audience targeting, location planning, and budget optimization for outdoor advertising.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('mw-planner');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'AI-powered planning tool for out-of-home advertising campaigns.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/mw-planner",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 3600

export default async function MWPlannerPage() {
  const [blogPosts, product] = await Promise.all([
    getAllBlogPosts(),
    getProductBySlug('mw-planner'),
  ]);

  // Transform latest 3 blog posts for the resources section
  const latestBlogPosts = blogPosts.slice(0, 3).map(post => {
    const transformed = transformBlogPost(post);
    return {
      title: transformed.title,
      description: transformed.excerpt,
      category: transformed.category,
      readTime: transformed.readTime,
      image: transformed.featuredImage,
      slug: transformed.slug,
    };
  });

  return <MWPlannerPageClient latestBlogPosts={latestBlogPosts.length ? latestBlogPosts : undefined} product={product} />
}
