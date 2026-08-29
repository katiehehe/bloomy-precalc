import { type ReactNode } from "react";

/**
 * A shared, pencil-mimic series figure. It draws the terms of a sequence as a row
 * of bars over an index axis (k = 1, 2, 3, ...), so the learner can SEE the
 * pattern (a constant gap for arithmetic, a constant ratio for geometric, bars
 * shrinking toward zero when |r| < 1). Beneath the bars it lays a "running total"
 * track: the partial sum drawn as a single horizontal bar that fills up as more
 * terms are added, with an optional dashed target line for the limit S of a
 * convergent series. The lesson Stage computes everything from `values`/`reveal`
 * and passes a SeriesSpec in, exactly like ConicPlane and MatrixGrid. Being an
 * <svg> in the figure-slot, it also satisfies the smoke harness.
 */

const W = 460;
const H = 460;
const PAD_L = 44;
const PAD_R = 28;
const BASE_Y = 232; // baseline the bars stand on
const BAR_TOP = 54; // highest a full-height bar reaches
const LABEL_Y = 256; // index labels sit just under the baseline

const TRACK_Y = 322;
const TRACK_H = 30;
const TOTAL_Y = 392;

export type SeriesBar = {
  value: number;
  /** Label under the bar (defaults to the 1-based index). KaTeX-free short text. */
  label?: string;
  /** A short value tag drawn at the bar's tip (e.g. "8" or "1/4"). */
  tag?: string;
  tone?: "primary" | "accent" | "teal" | "muted";
};

export type SeriesSpec = {
  bars: SeriesBar[];
  /**
   * 1-based count of terms "added so far". Bars up to this index are solid; later
   * bars render faint. Defaults to every bar solid.
   */
  activeThrough?: number;
  /** 1-based index of a bar to highlight (the term currently under discussion). */
  focus?: number;
  /** Draw the running-total track and readout under the bars. */
  showTotal?: boolean;
  /** A short label for the running total, e.g. "S_5" (plain text, no KaTeX). */
  totalLabel?: string;
  /**
   * Full-scale value the track fills against. Defaults to the sum of every bar's
   * value. For a convergent series pass the limit S so the fill creeps toward it.
   */
  scaleTotal?: number;
  /** Draw a dashed target marker on the track at this total (the limit S). */
  target?: number | null;
  /** Short label near the target marker (plain text). */
  targetLabel?: string;
  /** A caption line under everything (plain text). */
  caption?: string;
  aria: string;
};

const TONE: Record<NonNullable<SeriesBar["tone"]>, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  teal: "var(--teal)",
  muted: "var(--muted)",
};

type Props = {
  spec: SeriesSpec;
  /** Optional layer drawn over the bars (annotations, brackets). */
  overlay?: ReactNode;
};

export default function SeriesBars({ spec, overlay }: Props) {
  const bars = spec.bars ?? [];
  const n = bars.length;
  const activeThrough = spec.activeThrough ?? n;
  const values = bars.map((b) => b.value);
  const maxAbs = Math.max(1e-6, ...values.map((v) => Math.abs(v)));

  const innerW = W - PAD_L - PAD_R;
  // Column width and bar width, with a little gap between bars.
  const colW = n > 0 ? innerW / n : innerW;
  const barW = Math.min(48, colW * 0.62);
  const spanUp = BASE_Y - BAR_TOP; // pixels for a full-magnitude bar

  const colX = (i: number) => PAD_L + colW * i + colW / 2; // center of column i (0-based)

  const runningTotal = values.slice(0, activeThrough).reduce((s, v) => s + v, 0);
  const fullTotal = values.reduce((s, v) => s + v, 0);
  const scaleTotal = spec.scaleTotal ?? (spec.target != null ? spec.target : fullTotal);
  const trackScale = Math.max(1e-6, Math.abs(scaleTotal));
  const trackInnerW = W - PAD_L - PAD_R;
  const fillW = Math.max(0, Math.min(1, runningTotal / trackScale)) * trackInnerW;

  return (
    <svg
      className="figure"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria}
    >
      {/* Baseline the bars stand on. */}
      <line x1={PAD_L - 8} y1={BASE_Y} x2={W - PAD_R + 8} y2={BASE_Y} className="axis-line" stroke="var(--line)" strokeWidth={1.5} />

      {bars.map((b, i) => {
        const idx = i + 1;
        const active = idx <= activeThrough;
        const isFocus = spec.focus === idx;
        const h = (Math.abs(b.value) / maxAbs) * spanUp;
        const up = b.value >= 0;
        const y = up ? BASE_Y - h : BASE_Y;
        const x = colX(i) - barW / 2;
        const fill = TONE[b.tone ?? "primary"];
        return (
          <g key={`bar${i}`} opacity={active ? 1 : 0.22}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(1, h)}
              rx={4}
              fill={fill}
              stroke={isFocus ? "var(--ink)" : "none"}
              strokeWidth={isFocus ? 2.5 : 0}
            />
            {b.tag && (
              <text
                x={colX(i)}
                y={(up ? y : BASE_Y + h) - (up ? 8 : -16)}
                textAnchor="middle"
                className="series-tag"
                fill="var(--ink)"
                fontSize={15}
                fontWeight={isFocus ? 700 : 500}
              >
                {b.tag}
              </text>
            )}
            <text x={colX(i)} y={LABEL_Y} textAnchor="middle" className="series-index" fill="var(--muted)" fontSize={14}>
              {b.label ?? String(idx)}
            </text>
          </g>
        );
      })}

      {spec.showTotal && (
        <>
          <rect
            x={PAD_L}
            y={TRACK_Y}
            width={trackInnerW}
            height={TRACK_H}
            rx={8}
            fill="var(--bg)"
            stroke="var(--line)"
            strokeWidth={1.5}
          />
          <rect x={PAD_L} y={TRACK_Y} width={fillW} height={TRACK_H} rx={8} fill="var(--primary)" opacity={0.85} />
          {spec.target != null && (
            <g>
              <line
                x1={PAD_L + Math.min(1, spec.target / trackScale) * trackInnerW}
                y1={TRACK_Y - 10}
                x2={PAD_L + Math.min(1, spec.target / trackScale) * trackInnerW}
                y2={TRACK_Y + TRACK_H + 10}
                stroke="var(--accent)"
                strokeWidth={2}
                strokeDasharray="5 4"
              />
              {spec.targetLabel && (
                <text
                  x={PAD_L + Math.min(1, spec.target / trackScale) * trackInnerW}
                  y={TRACK_Y - 14}
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize={14}
                  fontWeight={600}
                >
                  {spec.targetLabel}
                </text>
              )}
            </g>
          )}
          <text x={PAD_L} y={TOTAL_Y} textAnchor="start" fill="var(--ink)" fontSize={18} fontWeight={700}>
            {`${spec.totalLabel ? `${spec.totalLabel} = ` : "sum = "}${fmt(runningTotal)}`}
          </text>
        </>
      )}

      {spec.caption && (
        <text x={W / 2} y={H - 18} textAnchor="middle" fill="var(--muted)" fontSize={15}>
          {spec.caption}
        </text>
      )}

      {overlay}
    </svg>
  );
}

/** Compact number formatting: integers stay integers, else up to 3 decimals. */
function fmt(v: number): string {
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  return Number(v.toFixed(3)).toString();
}
