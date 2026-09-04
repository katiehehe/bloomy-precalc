import { makePlane, PlaneGrid } from "../../components/Plane";
import type { LessonFigureProps } from "../types";

const SIZE = 240;
const HALF = 2.7;
const HALF_PI = Math.PI / 2;

type Pt = { x: number; y: number };

/** Build an SVG path from world points, lifting the pen when a point leaves the plane. */
function pathOf(points: Pt[], plane: ReturnType<typeof makePlane>) {
  let d = "";
  let pen = false;
  for (const p of points) {
    if (Math.abs(p.x) > HALF + 1e-6 || Math.abs(p.y) > HALF + 1e-6) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${plane.sx(p.x).toFixed(2)} ${plane.sy(p.y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}

function sampleSine(from: number, to: number): Pt[] {
  const pts: Pt[] = [];
  const n = 120;
  for (let i = 0; i <= n; i += 1) {
    const x = from + ((to - from) * i) / n;
    pts.push({ x, y: Math.sin(x) });
  }
  return pts;
}

/** The restricted sine morphing toward its reflection across y = x. */
function morphSine(p: number): Pt[] {
  const pts: Pt[] = [];
  const n = 120;
  for (let i = 0; i <= n; i += 1) {
    const t = -HALF_PI + (Math.PI * i) / n;
    const ax = t;
    const ay = Math.sin(t);
    pts.push({ x: ax + (ay - ax) * p, y: ay + (t - ay) * p });
  }
  return pts;
}

export default function InverseGraphStage(props: LessonFigureProps) {
  const { reveal, slide, values, drawProgress } = props;
  const mode = slide.mode ?? "restrict";
  const plane = makePlane(SIZE, HALF);

  const rangeBounds = (
    <>
      <line x1={plane.sx(-HALF)} y1={plane.sy(HALF_PI)} x2={plane.sx(HALF)} y2={plane.sy(HALF_PI)} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 4" />
      <line x1={plane.sx(-HALF)} y1={plane.sy(-HALF_PI)} x2={plane.sx(HALF)} y2={plane.sy(-HALF_PI)} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 4" />
    </>
  );

  let body;
  if (mode === "reflect") {
    const p = reveal.reflected ? drawProgress : 0;
    body = (
      <>
        {reveal.axis && (
          <line x1={plane.sx(-HALF)} y1={plane.sy(-HALF)} x2={plane.sx(HALF)} y2={plane.sy(HALF)} stroke="var(--teal)" strokeWidth={1.4} strokeDasharray="4 4" />
        )}
        <path d={pathOf(sampleSine(-HALF_PI, HALF_PI), plane)} fill="none" stroke="var(--cosine)" strokeWidth={3} strokeLinecap="round" />
        {p > 0.001 && <path d={pathOf(morphSine(p), plane)} fill="none" stroke="var(--primary)" strokeWidth={3} strokeLinecap="round" />}
      </>
    );
  } else if (mode === "evaluate") {
    const input = Math.max(-1, Math.min(1, (values.x ?? 0) / 10));
    const output = Math.asin(input);
    const px = plane.sx(input);
    const py = plane.sy(output);
    body = (
      <>
        {rangeBounds}
        <path d={pathOf(Array.from({ length: 121 }, (_, i) => { const u = -1 + i / 60; return { x: u, y: Math.asin(u) }; }), plane)} fill="none" stroke="var(--primary)" strokeWidth={3} strokeLinecap="round" />
        <line x1={px} y1={plane.sy(0)} x2={px} y2={py} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
        <line x1={plane.sx(0)} y1={py} x2={px} y2={py} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 3" />
        <circle cx={px} cy={py} r={5} fill="var(--primary)" />
        <text x={px + 8} y={py - 6} className="angle-glyph-label" fill="var(--primary)">
          {`(${input.toFixed(2)}, ${output.toFixed(2)})`}
        </text>
      </>
    );
  } else {
    body = (
      <>
        <path d={pathOf(sampleSine(-HALF, HALF), plane)} fill="none" stroke="var(--line)" strokeWidth={2} strokeDasharray="4 4" />
        <path d={pathOf(sampleSine(-HALF_PI, HALF_PI), plane)} fill="none" stroke="var(--cosine)" strokeWidth={3.2} strokeLinecap="round" />
        {reveal.line && (
          <>
            <line x1={plane.sx(-HALF)} y1={plane.sy(0.5)} x2={plane.sx(HALF)} y2={plane.sy(0.5)} stroke="var(--teal)" strokeWidth={1.6} strokeDasharray="4 4" />
            <circle cx={plane.sx(Math.PI / 6)} cy={plane.sy(0.5)} r={4} fill="var(--teal)" />
            <circle cx={plane.sx(Math.PI - Math.PI / 6)} cy={plane.sy(0.5)} r={4} fill="var(--cosine)" />
          </>
        )}
      </>
    );
  }

  return (
    <section className="figure-area">
      <div className="figure-frame">
        <div className="figure-slot">
          <svg className="figure" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Sine restricted and reflected to build arcsine">
            <PlaneGrid plane={plane} />
            {body}
          </svg>
        </div>
      </div>
    </section>
  );
}
