import Tex from "./Tex";

/** One factor of the expression: its printed form and its value at a test x. */
export type SignFactor = { tex: string; at: (x: number) => number };

const EPS = 1e-9;
const glyph = (s: number) => (s > 0 ? "+" : s < 0 ? "\u2212" : "0");
const cls = (s: number) => (s > 0 ? "sign-pos" : s < 0 ? "sign-neg" : "sign-zero");
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

/**
 * The pencil-and-paper sign chart: one column per factor, one row per interval
 * between the critical points, each cell holding that factor's sign on that
 * interval, and a final column for the product. The row containing the current
 * tracer x is highlighted so the learner can copy exactly what they see.
 */
export default function SignTable({
  factors,
  boundaries,
  x,
  productTex,
}: {
  factors: SignFactor[];
  boundaries: number[];
  x: number;
  productTex: string;
}) {
  const sorted = [...boundaries].sort((a, b) => a - b);
  const edges = [-Infinity, ...sorted, Infinity];

  const rows = edges.slice(0, -1).map((a, i) => {
    const b = edges[i + 1];
    const rep = a === -Infinity ? b - 1 : b === Infinity ? a + 1 : (a + b) / 2;
    const signs = factors.map((f) => Math.sign(f.at(rep)));
    const prod = signs.reduce((acc, s) => acc * (s === 0 ? 1 : s), 1);
    const label =
      a === -Infinity ? `x<${fmt(b)}` : b === Infinity ? `x>${fmt(a)}` : `${fmt(a)}<x<${fmt(b)}`;
    const current = x > a && x < b;
    return { label, signs, prod, current };
  });

  return (
    <div className="sign-table-wrap">
      <table className="sign-table">
        <thead>
          <tr>
            <th className="sign-table__region">region</th>
            {factors.map((f) => (
              <th key={f.tex}>
                <Tex>{f.tex}</Tex>
              </th>
            ))}
            <th>
              <Tex>{productTex}</Tex>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={row.current ? "is-current" : ""}>
              <td className="sign-table__region">
                <Tex>{row.label}</Tex>
              </td>
              {row.signs.map((s, j) => (
                <td key={j}>
                  <span className={cls(s)}>{glyph(s)}</span>
                </td>
              ))}
              <td>
                <span className={cls(row.prod)}>{glyph(row.prod)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
