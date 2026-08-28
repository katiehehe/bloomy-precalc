import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "./Plane";
import PlotMarkers from "./PlotMarkers";
import { sampleBranches, type Pt } from "../lib/rational";
import type { LessonFigureProps } from "../lessons/types";

const SIZE = 460;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const EPS = 1e-6;

/** A closed interval on the number line. Use +/- Infinity for an unbounded side. */
export type Interval = [number, number];

/** Everything a sign-analysis figure needs, in world units. */
export type IneqSpec = {
  /** The function whose sign we analyze, f(x) = N(x) (poly) or N(x)/D(x) (rational). */
  f: (x: number) => number;
  /** Excluded x-values (denominator zeros): dashed walls, open dots, curve is split. */
  vas?: number[];
  /** Real zeros of f (sign can change here): filled dots on the x-axis. */
  zeros: number[];
  /** The solution set to shade once revealed. */
  solution?: {
    /** True for strict `<`/`>` (zeros excluded); false for `<=`/`>=` (zeros included). */
    strict: boolean;
    intervals: Interval[];
  };
  aria: string;
};

/** Sorted, de-duplicated boundary points that split the line into sign intervals. */
function criticalsOf(spec: IneqSpec, half: number): number[] {
  const set = [...(spec.zeros ?? []), ...(spec.vas ?? [])].filter((x) => x > -half + EPS && x < half - EPS);
  return [...new Set(set.map((x) => Number(x.toFixed(6))))].sort((a, b) => a - b);
}

/**
 * Shared figure for polynomial and rational inequalities. It draws the curve, the
 * boundary points (zeros filled, excluded values open), a per-interval sign strip,
 * and shades the solution set. Lesson Stages forward the whole reveal bag, so the
 * eval harness treats these lessons as "forwarding" and skips the flag check.
 */
export default function InequalityGraph({
  values,
  reveal,
  interactive,
  plot,
  setValue,
  spec,
  half,
}: LessonFigureProps & { spec: IneqSpec; half: number }) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const vas = spec.vas ?? [];

  const tracerX = clamp((values.x ?? 0) / 100, -half, half);
  const tracerY = spec.f(tracerX);
  const branches = sampleBranches(spec.f, -half, half, vas, half);
  const criticals = criticalsOf(spec, half);

  const toPath = (pts: Pt[]) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${plane.sx(p.x).toFixed(2)} ${plane.sy(p.y).toFixed(2)}`)
      .join(" ");

  // Interval midpoints for the sign strip: split [-half, half] at every critical.
  const edges = [-half, ...criticals, half];
  const signCells = edges.slice(0, -1).map((lo, i) => {
    const hi = edges[i + 1];
    const mid = (lo + hi) / 2;
    return { mid, positive: spec.f(mid) >= 0 };
  });

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const wx = plane.wx(((event.clientX - rect.left) / rect.width) * SIZE);
    const wy = plane.wy(((event.clientY - rect.top) / rect.height) * SIZE);
    if (plot) {
      plot.onGuess({ x: wx, y: wy });
      return;
    }
    setValue("x", () => clamp(wx, -half, half) * 100);
  };

  const isZero = (x: number) => (spec.zeros ?? []).some((z) => Math.abs(z - x) < 1e-6);

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria}
      onPointerDown={(event) => {
        if (!interactive) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons) applyPointer(event);
      }}
    >
      <PlaneGrid plane={plane} />

      {reveal.solution &&
        (spec.solution?.intervals ?? []).map(([a, b], i) => {
          const x0 = clamp(a, -half, half);
          const x1 = clamp(b, -half, half);
          return (
            <rect
              key={`sol${i}`}
              x={plane.sx(x0)}
              y={plane.sy(half)}
              width={Math.max(0, plane.sx(x1) - plane.sx(x0))}
              height={plane.sy(-half) - plane.sy(half)}
              className="ineq-band"
            />
          );
        })}

      {reveal.va &&
        vas.map((vx) => (
          <g key={`va${vx}`}>
            <line
              x1={plane.sx(vx)}
              y1={plane.sy(-half)}
              x2={plane.sx(vx)}
              y2={plane.sy(half)}
              className="asymptote asymptote--v"
            />
            <circle cx={plane.sx(vx)} cy={plane.sy(0)} r="6" className="crit-open" />
          </g>
        ))}

      {reveal.curve && branches.map((b, i) => <path key={`b${i}`} d={toPath(b)} className="conic-curve" />)}

      {reveal.signs &&
        signCells.map((cell, i) => (
          <text
            key={`sign${i}`}
            x={plane.sx(clamp(cell.mid, -half + 0.3, half - 0.3))}
            y={plane.sy(0) - 10}
            textAnchor="middle"
            className={cell.positive ? "sign-pos" : "sign-neg"}
          >
            {cell.positive ? "+" : "\u2212"}
          </text>
        ))}

      {reveal.criticals &&
        (spec.zeros ?? [])
          .filter((z) => z > -half + EPS && z < half - EPS)
          .map((cx) => <circle key={`crit${cx}`} cx={plane.sx(cx)} cy={plane.sy(0)} r="6" className="crit-dot" />)}

      {reveal.solution &&
        (spec.solution?.intervals ?? []).flatMap(([a, b], i) =>
          [a, b]
            .filter((v) => Number.isFinite(v) && Math.abs(v) < half - EPS)
            .map((v) => {
              const included = !spec.solution?.strict && isZero(v);
              return (
                <circle
                  key={`end${i}-${v}`}
                  cx={plane.sx(v)}
                  cy={plane.sy(0)}
                  r="6.5"
                  className={included ? "sol-end sol-end--closed" : "sol-end sol-end--open"}
                />
              );
            }),
        )}

      {(reveal.tracer || reveal.readout) && !plot && (
        <>
          <line
            x1={plane.sx(tracerX)}
            y1={plane.sy(-half)}
            x2={plane.sx(tracerX)}
            y2={plane.sy(half)}
            className="tracer-line"
          />
          <circle cx={plane.sx(tracerX)} cy={plane.sy(clamp(tracerY, -half, half))} r="7.5" className="point-dot" />
        </>
      )}

      <circle cx={plane.center} cy={plane.center} r="4" className="origin-dot" />

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
