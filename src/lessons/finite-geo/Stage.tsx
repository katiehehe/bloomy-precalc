import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import SeriesBars, { type SeriesBar, type SeriesSpec } from "../../components/SeriesBars";
import AlgebraFlow, { type FlowStep } from "../../components/AlgebraFlow";
import type { LessonFigureProps } from "../types";

/**
 * Finite geometric series figures, all built on the shared SeriesBars so an
 * <svg> always lives in the figure slot. Slide 2 (derive) additionally renders
 * the shared AlgebraFlow in the dock, with its steps gated one per beat.
 *
 * Reveal flags read here (kept in sync with slides.ts):
 *   sequence: bars, ratio, formula
 *   derive:   e1, e2, e3, e4
 *   apply:    bars, plug, simplify, total
 *   shrink:   bars, plug, simplify, total
 *   yourturn: none (bars + total always shown, driven by the n slider)
 */

/** Shared frame: a figure slot with an optional formula dock beneath it. */
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

const bar = (value: number, tag: string, label?: string): SeriesBar => ({ value, tag, label });

/** 2 + 6 + 18 + 54, the running example on the sequence, derive, and apply slides. */
const GEO_BARS: SeriesBar[] = [bar(2, "2"), bar(6, "6"), bar(18, "18"), bar(54, "54")];

/** The shift-and-subtract derivation of S_n, one line revealed per beat. */
const DERIVE: FlowStep[] = [
  { id: "d0", tex: "S_n = a_1 + a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1}" },
  {
    id: "d1",
    show: "e1",
    op: "\\text{multiply every term by } r",
    tex: "r\\,S_n = a_1 r + a_1 r^2 + \\cdots + a_1 r^{\\,n-1} + a_1 r^{\\,n}",
  },
  {
    id: "d2",
    show: "e2",
    op: "\\text{subtract: the middle cancels}",
    tex: "S_n - r\\,S_n = a_1 - a_1 r^{\\,n}",
  },
  {
    id: "d3",
    show: "e3",
    op: "\\text{factor each side}",
    tex: "S_n(1 - r) = a_1(1 - r^{\\,n})",
  },
  {
    id: "d4",
    show: "e4",
    tone: "good",
    result: true,
    op: "\\text{divide by } (1 - r),\\ r \\neq 1",
    tex: "S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}",
  },
];

