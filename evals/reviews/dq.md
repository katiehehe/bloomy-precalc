Lesson: dq
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Every value is correct: the secant slopes $3$ on $[1,2]$ and $4$ on $[1,3]$, the simplification $\dfrac{(1+h)^2-1}{h}=\dfrac{2h+h^2}{h}=2+h$, the shrink table $3, 2.5, 2.25$, and the tangent slope $\lim_{h\to0}(2+h)=2=f'(1)$.
2 Prereqs: 4/4 - It builds strictly in order (slope, secant, difference quotient, shrink, tangent) and one new idea lands per slide; the limit as $h\to0$ is handled concretely by plugging into $2+h$, so no formal limit machinery is assumed.
3 Pedagogy: 4/4 - Concrete worked numbers, an explicit "make sure the rise goes on top" callout, and a closing manipulate that starts at $h=1.5$ (slope $3.5$, off the $2.5$ target) so the learner must move to solve it.
4 Wording: 4/4 - Opens with a relatable hook ("miles per hour is how much distance changes for each hour"), bolds terms on first use, keeps math in $...$, and has no em dashes or semicolons after cleanup.
5 Visual: 3/4 - Slides 1, 2, and 4 cleanly label rise/run and the secant/tangent, but on slide 3 the shrinking-secants picture is squeezed into a tiny glyph above the tall algebra dock, and on slide 5 the "tangent (2)" and "slope 3.5" labels overlap near $(1,1)$ while the $h=1.5$ moving point $(2.5, 6.25)$ clips the top gridline.
6 Interaction: 4/4 - The slide-5 slider drives the moving point, the secant, and a live $2+h$ slope readout, it is reversible, and it starts off the answer.
7 A11y: 3/4 - Every figure spec carries a descriptive aria string, colors are paired with text labels, and reduced-motion plus audio-off are handled by the shared engine, though keyboard focus and console cleanliness were not runtime-verified.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Slide 3: the secants for $h=1, 0.5, 0.25$ tilting toward the tangent are the key pencil-mimic visual but they render as a tiny glyph above the AlgebraFlow; put the secant plane in the height-bounded slot (or shorten the flow) so the "marching toward 2" is visible at readable size.
2. Slide 5: separate the colliding "tangent (2)" and "slope 3.5" labels near $(1,1)$ (move the secant-slope label up its line and the tangent label below the axis).
3. Slide 5: at $h=1.5$ the moving point $(2.5, 6.25)$ sits above the top gridline and is clipped; lower the start (still off-target) or widen the vertical range so it stays fully on screen.
Verdict: SHIP
