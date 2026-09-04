import { type PointerEvent, type ReactNode, useRef } from "react";
import Tex from "../../components/Tex";
import { clientToSvgPoint } from "../../lib/svg";
import type { LessonFigureProps } from "../types";

/** Fixed toe of the ramp (where the incline meets the ground), in user px. */
const TOE_X = 80;
const TOE_Y = 420;
/** Drawn length of the ramp surface. The viewBox then crops to the sketch. */
const RAMP_L = 400;
/** How far up the surface the block sits. */
const BLOCK_D = 232;
const BLOCK_W = 72;
const BLOCK_H = 48;
/** Pixels of arrow per unit of weight, so W = 10 reads as a 140 px shaft. */
const FORCE = 14;

/** ViewBox that hugs the sketch. Extra height lets slice fill a square slot. */
function fitViewBox(pts: { x: number; y: number }[], pad = 32) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const cw = Math.max(160, maxX - minX);
  const ch = Math.max(160, maxY - minY);
  const w = cw + pad * 2;
  const h = Math.max(ch + pad * 2, w * 0.9);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 3.6,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return null;
  const angle = Math.atan2(dy, dx);
  const size = Math.min(13, len * 0.9);
  const spread = 0.42;
  const tipX = x1 + Math.cos(angle) * len;
  const tipY = y1 + Math.sin(angle) * len;
  const left = [tipX - size * Math.cos(angle - spread), tipY - size * Math.sin(angle - spread)];
  const right = [tipX - size * Math.cos(angle + spread), tipY - size * Math.sin(angle + spread)];
  const base = [tipX - size * 0.82 * Math.cos(angle), tipY - size * 0.82 * Math.sin(angle)];
  return (
    <g>
      <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path d={`M${tipX} ${tipY} L${left[0]} ${left[1]} L${right[0]} ${right[1]} Z`} fill={color} />
    </g>
  );
}

function labelPos(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dlen = Math.hypot(dx, dy) || 1;
  return {
    x: x2 + (dx / dlen) * 18,
    y: y2 + (dy / dlen) * 18 - 2,
  };
}

