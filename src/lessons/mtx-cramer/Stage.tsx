import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import MatrixGrid, { type MatrixSpec } from "../../components/MatrixGrid";
import type { LessonFigureProps } from "../types";

/** The worked system 2x + y = 5, x + 3y = 10. */
const A: number[][] = [
  [2, 1],
  [1, 3],
];
const b: number[] = [5, 10];

const det2 = (m: number[][]) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const detA = det2(A); // 5

/** Unicode minus for plain SVG text (captions), never a hyphen. */
const MINUS = "\u2212";
const signed = (n: number) => (n < 0 ? `${MINUS}${Math.abs(n)}` : `${n}`);

/**
 * Cramer's rule figure. Each slide shows the matrix whose determinant is in play,
 * with the replaced column highlighted (hiCol, tone "b") and the 2x2 determinant
 * read off the diagonals. Precise determinant and division work lives in the dock
 * as KaTeX (\det, \begin{vmatrix}, \dfrac). Every reveal flag is read literally so
 * the eval harness can pair it with the slide that sets it.
 */
export default function MtxCramerStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "setup";
  const showDock = Boolean(reveal.dock);

  let spec: MatrixSpec;
  let dock: ReactNode = null;

  if (mode === "solveX") {
    // A_x: replace column 1 of A with the constants b.
    const Ax: number[][] = [
      [b[0], A[0][1]],
      [b[1], A[1][1]],
    ];
    const detAx = det2(Ax); // 5
    spec = {
      aria: "A sub x is A with its first column replaced by the constants 5 and 10. Its determinant is 5.",
      tokens: [{ rows: Ax, label: "Ax", hiCol: 0, colTone: "b" }],
      caption: reveal.detX
        ? `det Ax = (5)(3) ${MINUS} (1)(10) = 15 ${MINUS} 10 = ${detAx}`
        : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"A_x = \\begin{bmatrix} 5 & 1 \\\\ 10 & 3 \\end{bmatrix} \\quad (\\text{col 1 replaced by } b)"}</Tex>
        {reveal.detX && (
          <Tex>{"\\det(A_x) = \\begin{vmatrix} 5 & 1 \\\\ 10 & 3 \\end{vmatrix} = (5)(3) - (1)(10) = 5"}</Tex>
        )}
        {reveal.xVal && <Tex>{"x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{5}{5} = 1"}</Tex>}
      </div>
    );
  } else if (mode === "solveY") {
    // A_y: replace column 2 of A with the constants b.
    const Ay: number[][] = [
      [A[0][0], b[0]],
      [A[1][0], b[1]],
    ];
    const detAy = det2(Ay); // 15
    spec = {
      aria: "A sub y is A with its second column replaced by the constants 5 and 10. Its determinant is 15.",
      tokens: [{ rows: Ay, label: "Ay", hiCol: 1, colTone: "b" }],
      caption: reveal.detY
        ? `det Ay = (2)(10) ${MINUS} (5)(1) = 20 ${MINUS} 5 = ${detAy}`
        : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"A_y = \\begin{bmatrix} 2 & 5 \\\\ 1 & 10 \\end{bmatrix} \\quad (\\text{col 2 replaced by } b)"}</Tex>
        {reveal.detY && (
          <Tex>{"\\det(A_y) = \\begin{vmatrix} 2 & 5 \\\\ 1 & 10 \\end{vmatrix} = (2)(10) - (5)(1) = 15"}</Tex>
        )}
        {reveal.yVal && <Tex>{"y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{15}{5} = 3"}</Tex>}
        {reveal.soln && <Tex>{"(x,\\, y) = (1,\\, 3)"}</Tex>}
        {reveal.soln && <Tex>{"2(1) + 3 = 5 \\qquad 1 + 3(3) = 10"}</Tex>}
      </div>
    );
  } else if (mode === "yourturn") {
    // Live: the top constant c drives A_x's first column, its determinant, and x.
    const c = Math.round(values.c ?? 5);
    const Axc: number[][] = [
      [c, A[0][1]],
      [b[1], A[1][1]],
    ];
    const detAxc = det2(Axc); // 3c - 10
    const xExact = detAxc % 5 === 0 ? ` = ${detAxc / 5}` : "";
    spec = {
      aria: `A sub x with top constant ${c}. Its determinant is ${detAxc}, so x is ${detAxc} over 5.`,
      tokens: [{ rows: Axc, label: "Ax", hiCol: 0, colTone: "b" }],
      caption: `det Ax = (${c})(3) ${MINUS} (1)(10) = ${signed(detAxc)}`,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"\\det(A) = 5 \\quad (\\text{unchanged})"}</Tex>
        <Tex>{`\\det(A_x) = (${c})(3) - (1)(10) = ${detAxc}`}</Tex>
        <Tex>{`x = \\dfrac{\\det(A_x)}{\\det(A)} = \\dfrac{${detAxc}}{5}${xExact}`}</Tex>
      </div>
    );
  } else {
    // setup: introduce A and b, then compute det(A) = 5.
    const showHi = Boolean(reveal.detHi);
    spec = {
      aria: "The coefficient matrix A next to the constant column b, ready to compute the determinant of A.",
      tokens: [
        { rows: A, label: "A", diag: showHi, anti: showHi },
        { rows: [[b[0]], [b[1]]], label: "b", hiCol: 0, colTone: "b" },
      ],
      caption: reveal.detVal
        ? `det A = (2)(3) ${MINUS} (1)(1) = 6 ${MINUS} 1 = ${detA}`
        : undefined,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"2x + y = 5 \\qquad x + 3y = 10"}</Tex>
        <Tex>{"x_i = \\dfrac{\\det(A_i)}{\\det(A)}"}</Tex>
        {reveal.detVal && (
          <Tex>{"\\det(A) = \\begin{vmatrix} 2 & 1 \\\\ 1 & 3 \\end{vmatrix} = (2)(3) - (1)(1) = 5"}</Tex>
        )}
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
