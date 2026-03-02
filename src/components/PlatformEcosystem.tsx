"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";

// Data Source Card Component
const DataSourceCard = ({ icon, label, index }: { icon: React.ReactNode; label: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-center gap-2 relative w-full"
  >
    <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 shadow-sm border border-gray-200 hover:border-cyan-400 hover:shadow-md transition-all cursor-default w-full">
      <div className="text-cyan-500 text-sm">{icon}</div>
      <span className="text-xs font-medium text-gray-700 flex-1">{label}</span>
    </div>
  </motion.div>
);

// Output Card Component
const OutputCard = ({ icon, label, index }: { icon: React.ReactNode; label: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
    className="flex items-center gap-2 relative w-full"
  >
    <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 shadow-sm border border-gray-200 hover:border-violet-400 hover:shadow-md transition-all cursor-default w-full">
      <div className="text-sm" style={{ color: '#8B5CF6' }}>{icon}</div>
      <span className="text-xs font-medium text-gray-700 flex-1">{label}</span>
    </div>
  </motion.div>
);

// AI Step Component
const AIStep = ({ icon, label, index }: { icon: React.ReactNode; label: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
    className="flex flex-col items-center gap-2"
  >
    <div className="w-14 h-14 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-600">{label}</span>
  </motion.div>
);

// Product Card Component
const ProductCard = ({ icon, label, href, index }: { icon: React.ReactNode; label: string; href: string; index: number }) => {
  const parts = label.split(' ');
  const prefix = parts[0];
  const productName = parts.slice(1).join(' ');
  
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
      className="relative flex flex-col items-center gap-2 bg-white border border-dashed border-blue-400 rounded-md px-4 py-4 text-gray-800 hover:border-blue-600 hover:bg-blue-50 transition-all hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Shimmer flash animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 1.5,
          delay: 2 + index * 0.15,
          repeat: Infinity,
          repeatDelay: 13.5,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)",
          width: "50%",
        }}
      />
      <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center relative z-10">
        {icon}
      </div>
      <div className="text-center relative z-10">
        <div className="text-xs font-semibold text-gray-500">{prefix}</div>
        <div className="text-xs font-semibold text-gray-800">{productName}</div>
      </div>
    </motion.a>
  );
};

