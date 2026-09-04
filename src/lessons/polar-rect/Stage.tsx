import Tex from "../../components/Tex";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";
import PolarFigure, { polarPoint } from "../polar/Figure";

/**
 * Polar-rectangular conversion reuses the Base Camp polar figure. The convert,
 * worked, and play modes all draw the same right triangle (legs x and y,
 * hypotenuse r, swept angle theta), so we hand the shared figure the whole
 * props bag and pass the reveal flags through to light up its overlays.
 */
export default function PolarRectStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "play";
  const { r, theta, x, y } = polarPoint(mode, values);
  const showDock = Boolean(reveal.coords || reveal.formulas);

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <PolarFigure {...props} reveal={reveal} />
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">
          {showDock && (
            <>            <dl className="values values--four">
              <div>
                <dt>
                  <Tex>{"r"}</Tex>
                </dt>
                <dd className="value-sin">{formatValue(r, 2)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"\\theta"}</Tex>
                </dt>
                <dd>{`${formatValue(theta, 1)}\u00b0`}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"x"}</Tex>
                </dt>
                <dd className="value-cos">{formatValue(x, 2)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"y"}</Tex>
                </dt>
                <dd className="value-sin">{formatValue(y, 2)}</dd>
              </div>
            </dl>
            {reveal.formulas && (
              <div className="formula-list">
                {slide.id === "rect-to-polar" ? (
                  <Tex>{"r = \\sqrt{x^2 + y^2}, \\quad \\theta = \\tan^{-1}\\tfrac{y}{x}"}</Tex>
                ) : (
                  <Tex>{"x = r\\cos\\theta, \\quad y = r\\sin\\theta"}</Tex>
                )}
              </div>
            )}
            </>
          )}
          </div>
      </div>
    </section>
  );
}
