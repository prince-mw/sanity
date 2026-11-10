"use client";

import type { GraphicSlot } from "../landing/SectionGraphic";
import { KlangValleyAtAGlance } from "./KlangValleyAtAGlance";
import { KualaLumpurHighlights } from "./KualaLumpurHighlights";
import { MalaysiaMarketMap } from "./MalaysiaMarketMap";
import { KualaLumpurLandscape } from "./KualaLumpurLandscape";

// Motion graphics per location page, keyed by the CMS section heading.
// `after` is how many paragraphs come before the graphic (text blocks only;
// a two-column section uses the first graphic in place of its image).
// Malaysia is the pilot; other countries add an entry here.

const GRAPHICS: Record<string, Record<string, () => GraphicSlot[]>> = {
  malaysia: {
    "digital billboard advertising malaysia": () => [{ after: 0, node: <KlangValleyAtAGlance /> }],
    "market landscape": () => [
      { after: 1, node: <MalaysiaMarketMap /> },
      { after: 3, node: <KualaLumpurHighlights /> },
    ],
  },
  // city page (the lookup receives the city slug)
  "kuala-lumpur": {
    "market landscape": () => [{ after: 1, node: <KualaLumpurLandscape /> }],
  },
};

export function locationGraphicLookup(slug: string) {
  const forPage = GRAPHICS[slug];
  return (heading?: string): GraphicSlot[] => {
    const make = forPage && heading ? forPage[heading.trim().toLowerCase()] : undefined;
    return make ? make() : [];
  };
}