export default function PlatformEcosystem() {
  const [isClient, setIsClient] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dataSources = [
    { icon: <UsersIcon />, label: "Audience Data" },
    { icon: <MapPinIcon />, label: "Location" },
    { icon: <ChartIcon />, label: "Traffic Patterns" },
    { icon: <CloudIcon />, label: "Weather Data" },
    { icon: <UserGroupIcon />, label: "Demographics" },
    { icon: <BuildingIcon />, label: "POI Data" },
    { icon: <DeviceIcon />, label: "Mobile Signals" },
    { icon: <CalendarIcon />, label: "Event Calendars" },
    { icon: <DatabaseIcon />, label: "Any Data Source" },
  ];

  const aiSteps = [
    { icon: <PlanIcon />, label: "Planning" },
    { icon: <OptimizeIcon />, label: "Optimization" },
    { icon: <TargetIcon />, label: "Targeting" },
    { icon: <MeasureIcon />, label: "Attribution" },
    { icon: <MeasureIcon />, label: "Measure" },
  ];

  const outputs = [
    { icon: <IntegrationIcon />, label: "Integrations" },
    { icon: <AnalyticsIcon />, label: "Analytics" },
    { icon: <ReportIcon />, label: "Reporting" },
    { icon: <APIAccessIcon />, label: "API Access" },
    { icon: <InsightsIcon />, label: "Insights" },
    { icon: <AudienceProfileIcon />, label: "Audience" },
    { icon: <CampaignPerfIcon />, label: "Performance" },
    { icon: <MediaPlanIcon />, label: "Media Plans" },
    { icon: <ForecastIcon />, label: "Forecasting" },
  ];

  const products = [
    { icon: <PlannerIcon />, label: "MW Planner", href: "/products/mw-planner" },
    { icon: <MeasureProductIcon />, label: "MW Measure", href: "/products/mw-measure" },
    { icon: <ReachIcon />, label: "MW Influence", href: "/products/mw-influence" },
    { icon: <ActivateIcon />, label: "MW Activate", href: "/products/mw-activate" },
    { icon: <ScienceIcon />, label: "MW Science", href: "/products/mw-science" },
    { icon: <StudioIcon />, label: "MW Studio", href: "/products/mw-studio" },
    { icon: <MarketplaceIcon />, label: "MW Market", href: "/products/mw-market" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — Editorial Style */}
        <div className="text-center mb-16">
          {/* Badge & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-mw-blue-600 text-sm font-medium uppercase tracking-wider mb-4">
              {t('landingPage.platformEcosystem.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('landingPage.platformEcosystem.title')}
            </h2>
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            {t('landingPage.platformEcosystem.intro')}
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-300" />
            <div className="w-2 h-2 rounded-full bg-mw-blue-400" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-300" />
          </motion.div>

          {/* Two Column Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-12 text-left"
          >
            <p className="text-base text-gray-600 leading-relaxed">
              {t('landingPage.platformEcosystem.cards.data.description')}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              {t('landingPage.platformEcosystem.cards.execute.description')}
            </p>
          </motion.div>

          {/* Scenario — Subtle Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12 bg-gray-50 border-l-4 border-mw-blue-500 rounded-r-xl px-8 py-6 text-left"
          >
            <p className="text-base text-gray-700 leading-relaxed">
              {t('landingPage.platformEcosystem.scenario.description')}
            </p>
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 max-w-3xl mx-auto leading-snug mb-10"
          >
            &ldquo;{t('landingPage.platformEcosystem.quote')}&rdquo;
          </motion.p>

          {/* Products — Dot Separated */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-2"
          >
            <p className="text-base text-gray-500 leading-relaxed">
              {products.map((product, i) => (
                <span key={product.label}>
                  <a href={product.href} className="hover:text-mw-blue-600 transition-colors">
                    {product.label}
                  </a>
                  {i < products.length - 1 && <span className="mx-2 text-gray-300">&middot;</span>}
                </span>
              ))}
            </p>
            <p className="text-sm text-gray-400 mt-3 italic">
              {t('landingPage.platformEcosystem.productsLine')}
            </p>
          </motion.div>
        </div>

        {/* Main Architecture Diagram */}
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-8 overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />

          {/* Connection Lines SVG Overlay */}
          {isClient && (
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
              style={{ zIndex: 1 }}
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Gradient for left (input) lines - cyan to blue */}
                <linearGradient id="ecosystemInputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
                </linearGradient>
                {/* Gradient for right (output) lines - blue to purple */}
                <linearGradient id="ecosystemOutputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
                </linearGradient>
                {/* Glow filter for dots */}
                <filter id="ecosystemDotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Glow filter for center hub */}
                <filter id="ecosystemHubGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Center glow effect */}
              <circle cx="500" cy="235" r="40" fill="#3B82F6" opacity="0.15" filter="url(#ecosystemHubGlow)">
                <animate attributeName="r" values="40;55;40" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Left side - 9 connection lines from Data Sources to MW Engine center */}
              {[115, 145, 175, 205, 235, 265, 295, 325, 355].map((y, i) => (
                <g key={`left-conn-${i}`}>
                  <line
                    x1="220"
                    y1={y}
                    x2="500"
                    y2="235"
                    stroke="url(#ecosystemInputGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  {/* Main dot with glow */}
                  <circle r="5" fill="#22D3EE" filter="url(#ecosystemDotGlow)">
                    <animate
                      attributeName="cx"
                      values={`220;500;220`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`${y};235;${y}`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Trailing particle 1 */}
                  <circle r="2.5" fill="#22D3EE" opacity="0.5">
                    <animate
                      attributeName="cx"
                      values={`220;500;220`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin="-0.3s"
                    />
                    <animate
                      attributeName="cy"
                      values={`${y};235;${y}`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin="-0.3s"
                    />
                  </circle>
                  {/* Trailing particle 2 */}
                  <circle r="1.5" fill="#22D3EE" opacity="0.3">
                    <animate
                      attributeName="cx"
                      values={`220;500;220`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin="-0.6s"
                    />
                    <animate
                      attributeName="cy"
                      values={`${y};235;${y}`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin="-0.6s"
                    />
                  </circle>
                </g>
              ))}
              
              {/* Right side - 9 connection lines from MW Engine center to Outputs */}
              {[115, 145, 175, 205, 235, 265, 295, 325, 355].map((y, i) => (
                <g key={`right-conn-${i}`}>
                  <line
                    x1="500"
                    y1="235"
                    x2="780"
                    y2={y}
                    stroke="url(#ecosystemOutputGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  {/* Main dot with glow */}
                  <circle r="5" fill="#A855F7" filter="url(#ecosystemDotGlow)">
                    <animate
                      attributeName="cx"
                      values={`500;780;500`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`235;${y};235`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6}s`}
                    />
                  </circle>
                  {/* Trailing particle 1 */}
                  <circle r="2.5" fill="#A855F7" opacity="0.5">
                    <animate
                      attributeName="cx"
                      values={`500;780;500`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6 - 0.3}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`235;${y};235`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6 - 0.3}s`}
                    />
                  </circle>
                  {/* Trailing particle 2 */}
                  <circle r="1.5" fill="#A855F7" opacity="0.3">
                    <animate
                      attributeName="cx"
                      values={`500;780;500`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6 - 0.6}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`235;${y};235`}
                      dur={`${11.5 + i * 0.575}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.6 - 0.6}s`}
                    />
                  </circle>
                </g>
              ))}
            </svg>
          )}

          {/* Three Column Layout */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-8 items-center" style={{ zIndex: 2 }}>
            
            {/* Left Column - Data Sources */}
            <div className="space-y-2 self-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
              >
                Data Sources
              </motion.div>
              {dataSources.map((source, index) => (
                <DataSourceCard key={source.label} {...source} index={index} />
              ))}
            </div>

            {/* Center Column - MW Platform Core */}
            <div className="flex flex-col justify-center items-center gap-4">
              {/* AI Engine Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="flex items-start justify-center">
                  {/* AI Agents Section */}
                  <div>
                    {/* AI Steps Row */}
                    <div className="flex items-center gap-4">
                      {aiSteps.map((step, index) => (
                        <div key={step.label} className="flex items-center">
                          <AIStep {...step} index={index} />
                          {index < aiSteps.length - 1 && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                              className="w-8 h-0.5 bg-blue-300 mx-2 origin-left"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Campaign Intelligence Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center"
              >
                <div className="relative inline-flex" style={{ padding: '2px' }}>
                  {/* Animated sparkline border */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="ecosystemSparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#fff" />
                        <stop offset="60%" stopColor="transparent" />
                        <stop offset="100%" stopColor="transparent" />
                        <animate attributeName="x1" values="-100%;100%" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="x2" values="0%;200%" dur="2s" repeatCount="indefinite" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="1"
                      y="1"
                      width="198"
                      height="38"
                      rx="6"
                      ry="6"
                      fill="none"
                      stroke="url(#ecosystemSparkGradient)"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[6px] px-5 py-2 text-white text-sm font-semibold shadow-lg">
                    Campaign Intelligence
                  </div>
                </div>
              </motion.div>

              {/* Central Hub with MW Engine */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="relative py-4"
              >
                {/* SVG Container for Hub */}
                <div className="relative flex items-center justify-center" style={{ height: '120px' }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 120">
                    {/* Outer pulse rings */}
                    {isClient && (
                      <>
                        <circle cx="300" cy="60" r="35" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.3">
                          <animate attributeName="r" values="35;55;35" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="300" cy="60" r="35" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.2">
                          <animate attributeName="r" values="35;65;35" dur="2s" repeatCount="indefinite" begin="0.5s" />
                          <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                      </>
                    )}
                  </svg>
                  
                  {/* Central Hub Circle */}
                  <motion.div
                    className="relative z-10"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-xl border-4 border-white">
                      <div className="text-center">
                        <img src="/assets/logo/MW-logo-web.svg" alt="MW" className="w-8 h-8 mx-auto brightness-0 invert" />
                        <span className="text-[9px] text-white font-semibold mt-0.5 block">ENGINE</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* MW AI Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">AI</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">MW AI</span>
                  <span className="text-xs text-gray-500">Audience Intelligence</span>
                </div>
              </motion.div>

              {/* Feature Tags Row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="flex justify-center gap-3"
              >
                <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <span className="text-xs font-medium text-gray-700">Audience Graphs</span>
                </div>
                <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <span className="text-xs font-medium text-gray-700">Campaign Events</span>
                </div>
                <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <span className="text-xs font-medium text-gray-700">Data Sync</span>
                </div>
                <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <span className="text-xs font-medium text-gray-700">Real-time Feeds</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Outputs */}
            <div className="space-y-2 self-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
              >
                Outputs
              </motion.div>
              
              {/* Output Cards */}
              <div className="relative">
                {outputs.map((output, index) => (
                  <div key={output.label} className="mb-2">
                    <OutputCard {...output} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Width Products Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 }}
            className="mt-8 border border-dashed border-gray-300 rounded-md p-6 bg-gray-50"
          >
            <div className="grid grid-cols-7 gap-4">
              {products.map((product, index) => (
                <ProductCard key={product.label} {...product} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Icon Components
const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const DeviceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const IntegrationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PlanIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const OptimizeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const MeasureIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PlannerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ActivateIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MeasureProductIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MarketplaceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ReachIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const ScienceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const StudioIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const APIAccessIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const InsightsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const AudienceProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CampaignPerfIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const MediaPlanIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ForecastIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);
