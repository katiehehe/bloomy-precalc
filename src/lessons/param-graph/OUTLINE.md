# Graphing parametric equations

**Skill:** `param-graph` (Unit 4: Parametrics)

**Goal (one sentence):** Graph a curve given by $x = x(t)$ and $y = y(t)$ by
building a table of $(t, x, y)$, plotting the points, and connecting them in
order of increasing $t$, then read the orientation (direction of travel) from the
arrows, keeping in mind that $t$ often stands for time.

## How this differs from Base Camp `parametrics`

Base Camp `parametrics` sprints through a line, the unit circle, free
coordinates, and a Lissajous finale, and each slide also eliminates the
parameter. This standalone lesson slows down on the single skill of **graphing by
plotting points**: one running curve, one table built row by row, one careful
"connect in order of increasing $t$" step, and a dedicated slide on
**orientation**. Elimination is left to the sibling `param-elim` lesson.

## Sources

- **OpenStax Precalculus 2e, Section 8.7 "Parametric Equations: Graphs."** The
  point-plotting method used here verbatim: construct a table with three columns
  $t$, $x(t)$, $y(t)$, choose $t$ in increasing order, plot the pairs $(x, y)$,
  and draw arrows to show the orientation (direction of increasing $t$). Their
  worked example $x(t) = t^2 + 1$, $y(t) = 2 + t$ is a right-opening parabola that
  fails the vertical line test, exactly the family of our example.
- **Stewart, Precalculus, Section 8.4 "Plane Curves and Parametric Equations."**
  A plane curve is the set of points $(x(t), y(t))$ over an interval of $t$;
  sketch it from a table of values and indicate the orientation with arrows in
  the direction of increasing $t$.

## Convention decisions

- **Running curve:** $x(t) = t^2 - 1$, $y(t) = t$, for $-2 \le t \le 2$. Chosen so
  every table row is a clean integer and the curve is symmetric about the
  $x$-axis:
  - $t = -2 \to (3, -2)$
  - $t = -1 \to (0, -1)$
  - $t = 0 \to (-1, 0)$ (the vertex)
  - $t = 1 \to (0, 1)$
  - $t = 2 \to (3, 2)$
  It is a right-opening parabola (eliminating gives $x = y^2 - 1$), traced
  **upward** as $t$ increases because $y = t$, and it fails the vertical line
  test ($x = 3$ comes from $t = \pm 2$).
- **Slider:** one integer parameter, value $-100$ to $100$, mapped to real
  $t = \text{value}/50$ in $[-2, 2]$, step $5$.
- **No giveaways:** slide 1 demonstrates $t = -1$ and $t = 0$ and asks the learner
  to plot $t = 1$; the your-turn slide shows no sample dots and asks the learner
  to plot $t = -2$ and to slide to $t = 2$ (start parked at $t = 0.5$, off answer).

## Figure

`Figure.tsx` (makePlane, PlaneGrid, PlotMarkers), `HALF = 4`. It draws the ghost
curve, a bright trace up to the current $t$, the demonstrated table dots per mode,
two orientation arrowheads (one per arm, pointing the way $t$ increases), the live
point with its $(x, y)$ label, and dashed drop-lines to the axes. `Stage.tsx`
docks the two equations, the $(t, x, y)$ table (current row highlighted), and the
live $t$, $x$, $y$ readout.

## Slides

1. **One parameter, a point** (mode `table`). Define parametric equations and the
   pair $(x(t), y(t))$. Build the first table rows $t = -1 \to (0, -1)$ and
   $t = 0 \to (-1, 0)$ as demonstrated dots. Plot pretest: $t = 1 \to (0, 1)$.
   Choice: substitute into both, then plot $(x, y)$.
2. **Connect in order of $t$** (mode `connect`). Finish the table, plot all five
   points, and connect them in order of increasing $t$ (a point sweeps the curve).
   It is a right-opening parabola that fails the vertical line test. Choices:
   connect in $t$-order; why it is not a function of $x$.
3. **Orientation is direction** (mode `orient`). Orientation = direction of travel
   as $t$ increases, marked by arrows. The point climbs because $y = t$. $t$ often
   means time; $y = -t$ traces the same parabola in reverse. Choices: travel
   direction; what arrows show.
4. **Your turn** (mode `practice`). The $t$ slider rides the point along the curve
   with live drops. Manipulate: slide to the top $(3, 2)$ at $t = 2$ (parked at
   $t = 0.5$). Plot: the bottom $(3, -2)$ at $t = -2$. Choice: error-spot
   connecting left to right instead of by $t$.

## Questions grounded in takeaways

- A point is $(x(t), y(t))$: substitute $t$ into both, then plot $(x, y)$.
- Build a table with $t$ increasing; connect points in order of increasing $t$.
- Orientation is the direction of travel as $t$ increases (arrows), and $t$ is
  often time.
- The running curve fails the vertical line test, so it is not a function of $x$.
- Traps: plotting $(t, x)$ or the swapped $(y, x)$, dropping the $-1$, sign slips
  on $y = t$, connecting by $x$ instead of by increasing $t$, and reversing the
  orientation.
