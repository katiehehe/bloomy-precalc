import { type PointerEvent, type ReactNode, useRef } from "react";
import { PlaneGrid, makePlane, type Plane } from "./Plane";
import { clientToSvgPoint } from "../lib/svg";

/**
 * A shared, pencil-mimic conic figure. It draws a coordinate plane and one of
 * the four conic sections (circle, ellipse, parabola, hyperbola), each allowed
 * to be centered at (h, k) and oriented horizontally or vertically, plus the
 * degenerate line pair that sits between an ellipse and a hyperbola. It layers
 * on the optional adornments a precalculus student draws by hand: foci, a
 * directrix, asymptotes, vertices, a center dot, and labeled points. The lesson
 * Stage computes everything from `values`/`reveal` and passes a ConicSpec in,
 * exactly like VectorPlane and ComplexPlane. Curves reuse the same CSS classes
 * as the Base Camp conics lesson so the look stays consistent.
 */

const SIZE = 460;

export type ConicKind = "circle" | "ellipse" | "parabola" | "hyperbola" | "linepair";

/** A labeled dot on the plane (a point on the curve, a satellite, a listener). */
export type ConicPoint = {
  x: number;
  y: number;
  label?: string;
  tone?: "focus" | "plain" | "ink";
};

/** A straight colored segment with a short label at its midpoint (d1, d2, ...). */
export type ConicSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  variant: "1" | "2";
  label?: string;
  /** Screen-space nudge for the label (px): x right, y down. Use to pull a label
   *  off an axis line or a dot it would otherwise sit on. */
  labelDx?: number;
  labelDy?: number;
};

export type ConicSpec = {
  kind: ConicKind;
  /** Center (circle/ellipse/hyperbola) or vertex (parabola). Defaults to (0, 0). */
  h?: number;
  k?: number;
  /** Circle radius. */
  r?: number;
  /** Semi-axes for ellipse/hyperbola (a along the transverse/major axis). */
  a?: number;
  b?: number;
  /** Parabola coefficient: the opening axis = coeff * (other axis - vertex)^2. */
  coeff?: number;
  /**
   * Orientation. Ellipse: auto from a vs b (ignored). Parabola: "v" opens up or
   * down, "h" opens right or left. Hyperbola: "h" opens left/right, "v" up/down.
   * Line pair: "v" draws two vertical lines, "h" two horizontal ones.
   */
  orient?: "h" | "v";
  foci?: boolean;
  directrix?: boolean;
  asymptotes?: boolean;
  vertices?: boolean;
  center?: boolean;
  points?: ConicPoint[];
  segments?: ConicSegment[];
  /** Half-distance of the degenerate line pair from the center. */
  gap?: number;
  aria: string;
};

type Props = {
  spec: ConicSpec;
  /** World half-range from the origin to an edge. Defaults to 6. */
  half?: number;
  /**
   * Draw the conic and its adornments. When false only the plane (plus any
   * underlay/overlay) shows, so a lesson can ask the learner to classify from
   * the equation before the confirming curve appears. Defaults to true.
   */
  showCurve?: boolean;
  /** Optional layer drawn under the conic (context art: a dish, a room). */
  underlay?: (plane: Plane) => ReactNode;
  /** Optional layer drawn over the conic (labels, highlights). */
  overlay?: (plane: Plane) => ReactNode;
  /** When set, pointer down/drag on the plane reports world coordinates. */
  onPoint?: (worldX: number, worldY: number) => void;
  interactive?: boolean;
};

/** Sample the opening axis = coeff * (base - vertex)^2 and keep it on screen. */
function parabolaPath(plane: Plane, h: number, k: number, coeff: number, orient: "h" | "v") {
  const half = plane.half;
  const c = Math.abs(coeff) < 1e-4 ? (coeff < 0 ? -1e-4 : 1e-4) : coeff;
  // Room available along the opening axis before we leave the plane.
  const openRoom = c > 0 ? half - (orient === "v" ? k : h) : (orient === "v" ? k : h) + half;
  const span = Math.min(half, Math.sqrt(Math.max(openRoom, 0.2) / Math.abs(c)));
  const steps = 140;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const base = -span + (2 * span * i) / steps; // offset from the vertex on the base axis
    const open = c * base * base; // offset along the opening axis
    const x = orient === "v" ? h + base : h + open;
    const y = orient === "v" ? k + open : k + base;
    d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
  }
  return d.trim();
}

