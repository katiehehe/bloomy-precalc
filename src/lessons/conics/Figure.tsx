import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import { formatValue } from "../../lib/trig";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const HALF = 5;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Mode = "circle" | "ellipse" | "parabola" | "hyperbola" | "summary";

type Plane = ReturnType<typeof makePlane>;

/** Sample y = a x^2 across the width where it stays on screen. */
function parabolaPath(plane: Plane, a: number) {
  const xMax = Math.min(HALF, Math.sqrt(HALF / Math.max(a, 0.001)));
  let d = "";
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const x = -xMax + (2 * xMax * i) / steps;
    const y = a * x * x;
    d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
  }
  return d.trim();
}

/** A colored "defining distance" segment with a short label at its midpoint. */
function DistSeg({
  x1,
  y1,
  x2,
  y2,
  variant,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  variant: "1" | "2";
  label: string;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={`def-seg def-seg--${variant}`} />
      <text x={mx} y={my - 6} textAnchor="middle" className={`def-label def-label--${variant}`}>
        {label}
      </text>
    </>
  );
}

/** One branch of x^2/a^2 - y^2/b^2 = 1 using x = sign * a cosh t, y = b sinh t. */
function hyperbolaBranch(plane: Plane, a: number, b: number, sign: 1 | -1) {
  const tMax = Math.asinh(HALF / Math.max(b, 0.2));
  let d = "";
  const steps = 90;
  for (let i = 0; i <= steps; i++) {
    const t = -tMax + (2 * tMax * i) / steps;
    const x = sign * a * Math.cosh(t);
    const y = b * Math.sinh(t);
    d += `${i === 0 ? "M" : "L"}${plane.sx(x).toFixed(2)} ${plane.sy(y).toFixed(2)} `;
  }
  return d.trim();
}

