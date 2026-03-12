import { notFound } from "next/navigation";
import { getBlogPostBySlug, getRelatedBlogPosts, transformBlogPost, getAllBlogPosts } from "@/sanity/lib/fetch";
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
      
      // Get related posts
      const category = sanityPost.categories?.[0]?.title || 'General';
      const sanityRelated = await getRelatedBlogPosts(slug, category, 3);
      relatedPosts = sanityRelated.map(transformBlogPost);
    } else {
      // Fallback to static data
      const staticPost = getPostBySlug(slug);
      if (staticPost) {
        post = staticPost;
        relatedPosts = getRelatedPosts(slug, staticPost.category, 3);
      }
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    // Fallback to static data
    const staticPost = getPostBySlug(slug);
    if (staticPost) {
      post = staticPost;
      relatedPosts = getRelatedPosts(slug, staticPost.category, 3);
    }
  }

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
