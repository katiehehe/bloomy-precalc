import { motion } from "motion/react";
import UnitCircleFigure, { type Overlays } from "../../components/UnitCircleFigure";
import WaveGraphs from "../../components/WaveGraphs";
import { formatValue, quadrantOf, toRadians } from "../../lib/trig";
import type { LessonFigureProps } from "../types";

export default function UnitCircleStage({
  value: angle,
  slide,
  reveal,
  drawProgress,
  interactive,
  onValue,
}: LessonFigureProps) {
  const sin = Math.sin(toRadians(angle));
  const cos = Math.cos(toRadians(angle));
  // The reveal bag is a superset of Overlays for this lesson (see slides.ts base).
  const overlays = reveal as Overlays;
  const showReadout = overlays.coords || overlays.triangleLabels;
  const showIdentity = overlays.identityBar;
  const showWaves = overlays.waves;
  const hasDock = showReadout || showIdentity || showWaves;

  return (
    <section className={`figure-area has-dock${showWaves ? " has-waves" : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">
          <UnitCircleFigure
            angle={angle}
            restricted={slide.mode === "triangle"}
            overlays={overlays}
            legProgress={drawProgress}
            interactive={interactive}
            onAngle={onValue}
          />
        </div>
        <div className="figure-dock figure-dock--hold">
            {showReadout && (
              <dl className="values">
                <div>
                  <dt>cos θ = x</dt>
                  <dd className="value-cos">{formatValue(cos)}</dd>
                </div>
                <div>
                  <dt>sin θ = y</dt>
                  <dd className="value-sin">{formatValue(sin)}</dd>
                </div>
                <div>
                  <dt>{overlays.triangleLabels ? "hypotenuse" : "quadrant"}</dt>
                  <dd>{overlays.triangleLabels ? "1" : quadrantOf(angle)}</dd>
                </div>
              </dl>
            )}
            {showIdentity && (
              <div className="identity">
                <div className="identity__bar">
                  <motion.span
                    className="identity__cos"
                    animate={{ flexGrow: Math.max(cos ** 2, 0.001) }}
                    transition={{ duration: 0.08 }}
                  />
                  <motion.span
                    className="identity__sin"
                    animate={{ flexGrow: Math.max(sin ** 2, 0.001) }}
                    transition={{ duration: 0.08 }}
                  />
                </div>
                <p>
                  <span className="value-cos">cos²θ = {formatValue(cos ** 2)}</span>
                  <span className="value-sin">sin²θ = {formatValue(sin ** 2)}</span>
                  <strong>sum = {formatValue(cos ** 2 + sin ** 2)}</strong>
                </p>
              </div>
            )}
            {showWaves && <WaveGraphs angle={angle} />}
          </div>
      </div>
    </section>
  );
}
