# Parametric motion models (projectile motion)

**Skill:** `param-motion` (Unit 4: Parametrics)

**Goal (one sentence):** Model real motion over time with parametric equations,
reading a position $(x(t), y(t))$ at a time $t$, seeing why a steady horizontal
$x(t)$ and a gravity-bent quadratic $y(t)$ trace a parabola, and computing the
landing time, maximum height, and range of a ground launch.

## How this differs from Base Camp `parametrics`

The Base Camp `parametrics` lesson teaches graphing a parametric curve,
eliminating the parameter, and the Lissajous figure. It treats $t$ as an
abstract parameter. This lesson is complementary: **$t$ is time**, and the pair
$(x(t), y(t))$ is a physical position that moves. The focus is the canonical
precalculus motion model, projectile motion, and the quantities you read from
it (landing time, peak time, maximum height, range). No parameter elimination
and no Lissajous here.

## Sources

- OpenStax Precalculus 2e, Parametric Equations and "Parametric Equations:
  Graphs" (the projectile / thrown-object example): horizontal position is
  linear, $x(t) = (v_0\cos\theta)\, t$, and vertical position is quadratic,
  $y(t) = h_0 + (v_0\sin\theta)\, t - \tfrac{1}{2}g t^2$.
- Larson, Precalculus, "Parametric Equations": same projectile model; range is
  the horizontal distance at the landing time; the maximum height is the vertex
  of the vertical component.
- Stewart, Precalculus, "Parametric Equations and Motion". Cross-checked: for a
  ground-to-ground launch the vertex (peak) time is exactly half the landing
  time, by the symmetry of the parabola $y(t)$.

## Convention decisions

- **Units and $g$:** distances and time are kept in clean whole-number units so
  every worked answer is exact. Gravity is folded into the quadratic coefficient
  and stated explicitly: the vertical equation $y(t) = 4t - t^2$ has the gravity
  term $-t^2$, which is $-\tfrac{1}{2}g t^2$ with $\tfrac{1}{2}g = 1$ (so $g = 2$
  in these units). Real $g = 9.8$ or $32$ would give messy decimals, so it is
  folded rather than plugged in. The idea (gravity makes $y$ quadratic) stays
  front and center.
- **Ground launch at the origin:** $h_0 = 0$, so the launch point is $(0, 0)$ and
  the ground is the $x$-axis ($y = 0$). This makes "solve $y(t) = 0$ for the
  landing time" clean.
- **Running example:** $x(t) = 2t$, $y(t) = 4t - t^2 = t(4 - t)$.
  - Landing time: $y(t) = 0$ with $t > 0$ gives $t = 4$.
  - Peak time: half the landing time, $t = 2$ (also the vertex of $y$).
  - Maximum height: $y(2) = 8 - 4 = 4$.
  - Range: $x(4) = 8$; it lands at $(8, 0)$.
  - Integer waypoints: $(0,0), (2,3), (4,4), (6,3), (8,0)$, symmetric about
    $t = 2$ (so $t = 1$ and $t = 3$ share height $3$).
- The figure uses one integer time slider $t$ (0 to 100, mapped to real time
  $0$ to $4$), so the marker rides the arc and the dock reads the live position.

## Figure

A coordinate plane (`makePlane(SIZE, HALF)` with `HALF = 8.5`) with:

- a ground line at $y = 0$;
- the full parabolic trajectory (ghost) for $t \in [0, 4]$, plus a bright trace
  of the traveled part up to the current $t$;
- a marker at the current position with its coordinate label;
- dashed drop-lines from the marker to the $x$-axis and $y$-axis, with the live
  $x$ and $y$ values (pencil-mimic of reading $(x(t), y(t))$);
- reveal-gated peak marker at $(4, 4)$ and landing marker at $(8, 0)$.

The time slider (and dragging the marker to the nearest $t$ along the arc)
drives everything. The `Stage` dock shows $x(t) = 2t$, $y(t) = 4t - t^2$, and the
live $t$, $x$, and $y$.

## Slides

1. **How position is written at a time $t$.** Define a motion model: at each time $t$ the object
   is at the pair $(x(t), y(t))$. Read the running example at $t = 1$ (giving
   $(2, 3)$) and $t = 3$ (giving $(6, 3)$), demonstrated with drop-lines; note
   the shared height. Pretest plot: predict $t = 2$ at $(4, 4)$. Choice: the
   first coordinate is the horizontal position.
2. **Why the path is a parabola.** Separate the coordinates: $x(t) = 2t$ is linear (equal
   steps each second), $y(t) = 4t - t^2$ is quadratic (the $-t^2$ gravity term
   bends it). Steady sideways plus gravity-bent vertical forces the parabola.
   Choice: which coordinate is quadratic; choice: $x$ is linear.
3. **How to find landing time, peak, and range.** Landing: solve $y(t) = t(4 - t) = 0$, take $t = 4$;
   range is $x(4) = 8$. Peak: vertex time is half the landing time, $t = 2$;
   maximum height is $y(2) = 4$. Name each step like a pencil would. Choice
   (landing time), choice (maximum height, catching the dropped-gravity and
   wrong-time traps).
4. **Your turn: read a projectile's path.** The time slider drives the marker along the arc; the dock and
   drops update live. Manipulate: set $t = 3$ (start parked at $t = 0$, outside
   the answer). Plot: click the landing point $(8, 0)$. Choice: error-spot the
   "highest at $t = 4$" mistake (at $t = 4$ the height is $0$, the ground).

## Questions grounded in takeaways

- Position at a time is the pair $(x(t), y(t))$; plug $t$ into both.
- $x$ is linear (steady, no horizontal force); $y$ is quadratic (gravity), which
  is why the path is a parabola.
- Landing time solves $y(t) = 0$ for $t > 0$; range is $x$ at the landing time.
- Peak time is half the landing time (ground to ground); maximum height is $y$ at
  the peak time.
- Traps: swapping $x$ and $y$, using the wrong equation, forgetting gravity makes
  $y$ quadratic, using the landing time for the max height (off by a factor of 2,
  since the peak time is half the landing time), sign errors on $-\tfrac{1}{2}g t^2$,
  and confusing the range (a distance) with a time.
