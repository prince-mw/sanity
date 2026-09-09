export interface CampaignItem {
  id: string;
  name: string;
  client: string;
  status: 'Active' | 'Pending' | 'Optimizing' | 'Completed' | 'Draft';
  schedule: string;
  deliveryPercent: number;
  approved: boolean;
  type: 'Guaranteed' | 'Programmatic' | 'Direct' | 'House';
  priority: 'Protected' | 'Prioritized' | 'Normal' | 'Low';
  impressionsDelivered: string;
  revenue: string;
}

export interface CreativeItem {
  id: string;
  title: string;
  category: string;
  status: 'Review' | 'Approved' | 'Ready' | 'Submitted';
  statusColor: 'amber' | 'green' | 'cyan' | 'slate';
  aspectRatio: string;
  resolution: string;
  duration: string;
  imageUrl: string;
  notes: string;
  advertiser: string;
}

export interface ProofOfPlayEvent {
  id: string;
  timestamp: string;
  status: 'SUCCESSFUL' | 'VERIFIED' | 'PENDING';
  duration: string;
  billboardId: string;
  billboardName: string;
  campaign: string;
  client: string;
  location: string;
  lat: number;
  long: number;
  impressions: number;
  loopPosition: number;
  quality: string;
  imageUrl: string;
}
