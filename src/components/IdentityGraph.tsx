const W = 168;
const H = 120;
const PAD = 10;

type Fn = (x: number) => number;

/**
 * A small graph that overlays two expressions. When an identity holds, the two
 * traces sit exactly on top of each other, so the dashed second curve rides the
 * solid first one: visual proof that the two sides are the same function.
 */
export default function IdentityGraph({
  f,
  g,
  xmin = -Math.PI,
  xmax = Math.PI,
  clip = 3,
  mark,
}: {
  f: Fn;
  g: Fn;
  xmin?: number;
  xmax?: number;
  clip?: number;
  /** Optional x (in radians) to trace: draws a vertical guide plus a dot on each curve. */
  mark?: number;
}) {
  const sx = (x: number) => PAD + ((x - xmin) / (xmax - xmin)) * (W - 2 * PAD);
  const sy = (y: number) => H / 2 - (y / clip) * (H / 2 - PAD);
  const xs: number[] = [];
  const n = 240;
  for (let i = 0; i <= n; i += 1) xs.push(xmin + ((xmax - xmin) * i) / n);

  const pathFor = (fn: Fn) => {
    let d = "";
    let pen = false;
    let prev: number | null = null;
    for (const x of xs) {
      const y = fn(x);
      if (!Number.isFinite(y) || Math.abs(y) > clip) {
        pen = false;
        prev = null;
        continue;
      }
      if (pen && prev != null && Math.abs(y - prev) > 1.4) pen = false;
      d += `${pen ? "L" : "M"}${sx(x).toFixed(2)} ${sy(y).toFixed(2)} `;
      pen = true;
      prev = y;
    }
    return d.trim();
  };

  const hasMark = mark != null && Number.isFinite(mark) && mark >= xmin && mark <= xmax;
  const markF = hasMark ? f(mark as number) : NaN;
  const markG = hasMark ? g(mark as number) : NaN;
  const fInRange = Number.isFinite(markF) && Math.abs(markF) <= clip;
  const gInRange = Number.isFinite(markG) && Math.abs(markG) <= clip;

  return (
    <svg className="flow-gauge flow-gauge--wide figure-plot" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Both sides of the identity graphed on top of each other.">
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="var(--line)" strokeWidth={1} />
      {xmin < 0 && xmax > 0 && <line x1={sx(0)} y1={PAD} x2={sx(0)} y2={H - PAD} stroke="var(--line)" strokeWidth={1} />}
      <path d={pathFor(f)} fill="none" stroke="var(--primary)" strokeWidth={3.4} strokeLinecap="round" />
      <path d={pathFor(g)} fill="none" stroke="var(--teal)" strokeWidth={2} strokeDasharray="2 5" strokeLinecap="round" />
      {hasMark && (
        <line x1={sx(mark as number)} y1={PAD} x2={sx(mark as number)} y2={H - PAD} stroke="var(--accent, #b06a00)" strokeWidth={1} strokeDasharray="3 3" />
      )}
      {hasMark && fInRange && <circle cx={sx(mark as number)} cy={sy(markF)} r={4.5} fill="var(--primary)" />}
      {hasMark && gInRange && <circle cx={sx(mark as number)} cy={sy(markG)} r={2.4} fill="var(--teal)" />}
    </svg>
  );
}
