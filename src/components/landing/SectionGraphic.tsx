"use client";

import { createContext, useContext, type ReactNode } from "react";

// Lets a page supply a motion graphic for a CMS section by its heading,
// without changing the section's content in Sanity. Sections that get one
// show it in place of their image (or beside their text, for a text block).

type Lookup = (heading?: string) => ReactNode | null;

const SectionGraphicContext = createContext<Lookup>(() => null);

export function SectionGraphicProvider({ lookup, children }: { lookup: Lookup; children: ReactNode }) {
  return <SectionGraphicContext.Provider value={lookup}>{children}</SectionGraphicContext.Provider>;
}

export function useSectionGraphic(heading?: string): ReactNode | null {
  return useContext(SectionGraphicContext)(heading);
}
