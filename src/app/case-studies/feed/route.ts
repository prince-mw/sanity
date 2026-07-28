import { getAllCaseStudies, getSanityImageUrl } from "@/sanity/lib/fetch";
import { caseStudies as staticCaseStudies } from "@/data/case-studies";
import { generateExcerpt } from "@/lib/blog-utils";
import { normalizeSiteUrl, buildRssFeed, RssFeedItem } from "@/lib/rss";

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.movingwalls.com");
const CASE_STUDIES_URL = `${SITE_URL}/case-studies`;

export async function GET() {
  let caseStudies: RssFeedItem[] = staticCaseStudies.map((study) => ({
    title: study.title,
    slug: study.slug,
    excerpt: generateExcerpt(study.challenge || study.content || ""),
    date: study.date,
    featuredImage: study.featuredImage || "",
  }));

  try {
    const sanityCaseStudies = await getAllCaseStudies();
    if (sanityCaseStudies && sanityCaseStudies.length > 0) {
      caseStudies = sanityCaseStudies.map((study) => ({
        title: study.title,
        slug: study.slug?.current || "",
        excerpt: study.metaDescription || "",
        date: study.publishedAt,
        featuredImage: getSanityImageUrl(study.featuredImage, { width: 1200 }) || "",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch case studies for RSS feed:", error);
  }

  const xml = buildRssFeed({
    channelTitle: "Moving Walls Case Studies",
    channelUrl: CASE_STUDIES_URL,
    channelDescription: "Real-world success stories and results from brands using the Moving Walls platform.",
    itemBaseUrl: CASE_STUDIES_URL,
    items: caseStudies.slice(0, 20),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
