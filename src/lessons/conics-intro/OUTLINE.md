# Intro to the conic sections

**Skill:** `conics-intro` (Unit 7: Conics, first node)

**Goal (one sentence):** Name the four conic sections as one family, say how a
plane cut through a cone produces each, and sort them by eccentricity $e$.

## How this differs from Base Camp `conics`

Base Camp walks each shape with its locus definition (equal radii, sum of focal
distances, focus-directrix, difference of focal distances) and then sorts by
$e$. Those locus rules belong to the later skills `ellipses`, `hyperbolas`, and
`eccentricity`. This journey lesson keeps the Base Camp idea Katie likes: one
family, a plane cutting a cone, and a single number $e$ that sorts the four
curves. It reuses the Base Camp figure in `summary` mode.

## Sources

- **OpenStax Precalculus 2e, Introduction to Conic Sections.** A conic section
  is the intersection of a plane with a double-napped cone. A cut parallel to
  the base is a circle, a tilted cut that still meets only one nappe in a closed
  curve is an ellipse, a cut parallel to a generator is a parabola, and a
  steeper cut that meets both nappes is a hyperbola. Eccentricity sorts the
  family: circle $e = 0$, ellipse $0 < e < 1$, parabola $e = 1$, hyperbola
  $e > 1$.
- **Sullivan, Precalculus, Analytic Geometry (conic sections).** Same four
  traces of a cone, and the same eccentricity ranges used as a classification,
  before the later chapters compute $e = c/a$ from foci.

## Convention decisions

- Name the four curves and their $e$ ranges. Do not derive $e = c/a$ or
  $c^2 = a^2 \pm b^2$ (those belong to `eccentricity`).
- Give each standard equation as a name-tag only. Do not read vertices, foci, or
  the $AC$ test (those belong to `ellipses`, `hyperbolas`, and `conics-class`).
- **Nappe** is defined the first time it appears: one of the two opposing halves
  of a double cone that meet at the tip.
- Figure: reuse Base Camp `conics/Figure` through `Stage.tsx`, `summary` mode,
  with the `view` parameter highlighting circle / ellipse / parabola / hyperbola.
The summary dock is always on in that mode, so slides do not set a `dock` flag.

## Slides

1. **What the conic sections are** (mode `summary`). Define a conic section as
   the curve a plane leaves when it cuts a cone. Name the four cuts: parallel to
   the base (circle), slightly tilted (ellipse), parallel to a side (parabola),
   steeper through both nappes (hyperbola). Highlight each curve as it is named.
   Choices: what a conic section is, which cut produces a hyperbola.
2. **How eccentricity sorts the family** (mode `summary`). Define eccentricity
   $e$ as a single number that measures how far a conic is from circular.
   Ranges: circle $e = 0$, ellipse $0 < e < 1$, parabola $e = 1$, hyperbola
   $e > 1$. Choices: which has $e = 1$, which range is an ellipse.
3. **The four equations at a glance** (mode `summary`). Circle $x^2 + y^2 = r^2$,
   ellipse the plus form, hyperbola the minus form, parabola one squared
   variable $y = a x^2$. Later lessons read each equation in detail. Choices:
   match the hyperbola equation, what makes a parabola's equation different.
4. **Your turn: compare the four** (mode `summary`). The table lists name,
   equation, and $e$ range. Watch rests on the circle (`view = 0`). Practice:
   click through and finish on the hyperbola. Manipulate plus two choices
   ($e = 1$, one family because they are plane slices of a cone).

## Questions grounded in takeaways

- A conic section is a plane slice of a cone, which is why the four curves are
  one family.
- Cut parallel to the base: circle. Tilted and closed: ellipse. Parallel to a
  side: parabola. Through both nappes: hyperbola.
- $e$ sorts them: $0$, $(0, 1)$, $1$, and $> 1$.
- Plus vs minus in the standard form, and a parabola having only one squared
  variable.
- Traps: treating the four as unrelated graphs, swapping ellipse and hyperbola
  $e$ ranges, thinking a parabola has $e = 0$, swapping the plus and minus.
