import { Metadata } from 'next'
import { getAllOohFormats, transformOohFormat, getPageSeo, getPageFaqs, getSanityImageUrl } from '@/sanity/lib/fetch'
import OOHFormatsPageClient, { OOHFormat, OOHFaq } from '@/components/OOHFormatsPageClient'

const defaultMeta = {
  title: 'OOH Formats | Moving Walls',
  description: 'Explore all out-of-home advertising formats - from digital billboards and transit ads to airport displays and LED trucks.',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo('ooh-formats');
  const seo = pageSeo?.seo;
  
  return {
    title: seo?.metaTitle || defaultMeta.title,
    description: seo?.metaDescription || defaultMeta.description,
    keywords: seo?.enableKeywords !== false && seo?.keywords?.length ? seo.keywords : undefined,
    openGraph: {
      title: seo?.metaTitle || 'OOH Advertising Formats | Moving Walls',
      description: seo?.metaDescription || 'Complete guide to out-of-home advertising formats and their benefits.',
      type: 'website',
      images: seo?.ogImage ? [{ url: getSanityImageUrl(seo.ogImage, { width: 1200 }), width: 1200, height: 630 }] : [],
    },
    alternates: {
      canonical: "https://www.movingwalls.com/ooh-formats",
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export const revalidate = 30

// Static fallback data for when Sanity is unavailable
const fallbackOohFormats: OOHFormat[] = [
  {
    name: "Unipole",
    category: "Digital Out-of-Home (DOOH)",
    icon: "digital",
    longDescription: "Unipoles represent one of the most effective and popular DOOH formats in outdoor advertising. Strategically positioned along high-traffic roads and highways, these towering displays feature large screens attached to tall poles, ensuring maximum visibility from great distances. The elevated positioning makes them impossible to miss for commuters, creating powerful brand impressions during daily journeys.",
    specs: ["Height: 40-100+ feet", "Screen Size: 14' x 48' typical", "LED/Digital display options", "360° visibility models", "High-traffic road locations", "Illuminated day and night"],
    benefits: ["Maximum highway visibility", "Commuter-focused targeting", "Impossible to miss", "Premium road locations", "Extended viewing distance", "24/7 brand presence"],
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
  },
  {
    name: "Wall Façade",
    category: "Digital Out-of-Home (DOOH)",
    icon: "spectacular",
    longDescription: "Wall façade advertising transforms building exteriors into dynamic brand canvases at the busiest intersections and junctions in urban centers. These large-format digital screens are strategically mounted on building walls at high-traffic locations where foot traffic meets vehicle traffic. The continuous flow of diverse audiences makes wall façades ideal for campaigns that need to pull out all the stops with creative impact.",
    specs: ["Size: Custom (building dependent)", "High-resolution LED displays", "Premium junction locations", "Full motion video capable", "Weather-resistant construction", "Remote content management"],
    benefits: ["Dual audience reach (pedestrian + vehicular)", "High-traffic junction visibility", "Impactful creative canvas", "Urban landmark presence", "Constant audience flow", "Premium brand positioning"],
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
  },
  {
    name: "E-Buntings",
    category: "Digital Out-of-Home (DOOH)",
    icon: "led",
    longDescription: "E-Buntings are a unique and highly effective DOOH format featuring multiple synchronized digital panels arranged along public streets. Whether positioned along the sides of busy walkways or running down the middle of major thoroughfares, these screens work in harmony to display the same advertisement simultaneously. This synchronized approach creates an immersive corridor of brand messaging that captures attention from every angle.",
    specs: ["Multi-panel synchronized displays", "Street-side positioning", "Same-time ad playback", "High-frequency locations", "Weather-resistant design", "Central/side street mounting"],
    benefits: ["Synchronized brand messaging", "Impossible to miss", "Multiple touchpoints", "Street-level engagement", "Repetitive exposure", "Immersive ad experience"],
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
  },
  {
    name: "Overhead Bridge",
    category: "Digital Out-of-Home (DOOH)",
    icon: "billboard",
    longDescription: "Overhead bridge advertising leverages the structural advantage of pedestrian bridges and overpasses to deliver massive visual impact. These screens span the entire width of roads, ensuring that every driver passing underneath has your brand directly in their eyeline. The sheer scale and unavoidable positioning make overhead bridge displays one of the most impactful DOOH formats available.",
    specs: ["Full road-width spans", "Massive screen sizes", "Bridge-mounted structure", "High-visibility positioning", "LED/Digital displays", "Unavoidable eyeline placement"],
    benefits: ["Unavoidable visibility", "Full road coverage", "Direct eyeline targeting", "Massive creative canvas", "High traffic exposure", "Memorable brand impact"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    name: "LED Truck",
    category: "Mobile Advertising",
    icon: "transit",
    longDescription: "LED Trucks represent the ultimate in flexible outdoor advertising, combining the impact of large digital displays with complete mobility. These truck-mounted LED screens can be deployed wherever your target audience gathers - from busy shopping districts to event venues and sports stadiums. The ability to follow audience movement patterns and adapt routes in real-time makes LED trucks incredibly effective for targeted campaigns.",
    specs: ["Mobile LED screen mounting", "GPS route tracking", "Real-time content updates", "Flexible deployment", "Event positioning capability", "Route optimization"],
    benefits: ["Go where your audience is", "Follow target routes", "Event marketing ready", "Maximum flexibility", "Real-time deployment", "Location-specific targeting"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    name: "Airport Screens",
    category: "Transit Advertising",
    icon: "airport",
    longDescription: "Airport advertising provides access to one of the most valuable captive audiences in advertising. Travelers spend significant time waiting - at check-in counters, security lines, immigration queues, baggage carousels, and departure gates. During these moments, they actively look for content to occupy their time, making airport screens incredibly effective for brand messaging. The affluent, often business-focused demographic adds premium value to every impression.",
    specs: ["Terminal-wide coverage", "Gate area screens", "Baggage claim displays", "Check-in counter positions", "Immigration/Security zones", "Departure lounge screens"],
    benefits: ["Captive waiting audience", "Extended dwell time", "Affluent traveler demographic", "Business traveler reach", "International exposure", "High attention rates"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
  {
    name: "Digital Bulletin",
    category: "Digital Out-of-Home (DOOH)",
    icon: "digital",
    longDescription: "Digital bulletins are the giants of outdoor advertising, positioned along highways and major arterial roads where they tower over the surrounding landscape. These massive digital displays command attention from great distances, delivering your brand message to thousands of commuters and travelers daily. Their elevated positioning and large format ensure unparalleled visibility that creates lasting brand impressions.",
    specs: ["Size: 14' x 48' to 20' x 60'", "Highway-side positioning", "Towering height placement", "LED digital displays", "High-resolution graphics", "Remote content management"],
    benefits: ["Unparalleled visibility", "Highway dominance", "Towers over surroundings", "Massive audience reach", "Extended viewing time", "Premium brand exposure"],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  },
  {
    name: "Bus Shelter",
    category: "Street Furniture",
    icon: "street",
    longDescription: "Bus shelter advertising captures the attention of commuters in a unique environment where they have time to engage with your message. Positioned at high-traffic locations throughout urban areas, these displays reach both waiting passengers and passing pedestrians and vehicles. The busy nature of bus stop locations ensures constant audience flow, while the shelter environment provides an intimate setting for brand engagement.",
    specs: ["Size: 4' x 6' typical panel", "Backlit/digital options", "Double-sided visibility", "Illuminated 24/7", "Weather-protected viewing", "High-traffic locations"],
    benefits: ["Eye-level viewing", "Captive waiting audience", "Dual audience reach", "Urban coverage", "High frequency exposure", "Commuter targeting"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
  {
    name: "Cinema",
    category: "Place-Based Media",
    icon: "spectacular",
    longDescription: "Cinema advertising offers an unmatched opportunity to reach fully engaged audiences in a premium entertainment environment. Viewers have specifically come to watch content on a large screen, making them exceptionally receptive to advertising that appears before the main feature. The ability to target audiences based on movie genres, ratings, and screening times adds precision to this high-impact format.",
    specs: ["Pre-show ads: 15-60 seconds", "Large screen format", "Premium audio systems", "Captive environment", "Genre-based targeting", "Movie audience profiling"],
    benefits: ["Full attention viewing", "Captive audience", "Premium environment", "Emotional engagement", "Predictable demographics", "High recall rates"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
  },
]

async function getOohFormats(): Promise<OOHFormat[]> {
  try {
    const sanityFormats = await getAllOohFormats()

    if (sanityFormats && sanityFormats.length > 0) {
      return sanityFormats.map(format => {
        const transformed = transformOohFormat(format)
        return {
          name: transformed.name,
          category: transformed.category,
          icon: transformed.icon,
          longDescription: transformed.longDescription,
          specs: transformed.specs,
          benefits: transformed.benefits,
          image: transformed.image || fallbackOohFormats.find(f => f.name === transformed.name)?.image || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
          learnMoreEnabled: transformed.learnMoreEnabled,
          learnMoreUrl: transformed.learnMoreUrl,
        }
      })
    }

    return fallbackOohFormats
  } catch (error) {
    console.error('Error fetching OOH formats from Sanity:', error)
    return fallbackOohFormats
  }
}

// Static fallback FAQs for when Sanity is unavailable or has no entries yet
const fallbackFaqs: OOHFaq[] = [
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

async function getFaqs(): Promise<OOHFaq[]> {
  try {
    const sanityFaqs = await getPageFaqs('ooh-formats')
    if (sanityFaqs && sanityFaqs.length > 0) {
      return sanityFaqs
    }
    return fallbackFaqs
  } catch (error) {
    console.error('Error fetching OOH FAQs from Sanity:', error)
    return fallbackFaqs
  }
}

export default async function OOHFormatsPage() {
  const [oohFormats, faqs] = await Promise.all([getOohFormats(), getFaqs()])

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <OOHFormatsPageClient oohFormats={oohFormats} faqs={faqs} />
    </>
  )
}
