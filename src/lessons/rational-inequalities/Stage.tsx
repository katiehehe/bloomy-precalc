import Tex from "../../components/Tex";
import InequalityGraph, { type IneqSpec } from "../../components/InequalityGraph";
import SignTable, { type SignFactor } from "../../components/SignTable";
import type { LessonFigureProps } from "../types";

const HALF = 5;

const r = (x: number) => (x - 3) / (x + 1);

const factors: SignFactor[] = [
  { tex: "(x-3)", at: (x) => x - 3 },
  { tex: "(x+1)", at: (x) => x + 1 },
];

const spec: IneqSpec = {
  f: r,
  vas: [-1],
  zeros: [3],
  solution: { strict: true, intervals: [[-Infinity, -1], [3, Infinity]] },
  aria: "Rational function (x-3)/(x+1): zero at x=3, wall at x=-1; positive left of -1 and right of 3.",
};

const sgn = (v: number) => (v > 1e-9 ? "+" : v < -1e-9 ? "-" : "0");

export default function RationalInequalitiesStage(props: LessonFigureProps) {
  const { reveal, values } = props;
  const x = (values.x ?? 0) / 100;
  const y = r(x);
  const defined = Number.isFinite(y) && Math.abs(x + 1) > 0.02;
  const cmp = Math.abs(y) < 1e-9 ? "=" : y > 0 ? ">" : "<";
  const showDock = Boolean(reveal.readout);
  const overset = `r(x)=\\dfrac{\\overset{${sgn(x - 3)}}{(x-3)}}{\\overset{${sgn(x + 1)}}{(x+1)}}`;

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <InequalityGraph {...props} reveal={reveal} spec={spec} half={HALF} />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{overset}</Tex>
              {defined ? (
                <Tex>{`r(${x.toFixed(2)}) \\; ${cmp} \\; 0`}</Tex>
              ) : (
                <Tex>{`r(${x.toFixed(2)}) \\; \\text{is undefined}`}</Tex>
              )}
            </div>
            {reveal.signs && (
              <SignTable factors={factors} boundaries={[...spec.zeros, ...(spec.vas ?? [])]} x={x} productTex="r(x)" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
