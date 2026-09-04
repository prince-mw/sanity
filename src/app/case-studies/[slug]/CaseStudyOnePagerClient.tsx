"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";

interface CaseStudy {
  slug: string;
  title: string;
  brand: string;
  clientLogo?: string;
  country: string;
  industry: string;
  content: string;
  metrics?: Array<{ label: string; value: string }>;
  featuredImage: string;
  date: string;
  titleHighlight?: string;
  categoryBadge?: string;
  metaLine?: string;
  challenge?: string;
  whatWeDid?: string[];
  whyItWorked?: string;
}

interface CaseStudyOnePagerClientProps {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudy[];
}

const BADGE_LABELS: Record<string, string> = {
  "measurement-brand-lift": "Measurement & Brand Lift",
  "platform-adoption": "Platform Adoption",
  campaign: "Campaign",
  partnership: "Partnership",
  "retail-media-data": "Retail Media & Data",
};

// Matches the deck: most badges are MW blue, Retail Media & Data and Partnership are orange/red.
const WARM_BADGES = new Set(["retail-media-data", "partnership"]);

export default function CaseStudyOnePagerClient({ caseStudy, relatedCaseStudies }: CaseStudyOnePagerClientProps) {
  const badgeLabel = (caseStudy.categoryBadge && BADGE_LABELS[caseStudy.categoryBadge]) || caseStudy.industry;
  const isWarmBadge = caseStudy.categoryBadge ? WARM_BADGES.has(caseStudy.categoryBadge) : false;
  const metrics = caseStudy.metrics || [];
  const whatWeDid = caseStudy.whatWeDid || [];

  const colsClass =
    metrics.length >= 4 ? "sm:grid-cols-4" : metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  // Split the title around the highlighted phrase (if any) and color that phrase blue.
  const renderTitle = () => {
    if (!caseStudy.titleHighlight) return caseStudy.title;
    const idx = caseStudy.title.indexOf(caseStudy.titleHighlight);
    if (idx === -1) return caseStudy.title;
    const before = caseStudy.title.slice(0, idx);
    const highlighted = caseStudy.title.slice(idx, idx + caseStudy.titleHighlight.length);
    const after = caseStudy.title.slice(idx + caseStudy.titleHighlight.length);
    return (
      <>
        {before}
        <span className="text-mw-blue-600">{highlighted}</span>
        {after}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / one-pager card */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-mw-gray-500 mb-8">
            <Link href="/case-studies" className="hover:text-mw-blue-600 transition-colors">
              Case Studies
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                isWarmBadge ? "bg-orange-500 text-white" : "bg-mw-blue-600 text-white"
              }`}
            >
              {badgeLabel}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-4 leading-[1.4] max-w-4xl">
              {renderTitle()}
            </h1>

            {/* Meta line */}
            {caseStudy.metaLine && (
              <p className="text-mw-gray-500 text-sm sm:text-base mb-8">{caseStudy.metaLine}</p>
            )}

            <div className="border-t border-mw-gray-200 mb-10" />

            {/* Challenge + What We Did / Visual */}
            <div className="grid lg:grid-cols-5 gap-10 mb-10">
              <div className="lg:col-span-3 space-y-8">
                {caseStudy.challenge && (
                  <div>
                    <h2 className="flex items-center gap-2 text-mw-blue-600 font-bold text-sm tracking-wide uppercase mb-3">
                      <span>&#9656;</span> The Challenge
                    </h2>
                    <p className="text-mw-gray-700 leading-relaxed">{caseStudy.challenge}</p>
                  </div>
                )}

                {whatWeDid.length > 0 && (
                  <div>
                    <h2 className="flex items-center gap-2 text-mw-blue-600 font-bold text-sm tracking-wide uppercase mb-3">
                      <span>&#9656;</span> What We Did
                    </h2>
                    <ul className="space-y-2">
                      {whatWeDid.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-mw-gray-700 leading-relaxed">
                          <span className="text-mw-blue-500 mt-1 flex-shrink-0">&#9656;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {caseStudy.featuredImage && (
                <div className="lg:col-span-2">
                  <div className="rounded-2xl overflow-hidden shadow-mw-lg bg-mw-gray-100 relative w-full aspect-video">
                    <Image
                      src={caseStudy.featuredImage}
                      alt={caseStudy.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Why it worked */}
            {caseStudy.whyItWorked && (
              <div className="bg-mw-blue-50 border-l-4 border-mw-blue-500 rounded-r-xl p-6 mb-10">
                <p className="text-mw-gray-800 leading-relaxed">
                  <span className="font-bold text-mw-blue-700">Why it worked: </span>
                  {caseStudy.whyItWorked}
                </p>
              </div>
            )}

            {/* Proof stats */}
            {metrics.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 text-mw-blue-600 font-bold text-sm tracking-wide uppercase mb-4">
                  <span>&#9656;</span> The Proof
                </h2>
                <div className={`grid grid-cols-2 ${colsClass} gap-4`}>
                  {metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-mw-blue-700 to-mw-blue-900 rounded-xl p-6 text-center"
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-xs sm:text-sm text-blue-100">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer brand bar — mirrors the deck's closing bar */}
      <section className="bg-gradient-to-r from-mw-blue-600 via-mw-blue-700 to-mw-blue-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-sm text-white">
          <span className="font-semibold">
            {caseStudy.brand ? `${caseStudy.brand} × Moving Walls` : "Moving Walls"}
            {caseStudy.country ? ` · ${caseStudy.country}` : ""}
          </span>
          <span className="text-blue-100">
            Source: campaign reporting {caseStudy.date ? `· ${caseStudy.date}` : ""} · movingwalls.com
          </span>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-mw-gray-900 mb-8">Related Case Studies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCaseStudies.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/case-studies/${related.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-mw-sm hover:shadow-mw-lg transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-mw-blue-500 to-mw-blue-700 relative overflow-hidden">
                      {related.featuredImage && (
                        <Image src={related.featuredImage} alt={related.title} fill className="object-cover" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-mw-blue-600 text-xs font-medium rounded-full">
                          {related.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-mw-gray-900 mb-3 group-hover:text-mw-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <div className="flex items-center justify-between pt-4 border-t border-mw-gray-200">
                        <span className="text-sm text-mw-gray-500">{related.country}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-mw-gray-900 to-mw-gray-800 rounded-2xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Achieve Similar Results?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how Moving Walls can help you transform your advertising strategy and drive measurable results.
            </p>
            <CTAButton
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
