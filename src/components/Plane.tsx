import type { ReactNode } from "react";

/** A world-to-screen mapping centred on the origin. Square when halfY is omitted. */
export type Plane = {
  size: number;
  center: number;
  /** Pixels per world x-unit. */
  unit: number;
  /** Pixels per world y-unit. Equals `unit` on a square plane. */
  unitY: number;
  /** World half-range on the x-axis, from the origin to an edge. */
  half: number;
  /** World half-range on the y-axis. Equals `half` on a square plane. */
  halfY: number;
  sx: (worldX: number) => number;
  sy: (worldY: number) => number;
  wx: (screenX: number) => number;
  wy: (screenY: number) => number;
};

const MARGIN = 26;

/** Integer tick/grid step that stays readable as the window grows. */
function tickStep(half: number) {
  if (half <= 8) return 1;
  if (half <= 16) return 2;
  if (half <= 40) return 5;
  if (half < 80) return 10;
  return 20;
}

export function makePlane(size: number, half: number, halfY = half): Plane {
  const center = size / 2;
  const unit = (center - MARGIN) / half;
  const unitY = (center - MARGIN) / halfY;
  return {
    size,
    center,
    unit,
    unitY,
    half,
    halfY,
    sx: (worldX) => center + worldX * unit,
    sy: (worldY) => center - worldY * unitY,
    wx: (screenX) => (screenX - center) / unit,
    wy: (screenY) => (center - screenY) / unitY,
  };
}

/**
 * Just the integer tick numbers along each axis. Kept separate from PlaneGrid so
 * a figure can draw the grid first, then its curve, then the numbers on top, so
 * a curve passing through an axis never slices through a label. Each number also
 * carries a surface-colored halo (see `.tick-label` in styles.css) for contrast.
 */
export function PlaneTicks({ plane }: { plane: Plane }) {
  const { center, unit, unitY, half, halfY } = plane;
  const xStep = tickStep(half);
  const yStep = tickStep(halfY);
  const ticks: ReactNode[] = [];
  for (let n = xStep; n <= half + 1e-6; n += xStep) {
    ticks.push(
      <text key={`tx${n}`} x={center + n * unit} y={center + 15} className="tick-label" textAnchor="middle">
        {n}
      </text>,
    );
    ticks.push(
      <text key={`tx-${n}`} x={center - n * unit} y={center + 15} className="tick-label" textAnchor="middle">
        {-n}
      </text>,
    );
  }
  for (let n = yStep; n <= halfY + 1e-6; n += yStep) {
    ticks.push(
      <text key={`ty${n}`} x={center - 8} y={center - n * unitY + 4} className="tick-label" textAnchor="end">
        {n}
      </text>,
    );
    ticks.push(
      <text key={`ty-${n}`} x={center - 8} y={center + n * unitY + 4} className="tick-label" textAnchor="end">
        {-n}
      </text>,
    );
  }
  return <>{ticks}</>;
}

/** Axes, a light integer grid, and small tick numbers. Draw this first. */
export function PlaneGrid({
  plane,
  labels = true,
}: {
  plane: Plane;
  labels?: boolean;
}) {
  const { size, center, unit, unitY, half, halfY } = plane;
  const xStep = tickStep(half);
  const yStep = tickStep(halfY);
  const grid: ReactNode[] = [];

  for (let n = xStep; n <= half + 1e-6; n += xStep) {
    const gxPos = center + n * unit;
    const gxNeg = center - n * unit;
    grid.push(<line key={`v${n}`} x1={gxPos} y1={MARGIN} x2={gxPos} y2={size - MARGIN} className="grid-line" />);
    grid.push(<line key={`v-${n}`} x1={gxNeg} y1={MARGIN} x2={gxNeg} y2={size - MARGIN} className="grid-line" />);
  }
  for (let n = yStep; n <= halfY + 1e-6; n += yStep) {
    const gyPos = center - n * unitY;
    const gyNeg = center + n * unitY;
    grid.push(<line key={`h${n}`} x1={MARGIN} y1={gyPos} x2={size - MARGIN} y2={gyPos} className="grid-line" />);
    grid.push(<line key={`h-${n}`} x1={MARGIN} y1={gyNeg} x2={size - MARGIN} y2={gyNeg} className="grid-line" />);
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
      {labels && <PlaneTicks plane={plane} />}
    </>
  );
}
