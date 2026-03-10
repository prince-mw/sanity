"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function MovingHeartsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Animated Hearts Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const leftPosition = (i / 20) * 100;
              const size = 0.5 + (i % 4) * 0.2;
              const duration = 18 + (i % 5) * 3;
              const delay = (i / 20) * 10;
              
              return (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-rose-200"
                  style={{ left: `${leftPosition}%` }}
                  initial={{ y: "-10%", scale: size, opacity: 0 }}
                  animate={{ 
                    y: ["-10%", "110%"],
                    opacity: [0, 0.6, 0.6, 0]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "linear",
                    opacity: { times: [0, 0.1, 0.9, 1] }
                  }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Heart Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full shadow-xl"
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Moving <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Hearts</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Towards More Responsible OOH Media Worldwide
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-rose-100"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
              <span className="text-2xl font-bold text-gray-900">3,000,000+</span>
              <span className="text-gray-600">Hearts Touched</span>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Moving Hearts is MovingWalls&apos; ESG initiative aimed at harnessing the power of unbooked OOH inventory 
                for Corporate Social Responsibility programs, connecting local charities to unused advertising space 
                to create meaningful impact in communities worldwide.
              </p>
            </motion.div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 - Carbon Neutral */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Carbon Neutral by Default</h3>
                <p className="text-gray-600">
                  Campaign emissions are calculated and offset across all bookings, ensuring every advertisement 
                  contributes to a sustainable future.
                </p>
              </motion.div>

              {/* Pillar 2 - Industry Standard */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Standard Adoption</h3>
                <p className="text-gray-600">
                  We are the first OOH platform to adopt the Global Media Sustainability Framework version 1.2 
                  as a global standard for responsible advertising.
                </p>
              </motion.div>

              {/* Pillar 3 - Community Causes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100"
              >
                <div className="w-16 h-16 bg-rose-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community Causes</h3>
                <p className="text-gray-600">
                  Champions local and global initiatives, using the power of billboards to raise awareness and 
                  drive action for important social causes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-20 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Through our partnerships and initiatives, we&apos;ve made a significant impact across Southeast Asia and beyond.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "20+", label: "Community Causes Supported" },
                { number: "3M+", label: "Hearts Touched" },
                { number: "10+", label: "Markets Reached" },
                { number: "100+", label: "Media Partners" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Convert unused OOH inventory into impactful platforms for charitable causes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Media Owners Register",
                  description: "OOH media owners register their unbooked advertising inventory on our platform."
                },
                {
                  step: "02",
                  title: "Charities Apply",
                  description: "NGOs and charities submit their campaigns for awareness and fundraising initiatives."
                },
                {
                  step: "03",
                  title: "Impact Created",
                  description: "Campaigns go live, reaching millions and creating measurable social impact."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-7xl font-bold text-rose-100 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Join the Movement
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you&apos;re a media owner with unused inventory or a charity seeking visibility, 
                we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://movinghearts.media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Visit Moving Hearts
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300"
                >
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
