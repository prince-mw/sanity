import React from 'react';

// MW Planner's official brand geometry — the chevron/arrow mark supplied by the design team
// (Planner.svg), replacing the earlier single-tone placeholder arrow. Rendered single-tone
// via currentColor (both paths share one fill) — tinted white by the badge that wraps it,
// same convention as MW Studio's icon on the MW Inventory hero.
export const PlannerGeometry: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M302 200L194.659 14H97L204.208 200L97 386H194.659L302 200Z" fill="currentColor" />
    <path d="M194.659 14L302 200L194.659 386H97L204.208 200L97 14H194.659ZM208.825 200L103.923 382H192.35L297.381 200L192.35 18H103.923L208.825 200Z" fill="currentColor" />
  </svg>
);
