import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import FigureReadout from "../../components/FigureReadout";
import type { LessonFigureProps } from "../types";

const W = 240;
const H = 182;
const rad = (d: number) => (d * Math.PI) / 180;

type Pt = { x: number; y: number };
const mid = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

// A fixed illustrative triangle (SVG coordinates, y down) for the setup and
// derivation slides, where exact scale does not matter, only clear labels.
const A0: Pt = { x: 30, y: 152 };
const B0: Pt = { x: 214, y: 152 };
const C0: Pt = { x: 150, y: 38 };
const FOOT: Pt = { x: 150, y: 152 };

/** Push a label outward from the triangle centroid so it clears the edges. */
function outward(p: Pt, centroid: Pt, dist: number): Pt {
  const dx = p.x - centroid.x;
  const dy = p.y - centroid.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: p.x + (dx / len) * dist, y: p.y + (dy / len) * dist };
}

function TriangleLabels({ a, b, c, tri }: { a: string; b: string; c: string; tri: [Pt, Pt, Pt] }) {
  const [pa, pb, pc] = tri;
  const g: Pt = { x: (pa.x + pb.x + pc.x) / 3, y: (pa.y + pb.y + pc.y) / 3 };
  const la = outward(mid(pb, pc), g, 14);
  const lb = outward(mid(pc, pa), g, 14);
  const lc = outward(mid(pa, pb), g, 14);
  return (
    <>
      <text x={la.x} y={la.y + 4} textAnchor="middle" className="tri-side-label">
        {a}
      </text>
      <text x={lb.x} y={lb.y + 4} textAnchor="middle" className="tri-side-label">
        {b}
      </text>
      <text x={lc.x} y={lc.y + 4} textAnchor="middle" className="tri-side-label">
        {c}
      </text>
    </>
  );
}

