// Pure helpers for plotting rational functions. No React, no DOM: safe to import
// from lesson slides and from the eval harness. The one job that matters here is
// splitting a curve into branches so it never draws across a vertical asymptote.

export type Pt = { x: number; y: number };

/**
 * Sample y = f(x) across [xMin, xMax] and return separate branches. The domain
 * is cut at each vertical asymptote, and a branch also ends whenever |y| exceeds
 * `yClip` (the curve is heading to +/- infinity), so connecting lines never leap
 * across a wall. Each returned branch has at least two points.
 */
export function sampleBranches(
  f: (x: number) => number,
  xMin: number,
  xMax: number,
  vas: number[],
  yClip: number,
  steps = 600,
): Pt[][] {
  const span = xMax - xMin;
  if (!(span > 0)) return [];
  const eps = (span / steps) * 0.6;
  const cuts = [
    xMin,
    ...vas.filter((v) => v > xMin && v < xMax).sort((a, b) => a - b),
    xMax,
  ];

  const branches: Pt[][] = [];
  for (let k = 0; k < cuts.length - 1; k += 1) {
    const lo = cuts[k] + (k === 0 ? 0 : eps);
    const hi = cuts[k + 1] - (k === cuts.length - 2 ? 0 : eps);
    if (!(hi > lo)) continue;
    const n = Math.max(2, Math.round(((hi - lo) / span) * steps));
    let cur: Pt[] = [];
    let lastOut: Pt | null = null;
    for (let i = 0; i <= n; i += 1) {
      const x = lo + ((hi - lo) * i) / n;
      const y = f(x);
      if (!Number.isFinite(y) || Math.abs(y) > yClip) {
        if (cur.length >= 1 && Number.isFinite(y)) {
          const prev = cur[cur.length - 1];
          if (y !== prev.y) {
            const edge = yClip * Math.sign(y);
            const u = (edge - prev.y) / (y - prev.y);
            if (u > 0 && u <= 1) cur.push({ x: prev.x + u * (x - prev.x), y: edge });
          }
        }
        if (cur.length > 1) branches.push(cur);
        cur = [];
        lastOut = Number.isFinite(y) ? { x, y } : null;
        continue;
      }
      if (cur.length === 0 && lastOut && lastOut.y !== y) {
        const edge = yClip * Math.sign(lastOut.y);
        const u = (edge - lastOut.y) / (y - lastOut.y);
        if (u >= 0 && u <= 1) cur.push({ x: lastOut.x + u * (x - lastOut.x), y: edge });
      }
      lastOut = null;
      cur.push({ x, y });
    }
    if (cur.length > 1) branches.push(cur);
  }
  return branches;
}

/** Format a y-value for a live readout, collapsing near-asymptote blowups. */
export function formatY(y: number): string {
  if (!Number.isFinite(y) || Math.abs(y) > 100) return y > 0 ? "large +" : "large -";
  return y.toFixed(2);
}
