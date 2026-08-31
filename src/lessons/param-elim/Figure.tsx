import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { formatValue } from "../../lib/trig";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const HALF = 1.8;
const STEPS = 240;
/** The parameter runs 0..pi, so the point traces only the UPPER half of the circle. */
const T_MAX = Math.PI;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** value is an integer 0..100; real t = (value / 100) * pi in [0, pi]. */
const tOf = (value: number) => (value / 100) * T_MAX;
const P = (t: number): [number, number] => [Math.cos(t), Math.sin(t)];

/** Live world coordinates and parameter for the dock readout. */
export function elimPoint(value: number) {
  const t = tOf(value);
  const [x, y] = P(t);
  return { x, y, t };
}

export default function ParamElimFigure({
  value,
  reveal,
  interactive,
  plot,
  onValue,
}: LessonFigureProps) {
  const plane = makePlane(SIZE, HALF);
  const svgRef = useRef<SVGSVGElement>(null);

  const t = tOf(value);
  const [wx, wy] = P(t);
  const px = plane.sx(wx);
  const py = plane.sy(wy);

  const arcBetween = (tA: number, tB: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const tt = tA + ((tB - tA) * i) / steps;
      const [x, y] = P(tt);
      d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
    }
    return d.trim();
  };

  const fullCircle = arcBetween(0, 2 * Math.PI, STEPS);
  const upperArc = arcBetween(0, T_MAX, Math.ceil(STEPS / 2));

  const ends: { t: number; label: string }[] = [
    { t: 0, label: "t=0" },
    { t: T_MAX, label: "t=\u03c0" },
  ];

  const scrub = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    if (plot) {
      plot.onGuess({ x: plane.wx(sX), y: plane.wy(sY) });
      return;
    }
    // Map the pointer to the nearest t on the upper arc so dragging scrubs t.
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i <= STEPS; i++) {
      const tt = (T_MAX * i) / STEPS;
      const [x, y] = P(tt);
      const dist = (plane.sx(x) - sX) ** 2 + (plane.sy(y) - sY) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = tt;
      }
    }
    onValue(() => (best / T_MAX) * 100);
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
      aria-label={`Unit circle x squared plus y squared equals 1. The parametric arc for 0 to pi covers the upper half. At t = ${t.toFixed(2)} the point is (${formatValue(wx, 2)}, ${formatValue(wy, 2)}).`}
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

      {reveal.full && fullCircle && <path d={fullCircle} className="curve-ghost" />}
      {reveal.arc && upperArc && <path d={upperArc} className="curve-trace" />}

      {reveal.ends &&
        ends.map((e) => {
          const [x, y] = P(e.t);
          const sx = plane.sx(x);
          const sy = plane.sy(y);
          return (
            <g key={e.label}>
              <circle cx={sx} cy={sy} r="5.5" className="sample-dot" />
              <text x={sx} y={sy + 20} textAnchor="middle" className="sample-label">
                {e.label}
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
