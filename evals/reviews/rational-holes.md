Lesson: rational-holes
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - $f(x)=\frac{(x+2)(x-1)}{(x-1)(x-3)}$ cancels to $\frac{x+2}{x-3}$ with the hole at $(1,-1.5)$, the wall at $x=3$, the x-intercept $(-2,0)$, and the readout $f(0)=-0.67$ all matching the figure, and every Climb/Summit answer (hole heights, domains, multiplicity, one-sided limits) checks out.
2 Prereqs: 4/4 - Assumes only rational functions and factoring, contrasts a cancelled factor (hole) with a leftover factor (wall) as one paired idea on slide 1, then explains the wall on slide 2, one new idea per slide.
3 Pedagogy: 3/4 - Predict-before-reveal is present (Q1 asks the left-side limit before it is shown), but slide 2's drag question is pre-answered: the last beat parks the tracer at $x=3.05$, already inside the target band $3.02<x<3.4$, so the auto-complete marks it correct on entry, and beat 4 narrates "from the left it flips" while the tracer sits on the right.
4 Wording: 4/4 - Concise and conversational, each term bolded on first use, math in $...$, no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Clean plane with the hole as an open circle, the wall dashed at $x=3$, the live tracer dot and two-line readout matching the math, no label overlaps.
6 Interaction: 3/4 - The tracer slider drives a visible dot and readout and is reversible, but slide 2's drag rests inside its target (auto-satisfied without moving), and the plot hit target (tolerance $0.45\approx36$px) is under the 44px guideline.
7 A11y: 3/4 - The native range slider (aria-valuetext), choice buttons, figure aria, and live text readout support keyboard and audio-off, and the engine handles reduced motion, but the "click the x-intercept" plot question has no keyboard equivalent.
Blocking issues:
- Slide 2 drag question starts already answered: the watch ends with the tracer at $x=3.05$ (inside $3.02<x<3.4$), violating "questions must not start pre-answered."
- Slide 2 beat 4 says "from the left it flips" but the tracer never moves left of the wall, so the narration and figure disagree.
Top 3 fixes:
1. Un-answer slide 2 Q2: add a final beat `to` that parks the tracer just left of the wall (e.g. $x\approx2.7$), which both fixes the "from the left" narration and forces the learner to drag right to solve.
2. Give the plot question a keyboard path (e.g. a focusable candidate-point list) so "click the x-intercept" is operable without a pointer.
3. Enlarge the plot hit target to at least 44px (raise tolerance to about $0.55$).
Verdict: REVISE
