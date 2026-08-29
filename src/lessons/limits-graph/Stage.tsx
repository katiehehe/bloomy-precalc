import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import CurvePlane, {
  type CurveSpec,
  type CurveSeg,
  type CurvePoint,
  type CurveGuide,
} from "../../components/CurvePlane";
import PlotMarkers from "../../components/PlotMarkers";
import type { Plane } from "../../components/Plane";
import type { LessonFigureProps } from "../types";

/**
 * Limits from graphs and tables, drawn with the shared CurvePlane. The removable
 * hole rides the line y = x + 2 (an open point at the missing value). The jump is
 * two curve segments split at x = 2 with one closed and one open endpoint. Dashed
 * vertical/horizontal guides mark x = a and the limit heights. Left-side pieces
 * are teal, right-side pieces are accent, the main curve is primary.
 *
 * Reveal flags read here (kept in sync with slides.ts. Zero dead flags):
 *   approach: curve, hole, approach, table, limit
 *   onesided: curve, hole, left, right, twoSided
 *   value:    curve, hole, value, limit, gap
 *   jump:     leftBranch, rightBranch, marks, dne
 *   yourturn: curve, hole   (the plot click + solved target draw over the curve)
 */

const HALF = 6;
const line = (x: number) => x + 2; // g(x) = h(x) = x + 2 away from the hole
const leftRule = (x: number) => x - 1; // p(x) for x <= 2
const rightRule = (x: number) => x + 1; // p(x) for x > 2

/** Shared frame: a figure slot with an optional readout dock beneath it. */
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

