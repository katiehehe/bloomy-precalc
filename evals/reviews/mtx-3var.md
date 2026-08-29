Lesson: mtx-3var
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - The system reduces correctly (R2 -> R2 - 2R1 = (0,-1,-1,-5), R3 -> R3 - R1 = (0,1,0,2)), back-substitution gives (x,y,z)=(1,2,3) and checks in all three equations, and every climb/summit triple (s-full-s2 (2,1,3), s-elim-neg (0,-3,3,-2), s-backsub-full (1,2,3)) verifies by hand.
2 Prereqs: 4/4 - It scaffolds from a 2-variable augmented matrix up to the 3-variable case, and the three row operations, the pivot, back-substitution, and the two special endings are each introduced before they are used.
3 Pedagogy: 3/4 - The worked example is narrated entry by entry with a final check and every question has a hint and graceful skip, but all twelve questions are recognition (choice) with no predict-by-manipulation.
4 Wording: 4/4 - Concise and precise, defining augmented matrix, pivot, elementary row operations, inconsistent, and dependent on first use, warning "subtract in every column", with no em dashes or semicolons.
5 Visual: 4/4 - The augmented matrix is drawn with a true vertical bar, the pivot and eliminated cells and the bar column are highlighted, and the dock shows each row operation and back-substitution line by line (screenshots confirm a clean, legible layout).
6 Interaction: 2/4 - BLOCKING: all four slides set hideSliders and every question is choice, so the learner never manipulates the augmented matrix the narration builds (no drag, slider, or row-operation control).
7 A11y: 4/4 - aria labels describe each matrix state and both special endings, captions pair with color, and the shared player handles keyboard, touch, and reduced-motion.
Blocking issues:
- Interaction 2/4: there is no manipulable object anywhere in the lesson; the matrix only animates, so the learner cannot perform a row operation, and no slider or tracer moves anything on screen.
Top 3 fixes:
1. Add at least one manipulate interaction so Interaction reaches 3+: for example a "choose the multiple m" control that runs R2 -> R2 - m R1 on the live matrix, or a slider that scales a row and updates the entries.
2. Turn one recognition question into that manipulate as predict-before-reveal: start an entry below the pivot off zero and have the learner drive it to 0.
3. Add an evals/sources.json entry for mtx-3var (only OUTLINE.md cites it).
Verdict: REVISE
