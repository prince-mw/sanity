import { getAllBlogPosts, getSanityImageUrl } from "@/sanity/lib/fetch";
import { blogPosts as staticBlogPosts } from "@/data/blog-posts";
import { normalizeSiteUrl, buildRssFeed, RssFeedItem } from "@/lib/rss";

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.movingwalls.com");
const BLOG_URL = `${SITE_URL}/blog`;

export async function GET() {
  let posts: RssFeedItem[] = staticBlogPosts;

  try {
    const sanityPosts = await getAllBlogPosts();
    if (sanityPosts && sanityPosts.length > 0) {
      posts = sanityPosts.map((post) => ({
        title: post.title,
        slug: post.slug?.current || "",
        excerpt: post.excerpt || "",
        date: post.publishedAt,
        featuredImage: getSanityImageUrl(post.featuredImage, { width: 1200 }) || "",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blog posts for RSS feed:", error);
  }

  const xml = buildRssFeed({
    channelTitle: "Moving Walls Blog",
    channelUrl: BLOG_URL,
    channelDescription: "Latest insights, trends and expert perspectives from Moving Walls.",
    itemBaseUrl: BLOG_URL,
    items: posts.slice(0, 20),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
