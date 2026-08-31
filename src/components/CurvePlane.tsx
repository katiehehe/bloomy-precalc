import { type PointerEvent, type ReactNode, useRef } from "react";
import { PlaneGrid, makePlane, type Plane } from "./Plane";
import { clientToSvgPoint } from "../lib/svg";

/**
 * A shared, pencil-mimic curve figure for the calculus-readiness unit. It draws
 * a coordinate plane and layers on the things a student sketches by hand while
 * reasoning about slopes, limits, and continuity:
 *   - one or more function curves, each sampled and automatically broken where
 *     the function leaves the screen or jumps (so vertical asymptotes and
 *     piecewise jumps read as gaps, never as stray connecting strokes);
 *   - closed (filled) and open (hollow) points, for defined values, holes,
 *     jump endpoints, and one-sided limits;
 *   - straight lines with optional labels, used for secants and tangents;
 *   - dashed vertical/horizontal guides, for an approach line x = a or a limit
 *     value y = L (or an asymptote);
 *   - free-floating text labels.
 * The lesson Stage computes everything from `values`/`reveal` and passes a
 * CurveSpec in, exactly like ConicPlane, VectorPlane, and ComplexPlane. Colors
 * come from the shared palette variables so the look stays consistent.
 */

const SIZE = 460;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export type CurveTone = "primary" | "accent" | "teal" | "muted" | "ink";

const COLOR: Record<CurveTone, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  teal: "var(--teal)",
  muted: "var(--muted)",
  ink: "var(--ink)",
};

/** A sampled function curve. Sampling breaks where f leaves the screen or jumps. */
export type CurveSeg = {
  f: (x: number) => number;
  /** Domain drawn; default is the whole visible x-range. */
  from?: number;
  to?: number;
  dashed?: boolean;
  tone?: CurveTone;
};

/** A dot on the plane. Closed = filled (value attained); open = hollow (hole,
 * one-sided limit not reached, excluded endpoint of a jump). */
export type CurvePoint = {
  x: number;
  y: number;
  kind?: "closed" | "open";
  label?: string;
  tone?: CurveTone;
  /** Pixel offset for the label from the dot (defaults to +10 right, -9 up). */
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
};

/** A straight line segment (a secant, a tangent, a leg), optionally labeled. */
export type CurveLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: CurveTone;
  dashed?: boolean;
  label?: string;
  /** Draw the exact segment instead of extending it across the plane (default
   * behaviour, used for secants and tangents, extends the line to the edges). */
  segment?: boolean;
  /** Draw an arrowhead at (x2, y2). Implies a non-extended segment, so rise/run
   * legs read as measured arrows rather than full-width guides. */
  arrow?: boolean;
};

/** A dashed guide: `at` is the x for a vertical guide or the y for a horizontal one. */
export type CurveGuide = {
  at: number;
  label?: string;
  tone?: CurveTone;
};

export type CurveLabel = {
  x: number;
  y: number;
  text: string;
  tone?: CurveTone;
  anchor?: "start" | "middle" | "end";
};

export type CurveSpec = {
  curves?: CurveSeg[];
  points?: CurvePoint[];
  lines?: CurveLine[];
  /** Dashed vertical guides (approach lines, vertical asymptotes). */
  vlines?: CurveGuide[];
  /** Dashed horizontal guides (limit values, horizontal asymptotes). */
  hlines?: CurveGuide[];
  labels?: CurveLabel[];
  aria: string;
};

type Props = {
  spec: CurveSpec;
  /** World half-range from the origin to an edge. Defaults to 6. */
  half?: number;
  underlay?: (plane: Plane) => ReactNode;
  overlay?: (plane: Plane) => ReactNode;
  /** When set, pointer down/drag on the plane reports world coordinates. */
  onPoint?: (worldX: number, worldY: number) => void;
  interactive?: boolean;
};

/**
 * Sample a function to an SVG path, breaking into separate subpaths wherever the
 * value leaves the visible band or jumps by more than the half-range between two
 * samples (an asymptote or a piecewise jump). Returns "" when nothing is on
 * screen, so the caller can skip empty paths.
 */
