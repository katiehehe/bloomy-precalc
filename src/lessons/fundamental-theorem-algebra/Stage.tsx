import Tex from "../../components/Tex";
import RootsPlane, { type RootsSpec } from "../../components/RootsPlane";
import type { LessonFigureProps } from "../types";

const HALF = 4;

const spec: RootsSpec = {
  degree: 3,
  real: [{ re: 1, im: 0 }],
  pairs: [{ re: 0, im: 2 }],
  aria: "Complex plane showing the three roots of x^3 - x^2 + 4x - 4: a real root at 1 and the conjugate pair 2i and -2i.",
};

export default function FtaStage(props: LessonFigureProps) {
  const { reveal } = props;
  const realCount = spec.real.length;
  const nonReal = spec.pairs.length * 2;
  const total = realCount + nonReal;
  const showDock = Boolean(reveal.readout);

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <RootsPlane {...props} reveal={reveal} spec={spec} half={HALF} />
        </div>
        <div className="figure-dock figure-dock--hold">
          {showDock && (
            <>            <div className="formula-list">
              <Tex>{"p(x)=x^3-x^2+4x-4=(x-1)(x^2+4)"}</Tex>
              <Tex>{`\\text{roots: } ${total} = ${realCount}\\text{ real} + ${nonReal}\\text{ non-real}`}</Tex>
            </div>
            </>
          )}
          </div>
      </div>
    </section>
  );
}
