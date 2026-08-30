# Polar graphs: roses, limaçons, cardioids

**Skill:** `polar-graphs` (folder `polar-roses` to avoid colliding with the
existing Base Camp lesson whose id is `polar-graphs`). Unit: Polar and complex.

**Goal (one sentence):** Graph a polar equation $r = f(\theta)$ by sweeping
$\theta$ and plotting each $(r, \theta)$, and recognize the standard families:
rose curves $r = \cos(n\theta)$ (petal count $n$ if $n$ is odd, $2n$ if $n$ is
even), the cardioid $r = 1 + \cos\theta$, and limaçons $r = a + b\cos\theta$
(inner loop when $a < b$, dimple when $a \ge b$).

## Sources

- OpenStax Precalculus 2e, Section 8.4 "Polar Coordinates: Graphs": graphing by
  making a table of $\theta$ and $r$ and plotting points; rose curves
  $r = a\cos(n\theta)$ or $r = a\sin(n\theta)$ with $2n$ petals when $n$ is even
  and $n$ petals when $n$ is odd; cardioids as the $\tfrac{a}{b} = 1$ case; and
  limaçons $r = a \pm b\cos\theta$ classified by the ratio $\tfrac{a}{b}$
  ($<1$ inner loop, $1$ cardioid, between $1$ and $2$ dimpled, $\ge 2$ convex).
- Sullivan, Precalculus, Section 9.2 "Polar Equations and Graphs": the same
  cardioid, limaçon, and rose classifications, plus the symmetry test that a
  $\cos\theta$ equation is symmetric about the polar axis (the $x$-axis).

## Convention decisions

- Degrees for $\theta$ (matches the sliders and the trig unit).
- Amplitude fixed at $1$ for the roses shown ($r = \cos(n\theta)$), so petal tips
  reach $r = 1$ and the petal-count rule is the only variable.
- Negative $r$ is plotted in the opposite direction (consistent with the
  conversion lesson), which is how the rose fills in petals as $\theta$ sweeps.
- Limaçon shown with $b = 1$ fixed while $a$ grows, so a single slider walks the
  learner from inner loop ($a < 1$) to cardioid ($a = 1$) to dimple to convex.

## Figure

Self-contained `Stage.tsx` built from shared components (`makePlane`,
`PlaneGrid`, `PlotMarkers`, `Tex`), inspired by the Base Camp polar figure's
curve-sweeping path builder but generalized to $r = f(\theta)$ for three modes:

- `rose`: $r = \cos(n\theta)$, slider `n`. HALF $= 1.4$.
- `cardioid`: $r = 1 + \cos\theta$, swept by `theta`. HALF $= 2.4$.
- `limacon`: $r = a + b\cos\theta$, sliders `a`, `b` (each an integer tenth).
  HALF $= 3.8$.

A faint ghost curve, a growing trace up to the current $\theta$, worked sample
dots, and a movable tracer with a live $r$ label. The dock shows the equation
plus the petal count or limaçon classification.

## Slides

1. **Sweeping out a graph (rose, $n = 2$).** Plot a few points of
   $r = \cos 2\theta$ ($\theta = 0, 30^\circ, 45^\circ$), then sweep to trace the
   four-petaled rose. Choices on what a polar curve is and on $r$ at $45^\circ$.
2. **Counting petals (rose, animate $n$).** Watch $n = 2, 3, 4, 5$. State the
   rule: odd $n$ gives $n$ petals, even $n$ gives $2n$. Choices on $\cos 2\theta$
   and $\cos 3\theta$.
3. **The cardioid (cardioid).** $r = 1 + \cos\theta$: max $2$ at $\theta = 0$,
   cusp at the origin where $r = 0$ at $\theta = 180^\circ$. Choices on $r$ at
   $180^\circ$ and where the max occurs.
4. **Limaçons (limacon, animate $a$ with $b = 1$).** $a < b$ inner loop, $a = b$
   cardioid, $a > b$ dimple flattening to convex at $a \ge 2b$. Choices on the
   loop condition and the cardioid case.
5. **Your turn (rose explorer).** Sliders set $n$ and sweep the tracer.
   Manipulate: make exactly $3$ petals (starts at $n = 2$). Plot: click the tip
   on the positive $x$-axis $(1, 0)$. Choice: petals of $\cos 4\theta$.

## Questions grounded in takeaways

- Petal count: $n$ if odd, $2n$ if even (traps: applying the wrong parity rule,
  using $n^2$).
- Cardioid $r = 1 + \cos\theta$: $r = 0$ at $\theta = 180^\circ$ (cusp), max at
  $\theta = 0$.
- Limaçon: inner loop iff $a < b$, cardioid iff $a = b$, dimpled for
  $1 < \tfrac{a}{b} < 2$, convex for $\tfrac{a}{b} \ge 2$.
- A polar curve comes from letting $r$ depend on $\theta$; negative $r$ plots in
  the opposite direction.
