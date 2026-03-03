"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CommunityPage() {
  const communityStats = [
    { number: "5,000+", label: "Members" },
    { number: "1,200+", label: "Discussions" },
    { number: "150+", label: "Events/Year" }
  ];

  const discussions = [
    { title: "Best practices for automotive campaigns", author: "Sarah M.", replies: 24, views: 342 },
    { title: "How to optimize DOOH for retail", author: "Mike T.", replies: 18, views: 256 },
    { title: "Programmatic buying strategies", author: "Lisa K.", replies: 31, views: 489 },
    { title: "Healthcare advertising compliance tips", author: "Dr. Chen", replies: 15, views: 198 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-mw-blue-50 via-white to-mw-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mw-gray-900 mb-6">
              Join Our
              <span className="text-mw-blue-600 block">Community</span>
            </h1>
            <p className="text-xl text-mw-gray-600 max-w-3xl mx-auto mb-8">
              Connect with advertising professionals, share insights, and learn from industry experts.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-mw-blue-600">{stat.number}</div>
                  <div className="text-sm text-mw-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="px-8 py-4 bg-mw-blue-600 text-white font-medium rounded-lg hover:bg-mw-blue-700 transition-colors">
              Join Community
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Discussions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-mw-gray-900 mb-8">Trending Discussions</h2>
          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-mw-gray-200 rounded-xl p-6 hover:shadow-mw-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-mw-gray-900 mb-2">{discussion.title}</h3>
                    <p className="text-sm text-mw-gray-600">Started by {discussion.author}</p>
                  </div>
                  <div className="flex gap-6 text-sm text-mw-gray-600">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-mw-blue-600 to-mw-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Contributing Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Share your knowledge and learn from the best in the industry.
          </p>
          <button className="px-8 py-4 bg-white text-mw-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Create Account
          </button>
        </div>
      </section>
    </div>
  );
}
