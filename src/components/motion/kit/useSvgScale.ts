"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Screen pixels per drawing unit for an <svg> with the given viewBox width.
 * Kit graphics size pins, numbers and strokes in screen pixels with it, so a
 * map zoomed in on a phone never blows its labels up (the KL map bug).
 * Before the first measure it assumes `guessPx` wide, so server and first
 * client render match.
 */
export function useSvgScale(ref: RefObject<SVGSVGElement | null>, viewWidth: number, guessPx = 400): number {
  const [px, setPx] = useState(guessPx);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => { const w = el.getBoundingClientRect().width; if (w > 0) setPx(w); };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return px / viewWidth;
}

/** True below the given width (default: phones), after mount only. */
export function useNarrow(maxWidth = 639): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [maxWidth]);
  return narrow;
}
