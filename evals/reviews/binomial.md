Lesson: binomial
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - The Pascal recurrence ($6=3+3$), $\binom{4}{2}=6$, the theorem $(a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$, $(x+1)^3=x^3+3x^2+3x+1$, the full $(a+b)^4$, the $x^2$ term of $(x+2)^4=24x^2$, and 29 quiz items ($\binom{6}{3}=20$, symmetry $\binom{8}{5}=\binom{8}{3}=56$, $(2x+1)^3$ gives $12x^2$, $(x-2)^4$ constant $16$, $(2x-1)^3$) all verify; only gap is no evals/sources.json entry.
2 Prereqs: 4/4 - Builds Pascal's triangle from the add-the-two-above rule and defines the binomial coefficient and "n choose k" before the theorem, needing only factorials and exponents, one idea per slide.
3 Pedagogy: 4/4 - Reads coefficients straight off the triangle (predict before formula), teaches the single-term extraction shortcut, flags "do not forget to raise the 2", uses an off-answer row manipulate, and backs it with a rich quiz bank (symmetry, sign patterns, scaled variables).
4 Wording: 4/4 - Concise and precise, terms bolded on first use, all math in KaTeX, and no semicolons or em dashes.
5 Visual: 4/4 - A Pascal's-triangle of labeled nodes with row and parent highlighting plus connecting edges, and a synced dock with boxed results.
6 Interaction: 3/4 - The row slider highlights row n from an off-answer start ($n=2$, target $n=4$) and the dock echoes $(a+b)^n$, but slides 1 to 4 are watch-only.
7 A11y: 4/4 - The triangle svg carries a descriptive aria-label (the highlighted row and its entries) on top of the player's keyboard controls, audio toggle, text narration, and strong contrast.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Add a binomial entry to evals/sources.json (OpenStax Sequences and Series: binomial theorem and Pascal's triangle).
2. On the your-turn slide, also render the expanded $(a+b)^n$ terms so dragging n visibly rewrites the expansion, not only the highlighted coefficients.
3. Add earlier interactivity (tap a triangle entry to see it as the sum of the two above) so manipulation is not confined to the final slide.
Verdict: SHIP
