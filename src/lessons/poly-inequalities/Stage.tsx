import InequalityGraph, { type IneqSpec } from "../../components/InequalityGraph";
import SignTable, { type SignFactor } from "../../components/SignTable";
import type { LessonFigureProps } from "../types";

const HALF = 5;
const Y_HALF = 10;

const p = (x: number) => (x + 2) * (x - 1) * (x - 3);

const factors: SignFactor[] = [
  { tex: "(x+2)", at: (x) => x + 2 },
  { tex: "(x-1)", at: (x) => x - 1 },
  { tex: "(x-3)", at: (x) => x - 3 },
];

export default function PolyInequalitiesStage(props: LessonFigureProps) {
  const { reveal, values } = props;
  // reveal.inclusive switches the endpoints from strict > (zeros excluded, open
  // circles) to >= (zeros included, filled circles) on the "endpoints" slide.
  const strict = !reveal.inclusive;
  const spec: IneqSpec = {
    f: p,
    zeros: [-2, 1, 3],
    solution: { strict, intervals: [[-2, 1], [3, Infinity]] },
    aria: strict
      ? "Cubic (x+2)(x-1)(x-3): crosses the x-axis at -2, 1, and 3. Positive on (-2, 1) and (3, infinity), endpoints drawn open."
      : "Cubic (x+2)(x-1)(x-3): p(x) is greater than or equal to zero on [-2, 1] and [3, infinity), endpoints drawn filled.",
  };
  const x = (values.x ?? 0) / 100;
  const showTable = Boolean(reveal.signs);

  return (
    <section className="figure-area">
      <div className={`figure-frame${showTable ? " figure-frame--split" : ""}`}>
        <div className="figure-slot">
          <InequalityGraph {...props} reveal={reveal} spec={spec} half={HALF} yHalf={Y_HALF} />
        </div>
        {showTable && (
          <div className="figure-dock figure-dock--table">
            <SignTable factors={factors} boundaries={spec.zeros} x={x} productTex="p(x)" />
          </div>
        )}
      </div>
    </section>
  );
}
