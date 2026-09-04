import FigureReadout from "../../components/FigureReadout";
import type { LessonFigureProps, Reveal } from "../types";

const W = 320;
const H = 196;
const PADL = 28;
const PADR = 12;
const PADT = 12;
const PADB = 26;
const XMIN = -Math.PI;
const XMAX = 3 * Math.PI;
const YMIN = -5.5;
const YMAX = 5.5;

const PI = Math.PI;
const sx = (x: number) => PADL + ((x - XMIN) / (XMAX - XMIN)) * (W - PADL - PADR);
const sy = (y: number) => H - PADB - ((y - YMIN) / (YMAX - YMIN)) * (H - PADB - PADT);

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const numStr = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

/**
 * KaTeX label for k*(pi/6), reduced (e.g. k=3 -> pi/2, k=6 -> pi). The input is
 * rounded first: C animates continuously between beats, and a non-integer k
 * would send the integer gcd into a float loop that prints a giant fraction.
 */
function piSixths(k: number): string {
  const kk = Math.round(k);
  if (kk === 0) return "0";
  const s = kk < 0 ? "-" : "";
  const a = Math.abs(kk);
  const g = gcd(a, 6);
  const p = a / g;
  const q = 6 / g;
  const num = p === 1 ? "\\pi" : `${p}\\pi`;
  return q === 1 ? `${s}${num}` : `${s}\\tfrac{${num}}{${q}}`;
}

/**
 * Plain-text (unicode) version of piSixths for SVG <text>, which cannot render
 * KaTeX. Draws e.g. "pi/2" instead of the raw "\tfrac{\pi}{2}" string.
 */
function piSixthsText(k: number): string {
  const kk = Math.round(k);
  if (kk === 0) return "0";
  const s = kk < 0 ? "-" : "";
  const a = Math.abs(kk);
  const g = gcd(a, 6);
  const p = a / g;
  const q = 6 / g;
  const num = p === 1 ? "\u03c0" : `${p}\u03c0`;
  return q === 1 ? `${s}${num}` : `${s}${num}/${q}`;
}

/** Build the standard-form equation string from the four live parameters. */
function formatSine(A: number, B: number, Ck: number, D: number): string {
  const xexpr = Ck === 0 ? "x" : `x ${Ck > 0 ? "-" : "+"} ${piSixths(Math.abs(Ck))}`;
  let inside: string;
  if (B === 1) inside = Ck === 0 ? "x" : `(${xexpr})`;
  else inside = Ck === 0 ? `${numStr(B)}x` : `${numStr(B)}(${xexpr})`;
  const sinExpr = inside === "x" ? "\\sin x" : `\\sin\\!\\big(${inside}\\big)`;
  const Apart = A === 1 ? "" : A === -1 ? "-" : numStr(A);
  const Dpart = D === 0 ? "" : ` ${D > 0 ? "+" : "-"} ${numStr(Math.abs(D))}`;
  return `y = ${Apart}${sinExpr}${Dpart}`;
}

const curvePath = (A: number, B: number, C: number, D: number): string => {
  let d = "";
  const N = 200;
  for (let i = 0; i <= N; i += 1) {
    const x = XMIN + ((XMAX - XMIN) * i) / N;
    const y = A * Math.sin(B * (x - C)) + D;
    d += `${i === 0 ? "M" : "L"}${sx(x).toFixed(2)} ${sy(y).toFixed(2)} `;
  }
  return d.trim();
};

const X_GRID = [-PI, -PI / 2, 0, PI / 2, PI, (3 * PI) / 2, 2 * PI, (5 * PI) / 2, 3 * PI];
const X_LABELS: { x: number; t: string }[] = [
  { x: -PI, t: "-\u03c0" },
  { x: 0, t: "0" },
  { x: PI, t: "\u03c0" },
  { x: 2 * PI, t: "2\u03c0" },
  { x: 3 * PI, t: "3\u03c0" },
];

type Marks = { amp?: boolean; mid?: boolean; period?: boolean; phase?: boolean };

