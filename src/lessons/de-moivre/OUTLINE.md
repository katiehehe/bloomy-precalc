# De Moivre and roots of unity

**Skill:** `de-moivre` (Polar and complex)

**Goal (one sentence):** Use De Moivre's theorem to raise a complex number in
polar form to a power (raise the modulus to the $n$, multiply the argument by
$n$), and use the same idea in reverse to find the $n$ equally spaced $n$th roots
of unity around the unit circle.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": De
  Moivre's theorem $[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta +
  i\sin n\theta)$ and the $n$th-root theorem
  $z_k = r^{1/n}\big[\cos\frac{\theta + 2\pi k}{n} + i\sin\frac{\theta + 2\pi k}{n}\big]$.
- Sullivan, Precalculus, "De Moivre's Theorem" and "Complex Roots".
- Stewart, Precalculus. Cross-checked: there are exactly $n$ distinct $n$th
  roots; the roots of unity ($w = 1$) start at $z = 1$ and are spaced $360/n$
  degrees apart on the unit circle.

## Convention decisions

- Degrees throughout (matches the trig unit and the modulus/argument lesson).
- Roots indexed $k = 0, 1, \dots, n-1$; $z_0 = 1$ is the anchor for roots of
  unity. Stopping at $k = n-1$ is justified: $k = n$ adds a full $360^\circ$ and
  repeats $z_0$.
- Compact shorthand $\operatorname{cis}\theta = \cos\theta + i\sin\theta$ is
  introduced once and used only for tight labels; prose keeps $\cos + i\sin$.
- Clean worked numbers: $(\cos 30^\circ + i\sin 30^\circ)^3 = i$ and
  $(1+i)^2 = 2i$ (checked directly: $1 + 2i + i^2 = 2i$).

## Figure (Stage.tsx, two modes)

- `mode: "power"`: an `AlgebraFlow` that writes De Moivre's theorem line by line
  and then works $(\cos 30^\circ + i\sin 30^\circ)^3 = i$, with an `AngleCircle`
  header showing the argument $t = 30^\circ$ turning into $nt = 90^\circ$.
- `mode: "roots"`: a shared `ComplexPlane` with a unit-circle guide `ring: 1` and
  `dots` at the $n$ roots of unity, computed from an integer slider `n`
  (min 2, max 6). A dock shows the roots formula and the live spacing $360/n$.
- `HALF` is a per-mode map `{ roots: 1.8, power: 3 }` so every plot target on the
  unit circle stays well inside the visible plane.

## Slides

1. **Powers: De Moivre's theorem.** Multiplying multiplies moduli and adds
   arguments, so a power raises $r$ to the $n$ and multiplies $t$ by $n$:
   $[r(\cos t + i\sin t)]^n = r^n(\cos nt + i\sin nt)$. Worked
   $(\cos 30^\circ + i\sin 30^\circ)^3 = \cos 90^\circ + i\sin 90^\circ = i$;
   question works $(1+i)^2 = 2i$.
2. **Roots of unity.** The solutions of $z^n = 1$ are $n$ points equally spaced
   on the unit circle, always including $z = 1$; spacing is $360/n$ ($n=3$ gives
   $120^\circ$, $n=4$ gives $1, i, -1, -i$ at $90^\circ$).
3. **Why exactly $n$ (the $+360k$).** Each root has argument $\frac{360^\circ k}{n}$
   for $k = 0,\dots,n-1$; $k = n$ returns to $z_0$, so there are exactly $n$. The
   general $n$th-root formula for any $w = s(\cos p + i\sin p)$ is shown.
4. **Your turn.** Slider $n$ drives the ring of dots. Plot: click a cube root of
   unity other than $1$ ($n = 3$). Manipulate: set $n$ so the roots are exactly
   $1, i, -1, -i$ (starts away from $n = 4$).

## Questions grounded in the traps

- Power: raise $r$ to the $n$ (not $r$ itself, not $nr$); multiply $t$ by $n$.
- Roots: there are exactly $n$; spacing is $360/n$; the $+360k$ generates all of
  them, so never stop at one root.
