# Modulus and argument

**Skill:** `modulus` (Unit 3, Polar and complex polar)

**Goal (one sentence):** Given a complex number $z = a + bi$, plot it on the
Argand plane and read its two polar measurements: the modulus $|z| = r =
\sqrt{a^2+b^2}$ (distance from the origin) and the argument $\theta = \arg z$
(the angle from the positive real axis), then extend the modulus to the distance
between two points, $|z_1 - z_2|$.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": modulus
  $|z|=\sqrt{a^2+b^2}$, argument via $\tan\theta = \dfrac{b}{a}$ with quadrant
  adjustment.
- Sullivan, Precalculus, "Polar Form of Complex Numbers".
- Stewart, Precalculus. Cross-checked: modulus is always non-negative; the
  principal argument is taken in $(-180^\circ, 180^\circ]$ here (degrees).

## Convention decisions

- Degrees for the argument (matches the trig unit the learner just finished).
- Principal value of $\arg z$ in $(-180^\circ, 180^\circ]$.
- The bare $\arctan(b/a)$ lands in quadrant I or IV; add $180^\circ$ when $a<0$
  to reach quadrants II or III. This quadrant fix is called out explicitly.
- Running example $z = 3 + 4i$: clean modulus $5$ (a 3-4-5 triangle), argument
  $\arctan(4/3)\approx 53.1^\circ$.

## Figure

Shared `ComplexPlane`: an arrow from the origin to $z=(a,b)$, with the
right-triangle legs $a$ and $b$, the modulus as the arrow length, and the
argument as an angle arc. Two integer sliders `re`, `im` place $z$; a dock shows
$|z|$ and $\arg z$ updating live.

The `distance` mode reuses `ComplexPlane` with two free-standing labelled
`points` ($z_1$, $z_2$) and `segments`: the solid joining segment (the distance)
plus the two dashed right-triangle legs (the horizontal and vertical gaps). The
dock builds $z_1 - z_2 = 3 + 4i$ and $|z_1 - z_2| = \sqrt{3^2+4^2} = 5$.

## Slides

1. **What a complex number looks like as a point** Real part = horizontal, imaginary part =
   vertical; $z=3+4i$ sits at $(3,4)$. Plot a different number ($2+3i$).
2. **What the modulus of a complex number is** Drop the legs $a=3$, $b=4$; Pythagoras gives
   $r=\sqrt{3^2+4^2}=\sqrt{25}=5$. Choice checks (including $5+12i\to 13$).
3. **How to find the distance between two complex numbers** Extend the modulus: the distance between
   $z_1=4+5i$ and $z_2=1+i$ is $|z_1-z_2|=|3+4i|=5$. The real/imaginary parts of
   the difference are the horizontal/vertical gaps (legs of a right triangle),
   and order does not matter since $|z_2-z_1|$ has the same modulus.
4. **What the argument of a complex number is** The angle from the $+$real axis; $\tan\theta=b/a$,
   so $\theta=\arctan(4/3)\approx 53.1^\circ$. Quadrant fix when $a<0$
   ($-3+4i$ is in QII, $\theta\approx 126.9^\circ$).
5. **Your turn: read a modulus and argument** Move $z$; the legs, modulus, and angle track together.
   Manipulate: make $|z|=5$; then land $z$ in quadrant II with $|z|=5$.

## Questions grounded in takeaways

- Modulus is $\sqrt{a^2+b^2}$, never $a+b$ and never squared away.
- $\tan\theta = b/a$ (opposite over adjacent), not $a/b$.
- Quadrant fix: $\arctan(b/a)$ alone is wrong when $a<0$.
- Modulus is a length, so it is never negative.
- Distance between two points is $|z_1-z_2|$ (difference, not sum), and it roots
  the squared gaps rather than adding them.
