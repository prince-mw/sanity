import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, getAllEvents, transformEvent, getSanityImageUrl } from "@/sanity/lib/fetch";
import EventDetailClient from "../../../components/EventDetailClient";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const events = await getAllEvents();
    return events.map((event) => ({
      slug: event.slug?.current || '',
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const event = await getEventBySlug(slug);
    
    if (event) {
      const seo = event.seo;
      const title = seo?.metaTitle || event.title;
      const description = seo?.metaDescription || event.excerpt;
      const ogImage = seo?.ogImage 
        ? getSanityImageUrl(seo.ogImage, { width: 1200 })
        : getSanityImageUrl(event.featuredImage, { width: 1200 });
      
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
          canonical: `https://www.movingwalls.com/events/${slug}`,
        },
        robots: seo?.noIndex ? { index: false, follow: false } : undefined,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  
  return {
    title: 'Event',
    description: 'Join our events and connect with the advertising community.',
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const event = await getEventBySlug(slug);
    
    if (!event) {
      notFound();
    }
    
    const transformed = transformEvent(event);

    // Get related events — kept in the same upcoming/past bucket as the event being
    // viewed, so an upcoming event never surfaces past ones (and vice versa).
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isCurrentEventPast = (() => {
      if (!event.startDate) return false;
      const d = new Date(event.startDate);
      d.setHours(0, 0, 0, 0);
      return d < today;
    })();

    const allEvents = await getAllEvents();
    const relatedEvents = allEvents
      .filter(e => e.slug?.current !== slug)
      .filter(e => {
        if (!e.startDate) return false;
        const d = new Date(e.startDate);
        d.setHours(0, 0, 0, 0);
        return isCurrentEventPast ? d < today : d >= today;
      })
      .sort((a, b) => {
        const timeA = new Date(a.startDate).getTime();
        const timeB = new Date(b.startDate).getTime();
        // Upcoming: soonest first. Past: most recently happened first.
        return isCurrentEventPast ? timeB - timeA : timeA - timeB;
      })
      .slice(0, 3)
      .map(e => {
        const t = transformEvent(e);
        return {
          slug: t.slug,
          title: t.title,
          type: t.type,
          date: t.date,
          location: t.location,
          description: t.description,
          featuredImage: t.featuredImage,
        };
      });
    
    // Transform the event data for client
    const transformedEvent = {
      id: event._id,
      slug: event.slug?.current || '',
      title: event.title || '',
      type: transformed.type,
      description: event.excerpt || '',
      date: transformed.date,
      time: transformed.time,
      location: transformed.location,
      category: event.category || '',
      featured: event.featured || false,
      featuredImage: getSanityImageUrl(event.featuredImage, { width: 1200 }) || '',
      content: event.content,
      speakers: event.speakers?.map(s => ({
        name: s.name || '',
        role: s.role || '',
        company: s.company || '',
        image: getSanityImageUrl(s.image, { width: 200 }) || '',
      })) || [],
    };
    
    return <EventDetailClient event={transformedEvent} relatedEvents={relatedEvents} />;
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }
}
