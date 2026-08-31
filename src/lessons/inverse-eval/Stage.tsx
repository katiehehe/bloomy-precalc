import { motion, useReducedMotion } from "motion/react";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import FigureReadout from "../../components/FigureReadout";
import Tex from "../../components/Tex";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

// ---- Ranges slide: each inverse function mapped to its own range on a circle.

type RangeSpec = {
  /** Reveal flag that shows this row (undefined means always shown). */
  show?: string;
  /** Function name, in KaTeX. */
  fn: string;
  /** Which half of the circle the range covers. */
  half: "right" | "top";
  /** Open endpoints (arctan) draw hollow dots and round brackets. */
  open: boolean;
  /** Accent color for the arc, wedge, and endpoints. */
  color: string;
  /** Interval notation, in KaTeX. */
  interval: string;
  /** The two quadrants the range lives in. */
  quad: string;
  /** Endpoint labels drawn on the circle, angle in degrees plus a KaTeX-free glyph. */
  ends: { deg: number; label: string }[];
};

const RANGE_SPECS: RangeSpec[] = [
  {
    fn: "\\arcsin x",
    half: "right",
    open: false,
    color: "var(--teal)",
    interval: "\\left[-\\tfrac{\\pi}{2},\\ \\tfrac{\\pi}{2}\\right]",
    quad: "quadrants IV and I",
    ends: [
      { deg: 90, label: "\u03c0/2" },
      { deg: -90, label: "\u2212\u03c0/2" },
    ],
  },
  {
    show: "s1",
    fn: "\\arccos x",
    half: "top",
    open: false,
    color: "var(--primary)",
    interval: "\\left[0,\\ \\pi\\right]",
    quad: "quadrants I and II",
    ends: [
      { deg: 0, label: "0" },
      { deg: 180, label: "\u03c0" },
    ],
  },
  {
    show: "s2",
    fn: "\\arctan x",
    half: "right",
    open: true,
    color: "oklch(0.56 0.16 300)",
    interval: "\\left(-\\tfrac{\\pi}{2},\\ \\tfrac{\\pi}{2}\\right)",
    quad: "quadrants IV and I",
    ends: [
      { deg: 90, label: "\u03c0/2" },
      { deg: -90, label: "\u2212\u03c0/2" },
    ],
  },
];

const GS = 132;
const GC = GS / 2;
const GR = 46;
const gp = (deg: number, r: number) => {
  const a = toRadians(deg);
  return { x: GC + r * Math.cos(a), y: GC - r * Math.sin(a) };
};

