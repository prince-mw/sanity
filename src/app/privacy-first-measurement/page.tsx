import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ARTICLE_SLUG = "privacy-first-measurement";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo("privacy-first-measurement")
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "Moving Walls Launches Privacy-First Measurement Solution";
  const description = seo?.seo?.metaDescription || article?.excerpt || "New measurement capabilities deliver campaign insights while protecting consumer privacy.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PrivacyFirstMeasurementPage() {
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
    readTime: article.readTime || "5 min read",
    content: article.content || [],
    featuredImage: article.featuredImage,
  };

  return <PressArticleClient article={transformedArticle} />;
}

function FallbackContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-[#00E67E]">Product Launch</span>
              <span>•</span>
              <time dateTime="2023-06-20">June 20, 2023</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Moving Walls Launches Privacy-First Measurement Solution
            </h1>
            <p className="text-xl text-gray-300">
              New measurement capabilities deliver campaign insights while protecting consumer privacy.
            </p>
          </header>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Moving Walls introduces a groundbreaking privacy-first measurement solution that enables advertisers 
              to accurately measure OOH campaign effectiveness without compromising consumer privacy. The solution 
              leverages advanced anonymization techniques and aggregated data analysis.
            </p>
            <h2>Privacy by Design</h2>
            <p>
              Built with privacy at its core, the new measurement capabilities ensure compliance with global privacy 
              regulations including GDPR, CCPA, and emerging frameworks. The solution processes only anonymized, 
              aggregated data to protect individual identities.
            </p>
            <h2>Accurate Attribution</h2>
            <p>
              Despite the privacy-preserving approach, the solution delivers highly accurate campaign attribution 
              through innovative statistical modeling and machine learning techniques. Advertisers can confidently 
              measure campaign impact across multiple touchpoints.
            </p>
            <h2>Industry Partnership</h2>
            <p>
              The development involved collaboration with privacy advocates, industry bodies, and regulatory experts 
              to ensure the solution meets the highest standards for consumer protection while delivering actionable 
              insights for advertisers.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
