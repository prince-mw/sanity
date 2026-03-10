"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleContext";

// Helper function to parse translation text with {{highlight}} markers
function parseHighlightedText(text: string): React.ReactNode[] {
  const parts = text.split(/{{highlight}}|{{\/highlight}}/);
  return parts.map((part, index) => {
    // Odd indices are the highlighted parts
    if (index % 2 === 1) {
      return (
        <span key={index} className="font-bold text-mw-blue-400">
          {part}
        </span>
      );
    }
    return part;
  });
}

// 3D Globe component with rotating wireframe and city pins
function Globe3D() {
  // City locations on the globe (angle in degrees from center, distance from center)
  const cities = [
    { name: "Singapore", angle: 105, distance: 0.15, lat: 1.3, isOrigin: true },
    { name: "Malaysia", angle: 95, distance: 0.22, lat: 4.2, isOrigin: true },
    { name: "Tokyo", angle: 60, distance: 0.55, lat: 35.7 },
    { name: "Sydney", angle: 140, distance: 0.65, lat: -33.9 },
    { name: "Dubai", angle: 250, distance: 0.35, lat: 25.2 },
    { name: "London", angle: 280, distance: 0.72, lat: 51.5 },
    { name: "New York", angle: 330, distance: 0.85, lat: 40.7 },
    { name: "Mumbai", angle: 230, distance: 0.25, lat: 19.1 },
    { name: "Shanghai", angle: 80, distance: 0.45, lat: 31.2 },
    { name: "Los Angeles", angle: 350, distance: 0.75, lat: 34.1 },
    { name: "Paris", angle: 275, distance: 0.68, lat: 48.9 },
  ];

  // Convert polar to cartesian for pin positions on the globe face
  const getPosition = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    const radius = 140; // Globe radius
    const x = 200 + Math.cos(rad) * radius * distance;
    const y = 200 + Math.sin(rad) * radius * distance * 0.4; // Flatten for 3D effect
    return { x, y };
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto">
      <defs>
        {/* Gradient for globe */}
        <radialGradient id="globeGradient" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        
        {/* Glow filter */}
        <filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Outer glow for globe */}
        <filter id="outerGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Outer glow ring */}
      <motion.circle
        cx="200"
        cy="200"
        r="155"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1"
        opacity="0.3"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Globe sphere */}
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="url(#globeGradient)"
        stroke="#3B82F6"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Rotating latitude lines */}
      {[0.2, 0.4, 0.6, 0.8].map((scale, i) => (
        <motion.ellipse
          key={`lat-${i}`}
          cx="200"
          cy="200"
          rx={140 * scale}
          ry={140 * scale * 0.3}
          fill="none"
          stroke="#60A5FA"
          strokeWidth="0.5"
          opacity="0.4"
          animate={{
            ry: [140 * scale * 0.3, 140 * scale * 0.35, 140 * scale * 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating longitude lines */}
      {[0, 30, 60, 90, 120, 150].map((rotation, i) => (
        <motion.ellipse
          key={`long-${i}`}
          cx="200"
          cy="200"
          rx="140"
          ry="50"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="0.5"
          opacity="0.3"
          style={{
            transformOrigin: "200px 200px",
          }}
          animate={{
            rotate: [rotation, rotation + 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Equator line */}
      <motion.ellipse
        cx="200"
        cy="200"
        rx="140"
        ry="15"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="1"
        opacity="0.5"
        animate={{
          ry: [15, 20, 15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Prime meridian */}
      <motion.ellipse
        cx="200"
        cy="200"
        rx="20"
        ry="140"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="1"
        opacity="0.5"
        animate={{
          rx: [20, 25, 20],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles around globe */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * 360;
        const radius = 160 + Math.random() * 30;
        return (
          <motion.circle
            key={`particle-${i}`}
            r="1.5"
            fill="#60A5FA"
            opacity="0.6"
            animate={{
              cx: [
                200 + Math.cos((angle * Math.PI) / 180) * radius,
                200 + Math.cos(((angle + 180) * Math.PI) / 180) * radius,
              ],
              cy: [
                200 + Math.sin((angle * Math.PI) / 180) * radius * 0.4,
                200 + Math.sin(((angle + 180) * Math.PI) / 180) * radius * 0.4,
              ],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        );
      })}

      {/* City Pins */}
      {cities.map((city, index) => {
        const pos = getPosition(city.angle, city.distance);
        const isOrigin = city.isOrigin;
        
        return (
          <motion.g key={city.name}>
            {/* Pin base pulse */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={isOrigin ? 12 : 8}
              fill="none"
              stroke={isOrigin ? "#F59E0B" : "#3B82F6"}
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15,
              }}
            />
            
            {/* Pin inner glow */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={isOrigin ? 8 : 5}
              fill={isOrigin ? "#F59E0B" : "#3B82F6"}
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15,
              }}
            />
            
            {/* Pin center dot */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={isOrigin ? 5 : 3}
              fill={isOrigin ? "#FBBF24" : "#60A5FA"}
              filter="url(#globeGlow)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            />

            {/* City label for origin - position labels to avoid overlap */}
            {isOrigin && (
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <text
                  x={city.name === "Malaysia" ? pos.x - 50 : pos.x + 15}
                  y={city.name === "Malaysia" ? pos.y - 8 : pos.y + 4}
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {city.name}
                </text>
              </motion.g>
            )}
          </motion.g>
        );
      })}

      {/* Connection arcs from Singapore & Malaysia to other cities */}
      {cities.filter(c => !c.isOrigin).map((city, index) => {
        const singaporePos = getPosition(105, 0.15); // Singapore position
        const malaysiaPos = getPosition(95, 0.22); // Malaysia position
        const dest = getPosition(city.angle, city.distance);
        
        // Alternate arcs between Singapore and Malaysia
        const origin = index % 2 === 0 ? singaporePos : malaysiaPos;
        
        // Create curved path
        const midX = (origin.x + dest.x) / 2;
        const midY = Math.min(origin.y, dest.y) - 30 - index * 5;
        
        return (
          <motion.path
            key={`arc-${city.name}`}
            d={`M ${origin.x} ${origin.y} Q ${midX} ${midY} ${dest.x} ${dest.y}`}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
          />
        );
      })}
    </svg>
  );
}

export default function AsianBornGlobal() {
  const { t } = useLocale();

  return (
    <section className="relative py-12 lg:py-20 bg-mw-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {t('landingPage.asianBornGlobal.title')} <span className="text-mw-blue-400">{t('landingPage.asianBornGlobal.titleHighlight')}</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">{t('landingPage.asianBornGlobal.description')}</p>
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
              {/* Main Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-base lg:text-lg text-gray-200 leading-relaxed">
                  {parseHighlightedText(t('landingPage.asianBornGlobal.paragraph1'))}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side - 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <Globe3D />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
