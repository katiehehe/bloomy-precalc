import Tex from "../../components/Tex";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";
import ParametricFigure, { parametricPoint } from "./Figure";

const EQ: Record<string, { x: string; y: string; elim: string }> = {
  line: { x: "x(t) = 2t", y: "y(t) = 3t", elim: "y = \\tfrac{3}{2}x" },
  circle: { x: "x = \\cos t", y: "y = \\sin t", elim: "x^2 + y^2 = 1" },
  lissajous: { x: "x = \\sin 2t", y: "y = \\sin 3t", elim: "" },
  free: { x: "x", y: "y", elim: "" },
};

export default function ParametricStage(props: LessonFigureProps) {
  const { slide, value, values, reveal } = props;
  const mode = slide.mode ?? "lissajous";
  const eq = EQ[mode] ?? EQ.lissajous;
  const { x, y, t } = parametricPoint(mode, value, values);
  const showDock = Boolean(reveal.components || reveal.dock);
  const showElim = Boolean(reveal.eliminate && eq.elim);

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ParametricFigure {...props} />
        </div>
        {showDock && (
          <div className="figure-dock">
            <dl className="values">
              <div>
                <dt>
                  <Tex>{eq.x}</Tex>
                </dt>
                <dd className="value-cos">{formatValue(x, 2)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{eq.y}</Tex>
                </dt>
                <dd className="value-sin">{formatValue(y, 2)}</dd>
              </div>
              <div>
                <dt>{mode === "free" ? "coordinates" : "parameter"}</dt>
                <dd>{mode === "free" ? "free x, y" : `t = ${t.toFixed(2)}`}</dd>
              </div>
            </dl>
            {showElim && (
              <p className="dock-note">
                Same curve in <em>x</em> and <em>y</em>: <Tex>{eq.elim}</Tex>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
