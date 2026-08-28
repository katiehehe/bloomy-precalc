import type { ReactNode } from "react";

/** A square world-to-screen mapping centred on the origin. */
export type Plane = {
  size: number;
  center: number;
  /** Pixels per world unit. */
  unit: number;
  /** World half-range shown from the origin to an edge. */
  half: number;
  sx: (worldX: number) => number;
  sy: (worldY: number) => number;
  wx: (screenX: number) => number;
  wy: (screenY: number) => number;
};

const MARGIN = 26;

export function makePlane(size: number, half: number): Plane {
  const center = size / 2;
  const unit = (center - MARGIN) / half;
  return {
    size,
    center,
    unit,
    half,
    sx: (worldX) => center + worldX * unit,
    sy: (worldY) => center - worldY * unit,
    wx: (screenX) => (screenX - center) / unit,
    wy: (screenY) => (center - screenY) / unit,
  };
}

/** Axes, a light integer grid, and small tick numbers. Draw this first. */
export function PlaneGrid({
  plane,
  labels = true,
}: {
  plane: Plane;
  labels?: boolean;
}) {
  const { size, center, unit, half } = plane;
  const nMax = Math.floor(half + 1e-6);
  const grid: ReactNode[] = [];

  for (let n = -nMax; n <= nMax; n++) {
    if (n === 0) continue;
    const gx = center + n * unit;
    const gy = center - n * unit;
    grid.push(<line key={`v${n}`} x1={gx} y1={MARGIN} x2={gx} y2={size - MARGIN} className="grid-line" />);
    grid.push(<line key={`h${n}`} x1={MARGIN} y1={gy} x2={size - MARGIN} y2={gy} className="grid-line" />);
  }

  const ticks: ReactNode[] = [];
  if (labels) {
    for (let n = -nMax; n <= nMax; n++) {
      if (n === 0) continue;
      ticks.push(
        <text key={`tx${n}`} x={center + n * unit} y={center + 15} className="tick-label" textAnchor="middle">
          {n}
        </text>,
      );
      ticks.push(
        <text key={`ty${n}`} x={center - 8} y={center - n * unit + 4} className="tick-label" textAnchor="end">
          {n}
        </text>,
      );
    }
  }

  return (
    <>
      {grid}
      <line x1={MARGIN} y1={center} x2={size - MARGIN} y2={center} className="axis" />
      <line x1={center} y1={MARGIN} x2={center} y2={size - MARGIN} className="axis" />
      <text x={size - 10} y={center - 8} className="axis-label" textAnchor="end">
        x
      </text>
      <text x={center + 10} y={MARGIN + 2} className="axis-label">
        y
      </text>
      {ticks}
    </>
  );
}
