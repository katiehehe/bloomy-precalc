import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import IdentityGraph from "../../components/IdentityGraph";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const RULES: FlowStep[] = [
  { id: "r0", tex: "\\sec\\theta - \\cos\\theta \\;\\stackrel{?}{=}\\; \\sin\\theta\\tan\\theta" },
];

const WORKED: FlowStep[] = [
  { id: "v0", tex: "\\sin\\theta\\tan\\theta" },
  { id: "v1", show: "s1", op: "\\tan\\theta = \\tfrac{\\sin\\theta}{\\cos\\theta}", tex: "\\sin\\theta \\cdot \\dfrac{\\sin\\theta}{\\cos\\theta}" },
  { id: "v2", show: "s2", op: "\\text{multiply}", tex: "\\dfrac{\\sin^2\\theta}{\\cos\\theta}" },
  { id: "v3", show: "s3", tone: "cancel", op: "\\sin^2\\theta = 1 - \\cos^2\\theta", tex: "\\dfrac{1 - \\cos^2\\theta}{\\cos\\theta}" },
  { id: "v4", show: "s4", op: "\\text{split the fraction}", tex: "\\dfrac{1}{\\cos\\theta} - \\dfrac{\\cos^2\\theta}{\\cos\\theta}" },
  { id: "v5", show: "s5", op: "\\text{cancel one } \\cos\\theta", tex: "\\dfrac{1}{\\cos\\theta} - \\cos\\theta" },
  { id: "v6", show: "s6", tone: "good", result: true, op: "\\tfrac{1}{\\cos\\theta} = \\sec\\theta", tex: "\\sec\\theta - \\cos\\theta" },
];

const PRACTICE2: FlowStep[] = [
  { id: "q0", tex: "(1 - \\cos x)(1 + \\cos x)" },
  { id: "q1", show: "s1", op: "\\text{difference of squares}", tex: "1 - \\cos^2 x" },
  { id: "q2", show: "s2", tone: "good", result: true, op: "\\sin^2 x = 1 - \\cos^2 x", tex: "\\sin^2 x" },
];

const secMinusCos = (x: number) => 1 / Math.cos(x) - Math.cos(x);
const sinTan = (x: number) => Math.sin(x) * Math.tan(x);
const diffSquares = (x: number) => (1 - Math.cos(x)) * (1 + Math.cos(x));
const sinSq = (x: number) => Math.sin(x) ** 2;

/** Live steps for the interactive slide: evaluate both sides of the identity as theta moves. */
function practiceSteps(deg: number): FlowStep[] {
  const rad = toRadians(deg);
  const lhs = secMinusCos(rad);
  const rhs = sinTan(rad);
  return [
    { id: "p0", tex: `\\theta = ${deg}^\\circ` },
    { id: "p1", show: "s1", op: "\\text{left side}", tex: `\\sec\\theta - \\cos\\theta = ${lhs.toFixed(3)}` },
    { id: "p2", show: "s2", op: "\\text{right side}", tex: `\\sin\\theta\\tan\\theta = ${rhs.toFixed(3)}` },
    {
      id: "p3",
      show: "s3",
      tone: "good",
      result: true,
      op: "\\text{equal at every } \\theta",
      tex: "\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta",
    },
  ];
}

export default function VerifyStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "rules";

  if (mode === "practice") {
    const deg = Math.round(values.theta ?? 20);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={practiceSteps(deg)}
              reveal={reveal}
              heading={"\\text{left side equals right side at this } \\theta"}
              header={<IdentityGraph f={secMinusCos} g={sinTan} clip={3} mark={toRadians(deg)} />}
            />
          </div>
        </div>
      </section>
    );
  }

  let steps: FlowStep[];
  let heading: string;
  let graph;
  if (mode === "worked") {
    steps = WORKED;
    heading = "\\text{transform one side into the other}";
    graph = <IdentityGraph f={secMinusCos} g={sinTan} clip={3} />;
  } else if (mode === "practice2") {
    steps = PRACTICE2;
    heading = "\\text{verify: } (1-\\cos x)(1+\\cos x) = \\sin^2 x";
    graph = <IdentityGraph f={diffSquares} g={sinSq} clip={1.4} />;
  } else {
    steps = RULES;
    heading = "\\text{both sides equal at every } \\theta";
    graph = <IdentityGraph f={secMinusCos} g={sinTan} clip={3} />;
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} header={graph} />
        </div>
      </div>
    </section>
  );
}
