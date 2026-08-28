# Bloomy lesson criticisms log

A running record of the user's criticisms and preferences, captured verbatim in
intent and turned into durable authoring principles. Fold new entries here as
they arrive, then reflect the durable ones into `.cursor/rules/bloomy-lessons.mdc`
and this skill's `SKILL.md`. Newest themes first.

## The main idea: pencil-mimic
- Criticism: "i want the student to be able to mimic what's happening on the screen with a pencil. that's essentially the main idea."
- Principle: every on-screen artifact must be reproducible by hand. Figures are a live version of the hand procedure (number line, sign chart, labeled points, mirrored roots), never a black box or a decorative animation. If a learner could not draw it, reconsider it.

## Be explicit about the procedure
- Criticism: "draw the child's attention to what is important. like 'when doing X, make sure to ___'. be explicit about the procedures. when graphing, we have to find the critical points and the asymptotes for example. state those explicitly."
- Principle: name the steps of the method out loud, in order, and give direct "make sure to ___" callouts at the moment they matter. Use the learner's vocabulary explicitly: critical points, zeros, vertical asymptotes / walls, end behavior. Front-load the roadmap ("the method has three steps ...") and then execute each step on its own slide.

## Show the work, factor by factor
- Criticism: "when finding pos / neg regions, include the various regions explicitly. like list ---+ and --+- etc. have the expression and then put these signs above each parenthesed term so it's clear."
- Principle: for sign analysis, render the full sign chart: a row per interval, a column per factor, each cell holding that factor's sign, plus a product column, with the current region highlighted as the tracer moves. Also annotate the expression itself with the sign above each parenthesized factor (KaTeX `\overset{+}{(x+2)}`). This is exactly the pencil artifact.

## Questions must not start pre-answered
- Criticism: "the question should never be answered right away. like it shouldn't already be in the correct region."
- Principle: for any manipulate/tracer question, set the starting value OUTSIDE the correct region so the learner must move to solve it. Never let the resting tracer position satisfy the check.

## Interactive controls must move something
- Criticism: "the inequality slider also doesn't slide any point."
- Principle: a slider/tracer must drive a visible point and readout on the figure. If dragging changes nothing visible, it is a bug. (Root cause here: the tracer only drew under `reveal.tracer`, which the slides never set; now it draws whenever the live readout is on.)

## Narration and layout (earlier sessions)
- Journey page must scroll (`height: 100dvh; overflow-y: auto`).
- Narration fades in a whole paragraph at a time, not word by word.
- Do not instruct interaction ("drag/slide/click/try") during watch beats; reserve those for the try stage (practice line + questions).
- Add conceptual "why" beats before mechanics (e.g., near a wall the numerator is a normal size while the denominator is tiny, so the ratio explodes).
- Keep the live readout compact: two lines, no wasted vertical space.
- The question box must not shift when feedback appears. It expands in place from a fixed top; do not reserve static blank space and do not leave initial blank space above it.
- Center the text on the left panel.

## Content correctness / wording
- A plot question that has two valid answers must accept both (e.g., "click an x-intercept" accepts either intercept via a `targets` array).
- Avoid vague beats. "Connect the pieces" became "we can trace out the curve; the two walls split it into three pieces."

## Standing quality bar (from the original brief)
- High standards on visuals/animation (teacher-like, interactive), wording (backed by credible sources), and ordering (prerequisites first).
- New lessons live in the Journey tab in a linear order; do not rewrite existing Base Camp lessons.
- Never ship a buggy or visually wrong build: pass the harness, self-tests, and build, and smoke-check the figures.
