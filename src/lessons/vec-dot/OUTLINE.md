# Dot product and angle between (vec-dot)

## Goal
The learner computes the dot product of two plane vectors from components, reads
the sign of that number as the type of angle between the vectors, finds the exact
angle with the cosine formula, and builds the scalar and vector projection of one
vector onto another. They finish by using the perpendicular test, moving a vector
until the dot product equals zero.

## Prerequisites
Base Camp Vectors (magnitude, components, addition). This lesson is complementary:
it does not re-teach magnitude, components, or vector addition, it uses them.

## Sources
- OpenStax Precalculus 2e, Section 8.8 (Vectors): the dot product
  `a . b = a1 b1 + a2 b2`, the geometric form `a . b = |a||b| cos(theta)`, the
  angle-between formula `cos(theta) = (a . b) / (|a||b|)`, and vector projection.
- Sullivan, Precalculus (Vectors and the Dot Product): sign of the dot product
  and the acute/right/obtuse classification; scalar and vector projection.
- Stewart, Precalculus: cross-check of the projection formulas
  `proj_a b = ((a . b)/|a|^2) a` (vector) and `(a . b)/|a|` (scalar).

## Running numbers (verified by hand)
- Component-form example (slide 1): a = (2, 3), b = (4, 1),
  a . b = (2)(4) + (3)(1) = 8 + 3 = 11.
- Running pair (slides 2 and 3): a = (4, 2), b = (1, 3).
  - a . b = (4)(1) + (2)(3) = 4 + 6 = 10.
  - |a| = sqrt(20) = 2 sqrt(5), |b| = sqrt(10), |a||b| = sqrt(200) = 10 sqrt(2).
  - cos(theta) = 10 / (10 sqrt(2)) = 1/sqrt(2), so theta = 45 degrees exactly.
  - scalar projection of b onto a = (a . b)/|a| = 10/sqrt(20) = sqrt(5).
  - vector projection of b onto a = (10/20)(4, 2) = (2, 1).
- Perpendicular test (slide 4): a = (4, 2) fixed. b perpendicular when
  a . b = 4 b_x + 2 b_y = 0, for example b = (1, -2) since 4(1) + 2(-2) = 0.

## Reveal flags (Stage reads, slides set, kept two-way consistent)
`showA`, `showB` (the two arrows), `angle` (the arc between them), `projection`
(the highlighted shadow along a plus the dashed drop), `dock` (the readout).

## Slides

### 1. How to compute a dot product from components (mode "component"), hideSliders
Figure: arrows a = (2, 3) and b = (4, 1) in distinct tones; dock shows the rule
and the substitution ending at 11.
Beats: define the dot product as a single number (a scalar); show a; show b;
state a . b = a1 b1 + a2 b2 (multiply matching parts, then add); substitute to 11;
warn against adding the components instead of multiplying.
Questions (choice): compute u . v for a fresh pair; pick the correct formula.

### 2. What the geometric form of the dot product means (mode "geometric"), hideSliders
Figure: a = (4, 2), b = (1, 3), plus the angle arc labelled theta; dock shows the
component value 10, the geometric form, and the sign reading.
Beats: recap a . b = 10; introduce a . b = |a||b| cos(theta) with the arc; sign
comes from cos(theta) since lengths are positive, so positive means acute; zero
means perpendicular, negative means obtuse; apply to our pair (10 > 0, acute).
Questions (choice): negative dot means obtuse; a . b = 0 means perpendicular.

### 3. How the dot product finds the angle and the projection (mode "angle"), hideSliders
Figure: a, b, the arc, and the projection of b onto a (highlighted segment to the
foot (2, 1) plus the dashed drop from b's tip); dock shows cos(theta), theta = 45,
and both projections.
Beats: rearrange to cos(theta) = (a . b)/(|a||b|); compute the two lengths and the
product 10 sqrt(2); get cos(theta) = 1/sqrt(2) so theta = 45; introduce projection
as the shadow of b along a; give scalar projection sqrt(5) and vector projection
(2, 1), stressing |a| for the length but |a|^2 for the vector.
Questions (choice): angle-between for a fresh clean pair (45); vector projection (2,1).

### 4. Your turn: the perpendicular test (mode "perp"), sliders b_x, b_y
Figure: a = (4, 2) fixed, b interactive (drag or sliders, SCALE = 20 so sliders
are integers); dock shows a, b, the live a . b, and a live acute/right/obtuse label.
Beats (watch, automated motion, rest OUTSIDE perpendicular at b = (3, 3)): show
the test; swing b to a right angle where a . b hits 0; swing back to acute; settle
at b = (3, 3) with a . b = 18.
Questions: manipulate (move b until a . b = 0, starting at (3, 3)); choice (which
listed vector is perpendicular to a); plot (click a point that puts b perpendicular
to a). Manipulate check: |a . b| < 0.6 in world units and |b| > 0.5, so the zero
vector does not count and the resting start does not satisfy it.

## Assessment (quiz.ts)
- Climb (15, single step): compute a . b; sign to angle type; the cos(theta) setup;
  a . b = 0 as perpendicular; the scalar projection formula; supporting |a|.
- Summit (15, multi step): full angle-between computations, vector and scalar
  projection, perpendicular vs parallel classification, solving for a missing
  component to force perpendicularity, and trap capstones (adding vs multiplying,
  dividing by |a| vs |a|^2, treating a . b as a vector, sign confusion).
