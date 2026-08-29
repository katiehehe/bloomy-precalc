Lesson: infinite-geo
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Converges iff $|r|<1$ with $S=\tfrac{a_1}{1-r}$: the worked $3+1+\tfrac13+\cdots\to 4.5$, divergence at $r=1$ ($\tfrac{1}{0}$ undefined) and $r=-1$ (partial sums oscillate $1,0,1,0$), the your-turn $S=\tfrac{1}{1-r}$, and 29 quiz items ($0.\overline{4}=\tfrac49$, $0.\overline{27}=\tfrac{3}{11}$, solve $r=\tfrac34$, $a_1=3$, capstone $3$) all verify; only gap is no evals/sources.json entry.
2 Prereqs: 4/4 - Builds on the geometric ratio and introduces partial sum, limit, and converge/diverge one at a time, needing only fraction arithmetic, with the $|r|<1$ test motivated by the shrinking bars.
3 Pedagogy: 4/4 - The "each step closes half the gap" partial-sum reveal builds the limit before the formula, converge vs diverge is contrasted visually (no limit line is drawn when it diverges), an explicit "check $|r|<1$ first" callout appears, and an off-answer r manipulate hits a target.
4 Wording: 4/4 - Concise and precise, terms bolded on first use, all math in KaTeX, and no semicolons or em dashes.
5 Visual: 4/4 - Shrinking versus exploding bars with per-term value tags, a running partial-sum fill, and a dashed limit line that is intentionally absent when the series diverges, all with a synced dock.
6 Interaction: 3/4 - The r slider morphs the terms and the dashed S line from an off-answer start ($r=0.2$, target $r=0.5$), but slides 1 to 4 are watch-only.
7 A11y: 4/4 - Every figure mode sets a descriptive aria string (bar heights, running total, limit line) on top of the player's keyboard controls, audio toggle, text narration, and strong contrast.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Add an infinite-geo entry to evals/sources.json (OpenStax Sequences and Series: infinite geometric series).
2. Let the your-turn r slider reach negative and $|r|\ge1$ values so learners can trigger divergence (the dashed line vanishing) interactively, not only read about it.
3. Add a small r control on the condition slide so manipulation is not confined to the final slide.
Verdict: SHIP
