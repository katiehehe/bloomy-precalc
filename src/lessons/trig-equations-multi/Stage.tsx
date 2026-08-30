import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SOLUTIONS = [30, 150, 210, 330];
const isSolution = (deg: number) => SOLUTIONS.some((a) => Math.abs(deg - a) < 6);

const FACTOR: FlowStep[] = [
  { id: "f0", tex: "2\\sin^2 x + \\sin x - 1 = 0" },
  { id: "f1", show: "s1", op: "\\text{let } u = \\sin x", tex: "2u^2 + u - 1 = 0" },
  { id: "f2", show: "s2", op: "\\text{factor the quadratic}", tex: "(2u - 1)(u + 1) = 0" },
  { id: "f3", show: "s3", op: "\\text{zero-product rule}", tex: "u = \\tfrac12 \\ \\text{ or } \\ u = -1" },
  { id: "f4", show: "s4", op: "\\text{put } \\sin x \\text{ back}", tex: "\\sin x = \\tfrac12 \\ \\text{ or } \\ \\sin x = -1" },
  { id: "f5", show: "s5", tone: "good", result: true, op: "\\text{solve each on } [0, 2\\pi)", tex: "x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}, \\ \\dfrac{3\\pi}{2}" },
];

const IDENTITY: FlowStep[] = [
  { id: "d0", tex: "\\sin 2x = \\sin x" },
  { id: "d1", show: "s1", op: "\\text{double-angle for } \\sin 2x", tex: "2\\sin x\\cos x = \\sin x" },
  { id: "d2", show: "s2", op: "\\text{bring all to one side}", tex: "2\\sin x\\cos x - \\sin x = 0" },
  { id: "d3", show: "s3", op: "\\text{factor out } \\sin x", tex: "\\sin x\\,(2\\cos x - 1) = 0" },
  { id: "d4", show: "s4", op: "\\text{zero-product rule}", tex: "\\sin x = 0 \\ \\text{ or } \\ \\cos x = \\tfrac12" },
  { id: "d5", show: "s5", tone: "good", result: true, op: "\\text{solve each on } [0, 2\\pi)", tex: "x = 0, \\ \\pi, \\ \\dfrac{\\pi}{3}, \\ \\dfrac{5\\pi}{3}" },
];

const MULTI: FlowStep[] = [
  { id: "m0", tex: "\\cos 2x = \\tfrac12, \\quad x \\in [0, 2\\pi)" },
  { id: "m1", show: "s1", op: "\\text{let } u = 2x, \\text{ so } u \\in [0, 4\\pi)", tex: "\\cos u = \\tfrac12" },
  { id: "m2", show: "s2", op: "\\cos u = \\tfrac12 \\text{ twice each turn, two turns}", tex: "u = \\dfrac{\\pi}{3}, \\ \\dfrac{5\\pi}{3}, \\ \\dfrac{7\\pi}{3}, \\ \\dfrac{11\\pi}{3}" },
  { id: "m3", show: "s3", op: "\\text{divide every answer by } 2", tex: "x = \\dfrac{\\pi}{6}, \\ \\dfrac{5\\pi}{6}, \\ \\dfrac{7\\pi}{6}, \\ \\dfrac{11\\pi}{6}" },
  { id: "m4", show: "s4", tone: "good", result: true, op: "\\text{count them}", tex: "\\text{four solutions on } [0, 2\\pi)" },
];

function viewFor(mode: string): { steps: FlowStep[]; heading: string; angles: CircleAngle[] } {
  if (mode === "identity") {
    return {
      steps: IDENTITY,
      heading: "\\text{use an identity, then factor}",
      angles: [
        { deg: 0, label: "0", tone: "theta" },
        { deg: 180, label: "\u03c0", tone: "theta" },
        { deg: 60, label: "\u03c0/3", tone: "a" },
        { deg: 300, label: "5\u03c0/3", tone: "a" },
      ],
    };
  }
  if (mode === "multi") {
    return {
      steps: MULTI,
      heading: "\\text{solve for the double angle, then halve}",
      angles: [
        { deg: 30, label: "\u03c0/6", tone: "sum" },
        { deg: 150, label: "5\u03c0/6", tone: "a" },
        { deg: 210, label: "7\u03c0/6", tone: "sum" },
        { deg: 330, label: "11\u03c0/6", tone: "a" },
      ],
    };
  }
  return {
    steps: FACTOR,
    heading: "\\text{treat it like a quadratic}",
    angles: [
      { deg: 30, label: "\u03c0/6", tone: "sum" },
      { deg: 150, label: "5\u03c0/6", tone: "a" },
      { deg: 270, label: "3\u03c0/2", tone: "b" },
    ],
  };
}

/** Live steps for the interactive slide: double the angle and test cos 2x as x moves. */
function practiceSteps(deg: number): FlowStep[] {
  const c = Math.cos(toRadians(2 * deg));
  const sol = isSolution(deg);
  return [
    { id: "p0", tex: `x = ${deg}^\\circ` },
    { id: "p1", show: "s1", op: "\\text{double the angle}", tex: `2x = ${2 * deg}^\\circ` },
    { id: "p2", show: "s2", op: "\\text{evaluate the cosine}", tex: `\\cos 2x = ${c.toFixed(2)}` },
    {
      id: "p3",
      show: "s3",
      tone: sol ? "good" : "cancel",
      result: sol,
      op: sol ? "\\cos 2x = \\tfrac12" : "\\text{keep dragging}",
      tex: sol ? "\\checkmark\\ \\text{a solution}" : "\\times\\ \\text{not a solution}",
    },
  ];
}

export default function TrigEqMultiStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "factor";

  if (mode === "practice") {
    const deg = Math.round(values.theta ?? 90);
    const angles: CircleAngle[] = [
      { deg, label: "x", tone: "theta" },
      { deg: ((2 * deg) % 360 + 360) % 360, label: "2x", tone: isSolution(deg) ? "sum" : "a" },
    ];
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={practiceSteps(deg)}
              reveal={reveal}
              heading={"\\text{solve } \\cos 2x = \\tfrac12 \\text{ by dragging } x"}
              header={<AngleCircle angles={angles} focus={deg} />}
            />
          </div>
        </div>
      </section>
    );
  }

  const { steps, heading, angles } = viewFor(mode);
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
