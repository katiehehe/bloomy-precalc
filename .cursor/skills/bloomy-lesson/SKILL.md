---
name: bloomy-lesson
description: >-
  Author or revise an interactive Bloomy precalculus lesson end to end: research
  the content against credible textbooks, write the OUTLINE, build slides.ts plus
  the SVG Figure and Stage, wire it into the app and curriculum, then pass the
  eval harness and build. Use whenever creating, editing, or reviewing a Bloomy
  lesson, a slides.ts, a lesson Figure/Stage, or working through the 57-skill
  curriculum backlog.
---

# Authoring a Bloomy lesson

A Bloomy lesson is **TypeScript data** (`slides.ts`) plus a **React SVG figure**
(`Figure.tsx` and a `Stage.tsx` wrapper) driven by the shared player. You never
touch the player or engine. You produce one lesson folder and register it.

Also obey the always-on rules in `.cursor/rules/bloomy-lessons.mdc` and
`.cursor/rules/bloomy-figures.mdc`, plus `PRODUCT.md` and `DESIGN.md`. This skill
is the pipeline that ties them together and gates on the eval harness.

Detailed data model, a worked slide, and figure patterns are in
[reference.md](reference.md). Read it before writing a new figure.

## The one rule that prevents most rework

**Nothing is done until `npm run check:lesson -- --lesson <folder>` and
`npm run build` both pass, and the runtime smoke test is clean.** The harness
executes your questions and reads your figure; it catches the bugs that used to
ship. Run it early and often, not just at the end.

## Pipeline

Copy this checklist into your working notes and keep it updated:

```
- [ ] 1. Pick the lesson + confirm prerequisites (npm run check:lesson -- --next)
- [ ] 2. Research content against >=2 credible sources; record them
- [ ] 3. Write OUTLINE.md (goal, sources, slide-by-slide beats + questions)
- [ ] 4. Build the figure (Figure.tsx + Stage.tsx) from the template
- [ ] 5. Write slides.ts (beats, params, reveals, questions)
- [ ] 6. Register in lessons/index.ts and set status in curriculum/data.ts
- [ ] 7. npm run check:lesson -- --lesson <folder>  (fix every error)
- [ ] 8. npm run build  (typecheck + bundle)
- [ ] 9. npm run smoke -- <lessonId>  (no console errors, targets clickable)
- [ ] 10. Self-review against evals/RUBRIC.md
```

### 1. Pick the lesson and confirm prerequisites

Run `npm run check:lesson -- --next` for the prerequisite-ordered backlog. Build
only lessons whose prerequisites are already `ready` or assumed from Algebra 2.
Never author a lesson a learner could not yet do. The 57 skills and their order
live in `src/curriculum/data.ts`.

### 2. Research (accuracy first)

Every definition, formula, notation, and worked example must trace to a credible
source: OpenStax Precalculus 2e, Sullivan, Stewart, Blitzer, Larson, or the
College Board AP Precalculus CED. Do not invent notation or conventions.

- For a substantial topic, launch a research subagent (see
  [reference.md](reference.md), "Research prompt"). Cross-check at least two
  sources for any formula or convention that varies between texts.
- Record what you used in `evals/sources.json` under the skill id: title,
  source names, and any convention decisions (for example arctan vs tan^-1).
- Pick concrete numbers for worked examples that come out clean.

### 3. Write OUTLINE.md

One markdown file in the lesson folder. State the learner goal in one sentence,
list sources, then go slide by slide: the idea, what the figure shows, what
animates, what the learner manipulates, and the questions. Keep it to 3 to 5
slides. This is the contract the slides and figure implement.

### 4. Build the figure, then 5. write the slides

Follow [reference.md](reference.md). Reuse `makePlane`/`PlaneGrid` from
`src/components/Plane.tsx`, the shared `.figure*` classes, and `Tex` for math.
Draw the geometry literally with concrete numbers.

### 6. Register

- `src/lessons/index.ts`: add the lesson entry (id, title, kicker, summary,
  status `ready`, slides, Figure, watchHint, tryHint).
- `src/curriculum/data.ts`: flip the matching skill(s) to `status: "ready"` and
  set `lessonId`. Keep the folder name and `lessonId` consistent, or make sure
  the import path is `./<folder>/slides`.

### 7 to 10. Gate

Fix every harness **error** and resolve **warnings** (or justify them). Then
`npm run build`, then `npm run smoke`, then a rubric self-review.

## Learning-science defaults (bake these into every lesson)

Grounded in the `learning-science` skill. These are the active ingredients;
do not mutate them away.

- **Predict before reveal (pretesting).** Open a hard idea by asking the learner
  to guess or manipulate, then reveal the answer immediately. A plot/manipulate
  question before the explanation beats opening cold, even when the guess is wrong.
- **One new idea per slide, one visual change per beat.** Respect the
  working-memory bottleneck. If a beat has nothing to animate, leave `to`/`draw`
  off and let it read as text.
- **Worked examples with concrete numbers**, then fade to a question the learner
  does themselves. Show the substitution in the prompt; make them locate/commit
  the answer.
- **Retrieval practice, not recognition.** Prefer `manipulate` and `plot`
  (the learner generates the answer) over pure `choice`. Every question needs a
  hint and a success line (feedback).
