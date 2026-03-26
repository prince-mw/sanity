"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface PricingPlan {
  _key: string;
  name?: string;
  description?: string;
  price?: string;
  period?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingSectionProps {
  heading?: string;
  subheading?: string;
  plans?: PricingPlan[];
  backgroundColor?: BackgroundColor;
}

export function PricingSection({
  heading,
  subheading,
  plans,
  backgroundColor = 'white',
}: PricingSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  if (!plans || plans.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 ${bgClasses}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {heading && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg ${subtextColor}`}>
                {subheading}
              </p>
            )}
          </motion.div>
        )}

        {/* Pricing Cards */}
        <div className={`grid md:grid-cols-${Math.min(plans.length, 3)} lg:grid-cols-${plans.length} gap-8 max-w-6xl mx-auto`}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan._key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.highlighted 
                  ? 'bg-mw-blue-600 text-white ring-4 ring-mw-blue-600 ring-offset-4' 
                  : isDark 
                    ? 'bg-white/10' 
                    : 'bg-white shadow-lg border border-gray-100'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    plan.highlighted 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-mw-blue-600 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              {plan.name && (
                <h3 className={`text-xl font-semibold mb-2 ${
                  plan.highlighted ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
              )}

              {/* Description */}
              {plan.description && (
                <p className={`text-sm mb-6 ${
                  plan.highlighted ? 'text-white/80' : isDark ? 'text-white/70' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className={`text-4xl font-bold ${
                  plan.highlighted ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${
                    plan.highlighted ? 'text-white/80' : isDark ? 'text-white/70' : 'text-gray-600'
                  }`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg 
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? 'text-white' : 'text-mw-blue-600'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-white/90' : isDark ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button */}
              {plan.ctaText && plan.ctaLink && (
                <CTAButton
                  href={plan.ctaLink}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-mw-blue-600 hover:bg-gray-100'
                      : 'bg-mw-blue-600 text-white hover:bg-mw-blue-700'
                  }`}
                >
                  {plan.ctaText}
                </CTAButton>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
