import Tex from "../../components/Tex";
import RationalGraph, { PartsReadout, type RationalSpec } from "../../components/RationalGraph";
import { formatY } from "../../lib/rational";
import type { LessonFigureProps } from "../types";

const HALF = 5;
const Y_HALF = 80;

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
  const { reveal, values, interactive } = props;
  const x = (values.x ?? 0) / 100;
  const showDock = Boolean(reveal.readout || reveal.parts);
  const showTracer = Boolean(reveal.tracer) || interactive;

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <RationalGraph
            {...props}
            reveal={reveal}
            spec={spec}
            half={HALF}
            yHalf={Y_HALF}
            origin={false}
            showTracer={showTracer}
          />
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">
          {showDock && (
            <>            <div className="formula-list">
              <Tex>{"f(x)=\\dfrac{(x+2)(x-1)}{(x-1)(x-3)}=\\dfrac{x+2}{x-3}"}</Tex>
              {!reveal.parts && showTracer && (
                <Tex>{`x=${x.toFixed(2)},\\quad f(x)=${formatY(spec.f(x))}`}</Tex>
              )}
              {reveal.parts && <PartsReadout spec={spec} x={x} />}
            </div>
            </>
          )}
          </div>
      </div>
    </section>
  );
}
