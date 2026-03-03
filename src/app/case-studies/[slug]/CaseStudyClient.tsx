"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const caseStudiesData: Record<string, {
  title: string;
  industry: string;
  client: string;
  challenge: string;
  solution: string;
  image: string;
  results: { metric: string; value: string }[];
  testimonial: string;
  author: string;
  role: string;
  duration: string;
  budget: string;
  overview: string;
  objectives: string[];
  approach: string[];
  keyFeatures: string[];
}> = {
  "global-retail-brand-340-roi": {
    title: "Global Retail Brand Achieves 340% ROI",
    industry: "Retail",
    client: "FashionForward Stores",
    challenge: "A leading retail chain needed to transform their OOH strategy across 15 markets, achieving unprecedented brand awareness and foot traffic increases amid increasing competition from e-commerce.",
    solution: "We implemented a comprehensive location-based targeting strategy with dynamic creative showcasing real-time promotions, integrated with their POS data for attribution.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    results: [
      { metric: "ROI", value: "340%" },
      { metric: "Foot Traffic Increase", value: "+156%" },
      { metric: "Brand Awareness", value: "+89%" },
      { metric: "Markets Covered", value: "15" }
    ],
    testimonial: "Moving Walls transformed how we approach out-of-home advertising. The results exceeded all expectations and have fundamentally changed our marketing strategy.",
    author: "Sarah Chen",
    role: "VP of Marketing",
    duration: "90 days",
    budget: "$450K",
    overview: "This global retail brand was facing declining foot traffic across their 200+ stores in 15 markets. Traditional advertising wasn't delivering the ROI needed to compete with digital-first competitors. They needed a data-driven approach to OOH that could be measured and optimized in real-time.",
    objectives: [
      "Increase foot traffic to physical stores by at least 50%",
      "Improve brand awareness in key metropolitan areas",
      "Achieve measurable ROI on OOH advertising spend",
      "Create a scalable framework for multi-market campaigns"
    ],
    approach: [
      "Deployed audience analytics to identify high-value customer segments and their movement patterns",
      "Implemented dynamic creative optimization based on time of day, weather, and local inventory",
      "Integrated with mobile retargeting to create an omnichannel customer journey",
      "Used MW Measure for real-time attribution and campaign optimization"
    ],
    keyFeatures: [
      "Real-time inventory integration for dynamic promotions",
      "Weather-triggered creative variations",
      "Footfall attribution with POS data matching",
      "Cross-market campaign orchestration"
    ]
  },
  "fmcg-multi-market-launch": {
    title: "FMCG Giant's Multi-Market Launch Success",
    industry: "FMCG",
    client: "Global Consumer Brands",
    challenge: "Orchestrating a synchronized product launch across 8 Asian markets using real-time programmatic DOOH and audience targeting while maintaining brand consistency.",
    solution: "We developed a centralized campaign management approach using MW Activate, enabling simultaneous deployment across all markets with localized creative adaptation.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=800&fit=crop",
    results: [
      { metric: "Markets Launched", value: "8" },
      { metric: "Impressions", value: "45M" },
      { metric: "Brand Lift", value: "+156%" },
      { metric: "Sales Increase", value: "+89%" }
    ],
    testimonial: "The synchronized launch across all markets was flawlessly executed. Moving Walls gave us the control and visibility we needed for such a complex campaign.",
    author: "Jennifer Lee",
    role: "Regional Marketing Head",
    duration: "60 days",
    budget: "$350K",
    overview: "This leading FMCG company was launching a new product line across Southeast Asia. They needed to create massive awareness simultaneously in 8 markets while adapting messaging to local preferences and ensuring consistent brand presentation.",
    objectives: [
      "Launch in 8 markets within a 2-week window",
      "Achieve 80% awareness among target demographic",
      "Maintain brand consistency while allowing local adaptation",
      "Generate measurable sales lift in launch markets"
    ],
    approach: [
      "Used MW Planner to identify optimal screen locations across all 8 markets",
      "Created a master creative template with localization parameters",
      "Deployed programmatic buying through MW Marketplace for efficiency",
      "Implemented real-time monitoring dashboard for regional teams"
    ],
    keyFeatures: [
      "Multi-market campaign orchestration from single platform",
      "Localized creative with centralized brand control",
      "Real-time performance dashboards by market",
      "Integrated measurement across all touchpoints"
    ]
  },
  "automotive-dealership-traffic": {
    title: "Automotive Brand Drives Dealership Traffic",
    industry: "Automotive",
    client: "Luxury Auto Group",
    challenge: "Dynamic creative optimization and location-based targeting to help a premium auto brand increase showroom visits by 156% during a competitive quarter.",
    solution: "Implemented geo-conquesting around competitor dealerships combined with drive-time targeting on major commuter routes with dynamic inventory showcasing.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop",
    results: [
      { metric: "Showroom Visits", value: "+156%" },
      { metric: "Test Drives", value: "+245%" },
      { metric: "ROI", value: "300%" },
      { metric: "Cost Per Visit", value: "-42%" }
    ],
    testimonial: "Moving Walls helped us completely transform our Q4 performance. The ability to target commuters and conquest competitor locations was game-changing.",
    author: "James Patterson",
    role: "Marketing Director",
    duration: "90 days",
    budget: "$250K",
    overview: "This luxury automotive brand was struggling to drive qualified traffic to their dealership network. Traditional advertising wasn't reaching the right audience at the right moments. They needed a smarter approach to reach in-market buyers.",
    objectives: [
      "Increase dealership foot traffic by 100%",
      "Improve test drive conversion rates",
      "Reduce cost per dealership visit",
      "Target in-market auto buyers effectively"
    ],
    approach: [
      "Analyzed movement patterns of luxury car buyers using anonymized mobile data",
      "Deployed screens along premium commuter routes during peak hours",
      "Implemented geo-conquesting around competitor dealerships",
      "Created dynamic creative showing nearest dealership and current offers"
    ],
    keyFeatures: [
      "Geo-conquesting around competitor locations",
      "Drive-time targeting on premium routes",
      "Dynamic inventory and offer display",
      "Dealership visit attribution"
    ]
  },
  "fintech-app-acquisition": {
    title: "Fintech App Acquisition at Scale",
    industry: "Finance",
    client: "NextGen Financial",
    challenge: "Leveraging transit advertising and mobile retargeting to drive 2M+ app downloads across Southeast Asia in 90 days for a new fintech platform.",
    solution: "Combined high-frequency transit placements with QR code activation and mobile retargeting to create a seamless download journey.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
    results: [
      { metric: "App Downloads", value: "2M+" },
      { metric: "Cost Per Install", value: "$0.85" },
      { metric: "Active Users", value: "1.2M" },
      { metric: "Markets", value: "6" }
    ],
    testimonial: "Outstanding performance. The quality of users acquired through this campaign exceeded our digital-only benchmarks significantly.",
    author: "Sarah Williams",
    role: "Head of Growth",
    duration: "90 days",
    budget: "$175K",
    overview: "This fintech startup was looking to rapidly scale user acquisition in Southeast Asia. They had proven product-market fit but needed to reach mass audiences efficiently while maintaining quality user acquisition costs.",
    objectives: [
      "Acquire 1 million app downloads in 90 days",
      "Maintain cost per install under $1.00",
      "Achieve 60% 30-day retention rate",
      "Build brand awareness in 6 key markets"
    ],
    approach: [
      "Identified high-density commuter touchpoints in financial districts",
      "Deployed interactive QR code campaigns with instant download incentives",
      "Implemented mobile retargeting for users who engaged but didn't convert",
      "Used A/B testing on creative messaging across markets"
    ],
    keyFeatures: [
      "QR code integration with app store deep linking",
      "Mobile retargeting integration",
      "Real-time download attribution",
      "Multi-market creative testing"
    ]
  },
  "healthcare-patient-reach": {
    title: "Healthcare Provider Reaches 2M Patients",
    industry: "Healthcare",
    client: "MedCare Network",
    challenge: "Increase awareness of preventive care services while maintaining strict HIPAA compliance and reaching diverse patient demographics.",
    solution: "Deployed a privacy-first targeting campaign focused on wellness messaging near healthcare facilities, pharmacies, and fitness centers.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
    results: [
      { metric: "Patient Reach", value: "2.1M" },
      { metric: "Appointments", value: "+78%" },
      { metric: "Cost Per Lead", value: "-42%" },
      { metric: "Website Traffic", value: "+124%" }
    ],
    testimonial: "Moving Walls understood our compliance requirements while delivering exceptional results. They made healthcare advertising simple and effective.",
    author: "Dr. Robert Chen",
    role: "Chief Marketing Officer",
    duration: "60 days",
    budget: "$95K",
    overview: "This healthcare network needed to promote preventive care services to increase patient engagement. The challenge was reaching the right audiences while maintaining strict privacy compliance and delivering health messaging effectively.",
    objectives: [
      "Reach 2 million potential patients in target demographics",
      "Increase preventive care appointment bookings by 50%",
      "Maintain full HIPAA compliance throughout campaign",
      "Reduce patient acquisition costs"
    ],
    approach: [
      "Used contextual targeting near health-relevant locations without personal data",
      "Deployed wellness-focused messaging during health awareness months",
      "Integrated with appointment booking system for attribution",
      "Created culturally relevant creative for diverse communities"
    ],
    keyFeatures: [
      "Privacy-first targeting methodology",
      "Contextual placement near health facilities",
      "Appointment booking attribution",
      "Multi-language creative support"
    ]
  },
  "tech-product-launch": {
    title: "Tech Company Launches Product with 10M Impressions",
    industry: "Technology",
    client: "InnovateTech Corp",
    challenge: "Create massive buzz for a new consumer tech product launch in a saturated market with limited time before competitor announcements.",
    solution: "Executed a high-impact campaign across major tech hubs with interactive displays, social integration, and influencer amplification.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    results: [
      { metric: "Impressions", value: "10.2M" },
      { metric: "Pre-orders", value: "12.5K" },
      { metric: "Website Visits", value: "+425%" },
      { metric: "Social Mentions", value: "50K+" }
    ],
    testimonial: "The campaign exceeded our wildest expectations. This was our most successful product launch ever, and OOH played a central role.",
    author: "Alex Kumar",
    role: "Product Marketing Lead",
    duration: "30 days",
    budget: "$200K",
    overview: "This tech company was launching a breakthrough consumer product but faced stiff competition from established players. They needed to create significant awareness quickly and drive pre-orders before competitors could respond.",
    objectives: [
      "Generate 10 million impressions in launch markets",
      "Drive 10,000+ pre-orders in first 30 days",
      "Create viral social media buzz around launch",
      "Establish brand presence in key tech corridors"
    ],
    approach: [
      "Secured premium placements in Silicon Valley, NYC, and other tech hubs",
      "Created interactive installations with product demos",
      "Integrated social sharing mechanics with UGC incentives",
      "Coordinated with digital and PR for amplification"
    ],
    keyFeatures: [
      "Interactive product demonstration displays",
      "Social media integration and UGC capture",
      "Real-time impression and engagement tracking",
      "Coordinated omnichannel launch support"
    ]
  },
  "bank-branch-visits": {
    title: "Regional Bank Increases Branch Visits by 67%",
    industry: "Finance",
    client: "Community Trust Bank",
    challenge: "Drive awareness of new branch locations and digital banking services in a market dominated by national banks with larger marketing budgets.",
    solution: "Implemented hyperlocal targeting around new branches combined with community-focused messaging and financial education content.",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=800&fit=crop",
    results: [
      { metric: "Branch Visits", value: "+67%" },
      { metric: "New Accounts", value: "+142%" },
      { metric: "Digital Adoption", value: "+89%" },
      { metric: "Brand Recall", value: "+73%" }
    ],
    testimonial: "Moving Walls helped us successfully compete against much larger banks. The hyperlocal approach was perfect for our community-focused strategy.",
    author: "Thomas Anderson",
    role: "Regional Marketing Director",
    duration: "90 days",
    budget: "$145K",
    overview: "This regional bank was expanding into new markets with 5 new branches. They needed to build awareness and trust quickly in communities where national banks had established presence and larger marketing budgets.",
    objectives: [
      "Drive 50% increase in branch foot traffic",
      "Open 1,000+ new accounts across new branches",
      "Build brand awareness in local communities",
      "Promote digital banking adoption"
    ],
    approach: [
      "Deployed screens within 5-mile radius of each new branch",
      "Created community-specific messaging highlighting local involvement",
      "Promoted financial literacy workshops and community events",
      "Integrated mobile banking app download campaigns"
    ],
    keyFeatures: [
      "Hyperlocal targeting by branch location",
      "Community event promotion integration",
      "Mobile app download tracking",
      "Branch visit attribution"
    ]
  }
};

