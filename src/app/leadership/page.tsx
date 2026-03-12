"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getLeadershipTeam, transformTeamMember, SanityTeamMember } from "../../sanity/lib/fetch";
import ContactForm from "../../components/ContactForm";

// Static fallback data
const staticLeadership: Array<{
  name: string;
  role: string;
  department: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  image: string;
  slug: string;
}> = [
  {
    name: "Srikanth Ramachandran",
    slug: "srikanth-ramachandran",
    role: "Founder & Group CEO",
    department: "executive",
    bio: "Srikanth is the visionary founder of Moving Walls with over 20 years of experience in advertising technology. He has been instrumental in transforming out-of-home advertising through data-driven solutions.",
    linkedin: "https://www.linkedin.com/in/srikanthramachandran/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Natasha Rawlings",
    slug: "natasha-rawlings",
    role: "Chief Revenue Officer",
    department: "executive",
    bio: "Natasha leads global revenue strategy with deep expertise in digital advertising and enterprise sales. She has driven significant growth across APAC and European markets.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Gautam Bhirani",
    slug: "gautam-bhirani",
    role: "Co-Founder & CEO, Moving Walls India",
    department: "executive",
    bio: "Gautam co-founded Moving Walls and leads Indian operations. His expertise in media planning and technology has been pivotal in building the company's presence in one of the world's fastest-growing markets.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Dr. Ahmad Nazri",
    slug: "dr-ahmad-nazri",
    role: "Chief Technology Officer",
    department: "technology",
    bio: "Dr. Ahmad oversees all technology initiatives and R&D. He brings a wealth of experience in AI/ML, ad-tech platforms, and scalable cloud architectures.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Michelle Tan",
    slug: "michelle-tan",
    role: "Chief Marketing Officer",
    department: "marketing",
    bio: "Michelle leads global marketing strategy and brand development. She has extensive experience in building tech brands and driving demand generation at scale.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "James Wilson",
    slug: "james-wilson",
    role: "Chief Financial Officer",
    department: "finance",
    bio: "James oversees financial strategy, operations, and investor relations. He brings expertise from leading roles at major technology companies.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Priya Sharma",
    slug: "priya-sharma",
    role: "VP of Product",
    department: "product",
    bio: "Priya leads product strategy and roadmap development. She has a track record of building award-winning ad-tech products that solve real advertiser challenges.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
  {
    name: "Daniel Lee",
    slug: "daniel-lee",
    role: "VP of Engineering",
    department: "technology",
    bio: "Daniel leads engineering teams across multiple offices. He specializes in building high-performance, scalable systems for programmatic advertising.",
    linkedin: "https://www.linkedin.com/",
    image: "/assets/images/team-placeholder.jpg",
  },
];

export default function LeadershipPage() {
  const [leadership, setLeadership] = useState(staticLeadership);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeadership() {
      try {
        const sanityLeadership = await getLeadershipTeam();
        if (sanityLeadership && sanityLeadership.length > 0) {
          setLeadership(sanityLeadership.map(transformTeamMember));
        }
      } catch (error) {
        console.error('Error fetching leadership from Sanity:', error);
        // Keep static data as fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeadership();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <motion.div
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-mw-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <span className="text-mw-blue-200 text-sm font-medium">Meet Our Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Leadership
              <span className="block bg-gradient-to-r from-mw-blue-300 via-mw-blue-400 to-purple-400 bg-clip-text text-transparent">
                Driving Innovation
              </span>
            </h1>
            <p className="text-xl text-mw-blue-200/80 max-w-3xl mx-auto leading-relaxed">
              Meet the visionaries behind MovingWalls — the team driving innovation 
              in outdoor advertising technology across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Grid */}
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
              Executive Leadership
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Our leadership team brings decades of combined experience in advertising technology, 
              media, and enterprise software.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/leadership/${member.slug}`}
                  className="block bg-white rounded-xl shadow-mw-lg border border-mw-gray-100 overflow-hidden group hover:shadow-mw-xl transition-all"
                >
                  {/* Photo */}
                  <div className="relative h-64 bg-gradient-to-br from-mw-blue-100 to-mw-blue-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-mw-blue-500 to-mw-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-mw-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <span className="px-4 py-2 bg-white text-mw-blue-600 text-sm font-medium rounded-full">
                        View Profile
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-mw-gray-900 mb-1 group-hover:text-mw-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-mw-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-mw-gray-600 text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              The principles that guide our leadership and shape our company culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Innovation First",
                description: "We constantly push the boundaries of what's possible in advertising technology, pioneering new solutions that transform the industry."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Customer Success",
                description: "Our clients' success is our success. We build deep partnerships and deliver measurable results that drive their business forward."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Global Mindset",
                description: "Born in Asia, global by design. We embrace diverse perspectives and build solutions that work across cultures and markets."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-mw-md border border-mw-gray-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-mw-blue-100 rounded-lg text-mw-blue-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-3">{value.title}</h3>
                <p className="text-mw-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Join Our Team
            </h2>
            <p className="text-xl text-mw-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              We are always looking for talented individuals who share our passion for innovation 
              and want to make an impact in the advertising technology space.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
            >
              View Open Positions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}