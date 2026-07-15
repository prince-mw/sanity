'use client'

import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'

// Reusable Custom Icons for the 7 Core Products
const ProductIcon = ({ num }: { num: number }) => {
  const paths = [
    "M11.48 3.499c-1.03-2.062-4.008-2.062-5.038 0L.63 15.607a1.125 1.125 0 001.008 1.631H12v-2.25m1.14-11.49c1.03-2.062 4.008-2.062 5.038 0l4.312 8.625a1.125 1.125 0 010 1.007l-4.313 8.625c-1.03 2.062-4.008 2.062-5.038 0l-4.312-8.625a1.125 1.125 0 010-1.007l4.313-8.625z", // Brand
    "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 00-.659 1.591L4.5 18a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25l-.159-1.909a2.25 2.25 0 00-.659-1.591L14.25 10.409a2.25 2.25 0 01-.659-1.591V3.104", // Concept
    "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z", // Usage
    "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Satisfaction
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", // NPS
    "M9 6.75V15m6-12v12m0-12a3 3 0 013 3v12a3 3 0 01-3 3H9a3 3 0 01-3-3V6a3 3 0 013-3h6z", // Retail
    "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-3.833-6.24H15v6.82zM12 11.25a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75zM9 19.128v-6.82H5.113a4.125 4.125 0 00-3.833 6.24 9.337 9.337 0 004.121.952 9.38 9.38 0 002.625-.372z" // Audience
  ];

  return (
    <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[num] || paths[0]} />
    </svg>
  );
};

