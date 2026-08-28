import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import type { LessonFigureProps } from "../types";

const MINUS = "\\textcolor{#c0392b}{-}";
const PLUS = "\\textcolor{#0a8f76}{+}";

const SIGNS: FlowStep[] = [
  { id: "c0", tex: "\\cos(A+B)" },
  {
    id: "c1",
    show: "s1",
    result: true,
    op: "\\text{expand}",
    tex: `\\cos A\\cos B ${MINUS} \\sin A\\sin B`,
    note: "\\text{cosine flips the sign}",
  },
  { id: "n0", show: "s2", tex: "\\sin(A+B)" },
  {
    id: "n1",
    show: "s3",
    tone: "good",
    result: true,
    op: "\\text{expand}",
    tex: `\\sin A\\cos B ${PLUS} \\cos A\\sin B`,
    note: "\\text{sine keeps the sign}",
  },
];

const COS75: FlowStep[] = [
  { id: "w0", tex: "\\cos 75^\\circ" },
  { id: "w1", show: "s1", op: "\\text{split } 75 = 45 + 30", tex: "\\cos(45^\\circ + 30^\\circ)" },
  { id: "w2", show: "s2", op: "\\text{expand (cosine, so minus)}", tex: `\\cos45^\\circ\\cos30^\\circ ${MINUS} \\sin45^\\circ\\sin30^\\circ` },
  { id: "w3", show: "s3", op: "\\text{drop in exact values}", tex: `\\dfrac{\\sqrt2}{2}\\cdot\\dfrac{\\sqrt3}{2} ${MINUS} \\dfrac{\\sqrt2}{2}\\cdot\\dfrac{1}{2}` },
  { id: "w4", show: "s4", op: "\\text{multiply each product}", tex: `\\dfrac{\\sqrt6}{4} ${MINUS} \\dfrac{\\sqrt2}{4}` },
  { id: "w5", show: "s5", tone: "good", result: true, op: "\\text{one denominator}", tex: "\\dfrac{\\sqrt6 - \\sqrt2}{4}" },
];

const COFUNCTION: FlowStep[] = [
  { id: "p0", tex: "\\cos\\!\\left(\\tfrac{\\pi}{2} - \\theta\\right)" },
  { id: "p1", show: "s1", op: "\\text{difference formula}", tex: "\\cos\\tfrac{\\pi}{2}\\cos\\theta + \\sin\\tfrac{\\pi}{2}\\sin\\theta" },
  {
    id: "p2",
    show: "s2",
    tone: "cancel",
    op: "\\cos\\tfrac{\\pi}{2}=0,\\ \\sin\\tfrac{\\pi}{2}=1",
    tex: "\\textcolor{#c0392b}{0}\\cdot\\cos\\theta + \\textcolor{#0a8f76}{1}\\cdot\\sin\\theta",
  },
  { id: "p3", show: "s3", tone: "good", result: true, op: "\\text{the first term vanishes}", tex: "\\sin\\theta" },
];

function viewFor(mode: string): { steps: FlowStep[]; angles: CircleAngle[]; heading: string; focus?: number } {
  if (mode === "cos75") {
    return {
      steps: COS75,
      heading: "\\text{exact value of } \\cos 75^\\circ",
      angles: [
        { deg: 30, label: "30\u00b0", tone: "b" },
        { deg: 45, label: "45\u00b0", tone: "a" },
        { deg: 75, label: "75\u00b0", tone: "sum" },
      ],
      focus: 75,
    };
  }
  if (mode === "cofunction") {
    return {
      steps: COFUNCTION,
      heading: "\\text{cofunction: } \\cos\\!\\left(\\tfrac{\\pi}{2}-\\theta\\right)",
      angles: [
        { deg: 40, label: "\u03b8", tone: "theta" },
        { deg: 50, label: "90\u00b0\u2212\u03b8", tone: "a" },
      ],
    };
  }
  return {
    steps: SIGNS,
    heading: "\\text{sum formulas: watch the sign}",
    angles: [
      { deg: 25, label: "A", tone: "a" },
      { deg: 40, label: "B", tone: "b" },
      { deg: 65, label: "A+B", tone: "sum" },
    ],
    focus: 65,
  };
}

export default function SumDiffStage({ reveal, slide }: LessonFigureProps) {
  const { steps, angles, heading, focus } = viewFor(slide.mode ?? "signs");
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={steps} reveal={reveal} heading={heading} header={<AngleCircle angles={angles} focus={focus} />} />
        </div>
      </div>
    </section>
  );
}
