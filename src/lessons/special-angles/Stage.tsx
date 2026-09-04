import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import FigureReadout from "../../components/FigureReadout";
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

function readoutLines(deg: number, reveal: LessonFigureProps["reveal"]): string[] {
  const a = angleAt(deg);
  const lines: string[] = [];
  if (reveal.readout) {
    lines.push(`\\theta = ${deg}^\\circ`);
    lines.push(`(\\cos\\theta,\\sin\\theta)=\\left(${a.cosTex},\\ ${a.sinTex}\\right)`);
  }
  if (reveal.allSix) {
    const tan = a.tanTex === UNDEF ? UNDEF : a.tanTex;
    const sec = a.secTex === UNDEF ? UNDEF : a.secTex;
    const csc = a.cscTex === UNDEF ? UNDEF : a.cscTex;
    const cot = a.cotTex === UNDEF ? UNDEF : a.cotTex;
    lines.push(`\\tan\\theta=${tan},\\quad \\sec\\theta=${sec}`);
    lines.push(`\\csc\\theta=${csc},\\quad \\cot\\theta=${cot}`);
  }
  return lines;
}

export default function SpecialAnglesStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "axis";

  if (mode === "scale45") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={SCALE45}
              reveal={reveal}
              heading={"\\text{scale the } 45^\\circ\\text{-}45^\\circ\\text{-}90^\\circ \\text{ so the hypotenuse is } 1"}
              header={<Triangle45 reveal={reveal} />}
              focus
            />
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
            <AlgebraFlow
              steps={SCALE30}
              reveal={reveal}
              heading={"\\text{scale the } 30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ \\text{ so the hypotenuse is } 1"}
              header={<Triangle30 reveal={reveal} />}
              focus
            />
          </div>
        </div>
      </section>
    );
  }

  const family = FAMILIES[mode] ?? FAMILIES.axis;
  const deg = family[familyIndex(values.k ?? 0, family)] ?? 0;
  const heading =
    mode === "recip" || reveal.allSix
      ? "\\text{all six functions from } (\\cos\\theta,\\sin\\theta)"
      : "\\cos\\theta=x,\\quad \\sin\\theta=y";

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <FigureReadout
            align="top"
            figure={<SpecialCircle {...props} />}
            heading={heading}
            lines={readoutLines(deg, reveal)}
          />
        </div>
      </div>
    </section>
  );
}
