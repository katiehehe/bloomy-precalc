Lesson: conics-class
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Every classification is correct: ellipse $4x^2+9y^2-36=0\to\tfrac{x^2}{9}+\tfrac{y^2}{4}=1$, circle by completing the square to $(x-2)^2+(y-3)^2=4$ (center $(2,3)$, $r=2$), hyperbola $x^2-y^2-4=0$ with asymptotes $y=\pm x$, parabola $y=(x-2)^2$ vertex $(2,0)$, and the $x^2+Cy^2=4$ morph (including the $C=0$ line-pair) is right; only gap is no evals/sources.json entry yet.
2 Prereqs: 4/4 - Needs only completing the square and reading coefficients, and each slide adds exactly one idea (the AC rule, then A=C circle, then opposite-sign hyperbola, then missing-square parabola, then the live dial).
3 Pedagogy: 3/4 - The curve is gated behind a reveal so the learner reasons from $A$ and $C$ before seeing the shape, and the C-dial manipulate starts at $C=4$ (off the $C=1$ circle answer), but retrieval is 8 choice questions to a single manipulate.
4 Wording: 4/4 - Concise and precise, each conic term bolded on first use, all math in $...$, and no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Each conic is drawn literally on a labeled coordinate plane with a synchronized formula dock, and slide 2 is a clean AlgebraFlow with named op arrows and a highlighted result box "circle: center $(2,3)$, $r=2$".
6 Interaction: 3/4 - The your-turn C-dial morphs the curve through ellipse, circle, and hyperbola and drives the dock readout starting off-target, but slides 1 to 4 are watch-only (hideSliders).
7 A11y: 3/4 - The shared player gives keyboard-reachable sliders and buttons, an audio toggle, and text narration independent of TTS, and each ConicPlane spec carries an aria description, though dock math is KaTeX only.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Add a conics-class entry to evals/sources.json (OpenStax Conics: Ellipse/Hyperbola/Parabola) so the accuracy is formally traceable.
2. Convert one or two distractor-classification items into a plot/manipulate (e.g. click the correct region of a sign chart) so retrieval is not dominated by four-option choice.
3. Make an earlier slide lightly interactive (let the learner toggle the sign of $C$ on slide 1) so interaction is not confined to the final slide.
Verdict: SHIP