interface CaseStudyClientProps {
  slug: string;
}

export default function CaseStudyClient({ slug }: CaseStudyClientProps) {
  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mw-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-mw-gray-600 mb-8">The case study you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-mw-blue-600 text-white font-medium rounded-lg hover:bg-mw-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 h-[500px]">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Case Studies
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {caseStudy.industry}
              </span>
              <span className="text-white/80 text-sm">{caseStudy.duration} Campaign</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {caseStudy.client}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="py-12 bg-mw-blue-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{result.value}</div>
                <div className="text-blue-100">{result.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">Overview</h2>
                <p className="text-mw-gray-600 leading-relaxed">{caseStudy.overview}</p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">The Challenge</h2>
                <p className="text-mw-gray-600 leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>

              {/* Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">Objectives</h2>
                <ul className="space-y-3">
                  {caseStudy.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-mw-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-mw-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">Our Approach</h2>
                <div className="space-y-4">
                  {caseStudy.approach.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-mw-blue-100 text-mw-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-mw-gray-600 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">The Solution</h2>
                <p className="text-mw-gray-600 leading-relaxed">{caseStudy.solution}</p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-mw-gray-900 mb-4">Key Features Used</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {caseStudy.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-mw-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-mw-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-mw-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Campaign Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-mw-gray-50 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-mw-gray-900 mb-4">Campaign Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-mw-gray-500">Client</p>
                      <p className="font-medium text-mw-gray-900">{caseStudy.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-mw-gray-500">Industry</p>
                      <p className="font-medium text-mw-gray-900">{caseStudy.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-mw-gray-500">Duration</p>
                      <p className="font-medium text-mw-gray-900">{caseStudy.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-mw-gray-500">Investment</p>
                      <p className="font-medium text-mw-gray-900">{caseStudy.budget}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-mw-blue-600 rounded-2xl p-6 text-white"
                >
                  <svg className="w-8 h-8 text-blue-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-white/90 mb-4 leading-relaxed">
                    &quot;{caseStudy.testimonial}&quot;
                  </blockquote>
                  <div>
                    <p className="font-semibold">{caseStudy.author}</p>
                    <p className="text-blue-200 text-sm">{caseStudy.role}</p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-mw-gray-900 rounded-2xl p-6 text-white"
                >
                  <h3 className="font-bold mb-2">Ready to achieve similar results?</h3>
                  <p className="text-mw-gray-400 text-sm mb-4">Let&apos;s discuss how we can help transform your advertising.</p>
                  <Link
                    href="/contact"
                    className="block w-full py-3 bg-mw-blue-600 text-white font-medium rounded-lg text-center hover:bg-mw-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Case Studies */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">More Case Studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(caseStudiesData)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, study]) => (
                <Link
                  key={key}
                  href={`/resources/case-studies/${key}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-white/90 text-mw-gray-800 text-xs font-medium rounded-full">
                        {study.industry}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-mw-gray-900 group-hover:text-mw-blue-600 transition-colors">
                      {study.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-mw-blue-600 font-semibold hover:gap-3 transition-all"
            >
              View All Case Studies
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
