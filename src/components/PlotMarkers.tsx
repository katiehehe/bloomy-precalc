import type { PlotState } from "../lessons/types";
import type { Plane } from "./Plane";

/**
 * Renders the interactive pieces of a "plot" (click-a-point) question on a
 * coordinate plane: the learner's most recent click, and, once solved, the
 * exact spot where the point belonged (with an optional label). Labels are
 * plain text, so pass unicode like "\u03b8 = 45\u00b0" rather than TeX.
 */
export default function PlotMarkers({ plane, plot }: { plane: Plane; plot: PlotState }) {
  const { guess, cursor, target, solved, label } = plot;
  const tx = plane.sx(target.x);
  const ty = plane.sy(target.y);

  return (
    <>
      {cursor && !solved && (
        <g aria-hidden="true">
          <circle cx={plane.sx(cursor.x)} cy={plane.sy(cursor.y)} r={11} className="plot-cursor" />
          <line x1={plane.sx(cursor.x) - 8} y1={plane.sy(cursor.y)} x2={plane.sx(cursor.x) + 8} y2={plane.sy(cursor.y)} className="plot-cursor-x" />
          <line x1={plane.sx(cursor.x)} y1={plane.sy(cursor.y) - 8} x2={plane.sx(cursor.x)} y2={plane.sy(cursor.y) + 8} className="plot-cursor-x" />
        </g>
      )}
      {guess && !solved && (
        <g aria-hidden="true">
          <circle cx={plane.sx(guess.x)} cy={plane.sy(guess.y)} r={9} className="plot-guess" />
          <line x1={plane.sx(guess.x) - 5} y1={plane.sy(guess.y)} x2={plane.sx(guess.x) + 5} y2={plane.sy(guess.y)} className="plot-guess-x" />
          <line x1={plane.sx(guess.x)} y1={plane.sy(guess.y) - 5} x2={plane.sx(guess.x)} y2={plane.sy(guess.y) + 5} className="plot-guess-x" />
        </g>
      )}
      {solved && (
        <g aria-hidden="true">
          <circle cx={tx} cy={ty} r={13} className="plot-target-ring" />
          <circle cx={tx} cy={ty} r={7.5} className="plot-target" />
          {label && (
            <text x={tx} y={ty - 16} textAnchor="middle" className="plot-target-label">
              {label}
            </text>
          )}
        </g>
      )}
    </>
  );
}
