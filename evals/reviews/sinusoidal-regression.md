Lesson: sinusoidal-regression
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - $A=\dfrac{85-35}{2}=25$, $D=\dfrac{85+35}{2}=60$, $B=\dfrac{2\pi}{12}=\dfrac{\pi}{6}$, and $C=4$ from $\tfrac{\pi}{6}(7-C)=\tfrac{\pi}{2}$ all hold, and the quiz's derived facts (period $=\tfrac{2\pi}{B}$, max $=D+A$, min $=D-A$, $C=x_{\text{peak}}-\tfrac{P}{4}$) check out.
2 Prereqs: 4/4 - The model $y=A\sin(B(x-C))+D$, the period-to-$B$ relation, the $x-C$ right-shift, and "a sine peaks when its inside is $\tfrac{\pi}{2}$" are each stated before they are used, so the derivations need only basic algebra.
3 Pedagogy: 4/4 - Two worked passes (read $A,D$ from the extremes, then $B,C$ from the period and peak) plus a hands-on tuning slide, each naming the classic slip (sum for midline, difference for amplitude) with hints and success lines and a broad quiz spanning compute, interpret, and build-the-model.
4 Wording: 4/4 - Concrete and encouraging ("Four numbers do all the work"), bolds first-use terms, renders math in $...$, and carries no em dashes or semicolons after cleanup.
5 Visual: 4/4 - The SineFit chart is a strong pencil-mimic with real data dots, a fitted curve, a dashed midline, an amplitude segment, a period marker, and axis ticks; on the match slide the curve visibly sags at $D=50$ so the miss is obvious.
6 Interaction: 4/4 - The match slide exposes the midline-$D$ slider (no hideSliders) that lifts the curve as a rigid shape over the data, and its manipulate question ("set $D$ to its best fit", $|D-60|<0.5$) starts at $D=50$, off the answer, so the learner must drag it.
7 A11y: 3/4 - Shared player gives keyboard-reachable controls and an audio toggle, and the chart SVG has a role and aria-label; a live announcement of the changing $D$ and reduced-motion handling of the curve lift are not verified.
Blocking issues:
- None. Accuracy, visuals, and interaction all hold up.
Top 3 fixes:
1. Pin the SineFit chart header on the period/phase slide; it scrolls mostly off by watch-end, hiding the data-and-curve context while $B$ and $C$ are derived.
2. Add an aria-live readout of $D$ as the slider moves and verify prefers-reduced-motion for the curve lift.
3. Add a second manipulate (for example, a phase-shift $C$ slider) so $B$ and $C$ get the same hands-on treatment as $D$.
Verdict: SHIP
