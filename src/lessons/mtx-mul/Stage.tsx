import { type ReactNode } from "react";
import MatMulFrame, { type MatMulSpec } from "../../components/MatMulFrame";
import MatrixGrid, { type MatrixSpec } from "../../components/MatrixGrid";
import type { LessonFigureProps } from "../types";

/** The running pair used throughout the lesson. */
const A: number[][] = [
  [1, 2],
  [3, 4],
];
const B: number[][] = [
  [5, 6],
  [7, 8],
];

const rowOf = (m: number[][], r: number) => m[r];
const colOf = (m: number[][], c: number) => m.map((row) => row[c]);
const dot2 = (u: number[], v: number[]) => u[0] * v[0] + u[1] * v[1];

/** AB and BA (BA differs, which drives the "order matters" beat). */
const AB = A.map((_, i) => B[0].map((__, j) => dot2(rowOf(A, i), colOf(B, j))));
const BA = B.map((_, i) => A[0].map((__, j) => dot2(rowOf(B, i), colOf(A, j))));

const CELLS: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const blank2: (string | number)[][] = [
  ["", ""],
  ["", ""],
];

function frame(node: ReactNode) {
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">{node}</div>
      </div>
    </section>
  );
}

export default function MtxMulStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "rowcol";

  // "Order and shape": a side-by-side comparison of two whole products, so the
  // linear A B = ... layout reads better here than the row-by-column frame.
  if (mode === "order") {
    const spec: MatrixSpec = {
      aria: "AB equals [[19,22],[43,50]], which is not equal to BA equals [[23,34],[31,46]].",
      tokens: [
        { rows: AB, label: "AB" },
        { kind: "op", text: "\u2260", tone: "anti" },
        { rows: reveal.ba ? BA : blank2, label: "BA" },
      ],
    };
    return frame(<MatrixGrid spec={spec} />);
  }

  // "Your turn": the slider sets B's top-left entry k. The backwards-L frame puts
  // B above the product, so its first column (which holds k) lines up straight
  // down into the product's first column, showing exactly what k controls.
  if (mode === "yourturn") {
    const k = Math.round(values.k ?? 2);
    const Bk: number[][] = [
      [k, 6],
      [7, 8],
    ];
    const C = A.map((_, i) => Bk[0].map((__, j) => dot2(rowOf(A, i), colOf(Bk, j))));
    const spec: MatMulSpec = {
      aria: `A times B, where B's top-left entry is ${k}. The product's first column is ${C[0][0]} and ${C[1][0]}.`,
      A,
      B: Bk,
      C: C.map((r) => r.map((v) => String(v))),
      aLabel: "A",
      bLabel: "B",
      cLabel: "AB",
      active: [0, 0],
      caption: `(1)(${k}) + (2)(7) = ${C[0][0]}`,
    };
    return frame(<MatMulFrame spec={spec} />);
  }

  // rowcol (slide 1) and sweep (slide 2): reveal the product entries one at a
  // time in the backwards-L frame. Read each flag literally so the harness can
  // see which figure uses them.
  const cellShown: Record<string, boolean> = {
    "0,0": Boolean(reveal.r00),
    "0,1": Boolean(reveal.r01),
    "1,0": Boolean(reveal.r10),
    "1,1": Boolean(reveal.r11),
  };
  const shown = CELLS.filter(([i, j]) => cellShown[`${i},${j}`]);
  const active = shown.length ? shown[shown.length - 1] : null;
  const Crows: (string | number)[][] = [0, 1].map((i) =>
    [0, 1].map((j) => (cellShown[`${i},${j}`] ? String(AB[i][j]) : "")),
  );
  let caption: string | undefined;
  if (active) {
    const [i, j] = active;
    caption = `(${A[i][0]})(${B[0][j]}) + (${A[i][1]})(${B[1][j]}) = ${AB[i][j]}`;
  }
  // Slide 1 opens with the ordinary left-to-right setup (A x B = C) and only
  // folds into the aligned L once the "good method" beat sets `stacked`. The
  // sweep slide is always in the L, since it starts mid-example.
  const layout: "linear" | "L" = mode === "rowcol" && !reveal.stacked ? "linear" : "L";
  const spec: MatMulSpec = {
    aria:
      layout === "linear"
        ? "Matrix A times matrix B set up left to right, ready to multiply."
        : active
          ? `Row ${active[0] + 1} of A times column ${active[1] + 1} of B gives the entry ${AB[active[0]][active[1]]}.`
          : "Matrix A at the lower left and matrix B at the upper right, ready to multiply row by column.",
    A,
    B,
    C: Crows,
    aLabel: "A",
    bLabel: "B",
    cLabel: "AB",
    active,
    caption,
    layout,
  };
  return frame(<MatMulFrame spec={spec} />);
}
