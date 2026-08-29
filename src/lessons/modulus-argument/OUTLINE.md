# Modulus and argument

**Skill:** `modulus` (Unit 3, Polar and complex polar)

**Goal (one sentence):** Given a complex number $z = a + bi$, plot it on the
Argand plane and read its two polar measurements: the modulus $|z| = r =
\sqrt{a^2+b^2}$ (distance from the origin) and the argument $\theta = \arg z$
(the angle from the positive real axis).

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

## Slides

1. **A complex number is a point.** Real part = horizontal, imaginary part =
   vertical; $z=3+4i$ sits at $(3,4)$. Plot a different number ($2+3i$).
2. **Modulus is distance.** Drop the legs $a=3$, $b=4$; Pythagoras gives
   $r=\sqrt{3^2+4^2}=\sqrt{25}=5$. Choice checks (including $5+12i\to 13$).
3. **Argument is direction.** The angle from the $+$real axis; $\tan\theta=b/a$,
   so $\theta=\arctan(4/3)\approx 53.1^\circ$. Quadrant fix when $a<0$
   ($-3+4i$ is in QII, $\theta\approx 126.9^\circ$).
4. **Your turn.** Move $z$; the legs, modulus, and angle track together.
   Manipulate: make $|z|=5$; then land $z$ in quadrant II with $|z|=5$.

## Questions grounded in takeaways

- Modulus is $\sqrt{a^2+b^2}$, never $a+b$ and never squared away.
- $\tan\theta = b/a$ (opposite over adjacent), not $a/b$.
- Quadrant fix: $\arctan(b/a)$ alone is wrong when $a<0$.
- Modulus is a length, so it is never negative.
