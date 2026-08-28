# How to automate building the remaining lessons

All options share the same non-negotiable **gate**: a lesson is done only when
`npm run check -- --lesson <folder>` and `npm run build` pass with zero errors,
the smoke test is clean, and it scores >= 3/4 on every `evals/RUBRIC.md`
dimension. The gate is what keeps output from being buggy or visually wrong; the
options below only change *who drives* and *how parallel* it is.

## Option A - Serial, one lesson per subagent (recommended default)

Loop: `npm run check:next` -> pick the top skill under an UNLOCKED unit ->
dispatch one subagent with the `bloomy-lesson` skill to author it -> gate ->
fix on red -> commit -> repeat. One lesson fully finished before the next starts.

- Pros: highest quality, easy to review, no merge conflicts, a bad lesson never
  blocks others.
- Cons: slowest wall-clock (about one lesson per iteration).
- Best for: the first lesson of each unit, where the shared figure and the
  unit's voice get established.

## Option B - Parallel subagents in worktrees (batch a unit)

Use the `best-of-n-runner` (isolated git worktrees) to build several lessons of
one unit at once, then gate and merge each independently.

- Pros: much faster for a unit of similar lessons.
- Cons: more review, possible drift in style between lessons, merge overhead.
- Best for: homogeneous units (matrices, series) after the unit's first lesson
  set the pattern.

## Option C - Unattended /loop with the gate as the guard

Arm the `/loop` skill (`/loop build the next lesson`) so the agent wakes on a
cadence, builds the next lesson, and only commits if the gate is green; on red it
stops and leaves notes. You spot-check periodically.

- Pros: hands-off throughput; the harness + rubric are strong enough to trust
  between check-ins.
- Cons: needs occasional human review of the rubric (accuracy/pedagogy) since a
  green harness is necessary but not sufficient.
- Best for: grinding through planned lessons overnight once the pattern is proven.

## Option D - Template-first stamping (per unit)

Build one shared figure component for a unit (as done here with the rational
grapher), then "stamp" the unit's lessons as thin `slides.ts` + `Stage.tsx`
configs over that component.

- Pros: fastest and most consistent within a family; the hard rendering is
  written and checked once.
- Cons: only pays off when a unit's lessons truly share a figure.
- Best for: rationals (done), matrices, series, limits.

## Option E - CI pipeline via the Cursor SDK (most scalable)

Run the authoring agent programmatically (Cursor SDK / GitHub Action): a job per
planned skill opens a PR, and `npm run verify` is a required check. Humans review
the PR against the rubric and merge.

- Pros: auditable, scalable, every lesson is a reviewable PR with green checks.
- Cons: most setup; still needs human rubric review before merge.
- Best for: turning this into a durable factory once the approach is settled.

## Recommendation

A pragmatic escalation, unit by unit:

1. **Option A** for the first lesson of a unit: it forces the shared figure and
   voice into place and gets a careful human read.
2. **Option D** to stamp the rest of that unit over the shared figure.
3. **Option C** (or **B**) to run the stamping loop with less supervision, the
   harness gating every iteration.
4. Graduate to **Option E** (CI + PRs) once two or three units have shipped and
   the pattern is stable.

Always keep the human in the loop for the rubric's accuracy and pedagogy
dimensions: the harness proves a lesson is not broken, not that it teaches well.
This session used Option A + Option D for Unit 1 (rationals): one shared grapher,
then three stamped lessons, each passing the gate.
