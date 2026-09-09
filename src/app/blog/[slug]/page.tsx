import { notFound } from "next/navigation";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getBlogPostBySlug, getRelatedBlogPosts, transformBlogPost, getAllBlogPosts, getSanityImageUrl } from "@/sanity/lib/fetch";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import { getBlogLanguageGroups, BlogLanguageGroups } from "@/sanity/lib/queries";
import BlogDetailClient from "@/components/BlogDetailClient";

export const revalidate = 30;

// The site's UI locale codes (e.g. "zh") don't always match the hreflang codes search
// engines expect (e.g. "zh-CN") — this converts a blog post's translation URLs, keyed by
// UI locale, into the hreflang-keyed shape `alternates.languages` expects.
const UI_LOCALE_TO_HREFLANG: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
}

function toHreflangLanguages(urlsByLocale: Record<string, string> | undefined): Record<string, string> | undefined {
  if (!urlsByLocale) return undefined
  const result: Record<string, string> = {}
  for (const [locale, url] of Object.entries(urlsByLocale)) {
    const hreflang = UI_LOCALE_TO_HREFLANG[locale] ?? locale
    result[hreflang] = url
  }
  return result
}

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
  const { isEnabled: isPreview } = await draftMode();

  // Fetched independently of the post below: a failure here should only drop the
  // hreflang alternates, not the post's own title/description/OG metadata.
  const blogLanguageGroups: BlogLanguageGroups = await getBlogLanguageGroups().catch(() => ({}));

  try {
    const post = await getBlogPostBySlug(slug, isPreview);

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
        alternates: {
          canonical: `https://www.movingwalls.com/blog/${slug}`,
          languages: toHreflangLanguages(blogLanguageGroups[slug]),
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
  const { isEnabled: isPreview } = await draftMode();

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
    const sanityPost = await getBlogPostBySlug(slug, isPreview);
    
    if (sanityPost) {
      post = transformBlogPost(sanityPost);
      
      // Get related posts with improved algorithm
      const categoryTitles = sanityPost.categories?.map(c => c.title) || [];
      const authorId = (sanityPost.author as any)?._id;
      const sanityRelated = await getRelatedBlogPosts(slug, categoryTitles, authorId, 3, sanityPost.language);
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
