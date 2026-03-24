import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEbookBySlug, getAllEbooks, transformEbook, getSanityImageUrl } from "@/sanity/lib/fetch";
import EbookDetailClient from "../../../components/EbookDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const ebooks = await getAllEbooks();
    return ebooks.map((ebook) => ({
      slug: ebook.slug?.current || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const ebook = await getEbookBySlug(slug);
    
    if (ebook) {
      const seo = ebook.seo;
      const title = seo?.metaTitle || ebook.title;
      const description = seo?.metaDescription || ebook.description;
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : getSanityImageUrl(ebook.image, { width: 1200 });
      
      return {
        title,
        description,
        keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
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
        alternates: {
      canonical: `https://www.movingwalls.com/ebooks/${slug}`,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'E-Book',
    description: 'Download this free e-book from Moving Walls.',
  };
}

export default async function EbookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  let ebook;
  let relatedEbooks: any[] = [];

  try {
    const sanityEbook = await getEbookBySlug(slug);
    
    if (sanityEbook) {
      ebook = transformEbook(sanityEbook);
      
      // Get related ebooks (same category, excluding current)
      const allEbooks = await getAllEbooks();
      relatedEbooks = allEbooks
        .filter(e => e.slug?.current !== slug && e.category === sanityEbook.category)
        .slice(0, 3)
        .map(transformEbook);
    }
  } catch (error) {
    console.error("Error fetching ebook:", error);
  }

  if (!ebook) {
    notFound();
  }

  return <EbookDetailClient ebook={ebook} relatedEbooks={relatedEbooks} />;
}
