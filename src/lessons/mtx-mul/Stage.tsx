import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import MatrixGrid, { type MatrixSpec, type MatrixToken } from "../../components/MatrixGrid";
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

export default function MtxMulStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "rowcol";
  const showDock = Boolean(reveal.dock);

  let spec: MatrixSpec;
  let dock: ReactNode = null;

  if (mode === "order") {
    spec = {
      aria: "AB equals [[19,22],[43,50]], which is not equal to BA equals [[23,34],[31,46]].",
      tokens: [
        { rows: AB, label: "AB" },
        { kind: "op", text: "\u2260", tone: "anti" },
        { rows: reveal.ba ? BA : blank2, label: "BA" },
      ],
    };
    dock = (
      <div className="formula-list">
        <Tex>{"AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}"}</Tex>
        {reveal.ba && <Tex>{"BA = \\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}"}</Tex>}
        {reveal.ba && <Tex>{"AB \\neq BA \\quad (\\text{order matters})"}</Tex>}
      </div>
    );
  } else if (mode === "yourturn") {
    const k = Math.round(values.k ?? 2);
    const Bk: number[][] = [
      [k, 6],
      [7, 8],
    ];
    const C = A.map((_, i) => Bk[0].map((__, j) => dot2(rowOf(A, i), colOf(Bk, j))));
    spec = {
      aria: `A times B, where B's top-left entry is ${k}; the product's first column is ${C[0][0]} and ${C[1][0]}.`,
      tokens: [
        { rows: A, label: "A", hiCol: 0, colTone: "a" },
        { kind: "op", text: "\u00d7" },
        { rows: Bk, label: "B", hiCol: 0, colTone: "b" },
        { kind: "op", text: "=" },
        {
          rows: C.map((r) => r.map((v) => String(v))),
          label: "AB",
          hiCells: [
            { r: 0, c: 0, tone: "prod" },
            { r: 1, c: 0, tone: "prod" },
          ],
        },
      ],
      caption: `top-left: (1)(${k}) + (2)(7) = ${C[0][0]}`,
    };
    dock = (
      <div className="formula-list">
        <Tex>{`(AB)_{11} = (1)(${k}) + (2)(7) = ${C[0][0]}`}</Tex>
        <Tex>{`(AB)_{21} = (3)(${k}) + (4)(7) = ${C[1][0]}`}</Tex>
        <Tex>{"\\text{only column 1 of } AB \\text{ depends on } k"}</Tex>
      </div>
    );
  } else {
    // rowcol (slide 1) and sweep (slide 2): reveal product entries one at a time.
    // Read each flag literally so the harness can see which figure uses them.
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
    const aTok: MatrixToken = { rows: A, label: "A" };
    const bTok: MatrixToken = { rows: B, label: "B" };
    const cTok: MatrixToken = { rows: Crows, label: "AB" };
    let caption: string | undefined;
    if (active) {
      const [i, j] = active;
      aTok.hiRow = i;
      aTok.rowTone = "a";
      bTok.hiCol = j;
      bTok.colTone = "b";
      cTok.hiCells = [{ r: i, c: j, tone: "prod" }];
      caption = `(${A[i][0]})(${B[0][j]}) + (${A[i][1]})(${B[1][j]}) = ${AB[i][j]}`;
    }
    spec = {
      aria: active
        ? `Row ${active[0] + 1} of A times column ${active[1] + 1} of B gives the entry ${AB[active[0]][active[1]]}.`
        : "Matrix A times matrix B, ready to multiply row by column.",
      tokens: [aTok, { kind: "op", text: "\u00d7" }, bTok, { kind: "op", text: "=" }, cTok],
      caption,
    };
    dock = (
      <div className="formula-list">
        <Tex>{"(AB)_{ij} = (\\text{row } i \\text{ of } A) \\cdot (\\text{col } j \\text{ of } B)"}</Tex>
        {active && (
          <Tex>
            {`(AB)_{${active[0] + 1}${active[1] + 1}} = (${A[active[0]][0]})(${B[0][active[1]]}) + (${A[active[0]][1]})(${B[1][active[1]]}) = ${AB[active[0]][active[1]]}`}
          </Tex>
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
