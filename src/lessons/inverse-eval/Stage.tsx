import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type ArcRange, type CircleAngle } from "../../components/AngleCircle";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const RANGES: FlowStep[] = [
  { id: "r0", tex: "\\arcsin x:\\ \\left[-\\tfrac{\\pi}{2},\\ \\tfrac{\\pi}{2}\\right]", note: "\\text{quadrants IV and I}" },
  { id: "r1", show: "s1", op: "\\text{cosine needs a different half}", tex: "\\arccos x:\\ \\left[0,\\ \\pi\\right]", note: "\\text{quadrants I and II}" },
  { id: "r2", show: "s2", op: "\\text{tangent, endpoints open}", tex: "\\arctan x:\\ \\left(-\\tfrac{\\pi}{2},\\ \\tfrac{\\pi}{2}\\right)", note: "\\text{quadrants IV and I}" },
];

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

function viewFor(mode: string): { steps: FlowStep[]; heading: string; angles: CircleAngle[]; arcRange?: ArcRange; focus?: number } {
  if (mode === "arcsin") {
    return {
      steps: ARCSIN,
      heading: "\\arcsin\\tfrac12 = \\text{ the angle in the right half}",
      arcRange: { from: -90, to: 90, tone: "sum" },
      angles: [{ deg: 30, label: "30\u00b0", tone: "sum" }],
      focus: 30,
    };
  }
  if (mode === "arccos") {
    return {
      steps: ARCCOS,
      heading: "\\arccos \\text{ lives in the top half}",
      arcRange: { from: 0, to: 180, tone: "a" },
      angles: [{ deg: 120, label: "120\u00b0", tone: "a" }],
      focus: 120,
    };
  }
  return {
    steps: RANGES,
    heading: "\\text{each inverse picks one output range}",
    arcRange: { from: -90, to: 90, tone: "sum" },
    angles: [
      { deg: 90, label: "+\u03c0/2", tone: "sum" },
      { deg: -90, label: "\u2212\u03c0/2", tone: "sum" },
    ],
  };
}

/** Live steps for the interactive slide: recompute the sine and range test as the learner drags theta. */
function practiceSteps(deg: number): FlowStep[] {
  const s = Math.sin(toRadians(deg));
  const inBand = deg >= -90 && deg <= 90;
  return [
    { id: "p0", tex: `\\theta = ${deg}^\\circ` },
    { id: "p1", show: "s1", op: "\\text{read the sine}", tex: `\\sin ${deg}^\\circ = ${s.toFixed(2)}` },
    {
      id: "p2",
      show: "s2",
      tone: inBand ? "good" : "cancel",
      result: inBand,
      op: inBand ? "\\theta \\in \\left[-90^\\circ, 90^\\circ\\right]" : "\\theta \\text{ is outside } \\left[-90^\\circ, 90^\\circ\\right]",
      tex: inBand ? "\\checkmark\\ \\text{inside the arcsine range}" : "\\times\\ \\text{outside the arcsine range}",
    },
  ];
}

export default function InverseEvalStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "ranges";

  if (mode === "practice") {
    const deg = Math.round(values.theta ?? 150);
    const inBand = deg >= -90 && deg <= 90;
    const angles: CircleAngle[] = [{ deg, label: `${deg}\u00b0`, tone: inBand ? "sum" : "b" }];
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={practiceSteps(deg)}
              reveal={reveal}
              heading={"\\text{evaluate } \\arcsin\\tfrac12 \\text{ on the circle}"}
              header={<AngleCircle angles={angles} arcRange={{ from: -90, to: 90, tone: "sum" }} focus={deg} />}
            />
          </div>
        </div>
      </section>
    );
  }

  const { steps, heading, angles, arcRange, focus } = viewFor(mode);
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} header={<AngleCircle angles={angles} arcRange={arcRange} focus={focus} />} />
        </div>
      </div>
    </section>
  );
}
