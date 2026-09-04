import Tex from "../../components/Tex";
import type { LessonFigureProps } from "../types";
import ProjectileFigure, { projectilePoint } from "./Figure";

/** Round to two decimals, never render a signed zero, drop a trailing ".00". */
const fmt = (n: number) => {
  const r = Number(n.toFixed(2));
  const v = Object.is(r, -0) ? 0 : r;
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

export default function ProjectileStage(props: LessonFigureProps) {
  const { reveal, value } = props;
  const { x, y, t } = projectilePoint(value);
  const showDock = Boolean(reveal.dock);

  return (
    <section className={`figure-area has-dock`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <ProjectileFigure {...props} />
        </div>
        <div className="figure-dock figure-dock--hold figure-dock--fit">
          {showDock && (
            <>            <div className="formula-list">
              <Tex>{"x(t) = 2t"}</Tex>
              <Tex>{"y(t) = 4t - t^2"}</Tex>
            </div>
            <dl className="values">
              <div>
                <dt>time</dt>
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
            </>
          )}
          </div>
      </div>
    </section>
  );
}
