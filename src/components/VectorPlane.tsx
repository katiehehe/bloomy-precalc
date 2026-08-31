import { type PointerEvent, type ReactNode, useRef } from "react";
import { PlaneGrid, makePlane, type Plane } from "./Plane";
import PlotMarkers from "./PlotMarkers";
import { clientToSvgPoint } from "../lib/svg";
import type { LessonFigureProps } from "../lessons/types";

const SIZE = 460;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const TONE: Record<string, string> = {
  primary: "var(--primary)",
  a: "var(--cosine)",
  b: "var(--teal)",
  sum: "var(--primary)",
  accent: "var(--accent)",
  muted: "var(--line)",
};

/** One arrow, tail to head, in world coordinates. Defaults to starting at the origin. */
export type VecArrow = {
  /** Tail in world coords (defaults to the origin). */
  x1?: number;
  y1?: number;
  /** Head in world coords. */
  x2: number;
  y2: number;
  /** Colour role. */
  tone?: "primary" | "a" | "b" | "sum" | "accent" | "muted";
  /** Text label placed just past the head. */
  label?: string;
  /**
   * Where the label sits: "head" (default, just past the arrowhead) or "mid"
   * (beside the middle of the shaft). Use "mid" to pull a label off a tip that a
   * second arrow also ends on, so two labels do not stack on the same point.
   */
  labelAt?: "head" | "mid";
  /** Extra screen-space nudge for the label, in px (x right, y down). */
  labelDx?: number;
  labelDy?: number;
  width?: number;
  /** Draw the arrow dashed (a guide, ghost, or target). */
  dashed?: boolean;
  /** Draw only a fraction (0..1) of the arrow, tip growing from the tail (for animation). */
  fraction?: number;
  /** Dashed component legs from the tail to the head's x and y (right-triangle legs). */
  legs?: boolean;
  /** Hide the arrowhead (draw a plain segment). */
  noHead?: boolean;
};

/** A labelled dot at a world point. */
export type VecPoint = { x: number; y: number; label?: string; tone?: string; r?: number };

/** Highlight the angle between two directions (degrees, standard position) at a centre. */
export type VecAngle = {
  fromDeg: number;
  toDeg: number;
  label?: string;
  tone?: "primary" | "a" | "b" | "sum" | "accent" | "muted";
  /** Screen-space arc radius in pixels (default 34). */
  radius?: number;
  /** Centre in world coords (defaults to the origin). */
  cx?: number;
  cy?: number;
};

/** Visualise the (vector) projection of `from` onto `onto`, both anchored at the origin. */
export type VecProjection = {
  onto: { x: number; y: number };
  from: { x: number; y: number };
  label?: string;
};

export type VectorSpec = {
  aria: string;
  arrows: VecArrow[];
  points?: VecPoint[];
  angle?: VecAngle;
  projection?: VecProjection;
  /** Raw SVG drawn under the arrows; receives the plane mapping (for ramps, compasses). */
  underlay?: (plane: Plane) => ReactNode;
  /** Raw SVG drawn over the arrows; receives the plane mapping. */
  overlay?: (plane: Plane) => ReactNode;
};

