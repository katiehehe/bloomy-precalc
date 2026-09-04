import { type ReactNode } from "react";

/**
 * A shared, pencil-mimic matrix figure. It lays out a left-to-right row of
 * matrices and operators (A + B = C, kA, A x B, det bars, an augmented system)
 * as crisp SVG, and can highlight a whole row, a whole column, individual cells,
 * or a diagonal. The lesson Stage computes everything from `values`/`reveal` and
 * passes a MatrixSpec in, exactly like ComplexPlane and VectorPlane. Cells are
 * plain SVG text (integers and short signed strings); precise symbolic work
 * (fractions, cofactor expansion) belongs in the dock or an AlgebraFlow beside it.
 *
 * Being an <svg> in the figure-slot, it also satisfies the smoke harness, which
 * expects every lesson figure to render an <svg>.
 */

export type Brace = "bracket" | "paren" | "bar" | "none";
export type HiTone = "a" | "b" | "prod" | "diag" | "anti" | "accent" | "muted";

const TONE: Record<HiTone, string> = {
  a: "var(--cosine)",
  b: "var(--teal)",
  prod: "var(--primary)",
  diag: "var(--primary)",
  anti: "var(--accent)",
  accent: "var(--accent)",
  muted: "var(--muted)",
};

export type CellHi = { r: number; c: number; tone?: HiTone };

export type MatrixToken = {
  kind?: "matrix";
  /** Rows of cell contents. Use "" for a not-yet-revealed cell (drawn as a dot). */
  rows: (string | number)[][];
  brace?: Brace;
  /** Plain-text label centred above the matrix (e.g. "A", "AB", "det A"). */
  label?: string;
  /** Highlight an entire row / column (0-based). */
  hiRow?: number;
  hiCol?: number;
  rowTone?: HiTone;
  colTone?: HiTone;
  /** Highlight individual cells. */
  hiCells?: CellHi[];
  /** Highlight the main diagonal (tone "diag") and/or anti-diagonal (tone "anti"). */
  diag?: boolean;
  anti?: boolean;
  /** Draw the whole matrix faded (a ghost or target). */
  dim?: boolean;
};

export type OpToken = { kind: "op"; text: string; tone?: HiTone };

export type MatrixSpec = {
  aria: string;
  tokens: (MatrixToken | OpToken)[];
  /** A plain-text caption line under the row (e.g. the active dot product). */
  caption?: string;
  captionTone?: HiTone;
  /**
   * Optional floor for the SVG viewBox (user units). The box is otherwise the
   * token row plus a reserved caption band, floored to a compact 196×166 so a
   * lone 2x2 stays the mtx-det "A" size instead of filling the slot. Caption
   * presence and length never change the box.
   */
  minBox?: { w: number; h: number };
};

/** Compact 2x2 floor: later mtx-det "A" slide (captioned ad − bc). */
const COMPACT_BOX = { w: 196, h: 166 };

const CELL_W = 46;
const CELL_H = 40;
const PAD = 12; // space each side of a matrix for its bracket
const OP_W = 40;
const GAP = 8;
const LABEL_H = 24;
const CAPTION_H = 30;

const isOp = (t: MatrixToken | OpToken): t is OpToken => t.kind === "op";

function tokenSize(t: MatrixToken | OpToken) {
  if (isOp(t)) return { w: OP_W, h: CELL_H };
  const rows = t.rows.length;
  const cols = t.rows[0]?.length ?? 0;
  return { w: cols * CELL_W + 2 * PAD, h: rows * CELL_H };
}

