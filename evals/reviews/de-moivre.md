Lesson: de-moivre
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - De Moivre $[r(\cos t+i\sin t)]^n=r^n(\cos nt+i\sin nt)$, the roots-of-unity formula $z_k=\cos\frac{360^\circ k}{n}+i\sin\frac{360^\circ k}{n}$ for $k=0..n-1$, and the general $n$th-root extension are all correct; $(1+i)^2=2i$ checks and the spacing $360^\circ/n$ matches the dots.
2 Prereqs: 4/4 - Assumes polar form and the "multiply moduli, add arguments" rule from polar-arith plus the unit circle; introduces one idea per slide (powers, roots of unity, why exactly n, interact).
3 Pedagogy: 4/4 - The power law is derived step by step in an AlgebraFlow, the your-turn manipulate starts at n=2 and must move to n=4, and the "student lists only 1" item targets the classic miss; every question has a hint.
4 Wording: 4/4 - Concise, bolds terms once, defines cis, no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Slide 1 is a clean line-by-line power derivation with op chips and a boxed result; the roots slides draw equally spaced dots on a dashed unit circle with only "1" labeled, so nothing overlaps.
6 Interaction: 4/4 - The n slider drives the number of dots on the circle and the plot asks for a specific root; the try stage starts at n=2, off the n=4 answer.
7 A11y: 4/4 - Aria states the number of roots and their spacing on the unit circle; narration is text and the derivation is real KaTeX, with reduced motion left to the shared player.
Blocking issues:
- None.
Top 3 fixes:
1. On the your-turn plot ("click a cube root not at 1") all three dots are already visible, so it is mostly recognition; consider asking the learner to predict the count first, then click.
2. On the roots-formula slide, briefly label the non-trivial roots (z1 at 120 deg, z2 at 240 deg) to tie the visible dots to the formula's k index.
3. Tie the faint header glyph on slide 1 to the unit-circle theme (or drop it) so the power derivation's supporting figure reads intentionally.
Verdict: SHIP
