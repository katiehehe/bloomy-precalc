import Tex from "../../components/Tex";
import RationalGraph, { PartsReadout, type RationalSpec } from "../../components/RationalGraph";
import { formatY } from "../../lib/rational";
import type { LessonFigureProps } from "../types";

const HALF = 5;

const SPECS: Record<string, RationalSpec> = {
  horizontal: {
    f: (x) => (2 * x * x + 1) / (x * x + 1),
    ha: 2,
    num: (x) => 2 * x * x + 1,
    den: (x) => x * x + 1,
    numTex: "2x^2+1",
    denTex: "x^2+1",
    aria: "Graph of (2x^2+1)/(x^2+1) leveling toward the horizontal asymptote y = 2.",
  },
  slant: {
    f: (x) => (x * x + 1) / x,
    vas: [0],
    slant: { m: 1, b: 0 },
    num: (x) => x * x + 1,
    den: (x) => x,
    numTex: "x^2+1",
    denTex: "x",
    aria: "Graph of (x^2+1)/x hugging the slant asymptote y = x, with a vertical asymptote at x = 0.",
  },
};

const FORMULA: Record<string, string> = {
  horizontal: "f(x)=\\dfrac{2x^2+1}{x^2+1}",
  slant: "g(x)=\\dfrac{x^2+1}{x}=x+\\dfrac{1}{x}",
};

export default function RationalAsymptotesStage(props: LessonFigureProps) {
  const { reveal, slide, values } = props;
  const mode = slide.mode ?? "horizontal";
  const spec = SPECS[mode] ?? SPECS.horizontal;
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
              <Tex>{FORMULA[mode] ?? FORMULA.horizontal}</Tex>
              {!reveal.parts && <Tex>{`x=${x.toFixed(2)},\\quad y=${formatY(spec.f(x))}`}</Tex>}
              {reveal.parts && <PartsReadout spec={spec} x={x} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
