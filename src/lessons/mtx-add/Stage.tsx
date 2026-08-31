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

/** A + B, computed entrywise (revealed one cell at a time on slide 1). */
const SUM: number[][] = A.map((row, i) => row.map((v, j) => v + B[i][j]));

/** The fixed scalar and 3A for slide 2. */
const K_SCALE = 3;
const SCALED: number[][] = A.map((row) => row.map((v) => K_SCALE * v));

/** A deliberately wrong-shaped partner (2x3) for the mismatch beat on slide 3. */
const M2x3: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

const CELLS: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

/** Format a number for plain SVG text, using a real minus sign (U+2212). */
const svgNum = (n: number) => (n < 0 ? "\u2212" + Math.abs(n) : String(n));

export default function MtxAddStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "add";

  let spec: MatrixSpec;

  if (mode === "scale") {
    // Slide 2: 3A, revealing k times each entry one cell at a time.
    const cellShown: Record<string, boolean> = {
      "0,0": Boolean(reveal.p00),
      "0,1": Boolean(reveal.p01),
      "1,0": Boolean(reveal.p10),
      "1,1": Boolean(reveal.p11),
    };
    const shown = CELLS.filter(([i, j]) => cellShown[`${i},${j}`]);
    const active = shown.length ? shown[shown.length - 1] : null;
    const Crows: (string | number)[][] = [0, 1].map((i) =>
      [0, 1].map((j) => (cellShown[`${i},${j}`] ? svgNum(SCALED[i][j]) : "")),
    );
    const aTok: MatrixToken = { rows: A, label: "A" };
    const cTok: MatrixToken = { rows: Crows, label: "3A" };
    let caption: string | undefined;
    if (active) {
      const [i, j] = active;
      aTok.hiCells = [{ r: i, c: j, tone: "a" }];
      cTok.hiCells = [{ r: i, c: j, tone: "prod" }];
      caption = `3 \u00d7 ${svgNum(A[i][j])} = ${svgNum(SCALED[i][j])}`;
    }
    spec = {
      aria: active
        ? `3 times the entry ${A[active[0]][active[1]]} of A gives ${SCALED[active[0]][active[1]]}.`
        : "Three times matrix A, ready to scale each entry.",
      tokens: [{ kind: "op", text: "3", tone: "prod" }, aTok, { kind: "op", text: "=" }, cTok],
      caption,
    };
  } else if (mode === "props") {
    // Slide 3: properties in the dock, and the shape mismatch in the figure.
    if (reveal.mismatch) {
      spec = {
        aria: "A 2 by 2 matrix and a 2 by 3 matrix cannot be added. Their shapes differ.",
        tokens: [
          { rows: A, label: "2 \u00d7 2" },
          { kind: "op", text: "+", tone: "anti" },
          { rows: M2x3, label: "2 \u00d7 3", hiCol: 2, colTone: "anti" },
        ],
        caption: "the third column has no partner, so this sum is undefined",
        captionTone: "anti",
      };
    } else {
      const caption = reveal.shape
        ? "both are 2 \u00d7 2, so every entry has a partner"
        : reveal.dist
          ? "k(A + B) = kA + kB"
          : reveal.comm
            ? "A + B = B + A (order does not matter)"
            : undefined;
      spec = {
        aria: "A plus B equals the matrix with entries 6, 8, 10, 12.",
        tokens: [
          { rows: A, label: "A" },
          { kind: "op", text: "+" },
          { rows: B, label: "B" },
          { kind: "op", text: "=" },
          { rows: SUM, label: "A + B" },
        ],
        caption,
      };
    }
  } else if (mode === "yourturn") {
    // Slide 4: k scales A live; every entry of kA moves together.
    const k = Math.round(values.k ?? 2);
    const kA: number[][] = A.map((row) => row.map((v) => k * v));
    const kArows: (string | number)[][] = kA.map((row) => row.map(svgNum));
    const aTok: MatrixToken = { rows: A, label: "A", hiCells: [{ r: 0, c: 0, tone: "a" }] };
    const cTok: MatrixToken = { rows: kArows, label: "kA", hiCells: [{ r: 0, c: 0, tone: "prod" }] };
    spec = {
      aria: `k times A with k equal to ${k}. The entries are ${kA[0][0]}, ${kA[0][1]}, ${kA[1][0]}, and ${kA[1][1]}.`,
      tokens: [{ kind: "op", text: svgNum(k), tone: "prod" }, aTok, { kind: "op", text: "=" }, cTok],
      caption: `top-left: ${svgNum(k)} \u00d7 1 = ${svgNum(k)}`,
    };
  } else {
    // Slide 1 (add): reveal each sum entry one at a time, matching-cell highlight.
    const cellShown: Record<string, boolean> = {
      "0,0": Boolean(reveal.s00),
      "0,1": Boolean(reveal.s01),
      "1,0": Boolean(reveal.s10),
      "1,1": Boolean(reveal.s11),
    };
    const shown = CELLS.filter(([i, j]) => cellShown[`${i},${j}`]);
    const active = shown.length ? shown[shown.length - 1] : null;
    const Crows: (string | number)[][] = [0, 1].map((i) =>
      [0, 1].map((j) => (cellShown[`${i},${j}`] ? svgNum(SUM[i][j]) : "")),
    );
    const aTok: MatrixToken = { rows: A, label: "A" };
    const bTok: MatrixToken = { rows: B, label: "B" };
    const cTok: MatrixToken = { rows: Crows, label: "A + B" };
    let caption: string | undefined;
    if (active) {
      const [i, j] = active;
      aTok.hiCells = [{ r: i, c: j, tone: "a" }];
      bTok.hiCells = [{ r: i, c: j, tone: "b" }];
      cTok.hiCells = [{ r: i, c: j, tone: "prod" }];
      caption = `${svgNum(A[i][j])} + ${svgNum(B[i][j])} = ${svgNum(SUM[i][j])}`;
    }
    spec = {
      aria: active
        ? `The entry ${A[active[0]][active[1]]} of A plus ${B[active[0]][active[1]]} of B gives ${SUM[active[0]][active[1]]}.`
        : "Matrix A plus matrix B, ready to add entry by entry.",
      tokens: [aTok, { kind: "op", text: "+" }, bTok, { kind: "op", text: "=" }, cTok],
      caption,
    };
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <MatrixGrid spec={spec} />
        </div>
      </div>
    </section>
  );
}
