import type { ReactNode } from "react";
import Tex from "./Tex";

/**
 * Layout for an interactive "watch it hold" slide: one figure (a circle, dial,
 * or wheel) as the main visual, with a compact readout beneath that confirms the
 * relationship numerically as a slider moves. This is deliberately not a
 * step-by-step derivation with operation arrows, so an interactive slide reads
 * as a single picture rather than a picture crowded next to a wall of algebra.
 */
export default function FigureReadout({
  figure,
  lines = [],
  note,
  heading,
  align = "center",
}: {
  figure: ReactNode;
  /** Compact readout lines (KaTeX, rendered in display mode). */
  lines?: string[];
  /** A short confirmation shown with a check mark once both sides agree. */
  note?: string;
  /** Optional caption above the figure (KaTeX). */
  heading?: string;
  /**
   * Vertical anchoring. "center" (default) centres the whole block, which is
   * right for a single figure with a static readout. "top" pins the figure and
   * heading to the top of the panel so readout lines that appear one at a time
   * fill in below without shifting the figure upward.
   */
  align?: "center" | "top";
}) {
  return (
    <div className={`figure-readout${align === "top" ? " figure-readout--top" : ""}`}>
      {heading && (
        <div className="figure-readout__heading">
          <Tex>{heading}</Tex>
        </div>
      )}
      <div className="figure-readout__fig">{figure}</div>
      {(lines.length > 0 || note) && (
        <div className="figure-readout__out">
          {lines.map((line, i) => (
            <div key={i} className="figure-readout__line">
              <Tex display>{line}</Tex>
            </div>
          ))}
          {note && <div className="figure-readout__eq">{`\u2713 ${note}`}</div>}
        </div>
      )}
    </div>
  );
}