/** An arrow in screen space: shaft plus a filled triangular head. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 3.4,
  dashed = false,
  fraction = 1,
  noHead = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width?: number;
  dashed?: boolean;
  fraction?: number;
  noHead?: boolean;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const fullLen = Math.hypot(dx, dy);
  const len = fullLen * clamp(fraction, 0, 1);
  if (len < 0.5) return null;
  const angle = Math.atan2(dy, dx);
  const tipX = x1 + Math.cos(angle) * len;
  const tipY = y1 + Math.sin(angle) * len;
  const size = noHead ? 0 : Math.min(13, len * 0.9);
  const spread = 0.42;
  const left = [tipX - size * Math.cos(angle - spread), tipY - size * Math.sin(angle - spread)];
  const right = [tipX - size * Math.cos(angle + spread), tipY - size * Math.sin(angle + spread)];
  const base = [tipX - size * 0.82 * Math.cos(angle), tipY - size * 0.82 * Math.sin(angle)];
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={noHead ? tipX : base[0]}
        y2={noHead ? tipY : base[1]}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "6 6" : undefined}
      />
      {!noHead && <path d={`M${tipX} ${tipY} L${left[0]} ${left[1]} L${right[0]} ${right[1]} Z`} fill={color} />}
    </g>
  );
}

/** A screen-space arc between two standard-position angles (y grows downward). */
function arcBetween(cx: number, cy: number, fromDeg: number, toDeg: number, r: number) {
  const span = toDeg - fromDeg;
  if (Math.abs(span) < 0.6) return "";
  const steps = Math.max(2, Math.min(400, Math.ceil(Math.abs(span) / 2.5)));
  let path = "";
  for (let i = 0; i <= steps; i += 1) {
    const deg = fromDeg + (span * i) / steps;
    const a = (deg * Math.PI) / 180;
    const x = cx + Math.cos(a) * r;
    const y = cy - Math.sin(a) * r;
    path += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return path.trim();
}

/**
 * A shared vector figure: an integer coordinate plane that draws a set of labelled
 * arrows (each tail to head, with optional component legs and draw animation), plus
 * an optional angle arc between two directions and an optional projection of one
 * vector onto another. The lesson Stage computes everything from `values`/`reveal`
 * and passes it in, exactly like ComplexPlane. `underlay`/`overlay` accept the plane
 * mapping so a lesson can add its own SVG (an incline ramp, a compass) without
 * duplicating the plumbing. Supports dragging and click-a-point (plot) questions.
 */
export default function VectorPlane({
  spec,
  half,
  interactive,
  plot,
  onDrag,
}: LessonFigureProps & {
  spec: VectorSpec;
  half: number;
  /** Called with world coords while the learner drags on the plane. */
  onDrag?: (wx: number, wy: number) => void;
}) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const O = plane.center;

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    if (plot) plot.onGuess({ x: wx, y: wy });
    else if (onDrag) onDrag(wx, wy);
  };

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
        if (!interactive || event.buttons === 0) return;
        applyPointer(event);
      }}
    >
      <PlaneGrid plane={plane} />

      {spec.underlay?.(plane)}

      {spec.angle &&
        (() => {
          const acx = plane.sx(spec.angle.cx ?? 0);
          const acy = plane.sy(spec.angle.cy ?? 0);
          const r = spec.angle.radius ?? 34;
          const color = TONE[spec.angle.tone ?? "primary"];
          const mid = (spec.angle.fromDeg + spec.angle.toDeg) / 2;
          const lr = r + 16;
          return (
            <>
              <path
                d={arcBetween(acx, acy, spec.angle.fromDeg, spec.angle.toDeg, r)}
                fill="none"
                stroke={color}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              {spec.angle.label && (
                <text
                  x={acx + Math.cos((mid * Math.PI) / 180) * lr}
                  y={acy - Math.sin((mid * Math.PI) / 180) * lr + 4}
                  className="angle-glyph-label"
                  textAnchor="middle"
                  fill={color}
                >
                  {spec.angle.label}
                </text>
              )}
            </>
          );
        })()}

      {spec.projection &&
        (() => {
          const V = spec.projection.onto;
          const U = spec.projection.from;
          const vv = V.x * V.x + V.y * V.y;
          if (vv < 1e-9) return null;
          const t = (U.x * V.x + U.y * V.y) / vv;
          const foot = { x: t * V.x, y: t * V.y };
          const fx = plane.sx(foot.x);
          const fy = plane.sy(foot.y);
          const ux = plane.sx(U.x);
          const uy = plane.sy(U.y);
          return (
            <g>
              {/* Highlighted projection segment along V, from the origin to the foot. */}
              <line x1={O} y1={O} x2={fx} y2={fy} stroke="var(--accent)" strokeWidth={6} strokeLinecap="round" opacity={0.4} />
              {/* Dashed perpendicular drop from U's tip to the foot on V. */}
              <line x1={ux} y1={uy} x2={fx} y2={fy} stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 5" />
              {spec.projection.label && (
                <text x={(O + fx) / 2} y={(O + fy) / 2 - 8} className="root-label" fill="var(--accent)" textAnchor="middle">
                  {spec.projection.label}
                </text>
              )}
            </g>
          );
        })()}

      {spec.arrows.map((arr, i) => {
        const color = TONE[arr.tone ?? "primary"];
        const tailX = plane.sx(arr.x1 ?? 0);
        const tailY = plane.sy(arr.y1 ?? 0);
        const headX = plane.sx(arr.x2);
        const headY = plane.sy(arr.y2);
        const frac = arr.fraction ?? 1;
        // Label position. By default it sits just past the head along the arrow
        // direction. With labelAt "mid" it sits beside the middle of the shaft,
        // which keeps two arrows that share a tip from stacking their labels.
        const dx = headX - tailX;
        const dy = headY - tailY;
        const dlen = Math.hypot(dx, dy) || 1;
        const ndx = arr.labelDx ?? 0;
        const ndy = arr.labelDy ?? 0;
        const lx =
          arr.labelAt === "mid"
            ? clamp((tailX + headX) / 2 + ndx, 16, SIZE - 16)
            : clamp(headX + (dx / dlen) * 14 + ndx, 16, SIZE - 16);
        const ly =
          arr.labelAt === "mid"
            ? clamp((tailY + headY) / 2 + ndy, 16, SIZE - 10)
            : clamp(headY + (dy / dlen) * 14 - 2 + ndy, 16, SIZE - 10);
        return (
          <g key={`arr${i}`}>
            {arr.legs && (
              <g>
                <line x1={tailX} y1={tailY} x2={headX} y2={tailY} stroke={TONE.a} strokeWidth={2} strokeDasharray="4 4" />
                <line x1={headX} y1={tailY} x2={headX} y2={headY} stroke={TONE.b} strokeWidth={2} strokeDasharray="4 4" />
              </g>
            )}
            <Arrow
              x1={tailX}
              y1={tailY}
              x2={headX}
              y2={headY}
              color={color}
              width={arr.width ?? 3.6}
              dashed={arr.dashed}
              fraction={frac}
              noHead={arr.noHead}
            />
            {arr.label && frac > 0.98 && (
              <text x={lx} y={ly} className="vec-name" fill={color} textAnchor="middle">
                {arr.label}
              </text>
            )}
          </g>
        );
      })}

      {spec.points?.map((p, i) => (
        <g key={`pt${i}`}>
          <circle cx={plane.sx(p.x)} cy={plane.sy(p.y)} r={p.r ?? 6} fill={TONE[p.tone ?? "primary"]} />
          {p.label && (
            <text x={plane.sx(p.x) + 11} y={plane.sy(p.y) - 9} className="root-label" fill={TONE[p.tone ?? "primary"]}>
              {p.label}
            </text>
          )}
        </g>
      ))}

      <circle cx={O} cy={O} r={4.5} className="origin-dot" />

      {spec.overlay?.(plane)}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
