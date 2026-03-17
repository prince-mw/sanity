"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "./ContactForm";

interface FinancePageProps {
  badgeText?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  benefits?: Array<{ title: string; description: string }>;
  services?: Array<{ title: string; description: string; offerings?: string[] }>;
  trustFactors?: Array<{ metric: string; description: string }>;
  heroStats?: Array<{ value: string; label: string }>;
}

// Helper to get benefit icon based on title
const BenefitIcon = ({ title }: { title: string }) => {
  if (title.toLowerCase().includes('trust')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21l-9 6-9-6h7.5z" /></svg>;
  }
  if (title.toLowerCase().includes('growth') || title.toLowerCase().includes('drive')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
  }
  if (title.toLowerCase().includes('target') || title.toLowerCase().includes('demographic')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
  }
  if (title.toLowerCase().includes('security') || title.toLowerCase().includes('safe')) {
    return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
  }
  return <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};

// Helper to get service icon based on title
const ServiceIcon = ({ title }: { title: string }) => {
  if (title.toLowerCase().includes('bank')) {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21l-9 6-9-6h7.5z" /></svg>;
  }
  if (title.toLowerCase().includes('invest')) {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
  }
  if (title.toLowerCase().includes('insurance')) {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
  }
  if (title.toLowerCase().includes('fintech') || title.toLowerCase().includes('digital')) {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  }
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};

export default function FinancePageClient({
  badgeText,
  title,
  titleHighlight,
  subtitle,
  benefits: propBenefits,
  services: propServices,
  trustFactors: propTrustFactors,
  heroStats,
}: FinancePageProps) {
  const content = {
    badgeText: badgeText || "Finance & Banking",
    title: title || "Build Trust &",
    titleHighlight: titleHighlight || "Drive Growth",
    subtitle: subtitle || "Transform your financial services marketing with strategic out-of-home campaigns that build trust, credibility, and drive customer acquisition in the competitive finance sector.",
  };

  const benefits = propBenefits?.length ? propBenefits : [
    {
      title: "Build Financial Trust",
      description: "Establish credibility and reliability in financial services"
    },
    {
      title: "Drive Account Growth",
      description: "Increase new account openings and customer acquisition"
    },
    {
      title: "Target Demographics",
      description: "Reach specific financial planning segments effectively"
    },
    {
      title: "Security Messaging",
      description: "Communicate safety and security of financial services"
    }
  ];

  const services = propServices?.length ? propServices : [
    {
      title: "Banking & Credit Unions",
      description: "Drive branch visits and account openings with local community focus",
      offerings: ["Branch Promotion", "Account Acquisition", "Loan Services", "Community Banking"]
    },
    {
      title: "Investment Services",
      description: "Build trust for wealth management and investment advisory services",
      offerings: ["Wealth Management", "Retirement Planning", "Investment Education", "Advisory Services"]
    },
    {
      title: "Insurance Companies",
      description: "Increase policy sales and brand awareness for insurance products",
      offerings: ["Life Insurance", "Auto Insurance", "Home Insurance", "Business Insurance"]
    },
    {
      title: "Fintech & Digital Banking",
      description: "Promote digital financial services and mobile banking solutions",
      offerings: ["Mobile Banking", "Digital Payments", "Cryptocurrency", "Personal Finance"]
    }
  ];

  const trustFactors = propTrustFactors?.length ? propTrustFactors : [
    { metric: "73%", description: "of consumers trust brands with local advertising" },
    { metric: "2.5x", description: "higher consideration for financial services" },
    { metric: "45%", description: "increase in brand trust and reliability" },
    { metric: "89%", description: "recognize financial brands from OOH campaigns" }
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
                  href="#services"
                  className="px-6 py-3 border border-mw-gray-300 hover:bg-mw-gray-50 text-mw-gray-700 font-medium rounded-lg transition-colors"
                >
                  View Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Financial Marketing ROI</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold mb-1">$4.20</div>
                    <div className="text-mw-blue-100">return for every $1 spent on OOH</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">68%</div>
                    <div className="text-mw-blue-100">increase in branch visits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">156%</div>
                    <div className="text-mw-blue-100">boost in brand awareness</div>
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
              Why Financial Brands Choose MovingWalls
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Build customer trust and drive business growth with advertising that communicates stability and reliability.
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Financial Services We Support
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-mw-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-mw-blue-600"><ServiceIcon title={service.title} /></div>
                  <h3 className="text-xl font-bold text-mw-gray-900">{service.title}</h3>
                </div>
                <p className="text-mw-gray-600 mb-6">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {(service.offerings || []).map((offering, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-mw-blue-600 rounded-full"></div>
                      <span className="text-mw-gray-700 text-sm">{offering}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-mw-gray-900 mb-4">
              Financial Trust & Performance Metrics
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-mw-blue-50 rounded-xl border border-mw-blue-200"
              >
                <div className="text-4xl font-bold text-mw-blue-600 mb-2">{factor.metric}</div>
                <p className="text-mw-gray-600">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-mw-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-6">Regulatory Compliant Advertising</h2>
              <p className="text-lg text-mw-gray-600 mb-8 max-w-3xl mx-auto">
                All financial advertising campaigns comply with industry regulations including FDIC, SEC, 
                and state banking requirements to ensure your brand messaging meets all compliance standards.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Regulatory Compliant</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Secure Messaging</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-mw-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-mw-gray-900">Legal Review</h3>
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
              Ready to Build Financial Trust?
            </h2>
            <p className="text-lg text-mw-blue-100 mb-8">
              Partner with us to create financial campaigns that build credibility and drive customer acquisition.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-mw-gray-50 transition-colors shadow-mw-md"
            >
              Start Your Financial Campaign
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