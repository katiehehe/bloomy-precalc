import { toRadians } from "../lib/trig";

/** One labeled terminal ray on the mini unit circle. */
export type CircleAngle = {
  deg: number;
  label?: string;
  /** Colour role: a, b, sum, or theta (default). */
  tone?: "a" | "b" | "sum" | "theta";
};

const SIZE = 128;
const C = SIZE / 2;
const R = 44;

const COLOR: Record<string, string> = {
  a: "var(--cosine)",
  b: "var(--teal)",
  sum: "var(--primary)",
  theta: "var(--primary)",
};

/** A single-radius arc from the positive x-axis to `deg`, counterclockwise. */
function arc(deg: number, r: number) {
  const a = toRadians(deg);
  const x = C + r * Math.cos(a);
  const y = C - r * Math.sin(a);
  const large = Math.abs(deg) > 180 ? 1 : 0;
  const sweep = deg >= 0 ? 0 : 1;
  return `M ${C + r} ${C} A ${r} ${r} 0 ${large} ${sweep} ${x.toFixed(3)} ${y.toFixed(3)}`;
}

/** An arc along radius `r` from `fromDeg` to `toDeg`, swept counterclockwise. */
function arcBetween(fromDeg: number, toDeg: number, r: number) {
  const a0 = toRadians(fromDeg);
  const a1 = toRadians(toDeg);
  const x0 = C + r * Math.cos(a0);
  const y0 = C - r * Math.sin(a0);
  const x1 = C + r * Math.cos(a1);
  const y1 = C - r * Math.sin(a1);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  const sweep = toDeg >= fromDeg ? 0 : 1;
  return `M ${x0.toFixed(3)} ${y0.toFixed(3)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(3)} ${y1.toFixed(3)}`;
}

/** Highlighted band of allowed angles (a principal-value range). */
export type ArcRange = { from: number; to: number; tone?: "a" | "b" | "sum" | "theta" };

/**
 * A compact unit circle that draws a few labeled terminal rays. The identity
 * lessons use it to show how the angles in a formula sit on the circle; it is a
 * support glyph, so it stays small and reads at a glance. An optional `arcRange`
 * shades a band of allowed angles, which the inverse-trig lessons use to picture
 * a principal-value range.
 */
export default function AngleCircle({
  angles,
  focus,
  arcRange,
}: {
  angles: CircleAngle[];
  focus?: number;
  arcRange?: ArcRange;
}) {
  return (
    <svg
      className="flow-gauge flow-gauge--circle figure-plot"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Unit circle showing angles ${angles.map((a) => a.label ?? `${Math.round(a.deg)} degrees`).join(", ")}`}
    >
      <line x1={C - R - 8} y1={C} x2={C + R + 8} y2={C} stroke="var(--line)" strokeWidth={1} />
      <line x1={C} y1={C - R - 8} x2={C} y2={C + R + 8} stroke="var(--line)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth={1.4} />

      {arcRange && (
        <path
          d={arcBetween(arcRange.from, arcRange.to, R)}
          fill="none"
          stroke={COLOR[arcRange.tone ?? "sum"]}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.35}
        />
      )}

      {focus != null && Math.abs(focus) > 0.6 && (
        <path d={arc(focus, 16)} fill="none" stroke="var(--primary)" strokeWidth={2.5} strokeLinecap="round" />
      )}

      {angles.map((ang) => {
        const a = toRadians(ang.deg);
        const x = C + R * Math.cos(a);
        const y = C - R * Math.sin(a);
        const lx = C + (R + 11) * Math.cos(a);
        const ly = C - (R + 11) * Math.sin(a);
        const color = COLOR[ang.tone ?? "theta"];
        return (
          <g key={`${ang.label ?? ""}-${ang.deg}`}>
            <line x1={C} y1={C} x2={x} y2={y} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
            <circle cx={x} cy={y} r={4} fill={color} />
            {ang.label && (
              <text x={lx} y={ly + 3} className="angle-glyph-label" textAnchor="middle" fill={color}>
                {ang.label}
              </text>
            )}
          </g>
        );
      })}

      <circle cx={C} cy={C} r={2.6} fill="var(--ink)" />
    </svg>
  );
}
