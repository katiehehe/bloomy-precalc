import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";
import ParamGraphFigure, { graphPoint } from "./Figure";

/** The five whole-number table rows the lesson builds and connects. */
const ROWS = [-2, -1, 0, 1, 2].map((t) => ({ t, x: t * t - 1, y: t }));

export default function ParamGraphStage(props: LessonFigureProps) {
  const { reveal, value } = props;
  const { t } = graphPoint(value);
  const showDock = Boolean(reveal.dock);
  const showTable = Boolean(reveal.table);
  // Highlight the row the live point is sitting on (within a quarter step).
  const nearRow = ROWS.reduce(
    (best, r) => (Math.abs(t - r.t) < Math.abs(t - best) ? r.t : best),
    ROWS[0].t,
  );
  const onRow = Math.abs(t - nearRow) < 0.25;

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ParamGraphFigure {...props} />
        </div>
        {showDock && (
          <div className="figure-dock figure-dock--fit">
            <div className="formula-list">
              <Tex>{"x(t) = t^2 - 1"}</Tex>
              <Tex>{"y(t) = t"}</Tex>
            </div>
            {showTable && (
              <table className="param-graph-table">
                <thead>
                  <tr>
                    <th>t</th>
                    <th>x = t² - 1</th>
                    <th>y = t</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => {
                    const live = onRow && r.t === nearRow;
                    return (
                      <tr key={r.t} className={live ? "is-live" : undefined}>
                        <td>{r.t}</td>
                        <td>{r.x}</td>
                        <td>{r.y}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
