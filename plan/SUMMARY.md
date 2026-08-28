# Read me first: what changed and where things stand

You asked for a new tab holding lessons drawn from the original 57-skill list,
built in a straight, prerequisite-correct order like a Duolingo journey, without
rewriting your five Base Camp lessons. That is in place, plus three pilot lessons
and a per-lesson plan for all 57.

## What I built this session

1. **A new Journey tab** (`#/journey`), separate from Base Camp.
   - A linear, unit-by-unit path of all 57 skills, grouped into the 9 curriculum
     units in prerequisite order (Duolingo-style bubbles on a winding path).
   - Node kinds: **playable now** (the new lessons), **Base Camp** (links to your
     existing lessons at their spot in the path, never rewritten), and
     **coming soon** (planned).
   - Files: `src/journey/Journey.tsx`, `src/journey/data.ts` (derives the path
     from `src/curriculum/data.ts`), `src/journey/registry.ts` (the new lessons).
   - Wiring is additive: a `Journey` nav link in `SiteHeader.tsx` and one route in
     `App.tsx`. Your `src/lessons/index.ts` and your five lessons are untouched.

2. **Three pilot lessons** (Unit 1, Rational analysis), fully authored and gated:
   - `rational-holes` (skill `va-holes`) - holes vs vertical asymptotes.
   - `rational-asymptotes` (skill `ha-slant`) - horizontal and slant asymptotes.
   - `rational-graphing` (skill `rational-graph`) - the full graphing checklist.
   - They share one carefully written grapher (`src/components/RationalGraph.tsx`
     + pure math in `src/lib/rational.ts`) that splits the curve at every vertical
     asymptote, draws holes as open circles, and has a draggable tracer.

3. **A plan folder** (`plan/`):
   - `sequence.md` - the full 57-skill linear order, by unit.
   - `lessons/NN-<skill>.md` - one spec file per skill (all 57). The three pilots
     are filled in; the rest are consistent stubs generated from the curriculum.
   - `automation-options.md` - five ways to build the rest, with a recommendation.
   - This file.

4. **Extended the quality gate** to cover the new work:
   - The eval harness now recognizes Journey-registered lessons as wired.
   - A new `eval:rational` test proves the grapher never draws across an asymptote.
   - The smoke test now knows the `#/journey/<id>` routes.

## Status: all green

```
npm run verify   # eval:self (14/14) + eval:rational (11/11) + check (8 lessons, 0/0/0) + build
```

passes with zero errors and zero warnings. Typecheck and production build succeed.

## The one thing I could not fully close

A real **browser** smoke pass (Playwright) was not run: Playwright is not
installed and I did not want to pull a headless Chromium download without asking.
The rendering math is verified numerically instead (`npm run eval:rational`), and
the figures reuse the same proven Stage/dock/plane patterns as your working
lessons. To do the visual pass yourself:

```
npm i -D playwright && npx playwright install chromium
npm run dev
npm run smoke -- rational-holes rational-asymptotes rational-graphing
# screenshots land in evals/screenshots/<id>/
```

## How to see it now

```
npm run dev      # then open the Journey tab in the header
```

Open `#/journey`, scroll Unit 1, and play the three green bubbles. Base Camp
bubbles (later units) link back into your existing lessons.

## Recommended next step

Build the rest of Unit 1 (`poly-ineq`, `rational-ineq`, `fta`) using Option A
then D from `automation-options.md`, gating each with `npm run verify`. The specs
are already stubbed in `plan/lessons/`. See `AUTOMATION.md` for the build loop.
