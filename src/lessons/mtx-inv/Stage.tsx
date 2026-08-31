import { type ReactNode } from "react";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import MatrixGrid, { type MatrixSpec } from "../../components/MatrixGrid";
import MatMulFrame, { type MatMulSpec } from "../../components/MatMulFrame";
import type { LessonFigureProps } from "../types";

/** The running example whose inverse we build and then verify. det(A) = 1. */
const A: number[][] = [
  [2, 1],
  [3, 2],
];
const AINV: number[][] = [
  [2, -1],
  [-3, 2],
];

const rowOf = (m: number[][], r: number) => m[r];
const colOf = (m: number[][], c: number) => m.map((row) => row[c]);
const dot2 = (u: number[], v: number[]) => u[0] * v[0] + u[1] * v[1];

/** A A^{-1}; comes out to the identity, which slide 2 reveals entry by entry. */
const PROD = A.map((_, i) => AINV[0].map((__, j) => dot2(rowOf(A, i), colOf(AINV, j))));

/** Minus sign for plain SVG text (Unicode U+2212). */
const sfx = (n: number) => (n < 0 ? `\u2212${Math.abs(n)}` : String(n));
/** A numeric matrix rendered as cell text (proper minus glyph). */
const cells = (m: number[][]): string[][] => m.map((row) => row.map(sfx));

const CELLS: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

/** Slide 1: swap, negate, divide, written line by line beside a small A -> A^{-1} glyph. */
const FORMULA: FlowStep[] = [
  { id: "f0", tex: "A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}" },
  { id: "f1", show: "s1", op: "\\det = ad - bc", tex: "\\det = (2)(2) - (1)(3) = 1" },
  { id: "f2", show: "s2", op: "\\text{swap } a \\text{ and } d", tex: "\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}" },
  { id: "f3", show: "s3", op: "\\text{negate } b \\text{ and } c", tex: "\\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}" },
  {
    id: "f4",
    show: "s4",
    tone: "good",
    result: true,
    op: "\\text{divide by } \\det = 1",
    tex: "A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}",
  },
];

/** Slide 3: the singular case (det = 0, no inverse) then the det = 2 case (scale by 1/det). */
const FAILS: FlowStep[] = [
  { id: "g0", tex: "A = \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix}" },
  { id: "g1", show: "s1", op: "\\det = ad - bc", tex: "\\det = (2)(2) - (4)(1) = 0" },
  {
    id: "g2",
    show: "s2",
    tone: "cancel",
    result: true,
    op: "\\det = 0",
    tex: "A^{-1}\\ \\text{does not exist}",
  },
  { id: "g3", show: "s3", op: "\\text{a new matrix, } \\det \\neq 1", tex: "A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix}" },
  {
    id: "g4",
    show: "s4",
    op: "\\text{swap and negate, } \\det = 2",
    tex: "A^{-1} = \\dfrac{1}{2}\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix}",
  },
  {
    id: "g5",
    show: "s5",
    tone: "good",
    result: true,
    op: "\\text{divide by } 2",
    tex: "A^{-1} = \\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}",
  },
];

export default function MtxInvStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "formula";

  let slot: ReactNode = null;

  if (mode === "verify") {
    const cellShown: Record<string, boolean> = {
      "0,0": Boolean(reveal.e00),
      "0,1": Boolean(reveal.e01),
      "1,0": Boolean(reveal.e10),
      "1,1": Boolean(reveal.e11),
    };
    const shown = CELLS.filter(([i, j]) => cellShown[`${i},${j}`]);
    const active = shown.length ? shown[shown.length - 1] : null;
    const Crows: (string | number)[][] = [0, 1].map((i) =>
      [0, 1].map((j) => (cellShown[`${i},${j}`] ? sfx(PROD[i][j]) : "")),
    );
    const caption = active
      ? `(${sfx(A[active[0]][0])})(${sfx(AINV[0][active[1]])}) + (${sfx(A[active[0]][1])})(${sfx(AINV[1][active[1]])}) = ${sfx(PROD[active[0]][active[1]])}`
      : undefined;
    const spec: MatMulSpec = {
      aria: active
        ? `Row ${active[0] + 1} of A on the left lines up with column ${active[1] + 1} of the inverse on the top, meeting at entry ${PROD[active[0]][active[1]]} of the product.`
        : "Matrix A at the lower left, its inverse at the upper right, and their product filling the intersection at the lower right.",
      A: cells(A),
      B: cells(AINV),
      C: Crows,
      aLabel: "A",
      bLabel: "A\u207b\u00b9",
      cLabel: "A A\u207b\u00b9",
      active,
      caption,
      captionTone: "prod",
    };
    slot = <MatMulFrame spec={spec} />;
  } else if (mode === "yourturn") {
    const a = Math.round(values.a ?? 6);
    const det = 2 * a - 6;
    const M: number[][] = [
      [a, 3],
      [2, 2],
    ];
    const spec: MatrixSpec = {
      aria: `Matrix with top-left entry ${a}, so the determinant is ${det}.`,
      tokens: [{ rows: cells(M), label: "M", diag: true, anti: true }],
      caption: `det = (${a})(2) \u2212 (3)(2) = ${sfx(det)}`,
      captionTone: det === 0 ? "anti" : "prod",
    };
    slot = <MatrixGrid spec={spec} />;
  } else if (mode === "fails") {
    slot = <AlgebraFlow steps={FAILS} reveal={reveal} title="the determinant decides" align="start" />;
  } else {
    // formula (slide 1): the swap/negate/divide recipe worked on A, titled at the
    // top with no separate matrix glyph (the derivation shows the matrices itself).
    slot = <AlgebraFlow steps={FORMULA} reveal={reveal} title="build the inverse: swap, negate, divide" align="start" />;
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
      </div>
    </section>
  );
}
