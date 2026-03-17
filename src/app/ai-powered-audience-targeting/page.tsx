import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";

const ARTICLE_SLUG = "ai-powered-audience-targeting";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo(ARTICLE_SLUG),
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "AI-Powered Audience Targeting Platform | MovingWalls";
  const description = seo?.seo?.metaDescription || article?.excerpt || 
    "Revolutionary machine learning algorithms improve campaign performance by 40%.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function AIPoweredAudienceTargetingPage() {
  const article = await getPressArticleBySlug(ARTICLE_SLUG);

  if (!article) {
    return <FallbackContent />;
  }

  // Transform to match PressArticle interface
  const transformedArticle = {
    _id: article._id,
    title: article.title,
    excerpt: article.excerpt || "",
    publishedAt: article.publishedAt,
    category: article.category || "product-launch",
    readTime: article.readTime || "3 min read",
    content: article.content || [],
    featuredImage: article.featuredImage,
  };

  return <PressArticleClient article={transformedArticle} />;
}

function FallbackContent() {
  return (
    <PressArticleClient
      article={{
        _id: "fallback",
        title: "MovingWalls Launches AI-Powered Audience Targeting Platform",
        excerpt: "Revolutionary machine learning algorithms improve campaign performance by 40% while reducing cost per acquisition across all advertising channels.",
        publishedAt: "2024-11-15T09:00:00Z",
        category: "product-launch",
        readTime: "3 min read",
        content: [],
      }}
    />
  );
}
