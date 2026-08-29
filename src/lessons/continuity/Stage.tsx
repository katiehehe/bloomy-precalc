import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import CurvePlane, {
  type CurveSpec,
  type CurveSeg,
  type CurveLine,
  type CurvePoint,
  type CurveGuide,
  type CurveLabel,
} from "../../components/CurvePlane";
import type { LessonFigureProps } from "../types";

/**
 * Continuity and its three failure modes, drawn with the shared CurvePlane. Each
 * slide mode reads a fixed set of reveal flags (kept in sync with slides.ts, so
 * every flag read here is set by some beat and there are zero dead flags):
 *
 *   three:     curve (parabola), dot (2,2), approach (x=2 guide), level (y=2 guide)
 *   removable: curve (line x+2), fact + canc (AlgebraFlow steps), hole (open 2,4),
 *              patch (closed 2,4 filling the hole)
 *   jump:      curve (two branches), openDot (1,2), closedDot (1,4), gap (jump=2)
 *   infinite:  curve (1/(x-2)), wall (x=2 asymptote), signs (+inf / -inf labels)
 *   yourturn:  curve (line x+2). The hole and the movable point follow values.v
 */

const HALF = 6;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

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

/** Slide 2: factor the numerator, then cancel (x - 2) to expose the line x + 2. */
const REMOVABLE_STEPS: FlowStep[] = [
  { id: "r0", tex: "g(x) = \\dfrac{x^2 - 4}{x - 2}" },
  {
    id: "r1",
    show: "fact",
    op: "\\text{factor: difference of squares}",
    tex: "= \\dfrac{(x - 2)(x + 2)}{x - 2}",
  },
  {
    id: "r2",
    show: "canc",
    tone: "good",
    result: true,
    op: "\\text{cancel } (x - 2),\\ x \\ne 2",
    tex: "= \\dfrac{\\cancel{(x - 2)}\\,(x + 2)}{\\cancel{x - 2}} = x + 2",
    note: "\\lim_{x \\to 2} g(x) = 4,\\ \\text{but } g(2)\\ \\text{is undefined: a hole}",
  },
];

