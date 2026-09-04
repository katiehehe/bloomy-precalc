import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle from "../../components/AngleCircle";
import ComplexPlane, { type ComplexSpec } from "../../components/ComplexPlane";
import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";

/** Roots of unity sit on the unit circle, so a small half keeps them large. */
const HALF = 1.8;

const clampN = (n: number) => Math.max(2, Math.min(6, Math.round(n)));

/** The n roots of unity: cos(360k/n) + i sin(360k/n), starting at 1. */
function rootsOfUnity(n: number) {
  const dots: { re: number; im: number; label?: string }[] = [];
  for (let k = 0; k < n; k += 1) {
    const a = (2 * Math.PI * k) / n;
    dots.push({ re: Math.cos(a), im: Math.sin(a), label: k === 0 ? "1" : undefined });
  }
  return dots;
}

/**
 * Solve z^n = 1 in exponential form: write 1 = e^{2π i k}, apply De Moivre,
 * and match exponents to reach θ = 2π k / n.
 */
const DERIVE_STEPS: FlowStep[] = [
  { id: "r0", tex: "z^n = 1" },
  {
    id: "r1",
    show: "s1",
    op: "1 = e^{2\\pi i k}",
    tex: "z^n = e^{2\\pi i k}",
    note: "e^{2\\pi i} = 1,\\ \\text{and } k \\text{ extra turns stay at } 1",
  },
  {
    id: "r2",
    show: "s2",
    op: "z = e^{i\\theta},\\ \\text{then De Moivre}",
    tex: "e^{i n \\theta} = e^{2\\pi i k}",
  },
  {
    id: "r3",
    show: "s3",
    op: "\\text{match the arguments}",
    tex: "n\\theta = 2\\pi k",
    note: "k \\text{ already counts every full turn}",
  },
  {
    id: "r4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\text{divide both sides by } n",
    tex: "\\theta = \\dfrac{2\\pi k}{n}",
  },
];

/**
 * Convert θ = 2π k / n into degrees, showing the 360°/2π intermediate
 * before cancelling, then read the neighbor spacing 360°/n.
 */
const DEGREE_STEPS: FlowStep[] = [
  { id: "g0", tex: "\\theta = \\dfrac{2\\pi k}{n}" },
  {
    id: "g1",
    show: "d1",
    op: "\\times \\dfrac{360^\\circ}{2\\pi}",
    tex: "\\theta = \\dfrac{2\\pi k}{n} \\cdot \\dfrac{360^\\circ}{2\\pi}",
  },
  {
    id: "g2",
    show: "d2",
    tone: "cancel",
    op: "\\text{the } 2\\pi \\text{ cancels}",
    tex: "\\theta = \\dfrac{\\cancel{2\\pi}\\, k}{n} \\cdot \\dfrac{360^\\circ}{\\cancel{2\\pi}}",
  },
  {
    id: "g3",
    show: "d3",
    tone: "good",
    result: true,
    op: "k \\text{ and } k+1 \\text{ differ by } 1",
    tex: "\\theta = \\dfrac{360^\\circ k}{n}",
    note: "\\dfrac{360^\\circ}{n} \\text{ between neighbors}",
  },
];

const ROOT_GLYPH = (
  <AngleCircle
    angles={[
      { deg: 0, label: "1", tone: "theta" },
      { deg: 120, label: "120°", tone: "a" },
      { deg: 240, label: "240°", tone: "b" },
    ]}
  />
);

export default function RootsOfUnityStage(props: LessonFigureProps) {
  const { reveal, values, slide } = props;
  const mode = slide.mode ?? "roots";

  if (mode === "derive" || mode === "degrees") {
    const steps = mode === "degrees" ? DEGREE_STEPS : DERIVE_STEPS;
    const heading =
      mode === "degrees" ? "\\text{radians to degrees}" : "\\text{solve } z^n = 1";
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={steps}
              reveal={reveal}
              heading={heading}
              header={ROOT_GLYPH}
              focus
            />
          </div>
        </div>
      </section>
    );
  }

  const n = clampN(values.n ?? 3);
  const spacing = Math.round(360 / n);
  const dots = reveal.dots ? rootsOfUnity(n) : [];
  const spec: ComplexSpec = {
    aria: `Complex plane showing the ${n} roots of unity, equally spaced ${spacing} degrees apart on the unit circle, starting at 1.`,
    phasors: [],
    ring: reveal.ring ? 1 : undefined,
    dots,
  };
  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ComplexPlane {...props} spec={spec} half={HALF} />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{"z_k = \\cos\\dfrac{360^\\circ k}{n} + i\\sin\\dfrac{360^\\circ k}{n}"}</Tex>
              <Tex>{`n = ${n}\\ \\text{roots},\\ \\ \\dfrac{360^\\circ}{${n}} = ${spacing}^\\circ\\ \\text{apart}`}</Tex>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
