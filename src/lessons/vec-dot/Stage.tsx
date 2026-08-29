import Tex from "../../components/Tex";
import VectorPlane, { type VectorSpec, type VecArrow } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

/** World half-range of the plane (read by the eval harness for plot bounds). */
const HALF = 5.5;
/** Slider units per world unit (kept in sync with slides.ts S). */
const SCALE = 20;

/** The fixed vector a for each mode. */
const A_BY_MODE: Record<string, { x: number; y: number }> = {
  component: { x: 2, y: 3 },
  geometric: { x: 4, y: 2 },
  angle: { x: 4, y: 2 },
  perp: { x: 4, y: 2 },
};

/** The vector b for the worked modes (perp reads b live from the sliders). */
const B_BY_MODE: Record<string, { x: number; y: number }> = {
  component: { x: 4, y: 1 },
  geometric: { x: 1, y: 3 },
  angle: { x: 1, y: 3 },
};

const deg = (v: { x: number; y: number }) => (Math.atan2(v.y, v.x) * 180) / Math.PI;

/** Trim to at most two decimals, never a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return String(v);
};

export default function VecDotStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "component";

  const A = A_BY_MODE[mode] ?? A_BY_MODE.component;
  const bx = (values.bx ?? 60) / SCALE;
  const by = (values.by ?? 60) / SCALE;
  const B = mode === "perp" ? { x: bx, y: by } : (B_BY_MODE[mode] ?? B_BY_MODE.geometric);

  const dotLive = A.x * B.x + A.y * B.y;

  const arrows: VecArrow[] = [];
  if (reveal.showA) arrows.push({ x2: A.x, y2: A.y, tone: "a", label: "a", width: 4 });
  if (reveal.showB) arrows.push({ x2: B.x, y2: B.y, tone: "b", label: "b", width: 4 });

  const spec: VectorSpec = {
    aria:
      mode === "perp"
        ? `Vector a = (4, 2) fixed and vector b = (${trim(B.x)}, ${trim(B.y)}); their dot product is ${trim(dotLive)}.`
        : `Vectors a = (${A.x}, ${A.y}) and b = (${B.x}, ${B.y}) on a coordinate plane, with dot product ${A.x * B.x + A.y * B.y}.`,
    arrows,
  };

  if (reveal.angle && reveal.showA && reveal.showB) {
    spec.angle = { fromDeg: deg(A), toDeg: deg(B), label: "\u03b8", tone: "primary" };
  }
  if (reveal.projection) {
    spec.projection = { onto: A, from: B };
  }

  const showDock = Boolean(reveal.dock);

  const status =
    Math.abs(dotLive) < 0.6
      ? "a \\perp b \\ \\ (\\text{right angle})"
      : dotLive > 0
        ? "\\text{acute angle } (a\\cdot b > 0)"
        : "\\text{obtuse angle } (a\\cdot b < 0)";

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={
              mode === "perp"
                ? (wx, wy) => {
                    props.setValue("bx", () => Math.round(wx * SCALE));
                    props.setValue("by", () => Math.round(wy * SCALE));
                  }
                : undefined
            }
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              {mode === "component" && (
                <>
                  <Tex>{"a \\cdot b = a_1 b_1 + a_2 b_2"}</Tex>
                  <Tex>{"a \\cdot b = (2)(4) + (3)(1) = 8 + 3 = 11"}</Tex>
                </>
              )}
              {mode === "geometric" && (
                <>
                  <Tex>{"a \\cdot b = (4)(1) + (2)(3) = 10"}</Tex>
                  <Tex>{"a \\cdot b = |a|\\,|b|\\cos\\theta"}</Tex>
                  <Tex>{"10 > 0 \\ \\Rightarrow\\ \\theta \\text{ is acute}"}</Tex>
                </>
              )}
              {mode === "angle" && (
                <>
                  <Tex>{"\\cos\\theta = \\dfrac{a \\cdot b}{|a|\\,|b|} = \\dfrac{10}{10\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}"}</Tex>
                  <Tex>{"\\theta = 45^\\circ"}</Tex>
                  {reveal.projection && (
                    <>
                      <Tex>{"\\dfrac{a \\cdot b}{|a|} = \\sqrt{5} \\quad (\\text{scalar})"}</Tex>
                      <Tex>{"\\dfrac{a \\cdot b}{|a|^2}\\,a = (2, 1) \\quad (\\text{vector})"}</Tex>
                    </>
                  )}
                </>
              )}
              {mode === "perp" && (
                <>
                  <Tex>{`a = (4, 2), \\quad b = (${trim(B.x)}, ${trim(B.y)})`}</Tex>
                  <Tex>{`a \\cdot b = 4(${trim(B.x)}) + 2(${trim(B.y)}) = ${trim(dotLive)}`}</Tex>
                  <Tex>{status}</Tex>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
