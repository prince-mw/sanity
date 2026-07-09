'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from 'next/link'

// Custom Vector Icons for the 6 Community Features
const CommunityIcon = ({ type }: { type: number }) => {
  const paths = [
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", // Tasks
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", // Receipt
    "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.01 6 8.945 6 10.033V17.5c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125v-7.467c0-1.088-.845-2.023-1.976-2.117A42.112 42.112 0 0012 8.25z", // Food & Bev
    "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Emotion
    "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.16 3.659A2.25 2.25 0 009.568 3zM6 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z", // Deals
    "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" // Profile
  ];

  return (
    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || paths[0]} />
    </svg>
  );
};

export default function CommunityLandingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    country: "",
    dob: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const communityFeatures = [
    {
      title: "Participate in Task assigned to you",
      desc: "Go the Tasks Section at the home page."
    },
    {
      title: "Upload your purchase receipt every you purchase anything",
      desc: "Go to upload receipt section at the home page"
    },
    {
      title: "Record your food and Beverage consumptions",
      desc: "Go to record consumptions section at the home page."
    },
    {
      title: "Find your emotional profile",
      desc: "Go to Emotion profile section at home page"
    },
    {
      title: "Update or view any sales /discount/ activities/ event promotions and save money",
      desc: "Go to Deals secion at homepage"
    },
    {
      title: "Update your personal profile",
      desc: "Go to profile section at the home"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">
      
      {/* Top Navigation Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/mw-science" className="text-sm font-medium text-gray-500 hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
          ← Back to MW Science
        </Link>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        
        {/* Exactly Centered Copy Header System */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            Join our community
          </h1>
          <p className="text-gray-600 leading-relaxed text-base">
            Join our community by simple sign-up form and get various benefits, such as networking opportunities, skill development, knowledge sharing, and potentially even earning opportunities. Here are some features that might help you learn, earn, and continue to network with other members within the community:
          </p>
        </div>

        {/* Content Body Matrix Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Side: Visual Features List + Blue Box Highlights */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Six Interactive Parameter Rows */}
            <div className="space-y-4">
              {communityFeatures.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-start gap-4 hover:border-blue-500/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-100">
                    <CommunityIcon type={idx} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Highlight Card: Encased in Website's Core Dark Blue Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-6 rounded-2xl shadow-xl border border-white/10 space-y-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
              
              <div className="relative flex items-center gap-4 p-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 text-blue-300 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-base tracking-wide">Refer it within your network and earn.</p>
              </div>

              <div className="border-t border-white/10 my-1 relative"></div>

              <div className="relative flex items-center gap-4 p-2">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 text-emerald-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-base tracking-wide">Redeem Points and get cash in bank</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side Column Container */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col gap-4">
            
            {/* Onboarding Sign-Up Form Card */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl relative">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Contact Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Your contact number"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Country</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Malaysia"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Date of Birth</label>
                      <input 
                        type="date" 
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-colors mt-6 shadow-md"
                  >
                    Submit Registration
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Registration Received</h2>
                  <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong className="text-gray-800">{formData.fullName}</strong>. Your setup has been registered successfully.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Dedicated Go Back Button Located Exactly Below Form Layout */}
            <div className="w-full text-center">
              <Link 
                href="/mw-science" 
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 bg-white hover:bg-blue-50/50 border border-gray-200 hover:border-blue-200 p-3.5 rounded-xl shadow-sm transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Go Back to MW Science Page
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}