export default function ConicFigure({ values, slide, reveal, interactive, setValue }: LessonFigureProps) {
  const mode = (slide.mode as Mode) ?? "circle";
  const plane = makePlane(SIZE, HALF);
  const svgRef = useRef<SVGSVGElement>(null);

  const r = (values.r ?? 250) / 100;
  const a = (values.a ?? 200) / 100;
  const b = (values.b ?? 200) / 100;
  const pa = (values.a ?? 30) / 100;

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    if (mode === "circle") setValue("r", () => Math.hypot(wx, wy) * 100);
    else if (mode === "ellipse") {
      setValue("a", () => Math.abs(wx) * 100);
      setValue("b", () => Math.abs(wy) * 100);
    } else if (mode === "parabola" && Math.abs(wx) > 0.4) {
      setValue("a", () => (wy / (wx * wx)) * 100);
    }
  };

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Conic figure: ${mode}.`}
      onPointerDown={(event) => {
        if (!interactive) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        // In the summary, a click anywhere steps to the next conic; clicking a
        // specific curve (handled on its own group) selects it directly.
        if (mode === "summary") {
          setValue("view", (cur) => (Math.round(cur) + 1) % 4);
          return;
        }
        applyPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons) applyPointer(event);
      }}
    >
      <PlaneGrid plane={plane} />

      {mode === "circle" && (
        <>
          <circle cx={plane.center} cy={plane.center} r={r * plane.unit} className="conic-curve" />
          {reveal.radius && (
            <>
              <line
                x1={plane.center}
                y1={plane.center}
                x2={plane.sx(r)}
                y2={plane.center}
                className="radius-line"
              />
              <text x={plane.sx(r / 2)} y={plane.center - 8} className="tri-label tri-label--r" textAnchor="middle">
                r
              </text>
            </>
          )}
          {reveal.defDist &&
            (() => {
              // A second radius to another point on the circle, same length r,
              // makes "every point is the same distance from the center" concrete.
              const ang = (125 * Math.PI) / 180;
              const p2x = plane.sx(r * Math.cos(ang));
              const p2y = plane.sy(r * Math.sin(ang));
              return (
                <>
                  <DistSeg x1={plane.center} y1={plane.center} x2={p2x} y2={p2y} variant="1" label="r" />
                  <circle cx={p2x} cy={p2y} r="5" className="def-dot" />
                </>
              );
            })()}
        </>
      )}

      {mode === "ellipse" && (
        <>
          <ellipse
            cx={plane.center}
            cy={plane.center}
            rx={a * plane.unit}
            ry={b * plane.unit}
            className="conic-curve"
          />
          {reveal.foci && Math.abs(a - b) > 0.05 && (
            <>
              {a > b ? (
                <>
                  <circle cx={plane.sx(Math.sqrt(a * a - b * b))} cy={plane.center} r="5.5" className="focus-dot" />
                  <circle cx={plane.sx(-Math.sqrt(a * a - b * b))} cy={plane.center} r="5.5" className="focus-dot" />
                </>
              ) : (
                <>
                  <circle cx={plane.center} cy={plane.sy(Math.sqrt(b * b - a * a))} r="5.5" className="focus-dot" />
                  <circle cx={plane.center} cy={plane.sy(-Math.sqrt(b * b - a * a))} r="5.5" className="focus-dot" />
                </>
              )}
            </>
          )}
          {reveal.defDist &&
            (() => {
              // From one point on the ellipse, the two distances to the foci add
              // to 2a (the constant that defines every ellipse).
              const wide = a >= b;
              const c = Math.sqrt(Math.abs(a * a - b * b));
              const f1 = wide ? { x: c, y: 0 } : { x: 0, y: c };
              const f2 = wide ? { x: -c, y: 0 } : { x: 0, y: -c };
              const th = (52 * Math.PI) / 180;
              const P = { x: a * Math.cos(th), y: b * Math.sin(th) };
              const psx = plane.sx(P.x);
              const psy = plane.sy(P.y);
              return (
                <>
                  <DistSeg x1={psx} y1={psy} x2={plane.sx(f1.x)} y2={plane.sy(f1.y)} variant="1" label={"d\u2081"} />
                  <DistSeg x1={psx} y1={psy} x2={plane.sx(f2.x)} y2={plane.sy(f2.y)} variant="2" label={"d\u2082"} />
                  <circle cx={psx} cy={psy} r="5" className="def-dot" />
                </>
              );
            })()}
        </>
      )}

      {mode === "parabola" && (
        <>
          <path d={parabolaPath(plane, pa)} className="conic-curve" />
          {reveal.focus && pa > 0.02 && (
            <>
              <circle cx={plane.center} cy={plane.sy(1 / (4 * pa))} r="5.5" className="focus-dot" />
              <line
                x1={plane.sx(-HALF)}
                y1={plane.sy(-1 / (4 * pa))}
                x2={plane.sx(HALF)}
                y2={plane.sy(-1 / (4 * pa))}
                className="directrix"
              />
            </>
          )}
          {reveal.defDist &&
            pa > 0.02 &&
            (() => {
              // From a point on the parabola, the distance up to the focus equals
              // the distance straight down to the directrix.
              const foc = 1 / (4 * pa);
              const x0 = Math.min(1.7, Math.sqrt(HALF / Math.max(pa, 0.001)) * 0.7);
              const y0 = pa * x0 * x0;
              const psx = plane.sx(x0);
              const psy = plane.sy(y0);
              return (
                <>
                  <DistSeg x1={psx} y1={psy} x2={plane.center} y2={plane.sy(foc)} variant="1" label={"d\u2081"} />
                  <DistSeg x1={psx} y1={psy} x2={psx} y2={plane.sy(-foc)} variant="2" label={"d\u2082"} />
                  <circle cx={psx} cy={psy} r="5" className="def-dot" />
                </>
              );
            })()}
        </>
      )}

      {mode === "hyperbola" && (
        <>
          {reveal.asymptotes && (
            <>
              <line
                x1={plane.sx(-HALF)}
                y1={plane.sy((-b / a) * HALF)}
                x2={plane.sx(HALF)}
                y2={plane.sy((b / a) * HALF)}
                className="asymptote"
              />
              <line
                x1={plane.sx(-HALF)}
                y1={plane.sy((b / a) * HALF)}
                x2={plane.sx(HALF)}
                y2={plane.sy((-b / a) * HALF)}
                className="asymptote"
              />
            </>
          )}
          <path d={hyperbolaBranch(plane, a, b, 1)} className="conic-curve" />
          <path d={hyperbolaBranch(plane, a, b, -1)} className="conic-curve" />
          {reveal.foci &&
            (() => {
              const c = Math.sqrt(a * a + b * b);
              return (
                <>
                  <circle cx={plane.sx(c)} cy={plane.center} r="5.5" className="focus-dot" />
                  <circle cx={plane.sx(-c)} cy={plane.center} r="5.5" className="focus-dot" />
                </>
              );
            })()}
          {reveal.defDist &&
            (() => {
              // From a point on one branch, the two distances to the foci differ
              // by 2a (the constant that defines every hyperbola).
              const c = Math.sqrt(a * a + b * b);
              const t0 = 0.72;
              const P = { x: a * Math.cosh(t0), y: b * Math.sinh(t0) };
              const psx = plane.sx(P.x);
              const psy = plane.sy(P.y);
              return (
                <>
                  <DistSeg x1={psx} y1={psy} x2={plane.sx(-c)} y2={plane.center} variant="2" label={"d\u2082"} />
                  <DistSeg x1={psx} y1={psy} x2={plane.sx(c)} y2={plane.center} variant="1" label={"d\u2081"} />
                  <circle cx={psx} cy={psy} r="5" className="def-dot" />
                </>
              );
            })()}
        </>
      )}

      {mode === "summary" &&
        (() => {
          const sel = clamp(Math.round(values.view ?? 0), 0, 3);
          const dim = (i: number) => (sel === i ? "" : " is-dim");
          const pick = (i: number) => (event: PointerEvent<SVGGElement>) => {
            if (!interactive) return;
            event.stopPropagation();
            setValue("view", () => i);
          };
          const names = ["circle", "ellipse", "parabola", "hyperbola"];
          const groupProps = (i: number) => ({
            className: `conic-pick${interactive ? " is-live" : ""}`,
            onPointerDown: pick(i),
            role: "button" as const,
            tabIndex: interactive ? 0 : -1,
            "aria-label": `Highlight the ${names[i]}`,
            "aria-pressed": sel === i,
          });
          return (
            <>
              <g {...groupProps(0)}>
                <circle cx={plane.center} cy={plane.center} r={2 * plane.unit} className="conic-hit" />
                <circle cx={plane.center} cy={plane.center} r={2 * plane.unit} className={`conic-circle${dim(0)}`} />
              </g>
              <g {...groupProps(1)}>
                <ellipse cx={plane.center} cy={plane.center} rx={3.6 * plane.unit} ry={2 * plane.unit} className="conic-hit" />
                <ellipse cx={plane.center} cy={plane.center} rx={3.6 * plane.unit} ry={2 * plane.unit} className={`conic-ellipse${dim(1)}`} />
              </g>
              <g {...groupProps(2)}>
                <path d={parabolaPath(plane, 0.35)} className="conic-hit" />
                <path d={parabolaPath(plane, 0.35)} className={`conic-parabola${dim(2)}`} />
              </g>
              <g {...groupProps(3)}>
                <path d={hyperbolaBranch(plane, 1.4, 1.4, 1)} className="conic-hit" />
                <path d={hyperbolaBranch(plane, 1.4, 1.4, -1)} className="conic-hit" />
                <path d={hyperbolaBranch(plane, 1.4, 1.4, 1)} className={`conic-hyperbola${dim(3)}`} />
                <path d={hyperbolaBranch(plane, 1.4, 1.4, -1)} className={`conic-hyperbola${dim(3)}`} />
              </g>
            </>
          );
        })()}

      <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />
    </svg>
  );
}
