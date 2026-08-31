import Tex from "../../components/Tex";
import VectorPlane, { type VecArrow, type VectorSpec } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

/** World half-range per mode (read by the eval harness for plot bounds). */
const HALF: Record<string, number> = { add: 7, sub: 7, scale: 6.5, combo: 6 };
/** Slider units per world unit (kept in sync with slides.ts S). */
const SCALE = 20;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to at most two decimals, never render a signed zero. */
const trim = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** Format an ordered pair for a readout. */
const pair = (x: number, y: number) => `(${trim(x)},\\ ${trim(y)})`;

/** Fixed worked vectors. */
const A_ADD = { x: 3, y: 1 };
const V_SCALE = { x: 2, y: 1 };
const A_COMBO = { x: 2, y: 1 };
const B_COMBO = { x: 1, y: 3 };

export default function VecOpsStage(props: LessonFigureProps) {
  const { slide, values, reveal, drawProgress } = props;
  const mode = slide.mode ?? "add";
  const dp = drawProgress;

  // Live controls.
  const bx = (values.bx ?? 0) / SCALE;
  const by = (values.by ?? 0) / SCALE;
  const k = (values.k ?? 100) / 100;

  // Vectors used across the modes.
  const b = { x: bx, y: by };
  const sum = { x: A_ADD.x + b.x, y: A_ADD.y + b.y };
  const negB = { x: -b.x, y: -b.y };
  const diff = { x: A_ADD.x - b.x, y: A_ADD.y - b.y };
  const ghostTip = { x: A_ADD.x + b.x, y: A_ADD.y + b.y };
  const kv = { x: k * V_SCALE.x, y: k * V_SCALE.y };
  const twoA = { x: 2 * A_COMBO.x, y: 2 * A_COMBO.y };
  const res = { x: 2 * A_COMBO.x - B_COMBO.x, y: 2 * A_COMBO.y - B_COMBO.y };

  const arrows: VecArrow[] = [];
  let aria = "Vectors on a coordinate plane.";

  if (mode === "add") {
    const fracA = reveal.drawA ? (reveal.drawB ? 1 : dp) : 0;
    const fracB = reveal.drawB ? (reveal.drawSum ? 1 : dp) : 0;
    const fracSum = reveal.drawSum ? dp : 0;
    if (reveal.drawA) arrows.push({ x2: A_ADD.x, y2: A_ADD.y, tone: "a", width: 3.8, label: "a", fraction: fracA });
    if (reveal.drawB) arrows.push({ x1: A_ADD.x, y1: A_ADD.y, x2: sum.x, y2: sum.y, tone: "b", width: 3.8, label: "b", fraction: fracB, labelAt: "mid" });
    if (reveal.drawSum) arrows.push({ x2: sum.x, y2: sum.y, tone: "primary", width: 4.6, label: "a + b", fraction: fracSum });
    aria = `Vector a equals (3, 1) and b equals ${pair(b.x, b.y)}, added tip to tail to give ${pair(sum.x, sum.y)}.`;
  } else if (mode === "sub") {
    const fracA = reveal.drawA ? (reveal.drawNegB ? 1 : dp) : 0;
    const fracNegB = reveal.drawNegB ? (reveal.drawDiff ? 1 : dp) : 0;
    const fracDiff = reveal.drawDiff ? dp : 0;
    if (reveal.showGhostB)
      arrows.push({ x1: A_ADD.x, y1: A_ADD.y, x2: ghostTip.x, y2: ghostTip.y, tone: "muted", width: 2.6, label: "b", dashed: true });
    if (reveal.drawA) arrows.push({ x2: A_ADD.x, y2: A_ADD.y, tone: "a", width: 3.8, label: "a", fraction: fracA });
    if (reveal.drawNegB)
      arrows.push({ x1: A_ADD.x, y1: A_ADD.y, x2: diff.x, y2: diff.y, tone: "b", width: 3.8, label: "-b", fraction: fracNegB, labelAt: "mid" });
    if (reveal.drawDiff) arrows.push({ x2: diff.x, y2: diff.y, tone: "primary", width: 4.6, label: "a - b", fraction: fracDiff });
    aria = `Vector a equals (3, 1); subtracting b equals ${pair(b.x, b.y)} gives a minus b equals ${pair(diff.x, diff.y)}.`;
  } else if (mode === "scale") {
    // v and kv are collinear, so pull v's label off to the side of its shaft (mid
    // + a perpendicular nudge) and keep kv's plain "kv" label at the head, so the
    // two never stack on the shared line.
    if (reveal.showBase)
      arrows.push({ x2: V_SCALE.x, y2: V_SCALE.y, tone: "muted", width: 3, label: "v", dashed: true, labelAt: "mid", labelDx: -8, labelDy: -14 });
    if (reveal.showScaled) arrows.push({ x2: kv.x, y2: kv.y, tone: "primary", width: 4.6, label: "kv" });
    aria = `Vector v equals (2, 1) scaled by k equals ${trim(k)} to give ${pair(kv.x, kv.y)}.`;
  } else {
    // combo: 2a - b, built as 2a then -b tip to tail.
    if (reveal.comboA && !reveal.comboTwoA) arrows.push({ x2: A_COMBO.x, y2: A_COMBO.y, tone: "a", width: 3.2, label: "a" });
    if (reveal.comboA) arrows.push({ x2: B_COMBO.x, y2: B_COMBO.y, tone: "muted", width: 2.6, label: "b", dashed: true });
    if (reveal.comboTwoA) arrows.push({ x2: twoA.x, y2: twoA.y, tone: "a", width: 4, label: "2a" });
    if (reveal.comboNegB) arrows.push({ x1: twoA.x, y1: twoA.y, x2: res.x, y2: res.y, tone: "b", width: 3.8, label: "-b", labelAt: "mid" });
    if (reveal.comboRes) arrows.push({ x2: res.x, y2: res.y, tone: "primary", width: 4.6, label: "2a - b" });
    aria = `Combination two a minus b with a equals (2, 1) and b equals (1, 3) gives ${pair(res.x, res.y)}.`;
  }

  const spec: VectorSpec = { aria, arrows };

  const half = HALF[mode] ?? 7;
  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={half}
            onDrag={
              mode === "add" || mode === "sub"
                ? (wx, wy) => {
                    props.setValue("bx", () => Math.round(clamp(wx * SCALE, -100, 100) / 5) * 5);
                    props.setValue("by", () => Math.round(clamp(wy * SCALE, -100, 100) / 5) * 5);
                  }
                : undefined
            }
          />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              {mode === "add" && (
                <>
                  <Tex>{`a = ${pair(A_ADD.x, A_ADD.y)}, \\quad b = ${pair(b.x, b.y)}`}</Tex>
                  <Tex>{"a + b = (a_x + b_x,\\ a_y + b_y)"}</Tex>
                  <Tex>{`a + b = ${pair(sum.x, sum.y)}`}</Tex>
                </>
              )}
              {mode === "sub" && (
                <>
                  <Tex>{`a = ${pair(A_ADD.x, A_ADD.y)}, \\quad b = ${pair(b.x, b.y)}`}</Tex>
                  <Tex>{`-b = ${pair(negB.x, negB.y)}`}</Tex>
                  <Tex>{`a - b = a + (-b) = ${pair(diff.x, diff.y)}`}</Tex>
                </>
              )}
              {mode === "scale" && (
                <>
                  <Tex>{`v = ${pair(V_SCALE.x, V_SCALE.y)}, \\quad k = ${trim(k)}`}</Tex>
                  <Tex>{"k\\,v = (k\\,v_x,\\ k\\,v_y)"}</Tex>
                  <Tex>{`k\\,v = ${pair(kv.x, kv.y)}`}</Tex>
                </>
              )}
              {mode === "combo" && (
                <>
                  <Tex>{`a = ${pair(A_COMBO.x, A_COMBO.y)}, \\quad b = ${pair(B_COMBO.x, B_COMBO.y)}`}</Tex>
                  <Tex>{`2a = ${pair(twoA.x, twoA.y)}`}</Tex>
                  <Tex>{`2a - b = ${pair(res.x, res.y)}`}</Tex>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
