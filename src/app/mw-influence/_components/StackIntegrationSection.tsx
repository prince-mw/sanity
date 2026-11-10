import React from 'react';
import { Network, Cpu, Layers } from 'lucide-react';

export const StackIntegrationSection: React.FC = () => {
  return (
    <section id="stack-integrations" className="bg-[#fbf8ff] text-[#1b1b20] border-b border-[#e3e1e8] mw-section">
      <div className="mw-container">

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-extrabold tracking-tight text-[#2563eb] mb-4 text-3xl lg:text-4xl">
            Built to Work With Your Existing Stack
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            MW Influence integrates seamlessly with your SSPs, DSPs, CMS, and CRM.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-[#faf9fe] rounded-2xl p-6 sm:p-10 border border-[#e3e1e8] shadow-lg relative overflow-hidden">

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e3e1e815_1px,transparent_1px),linear-gradient(to_bottom,#e3e1e815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Network className="w-4 h-4 text-[#22d3ee]" />
              <span>Unified OOH Orchestration Protocol</span>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Bi-directional Sync Active
            </span>
          </div>

          <div className="relative py-6 sm:py-8 z-10">

            <div className="flex flex-wrap justify-center gap-3 sm:gap-16 mb-6 sm:mb-10">
              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>CMS</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Screens</span>
              </div>

              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>SSP</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Yield</span>
              </div>

              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>DSP</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Bidding</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between max-w-2xl mx-auto gap-3 sm:gap-4 my-4">

              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>CRM</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Direct</span>
              </div>

              <div className="relative group order-first w-full flex justify-center mb-3 sm:order-none sm:w-auto sm:mb-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#22d3ee] via-[#2563eb] to-[#34d399] rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative bg-[#0f1d4a] text-white px-5 sm:px-8 py-4 sm:py-5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#22d3ee]/20 flex items-center justify-center border border-[#22d3ee]/40">
                    <Cpu className="w-6 h-6 text-[#22d3ee]" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                      MW Influence
                      <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
                    </div>
                    <div className="text-xs text-blue-200/80 font-medium">Core Allocation Router</div>
                  </div>
                </div>
              </div>

              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>Planning</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Audience</span>
              </div>

            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-20 mt-6 sm:mt-10 mb-8">
              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>Reporting</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">POP Logs</span>
              </div>

              <div className="px-3.5 sm:px-5 py-2.5 rounded-2xl border border-blue-900 font-bold text-sm bg-[#2563eb] text-white shadow-sm flex items-center gap-2">
                <span>Billing</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-lg">Invoicing</span>
              </div>
            </div>

            <div className="max-w-xl mx-auto mt-4 pt-4 border-t border-dashed border-gray-300">
              <div className="bg-white rounded-2xl p-3.5 border-2 border-blue-200 shadow-sm text-center">
                <div className="text-xs font-bold text-[#2563eb] uppercase tracking-wider flex items-center justify-center gap-2">
                  <Layers className="w-4 h-4 text-[#22d3ee]" />
                  <span>OOH Network / Campaign Operations</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  1,540+ Media Players • Edge Sync • Camera Feeds • Fallback Safe
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
