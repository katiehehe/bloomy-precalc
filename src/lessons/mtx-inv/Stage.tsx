import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import MatrixGrid, { type MatrixSpec, type MatrixToken } from "../../components/MatrixGrid";
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

/** Minus sign for plain SVG text (Unicode U+2212), and for KaTeX (hyphen). */
const sfx = (n: number) => (n < 0 ? `\u2212${Math.abs(n)}` : String(n));
const kfx = (n: number) => (n < 0 ? `-${Math.abs(n)}` : String(n));
/** A numeric matrix rendered as MatrixGrid cell text (proper minus glyph). */
const cells = (m: number[][]): string[][] => m.map((row) => row.map(sfx));

const blank2: string[][] = [
  ["", ""],
  ["", ""],
];

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
    op: "\\text{swap, negate; } \\det = 2",
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

/** A small, fixed-size matrix glyph to anchor an AlgebraFlow derivation. */
function Glyph({ spec }: { spec: MatrixSpec }) {
  return (
    <div style={{ width: "clamp(160px, 48%, 250px)", aspectRatio: "1 / 1", margin: "0 auto" }}>
      <MatrixGrid spec={spec} />
    </div>
  );
}

export default function MtxInvStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "formula";
  const showDock = Boolean(reveal.dock);

  let slot: ReactNode = null;
  let dock: ReactNode = null;

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
    const aTok: MatrixToken = { rows: cells(A), label: "A" };
    const bTok: MatrixToken = { rows: cells(AINV), label: "A\u207b\u00b9" };
    const cTok: MatrixToken = { rows: Crows, label: "A A\u207b\u00b9" };
    let caption: string | undefined;
    if (active) {
      const [i, j] = active;
      aTok.hiRow = i;
      aTok.rowTone = "a";
      bTok.hiCol = j;
      bTok.colTone = "b";
      cTok.hiCells = [{ r: i, c: j, tone: "prod" }];
      caption = `(${sfx(A[i][0])})(${sfx(AINV[0][j])}) + (${sfx(A[i][1])})(${sfx(AINV[1][j])}) = ${sfx(PROD[i][j])}`;
    }
    const spec: MatrixSpec = {
      aria: active
        ? `Row ${active[0] + 1} of A times column ${active[1] + 1} of the inverse gives ${PROD[active[0]][active[1]]}.`
        : "Matrix A times its inverse, ready to multiply row by column.",
      tokens: [aTok, { kind: "op", text: "\u00d7" }, bTok, { kind: "op", text: "=" }, cTok],
      caption,
    };
    slot = <MatrixGrid spec={spec} />;
    dock = (
      <div className="formula-list">
        <Tex>{"A A^{-1} = I \\text{ confirms the inverse}"}</Tex>
        {active && (
          <Tex>
            {`(A A^{-1})_{${active[0] + 1}${active[1] + 1}} = (${kfx(A[active[0]][0])})(${kfx(AINV[0][active[1]])}) + (${kfx(A[active[0]][1])})(${kfx(AINV[1][active[1]])}) = ${kfx(PROD[active[0]][active[1]])}`}
          </Tex>
        )}
      </div>
    );
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
    dock = (
      <div className="formula-list">
        <Tex>{"\\det M = (a)(2) - (3)(2) = 2a - 6"}</Tex>
        <Tex>{`\\det = 2(${a}) - 6 = ${kfx(det)}`}</Tex>
        <Tex>{det === 0 ? "\\det = 0:\\ \\text{singular, no inverse}" : "\\det \\neq 0:\\ \\text{invertible}"}</Tex>
      </div>
    );
  } else if (mode === "fails") {
    const showDet2 = Boolean(reveal.s3);
    const failMat = showDet2 ? [[4, 3], [2, 2]] : [[2, 4], [1, 2]];
    const caption = showDet2
      ? reveal.s4
        ? "det = (4)(2) \u2212 (3)(2) = 2"
        : undefined
      : reveal.s1
        ? "det = (2)(2) \u2212 (4)(1) = 0"
        : undefined;
    const glyph: MatrixSpec = {
      aria: showDet2
        ? "Matrix [[4,3],[2,2]] with determinant 2."
        : "Singular matrix [[2,4],[1,2]] whose two diagonal products are equal, so the determinant is 0.",
      tokens: [{ rows: cells(failMat), label: "A", diag: true, anti: true }],
      caption,
      captionTone: showDet2 ? "prod" : "anti",
    };
    slot = (
      <AlgebraFlow
        steps={FAILS}
        reveal={reveal}
        heading={"\\text{the determinant decides}"}
        header={<Glyph spec={glyph} />}
      />
    );
    dock = (
      <div className="formula-list">
        <Tex>{"A^{-1} = \\dfrac{1}{\\det}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}"}</Tex>
        {reveal.s1 && <Tex>{"\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix} = (2)(2) - (4)(1) = 0"}</Tex>}
        {reveal.s2 && <Tex>{"\\det = 0:\\ \\text{no inverse}"}</Tex>}
        {reveal.s3 && <Tex>{"A = \\begin{bmatrix} 4 & 3 \\\\ 2 & 2 \\end{bmatrix},\\ \\det = 2"}</Tex>}
        {reveal.s5 && (
          <Tex>{"A^{-1} = \\dfrac{1}{2}\\begin{bmatrix} 2 & -3 \\\\ -2 & 4 \\end{bmatrix} = \\begin{bmatrix} 1 & -\\tfrac{3}{2} \\\\ -1 & 2 \\end{bmatrix}"}</Tex>
        )}
      </div>
    );
  } else {
    // formula (slide 1): the swap/negate/divide recipe worked on A, with an A -> A^{-1} glyph.
    const invShown = Boolean(reveal.s3);
    const glyph: MatrixSpec = {
      aria: "Matrix A on the left, building its inverse on the right.",
      tokens: [
        { rows: cells(A), label: "A", diag: Boolean(reveal.s1), anti: Boolean(reveal.s1) },
        { kind: "op", text: "\u2192" },
        { rows: invShown ? cells(AINV) : blank2, label: "A\u207b\u00b9" },
      ],
      caption: reveal.s1 ? "det = (2)(2) \u2212 (1)(3) = 1" : undefined,
    };
    slot = (
      <AlgebraFlow
        steps={FORMULA}
        reveal={reveal}
        heading={"\\text{build the inverse: swap, negate, divide}"}
        header={<Glyph spec={glyph} />}
      />
    );
    dock = (
      <div className="formula-list">
        <Tex>{"A^{-1} = \\dfrac{1}{\\det}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}"}</Tex>
        {reveal.s1 && <Tex>{"\\det = (2)(2) - (1)(3) = 1"}</Tex>}
        {reveal.s4 && <Tex>{"A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}"}</Tex>}
      </div>
    );
  }

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}
