import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import CurvePlane, {
  type CurveSpec,
  type CurveLine,
  type CurvePoint,
  type CurveLabel,
} from "../../components/CurvePlane";
import type { LessonFigureProps } from "../types";

/**
 * Difference quotient on f(x) = x^2 at a = 1, drawn with the shared CurvePlane.
 * The parabola is the curve; secants and the tangent are lines; rise/run legs are
 * dashed guides. Slide 3 docks an AlgebraFlow simplification to 2 + h.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   secant:  curve, pts, sec, slope
 *   formula: curve, pts, sec, hlabels
 *   shrink:  curve, e1, e2, e3, e4   (e3 shows the h=1 secant; e4 adds h=0.5, 0.25)
 *   tangent: curve, tan, slope
 *   yourturn: curve (secant + readout follow the h slider)
 */

const HALF = 6;
const f = (x: number) => x * x;
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

/** Secant from (1, 1) to (1 + h, (1 + h)^2). */
function secant(h: number, tone: CurveLine["tone"], label?: string): CurveLine {
  return { x1: 1, y1: 1, x2: 1 + h, y2: f(1 + h), tone, label };
}

/** The step-by-step simplification docked on the shrink slide. */
const STEP: FlowStep[] = [
  { id: "d0", tex: "\\dfrac{f(1 + h) - f(1)}{h}" },
  { id: "d1", show: "e1", op: "\\text{substitute } f(x) = x^2", tex: "= \\dfrac{(1 + h)^2 - 1}{h}" },
  { id: "d2", show: "e2", op: "\\text{expand, cancel the } 1\\text{s}", tex: "= \\dfrac{2h + h^2}{h}" },
  {
    id: "d3",
    show: "e3",
    tone: "good",
    result: true,
    op: "\\text{divide each term by } h\\ (h \\neq 0)",
    tex: "= 2 + h",
  },
];

