import { type ReactNode } from "react";
import Tex from "../../components/Tex";
import SeriesBars, { type SeriesBar, type SeriesSpec } from "../../components/SeriesBars";
import type { LessonFigureProps } from "../types";

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

const bar = (value: number, tone?: SeriesBar["tone"]): SeriesBar => ({
  value,
  tag: String(value),
  tone,
});

export default function ArithSeriesStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "sequence";

  // Slide 5: dial n on the sum of the first n odd numbers (S_n = n^2).
  if (mode === "yourturn") {
    const n = Math.max(1, Math.min(8, Math.round(values.n ?? 3)));
    const bars = Array.from({ length: n }, (_, i) => bar(2 * (i + 1) - 1));
    const sum = n * n;
    const spec: SeriesSpec = {
      bars,
      showTotal: true,
      sumMode: "terms",
      caption: `first ${n} odd number${n === 1 ? "" : "s"}`,
      aria: `Bars for the first ${n} odd numbers, written out and added to ${sum}.`,
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"S_n = \\dfrac{n}{2}\\,(a_1 + a_n) = n^2"}</Tex>
        <Tex>{`n = ${n}, \\quad S_{${n}} = ${sum}`}</Tex>
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  const showBars = Boolean(reveal.bars);

  // Slide 1: the arithmetic sequence 3, 7, 11, 15, 19 and its term formula.
  if (mode === "sequence") {
    const allBars = [bar(3), bar(7), bar(11), bar(15), bar(19)];
    const showStep = Boolean(reveal.step);
    const showNth = Boolean(reveal.nth);
    const spec: SeriesSpec = {
      bars: showBars ? allBars : [],
      focus: showNth ? 5 : undefined,
      caption: showBars ? "each term adds d = 4" : undefined,
      aria: "Five rising bars of heights 3, 7, 11, 15, 19, an arithmetic sequence with common difference 4.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"a_n = a_1 + (n-1)d"}</Tex>
        {showStep && <Tex>{"d = 7 - 3 = 11 - 7 = 4"}</Tex>}
        {showNth && <Tex>{"a_5 = 3 + (5-1)\\cdot 4 = 19"}</Tex>}
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 2: Gauss pairing on the small case 1..6, tinted into pairs.
  if (mode === "pairing") {
    const showPairs = Boolean(reveal.pairs);
    const showFormula = Boolean(reveal.formula);
    const paired: SeriesBar[] = [
      bar(1, showPairs ? "accent" : "primary"),
      bar(2, showPairs ? "teal" : "primary"),
      bar(3, showPairs ? "muted" : "primary"),
      bar(4, showPairs ? "muted" : "primary"),
      bar(5, showPairs ? "teal" : "primary"),
      bar(6, showPairs ? "accent" : "primary"),
    ];
    const spec: SeriesSpec = {
      bars: showBars ? paired : [],
      showTotal: showFormula,
      sumMode: "terms",
      caption: showBars ? "pair the first and last term" : undefined,
      aria: "Six bars of heights 1 through 6. The first and last are paired inward, each pair summing to 7.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"1 + 2 + 3 + 4 + 5 + 6"}</Tex>
        {showPairs && <Tex>{"= (1+6) + (2+5) + (3+4) = 7 + 7 + 7"}</Tex>}
        {showFormula && (
          <>
            <Tex>{"= 3 \\cdot 7 = 21"}</Tex>
            <Tex>{"S_n = \\dfrac{n}{2}\\,(a_1 + a_n)"}</Tex>
            <Tex>{"1 + \\cdots + 100 = \\dfrac{100}{2}(1 + 100) = 5050"}</Tex>
          </>
        )}
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 3: apply S_n = (n/2)(a_1 + a_n) to 3 + 7 + 11 + 15 + 19 = 55.
  if (mode === "apply") {
    const allBars = [bar(3), bar(7), bar(11), bar(15), bar(19)];
    const showPlug = Boolean(reveal.plug);
    const showTotal = Boolean(reveal.total);
    const spec: SeriesSpec = {
      bars: showBars ? allBars : [],
      showTotal,
      sumMode: "terms",
      caption: showBars ? "a1 = 3, d = 4, n = 5" : undefined,
      aria: "Five bars of heights 3, 7, 11, 15, 19, written out and added to 55.",
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"S_n = \\dfrac{n}{2}\\,(a_1 + a_n)"}</Tex>
        {showPlug && <Tex>{"S_5 = \\dfrac{5}{2}\\,(3 + 19)"}</Tex>}
        {showTotal && (
          <>
            <Tex>{"= \\dfrac{5}{2}\\,(22) = 55"}</Tex>
            <Tex>{"S_n = \\dfrac{n}{2}\\,(2a_1 + (n-1)d)"}</Tex>
          </>
        )}
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Slide 4 (mode "worked"): the first ten multiples of 5, summing to 275.
  const allBars = [bar(5), bar(10), bar(15), bar(20), bar(25), bar(30), bar(35), bar(40), bar(45), bar(50)];
  const showPlug = Boolean(reveal.plug);
  const showTotal = Boolean(reveal.total);
  const spec: SeriesSpec = {
    bars: showBars ? allBars : [],
    showTotal,
    sumMode: "terms",
    caption: showBars ? "a1 = 5, d = 5, n = 10" : undefined,
    aria: "Ten bars of heights 5, 10, up to 50, written out and added to 275.",
  };
  const dock = (
    <div className="formula-list">
      <Tex>{"a_1 = 5, \\quad d = 5, \\quad n = 10"}</Tex>
      {showPlug && (
        <>
          <Tex>{"a_{10} = 5 + (10-1)\\cdot 5 = 50"}</Tex>
          <Tex>{"S_{10} = \\dfrac{10}{2}\\,(5 + 50)"}</Tex>
        </>
      )}
      {showTotal && <Tex>{"= 5 \\cdot 55 = 275"}</Tex>}
    </div>
  );
  return frame(<SeriesBars spec={spec} />, dock);
}
