import InequalityGraph, { type IneqSpec } from "../../components/InequalityGraph";
import SignTable, { type SignFactor } from "../../components/SignTable";
import type { LessonFigureProps } from "../types";

const HALF = 5;
const Y_HALF = 12;

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
  aria: "Rational function (x-3)/(x+1): zero at x=3, wall at x=-1. Positive left of -1 and right of 3.",
};

export default function RationalInequalitiesStage(props: LessonFigureProps) {
  const { reveal, values } = props;
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
            <SignTable
              factors={factors}
              boundaries={[...spec.zeros, ...(spec.vas ?? [])]}
              x={x}
              productTex="r(x)"
            />
          </div>
        )}
      </div>
    </section>
  );
}