function FixedTriangle({ mode, reveal }: { mode: string; reveal: LessonFigureProps["reveal"] }) {
  const showAlt = mode === "derive";
  return (
    <svg className="figure" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Triangle ABC with sides a, b, c opposite angles A, B, C">
      <polygon points={`${A0.x},${A0.y} ${B0.x},${B0.y} ${C0.x},${C0.y}`} fill="color-mix(in oklch, var(--primary) 6%, transparent)" stroke="var(--ink)" strokeWidth={2.2} strokeLinejoin="round" />

      {showAlt && (
        <>
          {reveal.h1 && (
            <polygon
              points={`${A0.x},${A0.y} ${FOOT.x},${FOOT.y} ${C0.x},${C0.y}`}
              fill="color-mix(in oklch, var(--primary) 16%, transparent)"
            />
          )}
          {reveal.h2 && (
            <polygon
              points={`${FOOT.x},${FOOT.y} ${B0.x},${B0.y} ${C0.x},${C0.y}`}
              fill="color-mix(in oklch, var(--teal) 20%, transparent)"
            />
          )}
          <line x1={C0.x} y1={C0.y} x2={FOOT.x} y2={FOOT.y} stroke="var(--ink)" strokeWidth={1.6} strokeDasharray="3 3" />
          <path d={`M ${FOOT.x - 10} ${FOOT.y} L ${FOOT.x - 10} ${FOOT.y - 10} L ${FOOT.x} ${FOOT.y - 10}`} fill="none" stroke="var(--ink)" strokeWidth={1.4} />
          <text x={FOOT.x - 6} y={(C0.y + FOOT.y) / 2} textAnchor="end" className="tri-side-label">
            h
          </text>
        </>
      )}

      <TriangleLabels a="a" b="b" c="c" tri={[A0, B0, C0]} />

      {[
        { p: A0, label: "A" },
        { p: B0, label: "B" },
        { p: C0, label: "C" },
      ].map(({ p, label }) => (
        <g key={label}>
          <circle cx={p.x} cy={p.y} r={3.2} fill="var(--ink)" />
          <text
            x={p.x + (label === "B" ? 8 : label === "A" ? -8 : 0)}
            y={p.y + (label === "C" ? -8 : 16)}
            textAnchor="middle"
            className="tri-vertex-label"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Fit world points (y up) into the SVG box (y down), centered with padding. */
function fit(pts: Pt[], pad: number, boxW = W, boxH = H): Pt[] {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minx = Math.min(...xs);
  const maxx = Math.max(...xs);
  const miny = Math.min(...ys);
  const maxy = Math.max(...ys);
  const s = Math.min((boxW - 2 * pad) / Math.max(1e-6, maxx - minx), (boxH - 2 * pad) / Math.max(1e-6, maxy - miny));
  const ox = pad + (boxW - 2 * pad - s * (maxx - minx)) / 2;
  const oy = pad + (boxH - 2 * pad - s * (maxy - miny)) / 2;
  return pts.map((p) => ({ x: ox + s * (p.x - minx), y: boxH - (oy + s * (p.y - miny)) }));
}

const A_FIXED = 40;
const A_SIDE = 6;
// A shorter box than the setup triangle so the wide, flat oblique triangle fills
// the figure instead of floating in a tall frame with empty bands above and below.
const EXPLORE_H = 150;

/** The interactive triangle: side a and angle A fixed, angle B set by the slider. */
function ExploreTriangle({ bDeg }: { bDeg: number }) {
  const cDeg = 180 - A_FIXED - bDeg;
  const b = (A_SIDE * Math.sin(rad(bDeg))) / Math.sin(rad(A_FIXED));
  const c = (A_SIDE * Math.sin(rad(cDeg))) / Math.sin(rad(A_FIXED));
  const Aw: Pt = { x: 0, y: 0 };
  const Bw: Pt = { x: c, y: 0 };
  const Cw: Pt = { x: b * Math.cos(rad(A_FIXED)), y: b * Math.sin(rad(A_FIXED)) };
  const [pa, pb, pc] = fit([Aw, Bw, Cw], 26, W, EXPLORE_H);
  const g: Pt = { x: (pa.x + pb.x + pc.x) / 3, y: (pa.y + pb.y + pc.y) / 3 };
  const clampX = (x: number) => Math.max(11, Math.min(W - 11, x));
  const clampY = (y: number) => Math.max(14, Math.min(EXPLORE_H - 4, y));
  return (
    <svg className="flow-gauge flow-gauge--wide flow-gauge--tri figure-plot" viewBox={`0 0 ${W} ${EXPLORE_H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Triangle with angle B set to ${bDeg} degrees`}>
      <polygon points={`${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`} fill="color-mix(in oklch, var(--primary) 6%, transparent)" stroke="var(--ink)" strokeWidth={2.4} strokeLinejoin="round" />
      <TriangleLabels a="a" b="b" c="c" tri={[pa, pb, pc]} />
      {[
        { p: pa, label: "A" },
        { p: pb, label: "B" },
        { p: pc, label: "C" },
      ].map(({ p, label }) => {
        const lp = outward(p, g, 17);
        return (
          <g key={label}>
            <circle cx={p.x} cy={p.y} r={3.6} fill="var(--ink)" />
            <text x={clampX(lp.x)} y={clampY(lp.y + 4)} textAnchor="middle" className="tri-vertex-label">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const RATIO: FlowStep[] = [
  { id: "r0", tex: "h = b\\sin A \\quad\\text{and}\\quad h = a\\sin B" },
  { id: "r1", show: "s1", op: "\\text{same } h \\text{, so set them equal}", tex: "b\\sin A = a\\sin B" },
  { id: "r2", show: "s2", op: "\\text{divide both sides by } \\sin A\\sin B", tex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}" },
  { id: "r3", show: "s3", tone: "good", result: true, op: "\\text{an altitude to another side adds } c", tex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}" },
];

const WORKED: FlowStep[] = [
  { id: "w0", tex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}" },
  { id: "w1", show: "s1", op: "\\text{solve for the unknown side } b", tex: "b = \\dfrac{a\\sin B}{\\sin A}" },
  { id: "w2", show: "s2", op: "A=40^\\circ,\\ B=75^\\circ,\\ a=10", tex: "b = \\dfrac{10\\sin 75^\\circ}{\\sin 40^\\circ}" },
  { id: "w3", show: "s3", op: "\\sin 75^\\circ \\approx 0.966,\\ \\sin 40^\\circ \\approx 0.643", tex: "b = \\dfrac{9.66}{0.643}" },
  { id: "w4", show: "s4", tone: "good", result: true, op: "\\text{divide}", tex: "b \\approx 15.0" },
];

export default function LawSinesStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "setup";

  if (mode === "ratio" || mode === "worked") {
    const steps = mode === "worked" ? WORKED : RATIO;
    const heading =
      mode === "worked"
        ? "\\text{find } b \\text{ when } A=40^\\circ,\\ B=75^\\circ,\\ a=10"
        : "\\text{each side over its opposite sine}";
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={steps} reveal={reveal} heading={heading} focus />
          </div>
        </div>
      </section>
    );
  }

  if (mode === "explore") {
    const bDeg = Math.round(values.B ?? 30);
    const cDeg = 180 - A_FIXED - bDeg;
    const b = (A_SIDE * Math.sin(rad(bDeg))) / Math.sin(rad(A_FIXED));
    const ratioA = A_SIDE / Math.sin(rad(A_FIXED));
    const ratioB = b / Math.sin(rad(bDeg));
    const lines: string[] = [];
    if (reveal.s1) lines.push(`\\dfrac{a}{\\sin A} = \\dfrac{6}{\\sin 40^\\circ} = ${ratioA.toFixed(2)}`);
    if (reveal.s2) lines.push(`\\dfrac{b}{\\sin B} = \\dfrac{${b.toFixed(1)}}{\\sin ${bDeg}^\\circ} = ${ratioB.toFixed(2)}`);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<ExploreTriangle bDeg={bDeg} />}
              heading={`C = ${cDeg}^\\circ`}
              lines={lines}
              note={reveal.s3 ? "same ratio for every side" : undefined}
            />
          </div>
        </div>
      </section>
    );
  }

  // setup and derive share the fixed illustrative triangle.
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <FixedTriangle mode={mode} reveal={reveal} />
        </div>
      </div>
    </section>
  );
}
