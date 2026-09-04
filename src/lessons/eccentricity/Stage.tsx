import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, { type ConicSpec, type ConicSegment } from "../../components/ConicPlane";
import type { LessonFigureProps } from "../types";
import FigureFrame from "../../components/FigureFrame";

/**
 * Foci and eccentricity figures, all built on the shared ConicPlane.
 *   Ellipse:   c^2 = a^2 - b^2, foci on the major axis, e = c/a in [0, 1).
 *   Hyperbola: c^2 = a^2 + b^2, foci beyond the vertices, e = c/a > 1.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   ellipsefoci:   dock, curve, foci
 *   ellipseecc:    dock, curve, foci, ecc
 *   hyperbolafoci: dock, curve, foci, ecc
 *   classify:      dock, curve, foci, ecc
 *   yourturn:      dock, foci
 */

const HALF = 6;

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode, reserve?: string) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} holdDock />;
}

export default function EccentricityStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "ellipsefoci";
  const showDock = Boolean(reveal.dock);

  // Slide 5: an ellipse with a = 5 fixed; b drives c = sqrt(25 - b^2) and e = c/a.
  if (mode === "yourturn") {
    const a = 5;
    const b = Math.min(5, Math.max(1, Math.round(values.b ?? 2)));
    const c = Math.sqrt(Math.max(0, a * a - b * b));
    const e = c / a;
    const spec: ConicSpec = {
      kind: "ellipse",
      a,
      b,
      center: true,
      foci: Boolean(reveal.foci),
      aria: `An ellipse with semi-major axis 5 and semi-minor axis ${b}. Its foci sit ${c.toFixed(2)} from the center and its eccentricity is ${e.toFixed(2)}.`,
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{`\\frac{x^2}{25} + \\frac{y^2}{${b * b}} = 1 \\quad (a = 5,\\ b = ${b})`}</Tex>
        <Tex>{`c = \\sqrt{25 - ${b * b}} = ${c.toFixed(2)}`}</Tex>
        <Tex>{`e = \\frac{c}{a} = ${e.toFixed(2)}`}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} />, dock);
  }

  // Slide 3: hyperbola foci and eccentricity. a = 3, b = 4, c = 5, e = 5/3.
  if (mode === "hyperbolafoci") {
    const spec: ConicSpec = {
      kind: "hyperbola",
      a: 3,
      b: 4,
      orient: "h",
      center: true,
      vertices: true,
      foci: Boolean(reveal.foci),
      aria: "A left-right hyperbola with vertices at (plus and minus 3, 0) and foci at (plus and minus 5, 0), just outside the vertices.",
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{"\\frac{x^2}{9} - \\frac{y^2}{16} = 1 \\quad (a = 3,\\ b = 4)"}</Tex>
        {reveal.foci && <Tex>{"c^2 = a^2 + b^2 = 9 + 16 = 25 \\;\\Rightarrow\\; c = 5"}</Tex>}
        {reveal.foci && <Tex>{"\\text{foci } (\\pm 5,\\, 0)"}</Tex>}
        {reveal.ecc && <Tex>{"e = \\frac{c}{a} = \\frac{5}{3} \\approx 1.67 \\;(> 1)"}</Tex>}
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} />, dock);
  }

  // Slide 4: classify by eccentricity. Show one ellipse, list the whole ladder.
  if (mode === "classify") {
    const spec: ConicSpec = {
      kind: "ellipse",
      a: 5,
      b: 3,
      center: true,
      foci: Boolean(reveal.foci),
      aria: "An ellipse with eccentricity 0.8, shown alongside the eccentricity scale for all conics.",
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{"\\text{circle: } e = 0"}</Tex>
        <Tex>{"\\text{ellipse: } 0 < e < 1"}</Tex>
        <Tex>{"\\text{parabola: } e = 1"}</Tex>
        <Tex>{"\\text{hyperbola: } e > 1"}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} />, dock);
  }

  // Slides 1 and 2: the ellipse x^2/25 + y^2/9 = 1. a = 5, b = 3, c = 4, e = 0.8.
  // Label the two semi-axes so a (center to a vertex) and b (center to a
  // co-vertex) are visible next to the foci that sit on the major axis.
  const axisSegments: ConicSegment[] = [
    { x1: 0, y1: 0, x2: 5, y2: 0, variant: "1", label: "a = 5", labelDy: -12 },
    { x1: 0, y1: 0, x2: 0, y2: 3, variant: "2", label: "b = 3", labelDx: 20, labelDy: 2 },
  ];
  const spec: ConicSpec = {
    kind: "ellipse",
    a: 5,
    b: 3,
    center: true,
    vertices: true,
    foci: Boolean(reveal.foci),
    segments: axisSegments,
    aria: "An ellipse with semi-major axis a = 5 drawn from the center to the right vertex and semi-minor axis b = 3 drawn from the center up to the co-vertex, with foci at (plus and minus 4, 0) on the major axis.",
  };
  const dock = showDock ? (
    <div className="formula-list">
      <Tex>{"\\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\quad (a = 5,\\ b = 3)"}</Tex>
      {reveal.foci && <Tex>{"c^2 = a^2 - b^2 = 25 - 9 = 16 \\;\\Rightarrow\\; c = 4"}</Tex>}
      {reveal.foci && <Tex>{"\\text{foci } (\\pm 4,\\, 0)"}</Tex>}
      {reveal.ecc && <Tex>{"e = \\frac{c}{a} = \\frac{4}{5} = 0.8"}</Tex>}
    </div>
  ) : null;

  return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} />, dock);
}