export default function MWScience() {
  
  // 1. The 7 Acquired Insightz Club Products
  const icProducts = [
    {
      title: "Brand and Communication",
      desc: "Evaluate brand performance measurements and communications strategy against competitors to optimize market presence."
    },
    {
      title: "Concept Development",
      desc: "Identify key audience concepts and provide engineering refinements to maximize launch impact and message resonance."
    },
    {
      title: "Usage and Purchase Behaviour",
      desc: "Understand precise consumer behavior related to product adoption patterns, usage frequency, brand preferences, and purchase decision-making trees."
    },
    {
      title: "Satisfaction Insights",
      desc: "Gain deeper metrics into customer and employee satisfaction levels by prioritizing high-impact systemic issues that drive structural improvements."
    },
    {
      title: "Net Promoter Score (NPS)",
      desc: "Compare your Net Promoter Score (NPS) transparently against top competitors and map the critical data drivers behind promoters and detractors."
    },
    {
      title: "Retail Journey Mapping",
      desc: "Understand the statistical impact of each physical and digital touchpoint in the retail journey to prioritize high-yield asset spends."
    },
    {
      title: "InsightzClub Audience Personas",
      desc: "Provides brands with in-depth audience personas that go far beyond basic demographics by tracking complex intent behaviors in today's nonlinear consumer journeys."
    }
  ];

  // 2. Structured Array for 6 Customer Testimonials
  const testimonials = [
    { 
      quote: "Thanks to their insightful market research, we were able to identify untapped opportunities in our industry and refine our product offerings accordingly. Their expertise truly helped us stay ahead of the competition.", 
      author: "CEO", 
      company: "Tech Startup" 
    },
    { 
      quote: "Their market research provided invaluable insights into consumer behavior, enabling us to tailor our marketing campaigns for maximum impact. The results were impressive, driving significant growth in sales and brand awareness.", 
      author: "Marketing Director", 
      company: "FMCG Company" 
    },
    { 
      quote: "We were amazed by the depth of analysis provided in their market research report. It gave us a clear understanding of our target audience and helped us develop products that truly resonate with their needs and preferences.", 
      author: "Product Development Director", 
      company: "Consumer Goods Company" 
    },
    { 
      quote: "Their thorough market research not only helped us understand market trends but also identified potential risks and challenges that we were able to proactively address. Their strategic recommendations were instrumental in guiding our business decisions.", 
      author: "CFO", 
      company: "F&B Chain" 
    },
    { 
      quote: "Their market research played a pivotal role in shaping our brand strategy. By understanding consumer perceptions and competitor landscapes, we were able to refine our messaging and establish a stronger brand presence in the market.", 
      author: "Brand Manager", 
      company: "Cosmetic Retailer" 
    },
    { 
      quote: "The market research conducted by their team provided us with actionable insights that led to significant improvements in our customer experience. We saw a notable increase in customer satisfaction and loyalty as a result of implementing their recommendations.", 
      author: "Customer Experience Manager", 
      company: "Hospitality Industry" 
    }
  ];

  // 3. Array of Actual Client Logo Filenames
  const logoFilenames = [
    "abs.webp", "amway.webp", "ariasia.webp", "astro.webp", "axiata.webp", "bake.webp",
    "bat.webp", "beir.webp", "booking.webp", "bulak.webp", "cimb.webp", "clorox.webp",
    "clubmed.webp", "colgaye.webp", "cpf.webp", "digitalist.webp", "electrolux.webp", "etika.webp",
    "grab.webp", "invictus.webp", "kimberly.webp", "liberty.webp", "loreal.webp", "maxis.webp",
    "mediacorp.webp", "mpa.webp", "mudah.webp", "net.webp", "ocbc.webp", "paypal.webp",
    "robi.webp", "sephora.webp", "taylors.webp", "uob.webp", "whisper.webp", "x.webp"
  ];

  const clientLogos = logoFilenames.map((filename, i) => ({
    id: i + 1,
    name: filename.replace('.webp', ''),
    logoPath: `/assets/images/ic-customers/${filename}`
  }));

  return (
    <div className="min-h-screen bg-white">
      
      {/* 2-Column Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Core Copy & CTAs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start text-left"
            >
              <span className="bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-500/30">
                Moving Walls + Insightz Club
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold mt-6 mb-8 tracking-tight leading-none">
                MW Science
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed font-light">
                Welcome to the future of consumer intelligence. By integrating Insightz Club's powerful behavioral analytics engine with Moving Walls' OOH infrastructure, MW Science now delivers end-to-end consumer journey mapping and predictive audience testing inside a singular data framework.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 px-8 py-4 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 text-center">
                  Get Started
                </button>
                <a href="#products" className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-medium tracking-wide transition-all text-center">
                  Learn More
                </a>
              </div>
            </motion.div>

            {/* Right Column: High-Fidelity Data & Insights Visualization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full lg:h-[450px] flex items-center justify-center"
            >
              <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                
                {/* Visual Widget Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">Live Inference Matrix</span>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">v2.4_Stable</span>
                </div>

                {/* Big Stat Ring Row */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-xs text-slate-400">Prediction Accuracy</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mt-2">94.2%</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-xs text-slate-400">Audience Lift</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-2">+287%</span>
                  </div>
                </div>

                {/* Animated Mock Stream Log */}
                <div className="space-y-2.5 font-mono text-[11px] text-slate-300">
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5 flex justify-between items-center">
                    <span className="text-blue-400">⚡ Consumer Journey Match</span>
                    <span className="text-slate-500">FMCG Panel Active</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5 flex justify-between items-center">
                    <span className="text-purple-400">🔮 Intent Decision Node</span>
                    <span className="text-emerald-400 font-bold">Processed</span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5 flex justify-between items-center">
                    <span className="text-amber-400">📊 Retail Path Optimization</span>
                    <span className="text-slate-500">36 Logs/sec</span>
                  </div>
                </div>

                {/* Micro Chart Graphic Representation */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>Data Streams Analyzed</span>
                  <div className="flex gap-1 items-end h-6">
                    <div className="w-1 bg-blue-500 h-3 rounded-full animate-bounce" style={{ animationDuration: '1.2s' }}></div>
                    <div className="w-1 bg-indigo-500 h-5 rounded-full animate-bounce" style={{ animationDuration: '0.8s' }}></div>
                    <div className="w-1 bg-purple-500 h-2 rounded-full animate-bounce" style={{ animationDuration: '1.5s' }}></div>
                    <div className="w-1 bg-emerald-500 h-6 rounded-full animate-bounce" style={{ animationDuration: '1s' }}></div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Visually Appealing Products Layout (Asymmetric List Cards instead of usual boxes) */}
      <section id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-20">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Methodology</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              Integrated Product Ecosystem
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Leverage specialized research frameworks engineered to map metrics, track intent, and capture market share.
            </p>
          </div>

          {/* Premium Interconnected Row Layout */}
          <div className="space-y-6">
            {icProducts.map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative bg-white border border-gray-200/70 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/[0.02] transition-all duration-300"
              >
                {/* Left accent color strip on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-600 rounded-l-2xl transition-all duration-300"></div>
                
                {/* Left Side Group: Index + Icon + Title */}
                <div className="flex items-center gap-6 md:w-1/3 flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-gray-300 group-hover:text-blue-500/50 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300">
                    <ProductIcon num={idx} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-900 transition-colors">
                    {product.title}
                  </h3>
                </div>

                {/* Right Side Group: Descriptive Copy Pane */}
                <div className="md:w-2/3 border-l-0 md:border-l md:border-gray-100 md:pl-8">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {product.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Block */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full opacity-80"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-gray-200/60">
                  <h4 className="font-bold text-gray-900 text-sm">{t.author}</h4>
                  <p className="text-blue-600 text-xs mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive 36-Logo Client Grid Baseline */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Our Customers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fortune 500 and Blue Chip companies across industry verticals — FMCG, telco, aviation, hospitality, media, finance, and many more.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {clientLogos.map((client) => (
              <div 
                key={client.id} 
                className="bg-white p-4 rounded-xl border border-gray-200/50 flex items-center justify-center h-24 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                title={client.name}
              >
                <div className="relative w-full h-full min-h-[50px] flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image 
                    src={client.logoPath} 
                    alt={client.name} 
                    width={140} 
                    height={60} 
                    className="object-contain max-h-full max-w-full"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moved to Absolute Base: Community Callout Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-950 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_40%)]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Join the InsightzClub Consumer Panels</h2>
          <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Access hyper-targeted focus demographics, manage live research panels, and participate directly in our scientific validation community.
          </p>
          <Link 
            href="/community"
            className="bg-white text-blue-950 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold tracking-wide inline-flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-2xl shadow-black/30"
          >
            Explore the Community Hub
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  )
}