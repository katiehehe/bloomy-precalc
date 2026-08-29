# Decomposition on inclines (vec-incline)

## Learner goal
Given a block resting on a ramp tilted at angle alpha, resolve the straight-down
weight W into two perpendicular components aligned with the ramp: the along-incline
pull W sin(alpha) (down the slope) and the into-surface push W cos(alpha) (which the
normal force balances, so N = W cos(alpha)). Understand why sine goes with the
down-slope part and cosine with the into-surface part, and see the two components
recombine to the original weight.

## Unit and prerequisites
Unit 5 (Vectors). Assumes component form and magnitude of a vector (vec-comp,
vec-mag, all ready), right-triangle trig (sine, cosine, tangent), and the unit
circle. No calculus.

## Sources (accuracy first)
- OpenStax Precalculus 2e, "Vectors" (resolving a vector into perpendicular
  components; component form and magnitude).
- OpenStax University Physics Vol. 1, Ch. 5-6, "Common Forces / Inclined planes"
  (a weight on a frictionless incline splits into W sin(theta) along the surface
  and W cos(theta) perpendicular to it; the normal force equals W cos(theta)).
- Stewart, Precalculus, "Vectors in Two Dimensions" (resolving forces).
Cross-checked: the two texts agree that the incline angle reappears between the
vertical weight and the line perpendicular to the surface, so the perpendicular
(into-surface) component is the one adjacent to alpha (cosine) and the along-incline
component is opposite alpha (sine).

## Key facts and conventions
- Weight vector points straight down: W_vec = (0, -W).
- Up-slope unit direction: (cos a, sin a). Down-slope: (-cos a, -sin a).
- Into-surface (perpendicular, pressing into the ramp) direction: (sin a, -cos a).
- Along-incline component = W sin(a), pointing down the slope. This is what tends
  to slide the block.
- Into-surface component = W cos(a). The surface pushes back with the normal force
  N = W cos(a).
- The two components are perpendicular, and their vector sum is exactly W_vec.
- As a grows: sine grows so the along-incline part grows; cosine shrinks so the
  normal part shrinks. At a = 0 all weight is normal (W cos 0 = W, W sin 0 = 0);
  at a = 90 it is all along the slope.

## Clean numbers (all verified by hand and by script)
- 3-4-5 ramp: rise 3, run 4, hypotenuse 5, so sin(a) = 3/5 = 0.6, cos(a) = 4/5 = 0.8
  (a = arcsin 0.6 approx 36.87 degrees; we call it the 3-4-5 ramp to stay exact).
  With W = 10: along-incline = 10(0.6) = 6, normal = 10(0.8) = 8, and
  6^2 + 8^2 = 36 + 64 = 100 = 10^2, so the parts recombine to W.
- a = 30 degrees, W = 10: along = 10 sin 30 = 5, normal = 10 cos 30 = 5 sqrt(3) approx 8.66.
- a = 60 degrees, W = 10: along = 10 sin 60 = 5 sqrt(3) approx 8.66, normal = 10 cos 60 = 5.
- a = 45 degrees, W = 10: both equal 10/sqrt(2) approx 7.07 (the balance angle).

## Figure (Stage.tsx over the shared VectorPlane)
- Plane HALF = 6. Force magnitudes drawn at SCALE = 0.34 world units per unit of
  force, so W = 10 draws as a length-3.4 arrow and everything stays on the plane
  for alpha in [15, 90] and W in [4, 12].
- underlay: the ground line, the incline triangle (hypotenuse = ramp surface,
  pivoting at a fixed toe), and a small block sitting on the surface.
- arrows (world coords, all from the block): weight W straight down (primary),
  along-incline component (teal), into-surface component (cosine tone). Each is
  labeled and gated on its own reveal flag.
- spec.angle: the base angle alpha at the toe, between the ground and the ramp.
- overlay: dashed completion lines showing W as the diagonal of the rectangle of
  its two components, a small right-angle marker where the components meet, and a
  second alpha arc at the block (between the weight and the into-surface direction)
  for the "why sine vs cosine" beat.
- dock: live sin/cos, W, along-incline = W sin(alpha), and N = W cos(alpha).

## Reveal flags
ramp, weight, along, normal, rect, angleBase, angleBlock, dock. Every flag the
Stage reads is set by baseReveal or a beat; no dead flags.

## Slides
1. Setup. Draw the ramp, name alpha at the base, draw the weight W straight down,
   and show that W stays vertical as the ramp tilts (animate the tilt, then settle
   on the 3-4-5 ramp). Dock names W and alpha.
2. Rotate to the ramp's axes. Introduce the down-slope and into-surface directions
   (perpendicular to each other), draw the two component arrows from the block, and
   complete the rectangle so W is the diagonal. Mark alpha at the base.
3. The formulas. Show the ramp angle reappears at the block (between W and the
   into-surface direction), so cosine (adjacent) gives the into-surface push
   W cos(alpha) = N and sine (opposite) gives the along-incline pull W sin(alpha).
   Work the 3-4-5 ramp: 6 and 8, checked by 6^2 + 8^2 = 100.
4. Your turn. Sliders for alpha and W. Tilt the ramp and watch the split change;
   make the weight heavier and watch every arrow grow. Targets set outside the
   start so the learner must move.

## Questions
- Slide 1 (choice): weight direction is independent of the ramp; what alpha names.
- Slide 2 (choice): the two components are perpendicular and sum to W (predict which
  is bigger for a gentle ramp).
- Slide 3 (choice): which component is W sin(alpha) vs W cos(alpha); what N equals.
- Slide 4 (manipulate + choice): set along-incline = 5 with W = 10 (alpha = 30);
  set alpha = 60 and grow W until N = 6 (W = 12); which part grows as the ramp
  steepens.

## Assessment (quiz.ts)
- Climb (15): single-step. Which component uses sine vs cosine, compute W sin/W cos
  for clean angles, what N equals, behavior as alpha grows, the two edge cases.
- Summit (15): multi-step. Both components for a 3-4-5 or 30/60 ramp, recombination
  check, comparisons across angles, and trap capstones (sine/cosine swap, wrong
  angle, N = W error, magnitudes adding to more than W, "along shrinks as it
  steepens").
