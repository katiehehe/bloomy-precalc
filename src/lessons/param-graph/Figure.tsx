import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const HALF = 4;
const T_MIN = -2;
const T_MAX = 2;
const STEPS = 240;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Mode = "table" | "connect" | "orient" | "practice";

/** The running curve: a right-opening parabola x = t^2 - 1, y = t, drawn for t in [-2, 2]. */
const X = (t: number) => t * t - 1;
const Y = (t: number) => t;
const P = (t: number): [number, number] => [X(t), Y(t)];

/** value is an integer -100..100; real t = value / 50 lands t in [-2, 2]. */
const tOf = (value: number) => value / 50;

type Sample = { t: number; label: string };
/**
 * Demonstrated table rows, per slide mode. Kept off every plot answer so a
 * visible dot never gives away a later click (slide 1 shows t = -1 and t = 0 and
 * asks for t = 1; the your-turn slide shows no dots and asks for t = -2).
 */
const SAMPLES: Record<string, Sample[]> = {
  table: [
    { t: -1, label: "t=-1" },
    { t: 0, label: "t=0" },
  ],
  connect: [
    { t: -2, label: "t=-2" },
    { t: -1, label: "t=-1" },
    { t: 0, label: "t=0" },
    { t: 1, label: "t=1" },
    { t: 2, label: "t=2" },
  ],
  orient: [
    { t: -2, label: "t=-2" },
    { t: -1, label: "t=-1" },
    { t: 0, label: "t=0" },
    { t: 1, label: "t=1" },
    { t: 2, label: "t=2" },
  ],
};

/** A small triangular arrowhead at a screen-space tip, pointing along `ang`. */
function arrowHead(tipX: number, tipY: number, ang: number, size = 12) {
  const spread = 0.5;
  const l = [tipX - size * Math.cos(ang - spread), tipY - size * Math.sin(ang - spread)];
  const r = [tipX - size * Math.cos(ang + spread), tipY - size * Math.sin(ang + spread)];
  return `M${tipX.toFixed(2)} ${tipY.toFixed(2)} L${l[0].toFixed(2)} ${l[1].toFixed(2)} L${r[0].toFixed(2)} ${r[1].toFixed(2)} Z`;
}

/** Live world coordinates and parameter for the dock readout. */
export function graphPoint(value: number) {
  const t = tOf(value);
  const [x, y] = P(t);
  return { x, y, t };
}

export default function ParamGraphFigure({
  value,
  slide,
  reveal,
  interactive,
  plot,
  onValue,
}: LessonFigureProps) {
  const mode = (slide.mode as Mode) ?? "practice";
  const plane = makePlane(SIZE, HALF);
  const svgRef = useRef<SVGSVGElement>(null);

  const t = tOf(value);
  const [wx, wy] = P(t);
  const px = plane.sx(wx);
  const py = plane.sy(wy);

  const sampleBetween = (tA: number, tB: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const tt = tA + ((tB - tA) * i) / steps;
      const [x, y] = P(tt);
      d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
    }
    return d.trim();
  };

  const ghost = sampleBetween(T_MIN, T_MAX, STEPS);
  const traveled = Math.max(2, Math.ceil(((t - T_MIN) / (T_MAX - T_MIN)) * STEPS));
  const trace = sampleBetween(T_MIN, t, traveled);

  // Two orientation arrowheads, one per arm, each pointing the way t increases.
  const orientAt = (s: number) => {
    const [x1, y1] = P(s);
    const [x2, y2] = P(s + 0.06);
    const sx1 = plane.sx(x1);
    const sy1 = plane.sy(y1);
    const ang = Math.atan2(plane.sy(y2) - sy1, plane.sx(x2) - sx1);
    return arrowHead(sx1, sy1, ang);
  };

  const scrub = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sX = ((event.clientX - rect.left) / rect.width) * SIZE;
    const sY = ((event.clientY - rect.top) / rect.height) * SIZE;
    if (plot) {
      plot.onGuess({ x: plane.wx(sX), y: plane.wy(sY) });
      return;
    }
    // Map the pointer to the nearest t along the curve so dragging scrubs t.
    let best = T_MIN;
    let bestDist = Infinity;
    for (let i = 0; i <= STEPS; i++) {
      const tt = T_MIN + ((T_MAX - T_MIN) * i) / STEPS;
      const [x, y] = P(tt);
      const dist = (plane.sx(x) - sX) ** 2 + (plane.sy(y) - sY) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = tt;
      }
    }
    onValue(() => best * 50);
  };

  const labelX = clamp(px + 12, 48, SIZE - 48);
  const labelY = clamp(py - 16, 18, SIZE - 14);

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Parametric curve x = t squared minus 1, y = t. At t = ${t.toFixed(2)} the point is (${formatValue(wx, 2)}, ${formatValue(wy, 2)}).`}
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

      {reveal.curve && ghost && <path d={ghost} className="curve-ghost" />}
      {reveal.trace && trace && <path d={trace} className="curve-trace" />}

      {reveal.orient && (
        <>
          <path d={orientAt(-1)} className="curve-arrow" />
          <path d={orientAt(1)} className="curve-arrow" />
        </>
      )}

      {reveal.samples &&
        SAMPLES[mode]?.map((s) => {
          const [x, y] = P(s.t);
          const sx = plane.sx(x);
          const sy = plane.sy(y);
          return (
            <g key={s.label}>
              <circle cx={sx} cy={sy} r="5.5" className="sample-dot" />
              <text x={sx + 10} y={sy + 4} textAnchor="start" className="sample-label">
                {s.label}
              </text>
            </g>
          );
        })}

      {reveal.components && !plot && (
        <>
          <line x1={px} y1={py} x2={px} y2={plane.center} className="proj-y" />
          <line x1={px} y1={py} x2={plane.center} y2={py} className="proj-x" />
        </>
      )}

      <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />

      {reveal.point && !plot && (
        <>
          <circle cx={px} cy={py} r="8.5" className="point-dot" />
          <g className="point-label" transform={`translate(${labelX}, ${labelY})`}>
            <text textAnchor="middle" y={4}>
              ({formatValue(wx, 2)}, {formatValue(wy, 2)})
            </text>
          </g>
        </>
      )}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
