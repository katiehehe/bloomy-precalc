import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIZE = 140;
const C = SIZE / 2;
const R = 48;

/** Wedge from the positive x-axis to `deg`, counterclockwise, for arc length. */
function wedge(deg: number, r: number) {
  const a = toRadians(deg);
  const x = C + r * Math.cos(a);
  const y = C - r * Math.sin(a);
  const large = deg > 180 ? 1 : 0;
  return `M ${C} ${C} L ${C + r} ${C} A ${r} ${r} 0 ${large} 0 ${x.toFixed(2)} ${y.toFixed(2)} Z`;
}

/**
 * A spinning wheel: a radius out to a rim point, optionally the swept arc (for
 * arc length) and a tangent velocity arrow whose length tracks the linear speed.
 */
function SpinGauge({ angle, arc, speed }: { angle: number; arc?: boolean; speed?: number }) {
  const a = toRadians(angle);
  const px = C + R * Math.cos(a);
  const py = C - R * Math.sin(a);
  const len = speed != null ? Math.max(0, Math.min(1, speed)) * 34 : 0;
  const dirX = -Math.sin(a);
  const dirY = -Math.cos(a);
  const tipX = px + dirX * len;
  const tipY = py + dirY * len;
  const perpX = -dirY;
  const perpY = dirX;
  const barb = 5;

  return (
    <svg className="flow-gauge flow-gauge--wide" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Wheel with the rim point at ${Math.round(angle)} degrees`}>
      <line x1={C - R - 8} y1={C} x2={C + R + 8} y2={C} stroke="var(--line)" strokeWidth={1} />
      <line x1={C} y1={C - R - 8} x2={C} y2={C + R + 8} stroke="var(--line)" strokeWidth={1} />
      {arc && angle > 0.6 && <path d={wedge(angle, R)} fill="color-mix(in oklch, var(--primary) 14%, transparent)" stroke="none" />}
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth={1.6} />
      {arc && angle > 0.6 && (
        <path
          d={`M ${C + R} ${C} A ${R} ${R} 0 ${angle > 180 ? 1 : 0} 0 ${px.toFixed(2)} ${py.toFixed(2)}`}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={4}
          strokeLinecap="round"
        />
      )}
      <line x1={C} y1={C} x2={px} y2={py} stroke="var(--cosine)" strokeWidth={2.4} strokeLinecap="round" />
      <text x={C + (R / 2) * Math.cos(a) - 6} y={C - (R / 2) * Math.sin(a) - 4} className="angle-glyph-label" fill="var(--cosine)">
        r
      </text>
      {len > 1 && (
        <g stroke="var(--teal)" strokeWidth={2.4} strokeLinecap="round" fill="none">
          <line x1={px} y1={py} x2={tipX} y2={tipY} />
          <line x1={tipX} y1={tipY} x2={tipX - dirX * barb + perpX * barb} y2={tipY - dirY * barb + perpY * barb} />
          <line x1={tipX} y1={tipY} x2={tipX - dirX * barb - perpX * barb} y2={tipY - dirY * barb - perpY * barb} />
        </g>
      )}
      <circle cx={px} cy={py} r={4.5} fill="var(--teal)" />
      <circle cx={C} cy={C} r={2.6} fill="var(--ink)" />
    </svg>
  );
}

const ARC: FlowStep[] = [
  { id: "a0", tex: "s = r\\theta \\quad (\\theta \\text{ in radians})" },
  { id: "a1", show: "s1", op: "\\text{one radian sweeps one radius of arc}", tex: "\\theta = 1 \\ \\Rightarrow \\ s = r" },
  { id: "a2", show: "s2", op: "\\text{example: } r = 3, \\ \\theta = 2", tex: "s = 3 \\cdot 2" },
  { id: "a3", show: "s3", tone: "good", result: true, op: "\\text{multiply}", tex: "s = 6 \\text{ units of arc}" },
];

const DERIVE: FlowStep[] = [
  { id: "v0", tex: "v = \\dfrac{s}{t}" },
  { id: "v1", show: "s1", op: "\\text{substitute } s = r\\theta", tex: "v = \\dfrac{r\\theta}{t}" },
  { id: "v2", show: "s2", op: "\\text{regroup the factors}", tex: "v = r \\cdot \\dfrac{\\theta}{t}" },
  { id: "v3", show: "s3", tone: "good", result: true, op: "\\text{angular speed } \\omega = \\dfrac{\\theta}{t}", tex: "v = r\\omega" },
];

function workedSteps(omega: number): FlowStep[] {
  return [
    { id: "w0", tex: "v = r\\omega" },
    { id: "w1", show: "s1", op: "\\text{radius } r = 3 \\text{ m}", tex: "v = 3\\,\\omega" },
    { id: "w2", show: "s2", tone: "good", result: true, op: `\\omega = ${omega} \\text{ rad/s}`, tex: `v = 3 \\cdot ${omega} = ${3 * omega} \\text{ m/s}` },
  ];
}

export default function AngularVelocityStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "arc";

  if (mode === "worked") {
    const omega = Math.round(values.omega ?? 0);
    const v = 3 * omega;
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={workedSteps(omega)}
              reveal={reveal}
              heading={"\\text{longer arrow = faster rim}"}
              header={<SpinGauge angle={40} speed={v / 30} />}
            />
          </div>
        </div>
      </section>
    );
  }

  if (mode === "derive") {
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow steps={DERIVE} reveal={reveal} heading={"\\text{link linear speed to spin}"} header={<SpinGauge angle={40} speed={0.6} />} />
          </div>
        </div>
      </section>
    );
  }

  const deg = Math.round(values.deg ?? 0);
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow steps={ARC} reveal={reveal} heading={"\\text{arc length grows with the angle}"} header={<SpinGauge angle={deg} arc />} />
        </div>
      </div>
    </section>
  );
}