export default function DqStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "secant";

  // Slide 3: the algebra dock plus secants that appear as the step shrinks.
  if (mode === "shrink") {
    const flowReveal = { e1: Boolean(reveal.e1), e2: Boolean(reveal.e2), e3: Boolean(reveal.e3) };
    const lines: CurveLine[] = [];
    const points: CurvePoint[] = [{ x: 1, y: 1, kind: "closed", tone: "ink" }];
    if (reveal.e3) {
      lines.push(secant(1, "accent", "h = 1: slope 3"));
      points.push({ x: 2, y: 4, kind: "closed", tone: "accent" });
    }
    if (reveal.e4) {
      lines.push(secant(0.5, "teal", "h = 0.5: 2.5"));
      lines.push(secant(0.25, "primary", "h = 0.25: 2.25"));
      points.push({ x: 1.5, y: f(1.5), kind: "closed", tone: "teal" });
      points.push({ x: 1.25, y: f(1.25), kind: "closed", tone: "primary" });
    }
    const spec: CurveSpec = {
      curves: reveal.curve ? [{ f, tone: "muted" }] : [],
      lines,
      points,
      aria:
        "The parabola y = x squared with secant lines from (1, 1) for steps h = 1, 0.5, and 0.25, tilting toward the tangent at (1, 1) as h shrinks.",
    };
    const dock = (
      <AlgebraFlow
        steps={STEP}
        reveal={flowReveal}
        heading={"\\text{difference quotient of } x^2 \\text{ at } a = 1"}
        align="start"
      />
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  const curves = reveal.curve ? [{ f, tone: "primary" as const }] : [];
  const points: CurvePoint[] = [];
  const lines: CurveLine[] = [];
  const labels: CurveLabel[] = [];
  let dock: ReactNode = null;

  if (mode === "secant") {
    if (reveal.pts) {
      points.push({ x: 1, y: 1, kind: "closed", tone: "ink", label: "(1, 1)" });
      points.push({ x: 2, y: 4, kind: "closed", tone: "ink", label: "(2, 4)" });
    }
    if (reveal.sec) {
      lines.push(secant(1, "accent"));
      lines.push({ x1: 1, y1: 1, x2: 2, y2: 1, tone: "muted", dashed: true });
      lines.push({ x1: 2, y1: 1, x2: 2, y2: 4, tone: "muted", dashed: true });
      labels.push({ x: 1.5, y: 0.5, text: "run = 1", tone: "muted", anchor: "middle" });
      labels.push({ x: 2.2, y: 2.6, text: "rise = 3", tone: "muted" });
    }
    dock = (
      <div className="formula-list">
        <Tex>{"\\text{average rate on } [1, 2] = \\dfrac{f(2) - f(1)}{2 - 1}"}</Tex>
        {reveal.sec && <Tex>{"= \\dfrac{4 - 1}{2 - 1} = \\dfrac{3}{1}"}</Tex>}
        {reveal.slope && <Tex>{"\\text{slope} = 3"}</Tex>}
      </div>
    );
  } else if (mode === "formula") {
    points.push({ x: 1, y: 1, kind: "closed", tone: "ink", label: reveal.hlabels ? "(a, f(a))" : "(1, 1)" });
    points.push({ x: 2, y: 4, kind: "closed", tone: "ink", label: reveal.hlabels ? "(a+h, f(a+h))" : "(2, 4)" });
    lines.push(secant(1, "accent"));
    if (reveal.hlabels) {
      lines.push({ x1: 1, y1: 1, x2: 2, y2: 1, tone: "muted", dashed: true });
      lines.push({ x1: 2, y1: 1, x2: 2, y2: 4, tone: "muted", dashed: true });
      labels.push({ x: 1.5, y: 0.5, text: "run = h", tone: "muted", anchor: "middle" });
      labels.push({ x: 2.2, y: 2.6, text: "rise = f(a+h) - f(a)", tone: "muted" });
    }
    dock = (
      <div className="formula-list">
        <Tex>{"\\dfrac{f(a + h) - f(a)}{h} \\quad (b = a + h)"}</Tex>
        {reveal.hlabels && <Tex>{"a = 1,\\ h = 1:\\ \\dfrac{f(2) - f(1)}{1} = \\dfrac{4 - 1}{1} = 3"}</Tex>}
      </div>
    );
  } else if (mode === "tangent") {
    points.push({ x: 1, y: 1, kind: "closed", tone: "ink", label: "(1, 1)" });
    // Fainter secant fading toward the tangent, then the tangent y = 2x - 1.
    lines.push(secant(0.6, "muted"));
    if (reveal.tan) lines.push({ x1: 1, y1: 1, x2: 2, y2: 3, tone: "accent", label: "tangent" });
    if (reveal.slope) labels.push({ x: -3.4, y: -3.2, text: "slope = 2", tone: "accent" });
    dock = (
      <div className="formula-list">
        <Tex>{"\\text{slope} = 2 + h"}</Tex>
        {reveal.tan && <Tex>{"\\lim_{h \\to 0} (2 + h) = 2"}</Tex>}
        {reveal.slope && <Tex>{"\\text{tangent slope} = f'(1) = 2"}</Tex>}
      </div>
    );
  } else {
    // your-turn: secant to the moving point, live slope 2 + h.
    const v = clamp(Math.round(values.h ?? 15), 1, 15);
    const h = v / 10;
    const slope = 2 + h;
    points.push({ x: 1, y: 1, kind: "closed", tone: "ink", label: "(1, 1)" });
    points.push({ x: 1 + h, y: f(1 + h), kind: "closed", tone: "accent" });
    lines.push(secant(h, "accent", `slope ${slope.toFixed(1)}`));
    lines.push({ x1: 1, y1: 1, x2: 2, y2: 3, tone: "muted", dashed: true, label: "tangent (2)" });
    dock = (
      <div className="formula-list">
        <Tex>{`h = ${h.toFixed(1)},\\quad \\text{slope} = 2 + h = ${slope.toFixed(1)}`}</Tex>
        <Tex>{"\\text{tangent slope} = 2 \\ (\\text{as } h \\to 0)"}</Tex>
      </div>
    );
  }

  const spec: CurveSpec = {
    curves,
    points,
    lines,
    labels,
    aria:
      mode === "yourturn"
        ? "The parabola y = x squared with a secant from (1, 1) to a movable second point, and a dashed tangent of slope 2."
        : mode === "tangent"
          ? "The parabola y = x squared with the tangent line at (1, 1), which has slope 2."
          : "The parabola y = x squared with a secant line from (1, 1) to (2, 4) and dashed rise and run legs.",
  };

  return frame(<CurvePlane spec={spec} half={HALF} />, dock);
}
