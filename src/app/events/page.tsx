import { Metadata } from 'next'
import { getAllEvents, transformEvent, getPageSeo, getSanityImageUrl } from '@/sanity/lib/fetch'
import EventsPageClient, { Event } from '@/components/EventsPageClient'

const defaultMeta = {
  title: 'Events & Training | Moving Walls',
  description: 'Join Moving Walls events, webinars, workshops, conferences, and training sessions. Learn best practices and connect with advertising professionals.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('events');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || defaultMeta.title,
      description: seo?.metaDescription || 'Join our events, webinars, workshops, and training sessions.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 300

// Helper function to check if event date is in the past
function isEventPast(dateString: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Try to parse the date string
  const eventDate = new Date(dateString)
  if (isNaN(eventDate.getTime())) {
    // If parsing fails, try extracting just numbers for year/month/day
    const match = dateString.match(/(\w+)\s+(\d+)(?:-\d+)?,?\s*(\d{4})?/)
    if (match) {
      const months: Record<string, number> = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      }
      const month = months[match[1]] ?? 0
      const day = parseInt(match[2])
      const year = match[3] ? parseInt(match[3]) : today.getFullYear()
      const parsedDate = new Date(year, month, day)
      return parsedDate < today
    }
    return false
  }
  return eventDate < today
}

const fallbackUpcomingEvents: Event[] = [
  {
    title: "Moving Walls at AdTech Conference 2026",
    type: "Conference",
    date: "April 22-24, 2026",
    time: "9:00 AM - 6:00 PM PST",
    location: "Moscone Center, San Francisco",
    description: "Meet our team at booth #245 and see live demos of our latest advertising technology innovations.",
    speakers: ["Maria Rodriguez, CMO", "Product Demo Team"],
    price: "Conference Pass Required",
    capacity: "Meet at Booth #245",
    category: "Conference",
    featured: true
  },
  {
    title: "Data Privacy in Modern Advertising",
    type: "Workshop",
    date: "May 8, 2026",
    time: "10:00 AM - 4:00 PM EST",
    location: "New York Office",
    description: "Interactive workshop covering privacy-first advertising strategies and compliance with global data regulations.",
    speakers: ["Dr. Lisa Park, CDO", "Legal & Compliance Team"],
    price: "$299",
    capacity: "30 attendees",
    category: "Compliance",
    featured: false
  },
  {
    title: "Moving Walls European Summit",
    type: "Summit",
    date: "June 15, 2026",
    time: "9:00 AM - 5:00 PM GMT",
    location: "London Office",
    description: "Annual European summit featuring keynotes, networking, and deep-dive sessions on advertising innovation.",
    speakers: ["Full Leadership Team", "Industry Guest Speakers"],
    price: "Invitation Only",
    capacity: "150 attendees",
    category: "Summit",
    featured: true
  }
]

const fallbackPastEvents: Event[] = [
  {
    title: "The Future of Programmatic Advertising",
    type: "Webinar",
    date: "December 15, 2025",
    time: "2:00 PM - 3:00 PM PST",
    location: "Virtual Event",
    description: "Our experts explored emerging trends in programmatic advertising and discussed how AI is reshaping the industry.",
    speakers: ["Sarah Mitchell, CEO", "David Chen, CTO"],
    price: "Free",
    capacity: "500 attendees",
    category: "Technology",
    featured: false
  },
  {
    title: "Customer Success Stories & Best Practices",
    type: "Webinar",
    date: "February 20, 2025",
    time: "1:00 PM - 2:00 PM EST",
    location: "Virtual Event",
    description: "Learning from successful campaigns and best practices from leading brands using Moving Walls platforms.",
    speakers: ["Michael Brown, CRO", "Customer Success Team"],
    price: "Free",
    capacity: "1000 attendees",
    category: "Case Studies",
    featured: false
  },
  {
    title: "Mobile Advertising Masterclass",
    type: "Training",
    date: "January 28, 2025",
    time: "11:00 AM - 3:00 PM PST",
    location: "San Francisco Office",
    description: "Hands-on training session focused on mobile advertising strategies and campaign optimization techniques.",
    speakers: ["Product Training Team", "Mobile Strategy Experts"],
    price: "$199",
    capacity: "25 attendees",
    category: "Training",
    featured: false
  }
]

export default async function EventsPage() {
  let upcomingEvents: Event[] = fallbackUpcomingEvents
  let pastEvents: Event[] = fallbackPastEvents
  
  try {
    const sanityEvents = await getAllEvents()
    
    if (sanityEvents && sanityEvents.length > 0) {
      const allEvents = sanityEvents.map(e => {
        const transformed = transformEvent(e)
        return {
          slug: transformed.slug,
          title: transformed.title,
          type: transformed.type || 'Event',
          date: transformed.date || 'TBD',
          time: transformed.time || 'TBD',
          location: transformed.location || 'Virtual Event',
          description: transformed.description,
          speakers: transformed.speakersList || [],
          speakersList: transformed.speakers || [],
          price: transformed.price || 'Free',
          capacity: transformed.capacity || 'Unlimited',
          category: transformed.category || 'General',
          featured: transformed.featured || false,
          featuredImage: transformed.featuredImage,
          content: transformed.content
        }
      })
      
      // Separate into upcoming and past events
      upcomingEvents = allEvents.filter(event => !isEventPast(event.date))
      pastEvents = allEvents.filter(event => isEventPast(event.date))
    }
  } catch (error) {
    console.error('Error fetching events from Sanity:', error)
  }
  
  return <EventsPageClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
}
