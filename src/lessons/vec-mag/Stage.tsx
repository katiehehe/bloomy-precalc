import type { ReactNode } from "react";
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

export default function VecMagStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "single";

  // Resolve the live vector v = (vx, vy) from whichever form drives this slide.
  let vx: number;
  let vy: number;
  if (mode === "single") {
    const mag = (values.mag ?? 60) / SCALE;
    const dirDeg = values.dir ?? 40;
    const a = (dirDeg * Math.PI) / 180;
    vx = mag * Math.cos(a);
    vy = mag * Math.sin(a);
  } else {
    vx = (values.vx ?? 60) / SCALE;
    vy = (values.vy ?? 80) / SCALE;
  }

  const mag = Math.hypot(vx, vy);
  const dir = norm360((Math.atan2(vy, vx) * 180) / Math.PI);

  const arrows: VecArrow[] = [
    { x2: vx, y2: vy, tone: "primary", label: "v", width: 4.4, legs: Boolean(reveal.legs) },
  ];

  const spec: VectorSpec = {
    aria: `A vector v = (${trim(vx)}, ${trim(vy)}) with magnitude ${trim(mag)} at ${Math.round(dir)} degrees.`,
    arrows,
    angle:
      reveal.angle && mag > 0.3 && dir > 2 && dir < 358
        ? { fromDeg: 0, toDeg: dir, label: "\u03b8", tone: "accent", radius: 30 }
        : undefined,
    overlay: (plane) => {
      const els: ReactNode[] = [];
      const sgnX = Math.sign(vx) || 1;
      const sgnY = Math.sign(vy) || 1;
      if (reveal.legs && mag > 0.3) {
        els.push(
          <text
            key="lx"
            x={plane.sx(vx / 2)}
            y={plane.sy(0) + 17 * sgnY + (vy >= 0 ? 0 : 3)}
            className="tri-label tri-label--x"
            textAnchor="middle"
          >
            {trim(vx)}
          </text>,
          <text
            key="ly"
            x={plane.sx(vx) + 15 * sgnX}
            y={plane.sy(vy / 2) + 4}
            className="tri-label tri-label--y"
            textAnchor="middle"
          >
            {trim(vy)}
          </text>,
        );
      }
      if (reveal.hyp && mag > 0.3) {
        const mx = plane.sx(vx / 2);
        const my = plane.sy(vy / 2);
        const dx = plane.sx(vx) - plane.center;
        const dy = plane.sy(vy) - plane.center;
        const len = Math.hypot(dx, dy) || 1;
        els.push(
          <text
            key="hyp"
            x={mx + (dy / len) * 22}
            y={my - (dx / len) * 22 + 4}
            className="tri-label tri-label--r"
            textAnchor="middle"
          >
            |v| = {trim(mag)}
          </text>,
        );
      }
      return <g>{els}</g>;
    },
  };

  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={
              mode === "single"
                ? (wx, wy) => {
                    props.setValue("dir", () => Math.round(norm360((Math.atan2(wy, wx) * 180) / Math.PI)));
                    props.setValue("mag", () => Math.round(clamp(Math.hypot(wx, wy) * SCALE, 20, 100)));
                  }
                : (wx, wy) => {
                    props.setValue("vx", () => Math.round(clamp(wx * SCALE, -100, 100)));
                    props.setValue("vy", () => Math.round(clamp(wy * SCALE, -100, 100)));
                  }
            }
          />
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">
          {showDock && (
            <>
            <dl className="values values--four">
              <div>
                <dt>
                  <Tex>{"|v|"}</Tex>
                </dt>
                <dd className="value-primary">{trim(mag)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"\\theta"}</Tex>
                </dt>
                <dd>{`${trim(dir)}\u00b0`}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"v_x"}</Tex>
                </dt>
                <dd className="value-cos">{trim(vx)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"v_y"}</Tex>
                </dt>
                <dd className="value-sin">{trim(vy)}</dd>
              </div>
            </dl>
            <div className="formula-list">
              {mode === "single" ? (
                <Tex>{"v_x = |v|\\cos\\theta, \\quad v_y = |v|\\sin\\theta"}</Tex>
              ) : (
                <Tex>{"|v| = \\sqrt{v_x^2 + v_y^2}"}</Tex>
              )}
            </div>
            </>
          )}
          </div>
      </div>
    </section>
  );
}
