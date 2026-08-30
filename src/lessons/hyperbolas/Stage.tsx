import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, { type ConicSpec, type ConicPoint } from "../../components/ConicPlane";
import type { LessonFigureProps } from "../types";

/**
 * Hyperbola figures, all built on the shared ConicPlane. a is the semi-axis
 * under the positive term (center to vertex). Vertices are drawn as labeled dark
 * dots. Asymptotes are intentionally omitted (their own lesson covers them).
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   standardh:  dock, curve, verts
 *   sign:       dock, curve, verts
 *   vertexrule: dock, curve, verts
 *   read:       dock, curve, verts
 *   yourturn:   dock
 */

const HALF = 6;

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

/** The two vertices, at distance a along the transverse axis, as labeled dots. */
function vertexPoints(a: number, orient: "h" | "v"): ConicPoint[] {
  if (orient === "h") {
    return [
      { x: a, y: 0, tone: "ink", label: `(${a}, 0)` },
      { x: -a, y: 0, tone: "ink" },
    ];
  }
  return [
    { x: 0, y: a, tone: "ink", label: `(0, ${a})` },
    { x: 0, y: -a, tone: "ink" },
  ];
}

export default function HyperbolasStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "standardh";
  const showDock = Boolean(reveal.dock);

  // Slide 5: a drives the vertex distance; b is fixed at 4, opens left-right.
  if (mode === "yourturn") {
    const a = Math.min(5, Math.max(1, Math.round(values.a ?? 1)));
    const b = 4;
    const spec: ConicSpec = {
      kind: "hyperbola",
      a,
      b,
      orient: "h",
      center: true,
      points: vertexPoints(a, "h"),
      aria: `A left-right hyperbola with vertices at (plus and minus ${a}, 0) and b fixed at 4.`,
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{`\\frac{x^2}{${a}^2} - \\frac{y^2}{16} = 1`}</Tex>
        <Tex>{`a = ${a},\\quad b = 4`}</Tex>
        <Tex>{`\\text{vertices } (\\pm ${a},\\, 0)`}</Tex>
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={HALF} />, dock);
  }

  // Slides 1 to 4: fixed worked hyperbolas.
  let a: number;
  let b: number;
  let orient: "h" | "v";
  let equation: string;
  if (mode === "sign") {
    a = 3;
    b = 4;
    orient = "v";
    equation = "\\frac{y^2}{9} - \\frac{x^2}{16} = 1";
  } else if (mode === "read") {
    a = 2;
    b = 3;
    orient = "v";
    equation = "\\frac{y^2}{4} - \\frac{x^2}{9} = 1";
  } else {
    // standardh and vertexrule both use x^2/9 - y^2/16 = 1
    a = 3;
    b = 4;
    orient = "h";
    equation = "\\frac{x^2}{9} - \\frac{y^2}{16} = 1";
  }

  const points: ConicPoint[] = reveal.verts ? vertexPoints(a, orient) : [];

  const spec: ConicSpec = {
    kind: "hyperbola",
    a,
    b,
    orient,
    center: true,
    points,
    aria: `A hyperbola opening ${orient === "h" ? "left and right" : "up and down"} with vertices at distance ${a} from the center.`,
  };

  const openTex = orient === "h" ? "\\text{opens left-right}" : "\\text{opens up-down}";
  const vertexTex = orient === "h" ? `(\\pm ${a},\\, 0)` : `(0,\\, \\pm ${a})`;

  const dock = showDock ? (
    <div className="formula-list">
      <Tex>{equation}</Tex>
      <Tex>{`a = ${a} \\ (\\text{under the } + \\text{ term}),\\quad b = ${b}`}</Tex>
      {reveal.verts && <Tex>{`${openTex},\\ \\text{vertices } ${vertexTex}`}</Tex>}
    </div>
  ) : null;

  return frame(<ConicPlane spec={spec} half={HALF} showCurve={Boolean(reveal.curve)} />, dock);
}
