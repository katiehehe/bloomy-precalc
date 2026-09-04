# Bloomy lesson criticisms log

A running record of the user's criticisms and preferences, captured verbatim in
intent and turned into durable authoring principles. Fold new entries here as
they arrive, then reflect the durable ones into `.cursor/rules/bloomy-lessons.mdc`
and this skill's `SKILL.md`. Newest themes first.

## Climb and Summit stay inside the lesson
- Criticism: "go through all the lessons and verify that we can answer the climb and summit just based on the lesson. there should be no questions we can't answer solely based on the base camp"
- Root cause: several quizzes asked for a formula or procedure the watch never taught (tangent double-angle and half-angle forms, tangent's period, arctan graphs, law of cosines / SSA inside law of sines, principal-argument wrapping, determinant row properties, $(AB)^{-1}$, binomial long division, even-multiplicity sign rules).
- Principle: every Climb and Summit item must be answerable from that lesson's watch and try stages, plus ordinary Algebra 2 arithmetic and facts the lesson itself uses as given. If a formula is not derived or stated in the watch, do not quiz it. Trim or rewrite the item rather than hoping a later lesson or a sidebar will cover it.
- Worked fix: replaced the untaught items in `double-angle-identities`, `half-angle-identities`, `trig-equations-basic`, `inverse-graphs`, `law-of-sines`, `modulus-argument`, `mtx-det`, `mtx-inv`, `mtx-mul`, `mtx-tx`, `rational-asymptotes`, `rational-graphing`, and `poly-inequalities`.
- Enforcement: folded into `.cursor/rules/bloomy-lessons.mdc` and this skill.

## AlgebraFlow: keep the current step center-ish
- Criticism: the $360^\circ = 2\pi$ to $180^\circ = \pi$ handoff "isn't smooth" / "it jumps". Then: "i want the steps to stay at this height". Then, after a scale-to-fit attempt: "NO ... I DONT WANT THAT I JUST WANTED THE MAIN ANIMATION STEPS TO ALWAYS BE CENTER ISH NOT GO DOWN PAST THE PAGE". Also: extend the arrow shaft so the chip does not cover it, and fade the top so a clipped line is not a hard edge.
- Root cause: the current equation was allowed to drop below the fold, or the whole derivation was forced onto one screen. Neither is the house style.
- Principle: the newest equation stays in the middle of the step panel (center-ish is enough). Older lines scroll up and fade out under a soft top mask. The dial or heading stays pinned above that panel. Do not scale the whole derivation to fit. Leave a visible shaft above the op chip, and a clear arrowhead below it. Show intermediate algebra (divide both sides, then simplify) rather than jumping to the reduced result.
- Worked fix: shared `AlgebraFlow` (`src/components/AlgebraFlow.tsx`) keeps the current line centered, pins the header, fades the top of the viewport, and uses a long connector. Reference look: `degrees-radians`. Every other AlgebraFlow lesson uses this same component, so they pick up the style automatically.
- Enforcement: folded into `.cursor/rules/bloomy-lessons.mdc` and this skill. Do not reintroduce scale-to-fit or "never scroll".

## Voice reads as generic AI, not academic
- Criticism: "i really hate the wording and tone. its so AI... i want academic, engaging, enthusiastic. i especially hate the sentences with random commas in them, like just get rid of the commas and the pauses. make it flow" and, in the same breath, "be very explicit with the wording, careful, make sure everything is clear. no vague causal language".
- Root cause: the math was sourced but the prose was written to the old spec ("conversational, encouraging, without sounding like a textbook"). Combined with the no-semicolon and no-em-dash rules, that produced choppy fragments ("Same length, new split.") and comma-appositive pile-ups ("its magnitude |v|, the length of the arrow, and its direction theta, the angle..."), which is exactly the "AI" texture the user hates.
- Principle: the target voice is academic, precise, and genuinely engaged, written in flowing complete sentences (expository, like a strong lecturer or a well written textbook). Enthusiasm comes from the ideas, never from filler or exclamation. Be explicit and literal: state exactly what changes and exactly why, naming the mechanism, with no vague causal filler ("the geometry does the work", "makes this concrete", "here is the catch", "confirms the idea", "notice how", "it turns out"). No sentence fragments for punch. No stacks of three or more commas piling qualifiers on one noun. Join clauses with real subordination (because, since, when, so that, which, whose) and keep only the commas grammar requires. No cutesy or mechanical metaphors ("dials", "drive", "bring it home", "drop it onto the grid"): name the real action.
- Reference rewrite: `src/lessons/vec-mag/slides.ts` was rewritten end to end in this voice as the pilot. Use it as the model when revising every other lesson.
- Enforcement: folded into `.cursor/rules/bloomy-lessons.mdc` (Voice plus three follow-on bullets) and `PRODUCT.md` (Brand Personality). A `scripts/eval` phrase check for the banned filler and fragment patterns is planned so the sweep is mechanical, not by eye.

## No semicolons in copy
- Criticism: "also get rid of any semicolons in the lessons as well and on the website."
- Principle: semicolons are banned from all learner-facing copy, exactly like em dashes. Replace each with a period and two short sentences when it joins two independent clauses, a comma for a list or an aside, or a colon when the second half explains the first. Never create a comma splice. The concise two-sentence rewrite usually reads better and fits the Bloomy voice anyway.
- Enforcement: `npm run check` now flags any semicolon in slide or quiz copy via `hasProseSemicolon` in `scripts/eval/checks.mjs`. The KaTeX spacing command `\;` inside `$...$` is the only allowed exception. The registry summaries and hints plus website UI copy were cleaned by hand. Code and CSS syntax semicolons are untouched.

## Over-explain, anticipate confusion
- Criticism: "i feel like you dont understand what a student will be confused by. in these lessons, air on the side of overexplaining please. dont let the child be upset." Also: the FTA lesson used "conjugate pair" without ever defining it or showing how to find one, or why a number times its conjugate is real.
- Principle: assume first exposure and over-explain. Anticipate the exact spot a beginner gets stuck and preempt it in the same beat. Define every new term the instant it appears, justify each step, never skip algebra, and walk worked examples one concrete case at a time. When in doubt, add the sentence. A confused or frustrated learner is a failure, not an edge case.
- Worked fix: the FTA "conjugate pair" slide now defines the conjugate ($a+bi \to a-bi$), says how to find it (flip the sign in front of $i$), proves the product is real ($(a+bi)(a-bi)=a^2+b^2$), and shows the pair multiplies to a real quadratic ($(x-2i)(x+2i)=x^2+4$), which is why non-real roots pair up. The inequality sign-chart slides now walk the tracer through each region one at a time, narrating each factor's sign.

## Equations must be dynamic, even without graphs
- Criticism: "i want it to be very animated. even when there aren't graphs, i want the equations to be dynamic, which includes cancelling, expanding, manipulating equations, arrows, fading, etc."
- Principle: an algebra or identity lesson is not a static wall of text. The derivation writes itself one line at a time; each step is introduced by a labeled arrow naming the move (expand, substitute, cancel, divide, factor), terms that cancel are struck (KaTeX `\cancel`, with the quotient shown via `\overset`/`\underset`), signs and key terms are colour-highlighted, and each new line fades and slides in. The final line lands in a highlighted result box.
- Engine: use the shared `AlgebraFlow` component (`src/components/AlgebraFlow.tsx`), built on `motion`. Pass it `steps: FlowStep[]` (each with an `id`, a `show` reveal flag, the `tex`, and an `op` chip) and `reveal`; beats reveal steps in order via `add`. The current line stays center-ish in the step panel. Older lines scroll up and fade. The header glyph stays pinned. Give it a small supporting `header` (`AngleCircle`, a dial, or an `IdentityGraph`). See `degrees-radians`.

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

## Keep the figure live when the question uses it
- Criticism: during a plot or manipulate question the right-hand figure used to grey out, and the tracer disappeared ("when there is an interactive dont grey out the RHS", "where did the dragger go"). Later: on a choice-only concept check, dim the RHS the same way watch-stage text does, because nothing on the figure is moving.
- Principle: dim the figure when attention is on copy (watch narration, or a choice question with no slider or click). Keep the figure at full opacity for manipulate and plot. The tracer stays up only while the current question is a manipulate.

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

## Concept checks stay on the question
- Criticism: leftover watch recap sat above Your turn ("The theorem promises three roots...", "Drag the tracer toward each boundary...") and stole focus from the concept check. When there was no slider, the left panel also did not call attention to the question.
- Principle: a choice-only concept check is the question box and nothing else on the left. Hide the `practice` line and the slider row. Highlight the left panel (`is-focus-copy`) and dim the right-hand figure the same way watch-stage text does. Show `practice` plus sliders, and keep the figure at full opacity, only when the current item is a manipulate or plot.

## Standing quality bar (from the original brief)
- High standards on visuals/animation (teacher-like, interactive), wording (backed by credible sources), and ordering (prerequisites first).
- New lessons live in the Journey tab as a per-unit prerequisite DAG, with several possible starts in a unit. Do not rewrite existing Base Camp watch content.
- Never ship a buggy or visually wrong build: pass the harness, self-tests, and build, and smoke-check the figures.
- When pushing, always push to both remotes: `origin` (origin.cursor.com) and `github` (github.com/katiehehe/bloomy-precalc). Keep them in sync.
