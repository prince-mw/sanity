import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPostBySlug, getRelatedBlogPosts, transformBlogPost, getAllBlogPosts, getSanityImageUrl } from "@/sanity/lib/fetch";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import BlogDetailClient from "@/components/BlogDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
      slug: post.slug?.current || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    
    if (post) {
      const seo = post.seo;
      const title = seo?.metaTitle || post.title;
      const description = seo?.metaDescription || post.excerpt;
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : getSanityImageUrl(post.featuredImage, { width: 1200 });
      
      return {
        title,
        description,
        keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
        openGraph: {
          title,
          description,
          type: 'article',
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: ogImage ? [ogImage] : [],
        },
        robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Blog',
    description: 'Latest insights and news from Moving Walls.',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post;
  let relatedPosts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    featuredImage: string;
  }> = [];

  try {
    // Try to fetch from Sanity
    const sanityPost = await getBlogPostBySlug(slug);
    
    if (sanityPost) {
      post = transformBlogPost(sanityPost);
      
      // Get related posts with improved algorithm
      const categoryTitles = sanityPost.categories?.map(c => c.title) || [];
      const authorId = (sanityPost.author as any)?._id;
      const sanityRelated = await getRelatedBlogPosts(slug, categoryTitles, authorId, 3);
      relatedPosts = sanityRelated.map(transformBlogPost);
    } else {
      // Fallback to static data
      const staticPost = getPostBySlug(slug);
      if (staticPost) {
        post = staticPost;
        relatedPosts = getRelatedPosts(slug, 3);
      }
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    // Fallback to static data
    const staticPost = getPostBySlug(slug);
    if (staticPost) {
      post = staticPost;
      relatedPosts = getRelatedPosts(slug, 3);
    }
  }

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
