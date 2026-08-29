import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import VectorPlane, { type VecArrow, type VectorSpec } from "../../components/VectorPlane";
import type { LessonFigureProps } from "../types";

/** World half-range of the plane (read by the eval harness for plot bounds). */
const HALF = 5.5;

/** A 2x2 matrix M = [[a, b], [c, d]]. */
type Mat = { a: number; b: number; c: number; d: number };

/**
 * The fixed example used on the first slide, where the columns are revealed one
 * at a time. First row (3, 2) differs from the first column (3, 1), so "columns,
 * not rows" reads cleanly. det = 3(2) - 2(1) = 4.
 */
const M1: Mat = { a: 3, b: 2, c: 1, d: 2 };

/** Trim a number for display: integers stay clean, otherwise one decimal, never -0. */
const trim = (n: number) => {
  const r = Number(n.toFixed(1));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};

/** Read the live matrix from the sliders, falling back to the identity. */
const readMat = (values: Record<string, number>): Mat => ({
  a: values.a ?? 1,
  b: values.b ?? 0,
  c: values.c ?? 0,
  d: values.d ?? 1,
});

export default function MtxTxStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "cols";
  const showDock = Boolean(reveal.dock);

  // Slide 1 uses the fixed example; the others read the four entry sliders.
  const m = mode === "cols" ? M1 : readMat(values);
  const det = m.a * m.d - m.b * m.c;
  const area = Math.abs(det);
  const flat = area < 0.05;

  // The columns are the images of the basis vectors.
  const col1 = { x: m.a, y: m.c }; // M applied to i-hat = (1, 0)
  const col2 = { x: m.b, y: m.d }; // M applied to j-hat = (0, 1)

  // Fill tone: primary when orientation is preserved, accent when it flips.
  const regionTone = det < 0 ? "var(--accent)" : "var(--primary)";

  const arrows: VecArrow[] = [];
  // Original basis vectors, dashed and muted, kept for reference throughout.
  if (reveal.basis) {
    arrows.push({ x2: 1, y2: 0, tone: "muted", dashed: true, width: 2.4, label: "\u00ee" });
    arrows.push({ x2: 0, y2: 1, tone: "muted", dashed: true, width: 2.4, label: "\u0135" });
  }
  // Image arrows (the columns), bold, in two tones and labelled.
  if (reveal.col1) arrows.push({ x2: col1.x, y2: col1.y, tone: "a", width: 4.4, label: "M\u00ee" });
  if (reveal.col2) arrows.push({ x2: col2.x, y2: col2.y, tone: "b", width: 4.4, label: "M\u0135" });

  const spec: VectorSpec = {
    aria:
      mode === "cols"
        ? `Matrix M with columns (3, 1) and (2, 2): the image of i-hat is (3, 1) and the image of j-hat is (2, 2).`
        : `Matrix M = [[${trim(m.a)}, ${trim(m.b)}], [${trim(m.c)}, ${trim(m.d)}]]. The image of i-hat is (${trim(col1.x)}, ${trim(col1.y)}), the image of j-hat is (${trim(col2.x)}, ${trim(col2.y)}), and the determinant is ${trim(det)}, so the unit square maps to a region of area ${trim(area)}.`,
    arrows,
    // The original unit square, a faint dashed outline for reference.
    underlay: reveal.basis
      ? (plane) => {
          const pts = [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ]
            .map(([x, y]) => `${plane.sx(x)},${plane.sy(y)}`)
            .join(" ");
          return <polygon points={pts} fill="none" stroke="var(--line)" strokeWidth={1.6} strokeDasharray="4 4" />;
        }
      : undefined,
    // The transformed unit square: a filled parallelogram of the two columns.
    overlay: reveal.para
      ? (plane) => {
          const verts: [number, number][] = [
            [0, 0],
            [m.a, m.c],
            [m.a + m.b, m.c + m.d],
            [m.b, m.d],
          ];
          const pts = verts.map(([x, y]) => `${plane.sx(x)},${plane.sy(y)}`).join(" ");
          return (
            <g>
              <polygon
                points={pts}
                fill={flat ? "none" : regionTone}
                fillOpacity={0.16}
                stroke={regionTone}
                strokeOpacity={0.75}
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              {!flat && <circle cx={plane.sx(m.a + m.b)} cy={plane.sy(m.c + m.d)} r={3.6} fill={regionTone} />}
            </g>
          );
        }
      : undefined,
  };

  const status = flat
    ? "\\det(M) = 0:\\ \\text{the square collapses, no inverse}"
    : det < 0
      ? "\\det(M) < 0:\\ \\text{orientation flips (a reflection)}"
      : "\\det(M) > 0:\\ \\text{orientation preserved}";

  const bmatrix = `\\begin{bmatrix} ${trim(m.a)} & ${trim(m.b)} \\\\ ${trim(m.c)} & ${trim(m.d)} \\end{bmatrix}`;

  let dock: ReactNode = null;
  if (mode === "cols") {
    dock = (
      <div className="formula-list">
        <Tex>{`M = ${bmatrix}`}</Tex>
        {reveal.col1 && (
          <Tex>{`M\\hat{\\imath} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\to (${trim(m.a)},\\ ${trim(m.c)})\\ \\text{(column 1)}`}</Tex>
        )}
        {reveal.col2 && (
          <Tex>{`M\\hat{\\jmath} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} \\to (${trim(m.b)},\\ ${trim(m.d)})\\ \\text{(column 2)}`}</Tex>
        )}
      </div>
    );
  } else {
    dock = (
      <div className="formula-list">
        <Tex>{`M = ${bmatrix}`}</Tex>
        <Tex>{`M\\hat{\\imath} = (${trim(col1.x)},\\ ${trim(col1.y)}), \\quad M\\hat{\\jmath} = (${trim(col2.x)},\\ ${trim(col2.y)})`}</Tex>
        <Tex>{`\\det(M) = ad - bc = (${trim(m.a)})(${trim(m.d)}) - (${trim(m.b)})(${trim(m.c)}) = ${trim(det)}`}</Tex>
        <Tex>{`\\text{area factor} = |\\det(M)| = ${trim(area)}`}</Tex>
        <Tex>{status}</Tex>
      </div>
    );
  }

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorPlane
            {...props}
            spec={spec}
            half={HALF}
            onDrag={
              mode === "try"
                ? (wx, wy) => {
                    // Dragging on the plane steers the image of i-hat (column 1).
                    props.setValue("a", () => Math.max(-3, Math.min(3, Math.round(wx))));
                    props.setValue("c", () => Math.max(-3, Math.min(3, Math.round(wy))));
                  }
                : undefined
            }
          />
        </div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}
