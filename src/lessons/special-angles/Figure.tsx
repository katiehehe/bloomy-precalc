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
const HALF = 1.6;
const SIZE = 320;

function familyFor(mode: string): number[] {
  return FAMILIES[mode] ?? FAMILIES.axis;
}

function arcPath(cx: number, cy: number, r: number, deg: number) {
  if (deg <= 0.5) return "";
  if (deg >= 359.5) return `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx + r - 0.01} ${cy}`;
  const a = (deg * Math.PI) / 180;
  const x = cx + r * Math.cos(a);
  const y = cy - r * Math.sin(a);
  const large = deg > 180 ? 1 : 0;
  return `M ${cx + r} ${cy} A ${r} ${r} 0 ${large} 0 ${x.toFixed(2)} ${y.toFixed(2)}`;
}

/**
 * Full unit circle with one special-angle family marked. The current terminal
 * side, dashed drops, and the live (x, y) label sit on the figure so a learner
 * can copy the picture with a pencil.
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

  const labelR = 1.22;
  const coordSide = cur.x >= 0 ? 1 : -1;
  const coordX = plane.sx(cur.x) + coordSide * 10;
  const coordY = plane.sy(cur.y) - (cur.y >= 0 ? 12 : -18);

  return (
    <svg
      ref={svgRef}
      className="figure figure-plot"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Unit circle at ${deg} degrees, point ${cur.coordLabel}`}
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
      <PlaneGrid plane={plane} />
      <circle cx={ox} cy={oy} r={r} className="circle-line" fill="none" />

      {reveal.arc && deg > 0.5 && (
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

      {family.map((d, i) => {
        const a = angleAt(d);
        const sx = plane.sx(a.x);
        const sy = plane.sy(a.y);
        const lx = plane.sx(a.x * labelR);
        const ly = plane.sy(a.y * labelR);
        const active = i === idx;
        const tag = d === 360 ? "360\u00b0" : `${d}\u00b0`;
        return (
          <g key={`${d}-${i}`}>
            <circle
              cx={sx}
              cy={sy}
              r={active ? 6 : 3.4}
              fill={active ? "var(--primary)" : "var(--muted)"}
            />
            <text
              x={lx}
              y={ly + 4}
              textAnchor="middle"
              className="tick-label"
              fill={active ? "var(--ink)" : "var(--muted)"}
            >
              {tag}
            </text>
          </g>
        );
      })}

      {reveal.coords && (
        <text
          x={coordX}
          y={coordY}
          textAnchor={coordSide > 0 ? "start" : "end"}
          className="angle-glyph-label"
          fill="var(--ink)"
        >
          {cur.coordLabel}
        </text>
      )}

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

/** Small 45-45-90 triangle whose side labels update as the scaling is revealed. */
export function Triangle45({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  const hyp = reveal.s2 || reveal.s3 || reveal.s4 ? "1" : "\u221a2";
  const leg = reveal.s3 || reveal.s4 ? "\u221a2/2" : reveal.s2 ? "1/\u221a2" : "1";
  return (
    <svg className="figure-plot" viewBox="0 0 140 100" role="img" aria-label="A 45-45-90 triangle">
      <polygon points="24,82 116,82 24,18" fill="color-mix(in oklch, var(--primary) 10%, transparent)" stroke="var(--primary)" strokeWidth={1.6} />
      <text x="70" y="96" textAnchor="middle" className="tick-label">{leg}</text>
      <text x="10" y="54" textAnchor="middle" className="tick-label">{leg}</text>
      <text x="82" y="44" textAnchor="middle" className="tick-label">{hyp}</text>
      <text x="40" y="78" className="tick-label">45{'\u00b0'}</text>
    </svg>
  );
}

/** Small 30-60-90 triangle whose side labels update as the scaling is revealed. */
export function Triangle30({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  const hyp = reveal.s2 || reveal.s3 || reveal.s4 ? "1" : "2";
  const short = reveal.s2 || reveal.s3 || reveal.s4 ? "1/2" : "1";
  const long = reveal.s2 || reveal.s3 || reveal.s4 ? "\u221a3/2" : "\u221a3";
  return (
    <svg className="figure-plot" viewBox="0 0 150 100" role="img" aria-label="A 30-60-90 triangle">
      <polygon points="20,82 130,82 20,22" fill="color-mix(in oklch, var(--teal) 10%, transparent)" stroke="var(--teal)" strokeWidth={1.6} />
      <text x="78" y="96" textAnchor="middle" className="tick-label">{long}</text>
      <text x="8" y="56" textAnchor="middle" className="tick-label">{short}</text>
      <text x="90" y="46" textAnchor="middle" className="tick-label">{hyp}</text>
      <text x="38" y="78" className="tick-label">30{'\u00b0'}</text>
      <text x="24" y="40" className="tick-label">60{'\u00b0'}</text>
    </svg>
  );
}
