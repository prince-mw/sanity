"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getBackgroundClasses, getTextColorClasses, getSubtextColorClasses, type BackgroundColor } from "./utils";

interface FAQItem {
  _key: string;
  question?: string;
  answer?: string;
}

interface FAQSectionProps {
  heading?: string;
  subheading?: string;
  items?: FAQItem[];
  faqItems?: FAQItem[];
  layout?: 'single' | 'twoColumn';
  backgroundColor?: BackgroundColor;
}

function FAQItem({ item, isOpen, onClick, isDark }: { item: FAQItem; isOpen: boolean; onClick: () => void; isDark: boolean }) {
  return (
    <div className={`border-b ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 ml-4 ${isDark ? 'text-white' : 'text-gray-500'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`pb-5 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({
  heading,
  subheading,
  items,
  faqItems,
  layout = 'single',
  backgroundColor = 'white',
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const bgClasses = getBackgroundClasses(backgroundColor);
  const textColor = getTextColorClasses(backgroundColor);
  const subtextColor = getSubtextColorClasses(backgroundColor);
  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  // Use faqItems if provided, otherwise use items
  const faqData = faqItems || items;

  if (!faqData || faqData.length === 0) return null;

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  // Split items for two column layout
  const midpoint = Math.ceil(faqData.length / 2);
  const leftColumn = faqData.slice(0, midpoint);
  const rightColumn = faqData.slice(midpoint);

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

        {/* FAQ Items */}
        {layout === 'single' ? (
          <div className="max-w-3xl mx-auto">
            {faqData.map((item) => (
              <FAQItem
                key={item._key}
                item={item}
                isOpen={openItems.has(item._key)}
                onClick={() => toggleItem(item._key)}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              {leftColumn.map((item) => (
                <FAQItem
                  key={item._key}
                  item={item}
                  isOpen={openItems.has(item._key)}
                  onClick={() => toggleItem(item._key)}
                  isDark={isDark}
                />
              ))}
            </div>
            <div>
              {rightColumn.map((item) => (
                <FAQItem
                  key={item._key}
                  item={item}
                  isOpen={openItems.has(item._key)}
                  onClick={() => toggleItem(item._key)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
