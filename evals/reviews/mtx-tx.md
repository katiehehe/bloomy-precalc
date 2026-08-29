Lesson: mtx-tx
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Columns as images (M=[[3,2],[1,2]] sends i-hat to (3,1) and j-hat to (2,2)), the named scaling/rotation/shear, det = ad - bc (6, then 0, then -1), and every climb/summit product (M(2,1)=(7,2), det[[3,1],[2,4]]=10, SR=[[2,0],[0,-2]], capstone [[0,-2],[2,0]] det 4) all check by hand.
2 Prereqs: 3/4 - Columns, the unit-square-to-parallelogram map, and the determinant are each introduced before use, but two summit items (s-composition, s-compose-named) test "M then N = NM", a composition-order idea never stated in the four slides.
3 Pedagogy: 3/4 - Slide 4 opens with an off-answer manipulate (resting at det=4, learner must reach det=0) for predict-before-reveal, and each transform is a concrete worked example, but the remaining questions are all choice.
4 Wording: 4/4 - Frames M as "a machine that moves vectors", bolds basis vectors / columns / determinant on first use, warns "read the columns, not the rows", and uses no em dashes or semicolons.
5 Visual: 4/4 - Dashed muted basis arrows, bold image arrows landing on integer grid points, a shaded parallelogram, and a dock listing M, Mi-hat, Mj-hat, det, area factor, and orientation (screenshots confirm clean, labeled layout).
6 Interaction: 3/4 - The try slide exposes four entry sliders that drive the image arrows, parallelogram, and live det, plus one manipulate check; the watch slides animate the transforms with sliders hidden.
7 A11y: 4/4 - aria labels describe each transform and the parallelogram, color is paired with the dock captions, and the shared player handles keyboard, touch, and reduced-motion.
Blocking issues:
- None (every dimension is at least 3/4).
Top 3 fixes:
1. Composition ("apply M then N" = NM) is assessed in two summit items but never taught; add a short beat (or a closing slide) that shows it geometrically, or drop those items.
2. Add an evals/sources.json entry for mtx-tx (only OUTLINE.md cites it).
3. Convert one choice item into a second manipulate (for example dial an entry until det < 0 to watch orientation flip) to lift retrieval practice.
Verdict: SHIP
