import { type PointerEvent, useRef } from "react";
import Tex from "../../components/Tex";
import { PlaneGrid, PlaneTicks, makePlane } from "../../components/Plane";
import PlotMarkers from "../../components/PlotMarkers";
import { formatValue, normalizeDegrees, toRadians } from "../../lib/trig";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 460;

type Mode = "rose" | "cardioid" | "limacon";
const HALF: Record<Mode, number> = { rose: 1.4, cardioid: 2.4, limacon: 3.8 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Rose order n (integer), and limaçon parts a, b (each an integer tenth). */
const roseN = (values: Record<string, number>) => Math.max(1, Math.round(values.n ?? 2));
const limA = (values: Record<string, number>) => (values.a ?? 10) / 10;
const limB = (values: Record<string, number>) => (values.b ?? 10) / 10;

/** r = f(theta) for each family (theta in degrees, r may be negative). */
const radiusOf = (mode: Mode, deg: number, values: Record<string, number>) => {
  const t = toRadians(deg);
  if (mode === "rose") return Math.cos(roseN(values) * t);
  if (mode === "cardioid") return 1 + Math.cos(t);
  return limA(values) + limB(values) * Math.cos(t);
};

/** Petals: n if n is odd, 2n if n is even (for r = cos(n*theta)). */
const petalCount = (n: number) => (n % 2 === 0 ? 2 * n : n);

/** Limaçon shape from the ratio a/b, matching the standard classification. */
const limaconType = (a: number, b: number) => {
  if (a < b - 1e-9) return "inner loop";
  if (Math.abs(a - b) < 1e-9) return "cardioid";
  if (a < 2 * b - 1e-9) return "dimpled";
  return "convex";
};

/** Worked sample dots for slide 1 (the r = cos 2theta rose). */
const SAMPLES: Record<string, { deg: number; label: string }[]> = {
  rose: [
    { deg: 0, label: "0\u00b0" },
    { deg: 30, label: "30\u00b0" },
    { deg: 45, label: "45\u00b0" },
  ],
};

const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};

export default function PolarRosesStage(props: LessonFigureProps) {
  const { slide, values, reveal, interactive, plot, setValue } = props;
  const mode = (slide.mode as Mode) ?? "rose";
  const plane = makePlane(SIZE, HALF[mode]);
  const svgRef = useRef<SVGSVGElement>(null);

  const theta = values.theta ?? 0;
  const r = radiusOf(mode, theta, values);
  const a = toRadians(theta);
  const px = plane.sx(r * Math.cos(a));
  const py = plane.sy(r * Math.sin(a));

  const n = roseN(values);
  const petals = petalCount(n);

  const curvePath = (endDeg: number, steps: number) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const deg = (endDeg * i) / steps;
      const rr = radiusOf(mode, deg, values);
      const ang = toRadians(deg);
      d += `${i === 0 ? "M" : "L"}${plane.sx(rr * Math.cos(ang)).toFixed(2)} ${plane.sy(rr * Math.sin(ang)).toFixed(2)} `;
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
    setValue("theta", () => deg);
  };

  const modeSamples = SAMPLES[mode] ?? [];
  const showDock = Boolean(reveal.dock);

  const equationTex =
    mode === "cardioid"
      ? "r = 1 + \\cos\\theta"
      : mode === "limacon"
        ? `r = ${trim(limA(values))} + ${trim(limB(values))}\\cos\\theta`
        : `r = \\cos(${n}\\theta)`;

  const summaryTex =
    mode === "cardioid"
      ? "r_{\\max} = 2 \\text{ at } \\theta = 0^\\circ"
      : mode === "limacon"
        ? `\\text{shape: } \\text{${limaconType(limA(values), limB(values))}}`
        : `\\text{petals} = ${petals}`;

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <svg
            ref={svgRef}
            className={`figure ${interactive ? "figure--live" : ""}`}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label={`Polar graph in ${mode} mode, radius ${formatValue(r, 2)} at theta ${Math.round(theta)} degrees.`}
            onPointerDown={(event) => {
              if (!interactive) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              applyPointer(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons) applyPointer(event);
            }}
          >
            <PlaneGrid plane={plane} labels={false} />

            {reveal.curve && <path d={curvePath(360, 360)} className="curve-ghost" />}
            {reveal.trace && (
              <path d={curvePath(theta, Math.max(2, Math.ceil(theta)))} className="curve-trace" />
            )}

            {reveal.samples &&
              modeSamples.map((s) => {
                const rr = radiusOf(mode, s.deg, values);
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

            {/* Axis numbers on top of the curve so a petal never slices through them. */}
            <PlaneTicks plane={plane} />

            {reveal.tracer && !plot && (
              <>
                <line x1={plane.center} y1={plane.center} x2={px} y2={py} className="radius-line" />
                <circle cx={px} cy={py} r="8.5" className="point-dot" />
                <text
                  x={clamp(px + 14, 40, SIZE - 40)}
                  y={clamp(py - 10, 16, SIZE - 12)}
                  className="tri-label tri-label--r"
                  textAnchor="middle"
                >
                  r = {formatValue(r, 2)}
                </text>
              </>
            )}

            <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />

            {plot && <PlotMarkers plane={plane} plot={plot} />}
          </svg>
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{equationTex}</Tex>
              <Tex>{summaryTex}</Tex>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
