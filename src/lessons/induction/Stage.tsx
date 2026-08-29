import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

/**
 * Mathematical induction. A bespoke dominoes figure carries the metaphor: a
 * fallen (tilted, teal) domino means P(n) is established, a standing (upright,
 * blue) one is not yet reached. The reveal flags are read literally here and
 * kept in sync with slides.ts:
 *   principle:  firstfall, cascade
 *   base:       lhs, rhs, match
 *   step:       e1, e2, e3, e4   (also tilt domino k on e1 and k+1 on e4)
 *   bothneeded: caseA, caseB
 *   yourturn:   none (dominoes + dock follow the n slider)
 */

const W = 480;
const FALL = 68; // degrees a toppled domino leans, pivoting on its base corner
const RED = "oklch(0.62 0.21 25)";

type Band = { groundY: number; dhMax: number; labelY: number; capY: number };

type RowSpec = {
  count: number;
  /** Dominoes 1..fallenThrough are toppled (tilted, teal). */
  fallenThrough: number;
  labels?: string[];
  /** Draw implication arrows between neighbors (the step holds). */
  arrows?: boolean;
  /** Draw a red break between domino brokenAt and brokenAt+1 (1-based). */
  brokenAt?: number | null;
  /** Draw a red no-entry mark at the left: the first domino never gets a push. */
  noStart?: boolean;
  caption?: string;
  /** 1-based index to outline. */
  focus?: number | null;
};

/** One domino: a rounded rect with a divider and two pips, tilted when fallen. */
function domino(cx: number, groundY: number, dw: number, dh: number, fallen: boolean, focus: boolean, key: string): ReactNode {
  const x = cx - dw / 2;
  const yTop = groundY - dh;
  const pivotX = cx + dw / 2;
  const pivotY = groundY;
  const fill = fallen ? "var(--teal)" : "var(--primary)";
  const pipR = Math.max(1.4, dw * 0.12);
  return (
    <g key={key} transform={fallen ? `rotate(${FALL} ${pivotX} ${pivotY})` : undefined}>
      <rect
        x={x}
        y={yTop}
        width={dw}
        height={dh}
        rx={3}
        fill={fill}
        stroke={focus ? "var(--ink)" : "var(--surface)"}
        strokeWidth={focus ? 2.5 : 1}
      />
      <line x1={x + 2} y1={groundY - dh / 2} x2={x + dw - 2} y2={groundY - dh / 2} stroke="var(--surface)" strokeWidth={1.4} opacity={0.85} />
      <circle cx={cx} cy={groundY - dh * 0.75} r={pipR} fill="var(--surface)" opacity={0.9} />
      <circle cx={cx} cy={groundY - dh * 0.25} r={pipR} fill="var(--surface)" opacity={0.9} />
    </g>
  );
}

/** A short teal implication arrow (domino i would knock domino i+1). */
function arrow(x1: number, y1: number, x2: number, y2: number, key: string): ReactNode {
  const head = 6;
  return (
    <g key={key}>
      <line x1={x1} y1={y1} x2={x2 - head} y2={y2} stroke="var(--teal)" strokeWidth={2} />
      <polygon points={`${x2},${y2} ${x2 - head},${y2 - head * 0.7} ${x2 - head},${y2 + head * 0.7}`} fill="var(--teal)" />
    </g>
  );
}

/** A red X marking a broken link in the chain. */
function breakMark(cx: number, cy: number, key: string): ReactNode {
  const r = 9;
  return (
    <g key={key}>
      <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} stroke={RED} strokeWidth={3} strokeLinecap="round" />
      <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} stroke={RED} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** A red no-entry mark: nothing pushes the first domino. */
