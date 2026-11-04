// npx -y tsx src/components/motion/kit/geometry.check.ts
import { fitBox, spreadPins } from "./geometry";

let fails = 0;
const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log("FAIL", m); } else console.log("ok  ", m); };

// KL pins (as in kl-map.ts)
const kl = [{ x: 198.4, y: 69.4 }, { x: 277.7, y: 299.7 }, { x: 255.6, y: 314.4 }, { x: 275.4, y: 332.3 }, { x: 225.7, y: 328.8 }, { x: 215.1, y: 346.7 }, { x: 208.7, y: 358.2 }];

const b = fitBox(kl, { pad: 40, aspect: 0.85, bounds: { x: 0, y: 0, w: 460, h: 625 } });
ok(kl.every(p => p.x - 40 >= b.x - 0.1 && p.x + 40 <= b.x + b.w + 0.1 && p.y - 40 >= b.y - 0.1 && p.y + 40 <= b.y + b.h + 0.1), "every pin plus padding is inside the fitted box");
ok(Math.abs(b.w / b.h - 0.85) < 0.01, "fitted box has the wanted shape");
ok(b.x >= 0 && b.y >= 0 && b.x + b.w <= 460 && b.y + b.h <= 625, "fitted box stays inside the drawing");

for (const minDist of [20, 30, 45]) {
  const s = spreadPins(kl, minDist);
  let min = Infinity;
  for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) min = Math.min(min, Math.hypot(s[i].x - s[j].x, s[i].y - s[j].y));
  ok(min >= minDist - 0.2, `no two pins closer than ${minDist} (closest ${min.toFixed(1)})`);
  ok(Math.hypot(s[0].x - kl[0].x, s[0].y - kl[0].y) < 1, `a lone pin (Batu Caves) doesn't move at ${minDist}`);
}
ok(JSON.stringify(spreadPins(kl, 30)) === JSON.stringify(spreadPins(kl, 30)), "same input, same layout");
const same = spreadPins([{ x: 5, y: 5 }, { x: 5, y: 5 }], 10);
ok(Math.hypot(same[0].x - same[1].x, same[0].y - same[1].y) >= 9.8, "two pins on the same spot are split apart");

if (fails) { console.log(`${fails} failed`); process.exit(1); }
console.log("all passed");
