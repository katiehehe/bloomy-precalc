import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import FigureReadout from "../../components/FigureReadout";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const TWO_SOL: FlowStep[] = [
  { id: "t0", tex: "\\sin x = \\tfrac12 \\quad \\text{on } [0, 2\\pi)" },
  { id: "t1", show: "s1", op: "\\text{reference angle}", tex: "\\sin^{-1}\\tfrac12 = \\dfrac{\\pi}{6}" },
  { id: "t2", show: "s2", op: "\\sin>0 \\text{ in quadrants I and II}", tex: "x = \\dfrac{\\pi}{6} \\ \\text{ or } \\ \\pi - \\dfrac{\\pi}{6}" },
  { id: "t3", show: "s3", tone: "good", result: true, op: "\\text{simplify}", tex: "x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}" },
];

const GENERAL: FlowStep[] = [
  { id: "g0", tex: "x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}" },
  { id: "g1", show: "s1", op: "\\text{sine repeats every } 2\\pi", tex: "\\dots,\\ \\dfrac{\\pi}{6} \\pm 2\\pi,\\ \\dfrac{5\\pi}{6} \\pm 2\\pi,\\ \\dots" },
  { id: "g2", show: "s2", tone: "good", result: true, op: "\\text{fold into one family}", tex: "x = \\dfrac{\\pi}{6} + 2\\pi k, \\ \\dfrac{5\\pi}{6} + 2\\pi k" },
];

const SIZE = 150;
const C = SIZE / 2;
const R = 52;
const TARGET = 0.5;

/** A live unit circle: drag the angle until the terminal point sits on y = 1/2. */
function SolveCircle({ deg }: { deg: number }) {
  const a = toRadians(deg);
  const tipX = C + R * Math.cos(a);
  const tipY = C - R * Math.sin(a);
  const lineY = C - TARGET * R;
  const solved = Math.abs(Math.sin(a) - TARGET) < 0.03;
  const color = solved ? "var(--teal)" : "var(--primary)";
  return (
    <svg className="flow-gauge flow-gauge--wide flow-gauge--circle figure-plot" viewBox={`0 0 ${SIZE} ${SIZE}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Unit circle with the angle at ${Math.round(deg)} degrees`}>
      <line x1={C - R - 8} y1={C} x2={C + R + 8} y2={C} stroke="var(--line)" strokeWidth={1} />
      <line x1={C} y1={C - R - 8} x2={C} y2={C + R + 8} stroke="var(--line)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth={1.4} />
      <line x1={C - R - 6} y1={lineY} x2={C + R + 6} y2={lineY} stroke="var(--teal)" strokeWidth={1.6} strokeDasharray="4 4" />
      <text x={C + R + 2} y={lineY - 4} className="angle-glyph-label" textAnchor="end" fill="var(--teal)">
        y = 1/2
      </text>
      <line x1={tipX} y1={tipY} x2={tipX} y2={C} stroke={color} strokeWidth={1.5} strokeDasharray="3 3" />
      <line x1={C} y1={C} x2={tipX} y2={tipY} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={tipX} cy={tipY} r={5} fill={color} />
      <circle cx={C} cy={C} r={2.6} fill="var(--ink)" />
    </svg>
  );
}

export default function TrigEqBasicStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "twosol";

  // Interactive: the live circle is the figure, with the current sine beneath it.
  if (mode === "find") {
    const deg = Math.round(values.x ?? 0);
    const val = Math.sin(toRadians(deg));
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<SolveCircle deg={deg} />}
              heading={"\\text{move the angle until } \\sin x = 0.50"}
              lines={[`\\sin(${deg}^\\circ) = ${val.toFixed(2)}`]}
            />
          </div>
        </div>
      </section>
    );
  }

  // Derivation slides (two solutions, general solution): algebra only, in focus.
  // The interactive "find" slide above carries the geometry for this lesson.
  const steps = mode === "general" ? GENERAL : TWO_SOL;
  const heading =
    mode === "general"
      ? "\\text{every co-terminal copy is a solution}"
      : "\\sin x = \\tfrac12 \\text{ has two solutions per turn}";
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
