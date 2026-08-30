import Tex from "../../components/Tex";
import VectorPlane, { type VecArrow, type VectorSpec } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

/** World half-range of the plane (read by the eval harness for plot bounds). */
const HALF = 5.5;
/** Slider units per world unit (kept in sync with slides.ts S). */
const SCALE = 20;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to at most two decimals, never render a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** Normalize an angle in degrees to the range [0, 360). */
const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

/** Render "vx i + vy j" with a clean sign between the terms. */
const ijForm = (vx: number, vy: number) =>
  `${trim(vx)}\\,\\mathbf{i} ${vy >= 0 ? "+" : "-"} ${trim(Math.abs(vy))}\\,\\mathbf{j}`;

/** Fixed worked vectors for the watch modes. */
const IJ_VEC = { x: 4, y: 3 };
const UNIT_VEC = { x: 3, y: 4 };

export default function VecCompStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "comp";

  // Resolve the live vector v = (vx, vy) for this mode.
  let vx: number;
  let vy: number;
  if (mode === "build") {
    const mag = (values.mag ?? 100) / SCALE;
    const dirDeg = values.dir ?? 0;
    const a = (dirDeg * Math.PI) / 180;
    vx = mag * Math.cos(a);
    vy = mag * Math.sin(a);
  } else if (mode === "ij") {
    vx = IJ_VEC.x;
    vy = IJ_VEC.y;
  } else if (mode === "unit") {
    vx = UNIT_VEC.x;
    vy = UNIT_VEC.y;
  } else {
    vx = (values.vx ?? 0) / SCALE;
    vy = (values.vy ?? 0) / SCALE;
  }

  const mag = Math.hypot(vx, vy);
  const dir = norm360((Math.atan2(vy, vx) * 180) / Math.PI);
  const ux = mag > 1e-6 ? vx / mag : 0;
  const uy = mag > 1e-6 ? vy / mag : 0;

  const arrows: VecArrow[] = [];
  if (mode === "ij") {
    if (reveal.combo) {
      arrows.push({ x2: vx, y2: 0, tone: "a", width: 3.4, label: `${trim(vx)}i` });
      arrows.push({ x1: vx, y1: 0, x2: vx, y2: vy, tone: "b", width: 3.4, label: `${trim(vy)}j` });
      arrows.push({ x2: vx, y2: vy, tone: "primary", width: 4.4, label: "v" });
    } else if (reveal.basis) {
      arrows.push({ x2: 1, y2: 0, tone: "a", width: 4, label: "i" });
      arrows.push({ x2: 0, y2: 1, tone: "b", width: 4, label: "j" });
    }
  } else if (mode === "unit") {
    if (reveal.showV) arrows.push({ x2: vx, y2: vy, tone: "primary", width: 4.4, label: "v" });
    if (reveal.unit) arrows.push({ x2: ux, y2: uy, tone: "accent", width: 5, label: "u" });
  } else {
    arrows.push({ x2: vx, y2: vy, tone: "primary", width: 4.4, label: "v", legs: Boolean(reveal.legs) });
  }

  const spec: VectorSpec = {
    aria: `A vector v = (${trim(vx)}, ${trim(vy)}) shown in component and unit-vector form.`,
    arrows,
    angle:
      reveal.angle && mag > 0.3 && dir > 2 && dir < 358
        ? { fromDeg: 0, toDeg: dir, label: "\u03b8", tone: "accent", radius: 30 }
        : undefined,
  };

  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={
              mode === "comp"
                ? (wx, wy) => {
                    props.setValue("vx", () => Math.round(clamp(wx * SCALE, -100, 100)));
                    props.setValue("vy", () => Math.round(clamp(wy * SCALE, -100, 100)));
                  }
                : undefined
            }
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              {mode === "ij" && (
                <>
                  <Tex>{"\\mathbf{i} = (1, 0), \\quad \\mathbf{j} = (0, 1)"}</Tex>
                  <Tex>{"v = v_x\\mathbf{i} + v_y\\mathbf{j}"}</Tex>
                  <Tex>{`v = ${ijForm(vx, vy)}`}</Tex>
                </>
              )}
              {mode === "unit" && (
                <>
                  <Tex>{`v = (${trim(vx)},\\ ${trim(vy)}), \\quad |v| = ${trim(mag)}`}</Tex>
                  <Tex>{`\\hat v = \\dfrac{v}{|v|} = (${trim(ux)},\\ ${trim(uy)})`}</Tex>
                  <Tex>{`|\\hat v| = ${trim(Math.hypot(ux, uy))}`}</Tex>
                </>
              )}
              {mode === "build" && (
                <>
                  <Tex>{`|v| = ${trim(mag)}, \\quad \\theta = ${trim(dir)}^\\circ`}</Tex>
                  <Tex>{"v = |v|(\\cos\\theta\\,\\mathbf{i} + \\sin\\theta\\,\\mathbf{j})"}</Tex>
                  <Tex>{`v = ${ijForm(vx, vy)}`}</Tex>
                </>
              )}
              {mode === "comp" && (
                <>
                  <Tex>{`v = (${trim(vx)},\\ ${trim(vy)}) = ${ijForm(vx, vy)}`}</Tex>
                  <Tex>{`|v| = ${trim(mag)}`}</Tex>
                  {mag > 0.05 ? (
                    <Tex>{`\\hat v = \\dfrac{v}{|v|} = (${trim(ux)},\\ ${trim(uy)})`}</Tex>
                  ) : (
                    <Tex>{"\\hat v = \\text{undefined at } v = 0"}</Tex>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
