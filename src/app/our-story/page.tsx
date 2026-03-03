"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";

export default function OurStoryPage() {


  const values = [
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Innovation First",
      description: "We constantly push boundaries to deliver cutting-edge advertising solutions that drive real results."
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "Trust & Transparency",
      description: "We build lasting partnerships through honest communication and transparent business practices."
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Client Success",
      description: "Your success is our success. We're dedicated to delivering measurable results for every campaign."
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Global Impact",
      description: "We're building advertising solutions that work across cultures, markets, and communities worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-mw-blue-100 rounded-full mb-8">
              <span className="text-mw-blue-600 text-sm font-medium">About Moving Walls</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Our Story
              <span className="text-mw-blue-600 block">Innovation & Growth</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              From a bold vision to market leadership, discover how Moving Walls transformed 
              the advertising landscape through innovative technology and unwavering 
              commitment to client success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-mw-gray-600 mb-6 leading-relaxed">
                At Moving Walls, we believe advertising should be more than just reaching audiences—it should 
                create meaningful connections. Our mission is to empower brands with intelligent, 
                data-driven advertising solutions that deliver measurable results and drive real business growth.
              </p>
              <p className="text-lg text-mw-gray-600 leading-relaxed">
                We're not just an advertising platform; we're your strategic partner in building 
                brand awareness, engaging customers, and achieving your marketing objectives through 
                innovative out-of-home and digital advertising solutions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-mw-blue-50 to-mw-blue-100 rounded-2xl p-8">
                <blockquote className="text-xl font-medium text-mw-gray-900 mb-4">
                  "We're building the future of advertising—one where technology meets creativity, 
                  data drives decisions, and every campaign creates lasting impact."
                </blockquote>
                <cite className="text-mw-blue-600 font-semibold">— Moving Walls Leadership Team</cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              The principles that guide our decisions, shape our culture, and drive our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-mw-blue-100 rounded-full text-mw-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-3">{value.title}</h3>
                <p className="text-mw-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Looking Forward
            </h2>
            <p className="text-xl text-mw-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              As we continue to grow, our commitment remains unchanged: delivering innovative advertising 
              solutions that help brands connect with their audiences in meaningful ways. The future of 
              advertising is here, and we're excited to build it together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
              >
                Partner With Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-mw-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}