export default function VecInclineStage(props: LessonFigureProps) {
  const { reveal, values, setValue, interactive } = props;
  const { ramp, weight, along, normal, rect, angleBase, angleBlock, dock } = reveal;
  const svgRef = useRef<SVGSVGElement>(null);

  const alphaDeg = clamp(values.alpha ?? ALPHA_345, 0, 90);
  const W = clamp(values.w ?? 10, 0, 14);
  const a = (alphaDeg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);

  // SVG axes: x right, y down. World (x, y) maps to (x, -y).
  const uUpX = c;
  const uUpY = -s;
  const uDownX = -c;
  const uDownY = s;
  const nOutX = -s;
  const nOutY = -c;
  const nInX = s;
  const nInY = c;

  const topX = TOE_X + RAMP_L * uUpX;
  const topY = TOE_Y + RAMP_L * uUpY;
  const brX = topX;
  const brY = TOE_Y;

  const contactX = TOE_X + BLOCK_D * uUpX;
  const contactY = TOE_Y + BLOCK_D * uUpY;
  const BcX = contactX + (BLOCK_H / 2) * nOutX;
  const BcY = contactY + (BLOCK_H / 2) * nOutY;

  const wLen = W * FORCE;
  const alongMag = W * s;
  const normalMag = W * c;
  const wHeadX = BcX;
  const wHeadY = BcY + wLen;
  const alongHeadX = BcX + alongMag * FORCE * uDownX;
  const alongHeadY = BcY + alongMag * FORCE * uDownY;
  const normalHeadX = BcX + normalMag * FORCE * nInX;
  const normalHeadY = BcY + normalMag * FORCE * nInY;

  const alphaR = Math.round(alphaDeg);
  const wR = Math.round(W);
  const along2 = trim(alongMag);
  const normal2 = trim(normalMag);

  let aria = `A block resting on a ramp tilted about ${alphaR} degrees above the horizontal.`;
  if (weight) aria += ` The weight W = ${wR} is an arrow straight down from the block.`;
  if (along || normal)
    aria += ` It resolves into an along-incline part W sin alpha = ${along2} down the slope and a perpendicular part W cos alpha = ${normal2} into the surface, the normal force N.`;

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const { x, y } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const deg = clamp(Math.round((Math.atan2(TOE_Y - y, x - TOE_X) * 180) / Math.PI), 15, 90);
    setValue("alpha", () => deg);
  };

  const extras: ReactNode[] = [];
  if (rect) {
    extras.push(
      <line
        key="rc1"
        x1={alongHeadX}
        y1={alongHeadY}
        x2={wHeadX}
        y2={wHeadY}
        stroke="var(--muted)"
        strokeWidth={2}
        strokeDasharray="5 5"
      />,
      <line
        key="rc2"
        x1={normalHeadX}
        y1={normalHeadY}
        x2={wHeadX}
        y2={wHeadY}
        stroke="var(--muted)"
        strokeWidth={2}
        strokeDasharray="5 5"
      />,
    );
    if (!angleBlock) {
      const m = 18;
      extras.push(
        <polyline
          key="ra"
          points={`${BcX + m * uDownX},${BcY + m * uDownY} ${BcX + m * (uDownX + nInX)},${BcY + m * (uDownY + nInY)} ${BcX + m * nInX},${BcY + m * nInY}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={1.6}
        />,
      );
    }
  }
  if (angleBlock) {
    const toDeg = (Math.atan2(-c, s) * 180) / Math.PI;
    const r = 28;
    const mid = (-90 + toDeg) / 2;
    extras.push(
      <path
        key="ba"
        d={arcPath(BcX, BcY, -90, toDeg, r)}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.4}
        strokeLinecap="round"
      />,
      <text
        key="bl"
        x={BcX + Math.cos((mid * Math.PI) / 180) * (r + 14)}
        y={BcY - Math.sin((mid * Math.PI) / 180) * (r + 14) + 4}
        className="angle-glyph-label"
        textAnchor="middle"
        fill="var(--accent)"
      >
        {"\u03b1"}
      </text>,
    );
  }

  const hw = BLOCK_W / 2;
  const hh = BLOCK_H / 2;
  const blockPts = [
    `${BcX + hw * uUpX + hh * nOutX},${BcY + hw * uUpY + hh * nOutY}`,
    `${BcX - hw * uUpX + hh * nOutX},${BcY - hw * uUpY + hh * nOutY}`,
    `${BcX - hw * uUpX - hh * nOutX},${BcY - hw * uUpY - hh * nOutY}`,
    `${BcX + hw * uUpX - hh * nOutX},${BcY + hw * uUpY - hh * nOutY}`,
  ].join(" ");

  const wLabel = labelPos(BcX, BcY, wHeadX, wHeadY);
  const alongLabel = labelPos(BcX, BcY, alongHeadX, alongHeadY);
  const normalLabel = labelPos(BcX, BcY, normalHeadX, normalHeadY);

  const groundLeft = TOE_X - 18;
  const groundRight = Math.max(brX, TOE_X) + 18;
  const fitPts = [
    { x: TOE_X, y: TOE_Y },
    { x: topX, y: topY },
    { x: brX, y: brY },
    { x: BcX, y: BcY },
  ];
  if (weight) fitPts.push({ x: wHeadX, y: wHeadY }, wLabel);
  if (along) fitPts.push({ x: alongHeadX, y: alongHeadY }, alongLabel);
  if (normal) fitPts.push({ x: normalHeadX, y: normalHeadY }, normalLabel);
  if (angleBase) {
    fitPts.push({
      x: TOE_X + Math.cos(((alphaDeg / 2) * Math.PI) / 180) * 56,
      y: TOE_Y - Math.sin(((alphaDeg / 2) * Math.PI) / 180) * 56,
    });
  }
  const box = fitViewBox(fitPts);

  const showDock = Boolean(dock);

  return (
    <section className={`figure-area incline-glyph${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <svg
            ref={svgRef}
            className={`figure${interactive ? " figure--live" : ""}`}
            viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label={aria}
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
            {ramp && (
              <g>
                <line
                  x1={groundLeft}
                  y1={TOE_Y}
                  x2={groundRight}
                  y2={TOE_Y}
                  stroke="var(--muted)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                />
                <polygon points={`${TOE_X},${TOE_Y} ${topX},${topY} ${brX},${brY}`} fill="var(--line)" fillOpacity={0.7} />
                <line
                  x1={TOE_X}
                  y1={TOE_Y}
                  x2={topX}
                  y2={topY}
                  stroke="var(--muted)"
                  strokeWidth={3.4}
                  strokeLinecap="round"
                />
                <polygon
                  points={blockPts}
                  fill="var(--primary)"
                  fillOpacity={0.14}
                  stroke="var(--primary)"
                  strokeOpacity={0.5}
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                />
              </g>
            )}

            {angleBase && (
              <>
                <path
                  d={arcPath(TOE_X, TOE_Y, 0, alphaDeg, 38)}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                />
                <text
                  x={TOE_X + Math.cos(((alphaDeg / 2) * Math.PI) / 180) * 56}
                  y={TOE_Y - Math.sin(((alphaDeg / 2) * Math.PI) / 180) * 56 + 4}
                  className="angle-glyph-label"
                  textAnchor="middle"
                  fill="var(--accent)"
                >
                  {"\u03b1"}
                </text>
              </>
            )}

            {along && (
              <g>
                <Arrow x1={BcX} y1={BcY} x2={alongHeadX} y2={alongHeadY} color="var(--teal)" width={3.6} />
                <text x={alongLabel.x} y={alongLabel.y} className="vec-name" fill="var(--teal)" textAnchor="middle">
                  {"W sin \u03b1"}
                </text>
              </g>
            )}
            {normal && (
              <g>
                <Arrow x1={BcX} y1={BcY} x2={normalHeadX} y2={normalHeadY} color="var(--cosine)" width={3.6} />
                <text x={normalLabel.x} y={normalLabel.y} className="vec-name" fill="var(--cosine)" textAnchor="middle">
                  {"W cos \u03b1"}
                </text>
              </g>
            )}
            {weight && (
              <g>
                <Arrow x1={BcX} y1={BcY} x2={wHeadX} y2={wHeadY} color="var(--primary)" width={4.2} />
                <text x={wLabel.x} y={wLabel.y} className="vec-name" fill="var(--primary)" textAnchor="middle">
                  W
                </text>
              </g>
            )}

            {extras}
          </svg>
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">
          {showDock && (
            <>            <div className="formula-list">
              <Tex>{`\\alpha \\approx ${alphaR}^\\circ, \\quad W = ${wR}`}</Tex>
              <Tex>{`\\sin\\alpha = ${trim(s)}, \\quad \\cos\\alpha = ${trim(c)}`}</Tex>
              {along && <Tex>{`\\underbrace{W\\sin\\alpha}_{\\text{along-incline}} = ${along2}`}</Tex>}
              {normal && <Tex>{`\\underbrace{W\\cos\\alpha}_{\\text{normal } N} = ${normal2}`}</Tex>}
            </div>
            </>
          )}
          </div>
      </div>
    </section>
  );
}
