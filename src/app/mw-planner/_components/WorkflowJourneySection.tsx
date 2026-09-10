'use client';

import React, { useState } from 'react';
import { FileText, MapPin, ShieldCheck, Sliders, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from './mockData';

const DARK_GRID_STYLE = {
  backgroundSize: '36px 36px',
  backgroundImage:
    'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
};

const STEP_VISUALS: Record<string, React.ReactNode> = {
  '01': (
    <div className="w-full h-full flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-[#1b3472] pb-1">
        <div className="flex items-center gap-1">
          <FileText className="w-2.5 h-2.5 text-[#38bdf8]" />
          <span className="text-[8px] font-sans text-[#93c5fd] font-bold uppercase tracking-wider">Campaign Brief</span>
        </div>
        <span className="text-[7px] bg-[#102a6b] text-[#7dd3fc] px-1 py-0.5 rounded font-sans border border-[#1d408f]">NEW</span>
      </div>
      <div className="space-y-1 my-auto bg-[#071330]/90 rounded px-1.5 py-1 border border-[#162b63]">
        <div className="flex items-center justify-between text-[7px]">
          <span className="text-[#889bcc]">Market:</span>
          <span className="text-white font-medium font-sans">NYC Metro</span>
        </div>
        <div className="flex items-center justify-between text-[7px]">
          <span className="text-[#889bcc]">Target:</span>
          <span className="text-[#93c5fd] font-medium font-sans truncate max-w-[65px]">Affluent 25-54</span>
        </div>
        <div className="flex items-center justify-between text-[7px] border-t border-[#132352] pt-0.5">
          <span className="text-[#889bcc]">Budget:</span>
          <span className="text-emerald-400 font-bold font-sans">$95,000</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[7px] text-[#7dd3fc]">
        <span className="text-[#889bcc]">4-Wk Flight</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
          <CheckCircle2 className="w-2 h-2" /> Locked
        </span>
      </div>
    </div>
  ),
  '02': (
    <div className="w-full h-full relative flex flex-col justify-between">
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={DARK_GRID_STYLE} />
      <div className="flex items-center justify-between z-10 border-b border-[#1b3472] pb-1">
        <div className="flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5 text-[#38bdf8]" />
          <span className="text-[8px] font-sans text-[#93c5fd] font-bold uppercase">Live Sites</span>
        </div>
        <span className="text-[7px] bg-[#053229] text-emerald-400 px-1 py-0.5 rounded font-sans border border-[#0d594b]">1,245</span>
      </div>
      <div className="relative w-full h-9 my-auto">
        <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8] absolute top-0.5 left-2 animate-pulse" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] shadow-[0_0_8px_#60a5fa] absolute bottom-0.5 right-3" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-2 right-7" />
        <span className="w-2 h-2 rounded-full bg-[#fbbf24] absolute bottom-1.5 left-8" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="20%" y1="30%" x2="50%" y2="70%" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
          <line x1="50%" y1="70%" x2="80%" y2="40%" stroke="#34d399" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
        </svg>
      </div>
      <div className="flex items-center justify-between text-[7px] text-[#7dd3fc] font-sans z-10">
        <span className="text-[#889bcc]">DOOH + Static</span>
        <span className="text-emerald-400">98.4% Match</span>
      </div>
    </div>
  ),
  '03': (
    <div className="w-full h-full flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-[#4d3a11] pb-1">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5 text-[#fbbf24]" />
          <span className="text-[8px] font-bold text-[#fbbf24] uppercase tracking-wide">Affinity</span>
        </div>
        <span className="text-[7.5px] font-sans font-bold text-emerald-400 bg-[#06322b] px-1.5 py-0.5 rounded border border-[#0d594b]">142 Index</span>
      </div>
      <div className="space-y-1 my-auto">
        <div className="flex justify-between text-[7px] text-gray-300">
          <span>Concentration</span>
          <span className="text-[#fbbf24] font-semibold">High (84%)</span>
        </div>
        <div className="w-full bg-[#202e5a] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#fbbf24] h-full w-[84%] shadow-[0_0_6px_#fbbf24]" />
        </div>
      </div>
      <div className="flex items-center justify-between text-[7px] text-emerald-400 font-sans">
        <span>✓ Telco Validated</span>
        <span className="text-white">2.4M Reach</span>
      </div>
    </div>
  ),
  '04': (
    <div className="w-full h-full flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-[#1b3472] pb-1">
        <div className="flex items-center gap-1">
          <Sliders className="w-2.5 h-2.5 text-[#38bdf8]" />
          <span className="text-[8px] font-sans text-[#93c5fd] font-bold uppercase">Optimiser</span>
        </div>
        <span className="text-[7px] text-emerald-400 font-sans font-bold">+28% ROI</span>
      </div>
      <div className="grid grid-cols-2 gap-1 my-auto">
        <div className="bg-[#122864] p-1 rounded border border-[#213e8e] text-center">
          <div className="text-[6.5px] text-[#869bd5]">DOOH</div>
          <div className="text-[8px] font-bold text-[#38bdf8]">62%</div>
        </div>
        <div className="bg-[#122864] p-1 rounded border border-[#213e8e] text-center">
          <div className="text-[6.5px] text-[#869bd5]">Static</div>
          <div className="text-[8px] font-bold text-[#fbbf24]">38%</div>
        </div>
      </div>
      <div className="flex justify-between text-[7px] text-gray-300 font-sans">
        <span>Cost: $95k</span>
        <span className="text-[#38bdf8]">Reach: 4.2M</span>
      </div>
    </div>
  ),
  '05': (
    <div className="w-full h-full flex flex-col justify-between text-left">
      <div className="flex items-center justify-between border-b border-[#164a78] pb-1">
        <div className="flex items-center gap-1">
          <FileText className="w-2.5 h-2.5 text-[#38bdf8]" />
          <span className="text-[8px] font-sans text-[#38bdf8] font-bold uppercase">Proposal</span>
        </div>
        <span className="text-[7px] bg-[#0369a1] text-white px-1 py-0.5 rounded font-sans">PDF</span>
      </div>
      <div className="bg-[#0b2447] rounded p-1 border border-[#164b7d] my-auto">
        <div className="flex justify-between items-center text-[7px]">
          <span className="text-[#93c5fd]">Est. Reach</span>
          <span className="text-white font-bold font-sans">4.2M</span>
        </div>
        <div className="flex justify-between items-center text-[7px] mt-0.5">
          <span className="text-[#93c5fd]">Impressions</span>
          <span className="text-emerald-400 font-bold font-sans">12.5M</span>
        </div>
      </div>
      <div className="text-[7px] text-[#38bdf8] font-semibold text-center flex items-center justify-center gap-1">
        <CheckCircle2 className="w-2 h-2 text-[#38bdf8]" />
        <span>Ready for Client</span>
      </div>
    </div>
  ),
};

export const WorkflowJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('03');

  return (
    <section
      className="py-14 sm:py-16 lg:py-20 text-white overflow-hidden border-b border-[#213a85] relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(71, 90, 162, 0.35), transparent 70%), #132660',
      }}
      id="workflow-journey-section"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            Your OOH Planning Journey With MW Planner
          </h2>
          <p className="text-base sm:text-lg text-[#b7c4ff] font-normal">
            Every winning campaign starts with a smarter workflow.
          </p>
        </div>

        <div className="relative overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="min-w-[780px] md:min-w-0">
            <div className="relative mb-6">
              <div className="absolute top-6 left-[8%] right-[8%] h-[2px] bg-[#274092] z-0" />

              <div className="grid grid-cols-5 gap-3 lg:gap-4 relative z-10">
                {WORKFLOW_STEPS.map((item) => {
                  const isActive = activeStep === item.step;

                  return (
                    <div
                      key={item.step}
                      onClick={() => setActiveStep(item.step)}
                      className="flex flex-col items-center text-center cursor-pointer group transition-all duration-200 relative"
                    >
                      <div className="relative mb-3 flex items-center justify-center">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-[#0a1738] border-2 border-[#fbbf24] text-[#fbbf24] shadow-[0_0_16px_rgba(251,191,36,0.35)] scale-105'
                              : 'bg-[#0c1b44] border border-[#253f8e] text-white group-hover:border-[#38bdf8] group-hover:scale-105'
                          }`}
                        >
                          {item.step}
                        </div>
                      </div>

                      <div className={`text-xs font-bold tracking-wider uppercase mb-2.5 transition-colors whitespace-nowrap ${
                        isActive ? 'text-[#fbbf24]' : 'text-[#93c5fd] group-hover:text-white'
                      }`}>
                        {item.title}
                      </div>

                      <div
                        className={`w-full h-24 rounded-lg bg-[#0a1638] border p-2.5 mb-3 flex flex-col justify-between items-stretch transition-all overflow-hidden relative ${
                          isActive
                            ? 'border-[#fbbf24] bg-[#0d1d47] shadow-[0_0_15px_rgba(251,191,36,0.25)] ring-1 ring-[#fbbf24]/50'
                            : 'border-[#1f377e] group-hover:border-[#38bdf8]/60'
                        }`}
                      >
                        {STEP_VISUALS[item.step]}
                      </div>

                      <p className="text-xs text-[#c5d1fb] leading-relaxed">{item.tagline}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
