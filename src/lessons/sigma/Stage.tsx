import { type ReactNode } from "react";
import FigureFrame from "../../components/FigureFrame";
import Tex from "../../components/Tex";
import SeriesBars, { type SeriesBar, type SeriesSpec } from "../../components/SeriesBars";
import type { LessonFigureProps } from "../types";

function frame(slot: ReactNode, dock: ReactNode, reserve?: string, fit?: boolean) {
  return <FigureFrame slot={slot} dock={dock} reserve={reserve} fit={fit} holdDock={Boolean(reserve)} />;
}

const bar = (value: number, label?: string): SeriesBar => ({
  value,
  label,
  tag: String(value),
});

export default function SigmaStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "meaning";

  // Slide 5: dial the upper limit n on sum_{i=1}^{n} i. The index letter here is
  // i so the learner sees the counter and the upper limit n are different things.
  if (mode === "yourturn") {
    const n = Math.max(1, Math.min(7, Math.round(values.n ?? 3)));
    const bars = Array.from({ length: n }, (_, i) => bar(i + 1));
    const sum = (n * (n + 1)) / 2;
    const spec: SeriesSpec = {
      bars,
      showTotal: true,
      sumMode: "terms",
      axisLabel: "i",
      caption: `i = 1 \\text{ to } ${n}`,
      captionAsTex: true,
      aria: `Bars of heights 1 through ${n} for the sum of i from 1 to ${n}, written out and added to ${sum}.`,
    };
    const dock = (
      <div className="formula-list">
        <Tex>{"\\sum_{i=1}^{n} i = \\dfrac{n(n+1)}{2}"}</Tex>
        <Tex>{`n = ${n}, \\quad \\sum_{i=1}^{${n}} i = ${sum}`}</Tex>
      </div>
    );
    return frame(<SeriesBars spec={spec} />, dock, undefined, true);
  }

  // Watch slides: build the term list, then gate bars / expansion / total. Each
  // example uses a different index letter, because the index is a dummy variable.
  const showBars = Boolean(reveal.bars);
  const showExpand = Boolean(reveal.expand);
  const showTotal = Boolean(reveal.total);

  let allBars: SeriesBar[];
  let idx: string;
  let caption: string;
  let aria: string;
  let dockLines: ReactNode;
  let reserve: string;

  if (mode === "parts") {
    idx = "i";
    allBars = [bar(3, "1"), bar(5, "2"), bar(7, "3"), bar(9, "4")];
    caption = "2i + 1 \\quad (i = 1 \\text{ to } 4)";
    aria = "Bars of heights 3, 5, 7, 9 for the terms of the sum of 2i+1 from i=1 to 4.";
    reserve = "7rem";
    dockLines = (
      <>
        <Tex>{"\\sum_{i=1}^{4} (2i + 1)"}</Tex>
        {showExpand && <Tex>{"= 3 + 5 + 7 + 9"}</Tex>}
        {showTotal && <Tex>{"= 24"}</Tex>}
      </>
    );
  } else if (mode === "constant") {
    idx = "j";
    allBars = [bar(3, "1"), bar(3, "2"), bar(3, "3"), bar(3, "4")];
    caption = "3 \\quad (j = 1 \\text{ to } 4)";
    aria = "Four equal bars of height 3 for the sum of the constant 3 from j=1 to 4.";
    reserve = "9.5rem";
    dockLines = (
      <>
        <Tex>{"\\sum_{j=1}^{4} 3"}</Tex>
        {showExpand && <Tex>{"= 3 + 3 + 3 + 3 = 4 \\cdot 3"}</Tex>}
        {showTotal && (
          <>
            <Tex>{"= 12"}</Tex>
            <Tex>{"\\sum_{j=1}^{n} c = n\\,c"}</Tex>
          </>
        )}
      </>
    );
  } else if (mode === "shift") {
    idx = "m";
    allBars = [bar(1, "0"), bar(2, "1"), bar(4, "2"), bar(8, "3")];
    caption = "2^{m} \\quad (m = 0 \\text{ to } 3)";
    aria = "Bars of heights 1, 2, 4, 8 for the terms of the sum of 2 to the m from m=0 to 3.";
    reserve = "7rem";
    dockLines = (
      <>
        <Tex>{"\\sum_{m=0}^{3} 2^{m}"}</Tex>
        {showExpand && <Tex>{"= 1 + 2 + 4 + 8"}</Tex>}
        {showTotal && <Tex>{"= 15"}</Tex>}
      </>
    );
  } else {
    // meaning
    idx = "k";
    allBars = [bar(1), bar(2), bar(3), bar(4), bar(5)];
    caption = "k \\quad (k = 1 \\text{ to } 5)";
    aria = "Bars of heights 1 through 5 for the sum of k from 1 to 5.";
    reserve = "7rem";
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
    sumMode: "terms",
    axisLabel: showBars ? idx : undefined,
    caption: showBars ? caption : undefined,
    captionAsTex: true,
    reserveCaption: true,
    reserveTotal: true,
    aria,
  };

  return frame(<SeriesBars spec={spec} />, <div className="formula-list">{dockLines}</div>, reserve);
}
