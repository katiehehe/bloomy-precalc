import type { Beat, ParamSpec, Reveal, Slide } from "./types";

/**
 * The interactive parameters for a slide. Legacy slides that use
 * `start` / `range` / `control` are normalized into a single param keyed
 * `"value"` so the player only ever deals with the multi-parameter shape.
 */
export function paramsOf(slide: Slide): ParamSpec[] {
  if (slide.params && slide.params.length) return slide.params;
  const range = slide.range ?? [0, 100];
  return [
    {
      key: "value",
      label: slide.control?.label ?? "Value",
      min: range[0],
      max: range[1],
      start: slide.start ?? range[0],
      step: slide.control?.step,
      format: slide.control?.format ?? ((v) => String(Math.round(v))),
    },
  ];
}

/** Key of the primary parameter (the one arrow keys drive). */
export function primaryKey(slide: Slide) {
  return paramsOf(slide)[0].key;
}

/** Normalize a beat target into a partial record keyed by parameter. */
function normalizeTo(to: Beat["to"], key0: string): Record<string, number> {
  if (to == null) return {};
  if (typeof to === "number") return { [key0]: to };
  return to;
}

/** Every parameter at its starting value. */
export function startValues(slide: Slide): Record<string, number> {
  const values: Record<string, number> = {};
  for (const p of paramsOf(slide)) values[p.key] = p.start;
  return values;
}

/** All parameter values after applying every beat up to and including `cue`. */
export function valuesAt(slide: Slide, cue: number): Record<string, number> {
  const key0 = primaryKey(slide);
  const values = startValues(slide);
  for (let i = 0; i <= cue; i++) {
    const target = normalizeTo(slide.beats[i]?.to, key0);
    for (const k in target) values[k] = target[k];
  }
  return values;
}

/** Primary scalar at a cue (convenience for single-parameter figures). */
export function valueAt(slide: Slide, cue: number): number {
  return valuesAt(slide, cue)[primaryKey(slide)];
}

/** Whether a beat animates: it draws, or it moves at least one parameter meaningfully. */
export function beatMoves(beat: Beat | undefined, from: Record<string, number>, slide: Slide) {
  if (!beat) return false;
  if (beat.draw) return true;
  const target = normalizeTo(beat.to, primaryKey(slide));
  for (const k in target) {
    if (Math.abs(target[k] - (from[k] ?? 0)) > 0.5) return true;
  }
  return false;
}

/** Accumulated reveal flags at `cue`. A drawing beat holds its reveal until it animates. */
export function revealAt(slide: Slide, cue: number, phase: "narrating" | "animating" | "done"): Reveal {
  let next: Reveal = { ...slide.baseReveal };
  if (cue < 0) return next;
  for (let i = 0; i <= cue; i++) {
    const beat = slide.beats[i];
    if (!beat) continue;
    const waitingToDraw = i === cue && beat.draw && phase === "narrating";
    if (waitingToDraw) continue;
    if (beat.add) next = { ...next, ...beat.add } as Reveal;
  }
  return next;
}
