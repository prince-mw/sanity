import { Metadata } from "next";
import { getAllBlogPosts, getBlogCategories, transformBlogPost, getPageSeo, getSanityImageUrl } from "@/sanity/lib/fetch";
import { blogPosts as staticBlogPosts, getAllCategories } from "@/data/blog-posts";
import BlogListClient from "@/components/BlogListClient";

const defaultMeta = {
  title: "Blog | Moving Walls",
  description: "Insights, trends, and expert perspectives on out-of-home advertising, programmatic DOOH, audience measurement, and marketing technology.",
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('blog');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || "Latest insights and trends in out-of-home advertising technology.",
      type: "website",
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts;
  let categories;

  try {
    // Try to fetch from Sanity
    const sanityPosts = await getAllBlogPosts();
    const sanityCategories = await getBlogCategories();
    
    if (sanityPosts && sanityPosts.length > 0) {
      posts = sanityPosts.map(transformBlogPost);
      categories = ["All", ...sanityCategories.map(c => c.title)];
    } else {
      // Fallback to static data if Sanity is empty
      posts = staticBlogPosts;
      categories = ["All", ...getAllCategories()];
    }
  } catch (error) {
    // Fallback to static data on error
    console.error("Error fetching from Sanity, using static data:", error);
    posts = staticBlogPosts;
    categories = ["All", ...getAllCategories()];
  }

  return <BlogListClient posts={posts} categories={categories} />;
}
