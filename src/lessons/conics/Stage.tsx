import Tex from "../../components/Tex";
import { formatValue } from "../../lib/trig";
import type { LessonFigureProps } from "../types";
import ConicFigure from "./Figure";

const SUMMARY = [
  { cls: "swatch--circle", name: "Circle", eq: "x^2 + y^2 = r^2", note: "one radius, e = 0" },
  { cls: "swatch--ellipse", name: "Ellipse", eq: "\\tfrac{x^2}{a^2} + \\tfrac{y^2}{b^2} = 1", note: "two axes, 0 < e < 1" },
  { cls: "swatch--parabola", name: "Parabola", eq: "y = a x^2", note: "one branch, e = 1" },
  { cls: "swatch--hyperbola", name: "Hyperbola", eq: "\\tfrac{x^2}{a^2} - \\tfrac{y^2}{b^2} = 1", note: "two branches, e > 1" },
];

export default function ConicStage(props: LessonFigureProps) {
  const { slide, values, reveal, interactive, setValue } = props;
  const mode = slide.mode ?? "circle";
  const showDock = Boolean(reveal.dock || mode === "summary");

  const r = (values.r ?? 250) / 100;
  const a = (values.a ?? 200) / 100;
  const b = (values.b ?? 200) / 100;
  const pa = (values.a ?? 30) / 100;
  const sel = Math.min(3, Math.max(0, Math.round(values.view ?? 0)));

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ConicFigure {...props} />
        </div>
        <div className="figure-dock figure-dock--hold">
          {showDock && (
            <>
            {mode === "circle" && (
              <div className="formula-list">
                <Tex>{"x^2 + y^2 = r^2"}</Tex>
                <Tex>{`x^2 + y^2 = ${formatValue(r * r, 2)} \\quad (r = ${formatValue(r, 2)})`}</Tex>
              </div>
            )}
            {mode === "ellipse" && (
              <div className="formula-list">
                <Tex>{"\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1"}</Tex>
                <Tex>{`a = ${formatValue(a, 2)}, \\quad b = ${formatValue(b, 2)}${Math.abs(a - b) < 0.05 ? " \\;\\Rightarrow\\; \\text{circle}" : ""}`}</Tex>
              </div>
            )}
            {mode === "parabola" && (
              <div className="formula-list">
                <Tex>{`y = a x^2 = ${formatValue(pa, 2)}\\,x^2`}</Tex>
                <Tex>{`\\text{focus } \\left(0, ${formatValue(1 / (4 * pa), 2)}\\right)`}</Tex>
              </div>
            )}
            {mode === "hyperbola" && (
              <div className="formula-list">
                <Tex>{"\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1"}</Tex>
                <Tex>{`\\text{asymptotes } y = \\pm\\frac{b}{a}x = \\pm ${formatValue(b / a, 2)}\\,x`}</Tex>
              </div>
            )}
            {mode === "summary" && (
              <ul className="conic-summary">
                {SUMMARY.map((row, index) => {
                  const active = index === sel;
                  const inner = (
                    <>
                      <span className={`swatch ${row.cls}`} aria-hidden="true" />
                      <span className="conic-summary__name">{row.name}</span>
                      <span className="conic-summary__eq">
                        <Tex>{row.eq}</Tex>
                      </span>
                      <span className="conic-summary__note">{row.note}</span>
                    </>
                  );
                  return (
                    <li key={row.name}>
                      {interactive ? (
                        <button
                          type="button"
                          className={`conic-summary__row${active ? " is-active" : ""}`}
                          aria-pressed={active}
                          onClick={() => setValue("view", () => index)}
                        >
                          {inner}
                        </button>
                      ) : (
                        <div className={`conic-summary__row${active ? " is-active" : ""}`}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            </>
          )}
          </div>
      </div>
    </section>
  );
}
