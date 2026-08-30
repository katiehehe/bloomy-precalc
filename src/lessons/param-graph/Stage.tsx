import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";
import ParamGraphFigure, { graphPoint } from "./Figure";

/** Round to two decimals, never render a signed zero, drop a trailing ".00". */
const fmt = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

/** The five whole-number table rows the lesson builds and connects. */
const ROWS = [-2, -1, 0, 1, 2].map((t) => ({ t, x: t * t - 1, y: t }));

export default function ParamGraphStage(props: LessonFigureProps) {
  const { reveal, value } = props;
  const { x, y, t } = graphPoint(value);
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
          <div className="figure-dock">
            <div className="formula-list">
              <Tex>{"x(t) = t^2 - 1"}</Tex>
              <Tex>{"y(t) = t"}</Tex>
            </div>
            {showTable && (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr style={{ color: "var(--muted)", fontSize: "0.74rem" }}>
                    <th style={{ padding: "0.15rem 0.3rem", fontWeight: 600 }}>t</th>
                    <th style={{ padding: "0.15rem 0.3rem", fontWeight: 600 }}>x = t² - 1</th>
                    <th style={{ padding: "0.15rem 0.3rem", fontWeight: 600 }}>y = t</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => {
                    const live = onRow && r.t === nearRow;
                    return (
                      <tr
                        key={r.t}
                        style={{
                          background: live ? "var(--primary)" : "transparent",
                          color: live ? "var(--surface)" : "var(--ink)",
                          fontWeight: live ? 700 : 500,
                        }}
                      >
                        <td style={{ padding: "0.18rem 0.3rem", borderTop: "1px solid var(--line)" }}>{r.t}</td>
                        <td style={{ padding: "0.18rem 0.3rem", borderTop: "1px solid var(--line)" }}>{r.x}</td>
                        <td style={{ padding: "0.18rem 0.3rem", borderTop: "1px solid var(--line)" }}>{r.y}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <dl className="values">
              <div>
                <dt>parameter</dt>
                <dd className="value-primary">{`t = ${fmt(t)}`}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"x(t)"}</Tex>
                </dt>
                <dd className="value-cos">{fmt(x)}</dd>
              </div>
              <div>
                <dt>
                  <Tex>{"y(t)"}</Tex>
                </dt>
                <dd className="value-sin">{fmt(y)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
