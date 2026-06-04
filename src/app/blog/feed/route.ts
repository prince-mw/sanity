import { getAllBlogPosts, getSanityImageUrl } from "@/sanity/lib/fetch";
import { blogPosts as staticBlogPosts } from "@/data/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://movingwalls.com";
const BLOG_URL = `${SITE_URL}/blog`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getImageMimeType(url: string) {
  const ext = url.split("?")[0].split('.').pop()?.toLowerCase() || '';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'webp') return 'image/webp';
  return 'image/jpeg';
}

function buildFeed(items: Array<{ title: string; slug: string; excerpt: string; date: string; author?: string; featuredImage?: string }>) {
  const itemXml = items
    .map((item) => {
      const url = `${BLOG_URL}/${item.slug}`;
      const pubDate = new Date(item.date).toUTCString();
      const imageUrl = item.featuredImage || '';
      const enclosure = imageUrl
        ? `<enclosure url="${escapeXml(imageUrl)}" length="0" type="${getImageMimeType(imageUrl)}" />`
        : '';
      const mediaContent = imageUrl
        ? `<media:content url="${escapeXml(imageUrl)}" medium="image" type="${getImageMimeType(imageUrl)}" />`
        : '';

      return `
      <item>
        <title>${escapeXml(item.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <pubDate>${escapeXml(pubDate)}</pubDate>
        <description>${escapeXml(item.excerpt || "")}</description>
        ${enclosure}
        ${mediaContent}
      </item>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Moving Walls Blog</title>
    <link>${escapeXml(BLOG_URL)}</link>
    <description>Latest insights, trends and expert perspectives from Moving Walls.</description>
    <language>en-US</language>
    ${itemXml}
  </channel>
</rss>`;
}

export async function GET() {
  let posts = staticBlogPosts;

  try {
    const sanityPosts = await getAllBlogPosts();
    if (sanityPosts && sanityPosts.length > 0) {
      posts = sanityPosts.map((post) => ({
        title: post.title,
        slug: post.slug?.current || "",
        excerpt: post.excerpt || "",
        date: post.publishedAt,
        author: post.author?.name || "",
        featuredImage: getSanityImageUrl(post.featuredImage, { width: 1200 }) || "",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blog posts for RSS feed:", error);
  }

  const xml = buildFeed(posts.slice(0, 20));
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