/** One branch of a hyperbola centered at (h, k) via a cosh/sinh parameterization. */
function hyperbolaBranch(
  plane: Plane,
  h: number,
  k: number,
  a: number,
  b: number,
  orient: "h" | "v",
  sign: 1 | -1,
) {
  const half = plane.half;
  const denom = orient === "h" ? b : a;
  const tMax = Math.asinh((half * 1.15) / Math.max(denom, 0.2));
  const steps = 90;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = -tMax + (2 * tMax * i) / steps;
    let x: number;
    let y: number;
    if (orient === "h") {
      x = h + sign * a * Math.cosh(t);
      y = k + b * Math.sinh(t);
    } else {
      x = h + b * Math.sinh(t);
      y = k + sign * a * Math.cosh(t);
    }
    d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
  }
  return d.trim();
}

function Segment({ plane, seg }: { plane: Plane; seg: ConicSegment }) {
  const x1 = plane.sx(seg.x1);
  const y1 = plane.sy(seg.y1);
  const x2 = plane.sx(seg.x2);
  const y2 = plane.sy(seg.y2);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={`def-seg def-seg--${seg.variant}`} />
      {seg.label && (
        <text
          x={(x1 + x2) / 2 + (seg.labelDx ?? 0)}
          y={(y1 + y2) / 2 - 6 + (seg.labelDy ?? 0)}
          textAnchor="middle"
          className={`def-label def-label--${seg.variant}`}
        >
          {seg.label}
        </text>
      )}
    </>
  );
}

