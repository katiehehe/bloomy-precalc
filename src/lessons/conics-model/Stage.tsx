import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import ConicPlane, {
  type ConicSpec,
  type ConicPoint,
  type ConicSegment,
} from "../../components/ConicPlane";
import type { Plane } from "../../components/Plane";
import type { LessonFigureProps } from "../types";

/**
 * Conic modeling figures, all built on the shared ConicPlane. The curve is
 * visible from the start (this is modeling, not classification); foci, people,
 * focal radii, and light rays appear one at a time behind reveal flags.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   dish:       dock, rays, focus
 *   gallery:    dock, people, path
 *   loran:      dock, foci, radii
 *   flashlight: dock, focus, beam
 *   yourturn:   dock, focus
 */

const HALF: Record<string, number> = {
  dish: 3,
  gallery: 7,
  loran: 7,
  flashlight: 3,
  yourturn: 6,
};

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

export default function ConicsModelStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "dish";
  const half = HALF[mode] ?? 6;
  const showDock = Boolean(reveal.dock);

  // Slide 2: whispering gallery. Ellipse a = 5, b = 3, c = 4, foci (+/- 4, 0).
  if (mode === "gallery") {
    const points: ConicPoint[] = [];
    if (reveal.people) {
      points.push({ x: -4, y: 0, tone: "focus", label: "F1" });
      points.push({ x: 4, y: 0, tone: "focus", label: "F2" });
    }
    if (reveal.path) points.push({ x: 0, y: 3, tone: "ink" });
    const segments: ConicSegment[] = reveal.path
      ? [
          { x1: -4, y1: 0, x2: 0, y2: 3, variant: "1", label: "5" },
          { x1: 0, y1: 3, x2: 4, y2: 0, variant: "2", label: "5" },
        ]
      : [];
    const spec: ConicSpec = {
      kind: "ellipse",
      a: 5,
      b: 3,
      center: true,
      points,
      segments,
      aria:
        "A whispering-gallery ellipse, semi-major axis 5 across and semi-minor axis 3 up, with two foci at (plus and minus 4, 0) and an equal-length sound path reflecting from one focus off the top to the other focus.",
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{"\\frac{x^2}{25} + \\frac{y^2}{9} = 1 \\quad (a = 5,\\ b = 3)"}</Tex>
        {reveal.people && <Tex>{"c^2 = a^2 - b^2 = 25 - 9 = 16 \\;\\Rightarrow\\; c = 4"}</Tex>}
        {reveal.people && <Tex>{"\\text{foci } (\\pm 4,\\, 0),\\ \\text{people } 2c = 8 \\text{ ft apart}"}</Tex>}
        {reveal.path && <Tex>{"\\text{each leg} = 5,\\quad \\text{sum} = 2a = 10"}</Tex>}
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={half} />, dock);
  }

  // Slide 3: navigation. Hyperbola a = 3, b = 4, c = 5, foci (+/- 5, 0).
  if (mode === "loran") {
    const px = 3 * Math.SQRT2; // point on the right branch at y = 4
    const points: ConicPoint[] = [];
    if (reveal.foci) {
      points.push({ x: -5, y: 0, tone: "focus", label: "F1" });
      points.push({ x: 5, y: 0, tone: "focus", label: "F2" });
    }
    if (reveal.radii) points.push({ x: px, y: 4, tone: "ink", label: "P" });
    const segments: ConicSegment[] = reveal.radii
      ? [
          { x1: px, y1: 4, x2: -5, y2: 0, variant: "1", label: "d1" },
          { x1: px, y1: 4, x2: 5, y2: 0, variant: "2", label: "d2" },
        ]
      : [];
    const spec: ConicSpec = {
      kind: "hyperbola",
      a: 3,
      b: 4,
      orient: "h",
      vertices: true,
      center: true,
      points,
      segments,
      aria:
        "A navigation hyperbola with vertices at (plus and minus 3, 0) and foci at (plus and minus 5, 0); a point P on the right branch has two focal radii d1 and d2 whose difference is 6.",
    };
    const dock = showDock ? (
      <div className="formula-list">
        <Tex>{"\\frac{x^2}{9} - \\frac{y^2}{16} = 1 \\quad (a = 3,\\ b = 4)"}</Tex>
        {reveal.foci && <Tex>{"c^2 = a^2 + b^2 = 9 + 16 = 25 \\;\\Rightarrow\\; c = 5"}</Tex>}
        {reveal.foci && <Tex>{"\\text{foci (stations) } (\\pm 5,\\, 0)"}</Tex>}
        {reveal.radii && <Tex>{"|d_1 - d_2| = 2a = 6 \\quad (\\text{vertex: } 8 - 2 = 6)"}</Tex>}
      </div>
    ) : null;
    return frame(<ConicPlane spec={spec} half={half} />, dock);
  }

  // Slides 1, 4, 5: parabolic reflectors. All are x^2 = 4py with focus (0, p).
  const isYour = mode === "yourturn";
  const d = isYour ? Math.min(6, Math.max(1, Math.round(values.d ?? 5))) : 0;

  let coeff: number;
  let radius: number;
  let depth: number;
  let focusY: number;
  let focusLabel: string;
  let aria: string;

  if (mode === "flashlight") {
    coeff = 0.5;
    radius = 2;
    depth = 2;
    focusY = 0.5;
    focusLabel = "bulb (0, \u00bd)";
    aria = "A flashlight reflector 4 ft wide and 2 ft deep, with the bulb at the focus (0, one half) sending light out in a parallel beam.";
  } else if (isYour) {
    coeff = d / 4;
    radius = 2;
    depth = d;
    focusY = 1 / d;
    focusLabel = `(0, ${d === 1 ? "1" : (1 / d).toFixed(2)})`;
    aria = `A dish 4 ft wide and ${d} ft deep; the receiver sits at the focus (0, ${(1 / d).toFixed(2)}).`;
  } else {
    // dish
    coeff = 0.25;
    radius = 2;
    depth = 1;
    focusY = 1;
    focusLabel = "focus (0, 1)";
    aria = "A satellite dish 4 ft wide and 1 ft deep; parallel rays reflect through the focus (0, 1) where the receiver sits.";
  }

  const points: ConicPoint[] = [
    { x: -radius, y: depth, tone: "ink" },
    { x: radius, y: depth, tone: "ink" },
  ];
  if (reveal.focus) points.push({ x: 0, y: focusY, tone: "focus", label: focusLabel });

  const spec: ConicSpec = {
    kind: "parabola",
    h: 0,
    k: 0,
    coeff,
    orient: "v",
    center: true,
    points,
    aria,
  };

  const rayXs = [-1.5, 0, 1.5];
  const overlay = (plane: Plane): ReactNode => {
    if (mode === "dish") {
      return (
        <>
          {reveal.rays &&
            rayXs.map((x0, i) => (
              <line
                key={`in${i}`}
                x1={plane.sx(x0)}
                y1={plane.sy(half)}
                x2={plane.sx(x0)}
                y2={plane.sy(coeff * x0 * x0)}
                className="asymptote"
              />
            ))}
          {reveal.focus &&
            rayXs.map((x0, i) => (
              <line
                key={`rf${i}`}
                x1={plane.sx(x0)}
                y1={plane.sy(coeff * x0 * x0)}
                x2={plane.sx(0)}
                y2={plane.sy(focusY)}
                className="def-seg def-seg--2"
              />
            ))}
        </>
      );
    }
    if (mode === "flashlight") {
      return (
        <>
          {reveal.beam &&
            rayXs.map((x0, i) => (
              <g key={`bm${i}`}>
                <line
                  x1={plane.sx(0)}
                  y1={plane.sy(focusY)}
                  x2={plane.sx(x0)}
                  y2={plane.sy(coeff * x0 * x0)}
                  className="def-seg def-seg--1"
                />
                <line
                  x1={plane.sx(x0)}
                  y1={plane.sy(coeff * x0 * x0)}
                  x2={plane.sx(x0)}
                  y2={plane.sy(half)}
                  className="asymptote"
                />
              </g>
            ))}
        </>
      );
    }
    return null;
  };

  let dock: ReactNode = null;
  if (showDock) {
    if (mode === "dish") {
      dock = (
        <div className="formula-list">
          <Tex>{"x^2 = 4py \\quad (\\text{vertex at origin, opens up})"}</Tex>
          <Tex>{"\\text{4 ft wide, 1 ft deep} \\Rightarrow \\text{rim } (2,\\, 1)"}</Tex>
          {reveal.rays && <Tex>{"2^2 = 4p(1) \\;\\Rightarrow\\; 4 = 4p"}</Tex>}
          {reveal.focus && <Tex>{"p = 1 \\;\\Rightarrow\\; \\text{focus (receiver) } (0,\\, 1)"}</Tex>}
        </div>
      );
    } else if (mode === "flashlight") {
      dock = (
        <div className="formula-list">
          <Tex>{"x^2 = 4py \\quad (\\text{4 ft wide, 2 ft deep})"}</Tex>
          <Tex>{"\\text{rim } (2,\\, 2):\\ 2^2 = 4p(2) \\Rightarrow 4 = 8p"}</Tex>
          {reveal.focus && <Tex>{"p = \\tfrac{1}{2} \\;\\Rightarrow\\; \\text{bulb (focus) } (0,\\, \\tfrac{1}{2})"}</Tex>}
        </div>
      );
    } else {
      const pTex = d === 1 ? "1" : `\\tfrac{1}{${d}}`;
      dock = (
        <div className="formula-list">
          <Tex>{"x^2 = 4py,\\ \\text{width } 4 \\Rightarrow \\text{rim } (2,\\, d)"}</Tex>
          <Tex>{"2^2 = 4p\\,d \\;\\Rightarrow\\; p = \\dfrac{1}{d}"}</Tex>
          <Tex>{`d = ${d}\\text{ ft} \\;\\Rightarrow\\; p = ${pTex}\\text{ ft}`}</Tex>
          <Tex>{`\\text{focus (receiver) } (0,\\, ${pTex})`}</Tex>
        </div>
      );
    }
  }

  return frame(<ConicPlane spec={spec} half={half} overlay={overlay} />, dock);
}