export default function FiniteGeoStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "sequence";

  // Slide 5: dial the number of terms n on a_1 = 1, r = 2, so S_n = 2^n - 1.
  if (mode === "yourturn") {
    const n = Math.max(1, Math.min(6, Math.round(values.n ?? 3)));
    const bars = Array.from({ length: n }, (_, i) => {
      const v = 2 ** i;
      return bar(v, String(v));
    });
    const sum = 2 ** n - 1;
    const spec: SeriesSpec = {
      bars,
      showTotal: true,
      totalLabel: "sum",
      scaleTotal: 63,
      target: 31,
      targetLabel: "31",
      caption: `a1 = 1, r = 2, n = ${n}`,
      aria: `Doubling bars 1, 2, 4, and so on for n = ${n} terms, with a running total of ${sum} and a dashed target line at 31.`,
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"S_n = \\dfrac{1\\,(1 - 2^{\\,n})}{1 - 2} = 2^{\\,n} - 1"}</Tex>
        <Tex>{`n = ${n}, \\quad S_{${n}} = 2^{${n}} - 1 = ${sum}`}</Tex>
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 2: the sum formula derives itself, line by line, beside the example bars.
  if (mode === "derive") {
    const flowReveal = {
      e1: Boolean(reveal.e1),
      e2: Boolean(reveal.e2),
      e3: Boolean(reveal.e3),
      e4: Boolean(reveal.e4),
    };
    const spec: SeriesSpec = {
      bars: GEO_BARS,
      caption: "example: 2, 6, 18, 54  (a1 = 2, r = 3)",
      aria: "Four bars of heights 2, 6, 18, 54, the geometric example whose sum the derivation collapses.",
    };
    const dock = (
      <AlgebraFlow
        steps={DERIVE}
        reveal={flowReveal}
        heading={"\\text{collapse } S_n \\text{ by shift and subtract}"}
        align="start"
      />
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 1: the sequence itself, with the constant ratio and general term.
  if (mode === "sequence") {
    const showBars = Boolean(reveal.bars);
    const spec: SeriesSpec = {
      bars: showBars ? GEO_BARS : [],
      caption: showBars ? "each term is 3 times the one before (r = 3)" : undefined,
      aria: "Four bars of heights 2, 6, 18, 54, each three times the previous: a geometric sequence with ratio 3.",
    };
    const dock = showBars ? (
      <div className="formula-list">
        <Tex>{"a_1 = 2, \\quad r = 3"}</Tex>
        {reveal.ratio && <Tex>{"\\dfrac{6}{2} = \\dfrac{18}{6} = \\dfrac{54}{18} = 3"}</Tex>}
        {reveal.formula && <Tex>{"a_n = a_1\\, r^{\\,n-1}"}</Tex>}
        {reveal.formula && <Tex>{"a_4 = 2 \\cdot 3^{3} = 54"}</Tex>}
      </div>
    ) : null;
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 3: apply the formula to 2 + 6 + 18 + 54, filling the total to 80.
  if (mode === "apply") {
    const showBars = Boolean(reveal.bars);
    const showTotal = Boolean(reveal.total);
    const spec: SeriesSpec = {
      bars: showBars ? GEO_BARS : [],
      showTotal,
      totalLabel: "sum",
      scaleTotal: 80,
      caption: showBars ? "a1 = 2, r = 3, n = 4" : undefined,
      aria: "Bars 2, 6, 18, 54 with a running-total track that fills to 80.",
    };
    const dock = showBars ? (
      <div className="formula-list">
        <Tex>{"a_1 = 2,\\quad r = 3,\\quad n = 4"}</Tex>
        <Tex>{"S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}"}</Tex>
        {reveal.plug && <Tex>{"S_4 = \\dfrac{2\\,(1 - 3^{4})}{1 - 3}"}</Tex>}
        {reveal.simplify && <Tex>{"= \\dfrac{2(1 - 81)}{-2} = \\dfrac{-160}{-2}"}</Tex>}
        {reveal.total && <Tex>{"= 80"}</Tex>}
      </div>
    ) : null;
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 4: a fractional ratio, r = 1/2, so the bars shrink; sum = 15/8.
  if (mode === "shrink") {
    const showBars = Boolean(reveal.bars);
    const showTotal = Boolean(reveal.total);
    const bars: SeriesBar[] = [bar(1, "1"), bar(0.5, "1/2"), bar(0.25, "1/4"), bar(0.125, "1/8")];
    const spec: SeriesSpec = {
      bars: showBars ? bars : [],
      showTotal,
      totalLabel: "sum",
      scaleTotal: 1.875,
      caption: showBars ? "a1 = 1, r = 1/2, n = 4 (bars shrink)" : undefined,
      aria: "Bars 1, 1/2, 1/4, 1/8 shrinking left to right, with a running-total track that fills to 1.875.",
    };
    const dock = showBars ? (
      <div className="formula-list">
        <Tex>{"a_1 = 1,\\quad r = \\tfrac{1}{2},\\quad n = 4"}</Tex>
        <Tex>{"S_n = \\dfrac{a_1(1 - r^{\\,n})}{1 - r}"}</Tex>
        {reveal.plug && <Tex>{"S_4 = \\dfrac{1 - \\left(\\tfrac{1}{2}\\right)^{4}}{1 - \\tfrac{1}{2}}"}</Tex>}
        {reveal.simplify && <Tex>{"= \\dfrac{15/16}{1/2} = \\tfrac{15}{16}\\cdot 2"}</Tex>}
        {reveal.total && <Tex>{"= \\tfrac{15}{8} = 1.875"}</Tex>}
      </div>
    ) : null;
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Unreachable fallback: still return an <svg> so the slot is never empty.
  return frame(
    <SeriesBars spec={{ bars: [], aria: "Geometric series figure." }} />,
    null,
  );
}