function samplePath(plane: Plane, seg: CurveSeg, half: number): string {
  const from = seg.from ?? -half;
  const to = seg.to ?? half;
  const band = half * 1.4; // allow a little overshoot before we clip the curve
  const steps = 260;
  let d = "";
  let pen = false; // are we mid-stroke (last point was on screen)?
  let prevY: number | null = null;
  for (let i = 0; i <= steps; i += 1) {
    const x = from + ((to - from) * i) / steps;
    const y = seg.f(x);
    const onScreen = Number.isFinite(y) && Math.abs(y) <= band;
    if (!onScreen) {
      pen = false;
      prevY = null;
      continue;
    }
    // A large gap between consecutive on-screen samples means we jumped across a
    // wall (vertical asymptote) or a piecewise break: lift the pen.
    if (prevY !== null && Math.abs(y - prevY) > half) pen = false;
    d += `${pen ? "L" : "M"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
    pen = true;
    prevY = y;
  }
  return d.trim();
}

/** Clip a line to the visible square so long secants/tangents do not overflow. */
function clipLine(plane: Plane, x1: number, y1: number, x2: number, y2: number, half: number) {
  const cx = (v: number) => clamp(v, -half, half);
  // Parameterize and clamp endpoints into the box along the same direction.
  const dx = x2 - x1;
  const dy = y2 - y1;
  const pts: [number, number][] = [];
  const tryEdge = (t: number) => {
    if (t < 0 || t > 1) return;
    pts.push([x1 + t * dx, y1 + t * dy]);
  };
  // Extend the segment well beyond its endpoints first, then clip to edges.
  const X1 = x1 - dx * 4;
  const Y1 = y1 - dy * 4;
  const X2 = x2 + dx * 4;
  const Y2 = y2 + dy * 4;
  const eDx = X2 - X1;
  const eDy = Y2 - Y1;
  const edges: number[] = [];
  if (eDx !== 0) {
    edges.push((-half - X1) / eDx, (half - X1) / eDx);
  }
  if (eDy !== 0) {
    edges.push((-half - Y1) / eDy, (half - Y1) / eDy);
  }
  for (const t of edges) {
    if (t < 0 || t > 1) continue;
    const px = X1 + t * eDx;
    const py = Y1 + t * eDy;
    if (px >= -half - 1e-6 && px <= half + 1e-6 && py >= -half - 1e-6 && py <= half + 1e-6) {
      pts.push([px, py]);
    }
  }
  if (pts.length < 2) return { x1: cx(x1), y1: cx(y1), x2: cx(x2), y2: cx(y2) };
  return { x1: pts[0][0], y1: pts[0][1], x2: pts[1][0], y2: pts[1][1] };
}

/** A small filled triangle at the screen point (x2, y2), pointing along the
 * segment direction. Used to render rise/run and other measured legs as arrows. */
function arrowHead(x1: number, y1: number, x2: number, y2: number, color: string) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const len = 11;
  const wid = 5.5;
  const bx = x2 - len * Math.cos(ang);
  const by = y2 - len * Math.sin(ang);
  const nx = -Math.sin(ang) * wid;
  const ny = Math.cos(ang) * wid;
  const pts = `${x2.toFixed(2)},${y2.toFixed(2)} ${(bx + nx).toFixed(2)},${(by + ny).toFixed(2)} ${(bx - nx).toFixed(2)},${(by - ny).toFixed(2)}`;
  return <polygon points={pts} fill={color} />;
}

export default function CurvePlane({ spec, half = 6, underlay, overlay, onPoint, interactive }: Props) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const { curves = [], points = [], lines = [], vlines = [], hlines = [], labels = [] } = spec;

  const report = (event: PointerEvent<SVGSVGElement>) => {
    if (!onPoint || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    onPoint(wx, wy);
  };

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive && onPoint ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria}
      onPointerDown={
        onPoint
          ? (event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              report(event);
            }
          : undefined
      }
      onPointerMove={onPoint ? (event) => event.buttons && report(event) : undefined}
    >
      <PlaneGrid plane={plane} />
      {underlay?.(plane)}

      {/* Dashed guides sit under the curve so the curve and points stay readable. */}
      {vlines.map((g, i) => (
        <g key={`vl${i}`}>
          <line
            x1={plane.sx(g.at)}
            y1={plane.sy(half)}
            x2={plane.sx(g.at)}
            y2={plane.sy(-half)}
            stroke={COLOR[g.tone ?? "muted"]}
            strokeWidth={1.5}
            strokeDasharray="5 5"
            opacity={0.85}
          />
          {g.label && (
            <text x={plane.sx(g.at) + 6} y={plane.sy(half) + 16} fill={COLOR[g.tone ?? "muted"]} fontSize={13}>
              {g.label}
            </text>
          )}
        </g>
      ))}
      {hlines.map((g, i) => (
        <g key={`hl${i}`}>
          <line
            x1={plane.sx(-half)}
            y1={plane.sy(g.at)}
            x2={plane.sx(half)}
            y2={plane.sy(g.at)}
            stroke={COLOR[g.tone ?? "muted"]}
            strokeWidth={1.5}
            strokeDasharray="5 5"
            opacity={0.85}
          />
          {g.label && (
            <text x={plane.sx(-half) + 6} y={plane.sy(g.at) - 6} fill={COLOR[g.tone ?? "muted"]} fontSize={13}>
              {g.label}
            </text>
          )}
        </g>
      ))}

      {curves.map((seg, i) => {
        const d = samplePath(plane, seg, half);
        if (!d) return null;
        return (
          <path
            key={`cv${i}`}
            d={d}
            fill="none"
            stroke={COLOR[seg.tone ?? "primary"]}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={seg.dashed ? "6 5" : undefined}
          />
        );
      })}

      {lines.map((ln, i) => {
        // Secants and tangents extend to the plane edges; measured legs (arrows)
        // and explicit segments draw exactly from (x1,y1) to (x2,y2).
        const asSeg = ln.segment || ln.arrow;
        const c = asSeg
          ? { x1: ln.x1, y1: ln.y1, x2: ln.x2, y2: ln.y2 }
          : clipLine(plane, ln.x1, ln.y1, ln.x2, ln.y2, half);
        const X1 = plane.sx(c.x1);
        const Y1 = plane.sy(c.y1);
        const X2 = plane.sx(c.x2);
        const Y2 = plane.sy(c.y2);
        const color = COLOR[ln.tone ?? "accent"];
        return (
          <g key={`ln${i}`}>
            <line
              x1={X1}
              y1={Y1}
              x2={X2}
              y2={Y2}
              stroke={color}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeDasharray={ln.dashed ? "6 5" : undefined}
            />
            {ln.arrow && arrowHead(X1, Y1, X2, Y2, color)}
            {ln.label && (
              <text
                x={(X1 + X2) / 2 + 8}
                y={(Y1 + Y2) / 2 - 8}
                fill={color}
                fontSize={13}
                fontWeight={600}
              >
                {ln.label}
              </text>
            )}
          </g>
        );
      })}

      {points.map((p, i) => {
        const open = p.kind === "open";
        const color = COLOR[p.tone ?? "primary"];
        return (
          <g key={`pt${i}`}>
            <circle
              cx={plane.sx(p.x)}
              cy={plane.sy(p.y)}
              r={6}
              fill={open ? "var(--surface)" : color}
              stroke={color}
              strokeWidth={2.2}
            />
            {p.label && (
              <text
                x={plane.sx(p.x) + (p.labelDx ?? 10)}
                y={plane.sy(p.y) + (p.labelDy ?? -9)}
                textAnchor={p.labelAnchor ?? "start"}
                fill={COLOR[p.tone ?? "ink"]}
                fontSize={13}
                fontWeight={600}
              >
                {p.label}
              </text>
            )}
          </g>
        );
      })}

      {labels.map((l, i) => (
        <text
          key={`lb${i}`}
          x={plane.sx(l.x)}
          y={plane.sy(l.y)}
          fill={COLOR[l.tone ?? "ink"]}
          fontSize={14}
          fontWeight={600}
          textAnchor={l.anchor ?? "start"}
        >
          {l.text}
        </text>
      ))}

      <circle cx={plane.center} cy={plane.center} r="4" className="origin-dot" />
      {overlay?.(plane)}
    </svg>
  );
}
