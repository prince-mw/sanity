import { getAllPressReleases, getSanityImageUrl } from "@/sanity/lib/fetch";
import { normalizeSiteUrl, buildRssFeed, RssFeedItem } from "@/lib/rss";

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.movingwalls.com");
const PRESS_NEWS_URL = `${SITE_URL}/press-news`;

export async function GET() {
  let pressReleases: RssFeedItem[] = [];

  try {
    const sanityPressReleases = await getAllPressReleases();
    if (sanityPressReleases && sanityPressReleases.length > 0) {
      pressReleases = sanityPressReleases
        .filter((pr) => pr.slug?.current)
        .map((pr) => ({
          title: pr.title,
          slug: pr.slug.current,
          excerpt: pr.metaDescription || "",
          date: pr.publishedAt,
          featuredImage: getSanityImageUrl(pr.featuredImage, { width: 1200 }) || "",
        }));
    }
  } catch (error) {
    console.error("Failed to fetch press releases for RSS feed:", error);
  }

  const xml = buildRssFeed({
    channelTitle: "Moving Walls Press & News",
    channelUrl: PRESS_NEWS_URL,
    channelDescription: "Latest announcements, product launches, partnerships and industry recognition from Moving Walls.",
    itemBaseUrl: PRESS_NEWS_URL,
    items: pressReleases.slice(0, 20),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
