import type { ComponentType } from "react";

/** A lesson figure is driven by one scalar plus a bag of boolean reveal flags. */
export type Reveal = Record<string, boolean>;

/** A location on the figure's coordinate plane, in world units. */
export type PlotPoint = { x: number; y: number };

export type Question =
  | {
      kind: "manipulate";
      prompt: string;
      hint: string;
      success: string;
      /** `value` is the primary parameter; `values` carries every parameter by key. */
      check: (value: number, values: Record<string, number>) => boolean;
    }
  | {
      kind: "choice";
      prompt: string;
      options: string[];
      answer: number;
      hint: string;
      success: string;
    }
  | {
      /** The learner clicks a spot on the plane; correct if it lands near `target`. */
      kind: "plot";
      prompt: string;
      hint: string;
      success: string;
      /** Where the point actually belongs, in the figure's world coordinates. */
      target: PlotPoint;
      /**
       * Optional extra accepted points. When present, a click near ANY of these
       * (or `target`) is correct, and the solved marker snaps to whichever one the
       * learner clicked. Use for questions like "click one of the x-intercepts".
       */
      targets?: PlotPoint[];
      /** Accept a click within this many world units of the target. Defaults to 0.6. */
      tolerance?: number;
      /** Short tag revealed at the target once solved, e.g. "t = 0" or "\\theta = 45^\\circ". */
      label?: string;
    };

/** Live state a figure needs to run a "plot" (click-a-point) question. */
export type PlotState = {
  target: PlotPoint;
  tolerance: number;
  /** The learner's most recent click, or null before they try. */
  guess: PlotPoint | null;
  /** Keyboard cursor (arrow keys), shown as a crosshair until a point is placed. */
  cursor?: PlotPoint | null;
  solved: boolean;
  label?: string;
  /** Record a clicked world-space point as the learner's guess. */
  onGuess: (point: PlotPoint) => void;
};

/**
 * A real photograph shown inside a narration beat, so a described object (a
 * satellite dish, a whispering gallery, a headlight) is seen, not just named.
 * `src` is a path under the served root, e.g. "/media/conics/dish.jpg". Keep a
 * short factual `alt` for screen readers and a `credit` line for the source and
 * license.
 */
export type BeatImage = {
  src: string;
  alt: string;
  credit?: string;
};

/** One narration paragraph. Motion is optional: omit `to` / `draw` for text only. */
export type Beat = {
  text: string;
  /** An optional real photo shown under this beat's text during the watch stage. */
  image?: BeatImage;
  /**
   * Target the figure animates to during this beat. A bare number targets the
   * primary parameter; an object targets any subset of named parameters.
   */
  to?: number | Record<string, number>;
  ms?: number;
  /** This beat plays a draw-in animation; its `add` reveal waits until it starts. */
  draw?: boolean;
  add?: Partial<Reveal>;
};

/** Describes a single "try" slider: its label and how its value reads out. */
export type Control = {
  label: string;
  /** Arrow-key increment (shift = 3x). Defaults to 5. */
  step?: number;
  format: (value: number) => string;
};

/**
 * One interactive parameter. A slider spans `min`..`max` (integer domain: map to
 * real math inside the figure) and the figure reads the value by `key`.
 */
export type ParamSpec = {
  key: string;
  label: string;
  min: number;
  max: number;
  start: number;
  /** Arrow-key increment for the primary parameter (shift = 3x). Defaults to 5. */
  step?: number;
  format: (value: number) => string;
};

export type Slide = {
  id: string;
  title: string;
  /**
   * A short statement of what this slide is after, shown as a prominent banner so
   * the learner always knows what is being solved or built while the animation
   * plays. Phrase it as the task, e.g. "Solve $\\cos\\theta = \\tfrac12$ on
   * $[0, 2\\pi)$" or "Plot the points of the parametric curve". May contain math
   * in `$...$`.
   */
  goal?: string;
  /** Opaque per-slide tag a figure may read (e.g. to restrict interaction). */
  mode?: string;
  /** Single-parameter form (legacy). Provide these three, or `params`. */
  start?: number;
  range?: [number, number];
  control?: Control;
  /** Multi-parameter form: one entry per interactive slider. */
  params?: ParamSpec[];
  /** Hide the slider row during "try" (e.g. a slide driven by clicking the figure). */
  hideSliders?: boolean;
  baseReveal: Reveal;
  beats: Beat[];
  practice: string;
  questions: Question[];
};

export type LessonFigureProps = {
  /** Primary parameter value (first param). Convenience for single-slider figures. */
  value: number;
  /** Every parameter value, keyed by `ParamSpec.key`. */
  values: Record<string, number>;
  slide: Slide;
  reveal: Reveal;
  /** 0–1 progress of a draw-in animation for the current beat. */
  drawProgress: number;
  interactive: boolean;
  /** Present only while a "plot" question is active: the click-a-point state. */
  plot?: PlotState;
  /** Update the primary parameter. */
  onValue: (updater: (current: number) => number) => void;
  /** Update any parameter by key. */
  setValue: (key: string, updater: (current: number) => number) => void;
};

export type ReadyLesson = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  status: "ready";
  slides: Slide[];
  Figure: ComponentType<LessonFigureProps>;
  watchHint: string;
  tryHint: string;
};

export type UpcomingLesson = {
  id: string;
  title: string;
  summary: string;
  status: "upcoming";
};

export type LessonEntry = ReadyLesson | UpcomingLesson;
