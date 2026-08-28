import { primaryKey, revealAt, valuesAt } from "../lessons/engine";
import type { ReadyLesson, Reveal, Slide } from "../lessons/types";

/**
 * A single frozen frame of a lesson's own figure, used as a catalog thumbnail.
 * Each spec drives the real Stage component at a representative, recognizable
 * state: no motion, no dock, no interaction (the parent card handles clicks).
 */
type PreviewSpec = {
  mode: string;
  value: number;
  values: Record<string, number>;
  reveal: Reveal;
  label: string;
};

const PREVIEWS: Record<string, PreviewSpec> = {
  "unit-circle": {
    mode: "angle",
    value: 52,
    values: { value: 52 },
    reveal: { angleArc: true },
    label: "A unit circle with a radius drawn to a point at fifty-two degrees.",
  },
  vectors: {
    mode: "single",
    value: 80,
    values: { mag: 80, dir: 35 },
    reveal: { angle: true },
    label: "A single vector drawn as an arrow leaving the origin.",
  },
  "polar-graphs": {
    mode: "rose",
    value: 360,
    values: { theta: 360 },
    reveal: { trace: true },
    label: "A four-petaled polar rose, r equals cosine of two theta.",
  },
  conics: {
    mode: "summary",
    value: 1,
    values: { view: 1 },
    reveal: {},
    label: "The four conic sections together: circle, ellipse, parabola, and hyperbola.",
  },
  parametrics: {
    mode: "lissajous",
    value: 100,
    values: { t: 100 },
    reveal: { trace: true },
    label: "A looping parametric curve traced by two sine equations.",
  },
};

const noop = () => undefined;

/** A minimal slide: figures only read `slide.mode`, so the rest is inert. */
function makeSlide(id: string, mode: string, reveal: Reveal): Slide {
  return { id: `${id}-preview`, title: id, mode, baseReveal: reveal, beats: [], practice: "", questions: [] };
}

/** Derive a reasonable frozen frame for any lesson without a hand-tuned spec. */
function fallbackSpec(lesson: ReadyLesson): PreviewSpec {
  const slide = lesson.slides[lesson.slides.length - 1] ?? lesson.slides[0];
  const cue = slide.beats.length - 1;
  const values = valuesAt(slide, cue);
  return {
    mode: slide.mode ?? "",
    value: values[primaryKey(slide)] ?? 0,
    values,
    reveal: revealAt(slide, cue, "done"),
    label: `A preview of the ${lesson.title} figure.`,
  };
}

export function previewLabel(lesson: ReadyLesson): string {
  return PREVIEWS[lesson.id]?.label ?? `A preview of the ${lesson.title} figure.`;
}

export default function LessonPreview({ lesson }: { lesson: ReadyLesson }) {
  const spec = PREVIEWS[lesson.id] ?? fallbackSpec(lesson);
  const slide = makeSlide(lesson.id, spec.mode, spec.reveal);
  const Figure = lesson.Figure;

  return (
    <Figure
      value={spec.value}
      values={spec.values}
      slide={slide}
      reveal={spec.reveal}
      drawProgress={1}
      interactive={false}
      onValue={noop}
      setValue={noop}
    />
  );
}
