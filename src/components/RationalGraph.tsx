import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "./Plane";
import PlotMarkers from "./PlotMarkers";
import Tex from "./Tex";
import { sampleBranches, type Pt } from "../lib/rational";
import type { LessonFigureProps } from "../lessons/types";

const SIZE = 460;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Everything a rational-function figure needs to draw itself, in world units. */
export type RationalSpec = {
  /** The (simplified) function actually drawn. */
  f: (x: number) => number;
  /** Vertical asymptotes: dashed walls, and the curve is split at each. */
  vas?: number[];
  /** Removable discontinuities, drawn as open circles. */
  holes?: Pt[];
  /** Horizontal asymptote y-value, drawn as a dashed line. */
  ha?: number;
  /** Slant asymptote y = m x + b, drawn as a dashed line. */
  slant?: { m: number; b: number };
  /** Intercept dots to reveal. */
  intercepts?: Pt[];
  /** Numerator / denominator, for the "why the wall happens" readout. */
  num?: (x: number) => number;
  den?: (x: number) => number;
  numTex?: string;
  denTex?: string;
  aria?: string;
};

/**
 * A live readout of the numerator and denominator at the tracer, so the learner
 * sees the bottom collapse toward zero (and the quotient explode) near a wall,
 * or the leading terms dominate far out. Shown when a slide sets reveal.parts.
 */
export function PartsReadout({ spec, x }: { spec: RationalSpec; x: number }) {
  if (!spec.num || !spec.den) return null;
  const n = spec.num(x);
  const d = spec.den(x);
  const fx = spec.f(x);
  const tiny = Math.abs(d) < 0.3;
  const dir = fx >= 0 ? "large and positive" : "large and negative";
  const big = !Number.isFinite(fx) || Math.abs(fx) > 50;
  const fxTex = big ? `\\text{${fx > 0 ? "large +" : "large -"}}` : fx.toFixed(2);
  const denDisplay = d < 0 ? `(${d.toFixed(2)})` : d.toFixed(2);
  return (
    <div className="formula-list rational-parts">
      <Tex>{`x = ${x.toFixed(2)},\\quad \\text{top} = ${n.toFixed(2)},\\quad \\text{bottom} = ${d.toFixed(2)}`}</Tex>
      <Tex>{`f(x) = ${n.toFixed(2)} \\, / \\, ${denDisplay} = ${fxTex}`}</Tex>
      {tiny && <span className="rational-note">The bottom is tiny, so f is {dir}.</span>}
    </div>
  );
}

/**
 * Shared, interactive rational-function plot. Reads reveal flags to show each
 * feature one at a time, and supports a draggable vertical tracer plus click-a-
 * point (plot) questions. Lesson Stages forward the whole reveal bag, so the
 * eval harness treats these lessons as "forwarding" and skips the per-flag
 * consistency check (as with the unit-circle figure).
 */
export default function RationalGraph({
  values,
  reveal,
  interactive,
  plot,
  setValue,
  spec,
  half,
}: LessonFigureProps & { spec: RationalSpec; half: number }) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);

  const tracerX = clamp((values.x ?? 0) / 100, -half, half);
  const tracerY = spec.f(tracerX);
  const branches = sampleBranches(spec.f, -half, half, spec.vas ?? [], half);

  const toPath = (pts: Pt[]) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${plane.sx(p.x).toFixed(2)} ${plane.sy(p.y).toFixed(2)}`)
      .join(" ");

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

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria ?? "Rational function graph."}
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

      {reveal.ha && typeof spec.ha === "number" && (
        <line
          x1={plane.sx(-half)}
          y1={plane.sy(spec.ha)}
          x2={plane.sx(half)}
          y2={plane.sy(spec.ha)}
          className="asymptote"
        />
      )}

      {reveal.slant && spec.slant && (
        <line
          x1={plane.sx(-half)}
          y1={plane.sy(spec.slant.m * -half + spec.slant.b)}
          x2={plane.sx(half)}
          y2={plane.sy(spec.slant.m * half + spec.slant.b)}
          className="asymptote"
        />
      )}

      {reveal.va &&
        (spec.vas ?? []).map((vx) => (
          <line
            key={`va${vx}`}
            x1={plane.sx(vx)}
            y1={plane.sy(-half)}
            x2={plane.sx(vx)}
            y2={plane.sy(half)}
            className="asymptote asymptote--v"
          />
        ))}

      {reveal.curve && branches.map((b, i) => <path key={`b${i}`} d={toPath(b)} className="conic-curve" />)}

      {reveal.intercepts &&
        (spec.intercepts ?? []).map((p) => (
          <circle key={`int${p.x},${p.y}`} cx={plane.sx(p.x)} cy={plane.sy(p.y)} r="5.5" className="sample-dot" />
        ))}

      {reveal.hole &&
        (spec.holes ?? []).map((p) => (
          <circle key={`hole${p.x}`} cx={plane.sx(p.x)} cy={plane.sy(p.y)} r="6" className="rational-hole" />
        ))}

      {reveal.tracer && !plot && (
        <>
          <line
            x1={plane.sx(tracerX)}
            y1={plane.sy(-half)}
            x2={plane.sx(tracerX)}
            y2={plane.sy(half)}
            className="tracer-line"
          />
          <circle
            cx={plane.sx(tracerX)}
            cy={plane.sy(clamp(tracerY, -half, half))}
            r="7.5"
            className="point-dot"
          />
        </>
      )}

      <circle cx={plane.center} cy={plane.center} r="4" className="origin-dot" />

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
