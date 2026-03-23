import { Metadata } from "next";
import { getPressArticleBySlug, getPageSeo } from "@/sanity/lib/fetch";
import PressArticleClient from "@/components/PressArticleClient";


const ARTICLE_SLUG = "london-headquarters";

export async function generateMetadata(): Promise<Metadata> {
  const [article, seo] = await Promise.all([
    getPressArticleBySlug(ARTICLE_SLUG),
    getPageSeo("london-headquarters")
  ]);

  const title = seo?.seo?.metaTitle || article?.title || "Moving Walls Establishes European Headquarters in London";
  const description = seo?.seo?.metaDescription || article?.excerpt || "Strategic expansion brings programmatic OOH expertise to the European market.";

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

export default async function LondonHeadquartersPage() {
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
    category: article.category || "expansion",
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
              <span className="text-[#00E67E]">Expansion</span>
              <span>•</span>
              <time dateTime="2022-09-05">September 5, 2022</time>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Moving Walls Establishes European Headquarters in London
            </h1>
            <p className="text-xl text-gray-300">
              Strategic expansion brings programmatic OOH expertise to the European market.
            </p>
          </header>
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Moving Walls announces the opening of its European headquarters in London, marking a significant 
              milestone in the company&apos;s global expansion strategy. The new office will serve as a hub for 
              European operations and client services.
            </p>
            <h2>Strategic Location</h2>
            <p>
              London&apos;s position as a global advertising hub makes it the ideal base for Moving Walls&apos; European 
              expansion. The office is located in the heart of the city&apos;s media district, providing easy access to 
              major agencies, brands, and media owners.
            </p>
            <h2>European Growth</h2>
            <p>
              The new headquarters will support Moving Walls&apos; ambitious growth plans across Europe, including 
              expansion into key markets such as Germany, France, and the Nordic countries. The company has already 
              established partnerships with leading European media owners.
            </p>
            <h2>Local Expertise</h2>
            <p>
              The London team brings together industry veterans with deep expertise in European OOH markets. This 
              local knowledge, combined with Moving Walls&apos; global technology platform, positions the company to 
              deliver exceptional value to European clients.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