function SineGraph({
  A,
  B,
  Ck,
  D,
  marks = {},
  showParent,
  target,
}: {
  A: number;
  B: number;
  Ck: number;
  D: number;
  marks?: Marks;
  showParent?: boolean;
  target?: { A: number; B: number; Ck: number; D: number };
}) {
  const C = (Ck * PI) / 6;
  const period = (2 * PI) / B;
  const xpeak = C + PI / (2 * B);
  return (
    <svg className="sine-graph figure-plot" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Graph of a sinusoid">
      {/* gridlines */}
      {X_GRID.map((x) => (
        <line key={`gx${x}`} x1={sx(x)} y1={PADT} x2={sx(x)} y2={H - PADB} stroke="var(--line)" strokeWidth={0.6} opacity={0.5} />
      ))}
      {[-4, -2, 2, 4].map((y) => (
        <line key={`gy${y}`} x1={PADL} y1={sy(y)} x2={W - PADR} y2={sy(y)} stroke="var(--line)" strokeWidth={0.6} opacity={0.5} />
      ))}
      {/* axes */}
      <line x1={PADL} y1={sy(0)} x2={W - PADR} y2={sy(0)} stroke="var(--ink)" strokeWidth={1.2} />
      <line x1={sx(0)} y1={PADT} x2={sx(0)} y2={H - PADB} stroke="var(--ink)" strokeWidth={1.2} />
      {X_LABELS.map(({ x, t }) => (
        <text key={`lx${x}`} x={sx(x)} y={H - PADB + 13} textAnchor="middle" className="tick-label">
          {t}
        </text>
      ))}
      {[-4, 4].map((y) => (
        <text key={`ly${y}`} x={PADL - 5} y={sy(y) + 3} textAnchor="end" className="tick-label">
          {y}
        </text>
      ))}

      {/* max / min guide lines for the amplitude slide */}
      {marks.amp && (
        <>
          <line x1={PADL} y1={sy(D + A)} x2={W - PADR} y2={sy(D + A)} stroke="var(--cosine)" strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
          <line x1={PADL} y1={sy(D - A)} x2={W - PADR} y2={sy(D - A)} stroke="var(--cosine)" strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
        </>
      )}

      {/* parent reference curve y = sin x */}
      {showParent && (
        <path d={curvePath(1, 1, 0, 0)} fill="none" stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="5 5" opacity={0.6} />
      )}
      {/* dashed target curve for the capstone */}
      {target && (
        <path d={curvePath(target.A, target.B, (target.Ck * PI) / 6, target.D)} fill="none" stroke="var(--cosine)" strokeWidth={2} strokeDasharray="6 5" opacity={0.85} />
      )}

      {/* live curve */}
      <path d={curvePath(A, B, C, D)} fill="none" stroke="var(--primary)" strokeWidth={2.8} strokeLinecap="round" />

      {/* midline */}
      {marks.mid && (
        <>
          <line x1={PADL} y1={sy(D)} x2={W - PADR} y2={sy(D)} stroke="var(--teal)" strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={W - PADR - 2} y={sy(D) - 5} textAnchor="end" className="graph-mark" fill="var(--teal)">{`y = ${numStr(D)}`}</text>
        </>
      )}

      {/* amplitude bracket at the first peak */}
      {marks.amp && (
        <>
          <line x1={sx(xpeak)} y1={sy(D)} x2={sx(xpeak)} y2={sy(D + A)} stroke="var(--cosine)" strokeWidth={2} />
          <line x1={sx(xpeak) - 4} y1={sy(D)} x2={sx(xpeak) + 4} y2={sy(D)} stroke="var(--cosine)" strokeWidth={2} />
          <line x1={sx(xpeak) - 4} y1={sy(D + A)} x2={sx(xpeak) + 4} y2={sy(D + A)} stroke="var(--cosine)" strokeWidth={2} />
          <text x={sx(xpeak) + 7} y={sy(D + A / 2) + 4} className="graph-mark" fill="var(--cosine)">{`A = ${numStr(A)}`}</text>
        </>
      )}

      {/* period bracket along the bottom */}
      {marks.period && (
        <>
          <line x1={sx(C)} y1={H - PADB - 5} x2={sx(C + period)} y2={H - PADB - 5} stroke="var(--muted)" strokeWidth={1.6} />
          <line x1={sx(C)} y1={H - PADB - 9} x2={sx(C)} y2={H - PADB - 1} stroke="var(--muted)" strokeWidth={1.6} />
          <line x1={sx(C + period)} y1={H - PADB - 9} x2={sx(C + period)} y2={H - PADB - 1} stroke="var(--muted)" strokeWidth={1.6} />
          <text x={sx(C + period / 2)} y={H - PADB - 9} textAnchor="middle" className="graph-mark" fill="var(--muted)">
            {`\u2190 ${numStr(period / PI)}\u03c0 \u2192`}
          </text>
        </>
      )}

      {/* phase-shift arrow along the x-axis */}
      {marks.phase && Ck !== 0 && (
        <>
          <line x1={sx(0)} y1={sy(0) + 12} x2={sx(C)} y2={sy(0) + 12} stroke="var(--teal)" strokeWidth={2} />
          <line x1={sx(C)} y1={sy(0) + 8} x2={sx(C)} y2={sy(0) + 16} stroke="var(--teal)" strokeWidth={2} />
          <text x={sx(C / 2)} y={sy(0) + 26} textAnchor="middle" className="graph-mark" fill="var(--teal)">
            {`C = ${piSixthsText(Ck)}`}
          </text>
        </>
      )}
    </svg>
  );
}

const TARGET = { A: 2, B: 2, Ck: 3, D: 1 };

