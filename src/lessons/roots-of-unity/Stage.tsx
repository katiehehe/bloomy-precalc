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

export default function RootsOfUnityStage(props: LessonFigureProps) {
  const { reveal, values } = props;
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
