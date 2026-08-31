import { type PointerEvent, useRef } from "react";
import { PlaneGrid, makePlane } from "../../components/Plane";
import { angleArcPath, formatValue, normalizeDegrees, toRadians } from "../../lib/trig";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

const SIZE = 460;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export type Mode = "single" | "components" | "add" | "subtract" | "resultant";

/** Slider units per world unit. Sliders stay integers; the figure works in world space. */
export const SCALE = 20;
/** The fixed first vector in the addition and subtraction worked examples. */
export const A_VEC = { x: 3, y: 1 };

const HALF: Record<Mode, number> = { single: 5.5, components: 5.5, add: 7.5, subtract: 7, resultant: 5.5 };

/** Live vectors and derived magnitude/direction for the dock, keyed by slide mode. */
export function vectorReadout(mode: string, values: Record<string, number>) {
  if (mode === "add") {
    const b = { x: (values.bx ?? 0) / SCALE, y: (values.by ?? 0) / SCALE };
    const sum = { x: A_VEC.x + b.x, y: A_VEC.y + b.y };
    return { a: A_VEC, b, v: sum, mag: Math.hypot(sum.x, sum.y), dir: normalizeDegrees((Math.atan2(sum.y, sum.x) * 180) / Math.PI) };
  }
  if (mode === "subtract") {
    const b = { x: (values.bx ?? 0) / SCALE, y: (values.by ?? 0) / SCALE };
    const diff = { x: A_VEC.x - b.x, y: A_VEC.y - b.y };
    return { a: A_VEC, b, v: diff, mag: Math.hypot(diff.x, diff.y), dir: normalizeDegrees((Math.atan2(diff.y, diff.x) * 180) / Math.PI) };
  }
  if (mode === "single") {
    const mag = (values.mag ?? 0) / SCALE;
    const dir = values.dir ?? 0;
    const a = toRadians(dir);
    const v = { x: mag * Math.cos(a), y: mag * Math.sin(a) };
    return { a: A_VEC, b: v, v, mag, dir };
  }
  const key = mode === "resultant" ? ["rx", "ry"] : ["vx", "vy"];
  const v = { x: (values[key[0]] ?? 0) / SCALE, y: (values[key[1]] ?? 0) / SCALE };
  return { a: A_VEC, b: v, v, mag: Math.hypot(v.x, v.y), dir: normalizeDegrees((Math.atan2(v.y, v.x) * 180) / Math.PI) };
}

/**
 * An arrow from (x1,y1) to (x2,y2). `fraction` (0..1) draws it partway so it can
 * animate growing tip to tail; `dashed`/`opacity` render a faint reference arrow.
 */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 3.4,
  fraction = 1,
  dashed = false,
  opacity = 1,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width?: number;
  fraction?: number;
  dashed?: boolean;
  opacity?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const fullLen = Math.hypot(dx, dy);
  const len = fullLen * clamp(fraction, 0, 1);
  if (len < 0.5) return null;
  const angle = Math.atan2(dy, dx);
  const tipX = x1 + Math.cos(angle) * len;
  const tipY = y1 + Math.sin(angle) * len;
  const size = Math.min(13, len * 0.9);
  const spread = 0.42;
  const left = [tipX - size * Math.cos(angle - spread), tipY - size * Math.sin(angle - spread)];
  const right = [tipX - size * Math.cos(angle + spread), tipY - size * Math.sin(angle + spread)];
  const base = [tipX - size * 0.82 * Math.cos(angle), tipY - size * 0.82 * Math.sin(angle)];
  return (
    <g opacity={opacity}>
      <line
        x1={x1}
        y1={y1}
        x2={base[0]}
        y2={base[1]}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "6 6" : undefined}
      />
      <path d={`M${tipX} ${tipY} L${left[0]} ${left[1]} L${right[0]} ${right[1]} Z`} fill={color} />
    </g>
  );
}

