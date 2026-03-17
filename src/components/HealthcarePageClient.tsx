"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "./ContactForm";

interface HealthcarePageProps {
  badgeText?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  benefits?: Array<{ title: string; description: string }>;
  solutions?: Array<{ title: string; description: string; services?: string[] }>;
  heroStats?: Array<{ value: string; label: string }>;
}

// Helper to get benefit icon based on title
const BenefitIcon = ({ title }: { title: string }) => {
  if (title.toLowerCase().includes('trust') || title.toLowerCase().includes('patient')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
  }
  if (title.toLowerCase().includes('local') || title.toLowerCase().includes('community')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  }
  if (title.toLowerCase().includes('awareness') || title.toLowerCase().includes('health')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
  }
  if (title.toLowerCase().includes('emergency') || title.toLowerCase().includes('urgent')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};

export default function HealthcarePageClient({
  badgeText,
  title,
  titleHighlight,
  subtitle,
  benefits: propBenefits,
  solutions: propSolutions,
  heroStats,
}: HealthcarePageProps) {
  const content = {
    badgeText: badgeText || "Healthcare Marketing",
    title: title || "Connect with Patients",
    titleHighlight: titleHighlight || "Effectively",
    subtitle: subtitle || "Build trust, increase awareness, and drive patient engagement with healthcare advertising that reaches your community where they live, work, and travel.",
  };

  const benefits = propBenefits?.length ? propBenefits : [
    {
      title: "Build Patient Trust",
      description: "Establish credibility and trust in your healthcare services"
    },
    {
      title: "Local Community Focus",
      description: "Connect with patients in your service area effectively"
    },
    {
      title: "Health Awareness",
      description: "Educate communities about health services and prevention"
    },
    {
      title: "Emergency Services",
      description: "Promote urgent care and emergency services when needed"
    }
  ];

  const solutions = propSolutions?.length ? propSolutions : [
    {
      title: "Hospital & Health Systems",
      description: "Build community trust and drive patient acquisition for health systems",
      services: ["Brand Awareness", "Service Promotion", "Community Outreach", "Emergency Care"]
    },
    {
      title: "Specialist Practices",
      description: "Increase referrals and direct patient visits for specialized healthcare",
      services: ["Specialist Referrals", "Direct Patient Marketing", "Condition Awareness", "Treatment Education"]
    },
    {
      title: "Wellness & Prevention",
      description: "Promote preventive care and wellness programs to improve community health",
      services: ["Vaccination Campaigns", "Screening Programs", "Wellness Education", "Lifestyle Programs"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-6">
                <span className="text-mw-blue-600 text-sm font-medium">{content.badgeText}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
                {content.title}
                <span className="text-mw-blue-600 block">{content.titleHighlight}</span>
              </h1>
              <p className="text-lg text-mw-gray-600 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors shadow-mw-md"
                >
                  Start Campaign
                </Link>
                <Link
                  href="#solutions"
                  className="px-6 py-3 border border-mw-gray-300 hover:bg-mw-gray-50 text-mw-gray-700 font-medium rounded-lg transition-colors"
                >
                  View Solutions
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Healthcare Trust Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold mb-1">89%</div>
                    <div className="text-mw-blue-100">trust healthcare brands with local presence</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">65%</div>
                    <div className="text-mw-blue-100">influenced by OOH for health decisions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">2.8x</div>
                    <div className="text-mw-blue-100">higher patient acquisition rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Why Healthcare Providers Choose Moving Walls
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Build community trust and patient relationships with sensitive, effective healthcare advertising.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white border border-mw-gray-200 shadow-mw-sm hover:shadow-mw-md transition-shadow"
              >
                <div className="text-mw-blue-600 mb-4 flex justify-center"><BenefitIcon title={benefit.title} /></div>
                <h3 className="text-xl font-semibold text-mw-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-mw-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Healthcare Advertising Solutions
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-mw-md"
              >
                <h3 className="text-xl font-bold text-mw-gray-900 mb-4">{solution.title}</h3>
                <p className="text-mw-gray-600 mb-6">{solution.description}</p>
                <div className="space-y-3">
                  {(solution.services || []).map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-mw-blue-600 rounded-full"></div>
                      <span className="text-mw-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mw-blue-50 rounded-2xl p-12 border border-mw-blue-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-6">HIPAA-Compliant Advertising</h2>
              <p className="text-lg text-mw-gray-600 mb-8 max-w-3xl mx-auto">
                All our healthcare advertising campaigns are designed with privacy and compliance in mind, 
                ensuring your patient information and marketing efforts meet all regulatory requirements.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Privacy Protected</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Compliant Process</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Expert Team</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-mw-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Reach More Patients?
            </h2>
            <p className="text-lg text-mw-blue-100 mb-8">
              Let's create healthcare campaigns that build trust and drive patient engagement in your community.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-mw-gray-50 transition-colors shadow-mw-md"
            >
              Start Your Healthcare Campaign
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}