function noStartMark(cx: number, cy: number, key: string): ReactNode {
  const r = 10;
  return (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={RED} strokeWidth={3} />
      <line x1={cx - r * 0.72} y1={cy + r * 0.72} x2={cx + r * 0.72} y2={cy - r * 0.72} stroke={RED} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function renderRow(row: RowSpec, band: Band, ri: number): ReactNode {
  const { count } = row;
  const innerL = 46;
  const innerR = W - 30;
  const innerW = innerR - innerL;
  const colW = innerW / count;
  const dw = Math.min(26, colW * 0.36);
  const dh = Math.min(band.dhMax, colW * 2.4);
  const groundY = band.groundY;
  const cx = (i: number) => innerL + colW * (i + 0.5);
  const els: ReactNode[] = [];

  els.push(<line key="ground" x1={innerL - 8} y1={groundY} x2={innerR + 8} y2={groundY} stroke="var(--line)" strokeWidth={2} />);

  if (row.arrows) {
    const ay = groundY - dh - 10;
    for (let i = 0; i < count - 1; i += 1) {
      els.push(arrow(cx(i) + 6, ay, cx(i + 1) - 6, ay, `arrow${i}`));
    }
  }

  for (let i = 0; i < count; i += 1) {
    const idx = i + 1;
    els.push(domino(cx(i), groundY, dw, dh, idx <= row.fallenThrough, row.focus === idx, `dom${i}`));
  }

  for (let i = 0; i < count; i += 1) {
    els.push(
      <text key={`lab${i}`} x={cx(i)} y={band.labelY} textAnchor="middle" fill="var(--muted)" fontSize={14}>
        {row.labels?.[i] ?? String(i + 1)}
      </text>,
    );
  }

  if (row.brokenAt != null) {
    const bx = (cx(row.brokenAt - 1) + cx(row.brokenAt)) / 2;
    els.push(breakMark(bx, groundY - dh * 0.5, "break"));
    els.push(
      <text key="breaklab" x={bx} y={groundY - dh - 6} textAnchor="middle" fill={RED} fontSize={12} fontWeight={600}>
        step fails
      </text>,
    );
  }

  if (row.noStart) {
    els.push(noStartMark(innerL - 2, groundY - dh * 0.55, "nostart"));
    els.push(
      <text key="nostartlab" x={cx(0)} y={groundY - dh - 6} textAnchor="middle" fill={RED} fontSize={12} fontWeight={600}>
        no start
      </text>,
    );
  }

  if (row.caption) {
    els.push(
      <text key="cap" x={W / 2} y={band.capY} textAnchor="middle" fill="var(--muted)" fontSize={14}>
        {row.caption}
      </text>,
    );
  }

  return <g key={`row${ri}`}>{els}</g>;
}

function Dominoes({ rows, aria, compact = false }: { rows: RowSpec[]; aria: string; compact?: boolean }) {
  let H: number;
  let bands: Band[];
  if (compact) {
    H = 185;
    bands = [{ groundY: 136, dhMax: 96, labelY: 158, capY: 176 }];
  } else if (rows.length <= 1) {
    H = 300;
    bands = [{ groundY: 212, dhMax: 132, labelY: 238, capY: 278 }];
  } else {
    H = 384;
    bands = [
      { groundY: 130, dhMax: 84, labelY: 152, capY: 172 },
      { groundY: 322, dhMax: 84, labelY: 344, capY: 364 },
    ];
  }
  return (
    <svg className="figure" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={aria}>
      {rows.map((row, ri) => renderRow(row, bands[ri] ?? bands[bands.length - 1], ri))}
    </svg>
  );
}

/** Figure slot plus an optional formula dock beneath it (shared layout). */
function frame(slot: ReactNode, dock: ReactNode) {
  const showDock = Boolean(dock);
  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
        {showDock && <div className="figure-dock">{dock}</div>}
      </div>
    </section>
  );
}

/** The inductive step written line by line, ending in P(k+1) in a highlighted box. */
const STEP: FlowStep[] = [
  { id: "s0", tex: "1 + 2 + \\cdots + k + (k+1)" },
  { id: "s1", show: "e1", op: "\\text{use the hypothesis } P(k)", tex: "= \\dfrac{k(k+1)}{2} + (k+1)" },
  { id: "s2", show: "e2", op: "\\text{factor out } (k+1)", tex: "= (k+1)\\left(\\dfrac{k}{2} + 1\\right)" },
  { id: "s3", show: "e3", op: "\\text{combine: } \\tfrac{k}{2} + 1 = \\tfrac{k+2}{2}", tex: "= (k+1)\\cdot\\dfrac{k+2}{2}" },
  { id: "s4", show: "e4", tone: "good", result: true, op: "\\text{this is } P(k+1)", tex: "= \\dfrac{(k+1)(k+2)}{2}" },
];

export default function InductionStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "principle";

  // Slide 1: the two parts on the domino line.
  if (mode === "principle") {
    const count = 6;
    const fallenThrough = reveal.cascade ? count : reveal.firstfall ? 1 : 0;
    const caption = reveal.cascade
      ? "each fall knocks the next: every domino topples"
      : reveal.firstfall
        ? "base case: the first domino falls"
        : "one domino per n: P(1), P(2), P(3), ...";
    return frame(
      <Dominoes
        rows={[{ count, fallenThrough, caption }]}
        aria={`A row of ${count} dominoes for P(1) through P(${count}); the first ${fallenThrough} from the left have toppled.`}
      />,
      null,
    );
  }

  // Slide 2: the base case checks n = 1 for the running sum.
  if (mode === "base") {
    const count = 6;
    const fallenThrough = reveal.match ? 1 : 0;
    const dock = (
      <div className="formula-list">
        <Tex>{"P(n):\\ 1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}"}</Tex>
        <Tex>{"\\text{base case: check } n = 1"}</Tex>
        {reveal.lhs && <Tex>{"\\text{LHS at } n = 1 = 1"}</Tex>}
        {reveal.rhs && <Tex>{"\\text{RHS at } n = 1 = \\dfrac{1(1+1)}{2} = \\dfrac{2}{2} = 1"}</Tex>}
        {reveal.match && <Tex>{"1 = 1 \\;\\Rightarrow\\; P(1) \\text{ holds}\\ \\checkmark"}</Tex>}
      </div>
    );
    return frame(
      <Dominoes
        rows={[
          {
            count,
            fallenThrough,
            caption: reveal.match ? "P(1) holds: the first domino falls" : "checking the base case P(1)",
          },
        ]}
        aria={
          fallenThrough === 1
            ? `A row of ${count} dominoes with the first toppled, showing the base case P(1) holds.`
            : `A row of ${count} standing dominoes while the base case P(1) is checked.`
        }
      />,
      dock,
    );
  }

  // Slide 3: the inductive step (algebra), with a small 2-domino strip above it.
  if (mode === "step") {
    const flowReveal = {
      e1: Boolean(reveal.e1),
      e2: Boolean(reveal.e2),
      e3: Boolean(reveal.e3),
      e4: Boolean(reveal.e4),
    };
    const fallenThrough = reveal.e4 ? 2 : reveal.e1 ? 1 : 0;
    const focus = reveal.e4 ? 2 : reveal.e1 ? 1 : null;
    const strip = (
      <div style={{ height: 138, padding: "10px 10px 0" }}>
        <Dominoes
          compact
          rows={[{ count: 2, fallenThrough, focus, arrows: true, labels: ["P(k)", "P(k+1)"] }]}
          aria={
            fallenThrough === 0
              ? "Two dominoes labeled P of k and P of k plus 1, both standing."
              : fallenThrough === 1
                ? "Two dominoes: P of k has toppled and points at a standing P of k plus 1."
                : "Two dominoes: P of k has toppled and knocked over P of k plus 1."
          }
        />
      </div>
    );
    const slot = (
      <div style={{ display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", height: "100%", minHeight: 0 }}>
        {strip}
        <AlgebraFlow steps={STEP} reveal={flowReveal} heading={"\\text{inductive step: assume } P(k),\\ \\text{prove } P(k+1)"} />
      </div>
    );
    return frame(slot, null);
  }

  // Slide 4: both parts are required; each half fails on its own.
  if (mode === "bothneeded") {
    const caseA = Boolean(reveal.caseA);
    const caseB = Boolean(reveal.caseB);
    const rows: RowSpec[] = [];
    if (!caseA && !caseB) {
      rows.push({ count: 5, fallenThrough: 0, caption: "a proof by induction needs BOTH parts" });
    } else {
      rows.push({ count: 5, fallenThrough: 1, brokenAt: 1, caption: "base case only: the first falls, then the chain stops" });
      if (caseB) {
        rows.push({ count: 5, fallenThrough: 0, arrows: true, noStart: true, caption: "step only: each would knock the next, but nothing starts" });
      }
    }
    const aria =
      !caseA && !caseB
        ? "Five standing dominoes: induction needs both a base case and an inductive step."
        : caseB
          ? "Two rows of dominoes. Top: only the first has fallen and the link to the rest is broken. Bottom: all standing with implication arrows but no starting push."
          : "A row of five dominoes with only the first fallen and a broken link to the rest.";
    return frame(<Dominoes rows={rows} aria={aria} />, null);
  }

  // Slide 5 (your turn): the n slider topples dominoes 1..n on the running sum.
  const count = 8;
  const n = Math.max(1, Math.min(count, Math.round(values.n ?? 2)));
  const sum = (n * (n + 1)) / 2;
  const dock = (
    <div className="formula-list">
      <Tex>{"1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}"}</Tex>
      <Tex>{`n = ${n}: \\ \\ 1 + \\cdots + ${n} = \\dfrac{${n} \\cdot ${n + 1}}{2} = ${sum}`}</Tex>
    </div>
  );
  return frame(
    <Dominoes
      rows={[{ count, fallenThrough: n, caption: `n = ${n}: dominoes 1 through ${n} have toppled` }]}
      aria={`A row of ${count} dominoes with the first ${n} toppled, showing the sum 1 through ${n} equals ${sum}.`}
    />,
    dock,
  );
}
