import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 480;
const HALF = 8.5;
const TMAX = 4;
const STEPS = 240;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The running projectile model in clean folded units: horizontal position is
 * steady (linear) and vertical position is bent by gravity (quadratic). The
 * gravity term is $-t^2$, i.e. $-\tfrac{1}{2}g t^2$ with $\tfrac{1}{2}g = 1$.
 */
const X = (t: number) => 2 * t;
const Y = (t: number) => 4 * t - t * t;
const P = (t: number): [number, number] => [X(t), Y(t)];

const PEAK = { x: 4, y: 4 };
const LANDING = { x: 8, y: 0 };

type Sample = { t: number; label: string };
/** Demonstrated readings, kept off every plot answer (which sit at t = 2 and t = 4). */
const SAMPLES: Record<string, Sample[]> = {
  projectile: [
    { t: 1, label: "t=1" },
    { t: 3, label: "t=3" },
  ],
};

/** Round to two decimals, never render a signed zero, drop a trailing ".00". */
const fmt = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** Live world position and time for the dock readout. */
export function projectilePoint(value: number) {
  const t = (value / 100) * TMAX;
  const [x, y] = P(t);
  return { x, y, t };
}

export default function ProjectileFigure({
  value,
  slide,
  reveal,
  interactive,
  plot,
  onValue,
}: LessonFigureProps) {
  const mode = slide.mode ?? "projectile";
  const plane = makePlane(SIZE, HALF);
  const svgRef = useRef<SVGSVGElement>(null);

  const t = (value / 100) * TMAX;
  const [wx, wy] = P(t);
  const mx = plane.sx(wx);
  const my = plane.sy(wy);
  const groundY = plane.sy(0);
  const originX = plane.sx(0);

  const pathTo = (tEnd: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const tt = (tEnd * i) / steps;
      const [x, y] = P(tt);
      d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
    }
    return d.trim();
  };

  const ghost = pathTo(TMAX, STEPS);
  const traceSteps = Math.max(2, Math.ceil((t / TMAX) * STEPS));
  const trace = pathTo(t, traceSteps);

  const scrub = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    if (plot) {
      plot.onGuess({ x: plane.wx(sX), y: plane.wy(sY) });
      return;
    }
    // Map the pointer to the nearest time along the arc so dragging scrubs t.
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i <= STEPS; i++) {
      const tt = (TMAX * i) / STEPS;
      const [x, y] = P(tt);
      const dist = (plane.sx(x) - sX) ** 2 + (plane.sy(y) - sY) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = tt;
      }
    }
    onValue(() => (best / TMAX) * 100);
  };

  const labelX = clamp(mx, 46, SIZE - 46);
  const labelY = clamp(my - 18, 16, SIZE - 14);

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Projectile trajectory. At time t = ${t.toFixed(2)}, the projectile is at (${fmt(wx)}, ${fmt(wy)}).`}
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

      {reveal.ground && (
        <line
          x1={plane.sx(-HALF)}
          y1={groundY}
          x2={plane.sx(HALF)}
          y2={groundY}
          style={{ stroke: "oklch(0.6 0.09 150)", strokeWidth: 3.5, strokeLinecap: "round" }}
          aria-hidden="true"
        />
      )}

      {reveal.path && ghost && <path d={ghost} className="curve-ghost" />}
      {reveal.trace && trace && <path d={trace} className="curve-trace" />}

      {reveal.samples &&
        SAMPLES[mode]?.map((s) => {
          const [x, y] = P(s.t);
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

      {reveal.peak && (
        <g aria-hidden="true">
          <circle
            cx={plane.sx(PEAK.x)}
            cy={plane.sy(PEAK.y)}
            r="6"
            style={{ fill: "var(--teal)", stroke: "var(--surface)", strokeWidth: 2 }}
          />
          <text
            x={plane.sx(PEAK.x)}
            y={plane.sy(PEAK.y) - 13}
            textAnchor="middle"
            className="sample-label"
          >
            peak (4, 4)
          </text>
        </g>
      )}

      {reveal.landing && (
        <g aria-hidden="true">
          <circle
            cx={plane.sx(LANDING.x)}
            cy={plane.sy(LANDING.y)}
            r="6.5"
            style={{ fill: "none", stroke: "var(--accent)", strokeWidth: 3 }}
          />
          <text
            x={clamp(plane.sx(LANDING.x), 46, SIZE - 46)}
            y={plane.sy(LANDING.y) - 13}
            textAnchor="middle"
            className="sample-label"
          >
            lands t=4
          </text>
        </g>
      )}

      {reveal.drops && !plot && (
        <g>
          <line x1={mx} y1={my} x2={mx} y2={groundY} className="proj-y" />
          <line x1={mx} y1={my} x2={originX} y2={my} className="proj-x" />
          <text x={mx} y={groundY - 8} textAnchor="middle" className="sample-label">
            x = {fmt(wx)}
          </text>
          <text x={originX + 7} y={my - 7} textAnchor="start" className="sample-label">
            y = {fmt(wy)}
          </text>
        </g>
      )}

      <circle cx={originX} cy={groundY} r="4.5" className="origin-dot" />

      {reveal.marker && !plot && (
        <>
          <circle cx={mx} cy={my} r="8" className="point-dot" />
          <g className="point-label" transform={`translate(${labelX}, ${labelY})`}>
            <text textAnchor="middle" y={4}>
              ({fmt(wx)}, {fmt(wy)})
            </text>
          </g>
        </>
      )}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
