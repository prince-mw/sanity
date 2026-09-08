export interface MapBillboardLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  impressions: string;
  reach: string;
  format: 'Digital LED Spectacular' | 'Static Wallscape' | 'Transit Shelter' | 'Digital Urban Panel';
  x: number; // percentage on map
  y: number; // percentage on map
}
