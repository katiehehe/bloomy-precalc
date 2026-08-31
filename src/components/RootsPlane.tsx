import { type PointerEvent, type ReactNode, useRef } from "react";
import { makePlane } from "./Plane";
import PlotMarkers from "./PlotMarkers";
import { clientToSvgPoint } from "../lib/svg";
import type { LessonFigureProps } from "../lessons/types";

const SIZE = 460;
const MARGIN = 26;

export type RootDot = { re: number; im: number };

/** The roots of one polynomial, grouped for the Argand-plane figure. */
export type RootsSpec = {
  degree: number;
  /** Real roots (imaginary part 0), drawn on the real axis. */
  real: RootDot[];
  /** Upper member of each conjugate pair (im > 0); the mirror is drawn from it. */
  pairs: RootDot[];
  aria: string;
};

/** Format a + bi cleanly: "1", "2i", "-2i", "3+2i". */
function formatRoot(re: number, im: number): string {
  const imPart = im === 1 ? "i" : im === -1 ? "-i" : `${im}i`;
  if (im === 0) return `${re}`;
  if (re === 0) return imPart;
  return `${re}${im > 0 ? "+" : "-"}${Math.abs(im) === 1 ? "i" : `${Math.abs(im)}i`}`;
}

/** Imaginary-axis tick label: "i", "2i", "-i", ... */
function imTick(n: number): string {
  return n === 1 ? "i" : n === -1 ? "-i" : `${n}i`;
}

/**
 * A complex plane (Argand diagram) that plots the roots of a polynomial: real
 * roots on the real axis and each non-real root mirrored across it as a conjugate
 * pair. Reveal flags show real roots, the upper pair member, its conjugate, and
 * the mirror connector. Lesson Stages forward the reveal bag (harness skips the
 * per-flag check).
 */
export default function RootsPlane({
  reveal,
  interactive,
  plot,
  spec,
  half,
}: LessonFigureProps & { spec: RootsSpec; half: number }) {
  const plane = makePlane(SIZE, half);
  const svgRef = useRef<SVGSVGElement>(null);
  const nMax = Math.floor(half + 1e-6);

  const grid: ReactNode[] = [];
  for (let n = -nMax; n <= nMax; n += 1) {
    if (n === 0) continue;
    grid.push(<line key={`v${n}`} x1={plane.sx(n)} y1={MARGIN} x2={plane.sx(n)} y2={SIZE - MARGIN} className="grid-line" />);
    grid.push(<line key={`h${n}`} x1={MARGIN} y1={plane.sy(n)} x2={SIZE - MARGIN} y2={plane.sy(n)} className="grid-line" />);
  }

  const ticks: ReactNode[] = [];
  for (let n = -nMax; n <= nMax; n += 1) {
    if (n === 0) continue;
    ticks.push(
      <text key={`tr${n}`} x={plane.sx(n)} y={plane.sy(0) + 15} className="tick-label" textAnchor="middle">
        {n}
      </text>,
    );
    ticks.push(
      <text key={`ti${n}`} x={plane.sx(0) - 8} y={plane.sy(n) + 4} className="tick-label" textAnchor="end">
        {imTick(n)}
      </text>,
    );
  }

  const applyPointer = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current || !plot) return;
    const { x: sX, y: sY } = clientToSvgPoint(svgRef.current, event.clientX, event.clientY);
    const wx = plane.wx(sX);
    const wy = plane.wy(sY);
    plot.onGuess({ x: wx, y: wy });
  };

  const rootDot = (re: number, im: number, key: string) => (
    <g key={key}>
      <circle cx={plane.sx(re)} cy={plane.sy(im)} r="7.5" className="root-dot" />
      <text x={plane.sx(re) + 12} y={plane.sy(im) - 10} className="root-label">
        {formatRoot(re, im)}
      </text>
    </g>
  );

  return (
    <svg
      ref={svgRef}
      className={`figure ${interactive ? "figure--live" : ""}`}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria}
      onPointerDown={(event) => {
        if (!interactive || !plot) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        applyPointer(event);
      }}
    >
      {grid}
      <line x1={MARGIN} y1={plane.sy(0)} x2={SIZE - MARGIN} y2={plane.sy(0)} className="axis" />
      <line x1={plane.sx(0)} y1={MARGIN} x2={plane.sx(0)} y2={SIZE - MARGIN} className="axis" />
      <text x={SIZE - 8} y={plane.sy(0) - 8} className="axis-label" textAnchor="end">
        Re
      </text>
      <text x={plane.sx(0) + 10} y={MARGIN + 4} className="axis-label">
        Im
      </text>
      {ticks}

      {reveal.mirror &&
        spec.pairs.map((p) => (
          <line
            key={`mir${p.re}-${p.im}`}
            x1={plane.sx(p.re)}
            y1={plane.sy(p.im)}
            x2={plane.sx(p.re)}
            y2={plane.sy(-p.im)}
            className="root-mirror"
          />
        ))}

      {reveal.real && spec.real.map((r) => rootDot(r.re, r.im, `re${r.re}`))}
      {reveal.pairsTop && spec.pairs.map((p) => rootDot(p.re, p.im, `top${p.re}-${p.im}`))}
      {reveal.pairsBottom && spec.pairs.map((p) => rootDot(p.re, -p.im, `bot${p.re}-${p.im}`))}

      {plot && <PlotMarkers plane={plane} plot={plot} />}
    </svg>
  );
}
