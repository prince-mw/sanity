'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Icons for FAQ
const Icons = {
  plus: <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  minus: <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>,
}

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div variants={staggerItem} className="border border-gray-200 rounded-lg overflow-hidden">
    <button onClick={onClick} className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
      <span className="font-semibold text-gray-900">{question}</span>
      {isOpen ? Icons.minus : Icons.plus}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-600">{answer}</p>
      </div>
    )}
  </motion.div>
)

// Format Icons
const FormatIcons: Record<string, React.ReactElement> = {
  billboard: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  digital: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  transit: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8M8 11h8m-8 4h2m4 0h2M6 19a2 2 0 01-2-2V7a4 4 0 014-4h8a4 4 0 014 4v10a2 2 0 01-2 2m-12 0h12m-12 0a2 2 0 01-2-2m14 2a2 2 0 002-2m-14 4h2m8 0h2" />
    </svg>
  ),
  street: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  mall: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  airport: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  led: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  spectacular: (
    <svg className="w-12 h-12 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
}

const oohFormats = [
  {
    name: "Unipole",
    category: "Digital Out-of-Home (DOOH)",
    icon: "digital",
    description: "The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility. Ideally suited for commuters as the board stands out and makes its presence known!",
    longDescription: "Unipoles represent one of the most effective and popular DOOH formats in outdoor advertising. Strategically positioned along high-traffic roads and highways, these towering displays feature large screens attached to tall poles, ensuring maximum visibility from great distances. The elevated positioning makes them impossible to miss for commuters, creating powerful brand impressions during daily journeys.",
    specs: ["Height: 40-100+ feet", "Screen Size: 14' x 48' typical", "LED/Digital display options", "360° visibility models", "High-traffic road locations", "Illuminated day and night"],
    benefits: ["Maximum highway visibility", "Commuter-focused targeting", "Impossible to miss", "Premium road locations", "Extended viewing distance", "24/7 brand presence"],
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    video: "",
  },
  {
    name: "Wall Façade",
    category: "Digital Out-of-Home (DOOH)",
    icon: "spectacular",
    description: "An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic. The busy nature of these junctions ensures that there's always one kind of audience viewing the screens - either vehicular or pedestrian.",
    longDescription: "Wall façade advertising transforms building exteriors into dynamic brand canvases at the busiest intersections and junctions in urban centers. These large-format digital screens are strategically mounted on building walls at high-traffic locations where foot traffic meets vehicle traffic. The continuous flow of diverse audiences makes wall façades ideal for campaigns that need to pull out all the stops with creative impact.",
    specs: ["Size: Custom (building dependent)", "High-resolution LED displays", "Premium junction locations", "Full motion video capable", "Weather-resistant construction", "Remote content management"],
    benefits: ["Dual audience reach (pedestrian + vehicular)", "High-traffic junction visibility", "Impactful creative canvas", "Urban landmark presence", "Constant audience flow", "Premium brand positioning"],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    video: "",
  },
  {
    name: "E-Buntings",
    category: "Digital Out-of-Home (DOOH)",
    icon: "led",
    description: "These synchronous, multi-panel displays line public streets - either on the sides or right along the middle. They are generally a specific number of screens that play the same ad, at the same time - positioned along busy streets, these screens are almost impossible to miss!",
    longDescription: "E-Buntings are a unique and highly effective DOOH format featuring multiple synchronized digital panels arranged along public streets. Whether positioned along the sides of busy walkways or running down the middle of major thoroughfares, these screens work in harmony to display the same advertisement simultaneously. This synchronized approach creates an immersive corridor of brand messaging that captures attention from every angle.",
    specs: ["Multi-panel synchronized displays", "Street-side positioning", "Same-time ad playback", "High-frequency locations", "Weather-resistant design", "Central/side street mounting"],
    benefits: ["Synchronized brand messaging", "Impossible to miss", "Multiple touchpoints", "Street-level engagement", "Repetitive exposure", "Immersive ad experience"],
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
    video: "",
  },
  {
    name: "Overhead Bridge",
    category: "Digital Out-of-Home (DOOH)",
    icon: "billboard",
    description: "Overhead bridges have the size and strength to support massive screens spanning the entire width of the road. They are wide, big and hard to miss as driving by, they will be in your eyeline at some point - another DOOH ad format that you just cannot avoid.",
    longDescription: "Overhead bridge advertising leverages the structural advantage of pedestrian bridges and overpasses to deliver massive visual impact. These screens span the entire width of roads, ensuring that every driver passing underneath has your brand directly in their eyeline. The sheer scale and unavoidable positioning make overhead bridge displays one of the most impactful DOOH formats available.",
    specs: ["Full road-width spans", "Massive screen sizes", "Bridge-mounted structure", "High-visibility positioning", "LED/Digital displays", "Unavoidable eyeline placement"],
    benefits: ["Unavoidable visibility", "Full road coverage", "Direct eyeline targeting", "Massive creative canvas", "High traffic exposure", "Memorable brand impact"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    video: "",
  },
  {
    name: "LED Truck",
    category: "Mobile Advertising",
    icon: "transit",
    description: "This is an incredible, dynamic DOOH format that not only allows you to place an ad where your target audience is but also lets you follow them around on routes that they frequent. If you're looking for a DOOH format that's flexible and effective, look no further!",
    longDescription: "LED Trucks represent the ultimate in flexible outdoor advertising, combining the impact of large digital displays with complete mobility. These truck-mounted LED screens can be deployed wherever your target audience gathers - from busy shopping districts to event venues and sports stadiums. The ability to follow audience movement patterns and adapt routes in real-time makes LED trucks incredibly effective for targeted campaigns.",
    specs: ["Mobile LED screen mounting", "GPS route tracking", "Real-time content updates", "Flexible deployment", "Event positioning capability", "Route optimization"],
    benefits: ["Go where your audience is", "Follow target routes", "Event marketing ready", "Maximum flexibility", "Real-time deployment", "Location-specific targeting"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    video: "",
  },
  {
    name: "Airport Screens",
    category: "Transit Advertising",
    icon: "airport",
    description: "Airports are filled with people who are waiting for something - they're either waiting in line to check-in, for security, immigration, baggage or waiting around for their food or flight. Essentially, you have a captive audience that's literally looking around for things to occupy their time.",
    longDescription: "Airport advertising provides access to one of the most valuable captive audiences in advertising. Travelers spend significant time waiting - at check-in counters, security lines, immigration queues, baggage carousels, and departure gates. During these moments, they actively look for content to occupy their time, making airport screens incredibly effective for brand messaging. The affluent, often business-focused demographic adds premium value to every impression.",
    specs: ["Terminal-wide coverage", "Gate area screens", "Baggage claim displays", "Check-in counter positions", "Immigration/Security zones", "Departure lounge screens"],
    benefits: ["Captive waiting audience", "Extended dwell time", "Affluent traveler demographic", "Business traveler reach", "International exposure", "High attention rates"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    video: "",
  },
  {
    name: "Digital Bulletin",
    category: "Digital Out-of-Home (DOOH)",
    icon: "digital",
    description: "Large billboards on the side of highways and heavy-traffic roads, these massive billboards tower over their surroundings and are a fantastic way to give your brand unparalleled visibility.",
    longDescription: "Digital bulletins are the giants of outdoor advertising, positioned along highways and major arterial roads where they tower over the surrounding landscape. These massive digital displays command attention from great distances, delivering your brand message to thousands of commuters and travelers daily. Their elevated positioning and large format ensure unparalleled visibility that creates lasting brand impressions.",
    specs: ["Size: 14' x 48' to 20' x 60'", "Highway-side positioning", "Towering height placement", "LED digital displays", "High-resolution graphics", "Remote content management"],
    benefits: ["Unparalleled visibility", "Highway dominance", "Towers over surroundings", "Massive audience reach", "Extended viewing time", "Premium brand exposure"],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    video: "",
  },
  {
    name: "Bus Shelter",
    category: "Street Furniture",
    icon: "street",
    description: "An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic. The busy nature of these junctions ensures that there's always one kind of audience viewing the screens - either vehicular or pedestrian.",
    longDescription: "Bus shelter advertising captures the attention of commuters in a unique environment where they have time to engage with your message. Positioned at high-traffic locations throughout urban areas, these displays reach both waiting passengers and passing pedestrians and vehicles. The busy nature of bus stop locations ensures constant audience flow, while the shelter environment provides an intimate setting for brand engagement.",
    specs: ["Size: 4' x 6' typical panel", "Backlit/digital options", "Double-sided visibility", "Illuminated 24/7", "Weather-protected viewing", "High-traffic locations"],
    benefits: ["Eye-level viewing", "Captive waiting audience", "Dual audience reach", "Urban coverage", "High frequency exposure", "Commuter targeting"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    video: "",
  },
  {
    name: "Cinema",
    category: "Place-Based Media",
    icon: "spectacular",
    description: "Nothing beats a large screen in a closed room where people have come in with the intention of watching that very screen - and then your ad shows up. The characteristics of the movie that follows can also be a great way of predicting who will occupy those seats.",
    longDescription: "Cinema advertising offers an unmatched opportunity to reach fully engaged audiences in a premium entertainment environment. Viewers have specifically come to watch content on a large screen, making them exceptionally receptive to advertising that appears before the main feature. The ability to target audiences based on movie genres, ratings, and screening times adds precision to this high-impact format.",
    specs: ["Pre-show ads: 15-60 seconds", "Large screen format", "Premium audio systems", "Captive environment", "Genre-based targeting", "Movie audience profiling"],
    benefits: ["Full attention viewing", "Captive audience", "Premium environment", "Emotional engagement", "Predictable demographics", "High recall rates"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    video: "",
  },
]

// Get unique categories for navigation
const categories = [...new Set(oohFormats.map(f => f.category))]

const faqs = [
  {
    question: "What is OOH advertising?",
    answer: "OOH (Out-of-Home) advertising refers to any visual advertising media found outside of the home. This includes billboards, transit ads, street furniture, place-based media, and digital signage that reaches consumers while they are on the go.",
  },
  {
    question: "What is the difference between OOH and DOOH?",
    answer: "OOH encompasses all out-of-home advertising formats, while DOOH (Digital Out-of-Home) specifically refers to digital screens and displays. DOOH offers advantages like dynamic content, real-time updates, programmatic buying, and audience targeting capabilities.",
  },
  {
    question: "Which OOH format is best for my campaign?",
    answer: "The best format depends on your campaign objectives, target audience, budget, and geographic requirements. Billboards are great for broad awareness, transit ads reach commuters, place-based media targets specific contexts, and digital formats offer flexibility and targeting.",
  },
  {
    question: "How is OOH advertising effectiveness measured?",
    answer: "OOH effectiveness is measured through impressions, reach, frequency, and engagement metrics. Modern measurement includes mobile device tracking, eye-tracking studies, foot traffic attribution, and brand lift studies to quantify campaign impact.",
  },
  {
    question: "Can OOH advertising be targeted?",
    answer: "Yes, especially with DOOH. Targeting options include geographic targeting, dayparting (time-based), demographic targeting based on location data, contextual targeting (weather, events), and programmatic buying based on audience data.",
  },
  {
    question: "What is programmatic DOOH?",
    answer: "Programmatic DOOH allows advertisers to buy digital out-of-home inventory through automated, data-driven processes similar to online advertising. It enables real-time bidding, audience targeting, and dynamic content delivery across digital screens.",
  },
]

export default function OOHFormatsPage() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(0)
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-blue-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Out-of-Home Advertising Demystified
                </h1>
                <p className="text-mw-blue-200 text-lg">Learn the basics of outdoor advertising and become an expert</p>
              </motion.div>
              <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-xl text-mw-blue-100 max-w-3xl mb-10">
                Unlock the basics of outdoor advertising with our comprehensive guide. Discover the most effective OOH formats to reach your target audience.
              </motion.p>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-mw-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-50 transition-colors">
                  Plan Your Campaign
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/locations" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View Locations
                </Link>
              </motion.div>
            </div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hidden lg:block">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <p className="text-white/80 text-sm">Watch OOH Formats Overview</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mw-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Format Sections - Alternating Layout */}
      {oohFormats.map((format, index) => {
        const isEven = index % 2 === 0
        
        return (
          <section
            key={format.name}
            id={index === 0 || oohFormats[index - 1]?.category !== format.category 
              ? format.category.toLowerCase().replace(/[^a-z0-9]/g, '-') 
              : undefined}
            className={`py-10 md:py-14 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <motion.div variants={staggerItem} className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {format.name}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {format.longDescription}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-8 mb-8">
                    {/* Specifications Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Specifications
                      </h4>
                      <div className="relative">
                        {/* Timeline line */}
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="absolute left-[7px] top-0 w-0.5 bg-gradient-to-b from-mw-blue-400 to-mw-blue-200"
                        />
                        <ul className="space-y-3">
                          {format.specs?.map((spec, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.4 }}
                              className="text-sm text-gray-600 flex items-start gap-3 relative group"
                            >
                              <motion.span 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 300 }}
                                className="w-4 h-4 rounded-full bg-mw-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-mw-blue-600 transition-colors"
                              >
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <motion.path 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              </motion.span>
                              <span className="group-hover:text-gray-900 transition-colors">{spec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Key Benefits Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Benefits
                      </h4>
                      <div className="relative">
                        {/* Timeline line */}
                        <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          className="absolute left-[7px] top-0 w-0.5 bg-gradient-to-b from-green-400 to-green-200"
                        />
                        <ul className="space-y-3">
                          {format.benefits?.map((benefit, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                              className="text-sm text-gray-600 flex items-start gap-3 relative group"
                            >
                              <motion.span 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.4, type: 'spring', stiffness: 300 }}
                                className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-green-600 transition-colors"
                              >
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <motion.path 
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={3} 
                                    d="M5 13l4 4L19 7" 
                                  />
                                </svg>
                              </motion.span>
                              <span className="group-hover:text-gray-900 transition-colors">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-mw-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-mw-blue-700 transition-colors"
                  >
                    Inquire About This Format
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Image/Video Side */}
                <motion.div variants={staggerItem} className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                    {/* Real Image */}
                    <img 
                      src={format.image} 
                      alt={format.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* Format Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg">{format.name}</p>
                      <p className="text-white/80 text-sm">{format.category}</p>
                    </div>
                    {/* Play button for video formats */}
                    {format.video && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all shadow-lg">
                          <svg className="w-7 h-7 text-mw-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Separator line between formats in same category */}
            {index < oohFormats.length - 1 && oohFormats[index + 1]?.category === format.category && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="border-t border-gray-200"></div>
              </div>
            )}
          </section>
        )
      })}

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about OOH advertising formats
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
