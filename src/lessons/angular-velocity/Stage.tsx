import { useEffect, useRef, useState } from "react";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import FigureReadout from "../../components/FigureReadout";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIZE = 140;
const C = SIZE / 2;
const R = 48;
/** Rest pose for the live wheel, and the reduced-motion park angle. */
const REST_DEG = 40;

/** Wedge from the positive x-axis to `deg`, counterclockwise, for arc length. */
function wedge(deg: number, r: number) {
  const a = toRadians(deg);
  const x = C + r * Math.cos(a);
  const y = C - r * Math.sin(a);
  const large = deg > 180 ? 1 : 0;
  return `M ${C} ${C} L ${C + r} ${C} A ${r} ${r} 0 ${large} 0 ${x.toFixed(2)} ${y.toFixed(2)} Z`;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/**
 * A spinning wheel: a radius out to a rim point, optionally the swept arc (for
 * arc length) and a tangent velocity arrow whose length tracks the linear speed.
 */
function SpinGauge({
  angle,
  arc,
  speed,
  showSpeeds,
  label,
}: {
  angle: number;
  arc?: boolean;
  speed?: number;
  showSpeeds?: boolean;
  label?: string;
}) {
  const a = toRadians(angle);
  const px = C + R * Math.cos(a);
  const py = C - R * Math.sin(a);
  const len = speed != null ? Math.max(0, Math.min(1, speed)) * 34 : showSpeeds ? 28 : 0;
  const dirX = -Math.sin(a);
  const dirY = -Math.cos(a);
  const tipX = px + dirX * len;
  const tipY = py + dirY * len;
  const perpX = -dirY;
  const perpY = dirX;
  const barb = 5;

  return (
    <svg className="flow-gauge flow-gauge--wide figure-plot" viewBox={`0 0 ${SIZE} ${SIZE}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={label ?? `Wheel with the rim point at ${Math.round(angle)} degrees`}>
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
      {arc && angle > 12 && (
        <>
          <path
            d={`M ${C + 13} ${C} A 13 13 0 ${angle > 180 ? 1 : 0} 0 ${(C + 13 * Math.cos(a)).toFixed(2)} ${(C - 13 * Math.sin(a)).toFixed(2)}`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={1.3}
          />
          <text
            x={C + 22 * Math.cos(a / 2)}
            y={C - 22 * Math.sin(a / 2) + 4}
            textAnchor="middle"
            className="angle-glyph-label"
            fill="var(--ink)"
          >
            θ
          </text>
        </>
      )}
      {(len > 1 || showSpeeds) && (
        <g stroke="var(--teal)" strokeWidth={2.4} strokeLinecap="round" fill="none">
          <line x1={px} y1={py} x2={tipX} y2={tipY} />
          <line x1={tipX} y1={tipY} x2={tipX - dirX * barb + perpX * barb} y2={tipY - dirY * barb + perpY * barb} />
          <line x1={tipX} y1={tipY} x2={tipX - dirX * barb - perpX * barb} y2={tipY - dirY * barb - perpY * barb} />
        </g>
      )}
      {showSpeeds && (
        <>
          <path
            d={`M ${C + 16} ${C} A 16 16 0 ${angle > 180 ? 1 : 0} 0 ${(C + 16 * Math.cos(a)).toFixed(2)} ${(C - 16 * Math.sin(a)).toFixed(2)}`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
          <text x={tipX + dirX * 10} y={tipY + dirY * 10} textAnchor="middle" className="angle-glyph-label" fill="var(--teal)">
            v
          </text>
          <text
            x={C + 22 * Math.cos(a / 2)}
            y={C - 22 * Math.sin(a / 2) + 3}
            textAnchor="middle"
            className="angle-glyph-label"
            fill="var(--ink)"
          >
            ω
          </text>
        </>
      )}
      <circle cx={px} cy={py} r={4.5} fill="var(--teal)" />
      <circle cx={C} cy={C} r={2.6} fill="var(--ink)" />
    </svg>
  );
}

/**
 * Try-stage wheel: integrate live ω (rad/s) so the rim point, radius, and
 * tangent arrow orbit together. Mapping is 1:1, so the visual period is
 * T = 2π/ω seconds. Changing ω updates the rate immediately without
 * resetting the angle. Reduced motion parks at REST_DEG.
 */
function LiveSpinGauge({ omega, speed }: { omega: number; speed: number }) {
  const reduced = usePrefersReducedMotion();
  const [deg, setDeg] = useState(REST_DEG);
  const degRef = useRef(REST_DEG);
  const omegaRef = useRef(omega);
  omegaRef.current = omega;

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = omegaRef.current;
      if (w > 0) {
        degRef.current = (degRef.current + (w * dt * 180) / Math.PI) % 360;
        setDeg(degRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const angle = reduced ? REST_DEG : deg;
  const omegaLabel = Math.round(omega);
  return (
    <SpinGauge
      angle={angle}
      speed={speed}
      label={`Wheel of radius 3 metres, angular speed ${omegaLabel} radians per second`}
    />
  );
}

const DERIVE: FlowStep[] = [
  { id: "v0", show: "eq", tex: "v = \\dfrac{\\Delta s}{\\Delta t}" },
  { id: "v1", show: "s1", op: "\\text{substitute } \\Delta s = r\\,\\Delta\\theta", tex: "v = \\dfrac{r\\,\\Delta\\theta}{\\Delta t}" },
  { id: "v2", show: "s2", op: "\\text{regroup the factors}", tex: "v = r \\cdot \\dfrac{\\Delta\\theta}{\\Delta t}" },
  { id: "v3", show: "s3", tone: "good", result: true, op: "\\text{angular speed } \\omega = \\dfrac{\\Delta\\theta}{\\Delta t}", tex: "v = r\\omega" },
];

export default function AngularVelocityStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "arc";

  if (mode === "derive") {
    const deg = Math.round(values.deg ?? 40);
    const wheel = <SpinGauge angle={deg} showSpeeds speed={0.85} />;
    if (!reveal.eq && !reveal.s1) {
      return (
        <section className="figure-area">
          <div className="figure-frame">
            <div className="figure-slot">
              <FigureReadout
                figure={wheel}
                heading={"\\text{angular speed } \\omega \\text{ and rim speed } v"}
              />
            </div>
          </div>
        </section>
      );
    }
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <AlgebraFlow
              steps={DERIVE}
              reveal={reveal}
              heading={"\\text{link linear speed to spin}"}
              header={wheel}
              focus
            />
          </div>
        </div>
      </section>
    );
  }

  // Interactive: the wheel is the figure, with a compact readout of v = r*omega.
  if (mode === "worked") {
    const omega = Math.round(values.omega ?? 0);
    const v = 3 * omega;
    const lines: string[] = [];
    if (reveal.s1) lines.push("v = 3\\omega");
    if (reveal.s2) lines.push(`v = 3 \\cdot ${omega} = ${v} \\text{ m/s}`);
    return (
      <section className="figure-area">
        <div className="figure-frame">
          <div className="figure-slot">
            <FigureReadout figure={<LiveSpinGauge omega={omega} speed={v / 30} />} heading={"\\text{longer arrow = faster rim}"} lines={lines} />
          </div>
        </div>
      </section>
    );
  }

  // Arc length: the wheel with its swept arc is the figure, the worked numbers
  // sit beneath as a readout rather than a step derivation crowding the circle.
  const deg = Math.round(values.deg ?? 0);
  const arcLines: string[] = [];
  if (reveal.s1) arcLines.push("\\theta = 1 \\ \\Rightarrow\\ s = r");
  if (reveal.s2) arcLines.push("r = 3,\\ \\theta = 2 \\ \\Rightarrow\\ s = 3 \\cdot 2");
  if (reveal.s3) arcLines.push("s = 6 \\text{ units of arc}");
  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <FigureReadout figure={<SpinGauge angle={deg} arc />} heading={"\\text{arc length } s = r\\theta"} lines={arcLines} />
        </div>
      </div>
    </section>
  );
}
