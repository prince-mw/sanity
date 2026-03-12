import { getAllBlogPosts, getBlogCategories, transformBlogPost } from "@/sanity/lib/fetch";
import { blogPosts as staticBlogPosts, blogCategories as staticCategories } from "@/data/blog-posts";
import BlogListClient from "@/components/BlogListClient";

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
      categories = staticCategories;
    }
  } catch (error) {
    // Fallback to static data on error
    console.error("Error fetching from Sanity, using static data:", error);
    posts = staticBlogPosts;
    categories = staticCategories;
  }

  return <BlogListClient posts={posts} categories={categories} />;
}
