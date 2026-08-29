# Multiply and divide in polar form

**Skill:** `polar-arith` (Unit: Polar and complex)

**Goal (one sentence):** Multiply and divide complex numbers written in polar
form by the two-move rules: to multiply, multiply the moduli and add the
arguments; to divide, divide the moduli and subtract the arguments (top minus
bottom).

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": the
  product $r_1 r_2[\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2)]$ and the
  quotient $\dfrac{r_1}{r_2}[\cos(\theta_1-\theta_2) + i\sin(\theta_1-\theta_2)]$.
- Sullivan, Precalculus, "The Complex Plane; De Moivre's Theorem": same product
  and quotient rules, with the derivation from the sum identities.
- Stewart, Precalculus. Cross-checked: the derivation expands the two factors,
  uses $i^2 = -1$, groups real and imaginary parts, and reads off the cosine and
  sine sum identities.

## Convention decisions

- Degrees for every argument (matches the trig unit the learner just finished and
  the figure sliders).
- $\text{cis}\,\theta$ is introduced once as shorthand for $\cos\theta + i\sin\theta$;
  learner copy prefers the full $\cos\theta + i\sin\theta$ form.
- Division subtracts top minus bottom: $\theta_1 - \theta_2$, not $\theta_2 - \theta_1$.
- Figure moduli are fixed and small: $r_1 = 2$, $r_2 = 1$, so the product modulus
  $r_1 r_2 = 2$ stays inside the plane (half range $5.5$).

## Figure

Shared `ComplexPlane`. Geometry view draws three arrows from the origin: $z_1$
(tone a), $z_2$ (tone b), and the result $z_1 z_2$ or $z_1/z_2$ (tone primary),
each labelled, with an arc on the result showing its argument. Two integer
sliders $\theta_1$ and $\theta_2$ (degrees, step 15) turn $z_1$ and $z_2$; a dock
shows the moduli operation and the angle operation live. Derive view swaps in the
shared `AlgebraFlow` for the line-by-line proof, with an `AngleCircle` glyph
showing $\theta_1$, $\theta_2$, and $\theta_1 + \theta_2$.

## Slides

1. **Multiply: add the angles, multiply the lengths.** Two moves. Multiply the
   moduli ($2 \times 1 = 2$); add the arguments. As $z_2$ turns, the product
   swings to $\theta_1 + \theta_2$. Pure-rotation aside with moduli 1 isolates
   "add the angles"; cis is defined here.
2. **Why it works: the derivation.** Expand
   $(\cos\theta_1 + i\sin\theta_1)(\cos\theta_2 + i\sin\theta_2)$ with FOIL, use
   $i^2 = -1$, group real and imaginary parts, and apply the sum identities to
   land on $\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2)$, then restore the
   lengths.
3. **Divide: subtract the angles, divide the lengths.** Divide the moduli;
   subtract top minus bottom. As $z_2$ turns, the quotient angle drops to
   $\theta_1 - \theta_2$. Callout on subtraction order.
4. **Your turn.** Sliders drive $z_1$ and $z_2$ live. Manipulate: steer the
   product straight up ($\theta_1 + \theta_2 = 90^\circ$), starting off the
   answer. Choice: a quotient argument with the order trap.

## Questions grounded in takeaways

- Multiply: multiply the moduli, add the arguments (traps: adding moduli,
  multiplying arguments).
- Divide: divide the moduli, subtract the arguments top minus bottom (traps:
  subtracting moduli, dividing arguments, wrong subtraction order).
- Derivation: the term $i^2\sin\theta_1\sin\theta_2$ becomes
  $-\sin\theta_1\sin\theta_2$; the real part is $\cos(\theta_1+\theta_2)$, the
  imaginary part is $\sin(\theta_1+\theta_2)$.
- $\text{cis}\,\theta = \cos\theta + i\sin\theta$; multiplying by $i$ adds $90^\circ$.