export default function ConicPlane({ spec, half = 6, showCurve = true, underlay, overlay, onPoint, interactive }: Props) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const {
    kind,
    h = 0,
    k = 0,
    r = 1,
    a = 1,
    b = 1,
    coeff = 0.25,
    orient = "h",
    foci,
    directrix,
    asymptotes,
    vertices,
    center,
    points = [],
    segments = [],
    gap = 1,
  } = spec;

  const report = (event: PointerEvent<SVGSVGElement>) => {
    if (!onPoint || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    onPoint(wx, wy);
  };

  // The main curve.
  let curve: ReactNode = null;
  if (kind === "circle") {
    curve = <circle cx={plane.sx(h)} cy={plane.sy(k)} r={r * plane.unit} className="conic-curve" />;
  } else if (kind === "ellipse") {
    curve = (
      <ellipse cx={plane.sx(h)} cy={plane.sy(k)} rx={a * plane.unit} ry={b * plane.unit} className="conic-curve" />
    );
  } else if (kind === "parabola") {
    curve = <path d={parabolaPath(plane, h, k, coeff, orient)} className="conic-curve" />;
  } else if (kind === "hyperbola") {
    curve = (
      <>
        <path d={hyperbolaBranch(plane, h, k, a, b, orient, 1)} className="conic-curve" />
        <path d={hyperbolaBranch(plane, h, k, a, b, orient, -1)} className="conic-curve" />
      </>
    );
  } else {
    // Degenerate line pair (e.g. x^2 = c gives two vertical lines).
    curve =
      orient === "v" ? (
        <>
          <line x1={plane.sx(h - gap)} y1={plane.sy(-half)} x2={plane.sx(h - gap)} y2={plane.sy(half)} className="conic-curve" />
          <line x1={plane.sx(h + gap)} y1={plane.sy(-half)} x2={plane.sx(h + gap)} y2={plane.sy(half)} className="conic-curve" />
        </>
      ) : (
        <>
          <line x1={plane.sx(-half)} y1={plane.sy(k - gap)} x2={plane.sx(half)} y2={plane.sy(k - gap)} className="conic-curve" />
          <line x1={plane.sx(-half)} y1={plane.sy(k + gap)} x2={plane.sx(half)} y2={plane.sy(k + gap)} className="conic-curve" />
        </>
      );
  }

  // Asymptotes for a hyperbola: slope +/- b/a through the center.
  const asymptoteLines =
    asymptotes && kind === "hyperbola"
      ? (() => {
          const slope = orient === "h" ? b / a : a / b;
          const reach = half;
          return (
            <>
              <line
                x1={plane.sx(h - reach)}
                y1={plane.sy(k - slope * reach)}
                x2={plane.sx(h + reach)}
                y2={plane.sy(k + slope * reach)}
                className="asymptote"
              />
              <line
                x1={plane.sx(h - reach)}
                y1={plane.sy(k + slope * reach)}
                x2={plane.sx(h + reach)}
                y2={plane.sy(k - slope * reach)}
                className="asymptote"
              />
            </>
          );
        })()
      : null;

  // Foci.
  const fociDots = (() => {
    if (!foci) return null;
    const dots: [number, number][] = [];
    if (kind === "ellipse") {
      const wide = a >= b;
      const c = Math.sqrt(Math.abs(a * a - b * b));
      if (wide) dots.push([h + c, k], [h - c, k]);
      else dots.push([h, k + c], [h, k - c]);
    } else if (kind === "hyperbola") {
      const c = Math.sqrt(a * a + b * b);
      if (orient === "h") dots.push([h + c, k], [h - c, k]);
      else dots.push([h, k + c], [h, k - c]);
    } else if (kind === "parabola") {
      const f = 1 / (4 * coeff);
      if (orient === "v") dots.push([h, k + f]);
      else dots.push([h + f, k]);
    } else if (kind === "circle") {
      dots.push([h, k]);
    }
    return dots.map(([px, py], i) => (
      <circle key={`f${i}`} cx={plane.sx(px)} cy={plane.sy(py)} r={5.5} className="focus-dot" />
    ));
  })();

  // Directrix for a parabola.
  const directrixLine =
    directrix && kind === "parabola"
      ? (() => {
          const f = 1 / (4 * coeff);
          return orient === "v" ? (
            <line x1={plane.sx(-half)} y1={plane.sy(k - f)} x2={plane.sx(half)} y2={plane.sy(k - f)} className="directrix" />
          ) : (
            <line x1={plane.sx(h - f)} y1={plane.sy(-half)} x2={plane.sx(h - f)} y2={plane.sy(half)} className="directrix" />
          );
        })()
      : null;

  // Vertices.
  const vertexDots = (() => {
    if (!vertices) return null;
    const dots: [number, number][] = [];
    if (kind === "ellipse") dots.push([h + a, k], [h - a, k], [h, k + b], [h, k - b]);
    else if (kind === "hyperbola") {
      if (orient === "h") dots.push([h + a, k], [h - a, k]);
      else dots.push([h, k + a], [h, k - a]);
    } else if (kind === "circle") dots.push([h + r, k], [h - r, k], [h, k + r], [h, k - r]);
    else if (kind === "parabola") dots.push([h, k]);
    return dots.map(([px, py], i) => <circle key={`v${i}`} cx={plane.sx(px)} cy={plane.sy(py)} r={4} className="def-dot" />);
  })();

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
      {showCurve && asymptoteLines}
      {showCurve && directrixLine}
      {showCurve && curve}
      {showCurve && vertexDots}
      {showCurve && fociDots}
      {showCurve &&
        segments.map((seg, i) => <Segment key={`s${i}`} plane={plane} seg={seg} />)}
      {showCurve &&
        points.map((p, i) => (
          <g key={`p${i}`}>
            <circle
              cx={plane.sx(p.x)}
              cy={plane.sy(p.y)}
              r={5}
              className={p.tone === "focus" ? "focus-dot" : p.tone === "ink" ? "def-dot" : "point-dot"}
            />
            {p.label && (
              <text x={plane.sx(p.x) + 9} y={plane.sy(p.y) - 8} className="tri-label tri-label--r">
                {p.label}
              </text>
            )}
          </g>
        ))}
      {showCurve && center && <circle cx={plane.sx(h)} cy={plane.sy(k)} r={4.5} className="origin-dot" />}
      {overlay?.(plane)}
    </svg>
  );
}
