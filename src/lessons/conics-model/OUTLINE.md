# conics-model: Conic modeling (Unit 7 Conics, applications capstone)

## Skill

`conics-model` (Unit 7 Conics). Given a described real situation, set up the
right conic with concrete numbers, find its key feature (usually a focus), and
answer a practical question. The classification and standard-form skills are
already taught; this lesson is the applications finish of the conics unit.

## Learner goal (one sentence)

Model a real scenario (dish, whispering room, navigation, headlight) with the
correct conic, locate its focus (or use its focal property), and answer the
practical question with verified numbers.

## Sources (accuracy first; cross-checked)

- OpenStax Precalculus 2e, Ch. 12 Analytic Geometry: 12.1 The Ellipse (focus
  definition, `c^2 = a^2 - b^2`, whispering-gallery application), 12.2 The
  Hyperbola (`c^2 = a^2 + b^2`, difference of distances `= 2a`, LORAN), 12.3 The
  Parabola (standard form `x^2 = 4py`, focus at `(0, p)`, reflective property,
  satellite dish and flashlight applications).
- Sullivan, Precalculus (10th ed.), Ch. 10 Analytic Geometry: same standard
  forms and applications (paraboloid reflectors, whispering galleries, LORAN).
- Cross-check on the two focal formulas (the single most confused point):
  ellipse uses `c^2 = a^2 - b^2` (minus, foci inside), hyperbola uses
  `c^2 = a^2 + b^2` (plus, foci outside). Both texts agree.

## Core facts (all verified by hand and in node)

- Parabola `x^2 = 4py` opens up, vertex at origin, focus at `(0, p)`, where `p`
  is the focal length (vertex-to-focus distance). A dish of radius `r` and depth
  `d` has the rim point `(r, d)` on the curve, so `r^2 = 4 p d`, giving
  `p = r^2 / (4 d)`. Reflective property: rays parallel to the axis reflect
  through the focus (dish), and a source at the focus reflects into a parallel
  beam (flashlight/headlight).
- Ellipse `x^2/a^2 + y^2/b^2 = 1` (a > b): foci on the major axis at `(+/- c, 0)`
  with `c^2 = a^2 - b^2`. Sum of distances to the two foci is constant `= 2a`.
  Reflective property: a ray from one focus reflects to the other focus.
- Hyperbola `x^2/a^2 - y^2/b^2 = 1`: foci at `(+/- c, 0)` with `c^2 = a^2 + b^2`
  (note the PLUS). Difference of distances to the two foci is constant `= 2a`.

## Verified worked numbers (one clean set per slide)

1. Satellite dish, 4 ft wide and 1 ft deep. Radius 2, rim `(2, 1)`:
   `2^2 = 4 p (1)` so `4 = 4p`, `p = 1`. Focus `(0, 1)`: receiver sits 1 ft above
   the vertex. Parabola coeff `= 1/(4p) = 0.25`.
2. Whispering gallery ellipse, `a = 5`, `b = 3`. `c^2 = 25 - 9 = 16`, `c = 4`.
   Foci `(+/- 4, 0)`; two people at the foci stand `2c = 8` ft apart. Top point
   `(0, 3)`: each focal distance is `5`, sum `= 2a = 10`.
3. Hyperbola navigation (LORAN), `a = 3`, `b = 4`. `c^2 = 9 + 16 = 25`, `c = 5`.
   Foci `(+/- 5, 0)`; constant difference of distances `= 2a = 6`. Vertex `(3, 0)`
   check: near focus `5 - 3 = 2`, far focus `5 + 3 = 8`, and `8 - 2 = 6`. The
   ellipse (5, 3, 4) and this hyperbola (3, 4, 5) are the same 3-4-5 numbers, so
   the minus vs plus is the only difference.
4. Flashlight/headlight reflector, 4 ft wide and 2 ft deep. Radius 2, rim
   `(2, 2)`: `2^2 = 4 p (2)` so `4 = 8p`, `p = 1/2`. Bulb (focus) `(0, 1/2)`.
   A bulb there sends light out in a parallel beam (reverse of the dish). Coeff
   `= 1/(4p) = 0.5`.
