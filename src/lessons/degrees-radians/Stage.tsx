import { type PointerEvent, useRef } from "react";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import { toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

const SIZE = 120;
const C = SIZE / 2;
const R = 40;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Reduce a whole number of degrees to a fraction (a/b) of pi. */
function reduceDeg(deg: number) {
  const g = gcd(Math.abs(deg), 180) || 1;
  return { a: deg / g, b: 180 / g, g };
}

/** TeX for (a/b) * pi already in lowest terms. Tidy special cases. */
function piTex(a: number, b: number) {
  if (a === 0) return "0";
  const sign = a < 0 ? "-" : "";
  const aa = Math.abs(a);
  const num = aa === 1 ? "\\pi" : `${aa}\\pi`;
  return b === 1 ? `${sign}${num}` : `${sign}\\dfrac{${num}}{${b}}`;
}

/** A single-radius arc from the positive x-axis to `deg`, drawn counterclockwise. */
function arcPath(deg: number, r: number) {
  const a = toRadians(deg);
  const x = C + r * Math.cos(a);
  const y = C - r * Math.sin(a);
  const large = deg > 180 ? 1 : 0;
  return `M ${C + r} ${C} A ${r} ${r} 0 ${large} 0 ${x.toFixed(3)} ${y.toFixed(3)}`;
}

/** A small dial that shows the current angle as a swept arc on the circle. */
function DegDial({ deg, interactive, onAngle }: { deg: number; interactive: boolean; onAngle: (d: number) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const a = toRadians(deg);
  const tipX = C + R * Math.cos(a);
  const tipY = C - R * Math.sin(a);

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * SIZE - C;
    const py = C - ((event.clientY - rect.top) / rect.height) * SIZE;
    let d = (Math.atan2(py, px) * 180) / Math.PI;
    d = ((Math.round(d / 15) * 15) % 360 + 360) % 360;
    if (d === 0) d = 360;
    onAngle(d);
  };

  return (
    <svg
      ref={ref}
      className={`flow-gauge${interactive ? " flow-gauge--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`Angle dial at ${Math.round(deg)} degrees`}
      onPointerDown={(event) => {
        if (!interactive) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons) applyPointer(event);
      }}
    >
      <line x1={C - R - 6} y1={C} x2={C + R + 6} y2={C} stroke="var(--line)" strokeWidth={1} />
      <line x1={C} y1={C - R - 6} x2={C} y2={C + R + 6} stroke="var(--line)" strokeWidth={1} />
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth={1.4} />
      {deg >= 359.5 ? (
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--primary)" strokeWidth={4} />
      ) : (
        deg > 0.6 && <path d={arcPath(deg, R)} fill="none" stroke="var(--primary)" strokeWidth={4} strokeLinecap="round" />
      )}
      <line x1={C} y1={C} x2={tipX} y2={tipY} stroke="var(--primary)" strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={tipX} cy={tipY} r={4.5} fill="var(--primary)" />
      <circle cx={C} cy={C} r={3} fill="var(--ink)" />
    </svg>
  );
}

/** Degrees -> radians, computed live from the dial so the algebra tracks the angle. */
function degToRadSteps(deg: number): FlowStep[] {
  const { a, b, g } = reduceDeg(deg);
  return [
    { id: "d0", tex: `${deg}^\\circ` },
    { id: "d1", show: "s1", op: "\\times \\dfrac{\\pi}{180^\\circ}", tex: `${deg}^\\circ \\times \\dfrac{\\pi}{180^\\circ}` },
    { id: "d2", show: "s2", op: "\\text{the } {}^\\circ \\text{ cancels}", tex: `\\dfrac{${deg}\\,\\pi}{180}` },
    {
      id: "d3",
      show: "s3",
      tone: "cancel",
      op: `\\text{divide top and bottom by } ${g}`,
      tex: `\\dfrac{\\overset{${a}}{\\cancel{${deg}}}\\,\\pi}{\\underset{${b}}{\\cancel{180}}}`,
    },
    { id: "d4", show: "s4", tone: "good", result: true, op: "=", tex: piTex(a, b) },
  ];
}

const BRIDGE_STEPS: FlowStep[] = [
  { id: "b0", tex: "360^\\circ = 2\\pi \\text{ rad}" },
  { id: "b1", show: "s1", tone: "good", result: true, op: "\\text{halve both sides}", tex: "180^\\circ = \\pi \\text{ rad}" },
  { id: "b2", show: "s2", op: "\\text{halve again}", tex: "90^\\circ = \\dfrac{\\pi}{2} \\text{ rad}" },
  { id: "b3", show: "s3", op: "\\text{a third of } 180^\\circ", tex: "60^\\circ = \\dfrac{\\pi}{3} \\text{ rad}" },
];

const RAD_TO_DEG_STEPS: FlowStep[] = [
  { id: "r0", tex: "\\dfrac{5\\pi}{6}" },
  { id: "r1", show: "s1", op: "\\times \\dfrac{180^\\circ}{\\pi}", tex: "\\dfrac{5\\pi}{6} \\times \\dfrac{180^\\circ}{\\pi}" },
  { id: "r2", show: "s2", tone: "cancel", op: "\\text{the } \\pi \\text{ cancels}", tex: "\\dfrac{5\\,\\cancel{\\pi}}{6} \\times \\dfrac{180^\\circ}{\\cancel{\\pi}}" },
  { id: "r3", show: "s3", op: "\\text{multiply across}", tex: "\\dfrac{5 \\times 180^\\circ}{6}" },
  { id: "r4", show: "s4", tone: "cancel", op: "\\text{divide } 180 \\text{ by } 6", tex: "5 \\times 30^\\circ" },
  { id: "r5", show: "s5", tone: "good", result: true, op: "=", tex: "150^\\circ" },
];

export default function DegRadStage(props: LessonFigureProps) {
  const { values, reveal, interactive, setValue, slide } = props;
  const deg = Math.round(values.deg ?? 60);
  const { a, b } = reduceDeg(deg);
  const mode = slide.mode ?? "d2r";

  const steps = mode === "bridge" ? BRIDGE_STEPS : mode === "r2d" ? RAD_TO_DEG_STEPS : degToRadSteps(deg);
  const heading =
    mode === "bridge"
      ? "\\text{once around} = 2\\pi \\text{ radians}"
      : mode === "r2d"
        ? "\\text{radians} \\to \\text{degrees}"
        : `\\theta = ${deg}^\\circ = ${piTex(a, b)}`;

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <AlgebraFlow
            steps={steps}
            reveal={reveal}
            heading={heading}
            header={<DegDial deg={deg} interactive={interactive} onAngle={(d) => setValue("deg", () => d)} />}
          />
        </div>
      </div>
    </section>
  );
}
