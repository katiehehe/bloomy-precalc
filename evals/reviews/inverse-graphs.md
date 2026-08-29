Lesson: inverse-graphs
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Sine is many-to-one and fails the horizontal line test, the restriction to $[-\tfrac{\pi}{2},\tfrac{\pi}{2}]$ makes it one-to-one, reflecting across $y=x$ swaps domain and range, and $\arcsin 0.5=\tfrac{\pi}{6}\approx 0.52$ with outputs confined to $[-\tfrac{\pi}{2},\tfrac{\pi}{2}]$ are all correct.
2 Prereqs: 4/4 - It assumes only the sine graph and the principal range and introduces one idea per slide (restrict, reflect across $y=x$, then read a value off the curve).
3 Pedagogy: 2/4 - The restrict-reflect-evaluate build is strong, but the sole manipulate is pre-answered: the watch ends at input $0.5$ (output $\tfrac{\pi}{6}$) and the try stage keeps that value, so the resting position already satisfies "move the input so the output is $\tfrac{\pi}{6}$."
4 Wording: 4/4 - Concise and concrete ("The arcsine graph is a lookup table"), terms bolded (many-to-one, restricted), math in $...$, and no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Real coordinate-plane graphs: the dashed full sine crossed repeatedly by a horizontal line, the solid restricted arc, the reflection across the dashed $y=x$, and a labeled lookup point $(0.50, 0.52)$ with dashed guides to both axes.
6 Interaction: 3/4 - The input slider drives a visible point along the arcsine curve with a live readout on slide 3, but slides 1-2 are watch-only.
7 A11y: 3/4 - The shared player gives keyboard slider and buttons, an audio toggle, and text narration, and the curves are distinguished by solid-vs-dashed and labels ($y=x$, $y=\arcsin x$) rather than color alone.
Blocking issues:
- Pedagogy 2/4: the slide-3 manipulate starts already answered, since the watch-end input $0.5$ equals the requested output $\tfrac{\pi}{6}$ and the try stage does not reset (CRITIQUES: never let the resting position satisfy the check).
Top 3 fixes:
1. Start the slide-3 input off-target (reset to $x=-1$, or end the watch on a non-answer) so the learner must drag to reach $\tfrac{\pi}{6}$.
2. Add a manipulate to slide 1 or 2 (drag the restriction endpoints, or drag a point and watch it reflect across $y=x$) so retrieval is not concentrated in one pre-answered task.
3. On slide 2 the interval fractions in the narration render cramped where the line wraps; set them in display math or shorten the sentence.
Verdict: REVISE
