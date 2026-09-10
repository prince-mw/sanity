import React from 'react';

// MW Planner's official brand geometry — an arrow/compass point, matching the icon already
// used for MW Planner on the MW Science page (PlannerGeoIcon). Single-tone (currentColor),
// tinted by whatever wraps it — same convention as MW Studio's icon on the MW Inventory hero.
export const PlannerGeometry: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 3 20 12 6 21 11 12Z" />
  </svg>
);
