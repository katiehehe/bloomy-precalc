import Tex from "../../components/Tex";
import ComplexPlane, {
  type ComplexPoint,
  type ComplexSegment,
  type ComplexSpec,
  type Phasor,
} from "../../components/ComplexPlane";
import type { LessonFigureProps } from "../types";

const HALF = 5.5;

const clamp = (n: number) => Math.max(-5, Math.min(5, Math.round(n)));
const sq = (n: number) => (n < 0 ? `(${n})^2` : `${n}^2`);
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};

export default function ModulusArgumentStage(props: LessonFigureProps) {
  const { reveal, values, setValue, slide } = props;

  if (slide.mode === "distance") {
    // Two fixed points chosen so the gaps are 3 and 4 (a 3-4-5 triangle).
    const z1 = { re: 4, im: 5 };
    const z2 = { re: 1, im: 1 };
    const dRe = z1.re - z2.re;
    const dIm = z1.im - z2.im;
    const dist = Math.hypot(dRe, dIm);
    const points: ComplexPoint[] = reveal.pts
      ? [
          { re: z2.re, im: z2.im, tone: "a", label: "z\u2082" },
          { re: z1.re, im: z1.im, tone: "b", label: "z\u2081" },
        ]
      : [];
    const segments: ComplexSegment[] = [];
    if (reveal.legs) {
      segments.push({
        from: z2,
        to: { re: z1.re, im: z2.im },
        tone: "a",
        dashed: true,
        label: String(Math.abs(dRe)),
        labelDy: 20,
      });
      segments.push({
        from: { re: z1.re, im: z2.im },
        to: z1,
        tone: "b",
        dashed: true,
        label: String(Math.abs(dIm)),
        labelDx: 14,
        labelDy: 4,
      });
    }
    if (reveal.seg) {
      segments.push({
        from: z2,
        to: z1,
        tone: "primary",
        label: reveal.dist ? trim(dist) : undefined,
        labelDx: -16,
      });
    }
    const spec: ComplexSpec = {
      aria: `Complex plane showing z1 at 4 plus 5i and z2 at 1 plus i, joined by a segment of length ${trim(dist)}.`,
      phasors: [],
      points,
      segments,
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
                <Tex>{"z_1 = 4 + 5i, \\quad z_2 = 1 + i"}</Tex>
                {reveal.legs && <Tex>{"z_1 - z_2 = 3 + 4i"}</Tex>}
                {reveal.dist && <Tex>{"|z_1 - z_2| = \\sqrt{3^2 + 4^2} = 5"}</Tex>}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

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
