import { motion, useReducedMotion } from "motion/react";
import type { LessonFigureProps } from "../types";

/**
 * Verified reduction of  x + y + z = 6,  2x + y + z = 7,  x + 2y + z = 8
 * to (x, y, z) = (1, 2, 3).
 */
const START: number[][] = [
  [1, 1, 1, 6],
  [2, 1, 1, 7],
  [1, 2, 1, 8],
];
const AFTER_E1: number[][] = [
  [1, 1, 1, 6],
  [0, -1, -1, -5],
  [1, 2, 1, 8],
];
const REDUCED: number[][] = [
  [1, 1, 1, 6],
  [0, -1, -1, -5],
  [0, 1, 0, 2],
];
// The two special endings; only the last row matters for each.
const INCONSISTENT: number[][] = [
  [1, 1, 1, 6],
  [0, 1, 1, 3],
  [0, 0, 0, 5],
];
const DEPENDENT: number[][] = [
  [1, 1, 1, 6],
  [0, 1, 1, 3],
  [0, 0, 0, 0],
];

const MINUS = "\u2212";
const ARROW = "\u2192";
const cell = (n: number): string => (n < 0 ? MINUS + String(Math.abs(n)) : String(n));

type RowTone = "a" | "accent" | "primary";
type CapTone = "op" | "good" | "bad" | "muted";
const ROW_TONE: Record<RowTone, string> = { a: "var(--cosine)", accent: "var(--accent)", primary: "var(--primary)" };
const CAP_TONE: Record<CapTone, string> = { op: "var(--primary)", good: "var(--teal)", bad: "var(--accent)", muted: "var(--muted)" };

type ElimProps = {
  rows: number[][];
  aria: string;
  /** Fade/slide the changed row on beat transitions; off for the slider so digits track live. */
  animate?: boolean;
  dim?: boolean;
  pivot?: [number, number] | null;
  targets?: [number, number][];
  hiRow?: number | null;
  hiRowTone?: RowTone;
  zeros?: [number, number][];
  /** Tint the constants column (the beat that introduces the bar). */
  hiConst?: boolean;
  caption?: string;
  captionTone?: CapTone;
};

/**
 * The augmented matrix as one large, central figure. A row operation is shown by
 * rewriting exactly the row that changes: its new entries fade and slide in from
 * the left while the untouched rows hold still, and the pivot column entry that
 * just became zero flashes. The learner steps forward and back through the beats,
 * so the elimination reads like doing it by hand, one row operation at a time.
 */
