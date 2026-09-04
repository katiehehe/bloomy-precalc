# What trigonometric form is

**Skill:** `trig-form` (Unit: Polar and complex)

**Goal (one sentence):** Read and write a complex number in trigonometric
(polar) form $z = r(\cos\theta + i\sin\theta)$, converting to and from the
rectangular form $a + bi$ by connecting the modulus $r$ and argument $\theta$
to the coordinates $a = r\cos\theta$ and $b = r\sin\theta$.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers":
  $z = r(\cos\theta + i\sin\theta)$ with $r = \sqrt{a^2+b^2}$, $a = r\cos\theta$,
  $b = r\sin\theta$, and $\tan\theta = \dfrac{b}{a}$ with a quadrant check.
- Sullivan, Precalculus, "The Complex Plane; De Moivre's Theorem".
- Stewart, Precalculus, "Polar Form of Complex Numbers". Cross-checked: the
  factor $r$ multiplies both terms and the $i$ sits on the sine term only.

## Convention decisions

- Degrees for the argument (matches the trig unit and the modulus lesson that
  precedes this one).
- The building example is $z = \sqrt{3} + i = 2(\cos 30^\circ + i\sin 30^\circ)$,
  which has a clean integer modulus $r = 2$ reachable by the slider.
- The figure is driven by two integer sliders: modulus $r$ (1 to 5) and argument
  $\theta$ in degrees (0 to 330, step 30), so $\cos\theta$ and $\sin\theta$ land
  on the special-angle values. The point is computed as $(r\cos\theta, r\sin\theta)$.
- "cis" shorthand is deliberately avoided; the full $\cos + i\sin$ is written out
  so the $i$-on-sine structure stays visible.

## Figure

Shared `ComplexPlane`: an arrow from the origin to $z = (r\cos\theta, r\sin\theta)$
with the right-triangle legs (the real leg $r\cos\theta$ and the imaginary leg
$r\sin\theta$), the modulus labelled $r$ on the arrow, and the argument arc
labelled $\theta$. Two integer sliders ($r$, $\theta$) drive the point; a dock
shows both forms updating live: the trig form $r(\cos\theta + i\sin\theta)$ and
the rectangular form $a + bi$.

## Slides

1. **What trigonometric form is** Define $z = r(\cos\theta + i\sin\theta)$: $r$ is the
   modulus (length), $\theta$ the argument (direction). Decompose the point into
   the horizontal part $r\cos\theta$ and the vertical part $r\sin\theta$. Stress
   that $i$ multiplies the sine term only. Pretest plot: $4(\cos 0^\circ + i\sin 0^\circ)$.
2. **How to convert rectangular to trigonometric form** From $a + bi$ find $r = \sqrt{a^2+b^2}$ and
   $\theta = \arg z$. Worked: $\sqrt{3} + i \to 2(\cos 30^\circ + i\sin 30^\circ)$
   (shown), and $1 + i \to \sqrt{2}(\cos 45^\circ + i\sin 45^\circ)$ (in text).
3. **How to convert trigonometric form to rectangular** Evaluate $\cos\theta$ and $\sin\theta$, multiply by
   $r$. Worked: $2(\cos 60^\circ + i\sin 60^\circ) = 1 + \sqrt{3}\,i$; the quarter
   turns $4(\cos 90^\circ + i\sin 90^\circ) = 4i$ and $3(\cos 180^\circ + i\sin 180^\circ) = -3$.
4. **Your turn: write a number in trigonometric form** Trig form drives the point. Manipulate: set $z$ to
   $2(\cos 60^\circ + i\sin 60^\circ)$ (start at $r=3$, $\theta=0$, outside the
   answer). Plot: $2(\cos 90^\circ + i\sin 90^\circ) = 2i$. Choice: catch the
   dropped-$i$ trap.

## Questions grounded in takeaways

- Trig form is $r(\cos\theta + i\sin\theta)$: $r$ multiplies both terms, $i$ is on
  sine only (not $r(\cos\theta + \sin\theta)$, not $r(\sin\theta + i\cos\theta)$).
- Rectangular to trig: $r = \sqrt{a^2+b^2}$, $\theta$ by quadrant.
- Trig to rectangular: $a = r\cos\theta$, $b = r\sin\theta$; keep the $i$ on $b$.
- Traps: dropping the $i$, swapping sine and cosine, using the wrong-quadrant
  angle, forgetting $r$ multiplies both terms, mixing degrees and radians.
