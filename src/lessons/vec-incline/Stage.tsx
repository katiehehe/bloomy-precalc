import type { ReactNode } from "react";
import Tex from "../../components/Tex";
import VectorPlane, { type VecArrow, type VectorSpec } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

/** World half-range of the plane. Plot targets and heads must stay inside this. */
const HALF = 6;

/**
 * Force magnitudes are drawn at this many world units per unit of force, so a
 * weight of W = 10 reads as a length 3.4 arrow. Chosen so every arrowhead and the
 * ramp stay on the plane for alpha in [15, 90] and W in [4, 12].
 */
const SCALE = 0.34;

/** Fixed toe of the ramp (where the incline meets the ground). The ramp pivots here. */
const TOE_X = -4.6;
const TOE_Y = -2.8;
/** Length of the ramp surface (the hypotenuse) that we draw, in world units. */
const RAMP_L = 7.5;
/** How far up the surface the block sits, in world units. */
const BLOCK_D = 4.875;
const BLOCK_W = 1.0;
const BLOCK_H = 0.62;

/** The 3-4-5 ramp angle: sin = 3/5, cos = 4/5, about 36.87 degrees. */
const ALPHA_345 = (Math.atan2(3, 4) * 180) / Math.PI;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to at most two decimals, never render a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** A screen-space arc between two standard-position angles (y grows downward). */
function arcPath(cx: number, cy: number, fromDeg: number, toDeg: number, r: number) {
  const span = toDeg - fromDeg;
  if (Math.abs(span) < 0.6) return "";
  const steps = Math.max(2, Math.min(200, Math.ceil(Math.abs(span) / 2.5)));
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const deg = fromDeg + (span * i) / steps;
    const A = (deg * Math.PI) / 180;
    const x = cx + Math.cos(A) * r;
    const y = cy - Math.sin(A) * r;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d.trim();
}

