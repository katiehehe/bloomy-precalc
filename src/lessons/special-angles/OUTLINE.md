# Special angles

**Skill:** `special-angles` (Unit 2, Trig completion)

**Goal (one sentence):** Read exact values of all six trigonometric functions at
the axis angles and at every 45°, 30°, and 60° angle around the full unit
circle, after scaling the 45-45-90 and 30-60-90 triangles so the hypotenuse is 1.

## Sources

- OpenStax Precalculus 2e, "The Unit Circle" and "The Other Trigonometric
  Functions": a point on the unit circle is $(\cos\theta, \sin\theta)$, the
  reciprocal identities, and the exact special-angle table.
- Sullivan, Precalculus, trigonometric functions of special angles (unit-circle
  approach). Cross-checked the 45-45-90 and 30-60-90 scalings and the
  rationalized forms $\tan 30^\circ = \sqrt{3}/3$, $\sec 30^\circ = 2\sqrt{3}/3$.
- Stewart, Precalculus, values of the trigonometric functions at special angles.

## Convention decisions

- Degrees, matching the unit-circle lesson the learner just finished.
- Reciprocal identities stated the instant they appear:
  $\tan\theta=\sin\theta/\cos\theta$, $\sec\theta=1/\cos\theta$,
  $\csc\theta=1/\sin\theta$, $\cot\theta=\cos\theta/\sin\theta$. Each is
  undefined when its denominator is 0.
- Axis order first: $0^\circ$, $90^\circ$, $180^\circ$, $270^\circ$, then
  $360^\circ=0^\circ$. Then the $45^\circ$ family, then $30^\circ$ and $60^\circ$.
- 45-45-90: legs 1, 1, hypotenuse $\sqrt{2}$, then divide by $\sqrt{2}$ and
  rationalize $1/\sqrt{2}=\sqrt{2}/2$.
- 30-60-90: half an equilateral triangle of side 2, so sides $1:\sqrt{3}:2$,
  then divide by 2. The short leg faces $30^\circ$.
- Full unit circle, never first-quadrant only. Labels sit on the figure. A
  compact readout lists the live values. No cramped coordinate dock.

## Figure

A full unit circle on `makePlane` (half-range 1.6) with the current family of
special-angle dots, a terminal side, dashed drops to the axes, and the current
$(x,y)$ label on the point. `FigureReadout` underneath shows $\theta$ and the
six function values as they are revealed. The 45-45-90 and 30-60-90 scalings
use `AlgebraFlow` with a small labeled triangle as the header.

## Slides

1. **Axis sine and cosine.** Walk $0^\circ$, $90^\circ$, $180^\circ$, $270^\circ$,
   then $360^\circ=0^\circ$. Manipulate to $180^\circ$.
2. **The other four functions.** Define $\tan$, $\cot$, $\sec$, $\csc$ and the
   undefined cases, then evaluate them on the axes.
3. **Scale a 45-45-90 to hypotenuse 1.** Pythagoras, divide by $\sqrt{2}$,
   rationalize, then all six values at $45^\circ$.
4. **The 45° family.** Same lengths $\sqrt{2}/2$, signs from the quadrant:
   $135^\circ$, $225^\circ$, $315^\circ$.
5. **Scale a 30-60-90 to hypotenuse 1.** Half an equilateral, divide by 2, then
   all six values at $30^\circ$.
6. **60° trades the same two lengths.** Short leg faces the smaller angle, so
   the coordinates at $30^\circ$ and $60^\circ$ swap.
7. **The 30° family.** $150^\circ$, $210^\circ$, $330^\circ$, with the reference
   angle named when it appears.
8. **The 60° family.** $120^\circ$, $240^\circ$, $300^\circ$.

## Questions grounded in takeaways

- Axis points and the four undefined cases (denominator 0).
- The four reciprocal identities, worded as definitions.
- After scaling, each 45° leg is $\sqrt{2}/2$, so sine and cosine are equal
  there and $\tan 45^\circ=1$.
- Quadrant signs on the 45° family, including reading a signed point back to
  an angle.
- 30-60-90 scaling and the short-leg rule that swaps $30^\circ$ with $60^\circ$.
- Full-circle copies: $150^\circ$, $210^\circ$, $120^\circ$, and the rest.
