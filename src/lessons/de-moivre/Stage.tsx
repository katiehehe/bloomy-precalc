import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import ComplexPlane, { type ComplexSpec, type Phasor } from "../../components/ComplexPlane";
import type { LessonFigureProps } from "../types";

const rad = (d: number) => (d * Math.PI) / 180;

/**
 * Per-mode world half-range. The exponential-form view is a real plane, so it
 * needs a bound; the power and multiply views are an AlgebraFlow with no plane.
 */
const HALF: Record<string, number> = { euler: 2.6 };

/** De Moivre's theorem, written out then worked on a clean example. */
const POWER_STEPS: FlowStep[] = [
  { id: "g0", tex: "[r(\\cos t + i\\sin t)]^n" },
  {
    id: "g1",
    show: "s1",
    result: true,
    op: "\\text{raise the modulus, multiply the angle}",
    tex: "r^n(\\cos nt + i\\sin nt)",
  },
  {
    id: "g2",
    show: "s2",
    op: "\\text{worked: } r = 1,\\ t = 30^\\circ,\\ n = 3",
    tex: "(\\cos 30^\\circ + i\\sin 30^\\circ)^3",
  },
  {
    id: "g3",
    show: "s3",
    op: "1^3 = 1,\\ \\ 3 \\cdot 30^\\circ = 90^\\circ",
    tex: "\\cos 90^\\circ + i\\sin 90^\\circ",
  },
  {
    id: "g4",
    show: "s4",
    result: true,
    tone: "good",
    op: "\\cos 90^\\circ = 0,\\ \\ \\sin 90^\\circ = 1",
    tex: "i",
  },
];

/**
 * Why multiplying complex numbers multiplies moduli and adds arguments, and why
 * De Moivre's power rule holds: both fall straight out of the exponent law once
 * the numbers are written in exponential form.
 */
const MULTIPLY_STEPS: FlowStep[] = [
  { id: "m0", tex: "z_1 z_2 = \\left(r_1 e^{i\\theta_1}\\right)\\left(r_2 e^{i\\theta_2}\\right)" },
  { id: "m1", show: "s1", op: "\\text{gather moduli, then the exponentials}", tex: "z_1 z_2 = r_1 r_2 \\, e^{i\\theta_1} e^{i\\theta_2}" },
  {
    id: "m2",
    show: "s2",
    result: true,
    op: "e^{a}e^{b} = e^{a+b}",
    tex: "z_1 z_2 = r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)}",
    note: "\\text{moduli multiply, arguments add}",
  },
  { id: "m3", show: "s3", op: "\\text{a power repeats the multiplication } n \\text{ times}", tex: "z^n = \\left(r e^{i\\theta}\\right)^n" },
  {
    id: "m4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\text{multiply the exponent by } n",
    tex: "z^n = r^n e^{i n\\theta}",
    note: "\\text{De Moivre: } r^n(\\cos n\\theta + i\\sin n\\theta)",
  },
];

/**
 * Because $e^{i\theta} = \cos\theta + i\sin\theta$ makes the exponential and trig
 * forms the same number, the exponent law $e^{i(\alpha+\beta)} = e^{i\alpha}e^{i\beta}$
 * becomes a trig identity: expand each side with Euler's formula, multiply out,
 * and match real with real and imaginary with imaginary to read off the sine and
 * cosine sum formulas at once.
 */
const ANGLE_STEPS: FlowStep[] = [
  { id: "n0", tex: "e^{i(\\alpha+\\beta)} = e^{i\\alpha}\\, e^{i\\beta}", note: "\\text{one fact: arguments add}" },
  {
    id: "n1",
    show: "s1",
    op: "\\text{Euler's formula on the left}",
    tex: "e^{i(\\alpha+\\beta)} = \\cos(\\alpha+\\beta) + i\\sin(\\alpha+\\beta)",
  },
  {
    id: "n2",
    show: "s2",
    op: "\\text{Euler's formula on the right}",
    tex: "\\begin{aligned}e^{i\\alpha} e^{i\\beta} &= (\\cos\\alpha + i\\sin\\alpha) \\\\ &\\quad (\\cos\\beta + i\\sin\\beta)\\end{aligned}",
  },
  {
    id: "n3",
    show: "s3",
    op: "\\text{multiply out (FOIL)}",
    tex: "\\begin{aligned}&\\cos\\alpha\\cos\\beta + i\\cos\\alpha\\sin\\beta \\\\ &{}+ i\\sin\\alpha\\cos\\beta + i^2\\sin\\alpha\\sin\\beta\\end{aligned}",
  },
  {
    id: "n4",
    show: "s4",
    op: "i^2 = -1,\\ \\text{group real and imaginary}",
    tex: "\\begin{aligned}&(\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta) \\\\ &{}+ i(\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)\\end{aligned}",
  },
  {
    id: "n5",
    show: "s5",
    result: true,
    tone: "good",
    op: "\\text{match real and imaginary parts}",
    tex: "\\begin{aligned}\\cos(\\alpha+\\beta) &= \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta \\\\ \\sin(\\alpha+\\beta) &= \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta\\end{aligned}",
  },
];

export default function DeMoivreStage(props: LessonFigureProps) {
  const { reveal, slide } = props;
  const mode = slide.mode ?? "euler";

  if (mode === "euler") {
    // A single point z = r e^{i theta}: it starts on the unit circle (r = 1) as
    // Euler's formula, then scales out to modulus r and drops its legs so the
    // real part r cos(theta) and imaginary part r sin(theta) are visible.
    const scaled = Boolean(reveal.scaled);
    const rLen = scaled ? 2 : 1;
    const th = 50;
    const z: Phasor = {
      re: rLen * Math.cos(rad(th)),
      im: rLen * Math.sin(rad(th)),
      tone: "primary",
      label: "z",
      arc: true,
      arcLabel: "\u03b8",
      rLabel: scaled ? "r" : "1",
      legs: Boolean(reveal.legs),
      legLabelX: reveal.legs ? "r cos \u03b8" : undefined,
      legLabelY: reveal.legs ? "r sin \u03b8" : undefined,
    };
    const spec: ComplexSpec = {
      aria: scaled
        ? "Complex plane with the point z = r e^(i theta) at angle theta, modulus r, showing its real and imaginary legs."
        : "Complex plane with the point e^(i theta) on the unit circle at angle theta.",
      phasors: [z],
      ring: 1,
    };
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <ComplexPlane {...props} spec={spec} half={HALF.euler} />
          </div>
        </div>
      </section>
    );
  }

  if (mode === "multiply") {
    // Pure derivation: the exponent law does the work, so the algebra holds the
    // panel alone with the current line spotlighted.
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={MULTIPLY_STEPS} reveal={reveal} heading={"\\text{multiply in exponential form}"} focus />
          </div>
        </div>
      </section>
    );
  }

  if (mode === "anglesum") {
    // Pure derivation: expand e^{i(alpha+beta)} = e^{i alpha} e^{i beta} with
    // Euler's formula on both sides, then match parts to get the sum formulas.
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={ANGLE_STEPS} reveal={reveal} heading={"\\text{deriving the sum formulas}"} focus />
          </div>
        </div>
      </section>
    );
  }

  // power mode: pure derivation of De Moivre's theorem, so the algebra holds the panel alone.
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={POWER_STEPS} reveal={reveal} heading={"\\text{raise } [r(\\cos t + i\\sin t)]^n"} focus />
        </div>
      </div>
    </section>
  );
}
