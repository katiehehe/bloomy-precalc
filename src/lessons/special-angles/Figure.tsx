import { type PointerEvent, useRef } from "react";
import { makePlane, PlaneGrid } from "../../components/Plane";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";
import {
  angleAt,
  FAMILIES,
  familyIndex,
  nearestFamilyIndex,
} from "./values";

/** World half-range of the plane (read by the eval harness for plot bounds). */
const HALF = 1.36;
const SIZE = 320;
/** Degree marks sit just past the rim, not out in the plot gutter. */
const LABEL_R = 1.11;

function familyFor(mode: string): number[] {
  return FAMILIES[mode] ?? FAMILIES.axis;
}

function posKey(x: number, y: number) {
  return `${Math.round(x * 1000)},${Math.round(y * 1000)}`;
}

/** One owner angle per shared point (0° and 360° are the same dot). */
function labelOwners(family: number[], activeDeg: number): Map<string, number> {
  const owner = new Map<string, number>();
  for (const d of family) {
    const a = angleAt(d);
    const key = posKey(a.x, a.y);
    if (!owner.has(key) || d === activeDeg) owner.set(key, d);
  }
  return owner;
}

function labelPlacement(deg: number) {
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  let wx = c * LABEL_R;
  let wy = s * LABEL_R;
  let anchor: "start" | "middle" | "end" = "middle";
  if (Math.abs(s) < 0.08) {
    // Axis intercept: sit just above the axis so ±1 can sit just below.
    wy = 0.1;
    wx = c >= 0 ? 1.1 : -1.1;
    anchor = "middle";
  } else if (Math.abs(c) < 0.08) {
    // Axis intercept: sit just right of the axis so ±1 can sit just left.
    wx = 0.11;
    wy = s >= 0 ? 1.1 : -1.1;
    anchor = "start";
  } else if (c > 0.25) {
    anchor = "start";
  } else if (c < -0.25) {
    anchor = "end";
  }
  return { wx, wy, anchor };
}

/** Sweep is a full turn (or none): SVG A with the same start and end collapses into a tiny ring. */
function showAngleArc(deg: number) {
  return deg > 0.5 && deg < 359.5;
}

function arcPath(cx: number, cy: number, r: number, deg: number) {
  if (!showAngleArc(deg)) return "";
  const a = (deg * Math.PI) / 180;
  const x = cx + r * Math.cos(a);
  const y = cy - r * Math.sin(a);
  const large = deg > 180 ? 1 : 0;
  return `M ${cx + r} ${cy} A ${r} ${r} 0 ${large} 0 ${x.toFixed(2)} ${y.toFixed(2)}`;
}

