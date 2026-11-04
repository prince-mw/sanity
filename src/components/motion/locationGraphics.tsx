"use client";

import type { ReactNode } from "react";
import { KlangValleyAtAGlance } from "./KlangValleyAtAGlance";
import { MalaysiaMarketMap } from "./MalaysiaMarketMap";

// Motion graphics per location page, keyed by the CMS section heading.
// Malaysia is the pilot; other countries add an entry here.

const GRAPHICS: Record<string, Record<string, () => ReactNode>> = {
  malaysia: {
    "digital billboard advertising malaysia": () => <KlangValleyAtAGlance />,
    "market landscape": () => <MalaysiaMarketMap />,
  },
};

export function locationGraphicLookup(slug: string) {
  const forPage = GRAPHICS[slug];
  return (heading?: string) => {
    const make = forPage && heading ? forPage[heading.trim().toLowerCase()] : undefined;
    return make ? make() : null;
  };
}
