import { type ReactNode } from "react";
import FigureFrame from "../../components/FigureFrame";
import Tex from "../../components/Tex";
import SeriesBars, { type SeriesBar, type SeriesSpec } from "../../components/SeriesBars";
import type { LessonFigureProps } from "../types";

function frame(slot: ReactNode, dock: ReactNode, reserve?: string, fit?: boolean) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} fit={fit} holdDock={Boolean(reserve)} />;
}

const bar = (value: number, tag: string, tone: SeriesBar["tone"] = "primary"): SeriesBar => ({
  value,
  tag,
  tone,
});

/** Compact number formatting: integers stay integers, else up to 3 decimals. */
function fmt(v: number): string {
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  return Number(v.toFixed(3)).toString();
}

export default function InfiniteGeoStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "partials";

  // Slide 5: fix a_1 = 1, let r = values.r / 10, and draw 1, r, r^2, r^3, r^4
  // with a dashed line at the sum S = 1 / (1 - r).
  if (mode === "yourturn") {
    const v = Math.max(1, Math.min(9, Math.round(values.r ?? 2)));
    const r = v / 10;
    const S = 1 / (1 - r);
    const powers = [1, r, r * r, r * r * r, r * r * r * r];
    const labels = ["1", "r", "r\u00b2", "r\u00b3", "r\u2074"];
    const bars: SeriesBar[] = powers.map((val, i) => ({
      value: val,
      label: labels[i],
      tag: fmt(val),
      tone: "primary",
    }));
    const spec: SeriesSpec = {
      bars,
      showTotal: true,
      totalLabel: "sum so far",
      scaleTotal: 10,
      target: S,
      targetLabel: `S = ${fmt(S)}`,
      caption: `a_1 = 1,\\quad r = ${r.toFixed(1)}`,
      captionAsTex: true,
      aria: `Bars of heights 1, ${fmt(r)}, ${fmt(r * r)}, ${fmt(r * r * r)}, ${fmt(
        r * r * r * r,
      )} for a geometric series with a_1 = 1 and r = ${r.toFixed(
        1,
      )}, with a dashed target line at the sum S = ${fmt(S)}.`,
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"S = \\dfrac{a_1}{1 - r} = \\dfrac{1}{1 - r}"}</Tex>
        <Tex>{`r = ${r.toFixed(1)}, \\quad S = \\dfrac{1}{1 - ${r.toFixed(1)}} = ${fmt(S)}`}</Tex>
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock, undefined, true);
  }

  // Watch slides: reveal.bars shows the terms; t1..t5 step the running total
  // (the partial sums S_1..S_5) one term at a time.
  const showBars = Boolean(reveal.bars);
  const through = reveal.t5 ? 5 : reveal.t4 ? 4 : reveal.t3 ? 3 : reveal.t2 ? 2 : reveal.t1 ? 1 : 0;
  const showTotal = through > 0;

  // Slide 2: contrast a shrinking ratio (converges) with a growing one (diverges).
  if (mode === "condition") {
    const shrinking = !reveal.grow;
    const barsShrink = [
      bar(1, "1"),
      bar(1 / 2, "1/2"),
      bar(1 / 4, "1/4"),
      bar(1 / 8, "1/8"),
      bar(1 / 16, "1/16"),
    ];
    const barsGrow = [
      bar(1, "1", "accent"),
      bar(2, "2", "accent"),
      bar(4, "4", "accent"),
      bar(8, "8", "accent"),
      bar(16, "16", "accent"),
    ];
    const spec: SeriesSpec = {
      bars: showBars ? (shrinking ? barsShrink : barsGrow) : [],
      showTotal: false,
      caption: showBars
        ? shrinking
          ? "r = 1/2: terms shrink toward 0 (converges)"
          : "r = 2: terms explode (diverges)"
        : undefined,
      aria: shrinking
        ? "Bars of heights 1, 1/2, 1/4, 1/8, 1/16 shrinking toward zero for a convergent series with r = 1/2."
        : "Bars of heights 1, 2, 4, 8, 16 growing without bound for a divergent series with r = 2.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"a_1 + a_1 r + a_1 r^2 + \\cdots"}</Tex>
        {reveal.cond && <Tex>{"\\text{converges} \\iff |r| < 1"}</Tex>}
        {reveal.cond && <Tex>{"S = \\dfrac{a_1}{1 - r} \\quad (|r| < 1)"}</Tex>}
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock, "7.5rem");
  }

  let allBars: SeriesBar[];
  let target: number | null;
  let targetLabel: string | undefined;
  let scaleTotal: number;
  let caption: string;
  let aria: string;
  let dockLines: ReactNode;

  if (mode === "worked") {
    allBars = [bar(3, "3"), bar(1, "1"), bar(1 / 3, "1/3"), bar(1 / 9, "1/9"), bar(1 / 27, "1/27")];
    target = 4.5;
    targetLabel = "4.5";
    scaleTotal = 5;
    caption = "3 + 1 + 1/3 + 1/9 + ... (r = 1/3)";
    aria =
      "Bars of heights 3, 1, 1/3, 1/9, 1/27 shrinking for the series 3 + 1 + 1/3 + ..., with a dashed target line at the sum 4.5.";
    dockLines = (
      <>
        <Tex>{"3 + 1 + \\tfrac{1}{3} + \\tfrac{1}{9} + \\cdots"}</Tex>
        <Tex>{"a_1 = 3, \\quad r = \\tfrac{1}{3}"}</Tex>
        {through >= 5 && <Tex>{"S = \\dfrac{3}{1 - \\tfrac{1}{3}} = \\dfrac{9}{2} = 4.5"}</Tex>}
      </>
    );
  } else if (mode === "diverge") {
    allBars = [
      bar(1, "1", "accent"),
      bar(1, "1", "accent"),
      bar(1, "1", "accent"),
      bar(1, "1", "accent"),
      bar(1, "1", "accent"),
    ];
    target = null;
    targetLabel = undefined;
    scaleTotal = 6;
    caption = "1 + 1 + 1 + 1 + ... (r = 1)";
    aria =
      "Five equal bars of height 1 for the series 1 + 1 + 1 + ..., whose partial sums 1, 2, 3, 4, 5 climb with no limit line.";
    dockLines = (
      <>
        <Tex>{"1 + 1 + 1 + 1 + \\cdots \\quad (r = 1)"}</Tex>
        {through >= 5 && (
          <Tex>{"\\dfrac{a_1}{1 - r} = \\dfrac{1}{1 - 1} = \\dfrac{1}{0}\\ \\text{undefined}"}</Tex>
        )}
      </>
    );
  } else {
    // partials: 1/2 + 1/4 + 1/8 + ...
    allBars = [
      bar(1 / 2, "1/2"),
      bar(1 / 4, "1/4"),
      bar(1 / 8, "1/8"),
      bar(1 / 16, "1/16"),
      bar(1 / 32, "1/32"),
    ];
    target = 1;
    targetLabel = "1";
    scaleTotal = 1.1;
    caption = "1/2 + 1/4 + 1/8 + ... (r = 1/2)";
    aria =
      "Bars of heights 1/2, 1/4, 1/8, 1/16, 1/32 halving each step, with a dashed target line at the limit 1.";
    const partialTex = ["\\tfrac{1}{2}", "\\tfrac{3}{4}", "\\tfrac{7}{8}", "\\tfrac{15}{16}", "\\tfrac{31}{32}"];
    dockLines = (
      <>
        <Tex>{"\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\tfrac{1}{16} + \\cdots"}</Tex>
        {through > 0 && <Tex>{`S_{${through}} = ${partialTex[through - 1]}`}</Tex>}
        {through >= 5 && <Tex>{"S = 1"}</Tex>}
      </>
    );
  }

  const spec: SeriesSpec = {
    bars: showBars ? allBars : [],
    activeThrough: showTotal ? through : undefined,
    showTotal,
    totalLabel: "sum so far",
    scaleTotal,
    target: showTotal ? target : null,
    targetLabel: showTotal ? targetLabel : undefined,
    caption: showBars ? caption : undefined,
    reserveCaption: true,
    reserveTotal: true,
    aria,
  };

  const reserve = mode === "diverge" ? "6.5rem" : "7.5rem";
  return frame(<SeriesBars spec={spec} />, <div className="formula-list">{dockLines}</div>, reserve);
}
