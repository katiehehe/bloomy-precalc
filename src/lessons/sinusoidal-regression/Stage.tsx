import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

const W = 262;
const H = 168;
const PADL = 24;
const PADR = 10;
const PADT = 12;
const PADB = 22;
const XMAX = 13.5;
const YMIN = 25;
const YMAX = 90;

/** Average monthly high temperature (deg F), month 1..12. Noisy on purpose. */
const DATA: { x: number; t: number }[] = [
  { x: 1, t: 36 }, { x: 2, t: 39 }, { x: 3, t: 46 }, { x: 4, t: 61 },
  { x: 5, t: 73 }, { x: 6, t: 82 }, { x: 7, t: 84 }, { x: 8, t: 80 },
  { x: 9, t: 74 }, { x: 10, t: 59 }, { x: 11, t: 48 }, { x: 12, t: 37 },
];

const sx = (x: number) => PADL + (x / XMAX) * (W - PADL - PADR);
const sy = (y: number) => H - PADB - ((y - YMIN) / (YMAX - YMIN)) * (H - PADB - PADT);
const model = (x: number, d: number) => 25 * Math.sin((Math.PI / 6) * (x - 4)) + d;

type Show = { curve?: boolean; mid?: boolean; amp?: boolean; period?: boolean };

function SineFit({ d, show }: { d: number; show: Show }) {
  let curve = "";
  for (let i = 0; i <= 130; i += 1) {
    const x = 0.5 + (XMAX - 0.5) * (i / 130);
    curve += `${i === 0 ? "M" : "L"}${sx(x).toFixed(2)} ${sy(model(x, d)).toFixed(2)} `;
  }
  const peakY = sy(model(7, d));
  const midY = sy(d);
  return (
    <svg className="flow-gauge flow-gauge--wide figure-plot" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Monthly temperatures with a fitted sine curve">
      <line x1={PADL} y1={H - PADB} x2={W - PADR} y2={H - PADB} stroke="var(--line)" strokeWidth={1} />
      <line x1={PADL} y1={PADT} x2={PADL} y2={H - PADB} stroke="var(--line)" strokeWidth={1} />
      {[40, 60, 80].map((y) => (
        <g key={y}>
          <line x1={PADL - 3} y1={sy(y)} x2={PADL} y2={sy(y)} stroke="var(--line)" strokeWidth={1} />
          <text x={PADL - 5} y={sy(y) + 3} textAnchor="end" className="tick-label">{y}</text>
        </g>
      ))}
      {[1, 4, 7, 10].map((x) => (
        <text key={x} x={sx(x)} y={H - PADB + 12} textAnchor="middle" className="tick-label">{x}</text>
      ))}
      {show.mid && (
        <>
          <line x1={PADL} y1={midY} x2={W - PADR} y2={midY} stroke="var(--teal)" strokeWidth={1.4} strokeDasharray="5 4" />
          <text x={W - PADR} y={midY - 4} textAnchor="end" className="angle-glyph-label" fill="var(--teal)">{`D = ${Math.round(d)}`}</text>
        </>
      )}
      {show.amp && (
        <>
          <line x1={sx(7)} y1={midY} x2={sx(7)} y2={peakY} stroke="var(--cosine)" strokeWidth={1.6} />
          <text x={sx(7) + 5} y={(midY + peakY) / 2 + 3} className="angle-glyph-label" fill="var(--cosine)">A = 25</text>
        </>
      )}
      {show.period && (
        <>
          <line x1={sx(1)} y1={H - PADB - 4} x2={sx(13)} y2={H - PADB - 4} stroke="var(--muted)" strokeWidth={1.2} />
          <text x={sx(7)} y={H - PADB - 7} textAnchor="middle" className="angle-glyph-label" fill="var(--muted)">period = 12</text>
        </>
      )}
      {show.curve && <path d={curve.trim()} fill="none" stroke="var(--primary)" strokeWidth={2.6} strokeLinecap="round" />}
      {DATA.map((p) => (
        <circle key={p.x} cx={sx(p.x)} cy={sy(p.t)} r={3.4} fill="var(--ink)" />
      ))}
    </svg>
  );
}

const READ: FlowStep[] = [
  { id: "p0", tex: "y = A\\sin\\!\\big(B(x - C)\\big) + D" },
  { id: "p1", show: "s1", op: "\\text{read the peak and valley}", tex: "\\max = 85, \\quad \\min = 35" },
  { id: "p2", show: "s2", op: "\\text{amplitude} = \\tfrac{\\max - \\min}{2}", tex: "A = \\dfrac{85 - 35}{2} = 25" },
  { id: "p3", show: "s3", tone: "good", result: true, op: "\\text{midline} = \\tfrac{\\max + \\min}{2}", tex: "D = \\dfrac{85 + 35}{2} = 60" },
];

const FIT: FlowStep[] = [
  { id: "q0", tex: "\\text{one full cycle} = 12 \\text{ months}" },
  { id: "q1", show: "s1", op: "B = \\dfrac{2\\pi}{\\text{period}}", tex: "B = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}" },
  { id: "q2", show: "s2", op: "\\text{the peak sits at } x = 7", tex: "\\text{peak when } B(x - C) = \\tfrac{\\pi}{2}" },
  { id: "q3", show: "s3", op: "\\tfrac{\\pi}{6}(7 - C) = \\tfrac{\\pi}{2}", tex: "7 - C = 3" },
  { id: "q4", show: "s4", tone: "good", result: true, op: "\\text{so } C = 4", tex: "y = 25\\sin\\!\\big(\\tfrac{\\pi}{6}(x - 4)\\big) + 60" },
];

function matchSteps(d: number): FlowStep[] {
  return [
    { id: "r0", tex: "D = \\dfrac{\\max + \\min}{2}" },
    { id: "r1", show: "s1", op: "\\text{read max and min}", tex: "D = \\dfrac{85 + 35}{2}" },
    {
      id: "r2",
      show: "s2",
      tone: d === 60 ? "good" : "primary",
      result: true,
      op: `\\text{your midline: } D = ${d}`,
      tex: d === 60 ? "D = 60 \\ \\checkmark" : `D = ${d}`,
    },
  ];
}

export default function SinRegressionStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "read";

  if (mode === "fit") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={FIT} reveal={reveal} heading={"\\text{period fixes } B, \\text{ the peak fixes } C"} header={<SineFit d={60} show={{ curve: true, period: Boolean(reveal.period) }} />} />
          </div>
        </div>
      </section>
    );
  }

  if (mode === "match") {
    const d = Math.round(values.d ?? 50);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={matchSteps(d)} reveal={reveal} heading={"\\text{slide the midline onto the data}"} header={<SineFit d={d} show={{ curve: true, mid: true }} />} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={READ} reveal={reveal} heading={"\\text{four numbers describe any sinusoid}"} header={<SineFit d={60} show={{ mid: Boolean(reveal.mid), amp: Boolean(reveal.amp), curve: Boolean(reveal.curve) }} />} />
        </div>
      </div>
    </section>
  );
}
