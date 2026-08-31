import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import MatrixGrid, { type MatrixSpec, type HiTone } from "../../components/MatrixGrid";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps, Reveal } from "../types";

/** The running 3x3 for the cofactor slides. */
const A3: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 10],
];
const ROW1 = [1, 2, 3];
const SIGNS = ["+", "-", "+"];

/** The 2x2 minor left after deleting row 1 and column k of A3 (0-based k). */
function minorOf(k: number): number[][] {
  const out: number[][] = [];
  for (let r = 1; r < 3; r += 1) {
    const row: number[] = [];
    for (let c = 0; c < 3; c += 1) if (c !== k) row.push(A3[r][c]);
    out.push(row);
  }
  return out;
}

/**
 * Slide "cofactor-build": the whole point is to SHOW where each term comes from.
 * One 3x3 matrix is drawn once with row 1 tinted. As each term is revealed (t1,
 * t2, t3, gated to the animating phase so it plays after the narration, not
 * during it), the matrix crosses out that entry's row and column, tints the four
 * cells of the surviving 2x2 minor, and a matching term (sign, row-1 entry, and
 * the minor as a boxed determinant) writes itself below. This replaces the old
 * layout that showed the matrix twice (a glyph header plus a det-A line).
 */
function CofactorBuild({ reveal }: { reveal: Reveal }) {
  const reduce = useReducedMotion();
  const t = [Boolean(reveal.t1), Boolean(reveal.t2), Boolean(reveal.t3)];
  const activeK = t[2] ? 2 : t[1] ? 1 : t[0] ? 0 : -1;

  // Matrix geometry, centered horizontally near x = 130.
  const cw = 42;
  const chh = 38;
  const gLeft = 67;
  const gTop = 34;
  const cellLeft = (c: number) => gLeft + c * cw;
  const cellTop = (r: number) => gTop + r * chh;
  const cX = (c: number) => cellLeft(c) + cw / 2;
  const cY = (r: number) => cellTop(r) + chh / 2;
  const mW = 3 * cw;
  const mH = 3 * chh;
  const mBottom = gTop + mH;

  const accentLine = "color-mix(in oklch, var(--accent) 55%, var(--line))";
  const fade = (on: boolean) => ({
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: on ? 1 : 0, y: on ? 0 : 6 },
    transition: { duration: reduce ? 0 : 0.45, ease: "easeOut" as const },
  });

  // A boxed 2x2 minor determinant (soft highlight box plus vertical bars).
  const renderMinor = (x0: number, yc: number, m: number[][]) => {
    const colCx = [x0 + 18, x0 + 50];
    const barL = x0 + 2;
    const barR = x0 + 66;
    return (
      <g>
        <rect
          x={x0 - 3}
          y={yc - 26}
          width={74}
          height={52}
          rx={10}
          fill="color-mix(in oklch, var(--primary) 10%, var(--surface))"
          stroke="color-mix(in oklch, var(--primary) 32%, transparent)"
          strokeWidth={1.4}
        />
        <line x1={barL} y1={yc - 21} x2={barL} y2={yc + 21} stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" />
        <line x1={barR} y1={yc - 21} x2={barR} y2={yc + 21} stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" />
        {m.map((row, r) =>
          row.map((v, c) => (
            <text
              key={`${r}-${c}`}
              x={colCx[c]}
              y={r === 0 ? yc - 4 : yc + 18}
              textAnchor="middle"
              fill="var(--ink)"
              style={{ fontSize: 18, fontWeight: 700 }}
            >
              {v}
            </text>
          )),
        )}
      </g>
    );
  };

  const termYc = [198, 250, 302];
  const signX = 84;
  const entryX = 106;
  const minorX0 = 126;

  return (
    <svg
      className="figure"
      viewBox="0 0 264 344"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="The 3 by 3 matrix A with row 1 highlighted. Expanding along row 1 gives det A = 1 times the minor 5, 6, 8, 10 minus 2 times the minor 4, 6, 7, 10 plus 3 times the minor 4, 5, 7, 8."
    >
      <text x={130} y={24} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 14, fontWeight: 700 }}>
        A
      </text>

      {/* Row 1 always reads as the expansion row. */}
      <rect x={gLeft} y={cellTop(0)} width={mW} height={chh} rx={6} fill="var(--accent)" opacity={0.1} />

      {/* Cross out the active entry's row and column, keep its 2x2 minor tinted. */}
      {activeK >= 0 && (
        <motion.g key={activeK} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.4 }}>
          {[1, 2].flatMap((r) =>
            [0, 1, 2]
              .filter((c) => c !== activeK)
              .map((c) => (
                <rect
                  key={`mn${r}-${c}`}
                  x={cellLeft(c)}
                  y={cellTop(r)}
                  width={cw}
                  height={chh}
                  rx={6}
                  fill="color-mix(in oklch, var(--primary) 16%, transparent)"
                  stroke="color-mix(in oklch, var(--primary) 30%, transparent)"
                  strokeWidth={1.2}
                />
              )),
          )}
          <rect
            x={cellLeft(activeK)}
            y={cellTop(0)}
            width={cw}
            height={chh}
            rx={6}
            fill="color-mix(in oklch, var(--accent) 26%, transparent)"
            stroke="color-mix(in oklch, var(--accent) 48%, transparent)"
            strokeWidth={1.5}
          />
          <line x1={gLeft - 4} y1={cY(0)} x2={gLeft + mW + 4} y2={cY(0)} stroke={accentLine} strokeWidth={2.4} strokeLinecap="round" />
          <line x1={cX(activeK)} y1={gTop - 4} x2={cX(activeK)} y2={mBottom + 4} stroke={accentLine} strokeWidth={2.4} strokeLinecap="round" />
        </motion.g>
      )}

      {A3.flatMap((row, r) =>
        row.map((v, c) => (
          <text key={`a${r}-${c}`} x={cX(c)} y={cY(r) + 6} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 19, fontWeight: 600 }}>
            {v}
          </text>
        )),
      )}

      {/* Square brackets around the matrix. */}
      <path
        d={`M ${gLeft - 6} ${gTop - 6} L ${gLeft - 13} ${gTop - 6} L ${gLeft - 13} ${mBottom + 6} L ${gLeft - 6} ${mBottom + 6}`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${gLeft + mW + 6} ${gTop - 6} L ${gLeft + mW + 13} ${gTop - 6} L ${gLeft + mW + 13} ${mBottom + 6} L ${gLeft + mW + 6} ${mBottom + 6}`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The three terms build one at a time below the matrix. */}
      {[0, 1, 2].map((k) => (
        <motion.g key={`t${k}`} {...fade(t[k])}>
          {k === 0 && (
            <text x={signX - 12} y={termYc[k] + 6} textAnchor="end" fill="var(--ink)" style={{ fontSize: 19, fontWeight: 700 }}>
              det A =
            </text>
          )}
          <text x={signX} y={termYc[k] + 6} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 22, fontWeight: 700 }}>
            {SIGNS[k]}
          </text>
          <text
            x={entryX}
            y={termYc[k] + 6}
            textAnchor="middle"
            fill="color-mix(in oklch, var(--accent) 82%, var(--ink))"
            style={{ fontSize: 22, fontWeight: 800 }}
          >
            {ROW1[k]}
          </text>
          {renderMinor(minorX0, termYc[k], minorOf(k))}
        </motion.g>
      ))}
    </svg>
  );
}

/**
 * Slide "cofactor" (evaluate): the arithmetic reduction only, starting from the
 * expansion the build slide ended on, so there is no repeated 3x3. Each line is
 * gated by e1..e5 and revealed on the animating phase (draw:true in slides.ts).
 */
const EVAL: FlowStep[] = [
  {
    id: "v0",
    tex: "\\det A = 1\\begin{vmatrix} 5 & 6 \\\\ 8 & 10 \\end{vmatrix} - 2\\begin{vmatrix} 4 & 6 \\\\ 7 & 10 \\end{vmatrix} + 3\\begin{vmatrix} 4 & 5 \\\\ 7 & 8 \\end{vmatrix}",
  },
  {
    id: "v1",
    show: "e1",
    op: "\\text{each minor is } ad - bc",
    tex: "= 1(5\\cdot 10 - 6\\cdot 8) - 2(4\\cdot 10 - 6\\cdot 7) + 3(4\\cdot 8 - 5\\cdot 7)",
  },
  { id: "v2", show: "e2", op: "\\text{multiply inside}", tex: "= 1(50 - 48) - 2(40 - 42) + 3(32 - 35)" },
  { id: "v3", show: "e3", op: "\\text{subtract inside each pair}", tex: "= 1(2) - 2(-2) + 3(-3)" },
  { id: "v4", show: "e4", op: "\\text{distribute: } -2(-2) = +4", tex: "= 2 + 4 - 9" },
  { id: "v5", show: "e5", tone: "good", result: true, op: "\\text{add}", tex: "= -3" },
];

/** Shared frame: just the central figure, no dock. */
function frame(slot: ReactNode) {
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
      </div>
    </section>
  );
}

export default function MtxDetStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "twobytwo";

  // Slide 3a: build the expansion one term at a time on a single matrix.
  if (mode === "cofactor-build") {
    return frame(<CofactorBuild reveal={reveal} />);
  }

  // Slide 3b: evaluate the three cofactors down to the number. Pure arithmetic,
  // no repeated 3x3: the flow starts from the expansion line and reduces. A small
  // A glyph rides along for context (and is the only matrix on this slide).
  if (mode === "cofactor") {
    const flowReveal = {
      e1: Boolean(reveal.e1),
      e2: Boolean(reveal.e2),
      e3: Boolean(reveal.e3),
      e4: Boolean(reveal.e4),
      e5: Boolean(reveal.e5),
    };
    const headerSpec: MatrixSpec = {
      aria: "The 3 by 3 matrix A with row 1 highlighted, the row being expanded.",
      tokens: [{ rows: A3, label: "A", hiRow: 0, rowTone: "accent" }],
    };
    const header = (
      <div style={{ width: "min(34%, 128px)", aspectRatio: "1 / 1", margin: "0 auto" }}>
        <MatrixGrid spec={headerSpec} />
      </div>
    );
    return frame(<AlgebraFlow steps={EVAL} reveal={flowReveal} header={header} focus />);
  }

  // Slide 4: dial d and watch the determinant of [[2,4],[1,d]] update live.
  if (mode === "yourturn") {
    const d = Math.round(values.d ?? 6);
    const det = 2 * d - 4;
    const diag = Boolean(reveal.diagHi);
    const anti = Boolean(reveal.antiHi);
    const showVal = Boolean(reveal.valueHi);
    const spec: MatrixSpec = {
      aria: `The 2 by 2 matrix with rows 2, 4 and 1, ${d}. Both diagonals highlighted. Its determinant is 2 times ${d} minus 4, which is ${det}.`,
      tokens: [{ rows: [[2, 4], [1, d]], label: "A", diag, anti }],
      caption: showVal ? `ad \u2212 bc = ${2 * d} \u2212 4 = ${det}` : undefined,
      captionTone: det === 0 ? "anti" : "prod",
    };
    return frame(<MatrixGrid spec={spec} />);
  }

  // Slides 1 and 2: a 2x2 with the main diagonal, then the anti-diagonal, then
  // the finished value highlighted in turn.
  const diag = Boolean(reveal.diagHi);
  const anti = Boolean(reveal.antiHi);
  const value = Boolean(reveal.valueHi);
  const zero = Boolean(reveal.zeroHi);
  const singular = mode === "singular";
  const M: number[][] = singular
    ? [
        [2, 4],
        [1, 2],
      ]
    : [
        [4, 3],
        [2, 5],
      ];

  let caption: string | undefined;
  let captionTone: HiTone = "prod";
  if (singular) {
    if (zero) {
      caption = "ad \u2212 bc = 4 \u2212 4 = 0";
      captionTone = "anti";
    } else if (anti) {
      caption = "bc = 4 \u00d7 1 = 4";
      captionTone = "anti";
    } else if (diag) {
      caption = "ad = 2 \u00d7 2 = 4";
      captionTone = "diag";
    }
  } else {
    if (value) {
      caption = "ad \u2212 bc = 20 \u2212 6 = 14";
      captionTone = "prod";
    } else if (anti) {
      caption = "bc = 3 \u00d7 2 = 6";
      captionTone = "anti";
    } else if (diag) {
      caption = "ad = 4 \u00d7 5 = 20";
      captionTone = "diag";
    }
  }

  const spec: MatrixSpec = {
    aria: singular
      ? "The 2 by 2 matrix with rows 2, 4 and 1, 2. Both diagonals highlighted. Its determinant is 4 minus 4, which is 0, so it is singular."
      : "The 2 by 2 matrix with rows 4, 3 and 2, 5. Main diagonal and anti-diagonal highlighted. Its determinant is 20 minus 6, which is 14.",
    tokens: [{ rows: M, label: "A", diag, anti }],
    caption,
    captionTone,
  };

  return frame(<MatrixGrid spec={spec} />);
}
