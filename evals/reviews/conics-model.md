Lesson: conics-model
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Every model checks: dish $2^2=4p(1)\Rightarrow p=1$ focus $(0,1)$, gallery $c^2=25-9=16$ so foci $(\pm4,0)$ with legs $5+5=2a=10$, LORAN $c^2=9+16=25$ with $d_1-d_2=2a=6$, flashlight $p=\tfrac12$, your-turn $p=1/d$, and summit items verify (8 ft x 2 ft dish $p=2$, 20 ft x 12 ft room $2c=16$); only gap is no evals/sources.json entry.
2 Prereqs: 4/4 - Builds directly on conics-class standard forms and completing the square, and introduces focus, foci, and focal radii one scenario at a time using only rim-point algebra.
3 Pedagogy: 4/4 - Vivid real contexts, predict-before-reveal (solve for $p$, then "light the bulb"), fully worked concrete numbers, an off-answer depth manipulate, and a large numeric quiz bank that tests computation rather than recognition.
4 Wording: 4/4 - Concise and precise with terms bolded on first use, math in KaTeX, an explicit "use the radius, not the full width" trap callout, and no semicolons or em dashes.
5 Visual: 4/4 - Each scenario is drawn on a labeled plane with foci, focal radii, and reflected paths plus a synchronized dock; the slide-1 ray schematic is slightly stylized (rays appear to route via the vertex) but still readable.
6 Interaction: 3/4 - The slide-5 depth dial morphs the parabola and slides the focus dot from an off-answer start ($d=5$, target $d=1$), but slides 1 to 4 are watch-only.
7 A11y: 3/4 - The shared player supplies keyboard-reachable controls, an audio toggle, and text narration, and each ConicPlane spec carries an aria description, though dock formulas are KaTeX only.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Add a conics-model entry to evals/sources.json (OpenStax Conics applications: parabolic reflectors, whispering galleries, LORAN).
2. Redraw the slide-1 reflection so incoming rays visibly bounce off the bowl toward the focus rather than through the vertex.
3. Add a light interactive touch earlier (drag the rim point on slide 1 and watch $p$ update) so manipulation is not confined to the final slide.
Verdict: SHIP
