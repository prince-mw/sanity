import { OOHAsset, NetworkBundle, SellingRules } from './types';

// Illustrative sample data for the feature-section mockups below.
// Not real inventory — used purely to demonstrate what the product looks like.

export const SAMPLE_ASSET: OOHAsset = {
  id: '00-14702',
  code: 'OOH-SFO-14702',
  name: 'Downtown Financial Tower Facade',
  location: '455 Market Street, San Francisco, CA',
  city: 'San Francisco, CA',
  venueType: 'Digital Spectacular | Premium Urban',
  format: 'Large Format LED (Landscape)',
  dimensions: '48 ft (W) x 14 ft (H)',
  status: 'LIVE',
  advertiser: 'Confidential (Tech Tier 1)',
  campaignName: 'AI Cloud Platform Launch',
  audienceIndex: 92,
  audienceIndexLabel: '92 (High Footfall)',
  availabilityNote: 'Booked until Dec 31, 2024',
  avgWeeklyImpressions: 1.2,
  cpm: 24.5,
  imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
  dailyRate: 4200,
  coordinates: { lat: 37.7915, lng: -122.3999 },
  shareOfVoice: 100,
  loopLengthSeconds: 60,
  spotDurationSeconds: 15,
  lightingType: 'Digital SMD',
};

export const SAMPLE_BUNDLE: NetworkBundle = {
  id: 'BND-MALL-01',
  name: 'Premium Mall Network',
  badge: '4 OOH Screens Bundled',
  screenCount: 4,
  screens: [
    { id: 'SC-01', name: 'Screen 01 - Main Atrium', location: 'Grand Atrium Central', reach: '850K imp/wk' },
    { id: 'SC-02', name: 'Screen 02 - Food Court', location: 'Level 2 Culinary Plaza', reach: '620K imp/wk' },
    { id: 'SC-03', name: 'Screen 03 - East Entrance', location: 'Level 1 Valet & Transit Entrance', reach: '480K imp/wk' },
    { id: 'SC-04', name: 'Screen 04 - Cinema Lobby', location: 'Entertainment Level 4', reach: '450K imp/wk' },
  ],
  totalReach: '2.4M',
  totalWeeklyImpressions: '2.4M Impressions / week',
  status: 'ACTIVE',
  bundledDiscount: 15,
  combinedRate: 4800,
};

export const SAMPLE_RULES: SellingRules = {
  minStayDuration: 2,
  minStayUnit: 'days',
  minAdvanceBooking: 1,
  minAdvanceUnit: 'days',
  minLeadTimeHours: 6,
  maxLeadTimeMonths: 12,
  allowSameDayBookings: true,
  blockOutDatesEnabled: false,
  blockedDateRanges: [
    { start: '2024-12-24', end: '2024-12-26', reason: 'Holiday Peak Minimum Floor Rate Enforced' },
  ],
  requireHostApproval: false,
  autoApproveVerifiedAgencies: true,
};
