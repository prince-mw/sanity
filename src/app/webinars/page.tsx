import { Metadata } from 'next'
import { getUpcomingWebinars, getOnDemandWebinars, transformWebinar } from '@/sanity/lib/fetch'
import WebinarsPageClient, { UpcomingWebinar, OnDemandWebinar } from '@/components/WebinarsPageClient'

export const metadata: Metadata = {
  title: 'Webinars & Live Events | Moving Walls',
  description: 'Join live webinars with industry experts or access our library of on-demand webinars about out-of-home advertising and programmatic DOOH.',
  openGraph: {
    title: 'Webinars & Live Events | Moving Walls',
    description: 'Join live webinars with industry experts or access our on-demand library.',
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

const fallbackOnDemandWebinars: OnDemandWebinar[] = [
  {
    title: "Maximizing ROI with MW Planner: Complete Workshop",
    description: "Deep dive into campaign planning and optimization strategies using MW Planner platform.",
    duration: "75 min",
    speaker: "James Wilson",
    speakerRole: "Senior Solutions Architect",
    views: 2456,
    rating: 4.8,
    level: "Intermediate"
  },
  {
    title: "The Future of Retail Advertising in 2025",
    description: "Explore emerging trends and technologies shaping the future of retail marketing.",
    duration: "45 min",
    speaker: "Lisa Chen",
    speakerRole: "Industry Analyst",
    views: 3892,
    rating: 4.9,
    level: "All Levels"
  },
  {
    title: "Location-Based Targeting Masterclass",
    description: "Advanced techniques for geo-targeting and location intelligence in advertising.",
    duration: "60 min",
    speaker: "Robert Martinez",
    speakerRole: "Targeting Specialist",
    views: 1823,
    rating: 4.7,
    level: "Advanced"
  },
  {
    title: "Creative Best Practices for DOOH Campaigns",
    description: "Design principles and creative strategies that drive engagement in outdoor advertising.",
    duration: "40 min",
    speaker: "Emily Rodriguez",
    speakerRole: "Creative Director",
    views: 4123,
    rating: 4.9,
    level: "All Levels"
  }
]

export default async function WebinarsPage() {
  let upcomingWebinars: UpcomingWebinar[] = fallbackUpcomingWebinars
  let onDemandWebinars: OnDemandWebinar[] = fallbackOnDemandWebinars
  
  try {
    const [upcoming, onDemand] = await Promise.all([
      getUpcomingWebinars(),
      getOnDemandWebinars()
    ])
    
    if (upcoming && upcoming.length > 0) {
      upcomingWebinars = upcoming.map(w => {
        const transformed = transformWebinar(w)
        return {
          title: transformed.title,
          description: transformed.description,
          date: transformed.date || 'TBD',
          time: transformed.time || 'TBD',
          duration: transformed.duration || '60 min',
          speaker: transformed.speaker || 'TBD',
          speakerRole: transformed.speakerRole || '',
          attendees: transformed.attendees || 0,
          level: transformed.level || 'All Levels'
        }
      })
    }
    
    if (onDemand && onDemand.length > 0) {
      onDemandWebinars = onDemand.map(w => {
        const transformed = transformWebinar(w)
        return {
          title: transformed.title,
          description: transformed.description,
          duration: transformed.duration || '60 min',
          speaker: transformed.speaker || 'TBD',
          speakerRole: transformed.speakerRole || '',
          views: transformed.views || 0,
          rating: transformed.rating || 4.5,
          level: transformed.level || 'All Levels'
        }
      })
    }
  } catch (error) {
    console.error('Error fetching webinars from Sanity:', error)
  }
  
  return <WebinarsPageClient upcomingWebinars={upcomingWebinars} onDemandWebinars={onDemandWebinars} />
}
