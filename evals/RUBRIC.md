# Bloomy lesson rubric

Two gates. The **harness** (`npm run check`) is automatic and objective; it must
be green. This **rubric** is the judgment layer: a human or an LLM judge scores
what static checks cannot see. A lesson ships only when the harness passes and
every rubric dimension is at least 3/4.

Score each dimension 1 (broken) to 4 (excellent). Anything below 3 blocks ship
and must come with a concrete fix.

## 1. Accuracy (hard gate: any factual error is an automatic fail)

- Every definition, formula, and notation matches a credible source
  (OpenStax, Sullivan, Stewart, Blitzer, Larson, AP CED). Cited in
  `evals/sources.json`.
- Worked examples are arithmetically correct end to end.
- Notation is standard and consistent (no invented symbols; arctan/tan^-1 not
  atan; degrees vs radians labeled).
- Every question's stated answer is actually correct, and the figure agrees with
  the math.

## 2. Prerequisite fit

- A learner who has done the prior `ready`/assumed lessons has everything needed.
- No idea is used before it is introduced.
- The lesson introduces exactly one genuinely new idea per slide.

## 3. Pedagogy (learning science)

- Predict-before-reveal: at least one point where the learner guesses or
  manipulates before the answer is shown, with the answer following immediately.
- Worked example with concrete numbers, then a faded question the learner does.
- Retrieval practice dominates recognition (prefer manipulate/plot over choice).
- Cognitive load managed: one visual change at a time, nothing redundant.
- Success feels reachable (~80%); every question has a hint and a graceful skip.

## 4. Wording and voice

- Concise, conversational, encouraging, mathematically precise. Never textbook
  dense (see `PRODUCT.md`).
- Narration reads well word by word (it reveals in sync with speech).
- No em dashes. Terms bolded on first use. Math in `$...$`.

## 5. Visual craft (the "teacher writing it down" bar)

- The concept is drawn literally on a coordinate plane with concrete numbers, not
  described abstractly.
- Motion has the quality of a hand building the picture: things grow, sweep, or
  draw in one step at a time, at a readable pace.
- Labels are legible, unboxed, and never overlap the geometry.
- Colors follow `DESIGN.md` and never carry meaning alone.

## 6. Interaction

- The learner can manipulate the same object the narration used (drag and/or
  sliders and/or click).
- Interactions are reversible; interrupting an animation snaps cleanly to the end
  state.
- Targets are >= 44px, keyboard reachable, and clickable within tolerance.

## 7. Accessibility and robustness (WCAG 2.2 AA)

- Keyboard, pointer, and touch all work; visible focus; readable contrast.
- `prefers-reduced-motion` jumps to end states and shows narration immediately.
- Works with audio off (never depends on TTS for timing or reveal).
- No console errors; nothing depends on the local dev TTS server.

## Verdict template

```
Lesson: <folder>
Harness: PASS / FAIL   Build: PASS / FAIL   Smoke: PASS / FAIL
1 Accuracy: n/4   2 Prereqs: n/4   3 Pedagogy: n/4   4 Wording: n/4
5 Visual: n/4     6 Interaction: n/4  7 A11y: n/4
Blocking issues:
- ...
Verdict: SHIP / REVISE
```

## LLM-judge prompt

Run a subagent with this prompt, attaching `slides.ts`, `OUTLINE.md`, the
`evals/sources.json` entry, and the smoke screenshots for the lesson.

```
You are grading one Bloomy precalculus lesson against evals/RUBRIC.md.
Inputs: the slides.ts data, the OUTLINE, the cited sources, and per-slide
screenshots of the watch and try stages.

For each of the 7 rubric dimensions, give a score 1-4 and one sentence of
evidence. Then:
- List every factual or notational error you can find, with the correction.
- List any question whose stated answer looks wrong, or that a prerequisite
  learner could not answer.
- List any beat that introduces more than one new idea, or any visual that looks
  cluttered, mislabeled, or off-screen in the screenshots.
- Flag any wording that is textbook-dense, ambiguous, or uses an em dash.
Finish with SHIP or REVISE and the top 3 fixes in priority order.
Be specific and terse. Do not praise. Only report what to change.
```