/** Left/right bracket, paren, or vertical bars around a matrix box. */
function Braces({ x, y, w, h, brace, color }: { x: number; y: number; w: number; h: number; brace: Brace; color: string }) {
  if (brace === "none") return null;
  const lx = x + 5;
  const rx = x + w - 5;
  const serif = 7;
  const sw = 2.2;
  if (brace === "bar") {
    return (
      <g stroke={color} strokeWidth={sw} strokeLinecap="round">
        <line x1={lx} y1={y} x2={lx} y2={y + h} />
        <line x1={rx} y1={y} x2={rx} y2={y + h} />
      </g>
    );
  }
  if (brace === "paren") {
    return (
      <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
        <path d={`M${lx + serif} ${y} Q${lx - serif * 0.4} ${y + h / 2} ${lx + serif} ${y + h}`} />
        <path d={`M${rx - serif} ${y} Q${rx + serif * 0.4} ${y + h / 2} ${rx - serif} ${y + h}`} />
      </g>
    );
  }
  return (
    <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${lx + serif} ${y} L${lx} ${y} L${lx} ${y + h} L${lx + serif} ${y + h}`} />
      <path d={`M${rx - serif} ${y} L${rx} ${y} L${rx} ${y + h} L${rx - serif} ${y + h}`} />
    </g>
  );
}

function MatrixBox({ t, x, midY }: { t: MatrixToken; x: number; midY: number }) {
  const rows = t.rows.length;
  const cols = t.rows[0]?.length ?? 0;
  const top = midY - (rows * CELL_H) / 2;
  const gridX = x + PAD;
  const cells: ReactNode[] = [];
  const hi: ReactNode[] = [];

  const cellX = (c: number) => gridX + c * CELL_W;
  const cellY = (r: number) => top + r * CELL_H;

  if (t.hiRow != null) {
    hi.push(
      <rect key="hr" x={gridX} y={cellY(t.hiRow)} width={cols * CELL_W} height={CELL_H} rx={6} fill={TONE[t.rowTone ?? "a"]} opacity={0.16} />,
    );
  }
  if (t.hiCol != null) {
    hi.push(
      <rect key="hc" x={cellX(t.hiCol)} y={top} width={CELL_W} height={rows * CELL_H} rx={6} fill={TONE[t.colTone ?? "b"]} opacity={0.16} />,
    );
  }
  if (t.diag) {
    for (let i = 0; i < Math.min(rows, cols); i += 1)
      hi.push(<rect key={`d${i}`} x={cellX(i)} y={cellY(i)} width={CELL_W} height={CELL_H} rx={6} fill={TONE.diag} opacity={0.16} />);
  }
  if (t.anti) {
    for (let i = 0; i < Math.min(rows, cols); i += 1)
      hi.push(<rect key={`ad${i}`} x={cellX(cols - 1 - i)} y={cellY(i)} width={CELL_W} height={CELL_H} rx={6} fill={TONE.anti} opacity={0.16} />);
  }
  for (const cell of t.hiCells ?? []) {
    hi.push(
      <rect
        key={`hcell${cell.r}-${cell.c}`}
        x={cellX(cell.c)}
        y={cellY(cell.r)}
        width={CELL_W}
        height={CELL_H}
        rx={6}
        fill={TONE[cell.tone ?? "prod"]}
        opacity={0.22}
      />,
    );
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const raw = t.rows[r][c];
      const val = raw === "" || raw == null ? null : String(raw);
      cells.push(
        val == null ? (
          <circle key={`c${r}-${c}`} cx={cellX(c) + CELL_W / 2} cy={cellY(r) + CELL_H / 2} r={2.6} fill="var(--muted)" opacity={0.5} />
        ) : (
          <text
            key={`c${r}-${c}`}
            x={cellX(c) + CELL_W / 2}
            y={cellY(r) + CELL_H / 2 + 5}
            textAnchor="middle"
            fill="var(--ink)"
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            {val}
          </text>
        ),
      );
    }
  }

  const w = cols * CELL_W + 2 * PAD;
  return (
    <g opacity={t.dim ? 0.4 : 1}>
      {hi}
      {cells}
      <Braces x={x} y={top} w={w} h={rows * CELL_H} brace={t.brace ?? "bracket"} color="var(--ink)" />
      {t.label && (
        <text x={x + w / 2} y={top - 8} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 14, fontWeight: 700 }}>
          {t.label}
        </text>
      )}
    </g>
  );
}

const PADDING = 16;

/** Keep a long caption on one line inside the reserved band without widening the viewBox. */
function captionFontSize(caption: string, vbW: number) {
  const maxW = Math.max(1, vbW - PADDING * 2);
  const estimated = caption.length * 8.6;
  if (estimated <= maxW) return 16;
  return Math.max(7, (16 * maxW) / estimated);
}

export default function MatrixGrid({ spec }: { spec: MatrixSpec }) {
  const sizes = spec.tokens.map(tokenSize);
  const contentW = sizes.reduce((s, z) => s + z.w, 0) + GAP * (spec.tokens.length - 1);
  const maxH = Math.max(CELL_H, ...sizes.map((z) => z.h));
  const midY = PADDING + LABEL_H + maxH / 2;

  // ViewBox is a function of the tokens (and an optional floor) only. Caption
  // height is always reserved, and caption text never sets the width, so
  // revealing "ad − bc = …" cannot rescale the tiles or recenter the matrix.
  const naturalW = contentW + PADDING * 2;
  const naturalH = PADDING + LABEL_H + maxH + CAPTION_H + PADDING;
  const vbW = Math.max(naturalW, spec.minBox?.w ?? COMPACT_BOX.w);
  const vbH = Math.max(naturalH, spec.minBox?.h ?? COMPACT_BOX.h);

  // Centre the row of tokens horizontally within the viewBox.
  let x = (vbW - contentW) / 2;
  const parts: ReactNode[] = [];
  spec.tokens.forEach((t, i) => {
    const { w } = sizes[i];
    if (isOp(t)) {
      parts.push(
        <text key={`op${i}`} x={x + w / 2} y={midY + 7} textAnchor="middle" fill={TONE[t.tone ?? "muted"]} style={{ fontSize: 22, fontWeight: 600 }}>
          {t.text}
        </text>,
      );
    } else {
      parts.push(<MatrixBox key={`m${i}`} t={t} x={x} midY={midY} />);
    }
    x += w + GAP;
  });

  return (
    <svg className="figure" viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={spec.aria}>
      {parts}
      {spec.caption && (
        <text
          x={vbW / 2}
          y={PADDING + LABEL_H + maxH + 22}
          textAnchor="middle"
          fill={TONE[spec.captionTone ?? "prod"]}
          style={{ fontSize: captionFontSize(spec.caption, vbW), fontWeight: 600 }}
        >
          {spec.caption}
        </text>
      )}
    </svg>
  );
}
