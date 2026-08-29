import Tex from "../../components/Tex";
import ComplexPlane, { type ComplexSpec, type Phasor } from "../../components/ComplexPlane";
import type { LessonFigureProps } from "../types";

const HALF = 5.5;

const clamp = (n: number) => Math.max(-5, Math.min(5, Math.round(n)));
const sq = (n: number) => (n < 0 ? `(${n})^2` : `${n}^2`);
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};

export default function ModulusArgumentStage(props: LessonFigureProps) {
  const { reveal, values, setValue } = props;
  const re = clamp(values.re ?? 3);
  const im = clamp(values.im ?? 4);
  const r = Math.hypot(re, im);
  const deg = (Math.atan2(im, re) * 180) / Math.PI;

  const phasor: Phasor = {
    re,
    im,
    tone: "primary",
    label: reveal.z ? "z" : undefined,
    legs: Boolean(reveal.legs),
    arc: Boolean(reveal.arg),
    arcLabel: reveal.arg ? "\u03b8" : undefined,
    rLabel: reveal.modulus ? "r" : undefined,
  };

  const spec: ComplexSpec = {
    aria: `Complex plane with z = ${re} + ${im}i, modulus ${trim(r)} and argument about ${trim(deg)} degrees.`,
    phasors: reveal.z ? [phasor] : [],
  };

  const showDock = Boolean(reveal.dock);
  const originless = re === 0 && im === 0;

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ComplexPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={(wx, wy) => {
              setValue("re", () => clamp(wx));
              setValue("im", () => clamp(wy));
            }}
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{`z = ${re} ${im < 0 ? "-" : "+"} ${Math.abs(im)}i`}</Tex>
              <Tex>{`|z| = \\sqrt{${sq(re)} + ${sq(im)}} = ${trim(r)}`}</Tex>
              {originless ? (
                <Tex>{"\\arg z = \\text{undefined}"}</Tex>
              ) : (
                <Tex>{`\\arg z \\approx ${trim(deg)}^\\circ`}</Tex>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
