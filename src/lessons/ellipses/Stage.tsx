import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, { type ConicSpec, type ConicPoint, type ConicSegment } from "../../components/ConicPlane";
import type { LessonFigureProps } from "../types";
import FigureFrame from "../../components/FigureFrame";

/**
 * Ellipse figures, all built on the shared ConicPlane. a is the semi-axis along
 * x, b the semi-axis along y. Vertices and co-vertices are drawn as labeled
 * points (dark = vertex on the longer axis, blue = co-vertex on the shorter).
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   standard: dock, curve, axes
 *   vertices: dock, curve, verts
 *   vertical: dock, curve, verts
 *   read:     dock, curve, verts
 *   yourturn: dock
 */

const HALF = 6;

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode, reserve?: string) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} holdDock />;
}

/** Four labeled boundary points: dark vertices on the long axis, blue co-vertices. */
function boundaryPoints(a: number, b: number): ConicPoint[] {
  const wide = a >= b;
  const vTone = "ink" as const;
  const cTone = "plain" as const;
  if (wide) {
    return [
      { x: a, y: 0, tone: vTone, label: `(${a}, 0)` },
      { x: -a, y: 0, tone: vTone },
      { x: 0, y: b, tone: cTone, label: `(0, ${b})` },
      { x: 0, y: -b, tone: cTone },
    ];
  }
  return [
    { x: 0, y: b, tone: vTone, label: `(0, ${b})` },
    { x: 0, y: -b, tone: vTone },
    { x: a, y: 0, tone: cTone, label: `(${a}, 0)` },
    { x: -a, y: 0, tone: cTone },
  ];
}

export default function EllipsesStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "standard";
  const showDock = Boolean(reveal.dock);

  // Slide 5: b drives the y semi-axis; a is fixed at 3.
  if (mode === "yourturn") {
    const a = 3;
    const b = Math.min(5, Math.max(1, Math.round(values.b ?? 2)));
    const spec: ConicSpec = {
      kind: "ellipse",
      a,
      b,
      center: true,
      points: boundaryPoints(a, b),
      aria: `An ellipse with x semi-axis 3 and y semi-axis ${b}, ${b > a ? "taller than it is wide" : b < a ? "wider than it is tall" : "a circle"}.`,
    };
    const orient = b > a ? "\\text{vertical major axis}" : b < a ? "\\text{horizontal major axis}" : "\\text{circle } (a = b)";
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{`\\frac{x^2}{3^2} + \\frac{y^2}{${b}^2} = 1`}</Tex>
        <Tex>{`a = 3,\\quad b = ${b}`}</Tex>
        <Tex>{`\\Rightarrow ${orient}`}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} />, dock);
  }

  // Slides 1 to 4: fixed worked ellipses.
  let a: number;
  let b: number;
  let equation: string;
  if (mode === "vertical") {
    a = 3;
    b = 5;
    equation = "\\frac{x^2}{9} + \\frac{y^2}{25} = 1";
  } else if (mode === "read") {
    a = 4;
    b = 2;
    equation = "\\frac{x^2}{16} + \\frac{y^2}{4} = 1";
  } else {
    // standard and vertices both use x^2/25 + y^2/9 = 1
    a = 5;
    b = 3;
    equation = "\\frac{x^2}{25} + \\frac{y^2}{9} = 1";
  }

  const segments: ConicSegment[] =
    mode === "standard" && reveal.axes
      ? [
          { x1: 0, y1: 0, x2: a, y2: 0, variant: "1", label: `a = ${a}` },
          { x1: 0, y1: 0, x2: 0, y2: b, variant: "2", label: `b = ${b}` },
        ]
      : [];

  const points: ConicPoint[] = reveal.verts ? boundaryPoints(a, b) : [];

  const spec: ConicSpec = {
    kind: "ellipse",
    a,
    b,
    center: true,
    segments,
    points,
    aria: `An ellipse in standard form with x semi-axis ${a} and y semi-axis ${b}.`,
  };

  const wide = a >= b;
  const vertexTex = wide ? `(\\pm ${a},\\, 0)` : `(0,\\, \\pm ${b})`;
  const covertexTex = wide ? `(0,\\, \\pm ${b})` : `(\\pm ${a},\\, 0)`;
  const orientTex = wide ? "\\text{horizontal}" : "\\text{vertical}";

  const dock = showDock ? (
    <div className="formula-list">
      <Tex>{equation}</Tex>
      <Tex>{`a = ${a},\\quad b = ${b}`}</Tex>
      {reveal.verts && <Tex>{`\\text{major axis } ${orientTex}`}</Tex>}
      {reveal.verts && <Tex>{`\\text{vertices } ${vertexTex},\\ \\text{co-vertices } ${covertexTex}`}</Tex>}
    </div>
  ) : null;

  return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} />, dock);
}
