Lesson: param-motion
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - With $x(t)=2t$, $y(t)=4t-t^2$: point $(2,3)$ at $t=1$, $(6,3)$ at $t=3$, peak $(4,4)$ at $t=2$, landing $(8,0)$ at $t=4$, range $8$ are all correct, and the three-cell dock (t, x, y) matches the marker.
2 Prereqs: 4/4 - Needs only function evaluation, factoring $t(4-t)$, and the linear-vs-quadratic contrast; one new idea per slide (position, why a parabola, landing/peak/range, interact).
3 Pedagogy: 4/4 - Predict-before-reveal via plotting the peak at $t=2$ and a manipulate that starts at $t=0$ and must reach $t=3$, plus a "highest at landing" error item, all with hints.
4 Wording: 4/4 - Concise and concrete, bolds terms once, no em dashes or semicolons after cleanup.
5 Visual: 3/4 - The parabola, the building trace, and the live three-cell dock are strong, but floating labels collide: "peak" overlaps "(4, 4)" on slide 3, and "(0, 0)", "x = 0", "y = 0" pile up at the origin on slide 4, with "y = 3"/"t = 1" crowding on slide 1.
6 Interaction: 4/4 - The time slider and dragging the ball along the arc both drive the live position dock; the try stage starts at t = 0, off every target.
7 A11y: 4/4 - The SVG carries a dynamic aria-label naming t and the (x, y) position; decorative layers are aria-hidden and narration is text, so it works audio-off.
Blocking issues:
- None.
Top 3 fixes:
1. Resolve the label collisions: "peak" overprints "(4, 4)" on slide 3 and the three origin labels overlap on slide 4; offset them or drop the redundant coordinate text.
2. Nudge the "lands t = 4" label off the x-axis name near (8, 0) so both stay readable.
3. Thin out simultaneous labels on slide 1 (y = 3, t = 1, (6, 3), x = 6 all at once); reveal only the ones the current beat is narrating.
Verdict: SHIP
