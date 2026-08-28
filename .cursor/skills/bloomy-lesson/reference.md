# Bloomy lesson reference

Data model, a worked slide, figure patterns, and the research prompt. The source
of truth for types is `src/lessons/types.ts`; the engine that reads them is
`src/lessons/engine.ts`. Skim both before authoring.

## Folder layout

```
src/lessons/<folder>/
  OUTLINE.md     goal, sources, slide-by-slide plan
  slides.ts      export const slides: Slide[]  (data only, type-only imports)
  Figure.tsx     the SVG that draws the concept and takes interaction
  Stage.tsx      thin wrapper: figure-frame + figure-dock (readouts/formulas)
```

`slides.ts` must stay import-safe: only `import type { ... }` from `../types`
plus pure helpers (for example `../../lib/trig`). Never import a `.tsx` at
runtime from `slides.ts`; the eval harness loads it in Node.

## The data model (essentials)

A `Slide` the player runs:

```ts
type Slide = {
  id: string;              // unique within the lesson
  title: string;
  mode?: string;           // opaque tag the figure reads (e.g. "circle")
  params?: ParamSpec[];    // interactive sliders (preferred, multi-param)
  hideSliders?: boolean;   // hide the slider row (e.g. click-driven slides)
  baseReveal: Reveal;      // flags on from the start
  beats: Beat[];           // narration, one idea each
  practice: string;        // one line shown at the top of the try stage
  questions: Question[];   // retrieval practice
};

type ParamSpec = {
  key: string; label: string;
  min: number; max: number; start: number;   // integer slider domain
  step?: number;                              // arrow-key increment (shift = 3x)
  format: (value: number) => string;         // how the value reads out
};
```

Sliders are integers. Map to real math inside the figure (for example
`const r = values.r / 100`). Keep the mapping identical in the figure and in any
`check()`.

A `Beat` (narration paragraph). Motion is optional:

```ts
type Beat = {
  text: string;                          // KaTeX with $...$; **bold** for terms
  to?: number | Record<string, number>;  // animate a param (bare number = primary)
  ms?: number;                           // animation duration (default ~1400)
  draw?: boolean;                        // this beat plays a draw-in animation
  add?: Partial<Reveal>;                 // toggle reveal flags (true or false)
};
```

Reveals **accumulate**; turn one off with `add: { flag: false }` on a later beat
(used to show a definition marker for one beat, then hide it). A `draw` beat
holds its `add` until the animation starts, so a grow-in reveals as it draws.

Three question kinds (`src/lessons/types.ts` is authoritative):

```ts
// choice: multiple choice, `answer` is the 0-based index into options
{ kind: "choice", prompt, options: string[], answer: number, hint, success }

// manipulate: solved by moving sliders; check() runs on every change
{ kind: "manipulate", prompt, hint, success,
  check: (value: number, values: Record<string, number>) => boolean }

// plot: solved by clicking the plane near target (world units)
{ kind: "plot", prompt, hint, success,
  target: { x: number; y: number }, tolerance?: number /*=0.6*/, label?: string }
```

`value` in `check` is the primary (first) param; `values` has every param by key.
The harness sweeps the whole slider domain to prove `check` is satisfiable and
not trivially always-true, so keep the math exactly consistent with the figure.

## A worked slide

```ts
import type { ParamSpec, Slide } from "../types";

const rParam: ParamSpec = {
  key: "r", label: "Radius r", min: 100, max: 400, start: 250, step: 20,
  format: (v) => `r = ${(v / 100).toFixed(2)}`,
};

export const slides: Slide[] = [
  {
    id: "circle-intro",
    title: "Circle",
    mode: "circle",
    params: [rParam],
    baseReveal: {},
    beats: [
      { text: "A **circle** is every point the same distance from a center. That distance is the radius $r$.",
        add: { radius: true, dock: true, defDist: true } },
      { text: "Written out, $x^2 + y^2 = r^2$. Grow $r$ and the circle grows.",
        to: { r: 380 }, ms: 2200, add: { defDist: false } },
    ],
    practice: "Drag outward, or use the r slider, to resize the circle.",
    questions: [
      { kind: "manipulate", prompt: "Set the radius to $r = 3$.",
        hint: "Move the slider until it reads $r = 3.00$.",
        success: "At $r = 3$ the circle passes through $(3, 0)$ and $(0, 3)$.",
        check: (value) => Math.abs(value / 100 - 3) < 0.08 },
    ],
  },
];
```

## Figure patterns

`Figure.tsx` receives `LessonFigureProps`: `value`, `values`, `slide`, `reveal`,
`drawProgress` (0..1 for the current draw-in), `interactive`, optional `plot`
(click-a-point state), `onValue`, `setValue`.

- Build the plane with `makePlane(SIZE, HALF)` and render `PlaneGrid`.
  Keep a per-mode `HALF` so plot targets stay on-screen (the harness reads it).
- Gate every drawn element on a reveal flag: `{reveal.radius && <circle .../>}`.
  Every flag you read must be set by a beat or `baseReveal`.
- Support dragging where intuitive; call `setValue(key, updater)` and clamp.
  Convert pointer position to world units with `plane.wx/plane.wy`.
- For a click-a-point question, read `props.plot` and call `plot.onGuess({x,y})`
  on click; draw the target dot and `plot.label` once `plot.solved`.
- Animate with `drawProgress`/`legProgress`; when `reduce-motion` is set the
  player passes end states, so render the final frame without motion.
- Interrupting an animation must land on the intended end state (the player
  snaps values; make the figure a pure function of `values`).

`Stage.tsx` wraps the figure in `.figure-area > .figure-frame > .figure-slot`
and adds a `.figure-dock` with live readouts or formulas (use `Tex`). Show the
dock via a `reveal.dock` flag. Do not box coordinate labels; size backgrounds to
the text or use a thin halo.

## Concreteness fading and question order

Per slide, take the idea through forms in order: **definition, then operation,
then a worked example, then application**. Order questions the same way, and put
a predict/manipulate item before the explanation when it fits (pretesting).

## Research prompt (subagent)

Use a `generalPurpose` subagent for a topic that needs real sourcing:

```
Research <TOPIC> for a high-school precalculus lesson.
Sources: OpenStax Precalculus 2e, Sullivan, Stewart, Blitzer, Larson, or the
College Board AP Precalculus CED. Cross-check at least two.
Return: (1) the precise definition and standard notation, flagging any
convention that differs between texts and which is more standard; (2) the core
formulas with the exact form to display; (3) two or three worked examples with
clean numbers; (4) the common misconceptions and the discriminating question
that exposes each; (5) the minimal prerequisites; (6) citations (text + chapter).
Do not invent notation. Prefer the convention used by the majority of sources.
```

Fold the result into `OUTLINE.md` and `evals/sources.json`, then author.
