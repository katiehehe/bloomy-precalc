# Bloomy lesson criticisms log

A running record of the user's criticisms and preferences, captured verbatim in
intent and turned into durable authoring principles. Fold new entries here as
they arrive, then reflect the durable ones into `.cursor/rules/bloomy-lessons.mdc`
and this skill's `SKILL.md`. Newest themes first.

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
- Engine: use the shared `AlgebraFlow` component (`src/components/AlgebraFlow.tsx`), built on `motion`. Pass it `steps: FlowStep[]` (each with an `id`, a `show` reveal flag, the `tex`, and an `op` chip) and `reveal`; beats reveal steps in order via `add`. It auto-scrolls to the newest line so long chains read like working down the page, and it respects reduced motion. Give it a small supporting `header` glyph (a mini unit circle `AngleCircle`, a dial, or an `IdentityGraph`) so the slot still has a figure. See `degrees-radians`, `sum-difference-identities`, `double-angle-identities`, `half-angle-identities`, `verifying-identities`.

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

## Keep the figure live during Your turn
- Criticism: during a choice or plot question the right-hand figure greys out, and the tracer slider plus the point on the curve disappear on plot questions ("when there is an interactive dont grey out the RHS", "where did the dragger go").
- Principle: once Your turn begins, the figure stays at full opacity and the tracer (slider and point) stays up for every question, including plot and choice. Dimming the figure is only for watch-stage reading. A plot click still places the answer marker. It does not hide the tracer the learner was just using.

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
- When pushing, always push to both remotes: `origin` (origin.cursor.com) and `github` (github.com/katiehehe/bloomy-precalc). Keep them in sync.
