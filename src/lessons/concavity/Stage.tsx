import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import FigureFrame from "../../components/FigureFrame";
import CurvePlane, {
  type CurveSpec,
  type CurveSeg,
  type CurveLine,
  type CurvePoint,
  type CurveLabel,
} from "../../components/CurvePlane";
import type { LessonFigureProps } from "../types";

/**
 * Concavity drawn with the shared CurvePlane. Parabolas and the cubic are
 * curves. Tangent lines are straight lines with closed touch dots. Region words
 * and slope readouts are floating labels. A formula dock states the rule.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   updown:      cup, cupTan, cap, capTan
 *   slopes:      curve, t1, t2, t3
 *   inflection:  curve, left, right, infl
 *   independent: root, rootTan, para, paraTan
 *   yourturn:    curve (the point, the f'' readout, and the concavity word
 *                follow the x slider through values.x)
 */

const HALF = 6;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const sq = (x: number) => x * x;
const negSq = (x: number) => -x * x;
const cube = (x: number) => x * x * x;
const rootF = (x: number) => Math.sqrt(x);

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode, reserve?: string) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} holdDock />;
}

/** A straight tangent segment centred on the touch point (CurvePlane clips it). */
function tangent(cx: number, cy: number, slope: number, span: number, tone: CurveLine["tone"]): CurveLine {
  return { x1: cx - span, y1: cy - slope * span, x2: cx + span, y2: cy + slope * span, tone };
}

