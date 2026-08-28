import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const TAU = Math.PI * 2;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Mode = "line" | "circle" | "free" | "lissajous";

/**
 * Per-slide geometry. For the line, `t` runs -tMax..tMax so the point can walk
 * both directions; for the others `t` runs 0..tMax. `P(t)` is a world-space point.
 */
const CONFIG: Record<Mode, { half: number; tMax: number; P: (t: number) => [number, number] }> = {
  line: { half: 5, tMax: 1.3, P: (t) => [2 * t, 3 * t] },
  circle: { half: 1.8, tMax: TAU, P: (t) => [Math.cos(t), Math.sin(t)] },
  lissajous: { half: 1.25, tMax: TAU, P: (t) => [Math.sin(2 * t), Math.sin(3 * t)] },
  free: { half: 3, tMax: 1, P: () => [0, 0] },
};

/** Demonstrated points that teach how to read a value of t off each curve. */
const SAMPLES: Partial<Record<Mode, { t: number; label: string }[]>> = {
  line: [
    { t: 1, label: "t=1" },
    { t: -1, label: "t=-1" },
  ],
  circle: [
    { t: Math.PI / 2, label: "t=\u03c0/2" },
    { t: Math.PI, label: "t=\u03c0" },
  ],
  lissajous: [
    { t: 0, label: "t=0" },
    { t: Math.PI / 4, label: "t=\u03c0/4" },
  ],
};

/** A small triangular arrowhead at a screen-space tip, pointing along `ang`. */
function arrowHead(tipX: number, tipY: number, ang: number, size = 12) {
  const spread = 0.5;
  const l = [tipX - size * Math.cos(ang - spread), tipY - size * Math.sin(ang - spread)];
  const r = [tipX - size * Math.cos(ang + spread), tipY - size * Math.sin(ang + spread)];
  return `M${tipX.toFixed(2)} ${tipY.toFixed(2)} L${l[0].toFixed(2)} ${l[1].toFixed(2)} L${r[0].toFixed(2)} ${r[1].toFixed(2)} Z`;
}

/** Live world coordinates and parameter, for the dock readout. */
export function parametricPoint(mode: string, value: number, values: Record<string, number>) {
  const cfg = CONFIG[(mode as Mode) ?? "lissajous"];
  if (mode === "free") return { x: (values.x ?? 0) / 100, y: (values.y ?? 0) / 100, t: 0 };
  const t = (value / 100) * cfg.tMax;
  const [x, y] = cfg.P(t);
  return { x, y, t };
}

export default function ParametricFigure({
  value,
  values,
  slide,
  reveal,
  interactive,
  plot,
  onValue,
  setValue,
}: LessonFigureProps) {
  const mode = (slide.mode as Mode) ?? "lissajous";
  const cfg = CONFIG[mode];
  const plane = makePlane(SIZE, cfg.half);
  const svgRef = useRef<SVGSVGElement>(null);
  const free = mode === "free";

  const t = free ? 0 : (value / 100) * cfg.tMax;
  const [wX, wY] = free ? [(values.x ?? 0) / 100, (values.y ?? 0) / 100] : cfg.P(t);
  const px = plane.sx(wX);
  const py = plane.sy(wY);

  const sample = (t1: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const tt = (t1 * i) / steps;
      const [x, y] = cfg.P(tt);
      d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
    }
    return d.trim();
  };

  const ghost = free ? "" : sample(cfg.tMax, 260);
  const traceSteps = Math.max(2, Math.ceil((value / 100) * 260));
  const trace = free ? "" : sample(t, traceSteps);

  const scrub = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sX = ((event.clientX - rect.left) / rect.width) * SIZE;
    const sY = ((event.clientY - rect.top) / rect.height) * SIZE;
    if (plot) {
      plot.onGuess({ x: plane.wx(sX), y: plane.wy(sY) });
      return;
    }
    if (free) {
      setValue("x", () => plane.wx(sX) * 100);
      setValue("y", () => plane.wy(sY) * 100);
      return;
    }
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i <= 260; i++) {
      const tt = (cfg.tMax * i) / 260;
      const [x, y] = cfg.P(tt);
      const dist = (plane.sx(x) - sX) ** 2 + (plane.sy(y) - sY) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = tt;
      }
    }
    onValue(() => (best / cfg.tMax) * 100);
  };

  const labelX = clamp(px, 48, SIZE - 48);
  const labelY = clamp(py - 20, 18, SIZE - 14);

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={
        free
          ? `Point at (${formatValue(wX, 2)}, ${formatValue(wY, 2)}).`
          : `Parametric point at t = ${t.toFixed(2)}.`
      }
      onPointerDown={(event) => {
        if (!interactive) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        scrub(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons) scrub(event);
      }}
    >
      <PlaneGrid plane={plane} />

      {mode === "line"
        ? reveal.path &&
          (() => {
            // Draw the whole line across the plane, with arrowheads, so it reads
            // as an endless line rather than a segment from the origin.
            const sEdge = cfg.half / 3;
            const [ax, ay] = cfg.P(-sEdge);
            const [bx, by] = cfg.P(sEdge);
            const sx1 = plane.sx(ax);
            const sy1 = plane.sy(ay);
            const sx2 = plane.sx(bx);
            const sy2 = plane.sy(by);
            const ang = Math.atan2(sy2 - sy1, sx2 - sx1);
            return (
              <>
                <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} className="curve-trace" />
                <path d={arrowHead(sx2, sy2, ang)} className="curve-arrow" />
                <path d={arrowHead(sx1, sy1, ang + Math.PI)} className="curve-arrow" />
              </>
            );
          })()
        : (
          <>
            {reveal.path && ghost && <path d={ghost} className="curve-ghost" />}
            {reveal.trace && trace && <path d={trace} className="curve-trace" />}
          </>
        )}

      {reveal.samples &&
        SAMPLES[mode]?.map((s) => {
          const [x, y] = cfg.P(s.t);
          const sx = plane.sx(x);
          const sy = plane.sy(y);
          return (
            <g key={s.label}>
              <circle cx={sx} cy={sy} r="5.5" className="sample-dot" />
              <text x={sx} y={sy - 11} textAnchor="middle" className="sample-label">
                {s.label}
              </text>
            </g>
          );
        })}

      {mode === "circle" && reveal.radius && !plot && (
        <line x1={plane.center} y1={plane.center} x2={px} y2={py} className="radius-line" />
      )}

      {reveal.components && !plot && (
        <>
          <line x1={px} y1={py} x2={px} y2={plane.center} className="proj-y" />
          <line x1={px} y1={py} x2={plane.center} y2={py} className="proj-x" />
        </>
      )}

      <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />
      {!plot && <circle cx={px} cy={py} r="8.5" className="point-dot" />}

      {!plot && (
        <g className="point-label" transform={`translate(${labelX}, ${labelY})`}>
          <text textAnchor="middle" y={4}>
            ({formatValue(wX, 2)}, {formatValue(wY, 2)})
          </text>
        </g>
      )}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
