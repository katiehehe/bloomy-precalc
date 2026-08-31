import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Matrix multiplication drawn either as the ordinary left-to-right product
 * (A x B = C) or as the "backwards L" frame many people use by hand: the left
 * factor A sits at the lower left, the right factor B lifts up to the upper
 * right, and the product C fills their intersection at the lower right. In the L,
 * C shares its rows with A (same horizontal band) and its columns with B (same
 * vertical band), so the entry C[i][j] sits exactly where A's row i and B's
 * column j cross. The lesson tweens `layout` from "linear" to "L" so learners
 * see the ordinary setup fold into the aligned method.
 *
 *      B (top right)
 * A    C (intersection)
 */

export type MFTone = "a" | "b" | "prod";
const TONE: Record<MFTone, string> = {
  a: "var(--cosine)",
  b: "var(--teal)",
  prod: "var(--primary)",
};

export type MatMulSpec = {
  aria: string;
  /** Left factor (m x k). */
  A: (string | number)[][];
  /** Right factor (k x n). */
  B: (string | number)[][];
  /** Product (m x n); use "" for a not-yet-revealed entry. */
  C: (string | number)[][];
  aLabel?: string;
  bLabel?: string;
  cLabel?: string;
  /** The entry of C currently being formed: highlights A's row i and B's col j. */
  active?: [number, number] | null;
  caption?: string;
  captionTone?: MFTone;
  /** "linear" draws A x B = C in a row; "L" folds B up into the aligned frame. */
  layout?: "linear" | "L";
};

const CW = 46;
const CH = 42;
const HGAP = 74; // horizontal gap between A and the C/B column (L layout)
const VGAP = 52; // vertical gap between B and the A/C row (L layout)
const OP = 46; // operator column width (linear layout)
const VBW = 470;
const VBH = 320;

