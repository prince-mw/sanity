"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";

export default function Products() {
  const { t } = useLocale();
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const workflowStages = [
    { 
      id: "plan", 
      label: t('landingPage.products.stages.plan'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    { 
      id: "create", 
      label: t('landingPage.products.stages.create'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    { 
      id: "buy", 
      label: t('landingPage.products.stages.buy'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: "activate", 
      label: t('landingPage.products.stages.activate'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: "measure", 
      label: t('landingPage.products.stages.measure'), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const mwProducts = [
    {
      id: 1,
      name: "MW Planner",
      stage: "plan",
      stageLabel: t('landingPage.products.mwPlanner.stageLabel'),
      description: t('landingPage.products.mwPlanner.description'),
      outcome: t('landingPage.products.mwPlanner.outcome'),
      bgColor: "from-blue-500 to-blue-700",
      borderColor: "border-blue-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      href: "/products/mw-planner",
      popular: true
    },
    {
      id: 2,
      name: "MW Studio",
      stage: "create",
      stageLabel: t('landingPage.products.mwStudio.stageLabel'),
      description: t('landingPage.products.mwStudio.description'),
      outcome: t('landingPage.products.mwStudio.outcome'),
      bgColor: "from-purple-500 to-purple-700",
      borderColor: "border-purple-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      href: "/products/mw-studio"
    },
    {
      id: 3,
      name: "MW Market",
      stage: "buy",
      stageLabel: t('landingPage.products.mwMarket.stageLabel'),
      description: t('landingPage.products.mwMarket.description'),
      outcome: t('landingPage.products.mwMarket.outcome'),
      bgColor: "from-slate-500 to-slate-700",
      borderColor: "border-slate-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: "/products/mw-market"
    },
    {
      id: 4,
      name: "MW Influence",
      stage: "buy",
      stageLabel: t('landingPage.products.mwInfluence.stageLabel'),
      description: t('landingPage.products.mwInfluence.description'),
      outcome: t('landingPage.products.mwInfluence.outcome'),
      bgColor: "from-indigo-500 to-indigo-700",
      borderColor: "border-indigo-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      href: "/products/mw-influence",
      popular: true
    },
    {
      id: 5,
      name: "MW Activate",
      stage: "activate",
      stageLabel: t('landingPage.products.mwActivate.stageLabel'),
      description: t('landingPage.products.mwActivate.description'),
      outcome: t('landingPage.products.mwActivate.outcome'),
      bgColor: "from-cyan-500 to-cyan-700",
      borderColor: "border-cyan-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: "/products/mw-activate"
    },
    {
      id: 6,
      name: "MW Measure",
      stage: "measure",
      stageLabel: t('landingPage.products.mwMeasure.stageLabel'),
      description: t('landingPage.products.mwMeasure.description'),
      outcome: t('landingPage.products.mwMeasure.outcome'),
      bgColor: "from-emerald-500 to-emerald-700",
      borderColor: "border-emerald-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/products/mw-measure",
    }
  ];

  const toggleProduct = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-mw-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mw-blue-600 text-sm font-medium uppercase tracking-wider">
            {t('landingPage.products.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mw-gray-900 mt-4 mb-6">
            {t('landingPage.products.title')}
          </h2>
          <p className="text-mw-gray-600 text-lg mb-8 max-w-4xl mx-auto">
            {t('landingPage.products.description')}
          </p>
        </motion.div>

        {/* Workflow Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-mw-gray-200 hidden md:block" />
            
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-mw-blue-600 to-mw-blue-500 hidden md:block"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />

            {/* Stage Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
              {workflowStages.map((stage, index) => {
                const isActive = activeStage === stage.id;
                const hasProducts = mwProducts.some(p => p.stage === stage.id);
                
                return (
                  <motion.button
                    key={stage.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onMouseLeave={() => setActiveStage(null)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-mw-blue-600 shadow-mw-lg scale-105'
                        : 'bg-white hover:bg-mw-blue-50'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-white text-mw-blue-600 scale-110' : 'bg-mw-gray-100 text-mw-gray-700'
                    }`}>
                      {stage.icon}
                    </div>
                    <span className={`font-semibold text-sm ${
                      isActive ? 'text-white' : 'text-mw-gray-900'
                    }`}>
                      {stage.label}
                    </span>
                    {hasProducts && (
                      <span className={`text-xs ${
                        isActive ? 'text-blue-100' : 'text-mw-gray-500'
                      }`}>
                        {mwProducts.filter(p => p.stage === stage.id).length} {t('landingPage.products.productsLabel')}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Products - Diagonal Overlapping Cards */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mwProducts.map((product, index) => {
              const isHighlighted = activeStage === product.stage;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative group cursor-pointer ${
                    isHighlighted ? 'z-20 scale-105' : 'z-10'
                  }`}
                >
                  <Link href={product.href}>
                    <div className={`relative bg-white rounded-2xl p-8 shadow-mw-lg hover:shadow-mw-xl transition-all duration-300 border ${product.borderColor} overflow-hidden`}>
                      {/* Icon */}
                      <div className={`mb-4 bg-gradient-to-br ${product.bgColor} inline-flex p-3 rounded-xl text-white`}>{product.icon}</div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-mw-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-mw-gray-600 mb-3 font-medium uppercase tracking-wider">
                        {product.stageLabel}
                      </p>
                      <p className="text-mw-gray-700 text-sm mb-6 leading-relaxed min-h-[60px]">
                        {product.description}
                      </p>

                      {/* CTA Arrow */}
                      <div className="flex items-center justify-between">
                        <span className="text-mw-gray-900 font-medium text-sm group-hover:translate-x-2 transition-transform">
                          {t('landingPage.products.learnMore')}
                        </span>
                        <svg className="w-5 h-5 text-mw-gray-900 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Build Your Stack CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-mw-blue-600 to-mw-blue-700 rounded-2xl p-8 md:p-12 text-center shadow-mw-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {selectedProducts.length > 0 
              ? `${t('landingPage.products.cta.buildCustomStack')} (${selectedProducts.length} ${t('landingPage.products.cta.productsSelected')})`
              : t('landingPage.products.cta.readyToTransform')
            }
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {selectedProducts.length > 0
              ? t('landingPage.products.cta.getPersonalizedDemo')
              : t('landingPage.products.cta.selectProducts')
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-mw-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-mw-md hover:shadow-mw-lg inline-flex items-center justify-center gap-2"
            >
              {selectedProducts.length > 0 ? t('landingPage.products.cta.getCustomQuote') : t('landingPage.products.cta.startFreeTrial')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30">
              {t('landingPage.products.cta.scheduleDemo')}
            </button>
          </div>
          {selectedProducts.length > 0 && (
            <button
              onClick={() => setSelectedProducts([])}
              className="mt-4 text-white/80 hover:text-white text-sm underline"
            >
              {t('landingPage.products.cta.clearSelection')}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
