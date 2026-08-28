# The Bloomy lesson factory

A pipeline for building the 57 curriculum lessons to a high bar, with automated
checks so they do not ship buggy or visually wrong. It maps to the three goals:

| Goal | How the factory enforces it |
| --- | --- |
| Good visuals and animations, playable | The authoring skill's figure patterns + the runtime/visual smoke test (`npm run smoke`) + the visual rubric dimension |
| Good wording, source-backed | Research step + `evals/sources.json` provenance + the accuracy/voice rubric dimensions + KaTeX/notation/em-dash checks |
| Correct ordering, prereqs first | Prerequisite DAG in `src/curriculum/data.ts` + `npm run check:next` backlog + the cycle/ordering check |

## Commands

```
npm run check:next     # prerequisite-ordered backlog: what to build next
npm run check          # run the full eval harness on every lesson (+ ordering)
npm run check -- --lesson polar   # just one lesson
npm run eval:self      # test the checker itself (14 bug-class fixtures)
npm run eval:rational  # prove the rational grapher never crosses an asymptote
npm run plan:gen       # (re)generate plan/sequence.md + plan/lessons/*.md specs
npm run build          # tsc typecheck + vite build
npm run smoke          # runtime + visual smoke (needs a dev server + playwright)
npm run smoke -- rational-holes   # a Journey lesson smokes at #/journey/<id>
npm run verify         # eval:self + eval:rational + check + build  (the gate)
```

`npm run check` and `npm run verify` exit non-zero on any error, so they drop
straight into a loop or CI. Add `--strict` to also fail on warnings.

## What the harness checks

Objective, runs in ~0.6s (`scripts/check-lessons.mjs`, helpers in `scripts/eval/`):

- **Accuracy-adjacent**: unbalanced KaTeX (`$...$`, `\left`/`\right`, braces),
  `atan`/`atan2` leaking into learner copy, em dashes.
- **Questions actually work**: choice `answer` index in range; `manipulate`
  `check()` is satisfiable across the slider domain (learner *can* finish) and
  not trivially always-true; `plot` targets sit inside the visible plane and are
  clickable within tolerance.
- **The giveaway bug**: a labeled sample dot must not sit on a later plot answer.
- **Visual wiring**: every `reveal.*` a figure reads is set by some beat; dead
  flags flagged; animation targets stay within slider range.
- **Ordering**: the prerequisite graph is acyclic; lessons are wired into
  `lessons/index.ts`; ready curriculum skills resolve to real folders.

It executes the real TypeScript lesson data (bundled with esbuild), so these are
facts about the lesson, not guesses. `npm run eval:self` proves each check fires.

The **smoke test** (`scripts/smoke-lessons.mjs`) catches what only shows at
runtime: console errors, a figure that fails to render, a plane that stops being
clickable, and it saves per-step screenshots to `evals/screenshots/` for review.

The **rubric** (`evals/RUBRIC.md`) is the judgment layer for accuracy, pedagogy,
voice, and visual craft, with an LLM-judge prompt for a subagent.

## Where the new lessons live: the Journey tab

The 57 new lessons ship in a separate **Journey** tab (`#/journey`), a linear,
Duolingo-style path, so the hand-built **Base Camp** lessons are never touched.

- New lesson folders sit next to the others in `src/lessons/<folder>/` (so the
  harness, engine, and figure conventions all work unchanged), but they are
  registered in `src/journey/registry.ts`, not in `src/lessons/index.ts`. That is
  what keeps them out of Base Camp.
- `src/journey/data.ts` derives the path straight from `src/curriculum/data.ts`:
  units in prerequisite order, one node per skill. A node is **playable** if the
  Journey registry teaches its skill, **Base Camp** if the curriculum marks it
  ready with a `lessonId`, else **coming soon**.
- The plan lives in `plan/`: `sequence.md` (the linear order), one
  `plan/lessons/NN-<skill>.md` spec per skill, and `automation-options.md`.

## Authoring one lesson

The reproducible pipeline lives in the **`bloomy-lesson` skill**
(`.cursor/skills/bloomy-lesson/SKILL.md`, with `reference.md`). It auto-applies
when you work on a lesson. In short: pick a prereq-satisfied lesson, research it
against credible texts, write `OUTLINE.md`, build the figure and `slides.ts` from
the template, register it, then pass `check` + `build` + `smoke` + a rubric
self-review.

## The build loop (one lesson at a time, never advance on red)

Quality over throughput: build a single lesson per iteration and gate it fully
before moving on. This is what prevents the buggy-batch problem.

1. `npm run check:next` and take the top skill under an **UNLOCKED** topic.
2. Dispatch a subagent to author that one lesson using the `bloomy-lesson` skill.
   Give it the skill, the skill id, and `evals/RUBRIC.md`. Prompt template:

   ```
   Author the Bloomy lesson for skill "<id>" (<title>).
   Follow the bloomy-lesson skill exactly. Research against >=2 credible texts
   and record them in evals/sources.json. Build the spec in plan/lessons/, then
   slides.ts + Stage.tsx in src/lessons/<folder>/, and register it in
   src/journey/registry.ts with skills: ["<id>"]. Do not stop until
   `npm run check -- --lesson <folder>` and `npm run build` both pass with zero
   errors. Report the folder name and any warnings you left.
   ```

3. Gate: `npm run check -- --lesson <folder>` and `npm run build`. On any error,
   resume the same subagent with the harness output and have it fix, then re-gate.
4. Runtime + visual: `npm run smoke -- <lessonId>`, then run the LLM judge from
   `evals/RUBRIC.md` over the slides + screenshots. On REVISE, resume the subagent
   with the specific fixes.
5. Commit the lesson. Return to step 1.

To run this on a cadence, use the `/loop` skill (for example `/loop build the
next lesson`); it wakes the agent to run one more iteration. Keep iterations
serial so each lesson clears every gate before the next begins.

## File map

```
AUTOMATION.md                      this file
plan/SUMMARY.md                    what was built + how to continue (start here)
plan/sequence.md                   the 57-skill linear order, by unit
plan/lessons/NN-<skill>.md         one spec per skill (all 57)
plan/automation-options.md         ways to build the rest + recommendation
.cursor/skills/bloomy-lesson/      the authoring pipeline (SKILL.md + reference.md)
evals/RUBRIC.md                    judgment rubric + LLM-judge prompt
evals/sources.json                 per-lesson citations / conventions
evals/screenshots/                 smoke output (gitignored)
src/journey/                       the Journey tab (data + registry + path UI)
src/components/RationalGraph.tsx   shared rational-function grapher (Unit 1)
src/lib/rational.ts                curve-splitting math for the grapher
scripts/check-lessons.mjs          the eval harness (CLI)
scripts/eval/load.mjs              esbuild loader for TS lesson data
scripts/eval/parse.mjs             text-level parsers (katex, flags, samples, bounds)
scripts/eval/checks.mjs            the checks
scripts/eval/selftest.mjs          tests for the checker
scripts/eval/rational-selftest.mjs proves the grapher never crosses an asymptote
scripts/plan/gen-lesson-specs.mjs  generates the plan/ specs from the curriculum
scripts/smoke-lessons.mjs          runtime + visual smoke test
```