function RightAngleMark({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <path
      d={`M ${x + size} ${y} L ${x + size} ${y - size} L ${x} ${y - size}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
    />
  );
}

function unitVec(dx: number, dy: number) {
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

/** Center of the angle label: inward along the bisector from `vertex` toward the opposite side. */
function angleLabelPoint(
  vertex: { x: number; y: number },
  armA: { x: number; y: number },
  armB: { x: number; y: number },
  inset: number,
) {
  const a = unitVec(armA.x - vertex.x, armA.y - vertex.y);
  const b = unitVec(armB.x - vertex.x, armB.y - vertex.y);
  const d = unitVec(a.x + b.x, a.y + b.y);
  return { x: vertex.x + d.x * inset, y: vertex.y + d.y * inset };
}

/**
 * Full unit circle with one special-angle family marked. Degree marks sit
 * outside the rim. The six function values live in the table, not on the dots.
 */
export default function SpecialCircle({
  values,
  slide,
  reveal,
  interactive,
  plot,
  setValue,
}: LessonFigureProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const plane = makePlane(SIZE, HALF);
  const family = familyFor(slide.mode ?? "axis");
  const idx = familyIndex(values.k ?? 0, family);
  const deg = family[idx] ?? 0;
  const cur = angleAt(deg);
  const px = plane.sx(cur.x);
  const py = plane.sy(cur.y);
  const ox = plane.sx(0);
  const oy = plane.sy(0);
  const r = plane.unit;
  const owners = labelOwners(family, deg);

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const { x: sx, y: sy } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sx);
    const wy = plane.wy(sy);
    if (plot) {
      plot.onGuess({ x: wx, y: wy });
      return;
    }
    if (!interactive) return;
    const raw = (Math.atan2(wy, wx) * 180) / Math.PI;
    const next = nearestFamilyIndex(raw, family);
    setValue("k", () => next);
  };

  return (
    <svg
      ref={svgRef}
      className="figure figure-plot special-circle"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Unit circle at ${deg} degrees`}
      onPointerDown={(event) => {
        if (!interactive && !plot) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
      onPointerMove={(event) => {
        if (!event.buttons) return;
        if (!interactive && !plot) return;
        applyPointer(event);
      }}
    >
      <PlaneGrid plane={plane} labels={false} />
      <circle cx={ox} cy={oy} r={r} className="circle-line" fill="none" />

      {/* ±1 hug the intercepts: just outside the rim, opposite the degree marks. */}
      <text x={plane.sx(1.08)} y={plane.sy(0) + 13} textAnchor="middle" className="special-axis-num">
        1
      </text>
      <text x={plane.sx(-1.08)} y={plane.sy(0) + 13} textAnchor="middle" className="special-axis-num">
        {"\u22121"}
      </text>
      <text x={plane.sx(0) - 9} y={plane.sy(1.08) + 4} textAnchor="end" className="special-axis-num">
        1
      </text>
      <text x={plane.sx(0) - 9} y={plane.sy(-1.08) + 4} textAnchor="end" className="special-axis-num">
        {"\u22121"}
      </text>

      {reveal.arc && showAngleArc(deg) && (
        <path
          d={arcPath(ox, oy, r * 0.22, deg)}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}

      {reveal.legs && (
        <>
          <line x1={px} y1={py} x2={px} y2={oy} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="4 3" />
          <line x1={px} y1={py} x2={ox} y2={py} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="4 3" />
        </>
      )}

      <line x1={ox} y1={oy} x2={px} y2={py} className="terminal-side" />

      {[...owners.entries()].map(([key, d]) => {
        const a = angleAt(d);
        const sx = plane.sx(a.x);
        const sy = plane.sy(a.y);
        const place = labelPlacement(d);
        const active = d === deg;
        return (
          <g key={key}>
            <circle
              cx={sx}
              cy={sy}
              r={active ? 6 : 3.4}
              fill={active ? "var(--primary)" : "var(--muted)"}
            />
            <text
              x={plane.sx(place.wx)}
              y={plane.sy(place.wy) + 4}
              textAnchor={place.anchor}
              className={active ? "special-angle-mark special-angle-mark--on" : "special-angle-mark"}
            >
              {`${d}\u00b0`}
            </text>
          </g>
        );
      })}

      {plot?.guess && (
        <circle
          cx={plane.sx(plot.guess.x)}
          cy={plane.sy(plot.guess.y)}
          r={5}
          fill={plot.solved ? "var(--teal)" : "var(--primary)"}
        />
      )}
      {plot?.solved && plot.label && (
        <text
          x={plane.sx(plot.target.x) + 10}
          y={plane.sy(plot.target.y) - 10}
          className="angle-glyph-label"
          fill="var(--teal)"
        >
          {plot.label}
        </text>
      )}

      <circle cx={ox} cy={oy} r={3.2} className="origin-dot" />
    </svg>
  );
}

/** 45-45-90 triangle: equal pixel legs, 45° on each acute bisector. */
export function Triangle45({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  const hyp = reveal.s2 || reveal.s3 || reveal.s4 ? "1" : "\u221a2";
  const leg = reveal.s3 || reveal.s4 ? "\u221a2/2" : reveal.s2 ? "1/\u221a2" : "1";
  const A = { x: 48, y: 168 };
  const len = 120;
  const B = { x: A.x + len, y: A.y };
  const C = { x: A.x, y: A.y - len };
  const atB = angleLabelPoint(B, A, C, 44);
  const atC = angleLabelPoint(C, A, B, 44);
  const midHypX = (B.x + C.x) / 2 + 14;
  const midHypY = (B.y + C.y) / 2 + 2;
  return (
    <div className="special-tri-wrap">
      <svg
        className="special-tri"
        viewBox="0 0 220 204"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="A 45-45-90 triangle with equal legs"
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="color-mix(in oklch, var(--primary) 10%, transparent)"
          stroke="var(--primary)"
          strokeWidth={1.8}
        />
        <g color="var(--primary)">
          <RightAngleMark x={A.x} y={A.y} size={12} />
        </g>
        <text x={(A.x + B.x) / 2} y={A.y + 18} textAnchor="middle" className="special-tri-label">
          {leg}
        </text>
        <text x={A.x - 8} y={(A.y + C.y) / 2 + 4} textAnchor="end" className="special-tri-label">
          {leg}
        </text>
        <text x={midHypX} y={midHypY} textAnchor="start" className="special-tri-label">
          {hyp}
        </text>
        <text
          x={atB.x}
          y={atB.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="special-tri-label special-tri-label--angle"
        >
          45{"\u00b0"}
        </text>
        <text
          x={atC.x}
          y={atC.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="special-tri-label special-tri-label--angle"
        >
          45{"\u00b0"}
        </text>
      </svg>
    </div>
  );
}

/** 30-60-90 triangle: short vertical, long horizontal, 30° opposite the short side. */
export function Triangle30({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  const hyp = reveal.s2 || reveal.s3 || reveal.s4 ? "1" : "2";
  const short = reveal.s2 || reveal.s3 || reveal.s4 ? "1/2" : "1";
  const long = reveal.s2 || reveal.s3 || reveal.s4 ? "\u221a3/2" : "\u221a3";
  const A = { x: 46, y: 118 };
  const shortLen = 76;
  const longLen = shortLen * Math.sqrt(3);
  const B = { x: A.x + longLen, y: A.y };
  const C = { x: A.x, y: A.y - shortLen };
  const at30 = angleLabelPoint(B, A, C, 54);
  const at60 = angleLabelPoint(C, A, B, 32);
  const midHypX = (B.x + C.x) / 2 + 12;
  const midHypY = (B.y + C.y) / 2 + 3;
  return (
    <div className="special-tri-wrap special-tri-wrap--wide">
      <svg
        className="special-tri"
        viewBox="0 0 236 154"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="A 30-60-90 triangle with sides in the ratio 1 to root 3 to 2"
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="color-mix(in oklch, var(--teal) 10%, transparent)"
          stroke="var(--teal)"
          strokeWidth={1.8}
        />
        <g color="var(--teal)">
          <RightAngleMark x={A.x} y={A.y} size={11} />
        </g>
        <text x={(A.x + B.x) / 2} y={A.y + 18} textAnchor="middle" className="special-tri-label">
          {long}
        </text>
        <text x={A.x - 8} y={(A.y + C.y) / 2 + 4} textAnchor="end" className="special-tri-label">
          {short}
        </text>
        <text x={midHypX} y={midHypY} textAnchor="start" className="special-tri-label">
          {hyp}
        </text>
        <text
          x={at30.x}
          y={at30.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="special-tri-label special-tri-label--angle special-tri-label--sharp"
        >
          30{"\u00b0"}
        </text>
        <text
          x={at60.x}
          y={at60.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="special-tri-label special-tri-label--angle"
        >
          60{"\u00b0"}
        </text>
      </svg>
    </div>
  );
}
