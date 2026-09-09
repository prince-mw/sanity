import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const AUDIENCE_ROLES = [
  {
    title: 'Advertisers',
    href: '/brands',
    role: 'Brand Marketers & CMOs',
    description: 'Understand true campaign effectiveness, identify audience saturation thresholds, and confidently justify media investment with board-ready proof.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop',
    outcome: 'Verified ROI & Saturation Curves'
  },
  {
    title: 'Agencies',
    href: '/agencies',
    role: 'Media Planners & Buyers',
    description: 'Deliver transparent cross-network reporting, eliminate vendor discrepancies, and provide measurable attribution outcomes for every client account.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop',
    outcome: 'Multi-Vendor Deduplication'
  },
  {
    title: 'Media Owners',
    href: '/media-owners',
    role: 'DOOH & Billboard Operators',
    description: 'Demonstrate premium inventory value, prove audience dwell time and movement flow, and give buyers accredited third-party measurement proof.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=900&auto=format&fit=crop',
    outcome: 'Accredited Asset Valuation'
  }
];

export const AudiencesSection: React.FC = () => {
  return (
    <section id="audiences" className="bg-[#f8fafc] text-slate-900 py-12 sm:py-16 lg:py-20 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14235d]">
            Built for Everyone Responsible for OOH Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUDIENCE_ROLES.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={role.image}
                  alt={role.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#14235d] text-[10px] font-bold shadow-sm">
                  {role.role}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/95">
                  {role.outcome}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#14235d] group-hover:text-blue-600 transition-colors">
                      {role.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Explore More</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
