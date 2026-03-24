import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";


const ARTICLE_SLUG = "transit-partnership";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo("transit-partnership")
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "Moving Walls Partners with Major Transit Authority for Digital OOH Network";
  const description = seo?.seo?.metaDescription || article?.excerpt || "Partnership brings programmatic advertising to transit systems reaching millions of daily commuters.";

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
      canonical: "https://www.movingwalls.com/transit-partnership",
    },
  };
}

export default async function TransitPartnershipPage() {
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
    category: article.category || "partnership",
    readTime: article.readTime || "5 min read",
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
              <span className="text-[#00E67E]">Partnership</span>
              <span>•</span>
              <time dateTime="2023-01-18">January 18, 2023</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Moving Walls Partners with Major Transit Authority for Digital OOH Network
            </h1>
            <p className="text-xl text-gray-300">
              Partnership brings programmatic advertising to transit systems reaching millions of daily commuters.
            </p>
          </header>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Moving Walls has entered a strategic partnership with a major metropolitan transit authority to power 
              programmatic advertising across their extensive digital out-of-home network. The partnership covers 
              thousands of digital screens across subway stations, bus shelters, and transit vehicles.
            </p>
            <h2>Unprecedented Reach</h2>
            <p>
              The transit network serves millions of daily commuters, offering advertisers unprecedented access to 
              urban audiences during their daily routines. The digital screens provide high-impact placements at 
              key moments throughout the commuter journey.
            </p>
            <h2>Technology Integration</h2>
            <p>
              Moving Walls&apos; platform will enable real-time programmatic buying across the entire transit network, 
              allowing advertisers to target specific stations, times, and audience segments. The integration includes 
              dynamic creative capabilities to deliver contextually relevant messaging.
            </p>
            <h2>Sustainable Advertising</h2>
            <p>
              The partnership includes commitments to sustainability, with digital displays powered by renewable energy 
              and a portion of advertising revenue dedicated to transit system improvements. This aligns with both 
              partners&apos; commitment to responsible business practices.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
