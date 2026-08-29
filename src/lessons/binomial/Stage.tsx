import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";

/**
 * Binomial theorem via a bespoke Pascal's triangle. There is no shared figure
 * for this, so the triangle is drawn directly as an <svg> (circles for entries,
 * text for the numbers, lines for the "sum of the two above" connectors). An
 * <svg> lives in the figure-slot on every slide, which also satisfies the smoke
 * harness. Slides 2 to 4 add a formula dock that writes the expansion line by
 * line.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   triangle:  rows, parents, cnotation
 *   theorem:   rows, coeffs, exps
 *   expand3:   rows, coeffs, terms, result
 *   term:      rows, coeffs, formula, terms, result
 *   yourturn:  rows (the highlighted row is driven by the n slider)
 */

const VB = 480;
const CX = 240; // horizontal center of the triangle
const TOP = 50; // y of row 0
const ROW_GAP = 60;
const DX = 56; // horizontal spacing between entries in a row
const R = 20; // circle radius
const NROWS = 7; // rows n = 0..6

/** Pascal's triangle, built by the recurrence: each interior entry is the sum
 * of the two directly above it. Rows 0..6. */
const TRIANGLE: number[][] = (() => {
  const rows: number[][] = [[1]];
  for (let n = 1; n < NROWS; n += 1) {
    const prev = rows[n - 1];
    const row: number[] = [1];
    for (let k = 1; k < n; k += 1) row.push(prev[k - 1] + prev[k]);
    row.push(1);
    rows.push(row);
  }
  return rows;
})();

const cellX = (n: number, k: number) => CX + (k - n / 2) * DX;
const cellY = (n: number) => TOP + n * ROW_GAP;

/** The example row highlighted on each watch slide (your-turn uses the slider). */
const ROW_FOR_MODE: Record<string, number> = { theorem: 3, expand3: 3, term: 4 };

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

/** Draw the triangle. `highlightRow` lights a whole row (the coefficients);
 * `parents` lights the 6 in row 4 with its two 3's above; `cnotation` tags it. */
function Triangle({
  highlightRow,
  parents,
  cnotation,
}: {
  highlightRow: number | null;
  parents: boolean;
  cnotation: boolean;
}) {
  const nodes: ReactNode[] = [];

  // Connectors for the recurrence example, drawn under the circles.
  if (parents) {
    const childX = cellX(4, 2);
    const childY = cellY(4);
    nodes.push(
      <line key="lp1" x1={cellX(3, 1)} y1={cellY(3)} x2={childX} y2={childY} stroke="var(--teal)" strokeWidth={2.5} />,
      <line key="lp2" x1={cellX(3, 2)} y1={cellY(3)} x2={childX} y2={childY} stroke="var(--teal)" strokeWidth={2.5} />,
    );
  }

  for (let n = 0; n < NROWS; n += 1) {
    nodes.push(
      <text
        key={`rl${n}`}
        x={cellX(n, 0) - R - 12}
        y={cellY(n) + 5}
        textAnchor="end"
        fill="var(--muted)"
        fontSize={13}
      >
        {`n = ${n}`}
      </text>,
    );
    for (let k = 0; k <= n; k += 1) {
      const isChild = parents && n === 4 && k === 2;
      const isParent = parents && n === 3 && (k === 1 || k === 2);
      const inRow = highlightRow === n;
      let fill = "var(--surface)";
      let textFill = "var(--ink)";
      let stroke = "var(--line)";
      let strokeW = 1.5;
      if (isChild) {
        fill = "var(--accent)";
        textFill = "#fff";
        stroke = "var(--accent)";
        strokeW = 2.5;
      } else if (isParent) {
        fill = "var(--teal)";
        textFill = "#fff";
        stroke = "var(--teal)";
        strokeW = 2.5;
      } else if (inRow) {
        fill = "var(--primary)";
        textFill = "#fff";
        stroke = "var(--primary)";
        strokeW = 2;
      }
      nodes.push(
        <g key={`c${n}-${k}`}>
          <circle cx={cellX(n, k)} cy={cellY(n)} r={R} fill={fill} stroke={stroke} strokeWidth={strokeW} />
          <text
            x={cellX(n, k)}
            y={cellY(n) + 5}
            textAnchor="middle"
            fill={textFill}
            fontSize={TRIANGLE[n][k] >= 10 ? 14 : 15}
            fontWeight={600}
          >
            {TRIANGLE[n][k]}
          </text>
        </g>,
      );
    }
  }

  // Annotations sit centered below the triangle so they never overlap entries.
  if (parents) {
    nodes.push(
      <text key="add" x={CX} y={cellY(6) + 38} textAnchor="middle" fill="var(--ink)" fontSize={16} fontWeight={700}>
        6 = 3 + 3
      </text>,
    );
  }
  if (cnotation) {
    nodes.push(
      <text key="cnk" x={CX} y={cellY(6) + 60} textAnchor="middle" fill="var(--accent)" fontSize={15} fontWeight={600}>
        the 6 is C(4, 2)
      </text>,
    );
  }

  return <>{nodes}</>;
}

