import React from 'react';

// MW Influence's official brand geometry — four radiating rays, matching the icon already
// used for MW Influence on the MW Science page (InfluenceGeoIcon). Single-tone (currentColor),
// tinted by whatever wraps it — same convention as MW Studio's icon on the MW Inventory hero.
export const InfluenceGeometry: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M3 21 3 2 A19 19 0 0 1 6.53 2.33 Z" />
    <path d="M3 21 7.34 2.5 A19 19 0 0 1 12.15 4.35 Z" />
    <path d="M3 21 12.87 4.76 A19 19 0 0 1 18.52 10.05 Z" />
    <path d="M3 21 18.97 10.71 A19 19 0 0 1 22 21 Z" />
  </svg>
);
