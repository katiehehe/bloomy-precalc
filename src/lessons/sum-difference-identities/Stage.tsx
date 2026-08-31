import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import FigureReadout from "../../components/FigureReadout";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const MINUS = "\\textcolor{#c0392b}{-}";
const PLUS = "\\textcolor{#0a8f76}{+}";

const A_FIXED = 45;

const SIGNS: FlowStep[] = [
  { id: "c0", tex: "\\cos(A+B)" },
  {
    id: "c1",
    show: "s1",
    result: true,
    op: "\\text{pair like with like, then minus}",
    tex: `\\cos A\\cos B ${MINUS} \\sin A\\sin B`,
    note: "\\mathbf{CC} - \\mathbf{SS}",
  },
  { id: "n0", show: "s2", tex: "\\sin(A+B)" },
  {
    id: "n1",
    show: "s3",
    tone: "good",
    result: true,
    op: "\\text{mix the functions, keep the plus}",
    tex: `\\sin A\\cos B ${PLUS} \\cos A\\sin B`,
    note: "\\mathbf{SC} + \\mathbf{CS}",
  },
];

// Difference formulas derived as "a sum with a negative angle", so the sign flip
// has a reason: sine is odd, so sin(-B) carries a minus, while cosine is even.
const DIFFERENCE: FlowStep[] = [
  { id: "e0", tex: "\\cos(A - B) = \\cos\\big(A + (-B)\\big)" },
  { id: "e1", show: "s1", op: "\\text{cosine sum formula}", tex: `\\cos A\\cos(-B) ${MINUS} \\sin A\\sin(-B)` },
  {
    id: "e2",
    show: "s2",
    tone: "cancel",
    op: "\\cos(-B)=\\cos B,\\ \\ \\sin(-B)=-\\sin B",
    tex: `\\cos A\\cos B ${MINUS} \\sin A\\,(\\textcolor{#c0392b}{-}\\sin B)`,
  },
  {
    id: "e3",
    show: "s3",
    tone: "good",
    result: true,
    op: "\\text{two minuses make a plus}",
    tex: `\\cos A\\cos B ${PLUS} \\sin A\\sin B`,
    note: "\\cos(A-B):\\ \\ \\mathbf{CC} + \\mathbf{SS}",
  },
  { id: "e4", show: "s4", op: "\\text{now sine, same } A+(-B)", tex: `\\sin A\\cos(-B) ${PLUS} \\cos A\\sin(-B)` },
  {
    id: "e5",
    show: "s5",
    tone: "good",
    result: true,
    op: "\\sin(-B)=-\\sin B \\text{ flips the } +",
    tex: `\\sin A\\cos B ${MINUS} \\cos A\\sin B`,
    note: "\\sin(A-B):\\ \\ \\mathbf{SC} - \\mathbf{CS}",
  },
];

