import Tex from "../../components/Tex";
import RationalGraph, { PartsReadout, type RationalSpec } from "../../components/RationalGraph";
import { formatY } from "../../lib/rational";
import type { LessonFigureProps } from "../types";

const HALF = 5;

const spec: RationalSpec = {
  f: (x) => (x + 2) / (x - 3),
  vas: [3],
  holes: [{ x: 1, y: -1.5 }],
  num: (x) => x + 2,
  den: (x) => x - 3,
  numTex: "x+2",
  denTex: "x-3",
  aria: "Graph of (x+2)/(x-3): a hole at x = 1 and a vertical asymptote at x = 3.",
};

export default function RationalHolesStage(props: LessonFigureProps) {
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
              <Tex>{"f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}=\\dfrac{x+2}{x-3}"}</Tex>
              {!reveal.parts && <Tex>{`x=${x.toFixed(2)},\\quad f(x)=${formatY(spec.f(x))}`}</Tex>}
            </div>
            {reveal.parts && <PartsReadout spec={spec} x={x} />}
          </div>
        )}
      </div>
    </section>
  );
}
