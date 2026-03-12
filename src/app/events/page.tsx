import { Metadata } from 'next'
import { getAllEvents, transformEvent } from '@/sanity/lib/fetch'
import EventsPageClient, { Event } from '@/components/EventsPageClient'

export const metadata: Metadata = {
  title: 'Events & Training | Moving Walls',
  description: 'Join Moving Walls events, webinars, workshops, conferences, and training sessions. Learn best practices and connect with advertising professionals.',
  openGraph: {
    title: 'Events & Training | Moving Walls',
    description: 'Join our events, webinars, workshops, and training sessions.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackEvents: Event[] = [
  {
    title: "The Future of Programmatic Advertising",
    type: "Webinar",
    date: "December 15, 2024",
    time: "2:00 PM - 3:00 PM PST",
    location: "Virtual Event",
    description: "Join our experts as we explore emerging trends in programmatic advertising and discuss how AI is reshaping the industry.",
    speakers: ["Sarah Mitchell, CEO", "David Chen, CTO"],
    price: "Free",
    capacity: "500 attendees",
    category: "Technology",
    featured: true
  },
  {
    title: "MovingWalls at AdTech Conference 2025",
    type: "Conference",
    date: "January 22-24, 2025",
    time: "9:00 AM - 6:00 PM PST",
    location: "Moscone Center, San Francisco",
    description: "Meet our team at booth #245 and see live demos of our latest advertising technology innovations.",
    speakers: ["Maria Rodriguez, CMO", "Product Demo Team"],
    price: "Conference Pass Required",
    capacity: "Meet at Booth #245",
    category: "Conference",
    featured: false
  },
  {
    title: "Data Privacy in Modern Advertising",
    type: "Workshop",
    date: "February 8, 2025",
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
    title: "Customer Success Stories & Best Practices",
    type: "Webinar",
    date: "February 20, 2025",
    time: "1:00 PM - 2:00 PM EST",
    location: "Virtual Event",
    description: "Learn from successful campaigns and discover best practices from leading brands using MovingWalls platforms.",
    speakers: ["Michael Brown, CRO", "Customer Success Team"],
    price: "Free",
    capacity: "1000 attendees",
    category: "Case Studies",
    featured: false
  },
  {
    title: "MovingWalls European Summit",
    type: "Summit",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM GMT",
    location: "London Office",
    description: "Annual European summit featuring keynotes, networking, and deep-dive sessions on advertising innovation.",
    speakers: ["Full Leadership Team", "Industry Guest Speakers"],
    price: "Invitation Only",
    capacity: "150 attendees",
    category: "Summit",
    featured: true
  },
  {
    title: "Mobile Advertising Masterclass",
    type: "Training",
    date: "March 28, 2025",
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
  let events: Event[] = fallbackEvents
  
  try {
    const sanityEvents = await getAllEvents()
    
    if (sanityEvents && sanityEvents.length > 0) {
      events = sanityEvents.map(e => {
        const transformed = transformEvent(e)
        return {
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
    }
  } catch (error) {
    console.error('Error fetching events from Sanity:', error)
  }
  
  return <EventsPageClient events={events} />
}
