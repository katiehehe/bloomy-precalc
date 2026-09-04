# What is a root of unity?

**Skill:** `roots-of-unity` (Polar and complex)

**Goal (one sentence):** Find the $n$ equally spaced $n$th roots of unity around
the unit circle by solving $z^n = 1$ as $e^{in\theta} = e^{2\pi i k}$, which
gives $\theta = 2\pi k/n = 360^\circ k/n$ for $k = 0,\dots,n-1$.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": the
  $n$th-root theorem $z_k = r^{1/n}\big[\cos\frac{\theta + 2\pi k}{n} +
  i\sin\frac{\theta + 2\pi k}{n}\big]$, specialized to $w = 1$. Writing
  $1 = \operatorname{cis}(2\pi k)$ (equivalently $1 = e^{2\pi i k}$) is the
  standard first step.
- Sullivan, Precalculus, "Complex Roots".
- Stewart, Precalculus. Cross-checked: there are exactly $n$ distinct $n$th roots
  of unity; they start at $z = 1$ and are spaced $360/n$ degrees apart on the
  unit circle.

## Prerequisite

Follows `de-moivre` (Euler's form and De Moivre's theorem):
$e^{i\theta} = \cos\theta + i\sin\theta$, $z = re^{i\theta}$, and
$z^n = r^n e^{in\theta}$. This lesson runs that machinery in reverse to solve
$z^n = 1$.

## Convention decisions

- Degrees in the final formula (matches the trig unit and the modulus/argument
  lesson). The derivation starts in radians because Euler's formula was taught
  that way, then converts with the $2\pi = 360^\circ$ bridge, showing the
  uncancelled product first.
- Roots indexed $k = 0, 1, \dots, n-1$; $z_0 = 1$ is the anchor. Stopping at
  $k = n-1$ is justified: $k = n$ adds a full $360^\circ$ and repeats $z_0$.
- $1 = e^{2\pi i k}$ for integer $k$, not $e^{2\pi k}$: the $i$ belongs in the
  exponent (Euler).

## Figure (Stage.tsx)

- `mode: "roots"`: a shared `ComplexPlane` with a unit-circle guide `ring: 1` and
  `dots` at the $n$ roots of unity, computed from an integer slider `n`
  (min 2, max 6). A dock shows the roots formula and the live spacing $360/n$.
  Reveal flags `ring`, `dots`, `dock`. `HALF = 1.8` keeps every plot target on
  the unit circle well inside the visible plane.
- `mode: "derive"` and `mode: "degrees"`: shared `AlgebraFlow` with an
  `AngleCircle` header (the three cube roots). Reveal `s1` through `s4`, then
  `d1` through `d3`.

## Slides

1. **What is a root of unity?** The solutions of $z^n = 1$ are $n$ points equally spaced
   on the unit circle, always including $z = 1$; $n=3$ gives $120^\circ$, $n=4$
   gives $1, i, -1, -i$ at $90^\circ$. The $360/n$ pattern is named, then derived.
2. **How to solve $z^n = 1$.** AlgebraFlow: $1 = e^{2\pi i k}$ because $e^{2\pi i} = 1$
   and extra full turns stay at $1$; a unit-modulus $z$ is $e^{i\theta}$, so
   $e^{in\theta} = e^{2\pi i k}$; matching arguments gives $n\theta = 2\pi k$,
   hence $\theta = 2\pi k/n$.
3. **Why the roots of unity are $360^\circ/n$ apart.** Convert with $2\pi$ rad $= 360^\circ$: first
   $\frac{2\pi k}{n}\cdot\frac{360^\circ}{2\pi}$, then cancel $2\pi$ to get
   $\theta = 360^\circ k/n$. Adjacent integers $k$ differ by $360^\circ/n$.
4. **Why there are exactly $n$ roots of unity.** The formula
   $z_k = \cos\frac{360^\circ k}{n} + i\sin\frac{360^\circ k}{n}$ for
   $k = 0,\dots,n-1$; $k = n$ returns to $z_0$. The general $n$th-root formula
   for any $w = s(\cos p + i\sin p)$ is shown.
5. **Your turn: plot a cube root of unity.** Slider $n$ drives the ring of dots. Plot: click a cube root of
   unity other than $1$ ($n = 3$). Manipulate: set $n$ so the roots are exactly
   $1, i, -1, -i$ (starts away from $n = 4$).

## Questions grounded in the traps

- There are exactly $n$ roots; spacing is $360/n$ because $1 = e^{2\pi i k}$
  simplifies to $\theta = 360^\circ k/n$; the $+360k$ generates all of them, so
  never stop at one root.
- Every root has modulus $1$ (they sit on the unit circle), and $z = 1$ is a root
  for every $n$.
