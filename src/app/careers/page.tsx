"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "../../components/ContactForm";

export default function CareersPage() {
  const openRoles = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Build scalable advertising technology platforms using modern web technologies. Lead architecture decisions and mentor junior developers.",
      requirements: ["5+ years full-stack development", "React/Node.js expertise", "Cloud platforms (AWS/GCP)", "Agile methodologies"],
      level: "Senior"
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "New York, NY / Hybrid",
      type: "Full-time",
      description: "Drive go-to-market strategy for our advertising platform products. Work closely with sales and product teams to position our solutions.",
      requirements: ["3+ years product marketing", "B2B SaaS experience", "Campaign management", "Strong analytical skills"],
      level: "Mid-Level"
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Austin, TX / Remote",
      type: "Full-time",
      description: "Develop machine learning models for audience targeting and campaign optimization. Analyze large datasets to drive product insights.",
      requirements: ["PhD/MS in relevant field", "Python/R proficiency", "ML/AI frameworks", "Statistical modeling"],
      level: "Senior"
    },
    {
      title: "Account Executive",
      department: "Sales",
      location: "Chicago, IL / Hybrid",
      type: "Full-time",
      description: "Manage enterprise client relationships and drive new business growth. Develop strategic partnerships with major brands and agencies.",
      requirements: ["3+ years B2B sales", "Advertising industry knowledge", "CRM proficiency", "Strong communication"],
      level: "Mid-Level"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Design intuitive user experiences for our advertising platform. Create design systems and conduct user research.",
      requirements: ["4+ years UX/UI design", "Figma/Sketch expertise", "Design systems", "User research methods"],
      level: "Mid-Level"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA / Remote",
      type: "Full-time",
      description: "Manage cloud infrastructure and deployment pipelines. Ensure platform scalability and security best practices.",
      requirements: ["4+ years DevOps experience", "Kubernetes/Docker", "CI/CD pipelines", "Security practices"],
      level: "Senior"
    }
  ];

  const benefits = [
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision coverage plus wellness programs"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>,
      title: "Competitive Compensation",
      description: "Market-leading salaries with equity participation and performance bonuses"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      title: "Learning & Development",
      description: "Professional development budget, conference attendance, and skill-building programs"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO policy"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Team Culture",
      description: "Collaborative environment with team events, mentorship, and inclusive culture"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Innovation Time",
      description: "20% time for passion projects and innovation initiatives"
    }
  ];

  const departments = [
    { name: "Engineering", count: "12 roles", color: "bg-blue-100 text-blue-600" },
    { name: "Sales", count: "8 roles", color: "bg-green-100 text-green-600" },
    { name: "Marketing", count: "6 roles", color: "bg-purple-100 text-purple-600" },
    { name: "Data & Analytics", count: "5 roles", color: "bg-orange-100 text-orange-600" },
    { name: "Design", count: "4 roles", color: "bg-pink-100 text-pink-600" },
    { name: "Operations", count: "3 roles", color: "bg-indigo-100 text-indigo-600" }
  ];

  const stats = [
    { number: "200+", label: "Team Members" },
    { number: "25+", label: "Open Positions" },
    { number: "9", label: "Global Offices" },
    { number: "4.9/5", label: "Glassdoor Rating" }
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
              <span className="text-mw-blue-600 text-sm font-medium">Join Our Team</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Build Your Career
              <span className="text-mw-blue-600 block">Shape the Future</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join MovingWalls and help revolutionize the advertising industry. We're looking for 
              passionate innovators who want to make a real impact while growing their careers 
              in a dynamic, supportive environment.
            </p>
            
            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-mw-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <Link
              href="#open-roles"
              className="inline-flex items-center gap-2 px-8 py-3 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-semibold rounded-lg transition-colors shadow-mw-md"
            >
              View Open Roles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why MovingWalls Section */}
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
              Why Choose MovingWalls?
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              We believe in empowering our people to do their best work while building the future of advertising technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mw-blue-100 rounded-lg text-mw-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-mw-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-mw-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
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
              Teams & Departments
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-2xl mx-auto">
              Explore opportunities across our diverse teams and find where your skills can make the biggest impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-mw-md border border-mw-gray-100 hover:shadow-mw-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-mw-gray-900">{dept.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${dept.color}`}>
                    {dept.count}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mw-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-mw-gray-600 max-w-3xl mx-auto">
              Ready to make an impact? Explore our current openings and find your next opportunity.
            </p>
          </motion.div>

          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-mw-lg border border-mw-gray-100 p-6 hover:shadow-mw-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-mw-gray-900 mb-2">{role.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-mw-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
                        </svg>
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      role.level === 'Senior' ? 'bg-purple-100 text-purple-600' : 
                      role.level === 'Mid-Level' ? 'bg-blue-100 text-blue-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      {role.level}
                    </span>
                    <button className="px-6 py-2 bg-mw-blue-600 hover:bg-mw-blue-700 text-white font-medium rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>

                <p className="text-mw-gray-600 mb-4 leading-relaxed">{role.description}</p>

                <div>
                  <h4 className="text-sm font-semibold text-mw-gray-900 mb-2">Key Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.requirements.map((req, reqIndex) => (
                      <span
                        key={reqIndex}
                        className="px-3 py-1 bg-mw-gray-100 text-mw-gray-700 text-sm rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
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
              Don't See Your Perfect Role?
            </h2>
            <p className="text-xl text-mw-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're always looking for exceptional talent. Send us your resume and let us know 
              how you'd like to contribute to our mission of transforming advertising.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-mw-gray-50 text-mw-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
              >
                Send Your Resume
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
              <Link
                href="/leadership"
                className="px-8 py-3 border-2 border-white hover:bg-white hover:text-mw-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                Meet Our Leaders
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}