export default function SinusoidStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "intro";

  const A = values.A ?? 1;
  const B = values.B ?? 1;
  const Ck = values.C ?? 0;
  const D = values.D ?? 0;

  if (mode === "intro") {
    return <IntroFigure reveal={reveal} />;
  }

  let marks: Marks = {};
  let showParent = true;
  let target: typeof TARGET | undefined;
  const lines: string[] = [];

  if (mode === "amp") {
    marks = { amp: true };
    lines.push(`\\text{max} = ${numStr(D + A)}, \\quad \\text{min} = ${numStr(D - A)}`);
  } else if (mode === "mid") {
    marks = { mid: true };
    lines.push(`\\text{center: } y = ${numStr(D)}`);
  } else if (mode === "period") {
    marks = { period: true };
    lines.push(`\\text{period} = \\dfrac{2\\pi}{${numStr(B)}} = ${numStr((2 / B))}\\pi`);
  } else if (mode === "phase") {
    marks = { phase: true };
    lines.push(Ck === 0 ? "\\text{no shift yet}" : `\\text{shifted right by } ${piSixths(Ck)}`);
  } else if (mode === "all") {
    marks = { amp: true, mid: true, period: true, phase: true };
    showParent = false;
    target = TARGET;
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <FigureReadout
            figure={<SineGraph A={A} B={B} Ck={Ck} D={D} marks={marks} showParent={showParent} target={target} />}
            heading={formatSine(A, B, Ck, D)}
            lines={lines}
            note={mode === "all" ? "target: y = 2 sin(2(x - \u03c0/2)) + 1" : undefined}
          />
        </div>
      </div>
    </section>
  );
}

function IntroFigure({ reveal }: { reveal: Reveal }) {
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <div className="figure-readout">
            <div className="figure-readout__heading">
              <span className="graph-caption">y = A sin(B(x - C)) + D</span>
            </div>
            <div className="figure-readout__fig">
              <svg className="sine-graph figure-plot" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="The parent sine curve with its amplitude, midline, and period labeled">
                {X_GRID.map((x) => (
                  <line key={`ix${x}`} x1={sx(x)} y1={PADT} x2={sx(x)} y2={H - PADB} stroke="var(--line)" strokeWidth={0.6} opacity={0.5} />
                ))}
                <line x1={PADL} y1={sy(0)} x2={W - PADR} y2={sy(0)} stroke="var(--ink)" strokeWidth={1.2} />
                <line x1={sx(0)} y1={PADT} x2={sx(0)} y2={H - PADB} stroke="var(--ink)" strokeWidth={1.2} />
                {X_LABELS.map(({ x, t }) => (
                  <text key={`ilx${x}`} x={sx(x)} y={H - PADB + 13} textAnchor="middle" className="tick-label">
                    {t}
                  </text>
                ))}
                {reveal.parent && <path d={curvePath(1, 1, 0, 0)} fill="none" stroke="var(--primary)" strokeWidth={2.8} strokeLinecap="round" />}
                {reveal.mid && (
                  <>
                    <line x1={PADL} y1={sy(0)} x2={W - PADR} y2={sy(0)} stroke="var(--teal)" strokeWidth={1.5} strokeDasharray="6 4" />
                    <text x={W - PADR - 2} y={sy(0) - 5} textAnchor="end" className="graph-mark" fill="var(--teal)">
                      midline
                    </text>
                  </>
                )}
                {reveal.amp && (
                  <>
                    <line x1={sx(PI / 2)} y1={sy(0)} x2={sx(PI / 2)} y2={sy(1)} stroke="var(--cosine)" strokeWidth={2} />
                    <line x1={sx(PI / 2) - 4} y1={sy(1)} x2={sx(PI / 2) + 4} y2={sy(1)} stroke="var(--cosine)" strokeWidth={2} />
                    <text x={sx(PI / 2) + 7} y={sy(0.5) + 3} className="graph-mark" fill="var(--cosine)">
                      amplitude
                    </text>
                  </>
                )}
                {reveal.per && (
                  <>
                    <line x1={sx(0)} y1={H - PADB - 5} x2={sx(2 * PI)} y2={H - PADB - 5} stroke="var(--muted)" strokeWidth={1.6} />
                    <line x1={sx(0)} y1={H - PADB - 9} x2={sx(0)} y2={H - PADB - 1} stroke="var(--muted)" strokeWidth={1.6} />
                    <line x1={sx(2 * PI)} y1={H - PADB - 9} x2={sx(2 * PI)} y2={H - PADB - 1} stroke="var(--muted)" strokeWidth={1.6} />
                    <text x={sx(PI)} y={H - PADB - 9} textAnchor="middle" className="graph-mark" fill="var(--muted)">
                      {"\u2190 one period = 2\u03c0 \u2192"}
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
