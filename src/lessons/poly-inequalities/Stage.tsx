import Tex from "../../components/Tex";
import InequalityGraph, { type IneqSpec } from "../../components/InequalityGraph";
import SignTable, { type SignFactor } from "../../components/SignTable";
import type { LessonFigureProps } from "../types";

const HALF = 5;

const p = (x: number) => (x + 2) * (x - 1) * (x - 3);

const factors: SignFactor[] = [
  { tex: "(x+2)", at: (x) => x + 2 },
  { tex: "(x-1)", at: (x) => x - 1 },
  { tex: "(x-3)", at: (x) => x - 3 },
];

const spec: IneqSpec = {
  f: p,
  zeros: [-2, 1, 3],
  solution: { strict: true, intervals: [[-2, 1], [3, Infinity]] },
  aria: "Cubic (x+2)(x-1)(x-3): crosses the x-axis at -2, 1, and 3; positive on (-2, 1) and (3, infinity).",
};

const sgn = (v: number) => (v > 1e-9 ? "+" : v < -1e-9 ? "-" : "0");

export default function PolyInequalitiesStage(props: LessonFigureProps) {
  const { reveal, values } = props;
  const x = (values.x ?? 0) / 100;
  const y = spec.f(x);
  const cmp = Math.abs(y) < 1e-9 ? "=" : y > 0 ? ">" : "<";
  const showDock = Boolean(reveal.readout);
  const overset = `p(x)=\\overset{${sgn(x + 2)}}{(x+2)}\\,\\overset{${sgn(x - 1)}}{(x-1)}\\,\\overset{${sgn(x - 3)}}{(x-3)}`;

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
              <Tex>{`p(${x.toFixed(2)}) \\; ${cmp} \\; 0`}</Tex>
            </div>
            {reveal.signs && <SignTable factors={factors} boundaries={spec.zeros} x={x} productTex="p(x)" />}
          </div>
        )}
      </div>
    </section>
  );
}
