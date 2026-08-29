import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import CurvePlane, { type CurveSpec } from "../../components/CurvePlane";
import PlotMarkers from "../../components/PlotMarkers";
import type { LessonFigureProps } from "../types";

/**
 * Limits algebraically, drawn with the shared CurvePlane. Every slide keeps an
 * <svg> in the figure slot: slide 1 (direct) shows a parabola with a solid point,
 * slides 2 to 4 dock an AlgebraFlow beside a small glyph of the simplified curve
 * with its open hole, and slide 5 (yourturn) wires the shared PlotMarkers to a
 * click-a-point question on the line y = x + 1.
 *
 * Per-mode plane half-ranges (the harness reads this for plot bounds):
 *   direct 12 (fits the point (3, 10)), factor 6, conjugate 1 and cfrac 1
 *   (zoomed so the small limit heights 1/4 and -1/9 are visible), yourturn 6.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   direct:    curve, pt, guides
 *   factor:    e1, e2, e3, e4      (glyph is unconditional. Flow gates the steps)
 *   conjugate: e1, e2, e3, e4
 *   cfrac:     e1, e2, e3, e4
 *   yourturn:  line, hole, approach (plot markers come from the question state)
 */

const HALF: Record<string, number> = {
  direct: 12,
  factor: 6,
  conjugate: 1,
  cfrac: 1,
  yourturn: 6,
};

/** Shared frame: a figure slot with an optional formula/derivation dock beside it. */
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

/** Factor and cancel: (x^2 - 4)/(x - 2) -> x + 2 -> 4, one line per beat. */
const FACTOR: FlowStep[] = [
  { id: "f0", tex: "\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}" },
  {
    id: "f1",
    show: "e1",
    tone: "cancel",
    op: "\\text{substitute } x = 2",
    tex: "= \\dfrac{2^2 - 4}{2 - 2} = \\dfrac{0}{0}",
  },
  {
    id: "f2",
    show: "e2",
    op: "\\text{factor: } x^2 - 4 = (x - 2)(x + 2)",
    tex: "= \\dfrac{(x - 2)(x + 2)}{x - 2}",
  },
  {
    id: "f3",
    show: "e3",
    op: "\\text{cancel } (x - 2),\\ x \\neq 2",
    tex: "= \\dfrac{\\cancel{(x - 2)}\\,(x + 2)}{\\cancel{(x - 2)}} = x + 2",
  },
  {
    id: "f4",
    show: "e4",
    tone: "good",
    result: true,
    op: "\\text{substitute } x = 2",
    tex: "= 2 + 2 = 4",
  },
];

/** Conjugate: (sqrt(x+4) - 2)/x -> 1/(sqrt(x+4) + 2) -> 1/4, one line per beat. */
const CONJ: FlowStep[] = [
  { id: "c0", tex: "\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 4} - 2}{x}" },
  {
    id: "c1",
    show: "e1",
    tone: "cancel",
    op: "\\text{substitute } x = 0",
    tex: "= \\dfrac{\\sqrt{4} - 2}{0} = \\dfrac{0}{0}",
  },
  {
    id: "c2",
    show: "e2",
    op: "\\text{multiply by } \\dfrac{\\sqrt{x + 4} + 2}{\\sqrt{x + 4} + 2}",
    tex: "= \\dfrac{(\\sqrt{x + 4} - 2)(\\sqrt{x + 4} + 2)}{x\\,(\\sqrt{x + 4} + 2)}",
  },
  {
    id: "c3",
    show: "e3",
    op: "\\text{top} = (x + 4) - 4 = x,\\ \\text{cancel } x",
    tex: "= \\dfrac{\\cancel{x}}{\\cancel{x}\\,(\\sqrt{x + 4} + 2)} = \\dfrac{1}{\\sqrt{x + 4} + 2}",
  },
  {
    id: "c4",
    show: "e4",
    tone: "good",
    result: true,
    op: "\\text{substitute } x = 0",
    tex: "= \\dfrac{1}{\\sqrt{4} + 2} = \\dfrac{1}{4}",
  },
];

/** Compound fraction: (1/(x+3) - 1/3)/x -> -1/(3(x+3)) -> -1/9, one line per beat. */
const CFRAC: FlowStep[] = [
  { id: "k0", tex: "\\lim_{x \\to 0} \\dfrac{\\dfrac{1}{x + 3} - \\dfrac{1}{3}}{x}" },
  {
    id: "k1",
    show: "e1",
    tone: "cancel",
    op: "\\text{substitute } x = 0",
    tex: "= \\dfrac{\\frac{1}{3} - \\frac{1}{3}}{0} = \\dfrac{0}{0}",
  },
  {
    id: "k2",
    show: "e2",
    op: "\\text{combine the top over } 3(x + 3)",
    tex: "= \\dfrac{\\ \\dfrac{3 - (x + 3)}{3(x + 3)}\\ }{x}",
  },
  {
    id: "k3",
    show: "e3",
    op: "\\text{top} = -x,\\ \\text{cancel } x",
    tex: "= \\dfrac{-x}{3(x + 3)\\,x} = \\dfrac{-\\cancel{x}}{3(x + 3)\\,\\cancel{x}} = \\dfrac{-1}{3(x + 3)}",
  },
  {
    id: "k4",
    show: "e4",
    tone: "good",
    result: true,
    op: "\\text{substitute } x = 0",
    tex: "= \\dfrac{-1}{3(0 + 3)} = -\\dfrac{1}{9}",
  },
];