export default function VecInclineStage(props: LessonFigureProps) {
  const { reveal, values, setValue } = props;
  const { ramp, weight, along, normal, rect, angleBase, angleBlock, dock } = reveal;

  const alphaDeg = clamp(values.alpha ?? ALPHA_345, 0, 90);
  const W = clamp(values.w ?? 10, 0, 14);
  const a = (alphaDeg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);

  // Ramp axes. Up the slope is (cos, sin); the outward normal (away from the
  // surface, where the block sits) is (-sin, cos); down the slope and into the
  // surface are the negatives that the weight actually resolves onto.
  const uUpX = c;
  const uUpY = s;
  const uDownX = -c;
  const uDownY = -s;
  const nOutX = -s;
  const nOutY = c;
  const nInX = s;
  const nInY = -c;

  // Ramp triangle: toe, top, and the bottom-right corner under the top.
  const topX = TOE_X + RAMP_L * uUpX;
  const topY = TOE_Y + RAMP_L * uUpY;
  const brX = topX;
  const brY = TOE_Y;

  // Contact point on the surface and the block's centre just above it.
  const contactX = TOE_X + BLOCK_D * uUpX;
  const contactY = TOE_Y + BLOCK_D * uUpY;
  const BcX = contactX + (BLOCK_H / 2) * nOutX;
  const BcY = contactY + (BLOCK_H / 2) * nOutY;

  // Force vectors (world coords), all anchored at the block centre.
  const wLen = W * SCALE;
  const alongMag = W * s;
  const normalMag = W * c;
  const wHeadX = BcX;
  const wHeadY = BcY - wLen;
  const alongHeadX = BcX + alongMag * SCALE * uDownX;
  const alongHeadY = BcY + alongMag * SCALE * uDownY;
  const normalHeadX = BcX + normalMag * SCALE * nInX;
  const normalHeadY = BcY + normalMag * SCALE * nInY;

  const alphaR = Math.round(alphaDeg);
  const wR = Math.round(W);
  const along2 = trim(alongMag);
  const normal2 = trim(normalMag);

  const arrows: VecArrow[] = [];
  if (along)
    arrows.push({ x1: BcX, y1: BcY, x2: alongHeadX, y2: alongHeadY, tone: "b", width: 3.6, label: "W sin \u03b1" });
  if (normal)
    arrows.push({ x1: BcX, y1: BcY, x2: normalHeadX, y2: normalHeadY, tone: "a", width: 3.6, label: "W cos \u03b1" });
  if (weight) arrows.push({ x1: BcX, y1: BcY, x2: wHeadX, y2: wHeadY, tone: "primary", width: 4.2, label: "W" });

  let aria = `A block resting on a ramp tilted about ${alphaR} degrees above the horizontal.`;
  if (weight) aria += ` The weight W = ${wR} is an arrow straight down from the block.`;
  if (along || normal)
    aria += ` It resolves into an along-incline part W sin alpha = ${along2} down the slope and a perpendicular part W cos alpha = ${normal2} into the surface, the normal force N.`;

  const spec: VectorSpec = {
    aria,
    arrows,
    angle: angleBase
      ? { fromDeg: 0, toDeg: alphaDeg, cx: TOE_X, cy: TOE_Y, label: "\u03b1", tone: "accent", radius: 34 }
      : undefined,
    underlay: ramp
      ? (plane) => {
          const gx1 = plane.sx(-HALF + 0.2);
          const gx2 = plane.sx(HALF - 0.2);
          const gy = plane.sy(TOE_Y);
          const tri = `${plane.sx(TOE_X)},${plane.sy(TOE_Y)} ${plane.sx(topX)},${plane.sy(topY)} ${plane.sx(brX)},${plane.sy(brY)}`;
          const hw = BLOCK_W / 2;
          const hh = BLOCK_H / 2;
          const corner = (fx: number, fy: number) => `${plane.sx(fx)},${plane.sy(fy)}`;
          const block = [
            corner(BcX + hw * uUpX + hh * nOutX, BcY + hw * uUpY + hh * nOutY),
            corner(BcX - hw * uUpX + hh * nOutX, BcY - hw * uUpY + hh * nOutY),
            corner(BcX - hw * uUpX - hh * nOutX, BcY - hw * uUpY - hh * nOutY),
            corner(BcX + hw * uUpX - hh * nOutX, BcY + hw * uUpY - hh * nOutY),
          ].join(" ");
          return (
            <g>
              <line x1={gx1} y1={gy} x2={gx2} y2={gy} stroke="var(--muted)" strokeWidth={2} strokeLinecap="round" />
              <polygon points={tri} fill="var(--line)" fillOpacity={0.7} />
              <line
                x1={plane.sx(TOE_X)}
                y1={plane.sy(TOE_Y)}
                x2={plane.sx(topX)}
                y2={plane.sy(topY)}
                stroke="var(--muted)"
                strokeWidth={3}
                strokeLinecap="round"
              />
              <polygon
                points={block}
                fill="var(--primary)"
                fillOpacity={0.14}
                stroke="var(--primary)"
                strokeOpacity={0.5}
                strokeWidth={1.5}
                strokeLinejoin="round"
              />
            </g>
          );
        }
      : undefined,
    overlay: (plane) => {
      const els: ReactNode[] = [];
      if (rect) {
        els.push(
          <line
            key="rc1"
            x1={plane.sx(alongHeadX)}
            y1={plane.sy(alongHeadY)}
            x2={plane.sx(wHeadX)}
            y2={plane.sy(wHeadY)}
            stroke="var(--muted)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />,
          <line
            key="rc2"
            x1={plane.sx(normalHeadX)}
            y1={plane.sy(normalHeadY)}
            x2={plane.sx(wHeadX)}
            y2={plane.sy(wHeadY)}
            stroke="var(--muted)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />,
        );
        if (!angleBlock) {
          const m = 0.34;
          const p1 = `${plane.sx(BcX + m * uDownX)},${plane.sy(BcY + m * uDownY)}`;
          const pc = `${plane.sx(BcX + m * (uDownX + nInX))},${plane.sy(BcY + m * (uDownY + nInY))}`;
          const p2 = `${plane.sx(BcX + m * nInX)},${plane.sy(BcY + m * nInY)}`;
          els.push(
            <polyline key="ra" points={`${p1} ${pc} ${p2}`} fill="none" stroke="var(--muted)" strokeWidth={1.6} />,
          );
        }
      }
      if (angleBlock) {
        const toDeg = (Math.atan2(-c, s) * 180) / Math.PI;
        const r = 26;
        const mid = (-90 + toDeg) / 2;
        els.push(
          <path
            key="ba"
            d={arcPath(plane.sx(BcX), plane.sy(BcY), -90, toDeg, r)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2.4}
            strokeLinecap="round"
          />,
          <text
            key="bl"
            x={plane.sx(BcX) + Math.cos((mid * Math.PI) / 180) * (r + 14)}
            y={plane.sy(BcY) - Math.sin((mid * Math.PI) / 180) * (r + 14) + 4}
            className="angle-glyph-label"
            textAnchor="middle"
            fill="var(--accent)"
          >
            {"\u03b1"}
          </text>,
        );
      }
      return <g>{els}</g>;
    },
  };

  const showDock = Boolean(dock);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={(wx, wy) => {
              const deg = clamp(Math.round((Math.atan2(wy - TOE_Y, wx - TOE_X) * 180) / Math.PI), 15, 90);
              setValue("alpha", () => deg);
            }}
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{`\\alpha \\approx ${alphaR}^\\circ, \\quad W = ${wR}`}</Tex>
              <Tex>{`\\sin\\alpha = ${trim(s)}, \\quad \\cos\\alpha = ${trim(c)}`}</Tex>
              {along && <Tex>{`\\underbrace{W\\sin\\alpha}_{\\text{along-incline}} = ${along2}`}</Tex>}
              {normal && <Tex>{`\\underbrace{W\\cos\\alpha}_{\\text{normal } N} = ${normal2}`}</Tex>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
