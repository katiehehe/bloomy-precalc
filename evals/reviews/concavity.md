Lesson: concavity
Harness: PASS  Screenshots: yes
1 Accuracy: 4/4 - Every value checks out: the tangent slope of $x^2$ is $2a$ (so $-3,0,+3$ at $x=-1.5,0,1.5$), $f''(x)=6x$ for $x^3$ with the inflection at $(0,0)$, and the mixed cases are correct ($\sqrt{x}$ increasing yet concave down, the left arm of $x^2$ decreasing yet concave up).
2 Prereqs: 3/4 - It builds cleanly from the tangent-line test it defines itself, but slide 3 lands two new ideas at once (the inflection point plus the second derivative $f''(x)=6x$), and $f''$ is a forward-looking calculus tool for a precalc learner even though it is framed as a bonus.
3 Pedagogy: 4/4 - Concrete worked numbers on every slide, a dedicated misconception slide ("increasing $\neq$ concave up"), and a closing manipulate that starts at $x=-1.5$ (off the inflection answer) so the learner must move to solve it.
4 Wording: 4/4 - Concise and warm ("a cup or a valley that could hold water"), terms bolded on first use, all math in $...$, and no em dashes or semicolons after cleanup.
5 Visual: 4/4 - Each idea is drawn on a real coordinate plane with tangent lines lying visibly below the cup and above the cap, labeled slopes, a marked inflection point, and a live dock reporting $f''(x)=6x$ at the current $x$.
6 Interaction: 4/4 - The slide-5 slider drives a real point along $y=x^3$ with a live $(x, f''=6x, \text{concavity})$ readout, it is reversible, and it starts off-target.
7 A11y: 3/4 - Every figure spec carries a descriptive aria string, colors are paired with text labels (never color alone), and reduced-motion plus audio-off are handled by the shared engine, though keyboard focus and console cleanliness were not runtime-verified.
Blocking issues:
- None below 3/4. Ships as is.
Top 3 fixes:
1. Slide 5: the floating "concave down" label sits near the top-right of $y=x^3$, where the visible curve is actually concave up; attach it to the current point or the left arm so it cannot be misread.
2. Slide 3: split the inflection point and the second-derivative shortcut, or flag $f''$ more explicitly as optional, so only one genuinely new idea lands per slide.
3. Slide 1: the cup and cap plus four tangent arms cross into a busy X at the center; separate the two parabolas or dim the far tangents to cut clutter.
Verdict: SHIP