export default function LimitsGraphStage(props: LessonFigureProps) {
  const { slide, reveal, plot, interactive } = props;
  const mode = slide.mode ?? "approach";

  if (mode === "onesided") {
    const curves: CurveSeg[] = reveal.curve ? [{ f: line, tone: "primary" }] : [];
    const points: CurvePoint[] = [];
    if (reveal.hole) points.push({ x: 2, y: 4, kind: "open", tone: "primary" });
    if (reveal.left) points.push({ x: 1.4, y: line(1.4), kind: "closed", tone: "teal", label: "left" });
    if (reveal.right) points.push({ x: 2.6, y: line(2.6), kind: "closed", tone: "accent", label: "right" });
    const hlines: CurveGuide[] = reveal.twoSided ? [{ at: 4, tone: "muted", label: "y = 4" }] : [];
    const spec: CurveSpec = {
      curves,
      points,
      hlines,
      aria:
        "The line y = x + 2 with a hole at (2, 4), a teal point approaching from the left and an accent point approaching from the right, both heading to height 4.",
    };
    const showDock = Boolean(reveal.left || reveal.right || reveal.twoSided);
    const dock = showDock ? (
      <div className="formula-list">
        {reveal.left && <Tex>{"\\lim_{x \\to 2^{-}} g(x) = 4 \\quad (\\text{from the left})"}</Tex>}
        {reveal.right && <Tex>{"\\lim_{x \\to 2^{+}} g(x) = 4 \\quad (\\text{from the right})"}</Tex>}
        {reveal.twoSided && <Tex>{"\\text{both agree, so } \\lim_{x \\to 2} g(x) = 4"}</Tex>}
      </div>
    ) : null;
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "value") {
    const curves: CurveSeg[] = reveal.curve ? [{ f: line, tone: "primary" }] : [];
    const points: CurvePoint[] = [];
    if (reveal.hole) points.push({ x: 2, y: 4, kind: "open", tone: "primary", label: "hole" });
    if (reveal.value) points.push({ x: 2, y: 1, kind: "closed", tone: "accent", label: "h(2) = 1" });
    const vlines: CurveGuide[] = reveal.gap ? [{ at: 2, tone: "muted" }] : [];
    const hlines: CurveGuide[] = reveal.limit ? [{ at: 4, tone: "teal", label: "y = 4" }] : [];
    const spec: CurveSpec = {
      curves,
      points,
      vlines,
      hlines,
      aria:
        "The line y = x + 2 with an open hole at (2, 4) marking the limit and a filled dot at (2, 1) marking the value h(2).",
    };
    const showDock = Boolean(reveal.value || reveal.limit || reveal.gap);
    const dock = showDock ? (
      <div className="formula-list">
        {reveal.value && <Tex>{"h(2) = 1 \\quad (\\text{the filled dot})"}</Tex>}
        {reveal.limit && <Tex>{"\\lim_{x \\to 2} h(x) = 4 \\quad (\\text{the hole height})"}</Tex>}
        {reveal.gap && <Tex>{"\\text{limit } 4 \\ne \\text{ value } 1: \\text{ the limit ignores } h(2)"}</Tex>}
      </div>
    ) : null;
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "jump") {
    const curves: CurveSeg[] = [];
    if (reveal.leftBranch) curves.push({ f: leftRule, from: -4, to: 2, tone: "teal" });
    if (reveal.rightBranch) curves.push({ f: rightRule, from: 2, to: 5, tone: "accent" });
    const points: CurvePoint[] = [];
    if (reveal.leftBranch) points.push({ x: 2, y: 1, kind: "closed", tone: "teal" });
    if (reveal.rightBranch) points.push({ x: 2, y: 3, kind: "open", tone: "accent" });
    const hlines: CurveGuide[] = [];
    if (reveal.marks) {
      hlines.push({ at: 1, tone: "teal", label: "y = 1 (left limit)" });
      hlines.push({ at: 3, tone: "accent", label: "y = 3 (right limit)" });
    }
    const spec: CurveSpec = {
      curves,
      points,
      hlines,
      aria:
        "A jump at x = 2: the left branch y = x - 1 ends at a filled (2, 1) and the right branch y = x + 1 starts at an open (2, 3), so the left and right limits are 1 and 3.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"p(x) = \\begin{cases} x - 1 & x \\le 2 \\\\ x + 1 & x > 2 \\end{cases}"}</Tex>
        {reveal.leftBranch && <Tex>{"\\lim_{x \\to 2^{-}} p(x) = 1"}</Tex>}
        {reveal.rightBranch && <Tex>{"\\lim_{x \\to 2^{+}} p(x) = 3"}</Tex>}
        {reveal.dne && <Tex>{"\\lim_{x \\to 2} p(x) \\ \\text{does not exist}"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "yourturn") {
    const curves: CurveSeg[] = reveal.curve ? [{ f: line, tone: "primary" }] : [];
    const points: CurvePoint[] = [];
    if (reveal.hole) points.push({ x: 2, y: 4, kind: "open", tone: "primary" });
    const spec: CurveSpec = {
      curves,
      points,
      aria:
        "The line y = x + 2 with a hole at (2, 4). Click the point both branches head toward as x approaches 2.",
    };
    const onPoint = plot ? (wx: number, wy: number) => plot.onGuess({ x: wx, y: wy }) : undefined;
    const overlay = plot ? (plane: Plane) => <PlotMarkers plane={plane} plot={plot} /> : undefined;
    return frame(
      <CurvePlane spec={spec} half={HALF} interactive={interactive} onPoint={onPoint} overlay={overlay} />,
      null,
    );
  }

  // mode "approach" (default): define the two-sided limit with a table.
  const curves: CurveSeg[] = reveal.curve ? [{ f: line, tone: "primary" }] : [];
  const points: CurvePoint[] = [];
  if (reveal.hole) points.push({ x: 2, y: 4, kind: "open", tone: "primary", label: "hole" });
  const vlines: CurveGuide[] = reveal.approach ? [{ at: 2, tone: "muted", label: "x = 2" }] : [];
  const hlines: CurveGuide[] = reveal.limit ? [{ at: 4, tone: "teal", label: "y = 4" }] : [];
  const spec: CurveSpec = {
    curves,
    points,
    vlines,
    hlines,
    aria:
      "The line y = x + 2 with an open hole at (2, 4). As x approaches 2 from both sides the height approaches 4.",
  };
  const dock = (
    <div className="formula-list">
      <Tex>{"g(x) = \\dfrac{x^2 - 4}{x - 2} = x + 2 \\ (x \\neq 2)"}</Tex>
      {reveal.table && (
        <Tex display>
          {"\\begin{array}{c|ccc|ccc} x & 1.9 & 1.99 & 1.999 & 2.001 & 2.01 & 2.1 \\\\ \\hline g(x) & 3.9 & 3.99 & 3.999 & 4.001 & 4.01 & 4.1 \\end{array}"}
        </Tex>
      )}
      {reveal.limit && <Tex>{"\\lim_{x \\to 2} g(x) = 4"}</Tex>}
    </div>
  );
  return frame(<CurvePlane spec={spec} half={HALF} />, dock);
}
