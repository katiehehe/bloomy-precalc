# Euler's form and De Moivre's theorem

**Skill:** `de-moivre` (Polar and complex)

**Goal (one sentence):** Write a complex number in exponential form
$z = re^{i\theta}$ using Euler's formula, use the exponent law to see why
multiplying multiplies moduli and adds arguments, raise to a power with De
Moivre's theorem (raise the modulus to the $n$, multiply the argument by $n$),
and use the equivalence $e^{i\theta} = \cos\theta + i\sin\theta$ to derive the
sine and cosine sum formulas.

Roots of unity are a separate lesson (`roots-of-unity`) that runs this same
machinery in reverse to solve $z^n = 1$.

## Sources

- OpenStax Precalculus 2e, Section 8.5 "Polar Form of Complex Numbers": De
  Moivre's theorem $[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta +
  i\sin n\theta)$.
- Sullivan, Precalculus, "De Moivre's Theorem".
- Stewart, Precalculus, and standard references for Euler's formula
  $e^{i\theta} = \cos\theta + i\sin\theta$ and the exponent law
  $e^{a}e^{b} = e^{a+b}$.

## Convention decisions

- Euler's formula stated in radians for the famous values ($e^{i\pi} = -1$,
  $e^{i\pi/2} = i$); De Moivre worked examples use degrees to match the trig unit.
- Compact shorthand $\operatorname{cis}\theta = \cos\theta + i\sin\theta$ is
  introduced once and used only for tight labels; prose keeps $\cos + i\sin$.
- Clean worked numbers: $(\cos 30^\circ + i\sin 30^\circ)^3 = i$ and
  $(1+i)^2 = 2i$ (checked directly: $1 + 2i + i^2 = 2i$).

## Figure (Stage.tsx, three modes)

- `mode: "euler"`: a shared `ComplexPlane` with a single phasor $z = re^{i\theta}$.
  It starts on the unit circle ($r = 1$) as Euler's formula, then scales out to
  modulus $r$ and drops its legs so the real part $r\cos\theta$ and imaginary
  part $r\sin\theta$ are labeled. Reveal flags `scaled`, `legs`. `HALF.euler = 2.6`.
- `mode: "multiply"`: an `AlgebraFlow` that multiplies $r_1 e^{i\theta_1}$ by
  $r_2 e^{i\theta_2}$ using $e^a e^b = e^{a+b}$ (moduli multiply, arguments add),
  then powers it to reach De Moivre $z^n = r^n e^{in\theta}$. Reveal `s1..s4`.
- `mode: "power"`: an `AlgebraFlow` that writes De Moivre's theorem line by line
  and then works $(\cos 30^\circ + i\sin 30^\circ)^3 = i$. Reveal `s1..s4`.

## Slides

1. **What Euler's formula says** $e^{i\theta} = \cos\theta +
   i\sin\theta$ is the unit-circle point at angle $\theta$; scaling by $r$ gives
   $z = re^{i\theta}$, whose legs are $r\cos\theta$ and $r\sin\theta$. Same two
   facts as polar form (modulus $r$, argument $\theta$), shorter notation.
2. **Why multiplying adds the arguments.** $(r_1 e^{i\theta_1})(r_2 e^{i\theta_2})
   = r_1 r_2 e^{i(\theta_1+\theta_2)}$ by $e^a e^b = e^{a+b}$, so moduli multiply
   and arguments add; a power multiplies the exponent by $n$, giving De Moivre
   $z^n = r^n e^{in\theta}$.
3. **What De Moivre's theorem says about powers.** A power raises $r$ to the $n$ and multiplies
   $t$ by $n$: $[r(\cos t + i\sin t)]^n = r^n(\cos nt + i\sin nt)$. Worked
   $(\cos 30^\circ + i\sin 30^\circ)^3 = \cos 90^\circ + i\sin 90^\circ = i$;
   question works $(1+i)^2 = 2i$.

## Questions grounded in the traps

- Exponential form: $r$ is the modulus and $\theta$ is the argument, do not swap
  them; $e^{i\theta}$ is the whole trig point, not $e^{\theta}$ or $i\theta$.
- Power: raise $r$ to the $n$ (not $r$ itself, not $nr$); multiply $t$ by $n$ (do
  not add $n$).
