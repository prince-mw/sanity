import { notFound } from "next/navigation";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getLandingPageBySlug, getLandingPageSlugs } from "@/sanity/lib/queries";
import { LandingPageRenderer } from "@/components/landing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all landing pages
export async function generateStaticParams() {
  try {
    const pages = await getLandingPageSlugs();
    return pages.map((page: { slug: string }) => ({
      slug: page.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const page = await getLandingPageBySlug(slug);
    
    if (page) {
      const seo = page.seo;
      const title = seo?.metaTitle || page.title;
      const description = seo?.metaDescription || `${page.title} - Moving Walls`;
      const ogImage = seo?.ogImage || null;
      
      return {
        title: {
          absolute: title,
        },
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: ogImage ? [ogImage] : [],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Moving Walls',
    description: 'Global leader in Out-of-Home advertising technology.',
  };
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  
  let page;

  try {
    page = await getLandingPageBySlug(slug, isPreview);
  } catch (error) {
    console.error("Error fetching landing page:", error);
    notFound();
  }

  // If no landing page found with this slug, show 404
  if (!page) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {isPreview && (
          <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
            Preview Mode - {page.status === 'draft' ? 'Draft' : page.status === 'archived' ? 'Archived' : 'Published'}
            <a href="/api/exit-preview" className="ml-4 underline">Exit Preview</a>
          </div>
        )}
        <LandingPageRenderer sections={page.sections || []} />
      </main>
      <Footer />
    </>
  );
}
