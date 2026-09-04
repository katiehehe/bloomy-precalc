import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, { type ConicSpec, type ConicPoint, type ConicSegment } from "../../components/ConicPlane";
import type { Plane } from "../../components/Plane";
import type { LessonFigureProps } from "../types";
import FigureFrame from "../../components/FigureFrame";

/**
 * Asymptotes of hyperbolas, built on the shared ConicPlane. The central box is
 * drawn as an underlay rectangle (half-widths a and b), the asymptotes use
 * ConicPlane's built-in dashed lines, and vertices are its def-dots.
 *   Horizontal x^2/a^2 - y^2/b^2 = 1: box (+/- a, +/- b), slope b/a.
 *   Vertical   y^2/a^2 - x^2/b^2 = 1: box (+/- b, +/- a), slope a/b.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   box:       dock, curve, box, verts
 *   diagonals: dock, curve, box, asym
 *   orient:    dock, curve, box, asym
 *   sketch:    dock, curve, box, asym, verts
 *   yourturn:  dock, box, asym
 */

const HALF = 7;

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode, reserve?: string) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} holdDock />;
}

/** The central rectangle with the given half-widths, as a faint guide box. */
function boxUnderlay(halfX: number, halfY: number) {
  return (plane: Plane): ReactNode => {
    const x = plane.sx(-halfX);
    const y = plane.sy(halfY);
    const w = plane.sx(halfX) - x;
    const h = plane.sy(-halfY) - y;
    return <rect x={x} y={y} width={w} height={h} rx={2} className="curve-ghost" />;
  };
}

export default function HypAsymStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "box";
  const showDock = Boolean(reveal.dock);

  // Slide 5: a = 3 fixed, b drives the box height and the asymptote slope.
  if (mode === "yourturn") {
    const a = 3;
    const b = Math.min(6, Math.max(1, Math.round(values.b ?? 2)));
    const points: ConicPoint[] = [{ x: a, y: b, tone: "plain", label: `(3, ${b})` }];
    // The b slider sets the box half-height, so label b right on the box's
    // vertical side (from the vertex up to the corner) as it moves.
    const segments: ConicSegment[] = reveal.box
      ? [{ x1: a, y1: 0, x2: a, y2: b, variant: "2", label: `b = ${b}`, labelDx: 24 }]
      : [];
    const spec: ConicSpec = {
      kind: "hyperbola",
      a,
      b,
      orient: "h",
      center: true,
      vertices: true,
      asymptotes: Boolean(reveal.asym),
      points,
      segments,
      aria: `A left-right hyperbola with a = 3 and b = ${b}. Its central box has a corner at (3, ${b}), the vertical side of length b is labeled, and its asymptotes have slope ${(b / a).toFixed(2)}.`,
    };
    const underlay = reveal.box ? boxUnderlay(a, b) : undefined;
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{`\\frac{x^2}{9} - \\frac{y^2}{${b * b}} = 1 \\quad (a = 3,\\ b = ${b})`}</Tex>
        <Tex>{`\\text{box corner } (3,\\, ${b})`}</Tex>
        <Tex>{`y = \\pm \\frac{${b}}{3}x`}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} underlay={underlay} />, dock);
  }

  // Slides 1 to 4: fixed worked hyperbolas.
  const vertical = mode === "orient";
  const a = 3;
  const b = 4;
  const orient: "h" | "v" = vertical ? "v" : "h";
  const boxHalfX = vertical ? b : a;
  const boxHalfY = vertical ? a : b;

  const spec: ConicSpec = {
    kind: "hyperbola",
    a,
    b,
    orient,
    center: true,
    vertices: Boolean(reveal.verts),
    asymptotes: Boolean(reveal.asym),
    aria: vertical
      ? "An up-down hyperbola with a central box 4 wide and 3 tall, and asymptotes of slope 3 over 4."
      : "A left-right hyperbola with a central box 3 wide and 4 tall, and asymptotes of slope 4 over 3.",
  };
  const underlay = reveal.box ? boxUnderlay(boxHalfX, boxHalfY) : undefined;

  const equation = vertical ? "\\frac{y^2}{9} - \\frac{x^2}{16} = 1" : "\\frac{x^2}{9} - \\frac{y^2}{16} = 1";
  const slopeTex = vertical ? "y = \\pm \\frac{a}{b}x = \\pm \\frac{3}{4}x" : "y = \\pm \\frac{b}{a}x = \\pm \\frac{4}{3}x";
  const cornerTex = vertical ? "(\\pm 4,\\, \\pm 3)" : "(\\pm 3,\\, \\pm 4)";

  const dock = showDock ? (
    <div className="formula-list">
      <Tex>{equation}</Tex>
      {reveal.box && <Tex>{`\\text{box corners } ${cornerTex}\\quad (a = 3,\\ b = 4)`}</Tex>}
      {reveal.asym && <Tex>{slopeTex}</Tex>}
      {reveal.verts && <Tex>{`\\text{vertices } ${vertical ? "(0,\\, \\pm 3)" : "(\\pm 3,\\, 0)"}`}</Tex>}
    </div>
  ) : null;

  return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} underlay={underlay} />, dock);
}
