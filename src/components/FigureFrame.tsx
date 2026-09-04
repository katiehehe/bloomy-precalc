import { type CSSProperties, type ReactNode } from "react";

type Props = {
  slot: ReactNode;
  dock?: ReactNode | null;
  /**
   * Keep the dock row even when `dock` is empty, so the figure above does not
   * jump when the formula box later mounts.
   */
  holdDock?: boolean;
  /**
   * Height of the formula-list (largest state of this slide). Opt in per slide:
   * do not use a global 7.5rem on a hug box that never grows.
   */
  reserve?: string;
  /** Hug content. Use only when the dock is present from the first beat and does not grow. */
  fit?: boolean;
  className?: string;
};

/**
 * Shared figure + optional formula dock. When a slide will later grow a dock or
 * caption, pass `reserve` (and `holdDock` if the dock starts empty) so the
 * figure-slot height stays fixed.
 */
export default function FigureFrame({ slot, dock, holdDock = false, reserve, fit = false, className }: Props) {
  const showDock = Boolean(dock) || holdDock;
  const classes = [
    "figure-dock",
    fit ? "figure-dock--fit" : "",
    reserve ? "figure-dock--reserve" : "",
    holdDock ? "figure-dock--hold" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const style = reserve ? ({ ["--dock-reserve"]: reserve } as CSSProperties) : undefined;

  return (
    <section className={`figure-area${showDock ? " has-dock" : ""}${className ? ` ${className}` : ""}`}>
      <div className="figure-frame">
        <div className="figure-slot">{slot}</div>
        {showDock && (
          <div className={classes} style={style}>
            {dock ?? null}
          </div>
        )}
      </div>
    </section>
  );
}
