import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const W = 232;
const H = 168;
const AX = 28;
const AY = 134;
const S = 34;
const A_DEG = 30;
const B_LEN = 3;

const Cx = AX + S * B_LEN * Math.cos(toRadians(A_DEG));
const Cy = AY - S * B_LEN * Math.sin(toRadians(A_DEG));
const H_WORLD = B_LEN * Math.sin(toRadians(A_DEG));

/** Where the swinging side of length `aWorld` meets the base line, and how many triangles that makes. */
function solve(aWorld: number) {
  const r = S * aWorld;
  const dy = AY - Cy;
  if (r < dy - 0.4) return { count: 0, xs: [] as number[] };
  const off = Math.sqrt(Math.max(0, r * r - dy * dy));
  const roots = [Cx + off, Cx - off].filter((x) => x > AX + 3 && x < W - 6);
  const uniq = off < 1 ? [Cx] : roots;
  return { count: uniq.length, xs: uniq };
}

function TriangleSSA({ aWorld, full }: { aWorld: number; full?: boolean }) {
  const { count, xs } = solve(aWorld);
  const colors = ["var(--primary)", "var(--teal)"];
  return (
    <svg
      className={full ? "figure" : "flow-gauge flow-gauge--wide"}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Triangle with ${count} solution(s) for the swinging side`}
    >
      <line x1={AX} y1={AY} x2={W - 8} y2={AY} stroke="var(--line)" strokeWidth={1.4} />
      {count === 0 && <circle cx={Cx} cy={Cy} r={S * aWorld} fill="none" stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 4" opacity={0.7} />}
      {xs.map((x, i) => (
        <line key={`a${i}`} x1={Cx} y1={Cy} x2={x} y2={AY} stroke={colors[i] ?? "var(--primary)"} strokeWidth={2.4} strokeLinecap="round" />
      ))}
      {xs.map((x, i) => (
        <circle key={`b${i}`} cx={x} cy={AY} r={4} fill={colors[i] ?? "var(--primary)"} />
      ))}
      <line x1={Cx} y1={Cy} x2={Cx} y2={AY} stroke="var(--muted)" strokeWidth={1.2} strokeDasharray="3 3" />
      <text x={Cx + 4} y={(Cy + AY) / 2 + 3} className="angle-glyph-label" fill="var(--muted)">
        h
      </text>
      <line x1={AX} y1={AY} x2={Cx} y2={Cy} stroke="var(--cosine)" strokeWidth={2.4} strokeLinecap="round" />
      <text x={(AX + Cx) / 2 - 10} y={(AY + Cy) / 2 - 3} className="angle-glyph-label" fill="var(--cosine)">
        b
      </text>
      <circle cx={AX} cy={AY} r={2.8} fill="var(--ink)" />
      <text x={AX + 3} y={AY + 13} className="angle-glyph-label" fill="var(--ink)">
        A
      </text>
      <circle cx={Cx} cy={Cy} r={2.8} fill="var(--ink)" />
      <text x={Cx + 4} y={Cy - 4} className="angle-glyph-label" fill="var(--ink)">
        C
      </text>
      <text x={W / 2} y={16} textAnchor="middle" className="angle-glyph-label" fill="var(--ink)">
        {count === 0 ? "no triangle" : count === 1 ? "one triangle" : "two triangles"}
      </text>
    </svg>
  );
}

const LAW: FlowStep[] = [
  { id: "l0", tex: "\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}" },
  { id: "l1", show: "s1", op: "\\text{solve for } \\sin B", tex: "\\sin B = \\dfrac{b\\sin A}{a}" },
  { id: "l2", show: "s2", op: "A=30^\\circ,\\ a=2.5,\\ b=3", tex: "\\sin B = \\dfrac{3\\sin 30^\\circ}{2.5}" },
  { id: "l3", show: "s3", op: "\\text{evaluate}", tex: "\\sin B = \\dfrac{1.5}{2.5} = 0.6" },
  { id: "l4", show: "s4", op: "\\sin^{-1} \\text{ and its supplement}", tex: "B \\approx 36.9^\\circ \\ \\text{ or } \\ 143.1^\\circ" },
  { id: "l5", show: "s5", tone: "good", result: true, op: "\\text{each leaves a positive third angle}", tex: "\\text{two valid triangles}" },
];

export default function SsaStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "height";

  if (mode === "law") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={LAW} reveal={reveal} heading={"\\text{law of sines can give two answers}"} header={<TriangleSSA aWorld={2.5} />} />
          </div>
        </div>
      </section>
    );
  }

  const aWorld = (values.a ?? 15) / 10;
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <TriangleSSA aWorld={aWorld} full />
        </div>
      </div>
    </section>
  );
}
