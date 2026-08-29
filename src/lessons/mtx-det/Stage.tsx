import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import MatrixGrid, { type MatrixSpec, type HiTone } from "../../components/MatrixGrid";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

/** The running 3x3 for the cofactor slide. */
const A3: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 10],
];

/**
 * The 3x3 cofactor expansion, written one line at a time. Each `show` flag is
 * set by a beat in slides.ts (e1..e6), read literally below so the harness can
 * see the correspondence.
 */
const COFACTOR: FlowStep[] = [
  { id: "c0", tex: "\\det A = \\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{vmatrix}" },
  {
    id: "c1",
    show: "e1",
    op: "\\text{expand along row 1: signs } +\\,-\\,+",
    tex: "= 1\\begin{vmatrix} 5 & 6 \\\\ 8 & 10 \\end{vmatrix} - 2\\begin{vmatrix} 4 & 6 \\\\ 7 & 10 \\end{vmatrix} + 3\\begin{vmatrix} 4 & 5 \\\\ 7 & 8 \\end{vmatrix}",
  },
  {
    id: "c2",
    show: "e2",
    op: "\\text{each minor is } ad - bc",
    tex: "= 1(5\\cdot 10 - 6\\cdot 8) - 2(4\\cdot 10 - 6\\cdot 7) + 3(4\\cdot 8 - 5\\cdot 7)",
  },
  { id: "c3", show: "e3", op: "\\text{multiply inside}", tex: "= 1(50 - 48) - 2(40 - 42) + 3(32 - 35)" },
  { id: "c4", show: "e4", op: "\\text{subtract inside each pair}", tex: "= 1(2) - 2(-2) + 3(-3)" },
  { id: "c5", show: "e5", op: "\\text{distribute: } -2(-2) = +4", tex: "= 2 + 4 - 9" },
  { id: "c6", show: "e6", tone: "good", result: true, op: "\\text{add}", tex: "= -3" },
];

/** Shared frame: a figure slot with an optional formula dock beneath it. */
function frame(slot: ReactNode, dock: ReactNode) {
  const showDock = Boolean(dock);
  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}

export default function MtxDetStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "twobytwo";

  // Slide 3: the 3x3 cofactor expansion writes itself in the slot, with the
  // matrix shown as a small glyph header (row 1 highlighted).
  if (mode === "cofactor") {
    const flowReveal = {
      e1: Boolean(reveal.e1),
      e2: Boolean(reveal.e2),
      e3: Boolean(reveal.e3),
      e4: Boolean(reveal.e4),
      e5: Boolean(reveal.e5),
      e6: Boolean(reveal.e6),
    };
    const headerSpec: MatrixSpec = {
      aria: "The 3 by 3 matrix A with its first row highlighted, ready for cofactor expansion along row 1.",
      tokens: [{ rows: A3, label: "A", hiRow: 0, rowTone: "accent" }],
    };
    const header = (
      <div style={{ width: "min(62%, 230px)", aspectRatio: "1 / 1", margin: "0 auto" }}>
        <MatrixGrid spec={headerSpec} />
      </div>
    );
    return frame(
      <AlgebraFlow steps={COFACTOR} reveal={flowReveal} heading={"\\text{cofactor expansion along row 1}"} header={header} />,
      null,
    );
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
    const dock = Boolean(reveal.dock) ? (
      <div className="formula-list">
        <Tex>{`\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & ${d} \\end{bmatrix} = (2)(${d}) - (4)(1)`}</Tex>
        <Tex>{`= ${2 * d} - 4 = ${det}`}</Tex>
        {det === 0 ? (
          <Tex>{"\\det A = 0:\\ \\text{singular (no inverse)}"}</Tex>
        ) : (
          <Tex>{"\\det A \\neq 0:\\ \\text{invertible}"}</Tex>
        )}
      </div>
    ) : null;
    return frame(<MatrixGrid spec={spec} />, dock);
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

  const dock = Boolean(reveal.dock)
    ? singular
      ? (
          <div className="formula-list">
            <Tex>{"\\det \\begin{bmatrix} 2 & 4 \\\\ 1 & 2 \\end{bmatrix} = (2)(2) - (4)(1)"}</Tex>
            {zero && <Tex>{"= 4 - 4 = 0 \\quad (\\text{singular})"}</Tex>}
            {zero && <Tex>{"\\det A = 0 \\implies A^{-1} \\text{ does not exist}"}</Tex>}
          </div>
        )
      : (
          <div className="formula-list">
            <Tex>{"\\det \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc"}</Tex>
            {diag && <Tex>{"ad = (4)(5) = 20"}</Tex>}
            {anti && <Tex>{"bc = (3)(2) = 6"}</Tex>}
            {value && <Tex>{"\\det A = 20 - 6 = 14"}</Tex>}
          </div>
        )
    : null;

  return frame(<MatrixGrid spec={spec} />, dock);
}
