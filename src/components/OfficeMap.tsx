"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function OfficeMap() {
  const offices = [
    {
      city: "Singapore",
      country: "Singapore",
      type: "Global HQ",
      position: { top: "56%", left: "73%" },
      timezone: "SGT",
      coords: { lat: 1.2840, lng: 103.8513 },
      image: "/assets/images/offices/singapore.svg",
      address: "Far East Finance Building, #8-02, 14 Robinson Road",
      phone: "+65 8755 6364"
    },
    {
      city: "Kuala Lumpur",
      country: "Malaysia",
      type: "Regional Office",
      position: { top: "58%", left: "72%" },
      timezone: "MYT",
      coords: { lat: 3.1390, lng: 101.6869 },
      image: "/assets/images/offices/kuala-lumpur.svg",
      address: "Level 8 (Zone B), Wisma Standard Chartered, Bukit Jalil",
      phone: "+60 3 7610 2044"
    },
    {
      city: "Manila",
      country: "Philippines",
      type: "Regional Office",
      position: { top: "54%", left: "78%" },
      timezone: "PHT",
      coords: { lat: 14.5176, lng: 121.0509 },
      image: "/assets/images/offices/manila.svg",
      address: "Unit 1207, Capital House, 9th Avenue, Taguig",
      phone: "+63 7527 5672"
    },
    {
      city: "Jakarta",
      country: "Indonesia",
      type: "Regional Office",
      position: { top: "62%", left: "74%" },
      timezone: "WIB",
      coords: { lat: -6.2088, lng: 106.8456 },
      image: "/assets/images/offices/jakarta.svg",
      address: "Nobel House, 29th Floor, Mega Kuningan",
      phone: "+62 21 3005 3540"
    },
    {
      city: "Colombo",
      country: "Sri Lanka",
      type: "Regional Office",
      position: { top: "58%", left: "68%" },
      timezone: "IST",
      coords: { lat: 6.9271, lng: 79.8612 },
      image: "/assets/images/offices/colombo.svg",
      address: "07 Turnour Rd, Colombo 8",
      phone: ""
    },
    {
      city: "Bangalore",
      country: "India",
      type: "Regional Office",
      position: { top: "52%", left: "67%" },
      timezone: "IST",
      coords: { lat: 12.9716, lng: 77.5946 },
      image: "/assets/images/offices/bangalore.svg",
      address: "BHIVE Workspace, Indiranagar",
      phone: ""
    },
    {
      city: "Mumbai",
      country: "India",
      type: "Regional Office",
      position: { top: "48%", left: "66%" },
      timezone: "IST",
      coords: { lat: 19.0760, lng: 72.8777 },
      image: "/assets/images/offices/mumbai.svg",
      address: "Dynasty Business Park, Andheri East",
      phone: ""
    },
    {
      city: "Chennai",
      country: "India",
      type: "Regional Office",
      position: { top: "54%", left: "68%" },
      timezone: "IST",
      coords: { lat: 13.0827, lng: 80.2707 },
      image: "/assets/images/offices/chennai.svg",
      address: "Adwave Towers, T. Nagar",
      phone: ""
    }
  ];

  const stats = [
    { number: "9", label: "Global Offices" },
    { number: "200+", label: "Team Members" },
    { number: "25+", label: "Countries Served" },
    { number: "24/7", label: "Global Support" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-mw-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-6">
            <svg className="w-4 h-4 text-mw-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-mw-blue-600 text-sm font-medium">Global Presence</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mw-gray-900 mb-6">
            Worldwide Reach
            <span className="text-mw-blue-600 block">Local Expertise</span>
          </h2>
          <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto leading-relaxed">
            With 9 offices strategically located across Asia, Moving Walls delivers 
            global advertising solutions with deep local market knowledge and round-the-clock support.
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="bg-white rounded-3xl border border-mw-gray-100 p-8 lg:p-12">
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-mw-blue-50 to-mw-blue-25 rounded-2xl overflow-hidden">
              {/* Proper World Map SVG */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* World Map - Accurate Country Shapes */}
                <g fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.5">
                  {/* North America - USA */}
                  <path d="M158 206c2-1 3-2 4-1 2 1 3 0 4-1l1-2c0-1-1-1-1-2 1-1 2-1 3-1 1-1 2-2 4-2 1 0 2 0 3 1 1 0 2 0 2 1 1 1 1 2 2 2 1 0 2-1 3-1 1-1 2-1 3-1 2 0 4 1 5 2 1 1 2 2 3 3 0 1 0 2 1 3 0 1 1 1 1 2 0 1-1 2-1 3-1 1-2 1-2 2 0 1 0 2-1 3-1 0-2 0-3 1-1 0-1 1-2 1-1 0-2-1-3-1-1 0-2 1-3 1-1 1-2 1-3 2-1 0-2 0-3-1-1-1-1-2-2-2-1-1-2-1-3-1-1 0-2 0-2-1-1-1-1-2-2-3-1-1-2-1-3-2-1-1-2-2-2-3z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Canada */}
                  <path d="M158 156c3-1 5-1 7 0 2 1 4 2 6 3 2 0 4 0 5 1 1 1 2 2 3 3 1 1 1 3 2 4 0 1 1 2 1 3 0 1-1 1-1 2 0 1 0 2-1 3-1 1-2 1-3 2-1 0-2 0-3-1-1-1-2-2-3-2-1-1-2-1-3-2-1-1-1-2-2-3-1-1-2-1-3-2-1-1-1-2-1-3 0-1 1-2 1-3 0-1-1-2-1-3 0-1 1-1 1-2z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Mexico */}
                  <path d="M158 246c1-1 3-1 4-1 1 0 2 1 3 1 1 1 2 1 3 2 1 0 2 0 3 1 0 1 0 2-1 3-1 1-2 1-3 1-1 0-2-1-3-1-1-1-2-1-3-2-1-1-1-2-2-3-1-1-1-2-1-2z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* South America - Brazil */}
                  <path d="M218 306c2-1 4-1 6 0 2 1 3 3 4 5 1 2 1 4 0 6-1 2-3 3-5 4-2 1-4 1-6 0-2-1-3-3-4-5-1-2-1-4 0-6 1-2 3-3 5-4z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Argentina */}
                  <path d="M206 356c1-2 2-4 4-5 1-1 3-1 4-1 1 0 3 1 4 2 1 1 1 3 1 4 0 2-1 4-2 5-1 1-3 2-5 2-2 0-4-1-5-2-1-1-1-3-1-5z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Europe - United Kingdom */}
                  <path d="M478 146c1-1 2-1 3-1 1 0 2 1 2 2 0 1-1 2-2 2-1 1-2 0-3 0-1-1-1-2 0-3z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* France */}
                  <path d="M486 166c1-1 3-1 4-1 1 0 2 1 3 2 1 1 1 2 1 3 0 1-1 2-2 3-1 1-2 1-3 1-1 0-2-1-3-2-1-1-1-3 0-4 0-1 0-2 0-2z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Germany */}
                  <path d="M506 156c1-1 2-1 3-1 1 0 2 1 3 2 1 1 1 2 0 3-1 1-2 1-3 1-1 0-2-1-3-2 0-1 0-2 0-3z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Scandinavia */}
                  <path d="M496 106c2-2 4-3 6-3 2 0 4 1 5 3 1 2 1 4 0 6-1 2-3 3-5 3-2 0-4-1-5-3-1-2-1-4-1-6z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Russia */}
                  <path d="M526 126c4-2 8-3 12-2 4 1 7 4 9 7 2 3 2 7 0 10-2 3-5 5-9 6-4 1-8 0-12-2-4-2-6-5-7-9-1-4 0-8 2-11 2-3 5-5 8-6 1 0 2 0 3 1 1 1 1 2 0 3-1 1-2 1-3 0-1-1-1-2 0-3 1-1 2-1 3 0z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* China */}
                  <path d="M646 186c3-2 6-3 9-2 3 1 6 3 7 6 1 3 1 6-1 9-2 3-5 5-8 6-3 1-6 0-9-2-3-2-5-5-6-8-1-3 0-6 2-9 2-3 5-5 8-6 1 0 2 0 2 1 0 1 0 2-1 2-1 0-2 0-2-1-1-1 0-2 1-2 1 0 2 0 2 1z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Japan */}
                  <path d="M746 186c1-1 2-1 3-1 1 0 2 1 2 2 0 1 0 2-1 3-1 1-2 1-3 1-1 0-1-1-1-2 0-1 0-2 0-3z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* India */}
                  <path d="M596 216c2-1 4-1 6 0 2 1 3 3 4 5 1 2 0 4-1 6-1 2-3 3-5 3-2 0-4-1-5-3-1-2-1-4 0-6 1-2 3-4 5-5z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Africa */}
                  <path d="M486 236c3-2 6-3 9-2 3 1 6 4 7 7 1 3 1 7-1 10-2 3-5 5-9 6-4 1-8 0-11-3-3-3-5-7-5-11 0-4 2-8 5-11 3-3 7-4 11-3 2 0 4 1 5 3 1 2 1 4 0 6-1 2-3 3-5 3-2 0-4-1-5-3z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Australia */}
                  <path d="M756 336c3-1 6-1 9 1 3 2 5 5 6 8 1 3 0 6-2 9-2 3-5 4-8 4-3 0-6-2-8-5-2-3-2-6-1-9 1-3 3-6 6-7 1-1 3-1 4-1 1 0 2 1 2 2 0 1-1 2-2 2-1 0-2-1-2-2 0-1 1-1 2-1 1 0 1 0 1 1z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* New Zealand */}
                  <path d="M826 376c1 0 2 0 2 1 0 1 0 2-1 2-1 0-2 0-2-1 0-1 0-2 1-2z" className="hover:fill-mw-gray-200 transition-colors"/>
                  
                  {/* Indonesia */}
                  <path d="M696 276c2 0 4 1 5 2 1 1 2 3 2 4 0 1-1 3-2 4-1 1-3 1-5 1-2 0-4-1-5-2-1-1-1-3-1-4 0-1 1-3 2-4 1-1 3-1 4-1z" className="hover:fill-mw-gray-200 transition-colors"/>
                </g>

                {/* Connection Lines */}
                <g className="opacity-30">
                  <line x1="180" y1="220" x2="490" y2="150" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="220" y1="200" x2="490" y2="150" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="490" y1="150" x2="510" y2="160" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="510" y1="160" x2="780" y2="350" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="200" y1="180" x2="510" y2="160" stroke="#3B82F6" strokeWidth="1" strokeDasharray="5,5" />
                </g>
              </svg>

              {/* Office Markers */}
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="absolute group cursor-pointer"
                  style={{
                    top: office.position.top,
                    left: office.position.left,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Pulsing Ring */}
                  <div className="absolute inset-0 w-8 h-8 bg-mw-blue-400 rounded-full animate-ping opacity-20"></div>
                  
                  {/* Main Pin */}
                  <div className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg z-10 transition-all group-hover:scale-110 ${
                    office.type.includes('HQ') || office.type.includes('Headquarters') 
                      ? 'bg-mw-blue-600' 
                      : 'bg-mw-blue-500'
                  }`}>
                    {(office.type.includes('HQ') || office.type.includes('Headquarters')) && (
                      <svg className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Enhanced Tooltip with Building Image */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" style={{ zIndex: 9999 }}>
                    <div className="bg-white rounded-xl shadow-2xl border border-mw-gray-100 overflow-hidden" style={{ width: '280px' }}>
                      {/* Building Image */}
                      <div className="relative h-32 bg-gradient-to-br from-mw-blue-500 to-mw-blue-600 overflow-hidden">
                        <div className="w-full h-full relative overflow-hidden">
                          <Image
                            src={office.image}
                            alt={`${office.city} Office Building`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                            unoptimized={true}
                            onError={() => {
                              console.error(`Failed to load image: ${office.image}`);
                            }}
                            onLoad={() => {
                              console.log(`Successfully loaded: ${office.image}`);
                            }}
                          />
                        </div>
                        
                        {/* Office Type Badge */}
                        {(office.type.includes('HQ') || office.type.includes('Headquarters')) && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-mw-blue-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            HQ
                          </div>
                        )}
                      </div>
                      
                      {/* Office Information */}
                      <div className="p-4">
                        <div className="mb-3">
                          <h4 className="font-bold text-mw-gray-900 text-lg">{office.city}</h4>
                          <p className="text-mw-gray-600 text-sm">{office.country}</p>
                          <p className="text-mw-gray-500 text-xs mt-1">{office.address}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-mw-gray-600 text-sm">
                            <svg className="w-4 h-4 text-mw-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v7.945M20 18v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M8 17.5h8M8 15h8M8 12.5h8" />
                            </svg>
                            <span>{office.type}</span>
                          </div>
                          <div className="flex items-center gap-2 text-mw-gray-600 text-sm">
                            <svg className="w-4 h-4 text-mw-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Timezone: {office.timezone}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white drop-shadow-sm"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center bg-white rounded-xl p-6 border border-mw-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.number}</div>
              <div className="text-sm text-mw-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Office List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {offices.map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className={`bg-white rounded-xl p-6 border transition-all hover:scale-105 ${
                office.type.includes('HQ') || office.type.includes('Headquarters')
                  ? 'border-mw-blue-200 bg-gradient-to-br from-mw-blue-25 to-white'
                  : 'border-mw-gray-100'
              }`}
            >
              {(office.type.includes('HQ') || office.type.includes('Headquarters')) && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-mw-blue-100 text-mw-blue-600 text-xs font-medium rounded-full mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  HQ
                </div>
              )}
              
              <div className="mb-3">
                <h3 className="font-bold text-mw-gray-900 text-lg">{office.city}</h3>
                <p className="text-mw-gray-600 text-sm">{office.country}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-mw-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v7.945M20 18v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M8 17.5h8M8 15h8M8 12.5h8" />
                  </svg>
                  <span>{office.type}</span>
                </div>
                <div className="flex items-center gap-2 text-mw-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{office.timezone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-8 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Explore All Locations
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}