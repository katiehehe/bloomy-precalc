import Tex from "../../components/Tex";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";
import VectorFigure, { vectorReadout } from "./Figure";

export default function VectorStage(props: LessonFigureProps) {
  const { slide, values, reveal } = props;
  const mode = slide.mode ?? "single";
  const { a, b, v, mag, dir } = vectorReadout(mode, values);

  const showDock =
    mode === "single"
      ? Boolean(reveal.readout)
      : mode === "add"
        ? Boolean(reveal.drawSum)
        : mode === "subtract"
          ? Boolean(reveal.drawDiff)
          : mode === "resultant"
            ? Boolean(reveal.triangle)
            : Boolean(reveal.components);

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorFigure {...props} />
        </div>
        <div className={`figure-dock figure-dock--hold${mode === "add" || mode === "subtract" ? "" : " figure-dock--fit"}`}>
          {showDock && (
            <>
            {mode === "single" && (
              <dl className="values">
                <div>
                  <dt>
                    <Tex>{"|v|"}</Tex>
                  </dt>
                  <dd className="value-primary">{formatValue(mag, 2)}</dd>
                </div>
                <div>
                  <dt>
                    <Tex>{"\\theta"}</Tex>
                  </dt>
                  <dd>{`${formatValue(dir, 1)}\u00b0`}</dd>
                </div>
              </dl>
            )}

            {mode === "components" && (
              <>
                <dl className="values">
                  <div>
                    <dt>
                      <Tex>{"v_x"}</Tex>
                    </dt>
                    <dd className="value-cos">{formatValue(v.x, 2)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tex>{"v_y"}</Tex>
                    </dt>
                    <dd className="value-sin">{formatValue(v.y, 2)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tex>{"|v|"}</Tex>
                    </dt>
                    <dd className="value-primary">{formatValue(mag, 2)}</dd>
                  </div>
                </dl>
                <div className="formula-list">
                  <Tex>{"|v| = \\sqrt{v_x^2 + v_y^2}"}</Tex>
                </div>
              </>
            )}

            {mode === "add" && (
              <div className="formula-list">
                <Tex>{`a = (${formatValue(a.x, 0)},\\ ${formatValue(a.y, 0)})`}</Tex>
                <Tex>{`b = (${formatValue(b.x, 1)},\\ ${formatValue(b.y, 1)})`}</Tex>
                <Tex>{`a + b = (${formatValue(v.x, 1)},\\ ${formatValue(v.y, 1)})`}</Tex>
              </div>
            )}

            {mode === "subtract" && (
              <div className="formula-list">
                <Tex>{`a = (${formatValue(a.x, 0)},\\ ${formatValue(a.y, 0)})`}</Tex>
                <Tex>{`b = (${formatValue(b.x, 1)},\\ ${formatValue(b.y, 1)}), \\quad -b = (${formatValue(-b.x, 1)},\\ ${formatValue(-b.y, 1)})`}</Tex>
                <Tex>{`a - b = a + (-b) = (${formatValue(v.x, 1)},\\ ${formatValue(v.y, 1)})`}</Tex>
              </div>
            )}

            {mode === "resultant" && (
              <>
                <dl className="values values--four">
                  <div>
                    <dt>
                      <Tex>{"v_x"}</Tex>
                    </dt>
                    <dd className="value-cos">{formatValue(v.x, 1)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tex>{"v_y"}</Tex>
                    </dt>
                    <dd className="value-sin">{formatValue(v.y, 1)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tex>{"|v|"}</Tex>
                    </dt>
                    <dd className="value-primary">{formatValue(mag, 2)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tex>{"\\theta"}</Tex>
                    </dt>
                    <dd>{`${formatValue(dir, 1)}\u00b0`}</dd>
                  </div>
                </dl>
                <div className="formula-list">
                  <Tex>{"|v| = \\sqrt{v_x^2 + v_y^2}, \\quad \\theta = \\tan^{-1}\\tfrac{v_y}{v_x}"}</Tex>
                </div>
              </>
            )}
            </>
          )}
          </div>
      </div>
    </section>
  );
}
