import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import FigureReadout from "../../components/FigureReadout";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIN2: FlowStep[] = [
  { id: "a0", tex: "\\sin 2\\theta" },
  { id: "a1", show: "s1", op: "\\text{write } 2\\theta = \\theta + \\theta", tex: "\\sin(\\theta + \\theta)" },
  { id: "a2", show: "s2", op: "\\text{sine sum formula}", tex: "\\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta" },
  { id: "a3", show: "s3", tone: "good", result: true, op: "\\text{two equal terms add}", tex: "2\\sin\\theta\\cos\\theta" },
];

const COS2: FlowStep[] = [
  { id: "b0", tex: "\\cos 2\\theta" },
  { id: "b1", show: "s1", op: "\\text{cosine sum formula}", tex: "\\cos\\theta\\cos\\theta - \\sin\\theta\\sin\\theta" },
  { id: "b2", show: "s2", result: true, op: "\\text{combine}", tex: "\\cos^2\\theta - \\sin^2\\theta" },
  { id: "b3", show: "s3", tone: "cancel", op: "\\text{swap } \\sin^2\\theta = 1-\\cos^2\\theta", tex: "\\cos^2\\theta - (1 - \\cos^2\\theta)" },
  { id: "b4", show: "s4", result: true, op: "\\text{simplify}", tex: "2\\cos^2\\theta - 1" },
  { id: "b5", show: "s5", tone: "good", result: true, op: "\\text{instead swap } \\cos^2\\theta = 1-\\sin^2\\theta", tex: "1 - 2\\sin^2\\theta" },
];

export default function DoubleAngleStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "sin2";

  // Interactive verification: the circle is the whole figure, with a short
  // numeric readout beneath. No step derivation sits beside it.
  if (mode === "given") {
    const deg = Math.round(values.theta ?? 20);
    const sin2 = Math.sin(toRadians(2 * deg));
    const twoSinCos = 2 * Math.sin(toRadians(deg)) * Math.cos(toRadians(deg));
    const angles: CircleAngle[] = [
      { deg, label: "\u03b8", tone: "theta" },
      { deg: 2 * deg, label: "2\u03b8", tone: "sum" },
    ];
    const lines: string[] = [];
    if (reveal.s1) lines.push(`\\sin 2\\theta = \\sin ${2 * deg}^\\circ = ${sin2.toFixed(3)}`);
    if (reveal.s2) lines.push(`2\\sin\\theta\\cos\\theta = ${twoSinCos.toFixed(3)}`);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<AngleCircle angles={angles} focus={Math.min(2 * deg, 359)} />}
              lines={lines}
              note={reveal.s3 ? "equal at every angle" : undefined}
            />
          </div>
        </div>
      </section>
    );
  }

  // Derivation slides: algebra only, with the current line in focus.
  const steps = mode === "cos2" ? COS2 : SIN2;
  const heading =
    mode === "cos2" ? "\\text{three forms of } \\cos 2\\theta" : "\\text{double angle} = \\text{angle} + \\text{itself}";
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
