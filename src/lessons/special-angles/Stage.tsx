import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";
import SpecialCircle, { Triangle30, Triangle45 } from "./Figure";
import { angleAt, FAMILIES, familyIndex, UNDEF } from "./values";

const SCALE45: FlowStep[] = [
  { id: "a0", tex: "\\text{legs } 1,\\ 1 \\quad \\text{hypotenuse unknown}" },
  {
    id: "a1",
    show: "s1",
    op: "\\text{Pythagoras}",
    tex: "\\text{hypotenuse}=\\sqrt{1^2+1^2}=\\sqrt{2}",
  },
  {
    id: "a2",
    show: "s2",
    op: "\\text{divide every side by } \\sqrt{2}",
    tex: "\\dfrac{1}{\\sqrt{2}},\\quad \\dfrac{1}{\\sqrt{2}},\\quad 1",
  },
  {
    id: "a3",
    show: "s3",
    tone: "cancel",
    op: "\\text{rationalize: multiply by } \\dfrac{\\sqrt{2}}{\\sqrt{2}}",
    tex: "\\dfrac{1}{\\sqrt{2}}\\cdot\\dfrac{\\sqrt{2}}{\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2}",
  },
  {
    id: "a4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\cos 45^\\circ=\\sin 45^\\circ",
    tex: "\\left(\\dfrac{\\sqrt{2}}{2},\\ \\dfrac{\\sqrt{2}}{2}\\right)",
  },
];

const SCALE30: FlowStep[] = [
  { id: "b0", tex: "\\text{equilateral of side } 2,\\ \\text{cut in half}" },
  {
    id: "b1",
    show: "s1",
    op: "\\text{Pythagoras on the half}",
    tex: "1:\\sqrt{3}:2",
  },
  {
    id: "b2",
    show: "s2",
    op: "\\text{divide every side by } 2",
    tex: "\\tfrac{1}{2}:\\tfrac{\\sqrt{3}}{2}:1",
  },
  {
    id: "b3",
    show: "s3",
    op: "\\text{at } 30^\\circ \\text{ the short leg is opposite}",
    tex: "\\sin 30^\\circ=\\tfrac12,\\quad \\cos 30^\\circ=\\tfrac{\\sqrt{3}}{2}",
  },
  {
    id: "b4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\text{the point is } (\\cos,\\sin)",
    tex: "\\left(\\tfrac{\\sqrt{3}}{2},\\ \\tfrac12\\right)",
  },
];

const TABLE_COLS = [
  { key: "sin", head: "\\sin", field: "sinTex" },
  { key: "cos", head: "\\cos", field: "cosTex" },
  { key: "tan", head: "\\tan", field: "tanTex" },
  { key: "cot", head: "\\cot", field: "cotTex" },
  { key: "sec", head: "\\sec", field: "secTex" },
  { key: "csc", head: "\\csc", field: "cscTex" },
] as const;

function SpecialAngleTable({
  family,
  currentDeg,
}: {
  family: number[];
  currentDeg: number;
}) {
  return (
    <div className="special-angle-table-wrap">
      <table className="special-angle-table">
        <thead>
          <tr>
            <th scope="col">
              <Tex>{"\\theta"}</Tex>
            </th>
            {TABLE_COLS.map((col) => (
              <th key={col.key} scope="col">
                <Tex>{col.head}</Tex>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {family.map((d) => {
            const a = angleAt(d);
            return (
              <tr key={d} className={d === currentDeg ? "is-current" : undefined}>
                <th scope="row">
                  <Tex>{`${d}^{\\circ}`}</Tex>
                </th>
                {TABLE_COLS.map((col) => {
                  const tex = a[col.field];
                  const undef = tex === UNDEF;
                  return (
                    <td key={col.key} className={undef ? "is-undef" : undefined}>
                      <Tex>{tex}</Tex>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function SpecialAnglesStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "axis";

  if (mode === "scale45") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <div className="special-scale-stage">
              <AlgebraFlow
                steps={SCALE45}
                reveal={reveal}
                heading={"\\text{scale the } 45^\\circ\\text{-}45^\\circ\\text{-}90^\\circ \\text{ so the hypotenuse is } 1"}
                header={<Triangle45 reveal={reveal} />}
                focus
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "scale30") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <div className="special-scale-stage">
              <AlgebraFlow
                steps={SCALE30}
                reveal={reveal}
                heading={"\\text{scale the } 30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ \\text{ so the hypotenuse is } 1"}
                header={<Triangle30 reveal={reveal} />}
                focus
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const family = FAMILIES[mode] ?? FAMILIES.axis;
  const deg = family[familyIndex(values.k ?? 0, family)] ?? 0;

  return (
    <section className="figure-area has-dock">
      <div className="figure-frame figure-frame--split figure-frame--special">
        <div className="figure-slot">
          <div className="special-angle-stage">
            <SpecialCircle {...props} />
          </div>
        </div>
        <div className="figure-dock figure-dock--table special-angle-dock">
          <SpecialAngleTable family={family} currentDeg={deg} />
        </div>
      </div>
    </section>
  );
}