- **Interaction prompts belong to the try stage.** Watch beats never tell the
  learner to drag, slide, or click; they narrate and may describe automated
  motion. Put every "drag/slide/click/try" instruction in the `practice` line
  and questions, which unlock only at "Your turn."
- **Integrate words and visuals** (labels on the diagram, narration in sync).
  Cut anything redundant or decorative.
- **Aim for ~80% success.** Questions should be reachable: solvable within the
  slider domain and clickable within tolerance. The harness enforces this.
- **Over-explain by default.** Assume first exposure. Anticipate exactly where a
  beginner gets stuck and address it in the same beat: define every new term the
  instant it appears, justify why each step is allowed, and never skip algebra.
  Walk worked examples one concrete case at a time. When unsure whether to add a
  clarifying sentence, add it. A confused or frustrated learner is a failure, not
  an edge case; err on the side of too much explanation.
- **Pencil-mimic principle (the main idea).** Everything on screen must be
  reproducible by hand: number lines, sign charts, labeled points, mirrored
  roots. The figure is a live version of the hand procedure, never a black box.
- **Be explicit about the procedure.** Name the steps in order ("the method has
  three steps ...") and give "make sure to ___" callouts where they matter. Use
  the learner's vocabulary: critical points, zeros, asymptotes/walls, end behavior.
- **Show the work factor by factor.** For sign analysis, render the full sign
  chart (row per interval, column per factor, plus product) with the current
  region highlighted, and annotate the expression with a sign above each factor
  (`\overset{+}{(x+2)}`). See `SignTable` and `InequalityGraph`.
- **Dynamic equations, even without a graph.** Algebra and identity lessons must
  animate: the derivation writes itself line by line, each step introduced by a
  labeled arrow naming the move (expand, substitute, cancel, divide, factor),
  cancelling terms struck with `\cancel` (quotient via `\overset`/`\underset`),
  key terms colour-highlighted, each line fading in, and the result in a
  highlighted box. Use the shared `AlgebraFlow` component (steps gated by
  `reveal`, one revealed per beat) with a small `header` glyph (`AngleCircle`,
  a dial, or `IdentityGraph`). See the trig identity lessons.

## User criticisms log

Read `CRITIQUES.md` (sibling file) before authoring. It is the running record of
the user's feedback turned into durable principles; keep it updated as new
criticisms arrive and reflect the durable ones back into the rule and this skill.

## Bug-classes to avoid (the recurring gripes)

These are real failures from past lessons. The harness checks most of them;
the rest are on you.

1. **Instant narration on deploy.** The live site has no TTS server, so audio
   fails and beats can complete instantly, dimming the text and skipping the
   paragraph fade-in. Never depend on audio for timing. The shared player
   already falls back to a timed reveal and Web Speech: do not reintroduce logic
   that treats a failed fetch as a finished beat, and test with audio off.
2. **Answer given away by a sample dot.** A demonstrated, labeled anchor must not
   sit on a later plot/manipulate answer (the `t = 0` bug). Demonstrate a
   *different* point than the one you ask for. (`giveaway` check.)
3. **Wrong or leaked notation.** No `atan`/`atan2` in learner copy; write
   `\arctan` or `\tan^{-1}`. Keep four-quadrant `Math.atan2` in figure logic only.
   (`notation` check.)
4. **Unclickable or stuck interactions.** Every interactive target >= 44px and
   reachable. Do not let a decorative overlay or `pointer-events` swallow clicks.
   If a figure can get "stuck" on one state (the conics circle bug), make every
   click advance or select. (`smoke` clickability.)
5. **Reveal-flag typos.** A flag the figure reads must be set by some beat or
   `baseReveal`, or the visual never appears. (`flag-unset` check.)
6. **Out-of-range animation or off-plane targets.** `beat.to` must stay within a
   slider's range; plot targets must sit inside the visible plane.
   (`beat-target`, `plot-offscreen`.)
7. **Unbalanced KaTeX** (`$...$`, `\left`/`\right`, braces) throws at runtime.
   (`katex-*` checks.)
8. **Motion that traps the learner.** Interrupting an animation must snap to its
   intended end state. Under `prefers-reduced-motion`, jump to end states and
   show narration immediately. Keep it reversible and clean.
9. **Em dashes.** None, anywhere. Use commas, colons, parentheses, or two
   sentences. (`em-dash` check.)
9b. **Semicolons.** None in learner copy or UI text. Prefer two short sentences
   for joined clauses, a comma for a list or aside, a colon when the second half
   explains the first, and never a comma splice. Only the KaTeX spacer `\;`
   inside `$...$` is allowed. (`semicolon` check.)
10. **Pre-answered manipulate.** The resting tracer value must not already
    satisfy a manipulate `check`. Start it OUTSIDE the correct region so the
    learner has to move to solve it.
11. **Dead control.** A slider/tracer that changes nothing visible is a bug. The
    control must drive a visible point and readout (usually gate the tracer on the
    live readout, not on an unset flag).

## Never break a working lesson

Reuse the shared player, engine, and template. Do not edit
`src/player/`, `src/lessons/engine.ts`, or `src/lessons/types.ts` while
authoring. Keep the unit circle behavior intact. New lessons are additive.
