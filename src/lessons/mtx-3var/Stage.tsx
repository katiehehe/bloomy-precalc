import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import MatrixGrid, { type CellHi, type MatrixSpec } from "../../components/MatrixGrid";
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

const MINUS = "\u2212"; // Unicode minus for plain SVG cell / caption text.
const ARROW = "\u2192";
const DIVIDER_COL = 3; // constants column (right of the bar).

/** Plain-text SVG cell: integers, with a real Unicode minus for negatives. */
const cell = (n: number): string => (n < 0 ? MINUS + String(Math.abs(n)) : String(n));
const gridCells = (m: number[][]): (string | number)[][] => m.map((row) => row.map(cell));

/** KaTeX for a 3x4 augmented matrix, with a true vertical bar before the last column. */
const augTex = (m: number[][]): string => {
  const body = m.map((r) => r.join(" & ")).join(" \\\\ ");
  return `\\left[\\begin{array}{ccc|c} ${body} \\end{array}\\right]`;
};

const LABEL = "[ A | b ]";

export default function Mtx3varStage(props: LessonFigureProps) {
  const { slide, reveal } = props;
  const mode = slide.mode ?? "setup";
  const showDock = Boolean(reveal.dock);

  let spec: MatrixSpec;
  let dock: ReactNode = null;

  if (mode === "eliminate") {
    const piv = Boolean(reveal.piv);
    const e1 = Boolean(reveal.e1);
    const e2 = Boolean(reveal.e2);
    const matrix = e2 ? REDUCED : e1 ? AFTER_E1 : START;
    const hiCells: CellHi[] = [{ r: 0, c: 0, tone: "prod" }];
    if (piv && !e1 && !e2) {
      hiCells.push({ r: 1, c: 0, tone: "anti" }, { r: 2, c: 0, tone: "anti" });
    }
    const changedRow = e2 ? 2 : e1 ? 1 : undefined;
    spec = {
      aria: e2
        ? "After R3 goes to R3 minus R1, the first column below the pivot is all zeros."
        : e1
          ? "After R2 goes to R2 minus 2 times R1, row 2 begins with a zero."
          : "The starting augmented matrix with the pivot in row 1, column 1.",
      tokens: [
        {
          rows: gridCells(matrix),
          label: LABEL,
          hiCol: DIVIDER_COL,
          colTone: "muted",
          hiRow: changedRow,
          rowTone: "a",
          hiCells,
        },
      ],
      caption: e2
        ? `R3 ${ARROW} R3 ${MINUS} R1`
        : e1
          ? `R2 ${ARROW} R2 ${MINUS} 2R1`
          : piv
            ? "pivot: row 1, column 1"
            : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{augTex(START)}</Tex>
        {piv && <Tex>{"\\text{pivot} = 1\\ \\text{in row 1, col 1. Clear the entries below it}"}</Tex>}
        {e1 && <Tex>{"R_2 \\to R_2 - 2R_1:\\ (2,1,1,7) - 2(1,1,1,6) = (0,-1,-1,-5)"}</Tex>}
        {e1 && <Tex>{augTex(AFTER_E1)}</Tex>}
        {e2 && <Tex>{"R_3 \\to R_3 - R_1:\\ (1,2,1,8) - (1,1,1,6) = (0,1,0,2)"}</Tex>}
        {e2 && <Tex>{augTex(REDUCED)}</Tex>}
      </div>
    );
  } else if (mode === "solve") {
    const s1 = Boolean(reveal.s1);
    const s2 = Boolean(reveal.s2);
    const s3 = Boolean(reveal.s3);
    const s4 = Boolean(reveal.s4);
    const activeRow = s3 ? 0 : s2 ? 1 : s1 ? 2 : undefined;
    spec = {
      aria: "The reduced augmented matrix, read from the bottom row up to find y, then z, then x.",
      tokens: [
        {
          rows: gridCells(REDUCED),
          label: LABEL,
          hiCol: DIVIDER_COL,
          colTone: "muted",
          hiRow: activeRow,
          rowTone: "a",
        },
      ],
      caption: s4
        ? "(x, y, z) = (1, 2, 3)"
        : s3
          ? "row 1 gives x = 1"
          : s2
            ? "row 2 gives z = 3"
            : s1
              ? "row 3 gives y = 2"
              : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{augTex(REDUCED)}</Tex>
        {s1 && <Tex>{"\\text{Row 3: } 0x + 1y + 0z = 2 \\implies y = 2"}</Tex>}
        {s2 && <Tex>{"\\text{Row 2: } -y - z = -5 \\implies -(2) - z = -5 \\implies z = 3"}</Tex>}
        {s3 && <Tex>{"\\text{Row 1: } x + y + z = 6 \\implies x + 2 + 3 = 6 \\implies x = 1"}</Tex>}
        {s4 && <Tex>{"(x, y, z) = (1, 2, 3)"}</Tex>}
        {s4 && <Tex>{"1 + 2 + 3 = 6, \\quad 2(1) + 2 + 3 = 7, \\quad 1 + 2(2) + 3 = 8"}</Tex>}
      </div>
    );
  } else if (mode === "yourturn") {
    const inc = Boolean(reveal.inc);
    const dep = Boolean(reveal.dep);
    const matrix = dep ? DEPENDENT : inc ? INCONSISTENT : REDUCED;
    const lastRowTone = dep ? "accent" : inc ? "anti" : "a";
    spec = {
      aria: dep
        ? "An augmented matrix whose last row is all zeros, meaning infinitely many solutions."
        : inc
          ? "An augmented matrix whose last row is 0 0 0 with 5 after the bar, meaning no solution."
          : "The solved reduced matrix giving x = 1, y = 2, z = 3.",
      tokens: [
        {
          rows: gridCells(matrix),
          label: LABEL,
          hiCol: DIVIDER_COL,
          colTone: "muted",
          hiRow: inc || dep ? 2 : undefined,
          rowTone: lastRowTone,
        },
      ],
      caption: dep ? "0 = 0: infinitely many" : inc ? "0 = 5: no solution" : "(x, y, z) = (1, 2, 3)",
    };
    dock = (
      <div className="formula-list">
        <Tex>{"\\text{unique: a pivot in every variable column}"}</Tex>
        <Tex>{"\\text{no solution: a row } [\\,0\\ 0\\ 0 \\mid k\\,],\\ k \\neq 0"}</Tex>
        <Tex>{"\\text{infinitely many: a row } [\\,0\\ 0\\ 0 \\mid 0\\,]"}</Tex>
        {inc && <Tex>{"[\\,0\\ 0\\ 0 \\mid 5\\,] \\Rightarrow 0 = 5\\ \\text{(impossible)}"}</Tex>}
        {dep && <Tex>{"[\\,0\\ 0\\ 0 \\mid 0\\,] \\Rightarrow 0 = 0\\ \\text{(always true)}"}</Tex>}
      </div>
    );
  } else {
    // setup
    const aug = Boolean(reveal.aug);
    const bar = Boolean(reveal.bar);
    const ops = Boolean(reveal.ops);
    spec = {
      aria: "The system x+y+z=6, 2x+y+z=7, x+2y+z=8 written as a 3 by 4 augmented matrix.",
      tokens: [
        {
          rows: gridCells(START),
          label: LABEL,
          dim: !aug,
          hiCol: bar ? DIVIDER_COL : undefined,
          colTone: "muted",
        },
      ],
      caption: bar ? "left of the bar: coefficients        right of the bar: constants" : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"\\begin{cases} x + y + z = 6 \\\\ 2x + y + z = 7 \\\\ x + 2y + z = 8 \\end{cases}"}</Tex>
        {aug && <Tex>{`[A \\mid b] = ${augTex(START)}`}</Tex>}
        {bar && <Tex>{"\\text{coefficients} \\;\\Big|\\; \\text{constants}"}</Tex>}
        {ops && <Tex>{"\\text{(1) swap: } R_i \\leftrightarrow R_j"}</Tex>}
        {ops && <Tex>{"\\text{(2) scale: } R_i \\to cR_i,\\ c \\neq 0"}</Tex>}
        {ops && <Tex>{"\\text{(3) combine: } R_i \\to R_i + cR_j"}</Tex>}
      </div>
    );
  }

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <MatrixGrid spec={spec} />
        </div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}
