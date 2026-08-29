Lesson: angular-velocity
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - $s=r\theta$, the radian definition ($\theta=1\Rightarrow s=r$), the $v=\tfrac{s}{t}=r\omega$ derivation, the worked $v=3\omega$, and the quiz (including $30$ rpm $=\pi$ rad/s and the degree trap where $30^\circ$ gives $s=\tfrac{5\pi}{3}\approx 5.24$) are all correct.
2 Prereqs: 4/4 - Builds directly on radians and arc length and introduces one idea per slide (arc length, then $v=r\omega$, then a worked value); the rpm items in Summit extend the idea but reuse the taught $1$ revolution $=2\pi$.
3 Pedagogy: 3/4 - A clean substitute-and-regroup derivation is followed by a manipulate that starts at $\omega=0$ (off the $v=12$ target), but retrieval is 5 choice questions to a single manipulate.
4 Wording: 4/4 - Concise and vivid ("Two speeds live on a spinning wheel", "the farther out you sit, the faster you move"), terms bolded, all math in $...$, and no em dashes or semicolons.
5 Visual: 3/4 - The gauge draws the radius, the swept arc, and a tangent velocity arrow, and the derivation writes itself line by line, but on the worked slide $\omega$ stays at $0$, so the watch shows $v=3\cdot 0=0$ with no green arrow (the arrow the narration promises appears only once the learner drags), and the derive slide's wheel is clipped at the top by auto-scroll.
6 Interaction: 3/4 - The $\omega$ slider scales the velocity arrow and the live $v=3\omega$ readout and starts off-target at $0$, but slides 1 and 2 are watch-only.
7 A11y: 3/4 - The shared player gives a keyboard-reachable slider and buttons, an audio toggle, and text narration, the wheel has an aria-label, and the arrow's meaning is carried by the $v=r\omega$ label and the "r" tag rather than color alone.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Animate $\omega$ to a nonzero value during the worked slide's watch so the green velocity arrow actually appears and the demonstrated result is not $v=0$.
2. Keep the wheel header fully visible on the derive slide, where auto-scroll currently clips its top.
3. Convert one choice question to a manipulate (or add one) so practice is not dominated by four-option recognition.
Verdict: SHIP
