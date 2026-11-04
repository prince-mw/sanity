// Layout maths shared by every kit graphic. Pure functions, no React, so they
// can be checked on their own (geometry.check.ts).

export type Pt = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };

/**
 * The part of a drawing to show: the box around the points, padded, widened
 * or heightened to the wanted shape (w/h), and kept inside `bounds` where it
 * fits. Use it instead of hand-picked crops so no pin is ever cut off and no
 * corner is left empty.
 */
export function fitBox(points: Pt[], { pad, aspect, bounds }: { pad: number; aspect: number; bounds?: Box }): Box {
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  let x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad;
  let y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
  let w = x1 - x0, h = y1 - y0;
  // Grow the short side to reach the wanted shape, around the centre.
  if (w / h < aspect) { const nw = h * aspect; x0 -= (nw - w) / 2; w = nw; }
  else { const nh = w / aspect; y0 -= (nh - h) / 2; h = nh; }
  if (bounds) {
    // Slide back inside the drawing where there's room; never shrink.
    if (w <= bounds.w) x0 = Math.min(Math.max(x0, bounds.x), bounds.x + bounds.w - w);
    if (h <= bounds.h) y0 = Math.min(Math.max(y0, bounds.y), bounds.y + bounds.h - h);
  }
  return { x: round(x0), y: round(y0), w: round(w), h: round(h) };
}

/**
 * Pushes pins apart until none overlap (`minDist` apart, centre to centre),
 * while each stays as close as it can to its true spot (shown with a leader
 * line when it moved). Deterministic: same input, same output.
 */
export function spreadPins(anchors: Pt[], minDist: number, iterations = 200): Pt[] {
  const pts = anchors.map(a => ({ ...a }));
  for (let it = 0; it < iterations; it++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        let dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
        let d = Math.hypot(dx, dy);
        if (d >= minDist) continue;
        if (d < 1e-6) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 1; } // same spot: split on a fixed angle
        const push = (minDist - d) / 2 + 0.01;
        const ux = dx / d, uy = dy / d;
        pts[i].x -= ux * push; pts[i].y -= uy * push;
        pts[j].x += ux * push; pts[j].y += uy * push;
        moved = true;
      }
    }
    // Gentle pull home so pins don't drift further than needed.
    for (let i = 0; i < pts.length; i++) {
      pts[i].x += (anchors[i].x - pts[i].x) * 0.02;
      pts[i].y += (anchors[i].y - pts[i].y) * 0.02;
    }
    if (!moved) break;
  }
  // Final pass with no pull, so the spacing rule holds exactly.
  for (let it = 0; it < 50; it++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y, d = Math.hypot(dx, dy) || 1;
      if (d >= minDist) continue;
      const push = (minDist - d) / 2 + 0.01;
      pts[i].x -= dx / d * push; pts[i].y -= dy / d * push;
      pts[j].x += dx / d * push; pts[j].y += dy / d * push;
      moved = true;
    }
    if (!moved) break;
  }
  return pts.map(p => ({ x: round(p.x), y: round(p.y) }));
}

const round = (n: number) => Math.round(n * 10) / 10;
