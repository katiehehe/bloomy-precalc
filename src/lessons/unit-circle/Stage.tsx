import { motion } from "motion/react";
import UnitCircleFigure, { type Overlays } from "../../components/UnitCircleFigure";
import WaveGraphs from "../../components/WaveGraphs";
import FigureReadout from "../../components/FigureReadout";
import { formatValue, quadrantOf, toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

/** The first-quadrant special angles and their exact coordinates. */
const SPECIAL = [
  { deg: 0, cosText: "1", sinText: "0", coord: "(1, 0)" },
  { deg: 30, cosText: "\\dfrac{\\sqrt3}{2}", sinText: "\\dfrac12", coord: "(\u221a3/2, 1/2)" },
  { deg: 45, cosText: "\\dfrac{\\sqrt2}{2}", sinText: "\\dfrac{\\sqrt2}{2}", coord: "(\u221a2/2, \u221a2/2)" },
  { deg: 60, cosText: "\\dfrac12", sinText: "\\dfrac{\\sqrt3}{2}", coord: "(1/2, \u221a3/2)" },
  { deg: 90, cosText: "0", sinText: "1", coord: "(0, 1)" },
];

/**
 * A first-quadrant unit circle marking the five special angles, with the current
 * one highlighted: its terminal side is drawn and dashed legs drop to each axis,
 * so the point reads as (cos, sin). Exact values live in the readout beneath.
 */
function SpecialAngles({ index }: { index: number }) {
  const O = { x: 40, y: 172 };
  const R = 130;
  const pos = (deg: number) => ({
    x: O.x + R * Math.cos((deg * Math.PI) / 180),
    y: O.y - R * Math.sin((deg * Math.PI) / 180),
  });
  const cur = SPECIAL[index];
  const P = pos(cur.deg);
  return (
    <svg
      className="figure"
      viewBox="0 0 220 210"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Unit circle showing the special angle ${cur.deg} degrees at ${cur.coord}`}
    >
      <line x1={O.x} y1={O.y} x2={O.x + R + 20} y2={O.y} className="axis" />
      <line x1={O.x} y1={O.y} x2={O.x} y2={O.y - R - 20} className="axis" />
      <text x={O.x + R + 15} y={O.y + 15} className="axis-label">
        x
      </text>
      <text x={O.x - 13} y={O.y - R - 10} className="axis-label">
        y
      </text>
      <path d={`M ${O.x + R} ${O.y} A ${R} ${R} 0 0 0 ${O.x} ${O.y - R}`} className="circle-line" fill="none" />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} className="terminal-side" />
      <line x1={P.x} y1={P.y} x2={P.x} y2={O.y} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="3 3" />
      <line x1={P.x} y1={P.y} x2={O.x} y2={P.y} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="3 3" />
      {SPECIAL.map((s, i) => {
        const p = pos(s.deg);
        const lx = O.x + (R + 15) * Math.cos((s.deg * Math.PI) / 180);
        const ly = O.y - (R + 15) * Math.sin((s.deg * Math.PI) / 180);
        return (
          <g key={s.deg}>
            <circle cx={p.x} cy={p.y} r={i === index ? 6 : 3} fill={i === index ? "var(--primary)" : "var(--muted)"} />
            <text x={lx} y={ly + 4} textAnchor="middle" className="tick-label">
              {s.deg}
              {"\u00b0"}
            </text>
          </g>
        );
      })}
      <circle cx={O.x} cy={O.y} r={3.5} fill="var(--ink)" />
    </svg>
  );
}

export default function UnitCircleStage({
  value: angle,
  slide,
  reveal,
  drawProgress,
  interactive,
  onValue,
}: LessonFigureProps) {
  if (slide.mode === "special") {
    const idx = Math.max(0, Math.min(SPECIAL.length - 1, Math.round(angle)));
    const s = SPECIAL[idx];
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<SpecialAngles index={idx} />}
              heading={`\\theta = ${s.deg}^\\circ`}
              lines={[`\\cos ${s.deg}^\\circ = ${s.cosText}`, `\\sin ${s.deg}^\\circ = ${s.sinText}`]}
              note={`on the unit circle this point is ${s.coord}`}
            />
          </div>
        </div>
      </section>
    );
  }

  const sin = Math.sin(toRadians(angle));
  const cos = Math.cos(toRadians(angle));
  // The reveal bag is a superset of Overlays for this lesson (see slides.ts base).
  const overlays = reveal as Overlays;
  const showReadout = overlays.coords || overlays.triangleLabels;
  const showIdentity = overlays.identityBar;
  const showWaves = overlays.waves;
  const hasDock = showReadout || showIdentity || showWaves;

  return (
    <section className={`figure-area${hasDock ? " has-dock" : ""}${showWaves ? " has-waves" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <UnitCircleFigure
            angle={angle}
            restricted={slide.mode === "triangle"}
            overlays={overlays}
            legProgress={drawProgress}
            interactive={interactive}
            onAngle={onValue}
          />
        </div>
        {hasDock && (
          <div className="figure-dock">
            {showReadout && (
              <dl className="values">
                <div>
                  <dt>cos θ = x</dt>
                  <dd className="value-cos">{formatValue(cos)}</dd>
                </div>
                <div>
                  <dt>sin θ = y</dt>
                  <dd className="value-sin">{formatValue(sin)}</dd>
                </div>
                <div>
                  <dt>{overlays.triangleLabels ? "hypotenuse" : "quadrant"}</dt>
                  <dd>{overlays.triangleLabels ? "1" : quadrantOf(angle)}</dd>
                </div>
              </dl>
            )}
            {showIdentity && (
              <div className="identity">
                <div className="identity__bar">
                  <motion.span
                    className="identity__cos"
                    animate={{ flexGrow: Math.max(cos ** 2, 0.001) }}
                    transition={{ duration: 0.08 }}
                  />
                  <motion.span
                    className="identity__sin"
                    animate={{ flexGrow: Math.max(sin ** 2, 0.001) }}
                    transition={{ duration: 0.08 }}
                  />
                </div>
                <p>
                  <span className="value-cos">cos²θ = {formatValue(cos ** 2)}</span>
                  <span className="value-sin">sin²θ = {formatValue(sin ** 2)}</span>
                  <strong>sum = {formatValue(cos ** 2 + sin ** 2)}</strong>
                </p>
              </div>
            )}
            {showWaves && <WaveGraphs angle={angle} />}
          </div>
        )}
      </div>
    </section>
  );
}
