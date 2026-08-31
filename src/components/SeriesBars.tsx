import { type ReactNode } from "react";

/**
 * A shared, pencil-mimic series figure. It draws the terms of a sequence as a row
 * of bars over an index axis (k = 1, 2, 3, ...), so the learner can SEE the
 * pattern (a constant gap for arithmetic, a constant ratio for geometric, bars
 * shrinking toward zero when |r| < 1).
 *
 * The total reads out in one of two ways, chosen per lesson:
 *   - "terms" writes the numbers out and adds them, e.g. 1 + 2 + 3 + 4 + 5 = 15,
 *     which is what a plain finite sum should show. Long lists abbreviate with an
 *     ellipsis, e.g. 5 + 10 + ... + 50 = 275.
 *   - "bar" fills a horizontal track toward a limit, which suits a convergent
 *     series where the point is that the partial sums approach S.
 *
 * The viewBox height hugs whatever is shown, so there is never a band of empty
 * space beneath the figure. Being an <svg> in the figure-slot, it also satisfies
 * the smoke harness.
 */

const W = 460;
const PAD_L = 44;
const PAD_R = 28;
const BAR_TOP = 40; // highest a full-magnitude bar reaches
const BASE_Y = 210; // baseline the bars stand on
const LABEL_Y = 234; // index labels sit just under the baseline

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
  /** Draw the running total (a written-out sum or a filling track) under the bars. */
  showTotal?: boolean;
  /**
   * How the total reads out: "bar" (default) fills a track toward a limit, which
   * suits a convergent series. "terms" writes the terms out and adds them, which
   * suits a plain finite sum.
   */
  sumMode?: "bar" | "terms";
  /** A short axis label for the index drawn past the right end of the axis, e.g. "k". */
  axisLabel?: string;
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
  const colW = n > 0 ? innerW / n : innerW;
  const barW = Math.min(48, colW * 0.62);
  const spanUp = BASE_Y - BAR_TOP;

  const colX = (i: number) => PAD_L + colW * i + colW / 2;

  const runningTotal = values.slice(0, activeThrough).reduce((s, v) => s + v, 0);
  const fullTotal = values.reduce((s, v) => s + v, 0);
  const scaleTotal = spec.scaleTotal ?? (spec.target != null ? spec.target : fullTotal);
  const trackScale = Math.max(1e-6, Math.abs(scaleTotal));
  const trackInnerW = innerW;
  const fillW = Math.max(0, Math.min(1, runningTotal / trackScale)) * trackInnerW;

  const termsMode = spec.sumMode === "terms";

  // Footer geometry, computed so the viewBox hugs the content (no dead space).
  const TRACK_Y = 270;
  const TRACK_H = 26;
  let sumY = 0;
  let totalTextY = 0;
  let footerBottom = LABEL_Y;
  if (spec.showTotal && termsMode) {
    sumY = LABEL_Y + 58; // the written-out sum, centered
    footerBottom = sumY + 6;
  } else if (spec.showTotal) {
    totalTextY = TRACK_Y + TRACK_H + 30;
    footerBottom = totalTextY + 4;
  }
  let captionY = 0;
  if (spec.caption) {
    captionY = footerBottom + (spec.showTotal ? 26 : 32);
    footerBottom = captionY;
  }
  const H = footerBottom + 20;

  // The written-out terms, abbreviated when there are too many to fit.
  const termStr = (b: SeriesBar) => b.tag ?? fmt(b.value);
  const shown = bars.slice(0, activeThrough);
  const termParts =
    shown.length > 6
      ? [termStr(shown[0]), termStr(shown[1]), "\u2026", termStr(shown[shown.length - 1])]
      : shown.map(termStr);

  return (
    <svg
      className="figure"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={spec.aria}
    >
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

      {/* The index variable, italicised, just past the right end of the axis. */}
      {spec.axisLabel && (
        <text x={W - PAD_R + 12} y={LABEL_Y} textAnchor="start" fill="var(--muted)" fontSize={16} fontStyle="italic">
          {spec.axisLabel}
        </text>
      )}

      {/* "terms" mode: the numbers written out and added, no bar. */}
      {spec.showTotal && termsMode && (
        <text x={W / 2} y={sumY} textAnchor="middle" fill="var(--ink)" fontSize={25} fontWeight={600}>
          {termParts.map((p, i) => (
            <tspan key={`t${i}`}>
              {i > 0 ? " + " : ""}
              {p}
            </tspan>
          ))}
          <tspan>{" = "}</tspan>
          <tspan fill="var(--primary)" fontWeight={800}>
            {fmt(runningTotal)}
          </tspan>
        </text>
      )}

      {/* "bar" mode: a filling track toward an optional dashed limit. */}
      {spec.showTotal && !termsMode && (
        <>
          <rect x={PAD_L} y={TRACK_Y} width={trackInnerW} height={TRACK_H} rx={8} fill="var(--bg)" stroke="var(--line)" strokeWidth={1.5} />
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
          <text x={PAD_L} y={totalTextY} textAnchor="start" fill="var(--ink)" fontSize={18} fontWeight={700}>
            {`${spec.totalLabel ? `${spec.totalLabel} = ` : "sum = "}${fmt(runningTotal)}`}
          </text>
        </>
      )}

      {spec.caption && (
        <text x={W / 2} y={captionY} textAnchor="middle" fill="var(--muted)" fontSize={15}>
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
