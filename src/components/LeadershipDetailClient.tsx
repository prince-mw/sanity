"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getTeamMemberBySlug, getLeadershipTeam, transformTeamMember, SanityTeamMember } from "@/sanity/lib/fetch";

// Team member type
interface TeamMember {
  name: string;
  slug: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

// Static fallback data
const staticLeadership: TeamMember[] = [
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
];

export default function LeadershipDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [member, setMember] = useState<TeamMember | null>(null);
  const [otherMembers, setOtherMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchTeamMember() {
      if (!slug) return;
      
      try {
        // Try to fetch from Sanity first
        const sanityMember = await getTeamMemberBySlug(slug);
        
        if (sanityMember) {
          setMember(transformTeamMember(sanityMember));
          
          // Fetch other team members
          const allMembers = await getLeadershipTeam();
          if (allMembers && allMembers.length > 0) {
            const others = allMembers
              .filter((m: SanityTeamMember) => m.slug?.current !== slug)
              .slice(0, 3)
              .map(transformTeamMember);
            setOtherMembers(others);
          }
        } else {
          // Fallback to static data
          const staticMember = staticLeadership.find(m => m.slug === slug);
          if (staticMember) {
            setMember(staticMember);
            setOtherMembers(staticLeadership.filter(m => m.slug !== slug).slice(0, 3));
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error('Error fetching team member from Sanity:', error);
        // Fallback to static data
        const staticMember = staticLeadership.find(m => m.slug === slug);
        if (staticMember) {
          setMember(staticMember);
          setOtherMembers(staticLeadership.filter(m => m.slug !== slug).slice(0, 3));
        } else {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTeamMember();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mw-blue-200 border-t-mw-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-mw-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mw-gray-900 mb-4">Team Member Not Found</h1>
          <p className="text-mw-gray-600 mb-8">The team member you're looking for doesn't exist.</p>
          <Link 
            href="/leadership"
            className="inline-flex items-center gap-2 px-6 py-3 bg-mw-blue-600 text-white font-medium rounded-lg hover:bg-mw-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Leadership
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-mw-blue-900 via-mw-blue-800 to-mw-gray-900 relative overflow-hidden">
        {/* Background elements */}
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/leadership"
              className="inline-flex items-center gap-2 text-mw-blue-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Leadership
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-mw-blue-500 to-mw-blue-600 rounded-2xl overflow-hidden shadow-2xl">
                {member.image && member.image !== '/assets/images/team-placeholder.jpg' ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-bold text-white/30">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                <span className="text-mw-blue-200 text-sm font-medium capitalize">{member.department}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {member.name}
              </h1>
              
              <p className="text-2xl text-mw-blue-200 mb-6">
                {member.role}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">About {member.name.split(' ')[0]}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-mw-gray-600 text-lg leading-relaxed">
                {member.bio}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Team Members */}
      {otherMembers.length > 0 && (
        <section className="py-20 bg-mw-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-mw-gray-900 mb-4">Other Team Members</h2>
              <p className="text-lg text-mw-gray-600">Meet more of our leadership team</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {otherMembers.map((otherMember, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/leadership/${otherMember.slug}`}
                    className="block bg-white rounded-xl shadow-mw-md border border-mw-gray-100 overflow-hidden group hover:shadow-mw-xl transition-all"
                  >
                    {/* Photo */}
                    <div className="relative h-48 bg-gradient-to-br from-mw-blue-100 to-mw-blue-50 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {otherMember.image && otherMember.image !== '/assets/images/team-placeholder.jpg' ? (
                          <img 
                            src={otherMember.image} 
                            alt={otherMember.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-br from-mw-blue-500 to-mw-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                              {otherMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-mw-gray-900 mb-1 group-hover:text-mw-blue-600 transition-colors">
                        {otherMember.name}
                      </h3>
                      <p className="text-mw-blue-600 font-medium text-sm">
                        {otherMember.role}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 px-6 py-3 bg-mw-blue-600 text-white font-medium rounded-lg hover:bg-mw-blue-700 transition-colors"
              >
                View All Team Members
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mw-blue-600 to-mw-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our mission of transforming outdoor advertising.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-xl hover:bg-mw-gray-100 transition-colors shadow-lg"
            >
              View Open Positions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
