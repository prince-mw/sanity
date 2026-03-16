import { Metadata } from 'next'
import { getUpcomingWebinars, getPastWebinars, transformWebinar } from '@/sanity/lib/fetch'
import WebinarsPageClient, { UpcomingWebinar, PastWebinar } from '@/components/WebinarsPageClient'

export const metadata: Metadata = {
  title: 'Webinars & Live Events | Moving Walls',
  description: 'Join live webinars with industry experts or watch recordings of past webinars about out-of-home advertising and programmatic DOOH.',
  openGraph: {
    title: 'Webinars & Live Events | Moving Walls',
    description: 'Join live webinars with industry experts or watch past webinar recordings.',
    type: 'website',
  },
}

export const revalidate = 300

const fallbackUpcomingWebinars: UpcomingWebinar[] = [
  {
    title: "AI-Powered Campaign Optimization: Advanced Strategies",
    description: "Learn cutting-edge techniques for leveraging AI and machine learning to optimize your advertising campaigns in real-time.",
    date: "Dec 15, 2025",
    time: "2:00 PM EST",
    duration: "60 min",
    speaker: "Dr. Sarah Mitchell",
    speakerRole: "Chief Data Scientist",
    attendees: 234,
    level: "Advanced"
  },
  {
    title: "Getting Started with Programmatic DOOH",
    description: "A comprehensive introduction to programmatic digital out-of-home advertising for beginners.",
    date: "Dec 20, 2025",
    time: "11:00 AM EST",
    duration: "45 min",
    speaker: "Michael Torres",
    speakerRole: "Product Manager",
    attendees: 456,
    level: "Beginner"
  },
  {
    title: "Healthcare Marketing Compliance & Best Practices",
    description: "Navigate healthcare advertising regulations while maximizing campaign effectiveness.",
    date: "Jan 8, 2026",
    time: "1:00 PM EST",
    duration: "50 min",
    speaker: "Dr. Amanda Lee",
    speakerRole: "Healthcare Marketing Expert",
    attendees: 189,
    level: "Intermediate"
  }
]

const fallbackPastWebinars: PastWebinar[] = [
  {
    title: "Maximizing ROI with MW Planner: Complete Workshop",
    description: "Deep dive into campaign planning and optimization strategies using MW Planner platform.",
    date: "Nov 15, 2025",
    time: "2:00 PM EST",
    duration: "75 min",
    speaker: "James Wilson",
    speakerRole: "Senior Solutions Architect",
    level: "Intermediate"
  },
  {
    title: "The Future of Retail Advertising in 2025",
    description: "Explore emerging trends and technologies shaping the future of retail marketing.",
    date: "Oct 20, 2025",
    time: "11:00 AM EST",
    duration: "45 min",
    speaker: "Lisa Chen",
    speakerRole: "Industry Analyst",
    level: "All Levels"
  },
  {
    title: "Location-Based Targeting Masterclass",
    description: "Advanced techniques for geo-targeting and location intelligence in advertising.",
    date: "Sep 10, 2025",
    time: "3:00 PM EST",
    duration: "60 min",
    speaker: "Robert Martinez",
    speakerRole: "Targeting Specialist",
    level: "Advanced"
  },
  {
    title: "Creative Best Practices for DOOH Campaigns",
    description: "Design principles and creative strategies that drive engagement in outdoor advertising.",
    date: "Aug 5, 2025",
    time: "1:00 PM EST",
    duration: "40 min",
    speaker: "Emily Rodriguez",
    speakerRole: "Creative Director",
    level: "All Levels"
  }
]

export default async function WebinarsPage() {
  let upcomingWebinars: UpcomingWebinar[] = fallbackUpcomingWebinars
  let pastWebinars: PastWebinar[] = fallbackPastWebinars
  
  try {
    const [upcoming, past] = await Promise.all([
      getUpcomingWebinars(),
      getPastWebinars()
    ])
    
    if (upcoming && upcoming.length > 0) {
      upcomingWebinars = upcoming.map(w => {
        const transformed = transformWebinar(w)
        return {
          slug: transformed.slug,
          title: transformed.title,
          description: transformed.description,
          date: transformed.date || 'TBD',
          time: transformed.time || 'TBD',
          duration: transformed.duration || '60 min',
          speaker: transformed.speaker || 'TBD',
          speakerRole: transformed.speakerRole || '',
          featuredImage: transformed.featuredImage || '',
          speakerImage: transformed.speakerImage || '',
          attendees: transformed.attendees || 0,
          level: transformed.level || 'All Levels'
        }
      })
    }
    
    if (past && past.length > 0) {
      pastWebinars = past.map(w => {
        const transformed = transformWebinar(w)
        return {
          slug: transformed.slug,
          title: transformed.title,
          description: transformed.description,
          date: transformed.date || 'TBD',
          time: transformed.time || 'TBD',
          duration: transformed.duration || '60 min',
          speaker: transformed.speaker || 'TBD',
          speakerRole: transformed.speakerRole || '',
          featuredImage: transformed.featuredImage || '',
          speakerImage: transformed.speakerImage || '',
          level: transformed.level || 'All Levels'
        }
      })
    }
  } catch (error) {
    console.error('Error fetching webinars from Sanity:', error)
  }
  
  return <WebinarsPageClient upcomingWebinars={upcomingWebinars} pastWebinars={pastWebinars} />
}
