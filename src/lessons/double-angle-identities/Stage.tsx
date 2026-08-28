import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
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

function givenSteps(deg: number): FlowStep[] {
  const rad = toRadians(deg);
  const sin2 = Math.sin(2 * rad);
  const twoSinCos = 2 * Math.sin(rad) * Math.cos(rad);
  return [
    { id: "g0", tex: "\\sin 2\\theta \\stackrel{?}{=} 2\\sin\\theta\\cos\\theta" },
    { id: "g1", show: "s1", op: "\\text{left side}", tex: `\\sin(${2 * deg}^\\circ) = ${sin2.toFixed(3)}` },
    { id: "g2", show: "s2", op: "\\text{right side}", tex: `2\\sin ${deg}^\\circ\\cos ${deg}^\\circ = ${twoSinCos.toFixed(3)}` },
    { id: "g3", show: "s3", tone: "good", result: true, op: "\\text{same number}", tex: "\\checkmark\\ \\text{equal for every } \\theta" },
  ];
}

export default function DoubleAngleStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "sin2";
  const deg = Math.round(values.theta ?? 20);

  let steps: FlowStep[];
  let angles: CircleAngle[];
  let heading: string;
  if (mode === "cos2") {
    steps = COS2;
    heading = "\\text{three faces of } \\cos 2\\theta";
    angles = [
      { deg: 35, label: "\u03b8", tone: "theta" },
      { deg: 70, label: "2\u03b8", tone: "sum" },
    ];
  } else if (mode === "given") {
    steps = givenSteps(deg);
    heading = `\\theta = ${deg}^\\circ,\\ 2\\theta = ${2 * deg}^\\circ`;
    angles = [
      { deg, label: "\u03b8", tone: "theta" },
      { deg: 2 * deg, label: "2\u03b8", tone: "sum" },
    ];
  } else {
    steps = SIN2;
    heading = "\\text{double angle} = \\text{angle} + \\text{itself}";
    angles = [
      { deg: 35, label: "\u03b8", tone: "theta" },
      { deg: 70, label: "2\u03b8", tone: "sum" },
    ];
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} header={<AngleCircle angles={angles} focus={mode === "given" ? Math.min(2 * deg, 359) : 70} />} />
        </div>
      </div>
    </section>
  );
}
