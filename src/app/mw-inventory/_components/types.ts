export type AssetStatus = 'AVAILABLE' | 'LIVE' | 'BOOKED' | 'MAINTENANCE';
export type AssetFormat = 'Large Format LED (Landscape)' | 'Digital Spectacular' | 'Transit Screen' | 'Building Facade LED' | 'Bus Shelter Screen' | 'Static Billboard' | 'Wallscape' | 'Airport Banner';

export interface OOHAsset {
  id: string;
  code: string;
  name: string;
  location: string;
  city: string;
  venueType: string;
  format: AssetFormat;
  dimensions: string;
  status: AssetStatus;
  advertiser?: string;
  campaignName?: string;
  audienceIndex: number;
  audienceIndexLabel: string;
  availabilityNote: string;
  avgWeeklyImpressions: number; // in millions or raw count
  cpm: number;
  imageUrl: string;
  dailyRate: number;
  coordinates: { lat: number; lng: number };
  shareOfVoice: number; // percentage (e.g. 100% or 20% in loop)
  loopLengthSeconds: number;
  spotDurationSeconds: number;
  lightingType: 'Direct LED' | 'Backlit' | 'Frontlit' | 'Digital SMD';
}

export interface CalendarSlot {
  dateKey: string; // e.g. '2024-11-06'
  label: string; // e.g. 'M Nov 6'
  status: 'AVAILABLE' | 'BOOKED' | 'HOLD';
  campaignName?: string;
  advertiser?: string;
  occupancyPercent?: number;
}

export interface AssetSchedule {
  assetId: string;
  assetCode: string;
  assetName: string;
  formatType: string;
  slots: CalendarSlot[];
}

export interface NetworkBundle {
  id: string;
  name: string;
  badge: string;
  screenCount: number;
  screens: {
    id: string;
    name: string;
    location: string;
    reach: string;
  }[];
  totalReach: string;
  totalWeeklyImpressions: string;
  status: 'ACTIVE' | 'DRAFT' | 'PAUSED';
  bundledDiscount: number; // e.g. 15%
  combinedRate: number;
}

export interface SellingRules {
  minStayDuration: number;
  minStayUnit: 'days' | 'weeks' | 'months';
  minAdvanceBooking: number;
  minAdvanceUnit: 'days' | 'weeks';
  minLeadTimeHours: number;
  maxLeadTimeMonths: number;
  allowSameDayBookings: boolean;
  blockOutDatesEnabled: boolean;
  blockedDateRanges: { start: string; end: string; reason: string }[];
  requireHostApproval: boolean;
  autoApproveVerifiedAgencies: boolean;
}
