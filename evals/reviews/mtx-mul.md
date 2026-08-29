Lesson: mtx-mul
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - AB = [[19,22],[43,50]], BA = [[23,34],[31,46]], the live k+14 top-left entry, and the inner-dimension rule are all correct; every climb and summit product checks by hand.
2 Prereqs: 3/4 - Slide 3 packs both non-commutativity and the inner-dimension shape rule, and the summit quiz tests the identity matrix, associativity, and (AB)^{-1}=B^{-1}A^{-1}, none of which these four slides introduce (confirm an assumed prior lesson covers the identity).
3 Pedagogy: 3/4 - The off-answer manipulate (set k so the top-left of AB is 20, resting at k=2) gives predict-before-reveal, but the remaining questions are recognition.
4 Wording: 4/4 - Concise, ties the entry rule to the dot product, bolds row/column/commutative on first use, and uses no em dashes or semicolons.
5 Visual: 4/4 - Row-of-A and column-of-B highlights with the dot-product caption, AB not equal to BA shown side by side, and the live first-column highlight all read cleanly.
6 Interaction: 3/4 - A single k slider on the final slide drives only AB's first column; the watch slides are static.
7 A11y: 4/4 - aria labels describe each product entry, color is backed by text, and the shared player covers keyboard and reduced-motion.
Blocking issues:
- None.
Top 3 fixes:
1. Move the identity, associativity, and (AB)^{-1} summit items into (or after) lessons that teach them, or add a short beat introducing the identity.
2. Split slide 3 into non-commutativity and the shape rule as separate ideas.
3. Add an evals/sources.json entry for mtx-mul.
Verdict: SHIP
