Lesson: mtx-inv
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - The det=1 recipe giving [[2,-1],[-3,2]], the A*A^{-1}=I check, the det=0 singular case, and the det=2 case giving [[1,-3/2],[-1,2]] are all correct; every climb and summit inverse verifies back to I.
2 Prereqs: 3/4 - The swap/negate/divide recipe is well sequenced, but the summit tests (AB)^{-1}=B^{-1}A^{-1}, solving AX=B, and (A^{-1})^{-1}=A, extensions the four slides do not directly derive.
3 Pedagogy: 3/4 - The off-answer manipulate (slide a until M is singular, resting at a=6) gives predict-before-reveal; the remaining questions are recognition.
4 Wording: 4/4 - Over-explains the three moves, calls out the common "forgot the 1/det" mistake, defines singular, and uses no em dashes or semicolons.
5 Visual: 4/4 - Both AlgebraFlow derivations write line by line with labeled move chips and a boxed result, alongside a clean A*A^{-1}=I verification grid.
6 Interaction: 3/4 - A single a slider on the final slide; the watch slides are static reveals.
7 A11y: 4/4 - aria labels sit on the grids, color is text-backed, and the shared player handles keyboard and reduced-motion.
Blocking issues:
- None.
Top 3 fixes:
1. Either teach (AB)^{-1}, AX=B, and (A^{-1})^{-1} within the lesson or relocate those summit items to where they are taught.
2. Add an evals/sources.json entry for mtx-inv.
3. Add a second manipulative (for example driving both b and c) to lift retrieval practice above recognition.
Verdict: SHIP
