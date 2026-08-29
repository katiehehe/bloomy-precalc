Lesson: limits-graph
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Every reading is correct: the table converges to $4$ from both sides, both one-sided limits are $4$, the limit-versus-value case has $\lim = 4$ with $h(2)=1$ (removable), and the jump has left limit $1$, right limit $3$, so the two-sided limit DNE.
2 Prereqs: 4/4 - It introduces the limit from scratch with a numerical table, then adds one idea per slide (one-sided limits, limit versus value, jump/DNE) before the your-turn, assuming only that the learner can read a line and a table.
3 Pedagogy: 4/4 - It leads with the numerical table before any symbols, explicitly preempts two misconceptions (the limit ignores the value, and a defined value cannot rescue a jump), and ends with a click-the-hole plot that starts unsolved.
4 Wording: 4/4 - Plain and precise ("A limit asks a different question than 'what is $g(2)$'"), terms bolded on first use, math in $...$, and no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Clean planes with correct open/closed dots, dashed $x=2$ and $y=4$ guides, teal/accent left-and-right approach points, and the hole-versus-value pair are all drawn literally with concrete numbers.
6 Interaction: 3/4 - The finale is a single click-the-hole plot (target $(2,4)$, tolerance $0.6$) that starts unsolved, but it is one-shot identification and the four teaching slides are watch-only.
7 A11y: 3/4 - Every figure spec carries a descriptive aria string, the left/right points are labeled with text as well as color, and reduced-motion plus audio-off are engine-handled, though keyboard focus and console cleanliness were not runtime-verified.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Add a second interaction (for example, let the learner drag the approaching point on slide 2 and watch the one-sided readout) so retrieval is not a single click and the interaction dimension rises above one-shot.
2. Slide 2: the "left", "right", and "hole" labels cluster tightly around $(2,4)$; space them apart so each point's label is unambiguous.
3. Confirm the small dark dot near $(-1,0)$ visible on several watch-end screenshots (it also appears in limits-alg and continuity) is a shot-walk pointer artifact and not a rendered element for learners.
Verdict: SHIP