/** A small unit circle with one half highlighted as an inverse function's range. */
function RangeGlyph({ spec }: { spec: RangeSpec }) {
  const right = spec.half === "right";
  // Endpoints and the arc between them, drawn along the highlighted half.
  const p1 = right ? gp(90, GR) : gp(0, GR);
  const p2 = right ? gp(-90, GR) : gp(180, GR);
  const sweep = right ? 1 : 0;
  const arc = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${GR} ${GR} 0 0 ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  const wedge = `M ${GC} ${GC} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${GR} ${GR} 0 0 ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
  const fill = `color-mix(in oklch, ${spec.color} 15%, transparent)`;

  return (
    <svg className="inv-range-glyph" viewBox={`0 0 ${GS} ${GS}`} role="img" aria-label={`Unit circle with the ${right ? "right" : "top"} half highlighted`}>
      <line x1={10} y1={GC} x2={GS - 10} y2={GC} className="axis" />
      <line x1={GC} y1={10} x2={GC} y2={GS - 10} className="axis" />
      <path d={wedge} fill={fill} stroke="none" />
      <circle cx={GC} cy={GC} r={GR} className="circle-line" />
      <path d={arc} fill="none" stroke={spec.color} strokeWidth={5.5} strokeLinecap="round" />
      {spec.ends.map((e) => {
        const p = gp(e.deg, GR);
        const lab = gp(e.deg, GR + 15);
        return (
          <g key={e.deg}>
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill={spec.open ? "var(--surface)" : spec.color}
              stroke={spec.color}
              strokeWidth={2.4}
            />
            <text x={lab.x} y={lab.y + 4} textAnchor="middle" className="inv-range-end">
              {e.label}
            </text>
          </g>
        );
      })}
      <circle cx={GC} cy={GC} r={3} className="origin-dot" />
    </svg>
  );
}

function InverseRangeMap({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  const reduce = useReducedMotion();
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <div className="inv-range-map">
            <p className="inv-range-title">each inverse function keeps its own output range</p>
            {RANGE_SPECS.map((spec) => {
              const shown = !spec.show || Boolean(reveal[spec.show]);
              return (
                <motion.div
                  key={spec.fn}
                  className="inv-range-row"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 10 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden={shown ? undefined : true}
                >
                  <div className="inv-range-fn" style={{ color: spec.color }}>
                    <Tex>{spec.fn}</Tex>
                  </div>
                  <span className="inv-range-arrow" style={{ color: spec.color }} aria-hidden="true">
                    &rarr;
                  </span>
                  <RangeGlyph spec={spec} />
                  <div className="inv-range-side">
                    <div className="inv-range-interval">
                      <Tex>{spec.interval}</Tex>
                    </div>
                    <div className="inv-range-quad">{spec.quad}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const ARCSIN: FlowStep[] = [
  { id: "a0", tex: "\\arcsin\\tfrac12" },
  { id: "a1", show: "s1", op: "\\text{ask: which angle has this sine?}", tex: "\\sin\\theta = \\tfrac12,\\quad \\theta \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]" },
  { id: "a2", show: "s2", op: "\\text{two angles fit } \\sin\\theta=\\tfrac12", tex: "\\theta = 30^\\circ \\ \\text{ or } \\ 150^\\circ" },
  { id: "a3", show: "s3", tone: "cancel", op: "150^\\circ \\text{ is outside the range}", tex: "\\theta = 30^\\circ \\ \\text{ or } \\ \\cancel{150^\\circ}" },
  { id: "a4", show: "s4", tone: "good", result: true, op: "\\text{keep the one in range}", tex: "\\arcsin\\tfrac12 = \\dfrac{\\pi}{6}" },
];

const ARCCOS: FlowStep[] = [
  { id: "c0", tex: "\\arccos\\!\\left(-\\tfrac12\\right)" },
  { id: "c1", show: "s1", op: "\\text{which angle has this cosine?}", tex: "\\cos\\theta = -\\tfrac12,\\quad \\theta \\in [0, \\pi]" },
  { id: "c2", show: "s2", op: "\\cos<0 \\text{ puts } \\theta \\text{ in quadrant II}", tex: "\\theta = 120^\\circ" },
  { id: "c3", show: "s3", tone: "good", result: true, op: "\\text{write it in radians}", tex: "\\arccos\\!\\left(-\\tfrac12\\right) = \\dfrac{2\\pi}{3}" },
];

function viewFor(mode: string): { steps: FlowStep[]; heading: string } {
  if (mode === "arccos") {
    return { steps: ARCCOS, heading: "\\arccos \\text{ lives in the top half}" };
  }
  return { steps: ARCSIN, heading: "\\arcsin\\tfrac12 = \\text{ the angle in the right half}" };
}

export default function InverseEvalStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "ranges";

  if (mode === "ranges") {
    return <InverseRangeMap reveal={reveal} />;
  }

  // Interactive: the circle with its shaded range is the figure; a compact
  // readout lists the sine and whether the current angle sits in the band.
  if (mode === "practice") {
    const deg = Math.round(values.theta ?? 150);
    const inBand = deg >= -90 && deg <= 90;
    const s = Math.sin(toRadians(deg));
    const angles: CircleAngle[] = [{ deg, label: `${deg}\u00b0`, tone: inBand ? "sum" : "b" }];
    const lines: string[] = [];
    if (reveal.s1) lines.push(`\\sin ${deg}^\\circ = ${s.toFixed(2)}`);
    if (reveal.s2)
      lines.push(
        inBand
          ? "\\theta \\in \\left[-90^\\circ, 90^\\circ\\right]\\ \\checkmark"
          : "\\theta \\ \\text{outside} \\left[-90^\\circ, 90^\\circ\\right]",
      );
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<AngleCircle angles={angles} arcRange={{ from: -90, to: 90, tone: "sum" }} focus={deg} />}
              heading={"\\text{evaluate } \\arcsin\\tfrac12 \\text{ on the circle}"}
              lines={lines}
            />
          </div>
        </div>
      </section>
    );
  }

  // Derivation slides: algebra only, current line in focus.
  const { steps, heading } = viewFor(mode);
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} focus />
        </div>
      </div>
    </section>
  );
}
