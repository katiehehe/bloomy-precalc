import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const DERIVE: FlowStep[] = [
  { id: "d0", tex: "\\cos 2\\alpha = 1 - 2\\sin^2\\alpha" },
  { id: "d1", show: "s1", op: "\\text{let } \\alpha = \\tfrac{\\theta}{2}", tex: "\\cos\\theta = 1 - 2\\sin^2\\tfrac{\\theta}{2}" },
  { id: "d2", show: "s2", op: "\\text{isolate the sine term}", tex: "2\\sin^2\\tfrac{\\theta}{2} = 1 - \\cos\\theta" },
  { id: "d3", show: "s3", op: "\\text{divide by } 2", tex: "\\sin^2\\tfrac{\\theta}{2} = \\dfrac{1 - \\cos\\theta}{2}" },
  { id: "d4", show: "s4", tone: "good", result: true, op: "\\text{square root both sides}", tex: "\\sin\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos\\theta}{2}}" },
];

const COSINE: FlowStep[] = [
  { id: "e0", tex: "\\cos 2\\alpha = 2\\cos^2\\alpha - 1" },
  { id: "e1", show: "s1", op: "\\text{let } \\alpha = \\tfrac{\\theta}{2}", tex: "\\cos\\theta = 2\\cos^2\\tfrac{\\theta}{2} - 1" },
  { id: "e2", show: "s2", op: "\\text{isolate the cosine term}", tex: "2\\cos^2\\tfrac{\\theta}{2} = 1 + \\cos\\theta" },
  { id: "e3", show: "s3", tone: "good", result: true, op: "\\text{divide by } 2 \\text{, then root}", tex: "\\cos\\tfrac{\\theta}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos\\theta}{2}}" },
];

const WORKED: FlowStep[] = [
  { id: "f0", tex: "\\sin 22.5^\\circ = \\sin\\dfrac{45^\\circ}{2}" },
  { id: "f1", show: "s1", op: "\\text{half-angle, } \\theta = 45^\\circ", tex: "+\\sqrt{\\dfrac{1 - \\cos 45^\\circ}{2}}" },
  { id: "f2", show: "s2", op: "\\cos 45^\\circ = \\tfrac{\\sqrt2}{2}", tex: "\\sqrt{\\dfrac{1 - \\tfrac{\\sqrt2}{2}}{2}}" },
  { id: "f3", show: "s3", op: "\\text{common denominator on top}", tex: "\\sqrt{\\dfrac{\\tfrac{2 - \\sqrt2}{2}}{2}}" },
  { id: "f4", show: "s4", op: "\\text{divide the fractions}", tex: "\\sqrt{\\dfrac{2 - \\sqrt2}{4}}" },
  { id: "f5", show: "s5", tone: "good", result: true, op: "\\sqrt{4} = 2 \\text{ on the bottom}", tex: "\\dfrac{\\sqrt{2 - \\sqrt2}}{2}" },
];

function viewFor(mode: string): { steps: FlowStep[]; angles: CircleAngle[]; heading: string } {
  if (mode === "cosine") {
    return {
      steps: COSINE,
      heading: "\\text{half-angle for cosine}",
      angles: [
        { deg: 80, label: "\u03b8", tone: "theta" },
        { deg: 40, label: "\u03b8/2", tone: "a" },
      ],
    };
  }
  if (mode === "worked") {
    return {
      steps: WORKED,
      heading: "\\text{exact value of } \\sin 22.5^\\circ",
      angles: [
        { deg: 45, label: "45\u00b0", tone: "theta" },
        { deg: 22.5, label: "22.5\u00b0", tone: "a" },
      ],
    };
  }
  return {
    steps: DERIVE,
    heading: "\\text{solving for } \\sin\\tfrac{\\theta}{2}",
    angles: [
      { deg: 80, label: "\u03b8", tone: "theta" },
      { deg: 40, label: "\u03b8/2", tone: "a" },
    ],
  };
}

/** Live steps for the interactive slide: recompute the half-angle sine two ways as theta moves. */
function practiceSteps(deg: number): FlowStep[] {
  const half = deg / 2;
  const direct = Math.sin(toRadians(half));
  const formula = Math.sqrt((1 - Math.cos(toRadians(deg))) / 2);
  return [
    { id: "p0", tex: `\\theta = ${deg}^\\circ,\\quad \\tfrac{\\theta}{2} = ${half}^\\circ` },
    { id: "p1", show: "s1", op: "\\text{direct sine of the half angle}", tex: `\\sin ${half}^\\circ = ${direct.toFixed(3)}` },
    { id: "p2", show: "s2", op: "\\text{half-angle formula}", tex: `\\sqrt{\\dfrac{1 - \\cos ${deg}^\\circ}{2}} = ${formula.toFixed(3)}` },
    { id: "p3", show: "s3", tone: "good", result: true, op: "\\text{the two agree at every } \\theta", tex: "\\sin\\tfrac{\\theta}{2} = \\sqrt{\\dfrac{1 - \\cos\\theta}{2}}" },
  ];
}

export default function HalfAngleStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "derive";

  if (mode === "practice") {
    const deg = Math.round(values.theta ?? 140);
    const angles: CircleAngle[] = [
      { deg, label: "\u03b8", tone: "theta" },
      { deg: deg / 2, label: "\u03b8/2", tone: "a" },
    ];
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={practiceSteps(deg)}
              reveal={reveal}
              heading={"\\text{watch both sides track } \\theta"}
              header={<AngleCircle angles={angles} focus={deg} />}
            />
          </div>
        </div>
      </section>
    );
  }

  const { steps, angles, heading } = viewFor(mode);
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} header={<AngleCircle angles={angles} />} />
        </div>
      </div>
    </section>
  );
}