export default function ContinuityStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "three";

  // Slide 1: the three conditions on a smooth parabola at x = 2.
  if (mode === "three") {
    const f = (x: number) => 0.5 * x * x;
    const points: CurvePoint[] = [];
    if (reveal.dot) points.push({ x: 2, y: 2, kind: "closed", tone: "primary", label: "(2, 2)" });
    const vlines: CurveGuide[] = [];
    const hlines: CurveGuide[] = [];
    if (reveal.approach) vlines.push({ at: 2, tone: "muted", label: "x = 2" });
    if (reveal.level) hlines.push({ at: 2, tone: "muted", label: "y = 2" });
    const spec: CurveSpec = {
      curves: reveal.curve ? [{ f, tone: "primary" }] : [],
      points,
      vlines,
      hlines,
      aria:
        "A smooth parabola f(x) = one half x squared, continuous at x = 2, where the filled point (2, 2) sits on the curve and the dashed guides x = 2 and y = 2 meet there.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\text{Continuous at } x = a \\text{ needs all three:}"}</Tex>
        {reveal.dot && <Tex>{"1)\\ f(2) = \\tfrac{1}{2}(2)^2 = 2\\ \\text{(defined)}"}</Tex>}
        {reveal.approach && <Tex>{"2)\\ \\lim_{x \\to 2} f(x) = 2\\ \\text{(exists)}"}</Tex>}
        {reveal.level && <Tex>{"3)\\ \\lim_{x \\to 2} f(x) = f(2) = 2\\ \\checkmark"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  // Slide 2: removable hole, with a factor-and-cancel derivation docked.
  if (mode === "removable") {
    const flowReveal = { fact: Boolean(reveal.fact), canc: Boolean(reveal.canc) };
    const points: CurvePoint[] = [];
    // The patch (a filled dot) replaces the open hole once it is placed.
    if (reveal.patch) points.push({ x: 2, y: 4, kind: "closed", tone: "teal", label: "g(2) = 4" });
    else if (reveal.hole) points.push({ x: 2, y: 4, kind: "open", tone: "primary", label: "hole (2, 4)" });
    const spec: CurveSpec = {
      curves: reveal.curve ? [{ f: (x) => x + 2, tone: "muted" }] : [],
      points,
      aria:
        "The line y = x + 2 with an open hole at (2, 4). Defining g(2) = 4 drops a filled point into the hole.",
    };
    const dock = (
      <AlgebraFlow
        steps={REMOVABLE_STEPS}
        reveal={flowReveal}
        heading={"\\text{simplify } g \\text{ away from } x = 2"}
        align="start"
      />
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  // Slide 3: piecewise jump at x = 1.
  if (mode === "jump") {
    const left = (x: number) => x + 1;
    const right = (x: number) => x + 3;
    const curves: CurveSeg[] = [];
    if (reveal.curve) {
      curves.push({ f: left, from: -HALF, to: 1, tone: "primary" });
      curves.push({ f: right, from: 1, to: HALF, tone: "teal" });
    }
    const points: CurvePoint[] = [];
    if (reveal.openDot) points.push({ x: 1, y: 2, kind: "open", tone: "primary", label: "left limit 2" });
    if (reveal.closedDot) points.push({ x: 1, y: 4, kind: "closed", tone: "teal", label: "f(1) = 4" });
    const lines: CurveLine[] = [];
    if (reveal.gap) lines.push({ x1: 1, y1: 2, x2: 1, y2: 4, tone: "muted", dashed: true, label: "jump = 2" });
    const spec: CurveSpec = {
      curves,
      points,
      lines,
      aria:
        "A piecewise graph: y = x + 1 for x < 1 ending at an open circle (1, 2), and y = x + 3 for x at least 1 starting at a filled point (1, 4), a jump of 2.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"f(x) = \\begin{cases} x + 1 & x < 1 \\\\ x + 3 & x \\ge 1 \\end{cases}"}</Tex>
        {reveal.openDot && <Tex>{"\\lim_{x \\to 1^-} f(x) = 2"}</Tex>}
        {reveal.closedDot && <Tex>{"\\lim_{x \\to 1^+} f(x) = 4,\\ f(1) = 4"}</Tex>}
        {reveal.gap && <Tex>{"2 \\ne 4 \\;\\Rightarrow\\; \\lim_{x \\to 1} f(x)\\ \\text{DNE}"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  // Slide 4: infinite discontinuity (vertical asymptote) of 1/(x - 2).
  if (mode === "infinite") {
    const f = (x: number) => 1 / (x - 2);
    const vlines: CurveGuide[] = [];
    if (reveal.wall) vlines.push({ at: 2, tone: "accent", label: "x = 2 (wall)" });
    const labels: CurveLabel[] = [];
    if (reveal.signs) {
      labels.push({ x: 2.7, y: 5.2, text: "+\u221e", tone: "accent" });
      labels.push({ x: 1.3, y: -5.2, text: "-\u221e", tone: "accent", anchor: "end" });
    }
    const spec: CurveSpec = {
      curves: reveal.curve ? [{ f, tone: "primary" }] : [],
      vlines,
      labels,
      aria:
        "The curve y = 1/(x - 2) with a vertical asymptote at x = 2. It rises to positive infinity just right of 2 and falls to negative infinity just left of 2.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"f(x) = \\dfrac{1}{x - 2}"}</Tex>
        {reveal.wall && <Tex>{"x = 2:\\ \\tfrac{1}{0}\\ \\text{is undefined (a wall)}"}</Tex>}
        {reveal.signs && <Tex>{"x \\to 2^+:\\ f \\to +\\infty\\qquad x \\to 2^-:\\ f \\to -\\infty"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  // Slide 5: your turn. Slide the value f(2) = v/10 until it fills the hole at 4.
  const v = clamp(Math.round(values.v ?? 10), 0, 50);
  const height = v / 10;
  const continuous = v === 40; // value 4 equals the limit
  const points: CurvePoint[] = [];
  if (!continuous) points.push({ x: 2, y: 4, kind: "open", tone: "muted", label: "hole" });
  points.push({
    x: 2,
    y: height,
    kind: "closed",
    tone: continuous ? "teal" : "accent",
    label: `f(2) = ${height.toFixed(1)}`,
  });
  const spec: CurveSpec = {
    curves: reveal.curve ? [{ f: (x) => x + 2, tone: "muted" }] : [],
    points,
    aria: continuous
      ? "The line y = x + 2 with the movable filled point resting in the hole at (2, 4), so the graph is continuous."
      : "The line y = x + 2 with an open hole at (2, 4) and a filled point at x = 2 sitting off the curve, so the graph is discontinuous.",
  };
  const dock = (
    <div className="formula-list">
      <Tex>{"g(x) = x + 2\\ (x \\ne 2),\\quad \\lim_{x \\to 2} g(x) = 4"}</Tex>
      {continuous ? (
        <Tex>{`f(2) = ${height.toFixed(1)} = 4 = \\lim,\\ \\text{continuous}`}</Tex>
      ) : (
        <Tex>{`f(2) = ${height.toFixed(1)} \\ne 4 = \\lim,\\ \\text{discontinuous}`}</Tex>
      )}
    </div>
  );
  return frame(<CurvePlane spec={spec} half={HALF} />, dock);
}
