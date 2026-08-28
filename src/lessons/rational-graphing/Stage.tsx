import Tex from "../../components/Tex";
import RationalGraph, { PartsReadout, type RationalSpec } from "../../components/RationalGraph";
import { formatY } from "../../lib/rational";
import type { LessonFigureProps } from "../types";

const HALF = 5;

const spec: RationalSpec = {
  f: (x) => (x * x - 1) / (x * x - 4),
  vas: [-2, 2],
  ha: 1,
  intercepts: [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0.25 },
  ],
  num: (x) => x * x - 1,
  den: (x) => x * x - 4,
  numTex: "x^2-1",
  denTex: "x^2-4",
  aria: "Graph of (x^2-1)/(x^2-4): x-intercepts at plus and minus 1, vertical asymptotes at plus and minus 2, horizontal asymptote y = 1.",
};

export default function RationalGraphingStage(props: LessonFigureProps) {
  const { reveal, values } = props;
  const x = (values.x ?? 0) / 100;
  const showDock = Boolean(reveal.readout || reveal.parts);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <RationalGraph {...props} reveal={reveal} spec={spec} half={HALF} />
        </div>
        {showDock && (
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{"f(x)=\\dfrac{x^2-1}{x^2-4}=\\dfrac{(x-1)(x+1)}{(x-2)(x+2)}"}</Tex>
              {!reveal.parts && <Tex>{`x=${x.toFixed(2)},\\quad f(x)=${formatY(spec.f(x))}`}</Tex>}
            </div>
            {reveal.parts && <PartsReadout spec={spec} x={x} />}
          </div>
        )}
      </div>
    </section>
  );
}
