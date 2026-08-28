import { motion } from "motion/react";
import { type PointerEvent, useEffect, useRef } from "react";
import {
  angleArcPath,
  arcArrowPath,
  arcEndAngle,
  formatValue,
  normalizeDegrees,
  quadrantOf,
  quadrantWedgePath,
  signedDegrees,
  toRadians,
} from "../lib/trig";

export type FigureMode = "angle" | "coords" | "identity" | "triangle" | "wave";

export type Overlays = {
  angleArc: boolean;
  angleLabel: boolean;
  sideLabels: boolean;
  coords: boolean;
  legs: boolean;
  wedge: boolean;
  triangleLabels: boolean;
  identityBar: boolean;
  waves: boolean;
};

const SIZE = 460;
const CENTER = SIZE / 2;
const RADIUS = 152;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Props = {
  angle: number;
  /** Clamp dragging to the first quadrant (0°–90°), for the right-triangle slide. */
  restricted: boolean;
  overlays: Overlays;
  interactive: boolean;
  /** 0–1. The perpendicular drops from P first, then the adjacent leg grows from the origin. */
  legProgress?: number;
  onAngle: (updater: (current: number) => number) => void;
};

export default function UnitCircleFigure({
  angle,
  restricted,
  overlays,
  interactive,
  legProgress = 1,
  onAngle,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lastRaw = useRef<number | null>(null);

  const theta = toRadians(angle);
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const pointX = CENTER + cos * RADIUS;
  const pointY = CENTER - sin * RADIUS;

  useEffect(() => {
    lastRaw.current = null;
  }, [restricted, interactive]);

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * SIZE;
    const py = ((event.clientY - rect.top) / rect.height) * SIZE;
    if (Math.hypot(px - CENTER, py - CENTER) < 14) return;

    let raw = (Math.atan2(CENTER - py, px - CENTER) * 180) / Math.PI;

    if (restricted) {
      raw = clamp(raw, 0, 90);
      onAngle(() => raw);
      lastRaw.current = raw;
      return;
    }

    const reference = lastRaw.current;
    lastRaw.current = raw;
    if (reference === null) {
      onAngle((current) => current + (((raw - signedDegrees(current) + 540) % 360) - 180));
      return;
    }
    onAngle((current) => current + (((raw - reference + 540) % 360) - 180));
  };

  // The arc stops short of the terminal side, so the arrowhead reads as a
  // direction cue instead of crossing the ray.
  // Sit the θ label just outside the angle arc, on the bisector of the
  // actual swept angle, so it reads as a name for that opening.
  const arcTip = arcEndAngle(angle);
  const arcRadius = 46;
  const halfAngle = Math.abs(angle) < 12 ? Math.sign(angle || 1) * 14 : angle / 2;
  const halfRad = toRadians(halfAngle);
  const arcAtLabel = arcRadius + Math.min(Math.abs(halfAngle) / 360, 4) * 10;
  const labelRadius = arcAtLabel + 20;
  const angleText = `θ = ${Math.round(angle)}°`;
  const labelWidth = angleText.length * 6.4 + 12;
  const labelX = clamp(
    CENTER + Math.cos(halfRad) * labelRadius,
    labelWidth / 2 + 10,
    SIZE - labelWidth / 2 - 10,
  );
  const labelY = clamp(CENTER - Math.sin(halfRad) * labelRadius, 16, SIZE - 16);

  const quadrant = quadrantOf(angle);
  const quadrantMid = toRadians(Math.floor(normalizeDegrees(angle) / 90) * 90 + 45);

  const coordText = `(${formatValue(cos)}, ${formatValue(sin)})`;
  const coordWidth = coordText.length * 6.1 + 10;
  const coordX = clamp(CENTER + cos * (RADIUS + 36), 54, SIZE - 54);
  const coordY = clamp(CENTER - sin * (RADIUS + 28), 18, SIZE - 14);

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Unit circle with the terminal side at ${Math.round(angle)} degrees.`}
      onPointerDown={(event) => {
        if (!interactive) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
      onPointerMove={applyPointer}
      onPointerUp={() => {
        lastRaw.current = null;
      }}
      onPointerLeave={() => {
        lastRaw.current = null;
      }}
    >
      {overlays.wedge && (
        <>
          <path d={quadrantWedgePath(angle, CENTER, RADIUS)} className="wedge" />
          {quadrant !== "on an axis" && (
            <text
              className="wedge-label"
              x={CENTER + Math.cos(quadrantMid) * RADIUS * 0.6}
              y={CENTER - Math.sin(quadrantMid) * RADIUS * 0.6}
              textAnchor="middle"
            >
              {quadrant}
            </text>
          )}
        </>
      )}

      <line x1="24" y1={CENTER} x2={SIZE - 24} y2={CENTER} className="axis" />
      <line x1={CENTER} y1="24" x2={CENTER} y2={SIZE - 24} className="axis" />
      <text x={SIZE - 28} y={CENTER + 17} className="axis-label">x</text>
      <text x={CENTER + 9} y="28" className="axis-label">y</text>

      <circle cx={CENTER} cy={CENTER} r={RADIUS} className="circle-line" />
      <line x1={CENTER} y1={CENTER} x2={CENTER + RADIUS} y2={CENTER} className="initial-side" />

      {overlays.angleArc && (
        <>
          <path d={angleArcPath(arcTip, CENTER, 46)} className="angle-arc" />
          <path d={arcArrowPath(arcTip, CENTER, 46)} className="angle-arc-head" />
        </>
      )}

      {overlays.legs && clamp(legProgress / 0.55, 0, 1) > 0.02 && (
        <line
          x1={pointX}
          y1={pointY}
          x2={pointX}
          y2={pointY + (CENTER - pointY) * clamp(legProgress / 0.55, 0, 1)}
          className="leg-sin"
        />
      )}
      {overlays.legs && clamp((legProgress - 0.55) / 0.45, 0, 1) > 0.02 && (
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER + (pointX - CENTER) * clamp((legProgress - 0.55) / 0.45, 0, 1)}
          y2={CENTER}
          className="leg-cos"
        />
      )}

      <motion.line
        x1={CENTER}
        y1={CENTER}
        animate={{ x2: pointX, y2: pointY }}
        transition={{ duration: 0.05, ease: "linear" }}
        className="terminal-side"
      />

      {overlays.sideLabels && (
        <>
          <text x={CENTER + RADIUS * 0.46} y={CENTER + 21} className="side-label">
            initial side
          </text>
          <text
            x={clamp(CENTER + Math.cos(theta) * (RADIUS + 34), 58, SIZE - 58)}
            y={clamp(CENTER - Math.sin(theta) * (RADIUS + 34), 20, SIZE - 14)}
            className="side-label"
            textAnchor="middle"
          >
            terminal side
          </text>
        </>
      )}

      {overlays.triangleLabels && legProgress > 0.97 && (
        <>
          <text x={(CENTER + pointX) / 2} y={CENTER + 23} className="label-cos" textAnchor="middle">
            cos θ
          </text>
          <text x={pointX + 32} y={(CENTER + pointY) / 2} className="label-sin" textAnchor="middle">
            sin θ
          </text>
          <text
            x={(CENTER + pointX) / 2 - 20}
            y={(CENTER + pointY) / 2 - 12}
            className="label-hyp"
            textAnchor="middle"
          >
            1
          </text>
          <path
            d={`M${pointX - 15} ${CENTER} L${pointX - 15} ${CENTER - 15} L${pointX} ${CENTER - 15}`}
            className="right-angle"
          />
        </>
      )}

      {overlays.angleLabel && (
        <g transform={`translate(${labelX}, ${labelY})`} className="angle-label">
          <rect x={-labelWidth / 2} y={-9} width={labelWidth} height={18} rx={5} />
          <text textAnchor="middle" y={4}>
            {angleText}
          </text>
        </g>
      )}

      <circle cx={CENTER} cy={CENTER} r="4.5" className="origin-dot" />
      <motion.circle
        animate={{ cx: pointX, cy: pointY }}
        transition={{ duration: 0.05, ease: "linear" }}
        r="8.5"
        className="point-dot"
      />

      {overlays.coords && (
        <g className="point-label" transform={`translate(${coordX}, ${coordY})`}>
          <rect x={-coordWidth / 2} y={-9} width={coordWidth} height={18} rx={5} />
          <text textAnchor="middle" y={4}>
            {coordText}
          </text>
        </g>
      )}
    </svg>
  );
}