/**
 * Render the AlgebraFlow as the main (height-bounded) figure with a small glyph
 * of the simplified curve as its header. Putting the flow in the slot (not the
 * auto-height dock) lets it scroll to the newest line as the derivation grows,
 * so the final substituted value is always in view even for the tall compound
 * fraction and conjugate cases (the dock cannot scroll because it sizes to its
 * content).
 */
function derive(spec: CurveSpec, half: number, steps: FlowStep[], heading: string, reveal: LessonFigureProps["reveal"]) {
  const flowReveal = {
    e1: Boolean(reveal.e1),
    e2: Boolean(reveal.e2),
    e3: Boolean(reveal.e3),
    e4: Boolean(reveal.e4),
  };
  const glyph = (
    <div style={{ width: "min(56%, 190px)", aspectRatio: "1 / 1", margin: "0 auto" }}>
      <CurvePlane spec={spec} half={half} />
    </div>
  );
  return frame(
    <AlgebraFlow steps={steps} reveal={flowReveal} heading={heading} header={glyph} align="start" />,
    null,
  );
}

export default function LimitsAlgStage(props: LessonFigureProps) {
  const { slide, reveal, interactive, plot } = props;
  const mode = slide.mode ?? "direct";
  const half = HALF[mode] ?? 6;

  // Slide 2: factor and cancel the 0/0 form.
  if (mode === "factor") {
    const spec: CurveSpec = {
      curves: [{ f: (x) => x + 2, tone: "primary" }],
      points: [{ x: 2, y: 4, kind: "open", tone: "accent", label: "(2, 4)" }],
      vlines: [{ at: 2, tone: "muted" }],
      hlines: [{ at: 4, tone: "muted" }],
      aria: "The line y = x + 2 with an open hole at (2, 4), the value the limit approaches.",
    };
    return derive(spec, half, FACTOR, "\\text{factor, cancel, then substitute}", reveal);
  }

  // Slide 3: rationalize with the conjugate.
  if (mode === "conjugate") {
    const spec: CurveSpec = {
      curves: [{ f: (x) => 1 / (Math.sqrt(x + 4) + 2), tone: "primary" }],
      points: [{ x: 0, y: 0.25, kind: "open", tone: "accent", label: "(0, 1/4)" }],
      hlines: [{ at: 0.25, tone: "muted" }],
      aria: "The curve y = 1 over (root of x + 4, plus 2) with an open hole at (0, one quarter), the value the limit approaches.",
    };
    return derive(spec, half, CONJ, "\\text{multiply by the conjugate}", reveal);
  }

  // Slide 4: clear the compound fraction.
  if (mode === "cfrac") {
    const spec: CurveSpec = {
      curves: [{ f: (x) => -1 / (3 * (x + 3)), tone: "primary" }],
      points: [{ x: 0, y: -1 / 9, kind: "open", tone: "accent", label: "(0, -1/9)" }],
      hlines: [{ at: -1 / 9, tone: "muted" }],
      aria: "The curve y = negative 1 over 3 times (x + 3) with an open hole at (0, negative one ninth), the value the limit approaches.",
    };
    return derive(spec, half, CFRAC, "\\text{clear the compound fraction}", reveal);
  }

  // Slide 5: your turn. Click the hole the line y = x + 1 approaches at x = 1.
  if (mode === "yourturn") {
    const spec: CurveSpec = {
      curves: reveal.line ? [{ f: (x) => x + 1, tone: "primary" }] : [],
      points: reveal.hole ? [{ x: 1, y: 2, kind: "open", tone: "accent" }] : [],
      vlines: reveal.approach ? [{ at: 1, label: "x = 1", tone: "muted" }] : [],
      aria: "The line y = x + 1 with an open hole at (1, 2). The height of the hole is the limit as x approaches 1.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1}"}</Tex>
        {reveal.hole && <Tex>{"= \\dfrac{(x - 1)(x + 1)}{x - 1} = x + 1 \\quad (x \\neq 1)"}</Tex>}
        {reveal.approach && <Tex>{"\\lim_{x \\to 1}(x + 1) = 1 + 1 = 2"}</Tex>}
      </div>
    );
    return frame(
      <CurvePlane
        spec={spec}
        half={half}
        interactive={interactive}
        onPoint={plot ? (x, y) => plot.onGuess({ x, y }) : undefined}
        overlay={(plane) => (plot ? <PlotMarkers plane={plane} plot={plot} /> : null)}
      />,
      dock,
    );
  }

  // Slide 1: direct substitution on the parabola y = x^2 + 1.
  const spec: CurveSpec = {
    curves: reveal.curve ? [{ f: (x) => x * x + 1, tone: "primary" }] : [],
    points: reveal.pt ? [{ x: 3, y: 10, kind: "closed", tone: "ink", label: "(3, 10)" }] : [],
    vlines: reveal.guides ? [{ at: 3, label: "x = 3", tone: "muted" }] : [],
    hlines: reveal.guides ? [{ at: 10, label: "y = 10", tone: "muted" }] : [],
    aria: "The parabola y = x squared plus 1 with a solid point at (3, 10), the value the limit approaches.",
  };
  const dock = (
    <div className="formula-list">
      <Tex>{"\\lim_{x \\to 3}(x^2 + 1)"}</Tex>
      {reveal.pt && <Tex>{"= 3^2 + 1 = 9 + 1"}</Tex>}
      {reveal.guides && <Tex>{"= 10"}</Tex>}
    </div>
  );
  return frame(<CurvePlane spec={spec} half={half} />, dock);
}
