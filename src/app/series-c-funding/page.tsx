import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ARTICLE_SLUG = "series-c-funding";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo("series-c-funding")
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "Moving Walls Raises $14 Million in Series C Funding";
  const description = seo?.seo?.metaDescription || article?.excerpt || "Moving Walls secures Series C funding to accelerate global expansion and platform innovation.";

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

export default async function SeriesCFundingPage() {
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
    category: article.category || "funding",
    readTime: article.readTime || "4 min read",
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
              <span className="text-[#00E67E]">Press Release</span>
              <span>•</span>
              <time dateTime="2023-03-15">March 15, 2023</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Moving Walls Raises $14 Million in Series C Funding
            </h1>
            <p className="text-xl text-gray-300">
              Investment to accelerate global expansion and enhance AI-powered OOH advertising platform.
            </p>
          </header>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Moving Walls has successfully closed its Series C funding round, raising $14 million from leading investors. 
              This investment will fuel the company&apos;s expansion into new markets and continued development of its 
              cutting-edge programmatic out-of-home advertising platform.
            </p>
            <h2>Strategic Investment Partners</h2>
            <p>
              The funding round was led by prominent venture capital firms with deep expertise in advertising technology 
              and enterprise software. The investment validates Moving Walls&apos; position as a leader in the rapidly 
              evolving OOH advertising space.
            </p>
            <h2>Growth Strategy</h2>
            <p>
              The capital will be deployed across several key initiatives including geographic expansion, 
              product development, and team growth. Moving Walls plans to strengthen its presence in existing markets 
              while entering new territories across Asia Pacific, Europe, and the Americas.
            </p>
            <h2>Platform Innovation</h2>
            <p>
              A significant portion of the funding will support continued innovation in AI and machine learning 
              capabilities, enhancing the platform&apos;s ability to deliver automated, data-driven OOH campaigns at scale.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
