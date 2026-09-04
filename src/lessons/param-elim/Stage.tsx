import { type ReactNode } from "react";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";
import ParamElimFigure, { elimPoint } from "./Figure";
import FigureFrame from "../../components/FigureFrame";

/** Round to two decimals, never render a signed zero, drop a trailing ".00". */
const fmt = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/**
 * A small parametric-curve glyph for the AlgebraFlow header. It samples the pair
 * (x(t), y(t)) and auto-fits it to the box while preserving aspect ratio, so a
 * circle stays round and an ellipse looks wide. It is the supporting figure that
 * keeps a derivation slide from being a wall of text.
 */
function MiniParam({
  curve,
  tMin,
  tMax,
  aria,
}: {
  curve: (t: number) => [number, number];
  tMin: number;
  tMax: number;
  aria: string;
}) {
  const W = 188;
  const H = 128;
  const PAD = 14;
  const N = 180;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) pts.push(curve(tMin + ((tMax - tMin) * i) / N));
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min((W - 2 * PAD) / spanX, (H - 2 * PAD) / spanY);
  const cx0 = (minX + maxX) / 2;
  const cy0 = (minY + maxY) / 2;
  const sx = (x: number) => W / 2 + (x - cx0) * scale;
  const sy = (y: number) => H / 2 - (y - cy0) * scale;
  let d = "";
  pts.forEach((p, i) => {
    d += `${i === 0 ? "M" : "L"}${sx(p[0]).toFixed(2)} ${sy(p[1]).toFixed(2)} `;
  });
  const showX = minY <= 0 && maxY >= 0;
  const showY = minX <= 0 && maxX >= 0;

  return (
    <svg className="flow-gauge flow-gauge--wide figure-plot" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={aria}>
      {showX && <line x1={PAD / 2} y1={sy(0)} x2={W - PAD / 2} y2={sy(0)} stroke="var(--line)" strokeWidth={1} />}
      {showY && <line x1={sx(0)} y1={PAD / 2} x2={sx(0)} y2={H - PAD / 2} stroke="var(--line)" strokeWidth={1} />}
      <path d={d.trim()} fill="none" stroke="var(--primary)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={sx(pts[0][0])} cy={sy(pts[0][1])} r={3.4} fill="var(--teal)" />
    </svg>
  );
}

/** Substitution: solve the linear equation for t, then substitute. */
const SUB: FlowStep[] = [
  { id: "u0", tex: "x = t + 1, \\qquad y = t^2" },
  { id: "u1", show: "s1", op: "\\text{solve } x = t + 1 \\text{ for } t", tex: "t = x - 1" },
  {
    id: "u2",
    show: "s2",
    tone: "good",
    result: true,
    op: "\\text{substitute into } y = t^2",
    tex: "y = (x - 1)^2",
    note: "\\text{a parabola with vertex } (1, 0)",
  },
];

/** Trig method for equal radii: isolate, square, add, use the identity. */
const CIRCLE: FlowStep[] = [
  { id: "c0", tex: "x = \\cos t, \\qquad y = \\sin t" },
  { id: "c1", show: "s1", op: "\\text{isolate the trig functions}", tex: "\\cos t = x, \\qquad \\sin t = y" },
  { id: "c2", show: "s2", op: "\\text{square both}", tex: "\\cos^2 t = x^2, \\qquad \\sin^2 t = y^2" },
  {
    id: "c3",
    show: "s3",
    tone: "good",
    result: true,
    op: "\\text{add, then } \\cos^2 t + \\sin^2 t = 1",
    tex: "x^2 + y^2 = 1",
    note: "\\text{the unit circle}",
  },
];

/** Trig method with different radii: divide FIRST, then square and add. */
const ELLIPSE: FlowStep[] = [
  { id: "e0", tex: "x = 3\\cos t, \\qquad y = 2\\sin t" },
  {
    id: "e1",
    show: "s1",
    op: "\\text{divide to isolate } \\cos t, \\ \\sin t",
    tex: "\\cos t = \\dfrac{x}{3}, \\qquad \\sin t = \\dfrac{y}{2}",
  },
  {
    id: "e2",
    show: "s2",
    op: "\\text{square both}",
    tex: "\\cos^2 t = \\dfrac{x^2}{9}, \\qquad \\sin^2 t = \\dfrac{y^2}{4}",
  },
  {
    id: "e3",
    show: "s3",
    tone: "good",
    result: true,
    op: "\\text{add, then } \\cos^2 t + \\sin^2 t = 1",
    tex: "\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1",
    note: "\\text{an ellipse, wider than it is tall}",
  },
];

function frame(slot: ReactNode, dock: ReactNode, reserve?: string) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} holdDock />;
}

export default function ParamElimStage(props: LessonFigureProps) {
  const { slide, reveal, value } = props;
  const mode = slide.mode ?? "derive-sub";

  if (mode === "derive-sub") {
    return frame(
      <AlgebraFlow
        steps={SUB}
        reveal={reveal}
        heading={"\\text{substitution: solve for } t, \\text{ then replace it}"}
        header={<MiniParam curve={(t) => [t + 1, t * t]} tMin={-2.2} tMax={2.2} aria="A parabola opening upward, the curve x = t + 1, y = t squared." />}
        align="start"
      />,
      null,
    );
  }

  if (mode === "derive-circle") {
    return frame(
      <AlgebraFlow
        steps={CIRCLE}
        reveal={reveal}
        heading={"\\text{trig method: use } \\cos^2 t + \\sin^2 t = 1"}
        header={<MiniParam curve={(t) => [Math.cos(t), Math.sin(t)]} tMin={0} tMax={2 * Math.PI} aria="A circle, the curve x = cosine t, y = sine t." />}
        align="start"
      />,
      null,
    );
  }

  if (mode === "derive-ellipse") {
    return frame(
      <AlgebraFlow
        steps={ELLIPSE}
        reveal={reveal}
        heading={"\\text{same identity, but divide by each radius first}"}
        header={<MiniParam curve={(t) => [3 * Math.cos(t), 2 * Math.sin(t)]} tMin={0} tMax={2 * Math.PI} aria="A wide ellipse, the curve x = 3 cosine t, y = 2 sine t." />}
        align="start"
      />,
      null,
    );
  }

  // Plane modes: restrict and practice.
  const { x, y, t } = elimPoint(value);
  const dock = reveal.dock ? (
    <>
      <div className="formula-list">
        <Tex>{"x = \\cos t, \\quad y = \\sin t"}</Tex>
        {reveal.arc && <Tex>{"x^2 + y^2 = 1"}</Tex>}
        {reveal.arc && <Tex>{"0 \\le t \\le \\pi \\ \\Rightarrow \\ y \\ge 0"}</Tex>}
      </div>
      <dl className="values">
        <div>
          <dt>parameter</dt>
          <dd className="value-primary">{`t = ${fmt(t)}`}</dd>
        </div>
        <div>
          <dt>
            <Tex>{"x = \\cos t"}</Tex>
          </dt>
          <dd className="value-cos">{fmt(x)}</dd>
        </div>
        <div>
          <dt>
            <Tex>{"y = \\sin t"}</Tex>
          </dt>
          <dd className="value-sin">{fmt(y)}</dd>
        </div>
      </dl>
    </>
  ) : null;

  return frame(<ParamElimFigure {...props} />, dock);
}