export default function BinomialStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "triangle";

  const showRows = Boolean(reveal.rows);
  const parents = Boolean(reveal.parents);
  const cnotation = Boolean(reveal.cnotation);
  const coeffs = Boolean(reveal.coeffs);

  // Which row lights up. The your-turn slider drives it directly; the watch
  // slides light their example row once `coeffs` is revealed.
  let highlightRow: number | null = null;
  if (mode === "yourturn") {
    highlightRow = Math.max(0, Math.min(6, Math.round(values.n ?? 2)));
  } else if (coeffs) {
    highlightRow = ROW_FOR_MODE[mode] ?? null;
  }

  // Aria description of the current figure state.
  let aria = "Pascal's triangle, rows n = 0 through 6, each entry the sum of the two above it.";
  if (mode === "triangle" && parents) {
    aria = "Pascal's triangle, rows 0 through 6, with the 6 in row 4 highlighted and its two parents (3 and 3) in row 3 connected to it.";
  } else if (highlightRow != null) {
    aria = `Pascal's triangle, rows 0 through 6, with row ${highlightRow} highlighted: its entries are ${TRIANGLE[highlightRow].join(", ")}.`;
  }

  // Formula dock, mode by mode. Kept null when there is nothing to show so the
  // dock box does not appear empty.
  let dock: ReactNode = null;

  if (mode === "theorem") {
    dock = (
      <div className="formula-list">
        <Tex>{"(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k}\\, a^{\\,n-k} b^{\\,k}"}</Tex>
        {reveal.coeffs && <Tex>{"\\text{row } 3:\\ 1,\\ 3,\\ 3,\\ 1 \\ \\text{are the coefficients}"}</Tex>}
        {reveal.exps && <Tex>{"(a+b)^3 = a^3 + 3a^2 b + 3a b^2 + b^3"}</Tex>}
      </div>
    );
  } else if (mode === "expand3") {
    dock = (
      <div className="formula-list">
        <Tex>{"(x+1)^3, \\quad a = x,\\ b = 1,\\ n = 3"}</Tex>
        {reveal.coeffs && <Tex>{"\\text{row } 3:\\ 1,\\ 3,\\ 3,\\ 1"}</Tex>}
        {reveal.terms && <Tex>{"= 1\\,x^3 + 3\\,x^2(1) + 3\\,x(1)^2 + 1\\,(1)^3"}</Tex>}
        {reveal.result && <Tex>{"= \\boxed{x^3 + 3x^2 + 3x + 1}"}</Tex>}
      </div>
    );
  } else if (mode === "term") {
    dock = (
      <div className="formula-list">
        <Tex>{"(a+b)^4 \\text{ uses row } 4"}</Tex>
        {reveal.coeffs && <Tex>{"\\text{row } 4:\\ 1,\\ 4,\\ 6,\\ 4,\\ 1"}</Tex>}
        {reveal.formula && <Tex>{"(a+b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4a b^3 + b^4"}</Tex>}
        {reveal.terms && <Tex>{"x^2 \\text{ term of } (x+2)^4:\\ \\binom{4}{2}\\, x^{2} (2)^{2}"}</Tex>}
        {reveal.result && <Tex>{"= 6 \\cdot 4 \\cdot x^2 = \\boxed{24x^2}"}</Tex>}
      </div>
    );
  } else if (mode === "yourturn") {
    const n = highlightRow ?? 2;
    const rowTex = TRIANGLE[n].join(",\\ ");
    dock = (
      <div className="formula-list">
        <Tex>{`n = ${n}`}</Tex>
        <Tex>{`\\text{row } ${n}:\\ ${rowTex}`}</Tex>
        <Tex>{`(a+b)^{${n}}:\\ \\text{number of terms} = ${n} + 1 = ${n + 1}`}</Tex>
      </div>
    );
  }

  const slot = (
    <svg
      className="figure"
      viewBox={`0 0 ${VB} ${VB}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
    >
      {showRows && <Triangle highlightRow={highlightRow} parents={parents} cnotation={cnotation} />}
    </svg>
  );

  return frame(slot, dock);
}
