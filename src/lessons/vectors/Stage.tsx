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
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <VectorFigure {...props} />
        </div>
        {showDock && (
          <div className="figure-dock">
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
              <div className="formula-list">
                <Tex>{`v_x = ${formatValue(v.x, 2)}`}</Tex>
                <Tex>{`v_y = ${formatValue(v.y, 2)}`}</Tex>
                <Tex>{`|v| = \\sqrt{v_x^2 + v_y^2} = ${formatValue(mag, 2)}`}</Tex>
              </div>
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
              <div className="formula-list">
                <Tex>{`v = (${formatValue(v.x, 1)},\\ ${formatValue(v.y, 1)})`}</Tex>
                <Tex>{`|v| = \\sqrt{${formatValue(v.x, 1)}^2 + ${formatValue(v.y, 1)}^2} = ${formatValue(mag, 2)}`}</Tex>
                <Tex>{`\\theta = \\tan^{-1}\\!\\left(\\tfrac{v_y}{v_x}\\right) = ${formatValue(dir, 1)}^\\circ`}</Tex>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