function ElimMatrix(p: ElimProps) {
  const reduce = useReducedMotion();
  const rows = p.rows;
  const animate = p.animate ?? true;

  const cw = 56;
  const ch = 50;
  const gLeft = 58;
  const gTop = 48;
  const nCols = rows[0]?.length ?? 4;
  const barCol = 3; // vertical bar sits before the constants column
  const cX = (c: number) => gLeft + c * cw + cw / 2;
  const cY = (r: number) => gTop + r * ch + ch / 2;
  const mW = nCols * cw;
  const mH = rows.length * ch;
  const right = gLeft + mW;
  const bottom = gTop + mH;
  const barX = gLeft + barCol * cw;

  const zeroSet = new Set((p.zeros ?? []).map(([r, c]) => `${r},${c}`));

  return (
    <svg
      className="figure"
      viewBox="0 0 344 268"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={p.aria}
    >
      <g opacity={p.dim ? 0.45 : 1}>
        <text x={(gLeft + right) / 2} y={30} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 15, fontWeight: 700 }}>
          [ A | b ]
        </text>

        {/* constants column tint */}
        {p.hiConst && (
          <rect x={cX(barCol) - cw / 2} y={gTop} width={cw} height={mH} rx={8} fill="var(--muted)" opacity={0.12} />
        )}

        {/* changed / active row band */}
        {p.hiRow != null && (
          <motion.rect
            key={`band${p.hiRow}`}
            x={gLeft}
            y={gTop + p.hiRow * ch}
            width={mW}
            height={ch}
            rx={9}
            fill={ROW_TONE[p.hiRowTone ?? "a"]}
            opacity={0.16}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 0.16 }}
          />
        )}

        {/* target entries to be cleared (below the pivot) */}
        {(p.targets ?? []).map(([r, c]) => (
          <rect key={`tg${r}-${c}`} x={cX(c) - cw / 2 + 5} y={cY(r) - ch / 2 + 4} width={cw - 10} height={ch - 8} rx={8} fill="var(--accent)" opacity={0.16} />
        ))}

        {/* pivot cell */}
        {p.pivot && (
          <rect
            x={cX(p.pivot[1]) - cw / 2 + 4}
            y={cY(p.pivot[0]) - ch / 2 + 3}
            width={cw - 8}
            height={ch - 6}
            rx={9}
            fill="color-mix(in oklch, var(--teal) 22%, transparent)"
            stroke="color-mix(in oklch, var(--teal) 55%, transparent)"
            strokeWidth={1.6}
          />
        )}

        {/* zeros just produced by the row operation flash teal */}
        {(p.zeros ?? []).map(([r, c]) => (
          <motion.circle
            key={`z${r}-${c}-${rows[r][c]}`}
            cx={cX(c)}
            cy={cY(r)}
            r={20}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={2.4}
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.9 }}
          />
        ))}

        {/* the numbers, animated one row at a time */}
        {rows.map((row, r) => {
          const key = animate ? `row${r}-${row.join(",")}` : `row${r}`;
          return (
            <motion.g
              key={key}
              initial={reduce || !animate ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
            >
              {row.map((v, c) => (
                <text
                  key={c}
                  x={cX(c)}
                  y={cY(r) + 7}
                  textAnchor="middle"
                  fill={zeroSet.has(`${r},${c}`) ? "color-mix(in oklch, var(--teal) 82%, var(--ink))" : "var(--ink)"}
                  style={{ fontSize: 22, fontWeight: 650 }}
                >
                  {cell(v)}
                </text>
              ))}
            </motion.g>
          );
        })}

        {/* vertical divider bar before the constants */}
        <line x1={barX} y1={gTop} x2={barX} y2={bottom} stroke="var(--muted)" strokeWidth={1.6} opacity={0.7} />

        {/* square brackets */}
        <path
          d={`M ${gLeft - 4} ${gTop - 6} L ${gLeft - 12} ${gTop - 6} L ${gLeft - 12} ${bottom + 6} L ${gLeft - 4} ${bottom + 6}`}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M ${right + 4} ${gTop - 6} L ${right + 12} ${gTop - 6} L ${right + 12} ${bottom + 6} L ${right + 4} ${bottom + 6}`}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {p.caption && (
        <text x={(gLeft + right) / 2} y={bottom + 34} textAnchor="middle" fill={CAP_TONE[p.captionTone ?? "op"]} style={{ fontSize: 17, fontWeight: 650 }}>
          {p.caption}
        </text>
      )}
    </svg>
  );
}

function frame(slot: React.ReactNode) {
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
      </div>
    </section>
  );
}

export default function Mtx3varStage(props: LessonFigureProps) {
  const { slide, reveal, values } = props;
  const mode = slide.mode ?? "setup";

  if (mode === "practice") {
    const m = Math.round(values.m ?? 0);
    const first = 2 - m;
    const r2 = [2 - m, 1 - m, 1 - m, 7 - 6 * m];
    const matrix = [START[0], r2, START[2]];
    const cleared = first === 0;
    return frame(
      <ElimMatrix
        rows={matrix}
        animate={false}
        aria={
          cleared
            ? "After R2 goes to R2 minus 2 times R1, the first entry of row 2 is zero."
            : `Row 2 after subtracting ${m} times row 1, first entry ${first}.`
        }
        pivot={[0, 0]}
        targets={cleared ? [] : [[1, 0]]}
        hiRow={1}
        hiRowTone={cleared ? "primary" : "accent"}
        zeros={cleared ? [[1, 0]] : []}
        caption={`R2 ${ARROW} R2 ${MINUS} ${m}R1${cleared ? `:  first entry = 0` : `:  first entry = ${first}`}`}
        captionTone={cleared ? "good" : "bad"}
      />,
    );
  }

  if (mode === "eliminate") {
    const piv = Boolean(reveal.piv);
    const e1 = Boolean(reveal.e1);
    const e2 = Boolean(reveal.e2);
    const matrix = e2 ? REDUCED : e1 ? AFTER_E1 : START;
    return frame(
      <ElimMatrix
        rows={matrix}
        aria={
          e2
            ? "After R3 goes to R3 minus R1, the first column below the pivot is all zeros."
            : e1
              ? "After R2 goes to R2 minus 2 times R1, row 2 begins with a zero."
              : "The starting augmented matrix with the pivot in row 1, column 1."
        }
        pivot={piv || e1 || e2 ? [0, 0] : null}
        targets={piv && !e1 && !e2 ? [[1, 0], [2, 0]] : []}
        hiRow={e2 ? 2 : e1 ? 1 : null}
        hiRowTone="a"
        zeros={e2 ? [[1, 0], [2, 0]] : e1 ? [[1, 0]] : []}
        caption={
          e2
            ? `R3 ${ARROW} R3 ${MINUS} R1`
            : e1
              ? `R2 ${ARROW} R2 ${MINUS} 2R1`
              : piv
                ? "pivot: row 1, column 1"
                : undefined
        }
        captionTone="op"
      />,
    );
  }

  if (mode === "solve") {
    const s1 = Boolean(reveal.s1);
    const s2 = Boolean(reveal.s2);
    const s3 = Boolean(reveal.s3);
    const s4 = Boolean(reveal.s4);
    const activeRow = s3 ? 0 : s2 ? 1 : s1 ? 2 : null;
    return frame(
      <ElimMatrix
        rows={REDUCED}
        animate={false}
        aria="The reduced augmented matrix, read from the bottom row up to find y, then z, then x."
        hiRow={activeRow}
        hiRowTone="a"
        caption={
          s4
            ? "(x, y, z) = (1, 2, 3)"
            : s3
              ? "row 1 gives x = 1"
              : s2
                ? "row 2 gives z = 3"
                : s1
                  ? "row 3 gives y = 2"
                  : undefined
        }
        captionTone={s4 ? "good" : "op"}
      />,
    );
  }

  if (mode === "yourturn") {
    const inc = Boolean(reveal.inc);
    const dep = Boolean(reveal.dep);
    const matrix = dep ? DEPENDENT : inc ? INCONSISTENT : REDUCED;
    return frame(
      <ElimMatrix
        rows={matrix}
        aria={
          dep
            ? "An augmented matrix whose last row is all zeros, meaning infinitely many solutions."
            : inc
              ? "An augmented matrix whose last row is 0 0 0 with 5 after the bar, meaning no solution."
              : "The solved reduced matrix giving x = 1, y = 2, z = 3."
        }
        hiRow={inc || dep ? 2 : null}
        hiRowTone={dep ? "primary" : inc ? "accent" : "a"}
        caption={dep ? "0 = 0: infinitely many" : inc ? "0 = 5: no solution" : "(x, y, z) = (1, 2, 3)"}
        captionTone={dep ? "op" : inc ? "bad" : "good"}
      />,
    );
  }

  // setup
  const aug = Boolean(reveal.aug);
  const bar = Boolean(reveal.bar);
  const ops = Boolean(reveal.ops);
  return frame(
    <ElimMatrix
      rows={START}
      animate={false}
      dim={!aug}
      aria="The system x+y+z=6, 2x+y+z=7, x+2y+z=8 written as a 3 by 4 augmented matrix."
      hiConst={bar}
      caption={ops ? "moves: swap, scale, add a multiple" : bar ? "left of bar: coefficients    right: constants" : undefined}
      captionTone="muted"
    />,
  );
}
