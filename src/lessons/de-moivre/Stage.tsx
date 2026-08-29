import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import AngleCircle, { type CircleAngle } from "../../components/AngleCircle";
import ComplexPlane, { type ComplexSpec } from "../../components/ComplexPlane";
import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";

/**
 * Per-mode world half-range. Roots of unity sit on the unit circle, so a small
 * 1.8 keeps them large and clickable; the power view is an AlgebraFlow, so its
 * value only exists for the harness to read.
 */
const HALF: Record<string, number> = { roots: 1.8, power: 3 };

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

export default function DeMoivreStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "roots";

  if (mode === "power") {
    const angles: CircleAngle[] = [
      { deg: 30, label: "t", tone: "theta" },
      { deg: 90, label: "nt", tone: "sum" },
    ];
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={POWER_STEPS}
              reveal={reveal}
              heading={"\\text{raise } [r(\\cos t + i\\sin t)]^n"}
              header={<AngleCircle angles={angles} focus={90} />}
            />
          </div>
        </div>
      </section>
    );
  }

  // roots mode
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
          <ComplexPlane {...props} spec={spec} half={HALF[mode] ?? 2.4} />
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
