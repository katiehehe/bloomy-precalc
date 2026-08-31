import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { angleArcPath, formatValue, normalizeDegrees, toRadians } from "../../lib/trig";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Mode = "convert" | "worked" | "play" | "rose";
const HALF: Record<Mode, number> = { convert: 5, worked: 5, play: 5, rose: 1.25 };

/** r = cos 2θ, the classic four-petaled rose (θ in degrees). */
const roseR = (deg: number) => Math.cos(2 * toRadians(deg));

/** A few worked points that teach how to estimate the rose from its rule. */
const ROSE_SAMPLES = [
  { deg: 0, label: "0\u00b0" },
  { deg: 30, label: "30\u00b0" },
  { deg: 45, label: "45\u00b0" },
];

/** Live polar and rectangular coordinates for the dock readout. */
export function polarPoint(mode: string, values: Record<string, number>) {
  const theta = values.theta ?? 0;
  const r = mode === "rose" ? roseR(theta) : (values.r ?? 0) / 100;
  const a = toRadians(theta);
  return { r, theta, x: r * Math.cos(a), y: r * Math.sin(a) };
}

export default function PolarFigure({ values, slide, reveal, interactive, plot, setValue }: LessonFigureProps) {
  const mode = (slide.mode as Mode) ?? "play";
  const plane = makePlane(SIZE, HALF[mode]);
  const svgRef = useRef<SVGSVGElement>(null);

  const theta = values.theta ?? 0;
  const rWorld = mode === "rose" ? roseR(theta) : (values.r ?? 0) / 100;
  const a = toRadians(theta);
  const x = rWorld * Math.cos(a);
  const y = rWorld * Math.sin(a);
  const px = plane.sx(x);
  const py = plane.sy(y);
  const footX = plane.sx(x);
  const footY = plane.center;

  const rosePath = (deg1: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const deg = (deg1 * i) / steps;
      const r = roseR(deg);
      const ang = toRadians(deg);
      d += `${i === 0 ? "M" : "L"}${plane.sx(r * Math.cos(ang)).toFixed(2)} ${plane.sy(r * Math.sin(ang)).toFixed(2)} `;
    }
    return d.trim();
  };

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    if (plot) {
      plot.onGuess({ x: wx, y: wy });
      return;
    }
    const deg = normalizeDegrees((Math.atan2(wy, wx) * 180) / Math.PI);
    if (mode === "rose") {
      setValue("theta", () => deg);
      return;
    }
    setValue("theta", () => deg);
    setValue("r", () => Math.hypot(wx, wy) * 100);
  };

  const arcTip = angleArcPath(theta, plane.center, 30);
  const rMidX = (plane.center + px) / 2;
  const rMidY = (plane.center + py) / 2;

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Polar point at r = ${formatValue(rWorld, 2)}, theta = ${Math.round(theta)} degrees.`}
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

      {mode === "rose" && reveal.path && <path d={rosePath(360, 360)} className="curve-ghost" />}
      {mode === "rose" && reveal.trace && <path d={rosePath(theta, Math.max(2, Math.ceil(theta)))} className="curve-trace" />}

      {mode === "rose" &&
        reveal.samples &&
        ROSE_SAMPLES.map((s) => {
          const rr = roseR(s.deg);
          const ang = toRadians(s.deg);
          const sx = plane.sx(rr * Math.cos(ang));
          const sy = plane.sy(rr * Math.sin(ang));
          return (
            <g key={s.deg}>
              <circle cx={sx} cy={sy} r="5.5" className="sample-dot" />
              <text x={sx} y={sy - 11} textAnchor="middle" className="sample-label">
                {s.label}
              </text>
            </g>
          );
        })}

      {reveal.legs && !plot && (
        <>
          <line x1={plane.center} y1={plane.center} x2={footX} y2={footY} className="leg-cos" />
          <line x1={footX} y1={footY} x2={px} y2={py} className="leg-sin" />
          <path
            d={`M${footX - 13 * Math.sign(x || 1)} ${footY} L${footX - 13 * Math.sign(x || 1)} ${footY - 13 * Math.sign(y || 1)} L${footX} ${footY - 13 * Math.sign(y || 1)}`}
            className="right-angle"
          />
          <text x={(plane.center + footX) / 2} y={footY + 16 * Math.sign(y || 1) + (y >= 0 ? 0 : 4)} className="tri-label tri-label--x" textAnchor="middle">
            x
          </text>
          <text x={footX + 12 * Math.sign(x || 1)} y={(footY + py) / 2} className="tri-label tri-label--y" textAnchor="middle">
            y
          </text>
        </>
      )}

      {reveal.angle && !plot && theta > 3 && <path d={arcTip} className="angle-arc" />}

      {reveal.radius && !plot && (
        <>
          <line x1={plane.center} y1={plane.center} x2={px} y2={py} className="radius-line" />
          <text x={rMidX - 12} y={rMidY - 8} className="tri-label tri-label--r">
            r
          </text>
        </>
      )}

      <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />
      {!plot && <circle cx={px} cy={py} r="8.5" className="point-dot" />}

      {reveal.coords && !plot && (
        <g
          className="point-label"
          transform={`translate(${clamp(px, 52, SIZE - 52)}, ${clamp(py - 20, 18, SIZE - 14)})`}
        >
          <text textAnchor="middle" y={4}>
            ({formatValue(x, 2)}, {formatValue(y, 2)})
          </text>
        </g>
      )}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