const TANGENT: FlowStep[] = [
  { id: "g0", tex: "\\tan(A \\pm B) = \\dfrac{\\sin(A \\pm B)}{\\cos(A \\pm B)}" },
  {
    id: "g1",
    show: "s1",
    result: true,
    op: "\\text{divide top and bottom by } \\cos A\\cos B",
    tex: "\\tan(A+B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}",
    note: "\\text{top keeps the sign, bottom takes the opposite}",
  },
  {
    id: "g2",
    show: "s2",
    tone: "good",
    result: true,
    op: "\\text{difference form}",
    tex: "\\tan(A-B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}",
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

const CSIZE = 440;
const CC = CSIZE / 2;
const CR = 150;
const CTHETA = 35; // a clean split: theta = 35 degrees, complement = 55 degrees

function cpolar(deg: number, r: number) {
  const a = toRadians(deg);
  return { x: CC + r * Math.cos(a), y: CC - r * Math.sin(a) };
}

function carc(d0: number, d1: number, r: number) {
  const p0 = cpolar(d0, r);
  const p1 = cpolar(d1, r);
  const large = Math.abs(d1 - d0) > 180 ? 1 : 0;
  const sweep = d1 >= d0 ? 0 : 1;
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

/**
 * A quarter-turn picture of the complement. A single ray at theta splits the
 * right angle between the axes into theta below the ray and (90 - theta) above
 * it, so the two acute angles visibly add to a right angle. This is the one
 * geometric idea behind the cofunction identity; the proof is then pure algebra.
 */
function ComplementCircle() {
  const ray = cpolar(CTHETA, CR);
  const thetaLabel = cpolar(CTHETA / 2, CR * 0.62);
  const compLabel = cpolar((CTHETA + 90) / 2, CR * 0.74);
  const sq = 20;
  return (
    <svg
      className="figure"
      viewBox={`0 0 ${CSIZE} ${CSIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="A quarter turn with a ray at theta splitting the right angle into theta and its complement, ninety degrees minus theta."
    >
      <line x1={24} y1={CC} x2={CSIZE - 24} y2={CC} className="axis" />
      <line x1={CC} y1={24} x2={CC} y2={CSIZE - 24} className="axis" />
      <circle cx={CC} cy={CC} r={CR} className="circle-line" />

      <path d={`M ${CC + sq} ${CC} L ${CC + sq} ${CC - sq} L ${CC} ${CC - sq}`} fill="none" stroke="var(--muted)" strokeWidth={2} />

      <path d={carc(0, CTHETA, CR * 0.5)} fill="none" stroke="var(--primary)" strokeWidth={7} strokeLinecap="round" />
      <path d={carc(CTHETA, 90, CR * 0.5)} fill="none" stroke="var(--cosine)" strokeWidth={7} strokeLinecap="round" />

      <line x1={CC} y1={CC} x2={ray.x} y2={ray.y} stroke="var(--primary)" strokeWidth={3} strokeLinecap="round" />
      <circle cx={ray.x} cy={ray.y} r={6} fill="var(--primary)" />

      <text x={thetaLabel.x} y={thetaLabel.y + 5} textAnchor="middle" className="radian-arc-label">
        {"\u03b8"}
      </text>
      <text x={compLabel.x} y={compLabel.y + 5} textAnchor="middle" className="radian-arc-label" fill="var(--cosine)">
        {"90\u00b0\u2212\u03b8"}
      </text>

      <circle cx={CC} cy={CC} r={5} className="origin-dot" />
      <text x={CC} y={CSIZE - 22} textAnchor="middle" className="radian-caption">
        {"\u03b8 + (90\u00b0 \u2212 \u03b8) = 90\u00b0"}
      </text>
    </svg>
  );
}

function viewFor(mode: string): { steps: FlowStep[]; heading: string } {
  if (mode === "cos75") {
    return { steps: COS75, heading: "\\text{exact value of } \\cos 75^\\circ" };
  }
  if (mode === "cofunction") {
    return { steps: COFUNCTION, heading: "\\text{cofunction: } \\cos\\!\\left(\\tfrac{\\pi}{2}-\\theta\\right)" };
  }
  if (mode === "difference") {
    return { steps: DIFFERENCE, heading: "\\text{a difference is a sum with } -B" };
  }
  if (mode === "tangent") {
    return { steps: TANGENT, heading: "\\text{tangent: sum and difference}" };
  }
  return { steps: SIGNS, heading: "\\text{sum formulas: the sign pattern}" };
}

export default function SumDiffStage({ reveal, slide, values }: LessonFigureProps) {
  const mode = slide.mode ?? "signs";

  // Interactive verification: circle plus a compact readout, no derivation beside it.
  if (mode === "practice") {
    const bDeg = Math.round(values.b ?? 80);
    const sum = A_FIXED + bDeg;
    const direct = Math.cos(toRadians(sum));
    const formula =
      Math.cos(toRadians(A_FIXED)) * Math.cos(toRadians(bDeg)) - Math.sin(toRadians(A_FIXED)) * Math.sin(toRadians(bDeg));
    const angles: CircleAngle[] = [
      { deg: A_FIXED, label: "A=45\u00b0", tone: "a" },
      { deg: bDeg, label: "B", tone: "b" },
      { deg: sum, label: "A+B", tone: "sum" },
    ];
    const lines: string[] = [];
    if (reveal.s1) lines.push(`\\cos(A+B) = \\cos ${sum}^\\circ = ${direct.toFixed(3)}`);
    if (reveal.s2) lines.push(`\\cos A\\cos B - \\sin A\\sin B = ${formula.toFixed(3)}`);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<AngleCircle angles={angles} focus={sum} />}
              lines={lines}
              note={reveal.s3 ? "equal at every angle" : undefined}
            />
          </div>
        </div>
      </section>
    );
  }

  // Cofunction: show the circle only long enough to see the complement, then let
  // the algebra prove the identity on its own once the derivation begins.
  if (mode === "cofunction" && !(reveal.s1 || reveal.s2 || reveal.s3)) {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <ComplementCircle />
          </div>
        </div>
      </section>
    );
  }

  // The remaining views are algebra: the sum-formula statement, the cos 75
  // computation, and the cofunction proof after its intro. The derivation takes
  // the whole panel with the current line in focus, no circle to distract.
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
