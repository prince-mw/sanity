"use client";

import { createContext, useContext, type ReactNode } from "react";

// Lets a page supply motion graphics for a CMS section by its heading,
// without changing the section's content in Sanity. A two-column section
// shows the first one in place of its image; a text block slots each one in
// after the given number of paragraphs.

export type GraphicSlot = { after: number; node: ReactNode };

type Lookup = (heading?: string) => GraphicSlot[];

const SectionGraphicContext = createContext<Lookup>(() => []);

export function SectionGraphicProvider({ lookup, children }: { lookup: Lookup; children: ReactNode }) {
  return <SectionGraphicContext.Provider value={lookup}>{children}</SectionGraphicContext.Provider>;
}

export function useSectionGraphics(heading?: string): GraphicSlot[] {
  return useContext(SectionGraphicContext)(heading);
}