export default function ConcavityStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "updown";

  if (mode === "updown") {
    const curves: CurveSeg[] = [];
    const lines: CurveLine[] = [];
    const points: CurvePoint[] = [];
    const labels: CurveLabel[] = [];
    if (reveal.cup) {
      curves.push({ f: sq, from: -2.6, to: 2.6, tone: "primary" });
      labels.push({ x: 0, y: 5.4, text: "concave up", tone: "primary", anchor: "middle" });
    }
    if (reveal.cupTan) {
      for (const a of [-1.5, 1.5]) {
        lines.push(tangent(a, sq(a), 2 * a, 1.3, "muted"));
        points.push({ x: a, y: sq(a), kind: "closed", tone: "ink" });
      }
    }
    if (reveal.cap) {
      curves.push({ f: negSq, from: -2.6, to: 2.6, tone: "accent" });
      labels.push({ x: 0, y: -5.4, text: "concave down", tone: "accent", anchor: "middle" });
    }
    if (reveal.capTan) {
      for (const a of [-1.5, 1.5]) {
        lines.push(tangent(a, negSq(a), -2 * a, 1.3, "muted"));
        points.push({ x: a, y: negSq(a), kind: "closed", tone: "ink" });
      }
    }
    const spec: CurveSpec = {
      curves,
      lines,
      points,
      labels,
      aria:
        "The cup y = x squared (concave up) with two tangent lines lying below it, and the cap y = negative x squared (concave down) with two tangent lines lying above it.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\text{concave up (cup): tangent lines lie below}"}</Tex>
        {reveal.capTan && <Tex>{"\\text{concave down (cap): tangent lines lie above}"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "slopes") {
    const curves: CurveSeg[] = reveal.curve ? [{ f: sq, from: -2.6, to: 2.6, tone: "primary" }] : [];
    const lines: CurveLine[] = [];
    const points: CurvePoint[] = [];
    const labels: CurveLabel[] = [];
    if (reveal.t1) {
      lines.push(tangent(-1.5, sq(-1.5), -3, 1.4, "accent"));
      points.push({ x: -1.5, y: sq(-1.5), kind: "closed", tone: "ink" });
      labels.push({ x: -3.6, y: 3.0, text: "slope -3", tone: "accent", anchor: "middle" });
    }
    if (reveal.t2) {
      lines.push(tangent(0, 0, 0, 1.4, "accent"));
      points.push({ x: 0, y: 0, kind: "closed", tone: "ink" });
      labels.push({ x: 1.3, y: 0.6, text: "slope 0", tone: "accent", anchor: "middle" });
    }
    if (reveal.t3) {
      lines.push(tangent(1.5, sq(1.5), 3, 1.4, "accent"));
      points.push({ x: 1.5, y: sq(1.5), kind: "closed", tone: "ink" });
      labels.push({ x: 3.6, y: 3.0, text: "slope 3", tone: "accent", anchor: "middle" });
    }
    const spec: CurveSpec = {
      curves,
      lines,
      points,
      labels,
      aria:
        "The cup y = x squared with tangent lines at x = -1.5, 0, and 1.5 whose slopes are -3, 0, and 3, increasing from left to right.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\text{tangent slope of } x^2 \\text{ at } x = a:\\ 2a"}</Tex>
        {reveal.t1 && <Tex>{"x = -1.5:\\ \\text{slope} = -3"}</Tex>}
        {reveal.t2 && <Tex>{"x = 0:\\ \\text{slope} = 0"}</Tex>}
        {reveal.t3 && <Tex>{"x = 1.5:\\ \\text{slope} = 3\\quad(-3 < 0 < 3)"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "inflection") {
    const curves: CurveSeg[] = reveal.curve ? [{ f: cube, from: -1.8, to: 1.8, tone: "primary" }] : [];
    const points: CurvePoint[] = [];
    const labels: CurveLabel[] = [];
    if (reveal.left) labels.push({ x: -3.2, y: -2.2, text: "concave down", tone: "accent", anchor: "middle" });
    if (reveal.right) labels.push({ x: 3.0, y: 2.4, text: "concave up", tone: "teal", anchor: "middle" });
    if (reveal.infl) points.push({ x: 0, y: 0, kind: "closed", tone: "ink", label: "inflection (0, 0)" });
    const spec: CurveSpec = {
      curves,
      points,
      labels,
      aria:
        "The cubic y = x cubed, concave down for x less than 0 and concave up for x greater than 0, with the inflection point marked at the origin.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"f(x) = x^3"}</Tex>
        {reveal.left && <Tex>{"x < 0:\\ \\text{concave down}\\ (f''(x) = 6x < 0)"}</Tex>}
        {reveal.right && <Tex>{"x > 0:\\ \\text{concave up}\\ (f''(x) = 6x > 0)"}</Tex>}
        {reveal.infl && <Tex>{"x = 0:\\ \\text{inflection point } (0, 0)"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  if (mode === "independent") {
    const curves: CurveSeg[] = [];
    const lines: CurveLine[] = [];
    const points: CurvePoint[] = [];
    const labels: CurveLabel[] = [];
    if (reveal.root) {
      curves.push({ f: rootF, from: 0, to: 6, tone: "teal" });
      labels.push({ x: 3.4, y: 3.2, text: "concave down", tone: "teal", anchor: "middle" });
    }
    if (reveal.rootTan) {
      lines.push(tangent(1, 1, 0.5, 2, "muted"));
      points.push({ x: 1, y: 1, kind: "closed", tone: "ink" });
      labels.push({ x: 4.9, y: 1.3, text: "increasing", tone: "teal", anchor: "middle" });
    }
    if (reveal.para) {
      curves.push({ f: sq, from: -2.45, to: 0, tone: "accent" });
      labels.push({ x: -4.0, y: 3.4, text: "concave up", tone: "accent", anchor: "middle" });
    }
    if (reveal.paraTan) {
      lines.push(tangent(-1.5, 2.25, -3, 1.1, "muted"));
      points.push({ x: -1.5, y: 2.25, kind: "closed", tone: "ink" });
      labels.push({ x: -4.0, y: 5.0, text: "decreasing", tone: "accent", anchor: "middle" });
    }
    const spec: CurveSpec = {
      curves,
      lines,
      points,
      labels,
      aria:
        "y = square root of x rising yet bending downward (increasing but concave down), and the left arm of y = x squared falling yet bending upward (decreasing but concave up).",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\text{increasing/decreasing} \\ne \\text{concave up/down}"}</Tex>
        {reveal.rootTan && <Tex>{"\\sqrt{x}:\\ \\text{increasing, yet concave down}"}</Tex>}
        {reveal.paraTan && <Tex>{"x^2\\ (x < 0):\\ \\text{decreasing, yet concave up}"}</Tex>}
      </div>
    );
    return frame(<CurvePlane spec={spec} half={HALF} />, dock);
  }

  // your-turn: a point rides x^3, driven by the x slider. Live f'' and concavity.
  const raw = Math.round(values.x ?? -15);
  const xr = clamp(raw, -18, 18) / 10;
  const yr = cube(xr);
  const second = 6 * xr;
  const word = raw === 0 ? "inflection point" : raw < 0 ? "concave down" : "concave up";
  const curves: CurveSeg[] = reveal.curve ? [{ f: cube, from: -1.8, to: 1.8, tone: "primary" }] : [];
  const points: CurvePoint[] = [{ x: xr, y: yr, kind: "closed", tone: "accent" }];
  const labels: CurveLabel[] = [{ x: 0, y: 5.3, text: word, tone: "accent", anchor: "middle" }];
  const spec: CurveSpec = {
    curves,
    points,
    labels,
    aria: `The cubic y = x cubed with a movable point at x = ${xr.toFixed(1)}, where the curve is ${word}.`,
  };
  const dock = (
    <div className="formula-list">
      <Tex>{`x = ${xr.toFixed(1)}`}</Tex>
      <Tex>{`f''(x) = 6x = ${second.toFixed(1)}`}</Tex>
      <Tex>{`\\text{concavity here: ${word}}`}</Tex>
    </div>
  );
  return frame(<CurvePlane spec={spec} half={HALF} />, dock);
}
