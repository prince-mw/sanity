"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function OOH101Page() {
  const oohFormats = [
    {
      name: "Unipole",
      description: "The most popular DOOH format, Unipoles are found along high-traffic roads where a large screen is attached to a tall pole for maximum visibility. Ideally suited for commuters as the board stands out and makes its presence known!",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      stats: { reach: "500K+", visibility: "High", audience: "Commuters" }
    },
    {
      name: "Wall Façade",
      description: "An extremely popular DOOH screen format positioned at high traffic locations with lots of foot and vehicle traffic. The busy nature of these junctions ensures there's always one kind of audience viewing the screens.",
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=600&fit=crop",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      stats: { reach: "1M+", visibility: "Very High", audience: "Mixed" }
    },
    {
      name: "E-Buntings",
      description: "Synchronous, multi-panel displays that line public streets - either on the sides or along the middle. Multiple screens play the same ad simultaneously, positioned along busy walkways making them almost impossible to miss!",
      image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      stats: { reach: "300K+", visibility: "Medium", audience: "Pedestrians" }
    },
    {
      name: "Overhead Bridge",
      description: "Overhead bridges have the size and strength to support massive screens spanning the entire width of the road. They are wide, big and hard to miss - another DOOH format that you just cannot avoid.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      stats: { reach: "800K+", visibility: "Very High", audience: "Drivers" }
    },
    {
      name: "LED Truck",
      description: "An incredible, dynamic DOOH format that allows you to place an ad where your target audience is and follow them around on routes they frequent. If you're looking for flexibility and effectiveness, look no further!",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      stats: { reach: "200K+", visibility: "High", audience: "Targeted" }
    },
    {
      name: "Airport Screens",
      description: "Airports are filled with people waiting - for check-in, security, immigration, baggage or flights. You have a captive audience literally looking around for things to occupy their time. Premium audience with high purchasing power.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      stats: { reach: "150K+", visibility: "High", audience: "Travelers" }
    },
    {
      name: "Digital Bulletin",
      description: "Large billboards on the side of highways and heavy-traffic roads, these massive billboards tower over their surroundings and are a fantastic way to give your brand unparalleled visibility.",
      image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&h=600&fit=crop",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      stats: { reach: "1.5M+", visibility: "Maximum", audience: "All" }
    },
    {
      name: "Bus Shelter",
      description: "Positioned at high traffic locations with lots of foot and vehicle traffic. The busy nature of these junctions ensures there's always one kind of audience viewing - either vehicular or pedestrian. Pull out all the stops with your campaigns!",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      stats: { reach: "400K+", visibility: "High", audience: "Commuters" }
    },
    {
      name: "Cinema",
      description: "Nothing beats a large screen in a closed room where people came to watch that very screen - and then your ad shows up. Movie characteristics help predict audience demographics, making targeting easier!",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      stats: { reach: "50K+", visibility: "Maximum", audience: "Entertainment" }
    }
  ];

  const benefits = [
    {
      title: "Massive Reach",
      description: "OOH advertising reaches consumers outside their homes, delivering high-frequency exposure to diverse audiences.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "24/7 Visibility",
      description: "Unlike other media, OOH ads are always on - working round the clock to build brand awareness and drive action.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Unskippable",
      description: "You can't skip, block, or scroll past a billboard. OOH captures attention in the real world where consumers are.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Location Targeting",
      description: "Reach specific audiences based on where they live, work, shop, and travel with precision geographic targeting.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const locations = [
    { name: "Malaysia", href: "/locations/malaysia" },
    { name: "Singapore", href: "/locations/singapore" },
    { name: "Indonesia", href: "/locations/indonesia" },
    { name: "India", href: "/locations/india" },
    { name: "Philippines", href: "/locations/philippines" },
    { name: "Japan", href: "/locations/japan" },
    { name: "Australia", href: "/locations/australia" },
    { name: "Sri Lanka", href: "/locations/sri-lanka" },
    { name: "Thailand", href: "/locations/thailand" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <svg className="w-5 h-5 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-mw-blue-600 text-sm font-medium">OOH 101</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Out-of-Home Advertising
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mw-blue-600 to-indigo-600 block">
                Demystified
              </span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
              Learn the basics of outdoor advertising and become an expert. Unlock the fundamentals 
              of OOH with our comprehensive guide to formats, strategies, and best practices.
            </p>

            {/* Stats Section */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600">40+</div>
                <div className="text-sm text-mw-gray-600 mt-1">Markets Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600">1,500+</div>
                <div className="text-sm text-mw-gray-600 mt-1">Media Owners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mw-blue-600">1,000,000+</div>
                <div className="text-sm text-mw-gray-600 mt-1">OOH Sites</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why OOH Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Why Out-of-Home Advertising?
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              In a world of digital clutter, OOH cuts through the noise and reaches consumers where they live, work, and play.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-mw-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mw-blue-100 text-mw-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-mw-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OOH Formats Section */}
      <section className="py-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              OOH Advertising Formats
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              From towering billboards to intimate bus shelters, discover the full spectrum of out-of-home advertising formats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oohFormats.map((format, index) => (
              <motion.div
                key={format.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={format.image}
                    alt={format.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${format.color} opacity-60`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{format.name}</h3>
                    <p className="text-white/80 text-sm">Advertising Format</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-mw-gray-600 mb-6 leading-relaxed">
                    {format.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${format.textColor}`}>{format.stats.reach}</div>
                      <div className="text-xs text-mw-gray-500">Daily Reach</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${format.textColor}`}>{format.stats.visibility}</div>
                      <div className="text-xs text-mw-gray-500">Visibility</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${format.textColor}`}>{format.stats.audience}</div>
                      <div className="text-xs text-mw-gray-500">Audience</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Explore Billboard Locations
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              Discover OOH advertising opportunities across our global network of markets.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={location.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-mw-gray-100 hover:bg-mw-blue-600 text-mw-gray-700 hover:text-white rounded-full font-medium transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-mw-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
