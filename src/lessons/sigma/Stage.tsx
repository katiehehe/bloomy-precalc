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

const bar = (value: number, label?: string): SeriesBar => ({
  value,
  label,
  tag: String(value),
});

export default function SigmaStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "meaning";

  // Slide 5: dial the upper limit n on sum_{k=1}^{n} k.
  if (mode === "yourturn") {
    const n = Math.max(1, Math.min(7, Math.round(values.n ?? 3)));
    const bars = Array.from({ length: n }, (_, i) => bar(i + 1));
    const sum = (n * (n + 1)) / 2;
    const spec: SeriesSpec = {
      bars,
      showTotal: true,
      totalLabel: "sum",
      scaleTotal: 28,
      target: 15,
      targetLabel: "15",
      caption: `k = 1 to ${n}`,
      aria: `Bars of heights 1 through ${n} for the sum of k from 1 to ${n}, with a running total of ${sum} and a dashed target line at 15.`,
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}"}</Tex>
        <Tex>{`n = ${n}, \\quad \\sum_{k=1}^{${n}} k = ${sum}`}</Tex>
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock);
  }

  // Watch slides: build the term list, then gate bars / expansion / total.
  const showBars = Boolean(reveal.bars);
  const showExpand = Boolean(reveal.expand);
  const showTotal = Boolean(reveal.total);

  let allBars: SeriesBar[];
  let scaleTotal: number;
  let caption: string;
  let aria: string;
  let dockLines: ReactNode;

  if (mode === "parts") {
    allBars = [bar(3, "1"), bar(5, "2"), bar(7, "3"), bar(9, "4")];
    scaleTotal = 24;
    caption = "term = 2k + 1, for k = 1 to 4";
    aria = "Bars of heights 3, 5, 7, 9 for the terms of the sum of 2k+1 from k=1 to 4.";
    dockLines = (
      <>
        <Tex>{"\\sum_{k=1}^{4} (2k + 1)"}</Tex>
        {showExpand && <Tex>{"= 3 + 5 + 7 + 9"}</Tex>}
        {showTotal && <Tex>{"= 24"}</Tex>}
      </>
    );
  } else if (mode === "constant") {
    allBars = [bar(3, "1"), bar(3, "2"), bar(3, "3"), bar(3, "4")];
    scaleTotal = 12;
    caption = "term = 3, for k = 1 to 4";
    aria = "Four equal bars of height 3 for the sum of the constant 3 from k=1 to 4.";
    dockLines = (
      <>
        <Tex>{"\\sum_{k=1}^{4} 3"}</Tex>
        {showExpand && <Tex>{"= 3 + 3 + 3 + 3 = 4 \\cdot 3"}</Tex>}
        {showTotal && (
          <>
            <Tex>{"= 12"}</Tex>
            <Tex>{"\\sum_{k=1}^{n} c = n\\,c"}</Tex>
          </>
        )}
      </>
    );
  } else if (mode === "shift") {
    allBars = [bar(1, "0"), bar(2, "1"), bar(4, "2"), bar(8, "3")];
    scaleTotal = 15;
    caption = "term = 2^k, for k = 0 to 3";
    aria = "Bars of heights 1, 2, 4, 8 for the terms of the sum of 2^k from k=0 to 3.";
    dockLines = (
      <>
        <Tex>{"\\sum_{k=0}^{3} 2^{k}"}</Tex>
        {showExpand && <Tex>{"= 1 + 2 + 4 + 8"}</Tex>}
        {showTotal && <Tex>{"= 15"}</Tex>}
      </>
    );
  } else {
    // meaning
    allBars = [bar(1), bar(2), bar(3), bar(4), bar(5)];
    scaleTotal = 15;
    caption = "term = k, for k = 1 to 5";
    aria = "Bars of heights 1 through 5 for the sum of k from 1 to 5.";
    dockLines = (
      <>
        <Tex>{"\\sum_{k=1}^{5} k"}</Tex>
        {showExpand && <Tex>{"= 1 + 2 + 3 + 4 + 5"}</Tex>}
        {showTotal && <Tex>{"= 15"}</Tex>}
      </>
    );
  }

  const spec: SeriesSpec = {
    bars: showBars ? allBars : [],
    showTotal,
    totalLabel: "sum",
    scaleTotal,
    caption: showBars ? caption : undefined,
    aria,
  };

  return frame(<SeriesBars spec={spec} />, <div className="formula-list">{dockLines}</div>);
}
