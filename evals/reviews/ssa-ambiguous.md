Lesson: ssa-ambiguous
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - The height threshold $h=b\sin A$, the four count cases ($a<h$ none, $a=h$ one right, $h<a<b$ two, $a\ge b$ one), the law of sines $\sin B=\dfrac{b\sin A}{a}$, and the worked numbers ($\sin B=0.6$, $B\approx36.9^\circ/143.1^\circ$, third angles $113.1^\circ/6.9^\circ$) are all correct, and the obtuse-case items ($a>b$ needed) check out.
2 Prereqs: 4/4 - The law of sines, right-triangle sine ($h=b\sin A$), and the supplement fact $\sin(180^\circ-B)=\sin B$ are each stated inline before use, so nothing unexplained is assumed.
3 Pedagogy: 4/4 - Three complementary passes (geometric height, algebraic law-of-sines with the supplement trap named, then a hands-on explore), each calling the classic slip out loud ("compare $a$ against both $h$ and $b$", "check the supplement every time") with hints and success lines throughout.
4 Wording: 4/4 - Concise and vivid ("the side $a$ hangs from $C$, free to swing down to the base"), bolds first-use terms, renders math in $...$, and carries no em dashes or semicolons after cleanup.
5 Visual: 4/4 - The triangle figure is a clean pencil-style construction with labeled $A$, $C$, $b$, $h$, the swinging side(s), a dashed reach-circle in the no-triangle case, and a live count label that matches the current narration beat.
6 Interaction: 4/4 - The explore slide exposes the side-$a$ slider (no hideSliders) driving a triangle whose solution count updates live, and its manipulate question ("set $a$ so two triangles form") starts at $a=1.2<h$, outside the answer window, so the learner must move it.
7 A11y: 3/4 - Shared player gives keyboard-reachable controls and an audio toggle, and the SVG carries a role and an aria-label reporting the solution count; the swing animation's reduced-motion handling and a live announcement of the changing count are not verified.
Blocking issues:
- None. Content, visuals, and interaction all hold up.
Top 3 fixes:
1. Pin the small triangle glyph on the law slide; it scrolls off the top by watch-end, leaving only the algebra.
2. Confirm the range slider announces the live solution count (aria-live) and that the swing animation honors prefers-reduced-motion.
3. Add one more manipulate or predict on the law slide (for example, lengthen $b$ or shorten $a$ until $\sin B$ would exceed $1$) to reach the no-triangle case interactively.
Verdict: SHIP
