# Roots of unity

**Skill:** `roots-of-unity` (Polar and complex)

**Goal (one sentence):** Find the $n$ equally spaced $n$th roots of unity around
the unit circle, using $z_k = \cos\frac{360^\circ k}{n} + i\sin\frac{360^\circ k}{n}$
for $k = 0,\dots,n-1$, and explain why there are exactly $n$ of them.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": the
  $n$th-root theorem $z_k = r^{1/n}\big[\cos\frac{\theta + 2\pi k}{n} +
  i\sin\frac{\theta + 2\pi k}{n}\big]$, specialized to $w = 1$.
- Sullivan, Precalculus, "Complex Roots".
- Stewart, Precalculus. Cross-checked: there are exactly $n$ distinct $n$th roots
  of unity; they start at $z = 1$ and are spaced $360/n$ degrees apart on the
  unit circle.

## Prerequisite

Follows `de-moivre` (Euler's form and De Moivre's theorem): the same
modulus/argument machinery, now run in reverse to solve $z^n = 1$.

## Convention decisions

- Degrees throughout (matches the trig unit and the modulus/argument lesson).
- Roots indexed $k = 0, 1, \dots, n-1$; $z_0 = 1$ is the anchor. Stopping at
  $k = n-1$ is justified: $k = n$ adds a full $360^\circ$ and repeats $z_0$.

## Figure (Stage.tsx, one mode)

- `mode: "roots"`: a shared `ComplexPlane` with a unit-circle guide `ring: 1` and
  `dots` at the $n$ roots of unity, computed from an integer slider `n`
  (min 2, max 6). A dock shows the roots formula and the live spacing $360/n$.
  Reveal flags `ring`, `dots`, `dock`. `HALF = 1.8` keeps every plot target on
  the unit circle well inside the visible plane.

## Slides

1. **Roots of unity.** The solutions of $z^n = 1$ are $n$ points equally spaced
   on the unit circle, always including $z = 1$; spacing is $360/n$ ($n=3$ gives
   $120^\circ$, $n=4$ gives $1, i, -1, -i$ at $90^\circ$).
2. **Why exactly $n$ (the $+360k$).** Each root has argument $\frac{360^\circ k}{n}$
   for $k = 0,\dots,n-1$; $k = n$ returns to $z_0$, so there are exactly $n$. The
   general $n$th-root formula for any $w = s(\cos p + i\sin p)$ is shown.
3. **Your turn.** Slider $n$ drives the ring of dots. Plot: click a cube root of
   unity other than $1$ ($n = 3$). Manipulate: set $n$ so the roots are exactly
   $1, i, -1, -i$ (starts away from $n = 4$).

## Questions grounded in the traps

- There are exactly $n$ roots; spacing is $360/n$; the $+360k$ generates all of
  them, so never stop at one root.
- Every root has modulus $1$ (they sit on the unit circle), and $z = 1$ is a root
  for every $n$.
