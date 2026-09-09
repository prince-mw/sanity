'use client';

import React, { useState } from 'react';
import {
  Search,
  Pause,
  Play,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Radio,
} from 'lucide-react';
import { INITIAL_CAMPAIGNS, INITIAL_CREATIVES, PROOF_OF_PLAY_DATA } from './mockData';
import { CreativeItem, CampaignItem } from './types';

export const FeatureShowcase: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDateFilter] = useState('Today (Real-time)');

  const [creatives, setCreatives] = useState<CreativeItem[]>(INITIAL_CREATIVES);
  const [selectedCreative, setSelectedCreative] = useState<CreativeItem>(INITIAL_CREATIVES[2]);

  const [activeTimestamp] = useState('14:32:05');

  const handleToggleApproval = (id: string) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, approved: !c.approved } : c)));
  };

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Pending' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleApproveCreative = (id: string) => {
    setCreatives((prev) =>
      prev.map((cr) => (cr.id === id ? { ...cr, status: 'Approved', statusColor: 'green' } : cr))
    );
    if (selectedCreative.id === id) {
      setSelectedCreative((prev) => ({ ...prev, status: 'Approved', statusColor: 'green' }));
    }
  };

  const filteredCampaigns = campaigns.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="features" className="w-full">

      <div className="bg-[#13245d] text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 text-center border-y border-blue-900/40">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-sm font-semibold tracking-wider uppercase text-[#22d3ee]">
            Platform Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            More Than Allocation,<br className="hidden sm:inline" /> MW Influence Helps You Run Your Network Smarter
          </h2>
        </div>
      </div>

      {/* FEATURE 1: Take Manual Work Out of Campaign Operations */}
      <section id="campaign-operations" className="py-14 sm:py-16 lg:py-20 bg-[#fbf8ff] border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>01</span>
                <span>Automated Workflow</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Take Manual Work Out of Campaign Operations
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Streamline scheduling, creative approvals, campaign allocations, and inventory management so your team spends less time managing individual placements.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Instant bulk pacing adjustments &amp; floor price rules</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated slot conflict resolution across 1,000+ screens</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-xl border border-[#e3e1e8] overflow-hidden">

                <div className="bg-[#f8f7fc] p-4 sm:p-5 border-b border-[#e3e1e8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-[#14235d] text-base flex items-center gap-2">
                      Campaign Operations
                      <span className="text-xs bg-[#182b6e] text-white px-2 py-0.5 rounded font-normal">8 Live</span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f1d4a]/20 focus:border-[#0f1d4a]"
                      />
                    </div>

                    <div className="flex items-center gap-1 bg-white border border-gray-300 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <span>{activeDateFilter}</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#f5f2f9]/70 border-b border-[#e3e1e8] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Campaign Name</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Schedule Dates</th>
                        <th className="py-3 px-4 min-w-[130px]">Delivery</th>
                        <th className="py-3 px-3 text-center">Approval</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredCampaigns.slice(0, 8).map((camp) => (
                        <tr key={camp.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-2.5 px-4">
                            <div className="font-semibold text-gray-900">{camp.name}</div>
                            <div className="text-[10px] text-gray-400 font-normal">{camp.client}</div>
                          </td>
                          <td className="py-2.5 px-3">
                            <button
                              onClick={() => handleToggleStatus(camp.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                camp.status === 'Active'
                                  ? 'bg-[#0f1d4a] text-white hover:bg-[#0b162c]'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                            >
                              {camp.status}
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-gray-600 text-[11px] whitespace-nowrap">
                            {camp.schedule}
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                                  style={{ width: `${camp.deliveryPercent}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-bold text-gray-700 w-8">{camp.deliveryPercent}%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => handleToggleApproval(camp.id)}
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ${camp.approved ? 'bg-emerald-500 justify-end' : 'bg-gray-300 justify-start'}`}
                            >
                              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                            </button>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleToggleStatus(camp.id)}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-semibold flex items-center gap-1"
                              >
                                {camp.status === 'Active' ? <Pause className="w-2.5 h-2.5 text-amber-600" /> : <Play className="w-2.5 h-2.5 text-emerald-600" />}
                                <span>{camp.status === 'Active' ? 'Pause' : 'Resume'}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#f8f7fc] p-3 px-4 border-t border-[#e3e1e8] flex items-center justify-between text-xs text-gray-500">
                  <span>Showing {filteredCampaigns.length} campaigns across 12 digital networks</span>
                  <span className="font-semibold text-[#14235d]">All rules active</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 2: Keep Creative Operations Moving */}
      <section id="creative-operations" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <div className="bg-[#fbf8ff] rounded-2xl shadow-xl border border-[#e3e1e8] p-4 sm:p-6">

                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-[#14235d]">Creative Approvals</h4>
                  <div className="text-xs text-gray-500 font-medium">Workflow &amp; Status</div>
                </div>

                <div className="flex items-center justify-center max-w-lg mx-auto mb-6 px-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Submitted</span>
                    </div>
                    <span className="text-gray-300">→</span>

                    <div className="flex items-center gap-1 bg-white border border-amber-200 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-700 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Review</span>
                    </div>
                    <span className="text-gray-300">→</span>

                    <div className="flex items-center gap-1 bg-[#182b6e] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22d3ee]" />
                      <span>Approved</span>
                    </div>
                    <span className="text-gray-300">→</span>

                    <div className="flex items-center gap-1 bg-white border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Ready</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {creatives.map((cr) => (
                    <div
                      key={cr.id}
                      onClick={() => setSelectedCreative(cr)}
                      className={`group rounded-xl p-2 bg-white border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${selectedCreative.id === cr.id ? 'border-[#0f1d4a] ring-2 ring-[#0f1d4a]/20 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            cr.status === 'Review'
                              ? 'bg-amber-100 text-amber-800'
                              : cr.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-cyan-100 text-cyan-800'
                          }`}
                        >
                          {cr.status === 'Review' && 'Review'}
                          {cr.status === 'Approved' && '✓ Approved'}
                          {cr.status === 'Ready' && '✓ Ready'}
                        </span>
                      </div>

                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shadow-inner">
                        <img
                          src={cr.imageUrl}
                          alt={cr.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                          <div className="text-[11px] font-bold truncate">{cr.title}</div>
                          <div className="text-[9px] text-gray-300">{cr.duration} • {cr.aspectRatio.split(' ')[0]}</div>
                        </div>
                      </div>

                      <div className="mt-2 text-center">
                        <span className="text-[10px] text-gray-500 font-medium">{cr.advertiser}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedCreative && (
                  <div className="bg-white rounded-xl p-3.5 border border-[#e3e1e8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[#14235d] flex items-center gap-2">
                        <span>Selected: {selectedCreative.title}</span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{selectedCreative.resolution}</span>
                      </div>
                      <div className="text-[11px] text-gray-500">{selectedCreative.notes}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedCreative.status === 'Review' ? (
                        <button
                          onClick={() => handleApproveCreative(selectedCreative.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve Creative</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approved
                        </span>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>02</span>
                <span>Asset Management</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Keep Creative Operations Moving
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Review, approve, validate, and distribute creatives through streamlined workflows that help campaigns go live smoothly and on time.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated format verification (Aspect ratio, codec, FPS)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Edge caching directly to player hardware across all zones</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 3: Deliver Every Campaign With Confidence */}
      <section id="proof-of-play" className="py-14 sm:py-16 lg:py-20 bg-[#fbf8ff] border-b border-[#e3e1e8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#14235d] text-xs font-bold uppercase tracking-wider border border-blue-100">
                <span>03</span>
                <span>Verification &amp; Telemetry</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14235d] leading-tight tracking-tight">
                Deliver Every Campaign With Confidence
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Track campaign delivery and capture event-level proof of play across your network, making pacing, reconciliation, and advertiser reporting easier.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>100% camera-verified &amp; player-logged playback logs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399]/30 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Instant advertiser audit export with geocoded snapshots</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#0f1d4a] text-white rounded-2xl shadow-2xl border border-slate-700/80 p-4 sm:p-6 overflow-hidden">

                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-blue-200 uppercase">
                      Proof-Of-Play Report: Brand Showcase Campaign
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-slate-800 px-2 py-0.5 rounded">
                      <Radio className="w-3 h-3 text-[#22d3ee]" />
                      <span>DOOH Telemetry</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#182b6e] flex items-center justify-center text-[10px] font-bold text-[#22d3ee]">
                      POP
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-4">

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3 border border-white/10 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-blue-200 uppercase">Brand Billboard Ad</span>
                      <span className="bg-emerald-500/20 text-[#34d399] text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified Play
                      </span>
                    </div>

                    <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black shadow-inner group">
                      <img
                        src={PROOF_OF_PLAY_DATA.imageUrl}
                        alt="Digital Billboard Advertisement in Times Square"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-2.5">
                        <div className="flex justify-between items-start">
                          <span className="bg-[#182b6e]/90 text-[#22d3ee] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#22d3ee]/30 shadow">
                            Brand Ad
                          </span>
                          <span className="bg-black/80 text-[9px] font-sans text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            {activeTimestamp}
                          </span>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-white tracking-wide drop-shadow-md">
                            Times Square Spectacular
                          </div>
                          <div className="text-[9px] text-gray-300">
                            P4 LED • High Density DOOH
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-blue-200 uppercase">Playback Timeline</span>
                        <span className="text-[10px] text-gray-400">Oct 24, 2023 [14:00 - 15:00]</span>
                      </div>

                      <div className="bg-[#0b162c] p-2.5 rounded-lg border border-white/5 relative my-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] bg-emerald-500/20 text-[#34d399] px-1.5 py-0.5 rounded font-bold">
                            SUCCESSFUL
                          </span>
                          <span className="text-[10px] font-sans text-[#22d3ee] font-semibold">
                            14:32:05 • 15s
                          </span>
                        </div>

                        <div className="w-full h-2 bg-slate-700 rounded-full relative overflow-hidden my-1">
                          <div className="h-full bg-gradient-to-r from-blue-500 via-[#22d3ee] to-emerald-400 rounded-full" style={{ width: '68%' }} />
                        </div>

                        <div className="flex justify-between text-[8px] text-gray-400 font-sans mt-1">
                          <span>14:00</span>
                          <span>14:15</span>
                          <span>14:30</span>
                          <span>14:45</span>
                          <span>15:00</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-300 pt-1 border-t border-white/5">
                      <div>
                        <span className="text-gray-400">Brand Advertiser: </span>
                        <span className="font-semibold text-white">Global Brand Partner</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Campaign: </span>
                        <span className="font-semibold text-white">Premium DOOH Showcase</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-4">

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3 border border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-blue-100">
                      <MapPin className="w-3.5 h-3.5 text-[#22d3ee]" />
                      <span className="font-semibold">Times Square Broadway Spectacular (Billboard A-4)</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-sans">
                      LAT: 40.7580 • LONG: -73.9855 • Node ID: #NY-TS-04
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] text-gray-300 mb-1">
                        <span>Ad Performance (Hourly Pacing)</span>
                        <span className="text-emerald-400 font-bold">100% Target</span>
                      </div>
                      <div className="h-9 flex items-end gap-1 bg-[#0b162c] p-1.5 rounded border border-white/5">
                        <div className="flex-1 bg-blue-500/40 h-4 rounded-t" />
                        <div className="flex-1 bg-blue-500/60 h-6 rounded-t" />
                        <div className="flex-1 bg-blue-500/70 h-7 rounded-t" />
                        <div className="flex-1 bg-[#22d3ee] h-8 rounded-t shadow-sm shadow-[#22d3ee]" />
                        <div className="flex-1 bg-[#34d399] h-8 rounded-t" />
                        <div className="flex-1 bg-blue-400/40 h-5 rounded-t" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3 border border-white/10 flex flex-col justify-between">
                    <div className="text-[11px] font-semibold text-blue-200 uppercase mb-1.5">
                      Playback Events
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="bg-[#0b162c] p-2 rounded border border-white/5">
                        <div className="flex items-center justify-between text-white font-sans">
                          <span>14:32:05</span>
                          <span className="text-[#34d399] font-bold">SUCCESSFUL</span>
                        </div>
                        <div className="text-[9px] text-gray-400 mt-0.5">15s | Brand Showcase | Slot 04</div>
                      </div>

                      <div className="bg-[#0b162c] p-2 rounded border border-white/5 opacity-70">
                        <div className="flex items-center justify-between text-white font-sans">
                          <span>14:17:05</span>
                          <span className="text-[#34d399] font-bold">SUCCESSFUL</span>
                        </div>
                        <div className="text-[9px] text-gray-400 mt-0.5">15s | Brand Showcase | Slot 04</div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-center">
                  <div className="bg-[#13245d]/50 p-2 rounded-lg">
                    <div className="text-[9px] text-gray-400">Metrics</div>
                    <div className="text-sm font-bold text-white mt-0.5">18,450</div>
                    <div className="text-[8px] text-blue-200">Verified Impr.</div>
                  </div>
                  <div className="bg-[#13245d]/50 p-2 rounded-lg">
                    <div className="text-[9px] text-gray-400">Duration</div>
                    <div className="text-sm font-bold text-[#22d3ee] mt-0.5">15s</div>
                    <div className="text-[8px] text-blue-200">Spot Length</div>
                  </div>
                  <div className="bg-[#13245d]/50 p-2 rounded-lg">
                    <div className="text-[9px] text-gray-400">Loop Position</div>
                    <div className="text-sm font-bold text-white mt-0.5">4th</div>
                    <div className="text-[8px] text-blue-200">Rotation Slot</div>
                  </div>
                  <div className="bg-[#13245d]/50 p-2 rounded-lg">
                    <div className="text-[9px] text-gray-400">Quality</div>
                    <div className="text-sm font-bold text-[#34d399] mt-0.5">4K UHD</div>
                    <div className="text-[8px] text-blue-200">Camera Audit Sync</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 4: See Where Your Network Can Perform Better */}
      <section id="network-performance" className="py-14 sm:py-16 lg:py-24 bg-[#182b6e] text-white relative overflow-hidden">

        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#22d3ee]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">
              <div className="bg-[#0f1d4a]/95 backdrop-blur-xl rounded-2xl p-5 sm:p-7 shadow-2xl border border-white/15">

                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Network Performance
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-[#34d399] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Nodes: 120 | Status: Stable
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3.5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
                    <div className="text-[10px] font-semibold text-blue-200 mb-2">Global Screen Mesh Interconnect</div>

                    <div className="relative h-32 w-full bg-[#0b162c] rounded-lg p-2 flex items-center justify-center overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line x1="30" y1="30" x2="80" y2="20" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <line x1="80" y1="20" x2="140" y2="40" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
                        <line x1="140" y1="40" x2="170" y2="70" stroke="#34d399" strokeWidth="1" opacity="0.7" />
                        <line x1="80" y1="20" x2="100" y2="80" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
                        <line x1="30" y1="30" x2="60" y2="70" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                        <line x1="60" y1="70" x2="100" y2="80" stroke="#34d399" strokeWidth="1.5" opacity="0.8" />
                        <line x1="100" y1="80" x2="170" y2="70" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />

                        <circle cx="30" cy="30" r="4" fill="#22d3ee" />
                        <circle cx="80" cy="20" r="6" fill="#34d399" className="animate-pulse" />
                        <circle cx="140" cy="40" r="5" fill="#22d3ee" />
                        <circle cx="170" cy="70" r="4" fill="#fbbf24" />
                        <circle cx="60" cy="70" r="4" fill="#22d3ee" />
                        <circle cx="100" cy="80" r="5" fill="#34d399" />
                      </svg>
                      <div className="absolute bottom-1 right-2 text-[9px] font-sans text-gray-400">
                        12 Regions Active
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3.5 border border-white/10 flex flex-col justify-between">
                    <div className="text-[10px] font-semibold text-blue-200 mb-1">Revenue Opportunity</div>

                    <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/40 rounded-t h-12" />
                        <span className="text-[9px] text-gray-400 font-bold">Q1</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/60 rounded-t h-16" />
                        <span className="text-[9px] text-gray-400 font-bold">Q2</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500/80 rounded-t h-20" />
                        <span className="text-[9px] text-gray-400 font-bold">Q3</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-gradient-to-t from-[#22d3ee] to-[#34d399] rounded-t h-24 shadow-lg shadow-[#22d3ee]/30" />
                        <span className="text-[9px] text-[#34d399] font-bold">Q4</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

                  <div className="sm:col-span-5 bg-[#13245d] rounded-xl p-3.5 border border-white/10 text-center flex flex-col items-center justify-center">
                    <div className="text-[10px] font-semibold text-blue-200 uppercase mb-2">Inventory Utilization %</div>

                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#22d3ee]"
                          strokeDasharray="78, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-xl font-bold text-white tracking-tight">
                        78%
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-7 bg-[#13245d] rounded-xl p-3.5 border border-white/10 flex flex-col justify-center space-y-2">
                    <div className="text-[10px] font-semibold text-blue-200 uppercase mb-1">Campaign Delivery</div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-white font-medium">Campaign A</span>
                      </div>
                      <span className="text-[#34d399] font-bold">95% (On Track)</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-white font-medium">Campaign B</span>
                      </div>
                      <span className="text-amber-300 font-bold">In Progress</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] bg-[#0b162c] p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        <span className="text-white font-medium">Campaign C</span>
                      </div>
                      <span className="text-rose-300 font-bold">Delayed (Auto-reallocating)</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                <span>04</span>
                <span>Executive Analytics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                See Where Your Network Can Perform Better
              </h3>
              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
                Monitor campaign performance, inventory utilization, revenue opportunities, and operational activity through centralized network insights.
              </p>

              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3 text-sm text-blue-100 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399] text-[#14235d] flex items-center justify-center font-bold shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Identifies under-monetized slots &amp; off-peak opportunities</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-100 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#34d399] text-[#14235d] flex items-center justify-center font-bold shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automated revenue lift forecasting and yield benchmarking</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
