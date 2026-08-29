import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, { type ConicSpec } from "../../components/ConicPlane";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

const HALF = 6;

/** Completing the square on x^2 + y^2 - 4x - 6y + 9 = 0, one line at a time. */
const COMPLETE: FlowStep[] = [
  { id: "k0", tex: "x^2 + y^2 - 4x - 6y + 9 = 0" },
  {
    id: "k1",
    show: "e1",
    op: "\\text{group } x\\text{'s and } y\\text{'s}",
    tex: "(x^2 - 4x) + (y^2 - 6y) + 9 = 0",
  },
  {
    id: "k2",
    show: "e2",
    op: "\\text{complete each square}",
    tex: "(x - 2)^2 - 4 + (y - 3)^2 - 9 + 9 = 0",
  },
  {
    id: "k3",
    show: "e3",
    op: "\\text{combine } -4 - 9 + 9 = -4",
    tex: "(x - 2)^2 + (y - 3)^2 = 4",
  },
  {
    id: "k4",
    show: "e4",
    tone: "good",
    result: true,
    op: "\\text{read center and radius}",
    tex: "\\text{circle: center } (2, 3),\\ r = 2",
  },
];

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode) {
  const showDock = Boolean(dock);
  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}

export default function ConicsClassStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "general";
  const showDock = Boolean(reveal.dock);

  // Slide 2: completing the square writes itself; A = C = 1 => circle.
  if (mode === "complete") {
    const flowReveal = {
      e1: Boolean(reveal.e1),
      e2: Boolean(reveal.e2),
      e3: Boolean(reveal.e3),
      e4: Boolean(reveal.e4),
    };
    return frame(
      <AlgebraFlow steps={COMPLETE} reveal={flowReveal} heading={"\\text{complete the square: } A = C = 1 \\Rightarrow \\text{circle}"} />,
      showDock ? (
        <div className="formula-list">
          <Tex>{"A = 1,\\quad C = 1 \\quad (A = C)"}</Tex>
          <Tex>{"(x - h)^2 + (y - k)^2 = r^2"}</Tex>
        </div>
      ) : null,
    );
  }

  // Slide 5: morph x^2 + C y^2 = 4 with the C dial (A = 1 fixed).
  if (mode === "yourturn") {
    const c = Math.round(values.c ?? 4);
    let spec: ConicSpec;
    let kindLabel: string;
    if (c > 0) {
      if (c === 1) {
        spec = { kind: "circle", r: 2, center: true, aria: "A circle of radius 2 from x squared plus y squared equals 4." };
        kindLabel = "\\text{circle} \\;(A = C)";
      } else {
        const b = 2 / Math.sqrt(c);
        spec = {
          kind: "ellipse",
          a: 2,
          b,
          center: true,
          aria: `An ellipse from x squared plus ${c} y squared equals 4, wider than it is tall.`,
        };
        kindLabel = "\\text{ellipse} \\;(AC > 0,\\ A \\ne C)";
      }
    } else if (c < 0) {
      const b = 2 / Math.sqrt(Math.abs(c));
      spec = {
        kind: "hyperbola",
        a: 2,
        b,
        orient: "h",
        asymptotes: true,
        aria: `A hyperbola from x squared minus ${Math.abs(c)} y squared equals 4, opening left and right.`,
      };
      kindLabel = "\\text{hyperbola} \\;(AC < 0)";
    } else {
      spec = {
        kind: "linepair",
        orient: "v",
        gap: 2,
        aria: "The degenerate case x squared equals 4: two vertical lines at x equals plus and minus 2.",
      };
      kindLabel = "\\text{degenerate: lines } x = \\pm 2";
    }
    const mag = Math.abs(c);
    const coefTex = mag === 1 ? "" : String(mag);
    const eq =
      c === 0
        ? "x^2 = 4"
        : c > 0
          ? `x^2 + ${coefTex}y^2 = 4`
          : `x^2 - ${coefTex}y^2 = 4`;
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{`${eq} \\qquad A = 1,\\ C = ${c}`}</Tex>
        <Tex>{`AC = ${c}`}</Tex>
        <Tex>{`\\Rightarrow ${kindLabel}`}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} />, dock);
  }

  // Slides 1, 3, 4: classify from the general form, then reveal the curve.
  const ac = Boolean(reveal.ac);
  const verdict = Boolean(reveal.verdict);
  const curve = Boolean(reveal.curve);

  let spec: ConicSpec;
  let equation: string;
  let aLine: string;
  let verdictTex: string;

  if (mode === "hyperbola") {
    spec = {
      kind: "hyperbola",
      a: 2,
      b: 2,
      orient: "h",
      asymptotes: true,
      aria: "A hyperbola x squared over 4 minus y squared over 4 equals 1, two branches opening left and right with asymptotes y equals plus and minus x.",
    };
    equation = "x^2 - y^2 - 4 = 0";
    aLine = "A = 1,\\quad C = -1 \\quad (\\text{opposite signs})";
    verdictTex = "AC = -1 < 0 \\Rightarrow \\text{hyperbola}";
  } else if (mode === "parabola") {
    spec = {
      kind: "parabola",
      h: 2,
      k: 0,
      coeff: 1,
      orient: "v",
      center: true,
      aria: "A parabola y equals x minus 2, squared, with vertex at (2, 0) opening up.",
    };
    equation = "x^2 - 4x - y + 4 = 0";
    aLine = "A = 1,\\quad C = 0 \\quad (\\text{no } y^2)";
    verdictTex = "AC = 0 \\Rightarrow \\text{parabola}";
  } else {
    // general: the ellipse example
    spec = {
      kind: "ellipse",
      a: 3,
      b: 2,
      center: true,
      aria: "An ellipse x squared over 9 plus y squared over 4 equals 1, semi-axis 3 across and 2 up.",
    };
    equation = "4x^2 + 9y^2 - 36 = 0";
    aLine = "A = 4,\\quad C = 9 \\quad (\\text{same sign})";
    verdictTex = "AC = 36 > 0,\\ A \\ne C \\Rightarrow \\text{ellipse}";
  }

  const dock = showDock ? (
    <div className="formula-list">
      <Tex>{equation}</Tex>
      {ac && <Tex>{aLine}</Tex>}
      {verdict && <Tex>{verdictTex}</Tex>}
    </div>
  ) : null;

  return frame(<ConicPlane spec={spec} half={HALF} showCurve={curve} />, dock);
}
