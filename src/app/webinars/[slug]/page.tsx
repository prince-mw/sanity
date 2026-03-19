import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getWebinarBySlug, getRelatedWebinars, getAllWebinars, getSanityImageUrl } from "@/sanity/lib/fetch";
import WebinarDetailClient from "@/components/WebinarDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const webinars = await getAllWebinars();
    return webinars.map((webinar) => ({
      slug: webinar.slug?.current || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const webinar = await getWebinarBySlug(slug);
    
    if (webinar) {
      const seo = webinar.seo;
      const title = seo?.metaTitle || webinar.title;
      const description = seo?.metaDescription || webinar.description;
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : getSanityImageUrl(webinar.featuredImage, { width: 1200 });
      
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
        robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Webinar',
    description: 'Watch webinars from Moving Walls.',
  };
}

export default async function WebinarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const webinar = await getWebinarBySlug(slug);
    
    if (!webinar) {
      notFound();
    }
    
    const relatedWebinars = await getRelatedWebinars(slug, 3);
    
    // Transform the webinar data
    const transformedWebinar = {
      id: webinar._id,
      slug: webinar.slug?.current || '',
      title: webinar.title || '',
      description: webinar.description || '',
      date: webinar.date || '',
      time: webinar.time || '',
      duration: webinar.duration || '',
      speaker: webinar.speaker || '',
      speakerRole: webinar.speakerRole || '',
      speakerImage: getSanityImageUrl(webinar.speakerImage, { width: 200 }) || '',
      featuredImage: getSanityImageUrl(webinar.featuredImage, { width: 1200 }) || '',
      webinarType: webinar.webinarType,
      registrationLink: webinar.registrationLink || '',
      watchLink: webinar.watchLink || '',
      content: webinar.content,
      htmlContent: webinar.htmlContent || '',
      speakers: webinar.speakers?.map(s => ({
        _key: s._key || '',
        name: s.name || '',
        role: s.role || '',
        company: s.company || '',
        bio: s.bio || '',
        image: getSanityImageUrl(s.image, { width: 200 }) || '',
        linkedin: s.linkedin || '',
      })) || [],
    };
    
    const transformedRelated = relatedWebinars.map(w => ({
      slug: w.slug?.current || '',
      title: w.title || '',
      description: w.description || '',
      date: w.date || '',
      duration: w.duration || '',
      speaker: w.speaker || '',
      speakerRole: w.speakerRole || '',
      featuredImage: getSanityImageUrl(w.featuredImage, { width: 400 }) || '',
      webinarType: w.webinarType,
      speakers: w.speakers?.map(s => ({
        _key: s._key || '',
        name: s.name || '',
        role: s.role || '',
        company: s.company || '',
        bio: s.bio || '',
        image: getSanityImageUrl(s.image, { width: 200 }) || '',
        linkedin: s.linkedin || '',
      })) || [],
    }));
    
    return <WebinarDetailClient webinar={transformedWebinar} relatedWebinars={transformedRelated} />;
  } catch (error) {
    console.error("Error fetching webinar:", error);
    notFound();
  }
}