5. Your turn: a 4 ft wide dish (rim fixed at `x = +/- 2`) with an adjustable
   depth `d`. Then `2^2 = 4 p d` gives `p = 1/d`. Deeper dish pushes the focus
   toward the vertex. Target: set `d = 1` so the receiver sits `p = 1` ft above
   the vertex (recreating slide 1's dish). Start `d = 5` (off-answer).

## Slides (5)

1. `dish` (ConicPlane parabola): satellite dish, reflective property, find `p`
   from width and depth, reveal the focus (receiver) at `(0, 1)`.
2. `gallery` (ConicPlane ellipse): whispering gallery, `c^2 = a^2 - b^2`, foci as
   the two people, the equal-length reflected path (sum `= 2a`).
3. `loran` (ConicPlane hyperbola): navigation, `c^2 = a^2 + b^2` (plus), the
   difference of distances `= 2a`, verified at the vertex; contrast with slide 2.
4. `flashlight` (ConicPlane parabola): reverse reflective property, find the bulb
   (focus) at `(0, 1/2)` from width and depth.
5. `yourturn` (ConicPlane parabola): depth slider `d` drives `p = 1/d` and the
   focus dot live; set the depth to put the receiver 1 ft up.

## Figure plan

Reuse the shared `src/components/ConicPlane.tsx`. The curve (dish, room,
hyperbola) is visible from the start because this is modeling, not
classification. Foci, people, focal radii, and light rays are gated behind
reveal flags so one idea appears per beat. Custom context art (incoming/outgoing
light rays, reflected paths, rim markers) is drawn in the ConicPlane
`underlay`/`overlay` callbacks using `plane.sx`/`plane.sy`, reusing the shared
`.asymptote`, `.def-seg`, `.focus-dot`, and `.tri-label` classes. No AlgebraFlow:
each derivation is a single substitution, shown as reveal-gated dock lines.

## Reveal flags (read literally in Stage.tsx; kept in sync with beats)

- dish:       dock, rays, focus
- gallery:    dock, people, path
- loran:      dock, foci, radii
- flashlight: dock, focus, beam
- yourturn:   dock, focus (both in baseReveal; curve/focus morph with `d`)

Every flag above is set by a beat or baseReveal and read by the Stage.

## Questions

Watch beats narrate only (no drag/slide/click). Try questions: slide 5 has one
manipulate (set `d = 1`, starts at `d = 5`, off-answer, drives the focus dot) plus
two choice questions; other slides use choice questions that make the learner
locate the focus or compute `p`, `c`, or the constant sum/difference.

## Quiz plan

- Climb (15): match scenario to curve (dish = parabola, whispering room =
  ellipse, navigation = hyperbola); find `p` from width and depth; the reflective
  property; `c` for an ellipse and a hyperbola; foci spacing `2c`; difference
  `= 2a`.
- Summit (15): reverse problems (given `p` and width, find depth); larger clean
  numbers; the two big traps (using `+` for an ellipse `c`, using `-` for a
  hyperbola `c`); difference `= 2a` not `2c` or `a`; sum `= 2a`; receiver at the
  focus not the vertex; reading the focus from `x^2 = 4py` and the `4p` step;
  diameter vs radius when substituting the rim point.

## Known pitfalls avoided

- Diameter vs radius: always substitute the rim point `(radius, depth)`, not
  `(width, depth)`.
- Depth vs focal length `p`: the depth is `d`; the focus is at `p = r^2/(4d)`.
- Focus vs vertex: the receiver/bulb goes at the focus, never at the vertex.
- Ellipse minus vs hyperbola plus in the `c` formula.
- Difference of distances is `2a`, not `a` or `2c`.
- Manipulate starts off-answer (`d = 5`, target `d = 1`) and moves a visible dot.
