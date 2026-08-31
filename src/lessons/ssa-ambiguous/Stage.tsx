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

// ---- Intro slide: the triangle-determination cases, each a small diagram. ----

type Given = { sides: number[]; angles: number[] };

const MT = [
  { x: 16, y: 74 },
  { x: 92, y: 74 },
  { x: 64, y: 20 },
];
const MEDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 0],
];

const dir = (p: { x: number; y: number }, q: { x: number; y: number }) => Math.atan2(q.y - p.y, q.x - p.x);

/** A small interior angle arc at vertex `v`, between its two incident edges. */
function miniAngle(v: number, r: number) {
  const P = MT[v];
  const others = [0, 1, 2].filter((i) => i !== v);
  const a1 = dir(P, MT[others[0]]);
  const a2 = dir(P, MT[others[1]]);
  const s = { x: P.x + r * Math.cos(a1), y: P.y + r * Math.sin(a1) };
  const e = { x: P.x + r * Math.cos(a2), y: P.y + r * Math.sin(a2) };
  let d = a2 - a1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const sweep = d >= 0 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

function MiniTriangle({ given, color }: { given: Given; color: string }) {
  return (
    <svg className="tri-mini" viewBox="0 0 108 92" role="img" aria-hidden="true">
      {MEDGES.map(([i, j], k) => (
        <line key={`e${k}`} x1={MT[i].x} y1={MT[i].y} x2={MT[j].x} y2={MT[j].y} stroke="var(--line)" strokeWidth={1.5} />
      ))}
      {given.sides.map((si) => {
        const [i, j] = MEDGES[si];
        return (
          <line key={`s${si}`} x1={MT[i].x} y1={MT[i].y} x2={MT[j].x} y2={MT[j].y} stroke={color} strokeWidth={3.6} strokeLinecap="round" />
        );
      })}
      {given.angles.map((v) => (
        <path key={`a${v}`} d={miniAngle(v, 15)} fill="none" stroke={color} strokeWidth={2.6} />
      ))}
      {MT.map((p, i) => (
        <circle key={`v${i}`} cx={p.x} cy={p.y} r={2.4} fill="var(--ink)" />
      ))}
    </svg>
  );
}

const CASES: { key: string; given: Given; note: string; ambiguous?: boolean; show?: string }[] = [
  { key: "SSS", given: { sides: [0, 1, 2], angles: [] }, note: "one triangle" },
  { key: "SAS", given: { sides: [0, 1], angles: [1] }, note: "one triangle" },
  { key: "ASA", given: { sides: [0], angles: [0, 1] }, note: "one triangle" },
  { key: "AAS", given: { sides: [1], angles: [0, 1] }, note: "one triangle" },
  { key: "SSA", given: { sides: [1, 2], angles: [0] }, note: "0, 1, or 2 triangles", ambiguous: true, show: "ssa" },
];

function TriangleCases({ reveal }: { reveal: LessonFigureProps["reveal"] }) {
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <div className="tri-cases">
            {CASES.map((c) => {
              const shown = !c.show || Boolean(reveal[c.show]);
              return (
                <div
                  key={c.key}
                  className={`tri-case${c.ambiguous ? " tri-case--amb" : ""}`}
                  style={{ opacity: shown ? 1 : 0.14 }}
                >
                  <MiniTriangle given={c.given} color={c.ambiguous ? "var(--cosine)" : "var(--primary)"} />
                  <div className="tri-case__label">{c.key}</div>
                  <div className="tri-case__note">{c.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Main figure: the SSA triangle, built up part by part. ----

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

/** Small angle arc at vertex A, from the base up to side b, marking the fixed angle. */
function arcAtA(r: number) {
  const x1 = AX + r * Math.cos(toRadians(A_DEG));
  const y1 = AY - r * Math.sin(toRadians(A_DEG));
  return `M ${AX + r} ${AY} A ${r} ${r} 0 0 0 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

type Parts = { angle: boolean; sideB: boolean; height: boolean; sideA: boolean };

function TriangleSSA({ aWorld, parts, full }: { aWorld: number; parts: Parts; full?: boolean }) {
  const { count, xs } = solve(aWorld);
  const r = S * aWorld;
  const colors = ["var(--primary)", "var(--teal)"];
  const bLabels = ["B", "B'"];

  return (
    <svg
      className={full ? "figure" : "flow-gauge flow-gauge--wide"}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={
        parts.sideA
          ? `SSA triangle with ${count === 0 ? "no" : count === 1 ? "one" : "two"} solution(s) for the pivoting side a`
          : "Building an SSA triangle from its base and fixed angle"
      }
    >
      {/* 1. the base, always horizontal */}
      <line x1={AX} y1={AY} x2={W - 8} y2={AY} stroke="var(--line)" strokeWidth={1.6} />
      <circle cx={AX} cy={AY} r={3} fill="var(--ink)" />
      <text x={AX - 2} y={AY + 15} textAnchor="middle" className="angle-glyph-label" fill="var(--ink)">
        A
      </text>

      {/* 2. the fixed angle at A */}
      {parts.angle && (
        <>
          {!parts.sideB && (
            <line
              x1={AX}
              y1={AY}
              x2={AX + S * (B_LEN + 0.6) * Math.cos(toRadians(A_DEG))}
              y2={AY - S * (B_LEN + 0.6) * Math.sin(toRadians(A_DEG))}
              stroke="var(--muted)"
              strokeWidth={1.2}
              strokeDasharray="4 4"
            />
          )}
          <path d={arcAtA(22)} fill="none" stroke="var(--primary)" strokeWidth={2.4} />
          <text
            x={AX + 33 * Math.cos(toRadians(A_DEG / 2))}
            y={AY - 33 * Math.sin(toRadians(A_DEG / 2)) + 4}
            textAnchor="middle"
            className="angle-glyph-label"
            fill="var(--primary)"
          >
            A
          </text>
        </>
      )}

      {/* 3. the fixed side b, from A to C */}
      {parts.sideB && (
        <>
          <line x1={AX} y1={AY} x2={Cx} y2={Cy} stroke="var(--cosine)" strokeWidth={2.6} strokeLinecap="round" />
          <text x={(AX + Cx) / 2 - 10} y={(AY + Cy) / 2 - 4} className="angle-glyph-label" fill="var(--cosine)">
            b
          </text>
          <circle cx={Cx} cy={Cy} r={3} fill="var(--ink)" />
          <text x={Cx + 5} y={Cy - 4} className="angle-glyph-label" fill="var(--ink)">
            C
          </text>
        </>
      )}

      {/* the height, the shortest drop from C to the base */}
      {parts.height && (
        <>
          <line x1={Cx} y1={Cy} x2={Cx} y2={AY} stroke="var(--muted)" strokeWidth={1.3} strokeDasharray="3 3" />
          <text x={Cx + 5} y={(Cy + AY) / 2 + 3} className="angle-glyph-label" fill="var(--muted)">
            h
          </text>
        </>
      )}

      {/* 4. the pivoting side a, hinged at C */}
      {parts.sideA && (
        <>
          <circle cx={Cx} cy={Cy} r={r} fill="none" stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 4" opacity={0.55} />
          {count === 0 ? (
            <>
              <line x1={Cx} y1={Cy} x2={Cx} y2={Cy + r} stroke="var(--primary)" strokeWidth={2.6} strokeLinecap="round" />
              <circle cx={Cx} cy={Cy + r} r={4} fill="var(--surface)" stroke="var(--primary)" strokeWidth={2} />
              <text x={Cx - 8} y={Cy + r / 2 + 3} textAnchor="end" className="angle-glyph-label" fill="var(--primary)">
                a
              </text>
            </>
          ) : (
            xs.map((x, i) => (
              <g key={`a${i}`}>
                <line x1={Cx} y1={Cy} x2={x} y2={AY} stroke={colors[i] ?? "var(--primary)"} strokeWidth={2.6} strokeLinecap="round" />
                <circle cx={x} cy={AY} r={4} fill={colors[i] ?? "var(--primary)"} />
                <text x={x} y={AY + 15} textAnchor="middle" className="angle-glyph-label" fill={colors[i] ?? "var(--primary)"}>
                  {bLabels[i] ?? "B"}
                </text>
                {i === 0 && (
                  <text
                    x={(Cx + x) / 2 + 6}
                    y={(Cy + AY) / 2}
                    className="angle-glyph-label"
                    fill={colors[i] ?? "var(--primary)"}
                  >
                    a
                  </text>
                )}
              </g>
            ))
          )}
          <circle cx={Cx} cy={Cy} r={3.4} fill="var(--primary)" />
          <text x={W / 2 + 20} y={16} textAnchor="middle" className="angle-glyph-label" fill="var(--ink)">
            {count === 0 ? "no triangle" : count === 1 ? "one triangle" : "two triangles"}
          </text>
        </>
      )}
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

const ALL_PARTS: Parts = { angle: true, sideB: true, height: true, sideA: true };

export default function SsaStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "build";

  if (mode === "types") {
    return <TriangleCases reveal={reveal} />;
  }

  // The law-of-sines slide is a derivation, so the algebra holds the panel alone.
  if (mode === "law") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={LAW} reveal={reveal} heading={"\\text{law of sines can give two answers}"} focus />
          </div>
        </div>
      </section>
    );
  }

  const aWorld = (values.a ?? 8) / 10;
  // The build slide reveals the parts one at a time; cases and explore show the
  // finished construction and vary the pivoting side.
  const parts: Parts =
    mode === "build"
      ? {
          angle: Boolean(reveal.ang),
          sideB: Boolean(reveal.sideB),
          height: Boolean(reveal.hgt),
          sideA: Boolean(reveal.sideA),
        }
      : ALL_PARTS;

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <TriangleSSA aWorld={aWorld} parts={parts} full />
        </div>
      </div>
    </section>
  );
}
