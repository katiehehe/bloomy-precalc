# Eliminating the parameter

**Skill:** `param-elim` (Unit 4: Parametrics)

**Goal (one sentence):** Convert a parametric pair $x = x(t)$, $y = y(t)$ into a
single Cartesian equation in $x$ and $y$, by substitution (solve one equation for
$t$, substitute into the other) or by the trig method (isolate $\cos t$ and
$\sin t$, square, and add via $\cos^2 t + \sin^2 t = 1$), and see how the
parameter's range can restrict the Cartesian graph to only a piece of the full
curve.

## How this differs from Base Camp `parametrics`

Base Camp `parametrics` eliminates the parameter only in passing, as one beat per
slide. This standalone lesson is entirely about elimination: a step-by-step
`AlgebraFlow` derivation for the substitution method, a second for the trig
method (circle), a third for the ellipse case (divide before squaring), and then
two coordinate-plane slides that make the **range restriction** concrete. The
sibling `param-graph` lesson handles plotting and orientation.

## Sources

- **OpenStax Precalculus 2e, Section 8.6 "Parametric Equations."** The two
  methods used here verbatim: to eliminate $t$, solve one equation for $t$ and
  substitute into the second; for trigonometric pairs $x = a\cos t$, $y = b\sin t$
  solve for $\cos t$ and $\sin t$, then apply $\cos^2 t + \sin^2 t = 1$ to get
  $(x/a)^2 + (y/b)^2 = 1$. Their worked example $x = 4\cos t$, $y = 3\sin t$
  eliminates to $x^2/16 + y^2/9 = 1$, and the chapter notes to check the domain so
  the Cartesian graph matches the range of $t$.
- **Stewart, Precalculus, Section 8.4 "Plane Curves and Parametric Equations."**
  Finding a rectangular-coordinate equation for a curve by eliminating the
  parameter, choosing whichever equation is simpler to solve for $t$, and noting
  that the parameter interval can restrict the graph to part of the full curve.

## Convention decisions

- **Substitution example:** $x = t + 1$, $y = t^2$. Solve the linear equation:
  $t = x - 1$, substitute: $y = (x - 1)^2$, a parabola with vertex $(1, 0)$.
- **Trig circle:** $x = \cos t$, $y = \sin t \to x^2 + y^2 = 1$.
- **Trig ellipse:** $x = 3\cos t$, $y = 2\sin t \to \dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$
  (divide by the radius before squaring, so the $9$ and $4$ appear).
- **Range restriction:** $x = \cos t$, $y = \sin t$ with $0 \le t \le \pi$
  eliminates to $x^2 + y^2 = 1$ but covers only the upper half ($y \ge 0$).
- **Slider (plane slides):** one integer parameter, value $0$ to $100$, mapped to
  real $t = (\text{value}/100)\pi$ in $[0, \pi]$, step $5$.
- **No giveaways:** the your-turn manipulate targets the top $(0, 1)$ at
  $t = \tfrac{\pi}{2}$, with the point parked in the upper-left at about
  $t = \tfrac{3\pi}{4}$ (off answer). The plot asks for the left endpoint
  $(-1, 0)$ at $t = \pi$, and no labeled endpoint dot is shown on that slide.

## Figure and Stage

`Stage.tsx` switches on `slide.mode`:

- **derive-sub, derive-circle, derive-ellipse:** the shared `AlgebraFlow`
  component writes the derivation one line per beat (each step labeled with the
  move: solve, substitute, isolate, square, add), with a small auto-fit parametric
  glyph (`MiniParam`) as the header so the slot always shows the curve.
- **restrict, practice:** `Figure.tsx` (makePlane, PlaneGrid, PlotMarkers,
  `HALF = 1.8`) draws the full unit circle faint, the restricted upper arc bright,
  the live point with drop-lines and label, and the endpoint markers. The dock
  shows $x = \cos t$, $y = \sin t$, the eliminated $x^2 + y^2 = 1$, the restriction
  $0 \le t \le \pi \Rightarrow y \ge 0$, and the live $t$, $x$, $y$.

## Slides

1. **How to eliminate a parameter by substitution** (`derive-sub`). Solve the simpler equation for $t$,
   substitute into the other: $x = t + 1$, $y = t^2 \to y = (x - 1)^2$. Seed the
   restriction idea (an unrestricted $t$ keeps the whole parabola).
2. **How a sine-cosine pair becomes a circle** (`derive-circle`). Isolate, square, add, use
   $\cos^2 t + \sin^2 t = 1$: $x = \cos t$, $y = \sin t \to x^2 + y^2 = 1$.
3. **How a sine-cosine pair becomes an ellipse** (`derive-ellipse`). Divide by each radius first,
   then square and add: $x = 3\cos t$, $y = 2\sin t \to x^2/9 + y^2/4 = 1$.
4. **Why the range of $t$ can restrict the curve** (`restrict`). $x^2 + y^2 = 1$ is the whole
   circle, but $0 \le t \le \pi$ traces only the upper semicircle ($y \ge 0$).
   Choices: which part is covered, and why an arc results.
5. **Your turn: eliminate a parameter** (`practice`). The $t$ slider rides the point along the upper arc.
   Manipulate: slide to the top $(0, 1)$ at $t = \tfrac{\pi}{2}$. Plot: the left
   end $(-1, 0)$ at $t = \pi$. Choice: the curve never reaches $(0, -1)$.

## Questions grounded in takeaways

- Substitution: solve the simpler equation for $t$, then substitute.
- Trig method: isolate $\cos t$, $\sin t$, square, add, use the identity.
- Equal radii give a circle $x^2 + y^2 = r^2$; different radii give an ellipse
  $(x/a)^2 + (y/b)^2 = 1$.
- A restricted range of $t$ keeps only a piece of the full Cartesian curve.
- Traps: solving the harder equation, dropping a constant, mis-squaring
  $(x - 1)^2$ as $x^2 - 1$, forgetting to square the radius, using $x^2 + y^2 = 1$
  for an ellipse, and keeping the whole curve after a restricted range.
