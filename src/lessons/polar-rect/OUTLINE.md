# How to convert polar and rectangular

**Skill:** `polar-rect` (Unit: Polar and complex)

**Goal (one sentence):** Move a point between rectangular coordinates $(x, y)$ and
polar coordinates $(r, \theta)$ in both directions, using $x = r\cos\theta$,
$y = r\sin\theta$ and $r = \sqrt{x^2 + y^2}$, $\theta = \tan^{-1}\tfrac{y}{x}$
(with a quadrant fix), and understand that $(r, \theta)$ is not unique.

## Sources

- OpenStax Precalculus 2e, Section 8.3 "Polar Coordinates": the conversion
  formulas $x = r\cos\theta$ and $y = r\sin\theta$; the reverse relations
  $r^2 = x^2 + y^2$ and $\tan\theta = \tfrac{y}{x}$; and the fact that a point has
  more than one polar representation (add multiples of a full turn, or negate $r$
  and add a half turn).
- Sullivan, Precalculus, Section 9.1 "Polar Coordinates": same conversion
  relations, the quadrant adjustment on the inverse-tangent angle, and the
  convention that a negative $r$ is plotted in the direction opposite the angle.

## Convention decisions

- Degrees for every angle (matches the trig unit the learner just finished and
  the figure sliders). One quiz item translates $\tfrac{\pi}{6}$ to check radian
  fluency.
- Learner copy writes the inverse tangent as $\tan^{-1}$ (spoken "arctangent").
  The figure computes the angle with a full four-quadrant routine internally, so
  the readout stays correct in every quadrant, but the formula shown is
  $\tan^{-1}\tfrac{y}{x}$ with an explicit "add $180^\circ$ when $x < 0$" rule.
- Clean worked points only: $(3, 4) \to (5, 53.13^\circ)$, $(4, 60^\circ)$,
  $(\sqrt3, 1) \to (2, 30^\circ)$, and quadrant-II example $(-3, 4)$.

## Figure

Reuses the Base Camp polar figure (`../polar/Figure`) through `Stage.tsx`. The
same right-triangle drawing (legs $x$ and $y$, hypotenuse $r$, swept angle
$\theta$) serves the convert, worked, and play modes. The dock shows either the
live $(r, \theta)$ and $(x, y)$ readout or the four conversion formulas with
numbers substituted. The `reveal` bag is forwarded to the shared figure so its
overlays light up.

## Slides

1. **What polar and rectangular coordinates name (mode convert).** Base Camp
   framing: one point, two natural addresses. Rectangular $(x, y)$ goes across
   and up. Polar $(r, \theta)$ uses distance from the origin and angle from the
   positive $x$-axis. Reveal legs, then radius, then the swept angle. Manipulate:
   rotate to $\theta = 90^\circ$ (starts at $45^\circ$).
2. **How to convert polar to rectangular (mode worked).** Right triangle gives
   $x = r\cos\theta$, $y = r\sin\theta$. Worked $(4, 60^\circ) \to (2, 2\sqrt3)$.
   Cosine with $x$, sine with $y$. Choices on the pair and on $x$.
3. **How to convert rectangular to polar (mode worked).** $r = \sqrt{x^2+y^2}$ and
   $\theta = \tan^{-1}\tfrac{y}{x}$. Worked $(3,4) \to (5, 53.13^\circ)$, then the
   quadrant fix with $(-3, 4) \to 126.87^\circ$. Choices on $r$ and the quadrant.
4. **Why one point has many polar names (mode play).** $(r, \theta)$ is not unique: add
   $360^\circ$, or use a negative $r$ with a half-turn. Rectangular is unique.
   Choices on both freedoms.
5. **Your turn: convert between polar and rectangular (mode play).** Two sliders drive the point live. Manipulate: place
   $(x, y) = (-2, 2)$ (starts parked at $(\sqrt3, 1)$). Plot: click
   $(4, 120^\circ) = (-2, 3.46)$. Choice: $(3, 270^\circ) = (0, -3)$.

## Questions grounded in takeaways

- Polar to rectangular uses cosine for $x$ and sine for $y$ (trap: swapping them).
- Rectangular to polar roots the sum of squares for $r$ (traps: adding parts,
  dropping the root) and needs a quadrant fix on $\tan^{-1}$ when $x < 0$ (trap:
  reporting the bare quadrant-IV angle).
- $(r, \theta)$ is not unique: $\theta + 360^\circ$ and $(-r, \theta + 180^\circ)$
  name the same point; the origin has an undefined angle.
- Degrees vs radians: $\tfrac{\pi}{6} = 30^\circ$.
