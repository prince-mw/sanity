import React from 'react';
import Link from 'next/link';
import { Building2, Store, CheckCircle2, ArrowRight } from 'lucide-react';

const CARDS = [
  {
    title: 'Agencies',
    href: '/agencies',
    Icon: Building2,
    roleTag: 'Media Planners & Buyers',
    description: 'Build stronger media recommendations and give clients a clear rationale behind every OOH decision.',
    toolkitLabel: 'Agency Toolkit Highlights',
    highlights: ['Reduce planning time by 40%', 'Multi-market scenario comparison'],
  },
  {
    title: 'Advertisers',
    href: '/brands',
    Icon: Store,
    roleTag: 'Brand & Marketing Leaders',
    description: 'Understand where your OOH budget goes, who it reaches, and what your plan can deliver.',
    toolkitLabel: 'Brand Toolkit Highlights',
    highlights: ['Transparent inventory access', 'Omnichannel audience alignment'],
  },
];

export const AudienceCardsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#f8f9fc] border-b border-[#e2e8f0]" id="audience-cards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#062068] tracking-tight mb-3">
            Built for Those Who Build OOH Plans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div>
                <div className="bg-[#0b1b46] px-6 py-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2.5">
                    <card.Icon className="w-5 h-5 text-[#93c5fd]" />
                    <h3 className="text-lg font-bold">{card.title}</h3>
                  </div>
                  <span className="text-[11px] font-sans text-[#93c5fd] bg-[#152759] px-2.5 py-1 rounded">
                    {card.roleTag}
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{card.description}</p>

                  <div className="bg-[#f8f9fc] rounded-lg p-4 border border-[#e2e8f0] space-y-2.5">
                    <div className="text-xs font-bold text-[#062068] uppercase tracking-wider">{card.toolkitLabel}</div>
                    <div className="space-y-2 text-xs sm:text-sm text-[#191c1e]">
                      {card.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6">
                <div className="w-full py-3 rounded-lg bg-[#edf2fe] group-hover:bg-[#dde1ff] text-[#062068] text-xs font-bold tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2">
                  <span>Explore More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
