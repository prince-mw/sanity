import { notFound } from "next/navigation";
import { 
  getPressReleaseBySlug, 
  getRelatedPressReleases, 
  transformPressReleaseDetail, 
  transformPressRelease,
  getAllPressReleases 
} from "@/sanity/lib/fetch";
import NewsDetailClient from "@/components/NewsDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const releases = await getAllPressReleases();
    return releases.map((release) => ({
      slug: release.slug?.current || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const release = await getPressReleaseBySlug(slug);
    if (release) {
      return {
        title: `${release.title} | Press & News | Moving Walls`,
        description: release.excerpt || `Read the latest news from Moving Walls about ${release.title}`,
        openGraph: {
          title: release.title,
          description: release.excerpt,
          type: 'article',
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Press & News | Moving Walls',
    description: 'Latest news and announcements from Moving Walls.',
  };
}

export default async function PressNewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  let release;
  let relatedNews: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    thumbnail: string;
  }> = [];

  try {
    // Fetch from Sanity
    const sanityRelease = await getPressReleaseBySlug(slug);
    
    if (sanityRelease) {
      // If has external link only (no content), redirect to external
      if (sanityRelease.externalLink && !sanityRelease.content) {
        // We'll handle this in the client component
      }
      
      release = transformPressReleaseDetail(sanityRelease);
      
      // Get related press releases
      const sanityRelated = await getRelatedPressReleases(slug, sanityRelease.category, 3);
      relatedNews = sanityRelated.map(transformPressRelease);
    }
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
  }

  if (!release) {
    notFound();
  }

  return <NewsDetailClient release={release} relatedNews={relatedNews} />;
}