export default function VectorFigure({ values, slide, reveal, interactive, drawProgress, setValue }: LessonFigureProps) {
  const mode = (slide.mode as Mode) ?? "single";
  const plane = makePlane(SIZE, HALF[mode]);
  const svgRef = useRef<SVGSVGElement>(null);

  const { a, b, v, mag, dir } = vectorReadout(mode, values);

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    if (mode === "single") {
      const deg = normalizeDegrees((Math.atan2(wy, wx) * 180) / Math.PI);
      setValue("dir", () => deg);
      setValue("mag", () => Math.hypot(wx, wy) * SCALE);
      return;
    }
    if (mode === "add") {
      setValue("bx", () => (wx - A_VEC.x) * SCALE);
      setValue("by", () => (wy - A_VEC.y) * SCALE);
      return;
    }
    if (mode === "subtract") {
      // Drag the tip of the difference a - b; that fixes b = a - (dragged point).
      setValue("bx", () => (A_VEC.x - wx) * SCALE);
      setValue("by", () => (A_VEC.y - wy) * SCALE);
      return;
    }
    const key = mode === "resultant" ? ["rx", "ry"] : ["vx", "vy"];
    setValue(key[0], () => wx * SCALE);
    setValue(key[1], () => wy * SCALE);
  };

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={
        mode === "add"
          ? "Two vectors added tip to tail."
          : mode === "subtract"
            ? "One vector minus another, drawn as adding the reverse tip to tail."
            : `A vector of magnitude ${formatValue(mag, 2)} at ${Math.round(dir)} degrees.`
      }
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

      {(mode === "single" || mode === "components" || mode === "resultant") &&
        (() => {
          const tip = { sx: plane.sx(v.x), sy: plane.sy(v.y) };
          const footX = plane.sx(v.x);
          const showComp = mode === "resultant" ? reveal.triangle : reveal.components;
          const showMag = mode === "single" ? reveal.readout : reveal.magnitude;
          const sgnX = Math.sign(v.x) || 1;
          const sgnY = Math.sign(v.y) || 1;
          const mdx = tip.sx - plane.center;
          const mdy = tip.sy - plane.center;
          const mlen = Math.hypot(mdx, mdy) || 1;
          const magX = (plane.center + tip.sx) / 2 + (mdy / mlen) * 22;
          const magY = (plane.center + tip.sy) / 2 - (mdx / mlen) * 22;
          return (
            <>
              {showComp && (
                <>
                  <line x1={plane.center} y1={plane.center} x2={footX} y2={plane.center} className="leg-cos" />
                  <line x1={footX} y1={plane.center} x2={tip.sx} y2={tip.sy} className="leg-sin" />
                  <path
                    d={`M${footX - 12 * sgnX} ${plane.center} L${footX - 12 * sgnX} ${plane.center - 12 * sgnY} L${footX} ${plane.center - 12 * sgnY}`}
                    className="right-angle"
                  />
                  <text x={(plane.center + footX) / 2} y={plane.center + 17 * sgnY + (v.y >= 0 ? 0 : 3)} className="tri-label tri-label--x" textAnchor="middle">
                    {formatValue(v.x, mode === "resultant" ? 0 : 1)}
                  </text>
                  <text x={footX + 13 * sgnX} y={(plane.center + tip.sy) / 2 + 4} className="tri-label tri-label--y" textAnchor="middle">
                    {formatValue(v.y, mode === "resultant" ? 0 : 1)}
                  </text>
                </>
              )}

              {reveal.angle && Math.abs(dir) > 3 && <path d={angleArcPath(dir, plane.center, 30)} className="angle-arc" />}

              <Arrow x1={plane.center} y1={plane.center} x2={tip.sx} y2={tip.sy} color="var(--primary)" width={4.4} />

              {showMag && (
                <text x={magX} y={magY} className="tri-label tri-label--r" textAnchor="middle">
                  |v| = {formatValue(mag, mode === "resultant" ? 0 : 1)}
                </text>
              )}
            </>
          );
        })()}

      {mode === "add" &&
        (() => {
          const O = { sx: plane.center, sy: plane.center };
          const aTip = { sx: plane.sx(a.x), sy: plane.sy(a.y) };
          const sumTip = { sx: plane.sx(v.x), sy: plane.sy(v.y) };
          const sdx = sumTip.sx - O.sx;
          const sdy = sumTip.sy - O.sy;
          const slen = Math.hypot(sdx, sdy) || 1;
          const sumLabX = (O.sx + sumTip.sx) / 2 + (sdy / slen) * 20;
          const sumLabY = (O.sy + sumTip.sy) / 2 - (sdx / slen) * 20;
          // Each arrow is fully drawn once the next one starts; the newest one
          // grows with drawProgress so the chain builds tip to tail.
          const fracA = reveal.drawA ? (reveal.drawB ? 1 : drawProgress) : 0;
          const fracB = reveal.drawB ? (reveal.drawSum ? 1 : drawProgress) : 0;
          const fracSum = reveal.drawSum ? drawProgress : 0;
          return (
            <>
              <Arrow x1={O.sx} y1={O.sy} x2={aTip.sx} y2={aTip.sy} color="var(--cosine)" fraction={fracA} />
              <Arrow x1={aTip.sx} y1={aTip.sy} x2={sumTip.sx} y2={sumTip.sy} color="var(--teal)" fraction={fracB} />
              {fracSum > 0 && (
                <Arrow x1={O.sx} y1={O.sy} x2={sumTip.sx} y2={sumTip.sy} color="var(--primary)" width={4.6} fraction={fracSum} />
              )}
              {fracA > 0.98 && (
                <text x={(O.sx + aTip.sx) / 2} y={(O.sy + aTip.sy) / 2 + 20} className="vec-name" fill="var(--cosine)">
                  a
                </text>
              )}
              {fracB > 0.98 && (
                <text x={(aTip.sx + sumTip.sx) / 2 + 10} y={(aTip.sy + sumTip.sy) / 2 - 8} className="vec-name" fill="var(--teal)">
                  b
                </text>
              )}
              {fracSum > 0.98 && (
                <text x={sumLabX} y={sumLabY} className="vec-name" fill="var(--primary)" textAnchor="middle">
                  a + b
                </text>
              )}
            </>
          );
        })()}

      {mode === "subtract" &&
        (() => {
          const O = { sx: plane.center, sy: plane.center };
          const aTip = { sx: plane.sx(a.x), sy: plane.sy(a.y) };
          // The reverse of b is drawn tip to tail from a's tip; its tip lands on a - b.
          const diffTip = { sx: plane.sx(v.x), sy: plane.sy(v.y) };
          // A faint copy of b (its original direction) starts at a's tip for contrast.
          const bGhost = { sx: plane.sx(a.x + b.x), sy: plane.sy(a.y + b.y) };
          const ddx = diffTip.sx - O.sx;
          const ddy = diffTip.sy - O.sy;
          const dlen = Math.hypot(ddx, ddy) || 1;
          const diffLabX = (O.sx + diffTip.sx) / 2 + (ddy / dlen) * 20;
          const diffLabY = (O.sy + diffTip.sy) / 2 - (ddx / dlen) * 20;
          const fracA = reveal.drawA ? (reveal.drawNegB ? 1 : drawProgress) : 0;
          const fracNegB = reveal.drawNegB ? (reveal.drawDiff ? 1 : drawProgress) : 0;
          const fracDiff = reveal.drawDiff ? drawProgress : 0;
          return (
            <>
              {reveal.showB && (
                <>
                  <Arrow x1={aTip.sx} y1={aTip.sy} x2={bGhost.sx} y2={bGhost.sy} color="var(--muted)" width={2.6} dashed opacity={0.55} />
                  <text x={(aTip.sx + bGhost.sx) / 2 + 8} y={(aTip.sy + bGhost.sy) / 2 - 8} className="vec-name" fill="var(--muted)" opacity={0.7}>
                    b
                  </text>
                </>
              )}
              <Arrow x1={O.sx} y1={O.sy} x2={aTip.sx} y2={aTip.sy} color="var(--cosine)" fraction={fracA} />
              <Arrow x1={aTip.sx} y1={aTip.sy} x2={diffTip.sx} y2={diffTip.sy} color="var(--teal)" fraction={fracNegB} />
              {fracDiff > 0 && (
                <Arrow x1={O.sx} y1={O.sy} x2={diffTip.sx} y2={diffTip.sy} color="var(--primary)" width={4.6} fraction={fracDiff} />
              )}
              {fracA > 0.98 && (
                <text x={(O.sx + aTip.sx) / 2 - 6} y={(O.sy + aTip.sy) / 2 + 20} className="vec-name" fill="var(--cosine)">
                  a
                </text>
              )}
              {fracNegB > 0.98 && (
                <text x={(aTip.sx + diffTip.sx) / 2 + 12} y={(aTip.sy + diffTip.sy) / 2} className="vec-name" fill="var(--teal)" textAnchor="middle">
                  -b
                </text>
              )}
              {fracDiff > 0.98 && (
                <text x={diffLabX} y={diffLabY} className="vec-name" fill="var(--primary)" textAnchor="middle">
                  a - b
                </text>
              )}
            </>
          );
        })()}

      <circle cx={plane.center} cy={plane.center} r="4.5" className="origin-dot" />
    </svg>
  );
}
