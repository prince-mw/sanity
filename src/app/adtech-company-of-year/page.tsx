import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";


const ARTICLE_SLUG = "adtech-company-of-year";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo("adtech-company-of-year")
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "Moving Walls Named AdTech Company of the Year";
  const description = seo?.seo?.metaDescription || article?.excerpt || "Industry recognition for innovation in programmatic out-of-home advertising technology.";

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
    alternates: {
      canonical: "https://www.movingwalls.com/adtech-company-of-year",
    },
  };
}

export default async function AdtechCompanyOfYearPage() {
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
    category: article.category || "award",
    readTime: article.readTime || "4 min read",
    content: article.content || [],
    featuredImage: article.featuredImage,
  };

  return <PressArticleClient article={transformedArticle} />;
}

function FallbackContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-[#00E67E]">Award</span>
              <span>•</span>
              <time dateTime="2023-11-10">November 10, 2023</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Moving Walls Named AdTech Company of the Year
            </h1>
            <p className="text-xl text-gray-300">
              Industry recognition for innovation in programmatic out-of-home advertising technology.
            </p>
          </header>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Moving Walls has been honored with the prestigious &quot;AdTech Company of the Year&quot; award at the 
              Global Advertising Technology Awards. The recognition highlights the company&apos;s pioneering work in 
              bringing programmatic capabilities to the out-of-home advertising industry.
            </p>
            <h2>Innovation in OOH</h2>
            <p>
              The award jury cited Moving Walls&apos; innovative approach to solving long-standing challenges in OOH 
              advertising, including automated buying, real-time measurement, and dynamic creative optimization. The 
              platform has transformed how brands plan, execute, and measure outdoor campaigns.
            </p>
            <h2>Industry Impact</h2>
            <p>
              Since its founding, Moving Walls has facilitated billions of dollars in OOH advertising transactions, 
              connecting thousands of advertisers with premium inventory across multiple continents. The platform&apos;s 
              technology has become an industry standard for programmatic OOH.
            </p>
            <h2>Looking Forward</h2>
            <p>
              This recognition reinforces Moving Walls&apos; commitment to continued innovation in advertising technology. 
              The company plans to leverage this momentum to expand its capabilities and deliver even more value to 
              advertisers and media owners worldwide.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
