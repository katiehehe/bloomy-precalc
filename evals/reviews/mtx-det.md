Lesson: mtx-det
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - The 2x2 rule ad-bc (14 and 0), the 3x3 cofactor expansion landing on -3, and the live det = 2d-4 are all correct; every climb answer checks by hand.
2 Prereqs: 3/4 - The summit quiz tests determinant properties the four slides never teach: a row swap negating det, scaling a row multiplying det, det(3A)=9*detA, zero/equal rows giving 0, and the triangular-product shortcut.
3 Pedagogy: 3/4 - The off-answer manipulate (slide d until det=0, resting at d=6) gives predict-before-reveal, but most questions are recognition.
4 Wording: 4/4 - Defines determinant, square matrix, singular, and minor, names the "subtract main minus anti" step explicitly, and uses no em dashes or semicolons.
5 Visual: 3/4 - The 2x2 diagonal highlights and dock are clean, but on slide 3 the widest cofactor line (+ 3(4*8 - 5*7)) is clipped at the right edge and the header matrix has scrolled off the top by watch-end.
6 Interaction: 3/4 - One d slider on the final slide; the watch slides are static reveals.
7 A11y: 4/4 - aria text describes the matrix and its determinant, captions back the color, and the shared player handles keyboard and reduced-motion.
Blocking issues:
- None.
Top 3 fixes:
1. Teach the determinant properties the summit tests (row operations, det(kA), triangular, zero/equal rows), or move those items to a determinant-properties lesson.
2. Fix the slide-3 cofactor overflow so the widest line fits and the header stays visible (smaller font, wrap, or a wider slot).
3. Add an evals/sources.json entry for mtx-det.
Verdict: SHIP
