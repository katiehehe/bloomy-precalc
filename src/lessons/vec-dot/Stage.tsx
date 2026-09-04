import { motion, useReducedMotion } from "motion/react";
import FigureReadout from "../../components/FigureReadout";
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

// Colours mark which vector each entry came from: a in the cosine tone, b in the
// teal tone, matching the arrows drawn on the plane in the later slides.
const CA = "#009a8b"; // vector a entries (cosine tone)
const CB = "#00b0a2"; // vector b entries (teal tone)

// The running example for the stacked-vectors picture. A three-component pair
// shows the rule generalises to any dimension.
const A_VEC = [2, 3, 1];
const B_VEC = [4, 1, 2];

// Geometry for the stacked figure. b's row sits close under a's row so a paired
// column reads as one unit that the highlighter slides across. Columns are packed
// tightly, with commas between entries, so each row reads as a normal vector.
const COL_GAP = 52;
const AROW_Y = 60;
const BROW_Y = 106;
const VB_W = 330;
const VB_H = 150;

// Space reserved left of the first column (for the "a =" labels) and right of the
// last column (for the closing bracket). They differ, so the whole group is
// centred against their difference rather than centring the columns alone.
const LABEL_PAD = 80;
const PAREN_PAD = 38;

/**
 * Two vectors written as rows, a stacked directly over b so matching entries line
 * up in columns. Each vector keeps its own angle brackets, so they read as two
 * separate vectors rather than one merged matrix. A single highlighter box slides
 * across one column at a time, boxing a_i and b_i together so the pair that
 * multiplies is seen as one unit. The vectors themselves never move; only the
 * highlighter does. This is a visual aid for the pairing, not the fastest way to
 * compute a dot product.
 */
function DotStack({ a, b, active }: { a: number[]; b: number[]; active: number }) {
  const reduce = useReducedMotion();
  const n = a.length;
  const col0 = (VB_W - ((n - 1) * COL_GAP + PAREN_PAD - LABEL_PAD)) / 2;
  const colX = (i: number) => col0 + i * COL_GAP;
  const bracketL = colX(0) - 38;
  const bracketR = colX(n - 1) + 38;
  const eqX = bracketL - 20;
  const labelX = eqX - 22;
  const boxW = 34;
  const boxTop = AROW_Y - 32;
  const boxH = BROW_Y + 16 - boxTop;
  const tw = { duration: reduce ? 0 : 0.45, ease: "easeInOut" as const };

  const entry = (v: number, x: number, y: number, color: string, key: string) => (
    <text key={key} x={x} y={y + 7} textAnchor="middle" fill={color} style={{ fontSize: 23, fontWeight: 700 }}>
      {v}
    </text>
  );

  // A chevron delimiter drawn per vector, so a and b keep their own angle
  // brackets instead of merging into one matrix-style bracket.
  const angleBracket = (x: number, y: number, right: boolean) => {
    const w = right ? -8 : 8;
    const h = 17;
    return (
      <path
        d={`M${x + w} ${y - h} L${x} ${y} L${x + w} ${y + h}`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  const rows = [
    { label: "a", color: CA, y: AROW_Y, vec: a },
    { label: "b", color: CB, y: BROW_Y, vec: b },
  ];

  return (
    <svg
      className="figure"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Vector a = (${a.join(", ")}) stacked over vector b = (${b.join(", ")}), each in its own angle brackets, with column ${active + 1} highlighted so its paired entries multiply together.`}
    >
      {active >= 0 && (
        <motion.rect
          initial={false}
          animate={{ x: colX(active) - boxW / 2 }}
          transition={tw}
          y={boxTop}
          width={boxW}
          height={boxH}
          rx={12}
          fill="var(--primary)"
          fillOpacity={0.14}
          stroke="var(--primary)"
          strokeOpacity={0.9}
          strokeWidth={2}
        />
      )}

      {rows.map((r) => (
        <g key={r.label}>
          <text x={labelX} y={r.y + 7} textAnchor="middle" fill={r.color} style={{ fontSize: 21, fontWeight: 700 }}>
            {r.label}
          </text>
          <text x={eqX} y={r.y + 7} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 18 }}>
            =
          </text>
          {angleBracket(bracketL, r.y, false)}
          {angleBracket(bracketR, r.y, true)}
          {r.vec.map((v, i) => entry(v, colX(i), r.y, r.color, `${r.label}${i}`))}
          {r.vec.slice(0, -1).map((_, i) => (
            <text
              key={`${r.label}comma${i}`}
              x={colX(i) + 18}
              y={r.y + 7}
              textAnchor="middle"
              fill={r.color}
              style={{ fontSize: 20, fontWeight: 700 }}
            >
              ,
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function VecDotStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "component";

  if (mode === "component") {
    // Each beat reveals the next paired column (p1, p2, p3). The highlighter
    // animates to the newest column and its product joins the readout; the last
    // column shows the full sum boxed. No slider: the sweep is the animation.
    const n = A_VEC.length;
    const revealed = [reveal.p1, reveal.p2, reveal.p3].filter(Boolean).length;
    const active = revealed - 1;
    const lines: string[] = [];
    for (let i = 0; i < revealed; i += 1) {
      lines.push(`(\\textcolor{${CA}}{${A_VEC[i]}})(\\textcolor{${CB}}{${B_VEC[i]}}) = ${A_VEC[i] * B_VEC[i]}`);
    }
    if (revealed === n) {
      const sum = A_VEC.map((_, i) => A_VEC[i] * B_VEC[i]).join(" + ");
      const total = A_VEC.reduce((s, _, i) => s + A_VEC[i] * B_VEC[i], 0);
      lines.push(`\\boxed{\\; \\mathbf{a}\\cdot\\mathbf{b} = ${sum} = ${total} \\;}`);
    }
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              align="top"
              heading={"\\mathbf{a}\\cdot\\mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3"}
              figure={<DotStack a={A_VEC} b={B_VEC} active={active} />}
              lines={lines}
            />
          </div>
        </div>
      </section>
    );
  }

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
        ? `Vector a = (4, 2) fixed and vector b = (${trim(B.x)}, ${trim(B.y)}). Their dot product is ${trim(dotLive)}.`
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
    <section className={`figure-area has-dock`}>
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
        <div className="figure-dock figure-dock--hold">
          {showDock && (
            <>            <div className="formula-list">
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
            </>
          )}
          </div>
      </div>
    </section>
  );
}