function Brackets({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const s = 7;
  return (
    <g fill="none" stroke="var(--ink)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x + s} ${y} L${x} ${y} L${x} ${y + h} L${x + s} ${y + h}`} />
      <path d={`M${x + w - s} ${y} L${x + w} ${y} L${x + w} ${y + h} L${x + w - s} ${y + h}`} />
    </g>
  );
}

function cellNode(v: string | number, cx: number, cy: number, key: string) {
  const s = v === "" || v == null ? null : String(v);
  return s == null ? (
    <circle key={key} cx={cx} cy={cy} r={2.6} fill="var(--muted)" opacity={0.5} />
  ) : (
    <text key={key} x={cx} y={cy + 6} textAnchor="middle" fill="var(--ink)" style={{ fontSize: 18, fontWeight: 650 }}>
      {s}
    </text>
  );
}

/** One matrix block rendered at its local origin (top-left of the cell grid = 0,0). */
function BlockContent({ rows, label, keyBase }: { rows: (string | number)[][]; label?: string; keyBase: string }) {
  const R = rows.length;
  const Cn = rows[0]?.length ?? 0;
  const cells: ReactNode[] = [];
  rows.forEach((row, r) =>
    row.forEach((v, c) => cells.push(cellNode(v, c * CW + CW / 2, r * CH + CH / 2, `${keyBase}-${r}-${c}`))),
  );
  return (
    <>
      {cells}
      <Brackets x={-6} y={-4} w={Cn * CW + 12} h={R * CH + 8} />
      {label && (
        <text x={(Cn * CW) / 2} y={-12} textAnchor="middle" fill="var(--muted)" style={{ fontSize: 14, fontWeight: 700 }}>
          {label}
        </text>
      )}
    </>
  );
}

export default function MatMulFrame({ spec }: { spec: MatMulSpec }) {
  const reduce = useReducedMotion();
  const m = spec.A.length;
  const k = spec.A[0]?.length ?? 0;
  const n = spec.B[0]?.length ?? 0;
  const layout = spec.layout ?? "L";
  // Bands and the active-cell tint belong only to the aligned L view.
  const active = layout === "L" ? spec.active ?? null : null;

  // L layout: A lower-left, B upper-right, C at their lower-right intersection.
  const totalW = k * CW + HGAP + n * CW;
  const totalH = k * CH + VGAP + m * CH;
  const left = (VBW - totalW) / 2;
  const top = (VBH - totalH) / 2 + 4;
  const L = {
    A: { x: left, y: top + k * CH + VGAP },
    B: { x: left + k * CW + HGAP, y: top },
    C: { x: left + k * CW + HGAP, y: top + k * CH + VGAP },
  };

  // Linear layout: A x B = C in one centered row.
  const linW = k * CW + OP + n * CW + OP + n * CW;
  const linLeft = (VBW - linW) / 2;
  const linBx = linLeft + k * CW + OP;
  const linCx = linBx + n * CW + OP;
  const LIN = {
    A: { x: linLeft, y: (VBH - m * CH) / 2 },
    B: { x: linBx, y: (VBH - k * CH) / 2 },
    C: { x: linCx, y: (VBH - m * CH) / 2 },
  };
  const op1x = linLeft + k * CW + OP / 2;
  const op2x = linBx + n * CW + OP / 2;
  const opY = VBH / 2 + 7;

  const pos = layout === "L" ? L : LIN;
  const tw = { duration: reduce ? 0 : 0.6, ease: "easeInOut" as const };

  // Highlight bands stop exactly at the active entry, so the L meets there and the
  // tint never spills into the next row or column of the product.
  const band = active
    ? {
        rowX: L.A.x - 6,
        rowY: L.A.y + active[0] * CH,
        rowW: L.C.x + (active[1] + 1) * CW - (L.A.x - 6),
        colX: L.B.x + active[1] * CW,
        colY: L.B.y - 4,
        colH: L.C.y + (active[0] + 1) * CH - (L.B.y - 4),
        cellX: L.C.x + active[1] * CW,
        cellY: L.C.y + active[0] * CH,
      }
    : null;

  return (
    <svg className="figure" viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={spec.aria}>
      {band && (
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.12 }}
        >
          <rect x={band.rowX} y={band.rowY} width={band.rowW} height={CH} rx={8} fill={TONE.a} opacity={0.16} />
          <rect x={band.colX} y={band.colY} width={CW} height={band.colH} rx={8} fill={TONE.b} opacity={0.16} />
          <rect x={band.cellX} y={band.cellY} width={CW} height={CH} rx={8} fill={TONE.prod} opacity={0.28} />
        </motion.g>
      )}

      {/* Operators live only in the linear setup and fade out as it folds into the L. */}
      <motion.text
        x={op1x}
        y={opY}
        textAnchor="middle"
        fill="var(--muted)"
        style={{ fontSize: 22, fontWeight: 600 }}
        initial={false}
        animate={{ opacity: layout === "linear" ? 1 : 0 }}
        transition={tw}
      >
        {"\u00d7"}
      </motion.text>
      <motion.text
        x={op2x}
        y={opY}
        textAnchor="middle"
        fill="var(--muted)"
        style={{ fontSize: 22, fontWeight: 600 }}
        initial={false}
        animate={{ opacity: layout === "linear" ? 1 : 0 }}
        transition={tw}
      >
        {"="}
      </motion.text>

      <motion.g initial={false} animate={{ x: pos.B.x, y: pos.B.y }} transition={tw}>
        <BlockContent rows={spec.B} label={spec.bLabel} keyBase="B" />
      </motion.g>
      <motion.g initial={false} animate={{ x: pos.A.x, y: pos.A.y }} transition={tw}>
        <BlockContent rows={spec.A} label={spec.aLabel} keyBase="A" />
      </motion.g>
      <motion.g initial={false} animate={{ x: pos.C.x, y: pos.C.y }} transition={tw}>
        <BlockContent rows={spec.C} label={spec.cLabel} keyBase="C" />
      </motion.g>

      {spec.caption && (
        <text x={VBW / 2} y={VBH - 12} textAnchor="middle" fill={TONE[spec.captionTone ?? "prod"]} style={{ fontSize: 16, fontWeight: 600 }}>
          {spec.caption}
        </text>
      )}
    </svg>
  );
}
