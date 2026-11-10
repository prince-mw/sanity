"use client";

// One dependable way to reveal a graphic when it scrolls into view.
//
// Variant propagation (parent `whileInView="show"`, children with `variants`)
// proved unreliable here: the parent entered and animated, the children stayed
// hidden. So each animated element gets its own explicit `animate` state from
// the wrapper's `useInView`. Safari-safe too: the observer watches an HTML
// element, never a shape inside an SVG.

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useReveal(amount = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const state: "show" | "hidden" = inView ? "show" : "hidden";
  return { ref, inView, state };
}

/** Props for a motion element: starts hidden, shows with `state`. */
export const reveal = (state: "show" | "hidden") => ({ initial: "hidden" as const, animate: state });
