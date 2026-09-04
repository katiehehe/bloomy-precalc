import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import FigureReadout from "../../components/FigureReadout";
import type { LessonFigureProps } from "../types";

const W = 240;
const H = 182;
const rad = (d: number) => (d * Math.PI) / 180;

type Pt = { x: number; y: number };
const mid = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

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
  const la = outward(mid(pb, pc), g, 15);
  const lb = outward(mid(pc, pa), g, 15);
  const lc = outward(mid(pa, pb), g, 15);
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

/** Sample an arc from angle a0 to a1 (screen radians) into a polyline path. */
function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const n = 18;
  const pts: string[] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = a0 + (a1 - a0) * (i / n);
    pts.push(`${(cx + r * Math.cos(t)).toFixed(2)},${(cy + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

/** A filled wedge marking the angle at the vertex, between two rays. */
function wedgePath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  return `M${cx.toFixed(2)},${cy.toFixed(2)} ${arcPath(cx, cy, r, a0, a1).slice(1)} Z`;
}

/** The included angle C between two rays (to B and to A), drawn at vertex C. */
function AngleC({ c, b, a, label = true }: { c: Pt; b: Pt; a: Pt; label?: boolean }) {
  const a0 = Math.atan2(b.y - c.y, b.x - c.x);
  const a1 = Math.atan2(a.y - c.y, a.x - c.x);
  const r = 26;
  const mAng = (a0 + a1) / 2;
  return (
    <>
      <path d={wedgePath(c.x, c.y, r, a0, a1)} fill="color-mix(in oklch, var(--primary) 16%, transparent)" stroke="none" />
      <path d={arcPath(c.x, c.y, r, a0, a1)} fill="none" stroke="var(--primary)" strokeWidth={2} />
      {label && (
        <text x={c.x + Math.cos(mAng) * (r + 14)} y={c.y + Math.sin(mAng) * (r + 14) + 4} textAnchor="middle" className="tri-vertex-label">
          C
        </text>
      )}
    </>
  );
}

// Fixed illustrative triangle for the setup slide. Angle C sits at the lower left
// between sides a (the base) and b (the left edge); side c is opposite C.
const Cs: Pt = { x: 40, y: 150 };
const Bs: Pt = { x: 210, y: 150 };
const As: Pt = { x: 104, y: 36 };

function SetupTriangle() {
  return (
    <svg
      className="figure"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Triangle ABC with the included angle C between sides a and b, and side c opposite C"
    >
      <polygon
        points={`${As.x},${As.y} ${Bs.x},${Bs.y} ${Cs.x},${Cs.y}`}
        fill="color-mix(in oklch, var(--primary) 6%, transparent)"
        stroke="var(--ink)"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <AngleC c={Cs} b={Bs} a={As} label={false} />
      <TriangleLabels a="a" b="b" c="c" tri={[As, Bs, Cs]} />
      {[
        { p: As, label: "A", dx: 0, dy: -8 },
        { p: Bs, label: "B", dx: 10, dy: 14 },
        { p: Cs, label: "C", dx: -10, dy: 14 },
      ].map(({ p, label, dx, dy }) => (
        <g key={label}>
          <circle cx={p.x} cy={p.y} r={3.2} fill="var(--ink)" />
          <text x={p.x + dx} y={p.y + dy} textAnchor="middle" className="tri-vertex-label">
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

const A_LEN = 4;
const B_LEN = 3;
// A shorter box so the wide oblique triangle fills the frame instead of floating
// in a tall band, matching the law-of-sines explore figure.
const EXPLORE_H = 150;

/** Two sides fixed (a = 4, b = 3), the included angle C set by the slider. */
function ExploreCosTriangle({ cDeg }: { cDeg: number }) {
  const Cw: Pt = { x: 0, y: 0 };
  const Bw: Pt = { x: A_LEN, y: 0 };
  const Aw: Pt = { x: B_LEN * Math.cos(rad(cDeg)), y: B_LEN * Math.sin(rad(cDeg)) };
  const [pc, pb, pa] = fit([Cw, Bw, Aw], 26, W, EXPLORE_H);
  const g: Pt = { x: (pa.x + pb.x + pc.x) / 3, y: (pa.y + pb.y + pc.y) / 3 };
  const clampX = (x: number) => Math.max(11, Math.min(W - 11, x));
  const clampY = (y: number) => Math.max(14, Math.min(EXPLORE_H - 4, y));
  const isRight = Math.abs(cDeg - 90) < 0.5;
  // Unit directions from C toward B and toward A, for a clean right-angle square.
  const ab = Math.atan2(pb.y - pc.y, pb.x - pc.x);
  const aa = Math.atan2(pa.y - pc.y, pa.x - pc.x);
  const q = 15;
  const sq = `M${(pc.x + q * Math.cos(ab)).toFixed(1)},${(pc.y + q * Math.sin(ab)).toFixed(1)} L${(
    pc.x + q * Math.cos(ab) + q * Math.cos(aa)
  ).toFixed(1)},${(pc.y + q * Math.sin(ab) + q * Math.sin(aa)).toFixed(1)} L${(pc.x + q * Math.cos(aa)).toFixed(1)},${(
    pc.y + q * Math.sin(aa)
  ).toFixed(1)}`;
  return (
    <svg
      className="flow-gauge flow-gauge--wide flow-gauge--tri figure-plot"
      viewBox={`0 0 ${W} ${EXPLORE_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Triangle with sides a = 4 and b = 3 and included angle C = ${cDeg} degrees`}
    >
      <polygon
        points={`${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`}
        fill="color-mix(in oklch, var(--primary) 6%, transparent)"
        stroke="var(--ink)"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      {isRight ? (
        <path d={sq} fill="none" stroke="var(--primary)" strokeWidth={2} />
      ) : (
        <AngleC c={pc} b={pb} a={pa} label={false} />
      )}
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

const DERIVE: FlowStep[] = [
  { id: "c0", tex: "C=(0,0),\\ B=(a,0),\\ A=(b\\cos C,\\, b\\sin C)" },
  { id: "c1", show: "d1", op: "\\text{distance from } A \\text{ to } B", tex: "c^2 = (a - b\\cos C)^2 + (b\\sin C)^2" },
  { id: "c2", show: "d2", op: "\\text{expand both squares}", tex: "c^2 = a^2 - 2ab\\cos C + b^2\\cos^2 C + b^2\\sin^2 C" },
  { id: "c3", show: "d3", op: "\\text{group the } b^2 \\text{ terms}", tex: "c^2 = a^2 + b^2(\\cos^2 C + \\sin^2 C) - 2ab\\cos C" },
  { id: "c4", show: "d4", tone: "good", result: true, op: "\\cos^2 C + \\sin^2 C = 1", tex: "c^2 = a^2 + b^2 - 2ab\\cos C" },
];

const SAS: FlowStep[] = [
  { id: "s0", tex: "c^2 = a^2 + b^2 - 2ab\\cos C" },
  { id: "s1", show: "w1", op: "a=8,\\ b=5,\\ C=60^\\circ", tex: "c^2 = 8^2 + 5^2 - 2(8)(5)\\cos 60^\\circ" },
  { id: "s2", show: "w2", op: "\\cos 60^\\circ = \\tfrac12", tex: "c^2 = 64 + 25 - 80\\cdot\\tfrac12" },
  { id: "s3", show: "w3", op: "\\text{combine}", tex: "c^2 = 89 - 40 = 49" },
  { id: "s4", show: "w4", tone: "good", result: true, op: "\\text{take the positive square root}", tex: "c = 7" },
];

const SSS: FlowStep[] = [
  { id: "u0", tex: "\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}" },
  { id: "u1", show: "u1", op: "a=8,\\ b=5,\\ c=7", tex: "\\cos C = \\dfrac{8^2 + 5^2 - 7^2}{2(8)(5)}" },
  { id: "u2", show: "u2", op: "\\text{simplify}", tex: "\\cos C = \\dfrac{40}{80} = \\tfrac12" },
  { id: "u3", show: "u3", tone: "good", result: true, op: "C = \\cos^{-1}\\tfrac12", tex: "C = 60^\\circ" },
];

export default function LawCosinesStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "setup";

  if (mode === "derive" || mode === "sas" || mode === "sss") {
    const steps = mode === "sas" ? SAS : mode === "sss" ? SSS : DERIVE;
    const heading =
      mode === "sas"
        ? "\\text{find } c \\text{ when } a=8,\\ b=5,\\ C=60^\\circ"
        : mode === "sss"
          ? "\\text{find } C \\text{ when } a=8,\\ b=5,\\ c=7"
          : "\\text{place } C \\text{ at the origin and expand}";
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
    const cDeg = Math.round(values.C ?? 50);
    const c = Math.sqrt(A_LEN * A_LEN + B_LEN * B_LEN - 2 * A_LEN * B_LEN * Math.cos(rad(cDeg)));
    const lines: string[] = [];
    if (reveal.e1) {
      lines.push(`c^2 = 25 - 24\\cos ${cDeg}^\\circ`);
      lines.push(`c \\approx ${c.toFixed(2)}`);
    }
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout
              figure={<ExploreCosTriangle cDeg={cDeg} />}
              heading={`C = ${cDeg}^\\circ`}
              lines={lines}
              note={reveal.e2 ? "when C = 90\u00b0, cos C = 0, so c\u00b2 = a\u00b2 + b\u00b2" : undefined}
            />
          </div>
        </div>
      </section>
    );
  }

  // setup: the labeled triangle with the included angle, plus the formula once revealed.
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <FigureReadout
            figure={<SetupTriangle />}
            lines={reveal.law ? ["c^2 = a^2 + b^2 - 2ab\\cos C"] : []}
            note={reveal.law ? "the angle C sits between sides a and b" : undefined}
          />
        </div>
      </div>
    </section>
  );
}
