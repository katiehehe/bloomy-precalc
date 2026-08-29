import { type PointerEvent, type ReactNode, useRef } from "react";
import { makePlane } from "./Plane";
import PlotMarkers from "./PlotMarkers";
import type { LessonFigureProps } from "../lessons/types";

const SIZE = 460;
const MARGIN = 26;

const TONE: Record<string, string> = {
  primary: "var(--primary)",
  a: "var(--cosine)",
  b: "var(--teal)",
  sum: "var(--sum, var(--primary))",
  muted: "var(--line)",
};

/** One arrow from the origin to a complex number, drawn on the Argand plane. */
export type Phasor = {
  re: number;
  im: number;
  /** Colour role for the arrow and its dot. */
  tone?: "primary" | "a" | "b" | "sum" | "muted";
  /** Label placed next to the dot (plain text: "z", "z_1", "-2i"). */
  label?: string;
  /** Draw the dashed horizontal and vertical legs of the right triangle. */
  legs?: boolean;
  /** Draw the argument arc from the positive real axis to this arrow. */
  arc?: boolean;
  /** Label on the argument arc (plain text, e.g. "\u03b8" or "45\u00b0"). */
  arcLabel?: string;
  /** Label on the arrow itself, near its midpoint (e.g. "r" or "5"). */
  rLabel?: string;
  /** Draw the arrow dashed (a guide or a target rather than a solid vector). */
  dashed?: boolean;
};

export type ComplexSpec = {
  aria: string;
  phasors: Phasor[];
  /** Optional guide circle centred at the origin, radius in world units. */
  ring?: number;
  /** Small dots (e.g. the n roots of unity) drawn on the ring. */
  dots?: { re: number; im: number; label?: string }[];
};

/** Argument arc in screen space, from angle 0 to `deg`, around the origin. */
function argArc(cx: number, cy: number, deg: number, r: number): string {
  if (Math.abs(deg) < 0.8) return "";
  const a = (deg * Math.PI) / 180;
  const x = cx + r * Math.cos(a);
  const y = cy - r * Math.sin(a);
  const large = Math.abs(deg) > 180 ? 1 : 0;
  // Screen y grows downward, so a counterclockwise (positive) angle sweeps with sweep-flag 0.
  const sweep = deg >= 0 ? 0 : 1;
  return `M ${cx + r} ${cy} A ${r} ${r} 0 ${large} ${sweep} ${x.toFixed(2)} ${y.toFixed(2)}`;
}

/**
 * A complex plane (Argand diagram) that draws arrows from the origin to one or
 * more complex numbers, each optionally showing its modulus (arrow length),
 * argument (angle arc), and the right-triangle legs a and b. An optional guide
 * ring and evenly spaced dots support roots-of-unity figures. Pure drawing: the
 * lesson Stage computes the phasors from `values`/`reveal` and passes them in,
 * exactly like AngleCircle. Supports dragging the primary point and click-a-point
 * (plot) questions.
 */
export default function ComplexPlane({
  spec,
  half,
  interactive,
  plot,
  onDrag,
}: LessonFigureProps & {
  spec: ComplexSpec;
  half: number;
  /** Called with world coords while the learner drags on the plane. */
  onDrag?: (re: number, im: number) => void;
}) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const nMax = Math.floor(half + 1e-6);
  const cx = plane.sx(0);
  const cy = plane.sy(0);

  const grid: ReactNode[] = [];
  for (let n = -nMax; n <= nMax; n += 1) {
    if (n === 0) continue;
    grid.push(<line key={`v${n}`} x1={plane.sx(n)} y1={MARGIN} x2={plane.sx(n)} y2={SIZE - MARGIN} className="grid-line" />);
    grid.push(<line key={`h${n}`} x1={MARGIN} y1={plane.sy(n)} x2={SIZE - MARGIN} y2={plane.sy(n)} className="grid-line" />);
  }

  const ticks: ReactNode[] = [];
  for (let n = -nMax; n <= nMax; n += 1) {
    if (n === 0) continue;
    ticks.push(
      <text key={`tr${n}`} x={plane.sx(n)} y={cy + 15} className="tick-label" textAnchor="middle">
        {n}
      </text>,
    );
    ticks.push(
      <text key={`ti${n}`} x={cx - 8} y={plane.sy(n) + 4} className="tick-label" textAnchor="end">
        {n === 1 ? "i" : n === -1 ? "-i" : `${n}i`}
      </text>,
    );
  }

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const wx = plane.wx(((event.clientX - rect.left) / rect.width) * SIZE);
    const wy = plane.wy(((event.clientY - rect.top) / rect.height) * SIZE);
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
      {grid}
      <line x1={MARGIN} y1={cy} x2={SIZE - MARGIN} y2={cy} className="axis" />
      <line x1={cx} y1={MARGIN} x2={cx} y2={SIZE - MARGIN} className="axis" />
      <text x={SIZE - 8} y={cy - 8} className="axis-label" textAnchor="end">
        Re
      </text>
      <text x={cx + 10} y={MARGIN + 4} className="axis-label">
        Im
      </text>
      {ticks}

      {spec.ring != null && spec.ring > 0 && (
        <circle cx={cx} cy={cy} r={spec.ring * plane.unit} className="complex-ring" fill="none" />
      )}

      {spec.phasors.map((p, i) => {
        const color = TONE[p.tone ?? "primary"];
        const px = plane.sx(p.re);
        const py = plane.sy(p.im);
        const deg = (Math.atan2(p.im, p.re) * 180) / Math.PI;
        const key = `ph${i}`;
        return (
          <g key={key}>
            {p.legs && (
              <g className="complex-leg">
                <line x1={cx} y1={cy} x2={px} y2={cy} stroke={TONE.a} strokeWidth={2} strokeDasharray="4 4" />
                <line x1={px} y1={cy} x2={px} y2={py} stroke={TONE.b} strokeWidth={2} strokeDasharray="4 4" />
              </g>
            )}
            {p.arc && (
              <path d={argArc(cx, cy, deg, 30)} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
            )}
            {p.arc && p.arcLabel && Math.abs(deg) > 0.8 && (
              <text
                x={cx + 46 * Math.cos((deg / 2 / 180) * Math.PI)}
                y={cy - 46 * Math.sin((deg / 2 / 180) * Math.PI) + 4}
                className="angle-glyph-label"
                textAnchor="middle"
                fill={color}
              >
                {p.arcLabel}
              </text>
            )}
            <line x1={cx} y1={cy} x2={px} y2={py} stroke={color} strokeWidth={2.8} strokeLinecap="round" strokeDasharray={p.dashed ? "6 5" : undefined} />
            {p.rLabel && (
              <text x={(cx + px) / 2 - 10} y={(cy + py) / 2 - 8} className="root-label" fill={color}>
                {p.rLabel}
              </text>
            )}
            <circle cx={px} cy={py} r={6.5} fill={color} />
            {p.label && (
              <text x={px + 12} y={py - 10} className="root-label" fill={color}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}

      {spec.dots?.map((d, i) => (
        <g key={`dot${i}`}>
          <circle cx={plane.sx(d.re)} cy={plane.sy(d.im)} r={5.5} className="root-dot" />
          {d.label && (
            <text x={plane.sx(d.re) + 10} y={plane.sy(d.im) - 8} className="root-label">
              {d.label}
            </text>
          )}
        </g>
      ))}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
