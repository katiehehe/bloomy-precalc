Lesson: mtx-cramer
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - det(A)=5, det(A_x)=5 giving x=1, det(A_y)=15 giving y=3 (verified in both equations), and x=(3c-10)/5 with c=10 giving x=4 are all correct; every climb and summit determinant checks by hand.
2 Prereqs: 4/4 - The general rule x_i = det(A_i)/det(A) is stated up front, so the 3x3 conceptual summit items (which column to replace for z, one shared denominator) follow directly from what is taught.
3 Pedagogy: 3/4 - The off-answer manipulate (set c so x=4, resting at c=5 giving x=1) gives predict-before-reveal, but the rest are multiple choice.
4 Wording: 4/4 - Defines the coefficient matrix, the constant column, and A_i, stresses "divide by det(A), not det(A_x)", and uses no em dashes or semicolons.
5 Visual: 4/4 - Each slide highlights the replaced column, shows the diagonal determinant with a live caption, and the dock carries the exact \det and \vmatrix work.
6 Interaction: 3/4 - One constant-c slider on the final slide; the watch slides are static.
7 A11y: 4/4 - aria labels describe A_x and its determinant, color is paired with captions, and the shared player handles keyboard and reduced-motion.
Blocking issues:
- None.
Top 3 fixes:
1. Add an evals/sources.json entry for mtx-cramer (only OUTLINE.md cites it).
2. Convert a choice item into a manipulate (for example dial c until x is negative) to add retrieval practice.
3. Add a brief beat or figure state showing what det(A)=0 looks like, tying the final choice question to the visual.
Verdict: SHIP
